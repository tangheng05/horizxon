import * as THREE from "three";
import { MARK } from "@/lib/mark";

type Palette = { ink: string; paper: string; teal: string; blue: string; red: string };

const BEVEL = { bevelEnabled: true, bevelThickness: 0.025, bevelSize: 0.025, bevelSegments: 4, curveSegments: 10 };

function rounded(w: number, h: number, r: number, x = -w / 2, y = -h / 2) {
  const s = new THREE.Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function clay(color: string) {
  return new THREE.MeshStandardMaterial({ color, roughness: 0.82, metalness: 0 });
}

function slab(shape: THREE.Shape | THREE.Shape[], depth: number, color: string, z = 0) {
  const g = new THREE.ExtrudeGeometry(shape, { depth, ...BEVEL });
  const m = new THREE.Mesh(g, clay(color));
  m.position.z = z;
  return m;
}

function hzxn(c: Palette) {
  const group = new THREE.Group();
  const k = 1.25 / 32;
  group.add(slab(rounded(1.25, 1.25, 0.3), 0.2, c.ink));
  const letters = MARK.map((s) => {
    const pts: [number, number][] =
      "rect" in s
        ? [
            [s.rect[0], s.rect[1]],
            [s.rect[0] + s.rect[2], s.rect[1]],
            [s.rect[0] + s.rect[2], s.rect[1] + s.rect[3]],
            [s.rect[0], s.rect[1] + s.rect[3]],
          ]
        : s.poly;
    return new THREE.Shape(pts.map(([x, y]) => new THREE.Vector2((x - 16) * k, (16 - y) * k)));
  });
  const g = new THREE.ExtrudeGeometry(letters, { depth: 0.06, bevelEnabled: false });
  const m = new THREE.Mesh(g, clay(c.paper));
  m.position.z = 0.22;
  group.add(m);
  return group;
}

function khqr(c: Palette) {
  const group = new THREE.Group();
  group.add(slab(rounded(1, 1.32, 0.12), 0.1, c.paper));
  const head = slab(rounded(1, 0.26, 0.12, -0.5, 0.4), 0.04, c.red, 0.12);
  group.add(head);
  const cell = 0.07;
  const box = new THREE.BoxGeometry(cell * 0.92, cell * 0.92, 0.05);
  const mat = clay(c.ink);
  const n = 11;
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const finder = (i: number, j: number) =>
    [[0, 0], [0, 8], [8, 8]].some(([a, b]) => i - a >= 0 && i - a < 3 && j - b >= 0 && j - b < 3);
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      if (!(finder(i, j) || rand() > 0.55)) continue;
      const b = new THREE.Mesh(box, mat);
      b.position.set((i - (n - 1) / 2) * cell, (j - (n - 1) / 2) * cell - 0.12, 0.15);
      group.add(b);
    }
  return group;
}

function check(c: Palette) {
  const group = new THREE.Group();
  const stroke = rounded(0.22, 1.25, 0.11);
  const long = slab(stroke, 0.24, c.teal);
  long.rotation.z = -0.62;
  long.position.set(0.18, 0.05, 0);
  const dot = slab(rounded(0.34, 0.34, 0.09), 0.24, c.teal);
  dot.rotation.z = Math.PI / 4;
  dot.position.set(-0.42, -0.3, 0);
  group.add(long, dot);
  return group;
}

function bubble(c: Palette) {
  const group = new THREE.Group();
  const s = rounded(1.3, 0.9, 0.32);
  const tail = new THREE.Shape([
    new THREE.Vector2(-0.38, -0.4),
    new THREE.Vector2(-0.5, -0.68),
    new THREE.Vector2(-0.12, -0.42),
  ]);
  group.add(slab([s, tail], 0.22, c.blue));
  const dot = new THREE.CylinderGeometry(0.075, 0.075, 0.06, 24);
  dot.rotateX(Math.PI / 2);
  [-0.3, 0, 0.3].forEach((x) => {
    const m = new THREE.Mesh(dot, clay(c.paper));
    m.position.set(x, 0, 0.27);
    group.add(m);
  });
  return group;
}

function mac(c: Palette) {
  const group = new THREE.Group();
  group.add(slab(rounded(1.4, 0.95, 0.12), 0.1, c.paper));
  group.add(slab(rounded(1.4, 0.16, 0.08, -0.7, 0.315), 0.03, c.ink, 0.12));
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.055, 16, 48, Math.PI * 1.45), clay(c.blue));
  ring.position.set(-0.3, -0.12, 0.16);
  ring.rotation.z = Math.PI / 2;
  const track = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.03, 12, 48), clay(c.ink));
  track.position.copy(ring.position);
  const bars = [0.28, 0.42, 0.2].map((h, i) => {
    const b = new THREE.Mesh(new THREE.BoxGeometry(0.09, h, 0.06), clay(c.ink));
    b.position.set(0.18 + i * 0.16, -0.32 + h / 2, 0.16);
    return b;
  });
  group.add(track, ring, ...bars);
  return group;
}

const makers = [khqr, check, bubble, mac];
const tints = new Map<typeof hzxn, keyof Palette>([[hzxn, "ink"], [khqr, "red"], [check, "teal"], [bubble, "blue"], [mac, "ink"]]);

export type Hooks = { emit: (color: string) => void; absorb: () => void };

function palette(): Palette {
  const css = getComputedStyle(document.documentElement);
  const night = document.documentElement.dataset.theme === "night";
  return {
    ink: css.getPropertyValue("--fg").trim() || "#111214",
    paper: night ? "#2A2D36" : "#F6F3EE",
    teal: night ? "#5CC4B8" : "#0E716B",
    blue: night ? "#4D7CFE" : "#1D4FD8",
    red: "#E1232E",
  };
}

function dispose(o: THREE.Object3D) {
  o.traverse((n) => {
    if (n instanceof THREE.Mesh) {
      n.geometry.dispose();
      (n.material as THREE.Material).dispose();
    }
  });
}

const ease = {
  out: (t: number) => 1 + 2.2 * Math.pow(t - 1, 3) + 1.2 * Math.pow(t - 1, 2),
  in: (t: number) => t * t * t,
};

export function start(host: HTMLElement, hooks: Hooks) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  camera.position.z = 10;
  scene.add(new THREE.HemisphereLight(0xffffff, 0xd8cfc2, 1.7));
  const sun = new THREE.DirectionalLight(0xffffff, 2.1);
  sun.position.set(-3, 4, 6);
  scene.add(sun);

  let half = { w: 1, h: 1 };
  const resize = () => {
    const { clientWidth: w, clientHeight: h } = host;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const hh = Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    half = { w: hh * camera.aspect, h: hh };
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  const pointer = new THREE.Vector2();
  const aim = new THREE.Vector2();
  const onMove = (e: PointerEvent) => aim.set((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
  addEventListener("pointermove", onMove, { passive: true });

  let count = 0;
  let order = [...makers].sort(() => Math.random() - 0.5);
  let current: { obj: THREE.Group; born: number; spin: number; size: number; y: number; absorbed: boolean } | null = null;
  // EMIT: the drop travels out of the N before the object grows from it.
  const EMIT = 0.62, IN = 1.1, HOLD = 4.6, OUT = 0.75, GAP = 0.25;

  const spawn = (now: number) => {
    const c = palette();
    let make = hzxn;
    if (count % 2 === 1) {
      if (!order.length) order = [...makers].sort(() => Math.random() - 0.5);
      make = order.pop()!;
    }
    count++;
    const obj = make(c);
    hooks.emit(c[tints.get(make) ?? "ink"]);
    // Objects are about 1.4 units across at scale 1; fill most of the square slot.
    const size = (Math.min(half.w, half.h) * 2 * 0.78) / 1.4;
    const pos = new THREE.Vector2(0, 0);
    obj.position.set(pos.x, pos.y, 0);
    obj.scale.setScalar(0.001);
    scene.add(obj);
    current = { obj, born: now + EMIT, spin: Math.random() * Math.PI * 2, size, y: pos.y, absorbed: false };
  };

  let running = false;
  let raf = 0;
  let prev = 0;
  const clock = { t: 0 };
  const frame = (ms: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (ms - (prev || ms)) / 1000);
    prev = ms;
    clock.t += dt;
    const t = clock.t;
    pointer.lerp(aim, 0.05);

    // Let the slot fade in before the N sends out the first drop.
    if (!current) {
      if (t < 2.2) return renderer.render(scene, camera);
      spawn(t);
    }
    const cur = current!;
    const age = t - cur.born;
    let s = 1;
    let lift = 0;
    let back = 0;
    if (age < 0) {
      s = 0.001;
    } else if (age < IN) {
      const p = age / IN;
      s = Math.max(0.001, ease.out(p));
      lift = (1 - p) * -0.35;
    } else if (age > IN + HOLD) {
      const p = Math.min(1, (age - IN - HOLD) / OUT);
      s = Math.max(0.001, 1 - ease.in(p));
      lift = -ease.in(p) * 0.25;
      back = ease.in(p);
    }
    const o = cur.obj;
    o.scale.setScalar(s * cur.size);
    o.position.z = lift;
    o.rotation.y = Math.sin(t * 0.55 + cur.spin) * 0.5 + pointer.x * 0.35;
    o.rotation.x = Math.sin(t * 0.4 + cur.spin) * 0.14 + pointer.y * 0.25;
    o.rotation.z = Math.sin(t * 0.3 + cur.spin) * 0.06;
    // On the way out the object slides back into the corner of the N.
    o.position.x = -back * half.w * 1.15;
    o.position.y = cur.y + Math.sin(t * 1.1 + cur.spin) * 0.05 - back * half.h * 0.15;

    if (!cur.absorbed && age > IN + HOLD + OUT * 0.85) {
      cur.absorbed = true;
      hooks.absorb();
    }

    if (age > IN + HOLD + OUT + GAP) {
      scene.remove(o);
      dispose(o);
      current = null;
    }
    renderer.render(scene, camera);
  };

  const play = () => {
    if (running) return;
    running = true;
    prev = 0;
    raf = requestAnimationFrame(frame);
  };
  const pause = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const io = new IntersectionObserver(([e]) => (e.isIntersecting && !document.hidden ? play() : pause()));
  io.observe(host);
  const onVisible = () => (document.hidden ? pause() : host.getBoundingClientRect().bottom > 0 && play());
  document.addEventListener("visibilitychange", onVisible);

  return () => {
    pause();
    io.disconnect();
    ro.disconnect();
    removeEventListener("pointermove", onMove);
    document.removeEventListener("visibilitychange", onVisible);
    if (current) dispose(current.obj);
    renderer.dispose();
    renderer.domElement.remove();
  };
}
