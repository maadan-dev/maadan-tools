import Link from "next/link";
import Image from "next/image";

interface ToolCardProps {
  title: string;
  description: string;
  badge: "Live Demo" | "Coming Soon";
  href?: string;
  icon: React.ReactNode;
}

function ToolCard({ title, description, badge, href, icon }: ToolCardProps) {
  const isLive = badge === "Live Demo";
  
  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (isLive && href) {
      return (
        <Link 
          href={href}
          className="group relative bg-zinc-900/30 border border-zinc-800 rounded-3xl p-8 backdrop-blur-md flex flex-col gap-6 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-2xl hover:shadow-blue-500/5"
        >
          {children}
        </Link>
      );
    }
    return (
      <div className="relative bg-zinc-900/10 border border-zinc-800/50 rounded-3xl p-8 backdrop-blur-sm flex flex-col gap-6 opacity-60">
        {children}
      </div>
    );
  };

  return (
    <CardWrapper>
      <div className="flex justify-between items-start gap-4">
        <div className="p-3 rounded-2xl bg-zinc-800/30 border border-zinc-850 text-zinc-400 group-hover:text-blue-400 group-hover:border-blue-500/25 transition-all">
          {icon}
        </div>
        <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
          isLive 
            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
            : 'bg-zinc-800/40 text-zinc-500 border border-zinc-800/60'
        }`}>
          {badge}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-lg text-zinc-100 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-sm text-zinc-450 leading-relaxed font-light">
          {description}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-zinc-800/40">
        {isLive && href ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400 group-hover:gap-3 transition-all">
            <span>Open Tool</span>
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-zinc-550">
            Locked
          </span>
        )}
      </div>
    </CardWrapper>
  );
}

export default function Storefront() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col justify-between selection:bg-blue-600 selection:text-white">
      {/* Background glow grids */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,rgba(59,130,246,0.06),transparent_100%)] pointer-events-none" />

      {/* Main Container */}
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 flex-grow flex flex-col justify-center py-20 relative z-10">
        {/* Header */}
        <header className="flex flex-col items-center text-center gap-6 mb-20">
          <div className="relative h-7 w-48 mb-2">
            <Image 
              src="/logo_horizontal.png" 
              alt="Maadan Dev Logo" 
              fill
              className="object-contain opacity-90"
              priority
            />
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-bold text-3xl md:text-5xl leading-tight tracking-tight uppercase max-w-2xl bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
              Document Automation Tools <br /> for Nigerian Businesses
            </h1>
            <p className="text-sm md:text-base text-zinc-500 max-w-md mx-auto font-light leading-relaxed">
              Auto-generate customized legal, sales, and business documents optimized for local operations.
            </p>
          </div>
        </header>

        {/* Tools Directory Grid */}
        <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ToolCard 
            title="Davidorlah Farms Generator"
            description="Instantly generate custom Deed of Assignment and Farm Management Agreements with legal coordinates."
            badge="Live Demo"
            href="/davidorlah"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5A3.375 3.375 0 0 0 10.125 2.25H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            }
          />
          <ToolCard 
            title="Tenancy Agreement Creator"
            description="Generate standard landlord-tenant leases for residential and commercial properties in Lagos State."
            badge="Coming Soon"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
            }
          />
          <ToolCard 
            title="NDA & Non-Compete Creator"
            description="Create legally binding non-disclosure agreements tailored for tech startups and contractor agreements."
            badge="Coming Soon"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.599-3.747A11.96 11.96 0 0 1 12 2.712V2.75Z" />
              </svg>
            }
          />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-900 py-8 px-6 text-center text-xs font-mono text-zinc-600 relative z-10 bg-[#050505]">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <a href="https://maadan.dev" className="hover:text-zinc-400 transition-colors">maadan.dev</a>
          <span>Built by Maadan Dev &copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
