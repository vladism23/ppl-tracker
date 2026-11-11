const SUPABASE_URL = "https://zrszsqlsrcjeltsnsbxv.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpyc3pzcWxzcmNqZWx0c25zYnh2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTM5MjAxNzYsImV4cCI6MjEwOTQ5NjE3Nn0.Dssmx0Y_tJsd1DM4LDDXhVNGeDcyLzrU09nVZWaiTmo";
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

// Memoria en RAM alimentada desde Supabase y localStorage
let cloudHistoryCache = {};

function formatSlotTitle(rawId) {
  if (!rawId) return '';
  return rawId
    .replace(/^(push_|pull_|leg_|rep_|slot_)/gi, '')
    .replace(/^slot_/gi, '')
    .replace(/_/g, ' ')
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase());
}

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
  if (banner) {
    banner.classList.remove('overtime');
    banner.style.display = 'flex';
  }
  
  tickTimer();
  timerInterval = setInterval(tickTimer, 500);
}

function startTimer(seconds) {
  setTimerDirect(seconds);
}

function tickTimer() {
  const storedTarget = localStorage.getItem('TIMER_TARGET_MS');
  const banner = document.getElementById('timer-banner');
  if (!storedTarget) {
    clearInterval(timerInterval);
    if (banner) banner.style.display = 'none';
    document.title = "PPL Minimal Tracker";
    return;
  }

  const diffMs = parseInt(storedTarget, 10) - Date.now();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 0) {
    if (banner) banner.classList.add('overtime');
    if (!hasAlertedOvertime) {
      playBeep();
      if (navigator.vibrate) navigator.vibrate([300, 150, 300]);
      hasAlertedOvertime = true;
    }
    renderTimerDisplay(diffSec, true);
  } else {
    if (banner) banner.classList.remove('overtime');
    renderTimerDisplay(diffSec, false);
  }
}

function addTimerTime(sec) {
  const storedTarget = localStorage.getItem('TIMER_TARGET_MS');
  const base = storedTarget ? Math.max(parseInt(storedTarget, 10), Date.now()) : Date.now();
  const newTarget = base + (sec * 1000);
  localStorage.setItem('TIMER_TARGET_MS', newTarget.toString());
  
  hasAlertedOvertime = false;
  const banner = document.getElementById('timer-banner');
  if (banner) banner.style.display = 'flex';
  clearInterval(timerInterval);
  tickTimer();
  timerInterval = setInterval(tickTimer, 500);
}

function stopTimer() {
  clearInterval(timerInterval);
  localStorage.removeItem('TIMER_TARGET_MS');
  const banner = document.getElementById('timer-banner');
  if (banner) {
    banner.classList.remove('overtime');
    banner.style.display = 'none';
  }
  document.title = "PPL Minimal Tracker";
}

function renderTimerDisplay(totalSeconds, isNegative) {
  const absSec = Math.abs(totalSeconds);
  const min = Math.floor(absSec / 60);
  const sec = absSec % 60;
  const prefix = isNegative ? "-" : "";
  const formatted = `${prefix}${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  
  const display = document.getElementById('timer-display');
  if (display) display.innerText = formatted;
  document.title = `(${formatted}) PPL Tracker`;
}

function checkActiveTimerOnLoad() {
  const storedTarget = localStorage.getItem('TIMER_TARGET_MS');
  if (storedTarget) {
    const banner = document.getElementById('timer-banner');
    if (banner) banner.style.display = 'flex';
    tickTimer();
    clearInterval(timerInterval);
    timerInterval = setInterval(tickTimer, 500);
  }
}

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) checkActiveTimerOnLoad();
});

/* OBTENER HISTÓRICO DIRECTAMENTE DE SUPABASE */
async function fetchLatestWorkoutFromCloud(routine) {
  if (!supabaseClient) return null;
  try {
    const { data, error } = await supabaseClient
      .from('workouts')
      .select('date, summary_text, exercises, ai_feedback')
      .eq('routine_type', routine)
      .order('date', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!error && data) return data;

    const { data: logsData, error: logsErr } = await supabaseClient
      .from('workout_logs')
      .select('slot_id, variant_id, set_number, weight, reps, notes, created_at')
      .eq('routine_name', routine)
      .order('created_at', { ascending: false });

    if (!logsErr && logsData && logsData.length > 0) {
      let reconstructedExercises = {};
      logsData.forEach(row => {
        if (!reconstructedExercises[row.variant_id]) {
          reconstructedExercises[row.variant_id] = [];
        }
        reconstructedExercises[row.variant_id].push({
          kg: row.weight,
          reps: row.reps,
          rir: ''
        });
      });
      return {
        date: new Date(logsData[0].created_at).toLocaleDateString(),
        summary_text: `Último registro cargado desde logs (${logsData.length} series)`,
        exercises: reconstructedExercises,
        ai_feedback: null
      };
    }

    return null;
  } catch (err) {
    console.error("Fallo de conexión:", err);
    return null;
  }
}

/* BUSCADOR DE EJERCICIOS EN MEMORIA Y FALLBACK LOCAL */
function getHistoricalExerciseData(exId, exName) {
  if (cloudHistoryCache[exId] && cloudHistoryCache[exId].length > 0) {
    return cloudHistoryCache[exId];
  }
  const foundCloudKey = Object.keys(cloudHistoryCache).find(k => k.trim().toLowerCase() === exName.trim().toLowerCase());
  if (foundCloudKey && cloudHistoryCache[foundCloudKey]) {
    return cloudHistoryCache[foundCloudKey];
  }

  const db = JSON.parse(localStorage.getItem('EXERCISE_HISTORY_DB') || '{}');
  if (db[exId] && db[exId].length > 0) {
    return db[exId];
  }
  const foundLocalKey = Object.keys(db).find(k => k.trim().toLowerCase() === exName.trim().toLowerCase());
  if (foundLocalKey && db[foundLocalKey]) {
    return db[foundLocalKey];
  }

  return null;
}

/* CÁLCULO DINÁMICO DE APROXIMACIONES Y CARGA DIANA */
function generateDynamicWarmupHtml(ex, prevSets) {
  let lastMaxKg = null;
  if (prevSets && prevSets.length > 0) {
    const validWeights = prevSets.map(s => parseFloat(s.kg)).filter(w => !isNaN(w) && w > 0);
    if (validWeights.length > 0) {
      lastMaxKg = Math.max(...validWeights);
    }
  }

  if (!lastMaxKg) {
    return `
      <div style="color: #94a3b8; font-size: 0.85em; margin-bottom: 8px;">ℹ️ Sin registros previos. Aproximaciones progresivas estándar.</div>
      ${ex.warmupHtml || ''}`;
  }

  const isBarbell = ex.id.includes("libre") || ex.id.includes("guiada") || ex.id.includes("barra");
  const isDumbbell = ex.id.includes("mancuerna") || ex.id.includes("db");

  const roundWeight = (kg) => {
    if (isDumbbell) return Math.round(kg / 2) * 2;
    if (isBarbell) return Math.round(kg / 2.5) * 2.5;
    return Math.round(kg / 2.5) * 2.5;
  };

  const w50 = roundWeight(lastMaxKg * 0.50);
  const w70 = roundWeight(lastMaxKg * 0.70);
  const w85 = roundWeight(lastMaxKg * 0.85);
  const targetNext = roundWeight(lastMaxKg * 1.025);

  return `
    <div style="background: rgba(15, 23, 42, 0.6); padding: 8px 10px; border-radius: 6px; margin-bottom: 8px; border: 1px solid #334155; font-size: 0.88em; line-height: 1.45;">
      <div style="color: #38bdf8; font-weight: bold; margin-bottom: 4px;">
        🎯 Carga Diana (Base anterior: ${lastMaxKg} kg): ${lastMaxKg === targetNext ? `${lastMaxKg} kg` : `${lastMaxKg} - ${targetNext} kg`}
      </div>
      <div style="color: #cbd5e1;">
        <span style="color: #94a3b8; font-weight: 600;">Aproximaciones:</span><br>
        • Serie 1: <b>${w50} kg</b> x 8 reps (50%)<br>
        • Serie 2: <b>${w70} kg</b> x 4 reps (70%)<br>
        • Serie 3: <b>${w85} kg</b> x 1-2 reps (85%)
      </div>
    </div>
    ${ex.warmupHtml || ''}`;
}

/* SINCRONIZACIÓN EN SUPABASE */
async function syncWorkoutToCloud(routine, dateStr, summaryText, sessionData, aiFeedback = null, logsPayload = []) {
  if (!supabaseClient) return;
  try {
    const { data: existingRow } = await supabaseClient
      .from('workouts')
      .select('summary_text, exercises, ai_feedback')
      .eq('routine_type', routine)
      .eq('date', dateStr)
      .maybeSingle();

    let finalExercises = sessionData;
    let finalSummary = summaryText;
    let finalFeedback = aiFeedback;

    if (existingRow && existingRow.exercises) {
      finalExercises = { ...existingRow.exercises, ...sessionData };
      if (existingRow.summary_text && existingRow.summary_text !== summaryText) {
        finalSummary = existingRow.summary_text + "\n" + summaryText.replace(/Entrenamiento realizado.*\n/, '');
      }
      if (!finalFeedback && existingRow.ai_feedback) {
        finalFeedback = existingRow.ai_feedback;
      }
    }

    const payload = {
      routine_type: routine,
      date: dateStr,
      summary_text: finalSummary,
      exercises: finalExercises
    };
    if (finalFeedback) payload.ai_feedback = finalFeedback;

    await supabaseClient.from('workouts').upsert(payload, { onConflict: 'routine_type,date' });

    if (logsPayload && logsPayload.length > 0) {
      await supabaseClient.from('workout_logs').insert(logsPayload);
    }

    console.log("Datos sincronizados en Supabase exitosamente.");
  } catch (err) {
    console.error("Fallo de red en Supabase:", err);
  }
}

/* BORRADOR INMEDIATO */
function saveDraft() {
  if (typeof routineSlots === 'undefined' || !routineSlots[currentRoutine]) return;
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
      if (kg || reps || rir) draft[ex.id][s] = { kg, reps, rir };
    }
  });
  localStorage.setItem(`DRAFT_V2_${currentRoutine}`, JSON.stringify(draft));
}

function clearDraft() {
  localStorage.removeItem(`DRAFT_V2_${currentRoutine}`);
}

function onVariantChanged(slotId, newVariantId) {
  localStorage.setItem(`ACTIVE_VARIANT_${slotId}`, newVariantId);
  renderRoutineUI(currentRoutine);
}

/* RENDERIZADO VISUAL CON LIMPIEZA DE TÍTULO */
function renderRoutineUI(type) {
  const container = document.getElementById('exercise-list');
  if (!container) return;
  container.innerHTML = '';

  if (typeof routineSlots === 'undefined' || !routineSlots[type]) {
    container.innerHTML = `<div style="padding: 20px; color: #ef4444;">Error: No se encontró la rutina '${type}' en routines.js.</div>`;
    return;
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

    const cleanSlotTitle = slot.name || slot.title || formatSlotTitle(slot.slotId);

    container.innerHTML += `
      <details class="exercise-card">
        <summary>
          <div class="exercise-title-wrap">
            <span class="exercise-arrow">▶</span>
            <span class="exercise-title"><strong>${cleanSlotTitle}:</strong> ${ex.name}</span>
            <span class="exercise-reps-badge">${ex.targetReps} reps</span>
          </div>
          <span class="rest-badge">${restLabel}</span>
        </summary>
        <div class="exercise-body">
          ${variantSelectHtml}
          ${prevBannerHtml}
          <details class="warmup-details">
            <summary>Calentamiento / Pesos Diana</summary>
            <div class="warmup-content">${generateDynamicWarmupHtml(ex, prevSets)}</div>
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

/* CARGA ASÍNCRONA ROBUSTA DESDE SUPABASE */
async function loadRoutine(type) {
  currentRoutine = type;
  const selector = document.getElementById('routine-selector');
  if (selector && selector.value !== type) selector.value = type;

  const historyContentEl = document.getElementById('history-content');
  const resBox = document.getElementById('response-box');
  if (resBox) resBox.style.display = 'none';

  renderRoutineUI(type);

  if (historyContentEl) historyContentEl.innerText = "Cargando datos previos desde Supabase...";

  try {
    const cloudRecord = await fetchLatestWorkoutFromCloud(type);

    if (cloudRecord) {
      cloudHistoryCache = cloudRecord.exercises || {};
      if (historyContentEl) {
        historyContentEl.innerText = cloudRecord.summary_text || `Sesión anterior registrada el ${cloudRecord.date}`;
      }
      
      if (cloudRecord.ai_feedback && resBox) {
        resBox.innerText = `🤖 OBJETIVOS DEL ENTRENADOR (Semana anterior):\n\n${cloudRecord.ai_feedback}`;
        resBox.style.background = "#022c22";
        resBox.style.border = "1px solid #059669";
        resBox.display = 'block';
      }

      renderRoutineUI(type);
    } else {
      cloudHistoryCache = {};
      if (historyContentEl) {
        historyContentEl.innerText = "No hay registros previos en Supabase para este día.";
      }
    }
  } catch (err) {
    console.warn("No se pudo conectar con Supabase en este momento:", err);
    if (historyContentEl) historyContentEl.innerText = "Modo sin conexión. Datos locales activos.";
  }
}

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
  let logsPayload = [];
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

        logsPayload.push({
          routine_name: currentRoutine,
          slot_id: slot.slotId,
          variant_id: ex.id,
          set_number: s,
          weight: parseFloat(kg),
          reps: parseInt(reps, 10),
          notes: rir !== "" ? `RIR ${rir}` : null
        });
      }
    }
    if (setsData.length > 0) {
      const slotTitle = slot.name || slot.title || formatSlotTitle(slot.slotId);
      summary += `\n* ${slotTitle} — ${ex.name} [Diana: ${ex.targetReps} reps]:\n  - ${setsData.join('\n  - ')}\n`;
      sessionData[ex.id] = exerciseSets;
      sessionData[ex.name] = exerciseSets;
      
      const db = JSON.parse(localStorage.getItem('EXERCISE_HISTORY_DB') || '{}');
      db[ex.id] = exerciseSets;
      localStorage.setItem('EXERCISE_HISTORY_DB', JSON.stringify(db));
    }
  });

  return { summary, sessionData, logsPayload, hasData, dateStr };
}

function copyWorkoutToClipboard() {
  const { summary, sessionData, logsPayload, hasData, dateStr } = getWorkoutSummary();
  if (!hasData) {
    alert("Introduce al menos una serie antes de copiar.");
    return;
  }

  clearDraft();
  syncWorkoutToCloud(currentRoutine, dateStr, summary, sessionData, null, logsPayload);

  navigator.clipboard.writeText(summary).then(() => {
    alert("¡Copiado y sincronizado en Supabase!");
    const historyContent = document.getElementById('history-content');
    if (historyContent) historyContent.innerText = summary;
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

  const { summary, sessionData, logsPayload, hasData, dateStr } = getWorkoutSummary();
  if (!hasData) {
    alert("Introduce al menos una serie con peso y repeticiones.");
    return;
  }

  const historyContent = document.getElementById('history-content');
  const previousSession = historyContent ? historyContent.innerText : "Sin registros previos.";
  const btn = document.getElementById('btn-submit');
  const resBox = document.getElementById('response-box');
  if (btn) btn.innerText = "Analizando...";
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

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`, {
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
      if (resBox) {
        resBox.style.background = "#450a0a";
        resBox.style.border = "1px solid #dc2626";
        resBox.innerText = `Error de API (${data.error.code}): ${data.error.message}`;
      }
    } else {
      clearDraft();
      const feedbackText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No se recibió respuesta.";
      
      syncWorkoutToCloud(currentRoutine, dateStr, summary, sessionData, feedbackText, logsPayload);

      if (historyContent) historyContent.innerText = summary;
      if (resBox) {
        resBox.style.background = "#022c22";
        resBox.style.border = "1px solid #059669";
        resBox.innerText = feedbackText;
      }
    }
    if (resBox) {
      resBox.style.display = 'block';
      resBox.scrollIntoView({ behavior: 'smooth' });
    }
  } catch (err) {
    clearTimeout(timeoutId);
    if (resBox) {
      resBox.style.background = "#450a0a";
      resBox.style.border = "1px solid #dc2626";
      if (err.name === 'AbortError') {
        resBox.innerText = "Tiempo de espera agotado (15s). La API de Google está saturada en este momento. Dale a 'Copiar' y pega el entreno en este chat.";
      } else {
        resBox.innerText = "Error de conexión: " + err.message;
      }
      resBox.style.display = 'block';
    }
  } finally {
    if (btn) btn.innerText = "Enviar Gemini";
    document.body.classList.remove('loading');
  }
}

/* INICIALIZACIÓN */
loadRoutine('push');
checkActiveTimerOnLoad();
