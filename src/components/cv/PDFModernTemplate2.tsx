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
import { getFontSizes } from "@/lib/pdfFontSizes";

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

// Modern2: Top header band + two column content
export const PDFModernTemplate2 = ({ data }: Props) => {
  const accentColor = "#7c3aed";
  const accentLight = "#a78bfa";
  const t = cvTranslations[data.cvLanguage || "pt"];
  const locale = data.cvLanguage === "zh" ? "zh-CN" : data.cvLanguage === "fr" ? "fr-FR" : data.cvLanguage === "en" ? "en-US" : "pt-BR";
  const fs = getFontSizes(data.fontSize || "medium");

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Roboto",
      fontSize: fs.body,
    },
    header: {
      backgroundColor: accentColor,
      padding: 25,
      flexDirection: "row",
      alignItems: "center",
      gap: 20,
    },
    photo: {
      width: 70,
      height: 70,
      borderRadius: 35,
      objectFit: "cover",
      borderWidth: 3,
      borderColor: "#ffffff",
    },
    headerContent: {
      flex: 1,
    },
    name: {
      fontSize: fs.name,
      fontWeight: 700,
      color: "#ffffff",
      marginBottom: 3,
    },
    jobTitle: {
      fontSize: fs.jobTitle,
      color: accentLight,
      marginBottom: 8,
    },
    contactRow: {
      flexDirection: "row",
      gap: 15,
    },
    contactItem: {
      fontSize: fs.contact,
      color: "#ffffff",
      opacity: 0.9,
    },
    body: {
      flexDirection: "row",
      padding: 25,
      gap: 20,
    },
    mainColumn: {
      width: "60%",
    },
    sideColumn: {
      width: "40%",
    },
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: fs.sectionTitle,
      fontWeight: 700,
      color: accentColor,
      marginBottom: 8,
      paddingBottom: 3,
      borderBottomWidth: 2,
      borderBottomColor: accentLight,
    },
    summaryText: {
      fontSize: fs.small,
      color: "#475569",
      lineHeight: 1.5,
    },
    itemContainer: {
      marginBottom: 10,
      paddingLeft: 10,
      borderLeftWidth: 2,
      borderLeftColor: accentLight,
    },
    itemTitle: {
      fontSize: fs.jobTitle,
      fontWeight: 700,
      color: "#1e293b",
    },
    itemSubtitle: {
      fontSize: fs.small,
      color: accentColor,
      marginBottom: 2,
    },
    itemDate: {
      fontSize: fs.small - 1,
      color: "#94a3b8",
      marginBottom: 3,
    },
    itemDescription: {
      fontSize: fs.small,
      color: "#475569",
      lineHeight: 1.4,
    },
    skillBadge: {
      backgroundColor: accentColor,
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 10,
      marginBottom: 4,
    },
    skillText: {
      fontSize: fs.small - 1,
      color: "#ffffff",
    },
    langItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
      paddingVertical: 3,
      borderBottomWidth: 1,
      borderBottomColor: "#e2e8f0",
    },
    langName: {
      fontSize: fs.small,
      color: "#374151",
    },
    langLevel: {
      fontSize: fs.small - 1,
      color: accentColor,
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
          {data.photoPreview && (
            <Image src={data.photoPreview} style={styles.photo} />
          )}
          <View style={styles.headerContent}>
            <Text style={styles.name}>{fullName}</Text>
            {jobTitle && <Text style={styles.jobTitle}>{jobTitle}</Text>}
            <View style={styles.contactRow}>
              {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
              {phone && <Text style={styles.contactItem}>{phone}</Text>}
              {data.location && <Text style={styles.contactItem}>{data.location}</Text>}
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.mainColumn}>
            {data.summary && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.aboutMe}</Text>
                <Text style={styles.summaryText}>{data.summary}</Text>
              </View>
            )}

            {data.experience.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.experience}</Text>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.itemContainer}>
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
                <Text style={styles.sectionTitle}>{t.education}</Text>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.itemContainer}>
                    <Text style={styles.itemTitle}>{edu.degree}</Text>
                    <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                    <Text style={styles.itemDate}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate) || t.studying}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.sideColumn}>
            {data.skills.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.skills}</Text>
                {data.skills.map((skill, index) => (
                  <View key={index} style={styles.skillBadge}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.languages.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.languages}</Text>
                {data.languages.map((lang) => (
                  <View key={lang.id} style={styles.langItem}>
                    <Text style={styles.langName}>{lang.name}</Text>
                    <Text style={styles.langLevel}>{lang.level}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.certifications.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.certifications}</Text>
                {data.certifications.map((cert) => (
                  <View key={cert.id} style={{ marginBottom: 6 }}>
                    <Text style={{ fontSize: fs.small, fontWeight: 700, color: "#1e293b" }}>{cert.name}</Text>
                    <Text style={{ fontSize: fs.small - 1, color: "#64748b" }}>{cert.institution}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.projects.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t.projects}</Text>
                {data.projects.map((proj) => (
                  <View key={proj.id} style={{ marginBottom: 6 }}>
                    <Text style={{ fontSize: fs.small, fontWeight: 700, color: "#1e293b" }}>{proj.name}</Text>
                    {proj.description && (
                      <Text style={{ fontSize: fs.small - 1, color: "#475569" }}>{proj.description}</Text>
                    )}
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