const normalizeFilters = (uiFilters: {
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
