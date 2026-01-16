import { usePortfolioStore } from "@/store/usePortfolioStore";
import { PORTFOLIO_DATA } from "@/lib/data";
import { StatsCard } from "@/components/features/StatsCard";
import { ProjectCard } from "@/components/features/ProjectCard";
import { ContactForm } from "@/components/features/ContactForm";
import { cn } from "@/lib/utils";

interface DashboardProps {
    className?: string;
}

export const Dashboard = ({ className }: DashboardProps) => {
    const {
        activeView,
        setActiveView,
        searchQuery,
        setSearchQuery,
        setSelectedProject,
        showToast,
        setHireModalOpen
    } = usePortfolioStore();

    // Filter Logic
    const filteredProjects = PORTFOLIO_DATA.projects.filter(project => {
        const query = searchQuery.toLowerCase();
        return (
            project.title.toLowerCase().includes(query) ||
            project.tag.toLowerCase().includes(query) ||
            project.category.toLowerCase().includes(query)
        );
    });

    return (
        <div className={cn("col-span-1 md:col-span-10 p-6 md:p-8 bg-gray-100 dark:bg-[#121212] relative overflow-y-auto custom-scroll max-h-[800px]", className)}>

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
                            onClick={() => showToast("Create Project feature is coming soon!", "info")}
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

                    <ContactForm onSubmit={(data) => showToast(`Message sent from ${data.name}!`, 'success')} />
                </div>
            )}
        </div>
    );
};
