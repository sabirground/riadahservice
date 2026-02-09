import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const data = await req.json();
    console.log("Received lead data:", data);

    const { error } = await supabase.from("leads").insert([
      {
        service: data.service,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        source: data.source || "enquiry", // Default to enquiry if not specified
      },
    ]);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    console.log("Lead saved successfully");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
