import { NextResponse } from "next/server";
import { getAllBlogPosts } from "@/app/lib/blog";

export async function GET() {
  try {
    const posts = getAllBlogPosts().slice(0, 3);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Failed to fetch blog posts:", error);
    return NextResponse.json([]);
  }
}
