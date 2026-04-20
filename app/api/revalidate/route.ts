import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!secret || secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const payload = body as {
    _type?: string;
    slug?: string;
  };

  const type = payload?._type;
  const slug = payload?.slug;

  if (!type) {
    return NextResponse.json(
      { message: "Missing _type in payload" },
      { status: 400 }
    );
  }

  if (type === "technology") {
    revalidateTag("technologies", "max");
    if (slug) revalidateTag(`technology:${slug}`, "max");
  }

  if (type === "technologyCategory") {
    revalidateTag("technologyCategories", "max");
    revalidateTag("technologies", "max");
  }

  if (type === "blog") {
    revalidateTag("blogs", "max");
    if (slug) revalidateTag(`blog:${slug}`, "max");
  }

  if (type === "blogCategory") {
    revalidateTag("blogCategories", "max");
    revalidateTag("blogs", "max");
  }

  if (type === "project") {
    revalidateTag("projects", "max");
    if (slug) revalidateTag(`project:${slug}`, "max");
  }

  if (type === "projectCategory") {
    revalidateTag("projectCategories", "max");
    revalidateTag("projects", "max");
  }

  if (type === "testimonial") {
    revalidateTag("testimonials", "max");
  }

  return NextResponse.json({
    revalidated: true,
    type,
    slug: slug ?? null,
    now: Date.now(),
  });
}