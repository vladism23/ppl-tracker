push: [
    // 1. Press plano
    {
      slotId: "push_press_plano",
      slotName: "Press plano",
      defaultVariant: "press_plano_libre",
      variants: [
        {
          id: "press_plano_libre",
          name: "Press banca con barra libre",
          targetReps: "6-8",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Aproximación progresiva. Codos a 45-60°, retracción escapular y arco neutro.</p>"
        },
        {
          id: "press_plano_guiada",
          name: "Press plano en guiada",
          targetReps: "8-10",
          sets: 3,
          rest: 150,
          warmupHtml: "<p>Alinear a la parte media/baja del esternón.</p>"
        },
        {
          id: "press_plano_mancuernas",
          name: "Press plano con mancuernas",
          targetReps: "8-10",
          sets: 3,
          rest: 150,
          warmupHtml: "<p>Agarre semi-neutro a 45° protegiendo tendón tríceps/codo izquierdo.</p>"
        }
      ]
    },

    // 2. Press militar
    {
      slotId: "push_press_militar",
      slotName: "Press militar",
      defaultVariant: "press_militar_guiada",
      variants: [
        {
          id: "press_militar_guiada",
          name: "Press militar en guiada",
          targetReps: "8-10",
          sets: 3,
          rest: 150,
          warmupHtml: "<p>Banco a 75-80°. Bajar a clavícula; abdomen firme sin arquear lumbares.</p>"
        },
        {
          id: "press_militar_mancuernas",
          name: "Press militar con mancuernas sentado",
          targetReps: "8-10",
          sets: 3,
          rest: 150,
          warmupHtml: "<p>Trayectoria vertical convergente sin chocar arriba.</p>"
        },
        {
          id: "press_militar_poleas",
          name: "Press militar en poleas",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Tensión continua en todo el recorrido.</p>"
        }
      ]
    },

    // 3. Tríceps 1
    {
      slotId: "push_triceps_katana",
      slotName: "Tríceps 1",
      defaultVariant: "katana_cruces_doble_cuerda",
      variants: [
        {
          id: "katana_cruces_doble_cuerda",
          name: "Extensiones Katana doble cuerda en polea cruces",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Codos estables y fijos detrás de la cabeza; estiramiento controlado sin tirones.</p>"
        },
        {
          id: "katana_simple_doble_cuerda",
          name: "Extensiones Katana doble cuerda en polea simple",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Polea simple (ratio directo); extensión estricta.</p>"
        }
      ]
    },

    // 4. Cruces
    {
      slotId: "push_cruces",
      slotName: "Cruces",
      defaultVariant: "cruces_polea_banco_inclinado",
      variants: [
        {
          id: "cruces_polea_banco_inclinado",
          name: "Cruces polea banco inclinado",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Banco inclinado a 30-45°. Pausa de 1 s en contracción.</p>"
        },
        {
          id: "flys_mancuernas_inclinado",
          name: "Flys con mancuernas banco inclinado",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Microflexión fija de codos; control excéntrico.</p>"
        }
      ]
    },

    // 5. Elevaciones laterales
    {
      slotId: "push_laterales",
      slotName: "Elevaciones laterales",
      defaultVariant: "laterales_polea_cruces",
      variants: [
        {
          id: "laterales_polea_cruces",
          name: "Elevaciones laterales en polea cruces",
          targetReps: "12-15",
          sets: 4,
          rest: 75,
          warmupHtml: "<p>Tensión constante desde el punto inicial.</p>"
        },
        {
          id: "laterales_mancuernas_inclinado",
          name: "Elevaciones laterales con mancuernas banco inclinado",
          targetReps: "12-15",
          sets: 4,
          rest: 75,
          warmupHtml: "<p>Pecho apoyado en banco a 60-70° para anular balanceo.</p>"
        },
        {
          id: "laterales_mancuernas_pie",
          name: "Elevaciones laterales con mancuernas de pie",
          targetReps: "12-15",
          sets: 4,
          rest: 75,
          warmupHtml: "<p>Ligera inclinación del tronco hacia adelante; guiar con los codos.</p>"
        }
      ]
    },

    // 6. Tríceps 2
    {
      slotId: "push_triceps_pushdown",
      slotName: "Tríceps 2",
      defaultVariant: "triceps_cruces_cuerda_2m",
      variants: [
        {
          id: "triceps_cruces_cuerda_2m",
          name: "Extensiones tríceps en polea cruces cuerda 2 manos",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Abrir la cuerda al final de la extensión para mayor acortamiento.</p>"
        },
        {
          id: "triceps_simple_cuerda_2m",
          name: "Extensiones tríceps en polea simple cuerda 2 manos",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Polea simple (mayor resistencia); codos pegados al cuerpo.</p>"
        },
        {
          id: "triceps_cruces_barra_recta",
          name: "Extensiones tríceps en polea cruces con barra recta",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Muñecas firmes sin hiperextensión articular.</p>"
        },
        {
          id: "triceps_simple_barra_recta",
          name: "Extensiones tríceps en polea simple con barra recta",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Polea simple con barra recta; controlar codo izquierdo.</p>"
        },
        {
          id: "triceps_cruces_cuerda_1m",
          name: "Extensiones tríceps en polea cruces cuerda 1 mano",
          targetReps: "12-15",
          sets: 3,
          rest: 60,
          warmupHtml: "<p>Unilateral; trayectoria natural del brazo.</p>"
        },
        {
          id: "triceps_simple_cuerda_1m",
          name: "Extensiones tríceps en polea simple cuerda 1 mano",
          targetReps: "12-15",
          sets: 3,
          rest: 60,
          warmupHtml: "<p>Unilateral en polea simple directa.</p>"
        },
        {
          id: "triceps_cruces_munequera_1m",
          name: "Extensiones tríceps en polea cruces muñequera 1 mano",
          targetReps: "12-15",
          sets: 3,
          rest: 60,
          warmupHtml: "<p>Cero fatiga de antebrazo con agarre en muñeca.</p>"
        },
        {
          id: "triceps_simple_munequera_1m",
          name: "Extensiones tríceps en polea simple muñequera 1 mano",
          targetReps: "12-15",
          sets: 3,
          rest: 60,
          warmupHtml: "<p>Muñequera en polea simple.</p>"
        }
      ]
    }
  ],
