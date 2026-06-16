create table if not exists public.workstation_state (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.workstation_state enable row level security;

drop policy if exists "workstation_select_own" on public.workstation_state;
drop policy if exists "workstation_insert_own" on public.workstation_state;
drop policy if exists "workstation_update_own" on public.workstation_state;
drop policy if exists "workstation_delete_own" on public.workstation_state;

create policy "workstation_select_own"
on public.workstation_state
for select
using (auth.uid() = user_id);

create policy "workstation_insert_own"
on public.workstation_state
for insert
with check (auth.uid() = user_id);

create policy "workstation_update_own"
on public.workstation_state
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "workstation_delete_own"
on public.workstation_state
for delete
using (auth.uid() = user_id);
