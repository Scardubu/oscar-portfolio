import { NextResponse } from "next/server";

export async function GET() {
  try {
    // TODO: Replace with actual database query when available
    // Example: const result = await db.query('SELECT COUNT(*) FROM predictions WHERE DATE(created_at) = CURRENT_DATE');

    // Mock data for demonstration (randomized within realistic range)
    const todayPredictions = Math.floor(Math.random() * 500) + 800;

    return NextResponse.json(
      {
        todayPredictions,
        systemStatus: "operational",
        uptime: 99.94,
      },
      {
        status: 200,
        headers: {
          // Short-lived cache to simulate near-real-time updates
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch metrics:", error);
    return NextResponse.json(
      { todayPredictions: null, systemStatus: "unknown" },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  }
}
