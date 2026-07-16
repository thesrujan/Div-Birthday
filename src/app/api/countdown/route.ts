import { NextRequest, NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const filePath = join(process.cwd(), "public", "countdown.json");

export async function GET() {
  try {
    const data = JSON.parse(readFileSync(filePath, "utf-8"));
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Failed to read countdown" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const current = JSON.parse(readFileSync(filePath, "utf-8"));
    const updated = { ...current, ...body };
    writeFileSync(filePath, JSON.stringify(updated, null, 2));
    return NextResponse.json({ success: true, data: updated });
  } catch {
    return NextResponse.json({ error: "Failed to update countdown" }, { status: 500 });
  }
}
