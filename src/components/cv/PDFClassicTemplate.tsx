import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
} from "@react-pdf/renderer";
import { CVData } from "@/types/cv";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf", fontWeight: 400 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: 700 },
  ],
});

const getAccentColor = (templateId: string) => {
  switch (templateId) {
    case "classic2": return "#2563eb"; // blue
    case "classic3": return "#16a34a"; // green
    case "classic4": return "#7c3aed"; // purple
    default: return "#1f2937"; // dark gray/black
  }
};

interface Props {
  data: CVData;
  templateId: string;
}

export const PDFClassicTemplate = ({ data, templateId }: Props) => {
  const accentColor = getAccentColor(templateId);

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Roboto",
      fontSize: 10,
      padding: 35,
    },
    header: {
      textAlign: "center",
      borderBottomWidth: 3,
      borderBottomColor: accentColor,
      paddingBottom: 12,
      marginBottom: 15,
    },
    name: {
      fontSize: 26,
      fontWeight: 700,
      color: accentColor,
      marginBottom: 3,
    },
    jobTitle: {
      fontSize: 12,
      color: "#64748b",
      fontStyle: "italic",
      marginBottom: 8,
    },
    contactRow: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 15,
    },
    contactItem: {
      fontSize: 9,
      color: "#64748b",
    },
    section: {
      marginBottom: 12,
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: 700,
      color: accentColor,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 8,
    },
    summaryText: {
      fontSize: 10,
      color: "#475569",
      lineHeight: 1.5,
      textAlign: "justify",
    },
    experienceContainer: {
      borderLeftWidth: 3,
      borderLeftColor: "#d1d5db",
      paddingLeft: 12,
    },
    itemContainer: {
      marginBottom: 10,
    },
    itemTitle: {
      fontSize: 11,
      fontWeight: 700,
      color: accentColor,
    },
    itemSubtitle: {
      fontSize: 10,
      color: "#64748b",
      fontStyle: "italic",
      marginBottom: 2,
    },
    itemDate: {
      fontSize: 8,
      color: "#94a3b8",
      marginBottom: 3,
    },
    itemDescription: {
      fontSize: 9,
      color: "#475569",
      lineHeight: 1.4,
      textAlign: "justify",
    },
    twoColumnRow: {
      flexDirection: "row",
      gap: 20,
    },
    column: {
      flex: 1,
    },
    skillRow: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 3,
    },
    bullet: {
      width: 4,
      height: 4,
      backgroundColor: accentColor,
      borderRadius: 2,
      marginRight: 6,
    },
    skillText: {
      fontSize: 9,
      color: "#475569",
    },
    certGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    certItem: {
      width: "48%",
    },
    certName: {
      fontSize: 10,
      fontWeight: 700,
      color: "#1e293b",
    },
    certInstitution: {
      fontSize: 8,
      color: "#64748b",
    },
    photo: {
      width: 90,
      height: 90,
      borderRadius: 45,
      marginBottom: 12,
      alignSelf: "center",
      objectFit: "cover",
    },
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    if (dateStr.toLowerCase() === "presente" || dateStr.toLowerCase() === "atual") return dateStr;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  };

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

        {/* Photo */}
        {data.photoPreview && (
          <View style={{ alignItems: "center", marginBottom: 12 }}>
            <Image src={data.photoPreview} style={styles.photo} />
          </View>
        )}

        {/* Summary */}
        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Resumo Profissional</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Experiência Profissional</Text>
            <View style={styles.experienceContainer}>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.itemContainer}>
                  <Text style={styles.itemTitle}>{exp.jobTitle}</Text>
                  <Text style={styles.itemSubtitle}>{exp.company}</Text>
                  <Text style={styles.itemDate}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate) || "Presente"}
                  </Text>
                  {exp.responsibilities && (
                    <Text style={styles.itemDescription}>{exp.responsibilities}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Formação Acadêmica</Text>
            <View style={styles.experienceContainer}>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.itemContainer}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                  <Text style={styles.itemDate}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate) || "Cursando"}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Skills and Languages */}
        <View style={styles.twoColumnRow}>
          {data.skills.length > 0 && (
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Habilidades</Text>
              {data.skills.map((skill, index) => (
                <View key={index} style={styles.skillRow}>
                  <View style={styles.bullet} />
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          )}
          {data.languages.length > 0 && (
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>Idiomas</Text>
              {data.languages.map((lang) => (
                <View key={lang.id} style={styles.skillRow}>
                  <View style={styles.bullet} />
                  <Text style={styles.skillText}>{lang.name} - {lang.level}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Certifications */}
        {data.certifications.length > 0 && (
          <View style={[styles.section, { marginTop: 12 }]}>
            <Text style={styles.sectionTitle}>Certificações</Text>
            <View style={styles.certGrid}>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certItem}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  <Text style={styles.certInstitution}>{cert.institution}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Projects */}
        {data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projetos</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.itemContainer}>
                <Text style={styles.certName}>{proj.name}</Text>
                {proj.description && (
                  <Text style={{ fontSize: 9, color: "#475569" }}>{proj.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};
