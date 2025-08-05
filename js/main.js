document.addEventListener("DOMContentLoaded", () => {
  const defaultLang = "en";
  const supportedLangs = ["en", "es", "jp"];

  let urlParams = new URLSearchParams(window.location.search);
  let langParam = urlParams.get("lang");

  let lang = localStorage.getItem("lang");
  if (!lang) {
    lang = supportedLangs.includes(langParam) ? langParam : defaultLang;
  }

  fetch("data/strings.json")
    .then(res => res.json())
    .then(strings => {
      applyTranslations(strings, lang);

      document.querySelectorAll(".lang-selector button").forEach(button => {
        button.classList.toggle("active", button.dataset.lang === lang);

        button.addEventListener("click", () => {
          const selectedLang = button.dataset.lang;
          if (supportedLangs.includes(selectedLang)) {
            localStorage.setItem("lang", selectedLang);
            applyTranslations(strings, selectedLang);
            history.replaceState(null, "", `?lang=${selectedLang}`);

            // Cambiar el botón activo
            document.querySelectorAll(".lang-selector button").forEach(btn =>
              btn.classList.toggle("active", btn.dataset.lang === selectedLang)
            );
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

    const htmlKeys = ["intro"]; // claves que permiten HTML

    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      const translation = translations[key];
      if (translation) {
        if (htmlKeys.includes(key)) {
          el.innerHTML = translation.replace(/\n/g, "<br>");
        } else {
          el.textContent = translation;
        }
      }
    });
  }
});