import React, { useState, useEffect } from 'react';
import { getSubjects, createSubject, updateSubject, deleteSubject } from '../api';
import { BookOpen, Plus, Pencil, Trash2, X, Check, Search } from 'lucide-react';

const PROGRAMS = [
    { key: 'BSIT', label: 'BS Information Technology', short: 'BSIT', color: '#2563eb', bg: '#eff6ff', border: '#bfdbfe' },
    { key: 'BSCS', label: 'BS Computer Science',       short: 'BSCS', color: '#7c3aed', bg: '#f5f3ff', border: '#ddd6fe' },
];

const YEAR_LABELS = { 1: 'First Year', 2: 'Second Year', 3: 'Third Year', 4: 'Fourth Year' };
const YEAR_COLORS = {
    1: { grad: '#2563eb,#3b82f6', badge: '#eff6ff', text: '#2563eb' },
    2: { grad: '#059669,#10b981', badge: '#f0fdf4', text: '#059669' },
    3: { grad: '#d97706,#f59e0b', badge: '#fffbeb', text: '#d97706' },
    4: { grad: '#7c3aed,#8b5cf6', badge: '#f5f3ff', text: '#7c3aed' },
};
const SEM_ORDER = ['1st Semester', '2nd Semester', 'Summer'];
const SEMESTERS = ['1st Semester', '2nd Semester', 'Summer'];
const YEARS = [1, 2, 3, 4];

const empty = { subject_code: '', subject_name: '', units: '', pre_requisite: '', year_level: '', semester: '', program: '' };

function Modal({ title, onClose, children }) {
    return (
        <div style={overlay}>
            <div style={modalCard}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#1c1917' }}>{title}</h2>
                    <button onClick={onClose} style={iconBtn}><X size={16} /></button>
                </div>
                {children}
            </div>
        </div>
    );
}

export default function SubjectsMap() {
    const [subjects, setSubjects] = useState([]);
    const [loading, setLoading]   = useState(true);
    const [search, setSearch]     = useState('');
    const [program, setProgram]   = useState('BSIT');
    const [modal, setModal]       = useState(null);
    const [form, setForm]         = useState(empty);
    const [saving, setSaving]     = useState(false);

    const load = () => {
        setLoading(true);
        getSubjects({ program })
            .then(r => setSubjects(r.data))
            .finally(() => setLoading(false));
    };
    useEffect(load, [program]);

    const openAdd  = () => { setForm({ ...empty, program }); setModal('add'); };
    const openEdit = (s) => {
        setForm({
            subject_code: s.subject_code || '', subject_name: s.subject_name || '',
            units: s.units ?? '', pre_requisite: s.pre_requisite || '',
            year_level: s.year_level ?? '', semester: s.semester || '',
            program: s.program || '',
        });
        setModal({ edit: s });
    };

    const save = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = { ...form, units: form.units !== '' ? Number(form.units) : null, year_level: form.year_level !== '' ? Number(form.year_level) : null, program: form.program || null };
            if (modal === 'add') await createSubject(payload);
            else await updateSubject(modal.edit.id, payload);
            setModal(null); load();
        } finally { setSaving(false); }
    };

    const remove = async (id) => {
        if (!window.confirm('Delete this subject?')) return;
        await deleteSubject(id); load();
    };

    const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

    // Filter then group by year → semester
    const filtered = search
        ? subjects.filter(s => `${s.subject_code} ${s.subject_name}`.toLowerCase().includes(search.toLowerCase()))
        : subjects;

    const grouped = {};
    filtered.forEach(s => {
        const yr  = s.year_level ?? 0;
        const sem = s.semester   ?? 'Unassigned';
        if (!grouped[yr])      grouped[yr] = {};
        if (!grouped[yr][sem]) grouped[yr][sem] = [];
        grouped[yr][sem].push(s);
    });

    // Sort years, then semesters within each year
    const sortedYears = Object.keys(grouped).map(Number).sort((a, b) => a - b);

    const activeProgram = PROGRAMS.find(p => p.key === program);

    return (
        <div>
            <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                        <div style={iconWrap}><BookOpen size={22} color="#f97316" /></div>
                        <h1 style={h1}>Subjects</h1>
                    </div>
                    <p style={sub}>{activeProgram?.label} curriculum — {subjects.length} subjects</p>
                </div>
                <button className="btn btn-primary" onClick={openAdd}><Plus size={15} /> Add Subject</button>
            </div>

            {/* Program toggle */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                {PROGRAMS.map(p => (
                    <button key={p.key} onClick={() => { setProgram(p.key); setSearch(''); }}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 22px', borderRadius: 12,
                            border: `2px solid ${program === p.key ? p.color : '#e7e5e4'}`,
                            background: program === p.key ? p.bg : '#fff',
                            color: program === p.key ? p.color : '#78716c',
                            cursor: 'pointer', fontWeight: 700, fontSize: '.875rem', fontFamily: "'Inter',sans-serif",
                            transition: 'all .15s', boxShadow: program === p.key ? `0 0 0 3px ${p.border}` : 'none' }}>
                        <BookOpen size={15} />
                        <span>{p.short}</span>
                        <span style={{ fontSize: '.72rem', fontWeight: 600, opacity: .7 }}>{p.label.replace(/^BS /, '')}</span>
                    </button>
                ))}
            </div>

            <div className="filter-bar">
                <div style={{ position: 'relative' }}>
                    <Search size={15} color="#f97316" style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)' }} />
                    <input type="text" placeholder="Search code or subject name…" value={search}
                        onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 36 }} />
                </div>
            </div>

            {loading ? (
                <div className="loading"><div className="loading-spinner" /><p>Loading…</p></div>
            ) : filtered.length === 0 ? (
                <div className="empty"><BookOpen size={40} color="#fed7aa" /><p style={{ marginTop: 10 }}>No subjects found.</p></div>
            ) : (
                sortedYears.map(yr => {
                    const c = YEAR_COLORS[yr] || YEAR_COLORS[1];
                    const yearLabel = YEAR_LABELS[yr] || `Year ${yr}`;
                    const sems = grouped[yr];
                    const sortedSems = Object.keys(sems).sort((a, b) => {
                        const ai = SEM_ORDER.indexOf(a), bi = SEM_ORDER.indexOf(b);
                        return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
                    });
                    const yearTotal = sortedSems.reduce((n, s) => n + sems[s].length, 0);

                    return (
                        <div key={yr} style={{ marginBottom: 32 }}>
                            {/* Year header */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                                <div style={{ height: 2, flex: 1, background: `linear-gradient(90deg,${c.grad})`, borderRadius: 2 }} />
                                <span style={{ fontWeight: 800, fontSize: '1rem', color: c.text, whiteSpace: 'nowrap' }}>
                                    {yearLabel}
                                </span>
                                <span style={{ fontSize: '.75rem', fontWeight: 700, padding: '2px 10px', borderRadius: 20, background: c.badge, color: c.text }}>
                                    {yearTotal} subjects
                                </span>
                                <div style={{ height: 2, flex: 1, background: `linear-gradient(90deg,${c.grad.split(',').reverse().join(',')})`, borderRadius: 2 }} />
                            </div>

                            {sortedSems.map(sem => {
                                const items = sems[sem];
                                const semUnits = items.reduce((n, s) => n + (s.units ?? 0), 0);
                                return (
                                    <div key={sem} className="card" style={{ marginBottom: 16 }}>
                                        <div className="card-header" style={{ background: `linear-gradient(135deg,${c.grad})`, color: '#fff' }}>
                                            <h2 style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
                                                <BookOpen size={15} /> {sem}
                                            </h2>
                                            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                                                <span className="badge" style={{ background: 'rgba(255,255,255,.2)', color: '#fff' }}>{items.length} subjects</span>
                                                <span className="badge" style={{ background: 'rgba(255,255,255,.15)', color: '#fff' }}>{semUnits} units total</span>
                                            </div>
                                        </div>
                                        <div className="card-body" style={{ padding: 0 }}>
                                            <div className="table-wrap">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>Course Code</th>
                                                            <th>Course Description</th>
                                                            <th>Units</th>
                                                            <th>Pre-requisite</th>
                                                            <th>Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {items.map((s, i) => (
                                                            <tr key={s.id}>
                                                                <td>{i + 1}</td>
                                                                <td><strong style={{ fontFamily: 'monospace', fontSize: '.85rem' }}>{s.subject_code}</strong></td>
                                                                <td>{s.subject_name}</td>
                                                                <td>
                                                                    <span style={{ fontWeight: 700, padding: '2px 8px', borderRadius: 6, background: c.badge, color: c.text, fontSize: '.8rem' }}>
                                                                        {s.units ?? '—'}
                                                                    </span>
                                                                </td>
                                                                <td style={{ fontSize: '.8rem', color: s.pre_requisite ? '#44403c' : '#a8a29e', fontStyle: s.pre_requisite ? 'normal' : 'italic' }}>
                                                                    {s.pre_requisite || 'none'}
                                                                </td>
                                                                <td>
                                                                    <div style={{ display: 'flex', gap: 6 }}>
                                                                        <button style={iconBtn} onClick={() => openEdit(s)} title="Edit"><Pencil size={13} /></button>
                                                                        <button style={{ ...iconBtn, color: '#dc2626' }} onClick={() => remove(s.id)} title="Delete"><Trash2 size={13} /></button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })
            )}

            {modal && (
                <Modal title={modal === 'add' ? 'Add Subject' : 'Edit Subject'} onClose={() => setModal(null)}>
                    <form onSubmit={save} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
                            <div>
                                <label style={lStyle}>Course Code <span style={{ color: '#dc2626' }}>*</span></label>
                                <input style={iStyle} value={form.subject_code} onChange={set('subject_code')} required placeholder="e.g. CCS101-IT" />
                            </div>
                            <div>
                                <label style={lStyle}>Course Description <span style={{ color: '#dc2626' }}>*</span></label>
                                <input style={iStyle} value={form.subject_name} onChange={set('subject_name')} required placeholder="e.g. Introduction to Computing" />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                            <div>
                                <label style={lStyle}>Program</label>
                                <select style={iStyle} value={form.program} onChange={set('program')}>
                                    <option value="">— Select —</option>
                                    {PROGRAMS.map(p => <option key={p.key} value={p.key}>{p.short}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={lStyle}>Year Level</label>
                                <select style={iStyle} value={form.year_level} onChange={set('year_level')}>
                                    <option value="">— Select —</option>
                                    {YEARS.map(y => <option key={y} value={y}>{YEAR_LABELS[y]}</option>)}
                                </select>
                            </div>
                            <div>
                                <label style={lStyle}>Semester</label>
                                <select style={iStyle} value={form.semester} onChange={set('semester')}>
                                    <option value="">— Select —</option>
                                    {SEMESTERS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 12 }}>
                            <div>
                                <label style={lStyle}>Units</label>
                                <input style={iStyle} type="number" min="0" value={form.units} onChange={set('units')} placeholder="3" />
                            </div>
                            <div>
                                <label style={lStyle}>Pre-requisite</label>
                                <input style={iStyle} value={form.pre_requisite} onChange={set('pre_requisite')} placeholder="e.g. CCS101 or none" />
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
                            <button type="button" className="btn btn-outline" onClick={() => setModal(null)}>Cancel</button>
                            <button type="submit" className="btn btn-primary" disabled={saving}><Check size={14} /> {saving ? 'Saving…' : 'Save'}</button>
                        </div>
                    </form>
                </Modal>
            )}
        </div>
    );
}

const h1      = { fontSize: '1.6rem', fontWeight: 800, color: '#1c1917', margin: 0 };
const sub     = { color: '#78716c', margin: 0 };
const iconWrap = { width: 44, height: 44, borderRadius: 12, background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #fed7aa' };
const overlay  = { position: 'fixed', inset: 0, background: 'rgba(0,0,0,.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 };
const modalCard = { background: '#fff', borderRadius: 20, padding: '28px 32px', width: '100%', maxWidth: 520, boxShadow: '0 20px 60px rgba(0,0,0,.2)' };
const iconBtn  = { background: 'rgba(0,0,0,.04)', border: '1px solid rgba(0,0,0,.08)', borderRadius: 7, width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#78716c' };
const lStyle   = { display: 'block', fontSize: '.78rem', fontWeight: 700, color: '#44403c', marginBottom: 5, letterSpacing: .3 };
const iStyle   = { width: '100%', padding: '9px 12px', borderRadius: 9, border: '1.5px solid #e7e5e4', fontSize: '.875rem', fontFamily: "'Inter',sans-serif", color: '#1c1917', boxSizing: 'border-box' };
