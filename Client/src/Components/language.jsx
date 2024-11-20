import React, { useState, useEffect } from "react";

const LanguageSelector = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [language, setLanguage] = useState("en");

  // Load language preference from localStorage when the component mounts
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Update localStorage and reload the page when language changes
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
    window.location.reload(); // Reload to apply changes
  };

  return (
    <div className="relative inline-block">
      {/* Language Button */}
      <button
        className="btn btn-primary"
        onClick={() => setShowPopup(!showPopup)}
      >
        Select Language
      </button>

      {/* Language Options Pop-Up */}
      {showPopup && (
        <div className="absolute mt-2 bg-white shadow-lg rounded-md w-40 z-50 text-center">
          <button
            className={`py-2 px-4 w-full hover:bg-gray-200 ${
              language === "en" ? "font-bold text-blue-500" : ""
            }`}
            onClick={() => handleLanguageChange("en")}
          >
            English
          </button>
          <button
            className={`py-2 px-4 w-full hover:bg-gray-200 ${
              language === "bn" ? "font-bold text-blue-500" : ""
            }`}
            onClick={() => handleLanguageChange("bn")}
          >
            Bengali
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
