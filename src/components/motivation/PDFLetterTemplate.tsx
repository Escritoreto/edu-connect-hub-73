import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";
import { MotivationLetterData } from "@/types/motivationLetter";

const createStyles = (color: string) =>
  StyleSheet.create({
    page: { padding: 50, fontFamily: "Helvetica", fontSize: 11, lineHeight: 1.6 },
    header: { marginBottom: 30 },
    senderInfo: { marginBottom: 20 },
    senderName: { fontSize: 16, fontFamily: "Helvetica-Bold", color, marginBottom: 4 },
    senderDetail: { fontSize: 10, color: "#555" },
    recipientInfo: { marginBottom: 20 },
    recipientText: { fontSize: 10, color: "#333" },
    dateText: { fontSize: 10, color: "#555", marginBottom: 20, textAlign: "right" as const },
    subject: { fontSize: 12, fontFamily: "Helvetica-Bold", marginBottom: 20, color },
    greeting: { marginBottom: 15 },
    paragraph: { marginBottom: 12, textAlign: "justify" as const },
    closing: { marginTop: 30 },
    closingText: { marginBottom: 30 },
    signature: { fontFamily: "Helvetica-Bold", color },
    divider: { height: 2, backgroundColor: color, marginBottom: 20 },
  });

interface Props {
  data: MotivationLetterData;
  color?: string;
}

export const PDFLetterTemplate = ({ data, color = "#2563eb" }: Props) => {
  const styles = createStyles(color);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={styles.senderInfo}>
            <Text style={styles.senderName}>{data.fullName}</Text>
            {data.email && <Text style={styles.senderDetail}>{data.email}</Text>}
            {data.phone && <Text style={styles.senderDetail}>{data.countryCode} {data.phone}</Text>}
            {data.address && <Text style={styles.senderDetail}>{data.address}</Text>}
            {data.city && <Text style={styles.senderDetail}>{data.city}</Text>}
          </View>
          <View style={styles.divider} />
          {data.date && <Text style={styles.dateText}>{data.date}</Text>}
          <View style={styles.recipientInfo}>
            {data.recipientName && <Text style={styles.recipientText}>{data.recipientName}</Text>}
            {data.recipientTitle && <Text style={styles.recipientText}>{data.recipientTitle}</Text>}
            {data.companyName && <Text style={styles.recipientText}>{data.companyName}</Text>}
            {data.companyAddress && <Text style={styles.recipientText}>{data.companyAddress}</Text>}
          </View>
        </View>

        {data.subject && <Text style={styles.subject}>{data.subject}</Text>}

        <View style={styles.greeting}>
          <Text>{data.greeting}</Text>
        </View>

        {data.introduction && (
          <View style={styles.paragraph}>
            <Text>{data.introduction}</Text>
          </View>
        )}

        {data.body && (
          <View style={styles.paragraph}>
            <Text>{data.body}</Text>
          </View>
        )}

        {data.conclusion && (
          <View style={styles.paragraph}>
            <Text>{data.conclusion}</Text>
          </View>
        )}

        <View style={styles.closing}>
          <Text style={styles.closingText}>{data.closing}</Text>
          <Text style={styles.signature}>{data.fullName}</Text>
        </View>
      </Page>
    </Document>
  );
};
