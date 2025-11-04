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
  
  // Template
  selectedTemplate: string;
  selectedPurpose: string;
}

export interface CVTemplate {
  id: string;
  name: string;
  description: string;
  preview: string;
}
