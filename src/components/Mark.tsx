import { MARK_SHAPES } from "@/lib/mark";

export default function Mark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <g fill="var(--bg)" dangerouslySetInnerHTML={{ __html: MARK_SHAPES }} />
    </svg>
  );
}
