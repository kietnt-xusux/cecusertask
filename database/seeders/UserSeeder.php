<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::updateOrCreate(['email' => 'admin@example.com'],[
            'name' => 'Admin',
            'name_kana' => 'アドミン',
            'email' => 'admin@example.com',
            'email_verified_at' => Date::now(),
            'role' => 'admin',
            'password' => Hash::make('admin123')
        ]);
        User::factory()->count(50)->create();
    }
}
