import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const normalizeFilters = (uiFilters: {
  searchQuery: string;
  location: string;
  categories: string[];
  experienceLevels: string[];
  datePosted: string[];
  salaryRange: [number, number];
  tags: string[];
}) => {
  // map experience levels → years
  const experienceMap: Record<string, number> = {
    "No experience": 0,
    "Fresher": 0,
    "Intermediate": 2,
    "Expert": 5,
  };

  // map UI date filters → schema enum
  const dateMap: Record<string, "today" | "week" | "month"> = {
    "Last 24 Hours": "today",
    "Last 7 Days": "week",
    "Last 30 Days": "month",
  };

  return {
    search: uiFilters.searchQuery || undefined,
    location: uiFilters.location || undefined,
    categories: uiFilters.categories.length ? uiFilters.categories : undefined,
    minExperienceYears: uiFilters.experienceLevels.length
      ? experienceMap[uiFilters.experienceLevels[0]] // or pick max/min?
      : undefined,
    datePosted: uiFilters.datePosted.length
      ? dateMap[uiFilters.datePosted[0]]
      : undefined,
    salaryMin: uiFilters.salaryRange[0],
    salaryMax: uiFilters.salaryRange[1],
    tags: uiFilters.tags.length ? uiFilters.tags : undefined,
  };
};

export const changeDateToTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (diffInSeconds < 60) return `${diffInSeconds} sec ago`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }