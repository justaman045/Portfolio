"use client";

import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

const pillContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.04 },
  },
};

const pillVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" as const },
  },
};

const cardContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

export function AnimatedSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.section variants={sectionVariants}>
      {children}
    </motion.section>
  );
}

export function AnimatedPills({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={pillContainerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-wrap gap-2"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.span
      variants={pillVariants}
      whileHover={{ scale: 1.08, boxShadow: "0 0 14px hsl(var(--accent-foreground)/0.2)" }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

export function AnimatedCards({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={cardContainerVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, boxShadow: "0 4px 20px hsl(var(--accent-foreground)/0.12)" }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCategoryCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" as const }}
      className="rounded-xl border border-border/50 bg-background/30 p-5 backdrop-blur-sm transition-colors"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedStatCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" as const, delay: 0.15 }}
      className="rounded-xl border border-border/50 bg-gradient-to-br from-background/80 via-background/50 to-background/80 px-5 py-4 backdrop-blur-sm"
    >
      {children}
    </motion.div>
  );
}

export default function TechStackClient({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {children}
    </motion.div>
  );
}
