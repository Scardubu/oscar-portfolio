import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Oscar Ndugbu - Full-Stack ML Engineer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0a0f",
          backgroundImage:
            "radial-gradient(circle at 25% 25%, #1a1a2e 0%, transparent 50%), radial-gradient(circle at 75% 75%, #0d1b2a 0%, transparent 50%)",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,217,255,0.15) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "40px",
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#ffffff",
              marginBottom: 16,
              letterSpacing: "-0.02em",
            }}
          >
            Oscar Ndugbu
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              background: "linear-gradient(90deg, #00d9ff, #0066ff)",
              backgroundClip: "text",
              color: "transparent",
              marginBottom: 32,
            }}
          >
            Full-Stack ML Engineer
          </div>

          {/* Stats row */}
          <div
            style={{
              display: "flex",
              gap: "48px",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: "#00d9ff",
                }}
              >
                350+
              </div>
              <div style={{ fontSize: 18, color: "#9ca3af" }}>
                Production Users
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: "#00d9ff",
                }}
              >
                71%
              </div>
              <div style={{ fontSize: 18, color: "#9ca3af" }}>ML Accuracy</div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: "#00d9ff",
                }}
              >
                99.9%
              </div>
              <div style={{ fontSize: 18, color: "#9ca3af" }}>Uptime</div>
            </div>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 24,
              color: "#d1d5db",
              maxWidth: "800px",
            }}
          >
            Building production AI systems that ship and stay shipped
          </div>

          {/* Domain */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              fontSize: 20,
              color: "#6b7280",
            }}
          >
            scardubu.dev
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
