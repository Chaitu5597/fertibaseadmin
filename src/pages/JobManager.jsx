import { useState, useEffect } from "react";
import {
    Briefcase, MapPin, Clock, DollarSign, Users, Calendar,
    Plus, Search, Filter, Trash2, Pencil, X, Save,
    CheckCircle, AlertCircle, ChevronRight, MoreVertical,
    Building, GraduationCap, Wrench, Lightbulb
} from "lucide-react";
import * as jobService from '../services/jobService';

export default function JobManager() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    const initialFormState = {
        id: "",
        category: "",
        title: "",
        preview: "",
        desc: "",
        about: "",
        responsibilities: [],
        requirements: [],
        skills: [],
        tools: [],
        experience: "",
        salary: "",
        location: "",
        mode: "On-site",
        type: "Full-Time",
        positions: 1,
        daysLeft: 30,
        niceToHave: [],
        applyNote: "",
    };

    const [form, setForm] = useState(initialFormState);
    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await jobService.getJobs();
            const normalizedData = Array.isArray(data) ? data.map(j => ({ ...j, id: j._id || j.id })) : [];
            setJobs(normalizedData);
        } catch (err) {
            setError(err.message || 'Failed to load jobs');
            console.error('Error fetching jobs:', err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setForm(initialFormState);
        setEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        try {
            const { id, _id, __v: ___v, createdAt: _createdAt, updatedAt: _updatedAt, ...jobData } = form;
            const jobId = id || _id;

            if (!editing) {
                const newJob = await jobService.createJob(jobData);
                const normalizedJob = { ...newJob, id: newJob._id || newJob.id };
                setJobs([...jobs, normalizedJob]);
            } else {
                const updatedJob = await jobService.updateJob(jobId, jobData);
                const normalizedJob = { ...updatedJob, id: updatedJob._id || updatedJob.id };
                setJobs(jobs.map(j => j.id === jobId ? normalizedJob : j));
            }
            setModalOpen(false);
            resetForm();
        } catch (err) {
            alert('Failed to save job: ' + err.message);
            console.error('Error saving job:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this job?')) return;
        setActionLoading(true);
        try {
            await jobService.deleteJob(id);
            setJobs(jobs.filter(j => j.id !== id));
        } catch (err) {
            alert('Failed to delete job: ' + err.message);
            console.error('Error deleting job:', err);
        } finally {
            setActionLoading(false);
        }
    };

    const handleEdit = (job) => {
        setForm(job);
        setEditing(true);
        setModalOpen(true);
    };

    const addItem = (key, item) => setForm({ ...form, [key]: [...form[key], item] });
    const removeItem = (key, index) => setForm({ ...form, [key]: form[key].filter((_, i) => i !== index) });
    const updateItem = (key, index, value) => {
        const newArray = [...form[key]];
        newArray[index] = value;
        setForm({ ...form, [key]: newArray });
    };

    const filteredJobs = jobs.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50/50 p-6 lg:p-10 font-sans text-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Job Postings</h1>
                    <p className="text-slate-500 mt-2 text-sm font-medium">Manage career opportunities and openings</p>
                </div>
                <button
                    onClick={() => { resetForm(); setModalOpen(true); }}
                    className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 flex items-center gap-2"
                >
                    <Plus size={20} /> Post New Job
                </button>
            </div>

            {/* === FILTERS & SEARCH === */}
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-slate-100 mb-8 flex items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 size-5 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search jobs by title, category..."
                        className="w-full pl-12 pr-4 py-3 bg-transparent rounded-xl focus:outline-none text-slate-700 placeholder:text-slate-400"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {/* === ERROR ALERT === */}
            {error && (
                <div className="bg-red-50 border border-red-100 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
                    <AlertCircle size={20} />
                    <p>{error}</p>
                </div>
            )}

            {/* === JOB LIST === */}
            <div className="grid grid-cols-1 gap-6">
                {filteredJobs.map((job) => (
                    <div key={job.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-shadow">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 uppercase tracking-wide">
                                        {job.category}
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                                        {job.type}
                                    </span>
                                    {job.mode && (
                                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700">
                                            {job.mode}
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">{job.title}</h3>
                                <p className="text-slate-500 text-sm mb-4 line-clamp-2">{job.preview}</p>

                                <div className="flex flex-wrap gap-4 text-sm text-slate-500 font-medium">
                                    <div className="flex items-center gap-1.5"><MapPin size={16} /> {job.location}</div>
                                    <div className="flex items-center gap-1.5"><Clock size={16} /> {job.experience}</div>
                                    <div className="flex items-center gap-1.5"><DollarSign size={16} /> {job.salary}</div>
                                    <div className="flex items-center gap-1.5"><Users size={16} /> {job.positions} Positions</div>
                                    <div className="flex items-center gap-1.5"><Calendar size={16} /> {job.daysLeft} Days Left</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-100">
                                <button
                                    onClick={() => handleEdit(job)}
                                    className="p-2.5 text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                                    title="Edit Job"
                                >
                                    <Pencil size={20} />
                                </button>
                                <button
                                    onClick={() => handleDelete(job.id)}
                                    className="p-2.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                                    title="Delete Job"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {filteredJobs.length === 0 && !loading && (
                    <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-200">
                        <Briefcase size={48} className="mx-auto text-slate-300 mb-4" />
                        <h3 className="text-lg font-medium text-slate-900">No jobs found</h3>
                        <p className="text-slate-500">Try adjusting your search or post a new job.</p>
                    </div>
                )}
            </div>

            {/* === MODAL === */}
            {modalOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 lg:p-8">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl h-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">

                        {/* Modal Header */}
                        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                                    {editing ? "Edit Job Posting" : "New Job Posting"}
                                </h2>
                                <p className="text-slate-500 text-sm mt-1">Fill in the details to publish a new career opportunity</p>
                            </div>
                            <button
                                onClick={() => { setModalOpen(false); resetForm(); }}
                                className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="flex-1 overflow-y-auto p-6 lg:p-10 bg-slate-50/50">
                            <form id="job-form" onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">

                                {/* Basic Info */}
                                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600"><Briefcase size={18} /></div>
                                        Job Overview
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Job Title <span className="text-red-500">*</span></label>
                                            <input required type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="e.g. Senior Agronomist" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Category <span className="text-red-500">*</span></label>
                                            <input required type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="e.g. Research & Development" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Type</label>
                                            <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                                                <option>Full-Time</option>
                                                <option>Part-Time</option>
                                                <option>Contract</option>
                                                <option>Internship</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Mode</label>
                                            <select className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white" value={form.mode} onChange={e => setForm({ ...form, mode: e.target.value })}>
                                                <option>On-site</option>
                                                <option>Hybrid</option>
                                                <option>Remote</option>
                                                <option>Field</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Location</label>
                                            <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="e.g. Hyderabad" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Experience</label>
                                            <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="e.g. 2-5 years" value={form.experience} onChange={e => setForm({ ...form, experience: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Salary Range</label>
                                            <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="e.g. ₹4L - ₹8L LPA" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-slate-700">Positions</label>
                                            <input type="number" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" value={form.positions} onChange={e => setForm({ ...form, positions: parseInt(e.target.value) || 1 })} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Days Left</label>
                                        <input type="number" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" value={form.daysLeft} onChange={e => setForm({ ...form, daysLeft: parseInt(e.target.value) || 0 })} />
                                    </div>
                                </div>

                                {/* Descriptions */}
                                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                                    <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600"><CheckCircle size={18} /></div>
                                        Job Details
                                    </h3>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Short Preview</label>
                                        <textarea rows={2} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="Brief summary for the card view..." value={form.preview} onChange={e => setForm({ ...form, preview: e.target.value })} />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Full Description</label>
                                        <textarea rows={3} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="Detailed job description..." value={form.desc} onChange={e => setForm({ ...form, desc: e.target.value })} />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">About the Role</label>
                                        <textarea rows={3} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="More context about the role and team..." value={form.about} onChange={e => setForm({ ...form, about: e.target.value })} />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Application Note</label>
                                        <input type="text" className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none" placeholder="e.g. Attach research publications..." value={form.applyNote} onChange={e => setForm({ ...form, applyNote: e.target.value })} />
                                    </div>
                                </div>

                                {/* Lists (Responsibilities, Requirements, etc.) */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Responsibilities */}
                                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-slate-900 flex items-center gap-2"><Briefcase size={16} className="text-blue-500" /> Responsibilities</h3>
                                            <button type="button" onClick={() => addItem("responsibilities", "")} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg"><Plus size={16} /></button>
                                        </div>
                                        <div className="space-y-2">
                                            {form.responsibilities.map((item, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <input type="text" className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none" value={item} onChange={e => updateItem("responsibilities", i, e.target.value)} placeholder="Add responsibility..." />
                                                    <button type="button" onClick={() => removeItem("responsibilities", i)} className="text-slate-400 hover:text-red-500"><X size={16} /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Requirements */}
                                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-slate-900 flex items-center gap-2"><GraduationCap size={16} className="text-emerald-500" /> Requirements</h3>
                                            <button type="button" onClick={() => addItem("requirements", "")} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg"><Plus size={16} /></button>
                                        </div>
                                        <div className="space-y-2">
                                            {form.requirements.map((item, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <input type="text" className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none" value={item} onChange={e => updateItem("requirements", i, e.target.value)} placeholder="Add requirement..." />
                                                    <button type="button" onClick={() => removeItem("requirements", i)} className="text-slate-400 hover:text-red-500"><X size={16} /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-slate-900 flex items-center gap-2"><Lightbulb size={16} className="text-yellow-500" /> Skills</h3>
                                            <button type="button" onClick={() => addItem("skills", "")} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg"><Plus size={16} /></button>
                                        </div>
                                        <div className="space-y-2">
                                            {form.skills.map((item, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <input type="text" className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none" value={item} onChange={e => updateItem("skills", i, e.target.value)} placeholder="Add skill..." />
                                                    <button type="button" onClick={() => removeItem("skills", i)} className="text-slate-400 hover:text-red-500"><X size={16} /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tools */}
                                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-slate-900 flex items-center gap-2"><Wrench size={16} className="text-slate-500" /> Tools</h3>
                                            <button type="button" onClick={() => addItem("tools", "")} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg"><Plus size={16} /></button>
                                        </div>
                                        <div className="space-y-2">
                                            {form.tools.map((item, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <input type="text" className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none" value={item} onChange={e => updateItem("tools", i, e.target.value)} placeholder="Add tool..." />
                                                    <button type="button" onClick={() => removeItem("tools", i)} className="text-slate-400 hover:text-red-500"><X size={16} /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Nice To Have */}
                                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 md:col-span-2">
                                        <div className="flex justify-between items-center">
                                            <h3 className="font-bold text-slate-900 flex items-center gap-2"><PlusCircle size={16} className="text-purple-500" /> Nice To Have</h3>
                                            <button type="button" onClick={() => addItem("niceToHave", "")} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg"><Plus size={16} /></button>
                                        </div>
                                        <div className="space-y-2">
                                            {form.niceToHave.map((item, i) => (
                                                <div key={i} className="flex gap-2">
                                                    <input type="text" className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-blue-500 outline-none" value={item} onChange={e => updateItem("niceToHave", i, e.target.value)} placeholder="Add nice-to-have..." />
                                                    <button type="button" onClick={() => removeItem("niceToHave", i)} className="text-slate-400 hover:text-red-500"><X size={16} /></button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </form>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-8 py-5 border-t border-slate-100 bg-white flex justify-end gap-4 sticky bottom-0 z-10">
                            <button onClick={() => { setModalOpen(false); resetForm(); }} className="px-6 py-3 rounded-xl text-slate-600 font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
                            <button type="submit" form="job-form" disabled={actionLoading} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 transition-all flex items-center gap-2 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
                                <Save size={18} /> {actionLoading ? "Saving..." : (editing ? "Save Changes" : "Post Job")}
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
}

// Helper icon
function PlusCircle({ size, className }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
    )
}
