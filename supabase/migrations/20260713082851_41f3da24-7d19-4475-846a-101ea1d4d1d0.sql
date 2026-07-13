
CREATE TABLE public.razorpay_debug_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event_type TEXT NOT NULL,
  order_id TEXT,
  payment_id TEXT,
  amount NUMERIC,
  currency TEXT,
  receipt TEXT,
  signature_provided TEXT,
  signature_expected TEXT,
  status TEXT NOT NULL DEFAULT 'info',
  error_message TEXT,
  raw_response JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.razorpay_debug_logs TO authenticated;
GRANT ALL ON public.razorpay_debug_logs TO service_role;

ALTER TABLE public.razorpay_debug_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view debug logs"
ON public.razorpay_debug_logs
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE INDEX idx_razorpay_debug_logs_created_at ON public.razorpay_debug_logs (created_at DESC);
