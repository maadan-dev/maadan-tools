"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";

// Import PDF templates
import { DeedOfAssignment } from "../../components/pdf/DeedOfAssignment";
import { FarmManagementAgreement } from "../../components/pdf/FarmManagementAgreement";

const BRAND_GREEN = "#7AB648";

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

// Pure calculation logic from specification
const PLOT_PRICE = 2999999;                    // ₦2,999,999 per plot
const ANNUAL_ROI_RATE = 0.36;                  // 36%
const DEED_FEE_PER_PLOT = 100000;             // ₦100,000 per plot
const SURVEY_FEE_PER_PLOT = 250000;           // ₦250,000 per plot

function calculateTotals(numberOfPlots: number, depositPaid?: number) {
  const plotPrice = PLOT_PRICE * numberOfPlots;
  const annualROI = plotPrice * ANNUAL_ROI_RATE;
  const deedFee = DEED_FEE_PER_PLOT * numberOfPlots;
  const surveyFee = SURVEY_FEE_PER_PLOT * numberOfPlots;
  const totalDocFees = deedFee + surveyFee;
  const totalPayable = plotPrice + totalDocFees;
  const balance = depositPaid ? totalPayable - depositPaid : 0; // Balance is on Total Payable
  const installmentDuration = numberOfPlots >= 2 ? 6 : 3;      // months

  return {
    plotPrice,
    annualROI,
    deedFee,
    surveyFee,
    totalDocFees,
    totalPayable,
    balance,
    installmentDuration
  };
}

function formatNaira(amount: number): string {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2
  }).format(amount).replace('NGN', '₦');
}

export default function DavidorlahGenerator() {
  // Client Hydration Safety
  const [isClient, setIsClient] = useState(false);

  // Form States
  const [assignee1Name, setAssignee1Name] = useState("");
  const [assignee2Name, setAssignee2Name] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [numberOfPlots, setNumberOfPlots] = useState(1);
  const [paymentType, setPaymentType] = useState<"full" | "installment">("full");
  const [depositPaid, setDepositPaid] = useState("");
  
  // Date Dropdowns (Default to current date)
  const [day, setDay] = useState("1");
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState("2026");

  // Document Blobs & Generate States
  const [isGenerating, setIsGenerating] = useState(false);
  const [docsReady, setDocsReady] = useState(false);
  const [deedBlob, setDeedBlob] = useState<Blob | null>(null);
  const [farmBlob, setFarmBlob] = useState<Blob | null>(null);

  // Set default current date on mount & ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    setDay(String(today.getDate()));
    setMonth(months[today.getMonth()]);
    setYear(String(today.getFullYear()));
  }, []);

  // Recalculate totals dynamically
  const totals = calculateTotals(
    numberOfPlots, 
    paymentType === "installment" && depositPaid.trim() ? Number(depositPaid) : undefined
  );

  const fiveYearRoi = totals.annualROI * 5;

  // Form Validation Rule
  const isFormValid = 
    assignee1Name.trim().length > 0 &&
    clientAddress.trim().length > 0 &&
    numberOfPlots >= 1 &&
    day !== "" &&
    month !== "" &&
    year !== "" &&
    (paymentType === "full" || 
      (paymentType === "installment" && 
       depositPaid.trim().length > 0 && 
       Number(depositPaid) > 0 &&
       Number(depositPaid) < totals.totalPayable));

  // Reset document states when any form inputs change to force re-generation
  const handleFormChange = (setter: any, val: any) => {
    setter(val);
    setDocsReady(false);
    setDeedBlob(null);
    setFarmBlob(null);
  };

  // Generate Handler: Compiles PDF layouts into Blobs in parallel
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsGenerating(true);
    setDocsReady(false);

    try {
      const formData: DocumentFormData = {
        assignee1Name: assignee1Name.toUpperCase().trim(),
        assignee2Name: assignee2Name.trim() ? assignee2Name.toUpperCase().trim() : undefined,
        clientAddress: clientAddress.toUpperCase().trim(),
        numberOfPlots,
        paymentType,
        depositPaid: paymentType === "installment" ? Number(depositPaid) : undefined,
        day,
        month,
        year
      };

      // Compile both documents in the background concurrently
      const [deed, farm] = await Promise.all([
        pdf(<DeedOfAssignment data={formData} totals={totals} />).toBlob(),
        pdf(<FarmManagementAgreement data={formData} totals={totals} />).toBlob()
      ]);

      setDeedBlob(deed);
      setFarmBlob(farm);
      setDocsReady(true);
    } catch (error) {
      console.error("Failed to generate PDF documents:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Download Action triggers
  const downloadDeed = () => {
    if (!deedBlob) return;
    const filename = `${assignee1Name.toUpperCase().replace(/\s+/g, '_')}_Deed_of_Assignment.pdf`;
    saveAs(deedBlob, filename);
  };

  const downloadFarmAgreement = () => {
    if (!farmBlob) return;
    const filename = `${assignee1Name.toUpperCase().replace(/\s+/g, '_')}_Farm_Management_Agreement.pdf`;
    saveAs(farmBlob, filename);
  };

  // Stepper helper
  const incrementPlots = () => {
    handleFormChange(setNumberOfPlots, numberOfPlots + 1);
  };

  const decrementPlots = () => {
    if (numberOfPlots > 1) {
      handleFormChange(setNumberOfPlots, numberOfPlots - 1);
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => String(i + 1));
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 10 }, (_, i) => String(2026 + i));

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 flex flex-col justify-between selection:bg-[#7AB648]/20 selection:text-white">
      {/* Header Navigation */}
      <header className="border-b border-zinc-900 bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-40 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Logo pulled from public/images/davidorlah_logo.png */}
            <div className="relative w-10 h-10 bg-zinc-950 border border-zinc-900 rounded-xl overflow-hidden flex items-center justify-center">
              <Image 
                src="/images/davidorlah_logo.png" 
                alt="Davidorlah Farms Logo" 
                fill 
                className="object-contain p-1"
                priority
              />
            </div>
            
            {/* Breadcrumb path */}
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider text-zinc-500">
                <Link href="/" className="hover:text-zinc-300 transition-colors">Maadan Tools</Link>
                <span>/</span>
                <span className="text-zinc-400">Davidorlah Farms</span>
              </div>
              <h2 className="font-semibold text-sm text-zinc-200">
                Farms Document Generator
              </h2>
            </div>
          </div>
          
          <Link 
            href="/"
            className="text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            <span className="hidden sm:inline">Storefront</span>
          </Link>
        </div>
      </header>

      {/* Main Form Dashboard */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 flex-grow py-12 relative z-10">
        <form onSubmit={handleGenerate} className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 items-start">
          
          {/* Left Column (55% / Flex-grow Form) */}
          <div className="flex flex-col gap-10 bg-zinc-950/20 border border-zinc-900 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
            
            {/* SECTION 1 — CLIENT INFORMATION */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#7AB648] shrink-0">
                  SECTION 1 &mdash; CLIENT INFORMATION
                </h3>
                <div className="h-[1px] bg-gradient-to-r from-[#7AB648]/40 to-transparent flex-grow" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-zinc-400 font-medium">Assignee 1 Full Name *</label>
                  <input 
                    type="text" 
                    required
                    value={assignee1Name}
                    onChange={(e) => handleFormChange(setAssignee1Name, e.target.value)}
                    placeholder="e.g. MR. KAYODE ABRAHAM MAYAH"
                    className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A]/80 border border-zinc-800 text-sm text-zinc-150 placeholder-zinc-650 focus:outline-none focus:border-[#7AB648] focus:ring-1 focus:ring-[#7AB648] transition-all"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-zinc-400 font-medium">Assignee 2 Full Name <span className="text-zinc-600 font-light">(Optional)</span></label>
                  <input 
                    type="text" 
                    value={assignee2Name}
                    onChange={(e) => handleFormChange(setAssignee2Name, e.target.value)}
                    placeholder="e.g. MRS. DORAH ERENARIFAGHA MAYAH"
                    className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A]/80 border border-zinc-800 text-sm text-zinc-150 placeholder-zinc-650 focus:outline-none focus:border-[#7AB648] focus:ring-1 focus:ring-[#7AB648] transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs text-zinc-400 font-medium">Client Residential Address *</label>
                <textarea 
                  required
                  rows={3}
                  value={clientAddress}
                  onChange={(e) => handleFormChange(setClientAddress, e.target.value)}
                  placeholder="e.g. 12 Bode Thomas Street, Surulere, Lagos"
                  className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A]/80 border border-zinc-800 text-sm text-zinc-150 placeholder-zinc-650 focus:outline-none focus:border-[#7AB648] focus:ring-1 focus:ring-[#7AB648] transition-all resize-none"
                />
              </div>
            </section>

            {/* SECTION 2 — PURCHASE DETAILS */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#7AB648] shrink-0">
                  SECTION 2 &mdash; PURCHASE DETAILS
                </h3>
                <div className="h-[1px] bg-gradient-to-r from-[#7AB648]/40 to-transparent flex-grow" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
                {/* Plots Counter */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-zinc-400 font-medium">Number of Plots</label>
                  <div className="flex items-center w-36 bg-[#1A1A1A]/80 border border-zinc-800 rounded-xl overflow-hidden p-1">
                    <button 
                      type="button"
                      disabled={numberOfPlots <= 1}
                      onClick={decrementPlots}
                      className="w-10 h-10 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:hover:bg-transparent transition-all font-semibold"
                    >
                      &minus;
                    </button>
                    <span className="flex-grow text-center font-mono font-bold text-sm text-zinc-200">{numberOfPlots}</span>
                    <button 
                      type="button"
                      onClick={incrementPlots}
                      className="w-10 h-10 flex items-center justify-center rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-all font-semibold"
                    >
                      &#43;
                    </button>
                  </div>
                </div>

                {/* Pill Toggle Payment Type */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs text-zinc-400 font-medium">Payment Type</label>
                  <div className="flex bg-[#1A1A1A]/80 border border-zinc-800 p-1.5 rounded-xl w-fit">
                    {(["full", "installment"] as const).map(type => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleFormChange(setPaymentType, type)}
                        className={`px-5 py-2 rounded-lg text-xs font-bold tracking-wide uppercase transition-all ${
                          paymentType === type 
                            ? 'bg-[#7AB648] text-black font-extrabold shadow-[0_0_12px_rgba(122,182,72,0.2)]'
                            : 'text-zinc-400 hover:text-zinc-250 bg-transparent'
                        }`}
                      >
                        {type === "full" ? "Full" : "Installment"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Installment Sliding Form Section */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  paymentType === "installment" ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#1A1A1A]/20 border border-zinc-900 rounded-2xl p-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-zinc-400 font-medium">Deposit Amount Paid (₦) *</label>
                    <input 
                      type="number" 
                      min="1"
                      required={paymentType === "installment"}
                      value={depositPaid}
                      onChange={(e) => handleFormChange(setDepositPaid, e.target.value)}
                      placeholder="e.g. 1500000"
                      className="w-full px-4 py-3 rounded-xl bg-[#1A1A1A]/80 border border-zinc-800 text-sm text-zinc-150 placeholder-zinc-650 focus:outline-none focus:border-[#7AB648] focus:ring-1 focus:ring-[#7AB648] transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-zinc-400 font-medium">Installment Duration</label>
                    <input 
                      type="text" 
                      readOnly
                      value={`${totals.installmentDuration} months`}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-800/10 border border-zinc-850 text-sm text-zinc-500 cursor-not-allowed select-none focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* SECTION 3 — AGREEMENT DATE */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <h3 className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#7AB648] shrink-0">
                  SECTION 3 &mdash; AGREEMENT DATE
                </h3>
                <div className="h-[1px] bg-gradient-to-r from-[#7AB648]/40 to-transparent flex-grow" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-zinc-500 font-mono uppercase">Day</label>
                  <select 
                    value={day}
                    onChange={(e) => handleFormChange(setDay, e.target.value)}
                    className="w-full px-3 py-3 rounded-xl bg-[#1A1A1A]/80 border border-zinc-800 text-sm text-zinc-150 focus:outline-none focus:border-[#7AB648] focus:ring-1 focus:ring-[#7AB648] transition-all"
                  >
                    {days.map(d => <option key={d} value={d} className="bg-[#1A1A1A]">{d}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-zinc-500 font-mono uppercase">Month</label>
                  <select 
                    value={month}
                    onChange={(e) => handleFormChange(setMonth, e.target.value)}
                    className="w-full px-3 py-3 rounded-xl bg-[#1A1A1A]/80 border border-zinc-800 text-sm text-zinc-150 focus:outline-none focus:border-[#7AB648] focus:ring-1 focus:ring-[#7AB648] transition-all"
                  >
                    {months.map(m => <option key={m} value={m} className="bg-[#1A1A1A]">{m}</option>)}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] text-zinc-500 font-mono uppercase">Year</label>
                  <select 
                    value={year}
                    onChange={(e) => handleFormChange(setYear, e.target.value)}
                    className="w-full px-3 py-3 rounded-xl bg-[#1A1A1A]/80 border border-zinc-800 text-sm text-zinc-150 focus:outline-none focus:border-[#7AB648] focus:ring-1 focus:ring-[#7AB648] transition-all"
                  >
                    {years.map(y => <option key={y} value={y} className="bg-[#1A1A1A]">{y}</option>)}
                  </select>
                </div>
              </div>
            </section>

          </div>

          {/* Right Column (45% / Sticky Summary Pane) */}
          <aside className="lg:sticky lg:top-28 h-fit flex flex-col gap-6">
            
            {/* Live Transaction Card */}
            <div className="bg-[#1A1A1A] border border-zinc-800 rounded-3xl p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
              
              <div className="absolute inset-0 bg-[radial-gradient(250px_circle_at_50%_-10%,rgba(122,182,72,0.035),transparent)] pointer-events-none" />

              <h3 className="font-mono text-[10px] font-bold tracking-widest text-zinc-500 uppercase border-b border-zinc-800 pb-3">
                TRANSACTION SUMMARY
              </h3>

              <div className="flex flex-col gap-4 font-mono text-[13px]">
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Plots</span>
                  <span className="text-zinc-200 font-bold">{numberOfPlots}</span>
                </div>
                
                <div className="h-[1px] bg-zinc-800/60" />
                
                <div className="flex justify-between items-center text-zinc-400">
                  <span>Plot Price</span>
                  <span className="text-zinc-200">{formatNaira(totals.plotPrice)}</span>
                </div>

                <div className="flex justify-between items-center text-zinc-400">
                  <span>Deed of Assignment</span>
                  <span className="text-zinc-200">{formatNaira(totals.deedFee)}</span>
                </div>

                <div className="flex justify-between items-center text-zinc-400">
                  <span>Perimeter Survey</span>
                  <span className="text-zinc-200">{formatNaira(totals.surveyFee)}</span>
                </div>

                <div className="h-[1px] bg-zinc-800/60" />

                <div className="flex justify-between items-center text-zinc-150 font-bold text-sm">
                  <span>Total Payable</span>
                  <span className="text-white text-base">{formatNaira(totals.totalPayable)}</span>
                </div>
              </div>

              {/* Annual ROI estimations */}
              <div className="bg-[#0A0A0A]/40 border border-zinc-850 rounded-2xl p-5 flex flex-col gap-3 font-mono text-[12px]">
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">Annual ROI (36%)</span>
                  <span className="text-[#7AB648] font-semibold">{formatNaira(totals.annualROI)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-500">ROI over 5 years</span>
                  <span className="text-[#7AB648] font-semibold">{formatNaira(fiveYearRoi)}</span>
                </div>
              </div>

              {/* Generate button action */}
              <button
                type="submit"
                disabled={!isFormValid || isGenerating}
                className={`w-full py-4 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                  !isFormValid
                    ? 'bg-zinc-800/40 text-zinc-650 border border-zinc-800 cursor-not-allowed'
                    : isGenerating
                    ? 'bg-[#7AB648]/60 text-black/60 cursor-wait border border-transparent'
                    : 'bg-[#7AB648] text-black font-extrabold hover:opacity-90 hover:scale-[0.99] border border-transparent shadow-[0_0_20px_rgba(122,182,72,0.15)]'
                }`}
              >
                {isGenerating ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Generating...</span>
                  </>
                ) : (
                  <span>Generate Documents</span>
                )}
              </button>
            </div>

            {/* Document Downloads Panel */}
            <div className="bg-[#1A1A1A] border border-zinc-800 rounded-3xl p-6 flex flex-col gap-4">
              <h4 className="font-mono text-[9px] font-bold tracking-widest text-zinc-550 uppercase">
                Downloads Panel
              </h4>
              
              {isClient && docsReady ? (
                <div className="flex flex-col gap-3">
                  <button 
                    type="button"
                    onClick={downloadDeed}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-zinc-800 hover:border-[#7AB648] hover:bg-[#7AB648]/5 text-xs font-semibold text-zinc-200 transition-colors"
                  >
                    ↓ Download Deed of Assignment
                  </button>

                  <button 
                    type="button"
                    onClick={downloadFarmAgreement}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 border border-zinc-800 hover:border-[#7AB648] hover:bg-[#7AB648]/5 text-xs font-semibold text-zinc-200 transition-colors"
                  >
                    ↓ Download Farm Management Agreement
                  </button>
                </div>
              ) : (
                <div className="text-center py-6 px-4 border border-dashed border-zinc-800 rounded-2xl flex items-center justify-center">
                  <span className="text-xs text-zinc-550 italic font-light">
                    Documents will appear here after generation
                  </span>
                </div>
              )}
            </div>

          </aside>
        </form>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 px-6 text-center text-xs font-mono text-zinc-600 relative z-10 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="https://maadan.dev" className="hover:text-zinc-400 transition-colors">maadan.dev</a>
          <span>Built by Maadan Dev &copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
