document.addEventListener("DOMContentLoaded", () => {
  const defaultLang = "en";
  const supportedLangs = ["en", "es", "jp"];

  let lang = localStorage.getItem("lang");
  if (!lang) {
    const browserLang = navigator.language.slice(0, 2).toLowerCase();
    lang = supportedLangs.includes(browserLang) ? browserLang : defaultLang;
  }

  fetch("data/strings.json")
    .then(res => res.json())
    .then(strings => {
      applyTranslations(strings, lang);

      document.querySelectorAll(".lang-selector button").forEach(button => {
        button.addEventListener("click", () => {
          const selectedLang = button.dataset.lang;
          console.log("Idioma seleccionado:", selectedLang);
          if (supportedLangs.includes(selectedLang)) {
            localStorage.setItem("lang", selectedLang);
            applyTranslations(strings, selectedLang);
            history.replaceState(null, "", `?lang=${selectedLang}`); // opcional
          }
        });
      });
    })
    .catch(err => console.error("Error loading translations:", err));

  function applyTranslations(strings, lang) {
    const translations = strings[lang];
    if (!translations) {
      console.warn("Idioma no encontrado:", lang);
      return;
    }

    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const translation = translations[key];
      if (translation) {
        el.innerHTML = translation.replace(/\n/g, "<br>");
      }
    });
  }
});