<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('leads', function (Blueprint $user) {
            $user->id();
            $user->string('bride_name');
            $user->string('groom_name');
            $user->string('phone');
            $user->string('wedding_date')->nullable();
            $user->string('budget')->nullable();
            $user->string('wedding_type')->nullable();
            $user->string('guest_count')->nullable();
            $user->text('planning_preference')->nullable();
            $user->string('city')->nullable();
            $user->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('leads');
    }
};
