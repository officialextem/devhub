import { useEffect, useState } from "react";

const storageKey = "extem-devhub-cookie-notice-accepted";

function canUseStorage() {
  try {
    const testKey = `${storageKey}-test`;
    window.localStorage.setItem(testKey, "1");
    window.localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [storageAvailable, setStorageAvailable] = useState(false);

  useEffect(() => {
    const hasStorage = canUseStorage();
    setStorageAvailable(hasStorage);

    if (!hasStorage) {
      setIsVisible(true);
      return;
    }

    setIsVisible(window.localStorage.getItem(storageKey) !== "true");
  }, []);

  function acceptNotice() {
    if (storageAvailable) {
      try {
        window.localStorage.setItem(storageKey, "true");
      } catch {
        // Storage can become unavailable after initial detection; the banner still closes.
      }
    }

    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <div className="cookie-banner" role="status">
      <p>
        Die Website nutzt derzeit keine Tracking- oder Marketing-Cookies. Technisch
        notwendige Funktionen und lokale Anzeigeeinstellungen können verwendet werden.
      </p>
      <button type="button" onClick={acceptNotice}>
        Verstanden
      </button>
    </div>
  );
}
