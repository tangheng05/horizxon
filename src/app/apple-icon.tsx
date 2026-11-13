import { ImageResponse } from "next/og";
import { markSvg } from "@/lib/mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  const src = `data:image/svg+xml,${encodeURIComponent(markSvg("#111214", "#ECE8E1").replace('rx="8"', ""))}`;
  return new ImageResponse(<img src={src} width={180} height={180} alt="" />, size);
}
