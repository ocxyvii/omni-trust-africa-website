'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Users, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Advanced Protection',
    description: 'Multi-layered security approach',
  },
  {
    icon: Zap,
    title: 'Real-Time Response',
    description: 'Instant threat detection and response',
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Certified security professionals',
  },
  {
    icon: TrendingUp,
    title: 'Continuous Improvement',
    description: 'Always evolving with threats',
  },
];

export function AnimatedFeaturesSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      {features.map((feature) => {
        const Icon = feature.icon;
        return (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            className="p-6 rounded-lg border border-border bg-secondary/50 hover:bg-secondary/80 hover:shadow-lg transition-all cursor-default"
          >
            <Icon className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
