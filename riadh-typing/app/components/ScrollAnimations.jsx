"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Hook for scroll-triggered fade in animations
export function useScrollFadeIn(direction = "up", delay = 0, duration = 0.8) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    const getInitialPosition = () => {
      switch (direction) {
        case "up":
          return { y: 50, opacity: 0 };
        case "down":
          return { y: -50, opacity: 0 };
        case "left":
          return { x: 50, opacity: 0 };
        case "right":
          return { x: -50, opacity: 0 };
        default:
          return { y: 50, opacity: 0 };
      }
    };

    gsap.set(element, getInitialPosition());

    const animation = gsap.to(element, {
      x: 0,
      y: 0,
      opacity: 1,
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        end: "top 20%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [direction, delay, duration]);

  return ref;
}

// Hook for staggered children animations
export function useStaggerChildren(staggerDelay = 0.1) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const children = container.children;

    gsap.set(children, { y: 40, opacity: 0 });

    const animation = gsap.to(children, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: staggerDelay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [staggerDelay]);

  return containerRef;
}

// Hook for parallax effect
export function useParallax(speed = 0.5) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const animation = gsap.to(element, {
      y: () => window.innerHeight * speed * 0.5,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return ref;
}

// Hook for scale on scroll
export function useScrollScale() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.set(element, { scale: 0.9, opacity: 0 });

    const animation = gsap.to(element, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, []);

  return ref;
}

// Hook for horizontal scroll reveal
export function useHorizontalScroll() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const children = container.children;

    gsap.set(children, { x: 100, opacity: 0 });

    const animation = gsap.to(children, {
      x: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: container,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, []);

  return containerRef;
}

// Component for animated section wrapper
export function AnimatedSection({
  children,
  className = "",
  direction = "up",
  delay = 0,
}) {
  const ref = useScrollFadeIn(direction, delay);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Component for staggered grid
export function StaggeredGrid({
  children,
  className = "",
  staggerDelay = 0.1,
}) {
  const ref = useStaggerChildren(staggerDelay);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Component for parallax wrapper
export function ParallaxWrapper({ children, className = "", speed = 0.5 }) {
  const ref = useParallax(speed);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Component for page transition wrapper
export function PageTransition({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    gsap.fromTo(
      container,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  return <div ref={containerRef}>{children}</div>;
}

// Text reveal animation component
export function TextReveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    gsap.set(element, { y: 30, opacity: 0 });

    const animation = gsap.to(element, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      animation.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

// Counter animation hook
export function useCountUp(end, duration = 2, suffix = "") {
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const element = ref.current;
    const obj = { value: 0 };

    const animation = gsap.to(obj, {
      value: end,
      duration,
      ease: "power2.out",
      scrollTrigger: {
        trigger: element,
        start: "top 85%",
        onEnter: () => {
          if (!hasAnimated.current) {
            hasAnimated.current = true;
          }
        },
      },
      onUpdate: () => {
        element.textContent = Math.round(obj.value) + suffix;
      },
    });

    return () => {
      animation.kill();
    };
  }, [end, duration, suffix]);

  return ref;
}
