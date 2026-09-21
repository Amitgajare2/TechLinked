"use client";

import { useEffect } from "react";
import { AlertTriangle, X, Loader2 } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  loadingLabel?: string;
  onConfirm: () => any;
  onClose: () => void;
  isLoading?: boolean;
  variant?: "danger" | "default";
}

export default function ConfirmModal({
  isOpen,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  loadingLabel = "Please wait…",
  onConfirm,
  onClose,
  isLoading = false,
  variant = "danger",
}: ConfirmModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isLoading) onClose();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, isLoading, onClose]);

  if (!isOpen) return null;

  const isDanger = variant === "danger";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--app-overlay)] px-4"
      onClick={() => !isLoading && onClose()}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-[var(--app-border-strong)] bg-[var(--app-surface)] p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-full ${
              isDanger
                ? "bg-[var(--app-danger)]/10 text-[var(--app-danger)]"
                : "bg-[var(--app-primary-soft)] text-[var(--app-primary)]"
            }`}
          >
            <AlertTriangle size={20} />
          </div>
          <button
            onClick={onClose}
            disabled={isLoading}
            className="text-[var(--app-text-muted)] transition-colors hover:text-[var(--app-text-primary)] disabled:opacity-40"
          >
            <X size={18} />
          </button>
        </div>

        <h2 className="mt-4 text-base font-semibold text-[var(--app-text-primary)]">{title}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-[var(--app-text-secondary)]">{description}</p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="rounded-full bg-[var(--app-surface-2)] px-4 py-2 text-sm font-medium text-[var(--app-text-primary)] transition-colors hover:bg-[var(--app-surface-hover)] disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-colors disabled:opacity-60 ${
              isDanger ? "bg-[var(--app-danger)] hover:brightness-110" : "bg-[var(--app-primary)] hover:brightness-110"
            }`}
          >
            {isLoading && <Loader2 size={14} className="animate-spin" />}
            {isLoading ? loadingLabel : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}