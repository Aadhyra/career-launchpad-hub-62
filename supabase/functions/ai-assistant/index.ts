// Aadhyra AI assistant — answers career, course, placement questions and suggests routes
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `You are Aadhyra Assistant — a friendly, concise helper for Aadhyra Innovations / Shiksha Nex Technologies.

You help visitors with:
- Courses (IT, HR, Digital Marketing, Graphic Design, Nursing, Gen AI + ML combo)
- Internships (paid, mandatory HR live tasks, stipends)
- Placement services: Talent Connect, Tech Partner, Health Connect, AI Lab
- Career / Jobs (BDE, BDM, Counselors, Sales)
- Degree programs via IGNOU / JAIN / TNOU / KAOU / BSS (₹30,000 / sem)
- Certificate verification, AI Interview (₹499)
- Project Marketplace (₹5,000 per project)

Rules:
1. Keep answers under 4 short sentences. Be warm and helpful.
2. When relevant, END your reply with a single route suggestion using this EXACT tag on its own line:
   [ROUTE:/path|Button Label]
   Only ONE route tag per reply. Choose from:
   /courses, /internships, /internships/enroll, /career, /apply, /placement,
   /placement/talent-connect, /placement/tech-partner, /placement/health-connect,
   /placement/ai-lab, /hr-training, /contact, /about, /auth, /campus-drive
3. If the user asks something outside our scope (medical advice, legal, unrelated), politely redirect them to /contact.
4. Never invent prices. Known prices: Course fee ₹30,000/sem (degrees), AI Interview ₹499, Projects ₹5,000, Fresher career fee ₹899, Experienced ₹999. Gen AI + ML combo: ₹40,000 → ₹19,999 (50% scholarship).
5. Do not mention competitors or other brands.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  try {
    const { messages } = await req.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "messages array required" }), { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages.slice(-12)],
      }),
    });

    if (r.status === 429) return new Response(JSON.stringify({ error: "Busy, try again in a moment." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (r.status === 402) return new Response(JSON.stringify({ error: "AI credits exhausted." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    if (!r.ok) throw new Error(await r.text());

    const data = await r.json();
    const text = data.choices?.[0]?.message?.content || "Sorry, I couldn't respond. Please try again.";
    return new Response(JSON.stringify({ text }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
  } catch (err) {
    console.error("ai-assistant error:", err);
    return new Response(JSON.stringify({ error: (err as Error).message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
});