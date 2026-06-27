import type { ReactNode } from "react";

interface SectionHeadingProps {
  children: ReactNode;
  subtitle?: string;
}

export function SectionHeading({ children, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-5 border-b border-white/10 pb-3">
      <h2 className="text-lg font-bold tracking-tight text-white sm:text-xl">
        {children}
      </h2>
      {subtitle && (
        <p className="mt-1 text-sm text-stone-400">{subtitle}</p>
      )}
    </div>
  );
}

export function SubSectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mb-4 border-l-2 border-orange-500 pl-3 text-base font-bold text-white sm:text-lg">
      {children}
    </h3>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  valueClassName?: string;
}

export function InfoRow({ label, value, valueClassName = "" }: InfoRowProps) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/8 py-2.5 text-sm last:border-0">
      <span className="text-stone-400">{label}</span>
      <span className={`text-right font-medium text-white ${valueClassName}`}>
        {value}
      </span>
    </div>
  );
}

interface TagProps {
  children: ReactNode;
}

export function Tag({ children }: TagProps) {
  return (
    <span className="rounded-md bg-white/8 px-2.5 py-1 text-xs font-medium text-stone-300">
      {children}
    </span>
  );
}
