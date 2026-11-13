// HZXN on the horizon line, drawn on a 32×32 grid (y grows downward, like SVG).
type Rect = { rect: [x: number, y: number, w: number, h: number] };
type Poly = { poly: [number, number][] };
export const MARK: (Rect | Poly)[] = [
  { rect: [4, 8.3, 1.9, 12] },
  { rect: [7.5, 8.3, 1.9, 12] },
  { rect: [4, 13.4, 5.4, 1.8] },
  { rect: [10.2, 8.3, 5.4, 1.8] },
  { rect: [10.2, 18.5, 5.4, 1.8] },
  { poly: [[13.4, 10.1], [15.6, 10.1], [12.4, 18.5], [10.2, 18.5]] },
  { poly: [[16.4, 8.3], [18.5, 8.3], [21.8, 20.3], [19.7, 20.3]] },
  { poly: [[19.7, 8.3], [21.8, 8.3], [18.5, 20.3], [16.4, 20.3]] },
  { rect: [22.6, 8.3, 1.9, 12] },
  { rect: [26.1, 8.3, 1.9, 12] },
  { poly: [[22.6, 8.3], [24.5, 8.3], [28, 20.3], [26.1, 20.3]] },
  { rect: [4, 22.3, 24, 1.4] },
];

export const MARK_SHAPES = MARK.map((s) =>
  "rect" in s
    ? `<rect x="${s.rect[0]}" y="${s.rect[1]}" width="${s.rect[2]}" height="${s.rect[3]}"/>`
    : `<polygon points="${s.poly.map((p) => p.join(",")).join(" ")}"/>`,
).join("");

export function markSvg(bg: string, fg: string) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="${bg}"/><g fill="${fg}">${MARK_SHAPES}</g></svg>`;
}
