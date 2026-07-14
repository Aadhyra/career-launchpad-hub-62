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

  let amount: number | undefined
  let currency = 'INR'
  let receipt = 'receipt_1'
  try {
    const body = await req.json()
    amount = body.amount
    currency = body.currency ?? 'INR'
    receipt = body.receipt ?? 'receipt_1'

    const key_id = Deno.env.get('RAZORPAY_KEY_ID')
    const key_secret = Deno.env.get('RAZORPAY_KEY_SECRET')

    if (!key_id || !key_secret) {
      // DEMO MODE: keys not configured — return a mock order so the UI flow works end-to-end.
      const demoOrder = {
        id: `order_demo_${crypto.randomUUID().replace(/-/g, '').slice(0, 14)}`,
        entity: 'order',
        amount: Math.round((amount ?? 0) * 100),
        amount_paid: 0,
        amount_due: Math.round((amount ?? 0) * 100),
        currency,
        receipt,
        status: 'created',
        demo_mode: true,
        key_id: 'rzp_test_demo',
      }
      await logEvent({
        event_type: 'order_created',
        status: 'success',
        order_id: demoOrder.id,
        amount,
        currency,
        receipt,
        error_message: 'DEMO MODE — Razorpay keys not configured',
        raw_response: demoOrder,
      })
      return new Response(JSON.stringify(demoOrder), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      })
    }

    const auth = btoa(`${key_id}:${key_secret}`)
    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`
      },
      body: JSON.stringify({
        amount: Math.round((amount ?? 0) * 100),
        currency,
        receipt,
      })
    })

    const order = await response.json()

    if (!response.ok) {
      await logEvent({
        event_type: 'order_created',
        status: 'failed',
        amount,
        currency,
        receipt,
        error_message: order.error?.description || 'Failed to create Razorpay order',
        raw_response: order,
      })
      throw new Error(order.error?.description || 'Failed to create Razorpay order')
    }

    await logEvent({
      event_type: 'order_created',
      status: 'success',
      order_id: order.id,
      amount,
      currency,
      receipt,
      raw_response: order,
    })

    return new Response(
      JSON.stringify(order),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    await logEvent({
      event_type: 'order_created',
      status: 'failed',
      amount,
      currency,
      receipt,
      error_message: (error as Error).message,
    })
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})
