import { useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue } from 'framer-motion';

interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'speedUp' | 'slowDown';
  className?: string;
}

const getRotationTransition = (duration: number, from: number, loop = true) => ({
  from,
  to: from + 360,
  ease: 'linear',
  duration,
  type: 'tween' as const,
  repeat: loop ? Infinity : 0
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 300
  }
});

export default function CircularText({ 
  text, 
  spinDuration = 20, 
  onHover = 'speedUp',
  className = '' 
}: CircularTextProps) {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  }, [spinDuration, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;

    let transitionConfig;
    let scaleVal = 1;
    
    if (onHover === 'slowDown') {
      transitionConfig = getTransition(spinDuration * 2, start);
    } else {
      transitionConfig = getTransition(spinDuration / 2, start);
      scaleVal = 1.05;
    }
    
    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  };

  return (
    <motion.div
      className={`relative w-[120px] h-[120px] md:w-[160px] md:h-[160px] ${className}`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const radius = 50;
        const angle = (rotationDeg * Math.PI) / 180;
        const x = Math.sin(angle) * radius;
        const y = -Math.cos(angle) * radius;
        const transform = `translate(${x}px, ${y}px) rotate(${rotationDeg}deg)`;

        return (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 text-xs md:text-sm font-bold text-primary"
            style={{ 
              transform,
              WebkitTransform: transform,
              transformOrigin: '0 0'
            }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
}
