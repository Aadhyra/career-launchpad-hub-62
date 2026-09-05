DO $$
DECLARE t record;
BEGIN
  FOR t IN SELECT tablename FROM pg_tables WHERE schemaname='public' LOOP
    EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t.tablename);
    EXECUTE format('GRANT ALL ON public.%I TO service_role', t.tablename);
  END LOOP;
END $$;

GRANT SELECT ON public.courses TO anon;
GRANT SELECT ON public.course_categories TO anon;
GRANT SELECT ON public.course_modules TO anon;
GRANT SELECT ON public.live_projects TO anon;
GRANT SELECT ON public.job_postings TO anon;
GRANT SELECT ON public.jobs TO anon;
GRANT SELECT ON public.hr_internship_tasks TO anon;
GRANT SELECT ON public.internship_tasks TO anon;
GRANT SELECT ON public.certificates TO anon;
GRANT SELECT, INSERT ON public.contact_messages TO anon;
GRANT SELECT, INSERT ON public.college_registrations TO anon;
GRANT SELECT, INSERT ON public.campus_drive_requests TO anon;
GRANT SELECT, INSERT ON public.applications TO anon;
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;