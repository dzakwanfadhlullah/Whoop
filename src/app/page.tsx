"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Dashboard } from "@/components/features/Dashboard";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { Modal } from "@/components/ui/Modal";
import { ContactForm } from "@/components/features/ContactForm";

export default function Home() {
  const {
    isDarkMode,
    selectedProject,
    setSelectedProject,
    isHireModalOpen,
    setHireModalOpen,
    toast,
    showToast,
    setActiveView
  } = usePortfolioStore();

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
    <div className={`${isDarkMode ? 'dark' : ''} min-h-screen selection:bg-gray-200 selection:text-black`}>
      <div className="bg-[#f3f4f6] dark:bg-[#050505] text-gray-900 dark:text-gray-100 transition-colors duration-300 min-h-screen overflow-x-hidden relative">

        {/* Glow Effects */}
        <div className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0 hidden dark:block" style={glowTopRightStyle}></div>
        <div className="absolute rounded-full pointer-events-none z-0 hidden dark:block" style={glowCenterStyle}></div>

        <Navbar />

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
              <button
                onClick={() => setActiveView('projects')}
                className="bg-white text-black font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-200 transition-colors shadow-lg text-base w-full sm:w-auto border border-transparent dark:border-none ring-1 ring-black/5 dark:ring-0"
              >
                View Projects
              </button>
              <a
                href="/cv.pdf"
                download
                className="bg-transparent border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white font-medium px-8 py-3.5 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-base w-full sm:w-auto text-center"
              >
                Download CV
              </a>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full pointer-events-none opacity-20 dark:opacity-10 -z-10">
              <div className="w-full h-full border border-gray-400 dark:border-white rounded-[50%] transform scale-y-50"></div>
            </div>
          </div>

          {/* DASHBOARD INTERFACE (Dynamic Content) */}
          <div className="w-full max-w-6xl relative perspective-1000 mt-12 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-white/5 dark:to-white/5 blur-3xl -z-10 rounded-full opacity-50"></div>

            <div className="bg-white dark:bg-[#18181b] rounded-3xl border border-gray-200 dark:border-white/10 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[600px] transition-all">

              <Sidebar className="hidden md:flex md:col-span-2" />
              <Dashboard />

            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f3f4f6] dark:from-[#050505] to-transparent z-20 pointer-events-none"></div>
        </main>

        <div className="h-20"></div>

        {/* --- MODALS --- */}
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
                {selectedProject.demoUrl ? (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-black dark:bg-white text-white dark:text-black py-3 rounded-xl font-bold text-sm hover:opacity-90 transition flex items-center justify-center gap-2"
                  >
                    View Live Demo <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="flex-1 bg-black/70 dark:bg-white/60 text-white/80 dark:text-black/80 py-3 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    View Live Demo <span className="material-symbols-outlined text-sm">open_in_new</span>
                  </button>
                )}
                {selectedProject.repoUrl ? (
                  <a
                    href={selectedProject.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white py-3 rounded-xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-white/5 transition flex items-center justify-center gap-2"
                  >
                    GitHub Repo <span className="material-symbols-outlined text-sm">code</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="flex-1 border border-gray-200/60 dark:border-white/10 text-gray-900/70 dark:text-white/70 py-3 rounded-xl font-bold text-sm transition flex items-center justify-center gap-2 cursor-not-allowed"
                  >
                    GitHub Repo <span className="material-symbols-outlined text-sm">code</span>
                  </button>
                )}
              </div>
            </div>
          </Modal>
        )}

        {isHireModalOpen && (
          <Modal onClose={() => setHireModalOpen(false)} title="Let's Work Together">
            <ContactForm
              onSubmit={(data) => {
                showToast(`Thanks ${data.name}! I'll reply soon.`, 'success');
                setHireModalOpen(false);
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
}
