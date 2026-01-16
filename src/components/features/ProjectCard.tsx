import { Project } from "@/lib/types";
import { motion } from "framer-motion";

interface ProjectCardProps {
    project: Project;
    onClick: () => void;
}

export const ProjectCard = ({ project, onClick }: ProjectCardProps) => (
    <motion.div
        whileHover={{ y: -5 }}
        onClick={onClick}
        className="bg-white dark:bg-[#1e1e20] border border-gray-200 dark:border-white/5 p-5 rounded-2xl flex flex-col justify-between h-64 cursor-pointer hover:shadow-xl hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 group"
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
    </motion.div>
);
