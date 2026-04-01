import React, { useState, useEffect } from 'react';
import { getAcademicRecords, deleteAcademicRecord } from '../api';
import { GraduationCap, Search, TrendingUp, X, CheckCircle, XCircle, MinusCircle, Users, AlertTriangle, UserCheck, UserX } from 'lucide-react';

const gpaColor = (gpa) => {
    if (gpa == null) return '#78716c';
    if (gpa <= 1.5)  return '#16a34a';
    if (gpa <= 3.0)  return '#2563eb';
    return '#dc2626';
};

const passStatus = (gpa) => {
    if (gpa == null) return 'no-grade';
    return parseFloat(gpa) <= 3.0 ? 'passed' : 'failed';
};

const STATUS_STYLE = {
    passed:     { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0', label: 'Passed' },
    failed:     { bg: '#fef2f2', text: '#dc2626', border: '#fecaca', label: 'Failed' },
    'no-grade': { bg: '#f8fafc', text: '#78716c', border: '#e2e8f0', label: 'No Grade' },
};

// ── Student standing logic ────────────────────────────────────────────────────
// graduated / dropped → from student.status
// irregular → has at least 1 failed subject in any semester
// regular   → all graded subjects passed (or no grades yet)
const STANDING = {
    regular:    { label: 'Regular',    bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0', Icon: UserCheck },
    irregular:  { label: 'Irregular',  bg: '#fffbeb', text: '#d97706', border: '#fde68a', Icon: AlertTriangle },
    graduated:  { label: 'Graduated',  bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe', Icon: GraduationCap },
    dropped:    { label: 'Dropped',    bg: '#fef2f2', text: '#dc2626', border: '#fecaca', Icon: UserX },
};

function computeStanding(studentStatus, records) {
    if (studentStatus === 'graduated') return 'graduated';
    if (studentStatus === 'dropped')   return 'dropped';
    const hasAnyFailed = records.some(r => r.gpa != null && parseFloat(r.gpa) > 3.0);
    return hasAnyFailed ? 'irregular' : 'regular';
}

const SEM_ORDER = ['1st Semester', '2nd Semester', 'Summer'];

// ── Tracker Modal ─────────────────────────────────────────────────────────────
function TrackerModal({ studentName, records, studentStatus, onClose }) {
    const standing = computeStanding(studentStatus, records);
    const st = STANDING[standing];
    const StIcon = st.Icon;

    const semMap = {};
    records.forEach(r => {
        const key = `${r.school_year}||${r.semester || ''}`;
        if (!semMap[key]) semMap[key] = { school_year: r.school_year, semester: r.semester, subjects: [] };
        semMap[key].subjects.push(r);
    });

    const semesters = Object.values(semMap).sort((a, b) => {
        if (a.school_year !== b.school_year) return a.school_year < b.school_year ? -1 : 1;
        return SEM_ORDER.indexOf(a.semester) - SEM_ORDER.indexOf(b.semester);
    });

    const allWithGpa  = records.filter(r => r.gpa != null);
    const overallGpa  = allWithGpa.length ? allWithGpa.reduce((s, r) => s + parseFloat(r.gpa), 0) / allWithGpa.length : null;
    const totalUnits  = records.reduce((s, r) => s + (r.units ? parseInt(r.units) : 0), 0);
    const passedCount = allWithGpa.filter(r => passStatus(r.gpa) === 'passed').length;
    const failedCount = allWithGpa.filter(r => passStatus(r.gpa) === 'failed').length;

    return (
        <div style={overlay}>
            <div style={{ ...modalCard, maxWidth: 900, width: '95vw', maxHeight: '92vh', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <TrendingUp size={22} color="#2563eb" />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#1c1917' }}>Academic Tracker</h2>
                            <p style={{ margin: 0, fontSize: '.8rem', color: '#78716c' }}>{studentName}</p>
                        </div>
                    </div>
                    <button onClick={onClose} style={iconBtn}><X size={16} /></button>
                </div>

                {/* Standing banner */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 16px', borderRadius: 12, background: st.bg, border: `1.5px solid ${st.border}`, marginBottom: 16, flexShrink: 0 }}>
                    <StIcon size={18} color={st.text} />
                    <div>
                        <span style={{ fontWeight: 800, fontSize: '.9rem', color: st.text }}>{st.label} Student</span>
                        <span style={{ fontSize: '.78rem', color: st.text, opacity: .8, marginLeft: 10 }}>
                            {standing === 'regular'   && 'All graded subjects passed — on track with the curriculum.'}
                            {standing === 'irregular' && `${failedCount} failed subject${failedCount !== 1 ? 's' : ''} — retaking subjects outside the regular sequence.`}
                            {standing === 'graduated' && 'Student has completed the program and graduated.'}
                            {standing === 'dropped'   && 'Student has dropped out of the program.'}
                        </span>
                    </div>
                </div>

                {/* Summary cards */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 10, marginBottom: 16, flexShrink: 0 }}>
                    {[
                        { label: 'Standing',        value: st.label,    color: st.text,    bg: st.bg },
                        { label: 'Overall GPA',     value: overallGpa != null ? parseFloat(overallGpa).toFixed(2) : '—', color: gpaColor(overallGpa), bg: '#eff6ff' },
                        { label: 'Total Units',     value: totalUnits || '—', color: '#7c3aed', bg: '#f5f3ff' },
                        { label: 'Subjects Passed', value: passedCount, color: '#16a34a', bg: '#f0fdf4' },
                        { label: 'Subjects Failed', value: failedCount, color: '#dc2626', bg: '#fef2f2' },
                    ].map(c => (
                        <div key={c.label} style={{ background: c.bg, borderRadius: 12, padding: '12px 16px', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: c.color }}>{c.value}</div>
                            <div style={{ fontSize: '.7rem', color: '#78716c', fontWeight: 600, marginTop: 2 }}>{c.label}</div>
                        </div>
                    ))}
                </div>

                {/* Semester breakdown */}
                <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
                    {semesters.map((sem, si) => {
                        const subs      = sem.subjects;
                        const withGpa   = subs.filter(r => r.gpa != null);
                        const semGpa    = withGpa.length ? withGpa.reduce((s, r) => s + parseFloat(r.gpa), 0) / withGpa.length : null;
                        const semUnits  = subs.reduce((s, r) => s + (r.units ? parseInt(r.units) : 0), 0);
                        const semPassed = withGpa.filter(r => passStatus(r.gpa) === 'passed').length;
                        const semFailed = withGpa.filter(r => passStatus(r.gpa) === 'failed').length;
                        // Semester standing: all passed = regular, any failed = irregular
                        const semStanding = semFailed > 0 ? 'irregular' : semPassed > 0 ? 'regular' : 'no-grade';
                        const semStStyle  = semStanding === 'irregular'
                            ? { bg: '#fffbeb', text: '#d97706', border: '#fde68a', label: 'Irregular' }
                            : semStanding === 'regular'
                            ? { bg: '#f0fdf4', text: '#16a34a', border: '#bbf7d0', label: 'Regular' }
                            : { bg: '#f8fafc', text: '#78716c', border: '#e2e8f0', label: 'No Grade' };

                        return (
                            <div key={si} style={{ border: `1.5px solid ${semStanding === 'irregular' ? '#fde68a' : '#e2e8f0'}`, borderRadius: 14, overflow: 'hidden' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 16px',
                                    background: semStanding === 'irregular'
                                        ? 'linear-gradient(135deg,#92400e,#d97706)'
                                        : 'linear-gradient(135deg,#1e3a5f,#2563eb)',
                                    color: '#fff' }}>
                                    <div>
                                        <div style={{ fontWeight: 800, fontSize: '.9rem' }}>{sem.school_year}{sem.semester ? ` · ${sem.semester}` : ''}</div>
                                        <div style={{ fontSize: '.72rem', opacity: .8, marginTop: 1 }}>{subs.length} subject{subs.length !== 1 ? 's' : ''} · {semUnits} units</div>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                        {semGpa != null && (
                                            <div style={{ textAlign: 'right' }}>
                                                <div style={{ fontSize: '.68rem', opacity: .75 }}>Semester GPA</div>
                                                <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{parseFloat(semGpa).toFixed(2)}</div>
                                            </div>
                                        )}
                                        <span style={{ fontSize: '.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: 20, background: semStStyle.bg, color: semStStyle.text, border: `1px solid ${semStStyle.border}` }}>
                                            {semStStyle.label}
                                        </span>
                                    </div>
                                </div>
                                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '.82rem' }}>
                                    <thead>
                                        <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                            <th style={th}>#</th>
                                            <th style={th}>Code</th>
                                            <th style={{ ...th, textAlign: 'left' }}>Subject</th>
                                            <th style={th}>Units</th>
                                            <th style={th}>Grade</th>
                                            <th style={th}>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {subs.map((r, i) => {
                                            const ps  = passStatus(r.gpa);
                                            const pss = STATUS_STYLE[ps];
                                            return (
                                                <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9', background: ps === 'failed' ? '#fff7ed' : i % 2 === 0 ? '#fff' : '#fafafa' }}>
                                                    <td style={{ ...td, color: '#a8a29e' }}>{i + 1}</td>
                                                    <td style={td}>{r.course_code ? <span style={{ fontFamily: 'monospace', fontSize: '.78rem', background: '#f1f5f9', padding: '2px 6px', borderRadius: 5, fontWeight: 700 }}>{r.course_code}</span> : '—'}</td>
                                                    <td style={{ ...td, textAlign: 'left', fontWeight: 600, color: '#1c1917' }}>{r.subject || '—'}</td>
                                                    <td style={{ ...td, color: '#78716c' }}>{r.units ?? '—'}</td>
                                                    <td style={td}>{r.gpa != null ? <span style={{ fontWeight: 800, color: gpaColor(parseFloat(r.gpa)) }}>{parseFloat(r.gpa).toFixed(2)}</span> : <span style={{ color: '#a8a29e' }}>—</span>}</td>
                                                    <td style={td}>
                                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '.72rem', fontWeight: 700, padding: '2px 8px', borderRadius: 20, background: pss.bg, color: pss.text, border: `1px solid ${pss.border}` }}>
                                                            {ps === 'passed'   && <CheckCircle size={11} />}
                                                            {ps === 'failed'   && <XCircle size={11} />}
                                                            {ps === 'no-grade' && <MinusCircle size={11} />}
                                                            {pss.label}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                    <tfoot>
                                        <tr style={{ background: '#f8fafc', borderTop: '2px solid #e2e8f0' }}>
                                            <td colSpan={3} style={{ ...td, textAlign: 'right', fontWeight: 700, color: '#44403c', fontSize: '.78rem' }}>Semester Total</td>
                                            <td style={{ ...td, fontWeight: 800, color: '#1c1917' }}>{semUnits}</td>
                                            <td style={{ ...td, fontWeight: 800, color: gpaColor(semGpa) }}>{semGpa != null ? parseFloat(semGpa).toFixed(2) : '—'}</td>
                                            <td style={td}><span style={{ fontSize: '.72rem', fontWeight: 700, color: semStStyle.text }}>{semPassed}P / {semFailed}F</span></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

const PAGE_SIZE = 10;

// ── Main page ─────────────────────────────────────────────────────────────────
const PROGRAMS = [
    { key: 'IT', label: 'Information Technology', short: 'BSIT', dept: 'Information Technology', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
    { key: 'CS', label: 'Computer Science',       short: 'BSCS', dept: 'Computer Science',       color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
];

export default function AcademicRecordsMap() {
    const [records, setRecords]       = useState([]);
    const [loading, setLoading]       = useState(true);
    const [tracker, setTracker]       = useState(null);
    const [page, setPage]             = useState(1);
    const [filterStanding, setFilter] = useState('all');
    const [program, setProgram]       = useState('IT');

    // Search state
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch]           = useState('');
    const [filterSem, setFilterSem]     = useState('');
    const [filterYear, setFilterYear]   = useState('');

    // Debounce search input → search
    useEffect(() => {
        const t = setTimeout(() => setSearch(searchInput.trim()), 300);
        return () => clearTimeout(t);
    }, [searchInput]);

    const load = () => {
        setLoading(true);
        getAcademicRecords().then(r => setRecords(r.data)).finally(() => setLoading(false));
    };
    useEffect(() => { load(); }, []);

    // Derive unique school years from loaded records
    const allSchoolYears = [...new Set(records.map(r => r.school_year).filter(Boolean))].sort().reverse();
    const allSemesters   = ['1st Semester', '2nd Semester', 'Summer'];

    const activeProgram = PROGRAMS.find(p => p.key === program);

    // Group by student, store department
    const grouped = {};
    records.forEach(r => {
        const key = r.student
            ? `${r.student.last_name}, ${r.student.first_name}${r.student.middle_name ? ` ${r.student.middle_name[0]}.` : ''}`
            : `Student #${r.student_id}`;
        if (!grouped[key]) grouped[key] = {
            name: key,
            recs: [],
            studentStatus: r.student?.status ?? 'active',
            studentId: r.student?.student_id ?? '',
            department: r.student?.department ?? '',
        };
        grouped[key].recs.push(r);
    });

    const allStudents = Object.values(grouped).map(s => ({
        ...s,
        standing: computeStanding(s.studentStatus, s.recs),
    }));

    // Filter by active program first
    const students = allStudents.filter(s => s.department === activeProgram?.dept);

    // Standing counts (scoped to current program)
    const counts = { all: students.length, regular: 0, irregular: 0, graduated: 0, dropped: 0 };
    students.forEach(s => { counts[s.standing] = (counts[s.standing] || 0) + 1; });

    // Apply all filters
    const q = search.toLowerCase();
    const filtered = students.filter(s => {
        if (filterStanding !== 'all' && s.standing !== filterStanding) return false;
        if (filterSem  && !s.recs.some(r => r.semester === filterSem))   return false;
        if (filterYear && !s.recs.some(r => r.school_year === filterYear)) return false;
        if (q) {
            const nameMatch    = s.name.toLowerCase().includes(q);
            const idMatch      = s.studentId?.toLowerCase().includes(q);
            const subjectMatch = s.recs.some(r =>
                r.subject?.toLowerCase().includes(q) ||
                r.course_code?.toLowerCase().includes(q) ||
                r.school_year?.toLowerCase().includes(q)
            );
            if (!nameMatch && !idMatch && !subjectMatch) return false;
        }
        return true;
    });

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const hasActiveFilters = search || filterSem || filterYear || filterStanding !== 'all';
    const clearAll = () => { setSearchInput(''); setSearch(''); setFilterSem(''); setFilterYear(''); setFilter('all'); setPage(1); };

    // Reset page when program or filters change
    useEffect(() => setPage(1), [program, filterStanding, search, filterSem, filterYear]);
    const FILTER_TABS = [
        { key: 'all',       label: 'All',       color: '#44403c', activeBg: '#1c1917', activeText: '#fff' },
        { key: 'regular',   label: 'Regular',   color: '#16a34a', activeBg: '#16a34a', activeText: '#fff' },
        { key: 'irregular', label: 'Irregular', color: '#d97706', activeBg: '#d97706', activeText: '#fff' },
        { key: 'graduated', label: 'Graduated', color: '#2563eb', activeBg: '#2563eb', activeText: '#fff' },
        { key: 'dropped',   label: 'Dropped',   color: '#dc2626', activeBg: '#dc2626', activeText: '#fff' },
    ];

    return (
        <div>
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                    <div style={iconWrap}><GraduationCap size={22} color="#f97316" /></div>
                    <h1 style={h1}>Academic Records</h1>
                </div>
                <p style={sub}>{activeProgram?.label} — {filtered.length} of {students.length} student{students.length !== 1 ? 's' : ''}</p>
            </div>

            {/* Program toggle */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                {PROGRAMS.map(p => (
                    <button key={p.key} onClick={() => { setProgram(p.key); setFilter('all'); setPage(1); }}
                        style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 22px', borderRadius: 14,
                            border: `2px solid ${program === p.key ? p.color : '#e7e5e4'}`,
                            background: program === p.key ? p.bg : '#fff',
                            color: program === p.key ? p.color : '#78716c',
                            cursor: 'pointer', fontFamily: "'Inter',sans-serif",
                            boxShadow: program === p.key ? `0 0 0 3px ${p.border}` : 'none',
                            transition: 'all .15s' }}>
                        <GraduationCap size={16} />
                        <span style={{ fontWeight: 800, fontSize: '.9rem' }}>{p.short}</span>
                        <span style={{ fontWeight: 500, fontSize: '.82rem', opacity: .75 }}>{p.label}</span>
                    </button>
                ))}
            </div>

            {/* Standing summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 20 }}>
                {(['regular','irregular','graduated','dropped']).map(k => {
                    const s = STANDING[k]; const SIcon = s.Icon;
                    return (
                        <div key={k} onClick={() => { setFilter(k); setPage(1); }}
                            style={{ background: s.bg, border: `1.5px solid ${filterStanding === k ? s.text : s.border}`, borderRadius: 14, padding: '14px 18px', cursor: 'pointer', transition: 'all .15s', boxShadow: filterStanding === k ? `0 0 0 3px ${s.border}` : 'none' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                <SIcon size={16} color={s.text} />
                                <span style={{ fontSize: '.78rem', fontWeight: 700, color: s.text, textTransform: 'uppercase', letterSpacing: '.04em' }}>{s.label}</span>
                            </div>
                            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: s.text }}>{counts[k] || 0}</div>
                            <div style={{ fontSize: '.7rem', color: s.text, opacity: .7, marginTop: 2 }}>student{counts[k] !== 1 ? 's' : ''}</div>
                        </div>
                    );
                })}
            </div>

            {/* ── Enhanced search bar ── */}
            <div style={{ background: '#fff', border: '1.5px solid #e7e5e4', borderRadius: 16, padding: '14px 16px', marginBottom: 14, boxShadow: '0 1px 4px rgba(0,0,0,.04)' }}>
                {/* Main search input */}
                <div style={{ position: 'relative', marginBottom: 12 }}>
                    <Search size={16} color="#f97316" style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    <input
                        type="text"
                        value={searchInput}
                        onChange={e => { setSearchInput(e.target.value); setPage(1); }}
                        placeholder="Search by student name, student ID, subject, course code, or school year…"
                        style={{ width: '100%', paddingLeft: 42, paddingRight: searchInput ? 36 : 14, paddingTop: 10, paddingBottom: 10,
                            borderRadius: 10, border: '1.5px solid #e7e5e4', fontSize: '.875rem',
                            fontFamily: "'Inter',sans-serif", color: '#1c1917', boxSizing: 'border-box',
                            outline: 'none', background: '#fafaf9' }}
                    />
                    {searchInput && (
                        <button onClick={() => { setSearchInput(''); setSearch(''); }} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#a8a29e', display: 'flex', alignItems: 'center' }}>
                            <X size={15} />
                        </button>
                    )}
                </div>

                {/* Filter row */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    {/* Standing tabs */}
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        {FILTER_TABS.map(t => (
                            <button key={t.key} onClick={() => { setFilter(t.key); setPage(1); }}
                                style={{ padding: '5px 12px', borderRadius: 20, border: `1.5px solid ${filterStanding === t.key ? t.activeBg : '#e7e5e4'}`,
                                    background: filterStanding === t.key ? t.activeBg : '#fff',
                                    color: filterStanding === t.key ? t.activeText : t.color,
                                    fontWeight: 700, fontSize: '.75rem', cursor: 'pointer', fontFamily: "'Inter',sans-serif",
                                    display: 'flex', alignItems: 'center', gap: 4 }}>
                                {t.label}
                                <span style={{ background: filterStanding === t.key ? 'rgba(255,255,255,.25)' : '#f5f5f4', borderRadius: 10, padding: '0 5px', fontSize: '.68rem', fontWeight: 800 }}>{counts[t.key] || 0}</span>
                            </button>
                        ))}
                    </div>

                    <div style={{ width: 1, height: 24, background: '#e7e5e4', margin: '0 2px' }} />

                    {/* School year dropdown */}
                    <select value={filterYear} onChange={e => { setFilterYear(e.target.value); setPage(1); }}
                        style={{ padding: '5px 10px', borderRadius: 10, border: `1.5px solid ${filterYear ? '#f97316' : '#e7e5e4'}`,
                            background: filterYear ? '#fff7ed' : '#fff', color: filterYear ? '#ea580c' : '#78716c',
                            fontSize: '.78rem', fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: 'pointer' }}>
                        <option value="">All School Years</option>
                        {allSchoolYears.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>

                    {/* Semester dropdown */}
                    <select value={filterSem} onChange={e => { setFilterSem(e.target.value); setPage(1); }}
                        style={{ padding: '5px 10px', borderRadius: 10, border: `1.5px solid ${filterSem ? '#f97316' : '#e7e5e4'}`,
                            background: filterSem ? '#fff7ed' : '#fff', color: filterSem ? '#ea580c' : '#78716c',
                            fontSize: '.78rem', fontWeight: 600, fontFamily: "'Inter',sans-serif", cursor: 'pointer' }}>
                        <option value="">All Semesters</option>
                        {allSemesters.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>

                    {/* Clear all */}
                    {hasActiveFilters && (
                        <button onClick={clearAll}
                            style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px', borderRadius: 10,
                                background: '#fef2f2', border: '1.5px solid #fecaca', color: '#dc2626',
                                fontSize: '.75rem', fontWeight: 700, cursor: 'pointer', fontFamily: "'Inter',sans-serif" }}>
                            <X size={13} /> Clear filters
                        </button>
                    )}

                    {/* Result count */}
                    <span style={{ marginLeft: hasActiveFilters ? 0 : 'auto', fontSize: '.75rem', color: '#78716c', fontWeight: 600 }}>
                        {filtered.length} result{filtered.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {/* Active filter chips */}
                {(search || filterSem || filterYear) && (
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
                        {search && (
                            <span style={chipStyle}>
                                "{search}" <button onClick={() => { setSearchInput(''); setSearch(''); }} style={chipX}><X size={11} /></button>
                            </span>
                        )}
                        {filterYear && (
                            <span style={chipStyle}>
                                {filterYear} <button onClick={() => setFilterYear('')} style={chipX}><X size={11} /></button>
                            </span>
                        )}
                        {filterSem && (
                            <span style={chipStyle}>
                                {filterSem} <button onClick={() => setFilterSem('')} style={chipX}><X size={11} /></button>
                            </span>
                        )}
                    </div>
                )}
            </div>

            {loading ? (
                <div className="loading"><div className="loading-spinner" /><p>Loading…</p></div>
            ) : filtered.length === 0 ? (
                <div className="empty"><GraduationCap size={40} color="#fed7aa" /><p style={{ marginTop: 10 }}>No students found.</p></div>
            ) : (
                <div className="card">
                    <div className="card-body" style={{ padding: 0 }}>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Student Name</th>
                                        <th>Standing</th>
                                        <th>Subjects Taken</th>
                                        <th>Total Units</th>
                                        <th>Overall GPA</th>
                                        <th>Passed</th>
                                        <th>Failed</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginated.map(({ name, recs, standing, studentStatus }, i) => {
                                        const idx        = (page - 1) * PAGE_SIZE + i + 1;
                                        const withGpa    = recs.filter(r => r.gpa != null);
                                        const avgGpa     = withGpa.length ? withGpa.reduce((s, r) => s + parseFloat(r.gpa), 0) / withGpa.length : null;
                                        const totalUnits = recs.reduce((s, r) => s + (r.units ? parseInt(r.units) : 0), 0);
                                        const passed     = withGpa.filter(r => passStatus(r.gpa) === 'passed').length;
                                        const failed     = withGpa.filter(r => passStatus(r.gpa) === 'failed').length;
                                        const st         = STANDING[standing];
                                        const StIcon     = st.Icon;
                                        return (
                                            <tr key={name}>
                                                <td>{idx}</td>
                                                <td>
                                                    <button onClick={() => setTracker({ studentName: name, records: recs, studentStatus })}
                                                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                                                            fontWeight: 700, color: '#2563eb', fontSize: '.875rem', fontFamily: "'Inter',sans-serif",
                                                            textDecoration: 'underline', textUnderlineOffset: 3 }}>
                                                        {name}
                                                    </button>
                                                </td>
                                                <td>
                                                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '.75rem', fontWeight: 700,
                                                        padding: '3px 10px', borderRadius: 20, background: st.bg, color: st.text, border: `1px solid ${st.border}` }}>
                                                        <StIcon size={12} /> {st.label}
                                                    </span>
                                                </td>
                                                <td><span style={{ fontWeight: 700, color: '#1c1917' }}>{recs.length}</span><span style={{ color: '#78716c', fontSize: '.78rem', marginLeft: 4 }}>subj.</span></td>
                                                <td>{totalUnits > 0 ? <span style={{ fontWeight: 700 }}>{totalUnits}</span> : '—'}</td>
                                                <td>{avgGpa != null ? <span style={{ fontWeight: 800, color: gpaColor(avgGpa) }}>{parseFloat(avgGpa).toFixed(2)}</span> : '—'}</td>
                                                <td><span style={{ fontWeight: 700, color: '#16a34a' }}>{passed}</span></td>
                                                <td>{failed > 0 ? <span style={{ fontWeight: 700, color: '#dc2626' }}>{failed}</span> : <span style={{ color: '#a8a29e' }}>0</span>}</td>
                                                <td>
                                                    <button onClick={() => setTracker({ studentName: name, records: recs, studentStatus })}
                                                        style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 8,
                                                            background: '#eff6ff', border: '1px solid #bfdbfe', color: '#2563eb',
                                                            cursor: 'pointer', fontSize: '.75rem', fontWeight: 700, fontFamily: "'Inter',sans-serif" }}>
                                                        <TrendingUp size={12} /> View Tracker
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    {totalPages >= 1 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 20px', borderTop: '1px solid #f5f5f4' }}>
                            <span style={{ fontSize: '.8rem', color: '#78716c' }}>
                                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} students
                            </span>
                            <div style={{ display: 'flex', gap: 4 }}>
                                <button onClick={() => setPage(1)} disabled={page === 1} style={pgBtn(page === 1)}>«</button>
                                <button onClick={() => setPage(p => p - 1)} disabled={page === 1} style={pgBtn(page === 1)}>‹</button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                    .reduce((acc, p, idx, arr) => { if (idx > 0 && p - arr[idx - 1] > 1) acc.push('…'); acc.push(p); return acc; }, [])
                                    .map((p, i) => p === '…'
                                        ? <span key={`e${i}`} style={{ padding: '0 6px', color: '#a8a29e', lineHeight: '32px' }}>…</span>
                                        : <button key={p} onClick={() => setPage(p)} style={pgBtn(false, p === page)}>{p}</button>)}
                                <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages} style={pgBtn(page === totalPages)}>›</button>
                                <button onClick={() => setPage(totalPages)} disabled={page === totalPages} style={pgBtn(page === totalPages)}>»</button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {tracker && (
                <TrackerModal
                    studentName={tracker.studentName}
                    records={tracker.records}
                    studentStatus={tracker.studentStatus}
                    onClose={() => setTracker(null)}
                />
            )}
        </div>
    );
}

const h1      = { fontSize: '1.6rem', fontWeight: 800, color: '#1c1917', margin: 0 };
const sub     = { color: '#78716c', margin: 0 };
const iconWrap = { width: 44, height: 44, borderRadius: 12, background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fed7aa' };
const iconBtn  = { background: 'rgba(0,0,0,.04)', border: '1px solid rgba(0,0,0,.08)', borderRadius: 7, width: 30, height: 30, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#78716c' };
const overlay  = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.5)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 1000, padding: '24px 16px', overflowY: 'auto' };
const modalCard = { background: '#fff', borderRadius: 20, padding: '28px 32px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,.25)', margin: 'auto' };
const th       = { padding: '8px 12px', textAlign: 'center', fontWeight: 700, fontSize: '.75rem', color: '#44403c', whiteSpace: 'nowrap' };
const td       = { padding: '8px 12px', textAlign: 'center', fontSize: '.82rem', color: '#44403c' };
const pgBtn    = (disabled, active = false) => ({
    minWidth: 32, height: 32, padding: '0 8px', borderRadius: 8, border: '1.5px solid',
    borderColor: active ? '#ea580c' : disabled ? '#e7e5e4' : '#e7e5e4',
    background: active ? '#fff7ed' : '#fff',
    color: active ? '#ea580c' : disabled ? '#d4d4d4' : '#44403c',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: active ? 800 : 600, fontSize: '.8rem', fontFamily: "'Inter',sans-serif",
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
});

const chipStyle = { display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 10px', borderRadius: 20, background: '#fff7ed', border: '1.5px solid #fed7aa', color: '#ea580c', fontSize: '.72rem', fontWeight: 700 };
const chipX     = { background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', color: '#ea580c' };
