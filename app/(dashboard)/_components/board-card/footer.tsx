import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

interface FooterProps {
  title: string;
  authorLabel: string;
  createdAtLabel: string;
  isFavorite: boolean;
  onClick: () => void;
  disabled: boolean;
}

export const Footer = ({
  title,
  authorLabel,
  createdAtLabel,
  isFavorite,
  onClick,
  disabled,
}: FooterProps) => {
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    onClick();
  };

  return (
    <div className="relative bg-white dark:bg-zinc-900 p-4 border-t border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
      <div className="flex flex-col gap-y-1 pr-8">
        <p className="font-semibold text-[14px] leading-tight truncate text-zinc-800 dark:text-zinc-100">
          {title}
        </p>
        <p className="text-[12px] text-zinc-500 dark:text-zinc-400 truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {authorLabel}, {createdAtLabel}
        </p>
      </div>

      <button
        disabled={disabled}
        onClick={handleClick}
        className={cn(
          "absolute top-4 right-4 text-zinc-400 hover:text-blue-600 dark:hover:text-blue-500 transition-all duration-300 opacity-0 group-hover:opacity-100 z-10",
          disabled && "cursor-not-allowed opacity-50",
          isFavorite && "opacity-100",
        )}
      >
        <Star
          className={cn(
            "h-[18px] w-[18px]",
            isFavorite &&
              "fill-blue-600 text-blue-600 dark:fill-blue-500 dark:text-blue-500 drop-shadow-sm",
          )}
        />
      </button>
    </div>
  );
};
