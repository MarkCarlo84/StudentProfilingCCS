import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
    getStudents, createStudent, updateStudent, deleteStudent,
    studentAddAffiliation, studentAddSkill, studentAddAcademicRecord, studentAddViolation,
    studentAddNonAcademicHistory,
    deleteAffiliation, deleteSkill, deleteAcademicRecord, deleteViolation, deleteNonAcademicHistory,
} from '../api';
import {
    GraduationCap, Search, Printer, Building, Plus, Pencil, Trash2, X, Check,
    Network, Zap, ChevronRight, ChevronLeft, BookOpen, AlertTriangle, Eye, Activity,
} from 'lucide-react';

// ── Shared helpers ────────────────────────────────────────────────────────────
function Badge({ value }) {
    return <span className={`badge badge-${value?.toLowerCase().replace(/\s/g, '_')}`}>{value?.replace(/_/g, ' ')}</span>;
}

const SKILL_LEVELS = ['beginner', 'intermediate', 'advanced', 'expert'];
const LEVEL_COLORS = {
    expert:       { bg: '#f5f3ff', text: '#7c3aed', border: '#ddd6fe' },
    advanced:     { bg: '#eff6ff', text: '#2563eb', border: '#bfdbfe' },
    intermediate: { bg: '#f0fdf4', text: '#059669', border: '#bbf7d0' },
    beginner:     { bg: '#fffbeb', text: '#d97706', border: '#fde68a' },
};
const SEVERITY_COLORS = { minor: '#d97706', major: '#dc2626', grave: '#7c3aed' };
const SEMESTERS = ['1st Semester', '2nd Semester', 'Summer'];
const SEVERITIES = ['minor', 'major', 'grave'];

const emptyStudent = {
    student_id: '', first_name: '', middle_name: '', last_name: '',
    age: '', gender: 'Male', guardian_name: '', date_of_birth: '',
    address: '', contact_number: '09', email: '', enrollment_date: '', status: 'active', department: '',
};
const emptyAffiliation = { name: '', type: '', role: '', date_joined: '' };
const emptySkill      = { skill_name: '', skill_level: 'beginner', certification: false };
const emptyRecord     = { school_year: '', semester: '', subject: '', course_code: '', units: '', gpa: '', remarks: '' };
const emptyViolation  = { violation_type: '', description: '', date_committed: '', severity_level: 'minor', action_taken: '' };
const emptyActivity   = { activity_title: '', category: '', description: '', date_started: '', date_ended: '', role: '', organizer: '', game_result: '' };

// ── "Show More" detail modal ──────────────────────────────────────────────────
function DetailModal({ title, icon, onClose, children }) {
    return (
        <div style={{ ...overlay, zIndex: 1100 }}>
            <div style={{ ...modalCard, maxWidth: 700, maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        {icon}
                        <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 800, color: '#1c1917' }}>{title}</h2>
                    </div>
                    <button onClick={onClose} style={iconBtnStyle}><X size={16} /></button>
                </div>
                <div style={{ overflowY: 'auto', flex: 1 }}>{children}</div>
            </div>
        </div>
    );
}

// ── Show-more button used in table cells ──────────────────────────────────────
function ShowMoreBtn({ count, label, color = '#ea580c', onClick }) {
    if (count === 0) return <span style={{ color: '#d4d4d4', fontSize: '.75rem' }}>—</span>;
    return (
        <button onClick={onClick} style={{
            display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px',
            borderRadius: 20, border: `1.5px solid ${color}30`, background: `${color}10`,
            color, cursor: 'pointer', fontSize: '.75rem', fontWeight: 700,
            fontFamily: "'Inter',sans-serif", whiteSpace: 'nowrap',
        }}>
            <Eye size={11} /> {count} {label}
        </button>
    );
}

// ── Affiliations detail modal content ─────────────────────────────────────────
function AffiliationsDetail({ student, onChanged }) {
    const [list, setList] = useState(student.affiliations || []);
    const [form, setForm] = useState(emptyAffiliation);
    const [saving, setSaving] = useState(false);
    const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

    const add = async () => {
        if (!form.name.trim()) return;
        setSaving(true);
        try {
            const res = await studentAddAffiliation(student.id, { name: form.name, type: form.type || null, role: form.role || null, date_joined: form.date_joined || null });
            setList(p => [...p, res.data]);
            setForm(emptyAffiliation);
            onChanged();
        } finally { setSaving(false); }
    };
    const remove = async (id) => {
        if (!window.confirm('Remove this affiliation?')) return;
        await deleteAffiliation(id);
        setList(p => p.filter(a => a.id !== id));
        onChanged();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={addBox}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ gridColumn: '1/-1' }}>
                        <label style={lStyle}>Organization Name</label>
                        <input style={iStyle} value={form.name} onChange={set('name')} placeholder="e.g. ACSS, Red Cross" />
                    </div>
                    <div><label style={lStyle}>Type</label><input style={iStyle} value={form.type} onChange={set('type')} placeholder="e.g. Academic" /></div>
                    <div><label style={lStyle}>Role</label><input style={iStyle} value={form.role} onChange={set('role')} placeholder="e.g. Member" /></div>
                    <div><label style={lStyle}>Date Joined</label><input style={iStyle} type="date" value={form.date_joined} onChange={set('date_joined')} /></div>
                </div>
                <button type="button" onClick={add} disabled={saving || !form.name.trim()} style={addBtn(!!form.name.trim())}>
                    <Plus size={13} /> {saving ? 'Adding…' : 'Add'}
                </button>
            </div>
            {list.length === 0 ? <p style={emptyTxt}>No affiliations yet.</p> : list.map(a => (
                <div key={a.id} style={itemRow}>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '.875rem' }}>{a.name}</div>
                        <div style={{ fontSize: '.75rem', color: '#78716c' }}>{[a.type, a.role, a.date_joined].filter(Boolean).join(' · ')}</div>
                    </div>
                    <button onClick={() => remove(a.id)} style={{ ...iconBtnStyle, color: '#dc2626' }}><Trash2 size={13} /></button>
                </div>
            ))}
        </div>
    );
}

// ── Skills detail modal content ───────────────────────────────────────────────
function SkillsDetail({ student, onChanged }) {
    const [list, setList] = useState(student.skills || []);
    const [form, setForm] = useState(emptySkill);
    const [saving, setSaving] = useState(false);

    const add = async () => {
        if (!form.skill_name.trim()) return;
        setSaving(true);
        try {
            const res = await studentAddSkill(student.id, { skill_name: form.skill_name, skill_level: form.skill_level, certification: form.certification });
            setList(p => [...p, res.data]);
            setForm(emptySkill);
            onChanged();
        } finally { setSaving(false); }
    };
    const remove = async (id) => {
        if (!window.confirm('Remove this skill?')) return;
        await deleteSkill(id);
        setList(p => p.filter(s => s.id !== id));
        onChanged();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={addBox}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ gridColumn: '1/-1' }}>
                        <label style={lStyle}>Skill Name</label>
                        <input style={iStyle} value={form.skill_name} onChange={e => setForm(p => ({ ...p, skill_name: e.target.value }))} placeholder="e.g. Python, Photoshop" />
                    </div>
                    <div>
                        <label style={lStyle}>Level</label>
                        <select style={iStyle} value={form.skill_level} onChange={e => setForm(p => ({ ...p, skill_level: e.target.value }))}>
                            {SKILL_LEVELS.map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}
                        </select>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 2 }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '.82rem', color: '#44403c', cursor: 'pointer' }}>
                            <input type="checkbox" checked={form.certification} onChange={e => setForm(p => ({ ...p, certification: e.target.checked }))} />
                            Has certification
                        </label>
                    </div>
                </div>
                <button type="button" onClick={add} disabled={saving || !form.skill_name.trim()} style={addBtn(!!form.skill_name.trim())}>
                    <Plus size={13} /> {saving ? 'Adding…' : 'Add'}
                </button>
            </div>
            {list.length === 0 ? <p style={emptyTxt}>No skills yet.</p> : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {list.map(sk => {
                        const c = LEVEL_COLORS[sk.skill_level] || LEVEL_COLORS.beginner;
                        return (
                            <div key={sk.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', borderRadius: 10, background: c.bg, border: `1px solid ${c.border}` }}>
                                <div>
                                    <div style={{ fontSize: '.82rem', fontWeight: 700, color: c.text }}>{sk.skill_name}</div>
                                    <div style={{ fontSize: '.7rem', color: '#78716c' }}>{sk.skill_level}{sk.certification ? ' · ✓ Certified' : ''}</div>
                                </div>
                                <button onClick={() => remove(sk.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a8a29e', padding: 2 }}><X size={12} /></button>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

// ── Academic Records detail modal content ─────────────────────────────────────
function AcademicRecordsDetail({ student, onChanged }) {
    const [list, setList] = useState(student.academic_records ?? student.academicRecords ?? []);
    const [form, setForm] = useState(emptyRecord);
    const [saving, setSaving] = useState(false);
    const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

    const add = async () => {
        if (!form.school_year.trim()) return;
        setSaving(true);
        try {
            const res = await studentAddAcademicRecord(student.id, {
                school_year: form.school_year, semester: form.semester || null,
                subject: form.subject || null, course_code: form.course_code || null,
                units: form.units || null, gpa: form.gpa || null, remarks: form.remarks || null,
            });
            setList(p => [...p, res.data]);
            setForm(emptyRecord);
            onChanged();
        } finally { setSaving(false); }
    };
    const remove = async (id) => {
        if (!window.confirm('Remove this record?')) return;
        await deleteAcademicRecord(id);
        setList(p => p.filter(r => r.id !== id));
        onChanged();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={addBox}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                    <div><label style={lStyle}>School Year *</label><input style={iStyle} value={form.school_year} onChange={set('school_year')} placeholder="2024-2025" /></div>
                    <div>
                        <label style={lStyle}>Semester</label>
                        <select style={iStyle} value={form.semester} onChange={set('semester')}>
                            <option value="">— Select —</option>
                            {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    <div><label style={lStyle}>GPA</label><input style={iStyle} type="number" step="0.01" min="0" max="5" value={form.gpa} onChange={set('gpa')} placeholder="1.75" /></div>
                    <div style={{ gridColumn: '1/-1' }}><label style={lStyle}>Subject</label><input style={iStyle} value={form.subject} onChange={set('subject')} placeholder="e.g. Data Structures" /></div>
                    <div><label style={lStyle}>Course Code</label><input style={iStyle} value={form.course_code} onChange={set('course_code')} placeholder="CS 201" /></div>
                    <div><label style={lStyle}>Units</label><input style={iStyle} type="number" min="0" value={form.units} onChange={set('units')} placeholder="3" /></div>
                    <div><label style={lStyle}>Remarks</label><input style={iStyle} value={form.remarks} onChange={set('remarks')} placeholder="Passed / Failed" /></div>
                </div>
                <button type="button" onClick={add} disabled={saving || !form.school_year.trim()} style={addBtn(!!form.school_year.trim())}>
                    <Plus size={13} /> {saving ? 'Adding…' : 'Add'}
                </button>
            </div>
            {list.length === 0 ? <p style={emptyTxt}>No academic records yet.</p> : list.map((r, i) => (
                <div key={r.id ?? i} style={itemRow}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 8, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <BookOpen size={15} color="#2563eb" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '.875rem' }}>{r.school_year}{r.semester ? ` · ${r.semester}` : ''}</div>
                            <div style={{ fontSize: '.75rem', color: '#78716c' }}>
                                {[r.subject, r.course_code, r.units ? `${r.units} units` : null, r.gpa ? `GPA: ${r.gpa}` : null, r.remarks].filter(Boolean).join(' · ') || '—'}
                            </div>
                        </div>
                    </div>
                    <button onClick={() => remove(r.id)} style={{ ...iconBtnStyle, color: '#dc2626' }}><Trash2 size={13} /></button>
                </div>
            ))}
        </div>
    );
}

// ── Violations detail modal content ───────────────────────────────────────────
function ViolationsDetail({ student, onChanged }) {
    const [list, setList] = useState(student.violations || []);
    const [form, setForm] = useState(emptyViolation);
    const [saving, setSaving] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

    const add = async () => {
        if (!form.violation_type.trim()) return;
        setSaving(true);
        try {
            const res = await studentAddViolation(student.id, {
                violation_type: form.violation_type, description: form.description || null,
                date_committed: form.date_committed || null, severity_level: form.severity_level,
                action_taken: form.action_taken || null,
            });
            setList(p => [...p, res.data]);
            setForm(emptyViolation);
            onChanged();
        } finally { setSaving(false); }
    };
    const remove = async (id) => {
        if (!window.confirm('Delete this violation?')) return;
        await deleteViolation(id);
        setList(p => p.filter(v => v.id !== id));
        onChanged();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={addBox}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ gridColumn: '1/-1' }}>
                        <label style={lStyle}>Violation Type *</label>
                        <input style={iStyle} value={form.violation_type} onChange={set('violation_type')} placeholder="e.g. Cheating, Tardiness" />
                    </div>
                    <div>
                        <label style={lStyle}>Severity</label>
                        <select style={iStyle} value={form.severity_level} onChange={set('severity_level')}>
                            {SEVERITIES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                        </select>
                    </div>
                    <div><label style={lStyle}>Date Committed</label><input style={iStyle} type="date" value={form.date_committed} onChange={set('date_committed')} /></div>
                    <div style={{ gridColumn: '1/-1' }}><label style={lStyle}>Description</label><textarea style={{ ...iStyle, height: 52, resize: 'none' }} value={form.description} onChange={set('description')} placeholder="Brief description…" /></div>
                    <div style={{ gridColumn: '1/-1' }}><label style={lStyle}>Action Taken</label><input style={iStyle} value={form.action_taken} onChange={set('action_taken')} placeholder="e.g. Written warning, Suspension" /></div>
                </div>
                <button type="button" onClick={add} disabled={saving || !form.violation_type.trim()} style={addBtn(!!form.violation_type.trim())}>
                    <Plus size={13} /> {saving ? 'Adding…' : 'Add Violation'}
                </button>
            </div>
            {list.length === 0 ? <p style={{ ...emptyTxt, color: '#16a34a' }}>No violations on record.</p> : list.map(v => {
                const col = SEVERITY_COLORS[v.severity_level] || '#78716c';
                return (
                    <div key={v.id} style={{ ...itemRow, borderLeft: `3px solid ${col}` }}>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                                <span style={{ fontWeight: 700, fontSize: '.875rem', color: '#1c1917' }}>{v.violation_type}</span>
                                <span style={{ fontSize: '.72rem', fontWeight: 700, padding: '1px 7px', borderRadius: 6, background: `${col}18`, color: col, textTransform: 'capitalize' }}>{v.severity_level}</span>
                            </div>
                            {v.description && <div style={{ fontSize: '.78rem', color: '#78716c', marginBottom: 2 }}>{v.description}</div>}
                            <div style={{ fontSize: '.75rem', color: '#a8a29e' }}>
                                {[v.date_committed, v.action_taken ? `Action: ${v.action_taken}` : null].filter(Boolean).join(' · ')}
                            </div>
                        </div>
                        <button onClick={() => remove(v.id)} style={{ ...iconBtnStyle, color: '#dc2626', flexShrink: 0 }}><Trash2 size={13} /></button>
                    </div>
                );
            })}
        </div>
    );
}

// ── Non-Academic History detail modal content ─────────────────────────────────
function NonAcademicDetail({ student, onChanged }) {
    const [list, setList] = useState(student.non_academic_histories ?? student.nonAcademicHistories ?? []);
    const [form, setForm] = useState(emptyActivity);
    const [saving, setSaving] = useState(false);
    const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

    const add = async () => {
        if (!form.activity_title.trim()) return;
        setSaving(true);
        try {
            const res = await studentAddNonAcademicHistory(student.id, {
                activity_title: form.activity_title,
                category:    form.category    || null,
                description: form.description || null,
                date_started: form.date_started || null,
                date_ended:   form.date_ended   || null,
                role:         form.role         || null,
                organizer:    form.organizer    || null,
                game_result:  form.game_result  || null,
            });
            setList(p => [...p, res.data]);
            setForm(emptyActivity);
            onChanged();
        } finally { setSaving(false); }
    };

    const remove = async (id) => {
        if (!window.confirm('Remove this activity?')) return;
        await deleteNonAcademicHistory(id);
        setList(p => p.filter(a => a.id !== id));
        onChanged();
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={addBox}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ gridColumn: '1/-1' }}>
                        <label style={lStyle}>Activity Title *</label>
                        <input style={iStyle} value={form.activity_title} onChange={set('activity_title')} placeholder="e.g. Basketball Tournament, Hackathon" />
                    </div>
                    <div>
                        <label style={lStyle}>Category</label>
                        <input style={iStyle} value={form.category} onChange={set('category')} placeholder="e.g. Sports, Arts, Tech" />
                    </div>
                    <div>
                        <label style={lStyle}>Role</label>
                        <input style={iStyle} value={form.role} onChange={set('role')} placeholder="e.g. Player, Organizer" />
                    </div>
                    <div>
                        <label style={lStyle}>Date Started</label>
                        <input style={iStyle} type="date" value={form.date_started} onChange={set('date_started')} />
                    </div>
                    <div>
                        <label style={lStyle}>Date Ended</label>
                        <input style={iStyle} type="date" value={form.date_ended} onChange={set('date_ended')} />
                    </div>
                    <div>
                        <label style={lStyle}>Organizer</label>
                        <input style={iStyle} value={form.organizer} onChange={set('organizer')} placeholder="e.g. CCS Department" />
                    </div>
                    <div>
                        <label style={lStyle}>Game Result</label>
                        <input style={iStyle} value={form.game_result} onChange={set('game_result')} placeholder="e.g. 1st Place, Finalist" />
                    </div>
                    <div style={{ gridColumn: '1/-1' }}>
                        <label style={lStyle}>Description</label>
                        <textarea style={{ ...iStyle, height: 52, resize: 'none' }} value={form.description} onChange={set('description')} placeholder="Brief description…" />
                    </div>
                </div>
                <button type="button" onClick={add} disabled={saving || !form.activity_title.trim()} style={addBtn(!!form.activity_title.trim())}>
                    <Plus size={13} /> {saving ? 'Adding…' : 'Add Activity'}
                </button>
            </div>

            {list.length === 0 ? <p style={emptyTxt}>No activities on record.</p> : list.map(a => (
                <div key={a.id} style={itemRow}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Activity size={15} color="#059669" />
                        </div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '.875rem', color: '#1c1917' }}>
                                {a.activity_title}
                                {a.category && <span style={{ marginLeft: 6, fontSize: '.72rem', fontWeight: 600, padding: '1px 7px', borderRadius: 6, background: '#f0fdf4', color: '#059669' }}>{a.category}</span>}
                            </div>
                            <div style={{ fontSize: '.75rem', color: '#78716c' }}>
                                {[a.role, a.organizer, a.date_started && a.date_ended ? `${a.date_started} → ${a.date_ended}` : (a.date_started || null), a.game_result ? `🏆 ${a.game_result}` : null].filter(Boolean).join(' · ')}
                            </div>
                            {a.description && <div style={{ fontSize: '.75rem', color: '#a8a29e', marginTop: 2 }}>{a.description}</div>}
                        </div>
                    </div>
                    <button onClick={() => remove(a.id)} style={{ ...iconBtnStyle, color: '#dc2626', flexShrink: 0 }}><Trash2 size={13} /></button>
                </div>
            ))}
        </div>
    );
}

// ── Full Student Profile Modal ────────────────────────────────────────────────
export function StudentProfileModal({ student, onClose }) {
    const s = student;
    const fullName = `${s.last_name}, ${s.first_name}${s.middle_name ? ` ${s.middle_name}` : ''}`;
    const fmtDate = (v) => v ? v.toString().split('T')[0] : null;

    const getYearLevel = () => {
        if (!s.enrollment_date) return null;
        const enrolled = new Date(s.enrollment_date);
        const now = new Date();
        const years = Math.floor((now - enrolled) / (1000 * 60 * 60 * 24 * 365.25));
        const level = Math.min(years + 1, 4);
        const labels = { 1: '1st Year', 2: '2nd Year', 3: '3rd Year', 4: '4th Year' };
        return labels[level] || `${level}th Year`;
    };
    const yearLevel = getYearLevel();

    const Section = ({ title, color, children }) => (
        <div style={{ marginBottom: 20 }}>
            <div style={{ fontSize: '.7rem', fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8, paddingBottom: 4, borderBottom: `2px solid ${color}30` }}>{title}</div>
            {children}
        </div>
    );

    const Row = ({ label, value }) => (
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f5f5f4' }}>
            <span style={{ fontSize: '.8rem', color: '#78716c', fontWeight: 500 }}>{label}</span>
            <span style={{ fontSize: '.8rem', color: '#1c1917', fontWeight: 600, textAlign: 'right', maxWidth: '60%' }}>{value ?? '—'}</span>
        </div>
    );

    const violations = s.violations || [];
    const affiliations = s.affiliations || [];
    const skills = s.skills || [];
    const records = s.academic_records ?? s.academicRecords ?? [];
    const activities = s.non_academic_histories ?? s.nonAcademicHistories ?? [];

    const SEVERITY_C = { minor: '#d97706', major: '#dc2626', grave: '#7c3aed' };
    const LEVEL_C = { expert: '#7c3aed', advanced: '#2563eb', intermediate: '#059669', beginner: '#d97706' };

    return (
        <div style={{ ...overlay, zIndex: 1200, alignItems: 'flex-start', paddingTop: 40 }}>
            <div style={{ ...modalCard, maxWidth: 820, maxHeight: '88vh', display: 'flex', flexDirection: 'column' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                        <div style={{ width: 52, height: 52, borderRadius: 14, background: 'linear-gradient(135deg,#f97316,#fb923c)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <GraduationCap size={26} color="#fff" />
                        </div>
                        <div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1c1917' }}>{fullName}</div>
                            <div style={{ fontSize: '.8rem', color: '#78716c', marginTop: 2 }}>
                                {s.student_id || `STU-${s.id}`} · {s.department || '—'} · <span style={{ textTransform: 'capitalize', fontWeight: 600, color: s.status === 'active' ? '#059669' : '#78716c' }}>{s.status}</span>
                                {yearLevel && <> · <span style={{ fontWeight: 700, color: '#ea580c' }}>{yearLevel}</span></>}
                            </div>
                        </div>
                    </div>
                    <button onClick={onClose} style={iconBtnStyle}><X size={16} /></button>
                </div>

                <div style={{ overflowY: 'auto', flex: 1, paddingRight: 4 }}>
                    {/* Personal Info */}
                    <Section title="Personal Information" color="#ea580c">
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
                            <Row label="Date of Birth" value={fmtDate(s.date_of_birth)} />
                            <Row label="Age" value={s.age} />
                            <Row label="Gender" value={s.gender} />
                            <Row label="Contact Number" value={s.contact_number} />
                            <Row label="Email" value={s.email} />
                            <Row label="Guardian" value={s.guardian_name} />
                            <Row label="Address" value={s.address} />
                            <Row label="Enrollment Date" value={fmtDate(s.enrollment_date)} />
                            {yearLevel && <Row label="Year Level" value={yearLevel} />}
                        </div>
                    </Section>

                    {/* Affiliations */}
                    <Section title={`Affiliations (${affiliations.length})`} color="#2563eb">
                        {affiliations.length === 0 ? <p style={emptyTxt}>No affiliations on record.</p> : affiliations.map(a => (
                            <div key={a.id} style={{ ...itemRow, marginBottom: 6 }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '.82rem' }}>{a.name}</div>
                                    <div style={{ fontSize: '.72rem', color: '#78716c' }}>{[a.type, a.role, fmtDate(a.date_joined)].filter(Boolean).join(' · ')}</div>
                                </div>
                            </div>
                        ))}
                    </Section>

                    {/* Skills */}
                    <Section title={`Skills (${skills.length})`} color="#059669">
                        {skills.length === 0 ? <p style={emptyTxt}>No skills on record.</p> : (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                                {skills.map(sk => {
                                    const c = LEVEL_C[sk.skill_level] || '#78716c';
                                    return (
                                        <span key={sk.id} style={{ padding: '5px 12px', borderRadius: 20, fontSize: '.78rem', fontWeight: 700, background: `${c}15`, color: c, border: `1px solid ${c}30` }}>
                                            {sk.skill_name} <span style={{ fontWeight: 400, opacity: .7 }}>· {sk.skill_level}{sk.certification ? ' ✓' : ''}</span>
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                    </Section>

                    {/* Academic Records */}
                    <Section title={`Academic Records (${records.length})`} color="#7c3aed">
                        {records.length === 0 ? <p style={emptyTxt}>No academic records on record.</p> : (() => {
                            // Group by school_year, then by semester
                            const byYear = records.reduce((acc, r) => {
                                const yr = r.school_year || 'Unknown';
                                if (!acc[yr]) acc[yr] = {};
                                const sem = r.semester || 'Other';
                                if (!acc[yr][sem]) acc[yr][sem] = [];
                                acc[yr][sem].push(r);
                                return acc;
                            }, {});
                            const semOrder = ['1st Semester', '2nd Semester', 'Summer', 'Other'];
                            return Object.entries(byYear).map(([year, sems]) => (
                                <div key={year} style={{ marginBottom: 14 }}>
                                    <div style={{ fontSize: '.75rem', fontWeight: 800, color: '#7c3aed', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <span style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: 6, padding: '2px 10px' }}>{year}</span>
                                    </div>
                                    {[...new Set([...semOrder, ...Object.keys(sems)])].filter(s => sems[s]).map(sem => (
                                        <div key={sem} style={{ marginBottom: 10, paddingLeft: 10, borderLeft: '2px solid #ddd6fe' }}>
                                            <div style={{ fontSize: '.7rem', fontWeight: 700, color: '#a78bfa', marginBottom: 6, textTransform: 'uppercase', letterSpacing: .5 }}>{sem}</div>
                                            {sems[sem].map((r, i) => (
                                                <div key={r.id ?? i} style={{ ...itemRow, marginBottom: 5 }}>
                                                    <div>
                                                        <div style={{ fontWeight: 700, fontSize: '.82rem' }}>{r.subject || '—'}{r.course_code ? ` (${r.course_code})` : ''}</div>
                                                        <div style={{ fontSize: '.72rem', color: '#78716c' }}>
                                                            {[r.units ? `${r.units} units` : null, r.gpa ? `GPA: ${r.gpa}` : null, r.remarks].filter(Boolean).join(' · ') || '—'}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            ));
                        })()}
                    </Section>

                    {/* Violations */}
                    <Section title={`Violations (${violations.length})`} color="#dc2626">
                        {violations.length === 0 ? <p style={{ ...emptyTxt, color: '#16a34a' }}>No violations on record.</p> : violations.map(v => {
                            const col = SEVERITY_C[v.severity_level] || '#78716c';
                            return (
                                <div key={v.id} style={{ ...itemRow, borderLeft: `3px solid ${col}`, marginBottom: 6 }}>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <span style={{ fontWeight: 700, fontSize: '.82rem' }}>{v.violation_type}</span>
                                            <span style={{ fontSize: '.7rem', fontWeight: 700, padding: '1px 7px', borderRadius: 6, background: `${col}18`, color: col, textTransform: 'capitalize' }}>{v.severity_level}</span>
                                        </div>
                                        {v.description && <div style={{ fontSize: '.72rem', color: '#78716c' }}>{v.description}</div>}
                                        <div style={{ fontSize: '.7rem', color: '#a8a29e' }}>{[fmtDate(v.date_committed), v.action_taken ? `Action: ${v.action_taken}` : null].filter(Boolean).join(' · ')}</div>
                                    </div>
                                </div>
                            );
                        })}
                    </Section>

                    {/* Non-Academic Activities */}
                    <Section title={`Non-Academic Activities (${activities.length})`} color="#d97706">
                        {activities.length === 0 ? <p style={emptyTxt}>No activities on record.</p> : activities.map(a => (
                            <div key={a.id} style={{ ...itemRow, marginBottom: 6 }}>
                                <div>
                                    <div style={{ fontWeight: 700, fontSize: '.82rem' }}>
                                        {a.activity_title}
                                        {a.category && <span style={{ marginLeft: 6, fontSize: '.7rem', fontWeight: 600, padding: '1px 7px', borderRadius: 6, background: '#fef3c7', color: '#d97706' }}>{a.category}</span>}
                                    </div>
                                    <div style={{ fontSize: '.72rem', color: '#78716c' }}>
                                        {[a.role, a.organizer, fmtDate(a.date_started) && fmtDate(a.date_ended) ? `${fmtDate(a.date_started)} → ${fmtDate(a.date_ended)}` : (fmtDate(a.date_started) || null), a.game_result ? `🏆 ${a.game_result}` : null].filter(Boolean).join(' · ')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Section>
                </div>
            </div>
        </div>
    );
}

// ── Step tabs (Add/Edit modal) ────────────────────────────────────────────────
function StepTabs({ step, setStep }) {
    const tabs = [
        { id: 0, label: 'Basic Info',        icon: <GraduationCap size={14} /> },
        { id: 1, label: 'Affiliations',      icon: <Network size={14} /> },
        { id: 2, label: 'Skills',            icon: <Zap size={14} /> },
        { id: 3, label: 'Academic Records',  icon: <BookOpen size={14} /> },
        { id: 4, label: 'Violations',        icon: <AlertTriangle size={14} /> },
        { id: 5, label: 'Activities',        icon: <Activity size={14} /> },
    ];
    return (
        <div style={{ display: 'flex', gap: 2, marginBottom: 22, borderBottom: '2px solid #f5f5f4', flexWrap: 'wrap' }}>
            {tabs.map(t => (
                <button key={t.id} type="button" onClick={() => setStep(t.id)}
                    style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '8px 13px', borderRadius: '8px 8px 0 0',
                        border: 'none', cursor: 'pointer', fontSize: '.78rem', fontWeight: 700, fontFamily: "'Inter',sans-serif",
                        background: step === t.id ? '#fff7ed' : 'transparent',
                        color: step === t.id ? '#ea580c' : '#78716c',
                        borderBottom: step === t.id ? '2px solid #ea580c' : '2px solid transparent',
                        marginBottom: -2, transition: 'all .15s' }}>
                    {t.icon} {t.label}
                </button>
            ))}
        </div>
    );
}

// ── Inline tab components for Add/Edit modal ──────────────────────────────────
function AffiliationsTab({ list, setList }) {
    const [form, setForm] = useState(emptyAffiliation);
    const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));
    const add = () => { if (!form.name.trim()) return; setList(p => [...p, { ...form, _key: Date.now() }]); setForm(emptyAffiliation); };
    const remove = idx => setList(p => p.filter((_, i) => i !== idx));
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={addBox}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ gridColumn: '1/-1' }}><label style={lStyle}>Organization Name</label><input style={iStyle} value={form.name} onChange={set('name')} placeholder="e.g. ACSS, SITES" /></div>
                    <div><label style={lStyle}>Type</label><input style={iStyle} value={form.type} onChange={set('type')} placeholder="Academic, Sports…" /></div>
                    <div><label style={lStyle}>Role</label><input style={iStyle} value={form.role} onChange={set('role')} placeholder="Member, President…" /></div>
                    <div><label style={lStyle}>Date Joined</label><input style={iStyle} type="date" value={form.date_joined} onChange={set('date_joined')} /></div>
                </div>
                <button type="button" onClick={add} disabled={!form.name.trim()} style={addBtn(!!form.name.trim())}><Plus size={13} /> Add to List</button>
            </div>
            {list.length === 0 ? <p style={emptyTxt}>No affiliations added yet.</p> : list.map((a, i) => (
                <div key={a._key ?? i} style={itemRow}>
                    <div><div style={{ fontWeight: 700, fontSize: '.875rem' }}>{a.name}</div><div style={{ fontSize: '.75rem', color: '#78716c' }}>{[a.type, a.role, a.date_joined].filter(Boolean).join(' · ')}</div></div>
                    <button type="button" onClick={() => remove(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', padding: 4 }}><X size={14} /></button>
                </div>
            ))}
        </div>
    );
}

function SkillsTab({ list, setList }) {
    const [form, setForm] = useState(emptySkill);
    const add = () => { if (!form.skill_name.trim()) return; setList(p => [...p, { ...form, _key: Date.now() }]); setForm(emptySkill); };
    const remove = idx => setList(p => p.filter((_, i) => i !== idx));
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={addBox}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ gridColumn: '1/-1' }}><label style={lStyle}>Skill Name</label><input style={iStyle} value={form.skill_name} onChange={e => setForm(p => ({ ...p, skill_name: e.target.value }))} placeholder="e.g. Python, Photoshop" /></div>
                    <div><label style={lStyle}>Level</label><select style={iStyle} value={form.skill_level} onChange={e => setForm(p => ({ ...p, skill_level: e.target.value }))}>{SKILL_LEVELS.map(l => <option key={l} value={l}>{l.charAt(0).toUpperCase() + l.slice(1)}</option>)}</select></div>
                    <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: 2 }}><label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '.82rem', color: '#44403c', cursor: 'pointer' }}><input type="checkbox" checked={form.certification} onChange={e => setForm(p => ({ ...p, certification: e.target.checked }))} />Has certification</label></div>
                </div>
                <button type="button" onClick={add} disabled={!form.skill_name.trim()} style={addBtn(!!form.skill_name.trim())}><Plus size={13} /> Add to List</button>
            </div>
            {list.length === 0 ? <p style={emptyTxt}>No skills added yet.</p> : (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {list.map((sk, i) => { const c = LEVEL_COLORS[sk.skill_level] || LEVEL_COLORS.beginner; return (
                        <div key={sk._key ?? i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 12px', borderRadius: 10, background: c.bg, border: `1px solid ${c.border}` }}>
                            <div><div style={{ fontSize: '.82rem', fontWeight: 700, color: c.text }}>{sk.skill_name}</div><div style={{ fontSize: '.7rem', color: '#78716c' }}>{sk.skill_level}{sk.certification ? ' · ✓ Certified' : ''}</div></div>
                            <button type="button" onClick={() => remove(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#a8a29e', padding: 2 }}><X size={12} /></button>
                        </div>
                    ); })}
                </div>
            )}
        </div>
    );
}

function AcademicRecordsTab({ list, setList }) {
    const [form, setForm] = useState(emptyRecord);
    const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));
    const add = () => { if (!form.school_year.trim()) return; setList(p => [...p, { ...form, _key: Date.now() }]); setForm(emptyRecord); };
    const remove = idx => setList(p => p.filter((_, i) => i !== idx));
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={addBox}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                    <div><label style={lStyle}>School Year *</label><input style={iStyle} value={form.school_year} onChange={set('school_year')} placeholder="2024-2025" /></div>
                    <div><label style={lStyle}>Semester</label><select style={iStyle} value={form.semester} onChange={set('semester')}><option value="">— Select —</option>{SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                    <div><label style={lStyle}>GPA</label><input style={iStyle} type="number" step="0.01" min="0" max="5" value={form.gpa} onChange={set('gpa')} placeholder="1.75" /></div>
                    <div style={{ gridColumn: '1/-1' }}><label style={lStyle}>Subject</label><input style={iStyle} value={form.subject} onChange={set('subject')} placeholder="e.g. Data Structures" /></div>
                    <div><label style={lStyle}>Course Code</label><input style={iStyle} value={form.course_code} onChange={set('course_code')} placeholder="CS 201" /></div>
                    <div><label style={lStyle}>Units</label><input style={iStyle} type="number" min="0" value={form.units} onChange={set('units')} placeholder="3" /></div>
                    <div><label style={lStyle}>Remarks</label><input style={iStyle} value={form.remarks} onChange={set('remarks')} placeholder="Passed / Failed" /></div>
                </div>
                <button type="button" onClick={add} disabled={!form.school_year.trim()} style={addBtn(!!form.school_year.trim())}><Plus size={13} /> Add to List</button>
            </div>
            {list.length === 0 ? <p style={emptyTxt}>No academic records added yet.</p> : list.map((r, i) => (
                <div key={r._key ?? r.id ?? i} style={itemRow}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 8, background: '#eff6ff', border: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><BookOpen size={15} color="#2563eb" /></div>
                        <div><div style={{ fontWeight: 700, fontSize: '.875rem' }}>{r.school_year}{r.semester ? ` · ${r.semester}` : ''}</div><div style={{ fontSize: '.75rem', color: '#78716c' }}>{[r.subject, r.course_code, r.units ? `${r.units} units` : null, r.gpa ? `GPA: ${r.gpa}` : null, r.remarks].filter(Boolean).join(' · ') || '—'}</div></div>
                    </div>
                    <button type="button" onClick={() => remove(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', padding: 4 }}><X size={14} /></button>
                </div>
            ))}
        </div>
    );
}

function ViolationsTab({ list, setList }) {
    const [form, setForm] = useState(emptyViolation);
    const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));
    const add = () => { if (!form.violation_type.trim()) return; setList(p => [...p, { ...form, _key: Date.now() }]); setForm(emptyViolation); };
    const remove = idx => setList(p => p.filter((_, i) => i !== idx));
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={addBox}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ gridColumn: '1/-1' }}><label style={lStyle}>Violation Type *</label><input style={iStyle} value={form.violation_type} onChange={set('violation_type')} placeholder="e.g. Cheating, Tardiness" /></div>
                    <div><label style={lStyle}>Severity</label><select style={iStyle} value={form.severity_level} onChange={set('severity_level')}>{SEVERITIES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}</select></div>
                    <div><label style={lStyle}>Date Committed</label><input style={iStyle} type="date" value={form.date_committed} onChange={set('date_committed')} /></div>
                    <div style={{ gridColumn: '1/-1' }}><label style={lStyle}>Description</label><textarea style={{ ...iStyle, height: 52, resize: 'none' }} value={form.description} onChange={set('description')} /></div>
                    <div style={{ gridColumn: '1/-1' }}><label style={lStyle}>Action Taken</label><input style={iStyle} value={form.action_taken} onChange={set('action_taken')} placeholder="e.g. Written warning" /></div>
                </div>
                <button type="button" onClick={add} disabled={!form.violation_type.trim()} style={addBtn(!!form.violation_type.trim())}><Plus size={13} /> Add to List</button>
            </div>
            {list.length === 0 ? <p style={emptyTxt}>No violations added yet.</p> : list.map((v, i) => {
                const col = SEVERITY_COLORS[v.severity_level] || '#78716c';
                return (
                    <div key={v._key ?? i} style={{ ...itemRow, borderLeft: `3px solid ${col}` }}>
                        <div><div style={{ fontWeight: 700, fontSize: '.875rem' }}>{v.violation_type} <span style={{ fontSize: '.72rem', fontWeight: 700, padding: '1px 7px', borderRadius: 6, background: `${col}18`, color: col, textTransform: 'capitalize' }}>{v.severity_level}</span></div><div style={{ fontSize: '.75rem', color: '#78716c' }}>{[v.date_committed, v.action_taken].filter(Boolean).join(' · ')}</div></div>
                        <button type="button" onClick={() => remove(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', padding: 4 }}><X size={14} /></button>
                    </div>
                );
            })}
        </div>
    );
}

function NonAcademicTab({ list, setList }) {
    const [form, setForm] = useState(emptyActivity);
    const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));
    const add = () => { if (!form.activity_title.trim()) return; setList(p => [...p, { ...form, _key: Date.now() }]); setForm(emptyActivity); };
    const remove = idx => setList(p => p.filter((_, i) => i !== idx));
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={addBox}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <div style={{ gridColumn: '1/-1' }}><label style={lStyle}>Activity Title *</label><input style={iStyle} value={form.activity_title} onChange={set('activity_title')} placeholder="e.g. Basketball Tournament" /></div>
                    <div><label style={lStyle}>Category</label><input style={iStyle} value={form.category} onChange={set('category')} placeholder="Sports, Arts, Tech…" /></div>
                    <div><label style={lStyle}>Role</label><input style={iStyle} value={form.role} onChange={set('role')} placeholder="Player, Organizer…" /></div>
                    <div><label style={lStyle}>Date Started</label><input style={iStyle} type="date" value={form.date_started} onChange={set('date_started')} /></div>
                    <div><label style={lStyle}>Date Ended</label><input style={iStyle} type="date" value={form.date_ended} onChange={set('date_ended')} /></div>
                    <div><label style={lStyle}>Organizer</label><input style={iStyle} value={form.organizer} onChange={set('organizer')} placeholder="e.g. CCS Department" /></div>
                    <div><label style={lStyle}>Game Result</label><input style={iStyle} value={form.game_result} onChange={set('game_result')} placeholder="e.g. 1st Place" /></div>
                    <div style={{ gridColumn: '1/-1' }}><label style={lStyle}>Description</label><textarea style={{ ...iStyle, height: 52, resize: 'none' }} value={form.description} onChange={set('description')} /></div>
                </div>
                <button type="button" onClick={add} disabled={!form.activity_title.trim()} style={addBtn(!!form.activity_title.trim())}><Plus size={13} /> Add to List</button>
            </div>
            {list.length === 0 ? <p style={emptyTxt}>No activities added yet.</p> : list.map((a, i) => (
                <div key={a._key ?? i} style={itemRow}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{ width: 34, height: 34, borderRadius: 8, background: '#f0fdf4', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Activity size={15} color="#059669" /></div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '.875rem' }}>{a.activity_title}{a.category && <span style={{ marginLeft: 6, fontSize: '.72rem', fontWeight: 600, padding: '1px 7px', borderRadius: 6, background: '#f0fdf4', color: '#059669' }}>{a.category}</span>}</div>
                            <div style={{ fontSize: '.75rem', color: '#78716c' }}>{[a.role, a.organizer, a.date_started, a.game_result ? `🏆 ${a.game_result}` : null].filter(Boolean).join(' · ')}</div>
                        </div>
                    </div>
                    <button type="button" onClick={() => remove(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', padding: 4 }}><X size={14} /></button>
                </div>
            ))}
        </div>
    );
}

// ── Basic Info tab ────────────────────────────────────────────────────────────
// Parse a stored address string back into parts (best-effort)
function parseAddress(addr) {
    if (!addr) return { house: '', street: '', barangay: '', city: '', province: '', zip: '' };
    const parts = addr.split(',').map(s => s.trim());
    return {
        house:    parts[0] || '',
        street:   parts[1] || '',
        barangay: parts[2] || '',
        city:     parts[3] || '',
        province: parts[4] || '',
        zip:      parts[5] || '',
    };
}

function composeAddress(a) {
    return [a.house, a.street, a.barangay, a.city, a.province, a.zip]
        .filter(Boolean).join(', ');
}

function BasicInfoTab({ form, setForm }) {
    const set = f => e => setForm(p => ({ ...p, [f]: e.target.value }));

    const [addr, setAddr] = useState(() => parseAddress(form.address));

    const setAddrField = field => e => {
        const updated = { ...addr, [field]: e.target.value };
        setAddr(updated);
        setForm(p => ({ ...p, address: composeAddress(updated) }));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: 12 }}>
                <div><label style={lStyle}>Student ID</label><input
                    style={iStyle}
                    value={form.student_id}
                    onChange={e => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 10);
                        setForm(p => ({ ...p, student_id: val }));
                    }}
                    onBlur={e => {
                        const val = e.target.value;
                        if (val && (val.length < 7 || val.length > 10)) {
                            e.target.setCustomValidity('Student ID must be 7 to 10 digits.');
                        } else {
                            e.target.setCustomValidity('');
                        }
                        e.target.reportValidity();
                    }}
                    placeholder="e.g. 26..."
                    maxLength={10}
                /></div>
                <div><label style={lStyle}>Status</label><select style={iStyle} value={form.status} onChange={set('status')}><option value="active">Active</option><option value="inactive">Inactive</option><option value="graduated">Graduated</option><option value="dropped">Dropped</option></select></div>
                <div><label style={lStyle}>Enrollment Date</label><input style={iStyle} type="date" value={form.enrollment_date} onChange={set('enrollment_date')} /></div>
            </div>
            <div><label style={lStyle}>Department <span style={{ color: '#dc2626' }}>*</span></label><select style={iStyle} value={form.department} onChange={set('department')} required><option value="">-- Select Department --</option><option value="Information Technology">Information Technology</option><option value="Computer Science">Computer Science</option></select></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                <div><label style={lStyle}>First Name <span style={{ color: '#dc2626' }}>*</span></label><input style={iStyle} value={form.first_name} onChange={set('first_name')} required /></div>
                <div><label style={lStyle}>Middle Name</label><input style={iStyle} value={form.middle_name} onChange={set('middle_name')} /></div>
                <div><label style={lStyle}>Last Name <span style={{ color: '#dc2626' }}>*</span></label><input style={iStyle} value={form.last_name} onChange={set('last_name')} required /></div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1.5fr', gap: 12 }}>
                <div><label style={lStyle}>Age</label><input style={iStyle} type="number" value={form.age} onChange={set('age')} /></div>
                <div><label style={lStyle}>Gender</label><select style={iStyle} value={form.gender} onChange={set('gender')}><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></div>
                <div><label style={lStyle}>Birthday</label><input style={iStyle} type="date" value={form.date_of_birth} onChange={set('date_of_birth')} /></div>
            </div>
            <div><label style={lStyle}>Guardian Name</label><input style={iStyle} value={form.guardian_name} onChange={set('guardian_name')} /></div>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 12 }}>
                <div>
                    <label style={lStyle}>Email <span style={{ color: '#dc2626' }}>*</span></label>
                    <input
                        style={iStyle}
                        type="email"
                        value={form.email}
                        onChange={e => {
                            setForm(p => ({ ...p, email: e.target.value }));
                        }}
                        onBlur={e => {
                            const val = e.target.value.trim();
                            const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
                            e.target.setCustomValidity(val && !valid ? 'Please enter a valid email address.' : '');
                            e.target.reportValidity();
                        }}
                        required
                        placeholder="e.g. juan@email.com"
                    />
                </div>
                <div>
                    <label style={lStyle}>Contact No.</label>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{ ...iStyle, width: 'auto', padding: '0 8px', background: '#f5f5f4', borderRight: 'none', borderRadius: '8px 0 0 8px', color: '#57534e', fontWeight: 700, flexShrink: 0, display: 'flex', alignItems: 'center' }}>09</span>
                        <input
                            style={{ ...iStyle, borderRadius: '0 8px 8px 0', borderLeft: '1px solid #e7e5e4' }}
                            value={form.contact_number.replace(/^09/, '')}
                            onChange={e => {
                                const digits = e.target.value.replace(/\D/g, '').slice(0, 9);
                                setForm(p => ({ ...p, contact_number: '09' + digits }));
                            }}
                            onBlur={e => {
                                const full = '09' + e.target.value.replace(/\D/g, '');
                                if (full.length > 2 && full.length !== 11) {
                                    e.target.setCustomValidity('Contact number must be 11 digits (e.g. 09XXXXXXXXX).');
                                } else {
                                    e.target.setCustomValidity('');
                                }
                                e.target.reportValidity();
                            }}
                            placeholder="XXXXXXXXX"
                            maxLength={9}
                        />
                    </div>
                </div>
            </div>

            {/* Address */}
            <div style={{ border: '1.5px solid #e7e5e4', borderRadius: 10, padding: '12px 14px', background: '#fafaf9' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <div><label style={lStyle}>House / Unit / Bldg. No.</label><input style={iStyle} value={addr.house} onChange={setAddrField('house')} placeholder="e.g. 123 or Unit 4B" /></div>
                        <div><label style={lStyle}>Street / Subdivision</label><input style={iStyle} value={addr.street} onChange={setAddrField('street')} placeholder="e.g. Rizal St., Villa Verde Subd." /></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                        <div><label style={lStyle}>Barangay</label><input style={iStyle} value={addr.barangay} onChange={setAddrField('barangay')} placeholder="e.g. Banay banay" /></div>
                        <div><label style={lStyle}>City / Municipality</label><input style={iStyle} value={addr.city} onChange={setAddrField('city')} placeholder="e.g. Cabuyao City" /></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.6fr', gap: 10 }}>
                        <div><label style={lStyle}>Province</label><input style={iStyle} value={addr.province} onChange={setAddrField('province')} placeholder="e.g. Laguna" /></div>
                        <div><label style={lStyle}>ZIP Code</label><input style={iStyle} value={addr.zip} onChange={setAddrField('zip')} placeholder="e.g. 4025" maxLength={4} /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ── Add / Edit Student modal ──────────────────────────────────────────────────
function StudentModal({ mode, student, onClose, onSaved }) {
    const isEdit = mode === 'edit';
    const [step, setStep] = useState(0);
    const [form, setForm] = useState(isEdit ? {
        student_id: student.student_id || '', first_name: student.first_name || '',
        middle_name: student.middle_name || '', last_name: student.last_name || '',
        age: student.age || '', gender: student.gender || 'Male',
        guardian_name: student.guardian_name || '', date_of_birth: student.date_of_birth || '',
        address: student.address || '', contact_number: student.contact_number ? (student.contact_number.startsWith('09') ? student.contact_number : '09' + student.contact_number) : '',
        email: student.email || '', enrollment_date: student.enrollment_date || '',
        status: student.status || 'active', department: student.department || '',
    } : emptyStudent);
    const [affiliations, setAffiliations] = useState(isEdit ? (student.affiliations || []).map(a => ({ ...a, _key: a.id })) : []);
    const [skills,       setSkills]       = useState(isEdit ? (student.skills || []).map(s => ({ ...s, _key: s.id })) : []);
    const [records,      setRecords]      = useState(isEdit ? ((student.academic_records ?? student.academicRecords ?? []).map(r => ({ ...r, _key: r.id }))) : []);
    const [violations,   setViolations]   = useState(isEdit ? (student.violations || []).map(v => ({ ...v, _key: v.id })) : []);
    const [activities,   setActivities]   = useState(isEdit ? ((student.non_academic_histories ?? student.nonAcademicHistories ?? []).map(a => ({ ...a, _key: a.id }))) : []);
    const [saving, setSaving] = useState(false);
    const [error,  setError]  = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.first_name.trim() || !form.last_name.trim() || !form.email.trim()) {
            setStep(0); setError('First name, last name, and email are required.'); return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
            setStep(0); setError('Please enter a valid email address.'); return;
        }
        if (form.student_id && (form.student_id.length < 7 || form.student_id.length > 10)) {
            setStep(0); setError('Student ID must be 7 to 10 digits.'); return;
        }
        if (form.contact_number && form.contact_number.length !== 11) {
            setStep(0); setError('Contact number must be 11 digits (e.g. 09XXXXXXXXX).'); return;
        }
        setSaving(true); setError('');
        try {
            let studentId;
            if (isEdit) { await updateStudent(student.id, form); studentId = student.id; }
            else { const res = await createStudent(form); studentId = res.data.student.id; }

            await Promise.all([
                ...affiliations.filter(a => !a.id).map(a => studentAddAffiliation(studentId, { name: a.name, type: a.type || null, role: a.role || null, date_joined: a.date_joined || null })),
                ...skills.filter(s => !s.id).map(s => studentAddSkill(studentId, { skill_name: s.skill_name, skill_level: s.skill_level, certification: s.certification })),
                ...records.filter(r => !r.id).map(r => studentAddAcademicRecord(studentId, { school_year: r.school_year, semester: r.semester || null, subject: r.subject || null, course_code: r.course_code || null, units: r.units || null, gpa: r.gpa || null, remarks: r.remarks || null })),
                ...violations.filter(v => !v.id).map(v => studentAddViolation(studentId, { violation_type: v.violation_type, description: v.description || null, date_committed: v.date_committed || null, severity_level: v.severity_level, action_taken: v.action_taken || null })),
                ...activities.filter(a => !a.id).map(a => studentAddNonAcademicHistory(studentId, { activity_title: a.activity_title, category: a.category || null, description: a.description || null, date_started: a.date_started || null, date_ended: a.date_ended || null, role: a.role || null, organizer: a.organizer || null, game_result: a.game_result || null })),
            ]);
            onSaved(); onClose();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to save. Try again.');
        } finally { setSaving(false); }
    };

    return (
        <div style={overlay}>
            <div style={{ ...modalCard, maxWidth: 680 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#1c1917' }}>{isEdit ? 'Edit Student' : 'Add New Student'}</h2>
                        <p style={{ margin: '2px 0 0', fontSize: '.75rem', color: '#78716c' }}>Fill in details across all tabs, then save.</p>
                    </div>
                    <button onClick={onClose} style={iconBtnStyle}><X size={16} /></button>
                </div>
                <form onSubmit={handleSubmit}>
                    <StepTabs step={step} setStep={setStep} />
                    <div style={{ minHeight: 320, paddingTop: 4 }}>
                        {step === 0 && <BasicInfoTab form={form} setForm={setForm} />}
                        {step === 1 && <AffiliationsTab list={affiliations} setList={setAffiliations} />}
                        {step === 2 && <SkillsTab list={skills} setList={setSkills} />}
                        {step === 3 && <AcademicRecordsTab list={records} setList={setRecords} />}
                        {step === 4 && <ViolationsTab list={violations} setList={setViolations} />}
                        {step === 5 && <NonAcademicTab list={activities} setList={setActivities} />}
                    </div>
                    {error && <p style={{ color: '#dc2626', fontSize: '.82rem', margin: '10px 0 0' }}>{error}</p>}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, paddingTop: 16, borderTop: '1px solid #f5f5f4' }}>
                        <div style={{ display: 'flex', gap: 8 }}>
                            {step > 0 && <button type="button" onClick={() => setStep(s => s - 1)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '8px 14px', borderRadius: 9, background: 'transparent', border: '1.5px solid #e7e5e4', cursor: 'pointer', fontSize: '.82rem', fontWeight: 700, color: '#78716c', fontFamily: "'Inter',sans-serif" }}><ChevronLeft size={14} /> Back</button>}
                            {step < 5 && <button type="button" onClick={() => setStep(s => s + 1)} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '8px 14px', borderRadius: 9, background: '#fff7ed', border: '1.5px solid #fed7aa', cursor: 'pointer', fontSize: '.82rem', fontWeight: 700, color: '#ea580c', fontFamily: "'Inter',sans-serif" }}>Next <ChevronRight size={14} /></button>}
                        </div>
                        <div style={{ display: 'flex', gap: 10 }}>
                            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
                            <button type="submit" className="btn btn-primary" disabled={saving}><Check size={14} /> {saving ? 'Saving...' : isEdit ? 'Save Changes' : 'Add Student'}</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ── Main page ─────────────────────────────────────────────────────────────────
const PROGRAMS = [
    { key: 'IT', label: 'Information Technology', short: 'BSIT', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
    { key: 'CS', label: 'Computer Science',       short: 'BSCS', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
];

export default function StudentDataMap() {
    const [students, setStudents]   = useState([]);
    const [loading, setLoading]     = useState(true);
    const [filters, setFilters]     = useState({ status: '', search: '', gender: '' });
    const [program, setProgram]     = useState('IT');
    const [modal, setModal]         = useState(null);
    const [detailModal, setDetailModal] = useState(null); // { type, student }
    const [profileModal, setProfileModal] = useState(null); // student

    const printRef = useRef();
    const handlePrint = useReactToPrint({
        contentRef: printRef,
        documentTitle: 'CCS Student Data Map',
        pageStyle: `@page { size: A4 landscape; margin: 10mm 8mm; } body { font-family: Arial, sans-serif; font-size: 10px; } table { font-size: 9px; }`,
    });

    const loadData = () => {
        setLoading(true);
        const dept = program === 'IT' ? 'Information Technology' : 'Computer Science';
        getStudents({ ...filters, department: dept }).then(r => setStudents(r.data)).finally(() => setLoading(false));
    };
    useEffect(loadData, [filters, program]);

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this student record?')) return;
        await deleteStudent(id);
        loadData();
    };

    // After a detail modal makes changes, refresh the student list
    const handleDetailChanged = () => loadData();

    const filtered = students;

    const grouped = filtered.reduce((acc, s) => {
        const key = s.status ? s.status.charAt(0).toUpperCase() + s.status.slice(1) : 'Unknown';
        if (!acc[key]) acc[key] = [];
        acc[key].push(s);
        return acc;
    }, {});

    const openDetail = (type, student) => setDetailModal({ type, student });
    const activeProgram = PROGRAMS.find(p => p.key === program);

    const PAGE_SIZE  = 10;
    const [page, setPage] = useState(1);

    // Reset page when program or filters change
    useEffect(() => setPage(1), [program, filters.search, filters.gender, filters.status]);

    const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
    const paginated  = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    const groupedPage = paginated.reduce((acc, s) => {
        const key = s.status ? s.status.charAt(0).toUpperCase() + s.status.slice(1) : 'Unknown';
        if (!acc[key]) acc[key] = [];
        acc[key].push(s);
        return acc;
    }, {});

    return (
        <div>
            <div className="page-header no-print">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                            <div style={iconWrap}><GraduationCap size={22} color="#f97316" /></div>
                            <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#1c1917', margin: 0 }}>Student Data Map</h1>
                        </div>
                        <p style={{ color: '#78716c' }}>Manage and print comprehensive student profiles — {activeProgram?.label}</p>
                    </div>
                    <button className="btn btn-primary" onClick={() => setModal({ mode: 'add' })}><Plus size={15} /> Add Student</button>
                </div>
            </div>

            {/* Program toggle */}
            <div style={{ display: 'flex', gap: 10, marginBottom: 16 }} className="no-print">
                {PROGRAMS.map(p => (
                    <button key={p.key} onClick={() => setProgram(p.key)}
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

            <div className="filter-bar no-print">
                <div style={{ position: 'relative' }}>
                    <Search size={15} color="#f97316" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                    <input type="text" placeholder="Search name or student ID…" value={filters.search} onChange={e => setFilters(f => ({ ...f, search: e.target.value }))} style={{ paddingLeft: 36 }} />
                </div>
                <select value={filters.gender} onChange={e => setFilters(f => ({ ...f, gender: e.target.value }))}>
                    <option value="">All Genders</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                </select>
                <select value={filters.status} onChange={e => setFilters(f => ({ ...f, status: e.target.value }))}>
                    <option value="">All Statuses</option><option value="active">Active</option><option value="inactive">Inactive</option><option value="graduated">Graduated</option><option value="dropped">Dropped</option>
                </select>
                <div style={{ flex: 1 }} />
                <button className="btn btn-outline" onClick={handlePrint}><Printer size={15} /> Print Map</button>
            </div>

            <div ref={printRef}>
                <div className="print-header">
                    <h1>CCS COMPREHENSIVE PROFILING SYSTEM</h1>
                    <p>Student Data Map ({activeProgram?.short}) — Generated {new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p>Total Students: {filtered.length}</p>
                    <hr style={{ margin: '6px 0' }} />
                </div>

                {loading ? (
                    <div className="loading"><div className="loading-spinner" /><p>Loading student data…</p></div>
                ) : filtered.length === 0 ? (
                    <div className="empty"><GraduationCap size={40} color="#fed7aa" /><p style={{ marginTop: 10 }}>No {activeProgram?.label} students found.</p></div>
                ) : (
                    <>
                    {Object.entries(groupedPage).map(([groupName, groupStudents]) => (
                        <div key={groupName} className="card" style={{ marginBottom: 28 }}>
                            <div className="card-header" style={{ background: 'linear-gradient(135deg,#f97316,#fb923c)', color: '#fff' }}>
                                <h2 style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}><Building size={17} strokeWidth={2} />{groupName}</h2>
                                <span className="badge" style={{ background: 'rgba(255,255,255,.2)', color: '#fff' }}>{groupStudents.length} students</span>
                            </div>
                            <div className="card-body" style={{ padding: 0 }}>
                                <div className="table-wrap">
                                    <table style={{ tableLayout: 'fixed', width: '100%', minWidth: 1000 }}>
                                        <thead>
                                            <tr>
                                                <th style={{ width: 36 }}>#</th>
                                                <th style={{ width: 130 }}>Student ID</th>
                                                <th style={{ width: 200 }}>Full Name</th>
                                                <th style={{ width: 50 }}>Age</th>
                                                <th style={{ width: 80 }}>Gender</th>
                                                <th style={{ width: 120 }}>Affiliations</th>
                                                <th style={{ width: 100 }}>Skills</th>
                                                <th style={{ width: 140 }}>Academic Records</th>
                                                <th style={{ width: 110 }}>Violations</th>
                                                <th style={{ width: 110 }}>Activities</th>
                                                <th className="no-print" style={{ width: 80 }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {groupStudents.map((stu, idx) => {
                                                const rowNum = (page - 1) * PAGE_SIZE + paginated.indexOf(stu) + 1;
                                                const affiliationCount = stu.affiliations?.length ?? 0;
                                                const skillCount       = stu.skills?.length ?? 0;
                                                const recordCount      = (stu.academic_records ?? stu.academicRecords ?? []).length;
                                                const violationCount   = stu.violations?.length ?? 0;
                                                const activityCount    = (stu.non_academic_histories ?? stu.nonAcademicHistories ?? []).length;
                                                return (
                                                    <tr key={stu.id}>
                                                        <td style={{ color: '#a8a29e', fontSize: '.78rem' }}>{rowNum}</td>
                                                        <td><span style={{ fontFamily: 'monospace', fontSize: '.8rem', fontWeight: 700, background: '#f8fafc', padding: '2px 7px', borderRadius: 6, border: '1px solid #e2e8f0', display: 'inline-block', whiteSpace: 'nowrap' }}>{stu.student_id || `STU-${stu.id}`}</span></td>
                                                        <td>
                                                            <div
                                                                onClick={() => setProfileModal(stu)}
                                                                style={{ fontWeight: 700, fontSize: '.875rem', color: '#ea580c', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: 3 }}
                                                            >{stu.last_name}, {stu.first_name}{stu.middle_name ? ` ${stu.middle_name[0]}.` : ''}</div>
                                                            <div style={{ fontSize: '.72rem', color: '#78716c', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{stu.guardian_name || ''}</div>
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}>{stu.age || '—'}</td>
                                                        <td style={{ textAlign: 'center' }}>
                                                            <span style={{ fontSize: '.75rem', padding: '2px 8px', borderRadius: 20, fontWeight: 600,
                                                                background: stu.gender === 'Male' ? '#eff6ff' : stu.gender === 'Female' ? '#fdf2f8' : '#f8fafc',
                                                                color: stu.gender === 'Male' ? '#2563eb' : stu.gender === 'Female' ? '#9d174d' : '#78716c' }}>
                                                                {stu.gender || '—'}
                                                            </span>
                                                        </td>
                                                        <td style={{ textAlign: 'center' }}><ShowMoreBtn count={affiliationCount} label={affiliationCount === 1 ? 'affiliation' : 'affiliations'} color="#2563eb" onClick={() => openDetail('affiliations', stu)} /></td>
                                                        <td style={{ textAlign: 'center' }}><ShowMoreBtn count={skillCount} label={skillCount === 1 ? 'skill' : 'skills'} color="#059669" onClick={() => openDetail('skills', stu)} /></td>
                                                        <td style={{ textAlign: 'center' }}><ShowMoreBtn count={recordCount} label={recordCount === 1 ? 'record' : 'records'} color="#7c3aed" onClick={() => openDetail('records', stu)} /></td>
                                                        <td style={{ textAlign: 'center' }}><ShowMoreBtn count={violationCount} label={violationCount === 1 ? 'violation' : 'violations'} color="#dc2626" onClick={() => openDetail('violations', stu)} /></td>
                                                        <td style={{ textAlign: 'center' }}><ShowMoreBtn count={activityCount} label={activityCount === 1 ? 'activity' : 'activities'} color="#d97706" onClick={() => openDetail('activities', stu)} /></td>
                                                        <td className="no-print">
                                                            <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
                                                                <button style={iconBtnStyle} onClick={() => setModal({ mode: 'edit', student: stu })} title="Edit"><Pencil size={13} /></button>
                                                                <button style={{ ...iconBtnStyle, color: '#dc2626' }} onClick={() => handleDelete(stu.id)} title="Delete"><Trash2 size={13} /></button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 4px', marginTop: 4 }} className="no-print">
                            <span style={{ fontSize: '.8rem', color: '#78716c' }}>
                                Showing {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} of {filtered.length} students
                            </span>
                            <div style={{ display: 'flex', gap: 4 }}>
                                <button onClick={() => setPage(1)} disabled={page === 1} style={pgBtn(page === 1)}>«</button>
                                <button onClick={() => setPage(p => p - 1)} disabled={page === 1} style={pgBtn(page === 1)}>‹</button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                                    .reduce((acc, p, idx, arr) => {
                                        if (idx > 0 && p - arr[idx - 1] > 1) acc.push('…');
                                        acc.push(p);
                                        return acc;
                                    }, [])
                                    .map((p, i) => p === '…'
                                        ? <span key={`e${i}`} style={{ padding: '0 6px', color: '#a8a29e', lineHeight: '32px' }}>…</span>
                                        : <button key={p} onClick={() => setPage(p)} style={pgBtn(false, p === page)}>{p}</button>
                                    )}
                                <button onClick={() => setPage(p => p + 1)} disabled={page === totalPages} style={pgBtn(page === totalPages)}>›</button>
                                <button onClick={() => setPage(totalPages)} disabled={page === totalPages} style={pgBtn(page === totalPages)}>»</button>
                            </div>
                        </div>
                    )}
                    </>
                )}
            </div>

            {modal && <StudentModal mode={modal.mode} student={modal.student} onClose={() => setModal(null)} onSaved={loadData} />}

            {profileModal && <StudentProfileModal student={profileModal} onClose={() => setProfileModal(null)} />}

            {detailModal?.type === 'affiliations' && (
                <DetailModal title={`Affiliations — ${detailModal.student.first_name} ${detailModal.student.last_name}`} icon={<Network size={18} color="#2563eb" />} onClose={() => setDetailModal(null)}>
                    <AffiliationsDetail student={detailModal.student} onChanged={handleDetailChanged} />
                </DetailModal>
            )}
            {detailModal?.type === 'skills' && (
                <DetailModal title={`Skills — ${detailModal.student.first_name} ${detailModal.student.last_name}`} icon={<Zap size={18} color="#059669" />} onClose={() => setDetailModal(null)}>
                    <SkillsDetail student={detailModal.student} onChanged={handleDetailChanged} />
                </DetailModal>
            )}
            {detailModal?.type === 'records' && (
                <DetailModal title={`Academic Records — ${detailModal.student.first_name} ${detailModal.student.last_name}`} icon={<BookOpen size={18} color="#7c3aed" />} onClose={() => setDetailModal(null)}>
                    <AcademicRecordsDetail student={detailModal.student} onChanged={handleDetailChanged} />
                </DetailModal>
            )}
            {detailModal?.type === 'violations' && (
                <DetailModal title={`Violations — ${detailModal.student.first_name} ${detailModal.student.last_name}`} icon={<AlertTriangle size={18} color="#dc2626" />} onClose={() => setDetailModal(null)}>
                    <ViolationsDetail student={detailModal.student} onChanged={handleDetailChanged} />
                </DetailModal>
            )}
            {detailModal?.type === 'activities' && (
                <DetailModal title={`Activities — ${detailModal.student.first_name} ${detailModal.student.last_name}`} icon={<Activity size={18} color="#059669" />} onClose={() => setDetailModal(null)}>
                    <NonAcademicDetail student={detailModal.student} onChanged={handleDetailChanged} />
                </DetailModal>
            )}
        </div>
    );
}

// ── Shared styles ─────────────────────────────────────────────────────────────
const iconWrap    = { width: 44, height: 44, borderRadius: 12, background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fed7aa' };
const overlay     = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20, overflowY: 'auto' };
const modalCard   = { background: '#fff', borderRadius: 20, padding: '28px 32px', width: '100%', boxShadow: '0 20px 60px rgba(0,0,0,.2)', margin: 'auto' };
const iconBtnStyle = { background: 'rgba(0,0,0,.04)', border: '1px solid rgba(0,0,0,.08)', borderRadius: 7, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#78716c' };
const lStyle      = { display: 'block', fontSize: '.78rem', fontWeight: 700, color: '#44403c', marginBottom: 5, letterSpacing: .3 };
const iStyle      = { width: '100%', padding: '9px 12px', borderRadius: 9, border: '1.5px solid #e7e5e4', fontSize: '.875rem', fontFamily: "'Inter',sans-serif", color: '#1c1917', boxSizing: 'border-box' };
const addBox      = { background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 12, padding: 16, display: 'flex', flexDirection: 'column', gap: 12 };
const itemRow     = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: 10, background: '#f8fafc', border: '1px solid #e2e8f0' };
const emptyTxt    = { textAlign: 'center', color: '#a8a29e', fontSize: '.82rem', padding: '16px 0', margin: 0 };
const addBtn      = ok => ({ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 8, background: ok ? '#ea580c' : '#e7e5e4', color: ok ? '#fff' : '#a8a29e', border: 'none', cursor: ok ? 'pointer' : 'not-allowed', fontSize: '.82rem', fontWeight: 700, fontFamily: "'Inter',sans-serif" });
const pgBtn       = (disabled, active = false) => ({
    minWidth: 32, height: 32, padding: '0 8px', borderRadius: 8, border: '1.5px solid',
    borderColor: active ? '#ea580c' : disabled ? '#e7e5e4' : '#e7e5e4',
    background: active ? '#fff7ed' : '#fff',
    color: active ? '#ea580c' : disabled ? '#d4d4d4' : '#44403c',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: active ? 800 : 600, fontSize: '.8rem', fontFamily: "'Inter',sans-serif",
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
});
