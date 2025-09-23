document.addEventListener("DOMContentLoaded", () => {
  const defaultLang = "en";
  let lang = localStorage.getItem("lang") || 
             (new URLSearchParams(window.location.search).get("lang") || 
             defaultLang);

  // Initialize particles.js
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#c084fc" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#8e6dc5",
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true
      }
    },
    retina_detect: true
  });

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
      const htmlKeys = ["intro", "footer_quote", "hero_description"];

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
      }, 1000);
    });
  }
  
  // Scroll animations
  const fadeElements = document.querySelectorAll('.fade-in');
  
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  fadeElements.forEach(el => {
    fadeInObserver.observe(el);
  });

  // Script para filtrado de portfolio con animaciones
  const portfolioFilters = document.querySelectorAll(".filter-btn");
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
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const targetPosition = targetElement.offsetTop - (window.innerWidth >= 992 ? 0 : 75);
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===============================
  // FUNCIONALIDADES PARA EL TFG DESTACADO
  // ===============================

  // Función especial para destacar el TFG con efectos adicionales
  function highlightTFG() {
    const tfgItem = document.querySelector('.portfolio-item.highlighted');
    
    if (tfgItem) {
      // Efecto de parpadeo suave cada 10 segundos
      setInterval(() => {
        tfgItem.style.animation = 'golden-border 4s ease, pulse 2s ease';
        setTimeout(() => {
          tfgItem.style.animation = 'golden-border 4s ease infinite';
        }, 2000);
      }, 10000);
      
      // Añadir tooltip al pasar el ratón
      tfgItem.setAttribute('title', 'Trabajo de Fin de Grado - Proyecto Destacado');
    }
  }

  // Aplicar traducciones específicas para el TFG
  function applyTFGTranslations(translations) {
    const tfgElements = document.querySelectorAll('.portfolio-item.highlighted [data-i18n]');
    tfgElements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[key]) {
        element.textContent = translations[key];
      }
    });
  }

  // Inicializar el TFG destacado
  highlightTFG();

  // Aplicar traducciones al TFG cuando cambie el idioma
  document.addEventListener('langChanged', (e) => {
    const strings = JSON.parse(sessionStorage.getItem("strings"));
    if (strings && strings[e.detail.lang]) {
      applyTFGTranslations(strings[e.detail.lang]);
    }
  });

  // Función para actualizar favicon según el tema del sistema
  function updateFaviconForTheme() {
    const lightFavicon = document.getElementById('light-favicon');
    const darkFavicon = document.getElementById('dark-favicon');
    const defaultFavicon = document.getElementById('default-favicon');
    
    // Verificar si el navegador soporta prefers-color-scheme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // Modo oscuro
      if (darkFavicon) {
        defaultFavicon.href = darkFavicon.href;
      }
    } else {
      // Modo claro
      if (lightFavicon) {
        defaultFavicon.href = lightFavicon.href;
      }
    }
  }

  // Escuchar cambios en la preferencia de tema
  if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeQuery.addEventListener('change', updateFaviconForTheme);
  }

  // Inicializar al cargar la página
  document.addEventListener('DOMContentLoaded', updateFaviconForTheme);
});