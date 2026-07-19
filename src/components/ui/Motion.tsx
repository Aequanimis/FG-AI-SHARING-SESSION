import { motion, useReducedMotion } from "framer-motion";
import type { PropsWithChildren } from "react";

const easing = [0.22, 1, 0.36, 1] as const;

const tokenize = (text: string) => text.match(/[A-Za-z0-9×/+.–—-]+|[\u3400-\u9fff]{1,2}|[^\s]/g) ?? [text];

export function WordsPullUp({ text, className = "" }: { text: string; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <span className={`words-pull-up ${className}`} aria-label={text}>
      {tokenize(text).map((word, index) => (
        <motion.span
          className="word-mask"
          aria-hidden="true"
          initial={reduced ? false : { y: "105%", opacity: 0, rotate: 1.5 }}
          whileInView={{ y: "0%", opacity: 1, rotate: 0 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: reduced ? 0 : 0.76, delay: reduced ? 0 : index * 0.035, ease: easing }}
          key={`${word}-${index}`}
        >
          <span>{word}</span>
        </motion.span>
      ))}
    </span>
  );
}

export function WordsPullUpMultiStyle({ text }: { text: string }) {
  const reduced = useReducedMotion();
  return (
    <span className="words-pull-up multi-style" aria-label={text}>
      {tokenize(text).map((word, index) => (
        <motion.span
          className={`word-mask style-${index % 4}`}
          aria-hidden="true"
          initial={reduced ? false : { y: "110%", opacity: 0 }}
          whileInView={{ y: "0%", opacity: 1 }}
          viewport={{ once: false, amount: 0.35 }}
          transition={{ duration: reduced ? 0 : 0.68, delay: reduced ? 0 : index * 0.04, ease: easing }}
          key={`${word}-${index}`}
        >
          <span>{word}</span>
        </motion.span>
      ))}
    </span>
  );
}

export function ScrollRevealText({ text }: { text: string }) {
  const reduced = useReducedMotion();
  return (
    <span className="scroll-reveal-text" aria-label={text}>
      {tokenize(text).map((word, index) => (
        <motion.span
          aria-hidden="true"
          initial={reduced ? false : { opacity: 0.16 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false, amount: 0.78 }}
          transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : index * 0.025 }}
          key={`${word}-${index}`}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export function AnimatedTitle({ children, delay = 0 }: PropsWithChildren<{ delay?: number }>) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.55 }}
      transition={{ duration: reduced ? 0 : 0.62, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedBlueLine() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="title-line"
      initial={reduced ? false : { scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: false, amount: 0.7 }}
      transition={{ duration: reduced ? 0 : 0.62, delay: 0.1, ease: easing }}
    />
  );
}

export function Stagger({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: false, amount: 0.32 }}
      variants={{ shown: { transition: { staggerChildren: reduced ? 0 : 0.08 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.94 },
        shown: { opacity: 1, y: 0, scale: 1, transition: { duration: reduced ? 0 : 0.7, ease: easing } },
      }}
    >
      {children}
    </motion.div>
  );
}
