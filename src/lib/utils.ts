import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ITitle } from "@consumet/extensions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getTitle(title?: ITitle | string): string {
  if (!title) return "";
  if (typeof title === "string") {
    return title || "No title";
  }
  return (
    title.english ||
    title.userPreferred ||
    title.romaji ||
    title.native ||
    "No Title"
  );
}
