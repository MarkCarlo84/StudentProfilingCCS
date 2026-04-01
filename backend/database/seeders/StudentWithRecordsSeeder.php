<?php
namespace Database\Seeders;

use App\Models\{Student, User, AcademicRecord, Affiliation, Skill, Violation, NonAcademicHistory};
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class StudentWithRecordsSeeder extends Seeder
{
    // [first, middle, last], gender, year_level, current_sem, enroll_year, has_failures
    private array $it = [
        // ── Year 1 ──
        [['Juan',      'Miguel',   'Dela Cruz'],    'Male',   1, '1st Semester', 2025, false],
        [['Maria',     'Santos',   'Reyes'],        'Female', 1, '1st Semester', 2025, false],
        [['Carlos',    'Jose',     'Mendoza'],      'Male',   1, '2nd Semester', 2025, false],
        [['Sofia',     'Ana',      'Villanueva'],   'Female', 1, '2nd Semester', 2025, false],
        [['Miguel',    'Luis',     'Torres'],       'Male',   1, '1st Semester', 2025, false],
        [['Isabella',  'Rosa',     'Garcia'],       'Female', 1, '2nd Semester', 2025, false],
        // ── Year 2 ──
        [['Gabriel',   'Antonio',  'Bautista'],     'Male',   2, '1st Semester', 2024, false],
        [['Valentina', 'Cruz',     'Morales'],      'Female', 2, '1st Semester', 2024, false],
        [['Diego',     'Ramon',    'Castillo'],     'Male',   2, '2nd Semester', 2024, false],
        [['Camila',    'Elena',    'Rivera'],       'Female', 2, '2nd Semester', 2024, true],
        [['Lucas',     'Marco',    'Hernandez'],    'Male',   2, '1st Semester', 2024, false],
        [['Emma',      'Luz',      'Lopez'],        'Female', 2, '2nd Semester', 2024, false],
        // ── Year 3 (regular — all Y1+Y2 graded, Y3S1 graded) ──
        [['Mateo',     'Jose',     'Ramirez'],      'Male',   3, '1st Semester', 2023, false],
        [['Olivia',    'Maria',    'Torres'],       'Female', 3, '1st Semester', 2023, false],
        [['Sebastian', 'Luis',     'Navarro'],      'Male',   3, '2nd Semester', 2023, false],
        [['Mia',       'Carmen',   'Ruiz'],         'Female', 3, '2nd Semester', 2023, false],
        [['Alexander', 'Pedro',    'Gutierrez'],    'Male',   3, '1st Semester', 2023, false],
        [['Charlotte', 'Ana',      'Ortiz'],        'Female', 3, '2nd Semester', 2023, false],
        // ── Year 3 (irregular — has failures) ──
        [['Daniel',    'Roberto',  'Vargas'],       'Male',   3, '1st Semester', 2023, true],
        [['Amelia',    'Sofia',    'Medina'],       'Female', 3, '2nd Semester', 2023, true],
        // ── Year 4 ──
        [['James',     'Eduardo',  'Santos'],       'Male',   4, '1st Semester', 2022, false],
        [['Sophia',    'Lucia',    'Cruz'],         'Female', 4, '2nd Semester', 2022, false],
        [['Ethan',     'Manuel',   'Flores'],       'Male',   4, '2nd Semester', 2022, true],
        [['Ava',       'Patricia', 'Reyes'],        'Female', 4, '1st Semester', 2022, false],
        [['Noah',      'Carlos',   'Diaz'],         'Male',   4, '2nd Semester', 2022, false],
        [['Chloe',     'Marie',    'Santos'],       'Female', 4, '1st Semester', 2022, false],
        // ── Graduated ──
        [['Aaron',     'Paul',     'Lim'],          'Male',   4, '2nd Semester', 2021, false],
        [['Beatrice',  'Joy',      'Tan'],          'Female', 4, '2nd Semester', 2021, false],
        // ── Dropped ──
        [['Carlo',     'Rey',      'Basco'],        'Male',   2, '1st Semester', 2024, true],
        [['Denise',    'Mae',      'Ocampo'],       'Female', 1, '2nd Semester', 2025, true],
    ];

    private array $cs = [
        // ── Year 1 ──
        [['Liam',      'Jose',     'Aquino'],       'Male',   1, '1st Semester', 2025, false],
        [['Ella',      'Maria',    'Pascual'],      'Female', 1, '1st Semester', 2025, false],
        [['Marco',     'Luis',     'Aguilar'],      'Male',   1, '2nd Semester', 2025, false],
        [['Isabelle',  'Ana',      'Domingo'],      'Female', 1, '2nd Semester', 2025, false],
        [['Rafael',    'Miguel',   'Salazar'],      'Male',   1, '1st Semester', 2025, false],
        [['Natalia',   'Rosa',     'Vega'],         'Female', 1, '2nd Semester', 2025, false],
        // ── Year 2 ──
        [['Adrian',    'Ramon',    'Fuentes'],      'Male',   2, '1st Semester', 2024, false],
        [['Bianca',    'Elena',    'Mendez'],       'Female', 2, '1st Semester', 2024, false],
        [['Christian', 'Pedro',    'Ramos'],        'Male',   2, '2nd Semester', 2024, true],
        [['Diana',     'Luz',      'Cabrera'],      'Female', 2, '2nd Semester', 2024, false],
        [['Eduardo',   'Antonio',  'Lim'],          'Male',   2, '1st Semester', 2024, false],
        [['Francesca', 'Carmen',   'Tan'],          'Female', 2, '2nd Semester', 2024, false],
        // ── Year 3 (regular) ──
        [['Gerald',    'Marco',    'Uy'],           'Male',   3, '1st Semester', 2023, false],
        [['Hannah',    'Sofia',    'Go'],           'Female', 3, '1st Semester', 2023, false],
        [['Ivan',      'Roberto',  'Sy'],           'Male',   3, '2nd Semester', 2023, false],
        [['Julia',     'Patricia', 'Chua'],         'Female', 3, '2nd Semester', 2023, false],
        [['Kevin',     'Eduardo',  'Ong'],          'Male',   3, '1st Semester', 2023, false],
        [['Laura',     'Lucia',    'Ang'],          'Female', 3, '2nd Semester', 2023, false],
        // ── Year 3 (irregular) ──
        [['Michael',   'Carlos',   'Co'],           'Male',   3, '1st Semester', 2023, true],
        [['Nicole',    'Maria',    'Lao'],          'Female', 3, '2nd Semester', 2023, true],
        // ── Year 4 ──
        [['Oscar',     'Jose',     'Kho'],          'Male',   4, '1st Semester', 2022, false],
        [['Patricia',  'Ana',      'Tiu'],          'Female', 4, '2nd Semester', 2022, false],
        [['Quincy',    'Luis',     'Yap'],          'Male',   4, '2nd Semester', 2022, true],
        [['Rachel',    'Elena',    'Dee'],          'Female', 4, '1st Semester', 2022, false],
        [['Samuel',    'Ramon',    'Ching'],        'Male',   4, '2nd Semester', 2022, false],
        [['Teresa',    'Grace',    'Reyes'],        'Female', 4, '1st Semester', 2022, false],
        // ── Graduated ──
        [['Ulysses',   'John',     'Bautista'],     'Male',   4, '2nd Semester', 2021, false],
        [['Vanessa',   'Joy',      'Cruz'],         'Female', 4, '2nd Semester', 2021, false],
        // ── Dropped ──
        [['Warren',    'Lee',      'Santos'],       'Male',   2, '1st Semester', 2024, true],
        [['Ximena',    'Faith',    'Dela Rosa'],    'Female', 1, '2nd Semester', 2025, true],
    ];

    public function run(): void
    {
        $this->seedGroup($this->it, 'BSIT', 'IT', 'Information Technology');
        $this->seedGroup($this->cs, 'BSCS', 'CS', 'Computer Science');
        $this->command->info('✓ Seeded 60 students (30 IT + 30 CS) with full academic records');
    }

    private function seedGroup(array $list, string $prog, string $pfx, string $dept): void
    {
        foreach ($list as $i => $row) {
            [$nm, $gen, $yr, $sem, $ey, $fail] = $row;
            [$fn, $mn, $ln] = $nm;

            $num   = str_pad($i + 1, 7, '0', STR_PAD_LEFT);
            $sid   = (string)(2600000 + ($pfx === 'IT' ? 0 : 300) + $i + 1);
            $email = strtolower("{$fn}.{$ln}@student.ccs.edu.ph");
            $dob   = date('Y-m-d', mktime(0, 0, 0, rand(1,12), rand(1,28), rand(2000,2006)));
            $age   = (int)date('Y') - (int)substr($dob, 0, 4);

            // Determine student status
            $status = 'active';
            if ($ey <= 2021) $status = 'graduated';
            // Only the last 2 entries in each group (explicitly marked dropped) get dropped status
            if ($fail && $yr <= 1 && $ey >= 2025) $status = 'dropped';

            $student = Student::firstOrCreate(['student_id' => $sid], [
                'first_name'      => $fn,
                'middle_name'     => $mn,
                'last_name'       => $ln,
                'age'             => $age,
                'gender'          => $gen,
                'date_of_birth'   => $dob,
                'address'         => $this->rndAddr(),
                'contact_number'  => '09' . rand(100000000, 999999999),
                'email'           => $email,
                'enrollment_date' => $ey . '-08-01',
                'status'          => $status,
                'department'      => $dept,
                'guardian_name'   => 'Guardian of ' . $fn . ' ' . $ln,
            ]);

            User::firstOrCreate(['email' => $email], [
                'name'       => $fn . ' ' . $ln,
                'password'   => Hash::make('Student1234'),
                'role'       => 'student',
                'student_id' => $student->id,
            ]);

            if ($student->wasRecentlyCreated) {
                $this->seedRecords($student, $prog, $yr, $sem, $ey, $fail);
                if ($i % 2 === 0 || $yr >= 2) $this->seedAffiliations($student, $yr);
                if ($i % 3 !== 0 || $yr >= 2) $this->seedSkills($student);
                if ($fail || $i % 4 === 0)    $this->seedViolations($student);
                if ($yr >= 2)                  $this->seedActivities($student, $yr);
            }
        }
    }

    // ── Static subject data (mirrors frontend/src/data/subjects.js) ─────────
    private function subjects(string $prog): array
    {
        $bsit = [
            [1,'1st Semester','CCS101','Introduction to Computing',3],
            [1,'1st Semester','CCS102','Computer Programming 1',3],
            [1,'1st Semester','ETH101','Ethics',3],
            [1,'1st Semester','MAT101','Mathematics in the Modern World',3],
            [1,'1st Semester','NSTP1', 'National Service Training Program 1',3],
            [1,'1st Semester','PED101','Physical Education 1',2],
            [1,'1st Semester','PSY100','Understanding the Self',3],
            [1,'2nd Semester','CCS103','Computer Programming 2',3],
            [1,'2nd Semester','CCS104','Discrete Structures 1',3],
            [1,'2nd Semester','CCS105','Human Computer Interaction 1',3],
            [1,'2nd Semester','CCS106','Social and Professional Issues',3],
            [1,'2nd Semester','COM101','Purposive Communication',3],
            [1,'2nd Semester','GAD101','Gender and Development',3],
            [1,'2nd Semester','NSTP2', 'National Service Training Program 2',3],
            [1,'2nd Semester','PED102','Physical Education 2',2],
            [2,'1st Semester','ACT101','Principles of Accounting',3],
            [2,'1st Semester','CCS107','Data Structures and Algorithms 1',3],
            [2,'1st Semester','CCS108','Object-Oriented Programming',3],
            [2,'1st Semester','CCS109','System Analysis and Design',3],
            [2,'1st Semester','ITEW1', 'Electronic Commerce',3],
            [2,'1st Semester','PED103','Physical Education 3',2],
            [2,'1st Semester','STS101','Science, Technology and Society',3],
            [2,'2nd Semester','CCS110','Information Management 1',3],
            [2,'2nd Semester','CCS111','Networking and Communication 1',3],
            [2,'2nd Semester','ENT101','The Entrepreneurial Mind',3],
            [2,'2nd Semester','ITEW2', 'Client Side Scripting',3],
            [2,'2nd Semester','ITP101','Quantitative Methods',3],
            [2,'2nd Semester','ITP102','Integrative Programming and Technologies',3],
            [2,'2nd Semester','PED104','Physical Education 4',2],
            [3,'1st Semester','HIS101','Readings in Philippine History',3],
            [3,'1st Semester','ITEW3', 'Server Side Scripting',3],
            [3,'1st Semester','ITP103','System Integration and Architecture',3],
            [3,'1st Semester','ITP104','Information Management 2',3],
            [3,'1st Semester','ITP105','Networking and Communication 2',3],
            [3,'1st Semester','ITP106','Human Computer Interaction 2',3],
            [3,'1st Semester','SOC101','The Contemporary World',3],
            [3,'1st Semester','TEC101','Technopreneurship',3],
            [3,'2nd Semester','CCS112','Applications Development and Emerging Technologies',3],
            [3,'2nd Semester','CCS113','Information Assurance and Security',3],
            [3,'2nd Semester','HMN101','Art Appreciation',3],
            [3,'2nd Semester','ITEW4', 'Responsive Web Design',3],
            [3,'2nd Semester','ITP107','Mobile Application Development',3],
            [3,'2nd Semester','ITP108','Capstone Project 1',3],
            [3,'2nd Semester','ITP109','Platform Technologies',3],
            [4,'1st Semester','ENV101','Environmental Science',3],
            [4,'1st Semester','ITEW5', 'Web Security and Optimization',3],
            [4,'1st Semester','ITP110','Web Technologies',3],
            [4,'1st Semester','ITP111','System Administration and Maintenance',3],
            [4,'1st Semester','ITP112','Capstone Project 2',3],
            [4,'1st Semester','RIZ101','Life and Works of Rizal',3],
            [4,'2nd Semester','ITEW6', 'Web Development Frameworks',3],
            [4,'2nd Semester','ITP113','IT Practicum (500 hours)',9],
        ];

        $bscs = [
            [1,'1st Semester','CCS101','Introduction to Computing',3],
            [1,'1st Semester','CCS102','Computer Programming 1',3],
            [1,'1st Semester','ETH101','Ethics',3],
            [1,'1st Semester','MAT101','Mathematics in the Modern World',3],
            [1,'1st Semester','NSTP1', 'National Service Training Program 1',3],
            [1,'1st Semester','PED101','Physical Education 1',2],
            [1,'1st Semester','PSY100','Understanding the Self',3],
            [1,'2nd Semester','CCS103','Computer Programming 2',3],
            [1,'2nd Semester','CCS104','Discrete Structures 1',3],
            [1,'2nd Semester','CCS106','Social and Professional Issues',3],
            [1,'2nd Semester','COM101','Purposive Communication',3],
            [1,'2nd Semester','CSP101','Analytic Geometry',3],
            [1,'2nd Semester','GAD101','Gender and Development',3],
            [1,'2nd Semester','NSTP2', 'National Service Training Program 2',3],
            [1,'2nd Semester','PED102','Physical Education 2',2],
            [2,'1st Semester','CCS107','Data Structures and Algorithms 1',3],
            [2,'1st Semester','CCS108','Object-Oriented Programming',3],
            [2,'1st Semester','CSEG1', 'Game Concepts and Productions',3],
            [2,'1st Semester','CSP102','Discrete Structures 2',3],
            [2,'1st Semester','HIS101','Readings in Philippine History',3],
            [2,'1st Semester','PED103','Physical Education 3',2],
            [2,'1st Semester','STS101','Science, Technology and Society',3],
            [2,'2nd Semester','ACT101','Principles of Accounting',3],
            [2,'2nd Semester','CCS110','Information Management 1',3],
            [2,'2nd Semester','CSEG2', 'Game Programming 1',3],
            [2,'2nd Semester','CSP103','Data Structures and Algorithms 2',3],
            [2,'2nd Semester','CSP104','Calculus',3],
            [2,'2nd Semester','CSP105','Algorithms and Complexity',3],
            [2,'2nd Semester','HMN101','Art Appreciation',3],
            [2,'2nd Semester','PED104','Physical Education 4',2],
            [3,'1st Semester','CCS109','System Analysis and Design',3],
            [3,'1st Semester','CCS112','Applications Development and Emerging Technologies',3],
            [3,'1st Semester','CCS113','Information Assurance Security',3],
            [3,'1st Semester','CSEG3', 'Game Programming 2',3],
            [3,'1st Semester','CSP106','Automata Theory and Formal Languages',3],
            [3,'1st Semester','CSP107','Computer Organization and Assembly Language Programming',3],
            [3,'1st Semester','ENT101','The Entrepreneurial Mind',3],
            [3,'2nd Semester','CSEG4', 'Game Programming 3 (Pure Labs)',3],
            [3,'2nd Semester','CSP108','Programming Languages',3],
            [3,'2nd Semester','CSP109','Software Engineering 1',3],
            [3,'2nd Semester','CSP110','Numerical Analysis',3],
            [3,'2nd Semester','CSP111','Thesis 1',3],
            [3,'2nd Semester','RIZ101','Life and Works of Rizal',3],
            [3,'2nd Semester','SOC101','The Contemporary World',3],
            [3,'2nd Semester','TEC101','Technopreneurship',3],
            [4,'1st Semester','CCS105','Human Computer Interaction 1',3],
            [4,'1st Semester','CSEG5', 'Artificial Intelligence for Games',3],
            [4,'1st Semester','CSP112','Operating Systems',3],
            [4,'1st Semester','CSP113','Software Engineering 2',3],
            [4,'1st Semester','CSP114','Thesis 2',3],
            [4,'1st Semester','ENV101','Environmental Science',3],
            [4,'2nd Semester','CCS111','Networking and Communication 1',3],
            [4,'2nd Semester','CSEG6', 'Advance Game Design',3],
            [4,'2nd Semester','CSP115','CS Practicum (300 hours)',4],
        ];

        // Group by year||semester
        $grouped = [];
        $list = $prog === 'BSIT' ? $bsit : $bscs;
        foreach ($list as [$yr, $sem, $code, $name, $units]) {
            $key = "{$yr}||{$sem}";
            $grouped[$key][] = ['code' => $code, 'name' => $name, 'units' => $units];
        }
        return $grouped;
    }

    // ── Academic Records ──────────────────────────────────────────────────────
    private function seedRecords(Student $s, string $prog, int $yr, string $curSem, int $ey, bool $fail): void
    {
        $byKey = $this->subjects($prog);

        foreach ($this->semList($yr, $curSem) as $inf) {
            $key  = $inf['year'] . '||' . $inf['sem'];
            $subs = $byKey[$key] ?? [];
            if (empty($subs)) continue;

            $sy = ($ey + $inf['year'] - 1) . '-' . ($ey + $inf['year']);

            $isCompleted = ($inf['year'] < $yr) ||
                           ($inf['year'] === $yr && $inf['sem'] === '1st Semester' && $curSem === '2nd Semester');
            $isCurrent   = ($inf['year'] === $yr && $inf['sem'] === $curSem);

            foreach ($subs as $sub) {
                $shouldGrade = $isCompleted || ($isCurrent && $yr >= 2);
                if (!$shouldGrade) continue;

                $passing = true;
                if ($fail && $isCompleted) {
                    $passing = rand(1, 10) > 2; // ~20% failure chance for irregular
                }

                $g = $this->rndGrade($passing);
                AcademicRecord::create([
                    'student_id'  => $s->id,
                    'school_year' => $sy,
                    'semester'    => $inf['sem'],
                    'subject'     => $sub['name'],
                    'course_code' => $sub['code'],
                    'units'       => $sub['units'],
                    'gpa'         => $g,
                    'remarks'     => $g <= 3.0 ? 'Passed' : ($g == 4.0 ? 'Conditional' : 'Failed'),
                ]);
            }
        }
    }

    // ── Affiliations ──────────────────────────────────────────────────────────
    private function seedAffiliations(Student $s, int $yr): void
    {
        $orgs = [
            ['ACSS', 'Academic', 'Member'],
            ['SITES', 'Academic', 'Officer'],
            ['Red Cross Youth', 'Civic', 'Volunteer'],
            ['Junior Philippine Computer Society', 'Professional', 'Member'],
            ['Google Developer Student Club', 'Technical', 'Core Member'],
            ['CCS Student Council', 'Student Government', 'Representative'],
            ['Robotics Club', 'Technical', 'Member'],
            ['Math Club', 'Academic', 'Secretary'],
            ['AWS Cloud Club', 'Technical', 'Member'],
            ['Cybersecurity Club', 'Technical', 'Officer'],
        ];
        $count  = min($yr, 3);
        $picked = (array) array_rand($orgs, $count);
        foreach ($picked as $idx) {
            [$name, $type, $role] = $orgs[$idx];
            Affiliation::create([
                'student_id'  => $s->id,
                'name'        => $name,
                'type'        => $type,
                'role'        => $role,
                'date_joined' => date('Y-m-d', mktime(0, 0, 0, rand(6,9), 1, rand(2022, 2025))),
            ]);
        }
    }

    // ── Skills ────────────────────────────────────────────────────────────────
    private function seedSkills(Student $s): void
    {
        $pool = [
            ['Python', 'intermediate'], ['Java', 'beginner'], ['JavaScript', 'intermediate'],
            ['PHP', 'beginner'], ['C++', 'beginner'], ['React', 'intermediate'],
            ['MySQL', 'intermediate'], ['Git', 'advanced'], ['Figma', 'beginner'],
            ['Networking', 'beginner'], ['Linux', 'intermediate'], ['Data Analysis', 'beginner'],
            ['Public Speaking', 'intermediate'], ['Technical Writing', 'beginner'],
            ['Photoshop', 'beginner'], ['Video Editing', 'beginner'],
            ['TypeScript', 'intermediate'], ['Docker', 'beginner'], ['Unity', 'beginner'],
            ['Machine Learning', 'beginner'],
        ];
        shuffle($pool);
        foreach (array_slice($pool, 0, rand(2, 5)) as [$name, $level]) {
            Skill::create([
                'student_id'    => $s->id,
                'skill_name'    => $name,
                'skill_level'   => $level,
                'certification' => rand(0, 1) === 1,
            ]);
        }
    }

    // ── Violations ────────────────────────────────────────────────────────────
    private function seedViolations(Student $s): void
    {
        $types = [
            ['Tardiness',            'minor', 'Verbal warning issued'],
            ['Cheating',             'major', 'Written warning and grade deduction'],
            ['Dress Code Violation', 'minor', 'Verbal warning issued'],
            ['Disruptive Behavior',  'minor', 'Counseling session'],
            ['Plagiarism',           'major', 'Subject failure and written reprimand'],
            ['Unauthorized Absence', 'minor', 'Written warning'],
            ['Use of Mobile Phone',  'minor', 'Confiscation and verbal warning'],
            ['Academic Dishonesty',  'grave', 'Suspension and grade of 5.0'],
        ];
        $count  = rand(1, 2);
        $picked = (array) array_rand($types, $count);
        foreach ($picked as $idx) {
            [$type, $severity, $action] = $types[$idx];
            Violation::create([
                'student_id'     => $s->id,
                'violation_type' => $type,
                'description'    => "Student committed {$type} during the semester.",
                'date_committed' => date('Y-m-d', mktime(0, 0, 0, rand(1,12), rand(1,28), rand(2022, 2025))),
                'severity_level' => $severity,
                'action_taken'   => $action,
            ]);
        }
    }

    // ── Non-Academic Activities ───────────────────────────────────────────────
    private function seedActivities(Student $s, int $yr): void
    {
        $pool = [
            ['Basketball Intramurals',   'Sports',     'Player',      'CCS Department',    '1st Place'],
            ['Hackathon 2024',           'Technology', 'Participant', 'DICT',              'Finalist'],
            ['CCS Foundation Week',      'Cultural',   'Performer',   'CCS Student Council', null],
            ['Blood Donation Drive',     'Civic',      'Volunteer',   'Red Cross',         null],
            ['Programming Contest',      'Academic',   'Contestant',  'ICPEP',             '2nd Place'],
            ['Leadership Seminar',       'Leadership', 'Attendee',    'CHED',              null],
            ['Web Design Competition',   'Technology', 'Participant', 'DICT',              '3rd Place'],
            ['Environmental Clean-up',   'Civic',      'Volunteer',   'Barangay Council',  null],
            ['Chess Tournament',         'Sports',     'Player',      'CCS Department',    null],
            ['Tech Talk Series',         'Academic',   'Speaker',     'Google DSC',        null],
            ['Mobile App Competition',   'Technology', 'Developer',   'Globe Telecom',     'Top 10'],
            ['Debate Competition',       'Academic',   'Debater',     'University',        null],
        ];
        shuffle($pool);
        foreach (array_slice($pool, 0, min($yr, rand(2, 4))) as [$title, $cat, $role, $org, $result]) {
            $start = date('Y-m-d', mktime(0, 0, 0, rand(1,12), rand(1,28), rand(2022, 2025)));
            NonAcademicHistory::create([
                'student_id'     => $s->id,
                'activity_title' => $title,
                'category'       => $cat,
                'description'    => "Participated in {$title} organized by {$org}.",
                'date_started'   => $start,
                'date_ended'     => $start,
                'role'           => $role,
                'organizer'      => $org,
                'game_result'    => $result,
            ]);
        }
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    // Returns list of {year, sem} to seed, in order.
    // For a 3rd-year regular: Y1S1, Y1S2, Y2S1, Y2S2, Y3S1 (and Y3S2 if curSem is 2nd)
    private function semList(int $yr, string $curSem): array
    {
        $out = [];
        for ($y = 1; $y <= 4; $y++) {
            foreach (['1st Semester', '2nd Semester'] as $s) {
                if ($y < $yr) {
                    $out[] = ['year' => $y, 'sem' => $s];
                } elseif ($y === $yr) {
                    $out[] = ['year' => $y, 'sem' => $s];
                    if ($s === $curSem) return $out;
                } else {
                    return $out;
                }
            }
        }
        return $out;
    }

    private function rndGrade(bool $passing): float
    {
        if ($passing) {
            $grades  = [1.0, 1.25, 1.5, 1.75, 2.0, 2.25, 2.5, 2.75, 3.0];
            $weights = [5,   10,   15,  20,   20,  12,   8,   6,    4];
        } else {
            $grades  = [4.0, 5.0];
            $weights = [50,  50];
        }
        $total = array_sum($weights);
        $rand  = rand(1, $total);
        $cum   = 0;
        foreach ($grades as $i => $v) {
            $cum += $weights[$i];
            if ($rand <= $cum) return $v;
        }
        return 2.0;
    }

    private function rndAddr(): string
    {
        $streets = ['Rizal St', 'Bonifacio Ave', 'Mabini St', 'Luna St', 'Roxas Blvd',
                    'Taft Ave', 'EDSA', 'Ortigas Ave', 'Katipunan Ave', 'Aurora Blvd',
                    'Ayala Ave', 'Buendia Ave', 'Commonwealth Ave', 'Quezon Ave'];
        $cities  = ['Cabuyao', 'Calamba', 'San Pedro', 'Biñan', 'Santa Rosa',
                    'Calauan', 'Los Baños', 'Bay', 'Victoria', 'Pila'];
        $brgys   = ['Banay-banay', 'Bigaa', 'Butong', 'Casile', 'Diezmo',
                    'Gulod', 'Mamatid', 'Marinig', 'Niugan', 'Pittland',
                    'Pulo', 'Sala', 'San Isidro', 'Baclaran'];
        return rand(1, 999) . ' ' . $streets[array_rand($streets)]
            . ', Brgy. ' . $brgys[array_rand($brgys)]
            . ', ' . $cities[array_rand($cities)]
            . ', Laguna';
    }
}
