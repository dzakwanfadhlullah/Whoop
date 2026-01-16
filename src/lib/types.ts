export interface Project {
    id: number;
    title: string;
    category: string;
    categoryIcon: string;
    tag: string;
    tagIcon: string;
    tagColor: string;
    shortDesc: string;
    longDesc: string;
    progress: number;
    progressColor: string;
    techStack: string[];
    demoUrl?: string;
    repoUrl?: string;
}

export interface Stat {
    label: string;
    value: string;
    color: string;
    icon: string;
}

export interface ToastState {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
}
