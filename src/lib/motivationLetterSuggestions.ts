import type { CVLanguage } from "./cvTranslations";

type LetterSuggestionsSet = {
  greetings: string[];
  introductions: Record<string, string[]>;
  bodies: Record<string, string[]>;
  conclusions: Record<string, string[]>;
  closings: string[];
  subjects: Record<string, string[]>;
  formLabels: {
    personalInfo: string;
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    date: string;
    recipientInfo: string;
    recipientName: string;
    recipientTitle: string;
    companyName: string;
    companyAddress: string;
    letterContent: string;
    subject: string;
    greeting: string;
    introduction: string;
    body: string;
    conclusion: string;
    closing: string;
    purpose: string;
    language: string;
    chooseTemplate: string;
    preview: string;
    download: string;
    next: string;
    back: string;
    purposeJob: string;
    purposeScholarship: string;
    purposeUniversity: string;
    purposeInternship: string;
    purposeGeneral: string;
    selectSuggestion: string;
  };
};

const pt: LetterSuggestionsSet = {
  greetings: ["Prezado(a) Sr(a).", "Exmo(a). Sr(a).", "Caro(a) Sr(a).", "A quem possa interessar"],
  introductions: {
    job: [
      "Venho, por meio desta, manifestar meu interesse na vaga de [cargo] anunciada por vossa empresa. Com minha experiência em [área], acredito poder contribuir significativamente para a equipa.",
      "É com grande entusiasmo que me candidato à posição de [cargo] na [empresa]. Minha trajetória profissional em [área] me preparou para assumir este desafio.",
    ],
    scholarship: [
      "Dirijo-me a V. Exa. para expressar o meu interesse na bolsa de estudos [nome da bolsa]. Como estudante dedicado(a) em [área de estudo], esta oportunidade representa um passo crucial na minha formação académica.",
      "Tenho a honra de me candidatar à bolsa [nome da bolsa]. A minha paixão por [área] e o meu desempenho académico motivam-me a procurar esta oportunidade de crescimento.",
    ],
    university: [
      "Venho manifestar o meu interesse em ingressar no programa de [curso] na [universidade]. A excelência académica desta instituição e o seu reconhecimento internacional motivam a minha candidatura.",
      "É com grande motivação que submeto a minha candidatura ao programa de [curso]. Acredito que a [universidade] é o ambiente ideal para desenvolver as minhas competências.",
    ],
    internship: [
      "Apresento a minha candidatura ao estágio em [área] na [empresa]. Como estudante de [curso], estou ansioso(a) por aplicar os conhecimentos teóricos num ambiente profissional.",
    ],
    general: [
      "Venho, por meio desta carta, apresentar as minhas qualificações e expressar o meu interesse em colaborar com a vossa organização.",
    ],
  },
  bodies: {
    job: [
      "Ao longo da minha carreira, desenvolvi competências sólidas em [competências]. Na minha posição anterior em [empresa anterior], fui responsável por [responsabilidades], alcançando [resultados]. Estas experiências prepararam-me para enfrentar novos desafios e contribuir positivamente para a vossa equipa.",
    ],
    scholarship: [
      "Durante o meu percurso académico, mantive uma média de [nota] e participei activamente em [actividades]. A minha pesquisa em [tema] demonstra o meu compromisso com a excelência académica. Esta bolsa permitir-me-á aprofundar os meus estudos e contribuir para o avanço do conhecimento na área.",
    ],
    university: [
      "O meu interesse por [área] surgiu durante [experiência]. Desde então, tenho procurado expandir os meus conhecimentos através de [actividades/cursos]. Acredito que o programa de [curso] na [universidade] me proporcionará as ferramentas necessárias para alcançar os meus objectivos profissionais.",
    ],
    internship: [
      "Como estudante de [curso], tenho desenvolvido competências em [competências]. Os projectos académicos que realizei, incluindo [projecto], demonstram a minha capacidade de aplicar teoria à prática. Estou motivado(a) a aprender e contribuir durante o estágio.",
    ],
    general: [
      "Possuo experiência e competências relevantes em [áreas]. O meu percurso inclui [experiências], que me proporcionaram uma visão abrangente e capacidade de adaptação a diferentes contextos profissionais.",
    ],
  },
  conclusions: {
    job: [
      "Agradeço a oportunidade de considerar a minha candidatura e fico à disposição para uma entrevista onde poderei detalhar a minha experiência e motivação. Espero poder contribuir para o sucesso da vossa equipa.",
    ],
    scholarship: [
      "Agradeço a atenção dedicada à minha candidatura. Estou confiante de que esta bolsa será um investimento valioso no meu futuro académico e profissional. Fico à inteira disposição para fornecer informações adicionais.",
    ],
    university: [
      "Agradeço a vossa consideração e fico à disposição para fornecer documentação adicional. Estou entusiasmado(a) com a possibilidade de fazer parte da comunidade académica da [universidade].",
    ],
    internship: [
      "Agradeço a oportunidade e fico disponível para uma entrevista. Estou motivado(a) a aprender e a dar o meu melhor contributo durante o período de estágio.",
    ],
    general: [
      "Agradeço a atenção e fico à disposição para qualquer esclarecimento adicional. Espero ter a oportunidade de contribuir para a vossa organização.",
    ],
  },
  closings: ["Com os melhores cumprimentos,", "Atenciosamente,", "Respeitosamente,", "Cordialmente,"],
  subjects: {
    job: ["Candidatura à vaga de [cargo]", "Carta de motivação - [cargo]"],
    scholarship: ["Candidatura à bolsa [nome da bolsa]", "Carta de motivação - Bolsa de estudos"],
    university: ["Candidatura ao programa de [curso]", "Carta de motivação - Admissão universitária"],
    internship: ["Candidatura ao estágio em [área]", "Carta de motivação - Estágio"],
    general: ["Carta de apresentação", "Carta de motivação"],
  },
  formLabels: {
    personalInfo: "Informações Pessoais",
    fullName: "Nome Completo",
    email: "E-mail",
    phone: "Telefone",
    address: "Endereço",
    city: "Cidade",
    date: "Data",
    recipientInfo: "Informações do Destinatário",
    recipientName: "Nome do Destinatário",
    recipientTitle: "Cargo/Título",
    companyName: "Nome da Empresa/Instituição",
    companyAddress: "Endereço da Empresa",
    letterContent: "Conteúdo da Carta",
    subject: "Assunto",
    greeting: "Saudação",
    introduction: "Introdução",
    body: "Corpo da Carta",
    conclusion: "Conclusão",
    closing: "Fecho",
    purpose: "Finalidade da Carta",
    language: "Idioma da Carta",
    chooseTemplate: "Escolher Modelo",
    preview: "Pré-visualização",
    download: "Baixar PDF",
    next: "Próximo",
    back: "Voltar",
    purposeJob: "Emprego",
    purposeScholarship: "Bolsa de Estudos",
    purposeUniversity: "Admissão Universitária",
    purposeInternship: "Estágio",
    purposeGeneral: "Geral",
    selectSuggestion: "Selecione uma sugestão ou escreva o seu",
  },
};

const en: LetterSuggestionsSet = {
  greetings: ["Dear Sir/Madam,", "Dear Hiring Manager,", "To Whom It May Concern,", "Dear Admissions Committee,"],
  introductions: {
    job: [
      "I am writing to express my interest in the [position] role at [company]. With my background in [field], I am confident I can make a meaningful contribution to your team.",
      "I am excited to apply for the [position] at [company]. My professional experience in [field] has prepared me well for this opportunity.",
    ],
    scholarship: [
      "I am writing to apply for the [scholarship name]. As a dedicated student in [field of study], this opportunity represents a pivotal step in my academic journey.",
      "It is with great enthusiasm that I submit my application for the [scholarship name]. My passion for [field] drives my pursuit of this opportunity.",
    ],
    university: [
      "I am writing to express my strong interest in the [program] at [university]. The institution's academic excellence and international recognition inspire my application.",
    ],
    internship: [
      "I am applying for the internship in [field] at [company]. As a [course] student, I am eager to apply my theoretical knowledge in a professional setting.",
    ],
    general: [
      "I am writing to present my qualifications and express my interest in collaborating with your organization.",
    ],
  },
  bodies: {
    job: [
      "Throughout my career, I have developed strong skills in [skills]. In my previous role at [company], I was responsible for [responsibilities], achieving [results]. These experiences have prepared me to take on new challenges and contribute positively to your team.",
    ],
    scholarship: [
      "During my academic journey, I have maintained a GPA of [grade] and actively participated in [activities]. My research in [topic] demonstrates my commitment to academic excellence.",
    ],
    university: [
      "My interest in [field] was sparked during [experience]. Since then, I have sought to expand my knowledge through [activities/courses]. I believe the [program] at [university] will provide the tools I need to achieve my professional goals.",
    ],
    internship: [
      "As a [course] student, I have developed skills in [skills]. My academic projects, including [project], demonstrate my ability to apply theory to practice.",
    ],
    general: [
      "I possess relevant experience and skills in [areas]. My background includes [experiences], which have given me a comprehensive view and adaptability across professional contexts.",
    ],
  },
  conclusions: {
    job: ["Thank you for considering my application. I look forward to the opportunity to discuss how my experience and skills can benefit your team."],
    scholarship: ["Thank you for your consideration. I am confident this scholarship will be a valuable investment in my academic and professional future."],
    university: ["Thank you for your consideration. I am enthusiastic about the possibility of joining [university]'s academic community."],
    internship: ["Thank you for this opportunity. I am motivated to learn and make my best contribution during the internship period."],
    general: ["Thank you for your attention. I remain available for any further information you may need."],
  },
  closings: ["Sincerely,", "Best regards,", "Respectfully,", "Kind regards,"],
  subjects: {
    job: ["Application for [position]", "Cover Letter - [position]"],
    scholarship: ["Application for [scholarship name]", "Motivation Letter - Scholarship"],
    university: ["Application for [program]", "Motivation Letter - University Admission"],
    internship: ["Application for Internship in [field]", "Motivation Letter - Internship"],
    general: ["Cover Letter", "Motivation Letter"],
  },
  formLabels: {
    personalInfo: "Personal Information",
    fullName: "Full Name",
    email: "Email",
    phone: "Phone",
    address: "Address",
    city: "City",
    date: "Date",
    recipientInfo: "Recipient Information",
    recipientName: "Recipient Name",
    recipientTitle: "Title/Position",
    companyName: "Company/Institution Name",
    companyAddress: "Company Address",
    letterContent: "Letter Content",
    subject: "Subject",
    greeting: "Greeting",
    introduction: "Introduction",
    body: "Body",
    conclusion: "Conclusion",
    closing: "Closing",
    purpose: "Letter Purpose",
    language: "Letter Language",
    chooseTemplate: "Choose Template",
    preview: "Preview",
    download: "Download PDF",
    next: "Next",
    back: "Back",
    purposeJob: "Job Application",
    purposeScholarship: "Scholarship",
    purposeUniversity: "University Admission",
    purposeInternship: "Internship",
    purposeGeneral: "General",
    selectSuggestion: "Select a suggestion or write your own",
  },
};

const fr: LetterSuggestionsSet = {
  ...en,
  greetings: ["Madame, Monsieur,", "Cher(e) Responsable,", "À qui de droit,"],
  closings: ["Cordialement,", "Veuillez agréer mes salutations distinguées,", "Respectueusement,"],
  formLabels: {
    personalInfo: "Informations Personnelles",
    fullName: "Nom Complet",
    email: "E-mail",
    phone: "Téléphone",
    address: "Adresse",
    city: "Ville",
    date: "Date",
    recipientInfo: "Informations du Destinataire",
    recipientName: "Nom du Destinataire",
    recipientTitle: "Titre/Poste",
    companyName: "Nom de l'Entreprise",
    companyAddress: "Adresse de l'Entreprise",
    letterContent: "Contenu de la Lettre",
    subject: "Objet",
    greeting: "Salutation",
    introduction: "Introduction",
    body: "Corps de la Lettre",
    conclusion: "Conclusion",
    closing: "Formule de Politesse",
    purpose: "Objectif de la Lettre",
    language: "Langue de la Lettre",
    chooseTemplate: "Choisir un Modèle",
    preview: "Aperçu",
    download: "Télécharger PDF",
    next: "Suivant",
    back: "Retour",
    purposeJob: "Emploi",
    purposeScholarship: "Bourse d'Études",
    purposeUniversity: "Admission Universitaire",
    purposeInternship: "Stage",
    purposeGeneral: "Général",
    selectSuggestion: "Sélectionnez une suggestion ou écrivez la vôtre",
  },
};

const allSuggestions: Record<string, LetterSuggestionsSet> = { pt, en, fr };

export function getLetterSuggestions(lang: CVLanguage): LetterSuggestionsSet {
  return allSuggestions[lang] || allSuggestions.pt;
}

export type { LetterSuggestionsSet };
