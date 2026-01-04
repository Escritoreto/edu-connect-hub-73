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
import { cvTranslations } from "@/lib/cvTranslations";

Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf", fontWeight: 400 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: 700 },
  ],
});

interface Props {
  data: CVData;
}

// Modern4: Full-width sections with orange cards
export const PDFModernTemplate4 = ({ data }: Props) => {
  const accentColor = "#ea580c";
  const accentLight = "#fb923c";
  const bgLight = "#fff7ed";
  const t = cvTranslations[data.cvLanguage || "pt"];
  const locale = data.cvLanguage === "zh" ? "zh-CN" : data.cvLanguage === "fr" ? "fr-FR" : data.cvLanguage === "en" ? "en-US" : "pt-BR";

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Roboto",
      fontSize: 10,
      padding: 0,
    },
    header: {
      backgroundColor: accentColor,
      padding: 25,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerLeft: {
      flex: 1,
    },
    name: {
      fontSize: 28,
      fontWeight: 700,
      color: "#ffffff",
      marginBottom: 3,
    },
    jobTitle: {
      fontSize: 13,
      color: bgLight,
      marginBottom: 8,
    },
    contactRow: {
      flexDirection: "row",
      gap: 12,
      flexWrap: "wrap",
    },
    contactItem: {
      fontSize: 9,
      color: "#ffffff",
      opacity: 0.9,
    },
    photo: {
      width: 80,
      height: 80,
      borderRadius: 8,
      objectFit: "cover",
      borderWidth: 3,
      borderColor: "#ffffff",
    },
    body: {
      padding: 25,
    },
    section: {
      marginBottom: 18,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    sectionIcon: {
      width: 24,
      height: 24,
      backgroundColor: accentColor,
      borderRadius: 4,
      marginRight: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    sectionTitle: {
      fontSize: 13,
      fontWeight: 700,
      color: accentColor,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    summaryBox: {
      backgroundColor: bgLight,
      padding: 12,
      borderRadius: 6,
      borderLeftWidth: 4,
      borderLeftColor: accentColor,
    },
    summaryText: {
      fontSize: 10,
      color: "#475569",
      lineHeight: 1.6,
    },
    cardsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
    },
    expCard: {
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#e2e8f0",
      borderRadius: 6,
      padding: 12,
      marginBottom: 8,
      borderTopWidth: 3,
      borderTopColor: accentColor,
    },
    itemTitle: {
      fontSize: 11,
      fontWeight: 700,
      color: "#1e293b",
      marginBottom: 2,
    },
    itemSubtitle: {
      fontSize: 9,
      color: accentColor,
      fontWeight: 700,
      marginBottom: 2,
    },
    itemDate: {
      fontSize: 8,
      color: "#94a3b8",
      marginBottom: 4,
    },
    itemDescription: {
      fontSize: 9,
      color: "#475569",
      lineHeight: 1.4,
    },
    threeColumns: {
      flexDirection: "row",
      gap: 15,
    },
    column: {
      flex: 1,
    },
    skillTag: {
      backgroundColor: accentColor,
      color: "#ffffff",
      fontSize: 8,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 3,
      marginBottom: 4,
      marginRight: 4,
    },
    skillsWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    langItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 4,
    },
    langDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: accentColor,
      marginRight: 6,
    },
    langText: {
      fontSize: 9,
      color: "#374151",
    },
    certItem: {
      marginBottom: 6,
      paddingBottom: 6,
      borderBottomWidth: 1,
      borderBottomColor: "#e2e8f0",
    },
    certName: {
      fontSize: 9,
      fontWeight: 700,
      color: "#1e293b",
    },
    certInst: {
      fontSize: 8,
      color: "#64748b",
    },
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    if (dateStr.toLowerCase() === "presente" || dateStr.toLowerCase() === "atual") return t.present;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString(locale, { month: "short", year: "numeric" });
  };

  const fullName = `${data.firstName} ${data.lastName}`;
  const phone = data.phone ? `${data.countryCode} ${data.phone}` : "";
  const jobTitle = data.experience.length > 0 ? data.experience[0].jobTitle : "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>{fullName}</Text>
            {jobTitle && <Text style={styles.jobTitle}>{jobTitle}</Text>}
            <View style={styles.contactRow}>
              {data.email && <Text style={styles.contactItem}>✉ {data.email}</Text>}
              {phone && <Text style={styles.contactItem}>☎ {phone}</Text>}
              {data.location && <Text style={styles.contactItem}>📍 {data.location}</Text>}
            </View>
          </View>
          {data.photoPreview && (
            <Image src={data.photoPreview} style={styles.photo} />
          )}
        </View>

        <View style={styles.body}>
          {data.summary && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{t.aboutMe}</Text>
              </View>
              <View style={styles.summaryBox}>
                <Text style={styles.summaryText}>{data.summary}</Text>
              </View>
            </View>
          )}

          {data.experience.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{t.experience}</Text>
              </View>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.expCard}>
                  <Text style={styles.itemTitle}>{exp.jobTitle}</Text>
                  <Text style={styles.itemSubtitle}>{exp.company}</Text>
                  <Text style={styles.itemDate}>
                    {formatDate(exp.startDate)} - {formatDate(exp.endDate) || t.present}
                  </Text>
                  {exp.responsibilities && (
                    <Text style={styles.itemDescription}>{exp.responsibilities}</Text>
                  )}
                </View>
              ))}
            </View>
          )}

          {data.education.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{t.education}</Text>
              </View>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.expCard}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                  <Text style={styles.itemDate}>
                    {formatDate(edu.startDate)} - {formatDate(edu.endDate) || t.studying}
                  </Text>
                </View>
              ))}
            </View>
          )}

          <View style={styles.threeColumns}>
            {data.skills.length > 0 && (
              <View style={styles.column}>
                <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>{t.skills}</Text>
                <View style={styles.skillsWrap}>
                  {data.skills.map((skill, index) => (
                    <Text key={index} style={styles.skillTag}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}

            {data.languages.length > 0 && (
              <View style={styles.column}>
                <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>{t.languages}</Text>
                {data.languages.map((lang) => (
                  <View key={lang.id} style={styles.langItem}>
                    <View style={styles.langDot} />
                    <Text style={styles.langText}>{lang.name} - {lang.level}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.certifications.length > 0 && (
              <View style={styles.column}>
                <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>{t.certifications}</Text>
                {data.certifications.map((cert) => (
                  <View key={cert.id} style={styles.certItem}>
                    <Text style={styles.certName}>{cert.name}</Text>
                    <Text style={styles.certInst}>{cert.institution}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          {data.projects.length > 0 && (
            <View style={[styles.section, { marginTop: 15 }]}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{t.projects}</Text>
              </View>
              <View style={styles.cardsRow}>
                {data.projects.map((proj) => (
                  <View key={proj.id} style={[styles.expCard, { width: "48%" }]}>
                    <Text style={styles.itemTitle}>{proj.name}</Text>
                    {proj.description && (
                      <Text style={styles.itemDescription}>{proj.description}</Text>
                    )}
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};
