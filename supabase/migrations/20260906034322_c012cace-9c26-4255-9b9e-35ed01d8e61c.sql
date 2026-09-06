DROP POLICY IF EXISTS "Anyone can view project files" ON storage.objects;

CREATE POLICY "Buyers and admins view project files" ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'project-files' AND (
    public.is_admin()
    OR EXISTS (
      SELECT 1 FROM public.project_purchases pp
      WHERE pp.user_id = auth.uid() AND pp.status = 'success'
    )
  )
);

DROP POLICY IF EXISTS "Authenticated users can view questions" ON public.interview_questions;

CREATE POLICY "Paid candidates and admins view questions" ON public.interview_questions FOR SELECT TO authenticated
USING (
  public.is_admin()
  OR EXISTS (
    SELECT 1 FROM public.interview_attempts ia
    WHERE ia.user_id = auth.uid()
      AND ia.status IN ('in_progress', 'completed')
      AND (ia.course_id = interview_questions.course_id OR interview_questions.course_id IS NULL)
  )
  OR EXISTS (
    SELECT 1 FROM public.interview_fee_payments p
    WHERE p.user_id = auth.uid() AND p.status = 'success'
  )
);