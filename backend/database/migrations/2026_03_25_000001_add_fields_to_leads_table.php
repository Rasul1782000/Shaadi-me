<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->string('email')->after('groom_name');
            $table->string('community')->nullable()->after('phone');
            $table->json('styles')->nullable()->after('budget');
            $table->json('services')->nullable()->after('styles');
            $table->json('events')->nullable()->after('services');
            $table->text('notes')->nullable()->after('events');
            $table->string('referral')->nullable()->after('notes');
            $table->string('venue_preference')->nullable()->after('city');
        });
    }

    public function down(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->dropColumn([
                'email',
                'community',
                'styles',
                'services',
                'events',
                'notes',
                'referral',
                'venue_preference',
            ]);
        });
    }
};
