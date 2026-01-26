interface NeumorfButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void; // ⬅️ AÑADIDO
}

export function NeumorfButton({
  children,
  className = "",
  type = "button",
  disabled = false,
  onClick,
}: NeumorfButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        inline-flex items-center justify-center
        rounded-full px-6 py-3
        text-sm md:text-base font-medium
        bg-gradient-to-br from-slate-100 to-slate-50 text-slate-700
        dark:from-slate-800 dark:to-slate-900 dark:text-slate-200
        border border-white/60 dark:border-white/5
        shadow-[6px_6px_16px_rgba(180,180,180,0.4),-6px_-6px_16px_rgba(255,255,255,0.95),inset_0_1px_0_rgba(255,255,255,0.8)]
        hover:shadow-[4px_4px_12px_rgba(180,180,180,0.35),-4px_-4px_12px_rgba(255,255,255,0.98),inset_0_1px_0_rgba(255,255,255,0.9)]
        hover:-translate-y-0.5
        dark:shadow-[6px_6px_16px_rgba(0,0,0,0.5),-6px_-6px_16px_rgba(50,60,75,0.15),inset_0_1px_0_rgba(255,255,255,0.05)]
        dark:hover:shadow-[4px_4px_12px_rgba(0,0,0,0.55),-4px_-4px_12px_rgba(50,60,75,0.2),inset_0_1px_0_rgba(255,255,255,0.08)]
        active:translate-y-0 active:shadow-[inset_3px_3px_8px_rgba(180,180,180,0.3),inset_-3px_-3px_8px_rgba(255,255,255,0.5)]
        dark:active:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.4),inset_-3px_-3px_8px_rgba(50,60,75,0.1)]
        transition-all duration-200 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
        ${className}
      `}
    >
      {children}
    </button>
  );
}
