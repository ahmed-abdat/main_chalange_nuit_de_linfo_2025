"use client";

import { useCallback, useEffect, useRef, RefObject } from "react";

export function useMousePositionRef(containerRef?: RefObject<HTMLElement | null>) {
  const positionRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        positionRef.current = { x, y };
      } else {
        positionRef.current = {
          x: event.clientX - window.innerWidth / 2,
          y: event.clientY - window.innerHeight / 2,
        };
      }
    },
    [containerRef]
  );

  useEffect(() => {
    const target = containerRef?.current || window;
    target.addEventListener("mousemove", handleMouseMove as EventListener);
    return () => {
      target.removeEventListener("mousemove", handleMouseMove as EventListener);
    };
  }, [containerRef, handleMouseMove]);

  return positionRef;
}
