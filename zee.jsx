import React, { useState, useEffect } from 'react';

// --- DATA DUMMY (Database Simulasi) ---
const PORTFOLIO_DATA = {
    stats: [
        { label: "Real Products Built", value: "5+", color: "bg-red-500", icon: "insights" },
        { label: "Active Projects", value: "3", color: "bg-green-500", icon: "code" },
        { label: "Years Experience", value: "2+", color: "bg-blue-500", icon: "school" },
    ],
    projects: [
        {
            id: 1,
            title: "LiftNode – Workout App Stack",
            category: "Mobile Application",
            categoryIcon: "smartphone",
            tag: "Flutter",
            tagIcon: "flutter_dash",
            tagColor: "bg-blue-100 text-blue-700 dark:bg-[#1e3a8a] dark:text-blue-100",
            shortDesc: "Offline-first fitness application focused on privacy and performance, built with Flutter & Dart.",
            longDesc: "LiftNode adalah aplikasi kebugaran yang dirancang untuk pengguna yang mengutamakan privasi. Tidak ada data yang dikirim ke cloud tanpa izin. Fitur termasuk pelacakan set real-time, grafik kemajuan, dan kalkulator 1RM. Dibangun menggunakan arsitektur Clean Architecture untuk skalabilitas.",
            progress: 80,
            progressColor: "bg-blue-500",
            techStack: ["Flutter", "Dart", "SQLite", "Bloc"],
        },
        {
            id: 2,
            title: "LuminaCal – AI Calorie Tracker",
            category: "Android Application",
            categoryIcon: "android",
            tag: "Kotlin / Android",
            tagIcon: "code",
            tagColor: "bg-green-100 text-green-700 dark:bg-[#14532d] dark:text-green-100",
            shortDesc: "AI-powered calorie tracking app using ML-based food recognition, optimized for local Indonesian dishes.",
            longDesc: "LuminaCal menggunakan TensorFlow Lite di perangkat untuk mengenali makanan Indonesia secara instan. Aplikasi ini membantu pengguna melacak asupan kalori harian dengan akurasi tinggi tanpa perlu koneksi internet konstan.",
            progress: 100,
            progressColor: "bg-green-500",
            techStack: ["Kotlin", "Jetpack Compose", "TensorFlow Lite", "Room DB"],
        },
        {
            id: 3,
            title: "Kelas Kampus Platform Stack",
            category: "Web Platform",
            categoryIcon: "web",
            tag: "Next.js / Tailwind CSS",
            tagIcon: "layers",
            tagColor: "bg-gray-100 text-gray-700 dark:bg-[#333333] dark:text-white",
            shortDesc: "Integrated SNBT preparation platform with CBT simulation, analytics dashboard, and responsive web interface.",
            longDesc: "Platform pendidikan komprehensif untuk persiapan masuk universitas. Memiliki fitur Tryout CBT yang mirip aslinya, analisis butir soal, dan dashboard progres siswa yang detail.",
            progress: 100,
            progressColor: "bg-purple-500",
            techStack: ["Next.js", "React", "PostgreSQL", "Tailwind CSS"],
        },
        // Menambahkan proyek dummy tambahan untuk mendemonstrasikan fitur search & scroll
        {
            id: 4,
            title: "Dzakwan Portfolio V1",
            category: "Web Design",
            categoryIcon: "web",
            tag: "HTML / CSS",
            tagIcon: "html",
            tagColor: "bg-orange-100 text-orange-700 dark:bg-[#431407] dark:text-orange-100",
            shortDesc: "Portofolio versi pertama yang dibuat dengan HTML5 dan CSS3 murni tanpa framework.",
            longDesc: "Langkah awal dalam perjalanan web development. Fokus pada semantik HTML dan layout CSS Flexbox/Grid.",
            progress: 100,
            progressColor: "bg-orange-500",
            techStack: ["HTML5", "CSS3", "Javascript"],
        },
    ]
};

const App = () => {
    // --- STATE MANAGEMENT ---
    const [darkMode, setDarkMode] = useState(true);
    const [activeView, setActiveView] = useState('overview'); // 'overview', 'projects', 'contact', 'experience'
    const [searchQuery, setSearchQuery] = useState('');

    // Modal States
    const [selectedProject, setSelectedProject] = useState(null); // Jika tidak null, tampilkan modal detail
    const [isHireModalOpen, setIsHireModalOpen] = useState(false);

    // Toast Notification State
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    // --- HANDLERS ---

    // Filter Project Logic
    const filteredProjects = PORTFOLIO_DATA.projects.filter(project => {
        const query = searchQuery.toLowerCase();
        return (
            project.title.toLowerCase().includes(query) ||
            project.tag.toLowerCase().includes(query) ||
            project.category.toLowerCase().includes(query)
        );
    });

    const handleShowToast = (message, type = 'success') => {
        setToast({ show: true, message, type });
        setTimeout(() => setToast({ ...toast, show: false }), 3000);
    };

    // --- STYLES ---
    const glowTopRightStyle = {
        background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 70%)',
        top: '-200px',
        right: '-100px',
        opacity: 0.6,
    };

    const glowCenterStyle = {
        background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)',
        top: '20%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '400px',
        opacity: 0.5,
    };

    return (
        <div className={`${darkMode ? 'dark' : ''} min-h-screen font-sans selection:bg-gray-200 selection:text-black`}>
            {/* External Resources */}
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

            <style>{`
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-size: 24px; 
          vertical-align: middle;
        }
        /* Custom Scrollbar for Project Grid */
        .custom-scroll::-webkit-scrollbar { width: 6px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background-color: rgba(156, 163, 175, 0.5); border-radius: 20px; }
      `}</style>

            <div className="bg-[#f3f4f6] dark:bg-[#050505] text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen overflow-x-hidden relative">

                {/* Glow Effects */}
                <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0 hidden dark:block" style={glowTopRightStyle}></div>
                <div className="absolute rounded-full pointer-events-none z-0 hidden dark:block" style={glowCenterStyle}></div>

                {/* --- NAVIGATION BAR --- */}
                <nav className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                    <div className="backdrop-blur-xl bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between w-full max-w-6xl shadow-lg transition-all duration-300">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveView('overview')}>
                            <div className="w-8 h-8 bg-black dark:bg-transparent border border-gray-800 dark:border-white rounded-lg flex items-center justify-center">
                                <div className="w-3 h-3 border-2 border-white transform rotate-45"></div>
                            </div>
                            <span className="text-xl font-bold tracking-tight text-black dark:text-white">Dzakwan</span>
                        </div>

                        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
                            {['Overview', 'Projects', 'Experience', 'Contact'].map((item) => {
                                const viewKey = item.toLowerCase();
                                const isActive = activeView === viewKey;
                                return (
                                    <button
                                        key={item}
                                        onClick={() => setActiveView(viewKey)}
                                        className={`transition-colors relative ${isActive ? 'text-black dark:text-white font-bold' : 'hover:text-black dark:hover:text-white'}`}
                                    >
                                        {item}
                                        {isActive && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black dark:bg-white rounded-full"></span>}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="flex items-center gap-3">
                            <button onClick={() => setDarkMode(!darkMode)} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition">
                                <span className="material-symbols-outlined text-lg">{darkMode ? 'light_mode' : 'dark_mode'}</span>
                            </button>
                            <button
                                onClick={() => setIsHireModalOpen(true)}
                                className="bg-white text-black font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all shadow-md text-sm border border-transparent dark:border-none ring-1 ring-black/5 dark:ring-0"
                            >
                                Hire Me
                            </button>
                        </div>
                    </div>
                </nav>

                {/* --- MAIN CONTENT --- */}
                <main className="relative pt-32 pb-20 px-4 z-10 flex flex-col items-center">

                    {/* HERO SECTION (Static) */}
                    <div className="text-center max-w-4xl mx-auto mb-16 relative z-10 animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight tracking-tight">
                            Build Digital Products <br />
                            That Feel Right
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Final-year Computer Science student specializing in Front-End & UI/UX Development, crafting modern, scalable, and user-centric digital experiences.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button onClick={() => setActiveView('projects')} className="bg-white text-black font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-200 transition-colors shadow-lg text-base w-full sm:w-auto border border-transparent dark:border-none ring-1 ring-black/5 dark:ring-0">
                                View Projects
                            </button>
                            <button className="bg-transparent border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white font-medium px-8 py-3.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-base w-full sm:w-auto">
                                Download CV
                            </button>
                        </div>

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full pointer-events-none opacity-20 dark:opacity-10 -z-10">
                            <div className="w-full h-full border border-gray-400 dark:border-white rounded-[50%] transform scale-y-50"></div>
                        </div>
                    </div>

                    {/* DASHBOARD INTERFACE (Dynamic Content) */}
                    <div className="w-full max-w-6xl relative perspective-1000 mt-12 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 dark:to-white/5 blur-3xl -z-10 rounded-full opacity-50"></div>

                        <div className="bg-white dark:bg-[#18181b] rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px] transition-all">

                            {/* SIDEBAR */}
                            <div className="hidden md:flex md:col-span-2 bg-gray-50 dark:bg-[#0f0f10] border-r border-gray-200 dark:border-white/5 flex-col p-4">
                                <div className="flex items-center gap-2 mb-8 px-2">
                                    <div className="w-6 h-6 border border-gray-800 dark:border-white rounded flex items-center justify-center">
                                        <div className="w-2 h-2 border border-black dark:border-white transform rotate-45"></div>
                                    </div>
                                    <span className="text-sm font-bold text-gray-900 dark:text-white">Dzakwan</span>
                                </div>

                                <div className="space-y-1">
                                    <SidebarLink icon="dashboard" label="Overview" active={activeView === 'overview'} onClick={() => setActiveView('overview')} />
                                    <SidebarLink icon="folder" label="Projects" active={activeView === 'projects'} onClick={() => setActiveView('projects')} />
                                    <SidebarLink icon="work" label="Experience" active={activeView === 'experience'} onClick={() => setActiveView('experience')} />
                                    <SidebarLink icon="mail" label="Contact" active={activeView === 'contact'} onClick={() => setActiveView('contact')} />
                                </div>
                            </div>

                            {/* MAIN DASHBOARD AREA */}
                            <div className="col-span-1 md:col-span-10 p-6 md:p-8 bg-gray-100 dark:bg-[#121212] relative overflow-y-auto custom-scroll max-h-[800px]">

                                {/* --- HEADER (SEARCH & FILTER) --- */}
                                {(activeView === 'overview' || activeView === 'projects') && (
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                                        <div className="relative w-full md:w-96 group">
                                            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors group-focus-within:text-black dark:group-focus-within:text-white" style={{ fontSize: '18px' }}>search</span>
                                            <input
                                                className="w-full bg-white dark:bg-[#1e1e20] border border-gray-200 dark:border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-white/20 transition-all"
                                                placeholder="Search projects (e.g. Flutter, Next.js)..."
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex items-center gap-3 w-full md:w-auto">
                                            <span className="text-xs text-gray-500 whitespace-nowrap hidden md:block">
                                                Filter by: <span className="text-gray-900 dark:text-white font-medium cursor-pointer hover:underline">Most Recent <span className="material-symbols-outlined align-middle" style={{ fontSize: '14px' }}>expand_more</span></span>
                                            </span>
                                            <button
                                                onClick={() => handleShowToast("Create Project feature is coming soon!", "info")}
                                                className="bg-gray-800 dark:bg-white/10 border border-transparent dark:border-white/10 hover:bg-gray-700 dark:hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-1 ml-auto transition-colors"
                                            >
                                                New Project <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* --- VIEW: OVERVIEW --- */}
                                {activeView === 'overview' && (
                                    <div className="animate-fade-in">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Professional Snapshot</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                            {PORTFOLIO_DATA.stats.map((stat, idx) => (
                                                <StatsCard key={idx} {...stat} />
                                            ))}
                                        </div>

                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Recent Projects</h3>
                                            <button onClick={() => setActiveView('projects')} className="text-sm text-gray-500 hover:text-black dark:hover:text-white transition-colors">View All</button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {/* Show max 3 projects in overview */}
                                            {filteredProjects.slice(0, 3).map((project) => (
                                                <ProjectCard
                                                    key={project.id}
                                                    project={project}
                                                    onClick={() => setSelectedProject(project)}
                                                />
                                            ))}
                                            {filteredProjects.length === 0 && (
                                                <div className="col-span-3 py-10 text-center text-gray-500">No projects found matching "{searchQuery}"</div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* --- VIEW: PROJECTS --- */}
                                {activeView === 'projects' && (
                                    <div className="animate-fade-in">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">All Projects ({filteredProjects.length})</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {filteredProjects.map((project) => (
                                                <ProjectCard
                                                    key={project.id}
                                                    project={project}
                                                    onClick={() => setSelectedProject(project)}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* --- VIEW: EXPERIENCE (Placeholder) --- */}
                                {activeView === 'experience' && (
                                    <div className="animate-fade-in h-full flex flex-col items-center justify-center py-20 text-center">
                                        <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-white/10 flex items-center justify-center mb-4">
                                            <span className="material-symbols-outlined text-3xl text-gray-400">work_history</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Experience Timeline</h3>
                                        <p className="text-gray-500 dark:text-gray-400 max-w-md mt-2">
                                            This section is currently under construction. It will feature a detailed timeline of my professional journey.
                                        </p>
                                        <button onClick={() => setActiveView('overview')} className="mt-6 px-4 py-2 text-sm bg-gray-200 dark:bg-white/10 rounded-lg hover:bg-gray-300 dark:hover:bg-white/20 transition">Back to Overview</button>
                                    </div>
                                )}

                                {/* --- VIEW: CONTACT --- */}
                                {activeView === 'contact' && (
                                    <div className="animate-fade-in max-w-2xl mx-auto">
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Get in Touch</h2>
                                        <p className="text-gray-500 dark:text-gray-400 mb-8">Have a project in mind? Let's build something amazing together.</p>

                                        <ContactForm onSubmit={(data) => handleShowToast(`Message sent from ${data.name}!`, 'success')} />
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f3f4f6] dark:from-[#050505] to-transparent z-20 pointer-events-none"></div>
                </main>

                <div className="h-20"></div>

                {/* --- MODALS --- */}

                {/* 1. PROJECT DETAIL MODAL */}
                {selectedProject && (
                    <Modal onClose={() => setSelectedProject(null)} title={selectedProject.title}>
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 mb-4">
                                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${selectedProject.tagColor}`}>
                                    <span className="material-symbols-outlined text-sm">{selectedProject.tagIcon}</span> {selectedProject.tag}
                                </span>
                                <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 border border-gray-200 dark:border-white/10 rounded-full">
                                    {selectedProject.category}
                                </span>
                            </div>

                            <div className="h-48 w-full bg-gray-200 dark:bg-white/5 rounded-xl flex items-center justify-center border border-gray-200 dark:border-white/10">
                                <span className="text-gray-400 flex flex-col items-center gap-2">
                                    <span className="material-symbols-outlined text-4xl">image</span>
                                    <span className="text-xs">Project Screenshot Placeholder</span>
                                </span>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Description</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {selectedProject.longDesc}
                                </p>
                            </div>

                            <div>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider mb-2">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {selectedProject.techStack.map(tech => (
                                        <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 text-xs rounded-lg font-medium">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 rounded-xl font-bold text-sm hover:opacity-90 transition flex items-center justify-center gap-2">
                                    View Live Demo <span className="material-symbols-outlined text-sm">open_in_new</span>
                                </button>
                                <button className="flex-1 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition flex items-center justify-center gap-2">
                                    GitHub Repo <span className="material-symbols-outlined text-sm">code</span>
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}

                {/* 2. HIRE ME MODAL */}
                {isHireModalOpen && (
                    <Modal onClose={() => setIsHireModalOpen(false)} title="Let's Work Together">
                        <ContactForm
                            onSubmit={(data) => {
                                handleShowToast(`Thanks ${data.name}! I'll reply soon.`, 'success');
                                setIsHireModalOpen(false);
                            }}
                            isModal
                        />
                    </Modal>
                )}

                {/* --- TOAST NOTIFICATION --- */}
                <div className={`fixed bottom-8 right-8 z-[100] transition-all duration-300 transform ${toast.show ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="bg-white dark:bg-[#1e1e20] border border-gray-200 dark:border-white/10 shadow-2xl rounded-xl p-4 flex items-center gap-3 pr-6">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center ${toast.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                            <span className="material-symbols-outlined text-lg">{toast.type === 'success' ? 'check' : 'info'}</span>
                        </span>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{toast.message}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

/* --- SUB-COMPONENTS --- */

const SidebarLink = ({ icon, label, active = false, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${active
                ? 'bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5'
            }`}
    >
        <span className={`material-symbols-outlined transition-transform group-hover:scale-110 ${active ? 'text-black dark:text-white' : ''}`} style={{ fontSize: '18px' }}>{icon}</span>
        {label}
    </button>
);

const StatsCard = ({ value, label, color, icon }) => (
    <div className="bg-white dark:bg-[#1e1e20] border border-gray-200 dark:border-white/5 p-5 rounded-2xl flex justify-between items-start hover:border-gray-300 dark:hover:border-white/20 transition-colors group">
        <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
            <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${color}`}></span>
                <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            </div>
        </div>
        <button className="w-8 h-8 rounded-lg border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-white/5 transition group-hover:scale-105">
            <span className="material-symbols-outlined text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" style={{ fontSize: '18px' }}>{icon}</span>
        </button>
    </div>
);

const ProjectCard = ({ project, onClick }) => (
    <div
        onClick={onClick}
        className="bg-white dark:bg-[#1e1e20] border border-gray-200 dark:border-white/5 p-5 rounded-2xl flex flex-col justify-between h-64 cursor-pointer hover:shadow-xl hover:border-gray-300 dark:hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group"
    >
        <div>
            <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-gray-900 dark:text-white text-base truncate pr-2 group-hover:text-blue-500 transition-colors">{project.title}</h4>
                <span className="material-symbols-outlined text-gray-400 text-sm group-hover:text-blue-500">open_in_full</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400 mb-3">
                <span className="material-symbols-outlined" style={{ fontSize: '12px' }}>{project.categoryIcon}</span>
                {project.category}
            </div>
            <div className="mb-3">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${project.tagColor}`}>
                    <span className="material-symbols-outlined" style={{ fontSize: '10px' }}>{project.tagIcon}</span> {project.tag}
                </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3">
                {project.shortDesc}
            </p>
        </div>
        <div className="mt-4">
            <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-gray-500 dark:text-gray-400">Completion</span>
                <span className="text-gray-900 dark:text-white font-medium">{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-white/10 rounded-full h-1 overflow-hidden">
                <div className={`${project.progressColor} h-1 rounded-full transition-all duration-1000 ease-out`} style={{ width: `${project.progress}%` }}></div>
            </div>
        </div>
    </div>
);

const ContactForm = ({ onSubmit, isModal = false }) => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API Call
        setTimeout(() => {
            setLoading(false);
            onSubmit(formData);
            setFormData({ name: '', email: '', message: '' });
        }, 1500);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/20 transition-all"
                    placeholder="John Doe"
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/20 transition-all"
                    placeholder="john@example.com"
                />
            </div>
            <div>
                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                <textarea
                    required
                    rows={isModal ? 3 : 5}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white/20 transition-all resize-none"
                    placeholder="Tell me about your project..."
                />
            </div>
            <button
                disabled={loading}
                type="submit"
                className="w-full bg-black dark:bg-white text-white dark:text-black font-bold py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
                {loading ? (
                    <>
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                        Sending...
                    </>
                ) : (
                    <>Send Message <span className="material-symbols-outlined text-sm">send</span></>
                )}
            </button>
        </form>
    );
};

const Modal = ({ children, onClose, title }) => (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in" onClick={onClose}></div>
        <div className="relative bg-white dark:bg-[#18181b] w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden animate-scale-up">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-white/5">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate pr-4">{title}</h3>
                <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition">
                    <span className="material-symbols-outlined text-gray-500">close</span>
                </button>
            </div>
            <div className="p-5 overflow-y-auto max-h-[70vh] custom-scroll">
                {children}
            </div>
        </div>
    </div>
);

export default App;