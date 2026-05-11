(() => {
  const t = (en, es, ja) => ({ en, es, ja });

  window.PORTFOLIO_PROJECTS = Object.freeze([
    {
      id: "tfg",
      featured: true,
      featuredOrder: 1,
      archive: true,
      categories: ["filter-vr"],
      title: t(
        "VR Interaction Design Guide for Action-RPGs",
        "Guía de Diseño de Interacción VR para Action-RPGs",
        "VRアクションRPG向けインタラクションデザインガイド"
      ),
      images: {
        thumbnail: "assets/img/portfolio/tfg-vr-thumbnail.png",
        hero: "assets/img/portfolio/tfg-hero-wide.jpg"
      },
      featuredMeta: t(
        "Bachelor's Thesis - Unity - VR/XR",
        "Trabajo de Fin de Grado - Unity - VR/XR",
        "卒業研究 - Unity - VR/XR"
      ),
      featuredDescription: t(
        "Bachelor's Thesis - Research-driven UX/UI and interaction design guide focused on improving comfort, readability, and player interaction in VR Action-RPGs. Combines practical Unity implementation with user testing to evaluate and iterate on VR interaction systems.",
        "Trabajo de Fin de Grado - Guía de diseño de UX/UI e interacciones basada en investigación, centrada en mejorar la comodidad, la legibilidad y la interacción del jugador en Action-RPGs de VR. Combina implementación práctica en Unity con pruebas de usuario para evaluar e iterar sistemas de interacción en realidad virtual.",
        "卒業研究 - VRアクションRPGにおける快適性、可読性、プレイヤーインタラクションの向上を目的とした、研究主導のUX/UIおよびインタラクションデザインガイド。Unityでの実装とユーザーテストを組み合わせ、VRインタラクションシステムの評価と反復改善を行いました。"
      ),
      featuredContributions: t(
        [
          "Designed and implemented VR interaction patterns and UI systems in Unity",
          "Defined comfort-focused interaction guidelines for action-RPG use cases",
          "Ran SSQ and SUS user tests to validate usability and comfort",
          "Analyzed findings and iterated systems based on player feedback"
        ],
        [
          "Diseño e implementación de patrones de interacción VR y sistemas UI en Unity",
          "Definición de guías de interacción centradas en la comodidad para casos de uso Action-RPG",
          "Realización de pruebas de usuario con SSQ y SUS para validar usabilidad y comodidad",
          "Análisis de resultados e iteración de sistemas a partir del feedback del jugador"
        ],
        [
          "UnityにおけるVRインタラクションパターンとUIシステムの設計・実装",
          "Action-RPG向けに快適性を重視したインタラクションガイドラインを定義",
          "SSQおよびSUSのユーザーテストで操作性と快適性を検証",
          "プレイヤーフィードバックを分析し、システムを反復改善"
        ]
      ),
      note: t(
        "(Full thesis available in Spanish.)",
        "(TFG completo disponible en español.)",
        "（完全な卒業研究はスペイン語で閲覧可能。）"
      ),
      archiveSummary: t(
        "Research-backed UX/UI guide and Unity demo for improving comfort and interaction clarity in VR Action-RPGs. Available in Spanish.",
        "Guía de UX/UI basada en investigación y demo en Unity para mejorar la comodidad y la claridad de interacción en Action-RPGs VR. Disponible en español.",
        "VRアクションRPGにおける快適性と操作の明確さを改善するための、研究ベースのUX/UIガイドとUnityデモ。スペイン語で閲覧可能。"
      ),
      archiveContributions: t(
        [
          "Designed VR interaction patterns and UI systems in Unity",
          "Defined comfort-focused design guidelines",
          "Validated the work with SSQ and SUS user testing"
        ],
        [
          "Diseño de patrones de interacción VR y sistemas UI en Unity",
          "Definición de guías de diseño centradas en la comodidad",
          "Validación del trabajo mediante pruebas de usuario con SSQ y SUS"
        ],
        [
          "UnityでVRインタラクションパターンとUIシステムを設計",
          "快適性重視のデザインガイドラインを定義",
          "SSQおよびSUSのユーザーテストで検証"
        ]
      ),
      link: {
        href: "assets/docs/Guia_para_el_Desarrollo_de_Interacciones_en_VR-Guerra_Viudez_Jose_Adrian.pdf",
        labelKey: "tfg-link-pdf"
      }
    },
    {
      id: "godlythief",
      featured: true,
      featuredOrder: 2,
      archive: true,
      categories: ["filter-action"],
      title: t("Godly Thief", "Godly Thief", "Godly Thief"),
      images: {
        thumbnail: "assets/img/portfolio/portfolio-1.png",
        hero: "assets/img/portfolio/godlythief-hero-wide.jpg"
      },
      featuredMeta: t(
        "2D Roguelite Hack'n'Slash - Unity",
        "Roguelite Hack'n'Slash 2D - Unity",
        "2Dローグライト・ハックアンドスラッシュ - Unity"
      ),
      featuredDescription: t(
        "2D Roguelite Hack'n'Slash centered on a systemic ability-stealing mechanic. Players acquire and upgrade enemy abilities, while enemy strength scales in parallel, creating a dynamic auto-balancing combat loop. Core gameplay systems were designed and implemented with focus on progression, pacing, and combat readability.",
        "Roguelite Hack'n'Slash 2D centrado en un sistema de robo de habilidades. El jugador adquiere y mejora habilidades de enemigos mientras estos escalan en paralelo, creando un bucle de combate autoequilibrado. Diseño e implementación de sistemas principales de gameplay con foco en progresión, ritmo y legibilidad del combate.",
        "敵から能力を奪うシステムを軸にした2Dローグライト・ハックアンドスラッシュ。敵の強さとプレイヤーの能力が並行してスケールし、動的にバランスが取れる戦闘ループを構築。進行、ペーシング、戦闘の視認性を重視してコアゲームプレイシステムを設計・実装しました。"
      ),
      featuredContributions: t(
        [
          "Designed and implemented the core ability-stealing system",
          "Designed a combat loop with dynamic auto-balancing between player power and enemy scaling",
          "Defined progression pacing through enemy wave design and difficulty scaling",
          "Balanced the ability economy to regulate power growth and decision-making",
          "Designed kill-based constraints to enforce combat engagement and prevent ability spam",
          "Improved combat readability through gameplay UI and real-time feedback",
          "Iterated through playtesting to refine balance and remove conflicting mechanics"
        ],
        [
          "Diseño e implementación del sistema central de robo de habilidades",
          "Diseño de un bucle de combate con autoequilibrado dinámico entre poder del jugador y escalado enemigo",
          "Definición del ritmo de progresión mediante diseño de oleadas y escalado de dificultad",
          "Balanceo de la economía de habilidades para regular crecimiento de poder y toma de decisiones",
          "Diseño de restricciones basadas en eliminaciones para forzar engagement y evitar spam",
          "Mejora de la legibilidad del combate mediante UI de gameplay y feedback en tiempo real",
          "Iteración mediante playtesting para refinar balance y eliminar mecánicas en conflicto"
        ],
        [
          "コアとなる能力奪取システムを設計・実装",
          "プレイヤー強化と敵スケーリングが噛み合う動的バランスの戦闘ループを設計",
          "敵ウェーブ設計と難易度スケーリングで進行ペーシングを定義",
          "能力経済を調整し、パワー成長と意思決定をコントロール",
          "撃破数ベースの制限で戦闘参加を促進し、スパムを防止",
          "ゲームプレイUIとリアルタイムフィードバックで戦闘の視認性を改善",
          "プレイテストを通じてバランスを調整し、競合する要素を整理"
        ]
      ),
      archiveSummary: t(
        "2D roguelite hack'n'slash built around stealing and evolving enemy abilities to escape Thanatos' prison.",
        "Roguelite Hack'n'Slash 2D construido alrededor del robo y evolucion de habilidades enemigas para escapar de la prision de Thanatos.",
        "タナトスの牢獄から脱出するために、敵の能力を奪って成長させることを軸にした2Dローグライト。"
      ),
      archiveContributions: t(
        [
          "Designed and implemented the ability-stealing core system",
          "Tuned combat loop, enemy scaling and progression pacing",
          "Improved readability through gameplay UI and feedback systems"
        ],
        [
          "Diseño e implementación del sistema central de robo de habilidades",
          "Ajuste del bucle de combate, el escalado enemigo y el ritmo de progresión",
          "Mejora de la legibilidad mediante UI de gameplay y sistemas de feedback"
        ],
        [
          "能力奪取のコアシステムを設計・実装",
          "戦闘ループ、敵スケーリング、進行ペーシングを調整",
          "ゲームプレイUIとフィードバックで視認性を改善"
        ]
      ),
      link: {
        href: "https://marcd419.itch.io/godly-thief",
        labelKey: "visit"
      }
    },
    {
      id: "twistedtail",
      featured: true,
      featuredOrder: 3,
      archive: true,
      categories: ["filter-puzzle"],
      title: t("Twisted Tail", "Twisted Tail", "Twisted Tail"),
      images: {
        thumbnail: "assets/img/portfolio/portfolio-3.png",
        hero: "assets/img/portfolio/twistedtail-hero-wide.jpg"
      },
      featuredMeta: t(
        "Puzzle / Stealth Game - Unity - Game Jam (48h)",
        "Juego de Puzles / Stealth - Unity - Game Jam (48h)",
        "パズル / ステルスゲーム - Unity - ゲームジャム（48時間）"
      ),
      featuredDescription: t(
        "Puzzle/Stealth Game - Game Jam (48h) - Short-form puzzle game built around a color-based camouflage mechanic. Developed under tight time constraints with focus on rapid iteration, mechanical clarity, and readable player feedback.",
        "Juego de Puzles/Stealth - Game Jam (48h) - Juego de corta duración basado en una mecánica de camuflaje por colores. Desarrollado bajo fuertes restricciones de tiempo, con enfoque en iteración rápida, claridad mecánica y feedback legible para el jugador.",
        "パズル／ステルスゲーム - ゲームジャム（48時間）- 色によるカモフラージュメカニックを中心に構築された短編ゲーム。厳しい時間制約の中で、迅速な反復、メカニクスの明確さ、読みやすいプレイヤーフィードバックに焦点を当てて開発しました。"
      ),
      featuredContributions: t(
        [
          "Designed the core camouflage mechanic",
          "Built puzzle structure around visual language and timing",
          "Implemented enemy behavior and player state logic",
          "Integrated audio under jam production constraints"
        ],
        [
          "Diseño de la mecánica central de camuflaje",
          "Construcción de la estructura de puzles alrededor del lenguaje visual y el timing",
          "Implementación de comportamiento enemigo y lógica de estados del jugador",
          "Integración de audio bajo restricciones de producción de game jam"
        ],
        [
          "コアのカモフラージュメカニックを設計",
          "視覚言語とタイミングを軸にパズル構造を構築",
          "敵の挙動とプレイヤー状態ロジックを実装",
          "ゲームジャム制約下でオーディオを統合"
        ]
      ),
      archiveSummary: t(
        "48-hour puzzle/stealth jam project built around a color camouflage mechanic and fast iteration.",
        "Proyecto de game jam de 48 horas de puzles/stealth construido alrededor de una mecánica de camuflaje por color e iteración rápida.",
        "色カモフラージュのメカニックと高速な反復を軸にした、48時間のパズル／ステルスのゲームジャム作品。"
      ),
      archiveContributions: t(
        [
          "Designed the core camouflage mechanic and puzzle logic",
          "Implemented enemy behavior and player state logic",
          "Integrated audio while supporting rapid iteration"
        ],
        [
          "Diseño de la mecánica central de camuflaje y la lógica de puzles",
          "Implementación de comportamiento enemigo y lógica de estados del jugador",
          "Integración de audio mientras se sostenía la iteración rápida"
        ],
        [
          "コアのカモフラージュメカニックとパズルロジックを設計",
          "敵の挙動とプレイヤー状態ロジックを実装",
          "高速な反復を支えながらオーディオを統合"
        ]
      ),
      link: {
        href: "https://marcd419.itch.io/twisted-tail",
        labelKey: "visit"
      }
    },
    {
      id: "ghostngoblins",
      featured: false,
      archive: true,
      categories: ["filter-action"],
      title: t(
        "Ghosts'N Goblins (Educational Project)",
        "Ghosts'N Goblins (Proyecto educativo)",
        "Ghosts'N Goblins（教育プロジェクト）"
      ),
      images: {
        thumbnail: "assets/img/portfolio/ghostngoblins.png"
      },
      archiveSummary: t(
        "Educational recreation of the classic arcade game, developed in Phaser and linked here as a playable local build.",
        "Recreación educativa del clásico arcade, desarrollada en Phaser y enlazada aquí como build local jugable.",
        "Phaserで開発したクラシックアーケード作品の教育用リメイクで、ここからローカルのプレイアブル版を起動できます。"
      ),
      archiveContributions: t(
        [
          "Integrated gameplay-related audio and music systems",
          "Developed enemy behaviors and gameplay logic",
          "Implemented player movement, input handling and core gameplay interactions",
          "Implemented map structure, background composition and gameplay collision flow",
          "Implemented multi-layer level structure, ladders and moving platform mechanics",
          "Designed and implemented collision systems for environments and traversal",
          "Moving platform programming"
        ],
        [
          "Integración de sistemas de audio y música ligados al gameplay",
          "Desarrollo de comportamientos enemigos y lógica de gameplay",
          "Implementación de movimiento del jugador, gestión de input e interacciones nucleares",
          "Implementación de estructura de mapa, composición de fondos y flujo de colisiones de gameplay",
          "Implementación de estructura multinivel, escaleras y mecánicas de plataformas móviles",
          "Diseño e implementación de sistemas de colisión para entornos y traversal",
          "Programación de plataformas móviles"
        ],
        [
          "ゲームプレイ連動のオーディオと音楽システムを統合",
          "敵の挙動とゲームプレイロジックを開発",
          "プレイヤー移動、入力処理、コアインタラクションを実装",
          "マップ構造、背景構成、ゲームプレイ上の衝突フローを実装",
          "多層レベル構造、はしご、移動床のメカニクスを実装",
          "環境と移動のための衝突システムを設計・実装",
          "移動床のプログラミング"
        ]
      ),
      link: {
        href: "GhostNGoblins/GhostNGoblins.html",
        labelKey: "play"
      }
    },
    {
      id: "clickanium",
      featured: false,
      archive: true,
      categories: ["filter-action"],
      title: t("Towers of Clickanium", "Towers of Clickanium", "Towers of Clickanium"),
      images: {
        thumbnail: "assets/img/portfolio/portfolio-5.png"
      },
      archiveSummary: t(
        "Side-scrolling tower defense where archaeologists, military and aliens fight over a vital resource.",
        "Tower Defense con scroll lateral donde arqueólogos, militares y alienígenas luchan por un recurso vital.",
        "考古学者、軍隊、エイリアンが重要資源を巡って争う横スクロール型タワーディフェンス。"
      ),
      archiveContributions: t(
        [
          "Contributed UI/UX flows and credits integration",
          "Curated music and supported balancing and lore tuning",
          "Coordinated Scrum process across production"
        ],
        [
          "Contribución en flujos de UI/UX e integración de créditos",
          "Curaduría musical y apoyo en balanceo y ajuste de lore",
          "Coordinación del proceso Scrum durante la producción"
        ],
        [
          "UI/UXフローとクレジット実装に貢献",
          "音楽選定を行い、バランス調整と世界観調整を支援",
          "制作全体でScrum進行を調整"
        ]
      ),
      link: {
        href: "https://youtu.be/mW7iOPUotSM",
        labelKey: "visit"
      }
    },
    {
      id: "restaurant",
      featured: false,
      archive: true,
      categories: ["filter-simulation"],
      title: t("Restaurant Extravaganzza", "Restaurant Extravaganzza", "Restaurant Extravaganzza"),
      images: {
        thumbnail: "assets/img/portfolio/portfolio-2.png"
      },
      archiveSummary: t(
        "Restaurant management/simulation project about fulfilling online orders, upgrading the venue and managing stock.",
        "Proyecto de gestión/simulación de restaurante sobre pedidos online, mejoras del local y control de stock.",
        "オンライン注文処理、店舗アップグレード、在庫管理を軸にしたレストラン経営シミュレーション。"
      ),
      archiveContributions: t(
        [
          "Designed and optimized level layout and scenario flow",
          "Implemented mechanics, store system and supporting assets",
          "Supported music selection and Scrum Master coordination"
        ],
        [
          "Diseño y optimización del layout de nivel y del flujo del escenario",
          "Implementación de mecánicas, sistema de tienda y assets de apoyo",
          "Apoyo en selección musical y coordinación como Scrum Master"
        ],
        [
          "レベルレイアウトとシナリオフローを設計・最適化",
          "メカニクス、ショップシステム、補助アセットを実装",
          "音楽選定とScrum Master的な進行調整を支援"
        ]
      ),
      link: {
        href: "https://dojap.itch.io/restaurant-extravaganzza",
        labelKey: "visit"
      }
    },
    {
      id: "playernt",
      featured: false,
      archive: true,
      categories: ["filter-turnBased"],
      title: t("Playern't Fantasy", "Playern't Fantasy", "Playern't Fantasy"),
      images: {
        thumbnail: "assets/img/portfolio/portfolio-6.png"
      },
      archiveSummary: t(
        "21-day jam project where a third faction disrupts a war between two armies and forces a new combat balance.",
        "Proyecto de game jam de 21 días donde una tercera facción rompe el equilibrio de una guerra entre dos ejércitos.",
        "二つの軍勢の戦争に第三勢力が介入し、新しい戦闘バランスを生み出す21日間のゲームジャム作品。"
      ),
      archiveContributions: t(
        [
          "Implemented mechanics, abilities and map structure",
          "Adjusted and integrated music into gameplay flow",
          "Balanced encounter flow and combat pacing"
        ],
        [
          "Implementación de mecánicas, habilidades y estructura del mapa",
          "Ajuste e integración de música dentro del flujo de gameplay",
          "Balanceo del flujo de encuentros y del ritmo de combate"
        ],
        [
          "メカニクス、能力、マップ構造を実装",
          "音楽を調整し、ゲームプレイフローへ統合",
          "遭遇フローと戦闘ペーシングをバランス調整"
        ]
      ),
      link: {
        href: "https://nhos.itch.io/playernt-fantasy",
        labelKey: "visit"
      }
    }
  ]);
})();
