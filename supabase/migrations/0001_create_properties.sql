-- gen_random_uuid() を使うための拡張機能を有効化する
create extension if not exists pgcrypto;

-- 物件情報を保存するテーブルを作成する
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  rent integer not null,
  area text not null,
  layout text not null,
  created_at timestamptz not null default now()
);

-- 自分が登録した物件を検索しやすくするためのインデックス
create index if not exists properties_user_id_idx on public.properties (user_id);

-- RLS（行単位セキュリティ）を有効化する
alter table public.properties enable row level security;

-- 自分が登録した物件のみ閲覧できる
create policy "Users can view their own properties"
  on public.properties
  for select
  using (auth.uid() = user_id);

-- 物件を登録する際は、登録者（user_id）が自分自身であることを必須にする
create policy "Users can insert their own properties"
  on public.properties
  for insert
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ更新できる
create policy "Users can update their own properties"
  on public.properties
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- 自分が登録した物件のみ削除できる
create policy "Users can delete their own properties"
  on public.properties
  for delete
  using (auth.uid() = user_id);
