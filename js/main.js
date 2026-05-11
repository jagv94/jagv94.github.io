document.addEventListener("DOMContentLoaded", () => {
  const defaultLang = "en";
  const supportedLangs = new Set(["en", "es", "ja"]);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const projectData = Array.isArray(window.PORTFOLIO_PROJECTS) ? window.PORTFOLIO_PROJECTS : [];
  const timelineEntries = Array.isArray(window.PORTFOLIO_TIMELINE) ? window.PORTFOLIO_TIMELINE : [];
  const projectUiFallbacks = {
    en: {
      "project_contributions_title": "Key contributions",
      "project_archive_intro": "Additional projects, prototypes and game jam work can be found in the archive below.",
      "timeline_dialog_label": "Experience details",
      "timeline_close_label": "Close details",
      "tfg-link-pdf": "Read Thesis (PDF)",
      "visit": "Visit Page",
      "play": "Play Now"
    },
    es: {
      "project_contributions_title": "Contribuciones clave",
      "project_archive_intro": "Puedes encontrar más proyectos, prototipos y trabajos de game jam en el archivo de abajo.",
      "timeline_dialog_label": "Detalles de la experiencia",
      "timeline_close_label": "Cerrar detalles",
      "tfg-link-pdf": "Leer TFG (PDF)",
      "visit": "Visitar página",
      "play": "Jugar"
    },
    ja: {
      "project_contributions_title": "主要な貢献",
      "project_archive_intro": "追加のプロジェクト、プロトタイプ、ゲームジャム作品は下のアーカイブで確認できます。",
      "timeline_dialog_label": "経歴の詳細",
      "timeline_close_label": "詳細を閉じる",
      "tfg-link-pdf": "卒業研究を読む（PDF）",
      "visit": "ページを見る",
      "play": "プレイする"
    }
  };
  const escapeMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  };
  let lang = new URLSearchParams(window.location.search).get("lang") || localStorage.getItem("lang") || defaultLang;

  if (!supportedLangs.has(lang)) {
    lang = defaultLang;
  }

  document.documentElement.lang = lang;
  localStorage.setItem("lang", lang);

  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const sidebarOverlay = document.getElementById("sidebarOverlay");
  const resumeLink = document.getElementById("resume-link");
  const timelineList = document.getElementById("timelineList");
  const popover = document.getElementById("timelinePopover");
  const popoverLogo = document.getElementById("popoverLogo");
  const popoverEntity = document.getElementById("popoverEntity");
  const popoverRole = document.getElementById("popoverRole");
  const popoverBullets = document.getElementById("popoverBullets");
  const popoverTechTags = document.getElementById("popoverTechTags");
  const popoverCloseBtn = popover?.querySelector(".popover-close");
  const toggleSecondaryBtn = document.getElementById("toggleSecondarySkills");
  const secondarySkillsList = document.getElementById("secondarySkillsList");
  const featuredViewportState = {
    mode: getFeaturedViewportMode(),
    width: window.innerWidth
  };
  let lastTimelineTriggerEntity = null;

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (char) => escapeMap[char]);
  }

  function getLocalizedValue(value, currentLang) {
    if (value == null) return "";
    if (typeof value === "string" || Array.isArray(value)) return value;
    return value[currentLang] ?? value[defaultLang] ?? "";
  }

  function getUiLabel(strings, currentLang, key) {
    return strings?.[currentLang]?.[key]
      ?? projectUiFallbacks[currentLang]?.[key]
      ?? projectUiFallbacks[defaultLang]?.[key]
      ?? "";
  }

  function getFeaturedViewportMode() {
    return window.innerWidth < 992 ? "mobile" : "desktop";
  }

  function getActiveFeaturedProjectId() {
    return document.querySelector(".featured-panel.mobile-expanded, .featured-panel.is-active")?.dataset.project || null;
  }

  function getActivePortfolioFilter() {
    return document.querySelector(".filter-btn.active")?.getAttribute("data-filter") || "*";
  }

  function getTimelineEntryById(entryId) {
    return timelineEntries.find((entry) => entry.id === entryId) || null;
  }

  function syncTimelineExpandedState(activeEntityId = null) {
    if (!timelineList) return;

    timelineList.querySelectorAll(".timeline-item").forEach((item) => {
      item.setAttribute("aria-expanded", String(item.dataset.entity === activeEntityId));
    });
  }

  function renderTimelineItems(currentLang) {
    return timelineEntries
      .map((entry) => {
        const title = escapeHtml(getLocalizedValue(entry.title, currentLang));
        const date = escapeHtml(getLocalizedValue(entry.date, currentLang));
        const place = escapeHtml(getLocalizedValue(entry.place, currentLang));
        const logoSrc = escapeHtml(entry.logo?.src || "assets/img/logo-placeholder.png");
        const logoAlt = escapeHtml(getLocalizedValue(entry.logo?.alt, currentLang));

        return `
          <button class="timeline-item" data-entity="${escapeHtml(entry.id)}" data-type="${escapeHtml(entry.type)}" type="button" aria-haspopup="dialog" aria-controls="timelinePopover" aria-expanded="false">
            <div class="timeline-logo-wrapper">
              <img src="${logoSrc}" alt="${logoAlt}" class="timeline-logo" loading="lazy" onerror="this.src='assets/img/logo-placeholder.png'">
            </div>
            <div class="timeline-content">
              <h4>${title}</h4>
              <h5>${date}</h5>
              <p class="timeline-place">${place}</p>
            </div>
          </button>
        `;
      })
      .join("");
  }

  function renderTimelineSection(currentLang) {
    if (!timelineList) return;

    timelineList.innerHTML = renderTimelineItems(currentLang);
    syncTimelineExpandedState(popover?.hidden ? null : popover?.dataset.currentEntity || null);
  }

  function renderFeaturedProjects(currentLang, strings) {
    const contributionsTitle = escapeHtml(getUiLabel(strings, currentLang, "project_contributions_title"));

    return projectData
      .filter((project) => project.featured)
      .sort((a, b) => a.featuredOrder - b.featuredOrder)
      .map((project) => {
        const title = escapeHtml(getLocalizedValue(project.title, currentLang));
        const description = escapeHtml(getLocalizedValue(project.featuredDescription, currentLang));
        const meta = escapeHtml(getLocalizedValue(project.featuredMeta, currentLang));
        const note = getLocalizedValue(project.note, currentLang);
        const contributions = getLocalizedValue(project.featuredContributions, currentLang);
        const ctaLabel = escapeHtml(getUiLabel(strings, currentLang, project.link.labelKey));
        const contributionsMarkup = Array.isArray(contributions)
          ? contributions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
          : "";

        return `
          <div class="featured-panel" data-project="${escapeHtml(project.id)}">
            <div class="panel-base">
              <div class="panel-image-wrapper">
                <img src="${escapeHtml(project.images.thumbnail)}" loading="lazy" class="panel-image" alt="${title}" />
              </div>
              <div class="panel-expanded-content">
                <button class="mobile-close-btn d-lg-none" type="button" aria-label="Close">
                  <i class="fas fa-times"></i>
                </button>
                <div class="expanded-inner">
                  <img src="${escapeHtml(project.images.hero)}" loading="lazy" class="expanded-hero" alt="${title}" />
                  <div class="project-details">
                    <h3 class="project-title">${title}</h3>
                    <div class="project-meta"><span class="project-role">${meta}</span></div>
                    <p class="project-description">${description}</p>
                    <div class="project-responsibilities">
                      <h4>${contributionsTitle}</h4>
                      <ul>${contributionsMarkup}</ul>
                    </div>
                    ${note ? `<p class="project-note">${escapeHtml(note)}</p>` : ""}
                    <a href="${escapeHtml(project.link.href)}" class="project-link" target="_blank" rel="noopener noreferrer">${ctaLabel}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function renderArchiveProjects(currentLang, strings) {
    return projectData
      .filter((project) => project.archive)
      .map((project) => {
        const title = escapeHtml(getLocalizedValue(project.title, currentLang));
        const summary = getLocalizedValue(project.archiveSummary, currentLang);
        const contributions = getLocalizedValue(project.archiveContributions, currentLang);
        const ctaLabel = escapeHtml(getUiLabel(strings, currentLang, project.link.labelKey));
        const categories = Array.isArray(project.categories) ? project.categories.join(" ") : "";
        const summaryMarkup = summary
          ? `<p class="portfolio-desc portfolio-summary">${escapeHtml(summary)}</p>`
          : "";
        const contributionsMarkup = Array.isArray(contributions) && contributions.length
          ? `
            <ul class="portfolio-contributions">
              ${contributions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
            </ul>
          `
          : "";

        return `
          <div class="portfolio-item ${escapeHtml(categories)}" data-project="${escapeHtml(project.id)}">
            <div class="portfolio-card">
              <img src="${escapeHtml(project.images.thumbnail)}" loading="lazy" class="portfolio-img" alt="${title}" />
              <div class="portfolio-overlay">
                <h5 class="portfolio-title">${title}</h5>
                ${summaryMarkup}
                ${contributionsMarkup}
                <a href="${escapeHtml(project.link.href)}" class="portfolio-link" target="_blank" rel="noopener noreferrer">${ctaLabel}</a>
              </div>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function renderProjectSections(currentLang, strings = null) {
    const gallery = document.getElementById("featuredGallery");
    const portfolioGrid = document.getElementById("portfolioGrid");
    const activeProjectId = getActiveFeaturedProjectId();
    const activeFilter = getActivePortfolioFilter();

    if (gallery) {
      gallery.innerHTML = renderFeaturedProjects(currentLang, strings);
    }

    if (portfolioGrid) {
      portfolioGrid.innerHTML = renderArchiveProjects(currentLang, strings);
    }

    if (gallery) {
      initFeaturedGallery({ preserveProjectId: activeProjectId });
    }

    applyPortfolioFilter(activeFilter, { animated: false });
  }

  function updateTimelineUiLabels(strings, currentLang) {
    if (popover) {
      popover.setAttribute("aria-label", getUiLabel(strings, currentLang, "timeline_dialog_label"));
    }

    if (popoverCloseBtn) {
      popoverCloseBtn.setAttribute("aria-label", getUiLabel(strings, currentLang, "timeline_close_label"));
    }
  }

  function applyTranslations(strings, currentLang) {
    const translations = strings[currentLang];
    if (!translations) {
      console.warn("Idioma no encontrado:", currentLang);
      return;
    }

    document.documentElement.lang = currentLang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.classList.add("i18n-changing");
    });

    setTimeout(() => {
      const htmlKeys = ["intro"];

      document.querySelectorAll("[data-i18n]").forEach((el) => {
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

      renderProjectSections(currentLang, strings);
      renderTimelineSection(currentLang);
      updateToggleButtonText(strings, currentLang);
      updateTimelineUiLabels(strings, currentLang);
      updateResumeLink(currentLang);
      updateOpenPopover();
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

  function setupLanguageButtons() {
    document.querySelectorAll(".lang-btn").forEach((button) => {
      const isActive = button.dataset.lang === lang;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));

      button.addEventListener("click", () => {
        const selectedLang = button.dataset.lang;
        if (selectedLang === lang) return;

        document.querySelectorAll(".lang-btn").forEach((btn) => {
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

        const cachedStrings = JSON.parse(sessionStorage.getItem("strings"));
        renderProjectSections(lang, cachedStrings);
        renderTimelineSection(lang);

        if (cachedStrings) {
          applyTranslations(cachedStrings, lang);
        } else {
          location.reload();
        }
      }, { passive: true });
    });
  }

  function updateToggleButtonText(strings, currentLang) {
    if (!toggleSecondaryBtn) return;

    const translations = strings[currentLang];
    if (!translations) return;

    const moreText = translations.more_skills || "more";
    const lessText = translations.less_skills || "less";
    const isExpanded = toggleSecondaryBtn.getAttribute("aria-expanded") === "true";
    const span = toggleSecondaryBtn.querySelector("span");
    const icon = toggleSecondaryBtn.querySelector("i");

    if (span) span.textContent = isExpanded ? lessText : moreText;
    if (icon) {
      icon.className = isExpanded ? "fas fa-minus" : "fas fa-plus";
    }
  }

  function applyPortfolioFilter(filterValue, { animated = true } = {}) {
    const portfolioItems = document.querySelectorAll(".portfolio-item");
    if (!portfolioItems.length) return;

    portfolioItems.forEach((item) => {
      const shouldShow = filterValue === "*" || item.classList.contains(filterValue.slice(1));

      if (!animated) {
        item.style.transition = "none";
        item.style.display = shouldShow ? "block" : "none";
        item.style.opacity = shouldShow ? "1" : "0";
        item.style.transform = shouldShow ? "scale(1)" : "scale(0.8)";
        requestAnimationFrame(() => {
          item.style.transition = "";
        });
        return;
      }

      item.style.transition = "opacity 0.3s ease, transform 0.3s ease";

      if (shouldShow) {
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
        setTimeout(() => {
          item.style.display = "none";
        }, 300);
      }
    });
  }

  function initPortfolioFilters() {
    const portfolioFilters = document.querySelectorAll(".filter-btn");
    if (!portfolioFilters.length) return;

    portfolioFilters.forEach((filter) => {
      filter.addEventListener("click", function () {
        if (this.classList.contains("active")) return;

        portfolioFilters.forEach((button) => button.classList.remove("active"));
        this.classList.add("active");

        applyPortfolioFilter(this.getAttribute("data-filter"));
      });
    });

    applyPortfolioFilter(getActivePortfolioFilter(), { animated: false });
  }

  function initFeaturedGallery({ preserveProjectId = null } = {}) {
    const gallery = document.querySelector(".featured-gallery");
    const panels = Array.from(document.querySelectorAll(".featured-panel"));
    if (!gallery || !panels.length) return;

    if (gallery._featuredGalleryHandler) {
      gallery.removeEventListener("click", gallery._featuredGalleryHandler);
    }
    if (gallery._featuredDocumentHandler) {
      document.removeEventListener("click", gallery._featuredDocumentHandler);
    }
    if (gallery._mobileCloseHandler) {
      document.removeEventListener("click", gallery._mobileCloseHandler);
    }

    const isMobile = getFeaturedViewportMode() === "mobile";
    let activeDesktopPanel = null;

    const hideCloseButton = (panel) => {
      const closeBtn = panel.querySelector(".mobile-close-btn");
      if (closeBtn) closeBtn.style.display = "none";
    };

    const showCloseButton = (panel) => {
      const closeBtn = panel.querySelector(".mobile-close-btn");
      if (closeBtn) closeBtn.style.display = "flex";
    };

    const closeMobilePanel = (panel) => {
      panel.classList.remove("mobile-expanded");
      hideCloseButton(panel);
    };

    const closeAllMobilePanels = () => {
      panels.forEach(closeMobilePanel);
    };

    const clearDesktopState = () => {
      panels.forEach((panel) => panel.classList.remove("is-active", "other-panel"));
      gallery.classList.remove("has-active-panel");
      activeDesktopPanel = null;
    };

    const openMobilePanel = (panel, { scrollIntoView = true } = {}) => {
      closeAllMobilePanels();
      panel.classList.add("mobile-expanded");
      showCloseButton(panel);

      if (scrollIntoView) {
        window.requestAnimationFrame(() => {
          panel.scrollIntoView({
            behavior: prefersReducedMotion.matches ? "auto" : "smooth",
            block: "nearest"
          });
        });
      }
    };

    const openDesktopPanel = (panel) => {
      clearDesktopState();
      panel.classList.add("is-active");
      panels.forEach((candidate) => {
        if (candidate !== panel) candidate.classList.add("other-panel");
      });
      gallery.classList.add("has-active-panel");
      activeDesktopPanel = panel;
    };

    gallery.classList.remove("has-active-panel");
    panels.forEach((panel) => {
      panel.classList.remove("is-active", "other-panel", "mobile-expanded");
      hideCloseButton(panel);
    });

    if (preserveProjectId) {
      const preservedPanel = panels.find((panel) => panel.dataset.project === preserveProjectId);
      if (preservedPanel) {
        if (isMobile) {
          openMobilePanel(preservedPanel, { scrollIntoView: false });
        } else {
          openDesktopPanel(preservedPanel);
        }
      }
    }

    const galleryClickHandler = (event) => {
      const interactiveTarget = event.target.closest("a, button");
      if (interactiveTarget) {
        return;
      }

      const panel = event.target.closest(".featured-panel");
      if (!panel) return;

      if (isMobile) {
        const clickedInsideExpandedContent = Boolean(event.target.closest(".panel-expanded-content"));
        if (panel.classList.contains("mobile-expanded") && clickedInsideExpandedContent) {
          return;
        }

        event.stopPropagation();
        openMobilePanel(panel);
        return;
      }

      event.stopPropagation();
      if (activeDesktopPanel === panel) return;
      openDesktopPanel(panel);
    };

    const mobileCloseHandler = (event) => {
      const closeBtn = event.target.closest(".mobile-close-btn");
      if (!closeBtn) return;

      event.preventDefault();
      event.stopPropagation();

      const panel = closeBtn.closest(".featured-panel");
      if (panel) closeMobilePanel(panel);
    };

    const documentClickHandler = (event) => {
      if (!gallery.contains(event.target)) {
        if (isMobile) {
          closeAllMobilePanels();
          return;
        }

        clearDesktopState();
      }
    };

    gallery.addEventListener("click", galleryClickHandler);
    document.addEventListener("click", mobileCloseHandler);
    document.addEventListener("click", documentClickHandler);

    gallery._featuredGalleryHandler = galleryClickHandler;
    gallery._mobileCloseHandler = mobileCloseHandler;
    gallery._featuredDocumentHandler = documentClickHandler;
    gallery.classList.add("gallery-loaded");
  }

  function initTimelineInteractions() {
    if (!timelineList || timelineList._timelineClickHandler) return;

    const timelineClickHandler = (event) => {
      const item = event.target.closest(".timeline-item");
      if (!item || !timelineList.contains(item)) return;

      const entityKey = item.dataset.entity;
      if (!entityKey) return;

      lastTimelineTriggerEntity = entityKey;
      showTimelinePopover(entityKey);
    };

    timelineList.addEventListener("click", timelineClickHandler);
    timelineList._timelineClickHandler = timelineClickHandler;
  }

  function closeTimelinePopover({ restoreFocus = false } = {}) {
    if (!popover) return;

    popover.hidden = true;
    popover.dataset.currentEntity = "";
    syncTimelineExpandedState(null);

    if (restoreFocus && lastTimelineTriggerEntity) {
      const trigger = timelineList?.querySelector(`[data-entity="${lastTimelineTriggerEntity}"]`);
      trigger?.focus();
    }
  }

  function showTimelinePopover(entityKey) {
    if (!popover) return;

    const timelineEntry = getTimelineEntryById(entityKey);
    if (!timelineEntry) return;

    const entity = getLocalizedValue(timelineEntry.entity, lang);
    const role = getLocalizedValue(timelineEntry.role, lang);
    const bullets = getLocalizedValue(timelineEntry.bullets, lang);
    const tech = getLocalizedValue(timelineEntry.tech, lang);
    const logoAlt = getLocalizedValue(timelineEntry.logo?.alt, lang);

    popoverLogo.src = timelineEntry.logo?.src || "assets/img/logo-placeholder.png";
    popoverLogo.alt = logoAlt || "";
    popoverEntity.textContent = entity;
    popoverRole.textContent = role;
    popoverBullets.innerHTML = Array.isArray(bullets)
      ? bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")
      : "";
    popoverTechTags.innerHTML = Array.isArray(tech)
      ? tech.map((tag) => `<span class="tech-tag">${escapeHtml(tag)}</span>`).join("")
      : "";
    popover.dataset.currentEntity = entityKey;
    popover.hidden = false;
    syncTimelineExpandedState(entityKey);
    window.requestAnimationFrame(() => {
      popoverCloseBtn?.focus();
    });
  }

  function updateOpenPopover() {
    if (popover && !popover.hidden) {
      const currentEntity = popover.dataset.currentEntity;
      if (currentEntity) {
        showTimelinePopover(currentEntity);
      }
    }
  }

  function updateFaviconForTheme() {
    const lightFavicon = document.getElementById("light-favicon");
    const darkFavicon = document.getElementById("dark-favicon");
    const defaultFavicon = document.getElementById("default-favicon");

    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      if (darkFavicon) defaultFavicon.href = darkFavicon.href;
    } else if (lightFavicon) {
      defaultFavicon.href = lightFavicon.href;
    }
  }

  const particlesContainer = document.getElementById("particles-js");
  const shouldEnableParticles = particlesContainer && !prefersReducedMotion.matches && window.innerWidth >= 992;

  if (shouldEnableParticles && typeof particlesJS === "function") {
    particlesJS("particles-js", {
    particlesJS("particles-js", {
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

  if (sidebarToggle && sidebar && sidebarOverlay) {
    sidebarToggle.addEventListener("click", () => {
      const isActive = sidebar.classList.toggle("active");
      sidebarOverlay.classList.toggle("active", isActive);
      sidebarToggle.setAttribute("aria-expanded", String(isActive));
      document.body.style.overflow = isActive ? "hidden" : "";
    sidebarToggle.addEventListener("click", () => {
      const isActive = sidebar.classList.toggle("active");
      sidebarOverlay.classList.toggle("active", isActive);
      sidebarToggle.setAttribute("aria-expanded", String(isActive));
      document.body.style.overflow = isActive ? "hidden" : "";
    });

    sidebarOverlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
      sidebarToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    sidebarOverlay.addEventListener("click", () => {
      sidebar.classList.remove("active");
      sidebarOverlay.classList.remove("active");
      sidebarToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  }

  document.querySelectorAll(".sidebar-link").forEach((link) => {
    link.addEventListener("click", () => {
  document.querySelectorAll(".sidebar-link").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 1200) {
        sidebar?.classList.remove("active");
        sidebarOverlay?.classList.remove("active");
        sidebarToggle?.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
        sidebar?.classList.remove("active");
        sidebarOverlay?.classList.remove("active");
        sidebarToggle?.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  });

  renderProjectSections(lang);
  renderTimelineSection(lang);
  updateTimelineUiLabels(null, lang);
  updateResumeLink(lang);
  setupLanguageButtons();
  initTimelineInteractions();

  const stringsCache = sessionStorage.getItem("strings");
  const strings = stringsCache ? JSON.parse(stringsCache) : null;
  const hasCachedTranslations = Boolean(strings && strings[lang]);

  if (hasCachedTranslations) {
    applyTranslations(strings, lang);
  }

  fetch("data/strings.json")
    .then((response) => response.json())
    .then((data) => {
    .then((response) => response.json())
    .then((data) => {
      sessionStorage.setItem("strings", JSON.stringify(data));


      if (!hasCachedTranslations) {
        applyTranslations(data, lang);
      }
    })
    .catch((error) => console.error("Error loading translations:", error));
    .catch((error) => console.error("Error loading translations:", error));

  const loader = document.getElementById("loader");
  if (loader) {
  const loader = document.getElementById("loader");
  if (loader) {
    const hideLoader = () => {
      const loaderHideDelay = prefersReducedMotion.matches ? 0 : 150;

      setTimeout(() => {
        loader.classList.add("loader-hidden");

        loader.addEventListener("transitionend", () => {
          if (loader.parentNode) {
        loader.classList.add("loader-hidden");

        loader.addEventListener("transitionend", () => {
          if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
          }
        }, { once: true });
      }, loaderHideDelay);
    };

    if (document.readyState === "complete") {
    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", hideLoader, { once: true });
      window.addEventListener("load", hideLoader, { once: true });
    }
  }

  const fadeElements = document.querySelectorAll(".fade-in");

  const fadeElements = document.querySelectorAll(".fade-in");
  if (prefersReducedMotion.matches) {
    fadeElements.forEach((element) => element.classList.add("visible"));
    fadeElements.forEach((element) => element.classList.add("visible"));
  } else {
    const fadeInObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.1 });

    fadeElements.forEach((element) => fadeInObserver.observe(element));
  }

  initPortfolioFilters();

  document.querySelectorAll(".sidebar-link, .hero-btn").forEach((link) => {
    link.addEventListener("click", function (event) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        event.preventDefault();

    fadeElements.forEach((element) => fadeInObserver.observe(element));
  }

  initPortfolioFilters();

  document.querySelectorAll(".sidebar-link, .hero-btn").forEach((link) => {
    link.addEventListener("click", function (event) {
      const href = this.getAttribute("href");
      if (href && href.startsWith("#")) {
        event.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
          const targetPosition = targetElement.offsetTop - (window.innerWidth >= 992 ? 0 : 75);
          window.scrollTo({
            top: targetPosition,
            behavior: prefersReducedMotion.matches ? "auto" : "smooth"
            behavior: prefersReducedMotion.matches ? "auto" : "smooth"
          });
        }
      }
    });
  });


  if (toggleSecondaryBtn && secondarySkillsList) {
    toggleSecondaryBtn.addEventListener("click", () => {
      const isExpanded = toggleSecondaryBtn.getAttribute("aria-expanded") === "true";
      secondarySkillsList.style.display = isExpanded ? "none" : "flex";
      toggleSecondaryBtn.setAttribute("aria-expanded", String(!isExpanded));

      const cachedStrings = JSON.parse(sessionStorage.getItem("strings"));
    toggleSecondaryBtn.addEventListener("click", () => {
      const isExpanded = toggleSecondaryBtn.getAttribute("aria-expanded") === "true";
      secondarySkillsList.style.display = isExpanded ? "none" : "flex";
      toggleSecondaryBtn.setAttribute("aria-expanded", String(!isExpanded));

      const cachedStrings = JSON.parse(sessionStorage.getItem("strings"));
      if (cachedStrings) {
        updateToggleButtonText(cachedStrings, lang);
      } else {
        const span = toggleSecondaryBtn.querySelector("span");
        const icon = toggleSecondaryBtn.querySelector("i");
        if (span) span.textContent = isExpanded ? "more" : "less";
        if (icon) icon.className = isExpanded ? "fas fa-plus" : "fas fa-minus";
        const span = toggleSecondaryBtn.querySelector("span");
        const icon = toggleSecondaryBtn.querySelector("i");
        if (span) span.textContent = isExpanded ? "more" : "less";
        if (icon) icon.className = isExpanded ? "fas fa-plus" : "fas fa-minus";
      }
    });
  }

  if (popoverCloseBtn) {
    popoverCloseBtn.addEventListener("click", () => {
      closeTimelinePopover({ restoreFocus: true });
    });
  }

  document.addEventListener("click", (event) => {
  document.addEventListener("click", (event) => {
    if (popover && !popover.hidden) {
      if (event.target.closest(".lang-btn")) {
        return;
      }

      if (!event.target.closest(".timeline-popover") && !event.target.closest(".timeline-item")) {
        closeTimelinePopover();
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && popover && !popover.hidden) {
      closeTimelinePopover({ restoreFocus: true });
    }
  });

  if (window.matchMedia) {
    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    colorSchemeQuery.addEventListener("change", updateFaviconForTheme);
    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    colorSchemeQuery.addEventListener("change", updateFaviconForTheme);
  }

  updateFaviconForTheme();

  const scrollIndicator = document.getElementById("scrollIndicator");
  const scrollIndicator = document.getElementById("scrollIndicator");
  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      const featuredSection = document.getElementById("featured-projects");
    scrollIndicator.addEventListener("click", () => {
      const featuredSection = document.getElementById("featured-projects");
      if (featuredSection) {
        const yOffset = window.innerWidth >= 992 ? 0 : 75;
        const y = featuredSection.getBoundingClientRect().top + window.scrollY - yOffset;
        window.scrollTo({
          top: y,
          behavior: prefersReducedMotion.matches ? "auto" : "smooth"
          behavior: prefersReducedMotion.matches ? "auto" : "smooth"
        });
      }
    });
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const nextMode = getFeaturedViewportMode();
      const widthDelta = Math.abs(window.innerWidth - featuredViewportState.width);

      if (nextMode === featuredViewportState.mode && widthDelta < 8) {
        return;
      }

      const activeProjectId = getActiveFeaturedProjectId();
      initFeaturedGallery({ preserveProjectId: activeProjectId });
      applyPortfolioFilter(getActivePortfolioFilter(), { animated: false });

      featuredViewportState.mode = nextMode;
      featuredViewportState.width = window.innerWidth;
    }, 150);
  });
});


  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const nextMode = getFeaturedViewportMode();
      const widthDelta = Math.abs(window.innerWidth - featuredViewportState.width);

      if (nextMode === featuredViewportState.mode && widthDelta < 8) {
        return;
      }

      const activeProjectId = getActiveFeaturedProjectId();
      initFeaturedGallery({ preserveProjectId: activeProjectId });
      applyPortfolioFilter(getActivePortfolioFilter(), { animated: false });

      featuredViewportState.mode = nextMode;
      featuredViewportState.width = window.innerWidth;
    }, 150);
  });
});
