export const SECTION_IDS = [
  "landing-page",
  "are-you-ready",
  "charge-organisational-batteries",
  "challenge-limiting-beliefs",
  "reset-strategic-direction",
  "build-two-engines",
  "ecosystems-thinking",
  "why-we-started",
  "who-we-are",
] as const;

export type SectionId = typeof SECTION_IDS[number];
