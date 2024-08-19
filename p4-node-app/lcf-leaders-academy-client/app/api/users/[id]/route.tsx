import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: number };
}

export function GET(req: NextRequest, { params: { id } }: Props) {
  if (id > 10) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({
    user: "User " + id,
  });
}
