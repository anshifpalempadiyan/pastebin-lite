import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
    await clientPromise
  return NextResponse.json({ ok: true },{ status: 200 });
}
