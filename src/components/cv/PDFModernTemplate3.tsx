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

// Modern3: Right sidebar with green accent, timeline experience
export const PDFModernTemplate3 = ({ data }: Props) => {
  const accentColor = "#16a34a";
  const accentLight = "#22c55e";
  const t = cvTranslations[data.cvLanguage || "pt"];
  const locale = data.cvLanguage === "zh" ? "zh-CN" : data.cvLanguage === "fr" ? "fr-FR" : data.cvLanguage === "en" ? "en-US" : "pt-BR";

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Roboto",
      fontSize: 10,
      flexDirection: "row",
    },
    main: {
      width: "65%",
      padding: 25,
    },
    sidebar: {
      width: "35%",
      backgroundColor: accentColor,
      padding: 20,
      color: "#ffffff",
    },
    name: {
      fontSize: 26,
      fontWeight: 700,
      color: "#1e293b",
      marginBottom: 2,
    },
    jobTitle: {
      fontSize: 12,
      color: accentColor,
      marginBottom: 5,
    },
    divider: {
      height: 3,
      backgroundColor: accentColor,
      width: 50,
      marginBottom: 15,
    },
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 700,
      color: accentColor,
      marginBottom: 8,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    summaryText: {
      fontSize: 9,
      color: "#475569",
      lineHeight: 1.6,
      textAlign: "justify",
    },
    timelineItem: {
      flexDirection: "row",
      marginBottom: 12,
    },
    timelineDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: accentColor,
      marginRight: 10,
      marginTop: 3,
    },
    timelineContent: {
      flex: 1,
    },
    itemTitle: {
      fontSize: 11,
      fontWeight: 700,
      color: "#1e293b",
    },
    itemSubtitle: {
      fontSize: 9,
      color: "#64748b",
      marginBottom: 2,
    },
    itemDate: {
      fontSize: 8,
      color: accentColor,
      fontWeight: 700,
      marginBottom: 3,
    },
    itemDescription: {
      fontSize: 9,
      color: "#475569",
      lineHeight: 1.4,
    },
    sidebarSection: {
      marginBottom: 18,
    },
    sidebarTitle: {
      fontSize: 11,
      fontWeight: 700,
      marginBottom: 10,
      paddingBottom: 5,
      borderBottomWidth: 1,
      borderBottomColor: "rgba(255,255,255,0.3)",
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    photo: {
      width: 90,
      height: 90,
      borderRadius: 45,
      marginBottom: 15,
      alignSelf: "center",
      objectFit: "cover",
      borderWidth: 3,
      borderColor: "#ffffff",
    },
    contactItem: {
      fontSize: 9,
      marginBottom: 6,
      opacity: 0.9,
    },
    skillPill: {
      backgroundColor: "rgba(255,255,255,0.2)",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 12,
      marginBottom: 4,
      marginRight: 4,
    },
    skillsWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    skillText: {
      fontSize: 8,
      color: "#ffffff",
    },
    langBar: {
      marginBottom: 6,
    },
    langName: {
      fontSize: 9,
      marginBottom: 2,
    },
    langBarBg: {
      height: 4,
      backgroundColor: "rgba(255,255,255,0.2)",
      borderRadius: 2,
    },
    langBarFill: {
      height: 4,
      backgroundColor: "#ffffff",
      borderRadius: 2,
    },
  });

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    if (dateStr.toLowerCase() === "presente" || dateStr.toLowerCase() === "atual") return t.present;
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString(locale, { month: "short", year: "numeric" });
  };

  const getLangWidth = (level: string) => {
    const levels: Record<string, string> = {
      "Básico": "25%",
      "Intermediário": "50%",
      "Avançado": "75%",
      "Fluente": "100%",
      "Nativo": "100%",
    };
    return levels[level] || "50%";
  };

  const fullName = `${data.firstName} ${data.lastName}`;
  const phone = data.phone ? `${data.countryCode} ${data.phone}` : "";
  const jobTitle = data.experience.length > 0 ? data.experience[0].jobTitle : "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.main}>
          <View style={{ marginBottom: 20 }}>
            <Text style={styles.name}>{fullName}</Text>
            {jobTitle && <Text style={styles.jobTitle}>{jobTitle}</Text>}
            <View style={styles.divider} />
          </View>

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
                <View key={exp.id} style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <View style={styles.timelineContent}>
                    <Text style={styles.itemDate}>
                      {formatDate(exp.startDate)} - {formatDate(exp.endDate) || t.present}
                    </Text>
                    <Text style={styles.itemTitle}>{exp.jobTitle}</Text>
                    <Text style={styles.itemSubtitle}>{exp.company}</Text>
                    {exp.responsibilities && (
                      <Text style={styles.itemDescription}>{exp.responsibilities}</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>
          )}

          {data.education.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.education}</Text>
              {data.education.map((edu) => (
                <View key={edu.id} style={styles.timelineItem}>
                  <View style={styles.timelineDot} />
                  <View style={styles.timelineContent}>
                    <Text style={styles.itemDate}>
                      {formatDate(edu.startDate)} - {formatDate(edu.endDate) || t.studying}
                    </Text>
                    <Text style={styles.itemTitle}>{edu.degree}</Text>
                    <Text style={styles.itemSubtitle}>{edu.institution}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {data.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>{t.projects}</Text>
              {data.projects.map((proj) => (
                <View key={proj.id} style={{ marginBottom: 6 }}>
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
            {data.email && <Text style={styles.contactItem}>✉ {data.email}</Text>}
            {phone && <Text style={styles.contactItem}>☎ {phone}</Text>}
            {data.location && <Text style={styles.contactItem}>📍 {data.location}</Text>}
          </View>

          {data.skills.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>{t.skills}</Text>
              <View style={styles.skillsWrap}>
                {data.skills.map((skill, index) => (
                  <View key={index} style={styles.skillPill}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {data.languages.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>{t.languages}</Text>
              {data.languages.map((lang) => (
                <View key={lang.id} style={styles.langBar}>
                  <Text style={styles.langName}>{lang.name} - {lang.level}</Text>
                  <View style={styles.langBarBg}>
                    <View style={[styles.langBarFill, { width: getLangWidth(lang.level) }]} />
                  </View>
                </View>
              ))}
            </View>
          )}

          {data.certifications.length > 0 && (
            <View style={styles.sidebarSection}>
              <Text style={styles.sidebarTitle}>{t.certifications}</Text>
              {data.certifications.map((cert) => (
                <View key={cert.id} style={{ marginBottom: 5 }}>
                  <Text style={{ fontSize: 9, fontWeight: 700 }}>{cert.name}</Text>
                  <Text style={{ fontSize: 8, opacity: 0.8 }}>{cert.institution}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};
