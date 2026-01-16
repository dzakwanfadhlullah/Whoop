interface SidebarLinkProps {
    icon: string;
    label: string;
    active?: boolean;
    onClick: () => void;
}

export const SidebarLink = ({ icon, label, active = false, onClick }: SidebarLinkProps) => (
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
