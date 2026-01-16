import { usePortfolioStore } from "@/store/usePortfolioStore";

export const Navbar = () => {
    const { activeView, setActiveView, isDarkMode, toggleTheme, setHireModalOpen } = usePortfolioStore();

    return (
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
                    <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition">
                        <span className="material-symbols-outlined text-lg">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
                    </button>
                    <button
                        onClick={() => setHireModalOpen(true)}
                        className="bg-white text-black font-semibold px-5 py-2.5 rounded-xl hover:bg-gray-200 hover:scale-105 active:scale-95 transition-all shadow-md text-sm border border-transparent dark:border-none ring-1 ring-black/5 dark:ring-0"
                    >
                        Hire Me
                    </button>
                </div>
            </div>
        </nav>
    );
};
