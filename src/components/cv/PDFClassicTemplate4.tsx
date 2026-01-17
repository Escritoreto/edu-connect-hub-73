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

// Classic4: Purple with cards and gradient-like background sections
export const PDFClassicTemplate4 = ({ data }: Props) => {
  const accentColor = "#7c3aed";
  const accentLight = "#c4b5fd";
  const bgLight = "#faf5ff";
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
      backgroundColor: bgLight,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      paddingHorizontal: 20,
      borderBottomWidth: 3,
      borderBottomColor: accentColor,
      backgroundColor: "#ffffff",
    },
    headerContent: {
      flex: 1,
    },
    photo: {
      width: 65,
      height: 65,
      borderRadius: 6,
      objectFit: "cover",
      borderWidth: 2,
      borderColor: accentColor,
    },
    name: {
      fontSize: fs.name,
      fontWeight: 700,
      color: accentColor,
      marginBottom: 2,
    },
    jobTitle: {
      fontSize: fs.sectionTitle,
      color: "#64748b",
      fontStyle: "italic",
      marginBottom: 6,
    },
    contactBar: {
      backgroundColor: accentLight,
      paddingVertical: 6,
      paddingHorizontal: 20,
      flexDirection: "row",
      justifyContent: "center",
      gap: 15,
      flexWrap: "wrap",
    },
    contactItem: {
      fontSize: fs.small,
      color: "#1e293b",
    },
    body: {
      padding: applyAutoAdjustToPadding(15, autoAdjust),
      paddingHorizontal: applyAutoAdjustToPadding(20, autoAdjust),
    },
    threeColumn: {
      flexDirection: "row",
      gap: applyAutoAdjustToSpacing(12, autoAdjust),
    },
    mainColumn: {
      width: "66%",
    },
    sideColumn: {
      width: "34%",
    },
    section: {
      marginBottom: applyAutoAdjustToSpacing(10, autoAdjust),
    },
    sectionTitle: {
      fontSize: fs.sectionTitle,
      fontWeight: 700,
      color: accentColor,
      marginBottom: applyAutoAdjustToSpacing(6, autoAdjust),
    },
    summaryBox: {
      backgroundColor: "#ffffff",
      padding: applyAutoAdjustToPadding(8, autoAdjust),
      borderRadius: 4,
      borderLeftWidth: 3,
      borderLeftColor: accentColor,
    },
    summaryText: {
      fontSize: fs.small,
      color: "#475569",
      lineHeight: applyAutoAdjustToLineHeight(1.5, autoAdjust),
      fontStyle: "italic",
    },
    expCard: {
      backgroundColor: "#ffffff",
      padding: applyAutoAdjustToPadding(8, autoAdjust),
      borderRadius: 4,
      marginBottom: applyAutoAdjustToSpacing(6, autoAdjust),
      borderTopWidth: 2,
      borderTopColor: accentColor,
    },
    itemTitle: {
      fontSize: fs.jobTitle,
      fontWeight: 700,
      color: "#1e293b",
    },
    itemSubtitle: {
      fontSize: fs.small,
      color: accentColor,
      fontWeight: 700,
      marginBottom: 2,
    },
    itemDate: {
      fontSize: fs.small - 1,
      color: "#94a3b8",
      marginBottom: 4,
    },
    itemDescription: {
      fontSize: fs.small,
      color: "#475569",
      lineHeight: 1.4,
    },
    sideCard: {
      backgroundColor: "#ffffff",
      padding: 8,
      borderRadius: 4,
      marginBottom: 8,
    },
    skillBadge: {
      backgroundColor: accentColor,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 4,
      marginBottom: 4,
    },
    skillText: {
      fontSize: fs.small - 1,
      color: "#ffffff",
      textAlign: "center",
      fontWeight: 700,
    },
    langItem: {
      marginBottom: 5,
    },
    langName: {
      fontSize: fs.small,
      fontWeight: 700,
      color: "#1e293b",
    },
    langLevel: {
      fontSize: fs.small - 1,
      color: accentColor,
    },
    certItem: {
      marginBottom: 6,
      paddingBottom: 6,
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
    return date.toLocaleDateString(locale, { month: "long", year: "numeric" });
  };

  const fullName = `${data.firstName} ${data.lastName}`;
  const phone = data.phone ? `${data.countryCode} ${data.phone}` : "";
  const jobTitle = data.experience.length > 0 ? data.experience[0].jobTitle : "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.name}>{fullName}</Text>
            {jobTitle && <Text style={styles.jobTitle}>{jobTitle}</Text>}
          </View>
          {data.photoPreview && (
            <Image src={data.photoPreview} style={styles.photo} />
          )}
        </View>

        <View style={styles.contactBar}>
          {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
          {phone && <Text style={styles.contactItem}>{phone}</Text>}
          {data.location && <Text style={styles.contactItem}>{data.location}</Text>}
        </View>

        <View style={styles.body}>
          {data.summary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.professionalSummary}</Text>
              <View style={styles.summaryBox}>
                <Text style={styles.summaryText}>{data.summary}</Text>
              </View>
            </View>
          )}

          <View style={styles.threeColumn}>
            <View style={styles.mainColumn}>
              {data.experience.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t.experience}</Text>
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
                  <Text style={styles.sectionTitle}>{t.education}</Text>
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

              {data.projects.length > 0 && (
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>{t.projects}</Text>
                  {data.projects.map((proj) => (
                    <View key={proj.id} style={styles.expCard}>
                      <Text style={styles.itemTitle}>{proj.name}</Text>
                      {proj.description && (
                        <Text style={styles.itemDescription}>{proj.description}</Text>
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>

            <View style={styles.sideColumn}>
              {data.skills.length > 0 && (
                <View style={styles.sideCard}>
                  <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>{t.skills}</Text>
                  {data.skills.map((skill, index) => (
                    <View key={index} style={styles.skillBadge}>
                      <Text style={styles.skillText}>{skill}</Text>
                    </View>
                  ))}
                </View>
              )}

              {data.languages.length > 0 && (
                <View style={styles.sideCard}>
                  <Text style={[styles.sectionTitle, { marginBottom: 8 }]}>{t.languages}</Text>
                  {data.languages.map((lang) => (
                    <View key={lang.id} style={styles.langItem}>
                      <Text style={styles.langName}>{lang.name}</Text>
                      <Text style={styles.langLevel}>{lang.level}</Text>
                    </View>
                  ))}
                </View>
              )}

              {data.certifications.length > 0 && (
                <View style={styles.sideCard}>
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
          </View>
        </View>
      </Page>
    </Document>
  );
};