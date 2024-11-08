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
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('file');
            $table->string('url')->nullable();
            $table->string('thumbnail')->default('none.jpg');
            $table->string('screenshot')->default('none.jpg');
            $table->boolean('valid')->default(false);
            $table->integer('popularity')->default(1);
            $table->string('genre')->nullable();
            $table->text('instructions')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
