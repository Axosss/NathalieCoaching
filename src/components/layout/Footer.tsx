import { BUSINESS_INFO } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} {BUSINESS_INFO.name}. Tous droits reserves.
          </p>
          <div className="flex items-center gap-6">
            {BUSINESS_INFO.social.linkedin && (
              <a
                href={BUSINESS_INFO.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
              >
                LinkedIn
              </a>
            )}
            {BUSINESS_INFO.social.instagram && (
              <a
                href={BUSINESS_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
              >
                Instagram
              </a>
            )}
            <a
              href="/mentions-legales"
              className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
            >
              Mentions legales
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
