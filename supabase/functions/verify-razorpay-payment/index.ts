import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const adminClient = () =>
  createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    { auth: { persistSession: false } }
  )

async function logEvent(row: Record<string, unknown>) {
  try {
    await adminClient().from('razorpay_debug_logs').insert(row)
  } catch (e) {
    console.error('debug log insert failed', e)
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  let razorpay_order_id: string | undefined
  let razorpay_payment_id: string | undefined
  let razorpay_signature: string | undefined
  try {
    const body = await req.json()
    razorpay_order_id = body.razorpay_order_id
    razorpay_payment_id = body.razorpay_payment_id
    razorpay_signature = body.razorpay_signature

    const key_secret = Deno.env.get('RAZORPAY_KEY_SECRET')

    if (!razorpay_order_id || !razorpay_payment_id) {
      throw new Error('Missing required payment verification fields')
    }

    // DEMO MODE: no secret configured OR order came from demo mode — auto-verify.
    if (!key_secret || razorpay_order_id.startsWith('order_demo_')) {
      await logEvent({
        event_type: 'verify',
        status: 'success',
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        signature_provided: razorpay_signature ?? null,
        error_message: 'DEMO MODE — signature check skipped',
      })
      return new Response(
        JSON.stringify({ success: true, demo_mode: true, message: 'Demo payment verified' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 },
      )
    }

    if (!razorpay_signature) {
      throw new Error('Missing required payment verification fields')
    }

    const text = `${razorpay_order_id}|${razorpay_payment_id}`;
    
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key_secret);
    const cryptoKey = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    
    const textData = encoder.encode(text);
    const signatureBuffer = await crypto.subtle.sign("HMAC", cryptoKey, textData);
    
    const signatureArray = Array.from(new Uint8Array(signatureBuffer));
    const generated_signature = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (generated_signature !== razorpay_signature) {
      await logEvent({
        event_type: 'verify',
        status: 'failed',
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
        signature_provided: razorpay_signature,
        signature_expected: generated_signature,
        error_message: 'Invalid payment signature',
      })
      throw new Error('Invalid payment signature')
    }

    await logEvent({
      event_type: 'verify',
      status: 'success',
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      signature_provided: razorpay_signature,
      signature_expected: generated_signature,
    })

    return new Response(
      JSON.stringify({ success: true, message: 'Payment verified successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    await logEvent({
      event_type: 'verify',
      status: 'failed',
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      signature_provided: razorpay_signature,
      error_message: (error as Error).message,
    })
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
