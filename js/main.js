document.addEventListener("DOMContentLoaded", () => {
  const defaultLang = "en";
  let lang = localStorage.getItem("lang") || 
             (new URLSearchParams(window.location.search).get("lang") || 
             defaultLang);

  // Precargar traducciones desde sessionStorage si están disponibles
  const stringsCache = sessionStorage.getItem("strings");
  const strings = stringsCache ? JSON.parse(stringsCache) : null;

  // Función para aplicar traducciones
  function applyTranslations(strings, lang) {
    const translations = strings[lang];
    if (!translations) {
      console.warn("Idioma no encontrado:", lang);
      return;
    }

    document.documentElement.lang = lang;

    const htmlKeys = ["intro", "footer_quote"];

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

  // Si tenemos traducciones en caché, aplicarlas inmediatamente
  if (strings) {
    applyTranslations(strings, lang);
    setupLanguageButtons();
  }

  // Cargar las traducciones desde el archivo JSON
  fetch("data/strings.json")
    .then(res => res.json())
    .then(data => {
      sessionStorage.setItem("strings", JSON.stringify(data));
      
      if (!strings) {
        applyTranslations(data, lang);
        setupLanguageButtons();
      }
    })
    .catch(err => console.error("Error loading translations:", err));

  // Configurar botones de idioma
  function setupLanguageButtons() {
    document.querySelectorAll(".lang-selector-nav button").forEach(button => {
      if (button.dataset.lang === lang) {
        button.classList.add("active");
      }
      
      button.addEventListener("click", () => {
        const selectedLang = button.dataset.lang;
        if (selectedLang === lang) return;
        
        localStorage.setItem("lang", selectedLang);
        lang = selectedLang;
        
        const url = new URL(window.location);
        url.searchParams.set("lang", selectedLang);
        history.replaceState(null, "", url);
        
        location.reload();
      });
    });
  }

  // Script para el loader
  const loader = document.getElementById('loader');
  if(loader) {
    window.addEventListener('load', function() {
      setTimeout(() => {
        loader.classList.add('loader-hidden');
        
        loader.addEventListener('transitionend', () => {
          if(loader.parentNode) {
            loader.parentNode.removeChild(loader);
          }
        }, { once: true });
      }, 800);
    });
  }
  
  // Script para filtrado de portfolio con animaciones
  const portfolioFilters = document.querySelectorAll("#portfolio-filters li");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  
  if(portfolioFilters.length > 0 && portfolioItems.length > 0) {
    portfolioFilters.forEach(filter => {
      filter.addEventListener("click", function() {
        if(this.classList.contains('active')) return;
        
        portfolioFilters.forEach(f => f.classList.remove("active"));
        this.classList.add("active");
        
        const filterValue = this.getAttribute("data-filter");
        
        portfolioItems.forEach(item => {
          item.style.transition = "opacity 0.3s ease, transform 0.3s ease";
          
          if(filterValue === '*' || item.classList.contains(filterValue.slice(1))) {
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
            
            setTimeout(() => {
              item.style.display = "block";
              setTimeout(() => {
                item.style.opacity = "1";
                item.style.transform = "scale(1)";
              }, 50);
            }, 300);
          } else {
            item.style.opacity = "0";
            item.style.transform = "scale(0.8)";
            setTimeout(() => item.style.display = "none", 300);
          }
        });
      });
    });
  }

  // Smooth scrolling para enlaces de navegación
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const targetPosition = targetElement.offsetTop - 75;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        const navbarToggler = document.querySelector('.navbar-toggler');
        
        if (navbarToggler && !navbarToggler.classList.contains('collapsed')) {
          navbarToggler.click();
        }
      }
    });
  });
});