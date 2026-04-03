// Static subject data — no API call needed
// Each entry: { subject_code, subject_name, units, pre_requisite, year_level, semester, program }

export const BSIT_SUBJECTS = [
    // ── Year 1 · 1st Semester ─────────────────────────────────────────────────
    { subject_code: 'CCS101', subject_name: 'Introduction to Computing',             units: 3, pre_requisite: null,                                           year_level: 1, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'CCS102', subject_name: 'Computer Programming 1',                units: 3, pre_requisite: null,                                           year_level: 1, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'ETH101', subject_name: 'Ethics',                                units: 3, pre_requisite: null,                                           year_level: 1, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'MAT101', subject_name: 'Mathematics in the Modern World',       units: 3, pre_requisite: null,                                           year_level: 1, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'NSTP1',  subject_name: 'National Service Training Program 1',   units: 3, pre_requisite: null,                                           year_level: 1, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'PED101', subject_name: 'Physical Education 1',                  units: 2, pre_requisite: null,                                           year_level: 1, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'PSY100', subject_name: 'Understanding the Self',                units: 3, pre_requisite: null,                                           year_level: 1, semester: '1st Semester', program: 'BSIT' },

    // ── Year 1 · 2nd Semester ─────────────────────────────────────────────────
    { subject_code: 'CCS103', subject_name: 'Computer Programming 2',                units: 3, pre_requisite: 'CCS102',                                       year_level: 1, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'CCS104', subject_name: 'Discrete Structures 1',                 units: 3, pre_requisite: 'MAT101',                                       year_level: 1, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'CCS105', subject_name: 'Human Computer Interaction 1',          units: 3, pre_requisite: 'CCS101',                                       year_level: 1, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'CCS106', subject_name: 'Social and Professional Issues',        units: 3, pre_requisite: 'ETH101',                                       year_level: 1, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'COM101', subject_name: 'Purposive Communication',               units: 3, pre_requisite: null,                                           year_level: 1, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'GAD101', subject_name: 'Gender and Development',                units: 3, pre_requisite: null,                                           year_level: 1, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'NSTP2',  subject_name: 'National Service Training Program 2',   units: 3, pre_requisite: 'NSTP1',                                        year_level: 1, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'PED102', subject_name: 'Physical Education 2',                  units: 2, pre_requisite: 'PED101',                                       year_level: 1, semester: '2nd Semester', program: 'BSIT' },

    // ── Year 2 · 1st Semester ─────────────────────────────────────────────────
    { subject_code: 'ACT101', subject_name: 'Principles of Accounting',              units: 3, pre_requisite: null,                                           year_level: 2, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'CCS107', subject_name: 'Data Structures and Algorithms 1',      units: 3, pre_requisite: 'CCS103',                                       year_level: 2, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'CCS108', subject_name: 'Object-Oriented Programming',           units: 3, pre_requisite: 'CCS103',                                       year_level: 2, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'CCS109', subject_name: 'System Analysis and Design',            units: 3, pre_requisite: 'CCS101',                                       year_level: 2, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'ITEW1',  subject_name: 'Electronic Commerce',                   units: 3, pre_requisite: null,                                           year_level: 2, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'PED103', subject_name: 'Physical Education 3',                  units: 2, pre_requisite: 'PED102',                                       year_level: 2, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'STS101', subject_name: 'Science, Technology and Society',       units: 3, pre_requisite: null,                                           year_level: 2, semester: '1st Semester', program: 'BSIT' },

    // ── Year 2 · 2nd Semester ─────────────────────────────────────────────────
    { subject_code: 'CCS110', subject_name: 'Information Management 1',              units: 3, pre_requisite: 'CCS101',                                       year_level: 2, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'CCS111', subject_name: 'Networking and Communication 1',        units: 3, pre_requisite: 'CCS103, CCS104, CCS105, CCS106',               year_level: 2, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'ENT101', subject_name: 'The Entrepreneurial Mind',              units: 3, pre_requisite: null,                                           year_level: 2, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'ITEW2',  subject_name: 'Client Side Scripting',                 units: 3, pre_requisite: 'ITEW1',                                        year_level: 2, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'ITP101', subject_name: 'Quantitative Methods',                  units: 3, pre_requisite: 'CCS104',                                       year_level: 2, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'ITP102', subject_name: 'Integrative Programming and Technologies', units: 3, pre_requisite: 'CCS109',                                    year_level: 2, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'PED104', subject_name: 'Physical Education 4',                  units: 2, pre_requisite: 'PED103',                                       year_level: 2, semester: '2nd Semester', program: 'BSIT' },

    // ── Year 3 · 1st Semester ─────────────────────────────────────────────────
    { subject_code: 'HIS101', subject_name: 'Readings in Philippine History',        units: 3, pre_requisite: null,                                           year_level: 3, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'ITEW3',  subject_name: 'Server Side Scripting',                 units: 3, pre_requisite: 'ITEW2',                                        year_level: 3, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'ITP103', subject_name: 'System Integration and Architecture',   units: 3, pre_requisite: 'ITP102',                                       year_level: 3, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'ITP104', subject_name: 'Information Management 2',              units: 3, pre_requisite: 'CCS110',                                       year_level: 3, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'ITP105', subject_name: 'Networking and Communication 2',        units: 3, pre_requisite: 'CCS111',                                       year_level: 3, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'ITP106', subject_name: 'Human Computer Interaction 2',          units: 3, pre_requisite: 'CCS105',                                       year_level: 3, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'SOC101', subject_name: 'The Contemporary World',                units: 3, pre_requisite: null,                                           year_level: 3, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'TEC101', subject_name: 'Technopreneurship',                     units: 3, pre_requisite: 'ENT101',                                       year_level: 3, semester: '1st Semester', program: 'BSIT' },

    // ── Year 3 · 2nd Semester ─────────────────────────────────────────────────
    { subject_code: 'CCS112', subject_name: 'Applications Development and Emerging Technologies', units: 3, pre_requisite: 'CCS103',                          year_level: 3, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'CCS113', subject_name: 'Information Assurance and Security',    units: 3, pre_requisite: '3rd Year Standing',                            year_level: 3, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'HMN101', subject_name: 'Art Appreciation',                      units: 3, pre_requisite: null,                                           year_level: 3, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'ITEW4',  subject_name: 'Responsive Web Design',                 units: 3, pre_requisite: 'ITEW3',                                        year_level: 3, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'ITP107', subject_name: 'Mobile Application Development',        units: 3, pre_requisite: 'CCS108',                                       year_level: 3, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'ITP108', subject_name: 'Capstone Project 1',                    units: 3, pre_requisite: 'ITP104, CCS108, ITP103, ITP105, ITP106, ITEW3', year_level: 3, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'ITP109', subject_name: 'Platform Technologies',                 units: 3, pre_requisite: 'ITP106',                                       year_level: 3, semester: '2nd Semester', program: 'BSIT' },

    // ── Year 4 · 1st Semester ─────────────────────────────────────────────────
    { subject_code: 'ENV101', subject_name: 'Environmental Science',                 units: 3, pre_requisite: null,                                           year_level: 4, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'ITEW5',  subject_name: 'Web Security and Optimization',         units: 3, pre_requisite: 'ITEW4',                                        year_level: 4, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'ITP110', subject_name: 'Web Technologies',                      units: 3, pre_requisite: 'ITP106',                                       year_level: 4, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'ITP111', subject_name: 'System Administration and Maintenance', units: 3, pre_requisite: 'ITP105, ITP109',                               year_level: 4, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'ITP112', subject_name: 'Capstone Project 2',                    units: 3, pre_requisite: 'ITP108',                                       year_level: 4, semester: '1st Semester', program: 'BSIT' },
    { subject_code: 'RIZ101', subject_name: 'Life and Works of Rizal',               units: 3, pre_requisite: null,                                           year_level: 4, semester: '1st Semester', program: 'BSIT' },

    // ── Year 4 · 2nd Semester ─────────────────────────────────────────────────
    { subject_code: 'ITEW6',  subject_name: 'Web Development Frameworks',            units: 3, pre_requisite: 'ITEW5',                                        year_level: 4, semester: '2nd Semester', program: 'BSIT' },
    { subject_code: 'ITP113', subject_name: 'IT Practicum (500 hours)',               units: 9, pre_requisite: 'ITP108',                                       year_level: 4, semester: '2nd Semester', program: 'BSIT' },
];

export const BSCS_SUBJECTS = [
    // ── Year 1 · 1st Semester ─────────────────────────────────────────────────
    { subject_code: 'CCS101', subject_name: 'Introduction to Computing',                              units: 3, pre_requisite: null,                                                                    year_level: 1, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'CCS102', subject_name: 'Computer Programming 1',                                 units: 3, pre_requisite: null,                                                                    year_level: 1, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'ETH101', subject_name: 'Ethics',                                                 units: 3, pre_requisite: null,                                                                    year_level: 1, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'MAT101', subject_name: 'Mathematics in the Modern World',                        units: 3, pre_requisite: null,                                                                    year_level: 1, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'NSTP1',  subject_name: 'National Service Training Program 1',                    units: 3, pre_requisite: null,                                                                    year_level: 1, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'PED101', subject_name: 'Physical Education 1',                                   units: 2, pre_requisite: null,                                                                    year_level: 1, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'PSY100', subject_name: 'Understanding the Self',                                 units: 3, pre_requisite: null,                                                                    year_level: 1, semester: '1st Semester', program: 'BSCS' },

    // ── Year 1 · 2nd Semester ─────────────────────────────────────────────────
    { subject_code: 'CCS103', subject_name: 'Computer Programming 2',                                 units: 3, pre_requisite: 'CCS102',                                                               year_level: 1, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'CCS104', subject_name: 'Discrete Structures 1',                                  units: 3, pre_requisite: 'MAT101',                                                               year_level: 1, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'CCS106', subject_name: 'Social and Professional Issues',                         units: 3, pre_requisite: 'ETH101',                                                               year_level: 1, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'COM101', subject_name: 'Purposive Communication',                                units: 3, pre_requisite: null,                                                                    year_level: 1, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'CSP101', subject_name: 'Analytic Geometry',                                      units: 3, pre_requisite: 'MAT101',                                                               year_level: 1, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'GAD101', subject_name: 'Gender and Development',                                 units: 3, pre_requisite: null,                                                                    year_level: 1, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'NSTP2',  subject_name: 'National Service Training Program 2',                    units: 3, pre_requisite: 'NSTP1',                                                                year_level: 1, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'PED102', subject_name: 'Physical Education 2',                                   units: 2, pre_requisite: 'PED101',                                                               year_level: 1, semester: '2nd Semester', program: 'BSCS' },

    // ── Year 2 · 1st Semester ─────────────────────────────────────────────────
    { subject_code: 'CCS107', subject_name: 'Data Structures and Algorithms 1',                       units: 3, pre_requisite: 'CCS103',                                                               year_level: 2, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'CCS108', subject_name: 'Object-Oriented Programming',                            units: 3, pre_requisite: 'CCS103',                                                               year_level: 2, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'CSEG1',  subject_name: 'Game Concepts and Productions',                          units: 3, pre_requisite: '2nd Year Standing',                                                    year_level: 2, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'CSP102', subject_name: 'Discrete Structures 2',                                  units: 3, pre_requisite: 'CCS104',                                                               year_level: 2, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'HIS101', subject_name: 'Readings in Philippine History',                         units: 3, pre_requisite: null,                                                                    year_level: 2, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'PED103', subject_name: 'Physical Education 3',                                   units: 2, pre_requisite: 'PED102',                                                               year_level: 2, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'STS101', subject_name: 'Science, Technology and Society',                        units: 3, pre_requisite: null,                                                                    year_level: 2, semester: '1st Semester', program: 'BSCS' },

    // ── Year 2 · 2nd Semester ─────────────────────────────────────────────────
    { subject_code: 'ACT101', subject_name: 'Principles of Accounting',                               units: 3, pre_requisite: null,                                                                    year_level: 2, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'CCS110', subject_name: 'Information Management 1',                               units: 3, pre_requisite: 'CCS101',                                                               year_level: 2, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'CSEG2',  subject_name: 'Game Programming 1',                                     units: 3, pre_requisite: 'CSEG1',                                                                year_level: 2, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'CSP103', subject_name: 'Data Structures and Algorithms 2',                       units: 3, pre_requisite: 'CCS107',                                                               year_level: 2, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'CSP104', subject_name: 'Calculus',                                               units: 3, pre_requisite: 'CSP101, CSP102',                                                       year_level: 2, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'CSP105', subject_name: 'Algorithms and Complexity',                              units: 3, pre_requisite: 'CCS107, CCS108',                                                       year_level: 2, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'HMN101', subject_name: 'Art Appreciation',                                       units: 3, pre_requisite: null,                                                                    year_level: 2, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'PED104', subject_name: 'Physical Education 4',                                   units: 2, pre_requisite: 'PED103',                                                               year_level: 2, semester: '2nd Semester', program: 'BSCS' },

    // ── Year 3 · 1st Semester ─────────────────────────────────────────────────
    { subject_code: 'CCS109', subject_name: 'System Analysis and Design',                             units: 3, pre_requisite: 'CCS101',                                                               year_level: 3, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'CCS112', subject_name: 'Applications Development and Emerging Technologies',     units: 3, pre_requisite: 'CCS103',                                                               year_level: 3, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'CCS113', subject_name: 'Information Assurance Security',                         units: 3, pre_requisite: 'PED104, HMN101, ACT101, CCS110, CSP103, CSP104, CSP105, CSEG2',       year_level: 3, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'CSEG3',  subject_name: 'Game Programming 2',                                     units: 3, pre_requisite: 'CSEG2',                                                                year_level: 3, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'CSP106', subject_name: 'Automata Theory and Formal Languages',                   units: 3, pre_requisite: 'CSP105',                                                               year_level: 3, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'CSP107', subject_name: 'Computer Organization and Assembly Language Programming', units: 3, pre_requisite: 'CSP103',                                                              year_level: 3, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'ENT101', subject_name: 'The Entrepreneurial Mind',                               units: 3, pre_requisite: null,                                                                    year_level: 3, semester: '1st Semester', program: 'BSCS' },

    // ── Year 3 · 2nd Semester ─────────────────────────────────────────────────
    { subject_code: 'CSEG4',  subject_name: 'Game Programming 3 (Pure Labs)',                         units: 3, pre_requisite: 'CSEG3',                                                                year_level: 3, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'CSP108', subject_name: 'Programming Languages',                                  units: 3, pre_requisite: 'CCS103',                                                               year_level: 3, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'CSP109', subject_name: 'Software Engineering 1',                                 units: 3, pre_requisite: 'CCS109',                                                               year_level: 3, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'CSP110', subject_name: 'Numerical Analysis',                                     units: 3, pre_requisite: 'CSP106, CSEG3',                                                        year_level: 3, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'CSP111', subject_name: 'Thesis 1',                                               units: 3, pre_requisite: 'CSP106, CSP107',                                                       year_level: 3, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'RIZ101', subject_name: 'Life and Works of Rizal',                                units: 3, pre_requisite: null,                                                                    year_level: 3, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'SOC101', subject_name: 'The Contemporary World',                                 units: 3, pre_requisite: null,                                                                    year_level: 3, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'TEC101', subject_name: 'Technopreneurship',                                      units: 3, pre_requisite: 'ENT101',                                                               year_level: 3, semester: '2nd Semester', program: 'BSCS' },

    // ── Year 4 · 1st Semester ─────────────────────────────────────────────────
    { subject_code: 'CCS105', subject_name: 'Human Computer Interaction 1',                           units: 3, pre_requisite: 'CCS101',                                                               year_level: 4, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'CSEG5',  subject_name: 'Artificial Intelligence for Games',                      units: 3, pre_requisite: 'CSEG4',                                                                year_level: 4, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'CSP112', subject_name: 'Operating Systems',                                      units: 3, pre_requisite: 'CSP107',                                                               year_level: 4, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'CSP113', subject_name: 'Software Engineering 2',                                 units: 3, pre_requisite: 'CSP109',                                                               year_level: 4, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'CSP114', subject_name: 'Thesis 2',                                               units: 3, pre_requisite: 'CSP111',                                                               year_level: 4, semester: '1st Semester', program: 'BSCS' },
    { subject_code: 'ENV101', subject_name: 'Environmental Science',                                  units: 3, pre_requisite: null,                                                                    year_level: 4, semester: '1st Semester', program: 'BSCS' },

    // ── Year 4 · 2nd Semester ─────────────────────────────────────────────────
    { subject_code: 'CCS111', subject_name: 'Networking and Communication 1',                         units: 3, pre_requisite: 'CSP112',                                                               year_level: 4, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'CSEG6',  subject_name: 'Advance Game Design',                                    units: 3, pre_requisite: 'CSEG5',                                                                year_level: 4, semester: '2nd Semester', program: 'BSCS' },
    { subject_code: 'CSP115', subject_name: 'CS Practicum (300 hours)',                               units: 4, pre_requisite: 'CSP111',                                                               year_level: 4, semester: '2nd Semester', program: 'BSCS' },
];

export const ALL_SUBJECTS = [...BSIT_SUBJECTS, ...BSCS_SUBJECTS];

/**
 * Get subjects filtered by program, optionally by year and semester.
 * @param {'BSIT'|'BSCS'} program
 * @param {number} [year]
 * @param {string} [semester]
 */
export function getSubjectsByProgram(program, year, semester) {
    return ALL_SUBJECTS.filter(s =>
        s.program === program &&
        (year     == null || s.year_level === year) &&
        (semester == null || s.semester   === semester)
    );
}
