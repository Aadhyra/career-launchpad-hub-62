
CREATE TABLE IF NOT EXISTS public.applicant_details (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  application_type TEXT NOT NULL CHECK (application_type IN ('internship','course','job','ambassador','placement')),
  reference_id TEXT,
  full_name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT NOT NULL, domain TEXT,
  perm_door_no TEXT, perm_street TEXT, perm_area TEXT, perm_landmark TEXT,
  perm_city TEXT, perm_pincode TEXT, perm_district TEXT, perm_state TEXT, perm_country TEXT,
  pres_door_no TEXT, pres_street TEXT, pres_area TEXT, pres_landmark TEXT,
  pres_city TEXT, pres_pincode TEXT, pres_district TEXT, pres_state TEXT, pres_country TEXT,
  same_as_permanent BOOLEAN NOT NULL DEFAULT false,
  team_leader_name TEXT, hr_name TEXT, date_of_joining DATE, salary_package TEXT,
  father_name TEXT, father_mobile TEXT,
  mother_name TEXT, mother_mobile TEXT,
  guardian_name TEXT, guardian_mobile TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.applicant_details TO authenticated;
GRANT ALL ON public.applicant_details TO service_role;
ALTER TABLE public.applicant_details ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own applicant details" ON public.applicant_details FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins view all applicant details" ON public.applicant_details FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE IF NOT EXISTS public.applicant_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  applicant_detail_id UUID REFERENCES public.applicant_details(id) ON DELETE SET NULL,
  document_type TEXT NOT NULL CHECK (document_type IN ('resume','aadhaar','pan','photo','education','bank_passbook','experience_letter','other')),
  file_name TEXT NOT NULL, storage_path TEXT NOT NULL, mime_type TEXT, size_bytes BIGINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.applicant_documents TO authenticated;
GRANT ALL ON public.applicant_documents TO service_role;
ALTER TABLE public.applicant_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage their own documents" ON public.applicant_documents FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins view all documents" ON public.applicant_documents FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trg_applicant_details_updated BEFORE UPDATE ON public.applicant_details FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX IF NOT EXISTS idx_applicant_details_user ON public.applicant_details(user_id);
CREATE INDEX IF NOT EXISTS idx_applicant_details_type ON public.applicant_details(application_type);
CREATE INDEX IF NOT EXISTS idx_applicant_documents_user ON public.applicant_documents(user_id);
