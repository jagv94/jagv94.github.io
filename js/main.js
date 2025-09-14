document.addEventListener("DOMContentLoaded", () => {
  const defaultLang = "en";
  let lang = localStorage.getItem("lang") || 
             (new URLSearchParams(window.location.search).get("lang") || 
             defaultLang);

  // Elementos de la navegación lateral
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarOverlay = document.getElementById('sidebarOverlay');

  // Toggle sidebar en móviles
  if (sidebarToggle && sidebar && sidebarOverlay) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      sidebarOverlay.classList.toggle('active');
      document.body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    });

    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Cerrar sidebar al hacer clic en un enlace (en móviles)
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1200) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  });

  // Función para aplicar traducciones con animación suave
  function applyTranslations(strings, lang) {
    const translations = strings[lang];
    if (!translations) {
      console.warn("Idioma no encontrado:", lang);
      return;
    }

    document.documentElement.lang = lang;

    // Añadir clase de transición a todos los elementos traducibles
    document.querySelectorAll("[data-i18n]").forEach(el => {
      el.classList.add("i18n-changing");
    });

    setTimeout(() => {
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
        el.classList.remove("i18n-changing");
      });
    }, 150);
  }

  // Configurar botones de idioma
  function setupLanguageButtons() {
    document.querySelectorAll(".lang-btn").forEach(button => {
      if (button.dataset.lang === lang) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
      
      button.addEventListener("click", () => {
        const selectedLang = button.dataset.lang;
        if (selectedLang === lang) return;
        
        // Actualizar botones activos
        document.querySelectorAll(".lang-btn").forEach(btn => {
          btn.classList.remove("active");
        });
        button.classList.add("active");
        
        localStorage.setItem("lang", selectedLang);
        lang = selectedLang;
        
        const url = new URL(window.location);
        url.searchParams.set("lang", selectedLang);
        history.replaceState(null, "", url);
        
        // Aplicar traducciones sin recargar
        const strings = JSON.parse(sessionStorage.getItem("strings"));
        if (strings) {
          applyTranslations(strings, lang);
        } else {
          // Si no hay cached, recargar
          location.reload();
        }
      });
    });
  }

  // Precargar traducciones desde sessionStorage si están disponibles
  const stringsCache = sessionStorage.getItem("strings");
  const strings = stringsCache ? JSON.parse(stringsCache) : null;

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

  // Smooth scrolling para enlaces de navegación - CORREGIDO
  document.querySelectorAll('.sidebar-link, .navbar-nav .nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Calcular la posición considerando el header fijo y posibles offsets
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        
        // Cerrar sidebar en móviles después de hacer clic
        if (window.innerWidth < 1200) {
          if (sidebar && sidebarOverlay) {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
          }
        }
      }
    });
  });

  // Prevenir el comportamiento por defecto de los enlaces del filtro de portfolio
  document.querySelectorAll('#portfolio-filters li').forEach(filter => {
    filter.addEventListener('click', function(e) {
      e.preventDefault();
    });
  });
});