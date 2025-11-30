import { Github, Linkedin, Mail, MapPin, Heart } from "lucide-react";
import { trackEvent } from "@/app/lib/analytics";

// PRD Phase 6: Footer with social links and performance metrics
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-gradient-to-b from-bg-secondary to-bg-primary px-6 py-12 lg:px-12 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="space-y-3">
            <p className="text-xl font-bold text-white lg:text-2xl">Oscar Ndugbu</p>
            <p className="text-base text-gray-400">Full-Stack ML Engineer</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <MapPin className="h-4 w-4 text-green-500" />
              <span>Nigeria 🇳🇬 • Remote-First</span>
            </div>
            <p className="text-sm italic text-cyan-400/80">&quot;Ship it, then iterate.&quot;</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/scardubu"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("Footer", "Click", "GitHub")}
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-gray-300 transition-all hover:border-cyan-400/50 hover:text-cyan-400"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/oscardubu"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("Footer", "Click", "LinkedIn")}
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-gray-300 transition-all hover:border-blue-400/50 hover:text-blue-400"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="mailto:scardubu@gmail.com"
              onClick={() => trackEvent("Footer", "Click", "Email")}
              className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-4 py-2 text-sm text-gray-300 transition-all hover:border-green-400/50 hover:text-green-400"
            >
              <Mail className="h-4 w-4" />
              Email
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/5 pt-8 md:flex-row md:justify-between">
          <p className="flex items-center gap-1 text-sm text-gray-500">
            © {currentYear} Oscar Ndugbu. Built with <Heart className="h-4 w-4 text-red-500" /> in Naija.
          </p>
          <p className="text-xs text-gray-600">Next.js 16 • React 19 • Tailwind CSS 4</p>
        </div>
      </div>
    </footer>
  );
}

