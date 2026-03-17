import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req) {
  try {
    const data = await req.json();

    const { error } = await supabase.from("leads").insert([
      {
        service: data.service,
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        source: data.source || "enquiry",
      },
    ]);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
