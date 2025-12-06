<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'post_id' => '1',
            'name' => 'テスト太郎',
            'content' => '私も始めました。',
        ];
        DB::table('comments')->insert($param);
        $param = [
            'post_id' => '1',
            'name' => 'テスト次郎',
            'content' => '一緒に頑張りましょう。',
        ];
        DB::table('comments')->insert($param);
        $param = [
            'post_id' => '2',
            'name' => 'テスト次郎',
            'content' => '横で使うと、画面縮小した時レイアウトが崩れやすいです。',
        ];
        DB::table('comments')->insert($param);
        $param = [
            'post_id' => '2',
            'name' => 'テスト花子',
            'content' => '[%]表示を使うと、画面全体の大きさに自動調整されて便利ですよ。',
        ];
        DB::table('comments')->insert($param);
        $param = [
            'post_id' => '3',
            'name' => 'テスト太郎',
            'content' => 'あるあるですね。',
        ];
        DB::table('comments')->insert($param);
        $param = [
            'post_id' => '3',
            'name' => 'テスト次郎',
            'content' => '私はhtmlファイルでjsファイルを読み込み忘れてエラーと格闘したことがあります。',
        ];
        DB::table('comments')->insert($param);
        $param = [
            'post_id' => '4',
            'name' => 'テスト次郎',
            'content' => 'この楽しさに気づいてくれる人が少ないので、仲間がいて嬉しいです。',
        ];
        DB::table('comments')->insert($param);
        $param = [
            'post_id' => '4',
            'name' => 'テスト花子',
            'content' => '私もその域まで行けるよう頑張ります。',
        ];
        DB::table('comments')->insert($param);
    }
}
