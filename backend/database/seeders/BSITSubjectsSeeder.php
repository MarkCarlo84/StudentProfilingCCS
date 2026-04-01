<?php

namespace Database\Seeders;

use App\Models\Subject;
use Illuminate\Database\Seeder;

class BSITSubjectsSeeder extends Seeder
{
    public function run(): void
    {
        $subjects = [
            // ── Year 1 · First Semester ───────────────────────────────────────
            ['subject_code' => 'CCS101-IT', 'subject_name' => 'Introduction to Computing',                          'units' => 3, 'pre_requisite' => null,                                          'year_level' => 1, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'CCS102-IT', 'subject_name' => 'Computer Programming 1',                             'units' => 3, 'pre_requisite' => null,                                          'year_level' => 1, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ETH101-IT', 'subject_name' => 'Ethics',                                             'units' => 3, 'pre_requisite' => null,                                          'year_level' => 1, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'MAT101-IT', 'subject_name' => 'Mathematics in the Modern World',                    'units' => 3, 'pre_requisite' => null,                                          'year_level' => 1, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'NSTP1-IT',  'subject_name' => 'National Service Training Program 1',                'units' => 3, 'pre_requisite' => null,                                          'year_level' => 1, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'PED101-IT', 'subject_name' => 'Physical Education 1',                               'units' => 2, 'pre_requisite' => null,                                          'year_level' => 1, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'PSY100-IT', 'subject_name' => 'Understanding the Self',                             'units' => 3, 'pre_requisite' => null,                                          'year_level' => 1, 'semester' => '1st Semester', 'program' => 'BSIT'],

            // ── Year 1 · Second Semester ──────────────────────────────────────
            ['subject_code' => 'CCS103-IT', 'subject_name' => 'Computer Programming 2',                             'units' => 3, 'pre_requisite' => 'CCS102',                                      'year_level' => 1, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'CCS104-IT', 'subject_name' => 'Discrete Structures 1',                              'units' => 3, 'pre_requisite' => 'MAT101',                                      'year_level' => 1, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'CCS105-IT', 'subject_name' => 'Human Computer Interaction 1',                       'units' => 3, 'pre_requisite' => 'CCS101',                                      'year_level' => 1, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'CCS106-IT', 'subject_name' => 'Social and Professional Issues',                     'units' => 3, 'pre_requisite' => 'ETH101',                                      'year_level' => 1, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'COM101-IT', 'subject_name' => 'Purposive Communication',                            'units' => 3, 'pre_requisite' => null,                                          'year_level' => 1, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'GAD101-IT', 'subject_name' => 'Gender and Development',                             'units' => 3, 'pre_requisite' => null,                                          'year_level' => 1, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'NSTP2-IT',  'subject_name' => 'National Service Training Program 2',                'units' => 3, 'pre_requisite' => 'NSTP1',                                       'year_level' => 1, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'PED102-IT', 'subject_name' => 'Physical Education 2',                               'units' => 2, 'pre_requisite' => 'PED101',                                      'year_level' => 1, 'semester' => '2nd Semester', 'program' => 'BSIT'],

            // ── Year 2 · First Semester ───────────────────────────────────────
            ['subject_code' => 'ACT101-IT', 'subject_name' => 'Principles of Accounting',                           'units' => 3, 'pre_requisite' => null,                                          'year_level' => 2, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'CCS107-IT', 'subject_name' => 'Data Structures and Algorithms 1',                   'units' => 3, 'pre_requisite' => 'CCS103',                                      'year_level' => 2, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'CCS108-IT', 'subject_name' => 'Object-Oriented Programming',                        'units' => 3, 'pre_requisite' => 'CCS103',                                      'year_level' => 2, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'CCS109-IT', 'subject_name' => 'System Analysis and Design',                         'units' => 3, 'pre_requisite' => 'CCS101',                                      'year_level' => 2, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITEW1-IT',  'subject_name' => 'Electronic Commerce',                                'units' => 3, 'pre_requisite' => null,                                          'year_level' => 2, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'PED103-IT', 'subject_name' => 'Physical Education 3',                               'units' => 2, 'pre_requisite' => 'PED102',                                      'year_level' => 2, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'STS101-IT', 'subject_name' => 'Science, Technology and Society',                    'units' => 3, 'pre_requisite' => null,                                          'year_level' => 2, 'semester' => '1st Semester', 'program' => 'BSIT'],

            // ── Year 2 · Second Semester ──────────────────────────────────────
            ['subject_code' => 'CCS110-IT', 'subject_name' => 'Information Management 1',                           'units' => 3, 'pre_requisite' => 'CCS101',                                      'year_level' => 2, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'CCS111-IT', 'subject_name' => 'Networking and Communication 1',                     'units' => 3, 'pre_requisite' => 'CCS103, CCS104, CCS105, CCS106',              'year_level' => 2, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ENT101-IT', 'subject_name' => 'The Entrepreneurial Mind',                           'units' => 3, 'pre_requisite' => null,                                          'year_level' => 2, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITEW2-IT',  'subject_name' => 'Client Side Scripting',                              'units' => 3, 'pre_requisite' => 'ITEW1',                                       'year_level' => 2, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITP101-IT', 'subject_name' => 'Quantitative Methods',                               'units' => 3, 'pre_requisite' => 'CCS104',                                      'year_level' => 2, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITP102-IT', 'subject_name' => 'Integrative Programming and Technologies',           'units' => 3, 'pre_requisite' => 'CCS109',                                      'year_level' => 2, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'PED104-IT', 'subject_name' => 'Physical Education 4',                               'units' => 2, 'pre_requisite' => 'PED103',                                      'year_level' => 2, 'semester' => '2nd Semester', 'program' => 'BSIT'],

            // ── Year 3 · First Semester ───────────────────────────────────────
            ['subject_code' => 'HIS101-IT', 'subject_name' => 'Readings in Philippine History',                     'units' => 3, 'pre_requisite' => null,                                          'year_level' => 3, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITEW3-IT',  'subject_name' => 'Server Side Scripting',                              'units' => 3, 'pre_requisite' => 'ITEW2',                                       'year_level' => 3, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITP103-IT', 'subject_name' => 'System Integration and Architecture',                'units' => 3, 'pre_requisite' => 'ITP102',                                      'year_level' => 3, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITP104-IT', 'subject_name' => 'Information Management 2',                           'units' => 3, 'pre_requisite' => 'CCS110',                                      'year_level' => 3, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITP105-IT', 'subject_name' => 'Networking and Communication 2',                     'units' => 3, 'pre_requisite' => 'CCS111',                                      'year_level' => 3, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITP106-IT', 'subject_name' => 'Human Computer Interaction 2',                       'units' => 3, 'pre_requisite' => 'CCS105',                                      'year_level' => 3, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'SOC101-IT', 'subject_name' => 'The Contemporary World',                             'units' => 3, 'pre_requisite' => null,                                          'year_level' => 3, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'TEC101-IT', 'subject_name' => 'Technopreneurship',                                  'units' => 3, 'pre_requisite' => 'ENT101',                                      'year_level' => 3, 'semester' => '1st Semester', 'program' => 'BSIT'],

            // ── Year 3 · Second Semester ──────────────────────────────────────
            ['subject_code' => 'CCS112-IT', 'subject_name' => 'Applications Development and Emerging Technologies', 'units' => 3, 'pre_requisite' => 'CCS103',                                      'year_level' => 3, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'CCS113-IT', 'subject_name' => 'Information Assurance and Security',                 'units' => 3, 'pre_requisite' => '3rd Year Standing',                           'year_level' => 3, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'HMN101-IT', 'subject_name' => 'Art Appreciation',                                   'units' => 3, 'pre_requisite' => null,                                          'year_level' => 3, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITEW4-IT',  'subject_name' => 'Responsive Web Design',                              'units' => 3, 'pre_requisite' => 'ITEW3',                                       'year_level' => 3, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITP107-IT', 'subject_name' => 'Mobile Application Development',                     'units' => 3, 'pre_requisite' => 'CCS108',                                      'year_level' => 3, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITP108-IT', 'subject_name' => 'Capstone Project 1',                                 'units' => 3, 'pre_requisite' => 'ITP104, CCS108, ITP103, ITP105, ITP106, ITEW3', 'year_level' => 3, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITP109-IT', 'subject_name' => 'Platform Technologies',                              'units' => 3, 'pre_requisite' => 'ITP106',                                      'year_level' => 3, 'semester' => '2nd Semester', 'program' => 'BSIT'],

            // ── Year 4 · First Semester ───────────────────────────────────────
            ['subject_code' => 'ENV101-IT', 'subject_name' => 'Environmental Science',                              'units' => 3, 'pre_requisite' => null,                                          'year_level' => 4, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITEW5-IT',  'subject_name' => 'Web Security and Optimization',                      'units' => 3, 'pre_requisite' => 'ITEW4',                                       'year_level' => 4, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITP110-IT', 'subject_name' => 'Web Technologies',                                   'units' => 3, 'pre_requisite' => 'ITP106',                                      'year_level' => 4, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITP111-IT', 'subject_name' => 'System Administration and Maintenance',              'units' => 3, 'pre_requisite' => 'ITP105, ITP109',                              'year_level' => 4, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITP112-IT', 'subject_name' => 'Capstone Project 2',                                 'units' => 3, 'pre_requisite' => 'ITP108',                                      'year_level' => 4, 'semester' => '1st Semester', 'program' => 'BSIT'],
            ['subject_code' => 'RIZ101-IT', 'subject_name' => 'Life and Works of Rizal',                            'units' => 3, 'pre_requisite' => null,                                          'year_level' => 4, 'semester' => '1st Semester', 'program' => 'BSIT'],

            // ── Year 4 · Second Semester ──────────────────────────────────────
            ['subject_code' => 'ITEW6-IT',  'subject_name' => 'Web Development Frameworks',                         'units' => 3, 'pre_requisite' => 'ITEW5',                                       'year_level' => 4, 'semester' => '2nd Semester', 'program' => 'BSIT'],
            ['subject_code' => 'ITP113-IT', 'subject_name' => 'IT Practicum (500 hours)',                           'units' => 9, 'pre_requisite' => 'ITP108',                                      'year_level' => 4, 'semester' => '2nd Semester', 'program' => 'BSIT'],
        ];

        foreach ($subjects as $data) {
            Subject::updateOrCreate(['subject_code' => $data['subject_code']], $data);
        }

        $this->command->info('✓ Seeded ' . count($subjects) . ' BSIT subjects');
    }
}
