import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSummary } from '../api';
import {
    GraduationCap, CheckCircle, BookOpen, ShieldAlert, Zap, Trophy,
    TrendingUp, ArrowRight, BarChart3, Search, Network, Award,
} from 'lucide-react';

const QUICK_ACTIONS = [
    { to: '/student-map',           label: 'Student Profiles',  Icon: GraduationCap, desc: 'Student profiles',       color: '#3b82f6' },
    { to: '/subjects',              label: 'Subjects',          Icon: BookOpen,      desc: 'All subjects & units',   color: '#f59e0b' },
    { to: '/affiliations',          label: 'Affiliations',      Icon: Network,       desc: 'Org memberships',        color: '#0891b2' },
    { to: '/violations',            label: 'Violations',        Icon: ShieldAlert,   desc: 'Disciplinary records',   color: '#ef4444' },
    { to: '/skills',                label: 'Skills',            Icon: Zap,           desc: 'Student competencies',   color: '#7c3aed' },
    { to: '/academic-records',      label: 'Academic Records',  Icon: Award,         desc: 'GPA & grades',           color: '#059669' },
    { to: '/non-academic-histories',label: 'Non-Academic',      Icon: Trophy,        desc: 'Awards & achievements',  color: '#d97706' },
    { to: '/reports',               label: 'Run Reports',       Icon: BarChart3,     desc: 'Filter & export',        color: '#f97316' },
    { to: '/search',                label: 'Global Search',     Icon: Search,        desc: 'Search all records',     color: '#22c55e' },
];

const GENDER_COLORS = ['#3b82f6', '#ec4899', '#8b5cf6'];

export default function DashboardAdmin() {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getSummary().then(r => setSummary(r.data)).finally(() => setLoading(false));
    }, []);

    return (
        <div>
            {/* Header */}
            <div className="page-header">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 46, height: 46, borderRadius: 13, background: 'linear-gradient(135deg,#f97316,#c2410c)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 14px rgba(249,115,22,.35)' }}>
                            <BarChart3 size={22} color="#fff" strokeWidth={2} />
                        </div>
                        <div>
                            <h1 style={{ fontSize: '1.7rem', fontWeight: 800, color: '#18120e', letterSpacing: '-.02em', margin: 0 }}>Admin Dashboard</h1>
                            <p style={{ color: '#78716c', fontSize: '.88rem', marginTop: 2 }}>CCS Comprehensive Profiling System — Full Access</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#78716c', background: '#fff7ed', padding: '6px 12px', borderRadius: 999, border: '1px solid #fed7aa', fontWeight: 500 }}>
                        <TrendingUp size={13} color="#f97316" />
                        {new Date().toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="loading"><div className="loading-spinner" /><span>Loading dashboard…</span></div>
            ) : (
                <>
                    {/* ── Top stat cards ── */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 20 }}>

                        {/* Total Students — with gender breakdown */}
                        <div className="stat-card" style={{ '--stat-color': '#3b82f6', flexDirection: 'column', alignItems: 'stretch', gap: 0, padding: '18px 20px', height: '100%', boxSizing: 'border-box' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                                <div style={{ width: 50, height: 50, borderRadius: 13, flexShrink: 0, background: '#3b82f618', border: '1px solid #3b82f630', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <GraduationCap size={22} color="#3b82f6" strokeWidth={1.8} />
                                </div>
                                <div>
                                    <div className="stat-label">Total Students</div>
                                    <div className="stat-value" style={{ color: '#3b82f6' }}>{summary?.total_students ?? 0}</div>
                                </div>
                            </div>
                            {summary?.by_gender && (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, borderTop: '1px solid #f1f5f9', paddingTop: 12 }}>
                                    {Object.entries(summary.by_gender).map(([gender, count], i) => {
                                        const pct = summary.total_students ? Math.round((count / summary.total_students) * 100) : 0;
                                        const clr = GENDER_COLORS[i] ?? '#f97316';
                                        return (
                                            <div key={gender}>
                                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                                    <span style={{ fontSize: '.75rem', fontWeight: 600, color: '#78716c' }}>{gender}</span>
                                                    <span style={{ fontSize: '.75rem', fontWeight: 700, color: clr }}>{count} <span style={{ color: '#a8a29e', fontWeight: 500 }}>({pct}%)</span></span>
                                                </div>
                                                <div style={{ height: 5, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden' }}>
                                                    <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg,${clr},${clr}cc)`, borderRadius: 3 }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Active Students */}
                        <div className="stat-card" style={{ '--stat-color': '#22c55e', height: '100%', boxSizing: 'border-box' }}>
                            <div style={{ width: 50, height: 50, borderRadius: 13, flexShrink: 0, background: '#22c55e18', border: '1px solid #22c55e30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <CheckCircle size={22} color="#22c55e" strokeWidth={1.8} />
                            </div>
                            <div>
                                <div className="stat-label">Active Students</div>
                                <div className="stat-value" style={{ color: '#22c55e' }}>{summary?.active_students ?? 0}</div>
                            </div>
                        </div>

                        {/* Subjects */}
                        <div className="stat-card" style={{ '--stat-color': '#f59e0b', height: '100%', boxSizing: 'border-box' }}>
                            <div style={{ width: 50, height: 50, borderRadius: 13, flexShrink: 0, background: '#f59e0b18', border: '1px solid #f59e0b30', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <BookOpen size={22} color="#f59e0b" strokeWidth={1.8} />
                            </div>
                            <div>
                                <div className="stat-label">Subjects</div>
                                <div className="stat-value" style={{ color: '#f59e0b' }}>{summary?.total_subjects ?? 0}</div>
                            </div>
                        </div>

                        {/* Violations */}
                        <div className="stat-card" style={{ '--stat-color': '#ef4444', height: '100%', boxSizing: 'border-box' }}>
                            <div style={{ width: 50, height: 50, borderRadius: 13, flexShrink: 0, background: '#ef444418', border: '1px solid #ef444430', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <ShieldAlert size={22} color="#ef4444" strokeWidth={1.8} />
                            </div>
                            <div>
                                <div className="stat-label">Violations</div>
                                <div className="stat-value" style={{ color: '#ef4444' }}>{summary?.total_violations ?? 0}</div>
                            </div>
                        </div>
                    </div>

                    {/* ── Students by Program ── */}
                    <div className="card" style={{ marginBottom: 20 }}>
                        <div className="card-header">
                            <h2><GraduationCap size={16} color="#f97316" /> Students by Program</h2>
                            <span style={{ fontSize: 12, color: '#a8a29e', fontWeight: 500 }}>{summary?.total_students ?? 0} total</span>
                        </div>
                        <div className="card-body" style={{ padding: 0 }}>
                            {[
                                { key: 'it_students', label: 'BS Information Technology', short: 'BSIT', color: '#2563eb' },
                                { key: 'cs_students', label: 'BS Computer Science',       short: 'BSCS', color: '#7c3aed' },
                            ].map(({ key, label, short, color }, i, arr) => {
                                const count = summary?.[key] ?? 0;
                                const pct   = summary?.total_students ? Math.round((count / summary.total_students) * 100) : 0;
                                return (
                                    <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 20px', borderBottom: i < arr.length - 1 ? '1px solid #f5f5f4' : 'none' }}>
                                        <div style={{ width: 40, height: 40, borderRadius: 10, background: `${color}18`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                            <BookOpen size={18} color={color} />
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                                <div>
                                                    <span style={{ fontSize: 13, fontWeight: 800, color, marginRight: 8 }}>{short}</span>
                                                    <span style={{ fontSize: 12, color: '#78716c' }}>{label}</span>
                                                </div>
                                                <span style={{ fontSize: 15, fontWeight: 800, color }}>{count}</span>
                                            </div>
                                            <div style={{ height: 6, background: '#f5f5f4', borderRadius: 3, overflow: 'hidden' }}>
                                                <div style={{ width: `${pct}%`, height: '100%', background: `linear-gradient(90deg,${color},${color}cc)`, borderRadius: 3, transition: 'width .4s ease' }} />
                                            </div>
                                        </div>
                                        <span style={{ fontSize: 11, color: '#a8a29e', fontWeight: 600, minWidth: 34, textAlign: 'right' }}>{pct}%</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* ── Quick Actions ── */}
                    <div style={{ marginBottom: 4 }}>
                        <div className="section-divider"><h2>Quick Access</h2></div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(190px,1fr))', gap: 12 }}>
                            {QUICK_ACTIONS.map(({ to, label, Icon, desc, color }) => (
                                <Link key={to} to={to} className="action-card">
                                    <div className="action-icon" style={{ background: `linear-gradient(135deg,${color},${color}cc)` }}>
                                        <Icon size={17} color="#fff" strokeWidth={2} />
                                    </div>
                                    <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ fontWeight: 700, fontSize: 13, color: '#18120e', lineHeight: 1.2 }}>{label}</div>
                                        <div style={{ fontSize: 11, color: '#a8a29e', marginTop: 2 }}>{desc}</div>
                                    </div>
                                    <ArrowRight size={14} color="#d6d3d1" style={{ flexShrink: 0 }} />
                                </Link>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
