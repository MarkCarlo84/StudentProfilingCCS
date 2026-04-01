<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('academic_records', function (Blueprint $table) {
            $table->string('subject')->nullable()->after('semester');
            $table->string('course_code', 50)->nullable()->after('subject');
            $table->integer('units')->nullable()->after('course_code');
            $table->string('remarks')->nullable()->after('units');
        });
    }

    public function down(): void
    {
        Schema::table('academic_records', function (Blueprint $table) {
            $table->dropColumn(['subject', 'course_code', 'units', 'remarks']);
        });
    }
};
