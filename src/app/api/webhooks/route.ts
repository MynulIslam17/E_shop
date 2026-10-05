import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    console.log("[Incoming Webhook Event]", payload);

    return NextResponse.json({
      received: true,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Webhook processing failed";
    return NextResponse.json(
      { success: false, message },
      { status: 400 }
    );
  }
}
