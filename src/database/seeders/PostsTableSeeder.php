<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PostsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'title' => 'JavaScript学習始めました',
            'content' => 'コメント管理APIの作成にチャレンジ中。',
        ];
        DB::table('posts')->insert($param);
        $param = [
            'title' => 'UI作成しました',
            'content' => 'marginをたくさん使っている。ちょっと不安。',
        ];
        DB::table('posts')->insert($param);
        $param = [
            'title' => '表示機能作成しました',
            'content' => '表示用の関数を最後に記述し忘れて表示しないエラーと20分格闘。',
        ];
        DB::table('posts')->insert($param);
        $param = [
            'title' => 'コメント追加機能作成しました',
            'content' => '自分の希望通りに動くと嬉しい。だからプログラミングはやめられない。',
        ];
        DB::table('posts')->insert($param);
    }
}
