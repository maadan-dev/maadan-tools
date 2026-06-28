import { Document, Page, Text, View, StyleSheet, Svg, Polygon, Font } from '@react-pdf/renderer';
import { toWords } from 'number-to-words';

Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Mu4mxK.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOlCnqEu92Fr1Mu4mxK.woff2', fontWeight: 700 },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOkCnqEu92Fr1Mu51xIIzc.woff2', fontStyle: 'italic', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOjCnqEu92Fr1Mu51TzBhc9.woff2', fontStyle: 'italic', fontWeight: 700 }
  ]
});

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
    lineHeight: 1.3,
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
    marginTop: 14,
    marginBottom: 6,
    textTransform: 'uppercase',
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
    width: '100%',
    marginTop: 35,
    marginBottom: 4,
  },
  signLabel: {
    fontSize: 9.5,
    fontFamily: 'Roboto',
    fontWeight: 700,
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  redWaxCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
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
    marginTop: 16,
    fontSize: 10,
  },
  witnessLine: {
    marginVertical: 3,
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

const StarburstSeal = ({ size = 70 }: { size?: number }) => {
  const points = [];
  const cx = size / 2;
  const cy = size / 2;
  const r1 = size * 0.38;
  const r2 = size * 0.5;
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
  
  return result.trim() + " Naira";
}

export function FarmManagementAgreement({ data, totals }: { data: DocumentFormData; totals: Totals }) {
  const assignee1Upper = data.assignee1Name.toUpperCase().trim();
  const assignee2Upper = data.assignee2Name?.toUpperCase().trim();
  const addressUpper = data.clientAddress.toUpperCase().trim();
  const plotsTextTitleCase = getPlotsTextTitleCase(data.numberOfPlots);
  const plotsTextAllCaps = getPlotsTextAllCaps(data.numberOfPlots);
  const dateStr = `${data.day} day of ${data.month}, ${data.year}`;

  const plotPriceFigures = formatNaira(totals.plotPrice);
  const plotPriceWords = amountInWords(totals.plotPrice);

  const depositFigures = totals.balance > 0 ? formatNaira(data.depositPaid || 0) : "";
  const depositWords = totals.balance > 0 ? amountInWords(data.depositPaid || 0) : "";
  const balanceFigures = totals.balance > 0 ? formatNaira(totals.balance) : "";
  const balanceWords = totals.balance > 0 ? amountInWords(totals.balance) : "";

  const individualNames = assignee2Upper 
    ? `${assignee1Upper} & ${assignee2Upper}` 
    : assignee1Upper;

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
      {/* PAGE 1: COVER */}
      <Page size="A4" style={styles.coverPage}>
        <View style={styles.borderContainer}>
          <View style={styles.innerBorderContainer}>
            <View style={styles.coverHeader}>
              <View style={{ borderBottomWidth: 1.5, borderBottomColor: '#000000', width: '100%', marginBottom: 30 }} />
              
              <Text style={styles.coverTitle}>
                Farm Estate Management/{"\n"}Ownership Agreement
              </Text>
              
              <Text style={styles.coverLabel}>Between</Text>
              
              <Text style={styles.coverParty}>Davidorlah Nigeria Limited</Text>
              <Text style={[styles.coverLabel, { marginTop: 0 }]}>(The Company)</Text>
              
              <Text style={styles.coverLabel}>And</Text>
              
              <View style={styles.coverAssigneesBlock}>
                <Text style={styles.coverAssigneeName}>1. {assignee1Upper}</Text>
                {assignee2Upper && (
                  <Text style={styles.coverAssigneeName}>2. {assignee2Upper}</Text>
                )}
              </View>
              <Text style={[styles.coverLabel, { marginTop: 0 }]}>(The Individuals)</Text>
            </View>

            <View style={{ width: '100%', alignItems: 'center' }}>
              <View style={styles.horizontalLine} />
              
              <View style={styles.coverPropertyBlock}>
                <Text style={styles.coverLabel}>In Respect Of</Text>
                <Text style={styles.coverPropertyText}>
                  Management/Ownership of {plotsTextAllCaps} of Farmland at Iloti Family Farmland Orubo/Erilobi Alaye Village, Awori, Ago Iwoye in the Ijebu North Local Government Area, Ogun State.
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
                <Text style={{ fontFamily: 'Roboto', fontWeight: 700, fontSize: 10, marginRight: 20 }}>SCN139535</Text>
                <StarburstSeal size={65} />
              </View>
            </View>
          </View>
        </View>
      </Page>

      {/* PAGE 2: BODY PAGE 1 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.pageNumber}>Page 1 of 5</Text>
        
        <Text style={styles.paragraphNoIndent}>
          THIS FARM MANAGEMENT/OWNERSHIP AGREEMENT is made this <Text style={styles.bold}>{formattedDay}</Text> day of <Text style={styles.bold}>{data.month}</Text>, <Text style={styles.bold}>{data.year}</Text>.
        </Text>

        <Text style={styles.boldCenter}>Between</Text>
        
        <Text style={styles.paragraphNoIndent}>
          <Text style={styles.bold}>DAVIDORLAH NIGERIA LIMITED</Text> of Km 18, Lekki Epe Expressway, Osapa Lekki, Lagos (hereinafter referred to as <Text style={styles.italic}>"the Company"</Text> which expression shall where the context so admits include its lawful assigns and legal representatives) of the first part.
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
          (hereinafter referred to as <Text style={styles.italic}>"the Individuals"</Text> which expression shall where the context so admits include their heirs, successors-in-title and assigns) of the second part.
        </Text>

        <View style={{ marginTop: 12 }}>
          <Text style={styles.sectionHeading}>WHEREAS:</Text>
          
          <View style={styles.clauseList}>
            <View style={styles.clauseRow}>
              <Text style={styles.clauseIndex}>i.</Text>
              <Text style={styles.clauseText}>
                The Company engages in Agric business and Farm Estate management, farming with innovation and technology that gives opportunity to increase people's income, give value to their money and creating employment opportunities through investment in agricultural businesses.
              </Text>
            </View>

            <View style={styles.clauseRow}>
              <Text style={styles.clauseIndex}>ii.</Text>
              <Text style={styles.clauseText}>
                In furtherance of her business, the Company has acquired a large expanse of land at Ago Iwoye Ijebu North Local Government Area of Ogun State with intention to sell same in plots to interested buyers for farming purposes only.
              </Text>
            </View>

            <View style={styles.clauseRow}>
              <Text style={styles.clauseIndex}>iii.</Text>
              <Text style={styles.clauseText}>
                The Individuals herein being desirous of acquiring <Text style={styles.bold}>{plotsTextTitleCase}</Text> of Land out of the aforesaid expanse of land for farming purpose have offered to buy and the Company has agreed to sell same subject to the terms and conditions hereinafter appearing.
              </Text>
            </View>
          </View>
        </View>
      </Page>

      {/* PAGE 3: BODY PAGE 2 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.pageNumber}>Page 2 of 5</Text>
        
        <Text style={styles.sectionHeading}>NOW THIS AGREEMENT WITNESSES as follows:</Text>

        <View style={styles.clauseList}>
          {/* Clause 1 */}
          <View style={styles.clauseRow}>
            <Text style={styles.clauseIndex}>1.</Text>
            <Text style={styles.clauseText}>
              The Company sells and the Individuals buy all that <Text style={styles.bold}>{plotsTextTitleCase}</Text> of Land measuring 500 square meters lying, being and situate at Iloti Family Farmland, Orubo/Erilobi Alaye Village, Awori, Ago-Iwoye, Ijebu North Local Government Area of Ogun State of Nigeria for a total sum of <Text style={styles.bold}>{plotPriceFigures} ({plotPriceWords})</Text> only hereinafter referred to as the <Text style={styles.italic}>"purchase price"</Text> for farming purpose only.
            </Text>
          </View>

          {/* Clause 2 */}
          <View style={styles.clauseRow}>
            <Text style={styles.clauseIndex}>2.</Text>
            <Text style={styles.clauseText}>
              The parties herein agree that the purchase price shall be paid as follows:
            </Text>
          </View>

          {/* Payment Type Conditional Blocks */}
          {data.paymentType === "full" ? (
            <>
              {/* Full Payment Sub-Clauses */}
              <View style={[styles.clauseRow, { marginLeft: 24 }]}>
                <Text style={[styles.clauseIndex, { width: 20 }]}>(i)</Text>
                <Text style={styles.clauseText}>
                  <Text style={styles.bold}>{plotPriceFigures}</Text> being the discounted price of the amount of the Pineapple farmland purchase, upon the due execution of this agreement.
                </Text>
              </View>

              <View style={[styles.clauseRow, { marginLeft: 24 }]}>
                <Text style={[styles.clauseIndex, { width: 20 }]}>(ii)</Text>
                <Text style={styles.clauseText}>
                  Upon the payment of <Text style={styles.bold}>{plotPriceFigures}</Text> being for the said pineapple farmland, the Company shall on behalf of the Individuals clear the <Text style={styles.bold}>{plotsTextTitleCase}</Text> of Land, plant crops (pineapple) thereon as it deems fit and manage same for a minimum period of five (5) years.
                </Text>
              </View>
            </>
          ) : (
            <>
              {/* Installment Sub-Clauses */}
              <View style={[styles.clauseRow, { marginLeft: 24 }]}>
                <Text style={[styles.clauseIndex, { width: 20 }]}>(i)</Text>
                <Text style={styles.clauseText}>
                  An initial deposit of <Text style={styles.bold}>{depositFigures} ({depositWords})</Text> being part payment of the Pineapple farmland purchase, upon the due execution of this agreement. The balance of <Text style={styles.bold}>{balanceFigures} ({balanceWords})</Text> to be paid within <Text style={styles.bold}>{totals.installmentDuration}</Text> months from the date of this agreement.
                </Text>
              </View>

              <View style={[styles.clauseRow, { marginLeft: 24 }]}>
                <Text style={[styles.clauseIndex, { width: 20 }]}>(ii)</Text>
                <Text style={styles.clauseText}>
                  Upon the full payment of <Text style={styles.bold}>{plotPriceFigures}</Text> being for the said pineapple farmland, the Company shall on behalf of the Individuals clear the <Text style={styles.bold}>{plotsTextTitleCase}</Text> of Land, plant crops (pineapple) thereon as it deems fit and manage same for a minimum period of five (5) years.
                </Text>
              </View>
            </>
          )}

          {/* Clause 3 */}
          <View style={[styles.clauseRow, { marginTop: 10 }]}>
            <Text style={styles.clauseIndex}>3.</Text>
            <View style={styles.clauseText}>
              <Text style={styles.bold}>SCOPE OF FARM MANAGEMENT</Text>
              <Text style={{ marginTop: 4 }}>
                The management of the farm includes but not limited to clearing, planting, farm processing, harvesting, transporting, sales and everything connected therewith for a period of at least five (5) years.
              </Text>
            </View>
          </View>

          {/* Clause 4 */}
          <View style={styles.clauseRow}>
            <Text style={styles.clauseIndex}>4.</Text>
            <View style={styles.clauseText}>
              <Text style={styles.bold}>RENT ON THE PINEAPPLE FARM LAND</Text>
              <View style={[styles.clauseRow, { marginTop: 4, paddingLeft: 0 }]}>
                <Text style={[styles.clauseIndex, { width: 14 }]}>i.</Text>
                <Text style={styles.clauseText}>
                  The Company shall pay a sum of <Text style={styles.bold}>{formatNaira(totals.annualROI)}</Text> to the Individuals every twelve (12) months being 36% of the purchase price (<Text style={styles.bold}>{plotPriceFigures}</Text>) for the entire five (5) years which will begin to run immediately after the payment has been made.
                </Text>
              </View>
            </View>
          </View>

          {/* Clause 5 */}
          <View style={styles.clauseRow}>
            <Text style={styles.clauseIndex}>5.</Text>
            <View style={styles.clauseText}>
              <Text style={styles.bold}>IT IS FURTHER MUTUALLY AGREED as follows:</Text>
              <View style={[styles.clauseRow, { marginTop: 4, paddingLeft: 0 }]}>
                <Text style={[styles.clauseIndex, { width: 14 }]}>i.</Text>
                <Text style={styles.clauseText}>
                  That the purchase price shall cover the <Text style={styles.bold}>{plotsTextTitleCase}</Text> of Pineapple Farmland, farm management. For Deed of Assignment, additional amount of <Text style={styles.bold}>{formatNaira(100000)}</Text> per plot. For Perimeter Survey, <Text style={styles.bold}>{formatNaira(250000)}</Text> per plot.
                </Text>
              </View>
              <View style={styles.clauseRow}>
                <Text style={[styles.clauseIndex, { width: 14 }]}>ii.</Text>
                <Text style={styles.clauseText}>
                  That the Individuals will be liable to pay a higher sum (depending on the prevailing bank lending rate) in the event of default in the payment of any balance within three (3) months.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Page>

      {/* PAGE 4: BODY PAGE 3 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.pageNumber}>Page 3 of 5</Text>
        
        <View style={[styles.clauseList, { marginTop: 10 }]}>
          <View style={styles.clauseRow}>
            <Text style={styles.clauseIndex}>iii.</Text>
            <Text style={styles.clauseText}>
              That the five (5) years term hereby created may be renewed on terms and conditions to be mutually agreed upon by the parties.
            </Text>
          </View>

          <View style={styles.clauseRow}>
            <Text style={styles.clauseIndex}>iv.</Text>
            <Text style={styles.clauseText}>
              That in the event the Individuals request for a refund, 40% discount of the amount paid shall be deducted and the balance refunded after two (2) months of such request.
            </Text>
          </View>

          <View style={styles.clauseRow}>
            <Text style={styles.clauseIndex}>v.</Text>
            <Text style={styles.clauseText}>
              That the Company shall be exclusively in charge of the farmland throughout the duration of this agreement. However, this does not preclude the Individuals from carrying out occasional inspection of the farmland.
            </Text>
          </View>

          <View style={styles.clauseRow}>
            <Text style={styles.clauseIndex}>vi.</Text>
            <Text style={styles.clauseText}>
              That at the expiration of the initial period of five (5) years hereby created, the Individuals may exercise their right of reversion by taking over the farmland thenceforth.
            </Text>
          </View>

          <View style={styles.clauseRow}>
            <Text style={styles.clauseIndex}>vii.</Text>
            <Text style={styles.clauseText}>
              However, in the event that the Individuals are desirous of creating a third party interest on the farmland by outright sale before the expiration of the term of five (5) years hereby created, they shall sell in the same amount they purchased from the Company as afore-mentioned and the Company shall be entitled to deduct 2.5% discount from the proceeds.
            </Text>
          </View>

          <View style={styles.clauseRow}>
            <Text style={styles.clauseIndex}>viii.</Text>
            <Text style={styles.clauseText}>
              Further to paragraph (vii) foregoing, the Individuals in the exercise of their right to sell the farmland before the term of five (5) years hereby created shall give the Company the <Text style={styles.bold}>first option of refusal</Text> to buy.
            </Text>
          </View>

          <View style={styles.clauseRow}>
            <Text style={styles.clauseIndex}>ix.</Text>
            <Text style={styles.clauseText}>
              In an event whereby, the Individuals opt to sell their pineapple farmland after the expiration of the five (5) years contract, the said pineapple farmland will be sold at the prevailing market price and the Company will take 5% of the total amount.
            </Text>
          </View>

          <View style={styles.clauseRow}>
            <Text style={styles.clauseIndex}>x.</Text>
            <Text style={styles.clauseText}>
              That in the event of default in the payment of return on investment, the Company shall only have maximum of two (2) months to remedy the situation failing which the due amount shall begin to attract interest at the prevailing bank lending rate.
            </Text>
          </View>
        </View>
      </Page>

      {/* PAGE 5: BODY PAGE 4 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.pageNumber}>Page 4 of 5</Text>

        <View style={{ marginTop: 10 }}>
          {/* Force Majeure */}
          <Text style={styles.sectionHeading}>6. Force Majeure</Text>
          <View style={[styles.clauseRow, { marginLeft: 12 }]}>
            <Text style={[styles.clauseIndex, { width: 14 }]}>i.</Text>
            <Text style={styles.clauseText}>
              If the performance or observance by either of the parties hereto of the duties/obligations under this agreement is prevented or hindered by social unrest, civil commotion, then such failure shall not constitute a breach of this agreement.
            </Text>
          </View>
          <View style={[styles.clauseRow, { marginLeft: 12 }]}>
            <Text style={[styles.clauseIndex, { width: 14 }]}>ii.</Text>
            <Text style={styles.clauseText}>
              In the event of natural disasters arising from any act of God, the farm shall be comprehensively insured and the Individuals shall be adequately indemnified.
            </Text>
          </View>

          {/* Notice */}
          <Text style={[styles.sectionHeading, { marginTop: 18 }]}>7. Notice</Text>
          <Text style={styles.paragraphNoIndent}>
            All notices and communications required or permitted under this agreement shall be in writing and any communication or delivery shall be deemed to have been duly made if actually delivered to the party concerned personally or through any representative of such party or after three (3) days mailing to any of the address above, if mailed by registered post.
          </Text>

          {/* Governing Law */}
          <Text style={[styles.sectionHeading, { marginTop: 18 }]}>8. Governing Law and Dispute Resolution</Text>
          <View style={[styles.clauseRow, { marginLeft: 12 }]}>
            <Text style={[styles.clauseIndex, { width: 14 }]}>a.</Text>
            <Text style={styles.clauseText}>
              This agreement shall be governed by the Nigerian law and where any dispute arises between parties as to the performance or interpretation of this agreement, parties shall attempt to resolve it amicably.
            </Text>
          </View>
          <View style={[styles.clauseRow, { marginLeft: 12 }]}>
            <Text style={[styles.clauseIndex, { width: 14 }]}>b.</Text>
            <Text style={styles.clauseText}>
              Any dispute, controversy, claim or difference arising out of or relating to the operation of this Agreement or the breach, termination or invalidity thereof may in default of amicable settlement and if both parties agree to such reference, be referred to Arbitration in accordance with the Arbitration and Conciliation Act LFN 2004 and the arbitral award shall be binding.
            </Text>
          </View>
          <View style={[styles.clauseRow, { marginLeft: 12 }]}>
            <Text style={[styles.clauseIndex, { width: 14 }]}>c.</Text>
            <Text style={styles.clauseText}>
              All arbitration cost, charges and expenses shall be borne equally by the parties herein.
            </Text>
          </View>

          {/* Modification */}
          <Text style={[styles.sectionHeading, { marginTop: 18 }]}>9. Modification</Text>
          <Text style={styles.paragraphNoIndent}>
            No modification of the terms herein will be effective without the written consent of both parties.
          </Text>
        </View>
      </Page>

      {/* PAGE 6: SCHEDULE & SIGNATURES */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.pageNumber}>Page 5 of 5</Text>

        <View style={{ alignItems: 'center', marginVertical: 14 }} wrap={false}>
          <Text style={[styles.bold, { textDecoration: 'underline', fontSize: 11 }]}>SCHEDULE</Text>
          <Text style={[styles.italic, { fontSize: 10, marginTop: 4 }]}>
            (i) Deed of Assignment (ii) Receipt of Purchase of Land (iii) Copy of Perimeter Survey.
          </Text>
        </View>

        <Text style={[styles.paragraphNoIndent, { marginBottom: 14, marginTop: 14 }]}>
          IN WITNESS WHEREOF the parties hereto have hereunto set their hands and seals the day and year first above written.
        </Text>

        <View style={styles.executionContainer}>
          <Text style={styles.paragraphNoIndent}>
            The Common Seal of the Company <Text style={styles.bold}>DAVIDORLAH NIGERIA LIMITED</Text> is hereby affixed in the presence of:
          </Text>

          {/* Center Red Wax Stamp */}
          <View style={{ alignItems: 'center', marginVertical: 14 }}>
            <StarburstSeal size={80} />
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
            <Text style={styles.paragraphNoIndent}>By the within-named INDIVIDUALS:</Text>

            <View style={{ marginTop: 8 }}>
              {/* Individual 1 Row */}
              <View style={styles.assigneeSignRow} wrap={false}>
                <View style={styles.assigneeTextCol}>
                  <Text style={styles.bold}>1. {assignee1Upper}</Text>
                </View>
                <View style={styles.assigneeSignCol}>
                  <View style={styles.assigneeSignLine} />
                  <View style={styles.redWaxCircle} />
                </View>
              </View>

              {/* Individual 2 Row (Conditional) */}
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
                INDIVIDUALS
              </Text>
            </View>
          </View>

          {/* Witness Details */}
          <View style={[styles.witnessSection, { marginTop: 24 }]} wrap={false}>
            <Text style={styles.bold}>In the presence of:</Text>
            <Text style={styles.witnessLine}>Name: ........................................................................................</Text>
            <Text style={styles.witnessLine}>Address: .....................................................................................</Text>
            <Text style={styles.witnessLine}>Occupation: .................................................................................</Text>
            <Text style={styles.witnessLine}>Signature: ..................................................................................</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}
