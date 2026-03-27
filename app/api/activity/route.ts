// app/api/activity/route.ts (Edge runtime)
export const runtime = "edge";

export async function GET() {
  const res = await fetch(
    "https://api.github.com/users/Scardubu/events/public?per_page=1",
    { headers: { Accept: "application/vnd.github+json" }, next: { revalidate: 300 } }
  );
  if (!res.ok) {
    return Response.json({ message: "Active development", repo: "oscar-portfolio", time: null });
  }
  const [event] = await res.json() as Array<{
    type: string;
    repo: { name: string };
    payload: { commits?: Array<{ message: string }> };
    created_at: string;
  }>;
  return Response.json({
    message: (event?.payload?.commits?.[0]?.message ?? "Active development").slice(0, 72),
    repo: event?.repo?.name ?? "oscar-portfolio",
    time: event?.created_at ?? null,
  });
}
