import { useEffect, useState } from "react";

const visibilityThreshold = 360;

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > visibilityThreshold);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <button
      aria-label="Zurück nach oben scrollen"
      className={`back-to-top${isVisible ? " is-visible" : ""}`}
      onClick={scrollToTop}
      type="button"
    >
      <span aria-hidden="true">↑</span>
    </button>
  );
}
