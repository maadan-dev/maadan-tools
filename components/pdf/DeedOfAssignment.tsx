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
  subTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    textAlign: 'center',
    marginBottom: 20,
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
  bulletList: {
    marginLeft: 15,
    marginBottom: 12,
  },
  bulletItem: {
    marginBottom: 6,
    textAlign: 'justify',
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

interface DeedData {
  assignee1: string;
  assignee2?: string;
  address: string;
  plots: number;
  paymentType: 'full' | 'installment';
  depositAmount?: string;
  duration?: string;
  day: string;
  month: string;
  year: string;
  totalPrice: number;
}

export function DeedOfAssignment({ data }: { data: DeedData }) {
  const dateStr = `${data.day} day of ${data.month}, ${data.year}`;
  const totalAmountWords = `${data.totalPrice.toLocaleString('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 })} Naira`;
  
  const buyerNames = data.assignee2 
    ? `${data.assignee1} & ${data.assignee2}` 
    : data.assignee1;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Title Page Heading */}
        <Text style={styles.title}>Deed of Assignment</Text>
        
        <Text style={styles.paragraph}>
          THIS DEED OF ASSIGNMENT is made this <Text style={styles.bold}>{dateStr}</Text>
        </Text>

        <Text style={[styles.paragraph, styles.bold]}>BETWEEN:</Text>
        
        <Text style={styles.paragraph}>
          <Text style={styles.bold}>DAVIDORLAH FARMS LIMITED</Text>, a company incorporated under the laws of the Federal Republic of Nigeria, with its registered address at Davidorlah Farm Plaza, Lagos, Nigeria (hereinafter referred to as the <Text style={styles.bold}>"ASSIGNOR"</Text> which expression shall where the context so admits include its successors-in-title and assigns) of the one part;
        </Text>

        <Text style={[styles.paragraph, styles.bold]}>AND:</Text>

        <Text style={styles.paragraph}>
          <Text style={styles.bold}>{buyerNames}</Text> of <Text style={styles.bold}>{data.address}</Text> (hereinafter referred to as the <Text style={styles.bold}>"ASSIGNEE"</Text> which expression shall where the context so admits include heirs, executors, administrators, and assigns) of the other part.
        </Text>

        <View style={styles.section}>
          <Text style={styles.heading}>WHEREAS:</Text>
          <Text style={styles.paragraph}>
            1. The Assignor is the beneficial owner of the agricultural parcel of land located at the Davidorlah Farms Estate scheme, Lagos State, Nigeria.
          </Text>
          <Text style={styles.paragraph}>
            2. The Assignor has agreed to assign a portion of the agricultural parcel measuring approximately <Text style={styles.bold}>{data.plots} plots</Text> to the Assignee for agricultural use.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>NOW THIS DEED WITNESSETH AS FOLLOWS:</Text>
          
          <Text style={styles.paragraph}>
            1. In consideration of the sum of <Text style={styles.bold}>{totalAmountWords}</Text> paid by the Assignee to the Assignor (receipt of which the Assignor hereby acknowledges), the Assignor hereby assigns unto the Assignee all those agricultural plots measuring <Text style={styles.bold}>{data.plots} plots</Text> at the Davidorlah Farms Estate.
          </Text>
          
          <Text style={styles.paragraph}>
            2. The Assignee covenants to use the land solely for agricultural and farming operations under the terms of the Davidorlah Farm Management Agreement.
          </Text>

          <Text style={styles.paragraph}>
            3. The Assignor covenants that it has good right and title to assign the said land and that the Assignee shall quietly enjoy possession of the same without interruption.
          </Text>
        </View>

        {/* Transaction Info Table */}
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Land Area Assigned</Text>
            <Text style={styles.tableCellVal}>{data.plots} Plot(s)</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Consideration Paid</Text>
            <Text style={styles.tableCellVal}>{totalAmountWords}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Payment Mode</Text>
            <Text style={styles.tableCellVal}>{data.paymentType === 'full' ? 'Outright Purchase (Full)' : 'Installment Payment Plan'}</Text>
          </View>
          {data.paymentType === 'installment' && (
            <>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLabel}>Initial Deposit Paid</Text>
                <Text style={styles.tableCellVal}>₦{Number(data.depositAmount || 0).toLocaleString()} Naira</Text>
              </View>
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLabel}>Installment Duration</Text>
                <Text style={styles.tableCellVal}>{data.duration}</Text>
              </View>
            </>
          )}
        </View>

        {/* Signatures */}
        <View style={styles.signatureContainer}>
          <View style={styles.signatureBlock}>
            <Text style={styles.bold}>DAVIDORLAH FARMS LTD</Text>
            <Text style={{ marginTop: 25 }}>For: The Assignor</Text>
          </View>
          <View style={styles.signatureBlock}>
            <Text style={styles.bold}>{data.assignee1}</Text>
            <Text style={{ marginTop: 25 }}>The Assignee</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
