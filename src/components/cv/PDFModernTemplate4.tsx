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
import { calculateAutoAdjust, applyAutoAdjustToFonts, applyAutoAdjustToSpacing, applyAutoAdjustToLineHeight, applyAutoAdjustToPadding } from "@/lib/pdfAutoAdjust";

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
  const baseFonts = getFontSizes(data.fontSize || "medium");
  const autoAdjust = calculateAutoAdjust(data);
  const fs = applyAutoAdjustToFonts(baseFonts, autoAdjust);

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Roboto",
      fontSize: fs.body,
      padding: 0,
    },
    header: {
      backgroundColor: accentColor,
      padding: 18,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    headerLeft: {
      flex: 1,
    },
    name: {
      fontSize: fs.name + 2,
      fontWeight: 700,
      color: "#ffffff",
      marginBottom: 2,
    },
    jobTitle: {
      fontSize: fs.sectionTitle,
      color: bgLight,
      marginBottom: 6,
    },
    contactRow: {
      flexDirection: "row",
      gap: 10,
      flexWrap: "wrap",
    },
    contactItem: {
      fontSize: fs.contact,
      color: "#ffffff",
      opacity: 0.9,
    },
    photo: {
      width: 70,
      height: 70,
      borderRadius: 6,
      objectFit: "cover",
      borderWidth: 2,
      borderColor: "#ffffff",
    },
    body: {
      padding: applyAutoAdjustToPadding(18, autoAdjust),
    },
    section: {
      marginBottom: applyAutoAdjustToSpacing(12, autoAdjust),
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: applyAutoAdjustToSpacing(6, autoAdjust),
    },
    sectionTitle: {
      fontSize: fs.sectionTitle,
      fontWeight: 700,
      color: accentColor,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    summaryBox: {
      backgroundColor: bgLight,
      padding: applyAutoAdjustToPadding(10, autoAdjust),
      borderRadius: 5,
      borderLeftWidth: 3,
      borderLeftColor: accentColor,
    },
    summaryText: {
      fontSize: fs.body,
      color: "#475569",
      lineHeight: applyAutoAdjustToLineHeight(1.5, autoAdjust),
    },
    cardsRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: applyAutoAdjustToSpacing(8, autoAdjust),
    },
    expCard: {
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#e2e8f0",
      borderRadius: 5,
      padding: applyAutoAdjustToPadding(10, autoAdjust),
      marginBottom: applyAutoAdjustToSpacing(6, autoAdjust),
      borderTopWidth: 2,
      borderTopColor: accentColor,
    },
    itemTitle: {
      fontSize: fs.jobTitle,
      fontWeight: 700,
      color: "#1e293b",
      marginBottom: 1,
    },
    itemSubtitle: {
      fontSize: fs.small,
      color: accentColor,
      fontWeight: 700,
      marginBottom: 1,
    },
    itemDate: {
      fontSize: fs.small - 1,
      color: "#94a3b8",
      marginBottom: 3,
    },
    itemDescription: {
      fontSize: fs.small,
      color: "#475569",
      lineHeight: 1.3,
    },
    threeColumns: {
      flexDirection: "row",
      gap: 12,
    },
    column: {
      flex: 1,
    },
    skillTag: {
      backgroundColor: accentColor,
      color: "#ffffff",
      fontSize: fs.small - 1,
      paddingHorizontal: 6,
      paddingVertical: 3,
      borderRadius: 3,
      marginBottom: 3,
      marginRight: 3,
    },
    skillsWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    langItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 3,
    },
    langDot: {
      width: 5,
      height: 5,
      borderRadius: 3,
      backgroundColor: accentColor,
      marginRight: 5,
    },
    langText: {
      fontSize: fs.small,
      color: "#374151",
    },
    certItem: {
      marginBottom: 4,
      paddingBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: "#e2e8f0",
    },
    certName: {
      fontSize: fs.small,
      fontWeight: 700,
      color: "#1e293b",
    },
    certInst: {
      fontSize: fs.small - 1,
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
              {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
              {phone && <Text style={styles.contactItem}>{phone}</Text>}
              {data.location && <Text style={styles.contactItem}>{data.location}</Text>}
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
                <Text style={[styles.sectionTitle, { marginBottom: 6 }]}>{t.skills}</Text>
                <View style={styles.skillsWrap}>
                  {data.skills.map((skill, index) => (
                    <Text key={index} style={styles.skillTag}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}

            {data.languages.length > 0 && (
              <View style={styles.column}>
                <Text style={[styles.sectionTitle, { marginBottom: 6 }]}>{t.languages}</Text>
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
                <Text style={[styles.sectionTitle, { marginBottom: 6 }]}>{t.certifications}</Text>
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
            <View style={[styles.section, { marginTop: 10 }]}>
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
