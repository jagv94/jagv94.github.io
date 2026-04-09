document.addEventListener("DOMContentLoaded", () => {
  const defaultLang = "en";
  const supportedLangs = new Set(["en", "es", "ja"]);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let lang = new URLSearchParams(window.location.search).get("lang") || localStorage.getItem("lang") || defaultLang;

  if (!supportedLangs.has(lang)) {
    lang = defaultLang;
  }

  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);

  // Initialize particles.js only on larger screens when motion is allowed
  const particlesContainer = document.getElementById("particles-js");
  const shouldEnableParticles = particlesContainer && !prefersReducedMotion.matches && window.innerWidth >= 992;

  if (shouldEnableParticles && typeof particlesJS === "function") {
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
  } else if (particlesContainer) {
    particlesContainer.style.display = "none";
  }

  // Elementos de la navegación lateral
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const resumeLink = document.getElementById("resume-link");

  // Toggle sidebar en móviles
  if (sidebarToggle && sidebar && sidebarOverlay) {
    sidebarToggle.addEventListener('click', () => {
      const isActive = sidebar.classList.toggle('active');
      sidebarOverlay.classList.toggle('active', isActive);
      sidebarToggle.setAttribute('aria-expanded', String(isActive));
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
      sidebarToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  }

  // Cerrar sidebar al hacer clic en un enlace (en móviles)
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 1200) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        if (sidebarToggle) {
          sidebarToggle.setAttribute('aria-expanded', 'false');
        }
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

  function updateResumeLink(currentLang) {
    if (!resumeLink) return;

    const resumeByLang = {
      es: resumeLink.dataset.cvEs,
      en: resumeLink.dataset.cvEn,
      ja: resumeLink.dataset.cvJa || resumeLink.dataset.cvEn
    };

    resumeLink.href = resumeByLang[currentLang] || resumeByLang.en || resumeByLang.es;
  }

  updateResumeLink(lang);

  // Configurar botones de idioma
  function setupLanguageButtons() {
    document.querySelectorAll(".lang-btn").forEach(button => {
      const isActive = button.dataset.lang === lang;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
      
      button.addEventListener("click", () => {
        const selectedLang = button.dataset.lang;
        if (selectedLang === lang) return;
        
        // Actualizar botones activos
        document.querySelectorAll(".lang-btn").forEach(btn => {
          btn.classList.remove("active");
          btn.setAttribute("aria-pressed", "false");
        });
        button.classList.add("active");
        button.setAttribute("aria-pressed", "true");
        
        localStorage.setItem("lang", selectedLang);
        lang = selectedLang;
        
        const url = new URL(window.location);
        url.searchParams.set("lang", selectedLang);
        history.replaceState(null, "", url);
        
        // Aplicar traducciones sin recargar
        const strings = JSON.parse(sessionStorage.getItem("strings"));
        if (strings) {
          applyTranslations(strings, lang);
          updateResumeLink(lang);
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
  const hasCachedTranslations = Boolean(strings && strings[lang]);

  // Si tenemos traducciones en caché, aplicarlas inmediatamente
  if (hasCachedTranslations) {
    applyTranslations(strings, lang);
    updateResumeLink(lang);
    setupLanguageButtons();
  }

  // Cargar las traducciones desde el archivo JSON
  fetch("data/strings.json")
    .then(res => res.json())
    .then(data => {
      sessionStorage.setItem("strings", JSON.stringify(data));
      
      if (!hasCachedTranslations) {
        applyTranslations(data, lang);
        updateResumeLink(lang);
        setupLanguageButtons();
      }
    })
    .catch(err => console.error("Error loading translations:", err));

  // Script para el loader
  const loader = document.getElementById('loader');
  if(loader) {
    const hideLoader = () => {
      const loaderHideDelay = prefersReducedMotion.matches ? 0 : 150;

      setTimeout(() => {
        loader.classList.add('loader-hidden');
        
        loader.addEventListener('transitionend', () => {
          if(loader.parentNode) {
            loader.parentNode.removeChild(loader);
          }
        }, { once: true });
      }, loaderHideDelay);
    };

    if (document.readyState === 'complete') {
      hideLoader();
    } else {
      window.addEventListener('load', hideLoader, { once: true });
    }
  }
  
  // Scroll animations
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (prefersReducedMotion.matches) {
    fadeElements.forEach(el => {
      el.classList.add('visible');
    });
  } else {
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
  }

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
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
        });
      }
    });
  });

  // ===============================
  // FUNCIONALIDADES PARA LA GALERÍA DESTACADA - VERSIÓN MEJORADA
  // ===============================

  // Función para inicializar la galería destacada
  function initFeaturedGallery() {
    const panels = document.querySelectorAll('.featured-panel');
    const gallery = document.querySelector('.featured-gallery');
    
    if (!panels.length || !gallery) return;
    
    // Detectar si es móvil
    const isMobile = window.innerWidth < 992;
    
    // Añadir clase al cargar para animación de entrada
    setTimeout(() => {
      gallery.classList.add('gallery-loaded');
    }, prefersReducedMotion.matches ? 0 : 500);
    
    if (isMobile) {
      // COMPORTAMIENTO PARA MÓVIL (clic en lugar de hover)
      panels.forEach(panel => {
        // Añadir botón de cierre si no existe
        let closeBtn = panel.querySelector('.mobile-close-btn');
        if (!closeBtn) {
          closeBtn = document.createElement('button');
          closeBtn.className = 'mobile-close-btn d-lg-none';
          closeBtn.innerHTML = '<i class="fas fa-times"></i>';
          closeBtn.setAttribute('aria-label', 'Close');
          closeBtn.style.display = 'none'; // Oculto por defecto
          panel.querySelector('.panel-expanded-content').appendChild(closeBtn);
        }
        
        // Evento para expandir el panel
        panel.addEventListener('click', function(e) {
          // No hacer nada si se hace clic en el botón de cierre
          if (e.target.closest('.mobile-close-btn')) return;
          
          e.stopPropagation();
          
          // Si ya está expandido, no hacer nada
          if (this.classList.contains('mobile-expanded')) return;
          
          // Contraer todos los paneles primero
          panels.forEach(p => {
            p.classList.remove('mobile-expanded');
            const btn = p.querySelector('.mobile-close-btn');
            if (btn) btn.style.display = 'none';
          });
          
          // Expandir este panel
          this.classList.add('mobile-expanded');
          
          // Mostrar botón de cierre
          const thisCloseBtn = this.querySelector('.mobile-close-btn');
          if (thisCloseBtn) {
            thisCloseBtn.style.display = 'flex';
          }
          
          // Desplazar suavemente para que sea visible
          setTimeout(() => {
            this.scrollIntoView({ 
              behavior: prefersReducedMotion.matches ? 'auto' : 'smooth', 
              block: 'nearest',
              inline: 'nearest'
            });
          }, 100);
        });
        
        // Configurar botón de cierre
        closeBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          e.preventDefault();
          
          // Remover clase de expansión
          panel.classList.remove('mobile-expanded');
          
          // Ocultar botón de cierre
          this.style.display = 'none';
          
          // Forzar que la imagen vuelva a ser visible
          const imageWrapper = panel.querySelector('.panel-image-wrapper');
          const image = panel.querySelector('.panel-image');
          
          if (imageWrapper) {
            imageWrapper.style.opacity = '1';
            imageWrapper.style.zIndex = '1';
          }
          
          if (image) {
            image.style.opacity = '1';
            image.style.visibility = 'visible';
            image.style.display = 'block';
          }
        });
      });
      
      // Cerrar al hacer clic fuera (solo si está expandido)
      document.addEventListener('click', function(e) {
        if (!e.target.closest('.featured-panel.mobile-expanded') && 
            document.querySelector('.featured-panel.mobile-expanded')) {
          panels.forEach(p => {
            p.classList.remove('mobile-expanded');
            const btn = p.querySelector('.mobile-close-btn');
            if (btn) btn.style.display = 'none';
            
            // Restaurar imagen
            const imageWrapper = p.querySelector('.panel-image-wrapper');
            const image = p.querySelector('.panel-image');
            
            if (imageWrapper) {
              imageWrapper.style.opacity = '1';
              imageWrapper.style.zIndex = '1';
            }
            
            if (image) {
              image.style.opacity = '1';
              image.style.visibility = 'visible';
              image.style.display = 'block';
            }
          });
        }
      });
      
    } else {
      // COMPORTAMIENTO PARA DESKTOP (hover)
      panels.forEach(panel => {
        panel.addEventListener('mouseenter', () => {
          // Asegurar que solo un panel esté expandido a la vez
          panels.forEach(p => {
            if (p !== panel) {
              p.classList.add('other-panel');
            }
          });
        });
        
        panel.addEventListener('mouseleave', () => {
          // Restaurar todos los paneles
          panels.forEach(p => {
            p.classList.remove('other-panel');
          });
        });
        
        // Ocultar botones de cierre en desktop
        const closeBtn = panel.querySelector('.mobile-close-btn');
        if (closeBtn) {
          closeBtn.style.display = 'none';
        }
      });
    }
  }

  // Inicializar la galería destacada
  initFeaturedGallery();

  // Re-inicializar la galería al redimensionar la ventana
  window.addEventListener('resize', function() {
    initFeaturedGallery();
    
    // Si cambiamos a modo desktop, asegurarnos de que no hay paneles expandidos
    if (window.innerWidth >= 992) {
      document.querySelectorAll('.featured-panel').forEach(panel => {
        panel.classList.remove('mobile-expanded');
        const btn = panel.querySelector('.mobile-close-btn');
        if (btn) btn.style.display = 'none';
        
        // Restaurar imagen
        const imageWrapper = panel.querySelector('.panel-image-wrapper');
        const image = panel.querySelector('.panel-image');
        
        if (imageWrapper) {
          imageWrapper.style.opacity = '1';
          imageWrapper.style.zIndex = '1';
        }
        
        if (image) {
          image.style.opacity = '1';
          image.style.visibility = 'visible';
        }
      });
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
  updateFaviconForTheme();
});
