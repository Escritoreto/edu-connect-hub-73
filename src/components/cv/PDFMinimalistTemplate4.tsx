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

// Minimalist4: Purple accent, right sidebar with photo, elegant typography
export const PDFMinimalistTemplate4 = ({ data }: Props) => {
  const accentColor = "#7c3aed";
  const t = cvTranslations[data.cvLanguage || "pt"];
  const locale = data.cvLanguage === "zh" ? "zh-CN" : data.cvLanguage === "fr" ? "fr-FR" : data.cvLanguage === "en" ? "en-US" : "pt-BR";
  const fs = getFontSizes(data.fontSize || "medium");

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Roboto",
      fontSize: fs.body,
      flexDirection: "row",
    },
    main: {
      width: "68%",
      padding: 30,
    },
    sidebar: {
      width: "32%",
      backgroundColor: "#faf5ff",
      padding: 20,
      borderLeftWidth: 2,
      borderLeftColor: accentColor,
    },
    headerName: {
      fontSize: fs.name + 6,
      fontWeight: 300,
      color: "#111827",
      marginBottom: 0,
    },
    headerLastName: {
      fontSize: fs.name + 6,
      fontWeight: 700,
      color: accentColor,
      marginBottom: 8,
    },
    jobTitle: {
      fontSize: fs.jobTitle,
      color: "#6b7280",
      fontWeight: 300,
      textTransform: "uppercase",
      letterSpacing: 3,
      marginBottom: 20,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: fs.jobTitle,
      fontWeight: 700,
      color: "#111827",
      textTransform: "uppercase",
      letterSpacing: 2,
      marginBottom: 10,
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: accentColor,
    },
    summaryText: {
      fontSize: fs.small,
      color: "#4b5563",
      fontWeight: 300,
      lineHeight: 1.7,
    },
    itemContainer: {
      marginBottom: 12,
    },
    itemRow: {
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
      fontSize: fs.small - 1,
      color: accentColor,
      fontWeight: 300,
    },
    itemSubtitle: {
      fontSize: fs.small,
      color: "#6b7280",
      fontWeight: 300,
      fontStyle: "italic",
      marginBottom: 3,
    },
    itemDescription: {
      fontSize: fs.small - 1,
      color: "#4b5563",
      fontWeight: 300,
      lineHeight: 1.5,
    },
    photo: {
      width: 100,
      height: 100,
      alignSelf: "center",
      marginBottom: 20,
      objectFit: "cover",
    },
    sidebarSection: {
      marginBottom: 18,
    },
    sidebarTitle: {
      fontSize: fs.small,
      fontWeight: 700,
      color: accentColor,
      textTransform: "uppercase",
      letterSpacing: 1,
      marginBottom: 8,
    },
    contactItem: {
      fontSize: fs.small - 1,
      color: "#4b5563",
      fontWeight: 300,
      marginBottom: 6,
    },
    skillTag: {
      borderWidth: 1,
      borderColor: accentColor,
      paddingHorizontal: 8,
      paddingVertical: 3,
      marginBottom: 4,
    },
    skillText: {
      fontSize: fs.small - 2,
      color: accentColor,
      textAlign: "center",
    },
    langItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 4,
    },
    langName: {
      fontSize: fs.small - 1,
      color: "#4b5563",
      fontWeight: 300,
    },
    langLevel: {
      fontSize: fs.small - 2,
      color: accentColor,
    },
    certItem: {
      marginBottom: 6,
    },
    certName: {
      fontSize: fs.small - 1,
      fontWeight: 400,
      color: "#111827",
    },
    certInst: {
      fontSize: fs.small - 2,
      color: "#6b7280",
      fontWeight: 300,
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
        <View style={styles.main}>
          <View style={{ marginBottom: 25 }}>
            <Text style={styles.headerName}>{data.firstName}</Text>
            <Text style={styles.headerLastName}>{data.lastName}</Text>
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
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.itemContainer}>
                  <View style={styles.itemRow}>
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
              <Text style={styles.sectionTitle}>{t.education}</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.itemContainer}>
                  <View style={styles.itemRow}>
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

          {data.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.projects}</Text>
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
                <View key={index} style={styles.skillTag}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          )}

          {data.languages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>{t.languages}</Text>
              {data.languages.map((lang) => (
                <View key={lang.id} style={styles.langItem}>
                  <Text style={styles.langName}>{lang.name}</Text>
                  <Text style={styles.langLevel}>{lang.level}</Text>
                </View>
              ))}
            </View>
          )}

          {data.certifications.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>{t.certifications}</Text>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.certItem}>
                  <Text style={styles.certName}>{cert.name}</Text>
                  <Text style={styles.certInst}>{cert.institution}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};