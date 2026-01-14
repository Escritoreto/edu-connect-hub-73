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

export const PDFClassicTemplate2 = ({ data }: Props) => {
  const accentColor = "#2563eb";
  const t = cvTranslations[data.cvLanguage || "pt"];
  const locale = data.cvLanguage === "zh" ? "zh-CN" : data.cvLanguage === "fr" ? "fr-FR" : data.cvLanguage === "en" ? "en-US" : "pt-BR";
  const fs = getFontSizes(data.fontSize || "medium");

  const styles = StyleSheet.create({
    page: { fontFamily: "Roboto", fontSize: fs.body, flexDirection: "row", minHeight: "100%" },
    sidebar: { width: "35%", backgroundColor: "#1e3a5f", padding: 15, color: "#ffffff", minHeight: "100%" },
    main: { width: "65%", padding: 18 },
    photo: { width: 70, height: 70, borderRadius: 35, marginBottom: 10, alignSelf: "center", objectFit: "cover", borderWidth: 2, borderColor: "#ffffff" },
    sidebarName: { fontSize: fs.name - 6, fontWeight: 700, color: "#ffffff", textAlign: "center", marginBottom: 3 },
    sidebarTitle: { fontSize: fs.small, color: "#93c5fd", textAlign: "center", marginBottom: 12 },
    sidebarSection: { marginBottom: 12 },
    sidebarSectionTitle: { fontSize: fs.body, fontWeight: 700, color: "#93c5fd", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, borderBottomWidth: 1, borderBottomColor: "#3b82f6", paddingBottom: 3 },
    sidebarItem: { fontSize: fs.small, color: "#e2e8f0", marginBottom: 3 },
    mainSection: { marginBottom: 12 },
    mainSectionTitle: { fontSize: fs.sectionTitle, fontWeight: 700, color: accentColor, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6, borderBottomWidth: 2, borderBottomColor: accentColor, paddingBottom: 3 },
    summaryText: { fontSize: fs.body, color: "#475569", lineHeight: 1.4 },
    itemContainer: { marginBottom: 8 },
    itemHeader: { flexDirection: "row", justifyContent: "space-between", marginBottom: 1 },
    itemTitle: { fontSize: fs.jobTitle, fontWeight: 700, color: "#1e293b" },
    itemDate: { fontSize: fs.small, color: accentColor },
    itemSubtitle: { fontSize: fs.small, color: "#64748b", marginBottom: 2 },
    itemDescription: { fontSize: fs.small, color: "#475569", lineHeight: 1.3 },
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
        <View style={styles.sidebar}>
          {data.photoPreview && <Image src={data.photoPreview} style={styles.photo} />}
          <Text style={styles.sidebarName}>{fullName}</Text>
          {jobTitle && <Text style={styles.sidebarTitle}>{jobTitle}</Text>}
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarSectionTitle}>{t.contact}</Text>
            {data.email && <Text style={styles.sidebarItem}>{data.email}</Text>}
            {phone && <Text style={styles.sidebarItem}>{phone}</Text>}
            {data.location && <Text style={styles.sidebarItem}>{data.location}</Text>}
          </View>
          {data.skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>{t.skills}</Text>
              {data.skills.map((skill, index) => <Text key={index} style={styles.sidebarItem}>• {skill}</Text>)}
            </View>
          )}
          {data.languages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>{t.languages}</Text>
              {data.languages.map((lang) => <Text key={lang.id} style={styles.sidebarItem}>{lang.name} - {lang.level}</Text>)}
            </View>
          )}
          {data.certifications.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarSectionTitle}>{t.certifications}</Text>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={{ marginBottom: 4 }}>
                  <Text style={{ fontSize: fs.small, fontWeight: 700, color: "#ffffff" }}>{cert.name}</Text>
                  <Text style={{ fontSize: fs.small - 1, color: "#94a3b8" }}>{cert.institution}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={styles.main}>
          {data.summary && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>{t.profile}</Text>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          )}
          {data.experience.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>{t.experience}</Text>
              {data.experience.map((exp) => (
                <View key={exp.id} style={styles.itemContainer}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{exp.jobTitle}</Text>
                    <Text style={styles.itemDate}>{formatDate(exp.startDate)} - {formatDate(exp.endDate) || t.present}</Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{exp.company}</Text>
                  {exp.responsibilities && <Text style={styles.itemDescription}>{exp.responsibilities}</Text>}
                </View>
              ))}
            </View>
          )}
          {data.education.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>{t.education}</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.itemContainer}>
                  <View style={styles.itemHeader}>
                    <Text style={styles.itemTitle}>{edu.degree}</Text>
                    <Text style={styles.itemDate}>{formatDate(edu.startDate)} - {formatDate(edu.endDate) || t.studying}</Text>
                  </View>
                  <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                </View>
              ))}
            </View>
          )}
          {data.projects.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>{t.projects}</Text>
              {data.projects.map((proj) => (
                <View key={proj.id} style={styles.itemContainer}>
                  <Text style={styles.itemTitle}>{proj.name}</Text>
                  {proj.description && <Text style={styles.itemDescription}>{proj.description}</Text>}
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};
