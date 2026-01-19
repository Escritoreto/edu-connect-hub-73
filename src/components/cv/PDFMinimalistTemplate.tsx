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
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf", fontWeight: 300 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf", fontWeight: 400 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: 700 },
  ],
});

const getAccentColor = (templateId: string) => {
  switch (templateId) {
    case "minimalist2": return "#2563eb";
    case "minimalist3": return "#16a34a";
    case "minimalist4": return "#7c3aed";
    default: return "#6b7280";
  }
};

interface Props {
  data: CVData;
  templateId: string;
}

export const PDFMinimalistTemplate = ({ data, templateId }: Props) => {
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
      marginBottom: 12,
    },
    headerRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    nameContainer: {
      flex: 1,
    },
    firstName: {
      fontSize: fs.name + 6,
      fontWeight: 300,
      color: "#374151",
    },
    lastName: {
      fontSize: fs.name + 6,
      fontWeight: 700,
      color: "#111827",
      marginBottom: 5,
    },
    jobTitle: {
      fontSize: fs.jobTitle,
      color: "#6b7280",
      fontWeight: 300,
      textTransform: "uppercase",
      letterSpacing: 2,
    },
    divider: {
      height: 1,
      backgroundColor: "#d1d5db",
      marginVertical: 10,
    },
    contactRow: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    contactItem: {
      fontSize: fs.contact,
      color: "#6b7280",
      fontWeight: 300,
      marginRight: 15,
    },
    section: {
      marginBottom: applyAutoAdjustToSpacing(10, autoAdjust),
    },
    sectionTitle: {
      fontSize: fs.sectionTitle,
      fontWeight: 700,
      color: "#111827",
      textTransform: "uppercase",
      letterSpacing: 2,
      marginBottom: applyAutoAdjustToSpacing(6, autoAdjust),
    },
    summaryText: {
      fontSize: fs.body,
      color: "#4b5563",
      fontWeight: 300,
      lineHeight: applyAutoAdjustToLineHeight(1.6, autoAdjust),
    },
    itemContainer: {
      marginBottom: applyAutoAdjustToSpacing(6, autoAdjust),
    },
    itemRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: applyAutoAdjustToSpacing(3, autoAdjust),
    },
    itemTitle: {
      fontSize: fs.jobTitle,
      fontWeight: 400,
      color: "#374151",
    },
    itemDate: {
      fontSize: fs.small,
      color: "#9ca3af",
      fontWeight: 300,
    },
    itemSubtitle: {
      fontSize: fs.small,
      color: "#6b7280",
      fontWeight: 300,
      marginBottom: applyAutoAdjustToSpacing(3, autoAdjust),
    },
    itemDescription: {
      fontSize: fs.small,
      color: "#4b5563",
      fontWeight: 300,
      lineHeight: applyAutoAdjustToLineHeight(1.5, autoAdjust),
    },
    threeColumnRow: {
      flexDirection: "row",
    },
    column: {
      flex: 1,
      marginRight: 12,
    },
    skillBadge: {
      borderWidth: 1,
      borderColor: accentColor,
      paddingHorizontal: 8,
      paddingVertical: 3,
      marginBottom: 4,
      marginRight: 4,
    },
    skillText: {
      fontSize: fs.small,
      color: "#374151",
      fontWeight: 300,
    },
    skillsWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    langText: {
      fontSize: fs.small,
      color: "#4b5563",
      fontWeight: 300,
      marginBottom: 3,
    },
    certName: {
      fontSize: fs.small,
      fontWeight: 400,
      color: "#374151",
    },
    certInstitution: {
      fontSize: fs.small - 1,
      color: "#6b7280",
      fontWeight: 300,
    },
    photo: {
      width: 60,
      height: 60,
      objectFit: "cover",
    },
  });

  const formatDate = (dateStr: string | undefined | null): string => {
    if (!dateStr) return "";
    if (dateStr.toLowerCase() === "presente" || dateStr.toLowerCase() === "atual") return t.present;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString(locale, { month: "short", year: "numeric" });
  };

  const formatDateRange = (startDate: string | undefined | null, endDate: string | undefined | null, fallback: string): string => {
    const start = formatDate(startDate);
    const end = formatDate(endDate) || fallback;
    if (!start && !end) return "";
    if (!start) return end;
    return `${start} - ${end}`;
  };

  const phone = data.phone ? `${data.countryCode} ${data.phone}` : "";
  const jobTitle = data.experience.length > 0 ? data.experience[0].jobTitle : "";

  return (
    <Document>
      <Page size="A4" style={styles.page} wrap>
        <View style={styles.header} wrap={false}>
          <View style={styles.headerRow}>
            <View style={styles.nameContainer}>
              <Text style={styles.firstName}>{data.firstName}</Text>
              <Text style={styles.lastName}>{data.lastName}</Text>
              {jobTitle && <Text style={styles.jobTitle}>{jobTitle}</Text>}
            </View>
            {data.photoPreview && (
              <Image src={data.photoPreview} style={styles.photo} />
            )}
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.contactRow}>
            {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
            {phone && <Text style={styles.contactItem}>{phone}</Text>}
            {data.location && <Text style={styles.contactItem}>{data.location}</Text>}
          </View>
        </View>

        {data.summary && (
          <View style={styles.section} wrap={false}>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        )}

        {data.experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{t.experience}</Text>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.itemContainer} wrap={false}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>{exp.jobTitle}</Text>
                  <Text style={styles.itemDate}>
                    {formatDateRange(exp.startDate, exp.endDate, t.present)}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{exp.company}</Text>
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
              <View key={edu.id} style={styles.itemContainer} wrap={false}>
                <View style={styles.itemRow}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemDate}>
                    {formatDateRange(edu.startDate, edu.endDate, t.studying)}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{edu.institution}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.threeColumnRow} wrap={false}>
          {data.skills.length > 0 && (
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>{t.skills}</Text>
              <View style={styles.skillsWrap}>
                {data.skills.map((skill, index) => (
                  <View key={index} style={styles.skillBadge}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {data.languages.length > 0 && (
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>{t.languages}</Text>
              {data.languages.map((lang) => (
                <Text key={lang.id} style={styles.langText}>
                  {lang.name} - {lang.level}
                </Text>
              ))}
            </View>
          )}

          {data.certifications.length > 0 && (
            <View style={styles.column}>
              <Text style={styles.sectionTitle}>{t.certifications}</Text>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={{ marginBottom: 5 }}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  <Text style={styles.certInstitution}>{cert.institution}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        {data.projects.length > 0 && (
          <View style={[styles.section, { marginTop: 6 }]}>
            <Text style={styles.sectionTitle}>{t.projects}</Text>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.itemContainer} wrap={false}>
                <Text style={styles.itemTitle}>{proj.name}</Text>
                {proj.description && (
                  <Text style={styles.itemDescription}>{proj.description}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};