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
        name: 20,
        jobTitle: 9,
        sectionTitle: 10,
        body: 8,
        small: 7,
        contact: 7,
      };
    case "large":
      return {
        name: 28,
        jobTitle: 13,
        sectionTitle: 14,
        body: 11,
        small: 9,
        contact: 10,
      };
    case "medium":
    default:
      return {
        name: 24,
        jobTitle: 11,
        sectionTitle: 12,
        body: 9,
        small: 8,
        contact: 8,
      };
  }
};
