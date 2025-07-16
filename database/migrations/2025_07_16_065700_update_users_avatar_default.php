<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Update all users with NULL avatar to have default avatar
        \DB::table('users')
            ->whereNull('avatar')
            ->orWhere('avatar', '')
            ->update([
                'avatar' => 'https://via.placeholder.com/100x100.png/005555?text=user'
            ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Revert all default avatars back to NULL
        \DB::table('users')
            ->where('avatar', 'https://via.placeholder.com/100x100.png/005555?text=user')
            ->update([
                'avatar' => null
            ]);
    }
};
