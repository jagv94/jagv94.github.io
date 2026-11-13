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
        "Bachelor's Thesis - Research-driven UX/UI and interaction design guide focused on improving comfort, readability, and player interaction in VR Action-RPGs. Combines a Unity demo for Meta Quest 3 with user testing to evaluate VR interaction and comfort.",
        "Trabajo de Fin de Grado - Guía de diseño de UX/UI e interacciones basada en investigación, centrada en mejorar la comodidad, la legibilidad y la interacción del jugador en Action-RPGs de VR. Combina una demo en Unity para Meta Quest 3 con pruebas de usuario para evaluar la interacción y el confort en VR.",
        "卒業研究 - VRアクションRPGにおける快適性、可読性、プレイヤーインタラクションの向上を目的とした、研究に基づくUX/UIおよびインタラクションデザインガイドです。Meta Quest 3向けのUnityデモとユーザーテストを組み合わせ、VRにおけるインタラクションと快適性を評価しました。"
      ),
      featuredContributions: t(
        [
          "Designed VR interaction patterns and UI and built them into a Meta Quest 3 demo in Unity (AI-assisted)",
          "Configurable locomotion: teleport, continuous with vignette, and hybrid",
          "Defined comfort-focused interaction guidelines for action-RPG use cases",
          "Tested with 19 participants (pre/post SSQ, SUS): median SUS of 77.5",
          "Found motion-sensitive users and proposed comfort adjustments"
        ],
        [
          "Diseño de patrones de interacción y UI en VR, construidos con asistencia de IA en una demo de Unity para Meta Quest 3",
          "Locomoción configurable: teletransporte, continua con viñeta e híbrida",
          "Definición de guías de interacción centradas en la comodidad para casos de uso Action-RPG",
          "Pruebas con 19 participantes (SSQ antes y después, SUS): mediana SUS de 77,5",
          "Detección de usuarios sensibles al mareo y propuesta de ajustes de confort"
        ],
        [
          "VRのインタラクションパターンとUIを設計し、AIの支援を受けてUnityでMeta Quest 3向けデモとして構築",
          "移動方式を選択可能：テレポート、視野制限付きの連続移動、ハイブリッド",
          "Action-RPG向けに快適性を重視したインタラクションガイドラインを定義",
          "19名の参加者でテストを実施（SSQ事前・事後、SUS）：SUSの中央値77.5",
          "VR酔いしやすいユーザーを特定し、快適性の改善案を提示"
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
          "Tested with 19 participants (SSQ, SUS): median SUS of 77.5"
        ],
        [
          "Diseño de patrones de interacción VR y sistemas UI en Unity",
          "Definición de guías de diseño centradas en la comodidad",
          "Pruebas con 19 participantes (SSQ, SUS): mediana SUS de 77,5"
        ],
        [
          "UnityでVRインタラクションパターンとUIシステムを設計",
          "快適性重視のデザインガイドラインを定義",
          "19名でテストを実施（SSQ、SUS）：SUSの中央値77.5"
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
        "2D roguelite hack'n'slash made by a team of 3, centered on a systemic ability-stealing mechanic. Players take and upgrade enemy abilities while enemies scale with the player's progress, creating a self-balancing combat loop. I came up with and designed the ability stealing and the enemy scaling, and programmed the wave and level flow, menus and adaptive audio.",
        "Roguelite hack'n'slash 2D hecho en un equipo de 3, centrado en una mecánica sistémica de robo de habilidades. El jugador roba y mejora habilidades enemigas mientras los enemigos escalan con su progreso, lo que crea un bucle de combate autoequilibrado. Ideé y diseñé el robo de habilidades y el escalado de enemigos, y programé el flujo de oleadas y niveles, los menús y el audio adaptativo.",
        "3人チームで制作した2Dローグライト・ハックアンドスラッシュです。敵の能力を奪うシステムを軸に、プレイヤーは奪った能力を強化し、敵はプレイヤーの成長に合わせて強くなることで、自動的にバランスが取れる戦闘ループを生み出します。能力奪取と敵スケーリングの発案・設計を担当し、ウェーブとレベルの進行、メニュー、状況に応じて変化するオーディオシステムをプログラムしました。"
      ),
      featuredContributions: t(
        [
          "Conceived and designed the core mechanic (ability stealing) and enemy scaling tied to player progression",
          "Designed kill-count requirements for stealing abilities, to keep the mechanic balanced",
          "Programmed room-based enemy waves and level flow (spawns, doors, boss) and the game menus",
          "All audio programming and integration: adaptive calm/combat music (royalty-free tracks, edited into loops), mixers and a low-pass filter in the pause and shop menus",
          "Level design for the first area and enemy tuning (slime splitting, rebalancing)",
          "Co-designed the ability economy and iterated on balance with the team through playtesting"
        ],
        [
          "Idea y diseño de la mecánica central (robo de habilidades) y del escalado de enemigos ligado al progreso del jugador",
          "Diseño de las restricciones por número de eliminaciones para poder robar habilidades, para equilibrar el robo",
          "Programación de las oleadas por salas y del flujo de niveles (spawns, puertas, jefe) y de los menús",
          "Programación e integración de todo el audio: música adaptativa calma/combate (pistas libres de derechos, editadas en bucle), mixers y filtro paso bajo en los menús de pausa y tienda",
          "Level design de la primera zona y ajuste de enemigos (división de slimes, rebalanceo)",
          "Codiseño de la economía de habilidades e iteración del balance en equipo mediante playtesting"
        ],
        [
          "コアメカニック（能力奪取）と、プレイヤーの成長に連動する敵スケーリングを発案・設計",
          "能力を奪うための撃破数条件を設計し、奪取メカニクスのバランスを調整",
          "部屋単位の敵ウェーブとレベル進行（スポーン、ドア、ボス）、各種メニューをプログラム",
          "オーディオ全般のプログラムと組み込み：平常時と戦闘時で切り替わるBGM（ロイヤリティフリー楽曲をループ用に編集）、ミキサー、ポーズ画面とショップでのローパスフィルター",
          "第1エリアのレベルデザインと敵の調整（スライムの分裂、リバランス）",
          "能力に関するゲーム内経済を共同設計し、チームでのプレイテストを通じてバランス調整を繰り返し実施"
        ]
      ),
      archiveSummary: t(
        "2D roguelite hack'n'slash made in Unity by a team of 3 for a university course, built around stealing and evolving enemy abilities to escape Thanatos' prison.",
        "Roguelite hack'n'slash 2D hecho en Unity por un equipo de 3 para una asignatura, construido alrededor del robo y la evolución de habilidades enemigas para escapar de la prisión de Thanatos.",
        "タナトスの牢獄から脱出するために、敵の能力を奪って成長させることを軸にした2Dローグライト（大学の授業課題・3人チーム）。"
      ),
      archiveContributions: t(
        [
          "Conceived and designed the ability stealing (with kill-count requirements) and enemy scaling",
          "Programmed enemy waves, level flow, menus and the audio system (royalty-free music)",
          "Level design for the first area and enemy tuning"
        ],
        [
          "Idea y diseño del robo de habilidades (con requisito de eliminaciones) y del escalado de enemigos",
          "Programación de oleadas, flujo de niveles, menús y del sistema de audio (música libre de derechos)",
          "Level design de la primera zona y ajuste de enemigos"
        ],
        [
          "撃破数条件付きの能力奪取と敵スケーリングを発案・設計",
          "敵ウェーブ、レベル進行、メニュー、オーディオシステム（ロイヤリティフリー楽曲を使用）をプログラム",
          "第1エリアのレベルデザインと敵の調整"
        ]
      ),
      link: {
        href: "https://marcd419.itch.io/godly-thief",
        labelKey: "visit"
      }
    },
    {
      id: "twistedtail",
      featured: false,
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
        "Puzzle/stealth game made in 48 hours by a team of 4 for ZenoJam (December 2020), built around a color-based camouflage mechanic. Developed under tight time constraints with focus on rapid iteration, mechanical clarity and readable player feedback.",
        "Juego de puzles/stealth hecho en 48 horas por un equipo de 4 para la ZenoJam (diciembre de 2020), basado en una mecánica de camuflaje por colores. Desarrollado con fuertes restricciones de tiempo, con foco en la iteración rápida, la claridad mecánica y un feedback legible para el jugador.",
        "ZenoJam（2020年12月）で4人チームが48時間で制作した、色によるカモフラージュを軸にしたパズル／ステルスゲームです。厳しい時間制約の中で、素早い反復、メカニクスの分かりやすさ、プレイヤーに伝わりやすいフィードバックを重視して開発しました。"
      ),
      featuredContributions: t(
        [
          "Designed the core color-camouflage mechanic",
          "Programmed most of the enemy AI: line-of-sight detection, chasing, moving to the last known position and \"!\"/\"?\" alert feedback",
          "Programmed the respawn system and set up the player, enemy and respawn prefabs",
          "Selected and integrated all the audio from licensed libraries (AudioManager, mixers, music and SFX)",
          "Animated door prefab, reworked pause menu and app icon"
        ],
        [
          "Diseño de la mecánica central de camuflaje por colores",
          "Programación de la mayor parte de la IA enemiga: detección por línea de visión, persecución, ir a la última posición conocida y aviso «!»/«?»",
          "Programación del sistema de respawn y configuración de los prefabs de jugador, enemigo y respawn",
          "Selección e integración de todo el audio a partir de bibliotecas con licencia (AudioManager, mixers, música y efectos)",
          "Prefab animado de la puerta, menú de pausa rehecho e icono de la app"
        ],
        [
          "色によるカモフラージュのコアメカニクスを設計",
          "敵AIの大部分をプログラム：視線による検知、追跡、最終目撃地点への移動、「！」「？」による警戒状態の表示",
          "リスポーンシステムをプログラムし、プレイヤー・敵・リスポーン用プレハブを設定",
          "ライセンス済みライブラリから全オーディオを選定・統合（AudioManager、ミキサー、BGM、効果音）",
          "ドアのアニメーション付きプレハブ、ポーズメニューの作り直し、アプリアイコン"
        ]
      ),
      archiveSummary: t(
        "48-hour puzzle/stealth jam game (team of 4) built around a color camouflage mechanic.",
        "Juego de puzles/stealth hecho en 48 horas para una game jam (equipo de 4), basado en una mecánica de camuflaje por colores.",
        "4人チームで48時間のゲームジャムで制作した、色によるカモフラージュを軸にしたパズル／ステルスゲーム。"
      ),
      archiveContributions: t(
        [
          "Designed the core color-camouflage mechanic",
          "Programmed most of the enemy AI (line of sight, chase, last known position, alert feedback) and the respawn system",
          "Selected and integrated all the audio from licensed libraries"
        ],
        [
          "Diseño de la mecánica central de camuflaje por colores",
          "La mayor parte de la IA enemiga (línea de visión, persecución, última posición conocida, aviso de alerta) y sistema de respawn",
          "Selección e integración de todo el audio a partir de bibliotecas con licencia"
        ],
        [
          "色によるカモフラージュのコアメカニクスを設計",
          "敵AIの大部分（視線検知、追跡、最終目撃地点への移動、警戒状態の表示）とリスポーンシステムをプログラム",
          "ライセンス済みライブラリから全オーディオを選定・統合"
        ]
      ),
      link: {
        href: "https://marcd419.itch.io/twisted-tail",
        labelKey: "visit"
      }
    },
    {
      id: "starabyss",
      featured: true,
      featuredOrder: 3,
      archive: true,
      categories: ["filter-systems"],
      title: t("Star Abyss (Systems Prototype)", "Star Abyss (Prototipo de Sistemas)", "Star Abyss（システムプロトタイプ）"),
      images: {
        thumbnail: "assets/img/portfolio/portfolio-7.jpg",
        hero: "assets/img/portfolio/StarAbyss-hero-wide.jpg"
      },
      featuredMeta: t(
        "Solo Systems Prototype - Unity - 12 days - Android & Web",
        "Prototipo de sistemas en solitario - Unity - 12 días - Android y Web",
        "個人制作のシステムプロトタイプ - Unity - 12日間 - Android／Web"
      ),
      featuredDescription: t(
        "Solo, 12-day reinterpretation of Helix Jump, published on itch.io for Android and Web. I designed every mechanic added to the original formula — a heat system that makes each bounce a risk, a manually activated FireMode, six segment types, rotating sectors and endless generation with a guaranteed safe path — and wrote the design document. The code was built with AI assistance (ChatGPT, DeepSeek) from that document; I directed, integrated and debugged it, composed the music and SFX, and shipped the builds.",
        "Reinterpretación de Helix Jump hecha en solitario en 12 días y publicada en itch.io para Android y Web. Diseñé todas las mecánicas que añadí a la fórmula original —un sistema de calor que convierte cada rebote en un riesgo, un FireMode de activación manual, seis tipos de segmento, sectores rotatorios y una generación infinita con pasillo de seguridad— y escribí el documento de diseño. El código se construyó con asistencia de IA (ChatGPT y DeepSeek) a partir de ese documento: yo lo dirigí, lo integré y lo depuré, compuse la música y los efectos de sonido y publiqué las builds.",
        "Helix Jumpを再解釈した個人制作作品で、12日間で開発し、itch.ioでAndroid版とWeb版を公開しました。元の仕組みに加えたメカニクス――バウンドするたびに熱が蓄積し、リスクが高まるヒートシステム、手動で発動するFireMode、6種類のセグメント、回転するセクター、安全な通路を必ず確保する無限生成――をすべて設計し、デザインドキュメントを作成しました。そのドキュメントをもとにAI（ChatGPT、DeepSeek）に指示してコードを生成させ、私は統合とデバッグを担当しました。BGMと効果音の制作、ビルドの公開も担当しました。"
      ),
      featuredContributions: t(
        [
          "Designed a heat system: every bounce adds heat, at 100% the ball explodes, and clean ring passes cool it down",
          "Designed FireMode with cumulative charge and manual activation (it started automatic; I made it a player choice)",
          "Designed 6 segment types (Normal, Hazard, Boost, Fragile, Ice, Charge), rotating sectors and the clean-break rule",
          "Designed endless procedural generation with a safe path, difficulty rising up to ring 200, and a Zen mode",
          "Tuned game feel (hit-stop, screenshake); composed the music (Vital, Surge XT) and 9 SFX",
          "AI-assisted implementation (ChatGPT, DeepSeek) from my design document: integration, debugging and Android/Web release. Shaders were AI-generated and tuned by me"
        ],
        [
          "Diseño del sistema de calor: cada rebote suma temperatura, al 100 % la bola explota y pasar anillos limpios la enfría",
          "Diseño de FireMode con carga acumulativa y activación manual (empezó siendo automático; lo cambié para que fuera decisión del jugador)",
          "Diseño de 6 tipos de segmento (Normal, Hazard, Boost, Fragile, Ice, Charge), sectores rotatorios y la rotura limpia",
          "Diseño de la generación procedural infinita con pasillo de seguridad, dificultad creciente hasta el anillo 200 y modo Zen",
          "Ajuste del game feel (hit-stop, screenshake); música (Vital, Surge XT) y 9 efectos de sonido propios",
          "Implementación asistida por IA (ChatGPT y DeepSeek) a partir de mi documento de diseño: integración, depuración y publicación en Android y Web. Los shaders los generó la IA y yo ajusté sus valores"
        ],
        [
          "ヒートシステムを設計：バウンドごとに熱が上昇し100％でボールが爆発、リングをきれいに通過すると冷却",
          "チャージが蓄積するFireModeを設計し、自動発動からプレイヤーが選んで発動する手動方式へ変更",
          "6種類のセグメント（Normal、Hazard、Boost、Fragile、Ice、Charge）、回転セクター、クリーンブレイクのルールを設計",
          "安全な通路を確保し200リング目まで難易度が上がる無限プロシージャル生成と、Zenモードを設計",
          "ヒットストップと画面揺れでゲームフィールを調整。BGM（Vital、Surge XT）と効果音9種を自作",
          "自作のデザインドキュメントをもとにAI（ChatGPT、DeepSeek）でコードを生成し、統合・デバッグ・Android／Web版の公開を担当。シェーダーはAIが生成し、パラメータは自分で調整"
        ]
      ),
      archiveSummary: t(
        "Solo 12-day reinterpretation of Helix Jump with a heat-based risk system, published for Android and Web.",
        "Reinterpretación de Helix Jump hecha en solitario en 12 días, con un sistema de riesgo por calor; publicada para Android y Web.",
        "12日間で個人制作したHelix Jumpの再解釈作品。ヒートによるリスクシステムを搭載し、Android版とWeb版を公開。"
      ),
      archiveContributions: t(
        [
          "Designed the heat system, manual FireMode, 6 segment types and safe-path endless generation",
          "AI-assisted implementation from my design document; integration, debugging and release",
          "Composed the music and 9 SFX; tuned hit-stop and screenshake"
        ],
        [
          "Diseño del sistema de calor, el FireMode manual, 6 tipos de segmento y la generación infinita con pasillo de seguridad",
          "Implementación asistida por IA a partir de mi documento de diseño; integración, depuración y publicación",
          "Música y 9 efectos de sonido propios; ajuste de hit-stop y screenshake"
        ],
        [
          "ヒートシステム、手動FireMode、6種類のセグメント、安全通路付きの無限生成を設計",
          "自作のデザインドキュメントをもとにAI支援で実装し、統合・デバッグ・公開を担当",
          "BGMと効果音9種を自作し、ヒットストップと画面揺れを調整"
        ]
      ),
      link: {
        href: "https://shiroi-ookami.itch.io/star-abyss",
        labelKey: "visit"
      },
      video: {
        href: "https://youtu.be/2HD6Agupr30",
        labelKey: "watch_gameplay"
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
        "Educational recreation of the classic arcade game, made in Phaser by a team of 3 for a university course and playable here.",
        "Recreación educativa del clásico arcade, hecha en Phaser por un equipo de 3 para una asignatura y jugable aquí.",
        "Phaserで開発したクラシックアーケードゲームの学習目的の再現作品（大学の授業課題・3人チーム）。ここからプレイ可能。"
      ),
      archiveContributions: t(
        [
          "Built the level: tilemap layers, backgrounds, two-floor hill and all environment collisions",
          "Ladders, moving platform and door",
          "Reworked player movement and health; implemented Arthur's attack, jump, hit and death",
          "Enemy respawning and SFX with preloading"
        ],
        [
          "Construcción del nivel: capas de tilemap, fondos, colina con segundo piso y todas las colisiones del entorno",
          "Escaleras, plataforma móvil y puerta",
          "Reestructuración del movimiento y la salud del jugador; ataque, salto, golpe y muerte de Arthur",
          "Reaparición de enemigos y efectos de sonido con precarga"
        ],
        [
          "レベル構築：タイルマップのレイヤー、背景、2階層の丘、環境のすべての当たり判定",
          "はしご、移動床、ドア",
          "プレイヤーの移動と体力処理を再構成し、アーサーの攻撃・ジャンプ・被弾・死亡を実装",
          "敵のリスポーンと効果音（プリロード含む）"
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
        "Side-scrolling tower defense made in Unity by a team of 3 for a university course, where archaeologists, military and aliens fight over a vital resource.",
        "Tower defense con scroll lateral hecho en Unity por un equipo de 3 para una asignatura, en el que arqueólogos, militares y alienígenas luchan por un recurso vital.",
        "考古学者、軍隊、エイリアンが重要資源を巡って争う横スクロール型タワーディフェンス（大学の授業課題・3人チーム）。"
      ),
      archiveContributions: t(
        [
          "Main maintainer of the GDD: narrative, unit stat tables and economy",
          "Faction selection screen, menu navigation, hover tooltips and credits scene",
          "Audio setup (SoundController, AudioMixer, SFX) and shared Scrum coordination"
        ],
        [
          "Principal mantenedor del GDD: narrativa, tablas de estadísticas de unidades y economía",
          "Pantalla de selección de facción, navegación entre menús, mensajes al pasar el ratón y escena de créditos",
          "Audio (SoundController, AudioMixer, efectos) y coordinación Scrum compartida"
        ],
        [
          "GDDの主担当として、ストーリー、ユニットのステータス表、経済設計を管理",
          "陣営選択画面、メニュー間の遷移、マウスオーバー時のメッセージ表示、クレジット画面",
          "オーディオ（SoundController、AudioMixer、効果音）と、チームで分担したスクラム進行"
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
        "Restaurant management sim made in Unreal Engine 4 (Blueprints) by a team of 5: fulfilling online orders, cooking dishes, upgrading the venue and managing stock.",
        "Simulación de gestión de restaurante hecha en Unreal Engine 4 (Blueprints) por un equipo de 5: pedidos online, cocina, mejoras del local y control de stock.",
        "オンライン注文処理、調理、店舗アップグレード、在庫管理を軸にしたレストラン経営シミュレーション（UE4・5人チーム）。"
      ),
      archiveContributions: t(
        [
          "Built the full cooking system (appliance parent Blueprint, dishes and cooking phases), orders and save game",
          "Map, lighting, NavMesh and level optimization",
          "Scrum Master; zone-based audio and library music selection"
        ],
        [
          "Sistema de cocina completo (blueprint padre de electrodomésticos, platos y fases de cocinado), pedidos y partida guardada",
          "Mapa, iluminación, NavMesh y optimización del nivel",
          "Scrum Master; audio por zonas y selección de música de biblioteca"
        ],
        [
          "調理システム全体（調理器具の親Blueprint、料理、調理フェーズ）、注文処理、セーブ機能を実装",
          "マップ、ライティング、NavMesh、レベルの最適化",
          "スクラムマスターを担当。エリアごとのオーディオとライブラリ楽曲の選定"
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
        "21-day jam game made in Unity by a team of 4 (2 programmers, an artist and a composer), where a third faction disrupts a war between two armies and forces a new combat balance.",
        "Juego de game jam de 21 días hecho en Unity por un equipo de 4 (2 programadores, un artista y un compositor), en el que una tercera facción irrumpe en una guerra entre dos ejércitos y fuerza un nuevo equilibrio de combate.",
        "二つの軍勢の戦争に第三勢力が介入し、新しい戦闘バランスを生み出す21日間のゲームジャム作品（Unity・4人チーム：プログラマー2名、アーティスト1名、作曲者1名）。"
      ),
      archiveContributions: t(
        [
          "Programmed the turn-based combat logic (turn order, damage, healing), characters, stats, leveling and ability implementation",
          "Balanced encounters and combat pacing",
          "Scene work: camera, map and dungeon backgrounds, lighting and set dressing; sourced missing 3D models with verified licenses",
          "Edited the team composer's music into loops in Audacity and integrated music and SFX"
        ],
        [
          "Programación de la lógica del combate por turnos (orden de turnos, daño y curación), personajes, estadísticas y subida de nivel; implementación de habilidades",
          "Balanceo de los encuentros y del ritmo de combate",
          "Escena: cámara, fondos del mapa y la mazmorra, iluminación y decoración; búsqueda de los modelos 3D que faltaban, con licencias comprobadas",
          "Edición en bucle con Audacity de la música del compositor del equipo e integración de música y SFX"
        ],
        [
          "ターン制戦闘のロジック（ターン順、ダメージ、回復）、キャラクター、ステータス、レベルアップをプログラムし、スキルを実装",
          "エンカウントと戦闘テンポのバランス調整",
          "シーン制作：カメラ、マップとダンジョンの背景、ライティング、装飾。不足していた3Dモデルをライセンスを確認したうえで調達",
          "チームの作曲者による楽曲をAudacityでループ用に編集し、BGMと効果音を組み込み"
        ]
      ),
      link: {
        href: "https://nhos.itch.io/playernt-fantasy",
        labelKey: "visit"
      }
    }
  ]);
})();
