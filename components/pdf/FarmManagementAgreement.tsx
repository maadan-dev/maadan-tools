import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 60,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.6,
    color: '#111111',
  },
  title: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    marginBottom: 24,
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 15,
  },
  heading: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 12,
    marginBottom: 8,
    textTransform: 'uppercase',
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 2,
  },
  paragraph: {
    marginBottom: 12,
    textAlign: 'justify',
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  table: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    padding: 8,
  },
  tableCellLabel: {
    width: '35%',
    fontFamily: 'Helvetica-Bold',
  },
  tableCellVal: {
    width: '65%',
  },
  signatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 60,
  },
  signatureBlock: {
    width: '45%',
    borderTopWidth: 1,
    borderTopColor: '#000000',
    paddingTop: 8,
    textAlign: 'center',
    fontSize: 10,
  }
});

interface AgreementData {
  assignee1: string;
  assignee2?: string;
  address: string;
  plots: number;
  day: string;
  month: string;
  year: string;
  totalPrice: number;
}

export function FarmManagementAgreement({ data }: { data: AgreementData }) {
  const dateStr = `${data.day} day of ${data.month}, ${data.year}`;
  const annualRoi = data.plots * 1079999;
  const fiveYearRoi = annualRoi * 5;
  const ownerNames = data.assignee2 
    ? `${data.assignee1} & ${data.assignee2}` 
    : data.assignee1;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Title */}
        <Text style={styles.title}>Farm Management Agreement</Text>
        
        <Text style={styles.paragraph}>
          THIS FARM MANAGEMENT AGREEMENT is made this <Text style={styles.bold}>{dateStr}</Text>
        </Text>

        <Text style={[styles.paragraph, styles.bold]}>BETWEEN:</Text>
        
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>{ownerNames}</Text> of <Text style={styles.bold}>{data.address}</Text> (hereinafter referred to as the <Text style={styles.bold}>"FARM OWNER"</Text> which expression shall where the context so admits include heirs, executors, and assigns) of the one part;
        </Text>

        <Text style={[styles.paragraph, styles.bold]}>AND:</Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>DAVIDORLAH FARMS LIMITED</Text>, a company incorporated under the laws of the Federal Republic of Nigeria, with its registered address at Davidorlah Farm Plaza, Lagos, Nigeria (hereinafter referred to as the <Text style={styles.bold}>"MANAGER"</Text> which expression shall where the context so admits include its successors-in-title and assigns) of the other part.
        </Text>

        <View style={styles.section}>
          <Text style={styles.heading}>1. APPOINTMENT & TERM:</Text>
          <Text style={styles.paragraph}>
            1.1 The Farm Owner hereby appoints the Manager to manage, cultivate, operate, and maintain the agricultural plots measuring <Text style={styles.bold}>{data.plots} plots</Text> located at the Davidorlah Farms Estate, and the Manager accepts this appointment under the terms of this Agreement.
          </Text>
          <Text style={styles.paragraph}>
            1.2 The term of this Agreement shall be for a period of <Text style={styles.bold}>five (5) years</Text>, starting from the date of this Agreement, unless terminated earlier in accordance with the provisions herein.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>2. MANAGEMENT SERVICES & DUTIES:</Text>
          <Text style={styles.paragraph}>
            2.1 The Manager shall be responsible for all daily farm operations, including but not limited to land preparation, seeding, pest control, crop harvesting, warehouse storage, and distribution/sales of harvests.
          </Text>
          <Text style={styles.paragraph}>
            2.2 The Manager covenants to manage the land in accordance with best modern agricultural practices.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>3. FINANCIAL RETURNS & ANNUAL ROI:</Text>
          <Text style={styles.paragraph}>
            3.1 In consideration of the management services, the Farm Owner is guaranteed an Annual Return on Investment (ROI) computed at <Text style={styles.bold}>36% of the plot purchase price</Text> per annum.
          </Text>
          <Text style={styles.paragraph}>
            3.2 The guaranteed annual ROI payouts shall be paid directly to the Farm Owner's nominated bank account at the end of each agricultural cycle year.
          </Text>
        </View>

        {/* ROI Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Managed Land Area</Text>
            <Text style={styles.tableCellVal}>{data.plots} Plot(s)</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Guaranteed Annual ROI</Text>
            <Text style={styles.tableCellVal}>₦{annualRoi.toLocaleString()} Naira</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Total 5-Year Return</Text>
            <Text style={styles.tableCellVal}>₦{fiveYearRoi.toLocaleString()} Naira</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Contract Duration</Text>
            <Text style={styles.tableCellVal}>5 Years</Text>
          </View>
        </View>

        {/* Signatures */}
        <View style={styles.signatureContainer}>
          <View style={styles.signatureBlock}>
            <Text style={styles.bold}>{data.assignee1}</Text>
            <Text style={{ marginTop: 25 }}>The Farm Owner</Text>
          </View>
          <View style={styles.signatureBlock}>
            <Text style={styles.bold}>DAVIDORLAH FARMS LTD</Text>
            <Text style={{ marginTop: 25 }}>For: The Manager</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
