import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Colleges', href: '/colleges' },
  { label: 'Compare', href: '/compare' },
  { label: 'Saved', href: '/saved' },
] as const;

const COMPANY_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Contact', href: '/contact' },
] as const;

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white hover:text-indigo-400 transition-colors"
            >
              <GraduationCap className="h-7 w-7" />
              <span className="text-xl font-heading font-bold tracking-tight">
                CampusIQ
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              Helping students find their perfect college. Search, compare, and
              shortlist top institutions across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <p className="text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} CampusIQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
