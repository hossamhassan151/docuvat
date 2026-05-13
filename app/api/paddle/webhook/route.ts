import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const secret = process.env.PADDLE_WEBHOOK_SECRET!;
    const signature = req.headers.get("paddle-signature") || "";
    const body = await req.text();

    // ─── Verify Signature ──────────────────────────────────────────
    const [tsPart, h1Part] = signature.split(";");
    const ts = tsPart?.split("=")[1];
    const h1 = h1Part?.split("=")[1];

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw", encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false, ["sign"]
    );
    const signedData = await crypto.subtle.sign(
      "HMAC", key, encoder.encode(`${ts}:${body}`)
    );
    const computedHmac = Array.from(new Uint8Array(signedData))
      .map((b) => b.toString(16).padStart(2, "0")).join("");

    if (computedHmac !== h1) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const event = JSON.parse(body);
    const eventType = event.event_type;
    const data = event.data;

    // ─── Handle Events ─────────────────────────────────────────────
    if (eventType === "subscription.activated") {
      const customerId = data.customer_id;
      const subscriptionId = data.id;

      // جيب الـ user عن طريق الـ customer_id
      const { data: profile } = await supabase
        .from("profiles")
        .select("id")
        .eq("paddle_customer_id", customerId)
        .single();

      if (profile) {
        await supabase
          .from("profiles")
          .update({
            plan: "pro",
            paddle_subscription_id: subscriptionId,
          })
          .eq("id", profile.id);
      }
    }

    if (eventType === "subscription.canceled") {
      const subscriptionId = data.id;

      await supabase
        .from("profiles")
        .update({ plan: "free", paddle_subscription_id: null })
        .eq("paddle_subscription_id", subscriptionId);
    }

    if (eventType === "subscription.updated") {
      const subscriptionId = data.id;
      const status = data.status;

      if (status === "active") {
        await supabase
          .from("profiles")
          .update({ plan: "pro" })
          .eq("paddle_subscription_id", subscriptionId);
      } else if (status === "canceled" || status === "paused") {
        await supabase
          .from("profiles")
          .update({ plan: "free" })
          .eq("paddle_subscription_id", subscriptionId);
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}