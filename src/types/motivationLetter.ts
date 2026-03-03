export interface MotivationLetterData {
  // Personal Info
  fullName: string;
  email: string;
  phone: string;
  countryCode: string;
  address: string;
  city: string;
  date: string;

  // Recipient
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  companyAddress: string;

  // Letter Content
  subject: string;
  greeting: string;
  introduction: string;
  body: string;
  conclusion: string;
  closing: string;

  // Template & Language
  selectedTemplate: string;
  letterLanguage: "pt" | "en" | "fr" | "zh" | "es" | "ar" | "tr" | "de" | "it" | "ru" | "sw";
  letterPurpose: "job" | "scholarship" | "university" | "internship" | "general";
}

export interface MotivationLetterTemplate {
  id: string;
  name: string;
  description: string;
  color: string;
}
