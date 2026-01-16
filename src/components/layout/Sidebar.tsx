import { usePortfolioStore } from "@/store/usePortfolioStore";
import { SidebarLink } from "@/components/features/SidebarLink";
import { cn } from "@/lib/utils";

interface SidebarProps {
    className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
    const { activeView, setActiveView } = usePortfolioStore();

    return (
        <div className={cn("bg-gray-50 dark:bg-[#0f0f10] border-r border-gray-200 dark:border-white/5 flex flex-col p-4", className)}>
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
    );
};
