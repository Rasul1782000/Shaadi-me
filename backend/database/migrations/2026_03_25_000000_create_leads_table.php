<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('bride_name')->nullable();
            $table->string('groom_name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('community')->nullable();
            $table->string('city')->nullable();
            $table->string('wedding_date')->nullable();
            $table->string('guests')->nullable();
            $table->string('venue_type')->nullable();
            $table->integer('budget')->nullable();
            $table->json('styles')->nullable();
            $table->json('services')->nullable();
            $table->json('events')->nullable();
            $table->text('notes')->nullable();
            $table->string('referral')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('leads');
    }
};
