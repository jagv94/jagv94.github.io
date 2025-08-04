document.addEventListener("DOMContentLoaded", () => {
  const defaultLang = "en";
  const supportedLangs = ["en", "es", "jp"];

  // Detect browser language
  let lang = navigator.language.slice(0, 2);
  if (!supportedLangs.includes(lang)) lang = defaultLang;

  // Load strings
  fetch("/data/strings.json")
    .then(res => res.json())
    .then(strings => {
      applyTranslations(strings, lang);

      // Set up manual language switch
      document.querySelectorAll("[data-lang]").forEach(btn => {
        btn.addEventListener("click", () => {
          const selected = btn.getAttribute("data-lang");
          applyTranslations(strings, selected);
        });
      });
    });

  function applyTranslations(strings, lang) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const translation = strings[lang][key];
      if (translation) el.innerHTML = translation.replace(/\n/g, "<br>");
    });

    document.documentElement.lang = lang;
  }
});