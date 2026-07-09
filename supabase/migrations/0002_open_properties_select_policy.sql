-- 物件一覧は登録者以外（ログイン済みの全ユーザー）にも公開する
-- ※ 編集・削除は引き続き登録者本人のみに制限する（既存ポリシーのまま）

drop policy if exists "Users can view their own properties" on public.properties;

create policy "Authenticated users can view all properties"
  on public.properties
  for select
  using (auth.uid() is not null);
