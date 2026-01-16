"use client";

import { useEffect, useId, useRef } from "react";
import type { ReactNode } from "react";

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
    title: string;
}

export const Modal = ({ children, onClose, title }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement | null>(null);
    const titleId = useId();

    useEffect(() => {
        const previousActiveElement = document.activeElement as HTMLElement | null;
        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const getFocusableElements = () => {
            const root = modalRef.current;
            if (!root) {
                return [];
            }
            return Array.from(
                root.querySelectorAll<HTMLElement>(
                    'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
                )
            );
        };

        const focusFirstElement = () => {
            const focusable = getFocusableElements();
            if (focusable.length > 0) {
                focusable[0].focus();
                return;
            }
            modalRef.current?.focus();
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                event.preventDefault();
                onClose();
                return;
            }

            if (event.key !== "Tab") {
                return;
            }

            const focusable = getFocusableElements();
            if (focusable.length === 0) {
                event.preventDefault();
                modalRef.current?.focus();
                return;
            }

            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            const active = document.activeElement as HTMLElement | null;

            if (event.shiftKey) {
                if (!active || active === first) {
                    event.preventDefault();
                    last.focus();
                }
                return;
            }

            if (active === last) {
                event.preventDefault();
                first.focus();
            }
        };

        const focusTimer = window.setTimeout(focusFirstElement, 0);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.clearTimeout(focusTimer);
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = originalOverflow;
            previousActiveElement?.focus();
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="presentation">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
                onClick={onClose}
                aria-hidden="true"
            ></div>
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                className="relative bg-white dark:bg-[#18181b] w-full max-w-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden animate-scale-up"
            >
                <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-white/5">
                    <h3 id={titleId} className="text-lg font-bold text-gray-900 dark:text-white truncate pr-4">{title}</h3>
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
};
