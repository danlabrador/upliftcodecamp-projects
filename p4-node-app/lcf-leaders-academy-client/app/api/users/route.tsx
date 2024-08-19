import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export function GET(_: NextRequest) {
  return NextResponse.json({
    message: "Hello from the API!",
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const validation = schema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(
      { message: "Invalid input", errors: validation.error.errors },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message: "User created",
      user: body,
    },
    { status: 201 }
  );
}
