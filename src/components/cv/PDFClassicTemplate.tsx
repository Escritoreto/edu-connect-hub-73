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

const getAccentColor = (templateId: string) => {
  switch (templateId) {
    case "classic2": return "#2563eb";
    case "classic3": return "#16a34a";
    case "classic4": return "#7c3aed";
    default: return "#1f2937";
  }
};

interface Props {
  data: CVData;
  templateId: string;
}

export const PDFClassicTemplate = ({ data, templateId }: Props) => {
  const accentColor = getAccentColor(templateId);
  const t = cvTranslations[data.cvLanguage || "pt"];
  const locale = data.cvLanguage === "zh" ? "zh-CN" : data.cvLanguage === "fr" ? "fr-FR" : data.cvLanguage === "en" ? "en-US" : "pt-BR";
  const baseFonts = getFontSizes(data.fontSize || "medium");
  const autoAdjust = calculateAutoAdjust(data);
  const fs = applyAutoAdjustToFonts(baseFonts, autoAdjust);

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Roboto",
      fontSize: fs.body,
      padding: applyAutoAdjustToPadding(20, autoAdjust),
      paddingBottom: applyAutoAdjustToPadding(15, autoAdjust),
    },
    header: {
      textAlign: "center",
      borderBottomWidth: 3,
      borderBottomColor: accentColor,
      paddingBottom: 8,
      marginBottom: 10,
    },
    name: {
      fontSize: fs.name,
      fontWeight: 700,
      color: accentColor,
      marginBottom: 3,
    },
    jobTitle: {
      fontSize: fs.jobTitle,
      color: "#64748b",
      fontStyle: "italic",
      marginBottom: 8,
    },
    contactRow: {
      flexDirection: "row",
      justifyContent: "center",
      flexWrap: "wrap",
    },
    contactItem: {
      fontSize: fs.contact,
      marginHorizontal: 8,
      color: "#64748b",
    },
    section: {
      marginBottom: applyAutoAdjustToSpacing(8, autoAdjust),
    },
    sectionTitle: {
      fontSize: fs.sectionTitle,
      fontWeight: 700,
      color: accentColor,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: applyAutoAdjustToSpacing(5, autoAdjust),
    },
    summaryText: {
      fontSize: fs.body,
      color: "#475569",
      lineHeight: applyAutoAdjustToLineHeight(1.5, autoAdjust),
      textAlign: "justify",
    },
    experienceContainer: {
      borderLeftWidth: 3,
      borderLeftColor: "#d1d5db",
      paddingLeft: applyAutoAdjustToPadding(12, autoAdjust),
    },
    itemContainer: {
      marginBottom: applyAutoAdjustToSpacing(6, autoAdjust),
    },
    itemTitle: {
      fontSize: fs.jobTitle,
      fontWeight: 700,
      color: accentColor,
    },
    itemSubtitle: {
      fontSize: fs.body,
      color: "#64748b",
      fontStyle: "italic",
      marginBottom: applyAutoAdjustToSpacing(2, autoAdjust),
    },
    itemDate: {
      fontSize: fs.small,
      color: "#94a3b8",
      marginBottom: applyAutoAdjustToSpacing(3, autoAdjust),
    },
    itemDescription: {
      fontSize: fs.small,
      color: "#475569",
      lineHeight: applyAutoAdjustToLineHeight(1.4, autoAdjust),
      textAlign: "justify",
    },
    twoColumnRow: {
      flexDirection: "row",
    },
    column: {
      flex: 1,
      marginRight: 10,
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
      fontSize: fs.small,
      color: "#475569",
    },
    certGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    certItem: {
      width: "48%",
      marginBottom: 6,
      marginRight: 4,
    },
    certName: {
      fontSize: fs.body,
      fontWeight: 700,
      color: "#1e293b",
    },
    certInstitution: {
      fontSize: fs.small,
      color: "#64748b",
    },
    photo: {
      width: 70,
      height: 70,
      borderRadius: 35,
      marginBottom: 8,
      alignSelf: "center",
      objectFit: "cover",
    },
  });

  const formatDate = (dateStr: string | undefined | null): string => {
    if (!dateStr) return "";
    if (dateStr.toLowerCase() === "presente" || dateStr.toLowerCase() === "atual") return t.present;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString(locale, { month: "long", year: "numeric" });
  };

  const formatDateRange = (startDate: string | undefined | null, endDate: string | undefined | null, fallback: string): string => {
    const start = formatDate(startDate);
    const end = formatDate(endDate) || fallback;
    if (!start && !end) return "";
    if (!start) return end;
    return `${start} - ${end}`;
  };

  const fullName = `${data.firstName} ${data.lastName}`;
  const phone = data.phone ? `${data.countryCode} ${data.phone}` : "";
  const jobTitle = data.experience.length > 0 ? data.experience[0].jobTitle : "";

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header} wrap={false}>
          <Text style={styles.name}>{fullName}</Text>
          {jobTitle && <Text style={styles.jobTitle}>{jobTitle}</Text>}
          <View style={styles.contactRow}>
            {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
            {phone && <Text style={styles.contactItem}>{phone}</Text>}
            {data.location && <Text style={styles.contactItem}>{data.location}</Text>}
          </View>
        </View>

        {data.photoPreview && (
          <View style={{ alignItems: "center", marginBottom: 8 }} wrap={false}>
            <Image src={data.photoPreview} style={styles.photo} />
          </View>
        )}

        {data.summary && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.sectionTitle}>{t.professionalSummary}</Text>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        )}

        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.experience}</Text>
            <View style={styles.experienceContainer}>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.itemContainer} wrap={false}>
                  <Text style={styles.itemTitle}>{exp.jobTitle}</Text>
                  <Text style={styles.itemSubtitle}>{exp.company}</Text>
                  <Text style={styles.itemDate}>
                    {formatDateRange(exp.startDate, exp.endDate, t.present)}
                  </Text>
                  {exp.responsibilities && (
                    <Text style={styles.itemDescription}>{exp.responsibilities}</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {data.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.education}</Text>
            <View style={styles.experienceContainer}>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.itemContainer} wrap={false}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                  <Text style={styles.itemDate}>
                    {formatDateRange(edu.startDate, edu.endDate, t.studying)}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={styles.twoColumnRow} wrap={false}>
          {data.skills.length > 0 && (
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>{t.skills}</Text>
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
              <Text style={styles.sectionTitle}>{t.languages}</Text>
              {data.languages.map((lang) => (
                <View key={lang.id} style={styles.skillRow}>
                  <View style={styles.bullet} />
                  <Text style={styles.skillText}>{lang.name || ""}{lang.name && lang.level ? " - " : ""}{lang.level || ""}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {data.certifications.length > 0 && (
          <View style={[styles.section, { marginTop: 8 }]}>
            <Text style={styles.sectionTitle}>{t.certifications}</Text>
            <View style={styles.certGrid}>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certItem} wrap={false}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  <Text style={styles.certInstitution}>{cert.institution}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {data.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.projects}</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.itemContainer} wrap={false}>
                <Text style={styles.certName}>{proj.name}</Text>
                {proj.description && (
                  <Text style={{ fontSize: fs.small, color: "#475569" }}>{proj.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};