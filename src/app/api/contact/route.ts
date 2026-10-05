import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check honeypot for spam bot detection
    if (body.honeypot) {
      return NextResponse.json({ success: true, message: "Message received" });
    }

    if (!body.name || !body.email || !body.phone || !body.message) {
      return NextResponse.json(
        { success: false, message: "All required fields must be supplied" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Our team will contact you shortly.",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to submit contact message";
    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}
