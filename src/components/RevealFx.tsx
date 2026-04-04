'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from './RevealFx.module.css';

interface RevealFxProps {
  children: React.ReactNode;
  delay?: number;
  translateY?: number;
  translateX?: number;
  duration?: number;
  className?: string;
  triggerOnce?: boolean;
  threshold?: number;
  animationType?: 'motion' | 'mask' | 'fade';
}

export default function RevealFx({
  children,
  delay = 0,
  translateY = 0,
  translateX = 0,
  duration = 0.8,
  className = '',
  triggerOnce = true,
  threshold = 0.1,
  animationType = 'motion',
}: RevealFxProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const shouldReveal = entry.isIntersecting && (!triggerOnce || !hasTriggered);
        
        if (shouldReveal) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay * 1000);
          
          if (triggerOnce) {
            setHasTriggered(true);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, triggerOnce, hasTriggered, delay]);

  // Framer Motion animation
  if (animationType === 'motion') {
    return (
      <div ref={elementRef} className={className}>
        <motion.div
          initial={{
            opacity: 0,
            y: translateY,
            x: translateX,
            filter: 'blur(4px)',
          }}
          animate={
            isVisible
              ? {
                  opacity: 1,
                  y: 0,
                  x: 0,
                  filter: 'blur(0px)',
                }
              : {
                  opacity: 0,
                  y: translateY,
                  x: translateX,
                  filter: 'blur(4px)',
                }
          }
          transition={{
            duration,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  // CSS mask-based animation (similar to Magic Portfolio)
  if (animationType === 'mask') {
    const durationClass = duration <= 0.5 ? styles['duration-fast'] : 
                         duration <= 1 ? styles['duration-normal'] : 
                         styles['duration-slow'];

    return (
      <div 
        ref={elementRef} 
        className={`${styles.revealFx} ${durationClass} ${
          isVisible ? styles.revealed : styles.hidden
        } ${className}`}
      >
        {children}
      </div>
    );
  }

  // Simple fade animation
  return (
    <div 
      ref={elementRef} 
      className={`${
        isVisible ? styles.revealedNoMask : styles.hiddenNoMask
      } ${className}`}
      style={{
        transitionDuration: `${duration}s`,
        transform: isVisible 
          ? 'translateY(0) translateX(0)' 
          : `translateY(${translateY}px) translateX(${translateX}px)`
      }}
    >
      {children}
    </div>
  );
}
