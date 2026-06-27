<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->renameColumn('guest_count', 'guests');
            $table->renameColumn('wedding_type', 'venue_type');
            $table->dropColumn('planning_preference');
        });
    }

    public function down(): void
    {
        Schema::table('leads', function (Blueprint $table) {
            $table->renameColumn('guests', 'guest_count');
            $table->renameColumn('venue_type', 'wedding_type');
            $table->text('planning_preference')->nullable()->after('budget');
        });
    }
};
