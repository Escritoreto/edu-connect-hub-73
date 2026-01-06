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

const getAccentColor = (templateId: string) => {
  switch (templateId) {
    case "modern2": return "#7c3aed";
    case "modern3": return "#16a34a";
    case "modern4": return "#ea580c";
    default: return "#2563eb";
  }
};

const getAccentColorLight = (templateId: string) => {
  switch (templateId) {
    case "modern2": return "#8b5cf6";
    case "modern3": return "#22c55e";
    case "modern4": return "#f97316";
    default: return "#3b82f6";
  }
};

interface Props {
  data: CVData;
  templateId: string;
}

export const PDFModernTemplate = ({ data, templateId }: Props) => {
  const accentColor = getAccentColor(templateId);
  const accentLight = getAccentColorLight(templateId);
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
      width: "35%",
      backgroundColor: accentColor,
      padding: 20,
      color: "#ffffff",
    },
    main: {
      width: "65%",
      padding: 25,
    },
    name: {
      fontSize: fs.name - 4,
      fontWeight: 700,
      color: accentColor,
      marginBottom: 3,
    },
    jobTitle: {
      fontSize: fs.jobTitle,
      color: "#64748b",
      marginBottom: 15,
    },
    sidebarSection: {
      marginBottom: 15,
    },
    sidebarTitle: {
      fontSize: fs.sectionTitle,
      fontWeight: 700,
      marginBottom: 8,
      paddingBottom: 4,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255,255,255,0.3)",
    },
    sidebarText: {
      fontSize: fs.small,
      marginBottom: 3,
      opacity: 0.9,
    },
    sidebarLabel: {
      fontSize: fs.small,
      fontWeight: 700,
      marginBottom: 2,
    },
    skillBadge: {
      backgroundColor: "rgba(255,255,255,0.2)",
      paddingHorizontal: 6,
      paddingVertical: 4,
      borderRadius: 3,
      marginBottom: 4,
    },
    skillText: {
      fontSize: fs.small,
      color: "#ffffff",
    },
    mainSection: {
      marginBottom: 12,
    },
    mainSectionTitle: {
      fontSize: fs.sectionTitle,
      fontWeight: 700,
      color: accentColor,
      marginBottom: 6,
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
      marginBottom: 8,
    },
    itemTitle: {
      fontSize: fs.jobTitle,
      fontWeight: 700,
      color: "#1e293b",
    },
    itemSubtitle: {
      fontSize: fs.small,
      color: "#64748b",
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
    photo: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 15,
      alignSelf: "center",
      objectFit: "cover",
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
        <View style={styles.sidebar}>
          {data.photoPreview && (
            <Image src={data.photoPreview} style={styles.photo} />
          )}
          
          <View style={styles.sidebarSection}>
            <Text style={styles.sidebarTitle}>{t.contact}</Text>
            {data.email && (
              <View style={{ marginBottom: 6 }}>
                <Text style={styles.sidebarLabel}>{t.email}</Text>
                <Text style={styles.sidebarText}>{data.email}</Text>
              </View>
            )}
            {phone && (
              <View style={{ marginBottom: 6 }}>
                <Text style={styles.sidebarLabel}>{t.phone}</Text>
                <Text style={styles.sidebarText}>{phone}</Text>
              </View>
            )}
            {data.location && (
              <View style={{ marginBottom: 6 }}>
                <Text style={styles.sidebarLabel}>{t.location}</Text>
                <Text style={styles.sidebarText}>{data.location}</Text>
              </View>
            )}
          </View>

          {data.skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>{t.skills}</Text>
              {data.skills.map((skill, index) => (
                <View key={index} style={styles.skillBadge}>
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>
          )}

          {data.languages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>{t.languages}</Text>
              {data.languages.map((lang) => (
                <Text key={lang.id} style={styles.sidebarText}>
                  {lang.name} - {lang.level}
                </Text>
              ))}
            </View>
          )}
        </View>

        <View style={styles.main}>
          <View style={{ marginBottom: 15 }}>
            <Text style={styles.name}>{fullName}</Text>
            {jobTitle && <Text style={styles.jobTitle}>{jobTitle}</Text>}
          </View>

          {data.summary && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>{t.aboutMe}</Text>
              <Text style={styles.summaryText}>{data.summary}</Text>
            </View>
          )}

          {data.experience.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>{t.experience}</Text>
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
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>{t.education}</Text>
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

          {data.certifications.length > 0 && (
            <View style={styles.mainSection}>
              <Text style={styles.mainSectionTitle}>{t.certifications}</Text>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={styles.itemContainer}>
                  <Text style={styles.itemTitle}>{cert.name}</Text>
                  <Text style={styles.itemSubtitle}>{cert.institution}</Text>
                  {cert.date && <Text style={styles.itemDate}>{formatDate(cert.date)}</Text>}
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
                  {proj.description && (
                    <Text style={styles.itemDescription}>{proj.description}</Text>
                  )}
                  {proj.link && (
                    <Text style={{ fontSize: fs.small - 1, color: accentColor }}>{proj.link}</Text>
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