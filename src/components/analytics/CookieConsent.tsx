"use client";

import { useState, useEffect } from "react";
import { Cookie } from "lucide-react";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowBanner(false);
    window.dispatchEvent(new Event("cookie-consent-accepted"));
  };

  const handleRefuse = () => {
    localStorage.setItem("cookie-consent", "refused");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <>
      <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-2xl max-w-lg w-full p-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-stone-100 rounded-full">
              <Cookie className="w-6 h-6 text-stone-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Nous utilisons des cookies
            </h2>
          </div>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Ce site utilise des cookies pour ameliorer votre experience de navigation
            et analyser le trafic. En acceptant, vous nous aidez a ameliorer nos services.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={handleAccept}
              className="w-full sm:w-auto px-6 py-3 text-sm font-medium bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
            >
              Accepter les cookies
            </button>
            <button
              onClick={handleRefuse}
              className="w-full sm:w-auto px-6 py-3 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Refuser
            </button>
          </div>
          <p className="text-xs text-gray-400 mt-4 text-center">
            En savoir plus dans nos{" "}
            <a href="/mentions-legales" className="underline hover:text-stone-600">
              mentions legales
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
