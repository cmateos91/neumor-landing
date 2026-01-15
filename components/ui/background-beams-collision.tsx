"use client";
import React, { useRef, useState, useEffect, useId, forwardRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface BeamOptions {
  initialX?: number;
  translateX?: number;
  initialY?: number;
  translateY?: number;
  rotate?: number;
  duration?: number;
  delay?: number;
  repeatDelay?: number;
  className?: string;
}

export const BackgroundBeamsWithCollision = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const parentRef = useRef<HTMLDivElement>(null);
  const [modalRect, setModalRect] = useState<DOMRect | null>(null);

  // Buscar el modal dentro de los children y obtener su posición
  useEffect(() => {
    const findModal = () => {
      if (!parentRef.current) return;

      // Buscar el elemento con data-collision-target o la card del modal
      const modal = parentRef.current.querySelector('[data-collision-target]') ||
                    parentRef.current.querySelector('.rounded-\\[24px\\]') ||
                    parentRef.current.querySelector('.rounded-\\[40px\\]');

      if (modal) {
        setModalRect(modal.getBoundingClientRect());
      }
    };

    findModal();
    window.addEventListener('resize', findModal);

    // Observar cambios en el DOM
    const observer = new MutationObserver(findModal);
    if (parentRef.current) {
      observer.observe(parentRef.current, { childList: true, subtree: true });
    }

    return () => {
      window.removeEventListener('resize', findModal);
      observer.disconnect();
    };
  }, []);

  const beams: BeamOptions[] = [
    { initialX: 10, translateX: 10, initialY: -200, translateY: 1800, duration: 12, repeatDelay: 4, delay: 2 },
    { initialX: 600, translateX: 600, initialY: -200, translateY: 1800, duration: 8, repeatDelay: 4, delay: 4 },
    { initialX: 100, translateX: 100, initialY: -200, translateY: 1800, duration: 14, repeatDelay: 8, className: "h-6" },
    { initialX: 400, translateX: 400, initialY: -200, translateY: 1800, duration: 10, repeatDelay: 15, delay: 4 },
    { initialX: 800, translateX: 800, initialY: -200, translateY: 1800, duration: 16, repeatDelay: 3, className: "h-20" },
    { initialX: 1000, translateX: 1000, initialY: -200, translateY: 1800, duration: 9, repeatDelay: 3, className: "h-12" },
    { initialX: 1200, translateX: 1200, initialY: -200, translateY: 1800, duration: 11, repeatDelay: 5, delay: 2, className: "h-6" },
    { initialX: 200, translateX: 200, initialY: -200, translateY: 1800, duration: 13, repeatDelay: 6 },
    { initialX: 300, translateX: 300, initialY: -200, translateY: 1800, duration: 15, repeatDelay: 4, delay: 1 },
    { initialX: 500, translateX: 500, initialY: -200, translateY: 1800, duration: 11, repeatDelay: 7, className: "h-8" },
    { initialX: 700, translateX: 700, initialY: -200, translateY: 1800, duration: 10, repeatDelay: 5, delay: 3 },
    { initialX: 900, translateX: 900, initialY: -200, translateY: 1800, duration: 12, repeatDelay: 6, className: "h-10" },
    { initialX: 1100, translateX: 1100, initialY: -200, translateY: 1800, duration: 14, repeatDelay: 4, delay: 2 },
    { initialX: 1300, translateX: 1300, initialY: -200, translateY: 1800, duration: 9, repeatDelay: 8, className: "h-14" },
    { initialX: 150, translateX: 150, initialY: -200, translateY: 1800, duration: 16, repeatDelay: 5, delay: 1 },
    { initialX: 450, translateX: 450, initialY: -200, translateY: 1800, duration: 11, repeatDelay: 6, className: "h-6" },
    { initialX: 650, translateX: 650, initialY: -200, translateY: 1800, duration: 13, repeatDelay: 7, delay: 2 },
    { initialX: 850, translateX: 850, initialY: -200, translateY: 1800, duration: 10, repeatDelay: 4 },
    { initialX: 1050, translateX: 1050, initialY: -200, translateY: 1800, duration: 14, repeatDelay: 5, className: "h-16" },
    { initialX: 1250, translateX: 1250, initialY: -200, translateY: 1800, duration: 11, repeatDelay: 6, delay: 3 },
  ];

  return (
    <div
      ref={parentRef}
      className={cn(
        "relative flex h-full w-full items-center justify-center overflow-hidden",
        className
      )}
    >
      {beams.map((beam, index) => (
        <CollisionMechanism
          key={`beam-${index}`}
          beamOptions={beam}
          modalRect={modalRect}
          parentRef={parentRef}
        />
      ))}
      {children}
    </div>
  );
};

const CollisionMechanism = forwardRef<
  HTMLDivElement,
  {
    beamOptions: BeamOptions;
    modalRect: DOMRect | null;
    parentRef: React.RefObject<HTMLDivElement | null>;
  }
>(({ beamOptions, modalRect, parentRef }, ref) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const [collision, setCollision] = useState<{
    detected: boolean;
    coordinates: { x: number; y: number } | null;
  }>({
    detected: false,
    coordinates: null,
  });
  const [beamKey, setBeamKey] = useState(0);
  const [cycleCollisionDetected, setCycleCollisionDetected] = useState(false);

  useEffect(() => {
    const checkCollision = () => {
      if (
        beamRef.current &&
        parentRef.current &&
        modalRect &&
        !cycleCollisionDetected
      ) {
        const beamRect = beamRef.current.getBoundingClientRect();
        const parentRect = parentRef.current.getBoundingClientRect();

        // Verificar si el rayo está dentro del ancho del modal
        const beamCenterX = beamRect.left + beamRect.width / 2;
        const isWithinModalWidth = beamCenterX >= modalRect.left && beamCenterX <= modalRect.right;

        // Si está dentro del modal, colisionar en el borde superior del modal
        // Si no, colisionar en el borde inferior de la pantalla
        const collisionY = isWithinModalWidth ? modalRect.top : parentRect.bottom;

        if (beamRect.bottom >= collisionY) {
          const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = collisionY - parentRect.top;

          setCollision({
            detected: true,
            coordinates: { x: relativeX, y: relativeY },
          });
          setCycleCollisionDetected(true);
        }
      }
    };

    const animationInterval = setInterval(checkCollision, 50);
    return () => clearInterval(animationInterval);
  }, [cycleCollisionDetected, modalRect, parentRef]);

  useEffect(() => {
    if (collision.detected && collision.coordinates) {
      setTimeout(() => {
        setCollision({ detected: false, coordinates: null });
        setCycleCollisionDetected(false);
      }, 2000);

      setTimeout(() => {
        setBeamKey((prev) => prev + 1);
      }, 2000);
    }
  }, [collision]);

  return (
    <>
      <motion.div
        key={beamKey}
        ref={beamRef}
        initial={{
          translateY: beamOptions.initialY || "-200px",
          translateX: beamOptions.initialX || "0px",
          rotate: beamOptions.rotate || 0,
        }}
        animate={{
          translateY: beamOptions.translateY || "1800px",
          translateX: beamOptions.translateX || "0px",
          rotate: beamOptions.rotate || 0,
        }}
        transition={{
          duration: beamOptions.duration || 8,
          repeat: Infinity,
          repeatType: "loop",
          ease: [0.25, 0.1, 0.25, 1],
          delay: beamOptions.delay || 0,
          repeatDelay: beamOptions.repeatDelay || 0,
        }}
        className={cn(
          "absolute left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-amber-500 via-yellow-400 to-transparent z-10",
          beamOptions.className
        )}
      />
      <AnimatePresence>
        {collision.detected && collision.coordinates && (
          <Explosion
            key={`explosion-${beamKey}`}
            style={{
              left: `${collision.coordinates.x}px`,
              top: `${collision.coordinates.y}px`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
});

CollisionMechanism.displayName = "CollisionMechanism";

const Explosion = ({ style }: { style: React.CSSProperties }) => {
  const particles = 20;
  const id = useId();

  return (
    <div className="absolute z-50 pointer-events-none" style={style}>
      {Array.from({ length: particles }).map((_, i) => {
        const angle = (i / particles) * 360;
        const velocity = 50 + Math.random() * 50;
        const size = 2 + Math.random() * 4;

        return (
          <motion.span
            key={`${id}-${i}`}
            initial={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0
            }}
            animate={{
              opacity: 0,
              scale: 0,
              x: Math.cos(angle * Math.PI / 180) * velocity,
              y: Math.sin(angle * Math.PI / 180) * velocity
            }}
            transition={{
              duration: 1 + Math.random() * 0.5,
              ease: "easeOut"
            }}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: `linear-gradient(to right, #f59e0b, #fbbf24)`,
              boxShadow: `0 0 ${size * 2}px #f59e0b`,
            }}
          />
        );
      })}
      {/* Central flash */}
      <motion.div
        initial={{ opacity: 1, scale: 0 }}
        animate={{ opacity: 0, scale: 3 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 20,
          height: 20,
          background: "radial-gradient(circle, rgba(251,191,36,0.8) 0%, rgba(245,158,11,0.4) 50%, transparent 70%)",
        }}
      />
    </div>
  );
};
