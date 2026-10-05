import { ImageResponse } from "next/og";

export const alt = "Revivo — AI Systems for Sport. Sport, intelligently built.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const lines = [70, 150, 230, 310, 390, 470, 550];
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#0B0F0C",
        color: "#F4F5EF",
        padding: 72,
        position: "relative",
        fontFamily: "sans-serif",
      }}
    >
      <svg width="1200" height="630" viewBox="0 0 1200 630" style={{ position: "absolute", top: 0, left: 0 }}>
        {lines.map((y) => (
          <path
            key={y}
            d={`M 560 ${y} C 800 ${y}, 860 315, 1030 315`}
            stroke="#3A453B"
            strokeWidth="2"
            fill="none"
          />
        ))}
        <path d="M 1030 315 H 1200" stroke="#3A453B" strokeWidth="2" />
        <rect x="1018" y="303" width="24" height="24" transform="rotate(45 1030 315)" fill="#CCFF00" />
      </svg>
      <div
        style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: 12 }}>REVIVO</div>
          <div style={{ fontSize: 22, letterSpacing: 6, color: "#A4AE9F", marginTop: 8 }}>
            AI SYSTEMS FOR SPORT
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 640 }}>
          <div style={{ fontSize: 58, fontWeight: 700, lineHeight: 1.05 }}>Sport, intelligently built.</div>
          <div style={{ fontSize: 26, color: "#A4AE9F", marginTop: 20, lineHeight: 1.4 }}>
            Custom AI, data and automation solutions for sports and fitness organizations.
          </div>
        </div>
      </div>
    </div>,
    size,
  );
}
