"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

import { AspectRatio } from "@/components/ui/aspect-ratio";

interface SpotlightCardProps {
  title: string;
  description: string;
  mediaSrc: string;
  mediaType: string;
  href: string;
}

export const SpotlightCard = ({ title, description, mediaSrc, mediaType, href }: SpotlightCardProps) => {
  const { theme } = useTheme();
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

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
      className="group relative flex cursor-pointer flex-col justify-start overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md"
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

      <div className="overflow-hidden">
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
              sizes="(max-width: 768px) 100vw, 50vw"
              className="m-0 h-full w-full object-cover p-0 transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </AspectRatio>
      </div>
      <div className="p-5">
        <h2 className="mb-1.5 line-clamp-1 font-semibold tracking-tight text-foreground">{title}</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
