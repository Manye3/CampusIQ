import Link from 'next/link';
import { Home, GraduationCap } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <p className="text-8xl font-bold text-gray-200 select-none">404</p>
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold text-gray-900">
            Page Not Found
          </h1>
          <p className="text-gray-500 max-w-sm mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-navy-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
          >
            <GraduationCap className="h-4 w-4" />
            Explore Colleges
          </Link>
        </div>
      </div>
    </div>
  );
}
