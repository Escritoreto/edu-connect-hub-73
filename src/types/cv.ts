export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate: string;
  responsibilities: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface Certification {
  id: string;
  name: string;
  institution: string;
  date: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link?: string;
}

export interface CVData {
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  countryCode: string;
  location: string;
  photoPreview: string | null;
  
  // Professional
  summary: string;
  
  // Education - Array
  education: Education[];
  
  // Experience - Array
  experience: Experience[];
  
  // Skills - Array
  skills: string[];
  
  // Languages - Array
  languages: Language[];
  
  // Certifications - Array
  certifications: Certification[];
  
  // Projects - Array
  projects: Project[];
  
  // Template
  selectedTemplate: string;
  selectedPurpose: string;
  
  // Language for CV sections
  cvLanguage: "pt" | "en" | "fr" | "zh" | "es" | "ar" | "tr" | "de" | "it" | "ru" | "sw";
  
  // Font size control
  fontSize: "small" | "medium" | "large";
}

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
}
