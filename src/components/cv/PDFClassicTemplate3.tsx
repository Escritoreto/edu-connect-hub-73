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

// Classic3: Two-column layout with photo on left header, green accent
export const PDFClassicTemplate3 = ({ data }: Props) => {
  const accentColor = "#16a34a";
  const accentLight = "#bbf7d0";
  const t = cvTranslations[data.cvLanguage || "pt"];
  const locale = data.cvLanguage === "zh" ? "zh-CN" : data.cvLanguage === "fr" ? "fr-FR" : data.cvLanguage === "en" ? "en-US" : "pt-BR";

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Roboto",
      fontSize: 10,
      padding: 30,
    },
    header: {
      flexDirection: "row",
      gap: 15,
      paddingBottom: 15,
      borderBottomWidth: 2,
      borderBottomColor: accentLight,
      marginBottom: 15,
    },
    photo: {
      width: 70,
      height: 70,
      borderRadius: 6,
      objectFit: "cover",
      borderWidth: 2,
      borderColor: accentColor,
    },
    headerContent: {
      flex: 1,
    },
    name: {
      fontSize: 24,
      fontWeight: 700,
      color: accentColor,
      marginBottom: 2,
    },
    jobTitle: {
      fontSize: 12,
      color: accentColor,
      marginBottom: 6,
    },
    contactRow: {
      flexDirection: "row",
      gap: 12,
      flexWrap: "wrap",
    },
    contactItem: {
      fontSize: 8,
      color: "#64748b",
    },
    twoColumn: {
      flexDirection: "row",
      gap: 20,
    },
    mainColumn: {
      width: "65%",
    },
    sideColumn: {
      width: "35%",
    },
    section: {
      marginBottom: 14,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 700,
      color: accentColor,
      marginBottom: 8,
      flexDirection: "row",
      alignItems: "center",
    },
    sectionBar: {
      width: 20,
      height: 3,
      backgroundColor: accentColor,
      marginRight: 6,
    },
    summaryText: {
      fontSize: 9,
      color: "#475569",
      lineHeight: 1.5,
      textAlign: "justify",
    },
    timelineItem: {
      paddingLeft: 12,
      borderLeftWidth: 2,
      borderLeftColor: accentLight,
      marginBottom: 10,
      position: "relative",
    },
    timelineDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: accentColor,
      position: "absolute",
      left: -5,
      top: 2,
    },
    itemTitle: {
      fontSize: 11,
      fontWeight: 700,
      color: "#1e293b",
    },
    itemSubtitle: {
      fontSize: 9,
      color: accentColor,
      fontWeight: 700,
      marginBottom: 2,
    },
    itemDate: {
      fontSize: 8,
      color: "#94a3b8",
      marginBottom: 3,
    },
    itemDescription: {
      fontSize: 9,
      color: "#475569",
      lineHeight: 1.4,
    },
    skillItem: {
      backgroundColor: accentLight,
      borderLeftWidth: 3,
      borderLeftColor: accentColor,
      paddingHorizontal: 8,
      paddingVertical: 4,
      marginBottom: 4,
    },
    skillText: {
      fontSize: 8,
      color: "#1e293b",
    },
    langItem: {
      marginBottom: 4,
    },
    langName: {
      fontSize: 9,
      fontWeight: 700,
      color: "#1e293b",
    },
    langLevel: {
      fontSize: 8,
      color: "#64748b",
    },
    certItem: {
      marginBottom: 6,
    },
    certName: {
      fontSize: 9,
      fontWeight: 700,
      color: "#1e293b",
    },
    certInst: {
      fontSize: 8,
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
          {data.photoPreview && (
            <Image src={data.photoPreview} style={styles.photo} />
          )}
          <View style={styles.headerContent}>
            <Text style={styles.name}>{fullName}</Text>
            {jobTitle && <Text style={styles.jobTitle}>{jobTitle}</Text>}
            <View style={styles.contactRow}>
              {data.email && <Text style={styles.contactItem}>✉ {data.email}</Text>}
              {phone && <Text style={styles.contactItem}>☎ {phone}</Text>}
              {data.location && <Text style={styles.contactItem}>📍 {data.location}</Text>}
            </View>
          </View>
        </View>

        <View style={styles.twoColumn}>
          <View style={styles.mainColumn}>
            {data.summary && (
              <View style={styles.section}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                  <View style={styles.sectionBar} />
                  <Text style={{ fontSize: 12, fontWeight: 700, color: accentColor }}>{t.profile}</Text>
                </View>
                <Text style={styles.summaryText}>{data.summary}</Text>
              </View>
            )}

            {data.experience.length > 0 && (
              <View style={styles.section}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                  <View style={styles.sectionBar} />
                  <Text style={{ fontSize: 12, fontWeight: 700, color: accentColor }}>{t.experience}</Text>
                </View>
                {data.experience.map((exp) => (
                  <View key={exp.id} style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
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
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                  <View style={styles.sectionBar} />
                  <Text style={{ fontSize: 12, fontWeight: 700, color: accentColor }}>{t.education}</Text>
                </View>
                {data.education.map((edu) => (
                  <View key={edu.id} style={styles.timelineItem}>
                    <View style={styles.timelineDot} />
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
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                  <View style={styles.sectionBar} />
                  <Text style={{ fontSize: 12, fontWeight: 700, color: accentColor }}>{t.projects}</Text>
                </View>
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

          <View style={styles.sideColumn}>
            {data.skills.length > 0 && (
              <View style={styles.section}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                  <View style={[styles.sectionBar, { width: 15 }]} />
                  <Text style={{ fontSize: 11, fontWeight: 700, color: accentColor }}>{t.skills}</Text>
                </View>
                {data.skills.map((skill, index) => (
                  <View key={index} style={styles.skillItem}>
                    <Text style={styles.skillText}>{skill}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.languages.length > 0 && (
              <View style={styles.section}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                  <View style={[styles.sectionBar, { width: 15 }]} />
                  <Text style={{ fontSize: 11, fontWeight: 700, color: accentColor }}>{t.languages}</Text>
                </View>
                {data.languages.map((lang) => (
                  <View key={lang.id} style={styles.langItem}>
                    <Text style={styles.langName}>{lang.name}</Text>
                    <Text style={styles.langLevel}>{lang.level}</Text>
                  </View>
                ))}
              </View>
            )}

            {data.certifications.length > 0 && (
              <View style={styles.section}>
                <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                  <View style={[styles.sectionBar, { width: 15 }]} />
                  <Text style={{ fontSize: 11, fontWeight: 700, color: accentColor }}>{t.certifications}</Text>
                </View>
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
      </Page>
    </Document>
  );
};
