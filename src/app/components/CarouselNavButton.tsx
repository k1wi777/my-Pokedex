import Image from "next/image";

interface CarouselNavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}

export default function CarouselNavButton({
  direction,
  onClick,
  ariaLabel,
  className = "",
}: CarouselNavButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={`
        absolute top-1/2 z-10 -translate-y-1/2
        rounded-full bg-black/40 p-3 sm:p-4
        opacity-70 transition hover:opacity-100
        ${direction === "prev" ? "left-2" : "right-2"}
        ${className}
      `}
    >
      <Image
        src="/arrow.png"
        alt=""
        width={24}
        height={24}
        className={`w-15 invert ${direction === "prev" ? "rotate-180" : ""}`}
      />
    </button>
  );
}
