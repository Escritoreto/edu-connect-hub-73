export type CVLanguage = "pt" | "en" | "fr" | "zh";

export interface CVTranslations {
  contact: string;
  email: string;
  phone: string;
  location: string;
  skills: string;
  languages: string;
  aboutMe: string;
  experience: string;
  education: string;
  certifications: string;
  projects: string;
  professionalSummary: string;
  present: string;
  studying: string;
  profile: string;
}

export const cvTranslations: Record<CVLanguage, CVTranslations> = {
  pt: {
    contact: "Contato",
    email: "Email",
    phone: "Telefone",
    location: "Localização",
    skills: "Habilidades",
    languages: "Idiomas",
    aboutMe: "Sobre Mim",
    experience: "Experiência",
    education: "Formação",
    certifications: "Certificações",
    projects: "Projetos",
    professionalSummary: "Resumo Profissional",
    present: "Presente",
    studying: "Cursando",
    profile: "Perfil",
  },
  en: {
    contact: "Contact",
    email: "Email",
    phone: "Phone",
    location: "Location",
    skills: "Skills",
    languages: "Languages",
    aboutMe: "About Me",
    experience: "Experience",
    education: "Education",
    certifications: "Certifications",
    projects: "Projects",
    professionalSummary: "Professional Summary",
    present: "Present",
    studying: "In Progress",
    profile: "Profile",
  },
  fr: {
    contact: "Contact",
    email: "E-mail",
    phone: "Téléphone",
    location: "Localisation",
    skills: "Compétences",
    languages: "Langues",
    aboutMe: "À Propos",
    experience: "Expérience",
    education: "Formation",
    certifications: "Certifications",
    projects: "Projets",
    professionalSummary: "Résumé Professionnel",
    present: "Présent",
    studying: "En cours",
    profile: "Profil",
  },
  zh: {
    contact: "联系方式",
    email: "电子邮件",
    phone: "电话",
    location: "地点",
    skills: "技能",
    languages: "语言",
    aboutMe: "关于我",
    experience: "工作经验",
    education: "教育背景",
    certifications: "证书",
    projects: "项目",
    professionalSummary: "专业简介",
    present: "至今",
    studying: "在读",
    profile: "简介",
  },
};

export const languageOptions = [
  { value: "pt" as CVLanguage, label: "Português", flag: "🇧🇷" },
  { value: "en" as CVLanguage, label: "English", flag: "🇺🇸" },
  { value: "fr" as CVLanguage, label: "Français", flag: "🇫🇷" },
  { value: "zh" as CVLanguage, label: "中文", flag: "🇨🇳" },
];
