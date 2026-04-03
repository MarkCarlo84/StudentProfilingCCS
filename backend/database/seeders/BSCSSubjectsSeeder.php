<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Seeder;

class BSCSSubjectsSeeder extends Seeder
{
    public function run(): void
    {
        $subjects = [
            // ── Year 1 · First Semester ───────────────────────────────────────
            ['subject_code' => 'CCS101-CS', 'subject_name' => 'Introduction to Computing',                          'units' => 3, 'pre_requisite' => null,                                                              'year_level' => 1, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CCS102-CS', 'subject_name' => 'Computer Programming 1',                             'units' => 3, 'pre_requisite' => null,                                                              'year_level' => 1, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'ETH101-CS', 'subject_name' => 'Ethics',                                             'units' => 3, 'pre_requisite' => null,                                                              'year_level' => 1, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'MAT101-CS', 'subject_name' => 'Mathematics in the Modern World',                    'units' => 3, 'pre_requisite' => null,                                                              'year_level' => 1, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'NSTP1-CS',  'subject_name' => 'National Service Training Program 1',                'units' => 3, 'pre_requisite' => null,                                                              'year_level' => 1, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'PED101-CS', 'subject_name' => 'Physical Education 1',                               'units' => 2, 'pre_requisite' => null,                                                              'year_level' => 1, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'PSY100-CS', 'subject_name' => 'Understanding the Self',                             'units' => 3, 'pre_requisite' => null,                                                              'year_level' => 1, 'semester' => '1st Semester', 'program' => 'BSCS'],

            // ── Year 1 · Second Semester ──────────────────────────────────────
            ['subject_code' => 'CCS103-CS', 'subject_name' => 'Computer Programming 2',                             'units' => 3, 'pre_requisite' => 'CCS102',                                                          'year_level' => 1, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CCS104-CS', 'subject_name' => 'Discrete Structures 1',                              'units' => 3, 'pre_requisite' => 'MAT101',                                                          'year_level' => 1, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CCS106-CS', 'subject_name' => 'Social and Professional Issues',                     'units' => 3, 'pre_requisite' => 'ETH101',                                                          'year_level' => 1, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'COM101-CS', 'subject_name' => 'Purposive Communication',                            'units' => 3, 'pre_requisite' => null,                                                              'year_level' => 1, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSP101-CS', 'subject_name' => 'Analytic Geometry',                                  'units' => 3, 'pre_requisite' => 'MAT101',                                                          'year_level' => 1, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'GAD101-CS', 'subject_name' => 'Gender and Development',                             'units' => 3, 'pre_requisite' => null,                                                              'year_level' => 1, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'NSTP2-CS',  'subject_name' => 'National Service Training Program 2',                'units' => 3, 'pre_requisite' => 'NSTP1',                                                           'year_level' => 1, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'PED102-CS', 'subject_name' => 'Physical Education 2',                               'units' => 2, 'pre_requisite' => 'PED101',                                                          'year_level' => 1, 'semester' => '2nd Semester', 'program' => 'BSCS'],

            // ── Year 2 · First Semester ───────────────────────────────────────
            ['subject_code' => 'CCS107-CS', 'subject_name' => 'Data Structures and Algorithms 1',                   'units' => 3, 'pre_requisite' => 'CCS103',                                                          'year_level' => 2, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CCS108-CS', 'subject_name' => 'Object-Oriented Programming',                        'units' => 3, 'pre_requisite' => 'CCS103',                                                          'year_level' => 2, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSEG1-CS',  'subject_name' => 'Game Concepts and Productions',                      'units' => 3, 'pre_requisite' => '2nd Year Standing',                                               'year_level' => 2, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSP102-CS', 'subject_name' => 'Discrete Structures 2',                              'units' => 3, 'pre_requisite' => 'CCS104',                                                          'year_level' => 2, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'HIS101-CS', 'subject_name' => 'Readings in Philippine History',                     'units' => 3, 'pre_requisite' => null,                                                              'year_level' => 2, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'PED103-CS', 'subject_name' => 'Physical Education 3',                               'units' => 2, 'pre_requisite' => 'PED102',                                                          'year_level' => 2, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'STS101-CS', 'subject_name' => 'Science, Technology and Society',                    'units' => 3, 'pre_requisite' => null,                                                              'year_level' => 2, 'semester' => '1st Semester', 'program' => 'BSCS'],

            // ── Year 2 · Second Semester ──────────────────────────────────────
            ['subject_code' => 'ACT101-CS', 'subject_name' => 'Principles of Accounting',                           'units' => 3, 'pre_requisite' => null,                                                              'year_level' => 2, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CCS110-CS', 'subject_name' => 'Information Management 1',                           'units' => 3, 'pre_requisite' => 'CCS101',                                                          'year_level' => 2, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSEG2-CS',  'subject_name' => 'Game Programming 1',                                 'units' => 3, 'pre_requisite' => 'CSEG1',                                                           'year_level' => 2, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSP103-CS', 'subject_name' => 'Data Structures and Algorithms 2',                   'units' => 3, 'pre_requisite' => 'CCS107',                                                          'year_level' => 2, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSP104-CS', 'subject_name' => 'Calculus',                                           'units' => 3, 'pre_requisite' => 'CSP101, CSP102',                                                  'year_level' => 2, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSP105-CS', 'subject_name' => 'Algorithms and Complexity',                          'units' => 3, 'pre_requisite' => 'CCS107, CCS108',                                                  'year_level' => 2, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'HMN101-CS', 'subject_name' => 'Art Appreciation',                                   'units' => 3, 'pre_requisite' => null,                                                              'year_level' => 2, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'PED104-CS', 'subject_name' => 'Physical Education 4',                               'units' => 2, 'pre_requisite' => 'PED103',                                                          'year_level' => 2, 'semester' => '2nd Semester', 'program' => 'BSCS'],

            // ── Year 3 · First Semester ───────────────────────────────────────
            ['subject_code' => 'CCS109-CS', 'subject_name' => 'System Analysis and Design',                         'units' => 3, 'pre_requisite' => 'CCS101',                                                          'year_level' => 3, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CCS112-CS', 'subject_name' => 'Applications Development and Emerging Technologies', 'units' => 3, 'pre_requisite' => 'CCS103',                                                          'year_level' => 3, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CCS113-CS', 'subject_name' => 'Information Assurance Security',                     'units' => 3, 'pre_requisite' => 'PED104, HMN101, ACT101, CCS110, CSP103, CSP104, CSP105, CSEG2',   'year_level' => 3, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSEG3-CS',  'subject_name' => 'Game Programming 2',                                 'units' => 3, 'pre_requisite' => 'CSEG2',                                                           'year_level' => 3, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSP106-CS', 'subject_name' => 'Automata Theory and Formal Languages',               'units' => 3, 'pre_requisite' => 'CSP105',                                                          'year_level' => 3, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSP107-CS', 'subject_name' => 'Computer Organization and Assembly Language Programming', 'units' => 3, 'pre_requisite' => 'CSP103',                                                     'year_level' => 3, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'ENT101-CS', 'subject_name' => 'The Entrepreneurial Mind',                           'units' => 3, 'pre_requisite' => null,                                                              'year_level' => 3, 'semester' => '1st Semester', 'program' => 'BSCS'],

            // ── Year 3 · Second Semester ──────────────────────────────────────
            ['subject_code' => 'CSEG4-CS',  'subject_name' => 'Game Programming 3 (Pure Labs)',                     'units' => 3, 'pre_requisite' => 'CSEG3',                                                           'year_level' => 3, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSP108-CS', 'subject_name' => 'Programming Languages',                              'units' => 3, 'pre_requisite' => 'CCS103',                                                          'year_level' => 3, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSP109-CS', 'subject_name' => 'Software Engineering 1',                             'units' => 3, 'pre_requisite' => 'CCS109',                                                          'year_level' => 3, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSP110-CS', 'subject_name' => 'Numerical Analysis',                                 'units' => 3, 'pre_requisite' => 'CSP106, CSEG3',                                                   'year_level' => 3, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSP111-CS', 'subject_name' => 'Thesis 1',                                           'units' => 3, 'pre_requisite' => 'CSP106, CSP107',                                                  'year_level' => 3, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'RIZ101-CS', 'subject_name' => 'Life and Works of Rizal',                            'units' => 3, 'pre_requisite' => null,                                                              'year_level' => 3, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'SOC101-CS', 'subject_name' => 'The Contemporary World',                             'units' => 3, 'pre_requisite' => null,                                                              'year_level' => 3, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'TEC101-CS', 'subject_name' => 'Technopreneurship',                                  'units' => 3, 'pre_requisite' => 'ENT101',                                                          'year_level' => 3, 'semester' => '2nd Semester', 'program' => 'BSCS'],

            // ── Year 4 · First Semester ───────────────────────────────────────
            ['subject_code' => 'CCS105-CS', 'subject_name' => 'Human Computer Interaction 1',                       'units' => 3, 'pre_requisite' => 'CCS101',                                                          'year_level' => 4, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSEG5-CS',  'subject_name' => 'Artificial Intelligence for Games',                  'units' => 3, 'pre_requisite' => 'CSEG4',                                                           'year_level' => 4, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSP112-CS', 'subject_name' => 'Operating Systems',                                  'units' => 3, 'pre_requisite' => 'CSP107',                                                          'year_level' => 4, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSP113-CS', 'subject_name' => 'Software Engineering 2',                             'units' => 3, 'pre_requisite' => 'CSP109',                                                          'year_level' => 4, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSP114-CS', 'subject_name' => 'Thesis 2',                                           'units' => 3, 'pre_requisite' => 'CSP111',                                                          'year_level' => 4, 'semester' => '1st Semester', 'program' => 'BSCS'],
            ['subject_code' => 'ENV101-CS', 'subject_name' => 'Environmental Science',                              'units' => 3, 'pre_requisite' => null,                                                              'year_level' => 4, 'semester' => '1st Semester', 'program' => 'BSCS'],

            // ── Year 4 · Second Semester ──────────────────────────────────────
            ['subject_code' => 'CCS111-CS', 'subject_name' => 'Networking and Communication 1',                     'units' => 3, 'pre_requisite' => 'CSP112',                                                          'year_level' => 4, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSEG6-CS',  'subject_name' => 'Advance Game Design',                                'units' => 3, 'pre_requisite' => 'CSEG5',                                                           'year_level' => 4, 'semester' => '2nd Semester', 'program' => 'BSCS'],
            ['subject_code' => 'CSP115-CS', 'subject_name' => 'CS Practicum (300 hours)',                           'units' => 4, 'pre_requisite' => 'CSP111',                                                          'year_level' => 4, 'semester' => '2nd Semester', 'program' => 'BSCS'],
        ];

        foreach ($subjects as $data) {
            Subject::updateOrCreate(['subject_code' => $data['subject_code']], $data);
        }

        $this->command->info('✓ Seeded ' . count($subjects) . ' BSCS subjects');
    }
}
