document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  let lang = urlParams.get("lang");

  if (lang === "auto" || !lang) {
    const browserLang = navigator.language || navigator.userLanguage;
    lang = browserLang.startsWith("es") ? "es" :
           browserLang.startsWith("ja") ? "jp" : "en";
  }

  setLanguage(lang);

  // Botón o selector para cambiar idioma manualmente
  document.querySelectorAll(".lang-selector").forEach(button => {
    button.addEventListener("click", () => {
      const selectedLang = button.dataset.lang;
      setLanguage(selectedLang);
      history.replaceState(null, "", `?lang=${selectedLang}`);
    });
  });
});

function setLanguage(lang) {
  fetch("/data/strings.json")
    .then(res => res.json())
    .then(texts => {
      const t = texts[lang];
      for (const key in t) {
        const el = document.querySelector(`[data-i18n="${key}"]`);
        if (el) el.textContent = t[key];
      }
    });
}