import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { CVData } from "@/types/cv";

// Register fonts for better typography
Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf", fontWeight: 400 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: "Roboto",
    fontSize: 10,
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#2563eb",
    paddingBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 700,
    color: "#1e3a5f",
    marginBottom: 5,
  },
  jobTitle: {
    fontSize: 12,
    color: "#64748b",
    marginBottom: 8,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
  },
  contactItem: {
    fontSize: 9,
    color: "#475569",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    color: "#2563eb",
    marginBottom: 8,
    textTransform: "uppercase",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 3,
  },
  summary: {
    fontSize: 10,
    color: "#334155",
    textAlign: "justify",
  },
  experienceItem: {
    marginBottom: 10,
  },
  experienceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 3,
  },
  experienceTitle: {
    fontSize: 11,
    fontWeight: 700,
    color: "#1e293b",
  },
  experienceCompany: {
    fontSize: 10,
    color: "#64748b",
  },
  experienceDate: {
    fontSize: 9,
    color: "#94a3b8",
  },
  experienceDescription: {
    fontSize: 9,
    color: "#475569",
    marginTop: 3,
  },
  educationItem: {
    marginBottom: 8,
  },
  educationDegree: {
    fontSize: 11,
    fontWeight: 700,
    color: "#1e293b",
  },
  educationInstitution: {
    fontSize: 10,
    color: "#64748b",
  },
  educationDate: {
    fontSize: 9,
    color: "#94a3b8",
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
  },
  skillBadge: {
    backgroundColor: "#e0f2fe",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
  },
  skillText: {
    fontSize: 9,
    color: "#0369a1",
  },
  languageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  languageName: {
    fontSize: 10,
    color: "#334155",
  },
  languageLevel: {
    fontSize: 9,
    color: "#64748b",
  },
  certificationItem: {
    marginBottom: 6,
  },
  certificationName: {
    fontSize: 10,
    fontWeight: 700,
    color: "#1e293b",
  },
  certificationDetails: {
    fontSize: 9,
    color: "#64748b",
  },
  projectItem: {
    marginBottom: 8,
  },
  projectName: {
    fontSize: 10,
    fontWeight: 700,
    color: "#1e293b",
  },
  projectDescription: {
    fontSize: 9,
    color: "#475569",
  },
  projectLink: {
    fontSize: 8,
    color: "#2563eb",
  },
  twoColumnLayout: {
    flexDirection: "row",
    gap: 20,
  },
  leftColumn: {
    flex: 2,
  },
  rightColumn: {
    flex: 1,
  },
});

const formatDate = (dateStr: string) => {
  if (!dateStr) return "";
  if (dateStr.toLowerCase() === "presente" || dateStr.toLowerCase() === "atual") return dateStr;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("pt-BR", { month: "short", year: "numeric" });
};

interface PDFDocumentProps {
  data: CVData;
}

export const PDFDocument = ({ data }: PDFDocumentProps) => {
  const fullName = `${data.firstName} ${data.lastName}`;
  const phone = data.phone ? `${data.countryCode} ${data.phone}` : "";
  const jobTitle = data.experience.length > 0 ? data.experience[0].jobTitle : "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{fullName}</Text>
          {jobTitle && <Text style={styles.jobTitle}>{jobTitle}</Text>}
          <View style={styles.contactRow}>
            {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
            {phone && <Text style={styles.contactItem}>{phone}</Text>}
            {data.location && <Text style={styles.contactItem}>{data.location}</Text>}
          </View>
        </View>

        <View style={styles.twoColumnLayout}>
          {/* Left Column */}
          <View style={styles.leftColumn}>
            {/* Summary */}
            {data.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Resumo Profissional</Text>
                <Text style={styles.summary}>{data.summary}</Text>
              </View>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Experiência Profissional</Text>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.experienceItem}>
                    <View style={styles.experienceHeader}>
                      <View>
                        <Text style={styles.experienceTitle}>{exp.jobTitle}</Text>
                        <Text style={styles.experienceCompany}>{exp.company}</Text>
                      </View>
                      <Text style={styles.experienceDate}>
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </Text>
                    </View>
                    {exp.responsibilities && (
                      <Text style={styles.experienceDescription}>{exp.responsibilities}</Text>
                    )}
                  </View>
                ))}
              </View>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.educationItem}>
                    <Text style={styles.educationDegree}>{edu.degree}</Text>
                    <Text style={styles.educationInstitution}>{edu.institution}</Text>
                    <Text style={styles.educationDate}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                    </Text>
                  </View>
                ))}
              </View>
            )}

            {/* Projects */}
            {data.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Projetos</Text>
                {data.projects.map((project) => (
                  <View key={project.id} style={styles.projectItem}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    {project.description && (
                      <Text style={styles.projectDescription}>{project.description}</Text>
                    )}
                    {project.link && <Text style={styles.projectLink}>{project.link}</Text>}
                  </View>
                ))}
              </View>
            )}
          </View>

          {/* Right Column */}
          <View style={styles.rightColumn}>
            {/* Skills */}
            {data.skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Competências</Text>
                <View style={styles.skillsContainer}>
                  {data.skills.map((skill, index) => (
                    <View key={index} style={styles.skillBadge}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Languages */}
            {data.languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Idiomas</Text>
                {data.languages.map((lang) => (
                  <View key={lang.id} style={styles.languageRow}>
                    <Text style={styles.languageName}>{lang.name}</Text>
                    <Text style={styles.languageLevel}>{lang.level}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Certifications */}
            {data.certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Certificações</Text>
                {data.certifications.map((cert) => (
                  <View key={cert.id} style={styles.certificationItem}>
                    <Text style={styles.certificationName}>{cert.name}</Text>
                    <Text style={styles.certificationDetails}>
                      {cert.institution} • {formatDate(cert.date)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};
