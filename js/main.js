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

  // Initialize particles.js
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
      
      updateToggleButtonText(strings, lang);
      
      if (typeof updateOpenPopover === 'function') updateOpenPopover();
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
        
        const strings = JSON.parse(sessionStorage.getItem("strings"));
        if (strings) {
          applyTranslations(strings, lang);
          updateResumeLink(lang);
        } else {
          location.reload();
        }
      });
    });
  }

  // Precargar traducciones
  const stringsCache = sessionStorage.getItem("strings");
  const strings = stringsCache ? JSON.parse(stringsCache) : null;
  const hasCachedTranslations = Boolean(strings && strings[lang]);

  if (hasCachedTranslations) {
    applyTranslations(strings, lang);
    updateResumeLink(lang);
    setupLanguageButtons();
  }

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

  // Loader
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

  // Filtrado de portfolio
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

  // Smooth scrolling
  document.querySelectorAll('.sidebar-link, .hero-btn').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const targetPosition = targetElement.offsetTop - (window.innerWidth >= 992 ? 0 : 75);
          window.scrollTo({
            top: targetPosition,
            behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
          });
        }
      }
    });
  });

  // ===============================
  // FUNCIONALIDADES PARA LA GALERÍA DESTACADA (CORREGIDA)
  // ===============================

  function initFeaturedGallery() {
    const gallery = document.querySelector('.featured-gallery');
    const panels = document.querySelectorAll('.featured-panel');
    if (!gallery || !panels.length) return;

    // Limpiar estado previo
    gallery.classList.remove('has-active-panel');
    panels.forEach(p => {
      p.classList.remove('is-active', 'other-panel', 'mobile-expanded');
      const closeBtn = p.querySelector('.mobile-close-btn');
      if (closeBtn) closeBtn.style.display = 'none';
    });

    // Crear botones de cierre para móvil si no existen
    panels.forEach(panel => {
      let closeBtn = panel.querySelector('.mobile-close-btn');
      if (!closeBtn) {
        closeBtn = document.createElement('button');
        closeBtn.type = 'button';
        closeBtn.className = 'mobile-close-btn d-lg-none';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.setAttribute('aria-label', 'Close');
        panel.querySelector('.panel-expanded-content').appendChild(closeBtn);
      }
    });

    // Eliminar listeners antiguos
    if (gallery._featuredGalleryHandler) {
      gallery.removeEventListener('click', gallery._featuredGalleryHandler);
    }
    if (gallery._featuredDocumentHandler) {
      document.removeEventListener('click', gallery._featuredDocumentHandler);
    }
    if (gallery._mobileCloseHandler) {
      document.removeEventListener('click', gallery._mobileCloseHandler);
    }

    const isMobile = window.innerWidth < 992;
    let activeDesktopPanel = null;

    // Handler para clics en la galería (expandir paneles)
    const galleryClickHandler = (e) => {
      // Si el clic fue en el botón de cierre móvil, lo manejamos aparte
      if (e.target.closest('.mobile-close-btn')) return;

      const panel = e.target.closest('.featured-panel');
      if (!panel) return;

      // Si es un enlace o botón interno, no expandir
      if (e.target.closest('a, button')) return;

      if (isMobile) {
        e.stopPropagation();
        // Cerrar cualquier otro panel móvil expandido
        panels.forEach(p => {
          p.classList.remove('mobile-expanded');
          const btn = p.querySelector('.mobile-close-btn');
          if (btn) btn.style.display = 'none';
        });
        // Expandir el panel actual
        panel.classList.add('mobile-expanded');
        const btn = panel.querySelector('.mobile-close-btn');
        if (btn) btn.style.display = 'flex';

        setTimeout(() => {
          panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
      } else {
        // Escritorio: activar panel
        e.stopPropagation();
        if (activeDesktopPanel === panel) return;

        panels.forEach(p => {
          p.classList.remove('is-active', 'other-panel');
        });
        panel.classList.add('is-active');
        panels.forEach(p => {
          if (p !== panel) p.classList.add('other-panel');
        });
        gallery.classList.add('has-active-panel');
        activeDesktopPanel = panel;
      }
    };

    // Handler para cerrar paneles móviles mediante el botón X
    const mobileCloseHandler = (e) => {
      const closeBtn = e.target.closest('.mobile-close-btn');
      if (!closeBtn) return;
      e.preventDefault();
      e.stopPropagation();
      const panel = closeBtn.closest('.featured-panel');
      if (panel) {
        panel.classList.remove('mobile-expanded');
        closeBtn.style.display = 'none';
      }
    };

    // Handler para cerrar en escritorio al hacer clic fuera
    const documentClickHandler = (e) => {
      if (isMobile) return;
      if (!gallery.contains(e.target)) {
        panels.forEach(p => p.classList.remove('is-active', 'other-panel'));
        gallery.classList.remove('has-active-panel');
        activeDesktopPanel = null;
      }
    };

    gallery.addEventListener('click', galleryClickHandler);
    document.addEventListener('click', mobileCloseHandler);
    document.addEventListener('click', documentClickHandler);

    gallery._featuredGalleryHandler = galleryClickHandler;
    gallery._mobileCloseHandler = mobileCloseHandler;
    gallery._featuredDocumentHandler = documentClickHandler;

    gallery.classList.add('gallery-loaded');
  }

  initFeaturedGallery();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      initFeaturedGallery();
      // Restaurar estado visual si es necesario
      if (window.innerWidth >= 992) {
        document.querySelectorAll('.featured-panel').forEach(panel => {
          panel.classList.remove('mobile-expanded');
          const btn = panel.querySelector('.mobile-close-btn');
          if (btn) btn.style.display = 'none';
        });
      }
    }, 150);
  });

  // ===============================
  // TOGGLE DE HABILIDADES SECUNDARIAS
  // ===============================
  const toggleSecondaryBtn = document.getElementById('toggleSecondarySkills');
  const secondarySkillsList = document.getElementById('secondarySkillsList');
  
  function updateToggleButtonText(strings, currentLang) {
    if (!toggleSecondaryBtn) return;
    const translations = strings[currentLang];
    if (!translations) return;
    const moreText = translations.more_skills || 'more';
    const lessText = translations.less_skills || 'less';
    const isExpanded = toggleSecondaryBtn.getAttribute('aria-expanded') === 'true';
    const span = toggleSecondaryBtn.querySelector('span');
    const icon = toggleSecondaryBtn.querySelector('i');
    if (span) span.textContent = isExpanded ? lessText : moreText;
    if (icon) {
      icon.className = isExpanded ? 'fas fa-minus' : 'fas fa-plus';
    }
  }
  
  if (toggleSecondaryBtn && secondarySkillsList) {
    toggleSecondaryBtn.addEventListener('click', () => {
      const isExpanded = toggleSecondaryBtn.getAttribute('aria-expanded') === 'true';
      secondarySkillsList.style.display = isExpanded ? 'none' : 'flex';
      toggleSecondaryBtn.setAttribute('aria-expanded', !isExpanded);
      
      const cachedStrings = JSON.parse(sessionStorage.getItem('strings'));
      if (cachedStrings) {
        updateToggleButtonText(cachedStrings, lang);
      } else {
        const moreText = toggleSecondaryBtn.getAttribute('data-i18n-more') || 'more';
        const lessText = toggleSecondaryBtn.getAttribute('data-i18n-less') || 'less';
        const span = toggleSecondaryBtn.querySelector('span');
        const icon = toggleSecondaryBtn.querySelector('i');
        if (span) span.textContent = isExpanded ? lessText : moreText;
        if (icon) {
          icon.className = isExpanded ? 'fas fa-minus' : 'fas fa-plus';
        }
      }
    });
  }

  // ===============================
  // TIMELINE POPOVER MULTILINGÜE
  // ===============================
  const popover = document.getElementById('timelinePopover');
  const popoverLogo = document.getElementById('popoverLogo');
  const popoverEntity = document.getElementById('popoverEntity');
  const popoverRole = document.getElementById('popoverRole');
  const popoverBullets = document.getElementById('popoverBullets');
  const popoverTechTags = document.getElementById('popoverTechTags');
  const popoverCloseBtn = popover?.querySelector('.popover-close');

  const timelineLogos = {
    ub: 'assets/img/logos/ub-logo.png',
    enti_work: 'assets/img/logos/enti-logo.png',
    enti_edu: 'assets/img/logos/enti-logo.png',
    consultia: 'assets/img/logos/consultia-logo.png',
    everis: 'assets/img/logos/everis-logo.png',
    marianao_dam: 'assets/img/logos/marianao-logo.png',
    marianao_smr: 'assets/img/logos/marianao-logo.png'
  };

  function showTimelinePopover(entityKey) {
    if (!popover) return;
    
    const currentStrings = JSON.parse(sessionStorage.getItem('strings'));
    if (!currentStrings || !currentStrings[lang] || !currentStrings[lang].timeline) {
      console.warn('No hay traducciones para el timeline');
      return;
    }
    
    const timelineData = currentStrings[lang].timeline[entityKey];
    if (!timelineData) return;
    
    popoverLogo.src = timelineLogos[entityKey] || 'assets/img/logo-placeholder.png';
    popoverEntity.textContent = timelineData.entity;
    popoverRole.textContent = timelineData.role;
    popoverBullets.innerHTML = timelineData.bullets.map(b => `<li>${b}</li>`).join('');
    popoverTechTags.innerHTML = timelineData.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');
    
    popover.dataset.currentEntity = entityKey;
    popover.hidden = false;
  }

  function updateOpenPopover() {
    if (popover && !popover.hidden) {
      const currentEntity = popover.dataset.currentEntity;
      if (currentEntity) {
        showTimelinePopover(currentEntity);
      }
    }
  }

  document.querySelectorAll('.timeline-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      const entityKey = item.dataset.entity;
      if (entityKey) {
        showTimelinePopover(entityKey);
      }
    });
  });

  if (popoverCloseBtn) {
    popoverCloseBtn.addEventListener('click', () => {
      popover.hidden = true;
    });
  }

  document.addEventListener('click', (e) => {
    if (popover && !popover.hidden) {
      if (!e.target.closest('.timeline-popover') && !e.target.closest('.timeline-item')) {
        popover.hidden = true;
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && popover && !popover.hidden) {
      popover.hidden = true;
    }
  });

  // Favicon dinámico
  function updateFaviconForTheme() {
    const lightFavicon = document.getElementById('light-favicon');
    const darkFavicon = document.getElementById('dark-favicon');
    const defaultFavicon = document.getElementById('default-favicon');
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      if (darkFavicon) defaultFavicon.href = darkFavicon.href;
    } else {
      if (lightFavicon) defaultFavicon.href = lightFavicon.href;
    }
  }

  if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    colorSchemeQuery.addEventListener('change', updateFaviconForTheme);
  }

  updateFaviconForTheme();

  // Scroll indicator
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      const featuredSection = document.getElementById('featured-projects');
      if (featuredSection) {
        const yOffset = window.innerWidth >= 992 ? 0 : 75;
        const y = featuredSection.getBoundingClientRect().top + window.scrollY - yOffset;
        window.scrollTo({
          top: y,
          behavior: prefersReducedMotion.matches ? 'auto' : 'smooth'
        });
      }
    });
  }
});