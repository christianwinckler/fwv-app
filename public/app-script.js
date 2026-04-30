
// ── EXPONER FUNCIONES GLOBALES (primero, antes de cualquier código DOM) ──────
window.switchScreen=switchScreen;
window.cerrarDrawer=cerrarDrawer;
window.cerrar=cerrar;
window.abrirNuevoGasto=abrirNuevoGasto;
window.cargarDatos=cargarDatos;
window.togglePptoCat=togglePptoCat;
window.toggleFijo=toggleFijo;
window.actualizarPpto=actualizarPpto;
window.abrirCat=abrirCat;
window.guardarPptoDesdeCat=guardarPptoDesdeCat;
window.abrirGasto=abrirGasto;
window.abrirGastoById=abrirGastoById;
window.abrirDistribuirIntl=abrirDistribuirIntl;
window.intlEditConfirmar=intlEditConfirmar;
window.intlRenderDistEditFull=intlRenderDistEditFull;
window.toggleAdminCat=toggleAdminCat;
window.abrirEditSubcat=abrirEditSubcat;
window.cerrarAdminModal=cerrarAdminModal;
window.guardarEditSubcat=guardarEditSubcat;
window.eliminarSubcatAdmin=eliminarSubcatAdmin;
window.confirmarEliminarSubcat=confirmarEliminarSubcat;
window.abrirAgregarSubcat=abrirAgregarSubcat;
window.guardarNuevaSubcat=guardarNuevaSubcat;
window.abrirRenombrarCat=abrirRenombrarCat;
window.guardarRenombrarCat=guardarRenombrarCat;
window.selAdminModo=selAdminModo;
window.selAdminIE=selAdminIE;
window.agregarNuevaCategoria=agregarNuevaCategoria;
window.aplicarAlcance=aplicarAlcance;
window.togglePptoSort=togglePptoSort;
window.abrirModalPpto=abrirModalPpto;
window.setDetFiltro=setDetFiltro;
window.toggleDetCat=toggleDetCat;
window.aplicarDetFiltros=aplicarDetFiltros;
window.limpiarDetFiltros=limpiarDetFiltros;
window.renderHome=renderHome;
window.toggleEye=toggleEye;
window.intlAgregarItem=intlAgregarItem;
window.intlEliminarItem=intlEliminarItem;
window.intlUpdateField=intlUpdateField;
window.intlVerResumen=intlVerResumen;
window.intlGuardarSinDist=intlGuardarSinDist;
window.intlConfirmar=intlConfirmar;
window.resetEvoCat=resetEvoCat;
window.resetEvoSub=resetEvoSub;
window.evoOpenCat=evoOpenCat;
window.evoOpenSub=evoOpenSub;
window.abrirDrawer=abrirDrawer;
window.setValFiltroEstado=setValFiltroEstado;
window.setValFiltroCategoria=setValFiltroCategoria;
window.setValFiltroMedio=setValFiltroMedio;
window.toggleValFiltros=toggleValFiltros;
window.limpiarValFiltros=limpiarValFiltros;
window.postGastoDetalle=postGastoDetalle;
window.postGastoDividir=postGastoDividir;
window.postGastoNuevo=postGastoNuevo;
window.abrirVistaDividir=abrirVistaDividir;
window.cerrarVistaDividir=cerrarVistaDividir;
window.divAddPart=divAddPart;
window.divOpenSubcat=divOpenSubcat;
window.divSelectSubcat=divSelectSubcat;
window.divFiltrarSubcat=divFiltrarSubcat;
window.divUpdMonto=divUpdMonto;
window.divUsarResto=divUsarResto;
window.divRemovePart=divRemovePart;
window.ejecutarDividir=ejecutarDividir;
window.cargarDatosQuiet=cargarDatosQuiet;
window.setCuotasTab=setCuotasTab;
window.abrirNuevaCuota=abrirNuevaCuota;
window.guardarNuevaCuota=guardarNuevaCuota;
window.actualizarPreviewCuota=actualizarPreviewCuota;
window.selCuotaTarjeta=selCuotaTarjeta;
window.abrirPagarCuota=abrirPagarCuota;
window.confirmarPagarCuota=confirmarPagarCuota;
window.bloquearScrollFondo=bloquearScrollFondo;
window.desbloquearScrollFondo=desbloquearScrollFondo;
window.toggleHcuadFiltros=toggleHcuadFiltros;
window.limpiarHcuadFiltros=limpiarHcuadFiltros;
window.setHcuadFiltro=setHcuadFiltro;
window.abrirCuadratura=abrirCuadratura;
window.ejecutarComparacion=ejecutarComparacion;
window.cuadSeguirRevisando=cuadSeguirRevisando;
window.cuadAbrirAjuste=cuadAbrirAjuste;
window.confirmarAjusteCuadratura=confirmarAjusteCuadratura;
window.cerrarResultadoCuadratura=cerrarResultadoCuadratura;
window.registrarCuadratura=registrarCuadratura;
window.toggleEyeAll=toggleEyeAll;
window.presetRango=presetRango;
window.setAdminFilter=setAdminFilter;
window.selAdminEstado=selAdminEstado;
window.selAdminFrecuencia=selAdminFrecuencia;
window.duplicadoGuardarIgual=duplicadoGuardarIgual;
window.duplicadoMoverSiguiente=duplicadoMoverSiguiente;
window.toggleModoSeleccion=toggleModoSeleccion;
window.toggleItemSeleccion=toggleItemSeleccion;
window.toggleSeleccionTodos=toggleSeleccionTodos;
window.abrirModalCambioFecha=abrirModalCambioFecha;
window.confirmarCambioFecha=confirmarCambioFecha;
window.actualizarAvisoCambioFecha=actualizarAvisoCambioFecha;

window._eyeHidden = {santander: false, falabella: false, tc: false};
window._eyeAllHidden = false;

function toggleEye(key) {
  window._eyeHidden[key] = !window._eyeHidden[key];
  const btn = document.getElementById('eye-btn-' + key);
  if (btn) {
    btn.classList.toggle('hidden', window._eyeHidden[key]);
    btn.innerHTML = window._eyeHidden[key]
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
  }
  const todosOcultos = window._eyeHidden.santander && window._eyeHidden.falabella && window._eyeHidden.tc;
  window._eyeAllHidden = todosOcultos;
  const btnG = document.getElementById('btn-eye-all');
  const iconG = document.getElementById('eye-all-icon');
  if (btnG) {
    btnG.style.background = todosOcultos ? 'rgba(0,122,255,0.12)' : '#F2F2F7';
    btnG.style.color = todosOcultos ? '#007AFF' : '#8e8e93';
  }
  if (iconG) {
    iconG.innerHTML = todosOcultos
      ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'
      : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  }
  renderHome();
}

function toggleEyeAll() {
  window._eyeAllHidden = !window._eyeAllHidden;
  const btn = document.getElementById('btn-eye-all');
  const icon = document.getElementById('eye-all-icon');
  if (btn) {
    btn.style.background = window._eyeAllHidden ? 'rgba(0,122,255,0.12)' : '#F2F2F7';
    btn.style.color = window._eyeAllHidden ? '#007AFF' : '#8e8e93';
  }
  if (icon) {
    icon.innerHTML = window._eyeAllHidden
      ? '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>'
      : '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
  }
  window._eyeHidden.santander = window._eyeAllHidden;
  window._eyeHidden.falabella = window._eyeAllHidden;
  window._eyeHidden.tc = window._eyeAllHidden;
  ['santander','falabella','tc'].forEach(key => {
    const b = document.getElementById('eye-btn-' + key);
    if (b) {
      b.classList.toggle('hidden', window._eyeAllHidden);
      b.innerHTML = window._eyeAllHidden
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>';
    }
  });
  if(window._eyeAllHidden){
    if(evoChart){evoChart.destroy();evoChart=null;}
    const evoCv=document.getElementById('home-line-chart-canvas');
    if(evoCv) evoCv.style.visibility='hidden';
  } else {
    const evoCv=document.getElementById('home-line-chart-canvas');
    if(evoCv) evoCv.style.visibility='visible';
    renderHomeGrafico();
  }
  renderHome();
}

// ── TARJETA INTERNACIONAL ────────────────────────────────
let intlItems = [];
let intlNextId = 0;
let intlSinDist = false;

function checkIntlMode() {
  const sub = document.getElementById('f-subcat').value.trim();
  const esIntl = sub === 'TC - Tarjeta Internacional';
  const banner = document.getElementById('intl-banner');
  const btnSec = document.getElementById('btn-guardar-sin-dist');
  const btnG = document.getElementById('btn-guardar');
  if (banner) banner.style.display = esIntl ? '' : 'none';
  if (btnSec) btnSec.style.display = esIntl ? '' : 'none';
  if (btnG && !btnG.disabled) btnG.textContent = esIntl ? 'Continuar → Distribuir en USD' : (modoEdicion ? 'Guardar cambios' : 'Guardar gasto');
}

function intlReset() {
  intlItems = []; intlNextId = 0; intlSinDist = false;
  const banner = document.getElementById('intl-banner');
  const btnSec = document.getElementById('btn-guardar-sin-dist');
  if (banner) banner.style.display = 'none';
  if (btnSec) btnSec.style.display = 'none';
}

function intlSubcatOpts(selectedSub) {
  return subcats
    .filter(s => s.ie === 'E' && s.modo === 'Tarjeta Crédito')
    .map(s => {
      const label = s.sub.includes(' - ') ? s.sub.split(' - ').slice(1).join(' - ') : s.sub;
      const sel = s.sub === selectedSub ? 'selected' : '';
      return `<option value="${s.sub}" ${sel}>${label} (${s.cat})</option>`;
    }).join('');
}

function intlTotalUSD() {
  return intlItems.reduce((s, i) => s + (parseFloat(i.usd) || 0), 0);
}

function intlClpItem(item) {
  const montoCLP = parseFloat(document.getElementById('f-monto').value) || 0;
  const totalUSD = intlTotalUSD();
  if (!totalUSD || !item.usd) return 0;
  return Math.round((parseFloat(item.usd) || 0) / totalUSD * montoCLP);
}

function intlTotalCLPDist() {
  return intlItems.reduce((s, i) => s + intlClpItem(i), 0);
}

function intlUpdateTotals() {
  const montoCLP = parseFloat(document.getElementById('f-monto').value) || 0;
  const totalUSD = intlTotalUSD();
  const distribuido = intlTotalCLPDist();
  const diff = distribuido - montoCLP;
  const exact = Math.abs(diff) <= Math.max(intlItems.length, 1);
  const pct = montoCLP ? Math.min(distribuido / montoCLP * 100, 110) : 0;

  const tcEl = document.getElementById('intl-tipo-cambio-display');
  if (tcEl) tcEl.innerHTML = totalUSD > 0 ? `Tipo de cambio estimado: <strong>$${Math.round(montoCLP / totalUSD).toLocaleString('es-CL')} / USD</strong>` : '';

  const wrap = document.getElementById('intl-progress-wrap');
  if (wrap) {
    const fillColor = exact ? '#2e7d32' : diff > 0 ? '#c62828' : '#f57f17';
    const labelExtra = exact ? '✓ cuadra exacto' : diff > 0 ? `+${fmt(diff)} de más` : `${fmt(Math.abs(diff))} por distribuir`;
    wrap.innerHTML = `<div class="intl-progress-label"><span>${fmt(distribuido)} distribuido</span><span>${labelExtra}</span></div><div class="intl-progress-track"><div class="intl-progress-fill" style="width:${Math.min(pct,100)}%;background:${fillColor};"></div></div>`;
  }

  intlItems.forEach(item => {
    const el = document.querySelector(`#intl-row-${item.id} .intl-item-clp strong`);
    if (el) el.textContent = intlClpItem(item) ? fmt(intlClpItem(item)) : '—';
  });

  const btnRes = document.getElementById('btn-intl-resumen');
  if (btnRes) {
    const ok = intlItems.length > 0 && intlItems.every(i => i.desc && i.sub && parseFloat(i.usd) > 0) && exact;
    btnRes.disabled = !ok;
    btnRes.style.opacity = ok ? '1' : '0.4';
  }
}

function intlRenderDist() {
  const list = document.getElementById('intl-items-list');
  if (list) {
    list.innerHTML = intlItems.map(item => `<div class="intl-item-row" id="intl-row-${item.id}">
      <div class="intl-item-top">
        <input class="intl-item-input" type="text" placeholder="Descripción del ítem" value="${(item.desc||'').replace(/"/g,'&quot;')}" oninput="intlUpdateField(${item.id},'desc',this.value)" />
        <button class="intl-item-del" onclick="intlEliminarItem(${item.id});intlRenderDist();">×</button>
      </div>
      <select class="intl-subcat-sel" onchange="intlUpdateField(${item.id},'sub',this.value)">
        <option value="">Subcategoría...</option>
        ${intlSubcatOpts(item.sub)}
      </select>
      <div class="intl-item-usd-wrap">
        <span class="intl-item-usd-prefix">USD</span>
        <input class="intl-item-usd" type="number" placeholder="0.00" step="0.01" min="0" value="${item.usd||''}" oninput="intlUpdateField(${item.id},'usd',this.value);intlUpdateTotals();" />
        <div class="intl-item-clp" style="flex:1;"><strong>${intlClpItem(item)?fmt(intlClpItem(item)):'—'}</strong><br>CLP</div>
      </div>
    </div>`).join('');
  }
  intlUpdateTotals();
}

function intlContinuar() {
  const montoCLP = parseFloat(document.getElementById('f-monto').value) || 0;
  if (!montoCLP) { mostrarToast('Ingresa el monto CLP primero'); return; }
  intlItems = []; intlNextId = 0;
  document.getElementById('intl-dist-subtitle').textContent = `${fmt(montoCLP)} CLP en total`;
  intlRenderDist();
  document.getElementById('ov-intl-dist').classList.add('open');
  bloquearScrollFondo();
}

function intlAgregarItem() {
  intlItems.push({ id: intlNextId++, desc: '', sub: '', usd: '' });
  if(window._intlEditMode){intlRenderDistEditFull();}else{intlRenderDist();}
}

function intlEliminarItem(id) {
  intlItems = intlItems.filter(i => i.id !== id);
  intlRenderDist();
}

function intlUpdateField(id, field, val) {
  const item = intlItems.find(i => i.id === id);
  if (!item) return;
  item[field === 'desc' ? 'desc' : field === 'sub' ? 'sub' : 'usd'] = val;
  intlUpdateTotals();
}

function intlVerResumen() {
  const montoCLP = parseFloat(document.getElementById('f-monto').value) || 0;
  const totalUSD = intlTotalUSD();
  const tc = totalUSD > 0 ? Math.round(montoCLP / totalUSD) : 0;
  const list = document.getElementById('intl-confirm-list');
  if (list) {
    list.innerHTML = intlItems.map(item => {
      const clp = intlClpItem(item);
      const usd = parseFloat(item.usd) || 0;
      const label = item.sub.includes(' - ') ? item.sub.split(' - ').slice(1).join(' - ') : item.sub;
      return `<div class="intl-confirm-item">
        <div><div class="intl-confirm-desc">${item.desc}</div><div class="intl-confirm-sub">${label}</div></div>
        <div class="intl-confirm-amts"><div class="intl-confirm-clp">${fmt(clp)}</div><div class="intl-confirm-usd">USD ${usd.toFixed(2)}</div></div>
      </div>`;
    }).join('');
  }
  document.getElementById('ov-intl-confirm').classList.add('open');
}

async function intlConfirmar() {
  const fecha = document.getElementById('f-fecha').value;
  const bancoEl = document.querySelector('.banco-btn.active');
  const banco = bancoEl ? bancoEl.dataset.banco : '';
  const esDev = document.getElementById('dev-toggle').classList.contains('active');
  const devStr = esDev ? 'X' : '';
  const montoCLP = parseFloat(document.getElementById('f-monto').value) || 0;
  const totalUSD = intlTotalUSD();
  const tc = totalUSD > 0 ? Math.round(montoCLP / totalUSD) : 0;
  const btn = document.getElementById('btn-intl-confirmar');
  btn.disabled = true; btn.textContent = 'Guardando...';
  const count = intlItems.length;
  try {
    // Calcular CLPs proporcionales con residuo en el último ítem
    const clpsCalculados = intlItems.map(item => Math.round((parseFloat(item.usd) || 0) / totalUSD * montoCLP));
    const sumaParcial = clpsCalculados.slice(0, -1).reduce((s, v) => s + v, 0);
    if (count > 0) clpsCalculados[count - 1] = montoCLP - sumaParcial;

    for (let idx = 0; idx < intlItems.length; idx++) {
      const item = intlItems[idx];
      const clp = clpsCalculados[idx];
      const usd = parseFloat(item.usd) || 0;
      const descCompleta = `Pago Tarjeta Internacional - ${item.desc} (USD ${usd.toFixed(2)} @ $${tc.toLocaleString('es-CL')}/USD)`;
      const N = totalFilasGastos + 2;
      const dateSerial = Math.round(new Date(fecha).getTime() / 86400000) + 25569;
      const fB = `=IF(A${N}<>"";(CONCATENATE(IF(MONTH(A${N})<10;CONCATENATE("0";MONTH(A${N}));MONTH(A${N}));"-";YEAR(A${N})));if(A${N}="";"";\"Fecha no válida\"))`;
      const fD = `=IFERROR(VLOOKUP(C${N};'Parámetros'!A:B;2;FALSE);"")`;
      const fE = `=IF(G${N}<>"X";IFERROR(VLOOKUP(C${N};'Parámetros'!A:C;3;FALSE);"");IF(IFERROR(VLOOKUP(C${N};'Parámetros'!A:C;3;FALSE);"")="E";"I";"E"))`;
      const fJ = `=IF(I${N}<>"";IF(E${N}="I";IF(I${N}>0;I${N};I${N}*-1);IF(E${N}="E";IF(I${N}<0;I${N};I${N}*-1)));0)`;
      const fK = `=SUMIFs(Presupuesto!D:D;Presupuesto!A:A;B${N};Presupuesto!B:B;C${N})`;
      const row = [dateSerial, fB, item.sub, fD, fE, banco, devStr, descCompleta, clp, fJ, fK];
      const res = await fetch('/api/gastos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ row }) });
      if (!res.ok) { const err = await res.json().catch(() => ({})); throw new Error(err.error || 'Error ' + res.status); }
      totalFilasGastos++;
    }
    cerrar('ov-intl-confirm'); cerrar('ov-intl-dist'); cerrar('ov-nuevo');
    intlReset();
    document.getElementById('f-subcat').value = '';
    document.getElementById('f-desc').value = '';
    document.getElementById('f-monto').value = '';
    document.getElementById('f-cat-badge').style.display = 'none';
    document.getElementById('intl-banner').style.display = 'none';
    document.getElementById('btn-guardar-sin-dist').style.display = 'none';
    document.getElementById('btn-guardar').textContent = 'Guardar gasto';
    document.querySelectorAll('.banco-btn').forEach(b => b.classList.remove('active'));
    document.getElementById('dev-toggle').classList.remove('active');
    document.getElementById('dev-hint').textContent = 'marcar con X';
    const tcBtn = document.querySelector('.banco-btn[data-banco="Tarjeta Crédito"]');
    if (tcBtn) tcBtn.classList.add('active');
    ultimoGastoGuardado = { desc: 'Tarjeta Internacional', monto: montoCLP, sub: 'TC - Tarjeta Internacional' };
    document.getElementById('post-gasto-desc').textContent = `${count} gasto${count !== 1 ? 's' : ''} internacional${count !== 1 ? 'es' : ''} guardado${count !== 1 ? 's' : ''} — $${montoCLP.toLocaleString('es-CL')} CLP`;
    document.getElementById('ov-post-gasto').classList.add('open');
    bloquearScrollFondo();
    const btnDividir = document.getElementById('post-btn-dividir');
    if (btnDividir) {
      btnDividir.style.opacity = '0.4';
      btnDividir.style.pointerEvents = 'none';
      btnDividir.querySelector('.alcance-txt-sub').textContent = 'Cargando datos...';
    }
    cargarDatos().then(() => {
      const sa = document.querySelector('.screen.active')?.id;
      if (sa === 'screen-detalle') renderDetalle();
      if (sa === 'screen-dashboard') renderDashboard();
      if (sa === 'screen-home') renderHome();
    }).catch(e => console.error('Error recargando datos:', e));
  } catch (e) {
    mostrarToast('Error al guardar: ' + e.message);
  } finally {
    btn.disabled = false; btn.textContent = 'Confirmar y guardar todos';
  }
}

function intlGuardarSinDist() {
  cerrar('ov-intl-dist');
  intlSinDist = true;
  document.getElementById('btn-guardar').click();
}

// ── DISTRIBUCIÓN INTERNACIONAL DESDE EDICIÓN ────────────
window._intlEditMode = false;
window._intlEditGasto = null;
window._intlEditMontoCLP = 0;

function abrirDistribuirIntl() {
  if(!gastoActual) return;
  intlItems=[]; intlNextId=0; intlSinDist=false;
  window._intlEditMode=true;
  window._intlEditGasto=gastoActual;
  window._intlEditMontoCLP=gastoActual.monto;
  document.getElementById('intl-dist-subtitle').textContent=
    `${gastoActual.desc} — ${fmt(gastoActual.monto)} CLP`;
  document.getElementById('intl-tipo-cambio-display').textContent='';
  document.getElementById('intl-progress-wrap').innerHTML='';
  document.getElementById('intl-items-list').innerHTML='';
  cerrar('ov-gasto');
  intlRenderDistEditFull();
  document.getElementById('ov-intl-dist').classList.add('open');
  bloquearScrollFondo();
}

function intlRenderDistEdit() {
  const montoCLP=window._intlEditMontoCLP||0;
  const totalUSD=intlTotalUSD();
  const distribuido=intlItems.reduce((s,item)=>{
    if(!totalUSD||!item.usd) return s;
    return s+Math.round((parseFloat(item.usd)||0)/totalUSD*montoCLP);
  },0);
  const diff=distribuido-montoCLP;
  const exact=Math.abs(diff)<=Math.max(intlItems.length,1);
  const pct=montoCLP?Math.min(distribuido/montoCLP*100,110):0;

  const tcEl=document.getElementById('intl-tipo-cambio-display');
  if(tcEl) tcEl.innerHTML=totalUSD>0
    ?`Tipo de cambio estimado: <strong>$${Math.round(montoCLP/totalUSD).toLocaleString('es-CL')} / USD</strong>`:'';

  const wrap=document.getElementById('intl-progress-wrap');
  if(wrap){
    const fillColor=exact?'#2e7d32':diff>0?'#c62828':'#f57f17';
    const labelExtra=exact?'✓ cuadra exacto':diff>0?`+${fmt(diff)} de más`:`${fmt(Math.abs(diff))} por distribuir`;
    wrap.innerHTML=`<div class="intl-progress-label"><span>${fmt(distribuido)} distribuido</span><span>${labelExtra}</span></div><div class="intl-progress-track"><div class="intl-progress-fill" style="width:${Math.min(pct,100)}%;background:${fillColor};"></div></div>`;
  }

  if(totalUSD>0){
    intlItems.forEach(item=>{
      const clpEl=document.querySelector(`#intl-row-${item.id} .intl-item-clp strong`);
      if(clpEl){
        const usd=parseFloat(item.usd)||0;
        clpEl.textContent=usd?fmt(Math.round(usd/totalUSD*montoCLP)):'—';
      }
    });
  }

  const btnRes=document.getElementById('btn-intl-resumen');
  if(btnRes){
    const ok=intlItems.length>0&&intlItems.every(i=>i.desc&&i.sub&&parseFloat(i.usd)>0)&&exact;
    btnRes.disabled=!ok;
    btnRes.style.opacity=ok?'1':'0.4';
    btnRes.onclick=window._intlEditMode?intlEditVerResumen:intlVerResumen;
  }
}

function intlRenderDistEditFull() {
  const montoCLP=window._intlEditMontoCLP||0;
  const totalUSD=intlTotalUSD();

  const list=document.getElementById('intl-items-list');
  if(list){
    list.innerHTML=intlItems.map(item=>{
      const usd=parseFloat(item.usd)||0;
      const clp=totalUSD>0?Math.round(usd/totalUSD*montoCLP):0;
      return `<div class="intl-item-row" id="intl-row-${item.id}">
        <div class="intl-item-top">
          <input class="intl-item-input" type="text" placeholder="Descripción del ítem"
            value="${(item.desc||'').replace(/"/g,'&quot;')}"
            oninput="intlUpdateField(${item.id},'desc',this.value);intlRenderDistEdit();" />
          <button class="intl-item-del"
            onclick="intlEliminarItem(${item.id});intlRenderDistEditFull();">×</button>
        </div>
        <select class="intl-subcat-sel"
          onchange="intlUpdateField(${item.id},'sub',this.value);intlRenderDistEdit();">
          <option value="">Subcategoría...</option>
          ${intlSubcatOpts(item.sub)}
        </select>
        <div class="intl-item-usd-wrap">
          <span class="intl-item-usd-prefix">USD</span>
          <input class="intl-item-usd" type="number" placeholder="0.00" step="0.01" min="0"
            value="${item.usd||''}"
            oninput="intlUpdateField(${item.id},'usd',this.value);intlRenderDistEdit();" />
          <div class="intl-item-clp" style="flex:1;"><strong>${clp?fmt(clp):'—'}</strong><br>CLP</div>
        </div>
      </div>`;
    }).join('');
  }

  intlRenderDistEdit();

  const btnSec=document.getElementById('btn-guardar-sin-dist');
  if(btnSec) btnSec.style.display=window._intlEditMode?'none':'';
}

function intlEditVerResumen() {
  const montoCLP=window._intlEditMontoCLP||0;
  const totalUSD=intlTotalUSD();
  const tc=totalUSD>0?Math.round(montoCLP/totalUSD):0;
  const list=document.getElementById('intl-confirm-list');
  if(list){
    list.innerHTML=intlItems.map(item=>{
      const usd=parseFloat(item.usd)||0;
      const clp=totalUSD>0?Math.round(usd/totalUSD*montoCLP):0;
      const label=item.sub.includes(' - ')?item.sub.split(' - ').slice(1).join(' - '):item.sub;
      return `<div class="intl-confirm-item">
        <div><div class="intl-confirm-desc">${item.desc}</div><div class="intl-confirm-sub">${label}</div></div>
        <div class="intl-confirm-amts"><div class="intl-confirm-clp">${fmt(clp)}</div><div class="intl-confirm-usd">USD ${usd.toFixed(2)}</div></div>
      </div>`;
    }).join('');
  }
  const avisoId='intl-confirm-aviso';
  let aviso=document.getElementById(avisoId);
  if(!aviso){
    aviso=document.createElement('div');
    aviso.id=avisoId;
    aviso.style.cssText='background:#fff8e1;border:0.5px solid #ffe082;border-radius:8px;padding:9px 11px;margin-bottom:12px;font-size:11px;color:#854F0B;line-height:1.5;';
    list.parentNode.insertBefore(aviso,list);
  }
  const g=window._intlEditGasto;
  aviso.textContent=`Se eliminará el gasto original "${g.desc}" (${fmt(g.monto)}) y se crearán ${intlItems.length} gastos nuevos en su lugar.`;
  const btnConfirm=document.getElementById('btn-intl-confirmar');
  if(btnConfirm) btnConfirm.onclick=intlEditConfirmar;
  document.getElementById('ov-intl-confirm').classList.add('open');
}

async function intlEditConfirmar() {
  const g=window._intlEditGasto;
  const montoCLP=window._intlEditMontoCLP||0;
  const totalUSD=intlTotalUSD();
  const tc=totalUSD>0?Math.round(montoCLP/totalUSD):0;
  const fecha=g.fecha;
  const dateSerial=Math.round(new Date(fecha).getTime()/86400000)+25569;
  const banco=g.banco;
  const devStr=g.dev?'X':'';
  const rowIndex=g.rowIndex;
  const count=intlItems.length;

  const btn=document.getElementById('btn-intl-confirmar');
  btn.disabled=true; btn.textContent='Guardando...';

  try{
    const clps=intlItems.map(item=>Math.round((parseFloat(item.usd)||0)/totalUSD*montoCLP));
    const sumaClps=clps.reduce((s,c)=>s+c,0);
    clps[clps.length-1]+=montoCLP-sumaClps;

    const rows=intlItems.map((item,i)=>{
      const N=rowIndex+i;
      const usd=parseFloat(item.usd)||0;
      const descripcion=`Pago Tarjeta Internacional - ${item.desc} (USD ${usd.toFixed(2)} @ $${tc.toLocaleString('es-CL')}/USD)`;
      return [
        dateSerial,
        `=IF(A${N}<>"";CONCATENATE(IF(MONTH(A${N})<10;CONCATENATE("0";MONTH(A${N}));MONTH(A${N}));"-";YEAR(A${N}));"")`,
        item.sub,
        `=IFERROR(VLOOKUP(C${N};'Parámetros'!A:B;2;FALSE);"")`,
        `=IF(G${N}<>"X";IFERROR(VLOOKUP(C${N};'Parámetros'!A:C;3;FALSE);"");IF(IFERROR(VLOOKUP(C${N};'Parámetros'!A:C;3;FALSE);"")="E";"I";"E"))`,
        banco,
        devStr,
        descripcion,
        clps[i],
        `=IF(I${N}<>"";IF(E${N}="I";IF(I${N}>0;I${N};I${N}*-1);IF(E${N}="E";IF(I${N}<0;I${N};I${N}*-1)));0)`,
        `=SUMIFS(Presupuesto!D:D;Presupuesto!A:A;B${N};Presupuesto!B:B;C${N})`
      ];
    });

    const res=await fetch('/api/gastos/distribuir',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({rowIndex,rows})
    });
    if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}

    cerrar('ov-intl-confirm'); cerrar('ov-intl-dist');
    window._intlEditMode=false; window._intlEditGasto=null; window._intlEditMontoCLP=0;
    intlItems=[]; intlNextId=0;
    const aviso=document.getElementById('intl-confirm-aviso');
    if(aviso) aviso.remove();

    mostrarToast(`${count} gastos internacionales guardados en fila ${rowIndex} ✓`);
    await cargarDatos();
    const sa=document.querySelector('.screen.active')?.id;
    if(sa==='screen-detalle') renderDetalle();
    if(sa==='screen-dashboard') renderDashboard();
    if(sa==='screen-home') renderHome();
  }catch(e){
    mostrarToast('Error al distribuir: '+e.message);
  }finally{
    btn.disabled=false; btn.textContent='Confirmar y guardar todos';
  }
}

const meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const mesesC=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const catColores={'Hogar':'#1a73e8','Supermercado':'#2e7d32','Auto':'#e65100','Banco':'#c62828','Salud':'#6a1b9a','Cuentas':'#00695c','Entretenimiento':'#f57f17','Mall':'#bf360c','Ingresos':'#2e7d32'};
const catBgs={'Hogar':'#e8f0fe','Supermercado':'#e8f5e9','Auto':'#fff3e0','Banco':'#fce4ec','Salud':'#f3e5f5','Cuentas':'#e0f7fa','Entretenimiento':'#fff8e1','Mall':'#fbe9e7','Ingresos':'#e8f5e9'};

let subcats=[];
let montoInicialTC=0;

let pptoData={};
let presupuestoAllRows=[];
let pptoSubcats=[];

let dashData={};
let detalleData={};
// Estado
let adminEditandoSubcat=null;
let adminEditandoCat=null;
let adminCatParaAgregar=null;
let adminFilter='todas';
let totalFilasGastos=0;
let dashMes=3,dashAnio=2026,pptoPanelMes=3,pptoPanelAnio=2026;
const _hoyRango=new Date(),_mesActualRango=_hoyRango.getMonth(),_anioActualRango=_hoyRango.getFullYear();
let rangoDesde={mes:_mesActualRango===0?11:_mesActualRango-1,anio:_mesActualRango===0?_anioActualRango-1:_anioActualRango};
let rangoHasta={mes:_mesActualRango===11?0:_mesActualRango+1,anio:_mesActualRango===11?_anioActualRango+1:_anioActualRango};
let listaOpen=false,alcancePendiente=null;
let gastoActual=null,modoEdicion=false,gastoEditandoRowIndex=null;
let duplicadoPendiente=null;
let _skipDuplicadoCheck=false;
let modoSeleccion=false;
let gastosSeleccionados=new Set();
let detFiltros={tipo:'todos',cats:[],banco:'todos',orden:'reciente'};
let dashSortAsc=false;
let pptoSortAsc=false;
let catPptoPendiente=null;
let catAlcancePendiente=null;
const EXCLUDED_CATS=['Ahorro en Cuenta Vista','Pago Tarjeta Crédito Limited Visa'];


let valMes=3,valAnio=2026;
let valFiltroEstado='todos';
let valFiltroCategoria='todos';
let valFiltroMedio='todos';
let valFiltrosPanelAbierto=false;

let ultimoGastoGuardado=null;

let divParts=[];
let divEditIdx=null;

function fmt(n){return '$'+Math.round(Math.abs(n)).toLocaleString('es-CL');}
function getStatus(p){return p>=100?'over':p>=80?'warning':'ok';}
function bloquearScrollFondo(){document.body.classList.add('sheet-open');document.body.style.overflowX='hidden';}
function desbloquearScrollFondo(){document.body.classList.remove('sheet-open');document.body.style.overflowX='';}
function cerrar(id){
  document.getElementById(id).classList.remove('open');
  const hayAbiertos=document.querySelectorAll('.overlay.open, .alcance-overlay.open').length>0;
  if(!hayAbiertos)desbloquearScrollFondo();
}

function mostrarToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2500);
}


// ── LOADING / ERROR ──────────────────────────────────────────
function mostrarLoading(msg){
  const el=document.getElementById('loading-overlay');
  if(el){el.style.display='flex';document.getElementById('loading-text').textContent=msg||'Cargando...';}
  const er=document.getElementById('error-overlay');if(er)er.style.display='none';
}
function ocultarLoading(){const el=document.getElementById('loading-overlay');if(el)el.style.display='none';}

function bloquearNavbar(){
  const nav=document.querySelector('.navbar');
  if(nav) nav.classList.add('navbar-disabled');
}
function desbloquearNavbar(){
  const nav=document.querySelector('.navbar');
  if(nav) nav.classList.remove('navbar-disabled');
}
function mostrarError(msg){
  const er=document.getElementById('error-overlay');
  if(er){er.style.display='flex';document.getElementById('error-text').textContent=msg;}
  const el=document.getElementById('loading-overlay');if(el)el.style.display='none';
}

// ── PARSEO MONTO ─────────────────────────────────────────────
function parseMonto(val){
  if(val===undefined||val===null||val==='')return NaN;
  const s=String(val).replace(/\$/g,'').replace(/\s/g,'').replace(/\./g,'').replace(',','.');
  return parseFloat(s);
}

// ── FECHA ────────────────────────────────────────────────────
function normalizarFecha(val){
  if(!val)return '';
  const s=String(val).trim();
  if(/^\d{4}-\d{2}-\d{2}$/.test(s))return s;
  if(/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)){const[d,m,y]=s.split('/');return y+'-'+m.padStart(2,'0')+'-'+d.padStart(2,'0');}
  if(!isNaN(s)&&s!==''){const d=new Date(Math.round((parseFloat(s)-25569)*86400000));return d.toISOString().slice(0,10);}
  return s;
}
function calcMesAnio(fecha){if(!fecha||fecha.length<7)return '';const[y,m]=fecha.split('-');return m+'-'+y;}

// ── PRESUPUESTO POR MES ──────────────────────────────────────
function deduplicarPresupuesto(rows){
  const map=new Map();
  rows.forEach(r=>{
    if(!r||!r[0]||!r[1])return;
    const p=String(r[0]).trim();
    const match=p.match(/^(\d{1,2})-(\d{4})$/);
    const periodoNorm=match?match[1].padStart(2,'0')+'-'+match[2]:p;
    const sub=String(r[1]).trim();
    const key=periodoNorm+'||'+sub;
    map.set(key,[periodoNorm,sub,(r[2]||'').trim(),Number(r[3])||0]);
  });
  return Array.from(map.values());
}

function buildPptoForMonth(mes,anio){
  const key=String(mes+1).padStart(2,'0')+'-'+anio;
  const rows=presupuestoAllRows.filter(r=>r&&(r[0]||'').trim()===key);
  pptoData={};
  rows.forEach(r=>{
    const sub=(r[1]||'').trim();
    const monto=parseMonto(r[3]);
    if(!sub)return;
    pptoData[sub]={monto:isNaN(monto)?0:monto,fijo:false};
  });
  pptoSubcats=subcats.filter(s=>s.ie==='E');
}

// ── CARGA DE DATOS ───────────────────────────────────────────
async function cargarDatos(){
  const screenActual=document.querySelector('.screen.active')?.id;
  if(screenActual!=='screen-home') mostrarLoading('Cargando datos...');
  bloquearNavbar();
  try{
    const[paramRes,gastosRes,pptoRes]=await Promise.all([
      fetch('/api/parametros'),fetch('/api/gastos'),fetch('/api/presupuesto')
    ]);
    if(!paramRes.ok)throw new Error('Error al cargar parámetros ('+paramRes.status+')');
    if(!gastosRes.ok)throw new Error('Error al cargar gastos ('+gastosRes.status+')');
    if(!pptoRes.ok)throw new Error('Error al cargar presupuesto ('+pptoRes.status+')');
    const paramData=await paramRes.json();
    const gastosRows=await gastosRes.json();
    const pptoRows=await pptoRes.json();

    const paramRows=Array.isArray(paramData)?paramData:(paramData.rows||[]);
    montoInicialTC=Array.isArray(paramData)?0:(paramData.montoInicialTC||0);

    subcats=paramRows.slice(1).filter(r=>r&&r[0]).map(r=>({sub:r[0],cat:r[1]||'',ie:r[2]||'E',modo:r[3]||'',estado:r[4]||'',frecuencia:r[5]||''}));
    presupuestoAllRows=pptoRows.slice(1).filter(r=>r&&r[0]);
    buildPptoForMonth(pptoPanelMes,pptoPanelAnio);

    detalleData={};
    totalFilasGastos=Math.max(0,(gastosRows.length||1)-1);
    gastosRows.slice(1).forEach((row,idx)=>{
      if(!row||!row[0])return;
      const fecha=normalizarFecha(row[0]);
      const mesAnio=row[1]||calcMesAnio(fecha);
      if(!mesAnio)return;
      const mv=parseMonto(row[9]),mr=parseMonto(row[8]);
      const monto=Math.abs(!isNaN(mv)&&mv!==0?mv:(!isNaN(mr)?mr:0));
      const ie=(row[4]||'E').trim();
      const banco=(row[5]||'').trim();
      const g={id:idx+1,rowIndex:idx+2,fecha,sub:(row[2]||'').trim(),cat:(row[3]||'').trim(),ie,
               banco,dev:(row[6]||'')==='X',desc:row[7]||'',monto,
               montoValido:(!isNaN(mv)&&mv!==0?mv:(!isNaN(mr)?mr:0))};
      if(!detalleData[mesAnio])detalleData[mesAnio]=[];
      detalleData[mesAnio].push(g);
    });

    dashData=computarDashData();
    await cargarCuotas();
    desbloquearNavbar();
    ocultarLoading();
    renderHome();
  }catch(e){
    desbloquearNavbar();
    mostrarError('No se pudo conectar con Google Sheets.\n'+e.message);
  }
}

function computarDashData(){
  const result={};
  for(const[key,gastos]of Object.entries(detalleData)){
    const ingresos=gastos.filter(g=>g.ie==='I').reduce((s,g)=>s+g.monto,0);
    const catMap={};
    gastos.filter(g=>g.ie==='E'&&!EXCLUDED_CATS.includes(g.cat)).forEach(g=>{
      if(!catMap[g.cat])catMap[g.cat]={nombre:g.cat,monto:0,ppto:0,gastos:[]};
      catMap[g.cat].monto+=g.monto;
      const fd=g.fecha.length>=10?g.fecha.slice(8,10)+'/'+g.fecha.slice(5,7):g.fecha;
      catMap[g.cat].gastos.push({id:g.id,desc:g.desc,sub:g.sub,fecha:fd,monto:g.monto});
    });
    Object.values(catMap).forEach(c=>{
      c.ppto=subcats.filter(s=>s.cat===c.nombre&&s.ie==='E')
        .reduce((s,sc)=>{const k=sc.sub.trim();return s+(pptoData[k]?pptoData[k].monto:0);},0);
    });
    const totalPpto=pptoSubcats.filter(s=>!EXCLUDED_CATS.includes(s.cat))
      .reduce((s,sc)=>s+(pptoData[sc.sub]?pptoData[sc.sub].monto:0),0);
    result[key]={ingresos,presupuesto:totalPpto,categorias:Object.values(catMap)};
  }
  return result;
}


// ── DRAWER ──────────────────────────────────────────────
function abrirDrawer(){
  document.getElementById('drawer').classList.add('open');
  document.getElementById('drawer-overlay').classList.add('open');
  document.getElementById('btn-add-nav').style.display='none';
}
function cerrarDrawer(){
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawer-overlay').classList.remove('open');
  document.getElementById('btn-add-nav').style.display='flex';
}

// ── NAVEGACIÓN ──────────────────────────────────────────
const screenTitles={home:'Home',dashboard:'Resumen',detalle:'Detalle',presupuesto:'Presupuestos',admin:'Categorías',validacion:'Validación Pagos',cuotas:'Pagos en Cuotas TC','historial-cuad':'Historial Cuadraturas'};
function switchScreen(screen){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+screen).classList.add('active');
  document.querySelectorAll('.nav-link,.drawer-link').forEach(l=>{
    l.classList.toggle('active',l.dataset.screen===screen);
  });
  const titleEl=document.getElementById('navbar-title');
  if(titleEl) titleEl.innerHTML=`<span class="brand-prefix">Gastos FWV</span> - ${screenTitles[screen]||screen}`;
  document.title='Gastos FWV — FWV App';
  if(screen==='dashboard') renderDashboard();
  if(screen==='presupuesto') renderPresupuesto();
  if(screen==='admin') renderAdmin();
  if(screen==='detalle') renderDetalle();
  if(screen==='home') renderHome();
  if(screen==='validacion') renderValidacion();
  if(screen==='cuotas') { cargarCuotas().then(()=>renderCuotas()); }
  if(screen==='historial-cuad') { cargarHistorialCuad(); }
  const btnEye=document.getElementById('btn-eye-all');
  if(btnEye) btnEye.style.display=screen==='home'?'flex':'none';
  window.scrollTo(0,0);
}

function abrirNuevoGasto(){
  modoEdicion=false; gastoEditandoRowIndex=null;
  intlReset();
  document.querySelector('#ov-nuevo .sheet-title').textContent='Nuevo gasto';
  document.getElementById('btn-guardar').textContent='Guardar gasto';
  document.getElementById('f-fecha').valueAsDate=new Date();
  document.getElementById('f-subcat').value='';
  document.getElementById('f-desc').value='';
  document.getElementById('f-monto').value='';
  document.getElementById('f-cat-badge').style.display='none';
  document.getElementById('dev-toggle').classList.remove('active');
  document.getElementById('dev-hint').textContent='marcar con X';
  document.getElementById('f-suggestions').style.display='none';
  document.querySelectorAll('.banco-btn').forEach(b=>b.classList.remove('active'));
  const tcBtn=document.querySelector('.banco-btn[data-banco="Tarjeta Crédito"]');
  if(tcBtn) tcBtn.classList.add('active');
  document.getElementById('ov-nuevo').classList.add('open');
  bloquearScrollFondo();
}

// ── DASHBOARD ───────────────────────────────────────────
function renderDashboard(){
  const key=`${String(dashMes+1).padStart(2,'0')}-${dashAnio}`;
  document.getElementById('dash-mes').textContent=`${meses[dashMes]} ${dashAnio}`;
  const d=dashData[key]||{ingresos:0,presupuesto:0,categorias:[]};
  const totalE=d.categorias.reduce((s,c)=>s+c.monto,0);
  const bal=d.ingresos-totalE;
  const catsConAmbos=d.categorias.filter(c=>c.ppto>0&&c.monto>0);
  const libre=catsConAmbos.reduce((s,c)=>s+c.ppto,0)-catsConAmbos.reduce((s,c)=>s+c.monto,0);

  // Fila 1
  document.getElementById('d-ing').textContent=fmt(d.ingresos);
  document.getElementById('d-egr').textContent=fmt(totalE);
  const balEl=document.getElementById('d-bal');
  balEl.textContent=`Balance: ${fmt(bal)}`;
  balEl.style.color=bal>=0?'#2e7d32':'#c62828';
  document.getElementById('d-ppto').textContent=fmt(d.presupuesto);
  const libreEl=document.getElementById('d-libre');
  libreEl.textContent=libre>=0?`$${Math.round(libre).toLocaleString('es-CL')} libre`:`$${Math.round(Math.abs(libre)).toLocaleString('es-CL')} sobre`;
  libreEl.style.color=libre>=0?'#2e7d32':'#b71c1c';

  // Fila 2 — ahorro mes actual
  const gastosMes=detalleData[key]||[];
  const ahorro=gastosMes.filter(g=>g.cat==='Ahorro en Cuenta Vista').reduce((s,g)=>s+g.monto,0);
  document.getElementById('d-ahorro').textContent=fmt(ahorro);

  // Fila 2 — pago TC mes anterior
  const prevMes=dashMes===0?11:dashMes-1;
  const prevAnio=dashMes===0?dashAnio-1:dashAnio;
  const prevKey=`${String(prevMes+1).padStart(2,'0')}-${prevAnio}`;
  const gastosPrev=detalleData[prevKey]||[];
  const pagoTC=gastosPrev.filter(g=>g.cat==='Pago Tarjeta Crédito Limited Visa').reduce((s,g)=>s+g.monto,0);
  document.getElementById('d-tc').textContent=fmt(pagoTC);
  document.getElementById('d-tc-mes').textContent=`${meses[prevMes]} ${prevAnio}`;

  // Cat list con búsqueda y orden
  const q=(document.getElementById('dash-cat-search')?.value||'').toLowerCase().trim();
  let cats=d.categorias.filter(c=>c.monto>0||c.ppto>0);
  if(q) cats=cats.filter(c=>c.nombre.toLowerCase().includes(q));
  cats=dashSortAsc?[...cats].sort((a,b)=>a.monto-b.monto):[...cats].sort((a,b)=>b.monto-a.monto);

  document.getElementById('cat-list').innerHTML=cats.map(c=>{
    const origIdx=d.categorias.indexOf(c);
    const rawPct=c.ppto>0?Math.round((c.monto/c.ppto)*100):0;
    const status=c.ppto>0?getStatus(rawPct):'ok';
    const catSafe=c.nombre.replace(/'/g,"\\'");
    const accion=rawPct>=100?'✓ presupuesto cumplido':rawPct>=80?'⚡ cerca del límite':'';
    return `<div class="cat-card" onclick="abrirCat(${origIdx},'${key}')">
      <div class="cat-card-row">
        <div class="cat-icon" style="background:${catBgs[c.nombre]||'#f5f5f5'};color:${catColores[c.nombre]||'#666'}">${c.nombre.charAt(0)}</div>
        <div class="cat-info"><div class="cat-nombre">${c.nombre}</div><div class="cat-ppto-txt">Ppto: ${fmt(c.ppto)}</div></div>
        <div class="cat-monto ${status}">${fmt(c.monto)}</div>
      </div>
      <div class="bar-wrap"><div class="bar-fill ${status}" style="width:${Math.min(rawPct,100)}%;"></div></div>
      <div class="ppto-row"><span class="ppto-pct ${status}">${c.ppto>0?rawPct+'% usado':''}</span><span class="ppto-label">${accion}</span></div>
    </div>`;
  }).join('');
}

document.getElementById('f-desc').addEventListener('focus',function(){
  setTimeout(()=>{this.scrollIntoView({behavior:'smooth',block:'center'});},400);
});
document.getElementById('f-monto').addEventListener('focus',function(){
  setTimeout(()=>{this.scrollIntoView({behavior:'smooth',block:'center'});},400);
});

// Dashboard buscar / orden
document.getElementById('dash-cat-search').addEventListener('input',renderDashboard);
document.getElementById('dash-sort-btn').addEventListener('click',()=>{dashSortAsc=!dashSortAsc;renderDashboard();});

function abrirCat(i,key){
  const c=dashData[key].categorias[i];
  document.getElementById('cat-sheet-title').textContent=c.nombre;

  const subcatsCat=[...pptoSubcats.filter(s=>s.cat===c.nombre)].sort((a,b)=>(pptoData[b.sub.trim()]?.monto||0)-(pptoData[a.sub.trim()]?.monto||0));
  const ppto=subcatsCat.reduce((s,sc)=>s+(pptoData[sc.sub.trim()]?.monto||0),0);
  const rawPct=ppto>0?Math.round((c.monto/ppto)*100):0;
  const status=ppto>0?getStatus(rawPct):'ok';
  const multiples=subcatsCat.length>1;
  const catSafe=c.nombre.replace(/'/g,"\\'");
  const realPorSub={};
  c.gastos.forEach(g=>{realPorSub[g.sub]=(realPorSub[g.sub]||0)+g.monto;});
  const headerLabel=ppto>0
    ?`<span style="font-weight:500;font-size:13px;">Presupuesto</span><span class="ppto-pct ${status}" style="margin-left:8px;">${rawPct}% usado</span>`
    :`<span style="font-weight:500;font-size:13px;">Presupuesto</span><span style="margin-left:8px;font-size:12px;color:#999;">Sin presupuesto</span><span style="margin-left:6px;font-size:12px;color:#1a73e8;font-weight:500;cursor:pointer;" onclick="event.stopPropagation();document.getElementById('cat-ppto-detalle').style.display='block';document.getElementById('cat-ppto-detalle').previousElementSibling.querySelector('.cat-ppto-chevron').textContent='▲';">+ Agregar</span>`;
  const resumenEl=document.getElementById('cat-ppto-resumen');
  resumenEl.innerHTML=`
    <div style="margin-bottom:8px;">
      <div onclick="const d=document.getElementById('cat-ppto-detalle');const open=d.style.display==='none'||d.style.display==='';d.style.display=open?'block':'none';this.querySelector('.cat-ppto-chevron').textContent=open?'▲':'▼';"
        style="display:flex;align-items:center;background:#f5f5f5;border-radius:8px;padding:10px 12px;cursor:pointer;user-select:none;">
        ${headerLabel}
        <span class="cat-ppto-chevron" style="margin-left:auto;font-size:11px;color:#888;">▼</span>
      </div>
      <div id="cat-ppto-detalle" style="display:none;padding:12px;border:0.5px solid #e8e8e8;border-radius:8px;margin-top:4px;margin-bottom:12px;">
        <div style="display:flex;justify-content:space-between;align-items:baseline;margin-bottom:6px;">
          <span style="font-size:13px;color:#555;">Gastado: <strong>${fmt(c.monto)}</strong></span>
          <span style="font-size:13px;color:#555;">Ppto: <strong>${fmt(ppto)}</strong></span>
        </div>
        <div class="bar-wrap"><div class="bar-fill ${status}" style="width:${Math.min(rawPct,100)}%;"></div></div>
        <div style="margin-top:4px;margin-bottom:${multiples?'10':'4'}px;">
          <span class="ppto-pct ${status}">${ppto>0?rawPct+'% usado':''}</span>
        </div>
        ${multiples?`
        <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:10px;">
          ${subcatsCat.map(sc=>{
            const label=sc.sub.includes(' - ')?sc.sub.split(' - ').slice(1).join(' - '):sc.sub;
            const val=pptoData[sc.sub.trim()]?.monto||0;
            const real=realPorSub[sc.sub]||0;
            const scPct=val>0?Math.round((real/val)*100):0;
            const scStatus=val>0?getStatus(scPct):'ok';
            return `<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;">
              <span style="font-size:12px;color:#666;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${label}</span>
              <div style="display:flex;flex-direction:column;align-items:flex-end;gap:2px;flex-shrink:0;">
                <div class="ppto-monto-wrap"><span class="ppto-monto-prefix">$</span>
                  <input class="ppto-monto-input" type="number" value="${val}" min="0" data-sub="${sc.sub}" style="width:90px;" />
                </div>
                <span style="font-size:10px;color:${{ok:'#1a73e8',warning:'#e65100',over:'#b71c1c'}[scStatus]||'#888'};">Real: ${fmt(real)}${val>0?' ('+scPct+'%)':''}</span>
              </div>
            </div>`;
          }).join('')}
        </div>`:
        `<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px;">
          <span style="font-size:12px;color:#666;">${subcatsCat[0]?.sub.includes(' - ')?subcatsCat[0].sub.split(' - ').slice(1).join(' - '):subcatsCat[0]?.sub||''}</span>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:2px;flex-shrink:0;">
            <div class="ppto-monto-wrap"><span class="ppto-monto-prefix">$</span>
              <input class="ppto-monto-input" type="number" value="${ppto}" min="0" data-sub="${subcatsCat[0]?.sub||''}" style="width:90px;" />
            </div>
            ${(()=>{const real=realPorSub[subcatsCat[0]?.sub]||0;const scPct=ppto>0?Math.round((real/ppto)*100):0;const scStatus=ppto>0?getStatus(scPct):'ok';return `<span style="font-size:10px;color:${{ok:'#1a73e8',warning:'#e65100',over:'#b71c1c'}[scStatus]||'#888'};">Real: ${fmt(real)}${ppto>0?' ('+scPct+'%)':''}</span>`;})()}
          </div>
        </div>`}
        ${subcatsCat.length?`<button onclick="guardarPptoDesdeCat('${catSafe}',${i},'${key}')" style="width:100%;padding:10px;background:#111;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;">Guardar cambios</button>`:''}
      </div>
    </div>`;

  document.getElementById('cat-sheet-items').innerHTML=[...c.gastos].sort((a,b)=>b.monto-a.monto).map(g=>`
    <div class="gasto-item" onclick="abrirGastoById(${g.id})">
      <div class="gasto-info"><div class="gasto-desc">${g.desc}</div><div class="gasto-meta">${g.sub?g.sub.includes(' - ')?g.sub.split(' - ').slice(1).join(' - '):g.sub:''}${g.sub&&g.fecha?' · ':''}${g.fecha}</div></div>
      <div class="gasto-monto e">- ${fmt(g.monto)}</div>
    </div>`).join('');
  document.getElementById('ov-cat').classList.add('open');
  bloquearScrollFondo();
}

function guardarPptoDesdeCat(cat,catIdx,key){
  const inputs=document.querySelectorAll('#cat-ppto-resumen [data-sub]');
  const entries=[];
  inputs.forEach(input=>{
    const sub=input.dataset.sub;
    if(!sub)return;
    entries.push({sub,monto:parseInt(input.value)||0});
  });
  catAlcancePendiente={cat,catIdx,key,entries,mes:dashMes,anio:dashAnio};
  const label=entries.length===1
    ?(entries[0].sub.includes(' - ')?entries[0].sub.split(' - ').slice(1).join(' - '):entries[0].sub)+' → '+fmt(entries[0].monto)
    :`${cat} — ${entries.length} subcategorías`;
  document.getElementById('alcance-sub').textContent=label;
  document.getElementById('alcance-mes-label').textContent=`${meses[dashMes]} ${dashAnio}`;
  document.getElementById('ov-alcance').classList.add('open');
  bloquearScrollFondo();
}

document.getElementById('dash-prev').addEventListener('click',()=>{dashMes--;if(dashMes<0){dashMes=11;dashAnio--;}renderDashboard();});
document.getElementById('dash-next').addEventListener('click',()=>{dashMes++;if(dashMes>11){dashMes=0;dashAnio++;}renderDashboard();});
document.getElementById('ov-cat').addEventListener('click',e=>{if(e.target===document.getElementById('ov-cat'))cerrar('ov-cat');});

// ── DETALLE ─────────────────────────────────────────────
function getTodosRango(){
  const r=[];let m=rangoDesde.mes,a=rangoDesde.anio;
  while(a<rangoHasta.anio||(a===rangoHasta.anio&&m<=rangoHasta.mes)){
    const k=`${String(m+1).padStart(2,'0')}-${a}`;
    if(detalleData[k])r.push(...detalleData[k]);
    m++;if(m>11){m=0;a++;}
  }
  return r;
}
function actualizarRangoLabel(){
  const d=`${mesesC[rangoDesde.mes]} ${rangoDesde.anio}`,h=`${mesesC[rangoHasta.mes]} ${rangoHasta.anio}`;
  document.getElementById('rango-label').textContent=d===h?d:`${d} — ${h}`;
}
function getDiaLabel(f){
  const hoy=new Date();hoy.setHours(0,0,0,0);
  const ayer=new Date(hoy);ayer.setDate(ayer.getDate()-1);
  const fd=new Date(f+'T00:00:00');
  if(fd.getTime()===hoy.getTime())return 'Hoy';
  if(fd.getTime()===ayer.getTime())return 'Ayer';
  const multiAnio=rangoDesde.anio!==rangoHasta.anio;return `${fd.getDate()} de ${meses[fd.getMonth()]}${multiAnio?' '+fd.getFullYear():''}`;
}
function renderDetalle(){
  actualizarRangoLabel();
  const todos=getTodosRango();
  renderDetFilterPanel(todos);
  const q=(document.getElementById('buscador')?.value||'').toLowerCase().trim();
  let fil=todos;
  if(q) fil=fil.filter(g=>g.desc.toLowerCase().includes(q)||g.cat.toLowerCase().includes(q)||g.sub.toLowerCase().includes(q));
  if(detFiltros.tipo==='egresos') fil=fil.filter(g=>g.ie==='E'&&!g.dev);
  else if(detFiltros.tipo==='ingresos') fil=fil.filter(g=>g.ie==='I');
  else if(detFiltros.tipo==='devolucion') fil=fil.filter(g=>g.dev);
  if(detFiltros.cats.length>0) fil=fil.filter(g=>detFiltros.cats.includes(g.cat));
  if(detFiltros.banco!=='todos'){
    const bMap={santander:'Santander',falabella:'Falabella',tc:'Tarjeta Crédito'};
    fil=fil.filter(g=>g.banco===bMap[detFiltros.banco]);
  }
  const orden=detFiltros.orden;
  if(orden==='reciente') fil=[...fil].sort((a,b)=>b.fecha.localeCompare(a.fecha)||b.id-a.id);
  else if(orden==='antiguo') fil=[...fil].sort((a,b)=>a.fecha.localeCompare(b.fecha)||a.id-b.id);
  else if(orden==='mayor') fil=[...fil].sort((a,b)=>b.monto-a.monto);
  else if(orden==='menor') fil=[...fil].sort((a,b)=>a.monto-b.monto);
  const pill=document.getElementById('det-orden-pill');
  if(pill){const lbls={reciente:'Reciente',antiguo:'Antiguo',mayor:'Mayor $',menor:'Menor $'};pill.textContent=lbls[orden]||'Reciente';}
  const ingresos=fil.filter(g=>g.ie==='I').reduce((s,g)=>s+g.monto,0);
  const egresos=fil.filter(g=>g.ie==='E').reduce((s,g)=>s+g.monto,0);
  const egresoReal=fil.filter(g=>g.ie==='E'&&!EXCLUDED_CATS.includes(g.cat)).reduce((s,g)=>s+g.monto,0);
  document.getElementById('s-i').textContent=fmt(ingresos);
  document.getElementById('s-e').textContent=fmt(egresos);
  document.getElementById('s-e-real').textContent=fmt(egresoReal);
  document.getElementById('s-n').textContent=fil.length;
  if(!fil.length){document.getElementById('lista').innerHTML=`<div class="empty">${q?'Sin resultados':'Sin gastos registrados'}</div>`;return;}
  const agrupar=orden==='reciente'||orden==='antiguo';
  const grupos={};
  fil.forEach(g=>{const l=agrupar?getDiaLabel(g.fecha):'_';if(!grupos[l])grupos[l]=[];grupos[l].push(g);});
  document.getElementById('lista').innerHTML=Object.entries(grupos).map(([dia,items])=>{
    const tot=items.reduce((s,g)=>g.ie==='E'?s-g.monto:s+g.monto,0);
    return `<div class="dia-grupo">
      ${dia!=='_'?`<div class="dia-label">${dia}<span class="dia-total">${(tot>=0?'+':'')+fmt(tot)}</span></div>`:''}
      ${items.map(g=>{
        const esSel=gastosSeleccionados.has(g.rowIndex);
        const checkboxHTML=modoSeleccion?`<div class="gasto-checkbox" style="width:20px;height:20px;border-radius:4px;border:1.5px solid ${esSel?'#1a73e8':'#ccc'};background:${esSel?'#1a73e8':'#fff'};display:flex;align-items:center;justify-content:center;flex-shrink:0;">${esSel?'<svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 5l2.5 2.5 4.5-5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>':''}</div>`:'';
        const itemStyle=modoSeleccion&&esSel?'border:1.5px solid #1a73e8;background:#f0f6ff;':'';
        const onclick=modoSeleccion?`toggleItemSeleccion(${g.rowIndex})`:`abrirGasto(${g.id})`;
        return `
        <div class="gasto-item${modoSeleccion?' gasto-item-sel':''}" data-rowindex="${g.rowIndex}" onclick="${onclick}" style="${itemStyle}">
          ${checkboxHTML}
          <div class="gasto-info">
            <div class="gasto-desc">${g.desc}</div>
            <div class="gasto-meta"><span>${g.sub}</span>${g.dev?'<span class="gasto-dev">devolución</span>':''}</div>
            <div class="gasto-meta" style="margin-top:3px;"><span class="gasto-banco ${g.banco==='Santander'?'santander':g.banco==='Falabella'?'falabella':'tc'}">${g.banco}</span></div>
          </div>
          <div class="gasto-monto ${g.ie.toLowerCase()}">${g.ie==='E'?'-':'+'} ${fmt(g.monto)}</div>
        </div>`;
      }).join('')}
    </div>`;
  }).join('');
}

function renderDetFilterPanel(todos){
  const panel=document.getElementById('det-filter-panel');
  if(!panel||panel.style.display==='none')return;
  const cats=[...new Set(todos.map(g=>g.cat).filter(Boolean))].sort();
  const chip=(val,activo,label,fn)=>`<button onclick="${fn}" style="padding:5px 12px;border-radius:16px;font-size:12px;border:0.5px solid ${activo?'#1a73e8':'#e0e0e0'};background:${activo?'#e8f0fe':'#fff'};color:${activo?'#1a73e8':'#555'};cursor:pointer;font-family:inherit;">${label}</button>`;
  const seccion=(titulo,chips)=>`<div style="margin-bottom:10px;"><div style="font-size:10px;color:#888;font-weight:500;letter-spacing:0.06em;margin-bottom:6px;">${titulo}</div><div style="display:flex;flex-wrap:wrap;gap:6px;">${chips}</div></div>`;
  panel.innerHTML=
    seccion('TIPO',
      ['todos','egresos','ingresos','devolucion'].map(t=>chip(t,detFiltros.tipo===t,{todos:'Todos',egresos:'Egresos',ingresos:'Ingresos',devolucion:'Devolución'}[t],`setDetFiltro('tipo','${t}')`)).join('')
    )+
    seccion('CATEGORÍA',
      cats.map(c=>{const cs=c.replace(/'/g,"\\'");return chip(c,detFiltros.cats.includes(c),c,`toggleDetCat('${cs}')`)}).join('')
    )+
    seccion('BANCO',
      ['todos','santander','falabella','tc'].map(b=>chip(b,detFiltros.banco===b,{todos:'Todos',santander:'Santander',falabella:'Falabella',tc:'Tarjeta Crédito'}[b],`setDetFiltro('banco','${b}')`)).join('')
    )+
    `<div style="display:flex;gap:8px;margin-top:2px;">
      <button onclick="limpiarDetFiltros()" style="flex:1;padding:10px;background:#f5f5f5;color:#666;border:none;border-radius:8px;font-size:14px;cursor:pointer;font-family:inherit;">Limpiar filtros</button>
      <button onclick="aplicarDetFiltros()" style="flex:2;padding:10px;background:#111;color:#fff;border:none;border-radius:8px;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;">Aplicar filtros</button>
    </div>`;
}
function setDetFiltro(key,val){detFiltros[key]=val;renderDetFilterPanel(getTodosRango());}
function toggleDetCat(cat){const idx=detFiltros.cats.indexOf(cat);if(idx>=0)detFiltros.cats.splice(idx,1);else detFiltros.cats.push(cat);renderDetFilterPanel(getTodosRango());}
function aplicarDetFiltros(){document.getElementById('det-filter-panel').style.display='none';renderDetalle();}
function limpiarDetFiltros(){detFiltros={tipo:'todos',cats:[],banco:'todos',orden:detFiltros.orden};renderDetFilterPanel(getTodosRango());}

function toggleModoSeleccion(){
  modoSeleccion=!modoSeleccion;
  gastosSeleccionados.clear();
  const bar=document.getElementById('selection-bar');
  const btn=document.getElementById('btn-modo-seleccion');
  if(modoSeleccion){
    bar.style.display='flex';
    btn.style.background='#1a73e8';btn.style.color='#fff';btn.textContent='✓ Seleccionando';
  } else {
    bar.style.display='none';
    btn.style.background='#e8f0fe';btn.style.color='#1a73e8';btn.textContent='✓ Seleccionar';
  }
  renderDetalle();
}

function toggleItemSeleccion(rowIndex){
  if(!modoSeleccion)return;
  if(gastosSeleccionados.has(rowIndex))gastosSeleccionados.delete(rowIndex);
  else gastosSeleccionados.add(rowIndex);
  actualizarBarraSeleccion();
  document.querySelectorAll('.gasto-item-sel').forEach(el=>{
    const ri=parseInt(el.dataset.rowindex);
    const sel=gastosSeleccionados.has(ri);
    el.style.border=sel?'1.5px solid #1a73e8':'0.5px solid #e8e8e8';
    el.style.background=sel?'#f0f6ff':'#fff';
    const cb=el.querySelector('.gasto-checkbox');
    if(cb){
      cb.style.background=sel?'#1a73e8':'#fff';
      cb.style.borderColor=sel?'#1a73e8':'#ccc';
      cb.innerHTML=sel?'<svg width="10" height="10" viewBox="0 0 10 10"><path d="M1.5 5l2.5 2.5 4.5-5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>':'';
    }
  });
}

function toggleSeleccionTodos(){
  const todos=getTodosRango().map(g=>g.rowIndex);
  const todosSeleccionados=todos.every(ri=>gastosSeleccionados.has(ri));
  gastosSeleccionados.clear();
  if(!todosSeleccionados)todos.forEach(ri=>gastosSeleccionados.add(ri));
  actualizarBarraSeleccion();
  renderDetalle();
}

function actualizarBarraSeleccion(){
  const count=gastosSeleccionados.size;
  const total=getTodosRango().length;
  const label=document.getElementById('sel-count-label');
  if(label)label.textContent=count===0?'0 seleccionados':count===1?'1 seleccionado':`${count} seleccionados`;
  const btnCambiar=document.getElementById('btn-cambiar-fecha');
  if(btnCambiar)btnCambiar.style.opacity=count>0?'1':'0.4';
  const checkAll=document.getElementById('check-all-btn');
  if(checkAll){
    const allChecked=count===total&&total>0;
    checkAll.style.background=allChecked?'#1a73e8':'#fff';
    checkAll.innerHTML=allChecked?'<svg width="11" height="11" viewBox="0 0 10 10"><path d="M1.5 5l2.5 2.5 4.5-5" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>':'';
  }
}

function abrirModalCambioFecha(){
  if(gastosSeleccionados.size===0)return;
  const todosGastos=getTodosRango();
  const seleccionados=todosGastos.filter(g=>gastosSeleccionados.has(g.rowIndex));
  document.getElementById('cambio-fecha-sub').textContent=
    `${seleccionados.length} gasto${seleccionados.length!==1?'s':''} seleccionado${seleccionados.length!==1?'s':''}`;
  document.getElementById('cambio-fecha-preview').innerHTML=seleccionados.map((g,i,arr)=>`
    <div style="display:flex;justify-content:space-between;align-items:center;padding:5px 0;${i<arr.length-1?'border-bottom:0.5px solid #e8e8e8;':''}font-size:13px;">
      <span style="color:#111;flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${g.desc}</span>
      <span style="color:#999;font-size:12px;flex-shrink:0;margin-left:8px;">${g.fecha.slice(8,10)}/${g.fecha.slice(5,7)}/${g.fecha.slice(0,4)}</span>
    </div>`).join('');
  const hoy=new Date();
  const proximoMes=new Date(hoy.getFullYear(),hoy.getMonth()+1,1);
  document.getElementById('input-nueva-fecha').value=proximoMes.toISOString().slice(0,10);
  actualizarAvisoCambioFecha();
  document.getElementById('ov-cambio-fecha').classList.add('open');
  bloquearScrollFondo();
}

function actualizarAvisoCambioFecha(){
  const val=document.getElementById('input-nueva-fecha').value;
  if(!val)return;
  const d=new Date(val+'T00:00:00');
  const mesesNombres=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  document.getElementById('fecha-display-label').textContent=
    `${d.getDate()} de ${mesesNombres[d.getMonth()]} ${d.getFullYear()}`;
}

async function confirmarCambioFecha(){
  const val=document.getElementById('input-nueva-fecha').value;
  if(!val){mostrarToast('Selecciona una fecha');return;}
  const todosGastos=getTodosRango();
  const seleccionados=todosGastos.filter(g=>gastosSeleccionados.has(g.rowIndex));
  if(!seleccionados.length)return;
  const btn=document.querySelector('#ov-cambio-fecha button[onclick="confirmarCambioFecha()"]');
  if(btn){btn.disabled=true;btn.textContent='Guardando...';}
  const dateSerial=Math.round(new Date(val).getTime()/86400000)+25569;
  try{
    for(const g of seleccionados){
      const N=g.rowIndex;
      const fB=`=IF(A${N}<>"";CONCATENATE(IF(MONTH(A${N})<10;CONCATENATE("0";MONTH(A${N}));MONTH(A${N}));"-";YEAR(A${N}));"")`;
      const fD=`=IFERROR(VLOOKUP(C${N};'Parámetros'!A:B;2;FALSE);"")`;
      const fE=`=IF(G${N}<>"X";IFERROR(VLOOKUP(C${N};'Parámetros'!A:C;3;FALSE);"");IF(IFERROR(VLOOKUP(C${N};'Parámetros'!A:C;3;FALSE);"")="E";"I";"E"))`;
      const fJ=`=IF(I${N}<>"";IF(E${N}="I";IF(I${N}>0;I${N};I${N}*-1);IF(E${N}="E";IF(I${N}<0;I${N};I${N}*-1)));0)`;
      const fK=`=SUMIFS(Presupuesto!D:D;Presupuesto!A:A;B${N};Presupuesto!B:B;C${N})`;
      const row=[dateSerial,fB,g.sub,fD,fE,g.banco,g.dev?'X':'',g.desc,g.monto,fJ,fK];
      const res=await fetch('/api/gastos',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({rowIndex:g.rowIndex,row})});
      if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
    }
    const count=seleccionados.length;
    const d=new Date(val+'T00:00:00');
    const mesesC2=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    mostrarToast(`${count} gasto${count!==1?'s':''} movido${count!==1?'s':''} al ${d.getDate()} ${mesesC2[d.getMonth()]} ${d.getFullYear()} ✓`);
    cerrar('ov-cambio-fecha');
    toggleModoSeleccion();
    await cargarDatos();
    renderDetalle();
  } catch(e){
    mostrarToast('Error al guardar: '+e.message);
  } finally{
    if(btn){btn.disabled=false;btn.textContent='Confirmar cambio de fecha';}
  }
}

function _setDistribuirIntlBtn(){
  const btnDistIntl=document.getElementById('btn-distribuir-intl');
  if(btnDistIntl){
    const esIntl=gastoActual&&gastoActual.sub&&gastoActual.sub.trim()==='TC - Tarjeta Internacional';
    btnDistIntl.style.display=esIntl?'flex':'none';
  }
}
function abrirGasto(id){
  const g=getTodosRango().find(x=>x.id===id);if(!g)return;
  gastoActual=g;
  document.getElementById('g-desc').textContent=g.desc;
  document.getElementById('g-monto').textContent=(g.ie==='E'?'- ':'+ ')+fmt(g.monto);
  document.getElementById('ov-gasto-vista-a').style.display='block';
  document.getElementById('ov-gasto-vista-b').style.display='none';
  document.getElementById('ov-gasto').classList.add('open');
  _setDistribuirIntlBtn();
  bloquearScrollFondo();
}
function abrirGastoById(id){
  let g=null;
  for(const gastos of Object.values(detalleData)){g=gastos.find(x=>x.id===id);if(g)break;}
  if(!g)return;
  gastoActual=g;
  document.getElementById('g-desc').textContent=g.desc;
  document.getElementById('g-monto').textContent=(g.ie==='E'?'- ':'+ ')+fmt(g.monto);
  document.getElementById('ov-gasto-vista-a').style.display='block';
  document.getElementById('ov-gasto-vista-b').style.display='none';
  document.getElementById('ov-gasto').classList.add('open');
  _setDistribuirIntlBtn();
  bloquearScrollFondo();
}
document.getElementById('buscador').addEventListener('input',renderDetalle);
document.getElementById('det-orden-pill').addEventListener('click',()=>{
  const ciclo={reciente:'antiguo',antiguo:'mayor',mayor:'menor',menor:'reciente'};
  detFiltros.orden=ciclo[detFiltros.orden]||'reciente';
  renderDetalle();
});
document.getElementById('det-filtro-btn').addEventListener('click',()=>{
  const p=document.getElementById('det-filter-panel');
  const open=p.style.display==='none';
  p.style.display=open?'block':'none';
  if(open)renderDetFilterPanel(getTodosRango());
});
function presetRango(tipo){
  const hoy=new Date();
  const mesHoy=hoy.getMonth(),anioHoy=hoy.getFullYear();
  let desdeMes=mesHoy,desdeAnio=anioHoy,hastaMes=mesHoy,hastaAnio=anioHoy;
  if(tipo==='3m'){let m=mesHoy-2,a=anioHoy;if(m<0){m+=12;a-=1;}desdeMes=m;desdeAnio=a;}
  else if(tipo==='6m'){let m=mesHoy-5,a=anioHoy;if(m<0){m+=12;a-=1;}desdeMes=m;desdeAnio=a;}
  else if(tipo==='12m'){let m=mesHoy-11,a=anioHoy;if(m<0){m+=12;a-=1;}desdeMes=m;desdeAnio=a;}
  document.getElementById('p-desde-mes').value=desdeMes;
  document.getElementById('p-desde-anio').value=desdeAnio;
  document.getElementById('p-hasta-mes').value=hastaMes;
  document.getElementById('p-hasta-anio').value=hastaAnio;
}
document.getElementById('rango-btn').addEventListener('click',()=>{
  const anios=[2019,2020,2021,2022,2023,2024,2025,2026];
  ['p-desde-mes','p-hasta-mes'].forEach(id=>{document.getElementById(id).innerHTML=meses.map((m,i)=>`<option value="${i}">${m}</option>`).join('');});
  ['p-desde-anio','p-hasta-anio'].forEach(id=>{document.getElementById(id).innerHTML=anios.map(a=>`<option value="${a}">${a}</option>`).join('');});
  document.getElementById('p-desde-mes').value=rangoDesde.mes;document.getElementById('p-desde-anio').value=rangoDesde.anio;
  document.getElementById('p-hasta-mes').value=rangoHasta.mes;document.getElementById('p-hasta-anio').value=rangoHasta.anio;
  document.getElementById('ov-picker').classList.add('open');
  bloquearScrollFondo();
});
document.getElementById('picker-apply').addEventListener('click',()=>{
  rangoDesde={mes:parseInt(document.getElementById('p-desde-mes').value),anio:parseInt(document.getElementById('p-desde-anio').value)};
  rangoHasta={mes:parseInt(document.getElementById('p-hasta-mes').value),anio:parseInt(document.getElementById('p-hasta-anio').value)};
  if(rangoDesde.anio>rangoHasta.anio||(rangoDesde.anio===rangoHasta.anio&&rangoDesde.mes>rangoHasta.mes))rangoHasta={...rangoDesde};
  cerrar('ov-picker');renderDetalle();
});
document.getElementById('ov-gasto').addEventListener('click',e=>{
  if(e.target===document.getElementById('ov-gasto')){
    cerrar('ov-gasto');
    document.getElementById('ov-gasto-vista-a').style.display='block';
    document.getElementById('ov-gasto-vista-b').style.display='none';
  }
});
document.getElementById('ov-picker').addEventListener('click',e=>{if(e.target===document.getElementById('ov-picker'))cerrar('ov-picker');});
document.getElementById('ov-div-subcat').addEventListener('click',e=>{if(e.target===document.getElementById('ov-div-subcat'))cerrar('ov-div-subcat');});
document.querySelector('.btn-eliminar').addEventListener('click',async()=>{
  cerrar('ov-gasto');
  if(!confirm('¿Eliminar este gasto? Esta acción no se puede deshacer.'))return;
  mostrarLoading('Eliminando...');
  try{
    const res=await fetch('/api/gastos',{method:'DELETE',headers:{'Content-Type':'application/json'},body:JSON.stringify({rowIndex:gastoActual.rowIndex})});
    if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
    mostrarToast('Gasto eliminado \u2713');
    await cargarDatos();
    renderDetalle();
  }catch(e){
    ocultarLoading();
    mostrarToast('Error al eliminar: '+e.message);
  }
});
document.querySelector('.btn-editar').addEventListener('click',()=>{
  cerrar('ov-gasto');
  modoEdicion=true;
  gastoEditandoRowIndex=gastoActual.rowIndex;
  document.querySelector('#ov-nuevo .sheet-title').textContent='Editar gasto';
  document.getElementById('btn-guardar').textContent='Guardar cambios';
  document.getElementById('f-fecha').value=gastoActual.fecha;
  document.getElementById('f-subcat').value=gastoActual.sub;
  const subcatInfo=subcats.find(s=>s.sub===gastoActual.sub);
  const cat=subcatInfo?.cat||gastoActual.cat||'';
  const ie=subcatInfo?.ie||gastoActual.ie||'E';
  document.getElementById('f-cat-nombre').textContent=cat;
  const ieb=document.getElementById('f-ie-badge');
  ieb.textContent=ie==='E'?'Egreso':'Ingreso';
  ieb.className='ie-badge ie-'+ie;
  document.getElementById('f-cat-badge').style.display='block';
  document.querySelectorAll('.banco-btn').forEach(b=>{b.classList.toggle('active',b.dataset.banco===gastoActual.banco);});
  document.getElementById('f-desc').value=gastoActual.desc||'';
  document.getElementById('f-monto').value=gastoActual.monto||'';
  const devToggleEl=document.getElementById('dev-toggle');
  devToggleEl.classList.toggle('active',gastoActual.dev===true);
  document.getElementById('dev-hint').textContent=gastoActual.dev?'marcado como X':'marcar con X';
  document.getElementById('ov-nuevo').classList.add('open');
  bloquearScrollFondo();
});

// ── DIVIDIR GASTO ─────────────────────────────────────────
function abrirVistaDividir(){
  if(!gastoActual)return;
  divParts=[
    {sub:gastoActual.sub,cat:gastoActual.cat,color:catColores[gastoActual.cat]||'#999',monto:gastoActual.monto},
    {sub:'',cat:'',color:'#999',monto:0}
  ];
  document.getElementById('div-total-monto').textContent=fmt(gastoActual.monto);
  document.getElementById('div-total-sub').textContent=
    `${gastoActual.desc} · ${gastoActual.fecha.slice(8,10)}/${gastoActual.fecha.slice(5,7)}/${gastoActual.fecha.slice(0,4)} · ${gastoActual.banco}`;
  document.getElementById('ov-gasto-vista-a').style.display='none';
  document.getElementById('ov-gasto-vista-b').style.display='block';
  divRender();
}

function cerrarVistaDividir(){
  document.getElementById('ov-gasto-vista-b').style.display='none';
  document.getElementById('ov-gasto-vista-a').style.display='block';
}

function divRender(){
  if(!gastoActual)return;
  const TOTAL=gastoActual.monto;
  const asignado=divParts.reduce((s,p)=>s+p.monto,0);
  const resto=TOTAL-asignado;
  const pct=TOTAL>0?Math.min(Math.round((asignado/TOTAL)*100),100):0;

  const fill=document.getElementById('div-prog-fill');
  fill.style.width=pct+'%';
  fill.style.background=resto===0?'#2e7d32':resto<0?'#c62828':'#1a73e8';

  const restoEl=document.getElementById('div-resto-disp');
  restoEl.textContent=resto===0?'—':fmt(Math.abs(resto));
  restoEl.style.color=resto===0?'#bbb':resto<0?'#c62828':'#111';

  document.getElementById('div-asig-label').textContent=
    resto<0?'Excede el total':pct+'% distribuido';
  const av=document.getElementById('div-asig-val');
  av.textContent=resto<0
    ?'− '+fmt(Math.abs(resto))+' de más'
    :fmt(asignado)+' asignado';
  av.style.color=resto===0?'#2e7d32':resto<0?'#c62828':'#888';

  document.getElementById('div-parts-container').innerHTML=divParts.map((p,i)=>{
    const pctP=TOTAL>0&&p.monto>0?Math.round((p.monto/TOTAL)*100):0;
    const label=p.sub?(p.sub.includes(' - ')?p.sub.split(' - ').slice(1).join(' - '):p.sub):'';
    const restoDisponible=TOTAL-divParts.reduce((s,pp,idx)=>idx===i?s:s+pp.monto,0);
    return `<div class="dividir-part-card">
      <div class="dividir-part-top">
        <div class="dividir-part-num">${i+1}</div>
        ${p.sub
          ?`<div class="dividir-part-dot" style="background:${p.color};"></div>
             <button class="dividir-part-sel" onclick="divOpenSubcat(${i})">${label}<span style="color:#aaa;font-size:10px;"> · ${p.cat}</span></button>`
          :`<button class="dividir-part-sel empty" onclick="divOpenSubcat(${i})">Seleccionar subcategoría...</button>`
        }
        ${divParts.length>2?`<button class="dividir-part-remove" onclick="divRemovePart(${i})">×</button>`:''}
      </div>
      <div class="dividir-part-bottom">
        <div class="dividir-monto-wrap">
          <span class="dividir-monto-pfx">$</span>
          <input class="dividir-monto-inp" type="number" value="${p.monto||''}"
            placeholder="0" min="0" oninput="divUpdMonto(${i},this.value)" />
        </div>
        <span class="dividir-pct-pill" id="div-pct-${i}">${pctP}%</span>
        <button class="dividir-btn-resto" id="div-resto-btn-${i}" onclick="divUsarResto(${i})" style="display:${restoDisponible>0?'inline-block':'none'}">Usar resto</button>
      </div>
    </div>`;
  }).join('');

  const allSub=divParts.every(p=>p.sub);
  const badge=document.getElementById('div-status-badge');
  const btn=document.getElementById('btn-div-guardar');

  if(resto===0&&allSub){
    badge.textContent='Todo el monto está distribuido, listo para dividir';
    badge.className='dividir-status-badge dividir-st-ok';
    btn.className='btn-dividir-guardar habilitado';
  }else if(resto<0){
    badge.textContent=`⚠ Excede ${fmt(TOTAL)} en ${fmt(Math.abs(resto))} — ajusta los montos`;
    badge.className='dividir-status-badge dividir-st-over';
    btn.className='btn-dividir-guardar deshabilitado';
  }else if(!allSub){
    badge.textContent='Falta seleccionar subcategoría en algunas partes';
    badge.className='dividir-status-badge dividir-st-under';
    btn.className='btn-dividir-guardar deshabilitado';
  }else{
    badge.textContent=fmt(resto)+' sin asignar — ajusta los montos';
    badge.className='dividir-status-badge dividir-st-under';
    btn.className='btn-dividir-guardar deshabilitado';
  }
}

function divUpdMonto(i,val){
  divParts[i].monto=parseInt(val)||0;
  divActualizarResumen();
}
function divActualizarResumen(){
  if(!gastoActual)return;
  const TOTAL=gastoActual.monto;
  const asignado=divParts.reduce((s,p)=>s+p.monto,0);
  const resto=TOTAL-asignado;
  const pct=TOTAL>0?Math.min(Math.round((asignado/TOTAL)*100),100):0;

  const fill=document.getElementById('div-prog-fill');
  if(fill){fill.style.width=pct+'%';fill.style.background=resto===0?'#2e7d32':resto<0?'#c62828':'#1a73e8';}

  const restoEl=document.getElementById('div-resto-disp');
  if(restoEl){restoEl.textContent=resto===0?'—':fmt(Math.abs(resto));restoEl.style.color=resto===0?'#bbb':resto<0?'#c62828':'#111';}

  const asigLabel=document.getElementById('div-asig-label');
  if(asigLabel)asigLabel.textContent=resto<0?'Excede el total':pct+'% distribuido';
  const asigVal=document.getElementById('div-asig-val');
  if(asigVal){
    asigVal.textContent=resto<0?'− '+fmt(Math.abs(resto))+' de más':fmt(asignado)+' asignado';
    asigVal.style.color=resto===0?'#2e7d32':resto<0?'#c62828':'#888';
  }

  divParts.forEach((p,i)=>{
    const pctP=TOTAL>0&&p.monto>0?Math.round((p.monto/TOTAL)*100):0;
    const pill=document.getElementById('div-pct-'+i);
    if(pill)pill.textContent=pctP+'%';
    const restoBtn=document.getElementById('div-resto-btn-'+i);
    if(restoBtn){
      const restoDisp=TOTAL-divParts.reduce((s,pp,idx)=>idx===i?s:s+pp.monto,0);
      restoBtn.style.display=restoDisp>0?'inline-block':'none';
    }
  });

  const allSub=divParts.every(p=>p.sub);
  const badge=document.getElementById('div-status-badge');
  const btn=document.getElementById('btn-div-guardar');
  if(resto===0&&allSub){
    if(badge){badge.textContent='Todo el monto está distribuido, listo para dividir';badge.className='dividir-status-badge dividir-st-ok';}
    if(btn)btn.className='btn-dividir-guardar habilitado';
  }else if(resto<0){
    if(badge){badge.textContent=`⚠ Excede ${fmt(TOTAL)} en ${fmt(Math.abs(resto))} — ajusta los montos`;badge.className='dividir-status-badge dividir-st-over';}
    if(btn)btn.className='btn-dividir-guardar deshabilitado';
  }else if(!allSub){
    if(badge){badge.textContent='Falta seleccionar subcategoría en algunas partes';badge.className='dividir-status-badge dividir-st-under';}
    if(btn)btn.className='btn-dividir-guardar deshabilitado';
  }else{
    if(badge){badge.textContent=fmt(resto)+' sin asignar — ajusta los montos';badge.className='dividir-status-badge dividir-st-under';}
    if(btn)btn.className='btn-dividir-guardar deshabilitado';
  }
}
function divUsarResto(i){
  if(!gastoActual)return;
  const TOTAL=gastoActual.monto;
  const sinEste=divParts.reduce((s,p,idx)=>idx===i?s:s+p.monto,0);
  divParts[i].monto=Math.max(0,TOTAL-sinEste);
  divRender();
}
function divRemovePart(i){
  if(divParts.length>2){divParts.splice(i,1);divRender();}
}
function divAddPart(){
  if(!gastoActual)return;
  const resto=Math.max(0,gastoActual.monto-divParts.reduce((s,p)=>s+p.monto,0));
  divParts.push({sub:'',cat:'',color:'#999',monto:resto});
  divRender();
  setTimeout(()=>divOpenSubcat(divParts.length-1),30);
}

function divBuildSubcatHtml(q){
  const query=(q||'').toLowerCase().trim();
  const grupos={};
  subcats.filter(s=>s.ie==='E').forEach(s=>{
    const label=s.sub.includes(' - ')?s.sub.split(' - ').slice(1).join(' - '):s.sub;
    if(query&&!label.toLowerCase().includes(query)&&!s.cat.toLowerCase().includes(query))return;
    if(!grupos[s.cat])grupos[s.cat]=[];
    grupos[s.cat].push(s);
  });
  let html='';
  const idx=divEditIdx;
  Object.entries(grupos).forEach(([cat,subs])=>{
    if(!query)html+=`<div style="font-size:10px;font-weight:500;color:#aaa;letter-spacing:.05em;padding:8px 4px 4px;">${cat.toUpperCase()}</div>`;
    subs.forEach(s=>{
      const label=s.sub.includes(' - ')?s.sub.split(' - ').slice(1).join(' - '):s.sub;
      const active=divParts[idx]&&divParts[idx].sub===s.sub;
      const color=catColores[s.cat]||'#999';
      const subSafe=s.sub.replace(/'/g,"\\'");
      const catSafe=s.cat.replace(/'/g,"\\'");
      html+=`<div onclick="divSelectSubcat('${subSafe}','${catSafe}','${color}')"
        style="display:flex;align-items:center;gap:9px;padding:9px 6px;border-radius:7px;cursor:pointer;${active?'background:#e8f0fe;':''}">
        <div style="width:9px;height:9px;border-radius:50%;background:${color};flex-shrink:0;"></div>
        <span style="font-size:13px;color:#111;flex:1;">${label}${query?`<span style="color:#aaa;font-size:11px;"> · ${cat}</span>`:''}</span>
        ${active?'<span style="color:#1a73e8;font-size:13px;">✓</span>':''}
      </div>`;
    });
  });
  if(!html)html=`<div style="padding:16px;text-align:center;font-size:13px;color:#aaa;">Sin resultados</div>`;
  return html;
}

function divOpenSubcat(idx){
  divEditIdx=idx;
  const searchEl=document.getElementById('div-subcat-search');
  if(searchEl)searchEl.value='';
  document.getElementById('div-subcat-options').innerHTML=divBuildSubcatHtml('');
  document.getElementById('ov-div-subcat').classList.add('open');
  bloquearScrollFondo();
  setTimeout(()=>searchEl&&searchEl.focus(),200);
}

function divFiltrarSubcat(q){
  document.getElementById('div-subcat-options').innerHTML=divBuildSubcatHtml(q);
}

function divSelectSubcat(sub,cat,color){
  if(divEditIdx!==null&&divParts[divEditIdx]){
    divParts[divEditIdx].sub=sub;
    divParts[divEditIdx].cat=cat;
    divParts[divEditIdx].color=color;
  }
  cerrar('ov-div-subcat');
  divEditIdx=null;
  divRender();
}

async function cargarDatosQuiet(){
  try{
    const res=await fetch('/api/gastos');
    if(!res.ok)return;
    const rows=await res.json();
    totalFilasGastos=Math.max(0,(rows.length||1)-1);
  }catch(e){}
}

async function ejecutarDividir(){
  const btn=document.getElementById('btn-div-guardar');
  if(!btn.classList.contains('habilitado'))return;
  if(!gastoActual)return;

  const TOTAL=gastoActual.monto;
  const n=divParts.length;
  const suma=divParts.reduce((s,p)=>s+p.monto,0);
  if(suma!==TOTAL){mostrarToast('Los montos no cuadran con el total');return;}
  if(!divParts.every(p=>p.sub)){mostrarToast('Todas las partes deben tener subcategoría');return;}

  btn.disabled=true;
  cerrar('ov-gasto');
  mostrarLoading('Dividiendo gasto...');

  try{
    const delRes=await fetch('/api/gastos',{
      method:'DELETE',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({rowIndex:gastoActual.rowIndex})
    });
    if(!delRes.ok){const err=await delRes.json().catch(()=>({}));throw new Error(err.error||'Error al eliminar gasto original');}

    await cargarDatosQuiet();

    const descBase=gastoActual.desc;
    const fecha=gastoActual.fecha;
    const dateSerial=Math.round(new Date(fecha).getTime()/86400000)+25569;
    const banco=gastoActual.banco;
    const devStr=gastoActual.dev?'X':'';

    for(let i=0;i<divParts.length;i++){
      const parte=divParts[i];
      const descParte=`${descBase} - Gasto Dividido (${i+1}/${n})`;
      const N=totalFilasGastos+2;

      const fB=`=IF(A${N}<>"";CONCATENATE(IF(MONTH(A${N})<10;CONCATENATE("0";MONTH(A${N}));MONTH(A${N}));"-";YEAR(A${N}));"")`;
      const fD=`=IFERROR(VLOOKUP(C${N};'Parámetros'!A:B;2;FALSE);"")`;
      const fE=`=IF(G${N}<>"X";IFERROR(VLOOKUP(C${N};'Parámetros'!A:C;3;FALSE);"");IF(IFERROR(VLOOKUP(C${N};'Parámetros'!A:C;3;FALSE);"")="E";"I";"E"))`;
      const fJ=`=IF(I${N}<>"";IF(E${N}="I";IF(I${N}>0;I${N};I${N}*-1);IF(E${N}="E";IF(I${N}<0;I${N};I${N}*-1)));0)`;
      const fK=`=SUMIFS(Presupuesto!D:D;Presupuesto!A:A;B${N};Presupuesto!B:B;C${N})`;

      const row=[dateSerial,fB,parte.sub,fD,fE,banco,devStr,descParte,parte.monto,fJ,fK];
      const res=await fetch('/api/gastos',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({row})
      });
      if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||`Error al insertar parte ${i+1}`);}

      if(i<divParts.length-1)await cargarDatosQuiet();
    }

    mostrarToast(`Gasto dividido en ${n} partes ✓`);
    await cargarDatos();
    renderDetalle();
  }catch(e){
    mostrarToast('Error al dividir: '+e.message);
    ocultarLoading();
  }finally{
    btn.disabled=false;
  }
}

// ── PRESUPUESTO ─────────────────────────────────────────
function renderPresupuesto(){
  document.getElementById('ppto-mes').textContent=`${meses[pptoPanelMes]} ${pptoPanelAnio}`;
  const q=(document.getElementById('ppto-search')?.value||'').toLowerCase().trim();
  const subcatsE=pptoSubcats;
  const key=`${String(pptoPanelMes+1).padStart(2,'0')}-${pptoPanelAnio}`;
  const gastosMes=dashData[key]?dashData[key].categorias:[];
  let totalPptoConReal=0,totalRealConPpto=0;
  subcatsE.forEach(sc=>{
    if(EXCLUDED_CATS.includes(sc.cat))return;
    const p=pptoData[sc.sub]?.monto||0;
    if(p===0)return;
    const catReal=gastosMes.find(c=>c.nombre===sc.cat);
    const real=catReal?catReal.monto:0;
    if(real===0)return;
    totalPptoConReal+=p;
    totalRealConPpto+=real;
  });
  const libre=totalPptoConReal-totalRealConPpto;
  const pct=totalPptoConReal>0?Math.min(Math.round((totalRealConPpto/totalPptoConReal)*100),100):0;
  document.getElementById('ppto-total').textContent=fmt(totalPptoConReal);
  document.getElementById('ppto-real-txt').textContent=`Real: ${fmt(totalRealConPpto)}`;
  const libreEl=document.getElementById('ppto-libre-txt');
  libreEl.textContent=libre>=0?`Libre: $${Math.round(libre).toLocaleString('es-CL')}`:`Sobre: $${Math.round(Math.abs(libre)).toLocaleString('es-CL')}`;
  libreEl.style.color=libre>=0?'#2e7d32':'#b71c1c';
  document.getElementById('ppto-global-fill').style.width=pct+'%';
  const grupos={};
  subcatsE.forEach(sc=>{if(!grupos[sc.cat])grupos[sc.cat]=[];grupos[sc.cat].push(sc);});
  const entries=Object.entries(grupos)
    .map(([cat,subs])=>{
      const filteredSubs=q?subs.filter(sc=>sc.sub.toLowerCase().includes(q)||cat.toLowerCase().includes(q)):subs;
      const totalCat=filteredSubs.reduce((s,sc)=>{const p=pptoData[sc.sub.trim()];return s+(p?p.monto:0);},0);
      return{cat,filteredSubs,totalCat};
    })
    .sort((a,b)=>pptoSortAsc?a.totalCat-b.totalCat:b.totalCat-a.totalCat);
  const html=entries.map(({cat,filteredSubs,totalCat})=>{
    if(!filteredSubs.length)return '';
    const sortedSubs=filteredSubs;
    return `<div class="ppto-cat-group">
      <div class="ppto-cat-header" onclick="togglePptoCat(this)">
        <div class="ppto-cat-icon" style="background:${catBgs[cat]||'#f5f5f5'};color:${catColores[cat]||'#666'}">${cat.charAt(0)}</div>
        <span class="ppto-cat-nombre">${cat}</span>
        <span class="ppto-cat-total">${fmt(totalCat)}</span>
        <span class="ppto-cat-chevron open">▼</span>
      </div>
      <div class="ppto-subcat-list open">
        ${sortedSubs.map(sc=>{const p=pptoData[sc.sub.trim()]||{monto:0,fijo:false};return `
          <div class="ppto-subcat-item">
            <div class="ppto-subcat-info"><div class="ppto-subcat-nombre">${sc.sub.includes(' - ')?sc.sub.split(' - ').slice(1).join(' - '):sc.sub}</div></div>
            <div class="ppto-monto-wrap"><span class="ppto-monto-prefix">$</span>
              <input class="ppto-monto-input" type="number" value="${p.monto}" min="0" onchange="actualizarPpto('${sc.sub}',this.value,this)" ${p.fijo?'style="background:#f0f4ff;"':''} />
            </div>
          </div>`;}).join('')}
      </div>
    </div>`;
  }).join('');
  document.getElementById('ppto-lista').innerHTML=html||(q?'<p style="text-align:center;color:#999;padding:24px;font-size:14px;">Sin resultados para "'+q+'"</p>':'');
}

function togglePptoSort(){
  pptoSortAsc=!pptoSortAsc;
  const btn=document.getElementById('ppto-sort-btn');
  if(btn){btn.textContent=pptoSortAsc?'↑':'↓';btn.style.background=pptoSortAsc?'#e8f0fe':'#f5f5f5';btn.style.borderColor=pptoSortAsc?'#1a73e8':'#e0e0e0';}
  renderPresupuesto();
}
function togglePptoCat(h){const l=h.nextElementSibling,c=h.querySelector('.ppto-cat-chevron');l.classList.toggle('open');c.classList.toggle('open');}
function toggleFijo(sub){if(!pptoData[sub])pptoData[sub]={monto:0,fijo:false};pptoData[sub].fijo=!pptoData[sub].fijo;renderPresupuesto();}
function actualizarPpto(sub,val,inputEl){
  const nuevo=parseInt(val)||0,anterior=pptoData[sub]?pptoData[sub].monto:0;
  if(nuevo===anterior)return;
  alcancePendiente={sub,nuevoMonto:nuevo,inputEl};
  const nombre=sub.includes(' - ')?sub.split(' - ').slice(1).join(' - '):sub;
  document.getElementById('alcance-sub').textContent=`"${nombre}" → ${fmt(nuevo)}`;
  document.getElementById('alcance-mes-label').textContent=`${meses[pptoPanelMes]} ${pptoPanelAnio}`;
  document.getElementById('ov-alcance').classList.add('open');
  bloquearScrollFondo();
}
async function aplicarAlcance(soloMes){
  if(presupuestoAllRows.length===0){
    mostrarToast('Error: no hay datos de presupuesto cargados, recarga la página');
    cerrar('ov-alcance');
    return;
  }

  function dedup(rows){
    const map=new Map();
    rows.forEach(r=>{
      const periodo=(r[0]||'').trim();
      const sub=(r[1]||'').trim();
      if(periodo&&sub) map.set(periodo+'||'+sub,r);
    });
    return Array.from(map.values());
  }

  if(catAlcancePendiente){
    const{cat,catIdx,key,entries,mes,anio}=catAlcancePendiente;
    entries.forEach(({sub,monto})=>{
      if(!pptoData[sub.trim()])pptoData[sub.trim()]={monto:0,fijo:false};
      pptoData[sub.trim()].monto=monto;
    });
    mostrarLoading('Guardando presupuesto...');
    try{
      if(soloMes){
        const periodo=String(mes+1).padStart(2,'0')+'-'+anio;
        entries.forEach(({sub,monto})=>{
          const idx=presupuestoAllRows.findIndex(
            r=>(r[0]||'').trim()===periodo&&(r[1]||'').trim()===sub.trim()
          );
          if(idx>=0)presupuestoAllRows[idx]=[periodo,sub.trim(),cat,monto];
          else presupuestoAllRows.push([periodo,sub.trim(),cat,monto]);
        });
      }else{
        for(let m=mes;m<=11;m++){
          const periodo=String(m+1).padStart(2,'0')+'-'+anio;
          entries.forEach(({sub,monto})=>{
            const idx=presupuestoAllRows.findIndex(
              r=>(r[0]||'').trim()===periodo&&(r[1]||'').trim()===sub.trim()
            );
            if(idx>=0)presupuestoAllRows[idx]=[periodo,sub.trim(),cat,monto];
            else presupuestoAllRows.push([periodo,sub.trim(),cat,monto]);
          });
        }
      }
      presupuestoAllRows=dedup(presupuestoAllRows);
      const res=await fetch('/api/presupuesto',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({rows:presupuestoAllRows})});
      if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
      mostrarToast(soloMes?`Actualizado para ${meses[mes]} ${anio}`:`Actualizado hasta dic ${anio}`);
    }catch(e){
      mostrarToast('Error al guardar: '+e.message);
    }finally{
      ocultarLoading();
    }
    cerrar('ov-alcance');catAlcancePendiente=null;
    buildPptoForMonth(mes,anio);
    dashData=computarDashData();
    renderDashboard();
    abrirCat(catIdx,key);
    return;
  }

  if(!alcancePendiente)return;
  const{sub,nuevoMonto}=alcancePendiente;
  const catObj=pptoSubcats.find(s=>s.sub.trim()===sub.trim());
  const cat=catObj?.cat||sub;

  if(soloMes){
    const periodo=String(pptoPanelMes+1).padStart(2,'0')+'-'+pptoPanelAnio;
    const idx=presupuestoAllRows.findIndex(
      r=>(r[0]||'').trim()===periodo&&(r[1]||'').trim()===sub.trim()
    );
    if(idx>=0)presupuestoAllRows[idx]=[periodo,sub.trim(),cat,Number(nuevoMonto)];
    else presupuestoAllRows.push([periodo,sub.trim(),cat,Number(nuevoMonto)]);
  }else{
    for(let m=pptoPanelMes;m<=11;m++){
      const periodo=String(m+1).padStart(2,'0')+'-'+pptoPanelAnio;
      const idx=presupuestoAllRows.findIndex(
        r=>(r[0]||'').trim()===periodo&&(r[1]||'').trim()===sub.trim()
      );
      if(idx>=0)presupuestoAllRows[idx]=[periodo,sub.trim(),cat,Number(nuevoMonto)];
      else presupuestoAllRows.push([periodo,sub.trim(),cat,Number(nuevoMonto)]);
    }
  }

  if(!pptoData[sub.trim()])pptoData[sub.trim()]={monto:0,fijo:false};
  pptoData[sub.trim()].monto=Number(nuevoMonto);

  presupuestoAllRows=dedup(presupuestoAllRows);

  mostrarLoading('Guardando presupuesto...');
  try{
    const res=await fetch('/api/presupuesto',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({rows:presupuestoAllRows})});
    if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
    mostrarToast(soloMes?`Actualizado para ${meses[pptoPanelMes]} ${pptoPanelAnio}`:`Actualizado hasta dic ${pptoPanelAnio}`);
  }catch(e){
    mostrarToast('Error al guardar: '+e.message);
  }finally{
    ocultarLoading();
  }
  cerrar('ov-alcance');
  alcancePendiente=null;
  buildPptoForMonth(pptoPanelMes,pptoPanelAnio);
  renderPresupuesto();
}
document.getElementById('alcance-solo-mes').addEventListener('click',()=>aplicarAlcance(true));
document.getElementById('alcance-todos').addEventListener('click',()=>aplicarAlcance(false));
document.getElementById('alcance-cancelar').addEventListener('click',()=>{
  cerrar('ov-alcance');
  if(catAlcancePendiente){catAlcancePendiente=null;return;}
  renderPresupuesto();alcancePendiente=null;
});
document.getElementById('ppto-prev').addEventListener('click',()=>{pptoPanelMes--;if(pptoPanelMes<0){pptoPanelMes=11;pptoPanelAnio--;}buildPptoForMonth(pptoPanelMes,pptoPanelAnio);renderPresupuesto();});
document.getElementById('ppto-next').addEventListener('click',()=>{pptoPanelMes++;if(pptoPanelMes>11){pptoPanelMes=0;pptoPanelAnio++;}buildPptoForMonth(pptoPanelMes,pptoPanelAnio);renderPresupuesto();});
document.getElementById('ppto-search').addEventListener('input',()=>renderPresupuesto());

// ── ADMIN ────────────────────────────────────────────────
function getPptoCat(cat){
  return subcats.filter(s=>s.cat===cat&&s.ie==='E').reduce((sum,s)=>sum+(pptoData[s.sub.trim()]?.monto||0),0);
}
function getUltimoGastoSubcatRaw(sub){
  let ultima='';
  Object.values(detalleData).flat().forEach(g=>{if(g.sub.trim()===sub.trim()&&g.fecha>ultima)ultima=g.fecha;});
  return ultima;
}
function getUltimoGastoSubcat(sub){
  let ultima='';
  Object.values(detalleData).flat().forEach(g=>{if(g.sub.trim()===sub.trim()&&g.fecha>ultima)ultima=g.fecha;});
  if(!ultima||ultima.length<10)return '';
  const d=new Date(ultima+'T00:00:00');
  return `${d.getDate()} ${mesesC[d.getMonth()]} ${d.getFullYear()}`;
}
function renderAdmin(){
  const q=(document.getElementById('admin-search')?.value||'').toLowerCase().trim();
  const grupos={};
  subcats.forEach(s=>{if(!grupos[s.cat])grupos[s.cat]=[];grupos[s.cat].push(s);});
  const pasaBusqueda=s=>!q||(s.sub.toLowerCase().includes(q)||s.cat.toLowerCase().includes(q));
  const activas=[],ocultas=[];
  Object.entries(grupos).forEach(([cat,subs])=>{
    if(subs.every(s=>s.estado==='Oculto'))ocultas.push([cat,subs]);
    else activas.push([cat,subs]);
  });
  activas.sort((a,b)=>{
    const ma=getPptoCat(a[0]),mb=getPptoCat(b[0]);
    if(ma===0&&mb===0)return 0;if(ma===0)return 1;if(mb===0)return -1;
    return mb-ma;
  });
  const renderCat=(cat,subs,esOculta)=>{
    let subsFilt=subs.filter(pasaBusqueda);
    if(adminFilter==='activas')subsFilt=subsFilt.filter(s=>s.estado!=='Oculto');
    else if(adminFilter==='ocultas')subsFilt=subsFilt.filter(s=>s.estado==='Oculto');
    if(!subsFilt.length&&(adminFilter!=='todas'||q))return '';
    const catId='admincat_'+cat.replace(/[^a-zA-Z0-9]/g,'_');
    const catSafe=cat.replace(/'/g,"\\'");
    const catOpacity=esOculta?'opacity:0.5;':'';
    const catNameStyle=esOculta?'text-decoration:line-through;':'';
    return `<div class="admin-cat-card" style="${catOpacity}">
      <div class="admin-cat-header" onclick="toggleAdminCat('${catId}',this)">
        <div class="cat-icon" style="width:32px;height:32px;font-size:13px;background:${catBgs[cat]||'#f5f5f5'};color:${catColores[cat]||'#666'};border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:600;flex-shrink:0;">${cat.charAt(0)}</div>
        <span class="admin-cat-nombre" style="${catNameStyle}">${cat}</span>
        <span style="flex:1;"></span>
        <span class="admin-cat-count">${subsFilt.length} subcats</span>
        <button onclick="event.stopPropagation();abrirRenombrarCat('${catSafe}')" style="padding:4px 10px;border-radius:6px;border:0.5px solid #e0e0e0;background:#f9f9f9;color:#666;font-size:11px;cursor:pointer;font-family:inherit;">Renombrar</button>
        <span class="admin-cat-chevron open">▼</span>
      </div>
      <div class="admin-subcat-list open" id="${catId}">
        ${[...subsFilt].sort((a,b)=>{
          const pA=pptoData[a.sub.trim()]?.monto||0,pB=pptoData[b.sub.trim()]?.monto||0;
          if(pB!==pA)return pB-pA;
          const fA=getUltimoGastoSubcatRaw(a.sub),fB=getUltimoGastoSubcatRaw(b.sub);
          if(fB&&!fA)return 1;if(fA&&!fB)return -1;
          return fB.localeCompare(fA);
        }).map(s=>{
          const subSafe=s.sub.replace(/'/g,"\\'");
          const label=s.sub.includes(' - ')?s.sub.split(' - ').slice(1).join(' - '):s.sub;
          const subOculta=s.estado==='Oculto';
          const subStyle=subOculta?'opacity:0.45;':'';
          const subLabelStyle=subOculta?'text-decoration:line-through;':'';
          const fechaLabel=getUltimoGastoSubcat(s.sub);
          const estadoBadge=s.estado==='Oculto'
            ?`<span style="background:#f0f0f0;color:#999;padding:2px 7px;border-radius:5px;font-size:10px;font-weight:500;">Oculto</span>`
            :'';
          const modoBadge=s.modo==='Transferencia'
            ?`<span style="background:#e8f0fe;color:#1a73e8;padding:2px 7px;border-radius:5px;font-size:10px;font-weight:500;">Transf</span>`
            :s.modo==='Tarjeta Crédito'
            ?`<span style="background:#fff8e1;color:#f57f17;padding:2px 7px;border-radius:5px;font-size:10px;font-weight:500;">TC</span>`
            :'';
          const ieBadge=s.ie==='E'
            ?`<span style="background:#fce4ec;color:#c62828;padding:2px 7px;border-radius:5px;font-size:10px;font-weight:500;">E</span>`
            :`<span style="background:#e8f5e9;color:#2e7d32;padding:2px 7px;border-radius:5px;font-size:10px;font-weight:500;">I</span>`;
          return `<div class="admin-subcat-item" style="${subStyle}">
            <span class="admin-subcat-nombre" style="${subLabelStyle}">${label}</span>
            ${fechaLabel?`<span style="font-size:11px;color:#bbb;margin-right:4px;">${fechaLabel}</span>`:''}
            <div style="display:flex;gap:5px;align-items:center;flex-shrink:0;">${estadoBadge}${modoBadge}${ieBadge}</div>
            <button class="admin-edit-btn" onclick="abrirEditSubcat('${subSafe}')">✏️</button>
            <button class="admin-del-btn" onclick="eliminarSubcatAdmin('${subSafe}')">✕</button>
          </div>`;
        }).join('')}
        <div class="admin-add-row">
          <input class="admin-add-input" placeholder="Nueva subcategoría..." id="new-sub-${catId}" />
          <button class="admin-add-btn" onclick="abrirAgregarSubcat('${catSafe}','new-sub-${catId}')">+ Agregar</button>
        </div>
      </div>
    </div>`;
  };
  let html=activas.map(([cat,subs])=>renderCat(cat,subs,false)).join('');
  if(ocultas.length){
    html+=`<div style="font-size:11px;color:#bbb;font-weight:500;letter-spacing:0.04em;padding:12px 4px 6px;">OCULTAS</div>`;
    html+=ocultas.map(([cat,subs])=>renderCat(cat,subs,true)).join('');
  }
  document.getElementById('admin-cat-lista').innerHTML=html;
}

function toggleAdminCat(catId,header){
  const list=document.getElementById(catId);
  const chev=header.querySelector('.admin-cat-chevron');
  if(!list)return;
  const open=list.classList.contains('open');
  list.classList.toggle('open',!open);
  chev.classList.toggle('open',!open);
}

function abrirEditSubcat(sub){
  const sc=subcats.find(s=>s.sub===sub);
  if(!sc)return;
  adminEditandoSubcat={oldSub:sub,cat:sc.cat,ie:sc.ie,modo:sc.modo||''};
  const label=sub.includes(' - ')?sub.split(' - ').slice(1).join(' - '):sub;
  document.getElementById('admin-edit-title').textContent='Editar: '+label;
  document.getElementById('admin-edit-nombre').value=label;
  document.querySelectorAll('#admin-edit-modo .admin-toggle-opt').forEach(o=>{o.className='admin-toggle-opt';});
  const modoOpts=document.querySelectorAll('#admin-edit-modo .admin-toggle-opt');
  if(sc.modo==='Transferencia')modoOpts[0].classList.add('active-transf');
  else if(sc.modo==='Tarjeta Crédito')modoOpts[1].classList.add('active-tc');
  else modoOpts[2].classList.add('active-vacio');
  document.querySelectorAll('#admin-edit-ie .admin-ie-opt').forEach(o=>{o.className='admin-ie-opt';});
  const ieOpts=document.querySelectorAll('#admin-edit-ie .admin-ie-opt');
  if(sc.ie==='E')ieOpts[0].classList.add('active-e');
  else ieOpts[1].classList.add('active-i');
  document.querySelectorAll('#admin-edit-estado .admin-ie-opt').forEach(o=>{o.className='admin-ie-opt';});
  const estadoOpts=document.querySelectorAll('#admin-edit-estado .admin-ie-opt');
  if(sc.estado==='Oculto')estadoOpts[1].classList.add('active-oculto');
  else estadoOpts[0].classList.add('active-activo');
  document.querySelectorAll('#admin-edit-frecuencia .admin-ie-opt').forEach(o=>{o.className='admin-ie-opt';});
  const frecOpts=document.querySelectorAll('#admin-edit-frecuencia .admin-ie-opt');
  if(sc.frecuencia==='Variable')frecOpts[1].classList.add('active-variable');
  else if(sc.frecuencia==='Mensual')frecOpts[0].classList.add('active-mensual');
  document.getElementById('ov-admin-edit').classList.add('open');
  bloquearScrollFondo();
}

async function guardarEditSubcat(){
  if(!adminEditandoSubcat)return;
  const inputEl=document.getElementById('admin-edit-nombre');
  const nuevoLabel=inputEl?inputEl.value.trim():'';
  if(!nuevoLabel){mostrarToast('El nombre no puede estar vacío');return;}
  const modoActivo=document.querySelector('#admin-edit-modo .admin-toggle-opt.active-transf, #admin-edit-modo .admin-toggle-opt.active-tc, #admin-edit-modo .admin-toggle-opt.active-vacio');
  const nuevoModo=modoActivo?(modoActivo.dataset.modo||''):'';
  const ieActivo=document.querySelector('#admin-edit-ie .admin-ie-opt.active-e, #admin-edit-ie .admin-ie-opt.active-i');
  const nuevoIE=ieActivo?(ieActivo.dataset.ie||'E'):'E';
  const estadoActivo=document.querySelector('#admin-edit-estado .admin-ie-opt.active-activo, #admin-edit-estado .admin-ie-opt.active-oculto');
  const nuevoEstado=estadoActivo?(estadoActivo.dataset.estado||''):(adminEditandoSubcat?.estado||'');
  const frecActiva=document.querySelector('#admin-edit-frecuencia .admin-ie-opt.active-mensual, #admin-edit-frecuencia .admin-ie-opt.active-variable');
  const nuevaFrecuencia=frecActiva?(frecActiva.dataset.frecuencia||''):(adminEditandoSubcat?.frecuencia||'');
  const{oldSub,cat}=adminEditandoSubcat;
  const prefix=oldSub.includes(' - ')?oldSub.substring(0,oldSub.indexOf(' - ')+3):'';
  const newSub=prefix+nuevoLabel;
  const idx=subcats.findIndex(s=>s.sub===oldSub);
  if(idx>=0)subcats[idx]={sub:newSub,cat,ie:nuevoIE,modo:nuevoModo,estado:nuevoEstado,frecuencia:nuevaFrecuencia};
  const rows=subcats.map(s=>[s.sub,s.cat,s.ie,s.modo||'',s.estado||'',s.frecuencia||'']);
  cerrarAdminModal('ov-admin-edit');
  mostrarLoading('Guardando cambios...');
  try{
    const body={rows};
    if(newSub!==oldSub)body.rename={oldSub,newSub};
    const res=await fetch('/api/parametros',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
    mostrarToast(newSub!==oldSub?'Subcategoría y gastos actualizados ✓':'Cambios guardados ✓');
    adminEditandoSubcat=null;
    await cargarDatos();
    renderAdmin();
  }catch(e){
    mostrarToast('Error: '+e.message);
  }finally{
    ocultarLoading();
  }
}

function eliminarSubcatAdmin(sub){
  if(!sub)return;
  cerrarAdminModal('ov-admin-edit');
  const todosGastos=Object.values(detalleData).flat();
  const gastosDeEsta=todosGastos.filter(g=>g.sub.trim()===sub.trim());
  const count=gastosDeEsta.length;
  const label=sub.includes(' - ')?sub.split(' - ').slice(1).join(' - '):sub;
  const sc=subcats.find(s=>s.sub===sub);
  const catActual=sc?sc.cat:'';
  document.getElementById('del-subcat-nombre').textContent=label;
  const countEl=document.getElementById('del-gastos-count');
  const sinGastosEl=document.getElementById('del-sin-gastos');
  const moverSection=document.getElementById('del-mover-section');
  const confirmarBtn=document.getElementById('del-confirmar-btn');
  if(count===0){
    countEl.style.display='none';
    sinGastosEl.style.display='block';
    moverSection.style.display='none';
    confirmarBtn.textContent='Eliminar subcategoría';
  }else{
    countEl.style.display='block';
    countEl.textContent=count+(count===1?' gasto':' gastos');
    sinGastosEl.style.display='none';
    moverSection.style.display='block';
    confirmarBtn.textContent='Mover y eliminar';
  }
  const sel=document.getElementById('del-subcat-destino');
  const opciones=subcats
    .filter(s=>s.sub!==sub&&s.ie===(sc?sc.ie:'E'))
    .sort((a,b)=>{
      if(a.cat===catActual&&b.cat!==catActual)return -1;
      if(a.cat!==catActual&&b.cat===catActual)return 1;
      return a.sub.localeCompare(b.sub);
    });
  sel.innerHTML='<option value="">— Seleccionar subcategoría destino —</option>'+
    opciones.map(s=>{
      const lbl=s.sub.includes(' - ')?s.sub.split(' - ').slice(1).join(' - '):s.sub;
      const prefix=s.cat!==catActual?`[${s.cat}] `:'';
      return `<option value="${s.sub}">${prefix}${lbl}</option>`;
    }).join('');
  adminEditandoSubcat={...adminEditandoSubcat,oldSub:sub,cat:catActual};
  document.getElementById('ov-admin-del').classList.add('open');
  bloquearScrollFondo();
}

async function confirmarEliminarSubcat(){
  const sub=adminEditandoSubcat?.oldSub;
  if(!sub)return;
  const todosGastos=Object.values(detalleData).flat();
  const count=todosGastos.filter(g=>g.sub.trim()===sub.trim()).length;
  const destino=document.getElementById('del-subcat-destino').value;
  if(count>0&&!destino){mostrarToast('Debes seleccionar una subcategoría destino');return;}
  cerrarAdminModal('ov-admin-del');
  const backupSubcats=[...subcats];
  subcats=subcats.filter(s=>s.sub!==sub);
  const rows=subcats.map(s=>[s.sub,s.cat,s.ie,s.modo||'',s.estado||'',s.frecuencia||'']);
  mostrarLoading(count>0?`Moviendo ${count} gastos y eliminando...`:'Eliminando subcategoría...');
  try{
    const body={rows};
    if(count>0&&destino)body.move={oldSub:sub,newSub:destino};
    const res=await fetch('/api/parametros',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
    const destinoLabel=destino?(destino.includes(' - ')?destino.split(' - ').slice(1).join(' - '):destino):'';
    mostrarToast(count>0?`${count} gastos movidos a "${destinoLabel}" y subcategoría eliminada ✓`:'Subcategoría eliminada ✓');
    adminEditandoSubcat=null;
    await cargarDatos();
    renderAdmin();
  }catch(e){
    subcats=backupSubcats;
    mostrarToast('Error: '+e.message);
  }finally{
    ocultarLoading();
  }
}

function abrirAgregarSubcat(cat,inputId){
  adminCatParaAgregar=cat;
  const nombre=inputId?(document.getElementById(inputId)?.value.trim()||''):'';
  document.getElementById('admin-add-title').textContent='Agregar a '+cat;
  document.getElementById('admin-add-nombre').value=nombre;
  document.querySelectorAll('#admin-add-modo .admin-toggle-opt').forEach(o=>{o.className='admin-toggle-opt';});
  document.querySelectorAll('#admin-add-modo .admin-toggle-opt')[2].classList.add('active-vacio');
  document.querySelectorAll('#admin-add-ie .admin-ie-opt').forEach(o=>{o.className='admin-ie-opt';});
  document.querySelectorAll('#admin-add-ie .admin-ie-opt')[0].classList.add('active-e');
  document.getElementById('ov-admin-add').classList.add('open');
  bloquearScrollFondo();
}

async function guardarNuevaSubcat(){
  if(!adminCatParaAgregar)return;
  const inputEl=document.getElementById('admin-add-nombre');
  const nombre=inputEl?inputEl.value.trim():'';
  if(!nombre){mostrarToast('Escribe un nombre');return;}
  const modoActivo=document.querySelector('#admin-add-modo .admin-toggle-opt.active-transf, #admin-add-modo .admin-toggle-opt.active-tc, #admin-add-modo .admin-toggle-opt.active-vacio');
  const modo=modoActivo?(modoActivo.dataset.modo||''):'';
  const ieActivo=document.querySelector('#admin-add-ie .admin-ie-opt.active-e, #admin-add-ie .admin-ie-opt.active-i');
  const ie=ieActivo?(ieActivo.dataset.ie||'E'):'E';
  const newSub=adminCatParaAgregar+' - '+nombre;
  if(subcats.find(s=>s.sub===newSub)){mostrarToast('Esa subcategoría ya existe');return;}
  subcats.push({sub:newSub,cat:adminCatParaAgregar,ie,modo,frecuencia:''});
  const rows=subcats.map(s=>[s.sub,s.cat,s.ie,s.modo||'',s.estado||'',s.frecuencia||'']);
  cerrarAdminModal('ov-admin-add');
  mostrarLoading('Guardando...');
  try{
    const res=await fetch('/api/parametros',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({rows})});
    if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
    mostrarToast(`"${nombre}" agregada ✓`);
    adminCatParaAgregar=null;
    await cargarDatos();
    renderAdmin();
  }catch(e){
    subcats=subcats.filter(s=>s.sub!==newSub);
    mostrarToast('Error: '+e.message);
  }finally{
    ocultarLoading();
  }
}

function abrirRenombrarCat(cat){
  adminEditandoCat=cat;
  document.getElementById('admin-rename-titulo').textContent='Renombrar: '+cat;
  document.getElementById('admin-rename-input').value=cat;
  document.getElementById('ov-admin-rename').classList.add('open');
  bloquearScrollFondo();
}

async function guardarRenombrarCat(){
  if(!adminEditandoCat)return;
  const inputEl=document.getElementById('admin-rename-input');
  const nuevaCat=inputEl?inputEl.value.trim():'';
  if(!nuevaCat){mostrarToast('El nombre no puede estar vacío');return;}
  if(nuevaCat===adminEditandoCat){cerrarAdminModal('ov-admin-rename');return;}
  const oldCat=adminEditandoCat;
  subcats.forEach(s=>{if(s.cat===oldCat)s.cat=nuevaCat;});
  const rows=subcats.map(s=>[s.sub,s.cat,s.ie,s.modo||'',s.estado||'',s.frecuencia||'']);
  cerrarAdminModal('ov-admin-rename');
  mostrarLoading('Guardando...');
  try{
    const res=await fetch('/api/parametros',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({rows})});
    if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
    mostrarToast(`Categoría renombrada a "${nuevaCat}" ✓`);
    adminEditandoCat=null;
    await cargarDatos();
    renderAdmin();
  }catch(e){
    subcats.forEach(s=>{if(s.cat===nuevaCat)s.cat=oldCat;});
    mostrarToast('Error: '+e.message);
  }finally{
    ocultarLoading();
  }
}

async function agregarNuevaCategoria(){
  const inputEl=document.getElementById('nueva-cat-input');
  const nombre=inputEl?inputEl.value.trim():'';
  if(!nombre)return;
  if(subcats.find(s=>s.cat===nombre)){mostrarToast('Esa categoría ya existe');return;}
  const newSub=nombre+' - Nueva subcategoría';
  subcats.push({sub:newSub,cat:nombre,ie:'E',modo:'',frecuencia:''});
  const rows=subcats.map(s=>[s.sub,s.cat,s.ie,s.modo||'',s.estado||'',s.frecuencia||'']);
  mostrarLoading('Creando categoría...');
  try{
    const res=await fetch('/api/parametros',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({rows})});
    if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
    mostrarToast(`Categoría "${nombre}" creada ✓`);
    inputEl.value='';
    await cargarDatos();
    renderAdmin();
  }catch(e){
    subcats=subcats.filter(s=>s.sub!==newSub);
    mostrarToast('Error: '+e.message);
  }finally{
    ocultarLoading();
  }
}

function cerrarAdminModal(id){
  document.getElementById(id).classList.remove('open');
  const hayAbiertos=document.querySelectorAll('.overlay.open, .alcance-overlay.open').length>0;
  if(!hayAbiertos)desbloquearScrollFondo();
}

function selAdminModo(el,modo){
  el.closest('.admin-toggle-group').querySelectorAll('.admin-toggle-opt').forEach(o=>{o.className='admin-toggle-opt';});
  if(modo==='Transferencia')el.classList.add('active-transf');
  else if(modo==='Tarjeta Crédito')el.classList.add('active-tc');
  else el.classList.add('active-vacio');
}

function selAdminIE(el,ie){
  el.closest('.admin-ie-group').querySelectorAll('.admin-ie-opt').forEach(o=>{o.className='admin-ie-opt';});
  el.classList.add(ie==='E'?'active-e':'active-i');
}

function selAdminEstado(el,estado){
  el.closest('.admin-ie-group').querySelectorAll('.admin-ie-opt').forEach(o=>{o.className='admin-ie-opt';});
  el.classList.add(estado==='Activo'?'active-activo':'active-oculto');
}

function selAdminFrecuencia(el,frecuencia){
  el.closest('.admin-ie-group').querySelectorAll('.admin-ie-opt').forEach(o=>{o.className='admin-ie-opt';});
  el.classList.add(frecuencia==='Mensual'?'active-mensual':'active-variable');
}

function setAdminFilter(val){
  adminFilter=val;
  document.querySelectorAll('.admin-chip').forEach(c=>{c.classList.toggle('active',c.dataset.filter===val);});
  renderAdmin();
}

document.getElementById('btn-add-cat').addEventListener('click',agregarNuevaCategoria);
document.getElementById('admin-search').addEventListener('input',renderAdmin);

document.getElementById('ov-admin-edit').addEventListener('click',e=>{if(e.target===document.getElementById('ov-admin-edit'))cerrarAdminModal('ov-admin-edit');});
document.getElementById('ov-admin-add').addEventListener('click',e=>{if(e.target===document.getElementById('ov-admin-add'))cerrarAdminModal('ov-admin-add');});
document.getElementById('ov-admin-rename').addEventListener('click',e=>{if(e.target===document.getElementById('ov-admin-rename'))cerrarAdminModal('ov-admin-rename');});
document.getElementById('ov-admin-del').addEventListener('click',e=>{if(e.target===document.getElementById('ov-admin-del'))cerrarAdminModal('ov-admin-del');});

// ── FORMULARIO ───────────────────────────────────────────
document.getElementById('f-fecha').valueAsDate=new Date();
const subcatInput=document.getElementById('f-subcat'),sugBox=document.getElementById('f-suggestions'),btnLista=document.getElementById('btn-lista');
function groupBy(arr){const g={};arr.forEach(s=>{if(!g[s.cat])g[s.cat]=[];g[s.cat].push(s);});return g;}
function renderSugs(items){
  if(!items.length){sugBox.style.display='none';return;}
  const grps=groupBy(items);
  sugBox.innerHTML=Object.entries(grps).map(([cat,subs])=>`<div class="sug-group">${cat}</div>`+subs.map(s=>`
    <div class="sug-item" data-sub="${s.sub}" data-cat="${s.cat}" data-ie="${s.ie}">
      <span>${s.sub.includes(' - ')?s.sub.split(' - ').slice(1).join(' - '):s.sub}</span>
      <span style="font-size:11px;color:#bbb;">${s.ie==='E'?'Egreso':'Ingreso'}</span>
    </div>`).join('')).join('');
  sugBox.style.display='block';
}
subcatInput.addEventListener('input',()=>{
  listaOpen=false;btnLista.classList.remove('active');
  const q=subcatInput.value.toLowerCase().trim();
  if(!q){sugBox.style.display='none';checkIntlMode();return;}
  renderSugs(subcats.filter(s=>s.sub.toLowerCase().includes(q)));
  checkIntlMode();
});
btnLista.addEventListener('click',()=>{
  listaOpen=!listaOpen;btnLista.classList.toggle('active',listaOpen);
  if(listaOpen){subcatInput.value='';renderSugs(subcats);}else sugBox.style.display='none';
});
sugBox.addEventListener('click',e=>{
  const item=e.target.closest('.sug-item');if(!item)return;
  subcatInput.value=item.dataset.sub;
  document.getElementById('f-cat-nombre').textContent=item.dataset.cat;
  const ieb=document.getElementById('f-ie-badge');
  ieb.textContent=item.dataset.ie==='E'?'Egreso':'Ingreso';
  ieb.className='ie-badge ie-'+item.dataset.ie;
  document.getElementById('f-cat-badge').style.display='block';
  sugBox.style.display='none';listaOpen=false;btnLista.classList.remove('active');
  checkIntlMode();
});
document.addEventListener('click',e=>{if(!e.target.closest('.subcat-wrap')&&!e.target.closest('#btn-lista')){sugBox.style.display='none';listaOpen=false;btnLista.classList.remove('active');}});
document.querySelectorAll('.banco-btn').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelectorAll('.banco-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');});});
const devToggle=document.getElementById('dev-toggle');
devToggle.addEventListener('click',()=>{devToggle.classList.toggle('active');document.getElementById('dev-hint').textContent=devToggle.classList.contains('active')?'marcado como X':'marcar con X';});
document.getElementById('ov-nuevo').addEventListener('click',e=>{
  if(e.target===document.getElementById('ov-nuevo')){
    cerrar('ov-nuevo');
    modoEdicion=false;gastoEditandoRowIndex=null;
    intlReset();
    document.querySelector('#ov-nuevo .sheet-title').textContent='Nuevo gasto';
    document.getElementById('btn-guardar').textContent='Guardar gasto';
  }
});
function detectarDuplicadoMensual(sub,fechaInput){
  const sc=subcats.find(s=>s.sub.trim()===sub.trim());
  if(!sc||sc.frecuencia!=='Mensual')return false;
  const fechaDate=new Date(fechaInput+'T00:00:00');
  const mesGasto=fechaDate.getMonth();
  const anioGasto=fechaDate.getFullYear();
  const key=String(mesGasto+1).padStart(2,'0')+'-'+anioGasto;
  const gastosMes=detalleData[key]||[];
  const existente=gastosMes.find(g=>g.sub.trim()===sub.trim()&&g.ie==='E');
  if(!existente)return false;
  const fechaExistente=new Date(existente.fecha+'T00:00:00');
  const diaExistente=fechaExistente.getDate();
  const mesNombre=meses[fechaExistente.getMonth()];
  const anioExistente=fechaExistente.getFullYear();
  const fechaSiguiente=new Date(anioGasto,mesGasto+1,1);
  const diaSig=fechaSiguiente.getDate();
  const mesSigNombre=meses[fechaSiguiente.getMonth()];
  const anioSig=fechaSiguiente.getFullYear();
  const fechaSiguienteISO=fechaSiguiente.toISOString().slice(0,10);
  const label=sub.includes(' - ')?sub.split(' - ').slice(1).join(' - '):sub;
  document.getElementById('duplicado-detalle').innerHTML=
    `<strong>${label}</strong> ya fue registrado este mes:<br><br>`+
    `📅 Fecha: <strong>${diaExistente} de ${mesNombre} ${anioExistente}</strong><br>`+
    `💰 Monto: <strong>${fmt(existente.monto)}</strong><br>`+
    `🏦 Banco: <strong>${existente.banco}</strong>`;
  document.getElementById('duplicado-sugerencia').textContent=
    `¿Querés registrar este nuevo pago para ${diaSig} de ${mesSigNombre} ${anioSig} (próximo mes)?`;
  document.getElementById('btn-duplicado-mover').textContent=
    `Mover al ${diaSig} de ${mesSigNombre} ${anioSig}`;
  document.getElementById('btn-duplicado-mover').onclick=()=>duplicadoMoverSiguiente(fechaSiguienteISO);
  return true;
}

function duplicadoMoverSiguiente(fechaNueva){
  cerrar('ov-duplicado-mensual');
  if(!duplicadoPendiente)return;
  document.getElementById('f-fecha').value=fechaNueva;
  duplicadoPendiente=null;
  document.getElementById('btn-guardar').click();
}

function duplicadoGuardarIgual(){
  cerrar('ov-duplicado-mensual');
  if(!duplicadoPendiente)return;
  duplicadoPendiente=null;
  _skipDuplicadoCheck=true;
  document.getElementById('btn-guardar').click();
}

document.getElementById('btn-guardar').addEventListener('click',async()=>{
  const fecha=document.getElementById('f-fecha').value;
  const sub=document.getElementById('f-subcat').value.trim();
  const bancoEl=document.querySelector('.banco-btn.active');
  const banco=bancoEl?bancoEl.dataset.banco:'';
  const desc=document.getElementById('f-desc').value.trim();
  const monto=parseFloat(document.getElementById('f-monto').value)||0;
  const esDev=document.getElementById('dev-toggle').classList.contains('active');
  if(!fecha||!sub||!banco||!monto){mostrarToast('Completa fecha, subcategoría, banco y monto');return;}
  if(!modoEdicion&&sub!=='TC - Tarjeta Internacional'&&!_skipDuplicadoCheck){
    const hayDuplicado=detectarDuplicadoMensual(sub,fecha);
    if(hayDuplicado){
      duplicadoPendiente={fecha,sub,banco,desc,monto:parseFloat(document.getElementById('f-monto').value)||0,esDev:document.getElementById('dev-toggle').classList.contains('active')};
      document.getElementById('ov-duplicado-mensual').classList.add('open');
      bloquearScrollFondo();
      return;
    }
  }
  _skipDuplicadoCheck=false;
  if(sub==='TC - Tarjeta Internacional'&&!intlSinDist){intlContinuar();return;}
  intlSinDist=false;
  const btn=document.getElementById('btn-guardar');
  btn.disabled=true;btn.textContent='Guardando...';
  try{
    const devStr=esDev?'X':'';
    const dateSerial=Math.round(new Date(fecha).getTime()/86400000)+25569;
    const N=modoEdicion?gastoEditandoRowIndex:totalFilasGastos+2;
    const fB=`=IF(A${N}<>"";(CONCATENATE(IF(MONTH(A${N})<10;CONCATENATE("0";MONTH(A${N}));MONTH(A${N}));"-";YEAR(A${N})));if(A${N}="";"";\"Fecha no válida\"))`;
    const fD=`=IFERROR(VLOOKUP(C${N};'Par\u00e1metros'!A:B;2;FALSE);"")`;
    const fE=`=IF(G${N}<>"X";IFERROR(VLOOKUP(C${N};'Par\u00e1metros'!A:C;3;FALSE);"");IF(IFERROR(VLOOKUP(C${N};'Par\u00e1metros'!A:C;3;FALSE);"")="E";"I";"E"))`;
    const fJ=`=IF(I${N}<>"";IF(E${N}="I";IF(I${N}>0;I${N};I${N}*-1);IF(E${N}="E";IF(I${N}<0;I${N};I${N}*-1)));0)`;
    const fK=`=SUMIFs(Presupuesto!D:D;Presupuesto!A:A;B${N};Presupuesto!B:B;C${N})`;
    const row=[dateSerial,fB,sub,fD,fE,banco,devStr,desc,monto,fJ,fK];
    if(modoEdicion){
      const res=await fetch('/api/gastos',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({rowIndex:gastoEditandoRowIndex,row})});
      if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
      modoEdicion=false;gastoEditandoRowIndex=null;
      document.querySelector('#ov-nuevo .sheet-title').textContent='Nuevo gasto';
      mostrarToast('Gasto actualizado \u2713');
      cerrar('ov-nuevo');
      await cargarDatos();
      const sAct=document.querySelector('.screen.active')?.id;
      if(sAct==='screen-detalle') renderDetalle();
      if(sAct==='screen-dashboard') renderDashboard();
    }else{
      const res=await fetch('/api/gastos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({row})});
      if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
      cerrar('ov-nuevo');
      ultimoGastoGuardado={desc,monto,sub};
      const descCorta=desc.length>40?desc.slice(0,40)+'...':desc;
      document.getElementById('post-gasto-desc').textContent=`"${descCorta}" \u2014 ${fmt(monto)}`;
      document.getElementById('ov-post-gasto').classList.add('open');
      bloquearScrollFondo();
      const btnDividir=document.getElementById('post-btn-dividir');
      if(btnDividir){
        btnDividir.style.opacity='0.4';
        btnDividir.style.pointerEvents='none';
        btnDividir.querySelector('.alcance-txt-sub').textContent='Cargando datos...';
      }
      cargarDatos().then(()=>{
        setTimeout(()=>{
          if(btnDividir){
            btnDividir.style.opacity='1';
            btnDividir.style.pointerEvents='auto';
            btnDividir.querySelector('.alcance-txt-sub').textContent='Distribuir en subcategorías';
          }
        },2000);
        const screenActiva=document.querySelector('.screen.active')?.id;
        if(screenActiva==='screen-detalle') renderDetalle();
        if(screenActiva==='screen-dashboard') renderDashboard();
        if(screenActiva==='screen-home') renderHome();
      }).catch(e=>console.error('Error recargando datos:',e));
    }
  }catch(e){
    mostrarToast('Error al guardar: '+e.message);
  }finally{
    btn.disabled=false;
    btn.textContent=modoEdicion?'Guardar cambios':'Guardar gasto';
  }
});
document.getElementById('ov-ajustes').addEventListener('click',e=>{if(e.target===document.getElementById('ov-ajustes'))cerrar('ov-ajustes');});

// ── MODAL AGREGAR PRESUPUESTO ────────────────────────────
function abrirModalPpto(cat){
  catPptoPendiente=cat;
  document.getElementById('add-ppto-cat-nombre').textContent=cat;
  const mesStr=String(dashMes+1).padStart(2,'0');
  const val=`${dashAnio}-${mesStr}`;
  document.getElementById('add-ppto-desde').value=val;
  document.getElementById('add-ppto-hasta').value=val;
  document.getElementById('add-ppto-monto').value='';
  const subcatsCat=subcats.filter(s=>s.cat===cat);
  const sel=document.getElementById('add-ppto-subcat');
  sel.innerHTML=subcatsCat.map(sc=>{
    const label=sc.sub.includes(' - ')?sc.sub.split(' - ').slice(1).join(' - '):sc.sub;
    return `<option value="${sc.sub}">${label}</option>`;
  }).join('');
  document.getElementById('ov-add-ppto').classList.add('open');
}
document.getElementById('add-ppto-guardar').addEventListener('click',async()=>{
  const monto=parseInt(document.getElementById('add-ppto-monto').value)||0;
  const subSeleccionada=document.getElementById('add-ppto-subcat').value;
  if(!monto||!catPptoPendiente){mostrarToast('Completa el monto');return;}
  if(!subSeleccionada){mostrarToast('Selecciona una subcategoría');return;}
  const desdeStr=document.getElementById('add-ppto-desde').value;
  const hastaStr=document.getElementById('add-ppto-hasta').value;
  if(!desdeStr||!hastaStr){mostrarToast('Completa el rango de fechas');return;}
  const [dA,dM]=desdeStr.split('-').map(Number);
  const [hA,hM]=hastaStr.split('-').map(Number);
  const cat=catPptoPendiente;
  const nuevasFilas=[];
  let m=dM,a=dA;
  while(a<hA||(a===hA&&m<=hM)){
    const periodo=String(m).padStart(2,'0')+'-'+a;
    const idx=presupuestoAllRows.findIndex(r=>r[0]===periodo&&r[1]===subSeleccionada);
    if(idx>=0)presupuestoAllRows[idx]=[periodo,subSeleccionada,cat,monto];
    else nuevasFilas.push([periodo,subSeleccionada,cat,monto]);
    m++;if(m>12){m=1;a++;}
  }
  const allRows=[...presupuestoAllRows,...nuevasFilas];
  mostrarLoading('Guardando presupuesto...');
  try{
    const rowsLimpias=deduplicarPresupuesto(allRows);
    const res=await fetch('/api/presupuesto',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({rows:rowsLimpias})});
    if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
    mostrarToast('Presupuesto agregado \u2713');
    presupuestoAllRows=rowsLimpias;
    cerrar('ov-add-ppto');catPptoPendiente=null;
    await cargarDatos();
  }catch(e){
    mostrarToast('Error: '+e.message);
  }finally{
    ocultarLoading();
  }
});

// ── HOME ─────────────────────────────────────────────────
function prevMesAnio(mes,anio,n){
  let m=mes,a=anio;
  for(let i=0;i<n;i++){m--;if(m<0){m=11;a--;}}
  return {mes:m,anio:a};
}
function keyMesAnio(mes,anio){return String(mes+1).padStart(2,'0')+'-'+anio;}

function renderHome(){
  // ── KPI CUENTAS ──────────────────────────────────
  const allGastos=Object.values(detalleData).flat();
  const sant=allGastos.filter(g=>g.banco==='Santander').reduce((s,g)=>s+g.montoValido,0);
  const santEl=document.getElementById('kpi-sant');
  if(santEl){
    santEl.querySelector('.kpi-valor').innerHTML=window._eyeHidden.santander?'••••••':fmt(sant);
  }
  // Parte 1: montoValido donde sub = "Banco - Ingreso a Falabella desde Ahorros"
  const fala1 = allGastos
    .filter(g => g.sub === 'Banco - Ingreso a Falabella desde Ahorros')
    .reduce((s, g) => s + g.montoValido, 0);

  // Parte 2: montoValido donde sub = "Banco - Ingreso a Falabella desde Cuenta Corriente", invertido
  const fala2 = allGastos
    .filter(g => g.sub === 'Banco - Ingreso a Falabella desde Cuenta Corriente')
    .reduce((s, g) => s + g.montoValido, 0) * -1;

  // Parte 3: montoValido donde ie = "E" y banco = "Falabella"
  const fala3 = allGastos
    .filter(g => g.ie === 'E' && g.banco === 'Falabella')
    .reduce((s, g) => s + g.montoValido, 0);

  const fala = fala1 + fala2 + fala3;
  const falaEl=document.getElementById('kpi-fala');
  if(falaEl){
    falaEl.querySelector('.kpi-valor').innerHTML=window._eyeHidden.falabella?'••••••':fmt(fala);
  }

  // ── KPI ÚLTIMO MES ACTIVO FALABELLA ──────────────
  const sortedKeys=Object.keys(detalleData).sort((a,b)=>{
    const[ma,ya]=a.split('-').map(Number);
    const[mb,yb]=b.split('-').map(Number);
    return ya!==yb?ya-yb:ma-mb;
  });
  let ultimoMesFala='—',numComprasFala=0;
  for(let i=sortedKeys.length-1;i>=0;i--){
    const gastosFala=detalleData[sortedKeys[i]].filter(g=>g.banco==='Falabella');
    if(gastosFala.length>0){
      const[m,y]=sortedKeys[i].split('-').map(Number);
      ultimoMesFala=meses[m-1]+' '+y;
      numComprasFala=gastosFala.length;
      break;
    }
  }
  const falaMesEl=document.getElementById('kpi-fala-mes');
  const falaCompEl=document.getElementById('kpi-fala-compras');
  if(falaMesEl) falaMesEl.innerHTML=window._eyeAllHidden?'••••':ultimoMesFala;
  if(falaCompEl){
    falaCompEl.innerHTML=window._eyeAllHidden?'••':numComprasFala;
    const bgColor=numComprasFala>=8?'#e8f5e9':numComprasFala>=4?'#fff8e1':'#fce4ec';
    const textColor=numComprasFala>=8?'#2e7d32':numComprasFala>=4?'#f57f17':'#c62828';
    const falaBox=falaCompEl.closest('.falabella-compras');
    falaBox.style.background=bgColor;
    falaCompEl.style.color=textColor;
    const falaLabel=falaBox.querySelector('.falabella-compras-label');
    if(falaLabel) falaLabel.style.color=textColor;
  }

  // ── KPI TARJETA DE CRÉDITO ───────────────────────
  const gastosTC=allGastos.filter(g=>g.banco==='Tarjeta Crédito').reduce((s,g)=>s+g.montoValido,0);
  const gastosAbsTC=Math.abs(gastosTC);
  const pagosTC=allGastos.filter(g=>g.sub==='TC - Pago Nueva Tarjeta').reduce((s,g)=>s+g.montoValido,0)*-1;
  const deudaCuotas=cuotasData.filter(c=>c.cuotasRestantes>0).reduce((s,c)=>s+c.montoPendiente,0);
  const saldoTC=montoInicialTC-gastosAbsTC+pagosTC-deudaCuotas;
  const tcEl=document.getElementById('kpi-tc');
  if(tcEl){
    tcEl.textContent=window._eyeHidden.tc?'••••••':(saldoTC>=0?'':'-')+fmt(Math.abs(saldoTC));
    tcEl.style.color=window._eyeHidden.tc?'#8e8e93':saldoTC>=0?'#2e7d32':'#c62828';
  }

  // ── CATEGORÍAS CLAVE ─────────────────────────────
  const catKey=[
    {id:'cat-kpi-cuentas',cat:'Cuentas'},
    {id:'cat-kpi-super',cat:'Supermercado'},
    {id:'cat-kpi-mall',cat:'Mall'},
    {id:'cat-kpi-comer',cat:'Salidas a Comer'}
  ];
  const mesActualKey=keyMesAnio(dashMes,dashAnio);
  const prev1=prevMesAnio(dashMes,dashAnio,1);
  const prev2=prevMesAnio(dashMes,dashAnio,2);
  const prev3=prevMesAnio(dashMes,dashAnio,3);
  const prevKeys=[keyMesAnio(prev3.mes,prev3.anio),keyMesAnio(prev2.mes,prev2.anio),keyMesAnio(prev1.mes,prev1.anio)];

  const periodoEl=document.getElementById('home-cat-periodo');
  if(periodoEl){
    const mActual=mesesC[dashMes]+' '+dashAnio;
    const m1=mesesC[prev3.mes];
    const m3=mesesC[prev1.mes];
    periodoEl.textContent=mActual+' vs prom. '+m1+'–'+m3;
  }

  function sumaEgresosCat(key,cat){
    return (detalleData[key]||[]).filter(g=>g.ie==='E'&&g.cat===cat).reduce((s,g)=>s+g.monto,0);
  }

  catKey.forEach(({id,cat})=>{
    const el=document.getElementById(id);
    if(!el) return;
    const actual=sumaEgresosCat(mesActualKey,cat);
    const prom=(sumaEgresosCat(prevKeys[0],cat)+sumaEgresosCat(prevKeys[1],cat)+sumaEgresosCat(prevKeys[2],cat))/3;
    const diff=prom>0?Math.round((actual-prom)/prom*100):0;
    const diffOk=diff<=0;
    const barPct=prom>0?Math.min((actual/prom)*100,100):0;
    const barColor=diffOk?'#2e7d32':'#e53935';
    el.querySelector('.cat-kpi-monto').innerHTML=window._eyeAllHidden?'<span style="color:var(--color-text-tertiary);letter-spacing:2px;">••••</span>':fmt(actual);
    el.querySelector('.cat-kpi-comparacion').innerHTML=window._eyeAllHidden?'':
      `<span class="cat-kpi-prom">prom ${fmt(prom)}</span>`+
      (prom>0?`<span class="cat-kpi-diff ${diffOk?'diff-ok':'diff-over'}">${diff>0?'+':''}${diff}%</span>`:'');
    el.querySelector('.cat-kpi-fill').style.width=window._eyeAllHidden?'100%':barPct+'%';
    el.querySelector('.cat-kpi-fill').style.background=window._eyeAllHidden?'var(--color-border-tertiary)':barColor;
  });

  renderHomeGrafico();

  // Gráfico proyección cuotas TC
  if(cuotasData&&cuotasData.length>0){
    renderCuotasHomeChart();
  }else{
    cargarCuotas().then(()=>{
      if(cuotasData.length>0)renderCuotasHomeChart();
    });
  }
}

let evoSelCat=null;
let evoSelSub=null;
let evoChart=null;

function evoGetCats(){
  return [...new Set(subcats.filter(s=>s.ie==='E'&&!EXCLUDED_CATS.includes(s.cat)).map(s=>s.cat))].sort();
}

function evoGetSubs(cat){
  return subcats.filter(s=>s.ie==='E'&&s.cat===cat).map(s=>{
    return s.sub.includes(' - ')?s.sub.split(' - ').slice(1).join(' - '):s.sub;
  }).sort();
}

function evoRenderDd(ddEl,items,onSelectFn,currentSel){
  if(!items.length){
    ddEl.innerHTML='<div style="padding:8px 12px;font-size:12px;color:#999;">Sin resultados</div>';
    return;
  }
  ddEl.innerHTML=items.map(it=>`
    <div onmousedown="event.preventDefault()" onclick="(${onSelectFn.toString()})('${it.replace(/'/g,"\\'")}')"
      style="padding:8px 12px;font-size:13px;cursor:pointer;border-bottom:0.5px solid #f0f0f0;background:${currentSel===it?'#e8f0fe':'#fff'};color:${currentSel===it?'#1a73e8':'#111'};">
      ${it}
    </div>`).join('');
}

function evoOpenCat(){
  const q=document.getElementById('inp-evo-cat').value;
  evoFilterCat(q);
}

function evoFilterCat(q){
  const query=(q||'').toLowerCase();
  const items=evoGetCats().filter(c=>c.toLowerCase().includes(query));
  const dd=document.getElementById('dd-evo-cat');
  dd.style.display='block';
  evoRenderDd(dd,items,evoSelectCat,evoSelCat);
}

function evoSelectCat(cat){
  evoSelCat=cat;
  evoSelSub=null;
  const inp=document.getElementById('inp-evo-cat');
  inp.value=cat;
  inp.style.borderColor='#1a73e8';
  inp.style.background='#e8f0fe';
  inp.style.color='#1a73e8';
  inp.style.fontWeight='500';
  document.getElementById('clear-evo-cat').style.display='block';
  document.getElementById('dd-evo-cat').style.display='none';
  const subInp=document.getElementById('inp-evo-sub');
  subInp.disabled=false;
  subInp.style.opacity='1';
  subInp.value='';
  subInp.style.borderColor='#e0e0e0';
  subInp.style.background='#f5f5f5';
  subInp.style.color='#111';
  subInp.style.fontWeight='normal';
  document.getElementById('clear-evo-sub').style.display='none';
  renderHomeGrafico();
}

function resetEvoCat(){
  evoSelCat=null;
  evoSelSub=null;
  const ci=document.getElementById('inp-evo-cat');
  ci.value='';ci.style.borderColor='#e0e0e0';ci.style.background='#f5f5f5';
  ci.style.color='#111';ci.style.fontWeight='normal';
  document.getElementById('clear-evo-cat').style.display='none';
  document.getElementById('dd-evo-cat').style.display='none';
  const si=document.getElementById('inp-evo-sub');
  si.disabled=true;si.value='';si.style.opacity='0.5';
  si.style.borderColor='#e0e0e0';si.style.background='#f5f5f5';
  si.style.color='#111';si.style.fontWeight='normal';
  document.getElementById('clear-evo-sub').style.display='none';
  renderHomeGrafico();
}

function evoOpenSub(){
  if(!evoSelCat) return;
  evoFilterSub('');
}

function evoFilterSub(q){
  const query=(q||'').toLowerCase();
  const items=evoGetSubs(evoSelCat).filter(s=>s.toLowerCase().includes(query));
  const dd=document.getElementById('dd-evo-sub');
  dd.style.display='block';
  evoRenderDd(dd,items,evoSelectSub,evoSelSub);
}

function evoSelectSub(sub){
  evoSelSub=sub;
  const inp=document.getElementById('inp-evo-sub');
  inp.value=sub;
  inp.style.borderColor='#1a73e8';
  inp.style.background='#e8f0fe';
  inp.style.color='#1a73e8';
  inp.style.fontWeight='500';
  document.getElementById('clear-evo-sub').style.display='block';
  document.getElementById('dd-evo-sub').style.display='none';
  renderHomeGrafico();
}

function resetEvoSub(){
  evoSelSub=null;
  const si=document.getElementById('inp-evo-sub');
  si.value='';si.style.borderColor='#e0e0e0';si.style.background='#f5f5f5';
  si.style.color='#111';si.style.fontWeight='normal';
  document.getElementById('clear-evo-sub').style.display='none';
  renderHomeGrafico();
}

function renderHomeGrafico(){
  if(typeof Chart==='undefined'){
    const script=document.createElement('script');
    script.src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
    script.onload=()=>renderHomeGrafico();
    document.head.appendChild(script);
    return;
  }

  const canvas=document.getElementById('home-line-chart-canvas');
  if(!canvas) return;

  const inpCat=document.getElementById('inp-evo-cat');
  const inpSub=document.getElementById('inp-evo-sub');
  if(inpCat&&!inpCat._evoListeners){
    inpCat._evoListeners=true;
    inpCat.addEventListener('input',()=>evoFilterCat(inpCat.value));
    inpCat.addEventListener('focus',()=>evoOpenCat());
  }
  if(inpSub&&!inpSub._evoListeners){
    inpSub._evoListeners=true;
    inpSub.addEventListener('input',()=>evoFilterSub(inpSub.value));
    inpSub.addEventListener('focus',()=>evoOpenSub());
  }

  if(!window._evoClickListenerSet){
    window._evoClickListenerSet=true;
    document.addEventListener('click',e=>{
      if(!e.target.closest('#wrap-evo-cat'))document.getElementById('dd-evo-cat').style.display='none';
      if(!e.target.closest('#wrap-evo-sub'))document.getElementById('dd-evo-sub').style.display='none';
    });
  }

  if(window._eyeAllHidden){
    if(evoChart){evoChart.destroy();evoChart=null;}
    canvas.style.visibility='hidden';
    return;
  }
  canvas.style.visibility='visible';

  const puntos=[];
  for(let i=11;i>=0;i--){
    const{mes,anio}=prevMesAnio(dashMes,dashAnio,i);
    const key=keyMesAnio(mes,anio);
    const gastos=detalleData[key]||[];
    let gasto=0;
    gastos.forEach(g=>{
      if(g.ie!=='E') return;
      if(EXCLUDED_CATS.includes(g.cat)) return;
      if(evoSelCat&&g.cat!==evoSelCat) return;
      if(evoSelSub){
        const label=g.sub.includes(' - ')?g.sub.split(' - ').slice(1).join(' - '):g.sub;
        if(label!==evoSelSub&&g.sub!==evoSelSub) return;
      }
      gasto+=g.monto;
    });
    let ppto=0;
    const rowsMes=presupuestoAllRows.filter(r=>r&&(r[0]||'').trim()===key);
    rowsMes.forEach(r=>{
      const sub=(r[1]||'').trim();
      const sc=subcats.find(s=>s.sub.trim()===sub);
      if(!sc||sc.ie!=='E'||EXCLUDED_CATS.includes(sc.cat)) return;
      if(evoSelCat&&sc.cat!==evoSelCat) return;
      if(evoSelSub){
        const label=sub.includes(' - ')?sub.split(' - ').slice(1).join(' - '):sub;
        if(label!==evoSelSub&&sub!==evoSelSub) return;
      }
      ppto+=parseMonto(r[3])||0;
    });
    puntos.push({mes,anio,gasto,ppto,label:mesesC[mes]});
  }

  const promedio=Math.round(puntos.reduce((s,p)=>s+p.gasto,0)/puntos.length);

  if(evoChart){evoChart.destroy();evoChart=null;}

  evoChart=new Chart(canvas,{
    type:'line',
    data:{
      labels:puntos.map(p=>p.label),
      datasets:[
        {
          label:'Gasto real',
          data:puntos.map(p=>p.gasto),
          borderColor:'#e53935',
          backgroundColor:'rgba(229,57,53,0.07)',
          fill:true,
          tension:0.3,
          pointRadius:4,
          pointBackgroundColor:'#e53935',
          borderWidth:2,
        },
        {
          label:'Presupuesto',
          data:puntos.map(p=>p.ppto),
          borderColor:'#1a73e8',
          borderDash:[5,4],
          borderWidth:1.5,
          pointRadius:0,
          fill:false,
          tension:0,
        },
        {
          label:'Promedio 12m',
          data:Array(12).fill(promedio),
          borderColor:'#2e7d32',
          borderDash:[3,3],
          borderWidth:1.5,
          pointRadius:0,
          fill:false,
          tension:0,
        }
      ]
    },
    options:{
      responsive:true,
      maintainAspectRatio:false,
      interaction:{mode:'index',intersect:false},
      plugins:{
        legend:{display:false},
        tooltip:{
          callbacks:{
            label:c=>`${c.dataset.label}: $${Math.round(c.raw).toLocaleString('es-CL')}`
          }
        }
      },
      scales:{
        x:{grid:{display:false},ticks:{font:{size:10},color:'#aaa'}},
        y:{
          grid:{color:'rgba(0,0,0,0.05)'},
          border:{display:false},
          ticks:{
            font:{size:10},color:'#aaa',
            callback:v=>v>=1000000?'$'+(v/1000000).toFixed(1)+'M':v>=1000?'$'+Math.round(v/1000)+'k':'$'+v
          }
        }
      }
    }
  });

  const legendEl=document.getElementById('home-chart-legend-new');
  if(legendEl){
    legendEl.innerHTML=`
      <div style="display:flex;align-items:center;gap:5px;font-size:10px;color:#888;">
        <div style="width:8px;height:8px;border-radius:50%;background:#e53935;flex-shrink:0;"></div>Gasto real
      </div>
      <div style="display:flex;align-items:center;gap:5px;font-size:10px;color:#888;">
        <svg width="18" height="8" viewBox="0 0 18 8"><line x1="0" y1="4" x2="18" y2="4" stroke="#1a73e8" stroke-width="1.5" stroke-dasharray="4,3"/></svg>Presupuesto
      </div>
      <div style="display:flex;align-items:center;gap:5px;font-size:10px;color:#888;">
        <svg width="18" height="8" viewBox="0 0 18 8"><line x1="0" y1="4" x2="18" y2="4" stroke="#2e7d32" stroke-width="1.5" stroke-dasharray="3,3"/></svg>Promedio 12m
      </div>`;
  }
}

// ── VALIDACIÓN PAGOS ─────────────────────────────────────

function getValMedioClass(modo){
  if(!modo) return 'val-medio-otro';
  const m=modo.toLowerCase();
  if(m.includes('transferencia')) return 'val-medio-transf';
  if(m.includes('tarjeta c')||m.includes('tc')) return 'val-medio-tc';
  if(m.includes('débito')||m.includes('debito')) return 'val-medio-debito';
  return 'val-medio-otro';
}

function clamp50k(n){return Math.floor(Math.max(0,n)/50000)*50000;}

function calcAporteSaldo(s){
  if(s.ppto<=0)return 0;
  if(s.estado==='unpaid')return s.ppto;
  if(s.estado==='paid'&&s.ppto>s.pagado)return s.ppto-s.pagado;
  return 0;
}

function setValFiltroEstado(val){valFiltroEstado=val;renderValidacion();}
function setValFiltroCategoria(val){valFiltroCategoria=val;renderValidacion();}
function setValFiltroMedio(val){valFiltroMedio=val;renderValidacion();}

function toggleValFiltros(){
  valFiltrosPanelAbierto=!valFiltrosPanelAbierto;
  const panel=document.getElementById('val-filtros-panel');
  const chev=document.getElementById('val-filtros-chevron');
  if(panel) panel.style.display=valFiltrosPanelAbierto?'block':'none';
  if(chev) chev.style.transform=valFiltrosPanelAbierto?'rotate(180deg)':'rotate(0deg)';
}

function limpiarValFiltros(){
  valFiltroEstado='todos';
  valFiltroCategoria='todos';
  valFiltroMedio='todos';
  renderValidacion();
}

function postGastoDetalle(){
  cerrar('ov-post-gasto');
  switchScreen('detalle');
}

function postGastoDividir(){
  cerrar('ov-post-gasto');
  if(!ultimoGastoGuardado) return;
  let gastoEncontrado=null;
  for(const gastos of Object.values(detalleData)){
    const g=gastos.find(x=>
      x.desc===ultimoGastoGuardado.desc &&
      x.monto===ultimoGastoGuardado.monto &&
      x.sub===ultimoGastoGuardado.sub
    );
    if(g){gastoEncontrado=g;break;}
  }
  if(!gastoEncontrado){mostrarToast('No se encontró el gasto para dividir');return;}
  gastoActual=gastoEncontrado;
  document.getElementById('g-desc').textContent=gastoActual.desc;
  document.getElementById('g-monto').textContent=(gastoActual.ie==='E'?'- ':'+ ')+fmt(gastoActual.monto);
  document.getElementById('ov-gasto-vista-a').style.display='none';
  document.getElementById('ov-gasto-vista-b').style.display='block';
  abrirVistaDividir();
  document.getElementById('ov-gasto').classList.add('open');
  bloquearScrollFondo();
}

function postGastoNuevo(){
  cerrar('ov-post-gasto');
  abrirNuevoGasto();
}

function renderValidacion(){
  document.getElementById('val-mes').textContent=`${meses[valMes]} ${valAnio}`;
  const key=`${String(valMes+1).padStart(2,'0')}-${valAnio}`;
  const gastosMes=detalleData[key]||[];

  const allGastos=Object.values(detalleData).flat();
  const santander=allGastos.filter(g=>g.banco==='Santander').reduce((s,g)=>s+g.montoValido,0);

  const ahorroMes=gastosMes.filter(g=>g.cat==='Ahorro en Cuenta Vista').reduce((s,g)=>s+g.monto,0);

  const pptoMes=presupuestoAllRows.filter(r=>r&&(r[0]||'').trim()===key);
  const pptoMesDedup=new Map();
  pptoMes.forEach(r=>{const sub=(r[1]||'').trim();if(sub&&!pptoMesDedup.has(sub))pptoMesDedup.set(sub,r);});
  const subcatsConPpto=Array.from(pptoMesDedup.values())
    .filter(r=>{
      const sub=(r[1]||'').trim();
      const sc=subcats.find(s=>s.sub.trim()===sub);
      return sc&&sc.ie==='E'&&!EXCLUDED_CATS.includes(sc.cat);
    })
    .map(r=>{
      const sub=(r[1]||'').trim();
      const sc=subcats.find(s=>s.sub.trim()===sub)||{};
      const monto=parseMonto(r[3])||0;
      const gastosSubcat=gastosMes.filter(g=>g.sub.trim()===sub&&g.ie==='E');
      const pagado=gastosSubcat.reduce((s,g)=>s+g.monto,0);
      const estado=gastosSubcat.length>0?'paid':'unpaid';
      return{sub,cat:sc.cat||(r[2]||''),modo:sc.modo||'',ppto:monto,pagado,estado};
    });

  const subsConPptoSet=new Set(subcatsConPpto.map(s=>s.sub.trim()));
  const gastosExtra=gastosMes
    .filter(g=>g.ie==='E'&&!EXCLUDED_CATS.includes(g.cat)&&!subsConPptoSet.has(g.sub.trim()))
    .reduce((acc,g)=>{
      const subKey=g.sub.trim();
      if(!acc[subKey]){
        const sc=subcats.find(s=>s.sub.trim()===subKey)||{};
        acc[subKey]={sub:subKey,cat:g.cat,modo:sc.modo||'',ppto:0,pagado:0,estado:'paid'};
      }
      acc[subKey].pagado+=g.monto;
      return acc;
    },{});
  const todasSubcats=[...subcatsConPpto,...Object.values(gastosExtra)];

  const transferPendiente=subcatsConPpto
    .filter(s=>(s.modo||'').toLowerCase().includes('transferencia')&&s.estado==='unpaid'&&s.ppto>0)
    .reduce((sum,s)=>sum+s.ppto,0);

  const ahorroSugerido=clamp50k(santander-transferPendiente);

  const grupos={};
  todasSubcats.forEach(s=>{
    if(!grupos[s.cat]) grupos[s.cat]=[];
    grupos[s.cat].push(s);
  });

  const gruposFiltrados=Object.entries(grupos).reduce((acc,[cat,items])=>{
    let filtItems=items;
    if(valFiltroEstado==='pagado') filtItems=items.filter(s=>s.estado==='paid');
    else if(valFiltroEstado==='pendiente') filtItems=items.filter(s=>s.estado==='unpaid'&&s.ppto>0);
    if(valFiltroCategoria!=='todos'&&cat!==valFiltroCategoria) return acc;
    if(valFiltroMedio!=='todos'){
      filtItems=filtItems.filter(s=>{
        const modo=(s.modo||'').toLowerCase();
        if(valFiltroMedio==='tc') return modo.includes('tarjeta');
        if(valFiltroMedio==='transf') return modo.includes('transferencia');
        if(valFiltroMedio==='sin') return !modo||modo==='';
        return true;
      });
    }
    if(filtItems.length>0) acc[cat]=filtItems;
    return acc;
  },{});

  const totalPagado=todasSubcats.reduce((s,i)=>s+i.pagado,0);
  const totalPpto=subcatsConPpto.reduce((s,i)=>s+i.ppto,0);
  const countPagados=subcatsConPpto.filter(s=>s.estado==='paid').length;
  const countTotal=subcatsConPpto.length;

  const subcatsParaSaldo=valFiltroCategoria==='todos'
    ?subcatsConPpto
    :subcatsConPpto.filter(s=>s.cat===valFiltroCategoria);

  const subcatsConSaldo=subcatsParaSaldo.filter(s=>calcAporteSaldo(s)>0);
  const saldoDisponible=subcatsConSaldo.reduce((sum,s)=>sum+calcAporteSaldo(s),0);
  const countPendientes=subcatsConSaldo.length;

  const cats=Object.keys(grupos).sort();

  let html='';

  const ahorroRealizado=ahorroMes>0;
  html+=`<div class="val-ahorro-card ${ahorroRealizado?'realizado':''}">
    <div class="val-ahorro-title">${ahorroRealizado?'AHORRO REALIZADO ESTE MES':'CÁLCULO AHORRO DISPONIBLE'}</div>`;
  if(ahorroRealizado){
    html+=`<div style="display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div class="val-ahorro-total">${fmt(ahorroMes)}</div>
        <div style="font-size:11px;color:#4caf50;margin-top:2px;">Cuenta Vista</div>
      </div>
      <span class="val-ahorro-badge badge-ahorrado">Ahorrado ✓</span>
    </div>`;
  }else{
    html+=`<div class="val-ahorro-row"><span style="color:#555;">Cuenta Santander</span><span>${fmt(santander)}</span></div>
    <div class="val-ahorro-row"><span style="color:#555;">— Transf. planificadas pendientes</span><span style="color:#c62828;">− ${fmt(transferPendiente)}</span></div>
    <div class="val-ahorro-divider"></div>
    <div class="val-ahorro-row" style="margin-bottom:4px;"><span style="color:#555;">Subtotal</span><span>${fmt(santander-transferPendiente)}</span></div>
    <div style="display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div class="val-ahorro-total">${fmt(ahorroSugerido)}</div>
        <div style="font-size:11px;color:#1a73e8;margin-top:2px;">Redondeado a bloques de $50.000</div>
      </div>
      <span class="val-ahorro-badge badge-pendiente">Pendiente</span>
    </div>`;
  }
  html+=`</div>`;

  html+=`<div class="val-summary-grid" style="grid-template-columns: repeat(3, minmax(0, 1fr));">
    <div class="val-s-card">
      <div class="val-s-label">TOTAL PAGADO</div>
      <div class="val-s-valor" style="color:#1a73e8;">${fmt(totalPagado)}</div>
      <div class="val-s-sub">${countPagados} de ${countTotal} ítems</div>
    </div>
    <div class="val-s-card">
      <div class="val-s-label">TOTAL PRESUPUESTADO</div>
      <div class="val-s-valor">${fmt(totalPpto)}</div>
      <div class="val-s-sub">${totalPpto>0?Math.round(totalPagado/totalPpto*100)+'% ejecutado':'—'}</div>
    </div>
    <div class="val-s-card">
      <div class="val-s-label">SALDO DISPONIBLE${valFiltroCategoria!=='todos'?`<br><span style="color:#1a73e8;font-size:9px;font-weight:400;">${valFiltroCategoria}</span>`:''}</div>
      <div style="display:flex;align-items:baseline;gap:6px;">
        <div class="val-s-valor" style="font-size:clamp(13px,2.5vw,16px);color:${saldoDisponible>0?'#2e7d32':'#999'};">${fmt(saldoDisponible)}</div>
        ${saldoDisponible>0?`<button onclick="abrirSaldoDetalle()" style="font-size:10px;padding:2px 7px;border-radius:6px;border:0.5px solid #2e7d32;background:#e8f5e9;color:#2e7d32;cursor:pointer;font-family:inherit;white-space:nowrap;">ver</button>`:''}
      </div>
      <div class="val-s-sub">${countPendientes} ítem${countPendientes!==1?'s':''}</div>
    </div>
  </div>`;

  html+=`<div class="val-legend">
    <div class="val-legend-item"><div class="val-legend-dot" style="background:#e8f5e9;border:1.5px solid #a5d6a7;"></div>Pagado</div>
    <div class="val-legend-item"><div class="val-legend-dot" style="background:#f5f5f5;border:1.5px solid #e0e0e0;"></div>Pendiente</div>
  </div>`;

  html += `
<div style="margin:0 12px 8px;">
  <button onclick="toggleValFiltros()" style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:#f5f5f5;border:0.5px solid #e0e0e0;border-radius:10px;font-family:inherit;cursor:pointer;font-size:13px;color:#555;">
    <div style="display:flex;align-items:center;gap:8px;">
      <span style="font-size:14px;">⚙</span>
      <span style="font-weight:500;">Filtros</span>
      ${[valFiltroEstado,valFiltroCategoria,valFiltroMedio].filter(f=>f!=='todos').length>0
        ? `<span style="background:#1a73e8;color:#fff;font-size:10px;padding:1px 7px;border-radius:10px;font-weight:500;">activos</span>`
        : ''}
    </div>
    <span id="val-filtros-chevron" style="font-size:11px;color:#bbb;transition:transform 0.2s;display:inline-block;transform:${valFiltrosPanelAbierto ? 'rotate(180deg)' : 'rotate(0deg)'};">▼</span>
  </button>

  <div id="val-filtros-panel" style="display:${valFiltrosPanelAbierto ? 'block' : 'none'};border:0.5px solid #e0e0e0;border-top:none;border-radius:0 0 10px 10px;padding:12px 12px 10px;background:#fff;margin-top:-1px;">

    <div style="margin-bottom:10px;">
      <div style="font-size:10px;color:#888;font-weight:500;letter-spacing:0.06em;margin-bottom:6px;">ESTADO</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        ${[{val:'todos',label:'Todos'},{val:'pagado',label:'Pagados'},{val:'pendiente',label:'Pendientes'}].map(o =>
          `<button class="val-chip ${valFiltroEstado===o.val?'active':''}" onclick="setValFiltroEstado('${o.val}')">${o.label}</button>`
        ).join('')}
      </div>
    </div>

    <div style="margin-bottom:10px;">
      <div style="font-size:10px;color:#888;font-weight:500;letter-spacing:0.06em;margin-bottom:6px;">MÉTODO DE PAGO</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${[{val:'todos',label:'Todos'},{val:'tc',label:'Tarjeta Crédito'},{val:'transf',label:'Transferencia'},{val:'sin',label:'Sin definir'}].map(o=>
          `<button class="val-chip ${valFiltroMedio===o.val?'active':''}" onclick="setValFiltroMedio('${o.val}')">${o.label}</button>`
        ).join('')}
      </div>
    </div>

    <div>
      <div style="font-size:10px;color:#888;font-weight:500;letter-spacing:0.06em;margin-bottom:6px;">CATEGORÍA</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        <button class="val-chip ${valFiltroCategoria==='todos'?'active':''}" onclick="setValFiltroCategoria('todos')">Todas las cats.</button>
        ${cats.map(c => {
          const cs = c.replace(/'/g, "\\'");
          return `<button class="val-chip ${valFiltroCategoria===c?'active':''}" onclick="setValFiltroCategoria('${cs}')">${c}</button>`;
        }).join('')}
      </div>
    </div>

    <button onclick="limpiarValFiltros()" style="margin-top:10px;padding:6px 14px;background:#f5f5f5;color:#666;border:0.5px solid #e0e0e0;border-radius:8px;font-size:12px;cursor:pointer;font-family:inherit;">
      Limpiar filtros
    </button>
  </div>
</div>`;

  Object.entries(gruposFiltrados).forEach(([cat,items])=>{
    const realGrupo=items.reduce((s,i)=>s+i.pagado,0);
    const pptoGrupo=items.reduce((s,i)=>s+i.ppto,0);
    const itemsHTML=items.map(item=>{
      const diff=item.ppto>0?item.pagado-item.ppto:0;
      const diffHTML=item.ppto>0
        ?`<div class="${diff>0?'val-diff-over':'val-diff-ok'}">${diff>0?'+':''}${fmt(diff)}</div>`
        :'';
      const medioClass=getValMedioClass(item.modo);
      return`<div class="val-item-row">
        <div class="val-check"><div class="val-dot ${item.estado}">${item.estado==='paid'?'✓':''}</div></div>
        <div class="val-info">
          <div class="val-name">${item.sub.includes(' - ')?item.sub.split(' - ').slice(1).join(' - '):item.sub}</div>
          <div class="val-meta">
            ${item.modo?`<span class="val-medio ${medioClass}">${item.modo}</span>`:''}
            ${item.ppto>0?`<span>Ppto: ${fmt(item.ppto)}</span>`:'<span>Sin presupuesto</span>'}
          </div>
        </div>
        <div class="val-montos">
          <div class="val-pagado" style="${item.pagado===0?'color:#999':''}">${item.pagado>0?fmt(item.pagado):'—'}</div>
          ${diffHTML}
        </div>
      </div>`;
    }).join('');

    html+=`<div class="val-cat-block">
      <div class="val-group-header">
        <span>${cat.toUpperCase()}</span>
        <span>${fmt(realGrupo)} / ${pptoGrupo>0?fmt(pptoGrupo):'—'}</span>
      </div>
      ${itemsHTML}
      <div class="val-subtotal">
        <span style="font-weight:500;color:#555;">Subtotal</span>
        <span style="font-weight:500;">${fmt(realGrupo)}${pptoGrupo>0?` <span style="color:#999;font-weight:400;">de ${fmt(pptoGrupo)}</span>`:''}</span>
      </div>
    </div>`;
  });

  if(Object.keys(gruposFiltrados).length===0){
    html+=`<div style="padding:40px 16px;text-align:center;font-size:13px;color:#999;">No hay ítems con este filtro</div>`;
  }

  document.getElementById('val-content').innerHTML=html;
}

window.toggleSaldoGrupo=toggleSaldoGrupo;
function toggleSaldoGrupo(id){
  const el=document.getElementById(id);
  const chev=document.getElementById(id+'-chev');
  if(!el)return;
  const isOpen=el.style.display!=='none';
  el.style.display=isOpen?'none':'block';
  if(chev)chev.style.transform=isOpen?'rotate(-90deg)':'rotate(0deg)';
}

window.abrirSaldoDetalle=abrirSaldoDetalle;

function abrirSaldoDetalle(){
  const key=`${String(valMes+1).padStart(2,'0')}-${valAnio}`;
  const gastosMes=detalleData[key]||[];

  const pptoMes=presupuestoAllRows.filter(r=>r&&(r[0]||'').trim()===key);
  const pptoMesDedup=new Map();
  pptoMes.forEach(r=>{
    const sub=(r[1]||'').trim();
    if(sub&&!pptoMesDedup.has(sub))pptoMesDedup.set(sub,r);
  });

  const subcatsConPptoLocal=Array.from(pptoMesDedup.values())
    .filter(r=>{
      const sub=(r[1]||'').trim();
      const sc=subcats.find(s=>s.sub.trim()===sub);
      return sc&&sc.ie==='E'&&!EXCLUDED_CATS.includes(sc.cat);
    })
    .map(r=>{
      const sub=(r[1]||'').trim();
      const sc=subcats.find(s=>s.sub.trim()===sub)||{};
      const monto=parseMonto(r[3])||0;
      const gastosSubcat=gastosMes.filter(g=>g.sub.trim()===sub&&g.ie==='E');
      const pagado=gastosSubcat.reduce((s,g)=>s+g.monto,0);
      const estado=gastosSubcat.length>0?'paid':'unpaid';
      return{sub,cat:sc.cat||(r[2]||''),modo:sc.modo||'',ppto:monto,pagado,estado};
    });

  const filtradas=valFiltroCategoria==='todos'
    ?subcatsConPptoLocal
    :subcatsConPptoLocal.filter(s=>s.cat===valFiltroCategoria);

  const conSaldo=filtradas
    .map(s=>({...s,aporte:calcAporteSaldo(s)}))
    .filter(s=>s.aporte>0)
    .sort((a,b)=>b.aporte-a.aporte);

  const total=conSaldo.reduce((sum,s)=>sum+s.aporte,0);

  const grupos={};
  conSaldo.forEach(s=>{
    if(!grupos[s.cat])grupos[s.cat]=[];
    grupos[s.cat].push(s);
  });

  let html='';
  Object.entries(grupos).forEach(([cat,items],idx)=>{
    const totalCat=items.reduce((sum,s)=>sum+s.aporte,0);
    const groupId='saldo-grp-'+idx;
    html+=`<div style="margin-bottom:6px;border:0.5px solid #e8e8e8;border-radius:10px;overflow:hidden;">
    <div onclick="toggleSaldoGrupo('${groupId}')" style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;background:#f9f9f9;cursor:pointer;user-select:none;">
      <div style="display:flex;align-items:center;gap:8px;">
        <span id="${groupId}-chev" style="font-size:11px;color:#bbb;transition:transform 0.2s;display:inline-block;">▼</span>
        <span style="font-size:11px;font-weight:500;color:#555;letter-spacing:0.05em;">${cat.toUpperCase()}</span>
      </div>
      <span style="font-size:13px;font-weight:500;color:#111;">${fmt(totalCat)}</span>
    </div>
    <div id="${groupId}" style="display:block;">`;
    items.forEach(s=>{
      const label=s.sub.includes(' - ')?s.sub.split(' - ').slice(1).join(' - '):s.sub;
      const esNoPagado=s.estado==='unpaid';
      const tagColor=esNoPagado?'#e8f0fe':'#e8f5e9';
      const tagText=esNoPagado?'No pagado':'Saldo a favor';
      const tagTextColor=esNoPagado?'#1a73e8':'#2e7d32';
      html+=`<div style="display:flex;align-items:center;justify-content:space-between;padding:9px 12px;border-bottom:0.5px solid #f5f5f5;background:#fff;">
      <div style="flex:1;min-width:0;">
        <div style="font-size:13px;color:#111;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${label}</div>
        <div style="font-size:11px;color:#999;margin-top:2px;display:flex;gap:6px;align-items:center;">
          <span style="background:${tagColor};color:${tagTextColor};padding:1px 6px;border-radius:4px;font-size:10px;font-weight:500;">${tagText}</span>
          ${!esNoPagado?`<span>Pagado: ${fmt(s.pagado)} de ${fmt(s.ppto)}</span>`:`<span>Ppto: ${fmt(s.ppto)}</span>`}
        </div>
      </div>
      <div style="font-size:14px;font-weight:500;color:#111;flex-shrink:0;margin-left:12px;">${fmt(s.aporte)}</div>
    </div>`;
    });
    html+=`</div></div>`;
  });

  html+=`<div style="display:flex;justify-content:space-between;align-items:center;padding:14px 4px 4px;border-top:0.5px solid #e0e0e0;margin-top:6px;">
    <span style="font-size:14px;font-weight:500;">Total disponible</span>
    <span style="font-size:16px;font-weight:500;color:#2e7d32;">${fmt(total)}</span>
  </div>`;

  document.getElementById('saldo-detalle-content').innerHTML=html;
  document.getElementById('ov-saldo-detalle').classList.add('open');
  bloquearScrollFondo();
}

// ── INIT ─────────────────────────────────────────────────
document.getElementById('val-prev').addEventListener('click',()=>{valMes--;if(valMes<0){valMes=11;valAnio--;}renderValidacion();});
document.getElementById('val-next').addEventListener('click',()=>{valMes++;if(valMes>11){valMes=0;valAnio++;}renderValidacion();});
document.getElementById('ov-saldo-detalle').addEventListener('click',e=>{if(e.target===document.getElementById('ov-saldo-detalle'))cerrar('ov-saldo-detalle');});

// ── CUOTAS TC ────────────────────────────────────────────
let cuotasData=[];
let cuotasTab='activas';
let cuotaPendientePago=null;
let cuotaTarjetaSeleccionada='Gold';

function serialToDate(serial){
  if(!serial&&serial!==0)return '';
  const s=String(serial).trim();
  if(/^\d{4}-\d{2}-\d{2}$/.test(s))return s;
  if(/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(s)){const[d,m,y]=s.split('/');return y+'-'+m.padStart(2,'0')+'-'+d.padStart(2,'0');}
  const num=parseFloat(s);
  if(!isNaN(num)&&num>1000){const d=new Date(Math.round((num-25569)*86400000));return d.toISOString().slice(0,10);}
  return s;
}

function cuotaMesLabel(fechaISO,offsetMeses){
  if(!fechaISO)return '—';
  const fecha=isNaN(fechaISO)?fechaISO:serialToDate(fechaISO);
  if(!fecha)return '—';
  const d=new Date(fecha+'T00:00:00');
  if(isNaN(d.getTime()))return '—';
  d.setMonth(d.getMonth()+offsetMeses);
  return mesesC[d.getMonth()]+' '+d.getFullYear();
}
function fmtMesDesdeSerial(val){
  if(!val)return '—';
  const iso=serialToDate(val);
  if(!iso||iso.length<7)return '—';
  const d=new Date(iso+'T00:00:00');
  if(isNaN(d.getTime()))return '—';
  return mesesC[d.getMonth()]+' '+d.getFullYear();
}
function fmtFechaCorta(fechaISO){
  if(!fechaISO||fechaISO.length<10)return '—';
  const[y,m,d]=fechaISO.split('-');
  return d+'/'+m+'/'+y;
}

async function cargarCuotas(){
  try{
    const res=await fetch('/api/cuotas');
    if(!res.ok)return;
    const rows=await res.json();
    cuotasData=rows
      .filter(r=>r&&r[0])
      .map((r,idx)=>{
        console.log('[Cuotas] fila',idx,'| B:',r[0],'| C:',r[1],'| H:',r[6],'| J:',r[8],'| K:',r[9],'| L:',r[10]);
        return {
          rowOffset:       idx,
          item:            (r[0]||'').trim(),
          fechaCompra:     serialToDate(r[1]),
          tarjeta:         (r[2]||'').trim(),
          montoTotal:      parseMonto(r[3])||0,
          numeroCuotas:    parseInt(r[4])||0,
          cuotasPagadas:   parseInt(r[5])||0,
          mesSiguiente:    serialToDate(r[6]),
          mesSubsiguiente: serialToDate(r[7]),
          valorCuota:      parseMonto(r[8])||0,
          cuotasRestantes: parseInt(r[9])||0,
          montoPendiente:  parseMonto(r[10])||0,
          ultimaCuotaFecha:'',
        };
      });
    cuotasData.forEach(c=>{
      const pagos=Object.values(detalleData)
        .flat()
        .filter(g=>g.sub==='TC - Pagos en Cuotas'&&g.desc.startsWith(c.item))
        .sort((a,b)=>b.fecha.localeCompare(a.fecha));
      c.ultimaCuotaFecha=pagos.length>0?pagos[0].fecha:'';
    });
  }catch(e){console.error('Error cargando cuotas:',e);}
}

function setCuotasTab(tab){
  cuotasTab=tab;
  document.getElementById('cuotas-tab-activas').classList.toggle('active',tab==='activas');
  document.getElementById('cuotas-tab-completadas').classList.toggle('active',tab==='completadas');
  renderCuotas();
}

function renderCuotas(){
  const activas=cuotasData.filter(c=>c.cuotasRestantes>0);
  const completadas=cuotasData.filter(c=>c.cuotasRestantes<=0);
  const lista=cuotasTab==='activas'?activas:completadas;
  const totalMensual=activas.reduce((s,c)=>s+c.valorCuota,0);
  const totalDeuda=activas.reduce((s,c)=>s+c.montoPendiente,0);
  document.getElementById('cuotas-kpi').innerHTML=`
    <div class="cuotas-kpi-card">
      <div class="kpi-label">CUOTA MENSUAL TOTAL</div>
      <div class="kpi-valor" style="color:#c62828;">${fmt(totalMensual)}</div>
      <div class="kpi-sub">${activas.length} compra${activas.length!==1?'s':''} activa${activas.length!==1?'s':''}</div>
    </div>
    <div class="cuotas-kpi-card">
      <div class="kpi-label">DEUDA TOTAL RESTANTE</div>
      <div class="kpi-valor">${fmt(totalDeuda)}</div>
      <div class="kpi-sub">en cuotas pendientes</div>
    </div>`;
  document.getElementById('cuotas-tab-activas').textContent=`Activas (${activas.length})`;
  document.getElementById('cuotas-tab-completadas').textContent=`Completadas (${completadas.length})`;
  if(!lista.length){
    document.getElementById('cuotas-lista').innerHTML=`<div class="empty">No hay compras ${cuotasTab==='activas'?'activas':'completadas'}</div>`;
    return;
  }
  document.getElementById('cuotas-lista').innerHTML=lista.map(c=>{
    const pct=c.numeroCuotas>0?Math.round((c.cuotasPagadas/c.numeroCuotas)*100):0;
    const completada=c.cuotasRestantes<=0;
    const cuotaActual=c.cuotasPagadas+1;
    const mesProxima=(()=>{
      if(completada)return '—';
      let baseDate;
      if(c.ultimaCuotaFecha&&c.ultimaCuotaFecha.length>=10){
        baseDate=new Date(c.ultimaCuotaFecha+'T00:00:00');
      }else if(c.fechaCompra&&c.fechaCompra.length>=10){
        baseDate=new Date(c.fechaCompra+'T00:00:00');
      }else{return '—';}
      if(isNaN(baseDate.getTime()))return '—';
      const dia=baseDate.getDate();
      const mesDestino=baseDate.getMonth()+1;
      const anioDestino=mesDestino>11?baseDate.getFullYear()+1:baseDate.getFullYear();
      const mesDestinoIdx=mesDestino%12;
      const ultimoDia=new Date(anioDestino,mesDestinoIdx+1,0).getDate();
      const diaFinal=Math.min(dia,ultimoDia);
      const fechaProxima=new Date(anioDestino,mesDestinoIdx,diaFinal);
      const dd=String(fechaProxima.getDate()).padStart(2,'0');
      const mm=String(fechaProxima.getMonth()+1).padStart(2,'0');
      const yyyy=fechaProxima.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    })();
    const ultimaPagada=c.ultimaCuotaFecha?'Último pago: '+fmtFechaCorta(c.ultimaCuotaFecha):(c.cuotasPagadas>0?'Sin fecha registrada':'');
    const barColor=completada?'#2e7d32':pct>=80?'#e65100':'#1a73e8';
    const tarjetaClass=c.tarjeta==='Gold'?'cuotas-tarjeta-gold':'cuotas-tarjeta-visa';
    const itemSafe=c.item.replace(/'/g,"\\'");
    return `<div class="cuotas-card">
      <div class="cuotas-card-header">
        <div class="cuotas-card-info">
          <div class="cuotas-card-desc">${c.item}</div>
          <div class="cuotas-card-tags">
            <span class="${tarjetaClass}">${c.tarjeta}</span>
            <span style="font-size:11px;color:#999;">Total: ${fmt(c.montoTotal)}</span>
          </div>
        </div>
        <div class="cuotas-card-monto">
          <div class="cuotas-monto-cuota" style="color:${completada?'#2e7d32':'#c62828'};">${fmt(c.valorCuota)}</div>
          <div style="font-size:10px;color:#aaa;">por cuota</div>
        </div>
      </div>
      <div class="cuotas-progress-label">
        <div style="display:flex;flex-direction:column;gap:2px;">
          <span>${completada?'✓ Completado':`Próximo pago: ${mesProxima} — Cuota ${cuotaActual}`}</span>
          ${ultimaPagada?`<span style="font-size:10px;color:#bbb;">${ultimaPagada}</span>`:''}
        </div>
        <span style="font-weight:600;color:${completada?'#2e7d32':'#555'};">${pct}%</span>
      </div>
      <div class="cuotas-progress-bar">
        <div class="cuotas-progress-fill" style="width:${Math.min(pct,100)}%;background:${barColor};"></div>
      </div>
      <div class="cuotas-card-footer">
        <div class="cuotas-badges">
          <span class="cuotas-badge-pagadas">${c.cuotasPagadas}/${c.numeroCuotas} pagadas</span>
          ${!completada?`<span class="cuotas-badge-restantes">${c.cuotasRestantes} restante${c.cuotasRestantes!==1?'s':''}</span>`:''}
          ${!completada?`<span class="cuotas-badge-pendiente">${fmt(c.montoPendiente)} pendiente</span>`:''}
        </div>
        ${!completada
          ?`<button class="cuotas-pagar-btn" onclick="abrirPagarCuota('${itemSafe}')">💳 Pagar cuota</button>`
          :`<span style="font-size:11px;color:#2e7d32;font-weight:500;">✓ Sin deuda</span>`}
      </div>
    </div>`;
  }).join('');
}

function selCuotaTarjeta(el,tarjeta){
  cuotaTarjetaSeleccionada=tarjeta;
  document.querySelectorAll('.cuotas-tarjeta-btn').forEach(b=>{
    b.className='cuotas-tarjeta-btn';
    b.querySelector('span').style.color='#666';
  });
  el.classList.add(tarjeta==='Gold'?'active-gold':'active-visa');
  el.querySelector('span').style.color=tarjeta==='Gold'?'#f57f17':'#1a73e8';
}

function actualizarPreviewCuota(){
  const num=parseInt(document.getElementById('cuota-num-cuotas').value)||0;
  const cuota=parseMonto(document.getElementById('cuota-valor-cuota').value)||0;
  const total=parseMonto(document.getElementById('cuota-monto-total').value)||0;
  const prev=document.getElementById('cuota-preview');
  if(num&&cuota){
    const totalCuotas=num*cuota;
    const diff=totalCuotas-total;
    prev.style.display='block';
    document.getElementById('cuota-preview-total').textContent=fmt(totalCuotas);
    const diffEl=document.getElementById('cuota-preview-diff');
    if(total>0){
      diffEl.textContent=(diff>0?'+':'')+fmt(diff)+(diff>0?' (intereses)':' (descuento)');
      diffEl.style.color=diff>0?'#c62828':'#2e7d32';
    }else{
      diffEl.textContent='—';diffEl.style.color='#999';
    }
  }else{
    prev.style.display='none';
  }
}

function abrirNuevaCuota(){
  document.getElementById('cuota-item').value='';
  document.getElementById('cuota-fecha-compra').valueAsDate=new Date();
  document.getElementById('cuota-monto-total').value='';
  document.getElementById('cuota-num-cuotas').value='';
  document.getElementById('cuota-valor-cuota').value='';
  document.getElementById('cuota-preview').style.display='none';
  cuotaTarjetaSeleccionada='Gold';
  document.querySelectorAll('.cuotas-tarjeta-btn').forEach(b=>{
    b.className='cuotas-tarjeta-btn';
    b.querySelector('span').style.color='#666';
  });
  const goldBtn=document.querySelector('.cuotas-tarjeta-btn[data-tarjeta="Gold"]');
  if(goldBtn){goldBtn.classList.add('active-gold');goldBtn.querySelector('span').style.color='#f57f17';}
  document.getElementById('ov-nueva-cuota').classList.add('open');
  bloquearScrollFondo();
}

async function guardarNuevaCuota(){
  const item=document.getElementById('cuota-item').value.trim();
  const fechaCompra=document.getElementById('cuota-fecha-compra').value;
  const montoTotal=parseMonto(document.getElementById('cuota-monto-total').value)||0;
  const numeroCuotas=parseInt(document.getElementById('cuota-num-cuotas').value)||0;
  const valorCuota=parseMonto(document.getElementById('cuota-valor-cuota').value)||0;
  if(!item||!fechaCompra||!montoTotal||!numeroCuotas||!valorCuota){mostrarToast('Completa todos los campos');return;}
  const btn=document.getElementById('btn-guardar-cuota');
  btn.disabled=true;btn.textContent='Guardando...';
  try{
    const res=await fetch('/api/cuotas',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({item,fechaCompra,tarjeta:cuotaTarjetaSeleccionada,montoTotal,numeroCuotas,valorCuota})
    });
    if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
    cerrar('ov-nueva-cuota');
    mostrarToast('Compra en cuotas registrada ✓');
    await cargarCuotas();renderCuotas();
  }catch(e){mostrarToast('Error al guardar: '+e.message);}
  finally{btn.disabled=false;btn.textContent='Registrar compra en cuotas';}
}

function abrirPagarCuota(item){
  const c=cuotasData.find(x=>x.item===item);
  if(!c)return;
  cuotaPendientePago=c;
  const cuotaNum=c.cuotasPagadas+1;
  document.getElementById('pagar-cuota-detalle').innerHTML=`
    <div style="font-size:12px;color:#888;margin-bottom:4px;">${c.tarjeta}</div>
    <div style="font-size:15px;font-weight:600;color:#111;margin-bottom:2px;">${c.item}</div>
    <div style="font-size:22px;font-weight:700;color:#111;margin:6px 0;">${fmt(c.valorCuota)}</div>
    <div style="font-size:12px;color:#999;">Cuota ${cuotaNum} de ${c.numeroCuotas}</div>`;
  document.getElementById('pagar-cuota-fecha').valueAsDate=new Date();
  document.getElementById('ov-pagar-cuota').classList.add('open');
  bloquearScrollFondo();
}

async function confirmarPagarCuota(){
  if(!cuotaPendientePago)return;
  const c=cuotaPendientePago;
  const fecha=document.getElementById('pagar-cuota-fecha').value;
  if(!fecha){mostrarToast('Selecciona la fecha del pago');return;}
  const cuotaNum=c.cuotasPagadas+1;
  cerrar('ov-pagar-cuota');
  mostrarLoading('Registrando pago...');
  try{
    const res=await fetch('/api/cuotas/pagar',{
      method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({fecha,item:c.item,cuotaNum,cuotasTotales:c.numeroCuotas,valorCuota:c.valorCuota})
    });
    if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
    mostrarToast(`Cuota ${cuotaNum} de ${c.item} registrada ✓`);
    await new Promise(r=>setTimeout(r,1500));
    await cargarCuotas();renderCuotas();
  }catch(e){mostrarToast('Error: '+e.message);}
  finally{ocultarLoading();cuotaPendientePago=null;}
}

document.getElementById('ov-nueva-cuota').addEventListener('click',e=>{if(e.target===document.getElementById('ov-nueva-cuota'))cerrar('ov-nueva-cuota');});
document.getElementById('ov-pagar-cuota').addEventListener('click',e=>{if(e.target===document.getElementById('ov-pagar-cuota'))cerrar('ov-pagar-cuota');});

function _resetIntlEditState(){
  window._intlEditMode=false;
  window._intlEditGasto=null;
  window._intlEditMontoCLP=0;
  const aviso=document.getElementById('intl-confirm-aviso');
  if(aviso) aviso.remove();
  const btnRes=document.getElementById('btn-intl-resumen');
  if(btnRes) btnRes.onclick=intlVerResumen;
  const btnConfirm=document.getElementById('btn-intl-confirmar');
  if(btnConfirm) btnConfirm.onclick=intlConfirmar;
  const btnSec=document.getElementById('btn-guardar-sin-dist');
  if(btnSec) btnSec.style.display='';
}
document.getElementById('ov-intl-dist').addEventListener('click',e=>{
  if(e.target===document.getElementById('ov-intl-dist')){cerrar('ov-intl-dist');_resetIntlEditState();}
});
document.getElementById('ov-intl-confirm').addEventListener('click',e=>{
  if(e.target===document.getElementById('ov-intl-confirm')){cerrar('ov-intl-confirm');_resetIntlEditState();}
});

const CUOTAS_COLORS=['#378ADD','#D85A30','#1D9E75','#BA7517','#534AB7','#993556'];

function renderCuotasHomeChart(){
  if(typeof Chart==='undefined'){
    const script=document.createElement('script');
    script.src='https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.js';
    script.onload=()=>renderCuotasHomeChart();
    document.head.appendChild(script);
    return;
  }

  if(!cuotasData||cuotasData.length===0){
    const kpisEl=document.getElementById('cuotas-home-kpis');
    if(kpisEl)kpisEl.innerHTML='';
    const wrap=document.getElementById('cuotas-home-chart-wrap');
    if(wrap)wrap.innerHTML='<div style="padding:24px;text-align:center;font-size:13px;color:#bbb;">Sin compras en cuotas activas</div>';
    return;
  }
  const activas=cuotasData.filter(c=>c.cuotasRestantes>0);
  if(!activas.length){
    const wrap=document.getElementById('cuotas-home-chart-wrap');
    if(wrap)wrap.innerHTML='<div style="padding:24px;text-align:center;font-size:13px;color:#bbb;">Sin compras en cuotas activas</div>';
    return;
  }

  let kpisEl=document.getElementById('cuotas-home-kpis');
  let canvas=document.getElementById('cuotasHomeChart');
  let legendEl=document.getElementById('cuotas-home-legend');
  let wrap=document.getElementById('cuotas-home-chart-wrap');
  let placeholder=document.getElementById('cuotas-placeholder');

  if(window._eyeAllHidden){
    if(kpisEl) kpisEl.style.visibility='hidden';
    if(canvas) canvas.style.visibility='hidden';
    if(legendEl) legendEl.style.visibility='hidden';
    if(wrap){
      if(!placeholder){
        placeholder=document.createElement('div');
        placeholder.id='cuotas-placeholder';
        placeholder.style.cssText='height:220px;background:var(--color-background-tertiary);border-radius:8px;';
        wrap.appendChild(placeholder);
      }
      placeholder.style.display='block';
    }
    return;
  }
  if(kpisEl) kpisEl.style.visibility='visible';
  if(canvas) canvas.style.visibility='visible';
  if(legendEl) legendEl.style.visibility='visible';
  if(placeholder) placeholder.style.display='none';

  const ahora=new Date();
  const mesHoy=ahora.getMonth();
  const anioHoy=ahora.getFullYear();

  let maxMeses=0;
  activas.forEach(c=>{
    if(c.cuotasRestantes>maxMeses)maxMeses=c.cuotasRestantes;
  });
  maxMeses=Math.max(maxMeses,2);

  const mesesLabels=[];
  const mesesDates=[];
  for(let i=1;i<=maxMeses;i++){
    const d=new Date(anioHoy,mesHoy+i,1);
    mesesLabels.push(mesesC[d.getMonth()]+' '+d.getFullYear());
    mesesDates.push({mes:d.getMonth(),anio:d.getFullYear()});
  }

  const CUOTAS_COLORS=['#378ADD','#D85A30','#1D9E75','#BA7517','#534AB7','#993556'];

  const itemsConIndices=activas.map((c,idx)=>({
    item:c,
    color:CUOTAS_COLORS[idx%CUOTAS_COLORS.length],
    data:mesesDates.map((_,i)=>i<c.cuotasRestantes?c.valorCuota:0),
  }));

  const totalPorMes=mesesDates.map((_,i)=>
    itemsConIndices.reduce((s,it)=>s+(it.data[i]||0),0)
  );

  const totalDeuda=activas.reduce((s,c)=>s+c.montoPendiente,0);

  const proximoMesDate=new Date(anioHoy,mesHoy+1,1);
  const proximoMesLabel=meses[proximoMesDate.getMonth()]+' '+proximoMesDate.getFullYear();
  const totalProximoMes=itemsConIndices.reduce((s,it)=>s+(it.data[0]||0),0);

  kpisEl=document.getElementById('cuotas-home-kpis');
  if(kpisEl)kpisEl.innerHTML=`
    <div style="background:#f5f5f5;border-radius:10px;padding:11px 10px;">
      <div class="kpi-label">CUOTA EN ${proximoMesLabel.toUpperCase()}</div>
      <div style="font-size:16px;font-weight:600;color:#c62828;">${fmt(totalProximoMes)}</div>
    </div>
    <div style="background:#f5f5f5;border-radius:10px;padding:11px 10px;">
      <div class="kpi-label">DEUDA RESTANTE</div>
      <div style="font-size:16px;font-weight:600;color:#111;">${fmt(totalDeuda)}</div>
    </div>`;

  legendEl=document.getElementById('cuotas-home-legend');
  if(legendEl)legendEl.innerHTML=[
    ...itemsConIndices.map(it=>`<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:#888;"><div style="width:10px;height:10px;border-radius:2px;background:${it.color};flex-shrink:0;"></div>${it.item.item}</div>`),
    `<div style="display:flex;align-items:center;gap:5px;font-size:11px;color:#888;"><div style="width:18px;height:2px;background:#1D9E75;flex-shrink:0;margin-right:2px;"></div>Total mes</div>`
  ].join('');

  const chartWrap=document.getElementById('cuotas-home-chart-wrap');
  const canvasWidth=Math.max(600,mesesLabels.length*52);
  if(chartWrap)chartWrap.style.minWidth=canvasWidth+'px';

  const existing=Chart.getChart('cuotasHomeChart');
  if(existing)existing.destroy();

  canvas=document.getElementById('cuotasHomeChart');
  if(!canvas)return;
  canvas.width=canvasWidth;
  canvas.height=220;
  canvas.style.width=canvasWidth+'px';
  canvas.style.height='220px';

  const isDark=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches;
  const gridColor=isDark?'rgba(255,255,255,0.07)':'rgba(0,0,0,0.06)';
  const labelColor=isDark?'#aaa':'#888';

  const datasets=[
    ...itemsConIndices.map(it=>({
      label:it.item.item,data:it.data,
      backgroundColor:it.color,borderRadius:3,borderSkipped:false,stack:'cuotas',
    })),
    {
      label:'Total mes',data:totalPorMes,type:'line',
      borderColor:'#1D9E75',backgroundColor:'rgba(29,158,117,0.08)',
      borderWidth:2,pointRadius:3,pointBackgroundColor:'#1D9E75',fill:false,tension:0.3,
    }
  ];

  new Chart(canvas,{
    type:'bar',
    data:{labels:mesesLabels,datasets},
    options:{
      responsive:false,maintainAspectRatio:false,
      interaction:{mode:'index',intersect:false},
      plugins:{
        legend:{display:false},
        tooltip:{
          enabled:false,
          external:function(context){
            const tip=document.getElementById('cuotas-home-tooltip');
            if(!tip)return;
            if(context.tooltip.opacity===0){tip.style.display='none';return;}
            const dp=context.tooltip.dataPoints;
            const mesLabel=dp[0]?.label||'';
            let html=`<b>${mesLabel}</b><br>`;
            let total=0;
            dp.forEach(p=>{
              if(p.raw>0&&p.dataset.type!=='line'){
                html+=`<span style="display:inline-block;width:8px;height:8px;border-radius:2px;background:${p.dataset.backgroundColor};margin-right:5px;"></span>${p.dataset.label}: ${fmt(p.raw)}<br>`;
                total+=p.raw;
              }
            });
            if(total>0)html+=`<b>Total: ${fmt(total)}</b>`;
            tip.innerHTML=html;
            tip.style.display='block';
            let left=context.tooltip.caretX+12;
            const wrapWidth=chartWrap?chartWrap.offsetWidth:600;
            if(left+220>wrapWidth)left=context.tooltip.caretX-230;
            tip.style.left=left+'px';
            tip.style.top=Math.max(0,context.tooltip.caretY-50)+'px';
          }
        }
      },
      scales:{
        x:{stacked:true,grid:{display:false},ticks:{color:labelColor,font:{size:10},autoSkip:false,maxRotation:45}},
        y:{stacked:true,grid:{color:gridColor},border:{display:false},ticks:{color:labelColor,font:{size:10},callback:v=>v>=1000000?'$'+Math.round(v/1000000)+'M':v>=1000?'$'+Math.round(v/1000)+'k':'$'+v}}
      }
    }
  });
}

// ── HISTORIAL CUADRATURAS ────────────────────────────────
let hcuadData = [];
let hcuadFiltroEstado = 'todos';
let hcuadFiltroBanco = 'todos';
let hcuadFiltroUsuario = 'todos';
let hcuadFiltrosPanelAbierto = false;

async function cargarHistorialCuad() {
  mostrarLoading('Cargando historial...');
  try {
    const res = await fetch('/api/cuadratura/historial');
    if (!res.ok) throw new Error('Error ' + res.status);
    const rows = await res.json();
    hcuadData = rows.slice(1)
      .filter(r => r && r[0])
      .map(r => ({
        fecha:      (r[0] || '').trim(),
        usuario:    (r[1] || '').trim(),
        banco:      (r[2] || '').trim(),
        montoApp:   parseMonto(r[3]) || 0,
        montoBanco: parseMonto(r[4]) || 0,
        diferencia: parseMonto(r[5]) || 0,
        estado:     (r[6] || '').trim(),
      }))
      .sort((a, b) => b.fecha.localeCompare(a.fecha));
    ocultarLoading();
    renderHistorialCuad();
  } catch(e) {
    mostrarError('Error al cargar historial: ' + e.message);
  }
}

function getBadgeHcuad(estado) {
  if (estado === 'OK') return '<span class="hcuad-badge hcuad-badge-ok">OK</span>';
  if (estado.includes('AJUSTE')) return '<span class="hcuad-badge hcuad-badge-aj">Ajuste realizado</span>';
  return '<span class="hcuad-badge hcuad-badge-dif">Revisando</span>';
}

function fmtFechaHcuad(fechaISO) {
  if (!fechaISO || fechaISO.length < 10) return fechaISO;
  const [y, m, d] = fechaISO.split('-');
  const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
  return `${parseInt(d)} ${meses[parseInt(m)-1]} ${y}`;
}

function nombreUsuario(email) {
  if (!email) return '—';
  if (email.includes('christian')) return 'Christian Winckler';
  return 'Javita';
}

function toggleHcuadFiltros() {
  hcuadFiltrosPanelAbierto = !hcuadFiltrosPanelAbierto;
  const panel = document.getElementById('hcuad-filtro-panel');
  const chev = document.getElementById('hcuad-filtro-chev');
  if (panel) panel.style.display = hcuadFiltrosPanelAbierto ? 'block' : 'none';
  if (chev) chev.style.transform = hcuadFiltrosPanelAbierto ? 'rotate(180deg)' : 'rotate(0deg)';
}

function limpiarHcuadFiltros() {
  hcuadFiltroEstado = 'todos';
  hcuadFiltroBanco = 'todos';
  hcuadFiltroUsuario = 'todos';
  renderHistorialCuad();
}

function setHcuadFiltro(tipo, val) {
  if (tipo === 'estado') hcuadFiltroEstado = val;
  if (tipo === 'banco') hcuadFiltroBanco = val;
  if (tipo === 'usuario') hcuadFiltroUsuario = val;
  renderHistorialCuad();
}

function renderHistorialCuad() {
  let lista = hcuadData;
  if (hcuadFiltroEstado !== 'todos') {
    if (hcuadFiltroEstado === 'ok') lista = lista.filter(r => r.estado === 'OK');
    else if (hcuadFiltroEstado === 'dif') lista = lista.filter(r => r.estado.includes('DIFERENCIA') && !r.estado.includes('AJUSTE'));
    else if (hcuadFiltroEstado === 'aj') lista = lista.filter(r => r.estado.includes('AJUSTE'));
  }
  if (hcuadFiltroBanco !== 'todos') lista = lista.filter(r => r.banco === hcuadFiltroBanco);
  if (hcuadFiltroUsuario !== 'todos') lista = lista.filter(r => nombreUsuario(r.usuario) === hcuadFiltroUsuario);

  const total = hcuadData.length;
  const conDif = hcuadData.filter(r => r.diferencia !== 0).length;
  const conAj = hcuadData.filter(r => r.estado.includes('AJUSTE')).length;
  const ultima = hcuadData[0];
  const kpisEl = document.getElementById('hcuad-kpis');
  if (kpisEl) {
    kpisEl.innerHTML = `
      <div class="hcuad-kpi">
        <div class="hcuad-kpi-label">TOTAL CUADRATURAS</div>
        <div class="hcuad-kpi-valor">${total}</div>
        <div class="hcuad-kpi-sub">registros totales</div>
      </div>
      <div class="hcuad-kpi">
        <div class="hcuad-kpi-label">CON DIFERENCIAS</div>
        <div class="hcuad-kpi-valor" style="color:${conDif>0?'#f57f17':'#111'};">${conDif}</div>
        <div class="hcuad-kpi-sub">${total>0?Math.round(conDif/total*100):0}% del total</div>
      </div>
      <div class="hcuad-kpi">
        <div class="hcuad-kpi-label">AJUSTES REALIZADOS</div>
        <div class="hcuad-kpi-valor" style="color:${conAj>0?'#c62828':'#111'};">${conAj}</div>
        <div class="hcuad-kpi-sub">con gasto en detalle</div>
      </div>
      <div class="hcuad-kpi">
        <div class="hcuad-kpi-label">ÚLTIMA CUADRATURA</div>
        <div class="hcuad-kpi-valor" style="font-size:13px;">${ultima ? fmtFechaHcuad(ultima.fecha) : '—'}</div>
        <div class="hcuad-kpi-sub">${ultima ? ultima.banco + ' · ' + nombreUsuario(ultima.usuario) : '—'}</div>
      </div>`;
  }

  const estadoOpts = [
    {val:'todos',label:'Todos'},
    {val:'ok',label:'OK'},
    {val:'dif',label:'Con diferencia'},
    {val:'aj',label:'Con ajuste'},
  ];
  const bancos = ['todos', ...new Set(hcuadData.map(r => r.banco))];
  const usuarios = ['todos', ...new Set(hcuadData.map(r => nombreUsuario(r.usuario)))];

  const chipsEstado = document.getElementById('hcuad-chips-estado');
  if (chipsEstado) {
    chipsEstado.innerHTML = estadoOpts.map(o =>
      `<button class="hcuad-chip ${hcuadFiltroEstado===o.val?'active':''}"
        onclick="setHcuadFiltro('estado','${o.val}')">${o.label}</button>`
    ).join('');
  }
  const chipsBanco = document.getElementById('hcuad-chips-banco');
  if (chipsBanco) {
    chipsBanco.innerHTML = bancos.map(b =>
      `<button class="hcuad-chip ${hcuadFiltroBanco===b?'active':''}"
        onclick="setHcuadFiltro('banco','${b}')">${b === 'todos' ? 'Todos' : b}</button>`
    ).join('');
  }
  const chipsUsuario = document.getElementById('hcuad-chips-usuario');
  if (chipsUsuario) {
    chipsUsuario.innerHTML = usuarios.map(u =>
      `<button class="hcuad-chip ${hcuadFiltroUsuario===u?'active':''}"
        onclick="setHcuadFiltro('usuario','${u}')">${u === 'todos' ? 'Todos' : u}</button>`
    ).join('');
  }

  const activos = [hcuadFiltroEstado, hcuadFiltroBanco, hcuadFiltroUsuario]
    .filter(f => f !== 'todos').length;
  const badge = document.getElementById('hcuad-filtro-badge');
  if (badge) {
    badge.style.display = activos > 0 ? 'inline-block' : 'none';
    badge.textContent = activos + ' activo' + (activos !== 1 ? 's' : '');
  }

  const listaEl = document.getElementById('hcuad-lista');
  if (!listaEl) return;

  if (!lista.length) {
    listaEl.innerHTML = '<div style="padding:40px 16px;text-align:center;font-size:13px;color:#bbb;">Sin registros con estos filtros</div>';
    return;
  }

  listaEl.innerHTML = lista.map(r => {
    const difColor = r.diferencia === 0 ? '#999' : r.diferencia < 0 ? '#c62828' : '#2e7d32';
    const difPrefix = r.diferencia > 0 ? '+' : '';
    const esAjuste = r.estado.includes('AJUSTE');
    return `<div class="hcuad-card">
      <div class="hcuad-card-head">
        <div>
          <div class="hcuad-fecha">${fmtFechaHcuad(r.fecha)}</div>
          <div class="hcuad-banco">${r.banco}</div>
          <div class="hcuad-usuario">${nombreUsuario(r.usuario)}</div>
        </div>
        ${getBadgeHcuad(r.estado)}
      </div>
      <div class="hcuad-montos">
        <div class="hcuad-monto-item">
          <div class="hcuad-monto-label">SALDO APP</div>
          <div class="hcuad-monto-val">${fmt(r.montoApp)}</div>
        </div>
        <div class="hcuad-monto-item">
          <div class="hcuad-monto-label">SALDO BANCO</div>
          <div class="hcuad-monto-val">${fmt(r.montoBanco)}</div>
        </div>
        <div class="hcuad-monto-item">
          <div class="hcuad-monto-label">DIFERENCIA</div>
          <div class="hcuad-monto-val" style="color:${difColor};">${r.diferencia === 0 ? '$0' : difPrefix + fmt(Math.abs(r.diferencia))}</div>
        </div>
      </div>
      ${esAjuste ? `<div class="hcuad-nota">Gasto de ajuste creado en Detalle · Cuadratura con Banco - ${nombreUsuario(r.usuario)}</div>` : ''}
    </div>`;
  }).join('');
}

// ── CUADRATURA DE SALDOS ─────────────────────────────────
let cuadBancoActual = '';
let cuadMontoApp = 0;
let cuadMontoBanco = 0;
let cuadDiferencia = 0;

function abrirCuadratura(banco) {
  cuadBancoActual = banco;

  let montoApp = 0;
  if (banco === 'Santander') {
    const allGastos = Object.values(detalleData).flat();
    montoApp = allGastos
      .filter(g => g.banco === 'Santander')
      .reduce((s, g) => s + g.montoValido, 0);
  } else if (banco === 'Falabella') {
    const allGastos = Object.values(detalleData).flat();
    const fala1 = allGastos
      .filter(g => g.sub === 'Banco - Ingreso a Falabella desde Ahorros')
      .reduce((s, g) => s + g.montoValido, 0);
    const fala2 = allGastos
      .filter(g => g.sub === 'Banco - Ingreso a Falabella desde Cuenta Corriente')
      .reduce((s, g) => s + g.montoValido, 0) * -1;
    const fala3 = allGastos
      .filter(g => g.ie === 'E' && g.banco === 'Falabella')
      .reduce((s, g) => s + g.montoValido, 0);
    montoApp = fala1 + fala2 + fala3;
  } else if (banco === 'Tarjeta Crédito') {
    const allGastos = Object.values(detalleData).flat();
    const gastosAbsTC = Math.abs(
      allGastos.filter(g => g.banco === 'Tarjeta Crédito')
        .reduce((s, g) => s + g.montoValido, 0)
    );
    const pagosTC = allGastos
      .filter(g => g.sub === 'TC - Pago Nueva Tarjeta')
      .reduce((s, g) => s + g.montoValido, 0) * -1;
    const deudaCuotas = cuotasData
      .filter(c => c.cuotasRestantes > 0)
      .reduce((s, c) => s + c.montoPendiente, 0);
    montoApp = montoInicialTC - gastosAbsTC + pagosTC - deudaCuotas;
  }

  cuadMontoApp = Math.round(montoApp);

  document.getElementById('cuad-titulo').textContent = `Cuadrar saldo — ${banco}`;
  document.getElementById('cuad-sub').textContent =
    `Ingresa el saldo que figura en tu app de ${banco}`;
  document.getElementById('cuad-monto-app').textContent = fmt(cuadMontoApp);
  document.getElementById('cuad-monto-banco').value = '';

  bloquearScrollFondo();
  document.getElementById('ov-cuadratura').classList.add('open');
}

function ejecutarComparacion() {
  const inputVal = parseFloat(document.getElementById('cuad-monto-banco').value) || 0;
  cuadMontoBanco = Math.round(inputVal);
  cuadDiferencia = cuadMontoApp - cuadMontoBanco;

  cerrar('ov-cuadratura');

  const contenedor = document.getElementById('cuad-resultado-content');
  const difAbs = Math.abs(cuadDiferencia);
  const cuadra = cuadDiferencia === 0;

  if (cuadra) {
    contenedor.innerHTML = `
      <div class="cuad-result-ok">
        <div class="cuad-result-ok-title">Saldos cuadran correctamente</div>
        <div class="cuad-result-ok-sub">No hay diferencias entre la app y el banco</div>
      </div>
      <div class="cuad-diff-row"><span class="cuad-diff-key">Saldo app</span><span class="cuad-diff-val">${fmt(cuadMontoApp)}</span></div>
      <div class="cuad-diff-row"><span class="cuad-diff-key">Saldo banco</span><span class="cuad-diff-val">${fmt(cuadMontoBanco)}</span></div>
      <div class="cuad-diff-line"></div>
      <div class="cuad-diff-row"><span class="cuad-diff-key">Diferencia</span><span class="cuad-diff-val" style="color:#2e7d32;">$0</span></div>
      <div style="height:14px;"></div>
      <button style="width:100%;padding:13px;background:#111;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit;margin-bottom:8px;" onclick="registrarCuadratura('OK',false)">Confirmar y registrar</button>
      <button style="width:100%;padding:12px;background:#f5f5f5;color:#666;border:none;border-radius:10px;font-size:14px;cursor:pointer;font-family:inherit;" onclick="cerrarResultadoCuadratura()">Cancelar</button>`;
  } else {
    const appTieneMas = cuadDiferencia > 0;
    contenedor.innerHTML = `
      <div class="cuad-result-diff">
        <div class="cuad-result-diff-title">Se encontró una diferencia</div>
        <div class="cuad-result-diff-sub">La app tiene ${appTieneMas ? fmt(difAbs) + ' más' : fmt(difAbs) + ' menos'} que el banco</div>
      </div>
      <div class="cuad-diff-row"><span class="cuad-diff-key">Saldo app</span><span class="cuad-diff-val">${fmt(cuadMontoApp)}</span></div>
      <div class="cuad-diff-row"><span class="cuad-diff-key">Saldo banco</span><span class="cuad-diff-val">${fmt(cuadMontoBanco)}</span></div>
      <div class="cuad-diff-line"></div>
      <div class="cuad-diff-row"><span class="cuad-diff-key">Diferencia</span><span class="cuad-diff-val" style="color:#f57f17;">${fmt(difAbs)}</span></div>
      <div style="height:14px;"></div>
      <button class="cuad-option-btn" onclick="cuadSeguirRevisando()">
        <div class="cuad-option-icon" style="background:#e8f0fe;">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v5l3 3" stroke="#1a73e8" stroke-width="1.5" stroke-linecap="round"/><circle cx="8" cy="8" r="6" stroke="#1a73e8" stroke-width="1.2"/></svg>
        </div>
        <div>
          <div class="cuad-option-title">Seguir revisando</div>
          <div class="cuad-option-sub">Registrar diferencia y revisar más tarde</div>
        </div>
      </button>
      <button class="cuad-option-btn" onclick="cuadAbrirAjuste()">
        <div class="cuad-option-icon" style="background:#e8f5e9;">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="#2e7d32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </div>
        <div>
          <div class="cuad-option-title">Realizar ajuste automático</div>
          <div class="cuad-option-sub">Crear gasto de cuadratura en Detalle</div>
        </div>
      </button>
      <button style="width:100%;padding:12px;background:#f5f5f5;color:#666;border:none;border-radius:10px;font-size:14px;cursor:pointer;font-family:inherit;margin-top:2px;" onclick="cerrarResultadoCuadratura()">Cancelar</button>`;
  }

  bloquearScrollFondo();
  document.getElementById('ov-cuadratura-resultado').classList.add('open');
}

async function cuadSeguirRevisando() {
  cerrar('ov-cuadratura-resultado');
  mostrarLoading('Registrando...');
  try {
    const res = await fetch('/api/cuadratura', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        banco: cuadBancoActual,
        montoApp: cuadMontoApp,
        montoBanco: cuadMontoBanco,
        estado: 'DIFERENCIA - REVISANDO',
        hacerAjuste: false,
      })
    });
    if (!res.ok) throw new Error('Error ' + res.status);
    mostrarToast('Diferencia registrada. Sigue revisando ✓');
  } catch(e) {
    mostrarToast('Error al registrar: ' + e.message);
  } finally {
    ocultarLoading();
    desbloquearScrollFondo();
  }
}

function cuadAbrirAjuste() {
  cerrar('ov-cuadratura-resultado');
  const appTieneMas = cuadDiferencia > 0;
  const difAbs = Math.abs(cuadDiferencia);

  document.getElementById('cuad-ajuste-preview').innerHTML = `
    <div class="cuad-diff-row"><span class="cuad-diff-key">Subcategoría</span><span class="cuad-diff-val" style="font-size:12px;">Banco - Cuadratura Automática</span></div>
    <div class="cuad-diff-row"><span class="cuad-diff-key">Banco</span><span class="cuad-diff-val">${cuadBancoActual}</span></div>
    <div class="cuad-diff-row"><span class="cuad-diff-key">Monto</span><span class="cuad-diff-val">${fmt(difAbs)}</span></div>
    <div class="cuad-diff-row"><span class="cuad-diff-key">Devolución</span><span class="cuad-diff-val" style="color:${appTieneMas?'#2e7d32':'#999'};">${appTieneMas ? 'X (app tiene más)' : 'No'}</span></div>
    <div class="cuad-diff-row"><span class="cuad-diff-key">Descripción</span><span class="cuad-diff-val" style="font-size:11px;">Cuadratura con Banco</span></div>`;

  bloquearScrollFondo();
  document.getElementById('ov-cuadratura-ajuste').classList.add('open');
}

async function confirmarAjusteCuadratura() {
  cerrar('ov-cuadratura-ajuste');
  mostrarLoading('Aplicando ajuste...');
  try {
    const res = await fetch('/api/cuadratura', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        banco: cuadBancoActual,
        montoApp: cuadMontoApp,
        montoBanco: cuadMontoBanco,
        estado: 'AJUSTE REALIZADO',
        hacerAjuste: true,
      })
    });
    if (!res.ok) throw new Error('Error ' + res.status);
    mostrarToast('Ajuste aplicado y registrado ✓');
    await cargarDatos();
    renderHome();
  } catch(e) {
    mostrarToast('Error: ' + e.message);
  } finally {
    ocultarLoading();
    desbloquearScrollFondo();
  }
}

async function registrarCuadratura(estado, hacerAjuste) {
  cerrar('ov-cuadratura-resultado');
  mostrarLoading('Registrando cuadratura...');
  try {
    const res = await fetch('/api/cuadratura', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        banco: cuadBancoActual,
        montoApp: cuadMontoApp,
        montoBanco: cuadMontoBanco,
        estado,
        hacerAjuste,
      })
    });
    if (!res.ok) throw new Error('Error ' + res.status);
    mostrarToast('Cuadratura registrada ✓');
  } catch(e) {
    mostrarToast('Error: ' + e.message);
  } finally {
    ocultarLoading();
    desbloquearScrollFondo();
  }
}

function cerrarResultadoCuadratura() {
  cerrar('ov-cuadratura-resultado');
  desbloquearScrollFondo();
}

document.getElementById('ov-cuadratura').addEventListener('click', e => {
  if (e.target === document.getElementById('ov-cuadratura')) {
    cerrar('ov-cuadratura');
    desbloquearScrollFondo();
  }
});
document.getElementById('ov-cuadratura-resultado').addEventListener('click', e => {
  if (e.target === document.getElementById('ov-cuadratura-resultado')) {
    cerrarResultadoCuadratura();
  }
});
document.getElementById('ov-cuadratura-ajuste').addEventListener('click', e => {
  if (e.target === document.getElementById('ov-cuadratura-ajuste')) {
    cerrar('ov-cuadratura-ajuste');
    desbloquearScrollFondo();
  }
});
document.getElementById('ov-cambio-fecha').addEventListener('click',e=>{
  if(e.target===document.getElementById('ov-cambio-fecha'))cerrar('ov-cambio-fecha');
});
document.getElementById('ov-duplicado-mensual').addEventListener('click',e=>{
  if(e.target===document.getElementById('ov-duplicado-mensual'))cerrar('ov-duplicado-mensual');
});

const btnEyeInit=document.getElementById('btn-eye-all');
if(btnEyeInit) btnEyeInit.style.display='flex';
cargarDatos();
