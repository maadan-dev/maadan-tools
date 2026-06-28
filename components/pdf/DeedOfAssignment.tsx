import { Document, Page, Text, View, StyleSheet, Svg, Polygon, Font } from '@react-pdf/renderer';
import { toWords } from 'number-to-words';
Font.register({
  family: 'Roboto',
  fonts: [
    { src: '/fonts/Roboto-Regular.ttf', fontWeight: 400 },
    { src: '/fonts/Roboto-Bold.ttf', fontWeight: 700 },
    { src: '/fonts/Roboto-Italic.ttf', fontStyle: 'italic', fontWeight: 400 },
    { src: '/fonts/Roboto-BoldItalic.ttf', fontStyle: 'italic', fontWeight: 700 }
  ]
});

Font.registerHyphenationCallback(word => [word]);

const styles = StyleSheet.create({
  page: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 72, // ~1 inch margins
    fontFamily: 'Roboto',
    fontSize: 11,
    lineHeight: 1.6,
    color: '#000000',
  },
  executionPage: {
    paddingTop: 40,
    paddingBottom: 35,
    paddingHorizontal: 72,
    fontFamily: 'Roboto',
    fontSize: 11,
    lineHeight: 1.5,
    color: '#000000',
  },
  coverPage: {
    padding: 24,
    height: '100%',
    fontFamily: 'Roboto',
    color: '#000000',
    backgroundColor: '#ffffff',
  },
  borderContainer: {
    borderWidth: 3,
    borderColor: '#000000',
    padding: 3,
    flex: 1,
  },
  innerBorderContainer: {
    borderWidth: 1,
    borderColor: '#000000',
    flex: 1,
    paddingVertical: 36,
    paddingHorizontal: 40,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coverHeader: {
    width: '100%',
    alignItems: 'center',
  },
  coverTitle: {
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 20,
    textDecoration: 'underline',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  coverLabel: {
    fontSize: 11,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: 700,
    textAlign: 'center',
    marginVertical: 8,
    textTransform: 'uppercase',
  },
  coverParty: {
    fontSize: 14,
    fontFamily: 'Roboto',
    fontWeight: 700,
    textAlign: 'center',
    marginVertical: 4,
    textTransform: 'uppercase',
  },
  coverAssigneesBlock: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 12,
  },
  coverAssigneeName: {
    fontSize: 13,
    fontFamily: 'Roboto',
    fontWeight: 700,
    textAlign: 'center',
    marginVertical: 2,
    textTransform: 'uppercase',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    width: '100%',
    marginVertical: 14,
  },
  coverPropertyBlock: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 8,
  },
  coverPropertyText: {
    fontSize: 8.5,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: 700,
    textAlign: 'center',
    textTransform: 'uppercase',
    lineHeight: 1.5,
  },
  coverFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '100%',
    marginTop: 20,
  },
  coverLawyerCol: {
    width: '55%',
    fontSize: 8.5,
    lineHeight: 1.35,
  },
  coverSealsCol: {
    width: '45%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  placeholderStampCircle: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 1,
    borderColor: '#888888',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderStampText: {
    fontSize: 6,
    color: '#888888',
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  bodyTitle: {
    fontSize: 12,
    fontFamily: 'Roboto',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 20,
    textDecoration: 'underline',
    textTransform: 'uppercase',
  },
  sectionHeading: {
    fontSize: 11,
    fontFamily: 'Roboto',
    fontWeight: 700,
    marginTop: 16,
    marginBottom: 8,
  },
  boldCenter: {
    fontFamily: 'Roboto',
    fontWeight: 700,
    textAlign: 'center',
    fontSize: 11,
    marginVertical: 8,
    textTransform: 'uppercase',
  },
  paragraph: {
    marginBottom: 12,
    textAlign: 'justify',
    textIndent: 28, // first line indent
  },
  paragraphNoIndent: {
    marginBottom: 12,
    textAlign: 'justify',
  },
  bold: {
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  italic: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
  },
  boldItalic: {
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: 700,
  },
  clauseList: {
    width: '100%',
    marginBottom: 10,
  },
  clauseRow: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  clauseIndex: {
    width: 24,
    fontFamily: 'Roboto',
    fontSize: 11,
  },
  clauseText: {
    flex: 1,
    textAlign: 'justify',
    fontSize: 11,
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 72,
    fontSize: 9,
    fontFamily: 'Roboto',
  },
  executionContainer: {
    width: '100%',
    marginTop: 14,
  },
  signGroupRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  signLineCol: {
    width: '45%',
    alignItems: 'center',
  },
  signLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    width: '105%',
    marginTop: 20,
    marginBottom: 4,
  },
  signLabel: {
    fontSize: 9.5,
    fontFamily: 'Roboto',
    fontWeight: 700,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  sealsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 10,
  },
  redWaxCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#d32f2f',
  },
  assigneeSignRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginVertical: 8,
  },
  assigneeTextCol: {
    width: '60%',
    fontSize: 10,
    lineHeight: 1.4,
  },
  assigneeSignCol: {
    width: '35%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 12,
  },
  assigneeSignLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    width: 100,
    marginBottom: 4,
  },
  witnessSection: {
    marginTop: 10,
    fontSize: 9.5,
  },
  witnessLine: {
    marginVertical: 3,
  },
  consentBox: {
    marginTop: 10,
    alignItems: 'center',
    width: '100%',
  },
  consentTitle: {
    fontSize: 11,
    fontFamily: 'Roboto',
    fontWeight: 700,
    textDecoration: 'underline',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  consentText: {
    fontSize: 11,
    fontFamily: 'Roboto',
    fontWeight: 700,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 6,
    width: '100%',
  },
  consentDateLine: {
    fontSize: 11,
    fontFamily: 'Roboto',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 16,
    width: '100%',
  },
  consentFooter: {
    fontSize: 11,
    fontFamily: 'Roboto',
    fontWeight: 700,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  consentFooterSub: {
    fontSize: 10,
    fontFamily: 'Roboto',
    fontStyle: 'italic',
    fontWeight: 700,
    textAlign: 'center',
    marginTop: 2,
  }
});

interface DocumentFormData {
  assignee1Name: string;
  assignee2Name?: string;
  clientAddress: string;
  numberOfPlots: number;
  paymentType: 'full' | 'installment';
  depositPaid?: number;
  day: string;
  month: string;
  year: string;
}

interface Totals {
  plotPrice: number;
  annualROI: number;
  deedFee: number;
  surveyFee: number;
  totalDocFees: number;
  totalPayable: number;
  balance: number;
  installmentDuration: number;
}

// Vector Red Wax Starburst Seal Component
const StarburstSeal = ({ size = 70 }: { size?: number }) => {
  const points = [];
  const cx = size / 2;
  const cy = size / 2;
  const r1 = size * 0.38; // inner radius
  const r2 = size * 0.5;  // outer radius
  const teethCount = 36;
  
  for (let i = 0; i < teethCount * 2; i++) {
    const angle = (i * Math.PI) / teethCount;
    const r = i % 2 === 0 ? r2 : r1;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Polygon points={points.join(' ')} fill="#d32f2f" />
    </Svg>
  );
};

function getPlotsTextTitleCase(num: number): string {
  const word = toWords(num);
  const formattedWord = word.charAt(0).toUpperCase() + word.slice(1);
  return `${formattedWord} (${num}) ${num === 1 ? 'Plot' : 'Plots'}`;
}

function getPlotsTextAllCaps(num: number): string {
  const word = toWords(num).toUpperCase();
  return `${word} (${num}) ${num === 1 ? 'PLOT' : 'PLOTS'}`;
}

function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(amount).replace('NGN', '₦');
}

function amountInWords(num: number): string {
  num = Math.abs(num);
  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine"];
  const teens = ["Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  
  if (num === 0) return "Zero Naira";
  
  function convertHelper(n: number): string {
    let str = "";
    if (n >= 100) {
      str += ones[Math.floor(n / 100)] + " Hundred";
      n %= 100;
      if (n > 0) str += " and ";
    }
    if (n >= 20) {
      str += tens[Math.floor(n / 10)];
      n %= 10;
      if (n > 0) str += "-" + ones[n];
    } else if (n >= 10) {
      str += teens[n - 10];
    } else if (n > 0) {
      str += ones[n];
    }
    return str;
  }

  let result = "";
  let millions = Math.floor(num / 1000000);
  let remainder = num % 1000000;
  
  if (millions > 0) {
    result += convertHelper(millions) + " Million";
    if (remainder > 0) {
      result += remainder < 100 ? " and " : ", ";
    }
  }
  
  let thousands = Math.floor(remainder / 1000);
  remainder %= 1000;
  
  if (thousands > 0) {
    result += convertHelper(thousands) + " Thousand";
    if (remainder > 0) {
      result += remainder < 100 ? " and " : ", ";
    }
  }
  
  if (remainder > 0) {
    result += convertHelper(remainder);
  }
  
  return result.trim().replace(/^-/, '').trim() + " Naira";
}

export function DeedOfAssignment({ data, totals }: { data: DocumentFormData; totals: Totals }) {
  const assignee1Upper = data.assignee1Name.toUpperCase().trim();
  const assignee2Upper = data.assignee2Name?.toUpperCase().trim();
  const addressUpper = data.clientAddress.toUpperCase().trim();
  
  const sqmts = 500 * data.numberOfPlots;
  const plotsTextTitleCase = getPlotsTextTitleCase(data.numberOfPlots);
  const plotsTextAllCaps = getPlotsTextAllCaps(data.numberOfPlots);

  const priceInFigures = formatNaira(totals.plotPrice);
  const priceInWords = amountInWords(totals.plotPrice);
  const priceDisplay = `${priceInFigures}\u00A0(${priceInWords})`;
  
  const formattedDay = data.day.match(/\d+$/) 
    ? (() => {
        const d = parseInt(data.day);
        if (d === 1 || d === 21 || d === 31) return `${d}st`;
        if (d === 2 || d === 22) return `${d}nd`;
        if (d === 3 || d === 23) return `${d}rd`;
        return `${d}th`;
      })()
    : data.day;

  return (
    <Document>
      {/* PAGE 1: COVER PAGE */}
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.borderContainer}>
          <View style={styles.innerBorderContainer}>
            <View style={styles.coverHeader}>
              {/* Top border decoration line */}
              <View style={{ borderBottomWidth: 1.5, borderBottomColor: '#000000', width: '100%', marginBottom: 30 }} />
              
              <Text style={styles.coverTitle}>Deed of Assignment</Text>
              
              <Text style={styles.coverLabel}>Between</Text>
              
              <Text style={styles.coverParty}>Davidorlah Nigeria Limited</Text>
              <Text style={[styles.coverLabel, { marginTop: 0 }]}>(Assignor)</Text>
              
              <Text style={styles.coverLabel}>And</Text>
              
              <View style={styles.coverAssigneesBlock}>
                <Text style={styles.coverAssigneeName}>1. {assignee1Upper}</Text>
                {assignee2Upper && (
                  <Text style={styles.coverAssigneeName}>2. {assignee2Upper}</Text>
                )}
              </View>
              <Text style={[styles.coverLabel, { marginTop: 0 }]}>(Assignees)</Text>
            </View>

            <View style={{ width: '100%', alignItems: 'center' }}>
              <View style={styles.horizontalLine} />
              
              <View style={styles.coverPropertyBlock}>
                <Text style={styles.coverLabel}>In Respect Of</Text>
                <Text style={styles.coverPropertyText}>
                  {plotsTextAllCaps} of Farmland Measuring {sqmts.toLocaleString()} Sqmts at Iloti Family Farmland at Orubo/Erilobi Alaye Village, Awori, Ago-Iwoye, in the Ijebu North Local Government Area, Ogun State.
                </Text>
              </View>
              
              <View style={styles.horizontalLine} />
            </View>

            <View style={styles.coverFooterRow}>
              <View style={styles.coverLawyerCol}>
                <Text style={{ fontFamily: 'Roboto', fontWeight: 700, marginBottom: 2 }}>Prepared by:</Text>
                <Text style={{ fontFamily: 'Roboto', fontWeight: 700 }}>Ayomide Adeosun Esq.</Text>
                <Text style={{ fontFamily: 'Roboto', fontWeight: 700 }}>OLAOSEBIKAN ADEOSUN & CO.</Text>
                <Text style={styles.italic}>(Legal Practitioners & Notary Public)</Text>
                <Text>Suite B17, Glory Complex</Text>
                <Text>229 Ikotun-Idimu Road</Text>
                <Text>Idimu, Lagos.</Text>
                <Text>olaosebikanadeosun15@gmail.com</Text>
                <Text>07068971207</Text>
              </View>

              <View style={styles.coverSealsCol}>
                {/* Red wax seal */}
                <StarburstSeal size={65} />
              </View>
            </View>
          </View>
        </View>
      </Page>

      {/* PAGE 2: BODY PAGE 1 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.pageNumber}>Page 1 of 3</Text>
        
        <Text style={styles.paragraphNoIndent}>
          THIS DEED OF ASSIGNMENT is made this <Text style={styles.bold}>{formattedDay}</Text> day of <Text style={styles.bold}>{data.month}</Text>, <Text style={styles.bold}>{data.year}</Text>.
        </Text>

        <Text style={styles.boldCenter}>Between</Text>
        
        <Text style={styles.paragraphNoIndent}>
          <Text style={styles.bold}>DAVIDORLAH NIGERIA LIMITED</Text> of Km 18, Lekki Epe Expressway, Osapa Lekki, Lagos State (hereinafter referred to as <Text style={styles.italic}>"the Assignor"</Text> which expression shall where the context so admits include its lawful assigns and legal representatives) of the one part.
        </Text>

        <Text style={styles.boldCenter}>And</Text>

        <View style={{ marginBottom: 12 }}>
          <Text style={styles.bold}>1. {assignee1Upper}</Text>
          {assignee2Upper && (
            <Text style={styles.bold}>2. {assignee2Upper}</Text>
          )}
        </View>

        <Text style={styles.paragraphNoIndent}>
          of <Text style={styles.bold}>{addressUpper}</Text>
        </Text>

        <Text style={styles.paragraphNoIndent}>
          (hereinafter referred to as <Text style={styles.italic}>"the Assignees"</Text> which expression shall where the context so admits include their heirs, successors-in-title and assigns) of the other part.
        </Text>

        <View style={{ marginTop: 12 }}>
          <Text style={styles.sectionHeading}>1.0. WHEREAS:</Text>
          
          <View style={styles.clauseList}>
            <View style={styles.clauseRow}>
              <Text style={styles.clauseIndex}>i.</Text>
              <Text style={styles.clauseText}>
                The hereditament subject matter of this assignment forms part of a vast Parcel of Land known and described as Iloti Family Farmland at Orubo/Erilobi Alaye Village, Awori, Ago-Iwoye, Ijebu North Local Government Area of Ogun State of Nigeria which originally belonged to Iloti Family by virtue of inheritance under Yoruba Native Laws and Custom.
              </Text>
            </View>

            <View style={styles.clauseRow}>
              <Text style={styles.clauseIndex}>ii.</Text>
              <Text style={styles.clauseText}>
                The said Iloti family transferred their interest in respect of a portion of the vast area of land aforesaid to the Assignor herein absolutely by outright sale and executed a Deed of Assignment in favour of the Assignor evidencing the sale for pineapple farming purposes only.
              </Text>
            </View>

            <View style={styles.clauseRow}>
              <Text style={styles.clauseIndex}>iii.</Text>
              <Text style={styles.clauseText}>
                The Assignees being desirous of acquiring interest in <Text style={styles.bold}>{plotsTextTitleCase}</Text> out of the large expanse of farmland sold by the Iloti Family to the Assignor, have offered to purchase and the Assignor has agreed to sell and/or assign same to the Assignees subject to the terms and conditions hereinafter appearing.
              </Text>
            </View>
          </View>
        </View>
      </Page>

      {/* PAGE 3: BODY PAGE 2 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.pageNumber}>Page 2 of 3</Text>

        <Text style={styles.sectionHeading}>2.0. NOW THIS DEED WITNESSETH as follows:</Text>
        
        <Text style={styles.paragraphNoIndent}>
          In pursuance of the said agreement and in consideration of the sum of <Text style={styles.bold}>{priceDisplay}</Text> only paid by the Assignees to the Assignor (the receipt whereof the Assignor hereby acknowledges) the Assignor being the <Text style={styles.bold}>BENEFICIAL OWNER</Text> hereby sells, conveys and/or assigns unto the Assignees <Text style={styles.bold}>ALL THAT {plotsTextAllCaps} OF FARMLAND</Text> measuring <Text style={styles.bold}>{sqmts.toLocaleString()} square metres</Text> lying, being and situate at Iloti Family farmland, Orubo/Erilobi Alaye Village, Awori, Ago-Iwoye, Ijebu North Local Government Area of Ogun State (hereinafter referred to as <Text style={styles.italic}>"the Assigned Property"</Text>) with all rights and things appurtenant to it <Text style={styles.bold}>TO HOLD</Text> the same unto the Assignees free from encumbrance.
        </Text>

        <Text style={styles.sectionHeading}>3.0. THE ASSIGNOR HEREBY COVENANTS WITH THE ASSIGNEES as follows:</Text>

        <View style={styles.clauseList}>
          <View style={styles.clauseRow}>
            <Text style={styles.clauseIndex}>i.</Text>
            <Text style={styles.clauseText}>
              The Assignor hereby confirms that it has valid title to the assigned property.
            </Text>
          </View>

          <View style={styles.clauseRow}>
            <Text style={styles.clauseIndex}>ii.</Text>
            <Text style={styles.clauseText}>
              That the Assignees and/or anybody authorized by them shall have the right to utilise the assigned property for farming purpose only (ruga exempted) but without prejudice to any subsisting contractual agreement between the Assignor and the Assignees.
            </Text>
          </View>

          <View style={styles.clauseRow}>
            <Text style={styles.clauseIndex}>iii.</Text>
            <Text style={styles.clauseText}>
              To at all times indemnify the Assignees for any costs, losses, and expenses the Assignees may incur due to any defect in the Assignor's title to the assigned property or encumbrance placed on the property by the Assignor prior to the execution of this agreement.
            </Text>
          </View>
        </View>
      </Page>

      {/* PAGE 4: BODY PAGE 3 / SIGNATURES */}
      <Page size="A4" style={styles.executionPage}>
        <Text style={styles.pageNumber}>Page 3 of 3</Text>

        <Text style={[styles.paragraphNoIndent, { marginBottom: 16 }]}>
          IN WITNESS WHEREOF the parties hereto have hereunto set their hands and seals the day and year first above written.
        </Text>

        <View style={styles.executionContainer}>
          <Text style={styles.paragraphNoIndent}>
            The Common Seal of the ASSIGNOR <Text style={styles.bold}>DAVIDORLAH NIGERIA LIMITED</Text> is hereby affixed in the presence of:
          </Text>

          {/* Center Red Wax Stamp */}
          <View style={{ alignItems: 'center', marginVertical: 8 }}>
            <StarburstSeal size={65} />
          </View>

          <View style={styles.signGroupRow} wrap={false}>
            <View style={styles.signLineCol}>
              <View style={styles.signLine} />
              <Text style={styles.signLabel}>Director</Text>
            </View>
            <View style={styles.signLineCol}>
              <View style={styles.signLine} />
              <Text style={styles.signLabel}>Secretary</Text>
            </View>
          </View>

          <View style={{ marginTop: 18 }}>
            <Text style={styles.bold}>SIGNED, SEALED AND DELIVERED</Text>
            <Text style={styles.paragraphNoIndent}>By the within-named ASSIGNEES:</Text>

            <View style={{ marginTop: 8 }}>
              {/* Assignee 1 Row */}
              <View style={styles.assigneeSignRow} wrap={false}>
                <View style={styles.assigneeTextCol}>
                  <Text style={styles.bold}>1. {assignee1Upper}</Text>
                </View>
                <View style={styles.assigneeSignCol}>
                  <View style={styles.assigneeSignLine} />
                  <View style={styles.redWaxCircle} />
                </View>
              </View>

              {/* Assignee 2 Row (Conditional) */}
              {assignee2Upper && (
                <View style={styles.assigneeSignRow} wrap={false}>
                  <View style={styles.assigneeTextCol}>
                    <Text style={styles.bold}>2. {assignee2Upper}</Text>
                  </View>
                  <View style={styles.assigneeSignCol}>
                    <View style={styles.assigneeSignLine} />
                    <View style={styles.redWaxCircle} />
                  </View>
                </View>
              )}
              
              <Text style={[styles.bold, { textAlign: 'right', marginRight: 48, fontSize: 10, marginTop: 4 }]}>
                ASSIGNEES
              </Text>
            </View>
          </View>

          {/* Witness Details */}
          <View style={styles.witnessSection} wrap={false}>
            <Text style={styles.bold}>In the presence of:</Text>
            <Text style={styles.witnessLine}>Name: ........................................................................................</Text>
            <Text style={styles.witnessLine}>Address: .....................................................................................</Text>
            <Text style={styles.witnessLine}>Occupation: .................................................................................</Text>
            <Text style={styles.witnessLine}>Signature: ..................................................................................</Text>
          </View>

          {/* Governor Consent Box */}
          <View style={styles.consentBox} wrap={false}>
            <Text style={styles.consentTitle}>Consent</Text>
            <Text style={styles.consentText}>I, Hereby Consent to the Transaction Herein Contained</Text>
            <Text style={styles.consentDateLine}>Dated this __________ day of ____________________ 20___</Text>
            
            <View style={{ borderTopWidth: 1.5, borderTopColor: '#000000', width: 280, marginTop: 24, paddingTop: 4 }}>
              <Text style={styles.consentFooter}>Hon. Attorney General and Commissioner for Justice</Text>
              <Text style={styles.consentFooterSub}>For: The Executive Governor of Ogun State.</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
