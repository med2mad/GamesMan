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
            $table->integer('played')->default(0);
            $table->string('genre1')->nullable();
            $table->string('genre2')->nullable();
            $table->text('instructions')->nullable();
            $table->foreignId('userId')->constrained('users')->nullable()->default(null)->nullOnDelete();
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
