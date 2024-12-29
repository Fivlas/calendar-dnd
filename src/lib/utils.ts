import { clsx, type ClassValue } from "clsx"
import { Transition, Variants } from "motion/react";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const customVariants: Variants = {
  initial: {
      opacity: 0,
      scale: 0.95,
      y: 40,
  },
  animate: {
      opacity: 1,
      scale: 1,
      y: 0,
  },
  exit: {
      opacity: 0,
      scale: 0.95,
      y: 40,
  },
};

export const customTransition: Transition = {
  type: "spring",
  bounce: 0,
  duration: 0.25,
};
