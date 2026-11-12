const routineSlots = {
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

  pull: [
    {
      slotId: "pull_slot_vertical",
      slotName: "Tracción Vertical",
      defaultVariant: "pullup_weighted",
      variants: [
        {
          id: "pullup_weighted",
          name: "Dominadas lastradas",
          targetReps: "8",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Barbilla superando la barra; descenso controlado en 2-3 s sin balanceo.</p>"
        },
        {
          id: "lat_pulldown_cable",
          name: "Jalón al pecho en polea (agarre neutro o prono)",
          targetReps: "8-10",
          sets: 3,
          rest: 150,
          warmupHtml: "<p>Tronco levemente inclinado atrás (~15°). Tracción al esternón sin arquear lumbares.</p>"
        }
      ]
    },
    {
      slotId: "pull_slot_tbar",
      slotName: "Remo Pesado Dorsal",
      defaultVariant: "tbar_support",
      variants: [
        {
          id: "tbar_support",
          name: "Remo en T con soporte",
          targetReps: "8 (+ back-off)",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Soporte al pecho; parada de 1 s atrás dirigiendo codos a la cadera.</p>"
        },
        {
          id: "tbar_db_incline",
          name: "Remo mancuerna con banco inclinado",
          targetReps: "8-10",
          sets: 3,
          rest: 150,
          warmupHtml: "<p>Banco a 30-40°. Pecho apoyado; 100% blindaje lumbar y rotación libre de codo.</p>"
        },
        {
          id: "tbar_converging",
          name: "Remo en máquina convergente",
          targetReps: "8-10",
          sets: 3,
          rest: 150,
          warmupHtml: "<p>Pecho apoyado en soporte; trayectoria guiada sin fatiga axial.</p>"
        },
        {
          id: "tbar_free_barbell",
          name: "Remo en T con barra libre",
          targetReps: "6-8",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Straps obligatorios. Tronco a 45° neutro; prohibido balancear con espalda baja.</p>"
        }
      ]
    },
    {
      slotId: "pull_slot_reardelt",
      slotName: "Deltoides Posterior",
      defaultVariant: "rear_delt_cable",
      variants: [
        {
          id: "rear_delt_cable",
          name: "Rear Delt polea unilateral",
          targetReps: "12-15",
          sets: 3,
          rest: 75,
          warmupHtml: "<p>Agarre directo de la bola con nudillos afuera. Iniciar siempre con brazo izquierdo.</p>"
        },
        {
          id: "rear_delt_pecdeck",
          name: "Rear Delt fly en Pec Deck invertido",
          targetReps: "12-15",
          sets: 3,
          rest: 75,
          warmupHtml: "<p>Pecho apoyado; mantener codos ligeramente flexionados sin juntar escápulas en exceso.</p>"
        }
      ]
    },
    {
      slotId: "pull_slot_smith_row",
      slotName: "Remo Horizontal",
      defaultVariant: "row_multipower",
      variants: [
        {
          id: "row_multipower",
          name: "Remo en multipower",
          targetReps: "8-10",
          sets: 3,
          rest: 150,
          warmupHtml: "<p>Straps puestos; torso a 45° bloqueado. Tirón hacia la cadera baja sin impulsos.</p>"
        },
        {
          id: "row_cable_seated",
          name: "Remo sentado en polea baja (agarre neutro)",
          targetReps: "8-10",
          sets: 3,
          rest: 120,
          warmupHtml: "<p>Rodillas semiflexionadas; tracción al ombligo sin balancear la espalda baja.</p>"
        }
      ]
    },
    {
      slotId: "pull_slot_preacher",
      slotName: "Bíceps Predicador",
      defaultVariant: "curl_preacher_ez",
      variants: [
        {
          id: "curl_preacher_ez",
          name: "Curl predicador barra Z",
          targetReps: "8-10",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Axilas encajadas; microflexión de seguridad abajo sin hiperextender el codo.</p>"
        },
        {
          id: "curl_preacher_machine",
          name: "Curl en banco Scott en máquina",
          targetReps: "8-10",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Apoyo total de brazos en la almohadilla; frenar 2° antes de la extensión completa abajo.</p>"
        }
      ]
    },
    {
      slotId: "pull_slot_bayesian",
      slotName: "Bíceps Bayesian",
      defaultVariant: "curl_bayesian",
      variants: [
        {
          id: "curl_bayesian",
          name: "Curl Bayesian en polea",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>De espaldas a la polea con un paso adelante; codos fijos atrás para estiramiento continuo.</p>"
        },
        {
          id: "curl_incline_db",
          name: "Curl inclinado con mancuernas (45-60°)",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Hombros fijos atrás en el respaldo; estiramiento completo de la cabeza larga.</p>"
        }
      ]
    }
  ],

  legs: [
    // 1. Sentadilla / Prensa
    {
      slotId: "legs_slot_squat",
      slotName: "Sentadilla / Cuádriceps",
      defaultVariant: "squat_smith",
      variants: [
        {
          id: "squat_libre",
          name: "Sentadilla libre",
          targetReps: "6-8",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Barra sobre trapecios; respiración diafragmática, bracing abdominal estricto y control excéntrico.</p>"
        },
        {
          id: "squat_smith",
          name: "Sentadilla en guiada",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Pies 15-20 cm adelantados, agarre thumbless; cero compresión cervical ni flexión lumbar.</p>"
        },
        {
          id: "squat_belt",
          name: "Belt squat",
          targetReps: "8-10",
          sets: 3,
          rest: 150,
          warmupHtml: "<p>Carga directa a la cadera; cero compresión espinal y máximo reclutamiento de cuádriceps.</p>"
        },
        {
          id: "leg_press_45",
          name: "Prensa",
          targetReps: "10-12",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Sacro y espalda baja bien pegados al respaldo durante todo el recorrido.</p>"
        },
        {
          id: "hack_squat",
          name: "Sentadilla Hack",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Bajada controlada; empuje uniforme con toda la planta del pie.</p>"
        },
        {
          id: "pendulum_squat",
          name: "Sentadilla pendular",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Espalda apoyada; flexión profunda de rodilla con tensión constante en cuádriceps sin cizalla lumbar.</p>"
        }
      ]
    },

    // 2. Peso muerto rumano (Bisagra de cadera)
    {
      slotId: "legs_slot_rdl",
      slotName: "Peso muerto rumano",
      defaultVariant: "rdl_smith",
      variants: [
        {
          id: "rdl_libre",
          name: "Peso muerto rumano libre",
          targetReps: "6-8",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Straps obligatorios; rozar los muslos con la barra, descenso controlado hasta elongación isquiosural sin arquear lumbares.</p>"
        },
        {
          id: "rdl_hexagonal",
          name: "Peso muerto rumano barra hexagonal",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Agarre neutro; centro de masas más equilibrado, reduciendo tensión en la zona baja de la espalda.</p>"
        },
        {
          id: "rdl_smith",
          name: "Peso muerto rumano en guiada",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Straps obligatorios; empujar cadera hacia atrás manteniendo columna neutra.</p>"
        },
        {
          id: "rdl_mancuernas",
          name: "Peso muerto rumano con mancuernas",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Mancuernas pegadas a las piernas; descenso frenado sintiendo la elongación isquiosural.</p>"
        },
        {
          id: "rdl_banco_hiperextension",
          name: "Banco de hiperextensión 45°",
          targetReps: "10-12",
          sets: 3,
          rest: 120,
          warmupHtml: "<p>Pies fijados; bisagra estricta de cadera con columna neutra. Parada de 1 s arriba contrayendo glúteos e isquios.</p>"
        }
      ]
    },

    // 3. Gemelos sentado (Sóleo)
    {
      slotId: "legs_slot_calves_seated",
      slotName: "Gemelos sentado",
      defaultVariant: "calves_seated_guiada",
      variants: [
        {
          id: "calves_seated_guiada",
          name: "Sentado en guiada",
          targetReps: "12-15",
          sets: 4,
          rest: 90,
          warmupHtml: "<p>Rodillas a 90° (aislamiento puro de sóleo). Barra almohadillada sobre rodillas.</p>"
        },
        {
          id: "calves_seated_libre",
          name: "Sentado con barra libre",
          targetReps: "12-15",
          sets: 4,
          rest: 90,
          warmupHtml: "<p>Sentado en banco; barra con almohadilla sobre muslos y punteras sobre soporte elevado.</p>"
        },
        {
          id: "calves_seated_discos",
          name: "Sentado con discos",
          targetReps: "12-15",
          sets: 4,
          rest: 75,
          warmupHtml: "<p>Discos apoyados sobre rodillas con toalla; cadencia lenta y estiramiento profundo abajo.</p>"
        }
      ]
    },

    // 4. Gemelos de pie (Gastrocnemio)
    {
      slotId: "legs_slot_calves_standing",
      slotName: "Gemelos de pie",
      defaultVariant: "calves_standing_guiada",
      variants: [
        {
          id: "calves_standing_guiada",
          name: "De pie en guiada",
          targetReps: "10-12",
          sets: 4,
          rest: 90,
          warmupHtml: "<p>Rodillas casi bloqueadas (Gastrocnemio). Pausa estricta de 2 s abajo en estiramiento máximo.</p>"
        },
        {
          id: "calves_standing_libre",
          name: "De pie con barra libre",
          targetReps: "10-12",
          sets: 4,
          rest: 90,
          warmupHtml: "<p>Sobre step o soporte rígido; control total del equilibrio y parada abajo sin rebote.</p>"
        },
        {
          id: "calves_standing_mancuerna",
          name: "De pie con mancuerna",
          targetReps: "12-15",
          sets: 4,
          rest: 60,
          warmupHtml: "<p>Unilateral sobre escalón; mano libre apoyada en soporte firme para total estabilidad.</p>"
        }
      ]
    },

    // 5. Extensión de cuádriceps
    {
      slotId: "legs_slot_leg_extension",
      slotName: "Extensión cuádriceps",
      defaultVariant: "leg_extension_machine",
      variants: [
        {
          id: "leg_extension_machine",
          name: "Extensión de cuádriceps en máquina",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>1 s de pausa isométrica en extensión completa arriba antes de descender con control en 3 s.</p>"
        }
      ]
    },

    // 6. Curl femoral
    {
      slotId: "legs_slot_hamstring_curl",
      slotName: "Curl femoral en máquina",
      defaultVariant: "leg_curl_machine",
      variants: [
        {
          id: "leg_curl_machine",
          name: "Curl femoral en máquina",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Cadera bien encajada a la almohadilla; flexión explosiva y 3 s de bajada excéntrica controlada.</p>"
        }
      ]
    },

    // 7. Máquina de aductores
    {
      slotId: "legs_slot_adductor",
      slotName: "Máquina de aductores",
      defaultVariant: "adductor_machine",
      variants: [
        {
          id: "adductor_machine",
          name: "Máquina de aductores",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Rango amplio y controlado; 1 s de apriete en cierre completo sin rebotar al abrir.</p>"
        }
      ]
    },

    // 8. Opcional: Glúteo
    {
      slotId: "legs_slot_hip_thrust_opt",
      slotName: "Opcional: Hip Thrust",
      optional: true,
      defaultVariant: "hip_thrust_maquina",
      variants: [
        {
          id: "hip_thrust_maquina",
          name: "Hip thrust en máquina",
          targetReps: "8-10",
          sets: 3,
          rest: 150,
          warmupHtml: "<p>Apoyo escapular firme; bloqueo completo de cadera arriba con retroversión pélvica.</p>"
        },
        {
          id: "hip_thrust_barra",
          name: "Hip thrust con barra",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Almohadilla en la pelvis; empuje desde los talones y pausa de 1 s en máxima extensión.</p>"
        }
      ]
    }
  ],

  repaso: [
    // 1. Pullover
    {
      slotId: "rep_slot_pullover",
      slotName: "Pullover polea barra recta",
      defaultVariant: "pullover_cruces",
      variants: [
        {
          id: "pullover_cruces",
          name: "Polea cruces",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Codos fijos en microflexión constante (cero flexo-extensión para blindar tendón de tríceps). Ratio 2:1.</p>"
        },
        {
          id: "pullover_simple",
          name: "Polea simple",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Polea simple (ratio directo 1:1); mayor resistencia efectiva con la misma fijación de codos.</p>"
        }
      ]
    },

    // 2. Press inclinado 30°
    {
      slotId: "rep_slot_incline_press",
      slotName: "Press inclinado 30°",
      defaultVariant: "press_incline_mancuernas",
      variants: [
        {
          id: "press_incline_mancuernas",
          name: "Mancuernas",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Banco a 30° estricto; agarre semi-neutro a 45° seguro para codo izquierdo.</p>"
        },
        {
          id: "press_incline_guiada",
          name: "Guiada",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Banco a 30°; bajada controlada hacia la clavícula con parada abajo.</p>"
        }
      ]
    },

    // 3. Shrugs (encogimientos)
    {
      slotId: "rep_slot_shrugs",
      slotName: "Shrugs (encogimientos)",
      defaultVariant: "shrugs_hexagonal",
      variants: [
        {
          id: "shrugs_hexagonal",
          name: "Barra hexagonal",
          targetReps: "10-12",
          sets: 3,
          rest: 150,
          warmupHtml: "<p>Straps puestos; inclinación de torso a 15-20° adelante y parada de 2 s arriba.</p>"
        },
        {
          id: "rack_pull_traps",
          name: "Rack pull",
          targetReps: "6-8",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Straps obligatorios. Salida justo bajo las rodillas; bloqueo y aguante isométrico de trapecio arriba sin arquear lumbares.</p>"
        },
        {
          id: "shrugs_barra_recta",
          name: "Barra recta",
          targetReps: "8-10",
          sets: 3,
          rest: 150,
          warmupHtml: "<p>Straps puestos; elevación vertical estricta sin redondear hombros hacia atrás.</p>"
        },
        {
          id: "shrugs_mancuernas",
          name: "Mancuernas",
          targetReps: "10-12",
          sets: 3,
          rest: 120,
          warmupHtml: "<p>De pie con leve inclinación o sentado en banco; elevación pura y bajada en 2-3 s controlados.</p>"
        }
      ]
    },

    // 4. Cruces polea alta (pecho inferior)
    {
      slotId: "rep_slot_lower_chest",
      slotName: "Cruces polea alta (pecho inferior)",
      defaultVariant: "cruces_polea_alta",
      variants: [
        {
          id: "cruces_polea_alta",
          name: "Cruces polea alta",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Trayectoria hacia el ombligo; contracción de 1 s al cruzar muñecas.</p>"
        },
        {
          id: "fondos_lastrados_pecho",
          name: "Fondos lastrados (pecho inferior)",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: "<p>Torso inclinado 30-45° hacia adelante, codos abiertos a 45° y bajada frenada hasta 90° de flexión.</p>"
        }
      ]
    }
  ],

  dia5: [
    // 1. Press hombro
    {
      slotId: "d5_slot_shoulder_press",
      slotName: "Press hombro",
      defaultVariant: "press_militar_poleas",
      variants: [
        {
          id: "press_militar_poleas",
          name: "Press militar en polea",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Mismo ID que en Push. Sin bloquear codos arriba para evitar cizalla; cuello neutro.</p>"
        },
        {
          id: "press_militar_guiada",
          name: "Press militar en guiada",
          targetReps: "8-10",
          sets: 3,
          rest: 150,
          warmupHtml: "<p>Mismo ID que en Push. Recupera tus cargas de la multipower automáticamente.</p>"
        },
        {
          id: "press_militar_mancuernas",
          name: "Press militar mancuerna",
          targetReps: "8-10",
          sets: 3,
          rest: 150,
          warmupHtml: "<p>Mismo ID que en Push. Trayectoria en plano escapular sin chocar arriba.</p>"
        }
      ]
    },

    // 2. Bíceps con cable
    {
      slotId: "d5_slot_biceps_cable",
      slotName: "Bíceps con cable",
      defaultVariant: "d5_curl_low_cable",
      variants: [
        {
          id: "d5_curl_low_cable",
          name: "Curl en polea baja barra recta polea cruces",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Flexión estricta sin balanceo lumbar ni adelantamiento cervical; codos pegados a los costados.</p>"
        },
        {
          id: "d5_curl_low_cable_simple",
          name: "Curl en polea baja barra recta polea simple",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Polea simple (ratio directo 1:1); tensión constante desde el estiramiento.</p>"
        }
      ]
    },

    // 3. Elevaciones laterales 1 mano polea altura cadera
    {
      slotId: "d5_slot_lat_cable",
      slotName: "Elevaciones laterales 1 mano polea altura cadera",
      defaultVariant: "laterales_polea_cruces",
      variants: [
        {
          id: "laterales_polea_cruces",
          name: "Elevaciones laterales 1 mano polea cruces",
          targetReps: "12-15",
          sets: 3,
          rest: 60,
          warmupHtml: "<p>Mismo ID que en Push. Polea a altura de cadera; depresión escapular estricta sin encoger cuello.</p>"
        },
        {
          id: "laterales_polea_simple",
          name: "Elevaciones laterales 1 mano polea simple",
          targetReps: "12-15",
          sets: 3,
          rest: 60,
          warmupHtml: "<p>Polea simple (mayor resistencia directa); guiar con el codo en plano escapular.</p>"
        },
        {
          id: "laterales_mancuernas_pie",
          name: "Elevaciones laterales mancuernas",
          targetReps: "12-15",
          sets: 3,
          rest: 60,
          warmupHtml: "<p>Mismo ID que en Push. Codos ligeramente flexionados sin elevar trapecio superior.</p>"
        }
      ]
    },

    // 4. Extensiones tríceps en polea agarre supino
    {
      slotId: "d5_slot_triceps_supine",
      slotName: "Extensiones tríceps en polea agarre supino",
      defaultVariant: "d5_triceps_supine",
      variants: [
        {
          id: "d5_triceps_supine",
          name: "Con muñequera en polea cruces",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Cuidado codo izquierdo: controlar flexión máxima sin rebotes; codos fijados al costado.</p>"
        },
        {
          id: "d5_triceps_supine_simple",
          name: "Con muñequera en polea simple",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Polea simple directa; extensión estricta focalizando cabeza medial.</p>"
        }
      ]
    },

    // 5. Pájaros posterior
    {
      slotId: "d5_slot_rear_db",
      slotName: "Pájaros posterior",
      defaultVariant: "d5_rear_db",
      variants: [
        {
          id: "d5_rear_db",
          name: "Pájaros con mancuernas en banco inclinado",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Pecho apoyado a 30-40°; cabeza neutra alineada y apertura en plano escapular sin encoger trapecios.</p>"
        }
      ]
    },

    // 6. Curl martillo
    {
      slotId: "d5_slot_hammer",
      slotName: "Curl martillo",
      defaultVariant: "d5_hammer_ez",
      variants: [
        {
          id: "d5_hammer_ez",
          name: "Curl martillo con barra Z",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Agarre neutro en barra Z/romana; énfasis en braquiorradial y braquial, bajada en 2-3 s.</p>"
        },
        {
          id: "d5_hammer_db_standing",
          name: "Curl martillo con mancuernas de pie",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Alterno o simultáneo sin impulso lumbar ni proyección cervical.</p>"
        },
        {
          id: "d5_hammer_db_seated",
          name: "Curl martillo con mancuernas sentado",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Espalda apoyada en banco vertical para aislamiento estricto del codo.</p>"
        }
      ]
    },

    // 7. Rear fly
    {
      slotId: "d5_slot_rear_fly",
      slotName: "Rear fly",
      defaultVariant: "rear_delt_cable",
      variants: [
        {
          id: "rear_delt_cable",
          name: "Rear delt 1 mano en polea unilateral",
          targetReps: "12-15",
          sets: 3,
          rest: 75,
          warmupHtml: "<p>Mismo ID que en Pull. Iniciar con brazo izquierdo; hombro abajo lejos de la oreja.</p>"
        },
        {
          id: "d5_rear_delt_1m_cruces",
          name: "Rear delt 1 mano en polea cruces",
          targetReps: "12-15",
          sets: 3,
          rest: 75,
          warmupHtml: "<p>Polea a la altura del hombro; traccionar en diagonal sin juntar escápulas en exceso.</p>"
        },
        {
          id: "d5_rear_delt_2m_cruces",
          name: "Rear delt 2 manos en polea cruces",
          targetReps: "12-15",
          sets: 3,
          rest: 75,
          warmupHtml: "<p>Cruce alto sin mosquetones; cuello relajado y mirada al frente.</p>"
        }
      ]
    },

    // 8. Extensiones tríceps cross-body
    {
      slotId: "d5_slot_crossbody_db",
      slotName: "Extensiones tríceps cross-body",
      defaultVariant: "d5_crossbody_simple",
      variants: [
        {
          id: "d5_crossbody_simple",
          name: "Extensiones tríceps cross-body 1 mano polea simple",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Cuidado codo izquierdo: alinear trayectoria de polea con ángulo del húmero para cero torque lateral.</p>"
        },
        {
          id: "d5_crossbody_cruces",
          name: "Extensiones tríceps cross-body 1 mano polea cruces",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: "<p>Extensión cruzada controlada; pausa de 1 s en máxima contracción.</p>"
        }
      ]
    }
  ]
};
