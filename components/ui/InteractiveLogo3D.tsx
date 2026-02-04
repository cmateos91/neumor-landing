 "use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LogoVector } from "./LogoVector";

export function InteractiveLogo3D() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [isInteractive, setIsInteractive] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const update = () => setIsInteractive(!mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isInteractive) return;
    const scene = sceneRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;
    if (!scene || !content) return;

    const logoRange = 15;
    const overlayRange = 25;
    const clamp = (value: number) => Math.max(-0.5, Math.min(0.5, value));

    const reset = () => {
      gsap.to(content, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
      });
      if (overlay) {
        gsap.to(overlay, {
          x: 0,
          y: 0,
          opacity: 0.25,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      const rect = scene.getBoundingClientRect();
      const normalizedX = clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2);
      const normalizedY = clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2);

      const translateX = normalizedX * logoRange;
      const translateY = normalizedY * logoRange;

      gsap.to(content, {
        x: translateX,
        y: translateY,
        duration: 0.7,
        ease: "power3.out",
      });

      if (overlay) {
        gsap.to(overlay, {
          x: normalizedX * overlayRange,
          y: normalizedY * overlayRange,
          opacity: 0.4,
          duration: 0.7,
          ease: "power3.out",
        });
      }
    };

    scene.addEventListener("pointermove", handlePointerMove);
    scene.addEventListener("pointerleave", reset);

    return () => {
      scene.removeEventListener("pointermove", handlePointerMove);
      scene.removeEventListener("pointerleave", reset);
      reset();
    };
  }, [isInteractive]);

  // Tilt global porque el SVG original no tiene capas internas; la ilusión viene de perspectiva + brillo dinámico.
  return (
    <div
      ref={sceneRef}
      className="mt-10 w-full max-w-[520px] mx-auto"
      style={{
        touchAction: "none",
      }}
    >
      <div
        ref={contentRef}
        className="relative"
        style={{
          transformOrigin: "center center",
        }}
      >
        <LogoVector className="w-full h-auto block" />
        <div
          ref={overlayRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(120deg, rgba(255,255,255,0.8), rgba(255,255,255,0) 70%)",
            mixBlendMode: "screen",
            opacity: isInteractive ? 0.3 : 0,
          }}
        />
      </div>
    </div>
  );
}
