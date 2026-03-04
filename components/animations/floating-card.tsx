'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export function FloatingCard({
  children,
  delay = 0,
  duration = 6,
}: FloatingCardProps) {
  return (
    <motion.div
      animate={{
        y: [0, -20, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
}

export function FadeInUp({
  children,
  delay = 0,
}: FadeInUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
}

interface ScaleOnHoverProps {
  children: ReactNode;
  scale?: number;
}

export function ScaleOnHover({
  children,
  scale = 1.05,
}: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{ scale }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxProps {
  children: ReactNode;
  speed?: number;
}

export function Parallax({
  children,
  speed = 0.5,
}: ParallaxProps) {
  return (
    <motion.div
      initial={{ y: 0 }}
      whileInView={{ y: -100 * speed }}
      transition={{
        duration: 1,
        ease: 'easeOut',
      }}
      viewport={{ once: false, margin: '0px 0px -100px 0px' }}
    >
      {children}
    </motion.div>
  );
}
