<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('termins', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('group_id');
            $table->dateTime('termin');
            $table->string('thema');
            $table->integer('duration');
            $table->string('street');
            $table->string('postcode');
            $table->string('location');
            $table->timestamps();

            $table->foreign('group_id')->references('id')->on('groups')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('termins');
    }
};
