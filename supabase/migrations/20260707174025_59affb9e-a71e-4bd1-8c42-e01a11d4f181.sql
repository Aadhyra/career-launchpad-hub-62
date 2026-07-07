
CREATE TABLE IF NOT EXISTS public.doctor_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  doctor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week BETWEEN 0 AND 6),
  start_time TIME NOT NULL, end_time TIME NOT NULL,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.doctor_availability TO authenticated;
GRANT ALL ON public.doctor_availability TO service_role;
ALTER TABLE public.doctor_availability ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Auth users view availability" ON public.doctor_availability FOR SELECT TO authenticated USING (true);
CREATE POLICY "Doctors manage availability" ON public.doctor_availability FOR ALL USING (auth.uid() = doctor_id) WITH CHECK (auth.uid() = doctor_id);

CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  appointment_date DATE NOT NULL, appointment_time TIME NOT NULL,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled','completed','cancelled','no_show')),
  symptoms TEXT, notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.appointments TO authenticated;
GRANT ALL ON public.appointments TO service_role;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Patients view own appts" ON public.appointments FOR SELECT USING (auth.uid() = patient_id);
CREATE POLICY "Doctors view own appts" ON public.appointments FOR SELECT USING (auth.uid() = doctor_id);
CREATE POLICY "Patients create appts" ON public.appointments FOR INSERT WITH CHECK (auth.uid() = patient_id);
CREATE POLICY "Parties update appts" ON public.appointments FOR UPDATE USING (auth.uid() = patient_id OR auth.uid() = doctor_id) WITH CHECK (auth.uid() = patient_id OR auth.uid() = doctor_id);

CREATE TABLE IF NOT EXISTS public.prescriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  appointment_id UUID REFERENCES public.appointments(id) ON DELETE CASCADE NOT NULL,
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  medications JSONB NOT NULL DEFAULT '[]',
  instructions TEXT, issued_at TIMESTAMPTZ DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.prescriptions TO authenticated;
GRANT ALL ON public.prescriptions TO service_role;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Patients view own rx" ON public.prescriptions FOR SELECT USING (auth.uid() = patient_id);
CREATE POLICY "Doctors manage own rx" ON public.prescriptions FOR ALL USING (auth.uid() = doctor_id) WITH CHECK (auth.uid() = doctor_id);

CREATE TABLE IF NOT EXISTS public.medical_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  doctor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  record_type TEXT NOT NULL, description TEXT, file_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.medical_records TO authenticated;
GRANT ALL ON public.medical_records TO service_role;
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Patients manage own records" ON public.medical_records FOR ALL USING (auth.uid() = patient_id) WITH CHECK (auth.uid() = patient_id);
CREATE POLICY "Doctors view patient records" ON public.medical_records FOR SELECT USING (auth.uid() = doctor_id);

CREATE TABLE IF NOT EXISTS public.project_bids (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.live_projects(id) ON DELETE CASCADE NOT NULL,
  freelancer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  bid_amount INTEGER NOT NULL, cover_letter TEXT, estimated_days INTEGER,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','accepted','rejected')),
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(project_id, freelancer_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_bids TO authenticated;
GRANT ALL ON public.project_bids TO service_role;
ALTER TABLE public.project_bids ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Freelancers view own bids" ON public.project_bids FOR SELECT USING (auth.uid() = freelancer_id);
CREATE POLICY "Freelancers create bids" ON public.project_bids FOR INSERT WITH CHECK (auth.uid() = freelancer_id);
CREATE POLICY "Freelancers update own bids" ON public.project_bids FOR UPDATE USING (auth.uid() = freelancer_id) WITH CHECK (auth.uid() = freelancer_id);

CREATE TABLE IF NOT EXISTS public.freelancer_earnings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.live_projects(id) ON DELETE SET NULL,
  amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','cleared','withdrawn')),
  created_at TIMESTAMPTZ DEFAULT now(), cleared_at TIMESTAMPTZ
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.freelancer_earnings TO authenticated;
GRANT ALL ON public.freelancer_earnings TO service_role;
ALTER TABLE public.freelancer_earnings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Freelancers view own earnings" ON public.freelancer_earnings FOR SELECT USING (auth.uid() = freelancer_id);

CREATE TABLE IF NOT EXISTS public.project_milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.live_projects(id) ON DELETE CASCADE NOT NULL,
  freelancer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL, description TEXT, amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','in_progress','completed','approved')),
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.project_milestones TO authenticated;
GRANT ALL ON public.project_milestones TO service_role;
ALTER TABLE public.project_milestones ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Freelancers manage own milestones" ON public.project_milestones FOR ALL USING (auth.uid() = freelancer_id) WITH CHECK (auth.uid() = freelancer_id);

CREATE TABLE IF NOT EXISTS public.freelancer_portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  freelancer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL, category TEXT NOT NULL,
  tech_stack TEXT[] DEFAULT '{}', image_url TEXT, live_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(), updated_at TIMESTAMPTZ DEFAULT now()
);
GRANT SELECT ON public.freelancer_portfolio_projects TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.freelancer_portfolio_projects TO authenticated;
GRANT ALL ON public.freelancer_portfolio_projects TO service_role;
ALTER TABLE public.freelancer_portfolio_projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public view portfolios" ON public.freelancer_portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Freelancers manage own portfolio" ON public.freelancer_portfolio_projects FOR ALL USING (auth.uid() = freelancer_id) WITH CHECK (auth.uid() = freelancer_id);
