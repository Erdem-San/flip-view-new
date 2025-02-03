import { useEffect, useRef, useState } from "react";

type Direction = "forward" | "backward" | "center";
type AnimationRef = number | null;

const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

interface CompareSliderAnimation {
  position: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

const useCompareSliderAnimation = (enableAnimation: boolean, animationLoop: boolean, animationSpeed: number): CompareSliderAnimation => {
  const [position, setPosition] = useState<number>(50);
  const [direction, setDirection] = useState<Direction>("forward");
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);
  const animateSlider = useRef<AnimationRef>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const startTimeRef = useRef<number | null>(null);
  const previousPosition = useRef<number>(50);

  const updatePosition = (timestamp: number): void => {
    if (!startTimeRef.current) {
      startTimeRef.current = timestamp;
      previousPosition.current = position;
    }
    
    const progress = timestamp - startTimeRef.current;
    const duration = animationSpeed;

    if (progress < duration) {
      const t = progress / duration;
      const easedT = easeInOutCubic(t);

      const targetPosition = (() => {
        switch(direction) {
          case "forward":
            return 90;
          case "backward":
            return 10;
          case "center":
            return 50;
        }
      })();

      // Yumuşak geçiş için mevcut pozisyondan hedef pozisyona doğru interpolasyon
      const newPosition = previousPosition.current + (targetPosition - previousPosition.current) * easedT;
      setPosition(newPosition);

      animateSlider.current = requestAnimationFrame(updatePosition);
    } else {
      previousPosition.current = position;
      
      if (animationLoop) {
        // Sürekli döngü için sadece ileri-geri
        if (direction === "forward") {
          setDirection("backward");
          startTimeRef.current = null;
          animateSlider.current = requestAnimationFrame(updatePosition);
        } else if (direction === "backward") {
          setDirection("forward");
          startTimeRef.current = null;
          animateSlider.current = requestAnimationFrame(updatePosition);
        }
      } else {
        // Tek seferlik animasyon için ileri-geri-orta
        if (direction === "forward") {
          setDirection("backward");
          startTimeRef.current = null;
          animateSlider.current = requestAnimationFrame(updatePosition);
        } else if (direction === "backward") {
          setDirection("center");
          startTimeRef.current = null;
          animateSlider.current = requestAnimationFrame(updatePosition);
        } else if (direction === "center") {
          setIsRunning(false);
        }
      }
    }
  };

  useEffect(() => {
    if (isRunning) {
      animateSlider.current = requestAnimationFrame(updatePosition);
    }

    return () => {
      if (animateSlider.current !== null) {
        cancelAnimationFrame(animateSlider.current);
      }
    };
  }, [isRunning, direction]);

  useEffect(() => {
    if (!enableAnimation) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsRunning(true);
            setDirection("forward");
            setPosition(50);
            previousPosition.current = 50;
            setHasAnimated(true);

            if (containerRef.current) {
              observer.unobserve(containerRef.current);
            }
          }
        });
      },
      {
        threshold: 0.5,
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [enableAnimation, hasAnimated]);

  return { position, containerRef };
};

export default useCompareSliderAnimation;