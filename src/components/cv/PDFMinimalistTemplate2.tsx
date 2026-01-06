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

// Minimalist2: Blue accent, clean lines, left sidebar layout
export const PDFMinimalistTemplate2 = ({ data }: Props) => {
  const accentColor = "#2563eb";
  const t = cvTranslations[data.cvLanguage || "pt"];
  const locale = data.cvLanguage === "zh" ? "zh-CN" : data.cvLanguage === "fr" ? "fr-FR" : data.cvLanguage === "en" ? "en-US" : "pt-BR";
  const fs = getFontSizes(data.fontSize || "medium");

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Roboto",
      fontSize: fs.body,
      flexDirection: "row",
    },
    sidebar: {
      width: "30%",
      backgroundColor: "#f8fafc",
      padding: 20,
      borderRightWidth: 1,
      borderRightColor: "#e2e8f0",
    },
    main: {
      width: "70%",
      padding: 25,
    },
    photo: {
      width: 80,
      height: 80,
      marginBottom: 15,
      alignSelf: "center",
      objectFit: "cover",
    },
    sidebarSection: {
      marginBottom: 18,
    },
    sidebarTitle: {
      fontSize: fs.body,
      fontWeight: 700,
      color: accentColor,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 8,
      paddingBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: accentColor,
    },
    contactItem: {
      fontSize: fs.small,
      color: "#475569",
      marginBottom: 5,
      fontWeight: 300,
    },
    skillItem: {
      fontSize: fs.small,
      color: "#475569",
      fontWeight: 300,
      marginBottom: 4,
      paddingLeft: 8,
      borderLeftWidth: 2,
      borderLeftColor: accentColor,
    },
    langItem: {
      fontSize: fs.small,
      color: "#475569",
      fontWeight: 300,
      marginBottom: 3,
    },
    name: {
      fontSize: fs.name + 2,
      fontWeight: 300,
      color: "#1e293b",
      marginBottom: 2,
    },
    lastName: {
      fontSize: fs.name + 2,
      fontWeight: 700,
      color: accentColor,
      marginBottom: 5,
    },
    jobTitle: {
      fontSize: fs.jobTitle,
      color: "#64748b",
      fontWeight: 300,
      textTransform: "uppercase",
      letterSpacing: 2,
      marginBottom: 15,
    },
    section: {
      marginBottom: 18,
    },
    sectionTitle: {
      fontSize: fs.jobTitle,
      fontWeight: 700,
      color: "#1e293b",
      textTransform: "uppercase",
      letterSpacing: 2,
      marginBottom: 10,
    },
    divider: {
      height: 1,
      backgroundColor: "#e2e8f0",
      marginBottom: 10,
    },
    summaryText: {
      fontSize: fs.small,
      color: "#475569",
      fontWeight: 300,
      lineHeight: 1.6,
    },
    itemContainer: {
      marginBottom: 12,
    },
    itemHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 2,
    },
    itemTitle: {
      fontSize: fs.body,
      fontWeight: 400,
      color: "#1e293b",
    },
    itemDate: {
      fontSize: fs.small,
      color: accentColor,
      fontWeight: 300,
    },
    itemSubtitle: {
      fontSize: fs.small,
      color: "#64748b",
      fontWeight: 300,
      marginBottom: 3,
    },
    itemDescription: {
      fontSize: fs.small,
      color: "#475569",
      fontWeight: 300,
      lineHeight: 1.5,
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
        <View style={styles.sidebar}>
          {data.photoPreview && (
            <Image src={data.photoPreview} style={styles.photo} />
          )}

          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>{t.contact}</Text>
            {data.email && <Text style={styles.contactItem}>{data.email}</Text>}
            {phone && <Text style={styles.contactItem}>{phone}</Text>}
            {data.location && <Text style={styles.contactItem}>{data.location}</Text>}
          </View>

          {data.skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>{t.skills}</Text>
              {data.skills.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>{skill}</Text>
              ))}
            </View>
          )}

          {data.languages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>{t.languages}</Text>
              {data.languages.map((lang) => (
                <Text key={lang.id} style={styles.langItem}>
                  {lang.name} — {lang.level}
                </Text>
              ))}
            </View>
          )}

          {data.certifications.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>{t.certifications}</Text>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={{ marginBottom: 5 }}>
                  <Text style={{ fontSize: fs.small, fontWeight: 400, color: "#1e293b" }}>{cert.name}</Text>
                  <Text style={{ fontSize: fs.small - 1, color: "#64748b", fontWeight: 300 }}>{cert.institution}</Text>
                </View>
              ))}
            </View>
          )}
        </View>

        <View style={styles.main}>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.name}>{data.firstName}</Text>
            <Text style={styles.lastName}>{data.lastName}</Text>
            {jobTitle && <Text style={styles.jobTitle}>{jobTitle}</Text>}
          </View>

          {data.summary && (
            <View style={styles.section}>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          )}

          {data.experience.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.experience}</Text>
              <View style={styles.divider} />
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.itemContainer}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{exp.jobTitle}</Text>
                    <Text style={styles.itemDate}>
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate) || t.present}
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
              <View style={styles.divider} />
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.itemContainer}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{edu.degree}</Text>
                    <Text style={styles.itemDate}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate) || t.studying}
                    </Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                </View>
              ))}
            </View>
          )}

          {data.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.projects}</Text>
              <View style={styles.divider} />
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
        </View>
      </Page>
    </Document>
  );
};