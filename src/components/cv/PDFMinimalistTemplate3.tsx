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
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf", fontWeight: 300 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf", fontWeight: 400 },
    { src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf", fontWeight: 700 },
  ],
});

interface Props {
  data: CVData;
}

// Minimalist3: Green accent, centered header, horizontal sections
export const PDFMinimalistTemplate3 = ({ data }: Props) => {
  const accentColor = "#16a34a";
  const t = cvTranslations[data.cvLanguage || "pt"];
  const locale = data.cvLanguage === "zh" ? "zh-CN" : data.cvLanguage === "fr" ? "fr-FR" : data.cvLanguage === "en" ? "en-US" : "pt-BR";
  const fs = getFontSizes(data.fontSize || "medium");

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Roboto",
      fontSize: fs.body,
      padding: 20,
      paddingBottom: 15,
    },
    header: {
      alignItems: "center",
      marginBottom: 12,
    },
    photo: {
      width: 55,
      height: 55,
      borderRadius: 28,
      marginBottom: 6,
      objectFit: "cover",
    },
    name: {
      fontSize: fs.name + 2,
      fontWeight: 700,
      color: "#111827",
      marginBottom: 3,
      textAlign: "center",
    },
    jobTitle: {
      fontSize: fs.jobTitle,
      color: accentColor,
      fontWeight: 300,
      textTransform: "uppercase",
      letterSpacing: 3,
      marginBottom: 6,
      textAlign: "center",
    },
    contactRow: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 12,
      paddingTop: 6,
      borderTopWidth: 1,
      borderTopColor: "#e5e7eb",
    },
    contactItem: {
      fontSize: fs.small,
      color: "#6b7280",
      fontWeight: 300,
    },
    section: {
      marginBottom: 12,
    },
    sectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
    },
    sectionLine: {
      flex: 1,
      height: 1,
      backgroundColor: "#e5e7eb",
    },
    sectionTitle: {
      fontSize: fs.body,
      fontWeight: 700,
      color: accentColor,
      textTransform: "uppercase",
      letterSpacing: 2,
      paddingHorizontal: 10,
    },
    summaryText: {
      fontSize: fs.small,
      color: "#4b5563",
      fontWeight: 300,
      lineHeight: 1.6,
      textAlign: "center",
    },
    itemContainer: {
      marginBottom: 6,
      paddingBottom: 6,
      borderBottomWidth: 1,
      borderBottomColor: "#f3f4f6",
    },
    itemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 2,
    },
    itemTitle: {
      fontSize: fs.body,
      fontWeight: 400,
      color: "#111827",
    },
    itemDate: {
      fontSize: fs.small,
      color: accentColor,
      fontWeight: 300,
    },
    itemSubtitle: {
      fontSize: fs.small,
      color: "#6b7280",
      fontWeight: 300,
      marginBottom: 3,
    },
    itemDescription: {
      fontSize: fs.small,
      color: "#4b5563",
      fontWeight: 300,
      lineHeight: 1.5,
    },
    threeColumns: {
      flexDirection: "row",
      gap: 12,
    },
    column: {
      flex: 1,
    },
    columnTitle: {
      fontSize: fs.small,
      fontWeight: 700,
      color: accentColor,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 5,
      textAlign: "center",
    },
    skillItem: {
      fontSize: fs.small,
      color: "#4b5563",
      fontWeight: 300,
      textAlign: "center",
      marginBottom: 4,
      paddingVertical: 3,
      borderBottomWidth: 1,
      borderBottomColor: "#f3f4f6",
    },
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    if (dateStr.toLowerCase() === "presente" || dateStr.toLowerCase() === "atual") return t.present;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString(locale, { month: "short", year: "numeric" });
  };

  const phone = data.phone ? `${data.countryCode} ${data.phone}` : "";
  const jobTitle = data.experience.length > 0 ? data.experience[0].jobTitle : "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {data.photoPreview && (
            <Image src={data.photoPreview} style={styles.photo} />
          )}
          <Text style={styles.name}>{data.firstName} {data.lastName}</Text>
          {jobTitle && <Text style={styles.jobTitle}>{jobTitle}</Text>}
          <View style={styles.contactRow}>
            {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
            {phone && <Text style={styles.contactItem}>{phone}</Text>}
            {data.location && <Text style={styles.contactItem}>{data.location}</Text>}
          </View>
        </View>

        {data.summary && (
          <View style={styles.section}>
            <Text style={styles.summaryText}>{data.summary}</Text>
          </View>
        )}

        {data.experience.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionLine} />
              <Text style={styles.sectionTitle}>{t.experience}</Text>
              <View style={styles.sectionLine} />
            </View>
            {data.experience.map((exp) => (
              <View key={exp.id} style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{exp.jobTitle}</Text>
                  <Text style={styles.itemDate}>
                    {formatDate(exp.startDate)} — {formatDate(exp.endDate) || t.present}
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
            <View style={styles.sectionHeader}>
              <View style={styles.sectionLine} />
              <Text style={styles.sectionTitle}>{t.education}</Text>
              <View style={styles.sectionLine} />
            </View>
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.itemContainer}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{edu.degree}</Text>
                  <Text style={styles.itemDate}>
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate) || t.studying}
                  </Text>
                </View>
                <Text style={styles.itemSubtitle}>{edu.institution}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.threeColumns}>
          {data.skills.length > 0 && (
            <View style={styles.column}>
              <Text style={styles.columnTitle}>{t.skills}</Text>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>{skill}</Text>
              ))}
            </View>
          )}

          {data.languages.length > 0 && (
            <View style={styles.column}>
              <Text style={styles.columnTitle}>{t.languages}</Text>
              {data.languages.map((lang) => (
                <Text key={lang.id} style={styles.skillItem}>
                  {lang.name} — {lang.level}
                </Text>
              ))}
            </View>
          )}

          {data.certifications.length > 0 && (
            <View style={styles.column}>
              <Text style={styles.columnTitle}>{t.certifications}</Text>
              {data.certifications.map((cert) => (
                <Text key={cert.id} style={styles.skillItem}>{cert.name}</Text>
              ))}
            </View>
          )}
        </View>

        {data.projects.length > 0 && (
          <View style={[styles.section, { marginTop: 10 }]}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionLine} />
              <Text style={styles.sectionTitle}>{t.projects}</Text>
              <View style={styles.sectionLine} />
            </View>
            {data.projects.map((proj) => (
              <View key={proj.id} style={styles.itemContainer}>
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