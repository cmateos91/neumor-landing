interface NeumorfButtonProps {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
}

export function NeumorfButton({
  children,
  className = "",
  type = "button",
  disabled = false,
}: NeumorfButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        rounded-full px-6 py-2.5
        text-sm md:text-base font-medium
        bg-[#F2F3F7] text-[#1A1A1A]
        dark:bg-[#151C23] dark:text-[#E5E7EB]
        shadow-[8px_8px_18px_rgba(209,213,219,0.9),-8px_-8px_18px_rgba(255,255,255,0.9)]
        hover:shadow-[5px_5px_14px_rgba(209,213,219,0.9),-5px_-5px_14px_rgba(255,255,255,0.9)]
        dark:shadow-[8px_8px_18px_rgba(2,6,23,0.9),-8px_-8px_18px_rgba(31,41,55,0.9)]
        dark:hover:shadow-[5px_5px_14px_rgba(2,6,23,0.9),-5px_-5px_14px_rgba(31,41,55,0.9)]
        active:shadow-inner dark:active:shadow-inner
        transition-all duration-150
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {children}
    </button>
  );
}
