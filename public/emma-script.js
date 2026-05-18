// ── EXPONER FUNCIONES GLOBALES ────────────────────────────
// Mover asignaciones al final del archivo para garantizar que las funciones
// ya están definidas en el momento de la asignación (evita dependencia del hoisting).

// ── NAVEGACIÓN ────────────────────────────────────────────
const emmaScreenToPath = {
  home:       '/emma',
  calendario: '/emma/calendario',
  comidas:    '/emma/comidas',
  rutinas:    '/emma/rutinas',
  planes:     '/emma/planes',
  admin:      '/emma/categorias',
  perfil:     '/emma/perfil',
}
const emmaPathToScreen = Object.fromEntries(
  Object.entries(emmaScreenToPath).map(([k, v]) => [v, k])
)

function emmaSwitchScreen(screen, pushHistory = true) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'))
  const el = document.getElementById('screen-' + screen)
  if (el) el.classList.add('active')

  document.querySelectorAll('.side-icon').forEach(l => {
    l.classList.toggle('active', l.dataset.screen === screen)
  })

  if (screen === 'comidas' && typeof emmaComidasRender === 'function') emmaComidasRender()
  if (screen === 'rutinas' && typeof emmaRutinasRender === 'function') emmaRutinasRender()
  if (screen === 'planes' && typeof emmaPlanesRenderLista === 'function') emmaPlanesRenderLista()
  if (screen === 'calendario' && typeof emmaCalRender === 'function') {
    emmaCalCambiarDia(0)
  }

  window.scrollTo(0, 0)

  if (pushHistory) {
    history.pushState({ screen }, '', emmaScreenToPath[screen] || '/emma')
  }
}

window.addEventListener('popstate', e => {
  const screen = (e.state && e.state.screen) || emmaPathToScreen[location.pathname] || 'home'
  emmaSwitchScreen(screen, false)
})

;(function emmaInitFromUrl() {
  const screen = emmaPathToScreen[location.pathname] || 'home'
  if (screen !== 'home') emmaSwitchScreen(screen, false)
  history.replaceState({ screen }, '', emmaScreenToPath[screen] || '/emma')
})()

// ── SIDEBAR ───────────────────────────────────────────────
function emmaToggleSidebarExpand() {
  const sb = document.getElementById('emma-sidebar')
  if (!sb) return
  sb.classList.toggle('expanded')
  try { localStorage.setItem('fwv_emma_sb_exp', sb.classList.contains('expanded') ? '1' : '0') } catch (e) {}
}

function emmaAbrirSidebarMobile() {
  const sb = document.getElementById('emma-sidebar')
  const bd = document.getElementById('emma-sidebar-backdrop')
  if (sb) sb.classList.add('mobile-open')
  if (bd) bd.classList.add('visible')
  document.body.style.overflow = 'hidden'
}

function emmaCerrarSidebarMobile() {
  const sb = document.getElementById('emma-sidebar')
  const bd = document.getElementById('emma-sidebar-backdrop')
  if (sb) sb.classList.remove('mobile-open')
  if (bd) bd.classList.remove('visible')
  document.body.style.overflow = ''
}

// Restaurar estado expandido
try {
  const sb = document.getElementById('emma-sidebar')
  if (sb && localStorage.getItem('fwv_emma_sb_exp') === '1') sb.classList.add('expanded')
} catch (e) {}

// ── TOAST ─────────────────────────────────────────────────
function emmaMostrarToast(msg) {
  const t = document.getElementById('emma-toast')
  if (!t) return
  t.textContent = msg
  t.classList.add('show')
  setTimeout(() => t.classList.remove('show'), 2500)
}

// ── LOADING ───────────────────────────────────────────────
function emmaMostrarLoading() {
  const el = document.getElementById('emma-loading')
  if (el) el.style.display = 'flex'
}
function emmaOcultarLoading() {
  const el = document.getElementById('emma-loading')
  if (el) el.style.display = 'none'
}

// ── DATOS ─────────────────────────────────────────────────
let emmaDataCargada = false
let emmaComidasData = []
let emmaRutinasData = []
let emmaPlanesData  = []

async function emmaCargarDatos() {
  try {
    const res = await fetch('/api/emma/datos')
    if (!res.ok) throw new Error('Error ' + res.status)
    const data = await res.json()
    if (!data.ok) throw new Error(data.error || 'Error desconocido')

    emmaComidasData = (data.comidas || []).slice(1).map(r => ({
      id:        parseInt(r[0]),
      nombre:    r[1] || '',
      categoria: r[2] || '',
      tamano:    parseFloat(r[3]) || 0,
      unidad:    r[4] || 'cc',
      emoji:     r[5] || '🍽️',
      activo:    r[6] === 'TRUE' || r[6] === true,
      _row:      (data.comidas || []).indexOf(r) + 1,
    }))

    emmaRutinasData = (data.rutinas || []).slice(1).map(r => ({
      id:           parseInt(r[0]),
      nombre:       r[1] || '',
      desc:         r[2] || '',
      emoji:        r[3] || '📋',
      tipo:         r[4] || 'binario',
      registroTipo: r[4] || 'binario',
      activo:       r[5] === 'TRUE' || r[5] === true,
      _row:         (data.rutinas || []).indexOf(r) + 1,
    }))

    const planesBase = (data.planes || []).slice(1).map(r => ({
      id:            parseInt(r[0]),
      nombre:        r[1] || '',
      activo:        r[2] === 'TRUE' || r[2] === true,
      fechaCreacion: r[3] || '',
      _row:          (data.planes || []).indexOf(r) + 1,
      items:         [],
    }))

    const allItems = (data.planesItems || []).slice(1).map(r => ({
      id:           parseInt(r[0]),
      planId:       parseInt(r[1]),
      tipo:         r[2] || 'comida',
      referenciaId: parseInt(r[3]),
      nombre:       r[4] || '',
      emoji:        r[5] || '🍽️',
      cat:          r[6] || '',
      etiqueta:     r[7] || '',
      hora:         parseInt(r[8]) || 0,
      min:          parseInt(r[9]) || 0,
      flexible:     r[10] === 'TRUE' || r[10] === true,
      orden:        parseInt(r[11]) || 1,
      _row:         (data.planesItems || []).indexOf(r) + 1,
    }))

    allItems.forEach(item => {
      if (item.tipo === 'comida') {
        const comida = emmaComidasData.find(c => c.id === item.referenciaId)
        if (comida) { item.tamano = comida.tamano; item.unidad = comida.unidad }
      }
      if (item.tipo === 'rutina') {
        const rutina = emmaRutinasData.find(r => r.id === item.referenciaId)
        if (rutina) item.registroTipo = rutina.tipo
      }
      if (item.tipo === 'rutina') {
        item.sub = item.etiqueta || 'Rutina'
      } else if (item.tamano && item.unidad) {
        item.sub = item.tamano + ' ' + item.unidad + (item.etiqueta ? ' · ' + item.etiqueta : ' · cualquier tipo')
      } else {
        item.sub = item.etiqueta || 'Categoría ' + item.cat
      }
    })

    planesBase.forEach(plan => {
      plan.items = allItems
        .filter(i => i.planId === plan.id)
        .sort((a, b) => {
          if (a.flexible !== b.flexible) return a.flexible ? 1 : -1
          const tA = a.hora * 60 + a.min
          const tB = b.hora * 60 + b.min
          return tA !== tB ? tA - tB : a.orden - b.orden
        })
    })

    emmaPlanesData = planesBase
    emmaDataCargada = true

    const screenActiva = document.querySelector('.screen.active')?.id
    if (screenActiva === 'screen-comidas')    emmaComidasRender()
    if (screenActiva === 'screen-rutinas')    emmaRutinasRender()
    if (screenActiva === 'screen-planes')     emmaPlanesRenderLista()
    if (screenActiva === 'screen-calendario') emmaCalRender()

  } catch (err) {
    console.error('[Emma] emmaCargarDatos error:', err)
  }
}

// ── DONUT ─────────────────────────────────────────────────
function emmaRenderDonut() {
  const svg = document.getElementById('emma-donut-svg')
  const legend = document.getElementById('emma-donut-legend')
  if (!svg || !legend) return

  const data = [
    { label: 'Leche', pct: 69, color: '#7F77DD' },
    { label: 'Sólido', pct: 21, color: '#1D9E75' },
    { label: 'Postre', pct: 10, color: '#BA7517' },
  ]
  const R = 45, CX = 65, CY = 65, STROKE = 18
  const total = 251.2 // 2πR
  let offset = 0
  let paths = ''
  data.forEach(d => {
    const dash = (d.pct / 100) * total
    paths += `<circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="${d.color}" stroke-width="${STROKE}" stroke-dasharray="${dash} ${total}" stroke-dashoffset="${-offset}" transform="rotate(-90 ${CX} ${CY})"/>`
    offset += dash
  })
  svg.innerHTML = paths +
    `<circle cx="${CX}" cy="${CY}" r="${R - STROKE / 2 - 2}" fill="#F5F4FB"/>` +
    `<text x="${CX}" y="${CY - 6}" text-anchor="middle" font-size="9" fill="#888">HOY</text>` +
    `<text x="${CX}" y="${CY + 8}" text-anchor="middle" font-size="13" font-weight="600" fill="#1A1A1A">695cc</text>` +
    `<text x="${CX}" y="${CY + 20}" text-anchor="middle" font-size="9" fill="#AFA9EC">total</text>`

  legend.innerHTML = data.map(d => `
    <div class="donut-legend-item">
      <div class="donut-legend-dot" style="background:${d.color}"></div>
      <span>${d.label} · ${d.pct}%</span>
    </div>`).join('')
}

// ── ACCIONES ──────────────────────────────────────────────
async function emmaActualizarTodo() {
  emmaDataCargada = false
  await emmaCargarDatos()
}

function emmaAbrirNuevaComida() {
  emmaMostrarToast('Próximamente: nueva comida')
}

// ── INIT ──────────────────────────────────────────────────
window.emmaSwitchScreen = emmaSwitchScreen
window.emmaToggleSidebarExpand = emmaToggleSidebarExpand
window.emmaAbrirSidebarMobile = emmaAbrirSidebarMobile
window.emmaCerrarSidebarMobile = emmaCerrarSidebarMobile
window.emmaActualizarTodo = emmaActualizarTodo
window.emmaAbrirNuevaComida = emmaAbrirNuevaComida
window.emmaCargarDatos = emmaCargarDatos

emmaCargarDatos()

// ── COMIDAS ───────────────────────────────────────────────
let emmaComidasFiltro = 'todas'
let emmaComidasEditandoId = null

function emmaComidasRender() {
  const lista = document.getElementById('comidas-lista')
  if (!lista) return

  const filtradas = emmaComidasData.filter(c => {
    if (emmaComidasFiltro === 'activas') return c.activo
    if (emmaComidasFiltro === 'deshabilitadas') return !c.activo
    return true
  })

  const grupos = {}
  filtradas.forEach(c => {
    if (!grupos[c.categoria]) grupos[c.categoria] = []
    grupos[c.categoria].push(c)
  })

  lista.innerHTML = Object.entries(grupos).map(([cat, items]) => `
    <div class="comidas-section-hdr">${cat.toUpperCase()}</div>
    <div class="comidas-card">
      ${items.map(c => `
        <div class="comidas-row${c.activo ? '' : ' disabled'}">
          <div class="comidas-emoji">${c.emoji}</div>
          <div class="comidas-info">
            <div class="comidas-name${c.activo ? '' : ' disabled-text'}">${c.nombre}</div>
            <div class="comidas-sub">${c.categoria}${c.activo ? '' : ' · Deshabilitada'}</div>
          </div>
          <div class="comidas-amount">
            <div class="comidas-val" style="${c.activo ? '' : 'color:var(--emma-muted);'}">${c.tamano}</div>
            <div class="comidas-unit">${c.unidad}</div>
          </div>
          <div class="comidas-edit-btn" onclick="emmaComidasAbrirEditar(${c.id})">✏️</div>
        </div>
      `).join('')}
    </div>
  `).join('')
}

function emmaComidasGetCategorias() {
  return [...new Set(emmaComidasData.map(c => c.categoria))]
}

function emmaComidasRenderCatChips(containerId, catRowId, catSeleccionada) {
  const container = document.getElementById(containerId)
  if (!container) return
  const cats = emmaComidasGetCategorias()
  container.innerHTML = cats.map(cat => `
    <div class="comidas-cat-chip${cat === catSeleccionada ? ' active' : ''}"
         onclick="emmaComidasSelCat(this,'${catRowId}')">${cat}</div>
  `).join('') + `<div class="comidas-cat-chip add-cat" onclick="emmaComidasMostrarNuevaCat('${catRowId}')">+ Nueva</div>`
}

function emmaComidasSelCat(el, catRowId) {
  if (el.classList.contains('add-cat')) { emmaComidasMostrarNuevaCat(catRowId); return }
  el.closest('.comidas-cat-chips').querySelectorAll('.comidas-cat-chip:not(.add-cat)')
    .forEach(c => c.classList.remove('active'))
  el.classList.add('active')
}

function emmaComidasMostrarNuevaCat(rowId) {
  const row = document.getElementById(rowId)
  if (!row) return
  row.style.display = row.style.display === 'none' ? 'flex' : 'none'
  if (row.style.display === 'flex') {
    const input = row.querySelector('input')
    if (input) setTimeout(() => input.focus(), 50)
  }
}

function emmaComidasAgregarCat(modo) {
  const inputId = modo === 'nueva' ? 'nueva-cat-input' : 'editar-cat-input'
  const chipsId = modo === 'nueva' ? 'nueva-cat-chips' : 'editar-cat-chips'
  const rowId   = modo === 'nueva' ? 'nueva-cat-row'   : 'editar-cat-row'
  const input = document.getElementById(inputId)
  const nombre = input.value.trim()
  if (!nombre) return
  const chips = document.getElementById(chipsId)
  const addBtn = chips.querySelector('.add-cat')
  chips.querySelectorAll('.comidas-cat-chip:not(.add-cat)').forEach(c => c.classList.remove('active'))
  const newChip = document.createElement('div')
  newChip.className = 'comidas-cat-chip active'
  newChip.textContent = nombre
  newChip.onclick = function() { emmaComidasSelCat(this, rowId) }
  chips.insertBefore(newChip, addBtn)
  input.value = ''
  document.getElementById(rowId).style.display = 'none'
}

function emmaComidasSetFiltro(btn, filtro) {
  emmaComidasFiltro = filtro
  document.querySelectorAll('.comidas-chip').forEach(c => c.classList.remove('active'))
  btn.classList.add('active')
  emmaComidasRender()
}

function emmaComidasAbrirNueva() {
  emmaComidasRenderCatChips('nueva-cat-chips', 'nueva-cat-row', null)
  document.getElementById('nueva-nombre').value = ''
  document.getElementById('nueva-tamano').value = ''
  document.getElementById('nueva-emoji').value = ''
  document.getElementById('nueva-cat-row').style.display = 'none'
  document.getElementById('comidas-modal-nueva').classList.add('open')
}

function emmaComidasAbrirEditar(id) {
  const c = emmaComidasData.find(x => x.id === id)
  if (!c) return
  emmaComidasEditandoId = id
  emmaComidasRenderCatChips('editar-cat-chips', 'editar-cat-row', c.categoria)
  document.getElementById('editar-nombre').value = c.nombre
  document.getElementById('editar-tamano').value = c.tamano
  document.getElementById('editar-emoji').value = c.emoji
  document.getElementById('editar-cat-row').style.display = 'none'
  document.querySelectorAll('#editar-unidad-group .comidas-unit-pill').forEach(p => {
    p.classList.toggle('active', p.textContent === c.unidad)
    p.classList.toggle('inactive', p.textContent !== c.unidad)
  })
  const sw = document.getElementById('editar-activo-switch')
  sw.classList.toggle('on', c.activo)
  document.getElementById('comidas-modal-editar').classList.add('open')
}

function emmaComidasGuardarNueva() {
  const nombre = document.getElementById('nueva-nombre').value.trim()
  const tamano = parseFloat(document.getElementById('nueva-tamano').value)
  const emoji  = document.getElementById('nueva-emoji').value.trim() || '🍽️'
  const catEl  = document.querySelector('#nueva-cat-chips .comidas-cat-chip.active:not(.add-cat)')
  const unidad = document.querySelector('#comidas-modal-nueva .comidas-unit-pill.active')?.textContent || 'cc'
  if (!nombre || !catEl || isNaN(tamano)) return
  fetch('/api/emma/comidas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, categoria: catEl.textContent.trim(), tamano, unidad, emoji, activo: true })
  })
  .then(r => r.json())
  .then(data => {
    if (data.ok) { emmaCargarDatos(); emmaComidasCerrar('comidas-modal-nueva') }
    else console.error('[Emma] Error guardando comida:', data.error)
  })
  .catch(err => console.error('[Emma] fetch error:', err))
}

function emmaComidasGuardarEdicion() {
  const c = emmaComidasData.find(x => x.id === emmaComidasEditandoId)
  if (!c) return
  const catEl  = document.querySelector('#editar-cat-chips .comidas-cat-chip.active:not(.add-cat)')
  const nombre = document.getElementById('editar-nombre').value.trim() || c.nombre
  const tamano = parseFloat(document.getElementById('editar-tamano').value) || c.tamano
  const emoji  = document.getElementById('editar-emoji').value.trim() || c.emoji
  const cat    = catEl ? catEl.textContent.trim() : c.categoria
  const unidad = document.querySelector('#editar-unidad-group .comidas-unit-pill.active')?.textContent || c.unidad
  const activo = document.getElementById('editar-activo-switch').classList.contains('on')
  fetch('/api/emma/comidas', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rowIndex: c._row, nombre, categoria: cat, tamano, unidad, emoji, activo })
  })
  .then(r => r.json())
  .then(data => {
    if (data.ok) { emmaCargarDatos(); emmaComidasCerrar('comidas-modal-editar') }
    else console.error('[Emma] Error editando comida:', data.error)
  })
  .catch(err => console.error('[Emma] fetch error:', err))
}

function emmaComidasEliminar() {
  const c = emmaComidasData.find(x => x.id === emmaComidasEditandoId)
  if (!c) return
  fetch('/api/emma/comidas', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rowIndex: c._row })
  })
  .then(r => r.json())
  .then(data => {
    if (data.ok) { emmaCargarDatos(); emmaComidasCerrar('comidas-modal-editar') }
    else console.error('[Emma] Error eliminando comida:', data.error)
  })
  .catch(err => console.error('[Emma] fetch error:', err))
}

function emmaComidasToggleUnidad(btn) {
  btn.parentElement.querySelectorAll('.comidas-unit-pill').forEach(p => {
    p.classList.remove('active'); p.classList.add('inactive')
  })
  btn.classList.add('active'); btn.classList.remove('inactive')
}

function emmaComidasToggleSwitch(sw) { sw.classList.toggle('on') }

function emmaComidasCerrar(id) { document.getElementById(id)?.classList.remove('open') }

function emmaComidasCerrarSiOverlay(e, id) {
  if (e.target === document.getElementById(id)) emmaComidasCerrar(id)
}

window.emmaComidasRender = emmaComidasRender
window.emmaComidasAbrirNueva = emmaComidasAbrirNueva
window.emmaComidasAbrirEditar = emmaComidasAbrirEditar
window.emmaComidasGuardarNueva = emmaComidasGuardarNueva
window.emmaComidasGuardarEdicion = emmaComidasGuardarEdicion
window.emmaComidasEliminar = emmaComidasEliminar
window.emmaComidasSetFiltro = emmaComidasSetFiltro
window.emmaComidasToggleUnidad = emmaComidasToggleUnidad
window.emmaComidasToggleSwitch = emmaComidasToggleSwitch
window.emmaComidasCerrar = emmaComidasCerrar
window.emmaComidasCerrarSiOverlay = emmaComidasCerrarSiOverlay
window.emmaComidasAgregarCat = emmaComidasAgregarCat
window.emmaComidasSelCat = emmaComidasSelCat
window.emmaComidasMostrarNuevaCat = emmaComidasMostrarNuevaCat

// ── RUTINAS ───────────────────────────────────────────────
let emmaRutinasFiltro = 'todas'
let emmaRutinasEditandoId = null

function emmaRutinasRender() {
  const lista = document.getElementById('rutinas-lista')
  if (!lista) return
  const filtradas = emmaRutinasData.filter(r => {
    if (emmaRutinasFiltro === 'activas') return r.activo
    if (emmaRutinasFiltro === 'deshabilitadas') return !r.activo
    return true
  })
  const activas = filtradas.filter(r => r.activo)
  const deshabilitadas = filtradas.filter(r => !r.activo)
  let html = ''
  if (activas.length) {
    html += '<div class="rutinas-section-hdr">RUTINAS ACTIVAS</div><div class="rutinas-card">'
    html += activas.map(r => `
      <div class="rutinas-row">
        <div class="rutinas-emoji">${r.emoji}</div>
        <div class="rutinas-info">
          <div class="rutinas-name">${r.nombre}</div>
          <div class="rutinas-sub">${r.desc}</div>
        </div>
        <span class="rutinas-tipo-badge ${r.tipo}">${r.tipo === 'binario' ? 'Sí / No' : 'Cantidad'}</span>
        <div class="rutinas-edit-btn" onclick="emmaRutinasAbrirEditar(${r.id})">✏️</div>
      </div>`).join('')
    html += '</div>'
  }
  if (deshabilitadas.length) {
    html += '<div class="rutinas-section-hdr" style="margin-top:6px;">DESHABILITADAS</div><div class="rutinas-card">'
    html += deshabilitadas.map(r => `
      <div class="rutinas-row disabled">
        <div class="rutinas-emoji">${r.emoji}</div>
        <div class="rutinas-info">
          <div class="rutinas-name dis">${r.nombre}</div>
          <div class="rutinas-sub">${r.desc} · Deshabilitada</div>
        </div>
        <span class="rutinas-tipo-badge ${r.tipo}" style="opacity:0.5;">${r.tipo === 'binario' ? 'Sí / No' : 'Cantidad'}</span>
        <div class="rutinas-edit-btn" onclick="emmaRutinasAbrirEditar(${r.id})">✏️</div>
      </div>`).join('')
    html += '</div>'
  }
  lista.innerHTML = html
}

function emmaRutinasSetFiltro(btn, filtro) {
  emmaRutinasFiltro = filtro
  document.querySelectorAll('.rutinas-chip').forEach(c => c.classList.remove('active'))
  btn.classList.add('active')
  emmaRutinasRender()
}

function emmaRutinasSelTipo(el) {
  el.closest('.rutinas-tipo-group').querySelectorAll('.rutinas-tipo-opt').forEach(o => o.classList.remove('active'))
  el.classList.add('active')
}

function emmaRutinasAbrirNueva() {
  document.getElementById('rutina-nueva-nombre').value = ''
  document.getElementById('rutina-nueva-desc').value = ''
  document.getElementById('rutina-nueva-emoji').value = ''
  document.querySelectorAll('#rutina-nueva-tipo .rutinas-tipo-opt').forEach((o, i) => {
    o.classList.toggle('active', i === 0)
  })
  document.getElementById('rutinas-modal-nueva').classList.add('open')
}

function emmaRutinasAbrirEditar(id) {
  const r = emmaRutinasData.find(x => x.id === id)
  if (!r) return
  emmaRutinasEditandoId = id
  document.getElementById('rutina-editar-nombre').value = r.nombre
  document.getElementById('rutina-editar-desc').value = r.desc
  document.getElementById('rutina-editar-emoji').value = r.emoji
  document.querySelectorAll('#rutina-editar-tipo .rutinas-tipo-opt').forEach(o => {
    const esBinario = o.querySelector('.rutinas-tipo-lbl').textContent.includes('Sí')
    o.classList.toggle('active', (r.tipo === 'binario') === esBinario)
  })
  const sw = document.getElementById('rutina-editar-switch')
  sw.classList.toggle('on', r.activo)
  document.getElementById('rutinas-modal-editar').classList.add('open')
}

function emmaRutinasGuardarNueva() {
  const nombre = document.getElementById('rutina-nueva-nombre').value.trim()
  if (!nombre) return
  const tipoActivo = document.querySelector('#rutina-nueva-tipo .rutinas-tipo-opt.active .rutinas-tipo-lbl')
  const tipo = tipoActivo?.textContent.includes('Sí') ? 'binario' : 'cantidad'
  fetch('/api/emma/rutinas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre,
      descripcion: document.getElementById('rutina-nueva-desc').value.trim(),
      emoji: document.getElementById('rutina-nueva-emoji').value.trim() || '📋',
      tipo,
      activo: true,
    })
  })
  .then(r => r.json())
  .then(data => {
    if (data.ok) { emmaCargarDatos(); emmaRutinasCerrar('rutinas-modal-nueva') }
    else console.error('[Emma] Error guardando rutina:', data.error)
  })
  .catch(err => console.error('[Emma] fetch error:', err))
}

function emmaRutinasGuardarEdicion() {
  const r = emmaRutinasData.find(x => x.id === emmaRutinasEditandoId)
  if (!r) return
  const tipoActivo = document.querySelector('#rutina-editar-tipo .rutinas-tipo-opt.active .rutinas-tipo-lbl')
  fetch('/api/emma/rutinas', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      rowIndex:    r._row,
      nombre:      document.getElementById('rutina-editar-nombre').value.trim() || r.nombre,
      descripcion: document.getElementById('rutina-editar-desc').value.trim(),
      emoji:       document.getElementById('rutina-editar-emoji').value.trim() || r.emoji,
      tipo:        tipoActivo?.textContent.includes('Sí') ? 'binario' : 'cantidad',
      activo:      document.getElementById('rutina-editar-switch').classList.contains('on'),
    })
  })
  .then(r2 => r2.json())
  .then(data => {
    if (data.ok) { emmaCargarDatos(); emmaRutinasCerrar('rutinas-modal-editar') }
    else console.error('[Emma] Error editando rutina:', data.error)
  })
  .catch(err => console.error('[Emma] fetch error:', err))
}

function emmaRutinasEliminar() {
  const r = emmaRutinasData.find(x => x.id === emmaRutinasEditandoId)
  if (!r) return
  fetch('/api/emma/rutinas', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rowIndex: r._row })
  })
  .then(r2 => r2.json())
  .then(data => {
    if (data.ok) { emmaCargarDatos(); emmaRutinasCerrar('rutinas-modal-editar') }
    else console.error('[Emma] Error eliminando rutina:', data.error)
  })
  .catch(err => console.error('[Emma] fetch error:', err))
}

function emmaRutinasCerrar(id) { document.getElementById(id)?.classList.remove('open') }
function emmaRutinasCerrarSiOverlay(e, id) { if (e.target === document.getElementById(id)) emmaRutinasCerrar(id) }

window.emmaRutinasRender = emmaRutinasRender
window.emmaRutinasAbrirNueva = emmaRutinasAbrirNueva
window.emmaRutinasAbrirEditar = emmaRutinasAbrirEditar
window.emmaRutinasGuardarNueva = emmaRutinasGuardarNueva
window.emmaRutinasGuardarEdicion = emmaRutinasGuardarEdicion
window.emmaRutinasEliminar = emmaRutinasEliminar
window.emmaRutinasSetFiltro = emmaRutinasSetFiltro
window.emmaRutinasSelTipo = emmaRutinasSelTipo
window.emmaRutinasCerrar = emmaRutinasCerrar
window.emmaRutinasCerrarSiOverlay = emmaRutinasCerrarSiOverlay

// ── PLANES ────────────────────────────────────────────────
let emmaPlanesEditandoPlanId = null
let emmaPlanesEditandoItemId = null
let emmaPlanesPickerH = { 'add-comida': 6, 'add-rutina': 6, 'edit-hora': 9 }
let emmaPlanesPickerM = { 'add-comida': 0, 'add-rutina': 0, 'edit-hora': 30 }
let emmaPlanesModoCambioHora = 'fija'
let emmaPlanesSortables = []

function emmaPlanesRenderLista() {
  const c = document.getElementById('planes-lista-container')
  if (!c) return
  c.innerHTML = emmaPlanesData.map(p => {
    const fijos = p.items.filter(i => !i.flexible)
    const preview = fijos.slice(0,4).map(i =>
      `<span class="planes-preview-pill">${i.emoji} ${i.hora}:${String(i.min).padStart(2,'0')} ${i.nombre.split(' — ')[0]}</span>`
    ).join('')
    const extras = p.items.length > 4 ? `<span class="planes-preview-pill">+ ${p.items.length - 4} más</span>` : ''
    return `
      <div class="planes-plan-card" onclick="emmaPlanesVerDetalle(${p.id})">
        <div class="planes-plan-header">
          <div class="${p.activo ? 'planes-dot-activo' : 'planes-dot-inactivo'}"></div>
          <div style="flex:1;">
            <div class="planes-plan-name">${p.nombre}</div>
            <div class="planes-plan-meta">${p.items.length} ítems · ${fijos.length} fijos, ${p.items.filter(i=>i.flexible).length} flexibles</div>
          </div>
          <div class="${p.activo ? 'planes-badge-activo' : 'planes-badge-inactivo'}">${p.activo ? 'ACTIVO' : 'INACTIVO'}</div>
        </div>
        ${p.items.length ? `<div class="planes-preview">${preview}${extras}</div>` : ''}
      </div>`
  }).join('')
}

function emmaPlanesVerDetalle(planId) {
  emmaPlanesEditandoPlanId = planId
  const plan = emmaPlanesData.find(p => p.id === planId)
  if (!plan) return
  document.getElementById('planes-detail-title').textContent = plan.nombre
  document.getElementById('planes-detail-badge').textContent = plan.activo ? '● PLAN ACTIVO' : '○ PLAN INACTIVO'
  document.getElementById('planes-vista-lista').style.display = 'none'
  document.getElementById('planes-vista-detalle').style.display = 'flex'
  emmaPlanesRenderDetalle()
}

function emmaPlanesRenderDetalle() {
  const plan = emmaPlanesData.find(p => p.id === emmaPlanesEditandoPlanId)
  if (!plan) return
  document.getElementById('planes-detail-count').textContent = plan.items.length + ' ítems en total'

  const area = document.getElementById('planes-scroll-area')
  const fijos = plan.items.filter(i => !i.flexible)
  const flexibles = plan.items.filter(i => i.flexible)

  const grupos = {}
  fijos.forEach(item => {
    const key = item.hora + ':' + String(item.min).padStart(2,'0')
    if (!grupos[key]) grupos[key] = []
    grupos[key].push(item)
  })
  const horasOrdenadas = Object.keys(grupos).sort((a,b) => {
    const [ah,am] = a.split(':').map(Number)
    const [bh,bm] = b.split(':').map(Number)
    return ah*60+am - (bh*60+bm)
  })

  const badgeClass = i => {
    if (i.tipo === 'rutina') return 'planes-badge-rutina'
    if (i.cat === 'Leche') return 'planes-badge-leche'
    if (i.cat === 'Sólidos') return 'planes-badge-solidos'
    return 'planes-badge-postre'
  }
  const badgeLabel = i => i.tipo === 'rutina' ? 'Rutina' : i.cat

  let html = '<div class="planes-section-hdr">HORARIO FIJO</div>'
  horasOrdenadas.forEach(hora => {
    html += `
      <div class="planes-hour-block">
        <div class="planes-hour-header">
          <div class="planes-hour-label">${hora}</div>
          <div class="planes-hour-line"></div>
        </div>
        <div class="planes-items-in-hour" data-hora="${hora}" data-sortable>
          ${grupos[hora].map(i => `
            <div class="planes-item" data-item-id="${i.id}">
              <div class="planes-drag-handle">
                <div class="planes-drag-dot"></div><div class="planes-drag-dot"></div>
                <div class="planes-drag-dot"></div><div class="planes-drag-dot"></div>
                <div class="planes-drag-dot"></div><div class="planes-drag-dot"></div>
              </div>
              <div class="planes-item-emoji">${i.emoji}</div>
              <div class="planes-item-info">
                <div class="planes-item-name">${i.nombre}</div>
                <div class="planes-item-sub">${i.sub}</div>
              </div>
              <span class="planes-item-badge ${badgeClass(i)}">${badgeLabel(i)}</span>
              <div class="planes-item-actions">
                <button class="planes-time-btn" onclick="emmaPlaneAbrirCambiarHora(${i.id})">${hora}</button>
                <button class="planes-del-btn" onclick="emmaPlaneEliminarItem(${i.id})">×</button>
              </div>
            </div>`).join('')}
        </div>
      </div>`
  })

  html += '<div class="planes-section-hdr" style="margin-top:16px;">EN CUALQUIER MOMENTO</div>'
  if (flexibles.length) {
    html += '<div class="planes-flex-section" id="planes-flex-list">'
    html += flexibles.map(i => `
      <div class="planes-item" data-item-id="${i.id}"
           style="background:transparent;border-color:rgba(127,119,221,0.15);">
        <div class="planes-drag-handle">
          <div class="planes-drag-dot"></div><div class="planes-drag-dot"></div>
          <div class="planes-drag-dot"></div><div class="planes-drag-dot"></div>
          <div class="planes-drag-dot"></div><div class="planes-drag-dot"></div>
        </div>
        <div class="planes-item-emoji">${i.emoji}</div>
        <div class="planes-item-info">
          <div class="planes-item-name">${i.nombre}</div>
          <div class="planes-item-sub">${i.sub}</div>
        </div>
        <div class="planes-item-actions">
          <button class="planes-move-btn" onclick="emmaPlaneAbrirCambiarHora(${i.id})">Fijar hora</button>
          <button class="planes-del-btn" onclick="emmaPlaneEliminarItem(${i.id})">×</button>
        </div>
      </div>`).join('')
    html += '</div>'
  } else {
    html += '<div style="font-size:13px;color:var(--emma-muted);padding:12px 0;">Sin ítems flexibles</div>'
  }

  area.innerHTML = html

  // Destruir sortables anteriores
  emmaPlanesSortables.forEach(s => s.destroy())
  emmaPlanesSortables = []

  if (typeof Sortable === 'undefined') return

  const GROUP_NAME = 'planes-items-' + emmaPlanesEditandoPlanId

  // Sortable en cada bloque horario — permite recibir ítems de otros bloques
  area.querySelectorAll('[data-sortable]').forEach(el => {
    const horaDestino = el.dataset.hora
    const s = Sortable.create(el, {
      group: GROUP_NAME,
      animation: 150,
      ghostClass: 'sortable-ghost',
      dragClass: 'sortable-drag',
      handle: '.planes-drag-handle',
      onAdd(evt) {
        // Ítem llegó desde otro bloque (horario distinto o flexible)
        const itemId = parseInt(evt.item.dataset.itemId)
        const plan = emmaPlanesData.find(p => p.id === emmaPlanesEditandoPlanId)
        const item = plan?.items.find(i => i.id === itemId)
        if (!item) return
        const [h, m] = horaDestino.split(':').map(Number)
        item.hora = h
        item.min = m
        item.flexible = false
        // Actualizar el botón de hora del ítem arrastrado
        const timeBtn = evt.item.querySelector('.planes-time-btn')
        if (timeBtn) timeBtn.textContent = horaDestino
        // Re-render para consistencia (tras pequeño delay para que Sortable termine)
        setTimeout(() => emmaPlanesRenderDetalle(), 50)
      },
      onEnd(evt) {
        if (evt.from === evt.to) {
          // Reordenamiento dentro del mismo bloque — actualizar orden en data
          const plan = emmaPlanesData.find(p => p.id === emmaPlanesEditandoPlanId)
          if (!plan) return
          const newOrder = [...el.querySelectorAll('[data-item-id]')]
            .map(n => parseInt(n.dataset.itemId))
          const enEsteBloque = plan.items.filter(
            i => !i.flexible && i.hora + ':' + String(i.min).padStart(2,'0') === horaDestino
          )
          const otros = plan.items.filter(
            i => i.flexible || i.hora + ':' + String(i.min).padStart(2,'0') !== horaDestino
          )
          const reordenado = newOrder
            .map(id => enEsteBloque.find(i => i.id === id))
            .filter(Boolean)
          plan.items = [...otros, ...reordenado]
        }
      }
    })
    emmaPlanesSortables.push(s)
  })

  // Sortable en sección flexible — permite recibir ítems fijos y reordenar
  const flexList = document.getElementById('planes-flex-list')
  if (flexList) {
    const s = Sortable.create(flexList, {
      group: GROUP_NAME,
      animation: 150,
      ghostClass: 'sortable-ghost',
      handle: '.planes-drag-handle',
      onAdd(evt) {
        // Ítem llegó desde un bloque horario fijo
        const itemId = parseInt(evt.item.dataset.itemId)
        const plan = emmaPlanesData.find(p => p.id === emmaPlanesEditandoPlanId)
        const item = plan?.items.find(i => i.id === itemId)
        if (!item) return
        item.flexible = true
        item.hora = 0
        item.min = 0
        // Ocultar el botón de hora y mostrar "Fijar hora" en el ítem arrastrado
        setTimeout(() => emmaPlanesRenderDetalle(), 50)
      },
      onEnd(evt) {
        if (evt.from === evt.to) {
          // Reordenamiento dentro de flexibles
          const plan = emmaPlanesData.find(p => p.id === emmaPlanesEditandoPlanId)
          if (!plan) return
          const newOrder = [...flexList.querySelectorAll('[data-item-id]')]
            .map(n => parseInt(n.dataset.itemId))
          const fijos = plan.items.filter(i => !i.flexible)
          const flexReord = newOrder
            .map(id => plan.items.find(i => i.id === id))
            .filter(Boolean)
          plan.items = [...fijos, ...flexReord]
        }
      }
    })
    emmaPlanesSortables.push(s)
  }
}

function emmaPlaneVolverLista() {
  emmaPlanesEditandoPlanId = null
  document.getElementById('planes-vista-detalle').style.display = 'none'
  document.getElementById('planes-vista-lista').style.display = 'flex'
  emmaPlanesRenderLista()
}

function emmaPlaneAbrirNuevo() {
  document.getElementById('planes-nuevo-nombre').value = ''
  emmaPlanesCerrar('planes-modal-nuevo')
  document.getElementById('planes-modal-nuevo').classList.add('open')
}

function emmaPlaneGuardarNuevo() {
  const nombre = document.getElementById('planes-nuevo-nombre').value.trim()
  if (!nombre) return
  fetch('/api/emma/planes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre })
  })
  .then(r => r.json())
  .then(data => {
    if (data.ok) { emmaCargarDatos(); emmaPlanesCerrar('planes-modal-nuevo') }
    else console.error('[Emma] Error guardando plan:', data.error)
  })
  .catch(err => console.error('[Emma] fetch error:', err))
}

function emmaPlaneAbrirEditarNombre() {
  const plan = emmaPlanesData.find(p => p.id === emmaPlanesEditandoPlanId)
  if (!plan) return
  document.getElementById('planes-editar-nombre-input').value = plan.nombre
  const sw = document.getElementById('planes-activo-switch')
  sw.classList.toggle('on', plan.activo)
  document.getElementById('planes-modal-editar-nombre').classList.add('open')
}

function emmaPlaneGuardarEdicionNombre() {
  const plan = emmaPlanesData.find(p => p.id === emmaPlanesEditandoPlanId)
  if (!plan) return
  const nombre   = document.getElementById('planes-editar-nombre-input').value.trim() || plan.nombre
  const esActivo = document.getElementById('planes-activo-switch').classList.contains('on')

  const doUpdate = () => fetch('/api/emma/planes', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rowIndex: plan._row, nombre, activo: esActivo })
  })
  const doActivar = () => fetch('/api/emma/planes', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ activar: true, planId: emmaPlanesEditandoPlanId })
  })

  const chain = esActivo ? doActivar().then(doUpdate) : doUpdate()
  chain
    .then(() => emmaCargarDatos())
    .then(() => {
      document.getElementById('planes-detail-title').textContent = nombre
      document.getElementById('planes-detail-badge').textContent = esActivo ? '● PLAN ACTIVO' : '○ PLAN INACTIVO'
      emmaPlanesCerrar('planes-modal-editar-nombre')
    })
    .catch(err => console.error('[Emma] fetch error:', err))
}

function emmaPlaneAbrirAddComida() {
  emmaPlanesPickerH['add-comida'] = 6
  emmaPlanesPickerM['add-comida'] = 0
  emmaPlanesActualizarPicker('add-comida')
  document.getElementById('planes-add-comida-etiqueta').value = ''
  document.getElementById('planes-add-comida-cantidad').value = ''
  document.getElementById('planes-modal-add-comida').classList.add('open')
}

function emmaPlaneAbrirAddRutina() {
  const rutinasDisponibles = typeof emmaRutinasData !== 'undefined' ? emmaRutinasData.filter(r => r.activo) : []
  const container = document.getElementById('planes-add-rutina-sel')
  container.innerHTML = rutinasDisponibles.map((r,i) =>
    `<button class="planes-seg-opt${i===0?' active':''}" onclick="emmaPlaneSelSeg(this,'planes-add-rutina-sel')">${r.emoji} ${r.nombre}</button>`
  ).join('') || '<span style="font-size:13px;color:var(--emma-muted);">No hay rutinas activas</span>'
  emmaPlanesPickerH['add-rutina'] = 6
  emmaPlanesPickerM['add-rutina'] = 0
  emmaPlanesActualizarPicker('add-rutina')
  emmaPlaneSelTipoFija('flexible')
  document.getElementById('planes-modal-add-rutina').classList.add('open')
}

function emmaPlaneGuardarComida() {
  const plan = emmaPlanesData.find(p => p.id === emmaPlanesEditandoPlanId)
  if (!plan) return
  const catEl    = document.querySelector('#planes-add-comida-cat .planes-seg-opt.active')
  const etiqueta = document.getElementById('planes-add-comida-etiqueta').value.trim()
  const cat      = catEl ? catEl.textContent.replace(/^[^\s]+\s/,'').trim() : 'Leche'
  const emoji    = cat === 'Leche' ? '🍼' : cat === 'Sólidos' ? '🥕' : '🍌'
  const nombre   = etiqueta ? cat + ' — ' + etiqueta : cat
  const comida   = emmaComidasData.find(c => c.categoria === cat && c.nombre === nombre)
  const referenciaId = comida?.id || 0
  const itemsEnHora  = plan.items.filter(i =>
    !i.flexible && i.hora === emmaPlanesPickerH['add-comida'] && i.min === emmaPlanesPickerM['add-comida']
  )
  fetch('/api/emma/planes-items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      planId: emmaPlanesEditandoPlanId,
      tipo: 'comida',
      referenciaId,
      nombre,
      emoji,
      categoria: cat,
      etiqueta,
      hora: emmaPlanesPickerH['add-comida'],
      min:  emmaPlanesPickerM['add-comida'],
      flexible: false,
      orden: itemsEnHora.length + 1,
    })
  })
  .then(r => r.json())
  .then(data => {
    if (data.ok) {
      emmaCargarDatos().then(() => emmaPlanesRenderDetalle())
      emmaPlanesCerrar('planes-modal-add-comida')
    } else {
      console.error('[Emma] Error guardando comida en plan:', data.error)
    }
  })
  .catch(err => console.error('[Emma] fetch error:', err))
}

function emmaPlaneGuardarRutina() {
  const plan = emmaPlanesData.find(p => p.id === emmaPlanesEditandoPlanId)
  if (!plan) return
  const rutinaEl = document.querySelector('#planes-add-rutina-sel .planes-seg-opt.active')
  if (!rutinaEl) return
  const texto      = rutinaEl.textContent
  const emoji      = texto.match(/\p{Emoji}/u)?.[0] || '📋'
  const nombre     = texto.replace(/^\S+\s/,'').trim()
  const esFlexible = document.getElementById('planes-opt-flexible').classList.contains('active')
  const rutina     = emmaRutinasData.find(r => r.nombre === nombre)
  const referenciaId = rutina?.id || 0
  const hora = esFlexible ? 0 : emmaPlanesPickerH['add-rutina']
  const min  = esFlexible ? 0 : emmaPlanesPickerM['add-rutina']
  const itemsEnHora = esFlexible ? [] : plan.items.filter(i => !i.flexible && i.hora === hora && i.min === min)
  fetch('/api/emma/planes-items', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      planId: emmaPlanesEditandoPlanId,
      tipo: 'rutina',
      referenciaId,
      nombre,
      emoji,
      categoria: 'rutina',
      etiqueta: '',
      hora,
      min,
      flexible: esFlexible,
      orden: itemsEnHora.length + 1,
    })
  })
  .then(r => r.json())
  .then(data => {
    if (data.ok) {
      emmaCargarDatos().then(() => emmaPlanesRenderDetalle())
      emmaPlanesCerrar('planes-modal-add-rutina')
    } else {
      console.error('[Emma] Error guardando rutina en plan:', data.error)
    }
  })
  .catch(err => console.error('[Emma] fetch error:', err))
}

function emmaPlaneAbrirCambiarHora(itemId) {
  emmaPlanesEditandoItemId = itemId
  const plan = emmaPlanesData.find(p => p.id === emmaPlanesEditandoPlanId)
  const item = plan?.items.find(i => i.id === itemId)
  if (!item) return
  document.getElementById('planes-cambiar-hora-sub').textContent = item.nombre
  emmaPlanesPickerH['edit-hora'] = item.flexible ? 6 : item.hora
  emmaPlanesPickerM['edit-hora'] = item.flexible ? 0 : item.min
  emmaPlanesActualizarPicker('edit-hora')
  emmaPlanesSelMover(item.flexible ? 'flexible' : 'fija')
  emmaPlanesSyncQuick()
  document.getElementById('planes-modal-cambiar-hora').classList.add('open')
}

function emmaPlaneGuardarHora() {
  const plan = emmaPlanesData.find(p => p.id === emmaPlanesEditandoPlanId)
  const item = plan?.items.find(i => i.id === emmaPlanesEditandoItemId)
  if (!item) return
  const esFlexible = emmaPlanesModoCambioHora === 'flexible'
  fetch('/api/emma/planes-items', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      rowIndex:     item._row,
      planId:       item.planId,
      tipo:         item.tipo,
      referenciaId: item.referenciaId,
      nombre:       item.nombre,
      emoji:        item.emoji,
      categoria:    item.cat,
      etiqueta:     item.etiqueta || '',
      hora:         esFlexible ? 0 : emmaPlanesPickerH['edit-hora'],
      min:          esFlexible ? 0 : emmaPlanesPickerM['edit-hora'],
      flexible:     esFlexible,
      orden:        item.orden,
    })
  })
  .then(r => r.json())
  .then(data => {
    if (data.ok) {
      emmaPlanesCerrar('planes-modal-cambiar-hora')
      emmaCargarDatos().then(() => emmaPlanesRenderDetalle())
    } else {
      console.error('[Emma] Error actualizando hora:', data.error)
    }
  })
  .catch(err => console.error('[Emma] fetch error:', err))
}

function emmaPlaneEliminarItem(itemId) {
  const plan = emmaPlanesData.find(p => p.id === emmaPlanesEditandoPlanId)
  if (!plan) return
  const item = plan.items.find(i => i.id === itemId)
  if (!item) return
  fetch('/api/emma/planes-items', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rowIndex: item._row })
  })
  .then(r => r.json())
  .then(data => {
    if (data.ok) emmaCargarDatos().then(() => emmaPlanesRenderDetalle())
    else console.error('[Emma] Error eliminando item:', data.error)
  })
  .catch(err => console.error('[Emma] fetch error:', err))
}

function emmaPlanesSelMover(modo) {
  emmaPlanesModoCambioHora = modo
  document.getElementById('planes-mover-fija').classList.toggle('active', modo === 'fija')
  document.getElementById('planes-mover-flexible').classList.toggle('active', modo === 'flexible')
}

function emmaPlanesCambiarHora(delta, ctx) {
  emmaPlanesPickerH[ctx] = Math.max(0, Math.min(23, (emmaPlanesPickerH[ctx] || 6) + delta))
  emmaPlanesActualizarPicker(ctx)
  if (ctx === 'edit-hora') emmaPlanesSyncQuick()
}

function emmaPlanesCambiarMin(ctx) {
  emmaPlanesPickerM[ctx] = emmaPlanesPickerM[ctx] === 0 ? 30 : 0
  emmaPlanesActualizarPicker(ctx)
  if (ctx === 'edit-hora') emmaPlanesSyncQuick()
}

function emmaPlanesActualizarPicker(ctx) {
  const hEl = document.getElementById('planes-' + ctx + '-h')
  const mEl = document.getElementById('planes-' + ctx + '-m')
  if (hEl) hEl.textContent = emmaPlanesPickerH[ctx]
  if (mEl) mEl.textContent = String(emmaPlanesPickerM[ctx]).padStart(2,'0')
}

function emmaPlaneSetQuick(h, m, btn) {
  emmaPlanesPickerH['edit-hora'] = h
  emmaPlanesPickerM['edit-hora'] = m
  emmaPlanesActualizarPicker('edit-hora')
  document.querySelectorAll('.planes-quick-pill').forEach(p => p.classList.remove('active'))
  btn.classList.add('active')
}

function emmaPlanesSyncQuick() {
  const label = emmaPlanesPickerH['edit-hora'] + ':' + String(emmaPlanesPickerM['edit-hora']).padStart(2,'0')
  document.querySelectorAll('.planes-quick-pill').forEach(p => p.classList.toggle('active', p.textContent === label))
}

function emmaPlaneSelSeg(btn, groupId) {
  document.querySelectorAll('#' + groupId + ' .planes-seg-opt').forEach(b => b.classList.remove('active'))
  btn.classList.add('active')
}

function emmaPlaneSelTipoFija(tipo) {
  document.getElementById('planes-opt-fija').classList.toggle('active', tipo === 'fija')
  document.getElementById('planes-opt-flexible').classList.toggle('active', tipo === 'flexible')
  const row = document.getElementById('planes-add-rutina-hora-row')
  if (row) row.classList.toggle('visible', tipo === 'fija')
}

function emmaPlanesCerrar(id) { document.getElementById(id)?.classList.remove('open') }
function emmaPlanesCerrarSiOverlay(e, id) { if (e.target === document.getElementById(id)) emmaPlanesCerrar(id) }

window.emmaPlanesRenderLista = emmaPlanesRenderLista
window.emmaPlanesVerDetalle = emmaPlanesVerDetalle

// ── CALENDARIO ────────────────────────────────────────────
let emmaCalDiaOffset = 0
const emmaCalMeses = ['enero','febrero','marzo','abril','mayo','junio',
  'julio','agosto','septiembre','octubre','noviembre','diciembre']
const emmaCalDow = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']

// Registros por fecha: { 'YYYY-MM-DD': { itemId: { cantidad, nota, solidoNombre, estado } } }
const emmaCalRegistros = {}

// Ítem actualmente abierto en modal
let emmaCalItemActual = null
let emmaCalQtyMax = null
let emmaCalQtyStep = 1

function emmaCalFechaKey(offset) {
  const d = new Date(); d.setDate(d.getDate() + offset)
  return d.toISOString().slice(0, 10)
}

async function emmaCalCargarFecha(fecha) {
  try {
    const [regRes, panRes] = await Promise.all([
      fetch('/api/emma/registro?fecha=' + fecha),
      fetch('/api/emma/panales?fecha='  + fecha),
    ])
    const regData = await regRes.json()
    const panData = await panRes.json()

    if (!emmaCalRegistros[fecha]) emmaCalRegistros[fecha] = {}

    if (regData.ok) {
      regData.rows.forEach(row => {
        // row: ID|Fecha|TipoRegistro|Hora|Cantidad|Unidad|Estado|SolidoNombre|Nota|FechaHoraRegistro|PlanItemID
        const planItemId = row[10] ? parseInt(row[10]) : null
        const key = planItemId ?? (row[2] + '_' + row[3])
        emmaCalRegistros[fecha][key] = {
          cantidad:     parseFloat(row[4]) || 0,
          unidad:       row[5] || '',
          estado:       row[6] || 'pendiente',
          solidoNombre: row[7] || '',
          nota:         row[8] || '',
          planItemId,
        }
      })
    }

    if (panData.pipi !== undefined) {
      emmaCalRegistros[fecha]['_panales'] = { pipi: panData.pipi, popo: panData.popo }
    }
  } catch (err) {
    console.error('[Emma] emmaCalCargarFecha error:', err)
  }
}

async function emmaCalCambiarDia(delta) {
  emmaCalDiaOffset += delta
  const d = new Date(); d.setDate(d.getDate() + emmaCalDiaOffset)
  const lbl = emmaCalDiaOffset === 0 ? 'Hoy'
    : emmaCalDiaOffset === -1 ? 'Ayer'
    : emmaCalDow[d.getDay()]
  const el = document.getElementById('cal-fecha-display')
  if (el) el.textContent = lbl + ' · ' + d.getDate() + ' ' + emmaCalMeses[d.getMonth()]
  const fecha = emmaCalFechaKey(emmaCalDiaOffset)
  if (!emmaCalRegistros[fecha]) await emmaCalCargarFecha(fecha)
  const fechaAyer = emmaCalFechaKey(emmaCalDiaOffset - 1)
  if (!emmaCalRegistros[fechaAyer]) await emmaCalCargarFecha(fechaAyer)
  emmaCalRender()
}

function emmaCalGetRegistro(itemId) {
  const key = emmaCalFechaKey(emmaCalDiaOffset)
  return emmaCalRegistros[key]?.[itemId] || null
}
function emmaCalGetRegistroAyer(itemId) {
  const key = emmaCalFechaKey(emmaCalDiaOffset - 1)
  return emmaCalRegistros[key]?.[itemId] || null
}
function emmaCalSetRegistro(itemId, data) {
  const key = emmaCalFechaKey(emmaCalDiaOffset)
  if (!emmaCalRegistros[key]) emmaCalRegistros[key] = {}
  emmaCalRegistros[key][itemId] = data
}

function emmaCalEstado(cantidad, max) {
  if (!cantidad || cantidad <= 0) return 'pendiente'
  if (!max || cantidad >= max) return 'completo'
  return 'parcial'
}

function emmaCalCompareBadgeHtml(itemId, item) {
  const hoy = emmaCalGetRegistro(itemId)
  const ayer = emmaCalGetRegistroAyer(itemId)
  if (!ayer) return '<span class="cal-compare-badge cal-cb-na">sin ayer</span>'
  if (item.tipo === 'rutina' && item.registroTipo === 'binario') {
    return ayer.cantidad
      ? '<span class="cal-compare-badge cal-cb-ok">✓ ayer</span>'
      : '<span class="cal-compare-badge cal-cb-na">✗ ayer</span>'
  }
  const diff = (hoy?.cantidad || 0) - (ayer.cantidad || 0)
  const unidad = item.unidad || ''
  if (diff > 0) return `<span class="cal-compare-badge cal-cb-plus">+${diff}${unidad}</span>`
  if (diff < 0) return `<span class="cal-compare-badge cal-cb-minus">${diff}${unidad}</span>`
  return `<span class="cal-compare-badge cal-cb-equal">= ${ayer.cantidad}${unidad}</span>`
}

function emmaCalRender() {
  const lista = document.getElementById('cal-lista')
  if (!lista) return
  const plan = emmaPlanesData?.find(p => p.activo)
  if (!plan) {
    lista.innerHTML = '<div style="padding:24px;text-align:center;color:var(--emma-muted);font-size:14px;">No hay plan activo.<br>Configura uno en Administrador → Planes.</div>'
    return
  }

  const fijos = plan.items.filter(i => !i.flexible)
  const flexibles = plan.items.filter(i => i.flexible)

  const grupos = {}
  fijos.forEach(item => {
    const key = item.hora + ':' + String(item.min).padStart(2,'0')
    if (!grupos[key]) grupos[key] = []
    grupos[key].push(item)
  })
  const horasOrdenadas = Object.keys(grupos).sort((a,b) => {
    const [ah,am] = a.split(':').map(Number)
    const [bh,bm] = b.split(':').map(Number)
    return ah*60+am-(bh*60+bm)
  })

  let html = '<div class="cal-section-hdr">HORARIO FIJO</div>'

  horasOrdenadas.forEach(hora => {
    html += `<div class="cal-hour-block">
      <div class="cal-hour-header">
        <div class="cal-hour-label">${hora}</div>
        <div class="cal-hour-line"></div>
      </div>
      <div class="cal-items-in-hour">`
    grupos[hora].forEach(item => { html += emmaCalItemHtml(item, hora) })
    html += '</div></div>'
  })

  if (flexibles.length) {
    html += '<div class="cal-section-hdr" style="margin-top:14px;">EN CUALQUIER MOMENTO</div>'
    html += '<div class="cal-flex-wrap">'
    flexibles.forEach(item => { html += emmaCalFlexItemHtml(item) })
    html += '</div>'
  }

  lista.innerHTML = html
  emmaCalActualizarKPIs(plan)
}

function emmaCalItemHtml(item, hora) {
  const reg = emmaCalGetRegistro(item.id)
  const estado = reg ? emmaCalEstado(reg.cantidad, item.tamano) : 'pendiente'
  const subText = reg
    ? (reg.solidoNombre ? reg.solidoNombre + ' · ' + reg.cantidad + (item.unidad || '') : reg.cantidad + ' ' + (item.unidad || '') + (reg.nota ? ' · ' + reg.nota : ''))
    : 'Pendiente'
  const checkClass = estado === 'completo' ? 'checked' : estado === 'parcial' ? 'parcial' : ''
  const checkIcon = estado === 'completo' ? '✓' : estado === 'parcial' ? '~' : '○'
  const itemClass = estado === 'completo' ? 'done' : estado === 'parcial' ? 'parcial' : ''
  const compareBadge = emmaCalCompareBadgeHtml(item.id, item)

  if (item.tipo === 'rutina' && item.registroTipo === 'cantidad') {
    const cnt = reg?.cantidad || 0
    return `<div class="cal-item ${itemClass}">
      <div class="cal-item-emoji">${item.emoji}</div>
      <div class="cal-item-info">
        <div class="cal-item-name">${item.nombre}</div>
        <div class="cal-item-sub">${cnt > 0 ? cnt + ' veces' : 'Pendiente'}</div>
      </div>
      ${compareBadge}
      <div class="cal-cnt-wrap" style="margin-left:4px;">
        <div class="cal-cnt-btn" onclick="emmaCalCnt(${item.id},-1)">−</div>
        <div class="cal-cnt-val" id="cal-cnt-${item.id}">${cnt}</div>
        <div class="cal-cnt-btn" onclick="emmaCalCnt(${item.id},1)">+</div>
      </div>
    </div>`
  }

  if (item.tipo === 'rutina') {
    const hecho = reg?.cantidad === 1
    return `<div class="cal-item ${hecho ? 'done' : ''}">
      <div class="cal-item-emoji">${item.emoji}</div>
      <div class="cal-item-info">
        <div class="cal-item-name">${item.nombre}</div>
        <div class="cal-item-sub">${hecho ? 'Hecho' : 'Pendiente'}</div>
      </div>
      ${compareBadge}
      <div class="cal-check-btn ${hecho ? 'checked' : ''}"
           onclick="emmaCalToggleBinario(${item.id},this)" style="margin-left:4px;">${hecho ? '✓' : '○'}</div>
    </div>`
  }

  return `<div class="cal-item ${itemClass}">
    <div class="cal-item-emoji">${item.emoji}</div>
    <div class="cal-item-info">
      <div class="cal-item-name">${item.nombre}</div>
      <div class="cal-item-sub">${subText}</div>
    </div>
    ${compareBadge}
    <div class="cal-check-btn ${checkClass}"
         onclick="emmaCalAbrirModal(${item.id},'${hora}')" style="margin-left:4px;">${checkIcon}</div>
  </div>`
}

function emmaCalFlexItemHtml(item) {
  const reg = emmaCalGetRegistro(item.id)
  const compareBadge = emmaCalCompareBadgeHtml(item.id, item)

  if (item.tipo === 'rutina' && item.registroTipo === 'cantidad') {
    const cnt = reg?.cantidad || 0
    return `<div class="cal-flex-item">
      <span class="cal-flex-badge">flex</span>
      <div class="cal-item-emoji">${item.emoji}</div>
      <div class="cal-item-info">
        <div class="cal-item-name">${item.nombre}</div>
        <div class="cal-item-sub">${cnt > 0 ? cnt + ' veces' : 'Cantidad'}</div>
      </div>
      ${compareBadge}
      <div class="cal-cnt-wrap" style="margin-left:4px;">
        <div class="cal-cnt-btn" onclick="emmaCalCnt(${item.id},-1)">−</div>
        <div class="cal-cnt-val" id="cal-cnt-${item.id}">${cnt}</div>
        <div class="cal-cnt-btn" onclick="emmaCalCnt(${item.id},1)">+</div>
      </div>
    </div>`
  }

  if (item.tipo === 'rutina') {
    const hecho = reg?.cantidad === 1
    return `<div class="cal-flex-item ${hecho ? 'done' : ''}">
      <span class="cal-flex-badge">flex</span>
      <div class="cal-item-emoji">${item.emoji}</div>
      <div class="cal-item-info">
        <div class="cal-item-name">${item.nombre}</div>
        <div class="cal-item-sub">${hecho ? 'Hecho' : 'Pendiente'}</div>
      </div>
      ${compareBadge}
      <div class="cal-check-btn ${hecho ? 'checked' : ''}"
           onclick="emmaCalToggleBinario(${item.id},this)" style="margin-left:4px;">${hecho ? '✓' : '○'}</div>
    </div>`
  }

  const estado = reg ? emmaCalEstado(reg.cantidad, item.tamano) : 'pendiente'
  const checkClass = estado === 'completo' ? 'checked' : estado === 'parcial' ? 'parcial' : ''
  const checkIcon = estado === 'completo' ? '✓' : estado === 'parcial' ? '~' : '○'
  return `<div class="cal-flex-item">
    <span class="cal-flex-badge">flex</span>
    <div class="cal-item-emoji">${item.emoji}</div>
    <div class="cal-item-info">
      <div class="cal-item-name">${item.nombre}</div>
      <div class="cal-item-sub">${reg ? reg.cantidad + ' ' + (item.unidad || '') : 'Pendiente'}</div>
    </div>
    ${compareBadge}
    <div class="cal-check-btn ${checkClass}"
         onclick="emmaCalAbrirModal(${item.id},'flex')" style="margin-left:4px;">${checkIcon}</div>
  </div>`
}

function emmaCalAbrirModal(itemId, hora) {
  const plan = emmaPlanesData?.find(p => p.activo)
  const item = plan?.items.find(i => i.id === itemId)
  if (!item) return
  emmaCalItemActual = item

  const esSolido = item.tipo === 'comida' && item.cat === 'Sólidos'
  const esLeche  = item.tipo === 'comida' && item.cat === 'Leche'
  const esSiesta = item.nombre.toLowerCase().includes('siesta')
  emmaCalQtyStep = esSiesta ? 15 : 10
  item.unidad    = esLeche ? 'cc' : esSolido ? 'gr' : esSiesta ? 'min' : 'cc'
  emmaCalQtyMax  = esSolido ? null : (item.tamano || null)

  let solidoChipsHtml = ''
  if (esSolido && typeof emmaComidasData !== 'undefined') {
    const reg = emmaCalGetRegistro(itemId)
    solidoChipsHtml = emmaComidasData
      .filter(c => c.categoria === 'Sólidos' && c.activo)
      .map(c => `<button class="cal-solido-chip${reg?.solidoId === c.id ? ' active' : ''}"
        onclick="emmaCalSelSolido(${c.id},this)"
        data-id="${c.id}" data-tamano="${c.tamano}">
        ${c.emoji} ${c.nombre} · ${c.tamano}${c.unidad}
      </button>`).join('')
  }

  const reg = emmaCalGetRegistro(itemId)
  const qtyVal = reg?.cantidad || 0
  const notaVal = reg?.nota || ''

  const ayer = emmaCalGetRegistroAyer(itemId)
  let compareHtml = '<span class="cal-compare-val same">sin registro ayer</span>'
  if (ayer?.cantidad) {
    const diff = qtyVal - ayer.cantidad
    if (diff > 0) compareHtml = `<span class="cal-compare-val up">${ayer.cantidad}${item.unidad} ayer · ↑ más</span>`
    else if (diff < 0) compareHtml = `<span class="cal-compare-val down">${ayer.cantidad}${item.unidad} ayer · ↓ menos</span>`
    else compareHtml = `<span class="cal-compare-val same">${ayer.cantidad}${item.unidad} ayer · igual</span>`
  }

  const estadoInicial = emmaCalEstadoTexto(qtyVal, emmaCalQtyMax)

  const overlay = document.getElementById('cal-modal-registro')
  if (!overlay) {
    console.error('cal-modal-registro no encontrado en el DOM')
    return
  }

  overlay.innerHTML = `
    <div class="cal-modal-sheet" onclick="event.stopPropagation()">
      <div class="cal-modal-handle"></div>
      <div class="cal-modal-header">
        <div class="cal-modal-hora">${hora === 'flex' ? 'Flexible' : hora}</div>
        <div class="cal-modal-name">${item.emoji} ${item.nombre}</div>
        <div class="cal-modal-sub">${item.tamano ? 'Plan: ' + item.tamano + ' ' + item.unidad : 'Categoría ' + item.cat}</div>
      </div>
      <div class="cal-modal-body">
        ${esSolido ? `
          <div>
            <div class="cal-solido-hdr">¿QUÉ COMIÓ?</div>
            <div class="cal-solido-chips" id="cal-solido-chips-inner">${solidoChipsHtml}</div>
          </div>
          <div class="cal-modal-divider"></div>` : ''}
        <div class="cal-qty-row">
          <button class="cal-qty-btn" onclick="emmaCalCambiarQty(-1)">−</button>
          <input class="cal-qty-input" id="cal-qty-input" type="number" min="0"
                 value="${qtyVal}" oninput="emmaCalActualizarEstado()">
          <div class="cal-qty-unit">${item.unidad}</div>
          <button class="cal-qty-btn" id="cal-qty-plus" onclick="emmaCalCambiarQty(1)"
                  ${emmaCalQtyMax !== null && qtyVal >= emmaCalQtyMax ? 'disabled' : ''}>+</button>
        </div>
        <div class="cal-auto-estado ${estadoInicial.clase}" id="cal-auto-estado">
          <span>${estadoInicial.icono}</span>
          <span id="cal-auto-estado-txt">${estadoInicial.texto}</span>
        </div>
        <div class="cal-compare-row">
          <span>vs ayer</span>
          ${compareHtml}
        </div>
        <div>
          <div class="cal-nota-lbl">NOTA (opcional)</div>
          <textarea class="cal-nota-input" id="cal-nota-input" rows="2"
                    placeholder="Opcional...">${notaVal}</textarea>
        </div>
        <button class="cal-btn-save" onclick="emmaCalGuardarRegistro()">Guardar</button>
        <button class="cal-btn-cancel" onclick="emmaCalCerrar('cal-modal-registro')">Cancelar</button>
      </div>
    </div>`

  overlay.classList.add('open')
}

function emmaCalSelSolido(solidoId, btn) {
  btn.closest('.cal-solido-chips, #cal-solido-chips-inner')
     ?.querySelectorAll('.cal-solido-chip')
     .forEach(b => b.classList.remove('active'))
  btn.classList.add('active')
  emmaCalQtyMax = parseInt(btn.dataset.tamano)
  const input = document.getElementById('cal-qty-input')
  if (input && parseInt(input.value) > emmaCalQtyMax) input.value = emmaCalQtyMax
  emmaCalActualizarEstado()
}

function emmaCalCambiarQty(delta) {
  const input = document.getElementById('cal-qty-input')
  let val = (parseInt(input.value) || 0) + (delta * emmaCalQtyStep)
  val = Math.max(0, val)
  if (emmaCalQtyMax !== null) val = Math.min(emmaCalQtyMax, val)
  input.value = val
  emmaCalActualizarEstado()
}

function emmaCalEstadoTexto(val, max) {
  if (!val || val <= 0) return { clase: 'pendiente', icono: '○', texto: 'Ingresa una cantidad para registrar' }
  if (!max) return { clase: 'completo', icono: '✓', texto: 'Registrado' }
  const pct = Math.round(val / max * 100)
  if (val >= max) return { clase: 'completo', icono: '✓', texto: 'Completo · 100% del plan' }
  return { clase: 'parcial', icono: '〜', texto: 'Parcial · ' + pct + '% del plan' }
}

function emmaCalActualizarEstado() {
  const input = document.getElementById('cal-qty-input')
  if (!input) return
  let val = parseInt(input.value) || 0
  if (emmaCalQtyMax !== null && val > emmaCalQtyMax) { val = emmaCalQtyMax; input.value = val }

  const plusBtn = document.getElementById('cal-qty-plus')
  if (plusBtn) plusBtn.disabled = emmaCalQtyMax !== null && val >= emmaCalQtyMax

  const estadoEl = document.getElementById('cal-auto-estado')
  const txtEl = document.getElementById('cal-auto-estado-txt')
  if (!estadoEl || !txtEl) return

  const r = emmaCalEstadoTexto(val, emmaCalQtyMax)
  estadoEl.className = 'cal-auto-estado ' + r.clase
  txtEl.textContent = r.texto
}

function emmaCalActualizarCompareModal(item) {
  const ayer = emmaCalGetRegistroAyer(item.id)
  const el = document.getElementById('cal-compare-val')
  if (!el) return
  if (!ayer || !ayer.cantidad) {
    el.className = 'cal-compare-val same'; el.textContent = 'sin registro ayer'; return
  }
  const hoyVal = parseInt(document.getElementById('cal-qty-input')?.value) || 0
  const diff = hoyVal - ayer.cantidad
  const u = item.unidad || ''
  if (diff > 0) { el.className = 'cal-compare-val up'; el.textContent = ayer.cantidad + u + ' ayer · ↑ más' }
  else if (diff < 0) { el.className = 'cal-compare-val down'; el.textContent = ayer.cantidad + u + ' ayer · ↓ menos' }
  else { el.className = 'cal-compare-val same'; el.textContent = ayer.cantidad + u + ' ayer · igual' }
}

function emmaCalGuardarRegistro() {
  if (!emmaCalItemActual) return
  const val          = parseInt(document.getElementById('cal-qty-input')?.value) || 0
  const nota         = document.getElementById('cal-nota-input')?.value.trim() || ''
  const solidoActivo = document.querySelector('.cal-solido-chip.active')
  const solidoNombre = solidoActivo ? solidoActivo.textContent.trim().split(' · ')[0] : ''
  const estado       = emmaCalEstado(val, emmaCalQtyMax)
  const fecha        = emmaCalFechaKey(emmaCalDiaOffset)
  const item         = emmaCalItemActual
  const horaStr      = item.flexible ? '' : item.hora + ':' + String(item.min).padStart(2, '0')

  fetch('/api/emma/registro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fecha,
      tipoRegistro: item.tipo === 'rutina' ? 'rutina'
                  : item.cat  === 'Leche'  ? 'leche'
                  : item.cat  === 'Sólidos'? 'sólido'
                  : item.cat  === 'Postre' ? 'postre'
                  : 'comida',
      hora:        horaStr,
      cantidad:    val,
      unidad:      item.unidad || '',
      estado,
      solidoNombre,
      nota,
      planItemId:  item.id,
    })
  })
  .then(r => r.json())
  .then(data => {
    if (data.ok) {
      if (!emmaCalRegistros[fecha]) emmaCalRegistros[fecha] = {}
      emmaCalRegistros[fecha][item.id] = { cantidad: val, nota, solidoNombre, estado }
      emmaCalCerrar('cal-modal-registro')
      emmaCalRender()
    } else {
      console.error('[Emma] Error guardando registro:', data.error)
    }
  })
  .catch(err => console.error('[Emma] fetch error:', err))
}

function emmaCalToggleBinario(itemId, btn) {
  const plan  = emmaPlanesData?.find(p => p.activo)
  const item  = plan?.items.find(i => i.id === itemId)
  if (!item) return
  const fecha = emmaCalFechaKey(emmaCalDiaOffset)
  const reg   = emmaCalGetRegistro(itemId)
  const nuevo = reg?.cantidad === 1 ? 0 : 1
  fetch('/api/emma/registro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fecha,
      tipoRegistro: 'rutina',
      hora: '',
      cantidad: nuevo,
      unidad: '',
      estado: nuevo === 1 ? 'completo' : 'pendiente',
      solidoNombre: '',
      nota: '',
      planItemId: itemId,
    })
  })
  .then(r => r.json())
  .then(data => {
    if (data.ok) {
      if (!emmaCalRegistros[fecha]) emmaCalRegistros[fecha] = {}
      emmaCalRegistros[fecha][itemId] = { cantidad: nuevo, estado: nuevo === 1 ? 'completo' : 'pendiente' }
      emmaCalRender()
    }
  })
  .catch(err => console.error('[Emma] fetch error:', err))
}

function emmaCalCnt(itemId, delta) {
  const plan  = emmaPlanesData?.find(p => p.activo)
  const item  = plan?.items.find(i => i.id === itemId)
  if (!item) return
  const fecha = emmaCalFechaKey(emmaCalDiaOffset)
  const reg   = emmaCalGetRegistro(itemId) || { cantidad: 0 }
  const nuevo = Math.max(0, (reg.cantidad || 0) + delta)

  const el = document.getElementById('cal-cnt-' + itemId)
  if (el) el.textContent = nuevo

  if (!emmaCalRegistros[fecha]) emmaCalRegistros[fecha] = {}
  emmaCalRegistros[fecha][itemId] = { ...reg, cantidad: nuevo, estado: nuevo > 0 ? 'completo' : 'pendiente' }

  fetch('/api/emma/registro', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fecha,
      tipoRegistro: 'rutina',
      hora: '',
      cantidad: nuevo,
      unidad: '',
      estado: nuevo > 0 ? 'completo' : 'pendiente',
      solidoNombre: '',
      nota: '',
      planItemId: itemId,
    })
  })
  .catch(err => console.error('[Emma] fetch error:', err))
}

function emmaCalActualizarKPIs(plan) {
  const todos = plan.items
  const completados = todos.filter(i => {
    const r = emmaCalGetRegistro(i.id)
    return r && r.estado !== 'pendiente' && r.cantidad > 0
  }).length
  const pctComp = todos.length ? Math.round(completados / todos.length * 100) : 0

  const lecheItems = todos.filter(i => i.cat === 'Leche')
  const lecheTotal = lecheItems.reduce((s,i) => s + (emmaCalGetRegistro(i.id)?.cantidad || 0), 0)
  const lechePlan = lecheItems.reduce((s,i) => s + (i.tamano || 0), 0)

  const solidoItems = todos.filter(i => i.cat === 'Sólidos')
  const solidoTotal = solidoItems.reduce((s,i) => s + (emmaCalGetRegistro(i.id)?.cantidad || 0), 0)
  const solidoPlan = solidoItems.reduce((s,i) => s + (i.tamano || 0), 0)

  const set = (id, v) => { const e = document.getElementById(id); if (e) e.textContent = v }
  const setW = (id, w) => { const e = document.getElementById(id); if (e) e.style.width = w + '%' }

  set('cal-kpi-comp', completados + '/' + todos.length)
  setW('cal-kpi-comp-fill', pctComp)
  set('cal-kpi-leche', lecheTotal + 'cc')
  set('cal-kpi-leche-sub', 'de ' + lechePlan + 'cc plan')
  setW('cal-kpi-leche-fill', lechePlan ? Math.min(100, Math.round(lecheTotal/lechePlan*100)) : 0)
  set('cal-kpi-solidos', solidoTotal + 'gr')
  set('cal-kpi-solidos-sub', 'de ' + solidoPlan + 'gr plan')
  setW('cal-kpi-solidos-fill', solidoPlan ? Math.min(100, Math.round(solidoTotal/solidoPlan*100)) : 0)
}

function emmaCalCerrar(id) { document.getElementById(id)?.classList.remove('open') }
function emmaCalCerrarSiOverlay(e, id) { if (e.target === document.getElementById(id)) emmaCalCerrar(id) }

window.emmaCalRender = emmaCalRender
window.emmaCalCambiarDia = emmaCalCambiarDia
