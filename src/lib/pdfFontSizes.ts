export type FontSizePreset = "small" | "medium" | "large";

export interface FontSizes {
  name: number;
  jobTitle: number;
  sectionTitle: number;
  body: number;
  small: number;
  contact: number;
}

export const getFontSizes = (preset: FontSizePreset): FontSizes => {
  switch (preset) {
    case "small":
      return {
        name: 24,
        jobTitle: 11,
        sectionTitle: 12,
        body: 10,
        small: 9,
        contact: 9,
      };
    case "large":
      return {
        name: 32,
        jobTitle: 15,
        sectionTitle: 16,
        body: 13,
        small: 12,
        contact: 12,
      };
    case "medium":
    default:
      return {
        name: 28,
        jobTitle: 13,
        sectionTitle: 14,
        body: 11,
        small: 10,
        contact: 10,
      };
  }
};
