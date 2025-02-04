import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const gradientColor = 'bg-gradient-to-r from-[#AA3CDD] to-[#500C6A] text-transparent bg-clip-text';
