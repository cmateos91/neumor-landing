import { ReactNode } from "react";

interface NeumorfSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export function NeumorfSection({
  children,
  className = "",
  id,
}: NeumorfSectionProps) {
  return (
    <section
      id={id}
      className={`
        w-full max-w-5xl mx-auto
        px-4 md:px-6
        py-10 md:py-16
        ${className}
      `}
    >
      {children}
    </section>
  );
}
