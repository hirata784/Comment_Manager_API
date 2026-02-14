# practice-js-rest-blog(ブログ画面)

- 学習内容：JavaScript + Laravel API 連携
- 作成時期：2025年11月
- 練習テーマ：CRUD / RESTful / バリデーションエラー / 検索機能 / ページ遷移機能 / コメント機能

## 環境構築

Dockerビルド

1. git clone git@github.com:hirata784/practice-js-rest-blog.git
2. DockerDesktopアプリを立ち上げる
3. cd practice-js-rest-blog
4. docker-compose up -d --build

＊MySQLは、OSによって起動しない場合があるのでそれぞれのPCに合わせてdocker-compose.ymlファイルを編集して下さい。

## Laravel環境構築

1. docker-compose exec php bash
2. composer install
3. cp .env.example .env
4. .envに以下の環境変数を変更する

```text
DB_HOST=mysql
DB_DATABASE=laravel_db
DB_USERNAME=laravel_user
DB_PASSWORD=laravel_pass
```

5. アプリケーションキーの作成

```bash
php artisan key:generate
```

6. マイグレーションの実行

```bash
php artisan migrate
```

7. シーディングの実行

```bash
php artisan db:seed
```

コンテナを起動した状態で[http://localhost/index.html]と打ち込むと画面が開きます。

## 使用方法

ブログにコメントを投稿できます。内容はDBへ保存されます。  
投稿内容の追加、更新はできません。

1. 投稿ID検索  
   投稿内容を検索できます。数値を入力してください。  
   postsテーブルのidを検索し、ヒットしたデータを画面に表示します。

2. 投稿内容  
   投稿内容のタイトルと内容を表示します。

3. コメント一覧  
   表示中の投稿内容に対するコメントが表示されます。  
   投稿したコメントは編集・削除することができます。

4. 入力フォーム  
   名前とコメントを入力後、「追加」ボタンでコメントを投稿することができます。  
   両者とも入力していないと、投稿できません。

5. 投稿一覧  
   投稿されているブログタイトルが表示されます。クリックすると、該当ページが表示されます。

## その他の機能

・「編集」ボタンを押すと、編集モードに入ります。編集モード中は、該当行以外の編集はできません。  
「保存」ボタンで、編集内容を保存できます。「取消」ボタンで、編集モードをキャンセルできます。

## 使用技術

- PHP 7.4.9
- Laravel 8.83.29
- MySQL 8.0.26
