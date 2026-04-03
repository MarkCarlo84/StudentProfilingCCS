import React, { useState, useCallback } from 'react';
import { searchAll, getStudent } from '../api';
import { Search, GraduationCap, X, Loader2 } from 'lucide-react';
import { StudentProfileModal } from './StudentDataMap';

const StatusPill = ({ val }) => <span style={{ background: '#fff7ed', color: '#c2410c', border: '1px solid #fed7aa', borderRadius: 999, padding: '2px 9px', fontSize: 11, fontWeight: 700 }}>{val}</span>;

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [timer, setTimer] = useState(null);
    const [profileModal, setProfileModal] = useState(null);
    const [profileLoading, setProfileLoading] = useState(false);

    const openProfile = async (s) => {
        setProfileLoading(s.id);
        try {
            const res = await getStudent(s.id);
            setProfileModal(res.data);
        } catch { setProfileModal(s); }
        finally { setProfileLoading(false); }
    };

    const runSearch = async (q) => {
        if (!q.trim()) { setResults(null); return; }
        setLoading(true);
        try { const r = await searchAll(q); setResults(r); }
        catch (e) { console.error(e); }
        setLoading(false);
    };

    const handleInput = useCallback((e) => {
        const q = e.target.value;
        setQuery(q);
        clearTimeout(timer);
        if (q.length >= 2) {
            setTimer(setTimeout(() => runSearch(q), 400));
        } else { setResults(null); }
    }, [timer]);

    const clearSearch = () => { setQuery(''); setResults(null); };

    return (
        <div>
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                    <div className="page-icon"><Search size={22} color="#f97316" strokeWidth={1.8} /></div>
                    <div>
                        <h1 style={{ fontSize: '1.6rem', color: '#18120e', fontWeight: 800, letterSpacing: '-.02em', margin: 0 }}>Student Search</h1>
                        <p style={{ color: '#78716c', fontSize: '.86rem', marginTop: 2 }}>Search students by name or ID</p>
                    </div>
                </div>
            </div>

            {/* Search Box */}
            <div style={{ position: 'relative', marginBottom: 20, maxWidth: 640 }}>
                <Search size={18} color="#a8a29e" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                <input
                    type="text"
                    value={query}
                    onChange={handleInput}
                    placeholder="Search by name or student ID…"
                    style={{
                        width: '100%', padding: '14px 16px 14px 46px',
                        border: query ? '2px solid #f97316' : '2px solid #e7e5e4',
                        borderRadius: 12, fontSize: '1rem',
                        background: '#fff', color: '#18120e', outline: 'none',
                        boxShadow: query ? '0 0 0 3px rgba(249,115,22,.15)' : '0 2px 8px rgba(0,0,0,.06)',
                        transition: 'all .2s ease', fontFamily: 'Inter, sans-serif',
                        paddingRight: (loading || query) ? 48 : 16,
                    }}
                />
                {loading && <Loader2 size={17} color="#f97316" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', animation: 'spin .7s linear infinite' }} />}
                {!loading && query && <button onClick={clearSearch} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: '#f5f5f4', border: 'none', borderRadius: '50%', width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={13} color="#78716c" /></button>}
            </div>

            {/* Empty state */}
            {!query && (
                <div style={{ textAlign: 'center', padding: '70px 20px', color: '#a8a29e' }}>
                    <div style={{ width: 72, height: 72, borderRadius: 20, background: '#fff7ed', border: '2px dashed #fed7aa', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                        <Search size={30} color="#f97316" opacity={.5} />
                    </div>
                    <p style={{ fontWeight: 600, color: '#78716c', marginBottom: 6 }}>Search student profiles</p>
                    <p style={{ fontSize: 13 }}>Type at least 2 characters to search</p>
                </div>
            )}

            {/* Results */}
            {results && (
                <div>
                    {results.students?.length > 0 ? (
                        <div className="card">
                            <div className="card-header">
                                <h2><GraduationCap size={15} color="#3b82f6" />Students</h2>
                                <span style={{ fontSize: 12, color: '#a8a29e', fontWeight: 500 }}>{results.students.length} result(s)</span>
                            </div>
                            <div className="table-wrap">
                                <table>
                                    <thead>
                                        <tr>{['Student ID', 'Name', 'Gender', 'Age', 'Email', 'Status'].map(h => <th key={h}>{h}</th>)}</tr>
                                    </thead>
                                    <tbody>
                                        {results.students.map(s => (
                                            <tr key={s.id}>
                                                <td><strong style={{ color: '#3b82f6' }}>{s.student_id}</strong></td>
                                                <td style={{ fontWeight: 600, color: '#ea580c', cursor: 'pointer', textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: 3 }} onClick={() => openProfile(s)}>
                                                    {profileLoading === s.id ? <Loader2 size={13} style={{ animation: 'spin .7s linear infinite', marginRight: 4 }} /> : null}
                                                    {s.last_name}, {s.first_name}
                                                </td>
                                                <td>{s.gender || '—'}</td>
                                                <td>{s.age || '—'}</td>
                                                <td style={{ fontSize: 13, color: '#78716c' }}>{s.email || '—'}</td>
                                                <td><StatusPill val={s.status} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : query && (
                        <div className="empty">
                            <Search size={36} color="#fed7aa" />
                            <span style={{ fontWeight: 600, color: '#78716c' }}>No results found for "{query}"</span>
                        </div>
                    )}
                </div>
            )}
            {profileModal && <StudentProfileModal student={profileModal} onClose={() => setProfileModal(null)} />}
        </div>
    );
}
