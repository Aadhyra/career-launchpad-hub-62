import { createClient } from 'npm:@supabase/supabase-js@2';

Deno.serve(async () => {
  const admin = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const { data: list, error: listErr } = await admin.auth.admin.listUsers({ page: 1, perPage: 200 });
  if (listErr) return new Response(JSON.stringify({ error: listErr.message }), { status: 500 });

  const target = list.users.find((u) => u.email === 'rgmprasanth@gmail.com');
  if (!target) return new Response(JSON.stringify({ error: 'user not found' }), { status: 404 });

  const { error } = await admin.auth.admin.updateUserById(target.id, {
    password: 'Aadhyra#Admin2026',
    email_confirm: true,
  });

  return new Response(JSON.stringify({ ok: !error, error: error?.message ?? null }), {
    headers: { 'Content-Type': 'application/json' },
  });
});
