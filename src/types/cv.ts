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
  
  // Education
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
  
  // Experience
  jobTitle: string;
  company: string;
  expStartDate: string;
  expEndDate: string;
  responsibilities: string;
  
  // Skills
  skills: string;
  
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
