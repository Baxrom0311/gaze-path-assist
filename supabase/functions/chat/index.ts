// Edge function: chat with Claude Haiku via Anthropic API
import { corsHeaders } from "https://esm.sh/@supabase/supabase-js@2.95.0/cors";

interface Message { role: "user" | "assistant"; content: string }

const SYSTEM_PROMPT = `You are a helpful, concise, friendly assistant for EyeTracking — an assistive eye-tracking AAC startup based in Uzbekistan.

About the product:
- EyeTracking turns any standard Android tablet into an AAC (Augmentative and Alternative Communication) device controlled entirely by eye gaze.
- It uses the front camera + MediaPipe Face Mesh (468 landmarks) and a custom TensorFlow Lite model for on-device gaze detection.
- Users select symbols on an AAC board by dwelling (looking at a symbol for ~1.5 seconds). The app speaks the word using TTS in Uzbek, Russian, or English.
- 5-point calibration on first use; adaptive recalibration during sessions.
- A web caregiver dashboard lets caregivers customize symbol boards and view usage analytics.
- Working prototype is live at https://eyetracking.boos.uz.

Team: Jasur (Product Lead, AI), Dilnoza (UX/UI), Bobur (Frontend/Mobile), Nodira (Backend).

Roadmap: Idea ✅ → Prototype 🔵 (current) → MVP → Launch (NGOs, rehab centers in Uzbekistan).

Target users: people with ALS, cerebral palsy, spinal muscular atrophy, and other motor disabilities. Especially Uzbek speakers, since no native Uzbek AAC tools exist.

Rules:
- Always respond in the SAME LANGUAGE as the user's question (Uzbek, Russian, or English).
- Be warm, supportive, and concise (max 3-4 short paragraphs).
- If asked something you don't know, say so and suggest contacting the team.
- For partnership inquiries, encourage them to email or DM via the contact links.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const ANTHROPIC_API_KEY = Deno.env.get("ANTHROPIC_API_KEY");
    if (!ANTHROPIC_API_KEY) {
      return new Response(
        JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid request body" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const messages: Message[] = body.messages
      .filter((m: any) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-20) // limit history
      .map((m: Message) => ({ role: m.role, content: m.content.slice(0, 2000) }));

    if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
      return new Response(
        JSON.stringify({ error: "Last message must be from user" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const lang = typeof body.language === "string" ? body.language : "uz";
    const langHint = `\n\nThe user's interface language is: ${lang}. Default to that language unless their message is clearly in another language.`;

    const resp = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 600,
        system: SYSTEM_PROMPT + langHint,
        messages,
      }),
    });

    if (!resp.ok) {
      const errText = await resp.text();
      console.error("Anthropic error", resp.status, errText);
      if (resp.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limited. Please wait a moment." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // Fallback: try claude-3-5-haiku-latest if model not found
      if (resp.status === 404 || errText.includes("model")) {
        const retry = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "x-api-key": ANTHROPIC_API_KEY,
            "anthropic-version": "2023-06-01",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "claude-3-5-haiku-latest",
            max_tokens: 600,
            system: SYSTEM_PROMPT + langHint,
            messages,
          }),
        });
        if (retry.ok) {
          const data = await retry.json();
          const reply = data.content?.[0]?.text ?? "";
          return new Response(JSON.stringify({ reply }), {
            status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        const retryText = await retry.text();
        console.error("Retry also failed", retry.status, retryText);
      }
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const reply = data.content?.[0]?.text ?? "";
    return new Response(JSON.stringify({ reply }), {
      status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("chat function error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
