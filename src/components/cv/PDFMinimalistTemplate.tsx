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

  const styles = StyleSheet.create({
    page: {
      fontFamily: "Roboto",
      fontSize: 10,
      padding: 40,
    },
    header: {
      marginBottom: 20,
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
      fontSize: 32,
      fontWeight: 300,
      color: "#374151",
    },
    lastName: {
      fontSize: 32,
      fontWeight: 700,
      color: "#111827",
      marginBottom: 5,
    },
    jobTitle: {
      fontSize: 11,
      color: "#6b7280",
      fontWeight: 300,
      textTransform: "uppercase",
      letterSpacing: 2,
    },
    divider: {
      height: 1,
      backgroundColor: "#d1d5db",
      marginVertical: 15,
    },
    contactRow: {
      flexDirection: "row",
      gap: 20,
    },
    contactItem: {
      fontSize: 9,
      color: "#6b7280",
      fontWeight: 300,
    },
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 700,
      color: "#111827",
      textTransform: "uppercase",
      letterSpacing: 2,
      marginBottom: 10,
    },
    summaryText: {
      fontSize: 10,
      color: "#4b5563",
      fontWeight: 300,
      lineHeight: 1.6,
    },
    itemContainer: {
      marginBottom: 10,
    },
    itemRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "baseline",
      marginBottom: 3,
    },
    itemTitle: {
      fontSize: 11,
      fontWeight: 400,
      color: "#374151",
    },
    itemDate: {
      fontSize: 8,
      color: "#9ca3af",
      fontWeight: 300,
    },
    itemSubtitle: {
      fontSize: 9,
      color: "#6b7280",
      fontWeight: 300,
      marginBottom: 3,
    },
    itemDescription: {
      fontSize: 9,
      color: "#4b5563",
      fontWeight: 300,
      lineHeight: 1.5,
    },
    threeColumnRow: {
      flexDirection: "row",
      gap: 15,
    },
    column: {
      flex: 1,
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
      fontSize: 8,
      color: "#374151",
      fontWeight: 300,
    },
    skillsWrap: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    langText: {
      fontSize: 9,
      color: "#4b5563",
      fontWeight: 300,
      marginBottom: 3,
    },
    certName: {
      fontSize: 9,
      fontWeight: 400,
      color: "#374151",
    },
    certInstitution: {
      fontSize: 8,
      color: "#6b7280",
      fontWeight: 300,
    },
    photo: {
      width: 70,
      height: 70,
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

  const phone = data.phone ? `${data.countryCode} ${data.phone}` : "";
  const jobTitle = data.experience.length > 0 ? data.experience[0].jobTitle : "";

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
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
            {data.education.map((edu) => (
              <View key={edu.id} style={styles.itemContainer}>
                <View style={styles.itemRow}>
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

        <View style={styles.threeColumnRow}>
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
          <View style={[styles.section, { marginTop: 10 }]}>
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
      </Page>
    </Document>
  );
};
