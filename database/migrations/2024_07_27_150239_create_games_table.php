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
            $table->timestamps();
            $table->string('name');
            $table->string('file');
            $table->string('url')->nullable();
            $table->string('image')->nullable()->default('none.jpg');
            $table->boolean('valid')->default(false);
            $table->integer('popularity')->default(0);
            $table->string('origin')->nullable();
            $table->string('owner')->nullable();
            $table->string('category')->nullable();
            $table->string('date')->nullable();
            $table->text('description')->nullable();
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
