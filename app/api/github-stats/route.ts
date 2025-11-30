import { NextResponse } from "next/server";

interface GitHubUserResponse {
  public_repos: number;
  followers: number;
}

interface ContributionDay {
  date: string;
  count: number;
}

interface ContributionsResponse {
  totalContributions?: number;
  contributions?: ContributionDay[];
}

export async function GET() {
  try {
    const [userRes, contribRes] = await Promise.all([
      fetch("https://api.github.com/users/Scardubu", {
        // Rely on unauthenticated requests with caching; fine for low-traffic portfolio
        next: { revalidate: 3600 },
      }),
      fetch("https://github-contributions-api.deno.dev/Scardubu.json", {
        next: { revalidate: 3600 },
      }),
    ]);

    if (!userRes.ok) {
      throw new Error("Failed to fetch GitHub user data");
    }

    const userJson = (await userRes.json()) as GitHubUserResponse;
    let contributionsJson: ContributionsResponse | null = null;

    if (contribRes.ok) {
      contributionsJson = (await contribRes.json()) as ContributionsResponse;
    }

    const currentYear = new Date().getFullYear();
    const currentYearContributions =
      contributionsJson?.contributions?.reduce((sum, day) => {
        const year = new Date(day.date).getFullYear();
        return year === currentYear ? sum + (day.count || 0) : sum;
      }, 0) ?? 350;

    const payload = {
      publicRepos: userJson.public_repos ?? 12,
      followers: userJson.followers ?? 45,
      currentYearContributions,
    };

    return NextResponse.json(payload, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    console.error("Error fetching GitHub stats", error);
    return NextResponse.json(
      {
        publicRepos: 12,
        followers: 45,
        currentYearContributions: 350,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=300",
        },
      }
    );
  }
}
