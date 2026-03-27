import { ImageResponse } from "next/og";
export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div style={{
        display: "flex", flexDirection: "column",
        width: "100%", height: "100%",
        background: "linear-gradient(135deg, #0a0a0f 0%, #111118 100%)",
        padding: 80, fontFamily: "system-ui",
      }}>
        <div style={{ fontSize: 14, color: "rgba(99,102,241,1)",
          letterSpacing: 4, textTransform: "uppercase" }}>
          Staff Full-Stack ML Engineer
        </div>
        <div style={{ fontSize: 64, fontWeight: 700,
          color: "rgba(255,255,255,0.92)", marginTop: 16, lineHeight: 1.1 }}>
          Oscar Scardubu
        </div>
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.55)",
          marginTop: 24, maxWidth: 720 }}>
          Production AI/fintech systems — credit scoring, blockchain analytics, ML consulting.
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
          {["FastAPI", "XGBoost", "Redis", "Postgres", "Next.js"].map(tag => (
            <div key={tag} style={{
              fontSize: 14, color: "rgba(0,217,255,0.8)",
              border: "1px solid rgba(0,217,255,0.2)",
              borderRadius: 6, padding: "4px 12px", fontFamily: "monospace",
            }}>{tag}</div>
          ))}
        </div>
        <div style={{ marginTop: "auto", fontSize: 16, color: "rgba(255,255,255,0.32)" }}>
          scardubu.dev
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
