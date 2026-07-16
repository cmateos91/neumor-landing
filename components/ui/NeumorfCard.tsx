import { ReactNode } from "react";

interface NeumorfCardProps {
  children: ReactNode;
  className?: string;
}

export function NeumorfCard({ children, className = "" }: NeumorfCardProps) {
  return (
    <div
      className={`
        ng-card
        p-6 md:p-8
        ${className}
      `}
    >
      {children}
    </div>
  );
}
