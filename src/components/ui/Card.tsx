import { cn } from "@/lib/utils";

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Card = ({ children, className, onClick }: CardProps) => {
    return (
        <div
            onClick={onClick}
            className={cn("bg-white dark:bg-[#1e1e20] border border-gray-200 dark:border-white/5 rounded-2xl", className)}
        >
            {children}
        </div>
    );
};
