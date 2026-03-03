import { CVLanguage } from "./cvTranslations";

type SuggestionsSet = {
  professionalSummaries: string[];
  academicDegrees: string[];
  jobTitles: string[];
  responsibilities: string[];
  skillsSuggestions: string[];
  languageLevels: string[];
  formLabels: {
    personalData: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    cvLanguage: string;
    fontSize: string;
    fontSmall: string;
    fontMedium: string;
    fontLarge: string;
    summary: string;
    summaryPlaceholder: string;
    selectSuggestion: string;
    education: string;
    experience: string;
    skills: string;
    languages: string;
    certifications: string;
    projects: string;
    add: string;
    degree: string;
    institution: string;
    startDate: string;
    endDate: string;
    jobTitle: string;
    company: string;
    responsibilitiesLabel: string;
    languageName: string;
    level: string;
    certName: string;
    certInstitution: string;
    certDate: string;
    projectName: string;
    projectLink: string;
    projectDescription: string;
    next: string;
    back: string;
    noItems: string;
    addPhoto: string;
    optional: string;
  };
};

const pt: SuggestionsSet = {
  professionalSummaries: [
    "Profissional dedicado com sólida experiência em [sua área], buscando contribuir com habilidades analíticas e criativas.",
    "Especialista em [área de atuação] com histórico comprovado de sucesso em projetos desafiadores.",
    "Motivado(a) e orientado(a) a resultados, com forte capacidade de adaptação e aprendizado rápido.",
    "Profissional experiente com foco em inovação, eficiência e excelência no atendimento ao cliente.",
    "Recém-formado(a) entusiasmado(a) em aplicar conhecimentos acadêmicos em ambiente profissional."
  ],
  academicDegrees: ["Ensino Médio Completo", "Técnico em", "Tecnólogo em", "Bacharelado em", "Licenciatura em", "MBA em", "Mestrado em", "Doutorado em", "Pós-Doutorado em"],
  jobTitles: ["Analista", "Assistente", "Coordenador(a)", "Gerente", "Supervisor(a)", "Desenvolvedor(a)", "Designer", "Consultor(a)", "Especialista", "Estagiário(a)", "Trainee"],
  responsibilities: [
    "Gerenciamento de projetos e equipes multidisciplinares",
    "Análise de dados e elaboração de relatórios gerenciais",
    "Desenvolvimento e implementação de estratégias de marketing",
    "Atendimento e relacionamento com clientes",
    "Controle de qualidade e processos operacionais"
  ],
  skillsSuggestions: ["Excel Avançado", "Power BI", "Python", "JavaScript", "Marketing Digital", "SEO/SEM", "Gestão de Projetos", "Photoshop", "AutoCAD", "Comunicação Efetiva", "Liderança", "Trabalho em Equipe", "Resolução de Problemas"],
  languageLevels: ["Básico", "Intermediário", "Avançado", "Fluente", "Nativo"],
  formLabels: {
    personalData: "Dados Pessoais", firstName: "Nome", lastName: "Sobrenome", email: "E-mail", phone: "Telefone", location: "Localização", cvLanguage: "Idioma do CV", fontSize: "Tamanho da Fonte", fontSmall: "Pequeno", fontMedium: "Médio", fontLarge: "Grande", summary: "Resumo Profissional", summaryPlaceholder: "Ou escreva seu próprio resumo profissional...", selectSuggestion: "Selecione uma sugestão ou escreva o seu", education: "Formação Acadêmica", experience: "Experiência Profissional", skills: "Habilidades", languages: "Idiomas", certifications: "Certificações", projects: "Projetos", add: "Adicionar", degree: "Grau", institution: "Instituição", startDate: "Data de Início", endDate: "Data de Conclusão", jobTitle: "Cargo", company: "Empresa", responsibilitiesLabel: "Responsabilidades", languageName: "Idioma", level: "Nível", certName: "Nome da Certificação", certInstitution: "Instituição", certDate: "Data de Conclusão", projectName: "Nome do Projeto", projectLink: "Link (opcional)", projectDescription: "Descrição", next: "Próximo: Escolher Modelo", back: "Voltar", noItems: "Nenhum item adicionado. Clique em \"Adicionar\" para começar.", addPhoto: "Adicionar Foto", optional: "opcional",
  }
};

const en: SuggestionsSet = {
  professionalSummaries: [
    "Dedicated professional with solid experience in [your field], seeking to contribute analytical and creative skills.",
    "Specialist in [field] with a proven track record of success in challenging projects.",
    "Motivated and results-oriented, with strong adaptability and fast learning abilities.",
    "Experienced professional focused on innovation, efficiency, and customer service excellence.",
    "Enthusiastic recent graduate eager to apply academic knowledge in a professional environment."
  ],
  academicDegrees: ["High School Diploma", "Technical Degree in", "Associate Degree in", "Bachelor's Degree in", "Master's Degree in", "MBA in", "PhD in", "Postdoctoral in"],
  jobTitles: ["Analyst", "Assistant", "Coordinator", "Manager", "Supervisor", "Developer", "Designer", "Consultant", "Specialist", "Intern", "Trainee"],
  responsibilities: [
    "Project management and multidisciplinary team leadership",
    "Data analysis and management report preparation",
    "Development and implementation of marketing strategies",
    "Customer service and relationship management",
    "Quality control and operational processes"
  ],
  skillsSuggestions: ["Advanced Excel", "Power BI", "Python", "JavaScript", "Digital Marketing", "SEO/SEM", "Project Management", "Photoshop", "AutoCAD", "Effective Communication", "Leadership", "Teamwork", "Problem Solving"],
  languageLevels: ["Basic", "Intermediate", "Advanced", "Fluent", "Native"],
  formLabels: {
    personalData: "Personal Information", firstName: "First Name", lastName: "Last Name", email: "Email", phone: "Phone", location: "Location", cvLanguage: "CV Language", fontSize: "Font Size", fontSmall: "Small", fontMedium: "Medium", fontLarge: "Large", summary: "Professional Summary", summaryPlaceholder: "Or write your own professional summary...", selectSuggestion: "Select a suggestion or write your own", education: "Education", experience: "Work Experience", skills: "Skills", languages: "Languages", certifications: "Certifications", projects: "Projects", add: "Add", degree: "Degree", institution: "Institution", startDate: "Start Date", endDate: "End Date", jobTitle: "Job Title", company: "Company", responsibilitiesLabel: "Responsibilities", languageName: "Language", level: "Level", certName: "Certification Name", certInstitution: "Institution", certDate: "Completion Date", projectName: "Project Name", projectLink: "Link (optional)", projectDescription: "Description", next: "Next: Choose Template", back: "Back", noItems: "No items added. Click \"Add\" to start.", addPhoto: "Add Photo", optional: "optional",
  }
};

const fr: SuggestionsSet = {
  professionalSummaries: [
    "Professionnel dédié avec une solide expérience dans [votre domaine], cherchant à contribuer avec des compétences analytiques et créatives.",
    "Spécialiste en [domaine] avec un historique prouvé de réussite dans des projets stimulants.",
    "Motivé(e) et orienté(e) résultats, avec une forte capacité d'adaptation et d'apprentissage rapide.",
    "Professionnel expérimenté axé sur l'innovation, l'efficacité et l'excellence du service client.",
    "Jeune diplômé(e) enthousiaste souhaitant appliquer ses connaissances académiques en milieu professionnel."
  ],
  academicDegrees: ["Baccalauréat", "BTS en", "DUT en", "Licence en", "Master en", "MBA en", "Doctorat en", "Post-doctorat en"],
  jobTitles: ["Analyste", "Assistant(e)", "Coordinateur(trice)", "Directeur(trice)", "Superviseur(e)", "Développeur(euse)", "Designer", "Consultant(e)", "Spécialiste", "Stagiaire"],
  responsibilities: [
    "Gestion de projets et d'équipes multidisciplinaires",
    "Analyse de données et rédaction de rapports",
    "Développement et mise en œuvre de stratégies marketing",
    "Service client et gestion des relations",
    "Contrôle qualité et processus opérationnels"
  ],
  skillsSuggestions: ["Excel Avancé", "Power BI", "Python", "JavaScript", "Marketing Digital", "SEO/SEM", "Gestion de Projets", "Photoshop", "AutoCAD", "Communication", "Leadership", "Travail d'Équipe", "Résolution de Problèmes"],
  languageLevels: ["Débutant", "Intermédiaire", "Avancé", "Courant", "Natif"],
  formLabels: {
    personalData: "Informations Personnelles", firstName: "Prénom", lastName: "Nom", email: "E-mail", phone: "Téléphone", location: "Localisation", cvLanguage: "Langue du CV", fontSize: "Taille de Police", fontSmall: "Petit", fontMedium: "Moyen", fontLarge: "Grand", summary: "Résumé Professionnel", summaryPlaceholder: "Ou rédigez votre propre résumé professionnel...", selectSuggestion: "Sélectionnez une suggestion ou écrivez la vôtre", education: "Formation", experience: "Expérience Professionnelle", skills: "Compétences", languages: "Langues", certifications: "Certifications", projects: "Projets", add: "Ajouter", degree: "Diplôme", institution: "Établissement", startDate: "Date de Début", endDate: "Date de Fin", jobTitle: "Poste", company: "Entreprise", responsibilitiesLabel: "Responsabilités", languageName: "Langue", level: "Niveau", certName: "Nom de la Certification", certInstitution: "Établissement", certDate: "Date d'Obtention", projectName: "Nom du Projet", projectLink: "Lien (optionnel)", projectDescription: "Description", next: "Suivant: Choisir le Modèle", back: "Retour", noItems: "Aucun élément ajouté. Cliquez sur \"Ajouter\" pour commencer.", addPhoto: "Ajouter Photo", optional: "optionnel",
  }
};

const es: SuggestionsSet = {
  professionalSummaries: [
    "Profesional dedicado con sólida experiencia en [su área], buscando contribuir con habilidades analíticas y creativas.",
    "Especialista en [área] con un historial comprobado de éxito en proyectos desafiantes.",
    "Motivado/a y orientado/a a resultados, con fuerte capacidad de adaptación y aprendizaje rápido.",
    "Profesional experimentado enfocado en innovación, eficiencia y excelencia en atención al cliente.",
    "Recién graduado/a entusiasmado/a por aplicar conocimientos académicos en un entorno profesional."
  ],
  academicDegrees: ["Bachillerato", "Técnico en", "Tecnólogo en", "Licenciatura en", "Maestría en", "MBA en", "Doctorado en", "Postdoctorado en"],
  jobTitles: ["Analista", "Asistente", "Coordinador/a", "Gerente", "Supervisor/a", "Desarrollador/a", "Diseñador/a", "Consultor/a", "Especialista", "Pasante", "Trainee"],
  responsibilities: [
    "Gestión de proyectos y equipos multidisciplinarios",
    "Análisis de datos y elaboración de informes gerenciales",
    "Desarrollo e implementación de estrategias de marketing",
    "Atención y relación con clientes",
    "Control de calidad y procesos operativos"
  ],
  skillsSuggestions: ["Excel Avanzado", "Power BI", "Python", "JavaScript", "Marketing Digital", "SEO/SEM", "Gestión de Proyectos", "Photoshop", "AutoCAD", "Comunicación Efectiva", "Liderazgo", "Trabajo en Equipo", "Resolución de Problemas"],
  languageLevels: ["Básico", "Intermedio", "Avanzado", "Fluido", "Nativo"],
  formLabels: {
    personalData: "Datos Personales", firstName: "Nombre", lastName: "Apellido", email: "Correo electrónico", phone: "Teléfono", location: "Ubicación", cvLanguage: "Idioma del CV", fontSize: "Tamaño de Fuente", fontSmall: "Pequeño", fontMedium: "Mediano", fontLarge: "Grande", summary: "Resumen Profesional", summaryPlaceholder: "O escriba su propio resumen profesional...", selectSuggestion: "Seleccione una sugerencia o escriba la suya", education: "Formación Académica", experience: "Experiencia Profesional", skills: "Habilidades", languages: "Idiomas", certifications: "Certificaciones", projects: "Proyectos", add: "Agregar", degree: "Grado", institution: "Institución", startDate: "Fecha de Inicio", endDate: "Fecha de Finalización", jobTitle: "Cargo", company: "Empresa", responsibilitiesLabel: "Responsabilidades", languageName: "Idioma", level: "Nivel", certName: "Nombre de la Certificación", certInstitution: "Institución", certDate: "Fecha de Obtención", projectName: "Nombre del Proyecto", projectLink: "Enlace (opcional)", projectDescription: "Descripción", next: "Siguiente: Elegir Plantilla", back: "Volver", noItems: "No hay elementos. Haga clic en \"Agregar\" para comenzar.", addPhoto: "Agregar Foto", optional: "opcional",
  }
};

const ar: SuggestionsSet = {
  professionalSummaries: [
    "محترف متخصص ذو خبرة قوية في [مجالك]، يسعى للمساهمة بمهارات تحليلية وإبداعية.",
    "متخصص في [المجال] بسجل حافل من النجاحات في المشاريع المعقدة.",
    "شخص محفز وموجه نحو النتائج، مع قدرة قوية على التكيف والتعلم السريع.",
    "محترف ذو خبرة يركز على الابتكار والكفاءة والتميز في خدمة العملاء.",
    "خريج متحمس يتطلع لتطبيق المعرفة الأكاديمية في بيئة عمل احترافية."
  ],
  academicDegrees: ["شهادة الثانوية", "دبلوم تقني في", "دبلوم في", "بكالوريوس في", "ماجستير في", "ماجستير إدارة أعمال في", "دكتوراه في"],
  jobTitles: ["محلل", "مساعد", "منسق", "مدير", "مشرف", "مطور", "مصمم", "مستشار", "متخصص", "متدرب"],
  responsibilities: [
    "إدارة المشاريع والفرق متعددة التخصصات",
    "تحليل البيانات وإعداد التقارير الإدارية",
    "تطوير وتنفيذ استراتيجيات التسويق",
    "خدمة العملاء وإدارة العلاقات",
    "مراقبة الجودة والعمليات التشغيلية"
  ],
  skillsSuggestions: ["إكسل متقدم", "Power BI", "Python", "JavaScript", "التسويق الرقمي", "تحسين محركات البحث", "إدارة المشاريع", "فوتوشوب", "أوتوكاد", "التواصل الفعال", "القيادة", "العمل الجماعي", "حل المشكلات"],
  languageLevels: ["مبتدئ", "متوسط", "متقدم", "طلاقة", "لغة أم"],
  formLabels: {
    personalData: "البيانات الشخصية", firstName: "الاسم", lastName: "اللقب", email: "البريد الإلكتروني", phone: "الهاتف", location: "الموقع", cvLanguage: "لغة السيرة الذاتية", fontSize: "حجم الخط", fontSmall: "صغير", fontMedium: "متوسط", fontLarge: "كبير", summary: "الملخص المهني", summaryPlaceholder: "أو اكتب ملخصك المهني الخاص...", selectSuggestion: "اختر اقتراحًا أو اكتب ملخصك", education: "التعليم", experience: "الخبرة المهنية", skills: "المهارات", languages: "اللغات", certifications: "الشهادات", projects: "المشاريع", add: "إضافة", degree: "الدرجة", institution: "المؤسسة", startDate: "تاريخ البداية", endDate: "تاريخ الانتهاء", jobTitle: "المسمى الوظيفي", company: "الشركة", responsibilitiesLabel: "المسؤوليات", languageName: "اللغة", level: "المستوى", certName: "اسم الشهادة", certInstitution: "المؤسسة", certDate: "تاريخ الحصول", projectName: "اسم المشروع", projectLink: "رابط (اختياري)", projectDescription: "الوصف", next: "التالي: اختيار القالب", back: "رجوع", noItems: "لا توجد عناصر. انقر على \"إضافة\" للبدء.", addPhoto: "إضافة صورة", optional: "اختياري",
  }
};

const tr: SuggestionsSet = {
  professionalSummaries: [
    "[Alanınızda] güçlü deneyime sahip, analitik ve yaratıcı becerilerle katkıda bulunmayı hedefleyen adanmış bir profesyonel.",
    "[Alan] konusunda zorlayıcı projelerde kanıtlanmış başarı geçmişine sahip uzman.",
    "Güçlü uyum yeteneği ve hızlı öğrenme kapasitesiyle motivasyonu yüksek, sonuç odaklı profesyonel.",
    "İnovasyon, verimlilik ve müşteri hizmeti mükemmelliğine odaklanan deneyimli profesyonel.",
    "Akademik bilgilerini profesyonel ortamda uygulamaya hevesli yeni mezun."
  ],
  academicDegrees: ["Lise Diploması", "Ön Lisans", "Lisans", "Yüksek Lisans", "MBA", "Doktora", "Doktora Sonrası"],
  jobTitles: ["Analist", "Asistan", "Koordinatör", "Müdür", "Süpervizör", "Geliştirici", "Tasarımcı", "Danışman", "Uzman", "Stajyer"],
  responsibilities: [
    "Proje yönetimi ve multidisipliner ekip liderliği",
    "Veri analizi ve yönetim raporları hazırlama",
    "Pazarlama stratejileri geliştirme ve uygulama",
    "Müşteri hizmetleri ve ilişki yönetimi",
    "Kalite kontrol ve operasyonel süreçler"
  ],
  skillsSuggestions: ["İleri Excel", "Power BI", "Python", "JavaScript", "Dijital Pazarlama", "SEO/SEM", "Proje Yönetimi", "Photoshop", "AutoCAD", "Etkili İletişim", "Liderlik", "Takım Çalışması", "Problem Çözme"],
  languageLevels: ["Başlangıç", "Orta", "İleri", "Akıcı", "Ana Dil"],
  formLabels: {
    personalData: "Kişisel Bilgiler", firstName: "Ad", lastName: "Soyad", email: "E-posta", phone: "Telefon", location: "Konum", cvLanguage: "CV Dili", fontSize: "Yazı Boyutu", fontSmall: "Küçük", fontMedium: "Orta", fontLarge: "Büyük", summary: "Profesyonel Özet", summaryPlaceholder: "Veya kendi profesyonel özetinizi yazın...", selectSuggestion: "Bir öneri seçin veya kendiniz yazın", education: "Eğitim", experience: "İş Deneyimi", skills: "Beceriler", languages: "Diller", certifications: "Sertifikalar", projects: "Projeler", add: "Ekle", degree: "Derece", institution: "Kurum", startDate: "Başlangıç Tarihi", endDate: "Bitiş Tarihi", jobTitle: "Pozisyon", company: "Şirket", responsibilitiesLabel: "Sorumluluklar", languageName: "Dil", level: "Seviye", certName: "Sertifika Adı", certInstitution: "Kurum", certDate: "Tamamlanma Tarihi", projectName: "Proje Adı", projectLink: "Bağlantı (isteğe bağlı)", projectDescription: "Açıklama", next: "İleri: Şablon Seçin", back: "Geri", noItems: "Öğe eklenmedi. Başlamak için \"Ekle\"ye tıklayın.", addPhoto: "Fotoğraf Ekle", optional: "isteğe bağlı",
  }
};

const zh: SuggestionsSet = {
  professionalSummaries: [
    "专注于[您的领域]的专业人士，拥有扎实的经验，致力于贡献分析和创造性技能。",
    "[领域]专家，在具有挑战性的项目中拥有成功的记录。",
    "积极主动，以结果为导向，具有较强的适应能力和快速学习能力。",
    "经验丰富的专业人士，专注于创新、效率和卓越的客户服务。",
    "充满热情的应届毕业生，渴望在专业环境中应用学术知识。"
  ],
  academicDegrees: ["高中文凭", "大专学历", "学士学位", "硕士学位", "工商管理硕士", "博士学位", "博士后"],
  jobTitles: ["分析师", "助理", "协调员", "经理", "主管", "开发人员", "设计师", "顾问", "专家", "实习生"],
  responsibilities: [
    "项目管理和多学科团队领导",
    "数据分析和管理报告编写",
    "制定和实施营销策略",
    "客户服务和关系管理",
    "质量控制和运营流程管理"
  ],
  skillsSuggestions: ["高级Excel", "Power BI", "Python", "JavaScript", "数字营销", "SEO/SEM", "项目管理", "Photoshop", "AutoCAD", "有效沟通", "领导力", "团队协作", "问题解决"],
  languageLevels: ["初级", "中级", "高级", "流利", "母语"],
  formLabels: {
    personalData: "个人信息", firstName: "名", lastName: "姓", email: "电子邮件", phone: "电话", location: "地点", cvLanguage: "简历语言", fontSize: "字体大小", fontSmall: "小", fontMedium: "中", fontLarge: "大", summary: "专业简介", summaryPlaceholder: "或撰写您自己的专业简介...", selectSuggestion: "选择一个建议或自己编写", education: "教育背景", experience: "工作经验", skills: "技能", languages: "语言", certifications: "证书", projects: "项目", add: "添加", degree: "学位", institution: "院校", startDate: "开始日期", endDate: "结束日期", jobTitle: "职位", company: "公司", responsibilitiesLabel: "职责", languageName: "语言", level: "水平", certName: "证书名称", certInstitution: "颁发机构", certDate: "获取日期", projectName: "项目名称", projectLink: "链接（可选）", projectDescription: "描述", next: "下一步：选择模板", back: "返回", noItems: "未添加任何项目。点击'添加'开始。", addPhoto: "添加照片", optional: "可选",
  }
};

const de: SuggestionsSet = {
  ...en,
  professionalSummaries: [
    "Engagierter Fachmann mit fundierter Erfahrung in [Ihrem Bereich], der analytische und kreative Fähigkeiten einbringen möchte.",
    "Spezialist in [Bereich] mit nachgewiesener Erfolgsbilanz in anspruchsvollen Projekten.",
    "Motiviert und ergebnisorientiert, mit starker Anpassungsfähigkeit und schneller Lernfähigkeit.",
    "Erfahrener Fachmann mit Fokus auf Innovation, Effizienz und exzellentem Kundenservice.",
    "Begeisterter Absolvent, der akademisches Wissen in einem professionellen Umfeld anwenden möchte."
  ],
  academicDegrees: ["Abitur", "Ausbildung in", "Bachelor in", "Master in", "MBA in", "Promotion in", "Habilitation in"],
  jobTitles: ["Analyst/in", "Assistent/in", "Koordinator/in", "Manager/in", "Teamleiter/in", "Entwickler/in", "Designer/in", "Berater/in", "Spezialist/in", "Praktikant/in"],
  languageLevels: ["Grundkenntnisse", "Mittelstufe", "Fortgeschritten", "Fließend", "Muttersprache"],
  formLabels: {
    personalData: "Persönliche Daten", firstName: "Vorname", lastName: "Nachname", email: "E-Mail", phone: "Telefon", location: "Standort", cvLanguage: "Lebenslauf-Sprache", fontSize: "Schriftgröße", fontSmall: "Klein", fontMedium: "Mittel", fontLarge: "Groß", summary: "Berufliche Zusammenfassung", summaryPlaceholder: "Oder schreiben Sie Ihre eigene berufliche Zusammenfassung...", selectSuggestion: "Wählen Sie einen Vorschlag oder schreiben Sie Ihren eigenen", education: "Ausbildung", experience: "Berufserfahrung", skills: "Fähigkeiten", languages: "Sprachen", certifications: "Zertifikate", projects: "Projekte", add: "Hinzufügen", degree: "Abschluss", institution: "Institution", startDate: "Startdatum", endDate: "Enddatum", jobTitle: "Position", company: "Unternehmen", responsibilitiesLabel: "Aufgaben", languageName: "Sprache", level: "Niveau", certName: "Zertifikatname", certInstitution: "Institution", certDate: "Abschlussdatum", projectName: "Projektname", projectLink: "Link (optional)", projectDescription: "Beschreibung", next: "Weiter: Vorlage wählen", back: "Zurück", noItems: "Keine Einträge. Klicken Sie auf \"Hinzufügen\" um zu beginnen.", addPhoto: "Foto hinzufügen", optional: "optional",
  }
};

const it: SuggestionsSet = {
  ...en,
  professionalSummaries: [
    "Professionista dedicato con solida esperienza in [il tuo campo], alla ricerca di contribuire con competenze analitiche e creative.",
    "Specialista in [campo] con un comprovato track record di successo in progetti impegnativi.",
    "Motivato/a e orientato/a ai risultati, con forte capacità di adattamento e apprendimento rapido.",
    "Professionista esperto focalizzato su innovazione, efficienza ed eccellenza nel servizio clienti.",
    "Neolaureato/a entusiasta desideroso/a di applicare le conoscenze accademiche in un ambiente professionale."
  ],
  academicDegrees: ["Diploma di Maturità", "Diploma Tecnico in", "Laurea Triennale in", "Laurea Magistrale in", "MBA in", "Dottorato in"],
  jobTitles: ["Analista", "Assistente", "Coordinatore/trice", "Manager", "Supervisore", "Sviluppatore/trice", "Designer", "Consulente", "Specialista", "Stagista"],
  languageLevels: ["Base", "Intermedio", "Avanzato", "Fluente", "Madrelingua"],
  formLabels: {
    personalData: "Dati Personali", firstName: "Nome", lastName: "Cognome", email: "Email", phone: "Telefono", location: "Posizione", cvLanguage: "Lingua del CV", fontSize: "Dimensione Carattere", fontSmall: "Piccolo", fontMedium: "Medio", fontLarge: "Grande", summary: "Riepilogo Professionale", summaryPlaceholder: "Oppure scrivi il tuo riepilogo professionale...", selectSuggestion: "Seleziona un suggerimento o scrivi il tuo", education: "Istruzione", experience: "Esperienza Lavorativa", skills: "Competenze", languages: "Lingue", certifications: "Certificazioni", projects: "Progetti", add: "Aggiungi", degree: "Titolo", institution: "Istituto", startDate: "Data di Inizio", endDate: "Data di Fine", jobTitle: "Posizione", company: "Azienda", responsibilitiesLabel: "Responsabilità", languageName: "Lingua", level: "Livello", certName: "Nome Certificazione", certInstitution: "Istituto", certDate: "Data di Ottenimento", projectName: "Nome Progetto", projectLink: "Link (opzionale)", projectDescription: "Descrizione", next: "Avanti: Scegli Modello", back: "Indietro", noItems: "Nessun elemento aggiunto. Clicca su \"Aggiungi\" per iniziare.", addPhoto: "Aggiungi Foto", optional: "opzionale",
  }
};

const ru: SuggestionsSet = {
  ...en,
  professionalSummaries: [
    "Целеустремлённый специалист с опытом работы в [вашей области], стремящийся внести вклад аналитическими и креативными навыками.",
    "Эксперт в [области] с подтверждённым опытом успешной работы над сложными проектами.",
    "Мотивированный и нацеленный на результат, с сильной способностью к адаптации и быстрому обучению.",
    "Опытный профессионал, ориентированный на инновации, эффективность и качество обслуживания.",
    "Энтузиаст-выпускник, стремящийся применить академические знания в профессиональной среде."
  ],
  academicDegrees: ["Аттестат о среднем образовании", "Среднее профессиональное в", "Бакалавриат в", "Магистратура в", "MBA в", "Докторантура в"],
  jobTitles: ["Аналитик", "Ассистент", "Координатор", "Менеджер", "Руководитель", "Разработчик", "Дизайнер", "Консультант", "Специалист", "Стажёр"],
  languageLevels: ["Начальный", "Средний", "Продвинутый", "Свободный", "Родной"],
  formLabels: {
    personalData: "Личные данные", firstName: "Имя", lastName: "Фамилия", email: "Эл. почта", phone: "Телефон", location: "Местоположение", cvLanguage: "Язык резюме", fontSize: "Размер шрифта", fontSmall: "Маленький", fontMedium: "Средний", fontLarge: "Большой", summary: "Профессиональное резюме", summaryPlaceholder: "Или напишите своё профессиональное резюме...", selectSuggestion: "Выберите предложение или напишите своё", education: "Образование", experience: "Опыт работы", skills: "Навыки", languages: "Языки", certifications: "Сертификаты", projects: "Проекты", add: "Добавить", degree: "Степень", institution: "Учреждение", startDate: "Дата начала", endDate: "Дата окончания", jobTitle: "Должность", company: "Компания", responsibilitiesLabel: "Обязанности", languageName: "Язык", level: "Уровень", certName: "Название сертификата", certInstitution: "Учреждение", certDate: "Дата получения", projectName: "Название проекта", projectLink: "Ссылка (необязательно)", projectDescription: "Описание", next: "Далее: Выбрать шаблон", back: "Назад", noItems: "Нет добавленных элементов. Нажмите \"Добавить\" чтобы начать.", addPhoto: "Добавить фото", optional: "необязательно",
  }
};

const sw: SuggestionsSet = {
  ...en,
  professionalSummaries: [
    "Mtaalamu aliyejitolea na uzoefu imara katika [eneo lako], anayetafuta kuchangia ujuzi wa uchambuzi na ubunifu.",
    "Mtaalamu wa [eneo] aliye na rekodi ya mafanikio yaliyothibitishwa katika miradi changamoto.",
    "Mtu mwenye motisha na anayelenga matokeo, aliye na uwezo mkubwa wa kukabiliana na hali na kujifunza haraka.",
    "Mtaalamu mwenye uzoefu anayezingatia uvumbuzi, ufanisi na ubora wa huduma kwa wateja.",
    "Mhitimu mpya mwenye shauku ya kutumia ujuzi wa kitaaluma katika mazingira ya kitaaluma."
  ],
  academicDegrees: ["Cheti cha Sekondari", "Diploma ya Ufundi katika", "Shahada ya Kwanza katika", "Shahada ya Uzamili katika", "MBA katika", "Shahada ya Uzamivu katika"],
  jobTitles: ["Mchambuzi", "Msaidizi", "Mratibu", "Meneja", "Msimamizi", "Msanidi Programu", "Mbuni", "Mshauri", "Mtaalamu", "Mwanafunzi wa Kazi"],
  languageLevels: ["Msingi", "Wastani", "Juu", "Ufasaha", "Lugha ya Mama"],
  formLabels: {
    personalData: "Taarifa Binafsi", firstName: "Jina", lastName: "Jina la Ukoo", email: "Barua pepe", phone: "Simu", location: "Eneo", cvLanguage: "Lugha ya CV", fontSize: "Ukubwa wa Fonti", fontSmall: "Ndogo", fontMedium: "Wastani", fontLarge: "Kubwa", summary: "Muhtasari wa Kitaaluma", summaryPlaceholder: "Au andika muhtasari wako wa kitaaluma...", selectSuggestion: "Chagua pendekezo au andika yako", education: "Elimu", experience: "Uzoefu wa Kazi", skills: "Ujuzi", languages: "Lugha", certifications: "Vyeti", projects: "Miradi", add: "Ongeza", degree: "Shahada", institution: "Taasisi", startDate: "Tarehe ya Kuanza", endDate: "Tarehe ya Kumaliza", jobTitle: "Cheo", company: "Kampuni", responsibilitiesLabel: "Majukumu", languageName: "Lugha", level: "Kiwango", certName: "Jina la Cheti", certInstitution: "Taasisi", certDate: "Tarehe ya Kupata", projectName: "Jina la Mradi", projectLink: "Kiungo (si lazima)", projectDescription: "Maelezo", next: "Ifuatayo: Chagua Kiolezo", back: "Rudi", noItems: "Hakuna kipengee kilichoongezwa. Bonyeza \"Ongeza\" kuanza.", addPhoto: "Ongeza Picha", optional: "si lazima",
  }
};

const allSuggestions: Record<CVLanguage, SuggestionsSet> = { pt, en, fr, zh, es, ar, tr, de, it, ru, sw };

export function getCVSuggestions(lang: CVLanguage): SuggestionsSet {
  return allSuggestions[lang] || allSuggestions.pt;
}

export type { SuggestionsSet };
