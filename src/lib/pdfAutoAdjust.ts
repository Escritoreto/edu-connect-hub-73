import { CVData } from "@/types/cv";

export interface AutoAdjustConfig {
  fontScale: number;
  lineHeightScale: number;
  spacingScale: number;
  paddingScale: number;
}

/**
 * Calculates the content density of a CV and returns scaling factors
 * to auto-adjust fonts, spacing, and padding to fill the page better.
 */
export const calculateAutoAdjust = (data: CVData): AutoAdjustConfig => {
  // Count content items
  const experienceCount = data.experience?.length || 0;
  const educationCount = data.education?.length || 0;
  const skillsCount = data.skills?.length || 0;
  const languagesCount = data.languages?.length || 0;
  const certificationsCount = data.certifications?.length || 0;
  const projectsCount = data.projects?.length || 0;
  
  // Count text length
  const summaryLength = data.summary?.length || 0;
  const experienceTextLength = data.experience?.reduce((acc, exp) => 
    acc + (exp.responsibilities?.length || 0) + (exp.jobTitle?.length || 0) + (exp.company?.length || 0), 0) || 0;
  const projectsTextLength = data.projects?.reduce((acc, proj) => 
    acc + (proj.description?.length || 0) + (proj.name?.length || 0), 0) || 0;
  
  // Calculate total content score
  // Higher score = more content = need smaller fonts/spacing
  const contentScore = 
    (experienceCount * 30) +
    (educationCount * 20) +
    (skillsCount * 5) +
    (languagesCount * 5) +
    (certificationsCount * 10) +
    (projectsCount * 20) +
    (summaryLength * 0.1) +
    (experienceTextLength * 0.05) +
    (projectsTextLength * 0.05);
  
  // Determine scaling based on content score
  // Score ranges: 0-50 (very sparse), 50-100 (sparse), 100-200 (normal), 200-300 (dense), 300+ (very dense)
  
  if (contentScore < 40) {
    // Very sparse content - maximize everything
    return {
      fontScale: 1.5,
      lineHeightScale: 2.0,
      spacingScale: 2.5,
      paddingScale: 1.8,
    };
  } else if (contentScore < 80) {
    // Sparse content - increase significantly
    return {
      fontScale: 1.35,
      lineHeightScale: 1.7,
      spacingScale: 2.0,
      paddingScale: 1.5,
    };
  } else if (contentScore < 130) {
    // Moderate sparse - increase moderately
    return {
      fontScale: 1.2,
      lineHeightScale: 1.5,
      spacingScale: 1.6,
      paddingScale: 1.3,
    };
  } else if (contentScore < 200) {
    // Normal content - slight increase
    return {
      fontScale: 1.1,
      lineHeightScale: 1.3,
      spacingScale: 1.3,
      paddingScale: 1.15,
    };
  } else if (contentScore < 300) {
    // Dense content - use defaults
    return {
      fontScale: 1.0,
      lineHeightScale: 1.0,
      spacingScale: 1.0,
      paddingScale: 1.0,
    };
  } else {
    // Very dense content - compact
    return {
      fontScale: 0.9,
      lineHeightScale: 0.85,
      spacingScale: 0.8,
      paddingScale: 0.9,
    };
  }
};

/**
 * Apply auto-adjust scaling to base font sizes
 */
export const applyAutoAdjustToFonts = (
  baseFonts: { name: number; jobTitle: number; sectionTitle: number; body: number; small: number; contact: number },
  config: AutoAdjustConfig
) => {
  return {
    name: Math.round(baseFonts.name * config.fontScale),
    jobTitle: Math.round(baseFonts.jobTitle * config.fontScale),
    sectionTitle: Math.round(baseFonts.sectionTitle * config.fontScale),
    body: Math.round(baseFonts.body * config.fontScale),
    small: Math.round(baseFonts.small * config.fontScale),
    contact: Math.round(baseFonts.contact * config.fontScale),
  };
};

/**
 * Apply auto-adjust scaling to spacing values
 */
export const applyAutoAdjustToSpacing = (baseSpacing: number, config: AutoAdjustConfig): number => {
  return Math.round(baseSpacing * config.spacingScale);
};

/**
 * Apply auto-adjust scaling to line height
 */
export const applyAutoAdjustToLineHeight = (baseLineHeight: number, config: AutoAdjustConfig): number => {
  return Math.round((baseLineHeight * config.lineHeightScale) * 10) / 10;
};

/**
 * Apply auto-adjust scaling to padding values
 */
export const applyAutoAdjustToPadding = (basePadding: number, config: AutoAdjustConfig): number => {
  return Math.round(basePadding * config.paddingScale);
};
