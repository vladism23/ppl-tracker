const routineSlots = {
  push: [
    {
      slotId: "push_slot_chest",
      slotName: "Pectoral Pesado",
      defaultVariant: "bench_smith",
      variants: [
        {
          id: "bench_smith",
          name: "Press banca en guiada",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x8-10 (40% objetivo):</b> Activación articular/vascular. Descanso: 45s.</span>
            <span class="warmup-step">2️⃣ <b>1x4-5 (65% objetivo):</b> Aproximación de carga y tempo. Descanso: 60s.</span>
            <span class="warmup-step">3️⃣ <b>1x2 (85% objetivo):</b> Activación neurológica/potenciación sin fatiga. Descanso: 120s antes de S1.</span>
            <div class="warmup-target">🎯 <b>Efectivas (3m desc):</b> 3 series x 8-10 reps (RIR 1-2). Agarre thumbless, codos a 45-60° (proteger tendón codo).</div>`
        },
        {
          id: "bench_free_barbell",
          name: "Press banca con barra libre",
          targetReps: "6-8",
          sets: 3,
          rest: 180,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x8 solo barra:</b> Patrón motor y arco torácico neutro.</span>
            <span class="warmup-step">2️⃣ <b>1x4 (60% objetivo):</b> Activación de leg drive.</span>
            <span class="warmup-step">3️⃣ <b>1x2 (80% objetivo):</b> Activación neurológica.</span>
            <div class="warmup-target">🎯 <b>Efectivas (3m desc):</b> 3 series x 6-8 reps (RIR 1-2). Trayectoria diagonal a esternón bajo. Codos sin abrir en cruz.</div>`
        },
        {
          id: "bench_flat_db",
          name: "Press plano con mancuernas",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x8 ligera:</b> Enfoque en rango de descenso y apertura.</span>
            <span class="warmup-step">2️⃣ <b>1x3 (70% objetivo):</b> Calibración de agarre semi-neutro.</span>
            <div class="warmup-target">🎯 <b>Efectivas (3m desc):</b> 3 series x 8-10 reps (RIR 1). Agarre a 45° para proteger inserción del tríceps/codo izquierdo.</div>`
        }
      ]
    },
    {
      slotId: "push_slot_military",
      slotName: "Press Hombro",
      defaultVariant: "military_smith",
      variants: [
        {
          id: "military_smith",
          name: "Press militar en guiada",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x5 (50% objetivo):</b> Tanteo del patrón motor y banco (75-80°). Descanso: 60s.</span>
            <span class="warmup-step">2️⃣ <b>1x2 (80% objetivo):</b> Activación neurológica del deltoides anterior. Descanso: 90s antes de S1.</span>
            <div class="warmup-target">🎯 <b>Efectivas (3m desc):</b> 3 series x 8-10 reps (RIR 1-2). Cero hiperextensión lumbar; mantener glúteos y abdomen firmes.</div>`
        },
        {
          id: "military_db_seated",
          name: "Press de hombros con mancuernas sentado",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x6 moderada:</b> Ajuste del respaldo y arranque controlado.</span>
            <div class="warmup-target">🎯 <b>Efectivas (3m desc):</b> 3 series x 8-10 reps (RIR 1). Agarre ligeramente diagonal; descenso hasta nivel de orejas.</div>`
        }
      ]
    },
    {
      slotId: "push_slot_katana",
      slotName: "Tríceps Cabeza Larga",
      defaultVariant: "katana_cable",
      variants: [
        {
          id: "katana_cable",
          name: "Extensiones Katana en polea",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x10 muy ligera:</b> Lubricación de la bursa y tendón tríceps izquierdo. Descanso: 45s antes de S1.</span>
            <div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 10-12 reps (RIR 1). Estiramiento profundo de la cabeza larga; sin rebotes en flexión máxima.</div>`
        }
      ]
    },
    {
      slotId: "push_slot_cable_fly",
      slotName: "Aislamiento Pectoral",
      defaultVariant: "cable_fly",
      variants: [
        {
          id: "cable_fly",
          name: "Cruces en polea",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x6 moderada:</b> Ajuste del punto de anclaje y sensación esternal. Descanso: 45s antes de S1.</span>
            <div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 12-15 reps (RIR 0-1). Microflexión de codo constante; énfasis en contracción pico (1s).</div>`
        },
        {
          id: "pec_deck_fly",
          name: "Contractor de pecho / Pec Deck",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: `<div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 12-15 reps. Altura del asiento al esternón medio; contracción de 1s.</div>`
        }
      ]
    },
    {
      slotId: "push_slot_lateral_raise",
      slotName: "Deltoides Lateral",
      defaultVariant: "lat_raise_incline",
      variants: [
        {
          id: "lat_raise_incline",
          name: "Elevaciones laterales en banco inclinado",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x8 ligera:</b> Enfoque del deltoides lateral sin balanceo. Descanso: 45s antes de S1.</span>
            <div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 12-15 reps (RIR 0-1). Apoyo torácico completo para eliminar inercia lumbar.</div>`
        },
        {
          id: "lat_raise_cable_single",
          name: "Elevaciones laterales en polea unilateral",
          targetReps: "12-15",
          sets: 3,
          rest: 60,
          warmupHtml: `<div class="warmup-target">🎯 <b>Efectivas (60s desc):</b> 3 series x 12-15 reps. Polea a la altura del muslo; tensión continua.</div>`
        }
      ]
    },
    {
      slotId: "push_slot_pushdown",
      slotName: "Tríceps Cabezas Lateral/Medial",
      defaultVariant: "triceps_pushdown",
      variants: [
        {
          id: "triceps_pushdown",
          name: "Extensiones tríceps en polea",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x8 moderada:</b> Activación de cabezas lateral/medial. Descanso: 45s antes de S1.</span>
            <div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 10-12 reps (RIR 0-1). Codos estables y muñecas neutras (cero torsión).</div>`
        }
      ]
    }
  ],

  pull: [
    {
      slotId: "pull_slot_vertical",
      slotName: "Tracción Vertical Pesada",
      defaultVariant: "pullup_weighted",
      variants: [
        {
          id: "pullup_weighted",
          name: "Dominadas lastradas",
          targetReps: "8",
          sets: 3,
          rest: 180,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>Colgado pasivo 15 s + movilidad escapular.</b></span>
            <span class="warmup-step">2️⃣ <b>4 reps con peso corporal.</b></span>
            <span class="warmup-step">3️⃣ <b>1 rep con +5 kg.</b></span>
            <div class="warmup-target">🎯 <b>Efectivas (2.5-3m desc):</b> 3 series x 8 reps con PC + 5 kg. Barbilla superando la barra; bajada frenada en 2-3 s. Cero balanceo. Consolidar 3x8 antes de subir a +6.25 kg.</div>`
        },
        {
          id: "lat_pulldown_cable",
          name: "Jalón al pecho en polea (agarre neutro o prono)",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x6 moderada:</b> Fijación de rodillos.</span>
            <span class="warmup-step">2️⃣ <b>1x2 (75% objetivo):</b> Retracción escapular inicial.</span>
            <div class="warmup-target">🎯 <b>Efectivas (2.5-3m desc):</b> 3 series x 8-10 reps (RIR 1-2). Tronco ligeramente retrasado (~15°); tracción al esternón superior sin arquear lumbares.</div>`
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
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x5 reps con 25 kg.</b></span>
            <span class="warmup-step">2️⃣ <b>1x2 reps fluidas con 35 kg.</b></span>
            <div class="warmup-target">🎯 <b>Efectivas (2.5-3m desc):</b> 45 kg (Back-off: 35 kg). Soporte en mitad del esternón sin hundir el pecho; parada de 1 s atrás. Si S1 toca 10 reps a RIR 1-2, subir a 47.5 kg.</div>`
        },
        {
          id: "tbar_db_incline",
          name: "Remo mancuerna con banco inclinado",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x6 ligera:</b> Banco a 30-40°.</span>
            <span class="warmup-step">2️⃣ <b>1x2 con carga media:</b> Agarre semi-neutro.</span>
            <div class="warmup-target">🎯 <b>Efectivas (3m desc):</b> 3 series x 8-10 reps (RIR 1). Pecho pegado al respaldo, codos guiados hacia la cadera. 100% blindaje lumbar y rotación libre para el codo.</div>`
        },
        {
          id: "tbar_converging",
          name: "Remo en máquina convergente",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x6 ligera:</b> Regulación de asiento al esternón.</span>
            <div class="warmup-target">🎯 <b>Efectivas (3m desc):</b> 3 series x 8-10 reps. Pecho apoyado en soporte; trayectoria guiada sin fatiga axial.</div>`
        },
        {
          id: "tbar_free_barbell",
          name: "Remo en T con barra libre",
          targetReps: "6-8",
          sets: 3,
          rest: 180,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x5 ligera con straps:</b> Ajuste de bisagra de cadera.</span>
            <span class="warmup-step">2️⃣ <b>1x2 (75% objetivo):</b> Activación de core.</span>
            <div class="warmup-target">🎯 <b>Efectivas (3m desc):</b> 3 series x 6-8 reps (RIR 1-2). <b>Alerta:</b> Carga lumbar activa. Straps obligatorios, tronco neutro a 45°; prohibido balancear con espalda baja.</div>`
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
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x6 reps de toma de contacto con 5 kg.</b></span>
            <div class="warmup-target">🎯 <b>Efectivas (60-90s desc):</b> Carga base 7.5 kg. Agarre directo de la bola. Iniciar siempre con brazo izquierdo. Nudillos hacia fuera. Añadir parciales al fallar en S3.</div>`
        },
        {
          id: "rear_delt_pecdeck",
          name: "Rear Delt fly en Pec Deck invertido",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: `<div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 12-15 reps. Pecho apoyado; no retraer escápulas en exceso para aislar el deltoides posterior.</div>`
        }
      ]
    },
    {
      slotId: "pull_slot_smith_row",
      slotName: "Remo Guiado / Horizontal",
      defaultVariant: "row_multipower",
      variants: [
        {
          id: "row_multipower",
          name: "Remo en multipower",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x4 reps de calibración de bisagra con 15 kg/lado.</b></span>
            <div class="warmup-target">🎯 <b>Efectivas (2.5-3m desc):</b> Carga base 25-27.5 kg/lado. Straps puestos; torso a 45° completamente bloqueado. Codos a la cadera; cero tirones de pierna o lumbar.</div>`
        },
        {
          id: "row_cable_seated",
          name: "Remo sentado en polea baja (agarre neutro)",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: `<div class="warmup-target">🎯 <b>Efectivas (2.5-3m desc):</b> 3 series x 8-10 reps. Rodillas semiflexionadas; maneral al ombligo sin balancear el tronco atrás.</div>`
        }
      ]
    },
    {
      slotId: "pull_slot_preacher",
      slotName: "Bíceps en Flexión de Hombro",
      defaultVariant: "curl_preacher_ez",
      variants: [
        {
          id: "curl_preacher_ez",
          name: "Curl predicador barra Z",
          targetReps: "8-10",
          sets: 3,
          rest: 120,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x5 reps con barra sola o 5 kg/lado.</b></span>
            <div class="warmup-target">🎯 <b>Efectivas (90-120s desc):</b> Carga base 8.75 kg/lado. Axilas encajadas; microflexión de seguridad abajo sin hiperextender el codo. Subir a 10 kg/lado cuando S1 alcance 12 reps.</div>`
        },
        {
          id: "curl_preacher_machine",
          name: "Curl en banco Scott en máquina",
          targetReps: "8-10",
          sets: 3,
          rest: 90,
          warmupHtml: `<div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 8-10 reps. Apoyo total de brazos; frenar 2° antes de la extensión completa abajo.</div>`
        }
      ]
    },
    {
      slotId: "pull_slot_bayesian",
      slotName: "Bíceps en Extensión de Hombro",
      defaultVariant: "curl_bayesian",
      variants: [
        {
          id: "curl_bayesian",
          name: "Curl Bayesian en polea",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>Directo a efectiva:</b> Bíceps caliente tras predicador.</span>
            <div class="warmup-target">🎯 <b>Efectivas (60-90s desc):</b> Carga base 7.5 kg/lado. Paso adelante dando la espalda a la torre; codos fijos atrás. Remate en S3 con isometría de 8-10 s abajo en máximo estiramiento.</div>`
        },
        {
          id: "curl_incline_db",
          name: "Curl inclinado con mancuernas (45-60°)",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: `<div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 10-12 reps. Hombros fijos atrás; elongación completa de la cabeza larga.</div>`
        }
      ]
    }
  ],

  legs: [
    {
      slotId: "legs_slot_squat",
      slotName: "Dominante de Rodilla Pesado",
      defaultVariant: "squat_smith",
      variants: [
        {
          id: "squat_smith",
          name: "Sentadilla en guiada",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x8 solo barra:</b> Movilidad de tobillo y posicionamiento adelantado (15-20 cm). Descanso: 60s.</span>
            <span class="warmup-step">2️⃣ <b>1x4 (50% objetivo):</b> Aproximación de profundidad y apoyo plantar. Descanso: 90s.</span>
            <span class="warmup-step">3️⃣ <b>1x2 (80% objetivo):</b> Activación neuronal y brace abdominal. Descanso: 120s antes de S1.</span>
            <div class="warmup-target">🎯 <b>Efectivas (3m desc):</b> 3 series x 8-10 reps (RIR 1-2). Agarre thumbless, cero compresión cervical/lumbar.</div>`
        },
        {
          id: "leg_press_45",
          name: "Prensa 45° pies medios/adelantados",
          targetReps: "10-12",
          sets: 3,
          rest: 180,
          warmupHtml: `<div class="warmup-target">🎯 <b>Efectivas (3m desc):</b> 3 series x 10-12 reps. Sacro y espalda pegados al respaldo; cero flexión lumbar abajo.</div>`
        },
        {
          id: "hack_squat",
          name: "Sentadilla Hack",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: `<div class="warmup-target">🎯 <b>Efectivas (3m desc):</b> 3 series x 8-10 reps. Bajada controlada; empuje desde el talón/planta completa.</div>`
        }
      ]
    },
    {
      slotId: "legs_slot_rdl",
      slotName: "Bisagra de Cadera (Isquios/Glúteo)",
      defaultVariant: "rdl_smith",
      variants: [
        {
          id: "rdl_smith",
          name: "Peso muerto rumano en guiada",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x6 (50% objetivo) con straps:</b> Fijación del patrón de bisagra de cadera. Descanso: 90s.</span>
            <span class="warmup-step">2️⃣ <b>1x2 (80% objetivo):</b> Tanteo del rango de elongación de isquios. Descanso: 120s antes de S1.</span>
            <div class="warmup-target">🎯 <b>Efectivas (3m desc):</b> 3 series x 8-10 reps (RIR 1-2). No descender más allá de la pérdida de neutralidad lumbar.</div>`
        },
        {
          id: "rdl_db_heavy",
          name: "Peso muerto rumano con mancuernas",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: `<div class="warmup-target">🎯 <b>Efectivas (3m desc):</b> 3 series x 8-10 reps. Mancuernas rozando espinillas; empujar cadera hacia la pared de atrás.</div>`
        }
      ]
    },
    {
      slotId: "legs_slot_calves",
      slotName: "Pantorrilla",
      defaultVariant: "calves_smith",
      variants: [
        {
          id: "calves_smith",
          name: "Gemelos guiada (S1-S2 Estir / S3-S4 Full)",
          targetReps: "10-12",
          sets: 4,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x10 ligera:</b> Despertar tendón de Aquiles y flexión dorsal. Descanso: 45s antes de S1.</span>
            <div class="warmup-target">🎯 <b>S1 y S2 (90s desc):</b> Pausa estricta de 2 segundos en máximo estiramiento (Sóleo).<br>🎯 <b>S3 y S4 (90s desc):</b> Rango completo cadenciado a altas repeticiones.</div>`
        }
      ]
    },
    {
      slotId: "legs_slot_hamstring_curl",
      slotName: "Aislamiento Isquiosural",
      defaultVariant: "leg_curl_machine",
      variants: [
        {
          id: "leg_curl_machine",
          name: "Curl femoral en máquina",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x8 moderada:</b> Ajuste del rodillo y anclaje pélvico. Descanso: 45s antes de S1.</span>
            <div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 10-12 reps (RIR 1). Flexión de rodilla explosiva y excéntrica controlada (3s).</div>`
        }
      ]
    },
    {
      slotId: "legs_slot_leg_extension",
      slotName: "Aislamiento Cuádriceps",
      defaultVariant: "leg_extension_machine",
      variants: [
        {
          id: "leg_extension_machine",
          name: "Extensión de cuádriceps",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x8 ligera:</b> Lubricación de la rótula. Descanso: 45s antes de S1.</span>
            <div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 12-15 reps (RIR 0-1). 1s de contracción isométrica en extensión total.</div>`
        }
      ]
    },
    {
      slotId: "legs_slot_adductor",
      slotName: "Aductores",
      defaultVariant: "adductor_machine",
      variants: [
        {
          id: "adductor_machine",
          name: "Máquina de aductores",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x8 ligera:</b> Movilidad de la articulación coxofemoral. Descanso: 45s antes de S1.</span>
            <div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 12-15 reps (RIR 1). Rango amplio y sin rebotes en máxima apertura.</div>`
        }
      ]
    }
  ],

  repaso: [
    {
      slotId: "rep_slot_pullover",
      slotName: "Dorsal en Elongación",
      defaultVariant: "pullover_cable",
      variants: [
        {
          id: "pullover_cable",
          name: "Pullover polea barra recta",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x8 ligera:</b> Agarre prono a la anchura de hombros y anclaje dorsal. Descanso: 45s.</span>
            <div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 12-15 reps (RIR 1-2). Codos fijos en microflexión constante (cero flexo-extensión para blindar tendón de tríceps).</div>`
        }
      ]
    },
    {
      slotId: "rep_slot_incline_press",
      slotName: "Pectoral Clavicular",
      defaultVariant: "press_incline_db",
      variants: [
        {
          id: "press_incline_db",
          name: "Press inclinado 30° mancuernas",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x8 (40% objetivo):</b> Activación haz clavicular y estabilidad. Descanso: 60s.</span>
            <span class="warmup-step">2️⃣ <b>1x3 (70% objetivo):</b> Aproximación de agarre a 45°. Descanso: 90s antes de S1.</span>
            <div class="warmup-target">🎯 <b>Efectivas (3m desc):</b> 3 series x 8-10 reps (RIR 1-2). Banco a 30° estricto; agarre semi-neutro seguro para el codo.</div>`
        },
        {
          id: "press_incline_smith",
          name: "Press inclinado en multipower",
          targetReps: "8-10",
          sets: 3,
          rest: 180,
          warmupHtml: `<div class="warmup-target">🎯 <b>Efectivas (3m desc):</b> 3 series x 8-10 reps. Banco a 30°; bajada a la clavícula con tempo controlado.</div>`
        }
      ]
    },
    {
      slotId: "rep_slot_shrugs",
      slotName: "Trapecio Superior",
      defaultVariant: "trapbar_shrugs",
      variants: [
        {
          id: "trapbar_shrugs",
          name: "Trap Bar Shrugs (Barra hexagonal)",
          targetReps: "10-12",
          sets: 3,
          rest: 180,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x6 barra sola con straps:</b> Ajuste de inclinación de torso (20° adelante). Descanso: 60s.</span>
            <span class="warmup-step">2️⃣ <b>1x2 (75% objetivo):</b> Activación de trapecio superior/medio. Descanso: 90s antes de S1.</span>
            <div class="warmup-target">🎯 <b>Efectivas (3m desc):</b> 3 series x 10-12 reps (RIR 1). Pausa de 2s en contracción alta; columna lumbar 100% protegida.</div>`
        },
        {
          id: "db_shrugs_seated",
          name: "Encogimientos con mancuernas sentado",
          targetReps: "10-12",
          sets: 3,
          rest: 120,
          warmupHtml: `<div class="warmup-target">🎯 <b>Efectivas (2m desc):</b> 3 series x 10-12 reps. Sin carga axial en lumbares; parada de 2s arriba.</div>`
        }
      ]
    },
    {
      slotId: "rep_slot_lower_chest",
      slotName: "Pectoral Inferior",
      defaultVariant: "cable_crossover_high",
      variants: [
        {
          id: "cable_crossover_high",
          name: "Cruces polea alta (Pecho inferior)",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x6 moderada:</b> Ajuste de trayectoria hacia el ombligo. Descanso: 45s antes de S1.</span>
            <div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 12-15 reps (RIR 0-1). Contracción isométrica de 1 segundo al cruzar muñecas.</div>`
        }
      ]
    }
  ],

  dia5: [
    {
      slotId: "d5_slot_shoulder_press",
      slotName: "Hombro Anterior/Medio",
      defaultVariant: "d5_press_cable_seated",
      variants: [
        {
          id: "d5_press_cable_seated",
          name: "Press de hombro en poleas sentado",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x8 muy ligera:</b> Regulación de altura de banco y poleas convergentes. Descanso: 45s.</span>
            <div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 12-15 reps (RIR 2). Tensión constante; no bloquear codos arriba para evitar cizalla.</div>`
        }
      ]
    },
    {
      slotId: "d5_slot_biceps_cable",
      slotName: "Bíceps Polea Baja",
      defaultVariant: "d5_curl_low_cable",
      variants: [
        {
          id: "d5_curl_low_cable",
          name: "Curl en polea baja barra recta",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x6 moderada:</b> Ajuste de postura y codos al costado. Descanso: 45s.</span>
            <div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 10-12 reps (RIR 1). Flexión estricta sin balanceo lumbar.</div>`
        }
      ]
    },
    {
      slotId: "d5_slot_lat_cable",
      slotName: "Deltoides Lateral",
      defaultVariant: "d5_lat_raise_cable",
      variants: [
        {
          id: "d5_lat_raise_cable",
          name: "Elevaciones laterales en polea unilateral",
          targetReps: "12-15",
          sets: 3,
          rest: 60,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x8 ligera:</b> Polea a la altura del muslo. Descanso: 30s.</span>
            <div class="warmup-target">🎯 <b>Efectivas (60s desc entre brazos):</b> 3 series x 12-15 reps (RIR 1). Guiar la muñeca proyectando hacia la pared.</div>`
        }
      ]
    },
    {
      slotId: "d5_slot_triceps_supine",
      slotName: "Tríceps Cabeza Medial",
      defaultVariant: "d5_triceps_supine",
      variants: [
        {
          id: "d5_triceps_supine",
          name: "Extensiones tríceps en polea agarre supino",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x8 ligera:</b> Fijación de codos al costado y muñecas rectas. Descanso: 45s.</span>
            <div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 12-15 reps (RIR 1-2). Extensión controlada sin tirones bruscos.</div>`
        }
      ]
    },
    {
      slotId: "d5_slot_rear_db",
      slotName: "Pájaros / Posterior",
      defaultVariant: "d5_rear_db",
      variants: [
        {
          id: "d5_rear_db",
          name: "Pájaros con mancuernas en banco inclinado",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x8 ligera:</b> Pecho apoyado en respaldo a 30-40°. Descanso: 45s.</span>
            <div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 12-15 reps (RIR 1). Apertura en plano escapular; sin encoger hombros al trapecio.</div>`
        }
      ]
    },
    {
      slotId: "d5_slot_hammer",
      slotName: "Braquial / Martillo",
      defaultVariant: "d5_hammer_ez",
      variants: [
        {
          id: "d5_hammer_ez",
          name: "Curl martillo con barra Z",
          targetReps: "10-12",
          sets: 3,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x6 aproximación:</b> Ajuste de agarre neutro/inclinado. Descanso: 45s.</span>
            <div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 10-12 reps (RIR 1). Énfasis en braquiorradial y braquial anterior; bajada en 2-3s.</div>`
        }
      ]
    },
    {
      slotId: "d5_slot_rear_fly",
      slotName: "Deltoides Posterior Remate",
      defaultVariant: "d5_rear_fly_machine",
      variants: [
        {
          id: "d5_rear_fly_machine",
          name: "Rear Delt Fly en máquina / cruces polea",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x8 ligera:</b> Alineación de manos con la altura de hombros. Descanso: 45s.</span>
            <div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 12-15 reps (RIR 0-1). Mantener codos con microflexión fija y apretar atrás 1s.</div>`
        }
      ]
    },
    {
      slotId: "d5_slot_crossbody_db",
      slotName: "Tríceps Cabeza Lateral",
      defaultVariant: "d5_crossbody_db",
      variants: [
        {
          id: "d5_crossbody_db",
          name: "Extensiones tríceps cross-body con mancuerna",
          targetReps: "12-15",
          sets: 3,
          rest: 90,
          warmupHtml: `
            <span class="warmup-step">1️⃣ <b>1x8 muy ligera:</b> Banco plano; bajar mancuerna hacia el hombro opuesto. Descanso: 45s.</span>
            <div class="warmup-target">🎯 <b>Efectivas (90s desc):</b> 3 series x 12-15 reps (RIR 2). Trayectoria diagonal suave cuidando la inserción del codo izq; no bloquear violento.</div>`
        }
      ]
    }
  ]
};
