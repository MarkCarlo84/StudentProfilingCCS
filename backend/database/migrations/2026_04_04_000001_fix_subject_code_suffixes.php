<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        // Step 1: Drop the old single-column unique constraint FIRST
        // so renaming CCS101-IT and CCS101-CS to CCS101 doesn't violate it
        Schema::table('subjects', function (Blueprint $table) {
            $table->dropUnique(['subject_code']);
        });

        // Step 2: Remove -IT and -CS suffixes from subject codes and pre_requisite references
        $subjects = DB::table('subjects')->get();

        foreach ($subjects as $subject) {
            $cleanCode = preg_replace('/-(IT|CS)$/', '', $subject->subject_code);
            $cleanPreReq = $subject->pre_requisite
                ? preg_replace('/-(IT|CS)\b/', '', $subject->pre_requisite)
                : null;

            if ($cleanCode !== $subject->subject_code || $cleanPreReq !== $subject->pre_requisite) {
                // Check if a subject with the clean code AND same program already exists
                $exists = DB::table('subjects')
                    ->where('subject_code', $cleanCode)
                    ->where('program', $subject->program)
                    ->where('id', '!=', $subject->id)
                    ->exists();

                if ($exists) {
                    // True duplicate for same program — delete the suffixed one
                    DB::table('subjects')->where('id', $subject->id)->delete();
                } else {
                    DB::table('subjects')->where('id', $subject->id)->update([
                        'subject_code'  => $cleanCode,
                        'pre_requisite' => $cleanPreReq,
                    ]);
                }
            }
        }

        // Step 3: Add composite unique constraint (subject_code + program)
        Schema::table('subjects', function (Blueprint $table) {
            $table->unique(['subject_code', 'program']);
        });
    }

    public function down(): void
    {
        Schema::table('subjects', function (Blueprint $table) {
            $table->dropUnique(['subject_code', 'program']);
            $table->unique(['subject_code']);
        });
    }
};
