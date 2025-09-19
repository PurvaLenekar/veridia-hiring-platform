import React, { useState } from "react";

// Single-file React component prototype for Veridia Hiring Platform
// Uses Tailwind CSS classes for styling. Designed as a UI/UX prototype (no backend).

export default function HiringPlatformPrototype() {
  const [view, setView] = useState("home"); // home | register | login | apply | applicant | admin
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState(sampleApplications());
  const [formData, setFormData] = useState(sampleEmptyForm());
  const [filters, setFilters] = useState({ role: "All", status: "All", q: "" });

  function sampleApplications() {
    return [
      { id: 1, name: "Aarav Sharma", email: "aarav@example.com", role: "Frontend Dev", status: "Submitted", submittedOn: "2025-09-14" },
      { id: 2, name: "Neha Patil", email: "neha@example.com", role: "Data Scientist", status: "Shortlisted", submittedOn: "2025-09-15" },
      { id: 3, name: "Rahul Joshi", email: "rahul@example.com", role: "Backend Dev", status: "Rejected", submittedOn: "2025-09-16" },
    ];
  }

  function sampleEmptyForm() {
    return {
      fullName: "",
      email: "",
      phone: "",
      role: "Frontend Dev",
      experience: "0",
      resumeUrl: "",
      coverLetter: "",
    };
  }

  function handleRegister(values) {
    // prototype: just set user and go to applicant dashboard
    setUser({ name: values.fullName, email: values.email, role: values.role });
    setView("applicant");
  }

  function handleLogin(creds) {
    // prototype logic: if email contains "hr@" treat as admin
    if (creds.email && creds.email.includes("hr@")) {
      setUser({ name: "HR Team", email: creds.email, admin: true });
      setView("admin");
      return;
    }
    setUser({ name: creds.email.split("@")[0], email: creds.email });
    setView("applicant");
  }

  function handleSubmitApplication(data) {
    const id = applications.length + 1;
    const app = { id, name: data.fullName, email: data.email, role: data.role, status: "Submitted", submittedOn: new Date().toISOString().slice(0,10) };
    setApplications([app, ...applications]);
    alert("Application submitted! (Prototype)");
    setView("applicant");
  }

  function applyFilters(apps) {
    return apps.filter(a => {
      if (filters.role !== "All" && a.role !== filters.role) return false;
      if (filters.status !== "All" && a.status !== filters.status) return false;
      if (filters.q && !a.name.toLowerCase().includes(filters.q.toLowerCase()) && !a.email.toLowerCase().includes(filters.q.toLowerCase())) return false;
      return true;
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-indigo-600 font-bold text-xl">Veridia Hiring</div>
            <nav className="hidden md:flex gap-3 text-sm text-gray-600">
              <button onClick={() => setView('home')} className="hover:underline">Home</button>
              <button onClick={() => setView('apply')} className="hover:underline">Apply</button>
              <button onClick={() => setView('admin')} className="hover:underline">Admin</button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="text-sm">Signed in as <span className="font-medium">{user.name}</span></div>
                <button className="px-3 py-1 rounded bg-red-50 text-red-600 text-sm" onClick={() => { setUser(null); setView('home'); }}>Sign out</button>
              </div>
            ) : (
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded bg-indigo-600 text-white text-sm" onClick={() => setView('login')}>Login</button>
                <button className="px-3 py-1 rounded border text-sm" onClick={() => setView('register')}>Register</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6">
        {view === 'home' && (
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h1 className="text-3xl font-bold">A better hiring experience for Veridia</h1>
              <p className="mt-4 text-gray-600">Replace Google Forms with a clean, tracked workflow for candidates and HR. This prototype includes candidate registration, an application form, applicant dashboard, and an admin dashboard for managing and filtering applications.</p>

              <div className="mt-6 flex gap-3">
                <button onClick={() => setView('register')} className="px-4 py-2 bg-indigo-600 text-white rounded">Get started</button>
                <button onClick={() => setView('apply')} className="px-4 py-2 border rounded">Apply now</button>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <StatCard title="Applications" value={applications.length} />
                <StatCard title="Open Roles" value={6} />
                <StatCard title="Avg Time to Hire" value={'8 days'} />
              </div>
            </div>

            <div className="bg-white rounded p-4 shadow-sm">
              <h3 className="font-medium">Sample open roles</h3>
              <ul className="mt-3 text-sm text-gray-700 space-y-2">
                <li className="p-2 border rounded">Frontend Developer — React</li>
                <li className="p-2 border rounded">Backend Developer — Node.js</li>
                <li className="p-2 border rounded">Data Scientist</li>
              </ul>
            </div>
          </section>
        )}

        {view === 'register' && (
          <Card title="Create account">
            <RegisterForm onSubmit={(v) => handleRegister(v)} />
          </Card>
        )}

        {view === 'login' && (
          <Card title="Login">
            <LoginForm onSubmit={(c) => handleLogin(c)} />
          </Card>
        )}

        {view === 'apply' && (
          <Card title="Application Form">
            <ApplicationForm data={formData} onChange={(d)=>setFormData(d)} onSubmit={(d)=>handleSubmitApplication(d)} />
          </Card>
        )}

        {view === 'applicant' && user && (
          <Card title="Applicant Dashboard">
            <div className="mb-4 text-sm text-gray-600">Welcome back, <span className="font-medium">{user.name}</span>. Here you can view your application status, update your profile, and submit new applications.</div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-indigo-50 p-4 rounded">
                <h4 className="font-medium">Your profile</h4>
                <p className="text-sm mt-2">Email: {user.email}</p>
                <p className="text-sm">Role: {user.role || '—'}</p>
                <button className="mt-3 px-3 py-1 border rounded text-sm" onClick={()=>setView('apply')}>Update / Apply</button>
              </div>

              <div className="p-4 bg-white rounded shadow-sm">
                <h4 className="font-medium">Recent applications</h4>
                <ul className="mt-3 space-y-2 text-sm">
                  {applications.slice(0,3).map(a=> (
                    <li key={a.id} className="p-2 border rounded-flex">
                      <div className="flex justify-between">
                        <div>
                          <div className="font-medium">{a.name}</div>
                          <div className="text-xs text-gray-500">{a.role} • {a.email}</div>
                        </div>
                        <div className="text-sm">{a.status}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}

        {view === 'admin' && (
          <Card title="HR Admin Dashboard">
            <div className="flex gap-3 mb-4">
              <Select value={filters.role} onChange={(v)=>setFilters({...filters, role:v})} opts={["All","Frontend Dev","Backend Dev","Data Scientist"]} />
              <Select value={filters.status} onChange={(v)=>setFilters({...filters, status:v})} opts={["All","Submitted","Shortlisted","Rejected"]} />
              <input placeholder="Search name or email" className="border rounded px-3 py-1" value={filters.q} onChange={(e)=>setFilters({...filters, q: e.target.value})} />
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-left text-gray-500">
                  <tr>
                    <th className="py-2">Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {applyFilters(applications).map(app => (
                    <tr key={app.id} className="border-t">
                      <td className="py-2">{app.name}</td>
                      <td>{app.email}</td>
                      <td>{app.role}</td>
                      <td>{app.status}</td>
                      <td>{app.submittedOn}</td>
                      <td>
                        <div className="flex gap-2">
                          <button className="px-2 py-1 text-xs border rounded" onClick={()=> alert('Open profile (prototype)')}>View</button>
                          <button className="px-2 py-1 text-xs bg-green-50 text-green-700 rounded" onClick={() => updateAppStatus(app.id, 'Shortlisted', setApplications, applications)}>Shortlist</button>
                          <button className="px-2 py-1 text-xs bg-red-50 text-red-700 rounded" onClick={() => updateAppStatus(app.id, 'Rejected', setApplications, applications)}>Reject</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </Card>
        )}

      </main>

      <footer className="text-center text-xs text-gray-500 py-8">Prototype • Veridia Hiring Platform — UI/UX mock (no backend)</footer>
    </div>
  );
}


/* ------------------- Helper components ------------------- */
function Card({ title, children }){
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-semibold mb-4">{title}</h2>
      {children}
    </div>
  );
}

function StatCard({ title, value }){
  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <div className="text-xs text-gray-500">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </div>
  );
}

function RegisterForm({ onSubmit }){
  const [state, setState] = useState({ fullName: '', email: '', password: '', role: 'Frontend Dev' });
  return (
    <form onSubmit={(e)=>{ e.preventDefault(); onSubmit(state); }} className="space-y-3">
      <input required placeholder="Full name" className="w-full border rounded px-3 py-2" value={state.fullName} onChange={(e)=>setState({...state, fullName: e.target.value})} />
      <input required placeholder="Email" className="w-full border rounded px-3 py-2" value={state.email} onChange={(e)=>setState({...state, email: e.target.value})} />
      <select className="w-full border rounded px-3 py-2" value={state.role} onChange={(e)=>setState({...state, role: e.target.value})}>
        <option>Frontend Dev</option>
        <option>Backend Dev</option>
        <option>Data Scientist</option>
      </select>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Create account</button>
        <button type="button" className="px-4 py-2 border rounded" onClick={()=> alert('Sign up with SSO (prototype)')}>SSO</button>
      </div>
    </form>
  );
}

function LoginForm({ onSubmit }){
  const [c, setC] = useState({ email: '', password: '' });
  return (
    <form onSubmit={(e)=>{ e.preventDefault(); onSubmit(c); }} className="space-y-3">
      <input required placeholder="Email" className="w-full border rounded px-3 py-2" value={c.email} onChange={(e)=>setC({...c, email:e.target.value})} />
      <input type="password" placeholder="Password" className="w-full border rounded px-3 py-2" value={c.password} onChange={(e)=>setC({...c, password:e.target.value})} />
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Login</button>
        <button type="button" className="px-4 py-2 border rounded" onClick={()=> alert('Forgot password flow (prototype)')}>Forgot?</button>
      </div>
    </form>
  );
}

function ApplicationForm({ data, onChange, onSubmit }){
  const [local, setLocal] = useState(data);
  function update(k,v){ setLocal({...local, [k]: v}); onChange({...local, [k]: v}); }
  return (
    <form onSubmit={(e)=>{ e.preventDefault(); onSubmit(local); }} className="space-y-3">
      <input required placeholder="Full name" className="w-full border rounded px-3 py-2" value={local.fullName} onChange={(e)=>update('fullName', e.target.value)} />
      <input required placeholder="Email" className="w-full border rounded px-3 py-2" value={local.email} onChange={(e)=>update('email', e.target.value)} />
      <input placeholder="Phone" className="w-full border rounded px-3 py-2" value={local.phone} onChange={(e)=>update('phone', e.target.value)} />
      <select className="w-full border rounded px-3 py-2" value={local.role} onChange={(e)=>update('role', e.target.value)}>
        <option>Frontend Dev</option>
        <option>Backend Dev</option>
        <option>Data Scientist</option>
      </select>
      <input placeholder="Years of experience" className="w-full border rounded px-3 py-2" value={local.experience} onChange={(e)=>update('experience', e.target.value)} />
      <input placeholder="Resume URL (or upload to S3)" className="w-full border rounded px-3 py-2" value={local.resumeUrl} onChange={(e)=>update('resumeUrl', e.target.value)} />
      <textarea placeholder="Short cover letter" className="w-full border rounded px-3 py-2" rows={4} value={local.coverLetter} onChange={(e)=>update('coverLetter', e.target.value)} />
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Submit application</button>
        <button type="button" className="px-4 py-2 border rounded" onClick={()=> { setLocal(sampleEmptyForm()); onChange(sampleEmptyForm()); }}>Reset</button>
      </div>
    </form>
  );
}

function Select({ value, onChange, opts }){
  return (
    <select className="border rounded px-3 py-1" value={value} onChange={(e)=>onChange(e.target.value)}>
      {opts.map(o=> <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function updateAppStatus(id, status, setter, current){
  const updated = current.map(a=> a.id === id ? {...a, status} : a);
  setter(updated);
  alert('Status updated (prototype)');
}

function sampleEmptyForm(){
  return { fullName: '', email: '', phone: '', role: 'Frontend Dev', experience: '0', resumeUrl: '', coverLetter: '' };
}
