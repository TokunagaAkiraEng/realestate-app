# realestate-app

## プロジェクト概要
このプロジェクトは不動産管理Webアプリです。

## 技術スタック
- React + Vite
- Supabase（認証）
- react-router-dom

## コーディング規約
- コメントは日本語で書く
- 変数名は英語のキャメルケース（例：userName）を使う

## 返答ルール
- 返答は必ず日本語で行う

## Git運用ルール
- コードに変更を加えたら、その都度コミットしてGitHubにプッシュすること。
- コミットメッセージは変更内容が分かるように簡潔に記載する。
- GitHubにプッシュする際は `.gitignore` で `node_modules` と `.env` を除外設定すること。

## デプロイ情報
- 本番URL：https://realestate-app-steel.vercel.app/
- Supabaseプロジェクト名：realestate-app

## 禁止事項
- `rm -rf` コマンドは絶対に実行しない
- `.env` ファイルを読んだり変更したりしない
- `package.json` の依存パッケージを無断で変更しない
- データベースへの削除操作（DELETE文）を実行しない
