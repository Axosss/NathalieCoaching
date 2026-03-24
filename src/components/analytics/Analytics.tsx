"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "./GoogleAnalytics";

export function Analytics() {
  const [hasConsent, setHasConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    setHasConsent(consent === "accepted");

    const handleConsentAccepted = () => {
      setHasConsent(true);
    };

    window.addEventListener("cookie-consent-accepted", handleConsentAccepted);
    return () => {
      window.removeEventListener("cookie-consent-accepted", handleConsentAccepted);
    };
  }, []);

  if (!hasConsent) return null;

  return <GoogleAnalytics />;
}
