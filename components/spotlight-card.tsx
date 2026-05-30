"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const accentColors = [
  "from-blue-500/40 to-blue-600/40",
  "from-teal-400/40 to-teal-500/40",
  "from-amber-400/40 to-amber-500/40",
  "from-rose-400/40 to-rose-500/40",
  "from-violet-400/40 to-violet-500/40",
  "from-cyan-400/40 to-cyan-500/40",
  "from-emerald-400/40 to-emerald-500/40",
];

const borderColors = [
  "border-blue-500/20 group-hover:border-blue-500/40",
  "border-teal-400/20 group-hover:border-teal-400/40",
  "border-amber-400/20 group-hover:border-amber-400/40",
  "border-rose-400/20 group-hover:border-rose-400/40",
  "border-violet-400/20 group-hover:border-violet-400/40",
  "border-cyan-400/20 group-hover:border-cyan-400/40",
  "border-emerald-400/20 group-hover:border-emerald-400/40",
];

interface SpotlightCardProps {
  title: string;
  description: string;
  mediaSrc: string;
  mediaType: string;
  href: string;
  index?: number;
}

export const SpotlightCard = ({ title, description, mediaSrc, mediaType, href, index = 0 }: SpotlightCardProps) => {
  const { theme } = useTheme();
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const accent = accentColors[index % accentColors.length];
  const borderAccent = borderColors[index % borderColors.length];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onClick={() => window.open(href, "_blank")}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          window.open(href, "_blank");
        }
      }}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      role="link"
      tabIndex={0}
      aria-label={`View ${title} project`}
      className={cn(
        "group relative flex cursor-pointer flex-col justify-start overflow-hidden rounded-xl border bg-background/60 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        borderAccent
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${
            theme !== "dark" ? "hsla(223,94%,66%,.08)" : "hsla(223,94%,66%,.12)"
          }, transparent 40%)`,
        }}
      />

      {/* Accent strip */}
      <div className={cn("absolute inset-x-0 top-0 h-1 bg-gradient-to-r", accent)} />

      <div className="p-4 pb-0">
        <div className="overflow-hidden rounded-lg shadow-sm">
          <AspectRatio ratio={16 / 9}>
            {mediaType === "video" ? (
              <video autoPlay loop muted playsInline className="m-0 h-full w-full object-cover p-0 transition-transform duration-500 group-hover:scale-105">
                <source src="/project-garden.webm" type="video/webm" />
                <source src="/project-garden.mp4" type="video/mp4" />
              </video>
            ) : (
              <Image
                src={mediaSrc}
                alt={title}
                width={960}
                height={540}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="m-0 h-full w-full object-cover p-0 transition-transform duration-500 group-hover:scale-105"
              />
            )}
          </AspectRatio>
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-3 p-4">
        <div>
          <h2 className="line-clamp-1 font-semibold tracking-tight text-foreground">{title}</h2>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-1 text-xs font-medium text-muted-foreground transition-colors group-hover:text-accent-foreground">
          <span>View on GitHub</span>
          <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </div>
  );
};
