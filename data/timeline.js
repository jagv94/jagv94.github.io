(() => {
  const t = (en, es, ja) => ({ en, es, ja });

  window.PORTFOLIO_TIMELINE = Object.freeze([
    {
      id: "ub",
      type: "work",
      logo: {
        src: "assets/img/logos/ub-logo.png",
        alt: t("Universitat de Barcelona logo", "Logo de la Universitat de Barcelona", "バルセロナ大学のロゴ")
      },
      title: t("VR Developer Intern", "Desarrollador VR en Prácticas", "VR開発インターン"),
      role: t("VR Developer Intern", "Desarrollador VR en Prácticas", "VR開発インターン"),
      date: t("Jan/2025 - May/2025", "Ene/2025 - May/2025", "2025年1月 - 2025年5月"),
      place: t("Faculty of Earth Sciences, UB", "Facultad de Ciencias de la Tierra, UB", "バルセロナ大学 地球科学部"),
      entity: t("Universitat de Barcelona", "Universitat de Barcelona", "バルセロナ大学"),
      bullets: t(
        [
          "Defined goals and drafted design document for a 3D model viewer.",
          "Evaluated Unreal/Nanite against Unity and Cesium for viewing photogrammetry models of over 64 million triangles in VR.",
          "Python tool and custom C++ plugins (AI-assisted): point cloud → FBX via CloudCompare (FBXCloudConverter), FBX → Nanite Static Mesh with an import commandlet (NaniteConverter) and runtime .pak loading.",
          "VR model-selection UI (lazy-follow menu, laser pointer, submenus). Cooking and .pak loading were left unfinished and documented."
        ],
        [
          "Definición de objetivos y redacción del documento de diseño para un visor 3D.",
          "Evaluación de Unreal/Nanite frente a Unity y Cesium para visualizar en VR modelos fotogramétricos de más de 64 M de triángulos.",
          "Herramienta en Python y plugins propios en C++ (con asistencia de IA): nubes de puntos → FBX con CloudCompare (FBXCloudConverter), FBX → Static Mesh con Nanite y commandlet de importación (NaniteConverter) y carga de .pak en runtime.",
          "Interfaz VR para elegir modelos (menú lazy follow, láser, submenús). El cocinado y la carga de .pak quedaron sin completar y documentados."
        ],
        [
          "3Dモデルビューア向けの目標定義とデザインドキュメント作成。",
          "6,400万を超える三角形からなるフォトグラメトリモデルをVRで表示するため、Unreal/NaniteをUnityおよびCesiumと比較評価。",
          "PythonツールとC++の独自プラグイン（AI支援）：CloudCompareを使った点群→FBX変換（FBXCloudConverter）、インポート用コマンドレットによるFBX→Nanite Static Mesh変換（NaniteConverter）、ランタイムでの .pak 読み込み。",
          "VRモデル選択UI（レイジーフォローメニュー、レーザーポインター、サブメニュー）。アセットのクックと .pak の読み込みは未完成のままとなり、その状態をドキュメント化。"
        ]
      ),
      tech: t(
        ["Unreal Engine", "C++", "Python", "Nanite", "VR", "Point Cloud", "Blueprint"],
        ["Unreal Engine", "C++", "Python", "Nanite", "VR", "Nube de Puntos", "Blueprint"],
        ["Unreal Engine", "C++", "Python", "Nanite", "VR", "点群", "Blueprint"]
      )
    },
    {
      id: "enti_work",
      type: "work",
      logo: {
        src: "assets/img/logos/enti-logo.png",
        alt: t("ENTI logo", "Logo de ENTI", "ENTIのロゴ")
      },
      title: t("VR Lab Technician Intern", "Técnico de Laboratorio VR en Prácticas", "VRラボ技術者インターン"),
      role: t("Virtual Reality Lab Technician Intern", "Técnico de Laboratorio de Realidad Virtual en Prácticas", "VRラボ技術者インターン"),
      date: t("Nov/2022 - Jul/2024", "Nov/2022 - Jul/2024", "2022年11月 - 2024年7月"),
      place: t("ENTI, Barcelona", "ENTI, Barcelona", "ENTI, バルセロナ"),
      entity: t(
        "ENTI - School of New Interactive Technologies",
        "ENTI - Escola de Noves Tecnologies Interactives",
        "ENTI - 新インタラクティブ技術学校"
      ),
      bullets: t(
        [
          "Designed the hub level of a Unity VR prototype for Virtuix Omni treadmills (team of 5): a hexagonal nexus with elemental doors, a symbol-rotation column puzzle (later cut for time) and gem pedestals. Wrote its design document, built the layout, torches, baked lighting and audio transition, and programmed the pedestal puzzle that drains the water.",
          "Built the lava zone: programmed platforms that sink into the lava in random order, moving platforms usable by the player and the enemy, and editor gizmos to preview their path and final height; integrated the rock-melting sounds. The prototype was shown at the Saló de l'Ensenyament.",
          "Technical documentation for the lab (Meta Quest, Virtuix Omni, OBS) and a VR/AR hardware comparison report.",
          "Inventory, testing, maintenance and cataloging of headsets, consoles and peripherals, plus equipment loan forms."
        ],
        [
          "Diseño del nivel central de un prototipo VR en Unity para cintas Virtuix Omni (equipo de 5): un nexo hexagonal con puertas elementales, un puzle de columnas con símbolos que se rotan (recortado después por falta de tiempo) y pedestales para gemas. Documento de diseño propio; layout, antorchas, iluminación bakeada y transición de audio, y programación del puzle de los pedestales que vacía el agua.",
          "Zona de lava: programación de plataformas que se hunden en la lava en orden aleatorio, plataformas móviles que usan el jugador y el enemigo, y gizmos de editor para previsualizar su recorrido y su altura final; integración de los sonidos de roca fundiéndose. El prototipo se mostró en el Saló de l'Ensenyament.",
          "Documentación técnica del laboratorio (Meta Quest, Virtuix Omni, OBS) e informe comparativo de hardware VR/AR.",
          "Inventario, pruebas, mantenimiento y catalogación de visores, consolas y periféricos, y formularios de préstamo."
        ],
        [
          "Virtuix Omni向けUnity製VRプロトタイプ（5人チーム）のハブレベルを設計：属性ごとの扉、シンボルを回転させる柱のパズル（後に時間不足のためカット）、宝石の台座を備えた六角形のネクサス。デザインドキュメントを作成し、レイアウト、松明、ベイクドライティング、オーディオの切り替えを実装。水を抜く台座パズルもプログラム。",
          "溶岩ゾーンを構築：ランダムな順番で溶岩に沈む足場、プレイヤーと敵が使える移動床、経路と最終的な高さを確認できるエディタ用ギズモをプログラムし、岩が溶ける効果音を組み込み。プロトタイプはSaló de l'Ensenyamentで展示。",
          "ラボの技術ドキュメント（Meta Quest、Virtuix Omni、OBS）とVR/ARハードウェア比較レポートを作成。",
          "ヘッドセット、ゲーム機、周辺機器の在庫管理・動作確認・メンテナンス・機材の台帳登録と、機材貸出用フォームの作成。"
        ]
      ),
      tech: t(
        ["VR Hardware", "Virtuix Omni", "Unity", "Unreal", "Documentation"],
        ["Hardware VR", "Virtuix Omni", "Unity", "Unreal", "Documentación"],
        ["VRハードウェア", "Virtuix Omni", "Unity", "Unreal", "ドキュメント作成"]
      )
    },
    {
      id: "consultia",
      type: "work",
      logo: {
        src: "assets/img/logos/consultia-logo.png",
        alt: t("Consultia IT logo", "Logo de Consultia IT", "Consultia ITのロゴ")
      },
      title: t("Jr. Programmer", "Programador Junior", "ジュニアプログラマー"),
      role: t("Jr. Programmer", "Programador Junior", "ジュニアプログラマー"),
      date: t("May/2019 - Sep/2019", "May/2019 - Sep/2019", "2019年5月 - 2019年9月"),
      place: t("ConsultiaIT, Barcelona", "ConsultiaIT, Barcelona", "ConsultiaIT, バルセロナ"),
      entity: t("Consultia IT", "Consultia IT", "Consultia IT"),
      bullets: t(
        [
          "Tested the company's web platform and the PDA system (devices and software) used by field technicians; reported bugs.",
          "Phone support for field technicians: reproduced their PDA issues on an office device using their account, fixed their databases and synced the fix back."
        ],
        [
          "Pruebas de la web de la empresa y del sistema de PDA (dispositivos y software) de los técnicos de campo; reporte de errores.",
          "Soporte telefónico a técnicos de campo: reproducción de sus incidencias en una PDA de la oficina con su cuenta, corrección de su base de datos y sincronización del arreglo con su dispositivo."
        ],
        [
          "自社Webプラットフォームと、現場技術者が使用するPDAシステム（端末・ソフトウェア）のテストおよび不具合報告。",
          "現場技術者への電話サポート。事務所のPDAで技術者のアカウントを使用して不具合を再現し、データベースを修正したうえで、修正内容を技術者の端末に同期。"
        ]
      ),
      tech: t(
        ["Web Apps", "Testing", "Helpdesk", "Databases"],
        ["Aplicaciones Web", "Pruebas", "Soporte", "Bases de datos"],
        ["Webアプリ", "テスト", "ヘルプデスク", "データベース"]
      )
    },
    {
      id: "everis",
      type: "work",
      logo: {
        src: "assets/img/logos/everis-logo.png",
        alt: t("Everis logo", "Logo de Everis", "Everisのロゴ")
      },
      title: t("Computer Technician", "Técnico Informático", "IT技術者"),
      role: t("Computer Technician", "Técnico Informático", "IT技術者"),
      date: t("Jan/2018 - May/2018", "Ene/2018 - May/2018", "2018年1月 - 2018年5月"),
      place: t("Everis BPO, Barcelona", "Everis BPO, Barcelona", "Everis BPO, バルセロナ"),
      entity: t("Everis BPO", "Everis BPO", "Everis BPO"),
      bullets: t(
        [
          "Provided on-site technical support and software installations.",
          "Developed macros with Visual Basic 6.0.",
          "Created Access databases and related documentation."
        ],
        [
          "Soporte técnico presencial e instalación de software.",
          "Desarrollo de macros con Visual Basic 6.0.",
          "Creación de bases de datos Access y documentación asociada."
        ],
        [
          "オンサイト技術サポートとソフトウェア導入を担当。",
          "Visual Basic 6.0 によるマクロを開発。",
          "Accessデータベースと関連ドキュメントを作成。"
        ]
      ),
      tech: t(
        ["VB6", "Access", "IT Support", "Macros"],
        ["VB6", "Access", "Soporte IT", "Macros"],
        ["VB6", "Access", "ITサポート", "マクロ"]
      )
    },
    {
      id: "enti_edu",
      type: "education",
      logo: {
        src: "assets/img/logos/enti-logo.png",
        alt: t("ENTI logo", "Logo de ENTI", "ENTIのロゴ")
      },
      title: t(
        "Bachelor's Degree in Interactive Digital Content",
        "Grado en Contenidos Digitales Interactivos",
        "インタラクティブデジタルコンテンツ学士課程"
      ),
      role: t(
        "Bachelor's Degree in Interactive Digital Content",
        "Grado en Contenidos Digitales Interactivos",
        "インタラクティブデジタルコンテンツ学士課程"
      ),
      date: t("2019 - 2025", "2019 - 2025", "2019年 - 2025年"),
      place: t("ENTI, Barcelona", "ENTI, Barcelona", "ENTI, バルセロナ"),
      entity: t("ENTI - University of Barcelona", "ENTI-UB", "ENTI（バルセロナ大学）"),
      bullets: t(
        [
          "Projects focused on game design and VR/XR.",
          "Bachelor's Thesis focused on VR Interaction Design."
        ],
        [
          "Proyectos centrados en diseño de juego y VR/XR.",
          "Trabajo de Fin de Grado centrado en Diseño de Interacción en VR."
        ],
        [
          "ゲームデザインとVR/XRを中心としたプロジェクト。",
          "VRインタラクションデザインに関する卒業論文を制作。"
        ]
      ),
      tech: t(
        ["Unity", "Unreal", "C#", "C++", "VR"],
        ["Unity", "Unreal", "C#", "C++", "VR"],
        ["Unity", "Unreal", "C#", "C++", "VR"]
      )
    },
    {
      id: "marianao_dam",
      type: "education",
      logo: {
        src: "assets/img/logos/marianao-logo.png",
        alt: t("Institut Marianao logo", "Logo del Institut Marianao", "Institut Marianaoのロゴ")
      },
      title: t(
        "Higher Vocational Diploma in Multiplatform Application Development",
        "CFGS Desarrollo de Aplicaciones Multiplataforma",
        "マルチプラットフォームアプリケーション開発 上級職業課程（CFGS）"
      ),
      role: t(
        "Higher Vocational Diploma in Multiplatform Application Development",
        "CFGS Desarrollo de Aplicaciones Multiplataforma",
        "マルチプラットフォームアプリケーション開発 上級職業課程（CFGS）"
      ),
      date: t("2016 - 2019", "2016 - 2019", "2016年 - 2019年"),
      place: t("Institut Marianao", "Institut Marianao", "Institut Marianao"),
      entity: t("Institut Marianao", "Institut Marianao", "Institut Marianao"),
      bullets: t(
        [
          "Higher vocational training in software development, combining guided exercises with complete projects built from a brief with set goals and constraints.",
          "Coursework in C, C++, Java and Python, web development (HTML/CSS/PHP), databases (PostgreSQL, MySQL, MongoDB) and Android."
        ],
        [
          "Formación profesional de grado superior en desarrollo de software: ejercicios guiados y proyectos completos desarrollados a partir de un enunciado con objetivos y restricciones.",
          "Formación en C, C++, Java y Python, desarrollo web (HTML/CSS/PHP), bases de datos (PostgreSQL, MySQL, MongoDB) y Android."
        ],
        [
          "ソフトウェア開発の上級職業課程（CFGS）。指導に沿った演習に加え、目標と制約条件が設定された課題に基づき、プロジェクトを一から開発。",
          "C、C++、Java、Python、Web開発（HTML/CSS/PHP）、データベース（PostgreSQL、MySQL、MongoDB）、Android。"
        ]
      ),
      tech: t(
        ["C++", "Java", "Python", "SQL", "MongoDB", "Android"],
        ["C++", "Java", "Python", "SQL", "MongoDB", "Android"],
        ["C++", "Java", "Python", "SQL", "MongoDB", "Android"]
      )
    },
    {
      id: "marianao_smr",
      type: "education",
      logo: {
        src: "assets/img/logos/marianao-logo.png",
        alt: t("Institut Marianao logo", "Logo del Institut Marianao", "Institut Marianaoのロゴ")
      },
      title: t(
        "Intermediate Vocational Diploma in Microcomputer Systems and Networks",
        "CFGM Sistemas Microinformáticos y Redes",
        "マイクロコンピュータシステム・ネットワーク 中級職業課程（CFGM）"
      ),
      role: t(
        "Intermediate Vocational Diploma in Microcomputer Systems and Networks",
        "CFGM Sistemas Microinformáticos y Redes",
        "マイクロコンピュータシステム・ネットワーク 中級職業課程（CFGM）"
      ),
      date: t("2012 - 2015", "2012 - 2015", "2012年 - 2015年"),
      place: t("Institut Marianao", "Institut Marianao", "Institut Marianao"),
      entity: t("Institut Marianao", "Institut Marianao", "Institut Marianao"),
      bullets: t(
        [
          "Intermediate vocational training in IT systems and networks.",
          "Hardware maintenance and network configuration."
        ],
        [
          "Formación profesional de grado medio en sistemas informáticos y redes.",
          "Mantenimiento de hardware y configuración de redes."
        ],
        [
          "ITシステムとネットワークに関する中級職業課程。",
          "ハードウェア保守とネットワーク設定を学習。"
        ]
      ),
      tech: t(
        ["Networking", "Hardware", "Windows Server", "Linux"],
        ["Redes", "Hardware", "Windows Server", "Linux"],
        ["ネットワーク", "ハードウェア", "Windows Server", "Linux"]
      )
    }
  ]);
})();
