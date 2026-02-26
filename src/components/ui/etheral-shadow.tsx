'use client';

import React, { useRef, useId, useEffect, CSSProperties } from 'react';
import { animate, useMotionValue, AnimationPlaybackControls } from 'framer-motion';

interface AnimationConfig {
  scale: number;
  speed: number;
}

interface NoiseConfig {
  opacity: number;
  scale: number;
}

interface EtheralShadowProps {
  color?: string;
  animation?: AnimationConfig;
  noise?: NoiseConfig;
  style?: CSSProperties;
  className?: string;
}

function mapRange(
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number
): number {
  if (fromLow === fromHigh) return toLow;
  const percentage = (value - fromLow) / (fromHigh - fromLow);
  return toLow + percentage * (toHigh - toLow);
}

const useInstanceId = (): string => {
  const id = useId();
  const cleanId = id.replace(/:/g, "");
  return `shadowoverlay-${cleanId}`;
};

export function EtheralShadow({
  color = 'rgba(180, 50, 90, 1)',
  animation = { scale: 50, speed: 30 },
  noise = { opacity: 0.04, scale: 1 },
  style,
  className
}: EtheralShadowProps) {
  const id = useInstanceId();
  const animationEnabled = animation && animation.scale > 0;
  const seedRef = useRef<SVGFETurbulenceElement>(null);
  const seedMotion = useMotionValue(0);
  const seedAnimation = useRef<AnimationPlaybackControls | null>(null);

  const displacementScale = animation ? mapRange(animation.scale, 1, 100, 20, 100) : 0;
  const animationDuration = animation ? mapRange(animation.speed, 1, 100, 60, 5) : 30;

  useEffect(() => {
    if (seedRef.current && animationEnabled) {
      if (seedAnimation.current) {
        seedAnimation.current.stop();
      }
      seedMotion.set(0);
      seedAnimation.current = animate(seedMotion, 1000, {
        duration: animationDuration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "linear",
        onUpdate: (value: number) => {
          if (seedRef.current) {
            seedRef.current.setAttribute("seed", String(Math.floor(value)));
          }
        }
      });

      return () => {
        if (seedAnimation.current) {
          seedAnimation.current.stop();
        }
      };
    }
  }, [animationEnabled, animationDuration, seedMotion]);

  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '-20%',
          width: '140%',
          height: '140%',
        }}
      >
        {animationEnabled && (
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <defs>
              <filter id={`${id}-turbulence`} x="0%" y="0%" width="100%" height="100%">
                <feTurbulence
                  ref={seedRef}
                  type="fractalNoise"
                  baseFrequency="0.008 0.008"
                  numOctaves={3}
                  seed={2}
                  result="turbulence"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="turbulence"
                  scale={displacementScale}
                  result="displacement"
                />
              </filter>
            </defs>
          </svg>
        )}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            filter: animationEnabled ? `url(#${id}-turbulence)` : undefined,
          }}
        >
          <svg
            viewBox="0 0 900 600"
            preserveAspectRatio="xMidYMid slice"
            style={{
              width: '100%',
              height: '100%',
              display: 'block',
            }}
          >
            <defs>
              <radialGradient id={`${id}-grad1`} cx="25%" cy="25%" r="55%">
                <stop offset="0%" stopColor="hsl(340, 50%, 18%)" stopOpacity="0.6" />
                <stop offset="100%" stopColor="hsl(340, 50%, 18%)" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={`${id}-grad2`} cx="75%" cy="65%" r="50%">
                <stop offset="0%" stopColor="hsl(335, 45%, 14%)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="hsl(335, 45%, 14%)" stopOpacity="0" />
              </radialGradient>
              <radialGradient id={`${id}-grad3`} cx="60%" cy="15%" r="40%">
                <stop offset="0%" stopColor="hsl(345, 40%, 12%)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="hsl(345, 40%, 12%)" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="900" height="600" fill={`url(#${id}-grad1)`} />
            <rect width="900" height="600" fill={`url(#${id}-grad2)`} />
            <rect width="900" height="600" fill={`url(#${id}-grad3)`} />
          </svg>
        </div>
      </div>

      {noise && noise.opacity > 0 && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: noise.opacity,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: `${256 * noise.scale}px`,
            mixBlendMode: 'overlay',
          }}
        />
      )}
    </div>
  );
}
