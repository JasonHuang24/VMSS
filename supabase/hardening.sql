-- Supabase hardening for the VMSS entry-application backend.
--
-- Run this ONCE in the Supabase SQL editor (dashboard → SQL) after the
-- project is restored. The site code (script.js) and the keep-alive
-- workflow both assume these objects exist:
--
--   * public.application_count()          — RPC used by loadApplicantCount()
--   * public.recent_applicant_locations   — view used by loadRecentApplicants()
--                                           and the keep-alive ping
--
-- What this fixes (2026-07 security audit, findings 1 and 2):
--   1. Anonymous clients could SELECT every column of applications —
--      names, phone numbers, motivations. Reads now go through an
--      aggregate function and a city/country-only view; direct reads
--      are revoked. Anonymous INSERT (the join form) keeps working.
--   2. Server-side payload constraints so direct REST calls can't insert
--      oversized or nonsensical rows.

-- 1 ─ Lock down direct reads ------------------------------------------------

alter table public.applications enable row level security;

revoke select on table public.applications from anon, authenticated;

-- Review policies in the dashboard afterwards: keep the anon INSERT policy,
-- drop any SELECT policy scoped to anon/authenticated. If a fresh project
-- has no INSERT policy yet, create it:
--
--   create policy "anon_insert_applications" on public.applications
--     for insert to anon with check (true);

-- 2a ─ Aggregate count (loadApplicantCount) ----------------------------------

create or replace function public.application_count()
returns bigint
language sql
stable
security definer
set search_path = public
as $$
  select count(*) from public.applications;
$$;

revoke execute on function public.application_count() from public;
grant execute on function public.application_count() to anon, authenticated;

-- 2b ─ Sanitized recent-locations view (loadRecentApplicants + keep-alive) ---
-- Owner-rights view (the Postgres 15+ default): it bypasses RLS
-- deliberately, and exposes ONLY city/country/created_at — never names,
-- phones, or motivations.

create or replace view public.recent_applicant_locations as
  select city, country, created_at
  from public.applications
  order by created_at desc
  limit 5;

revoke all on table public.recent_applicant_locations from anon, authenticated;
grant select on table public.recent_applicant_locations to anon, authenticated;

-- 3 ─ Payload constraints (server-side backstop for the client checks) -------
-- NOT VALID: enforced for new rows only, so pre-existing rows can't block
-- the migration. Re-running this section on a table that already has the
-- constraints will error harmlessly — skip it in that case.

alter table public.applications
  add constraint applications_age_range check (age between 18 and 150) not valid;
alter table public.applications
  add constraint applications_full_name_len check (char_length(full_name) between 1 and 200) not valid;
alter table public.applications
  add constraint applications_city_len check (char_length(city) <= 120) not valid;
alter table public.applications
  add constraint applications_state_len check (char_length(state) <= 120) not valid;
alter table public.applications
  add constraint applications_country_len check (char_length(country) <= 120) not valid;
alter table public.applications
  add constraint applications_phone_len check (char_length(phone) <= 40) not valid;
alter table public.applications
  add constraint applications_motivation_len check (char_length(motivation) <= 5000) not valid;
