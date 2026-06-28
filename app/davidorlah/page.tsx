import Link from "next/link";

export default function DavidorlahPlaceholder() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Background glow grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(59,130,246,0.06),transparent_100%)] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-4xl mx-auto px-6 md:px-12 flex-grow flex flex-col justify-center py-20 relative z-10">
        {/* Back navigation */}
        <div className="mb-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            <span>Back to storefront</span>
          </Link>
        </div>

        {/* Placeholder Box */}
        <main className="bg-zinc-900/30 border border-zinc-800 rounded-3xl p-12 backdrop-blur-md flex flex-col gap-6 text-center max-w-xl mx-auto">
          <div className="mx-auto p-4 rounded-2xl bg-zinc-800/30 border border-zinc-850 text-blue-400 w-fit">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5A3.375 3.375 0 0 0 10.125 2.25H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl text-zinc-100 uppercase tracking-tight">
              Davidorlah Farms Generator
            </h1>
            <p className="text-sm text-zinc-450 leading-relaxed font-light">
              This automation tool is ready for template mapping. The input forms and PDF renderer will be loaded here.
            </p>
          </div>

          <div className="border-t border-zinc-800/60 pt-6 mt-4">
            <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
              Ready for Integration
            </span>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 px-6 text-center text-xs font-mono text-zinc-600 relative z-10 bg-[#050505]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="https://maadan.dev" className="hover:text-zinc-400 transition-colors">maadan.dev</a>
          <span>Built by Maadan Dev &copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
