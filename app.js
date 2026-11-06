const SUPABASE_URL = "https://zrszsqlsrcjeltsnsbxv.supabase.co";
const SUPABASE_KEY = "sb_publishable_zxRs767PJiQ6wzwO38etyA_arjn1458";
const supabaseClient = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

const SYSTEM_INSTRUCTION = `Eres el entrenador personal del usuario, experto en hipertrofia basada en evidencia, sobrecarga progresiva y salud articular.
Pautas ortopédicas permanentes:
- Codo izquierdo: Cuidar inserción del tendón del tríceps. Katana extensions en vez de presses franceses.
- Zona lumbar: Cero compresión axial innecesaria. Pies 15-20 cm adelantados y agarre thumbless en sentadilla guiada; peso muerto rumano en guiada con straps.
- Gemelos (Sóleo): 2 series pesadas en estiramiento (parada 2 s abajo) + 2 series en rango completo.
Evalúa sobrecarga progresiva estricta respecto a la sesión previa.`;

let currentRoutine = 'push';
let timerInterval = null;
let hasAlertedOvertime = false;

function playBeep() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.6);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.6);
  } catch (e) {}
}

/* SISTEMA DE TEMPORIZADOR */
function setTimerDirect(seconds) {
  clearInterval(timerInterval);
  hasAlertedOvertime = false;
  const targetTime = Date.now() + (seconds * 1000);
  localStorage.setItem('TIMER_TARGET_MS', targetTime.toString());

  const banner = document.getElementById('timer-banner');
  banner.classList.remove('overtime');
  banner.style.display = 'flex';
  
  tickTimer();
  timerInterval = setInterval(tickTimer, 500);
}

function startTimer(seconds) {
  setTimerDirect(seconds);
}

function tickTimer() {
  const storedTarget = localStorage.getItem('TIMER_TARGET_MS');
  if (!storedTarget) {
    clearInterval(timerInterval);
    document.getElementById('timer-banner').style.display = 'none';
    document.title = "PPL Minimal Tracker";
    return;
  }

  const diffMs = parseInt(storedTarget, 10) - Date.now();
  const diffSec = Math.floor(diffMs / 1000);
  const banner = document.getElementById('timer-banner');

  if (diffSec < 0) {
    banner.classList.add('overtime');
    if (!hasAlertedOvertime) {
      playBeep();
      if (navigator.vibrate) navigator.vibrate([300, 150, 300]);
      hasAlertedOvertime = true;
    }
    renderTimerDisplay(diffSec, true);
  } else {
    banner.classList.remove('overtime');
    renderTimerDisplay(diffSec, false);
  }
}

function addTimerTime(sec) {
  const storedTarget = localStorage.getItem('TIMER_TARGET_MS');
  const base = storedTarget ? Math.max(parseInt(storedTarget, 10), Date.now()) : Date.now();
  const newTarget = base + (sec * 1000);
  localStorage.setItem('TIMER_TARGET_MS', newTarget.toString());
  
  hasAlertedOvertime = false;
  document.getElementById('timer-banner').style.display = 'flex';
  clearInterval(timerInterval);
  tickTimer();
  timerInterval = setInterval(tickTimer, 500);
}

function stopTimer() {
  clearInterval(timerInterval);
  localStorage.removeItem('TIMER_TARGET_MS');
  const banner = document.getElementById('timer-banner');
  banner.classList.remove('overtime');
  banner.style.display = 'none';
  document.title = "PPL Minimal Tracker";
}

function renderTimerDisplay(totalSeconds, isNegative) {
  const absSec = Math.abs(totalSeconds);
  const min = Math.floor(absSec / 60);
  const sec = absSec % 60;
  const prefix = isNegative ? "-" : "";
  const formatted = `${prefix}${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  
  document.getElementById('timer-display').innerText = formatted;
  document.title = `(${formatted}) PPL Tracker`;
}

function checkActiveTimerOnLoad() {
  const storedTarget = localStorage.getItem('TIMER_TARGET_MS');
  if (storedTarget) {
    document.getElementById('timer-banner').style.display = 'flex';
    tickTimer();
    clearInterval(timerInterval);
    timerInterval = setInterval(tickTimer, 500);
  }
}

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    checkActiveTimerOnLoad();
  }
});

/* BASE DE DATOS LOCAL Y MIGRACIÓN AUTOMÁTICA POR ID */
function getHistoricalExerciseData(exId, exName) {
  const db = JSON.parse(localStorage.getItem('EXERCISE_HISTORY_DB') || '{}');
  if (db[exId] && db[exId].length > 0) {
    return db[exId];
  }

  const routinesList = ['push', 'pull', 'legs', 'repaso', 'dia5'];
  for (const rType of routinesList) {
    const oldSession = JSON.parse(localStorage.getItem(`LAST_SESSION_${rType}`) || '{}');
    const foundKey = Object.keys(oldSession).find(k => k.trim().toLowerCase() === exName.trim().toLowerCase());
    if (foundKey && oldSession[foundKey] && oldSession[foundKey].length > 0) {
      db[exId] = oldSession[foundKey];
      localStorage.setItem('EXERCISE_HISTORY_DB', JSON.stringify(db));
      return db[exId];
    }
  }

  return null;
}

function saveExerciseDataToDB(exId, setsArray) {
  const db = JSON.parse(localStorage.getItem('EXERCISE_HISTORY_DB') || '{}');
  db[exId] = setsArray;
  localStorage.setItem('EXERCISE_HISTORY_DB', JSON.stringify(db));
}

/* SINCRONIZACIÓN EN LA NUBE CON SUPABASE (FUSIÓN AUTOMÁTICA) */
async function syncWorkoutToCloud(routine, dateStr, summaryText, sessionData) {
  if (!supabaseClient) return;
  try {
    const { data: existingRow, error: fetchErr } = await supabaseClient
      .from('workouts')
      .select('summary_text, exercises')
      .eq('routine_type', routine)
      .eq('date', dateStr)
      .maybeSingle();

    if (fetchErr) {
      console.error("Error al consultar datos previos en Supabase:", fetchErr);
    }

    let finalExercises = sessionData;
    let finalSummary = summaryText;

    if (existingRow && existingRow.exercises) {
      finalExercises = { ...existingRow.exercises, ...sessionData };
      if (existingRow.summary_text && existingRow.summary_text !== summaryText) {
        finalSummary = existingRow.summary_text + "\n" + summaryText.replace(/Entrenamiento realizado.*\n/, '');
      }
    }

    const { error: upsertErr } = await supabaseClient
      .from('workouts')
      .upsert(
        {
          routine_type: routine,
          date: dateStr,
          summary_text: finalSummary,
          exercises: finalExercises
        },
        { onConflict: 'routine_type,date' }
      );

    if (upsertErr) {
      console.error("Error al sincronizar con Supabase:", upsertErr);
    } else {
      console.log("Sesión sincronizada y fusionada correctamente en Supabase.");
    }
  } catch (err) {
    console.error("Fallo de red en Supabase:", err);
  }
}

/* BORRADOR TEMPORAL */
function saveDraft() {
  let draft = {};
  const slots = routineSlots[currentRoutine];
  slots.forEach((slot) => {
    const activeVarId = localStorage.getItem(`ACTIVE_VARIANT_${slot.slotId}`) || slot.defaultVariant;
    const ex = slot.variants.find(v => v.id === activeVarId) || slot.variants[0];
    draft[ex.id] = {};
    for (let s = 1; s <= ex.sets; s++) {
      const kg = document.getElementById(`kg_${slot.slotId}_${s}`)?.value || '';
      const reps = document.getElementById(`reps_${slot.slotId}_${s}`)?.value || '';
      const rir = document.getElementById(`rir_${slot.slotId}_${s}`)?.value || '';
      if (kg || reps || rir) {
        draft[ex.id][s] = { kg, reps, rir };
      }
    }
  });
  localStorage.setItem(`DRAFT_V2_${currentRoutine}`, JSON.stringify(draft));
}

function clearDraft() {
  localStorage.removeItem(`DRAFT_V2_${currentRoutine}`);
  localStorage.removeItem(`DRAFT_${currentRoutine}`);
}

function onVariantChanged(slotId, newVariantId) {
  localStorage.setItem(`ACTIVE_VARIANT_${slotId}`, newVariantId);
  loadRoutine(currentRoutine);
}

/* RENDERIZADO DE RUTINA */
function loadRoutine(type) {
  currentRoutine = type;
  const selector = document.getElementById('routine-selector');
  if (selector && selector.value !== type) {
    selector.value = type;
  }

  const container = document.getElementById('exercise-list');
  container.innerHTML = '';
  document.getElementById('response-box').style.display = 'none';

  const rawTextHistory = localStorage.getItem(`LAST_TEXT_${type}`);
  const historyContentEl = document.getElementById('history-content');
  if (rawTextHistory) {
    historyContentEl.innerText = rawTextHistory;
  } else {
    historyContentEl.innerText = "No hay registros previos guardados para este día.";
  }

  const draftV2 = JSON.parse(localStorage.getItem(`DRAFT_V2_${type}`) || '{}');
  const slots = routineSlots[type];

  slots.forEach((slot) => {
    const activeVarId = localStorage.getItem(`ACTIVE_VARIANT_${slot.slotId}`) || slot.defaultVariant;
    const ex = slot.variants.find(v => v.id === activeVarId) || slot.variants[0];
    const prevSets = getHistoricalExerciseData(ex.id, ex.name) || [];

    let setsHtml = '';
    let previousSetsSummary = [];

    for (let s = 1; s <= ex.sets; s++) {
      const label = (ex.name.includes("Gemelos") && s <= 2) ? `S${s}E` : `S${s}`;
      const prevSet = prevSets[s - 1];
      const lastKg = prevSet?.kg || 'kg';
      const lastReps = prevSet?.reps || ex.targetReps || 'reps';
      const lastRir = prevSet?.rir !== undefined && prevSet?.rir !== '' ? `RIR ${prevSet.rir}` : 'rir';

      const currentKg = draftV2[ex.id]?.[s]?.kg ?? '';
      const currentReps = draftV2[ex.id]?.[s]?.reps ?? '';
      const currentRir = draftV2[ex.id]?.[s]?.rir ?? '';

      if (prevSet?.kg && prevSet?.reps) {
        previousSetsSummary.push(`${label}: ${prevSet.kg}kg x ${prevSet.reps} (RIR ${prevSet.rir ?? '-'})`);
      }

      setsHtml += `
        <div class="set-row">
          <span class="set-label">${label}</span>
          <input type="number" step="0.25" placeholder="${lastKg}" value="${currentKg}" id="kg_${slot.slotId}_${s}" oninput="saveDraft()">
          <input type="number" placeholder="${lastReps}" value="${currentReps}" id="reps_${slot.slotId}_${s}" oninput="saveDraft()">
          <input type="number" placeholder="${lastRir}" value="${currentRir}" id="rir_${slot.slotId}_${s}" oninput="saveDraft()">
          <button class="btn-timer-trigger" onclick="startTimer(${ex.rest})" title="Iniciar descanso">⏱️</button>
        </div>`;
    }

    const restLabel = ex.rest >= 120 ? `${ex.rest / 60}m` : `${ex.rest}s`;
    
    const prevBannerHtml = previousSetsSummary.length > 0 
      ? `<div class="prev-performance-banner">⏮️ <b>Anterior:</b> ${previousSetsSummary.join(' | ')}</div>` 
      : '';

    let variantSelectHtml = '';
    if (slot.variants.length > 1) {
      const optionsHtml = slot.variants.map(v => 
        `<option value="${v.id}" ${v.id === ex.id ? 'selected' : ''}>${v.name}</option>`
      ).join('');

      variantSelectHtml = `
        <div class="variant-selector-wrap">
          <span>🔄 Máquina / Variante:</span>
          <select class="variant-select" onchange="onVariantChanged('${slot.slotId}', this.value)">
            ${optionsHtml}
          </select>
        </div>`;
    }

    container.innerHTML += `
      <details class="exercise-card">
        <summary>
          <div class="exercise-title-wrap">
            <span class="exercise-arrow">▶</span>
            <span class="exercise-title">${ex.name}</span>
            <span class="exercise-reps-badge">${ex.targetReps} reps</span>
          </div>
          <span class="rest-badge">${restLabel}</span>
        </summary>
        <div class="exercise-body">
          ${variantSelectHtml}
          ${prevBannerHtml}
          <details class="warmup-details">
            <summary>Calentamiento / Objetivos / Claves</summary>
            <div class="warmup-content">${ex.warmupHtml}</div>
          </details>
          <div class="set-header">
            <span></span>
            <span>KG</span>
            <span>REPS</span>
            <span>RIR</span>
            <span>TIMER</span>
          </div>
          ${setsHtml}
        </div>
      </details>`;
  });
}

/* BOTÓN DE EMERGENCIA: PULL */
function restaurarPull() {
  const marcasPull = {
    "Dominadas lastradas": [{kg: "5", reps: "8", rir: "2"}, {kg: "5", reps: "8", rir: "2"}, {kg: "5", reps: "8", rir: "1"}],
    "Remo en T con soporte": [{kg: "45", reps: "8", rir: "2"}, {kg: "45", reps: "8", rir: "2"}, {kg: "35", reps: "8", rir: "1"}],
    "Rear Delt polea unilateral": [{kg: "7.5", reps: "15", rir: "1"}, {kg: "7.5", reps: "14", rir: "1"}, {kg: "7.5", reps: "12", rir: "0"}],
    "Remo en multipower": [{kg: "25", reps: "10", rir: "2"}, {kg: "25", reps: "9", rir: "1"}, {kg: "25", reps: "8", rir: "1"}],
    "Curl predicador barra Z": [{kg: "8.75", reps: "10", rir: "1"}, {kg: "8.75", reps: "9", rir: "1"}, {kg: "8.75", reps: "8", rir: "1"}],
    "Curl Bayesian en polea": [{kg: "7.5", reps: "12", rir: "1"}, {kg: "7.5", reps: "11", rir: "1"}, {kg: "7.5", reps: "10", rir: "0"}]
  };

  const textoPull = `Entrenamiento realizado (PULL) - Sesión Previa:

* Dominadas lastradas [Diana: 8 reps]:
  - Serie 1: 5 kg x 8 reps (RIR 2)
  - Serie 2: 5 kg x 8 reps (RIR 2)
  - Serie 3: 5 kg x 8 reps (RIR 1)

* Remo en T con soporte [Diana: 8 (+ back-off) reps]:
  - Serie 1: 45 kg x 8 reps (RIR 2)
  - Serie 2: 45 kg x 8 reps (RIR 2)
  - Serie 3: 35 kg x 8 reps (RIR 1)

* Rear Delt polea unilateral [Diana: 12-15 reps]:
  - Serie 1: 7.5 kg x 15 reps (RIR 1)
  - Serie 2: 7.5 kg x 14 reps (RIR 1)
  - Serie 3: 7.5 kg x 12 reps (RIR 0)

* Remo en multipower [Diana: 8-10 reps]:
  - Serie 1: 25 kg x 10 reps (RIR 2)
  - Serie 2: 25 kg x 9 reps (RIR 1)
  - Serie 3: 25 kg x 8 reps (RIR 1)

* Curl predicador barra Z [Diana: 8-10 reps]:
  - Serie 1: 8.75 kg x 10 reps (RIR 1)
  - Serie 2: 8.75 kg x 9 reps (RIR 1)
  - Serie 3: 8.75 kg x 8 reps (RIR 1)

* Curl Bayesian en polea [Diana: 10-12 reps]:
  - Serie 1: 7.5 kg x 12 reps (RIR 1)
  - Serie 2: 7.5 kg x 11 reps (RIR 1)
  - Serie 3: 7.5 kg x 10 reps (RIR 0)`;

  localStorage.setItem('LAST_SESSION_pull', JSON.stringify(marcasPull));
  localStorage.setItem('LAST_TEXT_pull', textoPull);

  saveExerciseDataToDB("pullup_weighted", marcasPull["Dominadas lastradas"]);
  saveExerciseDataToDB("tbar_support", marcasPull["Remo en T con soporte"]);
  saveExerciseDataToDB("rear_delt_cable", marcasPull["Rear Delt polea unilateral"]);
  saveExerciseDataToDB("row_multipower", marcasPull["Remo en multipower"]);
  saveExerciseDataToDB("curl_preacher_ez", marcasPull["Curl predicador barra Z"]);
  saveExerciseDataToDB("curl_bayesian", marcasPull["Curl Bayesian en polea"]);

  loadRoutine('pull');
  alert("¡Marcas e historial de Pull restaurados con éxito!");
}

/* RECARGA FORZADA */
function forzarActualizacion() {
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => caches.delete(name));
    });
  }
  window.location.href = window.location.pathname + '?v=' + Date.now();
}

function getWorkoutSummary() {
  const now = new Date();
  const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
  let summary = `Entrenamiento realizado (${currentRoutine.toUpperCase()}) - ${dateStr}:\n`;
  let sessionData = {};
  let hasData = false;

  const slots = routineSlots[currentRoutine];

  slots.forEach((slot) => {
    const activeVarId = localStorage.getItem(`ACTIVE_VARIANT_${slot.slotId}`) || slot.defaultVariant;
    const ex = slot.variants.find(v => v.id === activeVarId) || slot.variants[0];

    let setsData = [];
    let exerciseSets = [];

    for (let s = 1; s <= ex.sets; s++) {
      const kg = document.getElementById(`kg_${slot.slotId}_${s}`)?.value;
      const reps = document.getElementById(`reps_${slot.slotId}_${s}`)?.value;
      const rir = document.getElementById(`rir_${slot.slotId}_${s}`)?.value;

      if (kg && reps) {
        hasData = true;
        setsData.push(`Serie ${s}: ${kg} kg x ${reps} reps (RIR ${rir !== "" ? rir : "N/A"})`);
        exerciseSets.push({ kg, reps, rir });
      }
    }
    if (setsData.length > 0) {
      summary += `\n* ${ex.name} [Diana: ${ex.targetReps} reps]:\n  - ${setsData.join('\n  - ')}\n`;
      sessionData[ex.name] = exerciseSets;
      saveExerciseDataToDB(ex.id, exerciseSets);
    }
  });

  return { summary, sessionData, hasData, dateStr };
}

function copyWorkoutToClipboard() {
  const { summary, sessionData, hasData, dateStr } = getWorkoutSummary();
  if (!hasData) {
    alert("Introduce al menos una serie antes de copiar.");
    return;
  }
  
  localStorage.setItem(`LAST_SESSION_${currentRoutine}`, JSON.stringify(sessionData));
  localStorage.setItem(`LAST_TEXT_${currentRoutine}`, summary);
  clearDraft();
  
  // Guardado en la nube con fusión automática
  syncWorkoutToCloud(currentRoutine, dateStr, summary, sessionData);

  navigator.clipboard.writeText(summary).then(() => {
    alert("¡Copiado, guardado en historial y sincronizado en Supabase!");
    document.getElementById('history-content').innerText = summary;
  }).catch(err => {
    alert("Error al copiar: " + err);
  });
}

function configureApiKey() {
  const current = localStorage.getItem('GEMINI_API_KEY') || '';
  const key = prompt("Pega tu Google AI Studio API Key:", current);
  if (key !== null) localStorage.setItem('GEMINI_API_KEY', key.trim());
}

async function submitWorkout() {
  const apiKey = localStorage.getItem('GEMINI_API_KEY');
  if (!apiKey) {
    alert("Configura tu API Key usando el botón 'API Key'.");
    configureApiKey();
    return;
  }

  const { summary, sessionData, hasData, dateStr } = getWorkoutSummary();
  if (!hasData) {
    alert("Introduce al menos una serie con peso y repeticiones.");
    return;
  }

  const previousSession = localStorage.getItem(`LAST_TEXT_${currentRoutine}`) || "Primera sesión registrada con esta app.";
  const btn = document.getElementById('btn-submit');
  const resBox = document.getElementById('response-box');
  btn.innerText = "Analizando...";
  document.body.classList.add('loading');

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const userPrompt = `SESIÓN ANTERIOR DE REFERENCIA:
${previousSession}

SESIÓN DE HOY:
${summary}

Por favor:
1. Compara rendimiento respecto a la sesión anterior (sobrecarga progresiva lograda o mantenida).
2. Evalúa series con fallo técnico, descansos o fatiga articular (codo izquierdo y lumbar).
3. Establece las cargas diana y repeticiones para la siguiente sesión de forma concisa usando una tabla Markdown clara con columnas: Ejercicio, Series, Carga Diana, Reps Objetivo, Descanso, Clave de Ejecución y RIR.`;

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_INSTRUCTION }] },
        contents: [{ parts: [{ text: userPrompt }] }]
      })
    });

    clearTimeout(timeoutId);
    const data = await response.json();

    if (data.error) {
      resBox.style.background = "#450a0a";
      resBox.style.border = "1px solid #dc2626";
      resBox.innerText = `Error de API (${data.error.code}): ${data.error.message}`;
    } else {
      localStorage.setItem(`LAST_SESSION_${currentRoutine}`, JSON.stringify(sessionData));
      localStorage.setItem(`LAST_TEXT_${currentRoutine}`, summary);
      clearDraft();
      document.getElementById('history-content').innerText = summary;

      // Guardado en la nube con fusión automática
      syncWorkoutToCloud(currentRoutine, dateStr, summary, sessionData);

      resBox.style.background = "#022c22";
      resBox.style.border = "1px solid #059669";
      resBox.innerText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No se recibió respuesta.";
    }
    resBox.style.display = 'block';
    resBox.scrollIntoView({ behavior: 'smooth' });
  } catch (err) {
    clearTimeout(timeoutId);
    resBox.style.background = "#450a0a";
    resBox.style.border = "1px solid #dc2626";
    if (err.name === 'AbortError') {
      resBox.innerText = "Tiempo de espera agotado (15s). La API de Google está saturada en este momento. Dale a 'Copiar' y pega el entreno en este chat.";
    } else {
      resBox.innerText = "Error de conexión: " + err.message;
    }
    resBox.style.display = 'block';
  } finally {
    btn.innerText = "Enviar Gemini";
    document.body.classList.remove('loading');
  }
}

/* INICIALIZACIÓN */
loadRoutine('push');
checkActiveTimerOnLoad();
