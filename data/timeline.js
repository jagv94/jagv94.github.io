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
          "Developed a point cloud to .fbx converter.",
          "Created an export plugin for Nanite models to .pak format."
        ],
        [
          "Definición de objetivos y redacción del documento de diseño para un visor 3D.",
          "Desarrollo de un conversor de nubes de puntos a .fbx.",
          "Creación de un plugin de exportación de modelos Nanite a formato .pak."
        ],
        [
          "3Dモデルビューア向けの目標定義とデザインドキュメント作成。",
          "点群から .fbx へのコンバータを開発。",
          "Naniteモデルを .pak 形式へ書き出すプラグインを作成。"
        ]
      ),
      tech: t(
        ["Unreal Engine", "C++", "VR", "Point Cloud", "Blueprint"],
        ["Unreal Engine", "C++", "VR", "Nube de Puntos", "Blueprint"],
        ["Unreal Engine", "C++", "VR", "点群", "Blueprint"]
      )
    },
    {
      id: "enti_work",
      type: "work",
      logo: {
        src: "assets/img/logos/enti-logo.png",
        alt: t("ENTI logo", "Logo de ENTI", "ENTIのロゴ")
      },
      title: t("VR Lab Technician", "Técnico de Laboratorio VR", "VRラボ技術者"),
      role: t("Virtual Reality Lab Technician", "Técnico de Laboratorio de Realidad Virtual", "VRラボ技術者"),
      date: t("Nov/2022 - Jul/2024", "Nov/2022 - Jul/2024", "2022年11月 - 2024年7月"),
      place: t("ENTI, Barcelona", "ENTI, Barcelona", "ENTI, バルセロナ"),
      entity: t(
        "ENTI - School of New Interactive Technologies",
        "ENTI - Escola de Noves Tecnologies Interactives",
        "ENTI - 新インタラクティブ技術学校"
      ),
      bullets: t(
        [
          "Managed inventory, care and maintenance of VR/AR equipment.",
          "Handled reserve and loan logistics.",
          "Documented peripherals and demonstrators."
        ],
        [
          "Gestión de inventario, cuidado y mantenimiento de equipos VR/AR.",
          "Gestión de reservas y préstamos.",
          "Documentación de periféricos y demostradores."
        ],
        [
          "VR/AR機器の在庫管理、保守、メンテナンスを担当。",
          "予約と貸出の運用を管理。",
          "周辺機器とデモ機材のドキュメントを整備。"
        ]
      ),
      tech: t(
        ["VR Hardware", "Unity", "Unreal", "Documentation"],
        ["Hardware VR", "Unity", "Unreal", "Documentación"],
        ["VRハードウェア", "Unity", "Unreal", "ドキュメンテーション"]
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
          "Resolved incidents and helpdesk requests for Baxi technicians.",
          "Tested and debugged web apps and PDAs."
        ],
        [
          "Resolución de incidencias y soporte helpdesk para técnicos de Baxi.",
          "Pruebas y depuración de aplicaciones web y PDAs."
        ],
        [
          "Baxi技術者向けのインシデント対応とヘルプデスクを実施。",
          "WebアプリとPDAのテストおよびデバッグを担当。"
        ]
      ),
      tech: t(
        ["Web Apps", "Debugging", "Helpdesk"],
        ["Aplicaciones Web", "Depuración", "Soporte"],
        ["Webアプリ", "デバッグ", "ヘルプデスク"]
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
        "University Degree, Interactive Digital Content",
        "Grado Universitario, Creación de Contenidos Digitales",
        "インタラクティブデジタルコンテンツ制作（学士）"
      ),
      role: t(
        "Interactive Digital Content Creation",
        "Creación de Contenidos Digitales Interactivos",
        "インタラクティブデジタルコンテンツ制作"
      ),
      date: t("2019 - 2025", "2019 - 2025", "2019年 - 2025年"),
      place: t("ENTI, Barcelona", "ENTI, Barcelona", "ENTI, バルセロナ"),
      entity: t("ENTI - University Degree", "ENTI - Grado Universitario", "ENTI - 大学学位"),
      bullets: t(
        [
          "Specialized in Technical Game Design and VR/XR development.",
          "Bachelor's Thesis focused on VR Interaction Design."
        ],
        [
          "Especialización en Diseño Técnico de Juego y desarrollo VR/XR.",
          "Trabajo de Fin de Grado centrado en Diseño de Interacción en VR."
        ],
        [
          "テクニカルゲームデザインとVR/XR開発を専攻。",
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
        "Multiplatform App Development",
        "Desarrollo de Aplicaciones Multiplataforma",
        "マルチプラットフォームアプリ開発"
      ),
      role: t(
        "Multiplatform App Development",
        "Desarrollo de Aplicaciones Multiplataforma",
        "マルチプラットフォームアプリ開発"
      ),
      date: t("2016 - 2019", "2016 - 2019", "2016年 - 2019年"),
      place: t("Institut Marianao", "Institut Marianao", "Institut Marianao"),
      entity: t("Institut Marianao", "Institut Marianao", "Institut Marianao"),
      bullets: t(
        [
          "Higher education focused on software development.",
          "Project-based learning in C++ and Java."
        ],
        [
          "Formación superior centrada en desarrollo de software.",
          "Aprendizaje basado en proyectos con C++ y Java."
        ],
        [
          "ソフトウェア開発を中心とした高等教育課程。",
          "C++とJavaによるプロジェクトベース学習。"
        ]
      ),
      tech: t(
        ["C++", "Java", "SQL", "Android", "iOS"],
        ["C++", "Java", "SQL", "Android", "iOS"],
        ["C++", "Java", "SQL", "Android", "iOS"]
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
        "Microcomputer and Network Technician",
        "Técnico en Microinformática y Redes",
        "マイクロコンピュータ・ネットワーク技術者"
      ),
      role: t(
        "Microcomputer and Network Technician",
        "Técnico en Microinformática y Redes",
        "マイクロコンピュータ・ネットワーク技術者"
      ),
      date: t("2012 - 2015", "2012 - 2015", "2012年 - 2015年"),
      place: t("Institut Marianao", "Institut Marianao", "Institut Marianao"),
      entity: t("Institut Marianao", "Institut Marianao", "Institut Marianao"),
      bullets: t(
        [
          "Vocational training in IT systems and networks.",
          "Hardware maintenance and network configuration."
        ],
        [
          "Formación profesional en sistemas informáticos y redes.",
          "Mantenimiento de hardware y configuración de redes."
        ],
        [
          "ITシステムとネットワークに関する職業訓練。",
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
