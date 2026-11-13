"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const clips = [
  {
    id: "pure-34",
    km: "ចាស់ៗតែងនិយាយថា «ទឹកឡើងត្រីស៊ីស្រមោច ទឹកស្រកស្រមោចស៊ីត្រី»។",
  },
  {
    id: "names-38",
    km: "ខេត្តក្រចេះជាកន្លែងដែលអាចមើលឃើញផ្សោតទឹកសាបនៅក្នុងទន្លេមេគង្គ។",
  },
  {
    id: "numbers-49",
    km: "ប្រាក់កម្ចីនេះមានការប្រាក់ 1.5% ក្នុងមួយខែ។",
  },
];

// Khmer has no spaces, so word breaks come from the browser's dictionary segmenter.
function words(text: string) {
  const seg = new Intl.Segmenter("km", { granularity: "word" });
  let at = 0;
  return [...seg.segment(text)].map(({ segment }) => {
    const start = at;
    at += segment.length;
    return { text: segment, start: start / text.length };
  });
}

export default function Listen() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const audio = useRef<HTMLAudioElement>(null);
  const clip = clips[index];
  const parts = useMemo(() => (ready ? words(clip.km) : null), [ready, clip.km]);

  useEffect(() => setReady(true), []);

  useEffect(() => {
    if (!playing) return;
    let frame = 0;
    const tick = () => {
      const a = audio.current;
      if (a && a.duration) setProgress(a.currentTime / a.duration);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [playing]);

  const toggle = () => {
    const a = audio.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => setPlaying(false));
    else a.pause();
  };

  const next = () => {
    audio.current?.pause();
    setPlaying(false);
    setProgress(0);
    setIndex((i) => (i + 1) % clips.length);
  };

  return (
    <div className="listen">
      <audio
        ref={audio}
        src={`/audio/${clip.id}.m4a`}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setProgress(1);
        }}
      />
      <button
        type="button"
        className={`listen-play${playing ? " is-playing" : ""}`}
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play this sentence in Samleng's voice"}
      >
        <svg viewBox="0 0 16 16" aria-hidden="true">
          {playing ? (
            <path d="M4.5 3h2.5v10H4.5zM9 3h2.5v10H9z" fill="currentColor" />
          ) : (
            <path d="M5 2.8v10.4a.6.6 0 0 0 .9.5l8.2-5.2a.6.6 0 0 0 0-1L5.9 2.3a.6.6 0 0 0-.9.5Z" fill="currentColor" />
          )}
        </svg>
      </button>
      <div className="listen-body">
        <p className="listen-km" lang="km">
          {parts
            ? parts.map((w, i) => (
                <span key={i} className={progress > w.start ? "on" : undefined}>
                  {w.text}
                </span>
              ))
            : clip.km}
        </p>
        <div className="listen-line">
          <span style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
      <button type="button" className="listen-next" onClick={next} aria-label="Next sentence">
        <svg viewBox="0 0 16 16" aria-hidden="true">
          <path d="M6 3.5 10.5 8 6 12.5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}
