import { Stat } from "@/lib/types";

export const StatsCard = ({ value, label, color, icon }: Stat) => (
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
