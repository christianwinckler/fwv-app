'use client'
import { useEffect } from 'react'

export default function AppClient({ user }) {

  const cssContent = `

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Geist', -apple-system, sans-serif; background: var(--bg); }

/* ── APP SHELL ─────────────────────────────────────────── */
.app { display: flex; flex-direction: column; min-height: 100vh; }

/* ── NAVBAR ────────────────────────────────────────────── */
.navbar {
  background: var(--card); border-bottom: 0.5px solid var(--border);
  padding: 0 20px; height: 56px;
  display: flex; align-items: center; justify-content: space-between;
  position: sticky; top: 0; z-index: 100;
}
.navbar-brand {
  position: absolute; left: 50%; transform: translateX(-50%);
  font-size: 16px; font-weight: 600; color: var(--fg);
  white-space: nowrap; pointer-events: none;
}
.navbar-brand .brand-prefix { color: var(--accent); }

.navbar-right { display: flex; align-items: center; gap: 8px; }

.btn-settings {
  width: 34px; height: 34px; border-radius: 50%;
  background: var(--bg); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
}

.ham-line {
  width: 20px; height: 2px; background: var(--fg); border-radius: 1px;
  transition: all 0.2s;
}
.btn-hamburger {
  width: 34px; height: 34px; border-radius: 8px;
  background: none; border: none; cursor: pointer;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 5px;
}

/* ── DRAWER (mobile) ───────────────────────────────────── */
.drawer-overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(0,0,0,0.35); z-index: 200;
}
.drawer-overlay.open { display: block; }
.drawer {
  position: fixed; top: 0; left: -280px; bottom: 0;
  width: 260px; background: var(--card); z-index: 201;
  transition: left 0.25s ease; padding: 0;
  display: flex; flex-direction: column;
}
.drawer.open { left: 0; }
.drawer-header {
  padding: 20px 20px 16px;
  border-bottom: 0.5px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
}
.drawer-brand { font-size: 16px; font-weight: 600; color: var(--fg); }
.drawer-close {
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--bg); border: none; cursor: pointer;
  font-size: 14px; color: var(--muted);
}
.drawer-links { padding: 12px 0; flex: 1; }
.drawer-link {
  display: flex; align-items: center; gap: 12px;
  padding: 13px 20px; font-size: 15px; color: var(--fg);
  cursor: pointer; border: none; background: none;
  font-family: inherit; width: 100%; text-align: left;
  transition: background 0.1s;
}
.drawer-link:hover { background: var(--bg); }
.drawer-link.active { background: color-mix(in srgb, var(--accent) 12%, var(--card)); color: var(--accent); font-weight: 500; }
.drawer-divider { height: 0.5px; background: var(--border); margin: 8px 0; }
.drawer-section-label { font-size: 10px; font-weight: 500; color: var(--muted); letter-spacing: 0.06em; padding: 10px 20px 4px; }
.drawer-item-indent { padding-left: 40px; }

/* ── CONTENT ───────────────────────────────────────────── */
.content {
  flex: 1;
  width: 100%;
  padding: 0 0 80px;
}

/* ── FAB (mobile) ──────────────────────────────────────── */
.fab {
  position: fixed; bottom: 24px; right: 20px;
  width: 52px; height: 52px; border-radius: 50%;
  background: var(--accent); border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 26px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.25); z-index: 50;
}

/* ── SCREENS ───────────────────────────────────────────── */
.screen { display: none; }
.screen.active { display: block; }

/* ── MES NAV ───────────────────────────────────────────── */
.mes-nav {
  background: var(--card); padding: 10px 16px;
  display: flex; align-items: center; justify-content: space-between;
  border-bottom: 0.5px solid var(--border);
  position: sticky; top: 56px; z-index: 90;
}
.mes-arrow {
  width: 32px; height: 32px; border: 0.5px solid var(--border);
  border-radius: 8px; background: var(--bg); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; color: var(--muted);
}
.mes-arrow:focus,.mes-arrow:focus-visible,.mes-arrow:active,.mes-arrow:focus-within {
  outline: none !important; box-shadow: none !important;
  border-color: var(--border) !important; background: var(--bg) !important;
}
.mes-label { font-size: 15px; font-weight: 500; color: var(--fg); }

/* ── RESUMEN GRID ──────────────────────────────────────── */
.resumen-grid {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 10px; padding: 14px 16px;
  background: var(--card); border-bottom: 0.5px solid var(--border);
}
.resumen-card {
  background: var(--bg); border-radius: 10px; padding: 12px;
  display: flex; flex-direction: column; gap: 4px;
}
.resumen-label { font-size: 10px; color: var(--muted); font-weight: 500; letter-spacing: 0.04em; }
.resumen-valor { font-size: 15px; font-weight: 500; color: var(--fg); }
.resumen-valor.ing { font-size: 14px; color: #2e7d32; }
.resumen-valor.egr { font-size: 14px; color: #c62828; }
.resumen-valor.bal-pos { color: #2e7d32; }
.resumen-valor.bal-neg { color: #c62828; }
.resumen-sub { font-size: 11px; }
.resumen-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:8px; padding:0 12px 12px; background:var(--bg); }
.res-card-accent { background:var(--card); border-radius:10px; padding:10px 12px; border-left:3px solid transparent; }

/* ── CAT LIST ──────────────────────────────────────────── */
.section-header {
  padding: 14px 16px 8px;
  font-size: 11px; font-weight: 500; color: var(--muted); letter-spacing: 0.06em;
}
.cat-list { display: flex; flex-direction: column; padding: 0 12px 16px; }
.cat-card {
  background: var(--card); border-radius: 10px; padding: 12px;
  border: 0.5px solid var(--border); margin-bottom: 6px; cursor: pointer;
  transition: box-shadow 0.1s;
}
.cat-card:hover { box-shadow: 0 1px 6px rgba(0,0,0,0.07); }
.cat-card-row { display: flex; align-items: center; gap: 10px; }
.cat-icon {
  width: 36px; height: 36px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 600; flex-shrink: 0;
}
.cat-info { flex: 1; min-width: 0; }
.cat-nombre { font-size: 14px; font-weight: 500; color: var(--fg); }
.cat-ppto-txt { font-size: 11px; color: var(--sub); margin-top: 1px; }
.cat-monto { font-size: 14px; font-weight: 500; flex-shrink: 0; }
.cat-monto.ok { color: #c62828; }
.cat-monto.warning { color: #e65100; }
.cat-monto.over { color: #b71c1c; font-weight: 700; }
.bar-wrap { margin-top: 7px; height: 5px; background: var(--inner-card); border-radius: 3px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 3px; }
.bar-fill.ok { background: var(--accent); }
.bar-fill.warning { background: #e65100; }
.bar-fill.over { background: #b71c1c; }
.ppto-row { display: flex; justify-content: space-between; align-items: center; margin-top: 5px; }
.ppto-pct { font-size: 11px; font-weight: 500; }
.ppto-pct.ok { color: var(--accent); }
.ppto-pct.warning { color: #e65100; }
.ppto-pct.over { color: #b71c1c; }
.ppto-label { font-size: 11px; color: var(--sub); }

/* ── DETALLE ───────────────────────────────────────────── */
.rango-btn {
  background: var(--card); padding: 10px 16px;
  border-bottom: 0.5px solid var(--border);
  display: flex; align-items: center; justify-content: space-between;
  cursor: pointer; position: sticky; top: 56px; z-index: 90;
}
.rango-label { font-size: 15px; font-weight: 500; color: var(--fg); }
.search-wrap {
  background: var(--card); padding: 10px 12px;
  border-bottom: 0.5px solid var(--border); position: relative;
  position: sticky; top: calc(56px + 45px); z-index: 89;
}
.search-icon {
  position: absolute; left: 22px; top: 50%; transform: translateY(-50%);
  font-size: 14px; color: var(--sub); pointer-events: none;
}
.search-input {
  width: 100%; padding: 8px 12px 8px 34px;
  border: 0.5px solid var(--border); border-radius: 8px;
  font-size: 14px; background: var(--bg); color: var(--fg); font-family: inherit;
}
.search-input:focus { outline: none; border-color: var(--sub); background: var(--card); }
.resumen-strip {
  background: var(--card); padding: 10px 16px;
  display: flex; gap: 16px; align-items: center;
  border-bottom: 0.5px solid var(--border);
}
.strip-item { display: flex; flex-direction: column; gap: 2px; }
.strip-label { font-size: 10px; color: var(--sub); font-weight: 500; letter-spacing: 0.04em; }
.strip-valor { font-size: 13px; font-weight: 500; }
.strip-valor.e { color: #c62828; }
.strip-valor.i { color: #2e7d32; }
.strip-sep { width: 0.5px; background: var(--border); height: 28px; }
.lista { padding: 8px 12px 24px; }
.dia-grupo { margin-bottom: 4px; }
.dia-label {
  font-size: 11px; font-weight: 500; color: var(--muted);
  letter-spacing: 0.04em; padding: 10px 4px 6px;
}
.dia-total { float: right; font-size: 11px; color: var(--sub); font-weight: 400; }
.gasto-item {
  background: var(--card); border-radius: 10px; padding: 11px 12px;
  display: flex; align-items: center; gap: 10px;
  border: 0.5px solid var(--border); margin-bottom: 5px; cursor: pointer;
  transition: box-shadow 0.1s;
}
.gasto-item:hover { box-shadow: 0 1px 6px rgba(0,0,0,0.07); }
.gasto-info { flex: 1; min-width: 0; }
.gasto-desc { font-size: 14px; color: var(--fg); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.gasto-meta { font-size: 11px; color: var(--sub); margin-top: 2px; display: flex; gap: 6px; align-items: center; }
.gasto-banco { padding: 1px 6px; border-radius: 4px; font-size: 10px; font-weight: 500; }
.gasto-banco.santander { background: #fce4ec; color: #c62828; }
.gasto-banco.falabella { background: #e8f5e9; color: #2e7d32; }
.gasto-banco.tc { background: var(--card)8e1; color: #f57f17; }
.gasto-dev { background: var(--card)3e0; padding: 1px 6px; border-radius: 4px; font-size: 10px; color: #e65100; }
.gasto-monto { font-size: 14px; font-weight: 500; flex-shrink: 0; }
.gasto-monto.e { color: #c62828; }
.gasto-monto.i { color: #2e7d32; }
.empty { padding: 40px 16px; text-align: center; font-size: 13px; color: var(--sub); }

/* ── PRESUPUESTO ───────────────────────────────────────── */
.ppto-total-bar {
  background: var(--card); padding: 14px 16px;
  border-bottom: 0.5px solid var(--border);
}
.ppto-total-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
.ppto-total-label { font-size: 12px; color: var(--muted); font-weight: 500; }
.ppto-total-monto { font-size: 20px; font-weight: 500; color: var(--fg); }
.ppto-total-sub { font-size: 12px; color: var(--sub); }
.ppto-global-bar { height: 6px; background: var(--inner-card); border-radius: 3px; overflow: hidden; margin-top: 6px; }
.ppto-global-fill { height: 100%; border-radius: 3px; background: var(--accent); }
.ppto-total-card {
  margin: 10px 12px 8px;
  background: var(--card); border: 1px solid var(--border-soft);
  border-radius: 14px; padding: 14px;
  display: flex; flex-wrap: wrap; gap: 8px; align-items: flex-start;
}
.ppto-total-card-left { flex: 1; min-width: 120px; }
.ppto-total-card-right { flex: 1; min-width: 120px; text-align: right; }
.ppto-total-card-label {
  font-size: 9px; font-weight: 500; color: var(--sub);
  letter-spacing: 0.05em; text-transform: uppercase; margin-bottom: 4px;
}
.ppto-total-card-monto { font-size: 22px; font-weight: 600; letter-spacing: -0.01em; color: var(--fg); }
.ppto-total-card-sub { font-size: 13px; font-weight: 500; color: var(--fg); }
.ppto-total-card-libre { font-size: 11px; color: var(--sub); margin-top: 2px; }
.ppto-cat-group { margin: 0 12px 8px; }
.ppto-cat-header {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 4px 6px; cursor: pointer;
}
.ppto-cat-icon {
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 600; flex-shrink: 0;
}
.ppto-cat-nombre { font-size: 13px; font-weight: 500; color: var(--fg); flex: 1; }
.ppto-cat-total { font-size: 12px; color: var(--muted); }
.ppto-cat-chevron { font-size: 11px; color: var(--sub); transition: transform 0.2s; }
.ppto-cat-chevron.open { transform: rotate(180deg); }
.ppto-subcat-list { display: none; }
.ppto-subcat-list.open { display: block; }
.ppto-subcat-item {
  background: var(--card); border-radius: 10px; padding: 11px 12px;
  display: flex; align-items: center; gap: 10px;
  border: 0.5px solid var(--border); margin-bottom: 5px;
}
.ppto-subcat-info { flex: 1; min-width: 0; }
.ppto-subcat-nombre { font-size: 13px; color: var(--fg); }
.ppto-tipo-badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 500; flex-shrink: 0; cursor: pointer; }
.ppto-tipo-badge.fijo { background: color-mix(in srgb, var(--accent) 12%, var(--card)); color: var(--accent); }
.ppto-tipo-badge.variable { background: var(--card)8e1; color: #f57f17; }
.ppto-monto-wrap { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
.ppto-monto-input {
  width: 90px; padding: 5px 8px; border: 0.5px solid var(--border);
  border-radius: 6px; font-size: 13px; font-weight: 500;
  color: var(--fg); text-align: right; font-family: inherit; background: var(--inner-card);
}
.ppto-monto-input:focus { outline: none; border-color: var(--accent); background: var(--card); }
.ppto-monto-prefix { font-size: 12px; color: var(--sub); }

/* ── ADMIN ─────────────────────────────────────────────── */
.admin-section { padding: 12px; }
.admin-section-title { font-size: 11px; font-weight: 500; color: var(--muted); letter-spacing: 0.04em; padding: 8px 4px 10px; }
.admin-cat-card { background: var(--card); border-radius: 10px; border: 0.5px solid var(--border); margin-bottom: 6px; overflow: hidden; }
.admin-cat-header { display: flex; align-items: center; gap: 10px; padding: 12px; cursor: pointer; }
.admin-cat-nombre { font-size: 14px; font-weight: 500; color: var(--fg); flex: 1; }
.admin-cat-count { font-size: 11px; color: var(--sub); }
.admin-cat-chevron { font-size: 11px; color: var(--sub); transition: transform 0.2s; }
.admin-cat-chevron.open { transform: rotate(180deg); }
.admin-subcat-list { display: none; border-top: 0.5px solid var(--border); }
.admin-subcat-list.open { display: block; }
.admin-subcat-item { display: flex; align-items: center; padding: 10px 12px 10px 48px; border-bottom: 0.5px solid var(--border); gap: 8px; }
.admin-subcat-item:last-child { border-bottom: none; }
.admin-subcat-nombre { font-size: 13px; color: var(--fg); flex: 1; }
.admin-ie-badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 500; }
.admin-ie-E { background: #fce4ec; color: #c62828; }
.admin-ie-I { background: #e8f5e9; color: #2e7d32; }
.admin-edit-btn { font-size: 13px; color: var(--sub); background: none; border: none; cursor: pointer; padding: 2px 4px; }
.admin-del-btn { font-size: 13px; color: #e8a0a0; background: none; border: none; cursor: pointer; padding: 2px 4px; }
.admin-add-row { display: flex; gap: 8px; padding: 10px 12px; border-top: 0.5px solid var(--border); }
.admin-add-input { flex: 1; padding: 7px 10px; border: 0.5px solid var(--border); border-radius: 8px; font-size: 13px; color: var(--fg); font-family: inherit; background: var(--inner-card); }
.admin-add-input:focus { outline: none; border-color: var(--accent); background: var(--card); }
.admin-add-btn { padding: 7px 14px; background: var(--accent); color: #fff; border: none; border-radius: 8px; font-size: 13px; cursor: pointer; font-family: inherit; }
.add-cat-row { display: flex; gap: 8px; padding: 4px 0 12px; }
/* ── ADMIN MODALS ────────────────────────────────────────── */
.admin-toggle-group { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
.admin-toggle-opt { padding: 10px 6px; border: 0.5px solid var(--border); border-radius: 10px; text-align: center; cursor: pointer; font-size: 12px; color: var(--muted); background: var(--inner-card); display: flex; flex-direction: column; gap: 4px; align-items: center; user-select: none; }
.admin-toggle-opt .t-icon { font-size: 18px; }
.admin-toggle-opt.active-tc { border-color: #f57f17; background: var(--card)8e1; color: #f57f17; font-weight: 500; }
.admin-toggle-opt.active-transf { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, var(--card)); color: var(--accent); font-weight: 500; }
.admin-toggle-opt.active-vacio { border-color: var(--sub); background: var(--chip-bg); color: var(--muted); font-weight: 500; }
.admin-ie-group { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.admin-ie-opt { padding: 11px; border: 0.5px solid var(--border); border-radius: 10px; text-align: center; cursor: pointer; font-size: 14px; color: var(--muted); background: var(--inner-card); font-weight: 500; user-select: none; }
.admin-ie-opt.active-e { border-color: #c62828; background: #fce4ec; color: #c62828; }
.admin-ie-opt.active-i { border-color: #2e7d32; background: #e8f5e9; color: #2e7d32; }
.admin-ie-opt.active-activo { border-color: #2e7d32; background: #e8f5e9; color: #2e7d32; }
.admin-ie-opt.active-oculto { border-color: var(--sub); background: var(--chip-bg); color: var(--muted); }
.admin-ie-opt.active-mensual { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, var(--card)); color: var(--accent); }
.admin-ie-opt.active-variable { border-color: #e65100; background: var(--card)3e0; color: #e65100; }
.admin-chip { padding: 5px 12px; border-radius: 14px; font-size: 12px; border: 0.5px solid var(--border); background: var(--card); color: var(--muted); cursor: pointer; font-family: inherit; }
.admin-chip.active { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, var(--card)); color: var(--accent); font-weight: 500; }
.admin-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
.admin-field label { font-size: 11px; color: var(--muted); font-weight: 500; letter-spacing: 0.04em; }
.admin-field input { padding: 11px 12px; border: 0.5px solid var(--border); border-radius: 10px; font-size: 15px; color: var(--fg); font-family: inherit; background: var(--inner-card); outline: none; }
.admin-field input:focus { border-color: var(--accent); background: var(--card); }
.btn-admin-guardar { width: 100%; padding: 14px; background: var(--accent); color: #fff; border: none; border-radius: 12px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: inherit; margin-top: 4px; }
.btn-admin-eliminar { width: 100%; padding: 13px; background: #fce4ec; color: #c62828; border: none; border-radius: 12px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: inherit; margin-top: 6px; }
/* ── ADMIN ELIMINAR SHEET ────────────────────────────────── */
.admin-del-warning { background: var(--card)8e1; border: 0.5px solid var(--border); border-radius: 10px; padding: 12px 14px; margin-bottom: 14px; }
.admin-del-warning-title { font-size: 13px; font-weight: 500; color: #f57f17; margin-bottom: 4px; }
.admin-del-warning-sub { font-size: 12px; color: var(--muted); line-height: 1.5; }
.admin-del-count { font-size: 22px; font-weight: 500; color: var(--fg); margin: 2px 0; }
.admin-del-select { width: 100%; padding: 11px 12px; border: 0.5px solid var(--border); border-radius: 10px; font-size: 14px; color: var(--fg); font-family: inherit; background: var(--inner-card); outline: none; margin-top: 4px; }
.admin-del-select:focus { border-color: var(--accent); background: var(--card); }
.btn-admin-confirmar-del { width: 100%; padding: 14px; background: #c62828; color: #fff; border: none; border-radius: 12px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: inherit; margin-top: 4px; }
.btn-admin-cancelar { width: 100%; padding: 13px; background: var(--bg); color: var(--muted); border: none; border-radius: 12px; font-size: 14px; cursor: pointer; font-family: inherit; margin-top: 6px; }

/* ── OVERLAYS ───────────────────────────────────────────── */
.overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(0,0,0,0.35); z-index: 150; align-items: flex-end;
  overflow: hidden;
}
.overlay.open { display: flex; }
.sheet {
  background: var(--card); width: 100%; border-radius: 16px 16px 0 0;
  padding: 16px 16px 32px; max-height: 88vh; overflow-y: auto;
  max-width: 600px; margin: 0 auto;
  overflow-x: hidden; touch-action: pan-y;
}
.sheet-handle { width: 36px; height: 4px; background: var(--border); border-radius: 2px; margin: 0 auto 16px; }
.sheet-title { font-size: 15px; font-weight: 500; color: var(--fg); margin-bottom: 16px; }

/* ALCANCE MODAL */
.alcance-overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(0,0,0,0.4); z-index: 200;
  align-items: center; justify-content: center; padding: 24px;
}
.alcance-overlay.open { display: flex; }
.alcance-card { background: var(--card); border-radius: 14px; padding: 20px; width: 100%; max-width: 340px; }
.alcance-titulo { font-size: 15px; font-weight: 500; color: var(--fg); margin-bottom: 6px; }
.alcance-sub { font-size: 13px; color: var(--muted); margin-bottom: 18px; line-height: 1.5; }
.alcance-opciones { display: flex; flex-direction: column; gap: 8px; }
.alcance-btn { width: 100%; padding: 12px; border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; font-family: inherit; text-align: left; display: flex; align-items: center; gap: 10px; }
.alcance-btn.solo-mes { background: color-mix(in srgb, var(--accent) 12%, var(--card)); color: var(--accent); }
.alcance-btn.todos { background: var(--accent); color: #fff; }
.alcance-btn.cancelar-alcance { background: var(--bg); color: var(--muted); }
.alcance-icon { font-size: 18px; }
.alcance-txt { display: flex; flex-direction: column; gap: 1px; }
.alcance-txt-main { font-size: 14px; font-weight: 500; }
.alcance-txt-sub { font-size: 11px; opacity: 0.75; font-weight: 400; }

/* Picker */
.picker-row { display: flex; gap: 12px; margin-bottom: 16px; }
.picker-col { flex: 1; display: flex; flex-direction: column; gap: 5px; }
.picker-col label { font-size: 11px; color: var(--muted); font-weight: 500; letter-spacing: 0.04em; }
.picker-col select { padding: 9px 10px; border: 0.5px solid var(--border); border-radius: 8px; font-size: 14px; background: var(--bg); color: var(--fg); font-family: inherit; }
.picker-actions { display: flex; gap: 8px; }
.btn-preset-rango { padding: 5px 12px; border-radius: 8px; font-size: 12px; font-weight: 500; border: 0.5px solid var(--accent); background: color-mix(in srgb, var(--accent) 12%, var(--card)); color: var(--accent); cursor: pointer; font-family: inherit; transition: background 0.1s; }
.btn-preset-rango:hover { background: color-mix(in srgb, var(--accent) 18%, var(--card)); }
.btn-apply { flex: 1; padding: 12px; background: var(--accent); color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: inherit; }
.btn-cancel-sm { padding: 12px 20px; background: var(--bg); color: var(--muted); border: none; border-radius: 10px; font-size: 15px; cursor: pointer; font-family: inherit; }

/* Modal gasto */
.modal-desc { font-size: 13px; color: var(--muted); margin-bottom: 8px; padding: 0 4px; }
.modal-monto { font-size: 22px; font-weight: 500; color: var(--fg); margin-bottom: 20px; padding: 0 4px; }
.modal-actions { display: flex; flex-direction: column; gap: 8px; }
.btn-editar { width: 100%; padding: 13px; background: var(--accent); color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: inherit; }
.btn-eliminar { width: 100%; padding: 13px; background: #fce4ec; color: #c62828; border: none; border-radius: 10px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: inherit; }
.btn-cancelar { width: 100%; padding: 13px; background: var(--bg); color: var(--muted); border: none; border-radius: 10px; font-size: 15px; cursor: pointer; font-family: inherit; }

/* Formulario */
.form-body { padding: 4px 0 8px; display: flex; flex-direction: column; gap: 14px; }
.field { display: flex; flex-direction: column; gap: 5px; }
.field label { font-size: 12px; color: var(--muted); font-weight: 500; letter-spacing: 0.02em; }
.field input, .field select, .field textarea { width: 100%; padding: 10px 12px; border: 0.5px solid var(--border); border-radius: 8px; font-size: 15px; background: var(--card); color: var(--fg); font-family: inherit; }
.field textarea { resize: none; height: 72px; line-height: 1.5; }
.field input:focus, .field textarea:focus { outline: none; border-color: var(--sub); }
.banco-group { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.banco-btn { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 10px 6px; border: 0.5px solid var(--border); border-radius: 8px; background: var(--card); cursor: pointer; font-family: inherit; }
.banco-btn.active { border: 1.5px solid var(--accent); background: color-mix(in srgb, var(--accent) 12%, var(--card)); }
.banco-icon { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; }
.banco-icon.s { background: #fce4ec; color: #c62828; }
.banco-icon.f { background: #e8f5e9; color: #2e7d32; }
.banco-icon.t { background: var(--card)8e1; color: #f57f17; }
.banco-label { font-size: 12px; color: var(--muted); text-align: center; }
.banco-btn.active .banco-label { color: var(--accent); font-weight: 500; }
.dev-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: 0.5px solid var(--border); border-radius: 8px; cursor: pointer; background: var(--card); }
.dev-row.active { border-color: #e65100; background: var(--card)3e0; }
.toggle-box { width: 18px; height: 18px; border: 1.5px solid var(--border); border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.dev-row.active .toggle-box { border-color: #e65100; }
.toggle-check { font-size: 11px; color: #e65100; display: none; }
.dev-row.active .toggle-check { display: block; }
.dev-label { font-size: 14px; color: var(--fg); }
.dev-hint { font-size: 12px; color: var(--sub); margin-left: auto; }
.dev-row.active .dev-hint { color: #e65100; }
.monto-wrap { position: relative; }
.monto-prefix { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 15px; color: var(--sub); pointer-events: none; }
.monto-wrap input { padding-left: 28px; }
.btn-guardar { width: 100%; padding: 13px; background: var(--accent); color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: inherit; margin-top: 4px; }
.btn-guardar-sec { width: 100%; padding: 12px; background: var(--bg); color: var(--muted); border: none; border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: inherit; margin-top: 8px; }
.intl-banner { background: color-mix(in srgb, var(--accent) 6%, var(--card)); border: 0.5px solid var(--border); border-radius: 10px; padding: 11px 13px; display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: var(--fg); line-height: 1.45; margin-top: 8px; }
.intl-banner-icon { font-size: 16px; flex-shrink: 0; margin-top: -1px; }
.intl-progress-label { display: flex; justify-content: space-between; font-size: 12px; color: var(--muted); margin-bottom: 5px; }
.intl-progress-track { height: 5px; background: var(--inner-card); border-radius: 3px; overflow: hidden; }
.intl-progress-fill { height: 100%; border-radius: 3px; transition: width 0.2s, background 0.2s; }
.intl-item-row { background: var(--inner-card); border: 0.5px solid var(--border); border-radius: 10px; padding: 12px; margin-bottom: 8px; display: flex; flex-direction: column; gap: 8px; }
.intl-item-top { display: flex; gap: 8px; align-items: center; }
.intl-item-clp { font-size: 12px; color: var(--muted); text-align: right; }
.intl-item-clp strong { font-size: 14px; color: var(--fg); font-weight: 600; }
.intl-item-input { flex: 1; padding: 8px 10px; border: 0.5px solid var(--border); border-radius: 8px; font-size: 13px; font-family: inherit; background: var(--card); }
.intl-item-usd-wrap { display: flex; align-items: center; gap: 6px; }
.intl-item-usd-prefix { font-size: 13px; color: var(--muted); }
.intl-item-usd { width: 90px; padding: 8px 10px; border: 0.5px solid var(--border); border-radius: 8px; font-size: 13px; font-family: inherit; background: var(--card); text-align: right; }
.intl-item-del { width: 28px; height: 28px; border-radius: 50%; background: #fce4ec; border: none; cursor: pointer; color: #c62828; font-size: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.intl-subcat-sel { width: 100%; padding: 8px 10px; border: 0.5px solid var(--border); border-radius: 8px; font-size: 13px; font-family: inherit; background: var(--card); color: var(--fg); }
.intl-add-btn { width: 100%; padding: 11px; background: color-mix(in srgb, var(--accent) 6%, var(--card)); color: var(--accent); border: 0.5px solid var(--border); border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: inherit; margin-bottom: 12px; }
.intl-tipo-cambio { font-size: 12px; color: var(--muted); margin-bottom: 12px; text-align: right; }
.intl-tipo-cambio strong { color: var(--accent); }
.intl-confirm-item { display: flex; justify-content: space-between; align-items: flex-start; padding: 10px 0; border-bottom: 0.5px solid var(--border); }
.intl-confirm-item:last-child { border-bottom: none; }
.intl-confirm-desc { font-size: 13px; color: var(--fg); font-weight: 500; }
.intl-confirm-sub { font-size: 11px; color: var(--muted); margin-top: 2px; }
.intl-confirm-amts { text-align: right; flex-shrink: 0; }
.intl-confirm-clp { font-size: 14px; color: var(--fg); font-weight: 600; }
.intl-confirm-usd { font-size: 11px; color: var(--muted); margin-top: 2px; }
.subcat-wrap { position: relative; }
.subcat-row { display: flex; gap: 6px; }
.subcat-row input { flex: 1; padding: 10px 12px; border: 0.5px solid var(--border); border-radius: 8px; font-size: 15px; background: var(--card); color: var(--fg); font-family: inherit; }
.subcat-row input:focus { outline: none; border-color: var(--sub); }
.btn-lista { padding: 0 12px; border: 0.5px solid var(--border); border-radius: 8px; background: var(--bg); cursor: pointer; font-size: 16px; color: var(--muted); display: flex; align-items: center; }
.btn-lista.active { background: color-mix(in srgb, var(--accent) 12%, var(--card)); border-color: var(--accent); color: var(--accent); }
.suggestions { position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: var(--card); border: 0.5px solid var(--border); border-radius: 8px; z-index: 10; max-height: 200px; overflow-y: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.sug-group { padding: 6px 12px 3px; font-size: 11px; font-weight: 500; color: var(--sub); letter-spacing: 0.04em; background: var(--inner-card); border-bottom: 0.5px solid var(--border); position: sticky; top: 0; }
.sug-item { padding: 9px 12px; font-size: 14px; cursor: pointer; color: var(--fg); border-bottom: 0.5px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
.sug-item:last-child { border-bottom: none; }
.sug-item:hover { background: var(--bg); }
.cat-badge-row { display: flex; align-items: center; gap: 6px; margin-top: 4px; }
.cat-badge { display: inline-block; padding: 3px 8px; border-radius: 6px; font-size: 11px; background: color-mix(in srgb, var(--accent) 12%, var(--card)); color: var(--accent); font-weight: 500; }
.ie-badge { font-size: 11px; padding: 2px 6px; border-radius: 6px; font-weight: 500; }
.ie-E { background: #fce4ec; color: #c62828; }
.ie-I { background: #e8f5e9; color: #2e7d32; }

/* Ajustes menu */
.ajustes-menu { background: var(--card); border-radius: 10px; border: 0.5px solid var(--border); overflow: hidden; margin-bottom: 16px; }
.ajustes-item { display: flex; align-items: center; gap: 12px; padding: 14px 16px; cursor: pointer; border-bottom: 0.5px solid var(--border); }
.ajustes-item:last-child { border-bottom: none; }
.ajustes-item:hover { background: var(--inner-card); }
.ajustes-icon { font-size: 20px; width: 32px; text-align: center; }
.ajustes-label { font-size: 15px; color: var(--fg); flex: 1; }
.ajustes-arrow { font-size: 13px; color: var(--sub); }

/* Toast */
/* ── SKELETON ───────────────────────────────────────────── */
@keyframes shimmer {
  0%{background-position:-400px 0}
  100%{background-position:400px 0}
}
.skeleton {
  background: linear-gradient(90deg, var(--inner-card) 25%, var(--bg) 50%, var(--inner-card) 75%);
  background-size: 400px 100%;
  animation: shimmer 1.4s ease infinite;
  border-radius: 6px;
  display: inline-block;
}
.skeleton-text { height: 14px; width: 80%; }
.skeleton-valor { height: 24px; width: 60%; margin-top: 4px; }
.skeleton-sub { height: 11px; width: 50%; margin-top: 4px; }
.navbar-disabled { pointer-events: none; opacity: 0.5; }

.toast {
  position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%);
  background: var(--accent); color: #fff; padding: 8px 20px; border-radius: 20px;
  font-size: 13px; white-space: nowrap; z-index: 300;
  opacity: 0; transition: opacity 0.2s; pointer-events: none;
}
.toast.show { opacity: 1; }

/* ── DESKTOP RESPONSIVE ────────────────────────────────── */
@media (min-width: 768px) {
  .fab { display: none; }
  .content { padding: 0 24px 40px; }
  .resumen-grid-2 { border-radius: 10px; margin: 0; padding: 8px 0 0; background: transparent; gap: 12px; }
  .resumen-grid-2:first-of-type { margin-top: 12px; }
  .cat-list { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; padding: 0 0 16px; }
  .cat-list .cat-card { margin-bottom: 0; }
  .lista { padding: 8px 0 24px; }
  .mes-nav { border-radius: 10px; margin: 12px 0 0; border: 0.5px solid var(--border); }
  .rango-btn { border-radius: 10px; margin: 12px 0 0; border: 0.5px solid var(--border); }
  .search-wrap { border-radius: 10px; margin: 8px 0 0; border: 0.5px solid var(--border); position: relative; top: 0; }
  .resumen-strip { border-radius: 10px; margin: 8px 0 0; border: 0.5px solid var(--border); }
  .resumen-grid { border-radius: 10px; margin: 12px 0 0; border: 0.5px solid var(--border); }
  .ppto-total-bar { border-radius: 10px; margin: 12px 0 0; border: 0.5px solid var(--border); }
  .section-header { padding-left: 0; }
  .ppto-cat-group { margin: 0 0 8px; }
}

@media (min-width: 1100px) {
  .cat-list { grid-template-columns: repeat(3, 1fr); }
}

/* Prevenir zoom en Safari iOS al enfocar inputs (requiere font-size >= 16px) */
@media (max-width: 768px) {
  input, select, textarea { font-size: 16px !important; }
}

@keyframes spin { to { transform: rotate(360deg); } }

.section-label { padding:16px 16px 8px; font-size:11px; font-weight:500; color:var(--muted); letter-spacing:0.06em; }
.kpi-label { font-size:10px; color:var(--muted); font-weight:500; letter-spacing:0.04em; }
.kpi-valor { font-size:17px; font-weight:600; color:var(--fg); margin-top:2px; }
.kpi-sub { font-size:11px; color:var(--sub); margin-top:2px; }
.home-chart-container { background:var(--card); border-radius:12px; margin:0 12px; border:0.5px solid var(--border); padding:14px 12px 10px; position:relative; }
.home-chart-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
.home-chart-titulo { font-size:13px; font-weight:500; color:var(--fg); }
.home-filtro-btn { display:flex; align-items:center; gap:5px; font-size:11px; color:var(--accent); background:color-mix(in srgb, var(--accent) 12%, var(--card)); border:none; border-radius:6px; padding:5px 10px; cursor:pointer; font-family:inherit; font-weight:500; transition:all 0.15s; }
.home-filtro-panel { background:var(--inner-card); border-radius:12px; margin:0 12px 8px; border:0.5px solid var(--border); overflow:hidden; max-height:0; transition:max-height 0.3s ease; }
.home-filtro-panel.open { max-height:500px; }
.home-filtro-inner { padding:14px 12px 12px; }
.home-filtro-panel-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
.home-filtro-panel-titulo { font-size:13px; font-weight:500; color:var(--fg); }
.home-filtro-close { width:26px; height:26px; border-radius:50%; background: var(--inner-card); border:none; cursor:pointer; font-size:13px; color:var(--muted); display:flex; align-items:center; justify-content:center; }
.home-chip { padding:5px 11px; border-radius:14px; font-size:12px; border:0.5px solid var(--border); background:var(--card); color:var(--muted); cursor:pointer; font-family:inherit; transition:all 0.15s; }
.home-chip.active { border-color:var(--accent); background:color-mix(in srgb, var(--accent) 12%, var(--card)); color:var(--accent); font-weight:500; }
.home-chip.subcat { font-size:11px; padding:4px 9px; border-radius:10px; }
.home-chip.subcat.active { border-color:#00695c; background:#e0f7fa; color:#00695c; }
.home-chart-legend { display:flex; gap:14px; margin-top:8px; flex-wrap:wrap; }
.home-legend-item { display:flex; align-items:center; gap:5px; font-size:10px; color:var(--muted); }
.home-legend-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }

/* ── HOME REDESIGN ──────────────────────────────────────── */
.shell { display:grid; grid-template-columns:72px 1fr; min-height:100svh; overflow-x:hidden; }
.sidebar { background:var(--card); border-right:1px solid var(--border-soft); display:flex; flex-direction:column; align-items:center; padding:22px 0; gap:4px; position:sticky; top:0; height:100svh; width:72px; overflow:hidden; transition:width 0.25s cubic-bezier(.4,0,.2,1); }
.side-label { opacity:0; max-width:0; overflow:hidden; white-space:nowrap; font-size:12.5px; font-weight:500; color:var(--fg); transition:opacity 0.15s, max-width 0.25s cubic-bezier(.4,0,.2,1); pointer-events:none; flex-shrink:0; }
.sidebar.expanded { align-items:stretch; padding:22px 12px; width:220px; }
.sidebar.expanded .side-icon { width:100%; justify-content:flex-start; padding:0 12px; gap:11px; }
.sidebar.expanded .side-logo { margin-left:4px; }
.sidebar.expanded .side-label { opacity:1; max-width:160px; }
.sidebar.expanded .side-expand-btn { width:100%; justify-content:flex-start; padding:0 12px; gap:11px; }
.sidebar.expanded .side-expand-btn .side-expand-icon { transform:rotate(180deg); }
.side-section-hdr { display:none; font-size:10px; font-weight:600; color:var(--sub); letter-spacing:0.1em; text-transform:uppercase; padding:14px 12px 4px; white-space:nowrap; overflow:hidden; }
.sidebar.expanded .side-section-hdr { display:block; }
@media (max-width:920px) { .sidebar .side-section-hdr { display:block; } }
.side-divider { width:32px; height:1px; background:var(--border-soft); margin:6px auto; flex-shrink:0; }
.sidebar.expanded .side-divider { width:100%; margin:4px 0; }
@media (max-width:920px) { .sidebar .side-divider { width:100%; margin:4px 0; } }
.side-expand-btn { width:40px; height:36px; border-radius:10px; border:none; background:transparent; color:var(--sub); display:flex; align-items:center; justify-content:center; cursor:pointer; transition:background 0.15s, color 0.15s; flex-shrink:0; margin-top:6px; }
.side-expand-btn:hover { background:var(--inner-card); color:var(--fg); }
.side-expand-icon { width:16px; height:16px; flex-shrink:0; transition:transform 0.25s cubic-bezier(.4,0,.2,1); }
.side-expand-lbl { font-size:12px; font-weight:500; color:var(--sub); }
.sidebar-backdrop { display:none; position:fixed; inset:0; background:rgba(0,0,0,0.2); z-index:199; }
.sidebar-backdrop.visible { display:block; }
.shell-content { display:flex; flex-direction:column; min-width:0; flex:1; }
@media (min-width:921px) {
  .sidebar { position:fixed; left:0; top:0; bottom:0; height:100dvh; z-index:30; }
  .shell { grid-template-columns:1fr; padding-left:72px; transition:padding-left 0.25s cubic-bezier(.4,0,.2,1); }
  .shell:has(.sidebar.expanded) { padding-left:220px; }
}
.side-logo { width:36px; height:36px; border-radius:10px; margin-bottom:22px; overflow:hidden; box-shadow:0 1px 2px rgba(0,0,0,0.06); cursor:pointer; flex-shrink:0; }
.side-icon { width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; border:none; background:transparent; color:var(--muted); transition:background 0.15s,color 0.15s; cursor:pointer; }
.side-icon:hover { background:var(--inner-card); color:var(--fg); }
.side-icon.active { background:var(--accent); color:#fff; box-shadow:0 4px 10px rgba(232,122,107,0.25); }
.side-icon.active .side-label { color:#fff; }
.side-icon svg { width:17px; height:17px; pointer-events:none; flex-shrink:0; }
.side-spacer { flex:1; }
.main { padding:28px 28px 60px; width:100%; overflow-x:hidden; }
.topbar { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; }
.topbar-right { display:flex; align-items:center; gap:8px; margin-left:auto; }
.ham-btn { width:38px; height:38px; border-radius:10px; border:1px solid var(--border-soft); background:var(--card); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:4px; color:var(--fg); cursor:pointer; }
.ham-btn .ham-line { width:16px; height:1.5px; background:currentColor; border-radius:1px; transition:none; }
.topbar-right { display:flex; align-items:center; gap:8px; }
.icon-btn { width:38px; height:38px; border-radius:50%; border:1px solid var(--border-soft); background:var(--card); color:var(--muted); display:flex; align-items:center; justify-content:center; transition:background 0.15s; cursor:pointer; }
.icon-btn:hover { background:var(--inner-card); }
.icon-btn svg { width:14px; height:14px; }
.icon-btn.add { background:var(--accent); color:#fff; border:none; font-size:22px; line-height:1; padding-bottom:3px; }
.avatar { width:38px; height:38px; border-radius:50%; background:#4a3530; color:#fff; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:500; flex-shrink:0; }
.greeting { margin-bottom:24px; }
.greeting h1 { font-family:'Instrument Serif',serif; font-size:38px; line-height:1.05; font-weight:400; letter-spacing:-0.02em; margin:0 0 6px; }
.greeting-sub { font-size:13px; color:var(--muted); }
.card { background:var(--card); border:1px solid var(--border-soft); border-radius:16px; padding:14px; }
.accounts-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:16px; }
.acc-card { background:var(--card); border:1px solid var(--border-soft); border-radius:14px; padding:14px; position:relative; display:flex; flex-direction:column; min-height:110px; min-width:0; }
.acc-head { display:flex; align-items:flex-start; gap:9px; margin-bottom:auto; padding-right:24px; }
.acc-icon { width:30px; height:30px; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.acc-icon.s { background:#fce4ec; color:#c62828; }
.acc-icon.f { background:var(--green-soft); color:var(--green); }
.acc-icon.tc { background:var(--gold-bg); color:var(--gold-fg); }
.acc-icon.v { background:#e8f0fe; color:#1a73e8; }
.acc-icon svg { width:14px; height:14px; }
.acc-info { flex:1; min-width:0; }
.acc-name { font-size:12.5px; font-weight:500; color:var(--fg); line-height:1.2; }
.acc-type { font-size:10.5px; color:var(--sub); letter-spacing:0.02em; margin-top:2px; }
.acc-value { font-size:19px; font-weight:600; letter-spacing:-0.01em; margin-top:8px; }
.acc-sub { font-size:10.5px; color:var(--sub); margin-top:2px; }
.acc-check { position:absolute; top:12px; right:12px; width:18px; height:18px; border-radius:50%; background:var(--green-soft); border:1px solid #b8dcc7; display:flex; align-items:center; justify-content:center; cursor:pointer; padding:0; }
.acc-check svg { width:10px; height:10px; }
.info-card { background:var(--card); border:1px solid var(--border-soft); border-radius:14px; padding:14px; display:flex; flex-direction:column; min-height:110px; position:relative; border-left:3px solid var(--accent-soft); min-width:0; }
.info-head { display:flex; align-items:flex-start; gap:9px; margin-bottom:auto; }
.info-icon { width:30px; height:30px; border-radius:8px; background:var(--accent-soft); color:var(--accent); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.info-icon svg { width:14px; height:14px; }
.info-name { font-size:12.5px; font-weight:500; color:var(--fg); line-height:1.2; }
.info-type { font-size:10.5px; color:var(--sub); letter-spacing:0.02em; margin-top:2px; }
.info-num-row { display:flex; align-items:baseline; gap:6px; margin-top:8px; }
.info-num { font-size:22px; font-weight:700; color:var(--accent); line-height:1; letter-spacing:-0.01em; }
.info-num-text { font-size:12px; color:var(--fg); }
.info-monto { font-size:19px; font-weight:600; color:var(--accent); margin-top:8px; letter-spacing:-0.01em; }
.info-sub { font-size:10.5px; color:var(--sub); margin-top:2px; }
.charts-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:18px; }
.ppto-card { padding:22px 24px; display:flex; flex-direction:column; }
.ppto-card-label { font-size:11px; font-weight:500; color:var(--muted); letter-spacing:0.08em; margin-bottom:12px; }
.ppto-key { font-size:12px; color:var(--sub); margin-bottom:4px; }
.ppto-val { font-size:26px; font-weight:600; letter-spacing:-0.02em; }
.ppto-bar { height:8px; background:var(--inner-card); border-radius:4px; overflow:hidden; margin-top:18px; }
.ppto-fill { height:100%; background:var(--accent); border-radius:4px; transition:width 0.4s ease; }
#screen-home .ppto-pct { display:flex; justify-content:space-between; font-size:12px; margin-top:8px; font-weight:400; }
.ppto-pct-num { color:var(--accent); font-weight:600; }
.ppto-pct-label { color:var(--sub); }
.donut-card { padding:22px 24px; }
.donut-body { display:flex; align-items:center; gap:16px; flex-wrap:wrap; }
.donut-legend { flex:1; display:flex; flex-direction:column; gap:9px; min-width:100px; }
.donut-legend-item { display:flex; align-items:center; gap:9px; font-size:12.5px; }
.donut-legend-dot { width:9px; height:9px; border-radius:50%; flex-shrink:0; }
.catkey-section { margin-bottom:16px; }
.catkey-title { font-size:11px; font-weight:500; color:var(--muted); letter-spacing:0.08em; margin-bottom:10px; padding:0 4px; }
.catkey-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:12px; }
.catkey-card { background:var(--card); border:1px solid var(--border-soft); border-radius:14px; padding:14px 16px; min-width:0; }
.catkey-label { font-size:10px; font-weight:500; color:var(--muted); letter-spacing:0.06em; margin-bottom:7px; }
.catkey-monto { font-size:18px; font-weight:600; letter-spacing:-0.01em; }
.catkey-comp { display:flex; align-items:center; gap:7px; margin-top:5px; font-size:11px; }
.catkey-prom { color:var(--sub); }
.delta { font-size:11px; font-weight:600; padding:1px 7px; border-radius:999px; }
.delta.ok { background:var(--green-soft); color:var(--green); }
.delta.over { background:#fbe4e2; color:var(--accent); }
.catkey-bar { margin-top:9px; height:4px; background:var(--inner-card); border-radius:2px; overflow:hidden; }
.catkey-fill { height:100%; border-radius:2px; background:var(--accent); }
@media (max-width:1024px) {
  .accounts-grid { grid-template-columns:repeat(2,1fr); }
  .catkey-grid { grid-template-columns:repeat(2,1fr); }
  .charts-row { grid-template-columns:1fr; }
}
/* Siempre ocultar navbar antigua cuando home está activo */
.shell-content:has(#screen-home.active) > .navbar { display:none; }
@media (min-width:921px) {
  .ham-btn { display:none; }
  .topbar-mobile-only { display:none !important; }
}
@media (max-width:920px) {
  .shell { grid-template-columns:1fr; }
  .sidebar { position:fixed; left:-230px; top:0; bottom:0; height:100dvh !important; z-index:200; width:220px !important; align-items:stretch; padding:22px 12px; box-shadow:none; transition:left 0.25s cubic-bezier(.4,0,.2,1); }
  .sidebar.mobile-open { left:0; box-shadow:4px 0 28px rgba(0,0,0,0.12); }
  .sidebar .side-label { opacity:1 !important; max-width:160px !important; }
  .sidebar .side-icon { width:100% !important; justify-content:flex-start !important; padding:0 12px !important; gap:11px !important; }
  .sidebar .side-expand-btn { display:none; }
  .main { padding:18px 14px 80px; }
  .greeting h1 { font-size:30px; }
}
@media (max-width:480px) {
  .accounts-grid { grid-template-columns:repeat(2,1fr); gap:8px; }
  .topbar-desktop-only { display:none !important; }
  .acc-card, .info-card { padding:10px; min-height:90px; }
  .catkey-card { padding:10px 12px; }
  .acc-value { font-size:15px; }
  .acc-name { font-size:13px; }
  .acc-type { font-size:10px; }
  .acc-sub { font-size:10px; }
  .info-monto { font-size:15px; }
  .info-num { font-size:17px; }
  .info-name { font-size:12px; }
  .info-sub { font-size:10px; }
  .catkey-monto { font-size:15px; }
  .ppto-card { padding:14px; }
  .donut-card { padding:14px; }
  .donut-body { flex-direction:column; align-items:center; gap:8px; }
  #home-donut-svg { width:110px; height:110px; }
  .donut-legend { min-width:unset; width:100%; }
}
.content:has(#screen-home.active) { max-width:100%; padding-bottom:0; }
.home-tooltip { position:absolute; background:var(--accent); color:#fff; font-size:11px; padding:6px 10px; border-radius:8px; pointer-events:none; white-space:nowrap; z-index:200; display:none; line-height:1.6; }

/* ── VALIDACIÓN ────────────────────────────────────────── */
.val-ahorro-card { margin: 12px 12px 4px; border-radius: 10px; padding: 13px 14px; background: color-mix(in srgb, var(--accent) 12%, var(--card)); border: 0.5px solid var(--border); }
.val-ahorro-card.realizado { background: #e8f5e9; border-color: #a5d6a7; }
.val-ahorro-title { font-size: 10px; font-weight: 500; color: var(--accent); letter-spacing: 0.06em; margin-bottom: 8px; }
.val-ahorro-card.realizado .val-ahorro-title { color: #2e7d32; }
.val-ahorro-row { display: flex; justify-content: space-between; align-items: center; padding: 3px 0; font-size: 13px; }
.val-ahorro-divider { height: 0.5px; background: var(--border); margin: 6px 0; }
.val-ahorro-card.realizado .val-ahorro-divider { background: #a5d6a7; }
.val-ahorro-total { font-size: 16px; font-weight: 500; color: var(--accent); }
.val-ahorro-card.realizado .val-ahorro-total { color: #2e7d32; }
.val-ahorro-badge { padding: 3px 10px; border-radius: 14px; font-size: 11px; font-weight: 500; }
.badge-ahorrado { background: #c8e6c9; color: #1b5e20; }
.badge-pendiente { background: #bbdefb; color: var(--accent); }
.val-summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 10px 12px 6px; }
.val-s-card { background: var(--bg); border-radius: 10px; padding: 11px 12px; }
.val-s-label { font-size: 10px; color: var(--muted); font-weight: 500; letter-spacing: 0.04em; margin-bottom: 3px; }
.val-s-valor { font-size: 16px; font-weight: 500; color: var(--fg); }
.val-s-sub { font-size: 11px; color: var(--sub); margin-top: 2px; }
.val-filter-row { padding: 6px 12px 8px; display: flex; gap: 6px; flex-wrap: wrap; }
.val-chip { padding: 5px 12px; border-radius: 14px; font-size: 12px; border: 0.5px solid var(--border); background: var(--card); color: var(--muted); cursor: pointer; font-family: inherit; }
.val-chip.active { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, var(--card)); color: var(--accent); font-weight: 500; }
.val-cat-block { border: 0.5px solid var(--border); border-radius: 10px; margin: 0 12px 6px; overflow: hidden; }
.val-group-header { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: var(--inner-card); font-size: 11px; font-weight: 500; color: var(--muted); border-bottom: 0.5px solid var(--border); letter-spacing: 0.04em; }
.val-item-row { display: flex; align-items: center; gap: 0; padding: 10px 12px; border-bottom: 0.5px solid var(--border); background: var(--card); }
.val-item-row:last-of-type { border-bottom: none; }
.val-check { width: 26px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.val-dot { width: 17px; height: 17px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 600; flex-shrink: 0; }
.val-dot.paid { background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; }
.val-dot.unpaid { background: var(--bg); border: 1.5px solid var(--border); }
.val-dot.partial { background: var(--card)8e1; color: #f57f17; border: 1px solid #ffe082; }
.val-info { flex: 1; min-width: 0; }
.val-name { font-size: 13px; color: var(--fg); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.val-meta { font-size: 11px; color: var(--sub); margin-top: 2px; display: flex; gap: 5px; align-items: center; }
.val-medio { padding: 1px 6px; border-radius: 4px; font-size: 10px; font-weight: 500; }
.val-medio-transf { background: color-mix(in srgb, var(--accent) 12%, var(--card)); color: var(--accent); }
.val-medio-tc { background: var(--card)8e1; color: #f57f17; }
.val-medio-debito { background: #e0f7fa; color: #00695c; }
.val-medio-otro { background: #f3e5f5; color: #7b1fa2; }
.val-montos { text-align: right; flex-shrink: 0; min-width: 78px; }
.val-pagado { font-size: 13px; font-weight: 500; }
.val-ppto { font-size: 11px; color: var(--sub); }
.val-diff-over { font-size: 10px; color: #c62828; }
.val-diff-ok { font-size: 10px; color: #2e7d32; }
.val-subtotal { display: flex; justify-content: space-between; align-items: center; padding: 7px 12px; background: var(--bg); font-size: 12px; border-top: 0.5px solid var(--border); }
.val-legend { display: flex; gap: 12px; padding: 4px 14px 8px; flex-wrap: wrap; }
.val-legend-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--muted); }
.val-legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

.btn-dividir-accion {
  width: 100%; padding: 13px;
  background: var(--bg); color: var(--fg);
  border: 0.5px solid var(--border); border-radius: 10px;
  font-size: 15px; font-weight: 500; cursor: pointer;
  font-family: inherit; margin-bottom: 8px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.dividir-header {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;
}
.dividir-back-btn {
  background: none; border: none; cursor: pointer;
  font-size: 13px; color: var(--accent); font-family: inherit; padding: 0;
}
.dividir-total-card {
  background: var(--bg); border-radius: 10px;
  padding: 10px 12px; margin-bottom: 10px;
  display: flex; justify-content: space-between; align-items: center;
}
.dividir-total-label { font-size: 10px; font-weight: 500; color: var(--muted); letter-spacing: .04em; margin-bottom: 2px; }
.dividir-total-monto { font-size: 17px; font-weight: 500; color: var(--fg); }
.dividir-total-sub { font-size: 11px; color: var(--sub); margin-top: 1px; }
.dividir-progress-bar { height: 4px; background: var(--inner-card); border-radius: 3px; margin-top: 8px; overflow: hidden; }
.dividir-progress-fill { height: 100%; border-radius: 3px; transition: width .2s, background .2s; }
.dividir-asig-row { display: flex; justify-content: space-between; margin-top: 5px; font-size: 11px; }
.dividir-section-hdr {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;
}
.dividir-section-label { font-size: 11px; font-weight: 500; color: var(--muted); letter-spacing: .04em; }
.dividir-btn-add-part { font-size: 12px; color: var(--accent); background: none; border: none; cursor: pointer; font-family: inherit; }
.dividir-parts-scroll { max-height: 240px; overflow-y: auto; margin-bottom: 10px; }
.dividir-part-card {
  background: var(--card); border: 0.5px solid var(--border);
  border-radius: 10px; padding: 10px 11px; margin-bottom: 6px;
}
.dividir-part-top { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.dividir-part-num {
  width: 20px; height: 20px; border-radius: 50%;
  background: var(--chip-bg); font-size: 10px; font-weight: 500;
  color: var(--muted); display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.dividir-part-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.dividir-part-sel {
  flex: 1; font-size: 13px; color: var(--fg); background: none;
  border: none; cursor: pointer; text-align: left; padding: 0; font-family: inherit;
}
.dividir-part-sel.empty { color: var(--accent); }
.dividir-part-remove { background: none; border: none; cursor: pointer; font-size: 16px; color: var(--sub); line-height: 1; }
.dividir-part-bottom { display: flex; align-items: center; gap: 7px; }
.dividir-monto-wrap { position: relative; flex: 1; }
.dividir-monto-pfx { position: absolute; left: 9px; top: 50%; transform: translateY(-50%); font-size: 14px; color: var(--sub); }
.dividir-monto-inp {
  width: 100%; padding: 8px 9px 8px 21px;
  border: 0.5px solid var(--border); border-radius: 8px;
  font-size: 14px; color: var(--fg); font-family: inherit; background: var(--inner-card);
}
.dividir-monto-inp:focus { outline: none; border-color: var(--accent); background: var(--card); }
.dividir-pct-pill {
  font-size: 10px; padding: 3px 7px; border-radius: 8px;
  background: color-mix(in srgb, var(--accent) 12%, var(--card)); color: var(--accent); font-weight: 500; flex-shrink: 0;
}
.dividir-btn-resto {
  font-size: 10px; color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, var(--card));
  border: none; border-radius: 5px; padding: 3px 7px;
  cursor: pointer; flex-shrink: 0; font-family: inherit;
}
.dividir-status-badge {
  border-radius: 8px; padding: 8px 11px;
  font-size: 11px; font-weight: 500; text-align: center; margin-bottom: 10px;
}
.dividir-st-ok { background: #e8f5e9; color: #2e7d32; }
.dividir-st-over { background: #fce4ec; color: #c62828; }
.dividir-st-under { background: var(--bg); color: var(--muted); }
.btn-dividir-guardar {
  width: 100%; padding: 13px; border: none; border-radius: 10px;
  font-size: 15px; font-weight: 500; cursor: pointer; font-family: inherit; margin-bottom: 8px;
}
.btn-dividir-guardar.habilitado { background: var(--accent); color: #fff; }
.btn-dividir-guardar.deshabilitado { background: var(--sub); color: #fff; opacity: .4; cursor: default; }
.dividir-calc-btn {
  width: 28px; height: 28px; border-radius: 7px;
  background: var(--bg); border: 0.5px solid var(--border);
  color: var(--sub); cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; padding: 0; transition: all 0.15s;
}
.dividir-calc-btn:hover { background: var(--inner-card); color: var(--fg); }
.dividir-calc-btn.calc-activa {
  background: color-mix(in srgb, var(--accent) 12%, var(--card));
  border-color: var(--accent); color: var(--accent);
}
.calc-key {
  padding: 13px 0; text-align: center; font-size: 15px;
  color: var(--fg); background: var(--card);
  border: none;
  border-right: 0.5px solid var(--border);
  border-bottom: 0.5px solid var(--border);
  cursor: pointer; font-family: inherit; transition: background 0.1s;
}
.calc-key:hover { background: var(--inner-card); }
.calc-key:nth-child(4n) { border-right: none; }
.calc-key-op { color: var(--accent); font-weight: 500; }
.calc-key-light { background: var(--inner-card); color: var(--muted); font-size: 13px; }
.calc-key-ok {
  background: var(--accent); color: #fff;
  font-weight: 600; font-size: 14px; border-right: none;
}
.calc-key-ok:hover { opacity: 0.9; background: var(--accent); }

/* ── CUOTAS TC ─────────────────────────────────────────── */
.cuotas-add-btn { display:flex; align-items:center; justify-content:center; gap:7px; width:100%; padding:11px 16px; background:color-mix(in srgb, var(--accent) 12%, var(--card)); color:var(--accent); border:0.5px solid var(--border); border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; font-family:inherit; margin:14px 0 10px; }
.cuotas-kpi-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; padding:0 12px 8px; }
.cuotas-kpi-card { background:var(--card); border-radius:12px; padding:13px 12px; border:0.5px solid var(--border); }
.cuotas-card { background:var(--card); border-radius:14px; padding:14px 14px 10px; border:0.5px solid var(--border); margin-bottom:8px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.cuotas-card-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:10px; }
.cuotas-card-info { flex:1; min-width:0; }
.cuotas-card-desc { font-size:14px; font-weight:600; color:var(--fg); margin-bottom:3px; }
.cuotas-card-tags { display:flex; gap:5px; align-items:center; flex-wrap:wrap; margin-top:2px; }
.cuotas-tarjeta-gold { background:var(--card)8e1; color:#f57f17; padding:2px 7px; border-radius:5px; font-size:10px; font-weight:500; }
.cuotas-tarjeta-visa { background:color-mix(in srgb, var(--accent) 12%, var(--card)); color:var(--accent); padding:2px 7px; border-radius:5px; font-size:10px; font-weight:500; }
.cuotas-card-monto { text-align:right; flex-shrink:0; margin-left:12px; }
.cuotas-monto-cuota { font-size:18px; font-weight:700; }
.cuotas-progress-label { display:flex; justify-content:space-between; margin-bottom:4px; font-size:11px; color:var(--muted); }
.cuotas-progress-bar { height:6px; background:var(--inner-card); border-radius:3px; overflow:hidden; margin-bottom:8px; }
.cuotas-progress-fill { height:100%; border-radius:3px; transition:width 0.3s; }
.cuotas-card-footer { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px; }
.cuotas-badges { display:flex; gap:6px; flex-wrap:wrap; }
.cuotas-badge-pagadas { background:color-mix(in srgb, var(--accent) 12%, var(--card)); border-radius:8px; padding:5px 10px; font-size:11px; color:var(--accent); font-weight:500; }
.cuotas-badge-restantes { background:#fce4ec; border-radius:8px; padding:5px 10px; font-size:11px; color:#c62828; font-weight:500; }
.cuotas-badge-pendiente { background:var(--card)8e1; border-radius:8px; padding:5px 10px; font-size:11px; color:#f57f17; font-weight:500; }
.cuotas-pagar-btn { padding:7px 14px; background:var(--accent); color:#fff; border:none; border-radius:9px; font-size:12px; font-weight:600; cursor:pointer; font-family:inherit; display:flex; align-items:center; gap:5px; }
.cuotas-tabs { display:flex; gap:0; margin:0 12px 8px; background:var(--chip-bg); border-radius:10px; padding:3px; }
.cuotas-tab { flex:1; padding:7px 0; border:none; cursor:pointer; border-radius:8px; font-size:13px; background:transparent; color:var(--muted); font-family:inherit; transition:all 0.15s; }
.cuotas-tab.active { background:var(--card); color:var(--fg); font-weight:600; box-shadow:0 1px 4px rgba(0,0,0,0.08); }
.cuotas-tarjeta-group { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.cuotas-tarjeta-btn { display:flex; flex-direction:column; align-items:center; gap:6px; padding:10px 6px; border:0.5px solid var(--border); border-radius:8px; background:var(--card); cursor:pointer; font-family:inherit; transition:all 0.1s; }
.cuotas-tarjeta-btn.active-gold { border:1.5px solid #f57f17; background:var(--card)8e1; }
.cuotas-tarjeta-btn.active-visa { border:1.5px solid var(--accent); background:color-mix(in srgb, var(--accent) 12%, var(--card)); }
.cuotas-tarjeta-icon { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; }
.cuotas-tarjeta-icon.gold { background:var(--card)8e1; color:#f57f17; }
.cuotas-tarjeta-icon.visa { background:color-mix(in srgb, var(--accent) 12%, var(--card)); color:var(--accent); }
.cuad-result-ok {
  background: #e8f5e9; border-radius: 10px;
  padding: 12px 14px; margin-bottom: 14px;
}
.cuad-result-ok-title { font-size: 14px; font-weight: 500; color: #2e7d32; margin-bottom: 3px; }
.cuad-result-ok-sub { font-size: 12px; color: #388e3c; }
.cuad-result-diff {
  background: var(--card)8e1; border-radius: 10px;
  padding: 12px 14px; margin-bottom: 14px;
}
.cuad-result-diff-title { font-size: 14px; font-weight: 500; color: #f57f17; margin-bottom: 3px; }
.cuad-result-diff-sub { font-size: 12px; color: #f57f17; }
.cuad-diff-row {
  display: flex; justify-content: space-between;
  padding: 4px 0; font-size: 13px;
}
.cuad-diff-key { color: var(--muted); }
.cuad-diff-val { font-weight: 500; color: var(--fg); }
.cuad-diff-line { height: 0.5px; background: var(--border); margin: 6px 0; }
.cuad-option-btn {
  width: 100%; display: flex; align-items: center; gap: 10px;
  padding: 11px 12px; border: 0.5px solid var(--border); border-radius: 10px;
  background: var(--card); cursor: pointer; margin-bottom: 8px;
  font-family: inherit; text-align: left;
}
.cuad-option-icon {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.cuad-option-title { font-size: 13px; font-weight: 500; color: var(--fg); }
.cuad-option-sub { font-size: 11px; color: var(--sub); margin-top: 1px; }
.cuad-preview-card {
  background: var(--bg); border-radius: 10px;
  padding: 12px 14px; margin-bottom: 14px;
}
.hcuad-kpi-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; padding:0 12px 8px; }
.hcuad-kpi { background:var(--bg); border-radius:10px; padding:11px 12px; }
.hcuad-kpi-label { font-size:10px; color:var(--muted); font-weight:500; letter-spacing:.04em; margin-bottom:3px; }
.hcuad-kpi-valor { font-size:18px; font-weight:500; color:var(--fg); }
.hcuad-kpi-sub { font-size:11px; color:var(--sub); margin-top:2px; }
.hcuad-kpis-card {
  background: var(--card); border: 1px solid var(--border-soft);
  border-radius: 14px; padding: 0;
  display: grid; grid-template-columns: 1fr 1fr; gap: 0;
}
.hcuad-kpis-card .hcuad-kpi {
  background: transparent; border-radius: 0; padding: 12px 14px;
  border-right: 0.5px solid var(--border); border-bottom: 0.5px solid var(--border);
}
.hcuad-kpis-card .hcuad-kpi:nth-child(2n) { border-right: none; }
.hcuad-kpis-card .hcuad-kpi:nth-last-child(-n+2) { border-bottom: none; }
.hcuad-filtro-btn { width:100%; display:flex; align-items:center; justify-content:space-between; padding:10px 13px; background:var(--card); border:0.5px solid var(--border); border-radius:10px; font-family:inherit; cursor:pointer; font-size:13px; color:var(--muted); margin:0 12px 4px; width:calc(100% - 24px); }
.hcuad-filtro-panel { background:var(--card); border:0.5px solid var(--border); border-top:none; border-radius:0 0 10px 10px; padding:12px; margin:0 12px 10px; }
.hcuad-chip { padding:5px 11px; border-radius:14px; font-size:12px; border:0.5px solid var(--border); background:var(--card); color:var(--muted); cursor:pointer; font-family:inherit; }
.hcuad-chip.active { border-color:var(--accent); background:color-mix(in srgb, var(--accent) 12%, var(--card)); color:var(--accent); font-weight:500; }
.hcuad-card { background:var(--card); border-radius:12px; padding:13px 13px 11px; border:0.5px solid var(--border); margin:0 12px 7px; }
.hcuad-card-head { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:8px; }
.hcuad-fecha { font-size:12px; color:var(--sub); }
.hcuad-banco { font-size:14px; font-weight:500; color:var(--fg); margin-top:2px; }
.hcuad-usuario { font-size:11px; color:var(--muted); margin-top:1px; }
.hcuad-badge { display:inline-block; padding:3px 8px; border-radius:8px; font-size:11px; font-weight:500; }
.hcuad-badge-ok { background:#e8f5e9; color:#2e7d32; }
.hcuad-badge-dif { background:var(--card)8e1; color:#f57f17; }
.hcuad-badge-aj { background:#fce4ec; color:#c62828; }
.hcuad-montos { display:flex; gap:7px; flex-wrap:wrap; margin-top:8px; }
.hcuad-monto-item { flex:1; min-width:80px; background:var(--bg); border-radius:7px; padding:7px 9px; }
.hcuad-monto-label { font-size:10px; color:var(--muted); font-weight:500; letter-spacing:.03em; margin-bottom:2px; }
.hcuad-monto-val { font-size:13px; font-weight:500; color:var(--fg); }
.hcuad-nota { font-size:11px; color:var(--sub); margin-top:8px; padding-top:8px; border-top:0.5px solid var(--border); }
body.sheet-open { overflow: hidden; position: fixed; width: 100%; }

/* ── NUEVO GASTO: Redesign ─────────────────────────────── */
.ng-sheet { background: #F7F2EF !important; }
.ng-header { display: flex; align-items: center; justify-content: space-between; padding: 0 0 4px; }
.ng-sheet-title { font-family: 'Instrument Serif', serif; font-size: 26px; font-weight: 400; letter-spacing: -0.02em; color: var(--fg); margin-bottom: 0; }
.ng-close-btn { width: 28px; height: 28px; border-radius: 50%; background: #EDE5E0; border: none; cursor: pointer; font-size: 14px; color: #666; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.ng-amount-section { display: flex; flex-direction: column; align-items: center; padding: 8px 0 6px; }
.ng-amount-wrap { position: relative; display: flex; justify-content: center; align-items: center; width: 100%; min-height: 64px; cursor: text; }
.ng-amount-display { font-family: 'Instrument Serif', serif; font-size: 48px; font-weight: 400; font-style: italic; letter-spacing: -0.02em; color: #1A1A1A; pointer-events: none; white-space: nowrap; transition: font-size 0.1s ease; line-height: 1.1; }
.ng-amount-display.empty { color: #DDD5CF; }
.ng-amount-input { position: absolute; inset: 0; opacity: 0; border: none; outline: none; background: transparent; width: 100%; height: 100%; font-size: 16px; cursor: text; }
#ng-banco-carousel { overflow-x: visible; }
#ng-banco-carousel .ng-banco-card { flex: 1; min-width: 0; }
.ng-amount-input::placeholder { color: #DDD5CF; }
.ng-search-results { background: #fff; border: 1px solid #EDE5E0; border-radius: 12px; overflow: hidden; margin-top: 4px; display: none; max-height: 260px; overflow-y: auto; }
.ng-search-results.visible { display: block; }
.ng-search-group { font-size: 10px; font-weight: 600; letter-spacing: 0.08em; color: #C4B5AD; padding: 10px 14px 4px; text-transform: uppercase; background: #FAF7F5; border-top: 1px solid #EDE5E0; }
.ng-search-group:first-child { border-top: none; }
.ng-search-item { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; cursor: pointer; border-top: 0.5px solid #F2EDE9; transition: background 0.12s; }
.ng-search-item:hover { background: #FAF7F5; }
.ng-search-item-name { font-size: 13.5px; color: #1A1A1A; font-weight: 500; }
.ng-search-item-tag { font-size: 11px; color: #BBB; }
.ng-date-pill { display: inline-flex; align-items: center; gap: 5px; padding: 6px 13px; border: 1px solid #EDE5E0; border-radius: 20px; background: #fff; cursor: pointer; font-size: 12px; color: #888; font-family: inherit; margin-top: 10px; transition: background 0.18s ease; }
.ng-date-pill:active { background: #EDE5E0; }
.ng-section-label { font-size: 10px; font-weight: 600; letter-spacing: 0.08em; color: #C4B5AD; margin: 14px 0 7px; text-transform: uppercase; }
.ng-carousel { display: flex; gap: 8px; overflow-x: auto; padding-bottom: 2px; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
.ng-carousel::-webkit-scrollbar { display: none; }
.ng-banco-card { display: flex; flex-direction: column; align-items: center; gap: 5px; padding: 11px 16px; border: 1.5px solid #EDE5E0; border-radius: 12px; background: #fff; cursor: pointer; font-family: inherit; flex-shrink: 0; min-width: 84px; transition: all 0.18s ease; }
.ng-banco-card.active { border-color: #E07860 !important; background: #F5EAE6 !important; }
.ng-banco-card.active .ng-banco-name, .ng-banco-card.active .ng-banco-sub { color: #E07860; }
.ng-banco-name { font-size: 12px; color: #333; font-weight: 500; }
.ng-banco-sub { font-size: 10px; color: #AAA; }
.ng-cat-card { display: flex; flex-direction: column; gap: 3px; padding: 11px 13px; border: 1.5px solid #EDE5E0; border-radius: 12px; background: #fff; cursor: pointer; flex-shrink: 0; min-width: 112px; max-width: 130px; transition: all 0.18s ease; }
.ng-cat-card.ng-active { border-color: #E07860; background: #F5EAE6; }
.ng-cat-emoji { font-size: 20px; line-height: 1.2; }
.ng-cat-name { font-size: 13px; font-weight: 600; color: #1A1A1A; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ng-cat-rest { font-size: 10px; font-weight: 500; white-space: nowrap; margin-top: 1px; }
.ng-cat-bar { height: 3px; background: #EDE5E0; border-radius: 2px; overflow: hidden; margin-top: 4px; }
.ng-cat-bar-fill { height: 100%; border-radius: 2px; }
.ng-subcat-chip { display: inline-flex; align-items: center; padding: 7px 13px; border: 1.5px solid #EDE5E0; border-radius: 20px; background: #fff; cursor: pointer; font-size: 13px; color: #333; flex-shrink: 0; transition: all 0.18s ease; white-space: nowrap; }
.ng-subcat-chip.ng-active { border-color: #E07860; background: #F5EAE6; color: #E07860; font-weight: 500; }
.ng-create-chip { border-color: #E07860; color: #E07860; background: #FFF5F3; }
.ng-subcat-search-wrap { display: flex; align-items: center; gap: 8px; padding: 9px 13px; border: 1px solid #EDE5E0; border-radius: 10px; background: #fff; margin-top: 8px; }
.ng-subcat-search-input { flex: 1; border: none; outline: none; font-size: 13px; color: #333; background: transparent; font-family: inherit; }
.ng-subcat-search-input::placeholder { color: #C5BAB5; }
.ng-desc { width: 100%; padding: 11px 13px; border: 1px solid #EDE5E0; border-radius: 10px; background: #fff; font-size: 14px; color: #333; font-family: inherit; resize: none; min-height: 68px; outline: none; box-sizing: border-box; transition: border-color 0.18s ease; }
.ng-desc:focus { border-color: #E07860; }
.ng-dev-row { display: flex; align-items: center; gap: 12px; padding: 12px 13px; border: 1px solid #EDE5E0; border-radius: 10px; background: #fff; cursor: pointer; transition: all 0.18s ease; }
.ng-dev-row.active { border-color: #E07860; }
.ng-toggle-track { width: 42px; height: 24px; border-radius: 12px; background: #D5CBC5; position: relative; flex-shrink: 0; transition: background 0.18s ease; }
.ng-dev-row.active .ng-toggle-track { background: #E07860; }
.ng-toggle-thumb { width: 20px; height: 20px; border-radius: 50%; background: #fff; position: absolute; top: 2px; left: 2px; transition: transform 0.18s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.18); }
.ng-dev-row.active .ng-toggle-thumb { transform: translateX(18px); }
.ng-dev-text { display: flex; flex-direction: column; gap: 1px; flex: 1; }
.ng-dev-label { font-size: 14px; color: #1A1A1A; font-weight: 500; }
.ng-dev-hint { font-size: 11px; color: #AAA; }
.ng-dev-row.active .ng-dev-hint { color: #E07860; }
.ng-btn-guardar { width: 100%; padding: 15px; background: #E07860; color: #fff; border: none; border-radius: 18px; font-size: 16px; font-weight: 700; cursor: pointer; font-family: inherit; margin-top: 4px; transition: opacity 0.18s ease; letter-spacing: 0.01em; }
.ng-btn-guardar:active { opacity: 0.85; }
.ng-btn-guardar:disabled { opacity: 0.5; }

/* ── RESUMEN (DASHBOARD) TOPBAR ────────────────────────── */
.shell-content:has(#screen-dashboard.active) > .navbar { display:none; }
.res-topbar {
  position: sticky; top: 0; z-index: 90;
  padding: 16px 16px 8px; background: var(--bg);
}
.res-topbar-row {
  display: grid; grid-template-columns: 1fr auto 1fr; align-items: center;
}
.res-topbar-left { display: flex; align-items: center; }
.res-title-wrap { display: flex; justify-content: center; }
.res-title {
  font-family: 'Instrument Serif', serif;
  font-size: 22px; font-weight: 400;
  letter-spacing: -0.02em; color: var(--fg); white-space: nowrap;
}
.res-topbar-right { display: flex; align-items: center; gap: 7px; justify-content: flex-end; }
.res-mes-nav {
  padding: 4px 14px 10px;
  display: flex; align-items: center; gap: 8px;
}
.res-nav-arrow {
  width: 34px; height: 34px; border-radius: 10px;
  border: 0.5px solid var(--border); background: var(--card);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; color: var(--muted); cursor: pointer; flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
  user-select: none; -webkit-user-select: none;
}
.res-nav-arrow:hover { background: var(--inner-card); }
.res-nav-arrow:focus,
.res-nav-arrow:focus-visible,
.res-nav-arrow:active {
  outline: none !important; box-shadow: none !important;
  border-color: var(--border) !important; background: var(--card) !important;
  color: var(--muted) !important;
}
.res-mes-wrap { flex: 1; position: relative; }
.res-mes-pill {
  width: 100%; display: flex; align-items: center; justify-content: center; gap: 7px;
  padding: 8px 14px; background: var(--card);
  border: 0.5px solid var(--border); border-radius: 10px;
  cursor: pointer; font-size: 14px; font-weight: 500; color: var(--fg);
  font-family: inherit; transition: all 0.15s;
}
.res-mes-pill:hover { background: var(--inner-card); }
.res-mes-pill.open {
  border-color: var(--accent);
  background: color-mix(in srgb, var(--accent) 10%, var(--card));
  color: var(--accent);
}
.res-mes-chevron { font-size: 11px; color: var(--sub); }
.res-mes-pill.open .res-mes-chevron { color: var(--accent); }
.res-mes-selector {
  margin-top: 6px;
  background: var(--card); border-radius: 14px;
  border: 1px solid var(--border-soft); overflow: hidden;
}
.res-sel-header {
  padding: 10px 14px 9px;
  display: flex; align-items: center; justify-content: space-between;
  border-bottom: 0.5px solid var(--border);
}
.res-sel-year-row { display: flex; align-items: center; gap: 10px; }
.res-sel-year-btn {
  width: 28px; height: 28px; border-radius: 7px;
  border: 0.5px solid var(--border); background: var(--inner-card);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; color: var(--muted); cursor: pointer; font-family: inherit;
}
.res-sel-year-btn:hover { background: var(--chip-bg); }
.res-sel-year { font-size: 15px; font-weight: 500; color: var(--fg); min-width: 40px; text-align: center; }
.res-sel-close {
  font-size: 15px; color: var(--sub); background: none;
  border: none; cursor: pointer; padding: 0; font-family: inherit;
}
.res-meses-grid { display: grid; grid-template-columns: repeat(4, 1fr); }
.res-mes-opt {
  padding: 12px 4px; text-align: center; font-size: 12px; color: var(--muted);
  cursor: pointer; border: none; background: transparent; font-family: inherit;
  border-right: 0.5px solid var(--border);
  border-bottom: 0.5px solid var(--border);
  transition: background 0.1s;
}
.res-mes-opt:nth-child(4n) { border-right: none; }
.res-mes-opt:nth-child(n+9) { border-bottom: none; }
.res-mes-opt:hover { background: var(--inner-card); }
.res-mes-opt.res-mes-actual { color: var(--accent); font-weight: 600; }
.res-mes-opt.res-mes-sel { background: var(--accent); color: #fff; font-weight: 600; }
@media (min-width: 921px) {
  .res-topbar-row { display: flex; align-items: center; justify-content: space-between; }
  .res-topbar-left { display: none; }
  .res-title-wrap { flex: 1; justify-content: flex-start; }
  .res-title { font-size: 32px; }
  .res-mes-nav { padding: 0 24px 14px; }
  .res-mes-wrap { flex: none; }
  .res-mes-pill { width: auto; }
  .res-mes-selector {
    position: absolute; top: calc(100% + 6px); left: 0;
    margin-top: 0; width: 280px; z-index: 200;
    box-shadow: 0 8px 24px rgba(0,0,0,0.10);
  }
}

/* ── TOPBAR COMPARTIDA (validacion, cuotas, presupuesto, admin, historial) ── */
.shell-content:has(#screen-validacion.active) > .navbar,
.shell-content:has(#screen-cuotas.active) > .navbar,
.shell-content:has(#screen-presupuesto.active) > .navbar,
.shell-content:has(#screen-admin.active) > .navbar,
.shell-content:has(#screen-historial-cuad.active) > .navbar { display: none; }
.screen-topbar {
  position: sticky; top: 0; z-index: 90;
  padding: 16px 16px 8px;
  background: var(--bg);
}
.screen-topbar-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}
.screen-topbar-left { display: flex; align-items: center; }
.screen-title-wrap { display: flex; justify-content: center; }
.screen-title {
  font-family: 'Instrument Serif', serif;
  font-size: 22px; font-weight: 400;
  letter-spacing: -0.02em; color: var(--fg);
  white-space: nowrap;
}
.screen-topbar-right { display: flex; align-items: center; gap: 7px; justify-content: flex-end; }
@media (min-width: 921px) {
  .screen-topbar-row { display: flex; align-items: center; }
  .screen-topbar-left { display: none; }
  .screen-title-wrap { flex: 1; justify-content: flex-start; }
  .screen-title { font-size: 32px; }
}

/* ── DETALLE REDESIGN ──────────────────────────────────── */
.shell-content:has(#screen-detalle.active) > .navbar { display:none; }

.det-topbar {
  position: sticky; top: 0; z-index: 90;
  padding: 16px 16px 0;
  background: var(--bg);
}
.det-topbar-row {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: 8px;
}
.det-topbar-left { display: flex; align-items: center; }
.det-topbar-center { text-align: center; }
.det-topbar-right { display: flex; align-items: center; gap: 7px; justify-content: flex-end; }
.det-title {
  font-family: 'Instrument Serif', serif;
  font-size: 22px; font-weight: 400;
  letter-spacing: -0.02em; color: var(--fg);
  white-space: nowrap;
}
.det-period-label {
  font-size: 11px; color: var(--sub);
  padding: 6px 16px 0; display: block;
}
.det-strip-card {
  margin: 8px 12px;
  background: var(--card); border: 1px solid var(--border-soft);
  border-radius: 14px; padding: 9px 12px; display: flex;
}
.det-strip-item { flex: 1; display: flex; flex-direction: column; gap: 2px; }
.det-strip-item + .det-strip-item {
  border-left: 0.5px solid var(--border); padding-left: 10px;
}
.det-strip-lbl {
  font-size: 9px; color: var(--sub); font-weight: 500;
  letter-spacing: 0.05em; text-transform: uppercase;
}
.det-strip-val { font-size: 12px; font-weight: 600; }
#det-search-container {
  margin: 0 12px 8px;
  background: var(--card);
  border: 1px solid var(--border-soft);
  border-radius: 12px;
  overflow: hidden;
}
#det-search-row {
  padding: 8px 10px;
  display: flex; gap: 6px; align-items: center;
}
#det-filter-panel {
  display: none;
  border-top: 0.5px solid var(--border);
  padding: 14px 12px 10px;
  background: transparent; border-radius: 0; margin: 0;
}
#det-filter-panel.open { display: block; }
.det-fs-label {
  font-size: 9px; font-weight: 600; color: var(--muted);
  letter-spacing: 0.08em; text-transform: uppercase;
  display: block; margin-bottom: 5px;
}
.det-chip-row { display: flex; gap: 5px; flex-wrap: wrap; margin-bottom: 10px; }
.det-chip {
  padding: 4px 10px; border-radius: 999px; font-size: 11px;
  border: 0.5px solid var(--border); background: var(--inner-card);
  color: var(--muted); cursor: pointer; font-family: inherit; transition: all 0.12s;
}
.det-chip.active {
  background: var(--accent-soft); border-color: var(--accent);
  color: var(--accent); font-weight: 500;
}
.det-filter-divider { height: 0.5px; background: var(--border); margin: 2px 0 10px; }
.det-period-desde-hasta { margin-bottom: 8px; }
.det-period-row-label {
  font-size: 9px; font-weight: 600; color: var(--muted);
  letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 4px;
}
.det-period-selects { display: flex; gap: 6px; }
.det-period-selects select {
  padding: 6px 8px; border: 0.5px solid var(--border);
  border-radius: 8px; font-size: 13px; color: var(--fg);
  background: var(--inner-card); font-family: inherit;
}
.det-period-selects select.sel-mes { flex: 2; }
.det-period-selects select.sel-anio { flex: 1; }
.det-panel-actions { display: flex; gap: 6px; margin-top: 6px; }
.det-btn-clear {
  flex: 1; padding: 9px; background: var(--inner-card);
  border: 0.5px solid var(--border); border-radius: 8px;
  font-size: 12px; color: var(--muted); cursor: pointer; font-family: inherit;
}
.det-btn-apply {
  flex: 2; padding: 9px; background: var(--accent); border: none;
  border-radius: 8px; font-size: 12px; font-weight: 500;
  color: #fff; cursor: pointer; font-family: inherit;
}
#det-filtro-btn.filtros-activos {
  background: var(--accent-soft);
  border-color: var(--accent);
  color: var(--accent);
}
@media (min-width: 921px) {
  .det-topbar-row { display: flex; align-items: center; }
  .det-topbar-left { display: none; }
  .det-topbar-center { flex: 1; text-align: left; }
  .det-title { font-size: 32px; }
  #det-search-container { margin-left: 0; margin-right: 0; }
}

  `

  const htmlContent = `
<div class="app">

  <!-- DRAWER (mobile) -->
  <div class="drawer-overlay" id="drawer-overlay" onclick="cerrarDrawer()"></div>
  <div class="drawer" id="drawer">
    <div class="drawer-header" style="flex-direction:column;align-items:stretch;gap:0;padding:0;">
      <a href="/home" style="display:flex;align-items:center;gap:10px;padding:14px 20px 12px;text-decoration:none;border-bottom:0.5px solid #f0f0f0;">
        <svg viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" style="width:28px;height:28px;flex-shrink:0;border-radius:7px;overflow:hidden;">
          <rect width="36" height="36" rx="9" fill="#fdebe7"/>
          <path d="M8 19.5L18 11l10 8.5" stroke="#1f2c40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <path d="M11 18v9h14v-9" stroke="#1f2c40" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          <circle cx="23.5" cy="22" r="2.5" fill="#e87a6b"/>
        </svg>
        <span style="font-size:13px;color:var(--accent);font-family:inherit;font-weight:500;">← Volver a Apps</span>
      </a>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px 12px;">
        <span class="drawer-brand">Gastos FWV</span>
        <button class="drawer-close" onclick="cerrarDrawer()">✕</button>
      </div>
    </div>
    <div class="drawer-links">
      <button class="drawer-link drawer-item-indent active" data-screen="home" onclick="switchScreen('home');cerrarDrawer()">
        Menú Principal
      </button>
      <div class="drawer-divider"></div>
      <div class="drawer-section-label">GASTOS</div>
      <button class="drawer-link drawer-item-indent" data-screen="dashboard" onclick="switchScreen('dashboard');cerrarDrawer()">
        Resumen
      </button>
      <button class="drawer-link drawer-item-indent" data-screen="detalle" onclick="switchScreen('detalle');cerrarDrawer()">
        Detalle
      </button>
      <button class="drawer-link drawer-item-indent" data-screen="validacion" onclick="switchScreen('validacion');cerrarDrawer()">
        Validación Pagos
      </button>
      <button class="drawer-link drawer-item-indent" data-screen="cuotas" onclick="switchScreen('cuotas');cerrarDrawer()">
        Pagos en Cuotas con Tarjeta de Crédito
      </button>
      <div class="drawer-divider"></div>
      <div class="drawer-section-label">ADMINISTRADOR</div>
      <button class="drawer-link drawer-item-indent" data-screen="admin" onclick="switchScreen('admin');cerrarDrawer()">
        Categorías
      </button>
      <button class="drawer-link drawer-item-indent" data-screen="presupuesto" onclick="switchScreen('presupuesto');cerrarDrawer()">
        Presupuestos
      </button>
      <button class="drawer-link drawer-item-indent" data-screen="historial-cuad" onclick="switchScreen('historial-cuad');cerrarDrawer()">
        Historial Cuadraturas
      </button>
    </div>
    <div style="padding:8px 16px 16px;display:flex;flex-direction:column;gap:8px;">
      <button style="width:100%;padding:13px;background:var(--accent);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit;" onclick="abrirNuevoGasto();cerrarDrawer()">+ Nuevo gasto</button>
    </div>
  </div>

  <!-- SHELL: shared sidebar + content -->
  <div class="shell">
    <aside class="sidebar" id="app-sidebar">
      <div class="side-logo" onclick="window.location='/home'" title="Menú Principal" style="display:flex;align-items:center;gap:10px;cursor:pointer;margin-bottom:18px;width:auto;height:auto;overflow:visible;border-radius:0;box-shadow:none;">
        <img src="/fwv-icon.png" alt="FWV" style="width:36px;height:36px;border-radius:9px;flex-shrink:0;"/>
        <span class="side-label" style="font-size:13px;font-weight:600;color:var(--fg);letter-spacing:0;text-transform:none;">Menú Principal</span>
      </div>
      <div class="side-section-hdr">Gastos</div>
      <button class="side-icon active" data-screen="home" onclick="switchScreen('home');cerrarSidebarMobile()" title="Home">
        <svg class="side-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21v-7h6v7"/></svg>
        <span class="side-label">Home</span>
      </button>
      <button class="side-icon" data-screen="dashboard" onclick="switchScreen('dashboard');cerrarSidebarMobile()" title="Resumen">
        <svg class="side-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
        <span class="side-label">Resumen</span>
      </button>
      <button class="side-icon" data-screen="detalle" onclick="switchScreen('detalle');cerrarSidebarMobile()" title="Detalle">
        <svg class="side-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="3.5" cy="6" r="1.5" fill="currentColor"/><circle cx="3.5" cy="12" r="1.5" fill="currentColor"/><circle cx="3.5" cy="18" r="1.5" fill="currentColor"/></svg>
        <span class="side-label">Detalle</span>
      </button>
      <button class="side-icon" data-screen="validacion" onclick="switchScreen('validacion');cerrarSidebarMobile()" title="Validación">
        <svg class="side-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h7"/><path d="M3 10h18"/><path d="M16 19l2 2 4-4"/></svg>
        <span class="side-label">Validación</span>
      </button>
      <button class="side-icon" data-screen="cuotas" onclick="switchScreen('cuotas');cerrarSidebarMobile()" title="Cuotas TC">
        <svg class="side-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/></svg>
        <span class="side-label">Cuotas TC</span>
      </button>
      <div class="side-divider"></div>
      <div class="side-section-hdr">Administrador</div>
      <button class="side-icon" data-screen="presupuesto" onclick="switchScreen('presupuesto');cerrarSidebarMobile()" title="Presupuestos">
        <svg class="side-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        <span class="side-label">Presupuestos</span>
      </button>
      <button class="side-icon" data-screen="admin" onclick="switchScreen('admin');cerrarSidebarMobile()" title="Categorías">
        <svg class="side-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.2"/><rect x="14" y="3" width="7" height="7" rx="1.2"/><rect x="3" y="14" width="7" height="7" rx="1.2"/><rect x="14" y="14" width="7" height="7" rx="1.2"/></svg>
        <span class="side-label">Categorías</span>
      </button>
      <button class="side-icon" data-screen="historial-cuad" onclick="switchScreen('historial-cuad');cerrarSidebarMobile()" title="Historial">
        <svg class="side-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8v4l3 3"/><circle cx="12" cy="12" r="9"/></svg>
        <span class="side-label">Historial</span>
      </button>
      <div class="side-spacer"></div>
      <button class="side-expand-btn" onclick="toggleSidebarExpand()" title="Expandir menú">
        <svg class="side-expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        <span class="side-expand-lbl side-label">Colapsar</span>
      </button>
    </aside>
    <div class="sidebar-backdrop" id="sidebar-backdrop" onclick="cerrarSidebarMobile()"></div>
    <div class="shell-content">
      <nav class="navbar">
        <div style="display:flex;align-items:center;gap:10px;">
          <button class="btn-hamburger" id="btn-hamburger" onclick="abrirSidebarMobile()">
            <div class="ham-line"></div>
            <div class="ham-line"></div>
            <div class="ham-line"></div>
          </button>
          <span class="navbar-brand" id="navbar-title"><span class="brand-prefix">Gastos FWV</span> - Resumen</span>
        </div>
        <div class="navbar-right" style="display:flex;align-items:center;gap:8px;">
          <button id="btn-add-nav" onclick="abrirNuevoGasto()" style="width:32px;height:32px;background:var(--accent);color:#fff;border:none;border-radius:50%;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;font-family:inherit;">+</button>
        </div>
      </nav>
      <main class="content">

    <!-- DASHBOARD -->
    <div class="screen" id="screen-dashboard">
      <div class="res-topbar">
        <div class="res-topbar-row">
          <div class="res-topbar-left">
            <button class="ham-btn res-ham-btn" onclick="abrirSidebarMobile()" title="Menú">
              <span class="ham-line"></span><span class="ham-line"></span><span class="ham-line"></span>
            </button>
          </div>
          <div class="res-title-wrap">
            <span class="res-title">Resumen de Gastos</span>
          </div>
          <div class="res-topbar-right">
            <button class="icon-btn" onclick="actualizarTodo()" title="Actualizar datos">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 8A5.5 5.5 0 1 1 10 3.07"/><path d="M13.5 2v4h-4"/></svg>
            </button>
            <button class="icon-btn add" onclick="abrirNuevoGasto()" title="Nuevo gasto">+</button>
          </div>
        </div>
      </div>
      <div class="res-mes-nav">
        <button class="res-nav-arrow" id="dash-prev" tabindex="-1">‹</button>
        <div class="res-mes-wrap">
          <div class="res-mes-pill" id="res-mes-pill" onclick="toggleMesSelectorResumen()">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            <span id="res-mes-label">Mayo 2026</span>
            <span class="res-mes-chevron" id="res-mes-chevron">▼</span>
          </div>
          <div class="res-mes-selector" id="res-mes-selector" style="display:none;">
            <div class="res-sel-header">
              <div class="res-sel-year-row">
                <button class="res-sel-year-btn" onclick="resSelectorAnio(-1)">‹</button>
                <span class="res-sel-year" id="res-sel-year">2026</span>
                <button class="res-sel-year-btn" onclick="resSelectorAnio(1)">›</button>
              </div>
              <button class="res-sel-close" onclick="cerrarMesSelectorResumen()">✕</button>
            </div>
            <div class="res-meses-grid" id="res-meses-grid"></div>
          </div>
        </div>
        <button class="res-nav-arrow" id="dash-next" tabindex="-1">›</button>
      </div>
      <div class="resumen-grid-2" style="padding-top:12px;">
        <div class="res-card-accent" style="border-left-color:#2e7d32;">
          <span class="resumen-label">INGRESOS / EGRESOS</span>
          <div style="display:flex;align-items:baseline;gap:5px;margin-top:4px;">
            <span class="resumen-valor ing" id="d-ing">$0</span>
            <span style="color:#bbb;font-size:13px;">/</span>
            <span class="resumen-valor egr" id="d-egr">$0</span>
          </div>
          <span class="resumen-sub" id="d-bal" style="margin-top:3px;display:block;"></span>
        </div>
        <div class="res-card-accent" style="border-left-color:var(--accent);">
          <span class="resumen-label">PRESUPUESTO</span>
          <span class="resumen-valor" id="d-ppto" style="display:block;margin-top:4px;">$0</span>
          <span class="resumen-sub" id="d-libre" style="margin-top:3px;display:block;"></span>
        </div>
      </div>
      <div class="resumen-grid-2">
        <div class="res-card-accent" style="border-left-color:var(--accent);">
          <span class="resumen-label">AHORRO ESTE MES</span>
          <span class="resumen-valor" id="d-ahorro" style="display:block;margin-top:4px;">$0</span>
          <span class="resumen-sub" style="color:#888;margin-top:3px;display:block;">Cuenta Vista</span>
        </div>
        <div class="res-card-accent" style="border-left-color:#e65100;">
          <span class="resumen-label">PAGO TC MES ANT.</span>
          <span class="resumen-valor" id="d-tc" style="display:block;margin-top:4px;">$0</span>
          <span class="resumen-sub" id="d-tc-mes" style="color:#888;margin-top:3px;display:block;"></span>
        </div>
      </div>
      <div class="section-header">EGRESOS POR CATEGORÍA</div>
      <div style="padding:0 12px 8px;display:flex;gap:6px;align-items:center;">
        <input id="dash-cat-search" placeholder="Buscar categoría..." style="flex:1;padding:7px 10px;border:0.5px solid #e0e0e0;border-radius:8px;font-size:13px;background:#fff;font-family:inherit;outline:none;color:#111;" />
        <button id="dash-sort-btn" style="padding:7px 10px;border:0.5px solid #e0e0e0;border-radius:8px;font-size:12px;background:#fff;cursor:pointer;font-family:inherit;display:flex;align-items:center;gap:4px;color:#555;" title="Ordenar">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M4 8h8M6 12h4" stroke="#666" stroke-width="1.5" stroke-linecap="round"/></svg>
        </button>
      </div>
      <div class="cat-list" id="cat-list"></div>
    </div>

    <!-- DETALLE -->
    <div class="screen" id="screen-detalle">
      <!-- Topbar propia -->
      <div class="det-topbar">
        <div class="det-topbar-row">
          <div class="det-topbar-left">
            <button class="ham-btn" onclick="abrirSidebarMobile()" title="Menú">
              <span class="ham-line"></span><span class="ham-line"></span><span class="ham-line"></span>
            </button>
          </div>
          <div class="det-topbar-center">
            <span class="det-title">Detalle de gastos</span>
          </div>
          <div class="det-topbar-right">
            <button class="icon-btn" onclick="actualizarTodo()" title="Actualizar datos">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 8A5.5 5.5 0 1 1 10 3.07"/><path d="M13.5 2v4h-4"/></svg>
            </button>
            <button class="icon-btn add" onclick="abrirNuevoGasto()" title="Nuevo gasto">+</button>
          </div>
        </div>
      </div>

      <!-- Resumen compacto -->
      <div class="det-strip-card">
        <div class="det-strip-item">
          <span class="det-strip-lbl">Ingresos</span>
          <span class="det-strip-val" id="s-i" style="color:var(--green)">$0</span>
        </div>
        <div class="det-strip-item">
          <span class="det-strip-lbl">Egresos</span>
          <span class="det-strip-val" id="s-e" style="color:#c62828">$0</span>
        </div>
        <div class="det-strip-item">
          <span class="det-strip-lbl">Movimientos</span>
          <span class="det-strip-val" id="s-n" style="color:var(--fg)">0</span>
        </div>
      </div>
      <span id="s-e-real" style="display:none">$0</span>

      <!-- Label de período -->
      <span class="det-period-label" id="det-periodo-label">Cargando...</span>

      <!-- Búsqueda + filtros: contenedor unificado expandible -->
      <div id="det-search-container">
        <div id="det-search-row">
          <div style="position:relative;flex:1;">
            <span style="position:absolute;left:10px;top:50%;transform:translateY(-50%);pointer-events:none;color:var(--sub);font-size:14px;">🔍</span>
            <input class="search-input" id="buscador" placeholder="Buscar gasto..." style="padding-left:34px;" />
          </div>
          <button id="det-filtro-btn" style="display:flex;align-items:center;gap:5px;padding:7px 11px;border-radius:8px;font-size:12px;background:var(--card);border:0.5px solid var(--border);color:var(--muted);cursor:pointer;font-family:inherit;white-space:nowrap;flex-shrink:0;">
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="width:13px;height:13px;flex-shrink:0;"><path d="M3 5h14M6 10h8M9 15h2"/></svg>
            <span id="det-filtro-btn-label">Filtros</span>
          </button>
          <button id="btn-modo-seleccion" onclick="toggleModoSeleccion()"
            style="padding:6px 11px;border-radius:8px;font-size:12px;font-weight:500;border:0.5px solid var(--accent);background:color-mix(in srgb, var(--accent) 12%, var(--card));color:var(--accent);cursor:pointer;font-family:inherit;white-space:nowrap;flex-shrink:0;">
            ✓ Seleccionar
          </button>
        </div>
        <div id="det-filter-panel"></div>
      </div>

      <!-- Barra de selección múltiple -->
      <div id="selection-bar" style="display:none;background:#e8f0fe;border-bottom:0.5px solid #c5d9f7;padding:8px 12px;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:8px;">
          <div id="check-all-btn" onclick="toggleSeleccionTodos()"
            style="width:20px;height:20px;border-radius:4px;border:1.5px solid var(--accent);background:var(--card);display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;">
          </div>
          <span id="sel-count-label" style="font-size:13px;font-weight:500;color:var(--accent);">0 seleccionados</span>
        </div>
        <div style="display:flex;gap:6px;">
          <button onclick="toggleModoSeleccion()"
            style="padding:5px 12px;border-radius:8px;font-size:12px;border:0.5px solid #aac4f0;background:#fff;color:var(--accent);cursor:pointer;font-family:inherit;">
            Cancelar
          </button>
          <button id="btn-cambiar-subcat" onclick="abrirModalCambioSubcat()"
            style="padding:5px 12px;border-radius:8px;font-size:12px;border:none;background:#e8f0fe;color:var(--accent);cursor:pointer;font-family:inherit;font-weight:500;opacity:0.4;">
            Cambiar subcat →
          </button>
          <button id="btn-cambiar-fecha" onclick="abrirModalCambioFecha()"
            style="padding:5px 12px;border-radius:8px;font-size:12px;border:none;background:var(--accent);color:#fff;cursor:pointer;font-family:inherit;font-weight:500;opacity:0.4;">
            Cambiar fecha →
          </button>
        </div>
      </div>

      <!-- Lista -->
      <div class="lista" id="lista"></div>
    </div>

    <!-- PRESUPUESTO -->
    <div class="screen" id="screen-presupuesto">
      <div class="screen-topbar">
        <div class="screen-topbar-row">
          <div class="screen-topbar-left">
            <button class="ham-btn screen-ham-btn" onclick="abrirSidebarMobile()" title="Menú">
              <span class="ham-line"></span><span class="ham-line"></span><span class="ham-line"></span>
            </button>
          </div>
          <div class="screen-title-wrap">
            <span class="screen-title">Administración de Presupuestos</span>
          </div>
          <div class="screen-topbar-right">
            <button class="icon-btn" onclick="actualizarTodo()" title="Actualizar datos">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 8A5.5 5.5 0 1 1 10 3.07"/><path d="M13.5 2v4h-4"/></svg>
            </button>
            <button class="icon-btn add" onclick="abrirNuevoGasto()" title="Nuevo gasto">+</button>
          </div>
        </div>
      </div>
      <div class="res-mes-nav">
        <button class="res-nav-arrow" id="ppto-prev" tabindex="-1">‹</button>
        <div class="res-mes-wrap">
          <div class="res-mes-pill" id="ppto-mes-pill" onclick="toggleMesSelectorPpto()">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            <span id="ppto-mes-label">Mayo 2026</span>
            <span class="res-mes-chevron" id="ppto-mes-chevron">▼</span>
          </div>
          <div class="res-mes-selector" id="ppto-mes-selector" style="display:none;">
            <div class="res-sel-header">
              <div class="res-sel-year-row">
                <button class="res-sel-year-btn" onclick="pptoSelectorAnio(-1)">‹</button>
                <span class="res-sel-year" id="ppto-sel-year">2026</span>
                <button class="res-sel-year-btn" onclick="pptoSelectorAnio(1)">›</button>
              </div>
              <button class="res-sel-close" onclick="cerrarMesSelectorPpto()">✕</button>
            </div>
            <div class="res-meses-grid" id="ppto-meses-grid"></div>
          </div>
        </div>
        <button class="res-nav-arrow" id="ppto-next" tabindex="-1">›</button>
      </div>
      <div class="ppto-total-card">
        <div class="ppto-total-card-left">
          <div class="ppto-total-card-label">TOTAL PRESUPUESTADO</div>
          <div class="ppto-total-card-monto" id="ppto-total">$0</div>
        </div>
        <div class="ppto-total-card-right">
          <div class="ppto-total-card-label">EJECUTADO</div>
          <div class="ppto-total-card-sub" id="ppto-real-txt"></div>
          <div class="ppto-total-card-libre" id="ppto-libre-txt"></div>
        </div>
        <div style="width:100%;">
          <div class="ppto-global-bar"><div class="ppto-global-fill" id="ppto-global-fill" style="width:0%"></div></div>
        </div>
      </div>
      <div style="padding:8px 12px 4px;display:flex;gap:6px;align-items:center;">
        <input id="ppto-search" type="search" placeholder="Buscar subcategoría..."
          style="flex:1;padding:9px 12px;border:1px solid #e0e0e0;border-radius:10px;font-size:14px;outline:none;background:#fafafa;" />
        <button id="ppto-sort-btn" onclick="togglePptoSort()"
          style="width:36px;height:36px;border:0.5px solid #e0e0e0;border-radius:10px;background:#f5f5f5;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;">↓</button>
      </div>
      <div id="ppto-lista" style="padding:4px 12px 80px;"></div>
    </div>

    <!-- ADMIN -->
    <div class="screen" id="screen-admin">
      <div class="screen-topbar">
        <div class="screen-topbar-row">
          <div class="screen-topbar-left">
            <button class="ham-btn screen-ham-btn" onclick="abrirSidebarMobile()" title="Menú">
              <span class="ham-line"></span><span class="ham-line"></span><span class="ham-line"></span>
            </button>
          </div>
          <div class="screen-title-wrap">
            <span class="screen-title">Administración de Categorías</span>
          </div>
          <div class="screen-topbar-right">
            <button class="icon-btn" onclick="actualizarTodo()" title="Actualizar datos">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 8A5.5 5.5 0 1 1 10 3.07"/><path d="M13.5 2v4h-4"/></svg>
            </button>
          </div>
        </div>
      </div>
      <div class="admin-section">
        <div class="admin-section-title">CATEGORÍAS Y SUBCATEGORÍAS</div>
        <div style="display:flex;gap:6px;margin-bottom:8px;">
          <div style="position:relative;flex:1;">
            <input class="admin-add-input" type="search" id="admin-search" placeholder="Buscar categoría o subcategoría..." style="width:100%;padding:7px 10px 7px 30px;" />
          </div>
        </div>
        <div style="display:flex;gap:6px;margin-bottom:12px;" id="admin-filter-chips">
          <button class="admin-chip active" data-filter="todas" onclick="setAdminFilter('todas')">Todas</button>
          <button class="admin-chip" data-filter="activas" onclick="setAdminFilter('activas')">Solo activas</button>
          <button class="admin-chip" data-filter="ocultas" onclick="setAdminFilter('ocultas')">Ocultas</button>
        </div>
        <div id="admin-cat-lista"></div>
        <div class="add-cat-row">
          <input class="admin-add-input" id="nueva-cat-input" placeholder="Nueva categoría..." />
          <button class="admin-add-btn" id="btn-add-cat">+ Agregar</button>
        </div>
      </div>
    </div>

    <!-- VALIDACIÓN -->
    <div class="screen" id="screen-validacion">
      <div class="screen-topbar">
        <div class="screen-topbar-row">
          <div class="screen-topbar-left">
            <button class="ham-btn screen-ham-btn" onclick="abrirSidebarMobile()" title="Menú">
              <span class="ham-line"></span><span class="ham-line"></span><span class="ham-line"></span>
            </button>
          </div>
          <div class="screen-title-wrap">
            <span class="screen-title">Validación de Pagos Mensuales</span>
          </div>
          <div class="screen-topbar-right">
            <button class="icon-btn" onclick="actualizarTodo()" title="Actualizar datos">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 8A5.5 5.5 0 1 1 10 3.07"/><path d="M13.5 2v4h-4"/></svg>
            </button>
            <button class="icon-btn add" onclick="abrirNuevoGasto()" title="Nuevo gasto">+</button>
          </div>
        </div>
      </div>
      <div class="res-mes-nav">
        <button class="res-nav-arrow" id="val-prev" tabindex="-1">‹</button>
        <div class="res-mes-wrap">
          <div class="res-mes-pill" id="val-mes-pill" onclick="toggleMesSelectorVal()">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            <span id="val-mes-label">Mayo 2026</span>
            <span class="res-mes-chevron" id="val-mes-chevron">▼</span>
          </div>
          <div class="res-mes-selector" id="val-mes-selector" style="display:none;">
            <div class="res-sel-header">
              <div class="res-sel-year-row">
                <button class="res-sel-year-btn" onclick="valSelectorAnio(-1)">‹</button>
                <span class="res-sel-year" id="val-sel-year">2026</span>
                <button class="res-sel-year-btn" onclick="valSelectorAnio(1)">›</button>
              </div>
              <button class="res-sel-close" onclick="cerrarMesSelectorVal()">✕</button>
            </div>
            <div class="res-meses-grid" id="val-meses-grid"></div>
          </div>
        </div>
        <button class="res-nav-arrow" id="val-next" tabindex="-1">›</button>
      </div>
      <div id="val-content"></div>
    </div>

    <!-- CUOTAS TC -->
    <div class="screen" id="screen-cuotas">
      <div class="screen-topbar">
        <div class="screen-topbar-row">
          <div class="screen-topbar-left">
            <button class="ham-btn screen-ham-btn" onclick="abrirSidebarMobile()" title="Menú">
              <span class="ham-line"></span><span class="ham-line"></span><span class="ham-line"></span>
            </button>
          </div>
          <div class="screen-title-wrap">
            <span class="screen-title">Pagos en Cuotas - Tarjeta Crédito</span>
          </div>
          <div class="screen-topbar-right">
            <button class="icon-btn" onclick="actualizarTodo()" title="Actualizar datos">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 8A5.5 5.5 0 1 1 10 3.07"/><path d="M13.5 2v4h-4"/></svg>
            </button>
            <button class="icon-btn add" onclick="abrirNuevaCuota()" title="Nueva cuota">+</button>
          </div>
        </div>
      </div>
      <div style="padding:0 12px;">
        <button class="cuotas-add-btn" onclick="abrirNuevaCuota()">
          <span style="font-size:18px;line-height:1;">+</span> Agregar gasto en cuotas
        </button>
      </div>
      <div class="cuotas-kpi-grid" id="cuotas-kpi"></div>
      <div class="cuotas-tabs">
        <button class="cuotas-tab active" id="cuotas-tab-activas" onclick="setCuotasTab('activas')">Activas</button>
        <button class="cuotas-tab" id="cuotas-tab-completadas" onclick="setCuotasTab('completadas')">Completadas</button>
      </div>
      <div style="padding:0 12px 80px;" id="cuotas-lista"></div>
    </div>

    <!-- HISTORIAL CUADRATURAS -->
    <div class="screen" id="screen-historial-cuad">
      <div class="screen-topbar">
        <div class="screen-topbar-row">
          <div class="screen-topbar-left">
            <button class="ham-btn screen-ham-btn" onclick="abrirSidebarMobile()" title="Menú">
              <span class="ham-line"></span><span class="ham-line"></span><span class="ham-line"></span>
            </button>
          </div>
          <div class="screen-title-wrap">
            <span class="screen-title">Historial de Cuadraturas</span>
          </div>
          <div class="screen-topbar-right">
            <button class="icon-btn" onclick="actualizarTodo()" title="Actualizar datos">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 8A5.5 5.5 0 1 1 10 3.07"/><path d="M13.5 2v4h-4"/></svg>
            </button>
            <button class="icon-btn add" onclick="abrirNuevoGasto()" title="Nuevo gasto">+</button>
          </div>
        </div>
      </div>
      <div style="padding:10px 12px 8px;">
        <div class="hcuad-kpis-card" id="hcuad-kpis"></div>
      </div>
      <div style="padding:0 12px 6px;">
        <button onclick="toggleHcuadFiltros()" style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:10px 13px;background:#fff;border:0.5px solid #e0e0e0;border-radius:10px;font-family:inherit;cursor:pointer;font-size:13px;color:#555;">
          <div style="display:flex;align-items:center;gap:7px;">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3h12M3 7h8M5 11h4" stroke="#555" stroke-width="1.3" stroke-linecap="round"/></svg>
            Filtros
            <span id="hcuad-filtro-badge" style="display:none;background:#e8f0fe;color:var(--accent);font-size:10px;padding:1px 6px;border-radius:8px;font-weight:500;"></span>
          </div>
          <span id="hcuad-filtro-chev" style="font-size:11px;color:#bbb;transition:transform 0.2s;">▼</span>
        </button>
        <div id="hcuad-filtro-panel" style="display:none;background:#fff;border:0.5px solid #e0e0e0;border-top:none;border-radius:0 0 10px 10px;padding:12px;">
          <div style="font-size:10px;color:#888;font-weight:500;letter-spacing:.05em;margin-bottom:6px;">ORDEN</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;" id="hcuad-chips-orden"></div>
          <div style="font-size:10px;color:#888;font-weight:500;letter-spacing:.05em;margin-bottom:6px;">ESTADO</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;" id="hcuad-chips-estado"></div>
          <div style="font-size:10px;color:#888;font-weight:500;letter-spacing:.05em;margin-bottom:6px;">BANCO</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px;" id="hcuad-chips-banco"></div>
          <div style="font-size:10px;color:#888;font-weight:500;letter-spacing:.05em;margin-bottom:6px;">USUARIO</div>
          <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:10px;" id="hcuad-chips-usuario"></div>
          <button onclick="limpiarHcuadFiltros()" style="padding:6px 14px;background:#f5f5f5;color:#666;border:0.5px solid #e0e0e0;border-radius:8px;font-size:12px;cursor:pointer;font-family:inherit;">Limpiar filtros</button>
        </div>
      </div>
      <div id="hcuad-lista" style="padding:4px 0 80px;"></div>
    </div>

    <!-- HOME -->
    <div class="screen active" id="screen-home">
      <div class="main">

          <!-- Topbar -->
          <div class="topbar">
            <button class="ham-btn" onclick="abrirSidebarMobile()" title="Menú">
              <span class="ham-line"></span><span class="ham-line"></span><span class="ham-line"></span>
            </button>
            <div class="topbar-right">
              <button class="icon-btn" id="btn-eye-all" onclick="toggleEyeAll()" title="Ocultar saldos">
                <svg id="eye-all-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
              <button class="icon-btn" onclick="actualizarTodo()" title="Actualizar datos">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="width:14px;height:14px;"><path d="M13.5 8A5.5 5.5 0 1 1 10 3.07"/><path d="M13.5 2v4h-4"/></svg>
              </button>
              <button class="icon-btn add" onclick="abrirNuevoGasto()" title="Nuevo gasto">+</button>
            </div>
          </div>

          <!-- Greeting -->
          <div class="greeting">
            <h1 id="home-greeting-text">Hola, <i>...</i></h1>
            <div class="greeting-sub">Este es el estado de tus finanzas.</div>
          </div>

          <!-- Accounts grid 3×2 -->
          <div class="accounts-grid">

            <!-- Card 1: Santander -->
            <div class="acc-card">
              <button class="acc-check" onclick="abrirCuadratura('Santander')" title="Cuadrar saldo">
                <svg viewBox="0 0 16 16" fill="none"><path d="M4 8.5l2.5 2.5 5.5-6" stroke="#2e9b6f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <div class="acc-head">
                <div class="acc-icon s"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 7h18v4H3zM3 13h18v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zM7 17h3v2H7z"/></svg></div>
                <div class="acc-info"><div class="acc-name">Santander</div><div class="acc-type">Cuenta corriente</div></div>
              </div>
              <div class="acc-value" id="kpi-sant-v2"><span id="kpi-sant-inner">—</span></div>
              <div class="acc-sub">Saldo estimado</div>
            </div>

            <!-- Card 2: Cuenta Vista Ahorros -->
            <div class="acc-card">
              <button class="acc-check" onclick="abrirCuadratura('Cuenta Vista Ahorros')" title="Cuadrar saldo">
                <svg viewBox="0 0 16 16" fill="none"><path d="M4 8.5l2.5 2.5 5.5-6" stroke="#2e9b6f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <div class="acc-head">
                <div class="acc-icon v"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v6c0 5 4 8.5 9 9 5-.5 9-4 9-9V7z"/></svg></div>
                <div class="acc-info"><div class="acc-name">Cuenta Vista</div><div class="acc-type">Ahorros</div></div>
              </div>
              <div class="acc-value" id="kpi-ahorros-v2"><span id="kpi-ahorros-inner">—</span></div>
              <div class="acc-sub">Saldo estimado</div>
            </div>

            <!-- Card 3: Falabella -->
            <div class="acc-card">
              <button class="acc-check" onclick="abrirCuadratura('Falabella')" title="Cuadrar saldo">
                <svg viewBox="0 0 16 16" fill="none"><path d="M4 8.5l2.5 2.5 5.5-6" stroke="#2e9b6f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <div class="acc-head">
                <div class="acc-icon f"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 7h18v4H3zM3 13h18v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1zM7 17h3v2H7z"/></svg></div>
                <div class="acc-info"><div class="acc-name">Falabella</div><div class="acc-type">Cuenta corriente</div></div>
              </div>
              <div class="acc-value" id="kpi-fala-v2"><span id="kpi-fala-inner">—</span></div>
              <div class="acc-sub">Saldo estimado</div>
            </div>

            <!-- Card 4: Último mes Falabella (info) -->
            <div class="info-card">
              <div class="info-head">
                <div class="info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></div>
                <div><div class="info-name">Último mes Falabella</div><div class="info-type" id="kpi-fala-mes-v2">—</div></div>
              </div>
              <div class="info-num-row">
                <div class="info-num" id="kpi-fala-compras-v2">—</div>
                <div class="info-num-text">compras</div>
              </div>
              <div class="info-sub">Mes con actividad más reciente</div>
            </div>

            <!-- Card 5: Tarjeta Crédito -->
            <div class="acc-card">
              <button class="acc-check" onclick="abrirCuadratura('Tarjeta Crédito')" title="Cuadrar saldo">
                <svg viewBox="0 0 16 16" fill="none"><path d="M4 8.5l2.5 2.5 5.5-6" stroke="#2e9b6f" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
              </button>
              <div class="acc-head">
                <div class="acc-icon tc"><svg viewBox="0 0 24 24" fill="currentColor"><rect x="2" y="5" width="20" height="14" rx="2.5"/><rect x="2" y="9" width="20" height="2.5" fill="#fff"/></svg></div>
                <div class="acc-info"><div class="acc-name">Tarjeta Crédito</div><div class="acc-type">Santander</div></div>
              </div>
              <div class="acc-value" id="kpi-tc-v2">
                <span id="kpi-tc-inner" onclick="abrirDetalleTarjeta()" style="cursor:pointer;text-decoration:underline dotted;text-underline-offset:3px;">—</span>
              </div>
              <div class="acc-sub">Saldo disponible real</div>
            </div>

            <!-- Card 6: Cuotas próximo mes (info) -->
            <div class="info-card">
              <div class="info-head">
                <div class="info-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/><line x1="6" y1="15" x2="10" y2="15"/></svg></div>
                <div><div class="info-name">Cuotas Próximo Mes</div><div class="info-type" id="kpi-cuotas-mes-label">—</div></div>
              </div>
              <div class="info-monto" id="kpi-cuotas-prox">—</div>
              <div class="info-sub">Total a pagar en cuotas</div>
            </div>

          </div>

          <!-- Presupuesto vs Real + Donut -->
          <div class="charts-row">
            <div class="card ppto-card">
              <div class="ppto-card-label">PRESUPUESTO VS REAL</div>
              <div style="display:flex;justify-content:space-between;align-items:flex-end;">
                <div><div class="ppto-key">Gastado</div><div class="ppto-val" id="home-ppto-gastado">—</div></div>
                <div style="text-align:right;"><div class="ppto-key">Presupuesto</div><div class="ppto-val" id="home-ppto-total">—</div></div>
              </div>
              <div class="ppto-bar"><div class="ppto-fill" id="home-ppto-fill" style="width:0%"></div></div>
              <div class="ppto-pct">
                <span class="ppto-pct-label" id="home-ppto-mes-label">—</span>
                <span class="ppto-pct-num" id="home-ppto-pct">—</span>
              </div>
            </div>
            <div class="card donut-card">
              <div class="ppto-card-label">DISTRIBUCIÓN DEL GASTO</div>
              <div class="donut-body">
                <svg id="home-donut-svg" width="150" height="150" viewBox="0 0 150 150" style="flex-shrink:0;"></svg>
                <div class="donut-legend" id="home-donut-legend"></div>
              </div>
              <div style="font-size:11px;color:var(--accent);text-align:right;margin-top:8px;cursor:pointer;" onclick="switchScreen('dashboard')">Ver todas →</div>
            </div>
          </div>

          <!-- Categorías clave -->
          <div class="catkey-section">
            <div class="catkey-title" id="home-cat-periodo-v2">CATEGORÍAS CLAVE</div>
            <div class="catkey-grid">
              <div class="catkey-card" id="cat-kpi-cuentas-v2">
                <div class="catkey-label">CUENTAS</div>
                <div class="catkey-monto">—</div>
                <div class="catkey-comp"><span class="catkey-prom">prom —</span><span class="delta">—</span></div>
                <div class="catkey-bar"><div class="catkey-fill" style="width:0%"></div></div>
              </div>
              <div class="catkey-card" id="cat-kpi-super-v2">
                <div class="catkey-label">SUPERMERCADO</div>
                <div class="catkey-monto">—</div>
                <div class="catkey-comp"><span class="catkey-prom">prom —</span><span class="delta">—</span></div>
                <div class="catkey-bar"><div class="catkey-fill" style="width:0%"></div></div>
              </div>
              <div class="catkey-card" id="cat-kpi-mall-v2">
                <div class="catkey-label">MALL</div>
                <div class="catkey-monto">—</div>
                <div class="catkey-comp"><span class="catkey-prom">prom —</span><span class="delta">—</span></div>
                <div class="catkey-bar"><div class="catkey-fill" style="width:0%"></div></div>
              </div>
              <div class="catkey-card" id="cat-kpi-comer-v2">
                <div class="catkey-label">SALIDAS A COMER</div>
                <div class="catkey-monto">—</div>
                <div class="catkey-comp"><span class="catkey-prom">prom —</span><span class="delta">—</span></div>
                <div class="catkey-bar"><div class="catkey-fill" style="width:0%"></div></div>
              </div>
            </div>
          </div>

          <!-- Proyección Cuotas TC -->
          <div class="card" style="padding:0;overflow:hidden;margin-bottom:16px;">
            <div style="padding:14px 14px 0;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
              <span class="ppto-card-label" style="margin-bottom:0;">PROYECCIÓN CUOTAS TC</span>
              <span class="home-chart-titulo">Pagos futuros por tarjeta de crédito</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;padding:10px 14px 12px;" id="cuotas-home-kpis"></div>
            <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding:0 14px 4px;">
              <div id="cuotas-home-chart-wrap" style="min-width:600px;position:relative;height:220px;">
                <div id="cuotas-home-tooltip" style="position:absolute;background:#1a1a1a;color:#fff;padding:8px 11px;border-radius:8px;font-size:12px;pointer-events:none;display:none;line-height:1.7;white-space:nowrap;z-index:10;"></div>
                <canvas id="cuotasHomeChart" role="img" aria-label="Gráfico de proyección mensual de pagos en cuotas de tarjeta de crédito" style="display:block;"></canvas>
              </div>
            </div>
            <div id="cuotas-home-legend" style="display:flex;flex-wrap:wrap;gap:12px;padding:10px 14px 14px;"></div>
          </div>

          <!-- Evolución 12 meses -->
          <div class="card" style="padding:16px;margin-bottom:16px;">
            <div style="display:flex;gap:8px;margin-bottom:12px;flex-wrap:wrap;">
              <div style="flex:1;min-width:120px;position:relative;" id="wrap-evo-cat">
                <div style="font-size:10px;font-weight:500;color:#888;letter-spacing:.04em;margin-bottom:3px;">CATEGORÍA</div>
                <input id="inp-evo-cat" placeholder="Todas las categorías" autocomplete="off"
                  style="width:100%;padding:6px 28px 6px 10px;border:0.5px solid #e0e0e0;border-radius:8px;font-size:13px;font-family:inherit;background:#f5f5f5;color:#111;outline:none;box-sizing:border-box;" />
                <button id="clear-evo-cat" onclick="resetEvoCat()" style="display:none;position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;font-size:14px;color:#999;cursor:pointer;padding:0;margin-top:10px;">×</button>
                <div id="dd-evo-cat" style="display:none;position:absolute;top:calc(100% + 2px);left:0;right:0;background:#fff;border:0.5px solid #ddd;border-radius:8px;z-index:100;max-height:180px;overflow-y:auto;box-shadow:0 4px 12px rgba(0,0,0,0.1);"></div>
              </div>
              <div style="flex:1;min-width:120px;position:relative;" id="wrap-evo-sub">
                <div style="font-size:10px;font-weight:500;color:#888;letter-spacing:.04em;margin-bottom:3px;">SUBCATEGORÍA</div>
                <input id="inp-evo-sub" placeholder="Todas" autocomplete="off" disabled
                  style="width:100%;padding:6px 28px 6px 10px;border:0.5px solid #e0e0e0;border-radius:8px;font-size:13px;font-family:inherit;background:#f5f5f5;color:#111;outline:none;box-sizing:border-box;opacity:0.5;" />
                <button id="clear-evo-sub" onclick="resetEvoSub()" style="display:none;position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;font-size:14px;color:#999;cursor:pointer;padding:0;margin-top:10px;">×</button>
                <div id="dd-evo-sub" style="display:none;position:absolute;top:calc(100% + 2px);left:0;right:0;background:#fff;border:0.5px solid #ddd;border-radius:8px;z-index:100;max-height:180px;overflow-y:auto;box-shadow:0 4px 12px rgba(0,0,0,0.1);"></div>
              </div>
            </div>
            <div class="home-chart-header">
              <span class="home-chart-titulo">Gasto vs presupuesto</span>
            </div>
            <div style="position:relative;height:220px;">
              <canvas id="home-line-chart-canvas"></canvas>
            </div>
            <div id="home-chart-legend-new" style="display:flex;gap:14px;padding:8px 0 0;flex-wrap:wrap;"></div>
          </div>

          <div style="height:16px;"></div>
        </div>
    </div>

      </main>
    </div>
  </div>

</div>

<!-- OVERLAYS -->
<div class="overlay" id="ov-saldo-detalle">
  <div class="sheet">
    <div class="sheet-handle"></div>
    <div class="sheet-title">Saldo disponible</div>
    <div id="saldo-detalle-content"></div>
  </div>
</div>

<div class="overlay" id="ov-ajustes">
  <div class="sheet">
    <div class="sheet-handle"></div>
    <div class="sheet-title">Ajustes</div>
    <div class="ajustes-menu">
      <div class="ajustes-item" onclick="switchScreen('presupuesto');cerrar('ov-ajustes')">
        <span class="ajustes-icon">💰</span><span class="ajustes-label">Presupuesto</span><span class="ajustes-arrow">›</span>
      </div>
      <div class="ajustes-item" onclick="switchScreen('admin');cerrar('ov-ajustes')">
        <span class="ajustes-icon">🗂</span><span class="ajustes-label">Categorías y subcategorías</span><span class="ajustes-arrow">›</span>
      </div>
    </div>
  </div>
</div>

<div class="overlay" id="ov-cat">
  <div class="sheet">
    <div class="sheet-handle"></div>
    <div class="sheet-title" id="cat-sheet-title"></div>
    <div id="cat-ppto-resumen"></div>
    <div id="cat-sheet-items"></div>
  </div>
</div>

<div class="overlay" id="ov-gasto">
  <div class="sheet">
    <div class="sheet-handle"></div>

    <!-- Vista A: opciones del gasto -->
    <div id="ov-gasto-vista-a">
      <div class="modal-desc" id="g-desc"></div>
      <div class="modal-monto" id="g-monto"></div>
      <div class="modal-actions">
        <button class="btn-editar">✏️ Editar gasto</button>
        <button id="btn-distribuir-intl" onclick="abrirDistribuirIntl()" style="display:none;width:100%;padding:13px;background:#e8f0fe;color:var(--accent);border:0.5px solid #aac4f0;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit;margin-bottom:8px;align-items:center;justify-content:center;gap:8px;">🌐 Distribuir pago internacional</button>
        <button class="btn-dividir-accion" onclick="abrirVistaDividir()">⊕ Dividir gasto</button>
        <button class="btn-eliminar">🗑 Eliminar gasto</button>
        <button class="btn-cancelar" onclick="cerrar('ov-gasto')">Cancelar</button>
      </div>
    </div>

    <!-- Vista B: dividir gasto (oculta por defecto) -->
    <div id="ov-gasto-vista-b" style="display:none;">
      <div class="dividir-header">
        <span class="sheet-title" style="margin-bottom:0;">Dividir gasto</span>
        <button class="dividir-back-btn" onclick="cerrarVistaDividir()">‹ Volver</button>
      </div>

      <div class="dividir-total-card">
        <div>
          <div class="dividir-total-label">TOTAL A DISTRIBUIR</div>
          <div class="dividir-total-monto" id="div-total-monto">$0</div>
          <div class="dividir-total-sub" id="div-total-sub"></div>
        </div>
        <div style="text-align:right;">
          <div class="dividir-total-label">SIN ASIGNAR</div>
          <div style="font-size:15px;font-weight:500;" id="div-resto-disp">—</div>
        </div>
      </div>
      <div class="dividir-progress-bar">
        <div class="dividir-progress-fill" id="div-prog-fill" style="width:0%;background:var(--accent);"></div>
      </div>
      <div class="dividir-asig-row">
        <span style="color:#aaa;" id="div-asig-label">0% distribuido</span>
        <span style="font-weight:500;" id="div-asig-val"></span>
      </div>

      <div style="height:12px;"></div>

      <div class="dividir-section-hdr">
        <span class="dividir-section-label">PARTES</span>
        <button class="dividir-btn-add-part" onclick="divAddPart()">+ Agregar parte</button>
      </div>

      <div class="dividir-parts-scroll" id="div-parts-container"></div>

      <div class="dividir-status-badge dividir-st-under" id="div-status-badge">Ajusta los montos para continuar</div>
      <button class="btn-dividir-guardar deshabilitado" id="btn-div-guardar" onclick="ejecutarDividir()">Dividir gasto</button>
      <button class="btn-cancelar" onclick="cerrarVistaDividir()">Cancelar</button>
    </div>

  </div>
</div>

<div class="overlay" id="ov-picker">
  <div class="sheet">
    <div class="sheet-handle"></div>
    <div class="sheet-title">Seleccionar rango</div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:16px;">
      <button class="btn-preset-rango" onclick="presetRango('actual')">Mes actual</button>
      <button class="btn-preset-rango" onclick="presetRango('3m')">Últimos 3 meses</button>
      <button class="btn-preset-rango" onclick="presetRango('6m')">Últimos 6 meses</button>
      <button class="btn-preset-rango" onclick="presetRango('12m')">Último año</button>
    </div>
    <div class="picker-row">
      <div class="picker-col"><label>DESDE</label><select id="p-desde-mes"></select><select id="p-desde-anio"></select></div>
      <div class="picker-col"><label>HASTA</label><select id="p-hasta-mes"></select><select id="p-hasta-anio"></select></div>
    </div>
    <div class="picker-actions">
      <button class="btn-cancel-sm" onclick="cerrar('ov-picker')">Cancelar</button>
      <button class="btn-apply" id="picker-apply">Aplicar</button>
    </div>
  </div>
</div>

<div class="overlay" id="ov-nuevo">
  <div class="sheet ng-sheet">
    <div class="sheet-handle"></div>
    <div class="ng-header">
      <div class="ng-sheet-title">Nuevo gasto</div>
      <button class="ng-close-btn" onclick="cerrar('ov-nuevo');modoEdicion=false;gastoEditandoRowIndex=null;">✕</button>
    </div>

    <!-- Hidden legacy fields: save/edit logic reads these directly -->
    <input type="text" id="f-subcat" style="display:none;" autocomplete="off" />
    <input type="hidden" id="f-monto" />
    <div id="f-cat-badge" style="display:none;">
      <div class="cat-badge-row">
        <span style="font-size:12px;color:#999;">Categoría:</span>
        <span class="cat-badge" id="f-cat-nombre"></span>
        <span class="ie-badge" id="f-ie-badge"></span>
      </div>
    </div>
    <div class="suggestions" id="f-suggestions" style="display:none;"></div>
    <button id="btn-lista" style="display:none;" aria-hidden="true"></button>

    <!-- 1. Amount -->
    <div class="ng-amount-section">
      <div class="ng-amount-wrap" id="ng-amount-wrap">
        <div class="ng-amount-display empty" id="ng-amount-display">$0</div>
        <input class="ng-amount-input" id="ng-monto-input" type="tel" inputmode="numeric" autocomplete="off" />
      </div>
      <div style="position:relative;display:inline-flex;margin-top:10px;">
        <button class="ng-date-pill" id="ng-date-btn" type="button" style="margin-top:0;">
          <svg width="13" height="13" viewBox="0 0 16 16" fill="none"><rect x="1" y="2" width="14" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/><line x1="1" y1="6" x2="15" y2="6" stroke="currentColor" stroke-width="1.5"/><line x1="5" y1="1" x2="5" y2="4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><line x1="11" y1="1" x2="11" y2="4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
          <span id="ng-date-label">Hoy</span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <input type="date" id="f-fecha" style="position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;border:none;padding:0;" />
      </div>
    </div>

    <!-- intl-banner (kept for international card feature) -->
    <div id="intl-banner" style="display:none;"><div class="intl-banner"><span class="intl-banner-icon">🌐</span><span>Gasto internacional. Ingresa el monto total en CLP que pagarás y luego distribuye en ítems USD.</span></div></div>

    <!-- 2. Payment method carousel -->
    <div class="ng-section-label">MEDIO DE PAGO</div>
    <div class="ng-carousel" id="ng-banco-carousel">
      <button class="banco-btn ng-banco-card" data-banco="Tarjeta Crédito">
        <div class="banco-icon t ng-banco-icon">TC</div>
        <span class="banco-label ng-banco-name">Tarjeta Crédito</span>
      </button>
      <button class="banco-btn ng-banco-card" data-banco="Falabella">
        <div class="banco-icon f ng-banco-icon">F</div>
        <span class="banco-label ng-banco-name">Falabella</span>
      </button>
      <button class="banco-btn ng-banco-card" data-banco="Santander">
        <div class="banco-icon s ng-banco-icon">S</div>
        <span class="banco-label ng-banco-name">Santander</span>
      </button>
    </div>

    <!-- 3. Search + Category carousel -->
    <div style="position:relative;">
      <div class="ng-subcat-search-wrap" style="margin-bottom:0;">
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="6.5" cy="6.5" r="5" stroke="#BBB" stroke-width="1.5"/><line x1="10.5" y1="10.5" x2="14" y2="14" stroke="#BBB" stroke-width="1.5" stroke-linecap="round"/></svg>
        <input class="ng-subcat-search-input" id="ng-subcat-search-input" type="text" placeholder="Buscar categoría o subcategoría…" autocomplete="off" />
      </div>
      <div class="ng-search-results" id="ng-search-results"></div>
    </div>
    <div class="ng-section-label">CATEGORÍA</div>
    <div class="ng-carousel" id="ng-cat-carousel"><div style="color:#C4B5AD;font-size:13px;padding:8px 0;">Cargando...</div></div>

    <!-- 4. Subcategory carousel -->
    <div class="ng-section-label" id="ng-subcat-label" style="display:none;">SUBCATEGORÍA</div>
    <div class="ng-carousel" id="ng-subcat-carousel"></div>

    <!-- 5. Description -->
    <div class="ng-section-label">DESCRIPCIÓN</div>
    <textarea class="ng-desc" id="f-desc" placeholder="Ej: Compra semanal en Jumbo…"></textarea>

    <!-- 6. Devolución toggle switch -->
    <div class="ng-dev-row" id="dev-toggle">
      <div class="ng-toggle-track"><div class="ng-toggle-thumb"></div></div>
      <div class="ng-dev-text">
        <span class="ng-dev-label">Es una devolución</span>
        <span class="ng-dev-hint" id="dev-hint">marcar con X</span>
      </div>
    </div>

    <!-- 7. Save button -->
    <button class="ng-btn-guardar" id="btn-guardar">Guardar gasto</button>
    <button class="btn-guardar-sec" id="btn-guardar-sin-dist" style="display:none;" onclick="intlGuardarSinDist()">Guardar sin distribuir</button>
  </div>
</div>

<!-- TARJETA INTERNACIONAL: distribución USD -->
<div class="overlay" id="ov-intl-dist">
  <div class="sheet" style="max-height:90vh;overflow-y:auto;">
    <div class="sheet-handle"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 0 4px;">
      <div class="sheet-title" style="margin-bottom:0;">Distribuir en USD</div>
      <button style="width:28px;height:28px;border-radius:50%;background:#f5f5f5;border:none;cursor:pointer;font-size:14px;color:#666;" onclick="cerrar('ov-intl-dist')">✕</button>
    </div>
    <div id="intl-dist-subtitle" style="font-size:13px;color:#888;margin-bottom:4px;"></div>
    <div class="intl-tipo-cambio" id="intl-tipo-cambio-display"></div>
    <div id="intl-progress-wrap" style="margin-bottom:14px;"></div>
    <div id="intl-items-list"></div>
    <button class="intl-add-btn" onclick="intlAgregarItem()">＋ Agregar ítem</button>
    <button class="btn-guardar" id="btn-intl-resumen" style="margin-bottom:8px;opacity:0.4;" disabled onclick="intlVerResumen()">Ver resumen →</button>
    <button class="btn-guardar-sec" onclick="intlGuardarSinDist()">Guardar sin distribuir</button>
  </div>
</div>

<!-- TARJETA INTERNACIONAL: confirmación -->
<div class="overlay" id="ov-intl-confirm">
  <div class="sheet" style="max-height:90vh;overflow-y:auto;">
    <div class="sheet-handle"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 0 16px;">
      <div class="sheet-title" style="margin-bottom:0;">Resumen</div>
      <button style="width:28px;height:28px;border-radius:50%;background:#f5f5f5;border:none;cursor:pointer;font-size:14px;color:#666;" onclick="cerrar('ov-intl-confirm')">✕</button>
    </div>
    <div id="intl-confirm-list" style="margin-bottom:16px;"></div>
    <button class="btn-guardar" id="btn-intl-confirmar" style="margin-bottom:8px;" onclick="intlConfirmar()">Confirmar y guardar todos</button>
    <button class="btn-guardar-sec" onclick="cerrar('ov-intl-confirm')">Volver</button>
  </div>
</div>

<div class="alcance-overlay" id="ov-alcance">
  <div class="alcance-card">
    <div class="alcance-titulo">¿Aplicar cambio a...</div>
    <div class="alcance-sub" id="alcance-sub"></div>
    <div class="alcance-opciones">
      <button class="alcance-btn solo-mes" id="alcance-solo-mes"><span class="alcance-icon">📅</span><div class="alcance-txt"><span class="alcance-txt-main">Solo este mes</span><span class="alcance-txt-sub" id="alcance-mes-label"></span></div></button>
      <button class="alcance-btn todos" id="alcance-todos"><span class="alcance-icon">🔁</span><div class="alcance-txt"><span class="alcance-txt-main">Este y todos los meses futuros</span><span class="alcance-txt-sub">Actualiza el presupuesto base</span></div></button>
      <button class="alcance-btn cancelar-alcance" id="alcance-cancelar"><span class="alcance-icon">✕</span><div class="alcance-txt"><span class="alcance-txt-main">Cancelar</span></div></button>
    </div>
  </div>
</div>

<div class="alcance-overlay" id="ov-add-ppto">
  <div class="alcance-card" style="max-width:360px;">
    <div class="alcance-titulo">Agregar presupuesto</div>
    <div style="font-size:13px;color:var(--accent);font-weight:500;margin-bottom:14px;" id="add-ppto-cat-nombre"></div>
    <div style="display:flex;flex-direction:column;gap:10px;">
      <div>
        <label style="font-size:11px;color:#888;font-weight:500;letter-spacing:0.04em;display:block;margin-bottom:4px;">SUBCATEGORÍA</label>
        <select id="add-ppto-subcat" style="width:100%;padding:10px 12px;border:0.5px solid #ddd;border-radius:8px;font-size:14px;font-family:inherit;background:#fff;"></select>
      </div>
      <div>
        <label style="font-size:11px;color:#888;font-weight:500;letter-spacing:0.04em;display:block;margin-bottom:4px;">MONTO</label>
        <div class="monto-wrap"><span class="monto-prefix">$</span><input type="number" id="add-ppto-monto" placeholder="0" min="0" style="width:100%;padding:10px 12px 10px 28px;border:0.5px solid #ddd;border-radius:8px;font-size:15px;font-family:inherit;" /></div>
      </div>
      <div style="display:flex;gap:8px;">
        <div style="flex:1;">
          <label style="font-size:11px;color:#888;font-weight:500;letter-spacing:0.04em;display:block;margin-bottom:4px;">DESDE</label>
          <input type="month" id="add-ppto-desde" style="width:100%;padding:9px 10px;border:0.5px solid #ddd;border-radius:8px;font-size:14px;font-family:inherit;" />
        </div>
        <div style="flex:1;">
          <label style="font-size:11px;color:#888;font-weight:500;letter-spacing:0.04em;display:block;margin-bottom:4px;">HASTA</label>
          <input type="month" id="add-ppto-hasta" style="width:100%;padding:9px 10px;border:0.5px solid #ddd;border-radius:8px;font-size:14px;font-family:inherit;" />
        </div>
      </div>
    </div>
    <div style="display:flex;gap:8px;margin-top:18px;">
      <button onclick="cerrar('ov-add-ppto')" style="flex:1;padding:12px;background:#f5f5f5;color:#666;border:none;border-radius:10px;font-size:14px;cursor:pointer;font-family:inherit;">Cancelar</button>
      <button id="add-ppto-guardar" style="flex:2;padding:12px;background:var(--accent);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;">Guardar</button>
    </div>
  </div>
</div>

<!-- ADMIN: Editar subcategoría -->
<div class="overlay" id="ov-admin-edit">
  <div class="sheet">
    <div class="sheet-handle"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 0 16px;">
      <div class="sheet-title" id="admin-edit-title">Editar subcategoría</div>
      <button style="width:28px;height:28px;border-radius:50%;background:#f5f5f5;border:none;cursor:pointer;font-size:14px;color:#666;" onclick="cerrarAdminModal('ov-admin-edit')">✕</button>
    </div>
    <div class="admin-field">
      <label>CATEGORÍA</label>
      <select id="admin-edit-cat" style="padding:11px 12px;border:0.5px solid #ddd;border-radius:10px;font-size:15px;font-family:inherit;background:#fafafa;outline:none;width:100%;"></select>
    </div>
    <div class="admin-field">
      <label>NOMBRE</label>
      <input type="text" id="admin-edit-nombre" placeholder="Nombre de la subcategoría" />
    </div>
    <div class="admin-field">
      <label>MÉTODO DE PAGO</label>
      <div class="admin-toggle-group" id="admin-edit-modo">
        <div class="admin-toggle-opt" data-modo="Transferencia" onclick="selAdminModo(this,'Transferencia')">
          <span class="t-icon">🏦</span><span>Transferencia</span>
        </div>
        <div class="admin-toggle-opt" data-modo="Tarjeta Crédito" onclick="selAdminModo(this,'Tarjeta Crédito')">
          <span class="t-icon">💳</span><span>Tarjeta Crédito</span>
        </div>
        <div class="admin-toggle-opt active-vacio" data-modo="" onclick="selAdminModo(this,'')">
          <span class="t-icon" style="font-size:14px;color:#bbb;">—</span><span>Sin definir</span>
        </div>
      </div>
    </div>
    <div class="admin-field">
      <label>TIPO</label>
      <div class="admin-ie-group" id="admin-edit-ie">
        <div class="admin-ie-opt active-e" data-ie="E" onclick="selAdminIE(this,'E')">Egreso</div>
        <div class="admin-ie-opt" data-ie="I" onclick="selAdminIE(this,'I')">Ingreso</div>
      </div>
    </div>
    <div class="admin-field">
      <label>ESTADO</label>
      <div class="admin-ie-group" id="admin-edit-estado">
        <div class="admin-ie-opt" data-estado="Activo" onclick="selAdminEstado(this,'Activo')">Activo</div>
        <div class="admin-ie-opt" data-estado="Oculto" onclick="selAdminEstado(this,'Oculto')">Oculto</div>
      </div>
    </div>
    <div class="admin-field">
      <label>FRECUENCIA DE PAGO</label>
      <div class="admin-ie-group" id="admin-edit-frecuencia">
        <div class="admin-ie-opt" data-frecuencia="Mensual" onclick="selAdminFrecuencia(this,'Mensual')">Mensual</div>
        <div class="admin-ie-opt" data-frecuencia="Variable" onclick="selAdminFrecuencia(this,'Variable')">Variable</div>
      </div>
    </div>
    <button class="btn-admin-guardar" onclick="guardarEditSubcat()">Guardar cambios</button>
    <button class="btn-admin-eliminar" onclick="eliminarSubcatAdmin(adminEditandoSubcat?.oldSub)">Eliminar subcategoría</button>
  </div>
</div>

<!-- ADMIN: Agregar subcategoría -->
<div class="overlay" id="ov-admin-add">
  <div class="sheet">
    <div class="sheet-handle"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 0 16px;">
      <div class="sheet-title" id="admin-add-title">Agregar subcategoría</div>
      <button style="width:28px;height:28px;border-radius:50%;background:#f5f5f5;border:none;cursor:pointer;font-size:14px;color:#666;" onclick="cerrarAdminModal('ov-admin-add')">✕</button>
    </div>
    <div class="admin-field">
      <label>CATEGORÍA</label>
      <select id="admin-add-cat" style="padding:11px 12px;border:0.5px solid #ddd;border-radius:10px;font-size:15px;color:#111;font-family:inherit;background:#fafafa;outline:none;width:100%;appearance:none;-webkit-appearance:none;"></select>
    </div>
    <div class="admin-field">
      <label>NOMBRE</label>
      <input type="text" id="admin-add-nombre" placeholder="Ej: Agua Maihue" />
    </div>
    <div class="admin-field">
      <label>MÉTODO DE PAGO</label>
      <div class="admin-toggle-group" id="admin-add-modo">
        <div class="admin-toggle-opt" data-modo="Transferencia" onclick="selAdminModo(this,'Transferencia')">
          <span class="t-icon">🏦</span><span>Transferencia</span>
        </div>
        <div class="admin-toggle-opt" data-modo="Tarjeta Crédito" onclick="selAdminModo(this,'Tarjeta Crédito')">
          <span class="t-icon">💳</span><span>Tarjeta Crédito</span>
        </div>
        <div class="admin-toggle-opt active-vacio" data-modo="" onclick="selAdminModo(this,'')">
          <span class="t-icon" style="font-size:14px;color:#bbb;">—</span><span>Sin definir</span>
        </div>
      </div>
    </div>
    <div class="admin-field">
      <label>TIPO</label>
      <div class="admin-ie-group" id="admin-add-ie">
        <div class="admin-ie-opt active-e" data-ie="E" onclick="selAdminIE(this,'E')">Egreso</div>
        <div class="admin-ie-opt" data-ie="I" onclick="selAdminIE(this,'I')">Ingreso</div>
      </div>
    </div>
    <div class="admin-field">
      <label>ESTADO</label>
      <div class="admin-ie-group" id="admin-add-estado">
        <div class="admin-ie-opt" data-estado="Activo" onclick="selAdminEstado(this,'Activo')">Activo</div>
        <div class="admin-ie-opt" data-estado="Oculto" onclick="selAdminEstado(this,'Oculto')">Oculto</div>
      </div>
    </div>
    <div class="admin-field">
      <label>FRECUENCIA DE PAGO</label>
      <div class="admin-ie-group" id="admin-add-frecuencia">
        <div class="admin-ie-opt" data-frecuencia="Mensual" onclick="selAdminFrecuencia(this,'Mensual')">Mensual</div>
        <div class="admin-ie-opt" data-frecuencia="Variable" onclick="selAdminFrecuencia(this,'Variable')">Variable</div>
      </div>
    </div>
    <button class="btn-admin-guardar" onclick="guardarNuevaSubcat()">Agregar subcategoría</button>
  </div>
</div>

<!-- ADMIN: Confirmar eliminación subcategoría -->
<div class="overlay" id="ov-admin-del">
  <div class="sheet">
    <div class="sheet-handle"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 0 14px;">
      <div class="sheet-title">Eliminar subcategoría</div>
      <button style="width:28px;height:28px;border-radius:50%;background:#f5f5f5;border:none;cursor:pointer;font-size:14px;color:#666;" onclick="cerrarAdminModal('ov-admin-del')">✕</button>
    </div>
    <div class="admin-del-warning">
      <div class="admin-del-warning-title" id="del-subcat-nombre">Subcategoría</div>
      <div class="admin-del-warning-sub">Gastos registrados en esta subcategoría:</div>
      <div class="admin-del-count" id="del-gastos-count">0 gastos</div>
      <div class="admin-del-warning-sub" id="del-sin-gastos" style="display:none;">Esta subcategoría no tiene gastos registrados. Se eliminará directamente.</div>
    </div>
    <div id="del-mover-section">
      <div class="admin-field">
        <label>MOVER GASTOS A</label>
        <div style="font-size:12px;color:#888;margin-bottom:6px;" id="del-mover-hint">Selecciona la subcategoría que recibirá estos gastos antes de eliminar</div>
        <select class="admin-del-select" id="del-subcat-destino">
          <option value="">— Seleccionar subcategoría destino —</option>
        </select>
      </div>
    </div>
    <button class="btn-admin-confirmar-del" id="del-confirmar-btn" onclick="confirmarEliminarSubcat()">Mover y eliminar</button>
    <button class="btn-admin-cancelar" onclick="cerrarAdminModal('ov-admin-del')">Cancelar</button>
  </div>
</div>

<!-- ADMIN: Renombrar categoría -->
<div class="overlay" id="ov-admin-rename">
  <div class="sheet">
    <div class="sheet-handle"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 0 16px;">
      <div class="sheet-title" id="admin-rename-titulo">Renombrar categoría</div>
      <button style="width:28px;height:28px;border-radius:50%;background:#f5f5f5;border:none;cursor:pointer;font-size:14px;color:#666;" onclick="cerrarAdminModal('ov-admin-rename')">✕</button>
    </div>
    <div class="admin-field">
      <label>NOMBRE DE LA CATEGORÍA</label>
      <input type="text" id="admin-rename-input" placeholder="Nombre de la categoría" />
    </div>
    <button class="btn-admin-guardar" onclick="guardarRenombrarCat()">Guardar nombre</button>
  </div>
</div>

<!-- DIVIDIR: selector de subcategoría -->
<div class="overlay" id="ov-div-subcat">
  <div class="sheet">
    <div class="sheet-handle"></div>
    <div class="sheet-title">Seleccionar subcategoría</div>
    <div style="padding:0 0 10px;">
      <div style="position:relative;">
        <span style="position:absolute;left:11px;top:50%;transform:translateY(-50%);font-size:14px;color:#bbb;">🔍</span>
        <input id="div-subcat-search" type="text" placeholder="Buscar subcategoría..."
          style="width:100%;padding:9px 11px 9px 34px;border:0.5px solid #e0e0e0;border-radius:9px;font-size:14px;font-family:inherit;background:#f5f5f5;box-sizing:border-box;"
          oninput="divFiltrarSubcat(this.value)" />
      </div>
    </div>
    <div id="div-subcat-options" style="max-height:260px;overflow-y:auto;"></div>
  </div>
</div>

<!-- CUOTAS: nueva compra -->
<div class="overlay" id="ov-nueva-cuota">
  <div class="sheet">
    <div class="sheet-handle"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 0 16px;">
      <div class="sheet-title" style="margin-bottom:0;">Nueva compra en cuotas</div>
      <button style="width:28px;height:28px;border-radius:50%;background:#f5f5f5;border:none;cursor:pointer;font-size:14px;color:#666;" onclick="cerrar('ov-nueva-cuota')">✕</button>
    </div>
    <div class="form-body">
      <div class="field"><label>ÍTEM / DESCRIPCIÓN</label><input type="text" id="cuota-item" placeholder="Ej: Compra de Televisor" /></div>
      <div class="field"><label>FECHA DE COMPRA</label><input type="date" id="cuota-fecha-compra" /></div>
      <div class="field">
        <label>TARJETA</label>
        <div class="cuotas-tarjeta-group">
          <button class="cuotas-tarjeta-btn active-gold" data-tarjeta="Gold" onclick="selCuotaTarjeta(this,'Gold')">
            <div class="cuotas-tarjeta-icon gold">G</div>
            <span style="font-size:12px;color:#f57f17;font-weight:500;">Gold</span>
          </button>
          <button class="cuotas-tarjeta-btn" data-tarjeta="Limited Visa" onclick="selCuotaTarjeta(this,'Limited Visa')">
            <div class="cuotas-tarjeta-icon visa">LV</div>
            <span style="font-size:12px;color:#666;">Limited Visa</span>
          </button>
        </div>
      </div>
      <div class="field"><label>MONTO TOTAL DE LA COMPRA</label><div class="monto-wrap"><span class="monto-prefix">$</span><input type="number" id="cuota-monto-total" placeholder="0" min="0" /></div></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <div class="field"><label>N° DE CUOTAS</label><input type="number" id="cuota-num-cuotas" placeholder="12" min="1" oninput="actualizarPreviewCuota()" /></div>
        <div class="field"><label>VALOR CUOTA</label><div class="monto-wrap"><span class="monto-prefix">$</span><input type="number" id="cuota-valor-cuota" placeholder="0" min="0" oninput="actualizarPreviewCuota()" /></div></div>
      </div>
      <div id="cuota-preview" style="display:none;background:#e8f0fe;border-radius:10px;padding:10px 14px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
          <span style="font-size:12px;color:var(--accent);">Total en cuotas</span>
          <span style="font-size:14px;font-weight:600;color:var(--accent);" id="cuota-preview-total"></span>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12px;color:#888;">Diferencia con precio contado</span>
          <span style="font-size:12px;font-weight:500;" id="cuota-preview-diff"></span>
        </div>
      </div>
      <button class="btn-guardar" id="btn-guardar-cuota" onclick="guardarNuevaCuota()">Registrar compra en cuotas</button>
    </div>
  </div>
</div>

<!-- CUOTAS: confirmar pago -->
<div class="alcance-overlay" id="ov-pagar-cuota">
  <div class="alcance-card" style="max-width:360px;">
    <div class="alcance-titulo">Confirmar pago de cuota</div>
    <div style="background:#f5f5f5;border-radius:10px;padding:12px 14px;margin-bottom:16px;margin-top:6px;" id="pagar-cuota-detalle"></div>
    <div class="field" style="margin-bottom:16px;">
      <label>FECHA DEL PAGO</label>
      <input type="date" id="pagar-cuota-fecha" />
    </div>
    <p style="font-size:13px;color:#888;line-height:1.5;margin-bottom:18px;">Se creará un registro en Detalle con subcategoría "TC - Pagos en Cuotas". El contador de cuotas se actualizará automáticamente.</p>
    <div style="display:flex;flex-direction:column;gap:8px;">
      <button style="width:100%;padding:13px;background:var(--accent);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;" onclick="confirmarPagarCuota()">✓ Registrar pago</button>
      <button style="width:100%;padding:13px;background:#f5f5f5;color:#555;border:none;border-radius:10px;font-size:15px;cursor:pointer;font-family:inherit;" onclick="cerrar('ov-pagar-cuota')">Cancelar</button>
    </div>
  </div>
</div>

<!-- POST-GASTO: opciones -->
<div class="alcance-overlay" id="ov-post-gasto">
  <div class="alcance-card" style="max-width:360px;">
    <div class="alcance-titulo">Gasto guardado ✓</div>
    <div class="alcance-sub" id="post-gasto-desc" style="margin-bottom:18px;"></div>
    <div class="alcance-opciones">
      <button class="alcance-btn" id="post-btn-detalle"
        style="background:#e8f0fe;color:var(--accent);"
        onclick="postGastoDetalle()">
        <span class="alcance-icon">📋</span>
        <div class="alcance-txt">
          <span class="alcance-txt-main">Ir al detalle</span>
          <span class="alcance-txt-sub">Ver todos los gastos del período</span>
        </div>
      </button>
      <button class="alcance-btn" id="post-btn-dividir"
        style="background:#f5f5f5;color:#111;"
        onclick="postGastoDividir()">
        <span class="alcance-icon">⊕</span>
        <div class="alcance-txt">
          <span class="alcance-txt-main">Dividir gasto</span>
          <span class="alcance-txt-sub">Distribuir en subcategorías</span>
        </div>
      </button>
      <button class="alcance-btn todos" onclick="postGastoNuevo()">
        <span class="alcance-icon">+</span>
        <div class="alcance-txt">
          <span class="alcance-txt-main">Ingresar otro gasto</span>
          <span class="alcance-txt-sub">Abrir formulario nuevamente</span>
        </div>
      </button>
    </div>
  </div>
</div>

<!-- CUADRATURA: ingresar saldo -->
<div class="alcance-overlay" id="ov-cuadratura">
  <div class="alcance-card" style="max-width:360px;width:100%;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
      <div class="alcance-titulo" style="margin:0;" id="cuad-titulo">Cuadrar saldo</div>
      <button style="width:28px;height:28px;border-radius:50%;background:#f5f5f5;border:none;cursor:pointer;font-size:14px;color:#666;" onclick="cerrar('ov-cuadratura')">✕</button>
    </div>
    <div style="font-size:13px;color:#888;margin-bottom:16px;" id="cuad-sub">Ingresa el saldo que figura en tu app del banco</div>

    <div style="background:#f5f5f5;border-radius:8px;padding:9px 12px;display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;">
      <span style="font-size:12px;color:#888;">Saldo en la app</span>
      <span style="font-size:14px;font-weight:500;color:#111;" id="cuad-monto-app">—</span>
    </div>

    <div style="font-size:11px;color:#888;font-weight:500;letter-spacing:0.04em;margin-bottom:5px;">SALDO REAL EN EL BANCO</div>
    <div class="monto-wrap" style="margin-bottom:16px;">
      <span class="monto-prefix">$</span>
      <input type="number" id="cuad-monto-banco" placeholder="0" min="0" style="width:100%;padding:10px 12px 10px 28px;border:0.5px solid #ddd;border-radius:8px;font-size:15px;font-family:inherit;" />
    </div>

    <button style="width:100%;padding:13px;background:var(--accent);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit;margin-bottom:8px;" onclick="ejecutarComparacion()">Comparar saldos</button>
    <button style="width:100%;padding:12px;background:#f5f5f5;color:#666;border:none;border-radius:10px;font-size:14px;cursor:pointer;font-family:inherit;" onclick="cerrar('ov-cuadratura')">Cancelar</button>
  </div>
</div>

<!-- CUADRATURA: resultado -->
<div class="alcance-overlay" id="ov-cuadratura-resultado">
  <div class="alcance-card" style="max-width:360px;width:100%;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;">
      <div class="alcance-titulo" style="margin:0;">Resultado cuadratura</div>
      <button style="width:28px;height:28px;border-radius:50%;background:#f5f5f5;border:none;cursor:pointer;font-size:14px;color:#666;" onclick="cerrarResultadoCuadratura()">✕</button>
    </div>
    <div id="cuad-resultado-content"></div>
  </div>
</div>

<!-- CUADRATURA: confirmar ajuste -->
<div class="alcance-overlay" id="ov-cuadratura-ajuste">
  <div class="alcance-card" style="max-width:360px;width:100%;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:6px;">
      <div class="alcance-titulo" style="margin:0;">Confirmar ajuste</div>
      <button style="width:28px;height:28px;border-radius:50%;background:#f5f5f5;border:none;cursor:pointer;font-size:14px;color:#666;" onclick="cerrar('ov-cuadratura-ajuste')">✕</button>
    </div>
    <div style="font-size:13px;color:#888;margin-bottom:14px;">Se creará el siguiente registro en Detalle</div>
    <div class="cuad-preview-card" id="cuad-ajuste-preview"></div>
    <button style="width:100%;padding:13px;background:var(--accent);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit;margin-bottom:8px;" onclick="confirmarAjusteCuadratura()">Confirmar ajuste</button>
    <button style="width:100%;padding:12px;background:#f5f5f5;color:#666;border:none;border-radius:10px;font-size:14px;cursor:pointer;font-family:inherit;" onclick="cerrar('ov-cuadratura-ajuste')">Volver</button>
  </div>
</div>

<div class="overlay" id="ov-cambio-subcat">
  <div class="sheet">
    <div class="sheet-handle"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 0 4px;">
      <div class="sheet-title" style="margin-bottom:0;">Cambiar subcategoría</div>
      <button style="width:28px;height:28px;border-radius:50%;background:#f5f5f5;border:none;cursor:pointer;font-size:14px;color:#666;" onclick="cerrar('ov-cambio-subcat')">✕</button>
    </div>
    <div id="cambio-subcat-sub" style="font-size:13px;color:#888;margin-bottom:14px;"></div>
    <div style="position:relative;margin-bottom:10px;">
      <span style="position:absolute;left:11px;top:50%;transform:translateY(-50%);font-size:14px;color:#bbb;">🔍</span>
      <input id="input-cambio-subcat" type="text" placeholder="Buscar subcategoría..."
        style="width:100%;padding:9px 11px 9px 34px;border:0.5px solid #e0e0e0;border-radius:9px;font-size:14px;font-family:inherit;background:#f5f5f5;box-sizing:border-box;"
        oninput="filtrarSubcatsCambio(this.value)" />
    </div>
    <div id="cambio-subcat-options" style="max-height:320px;overflow-y:auto;"></div>
  </div>
</div>

<div class="overlay" id="ov-cambio-fecha">
  <div class="sheet">
    <div class="sheet-handle"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 0 4px;">
      <div class="sheet-title" style="margin-bottom:0;">Cambiar fecha</div>
      <button style="width:28px;height:28px;border-radius:50%;background:#f5f5f5;border:none;cursor:pointer;font-size:14px;color:#666;" onclick="cerrar('ov-cambio-fecha')">✕</button>
    </div>
    <div id="cambio-fecha-sub" style="font-size:13px;color:#888;margin-bottom:14px;"></div>
    <div id="cambio-fecha-preview" style="background:#f5f5f5;border-radius:10px;padding:10px 12px;margin-bottom:14px;"></div>
    <div style="font-size:11px;font-weight:500;color:#888;letter-spacing:0.04em;margin-bottom:6px;">NUEVA FECHA</div>
    <input type="date" id="input-nueva-fecha"
      style="width:100%;padding:11px 12px;border:0.5px solid #ddd;border-radius:10px;font-size:15px;font-family:inherit;margin-bottom:12px;box-sizing:border-box;"
      oninput="actualizarAvisoCambioFecha()" />
    <div id="aviso-cambio-fecha"
      style="background:#fff8e1;border:0.5px solid #ffe082;border-radius:8px;padding:10px 12px;font-size:12px;color:#854F0B;line-height:1.5;margin-bottom:14px;">
      Todos los gastos seleccionados quedarán con fecha <strong id="fecha-display-label"></strong>.
      Esta acción afecta el mes al que se imputan en el resumen.
    </div>
    <button style="width:100%;padding:13px;background:var(--accent);color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit;margin-bottom:8px;" onclick="confirmarCambioFecha()">Confirmar cambio de fecha</button>
    <button style="width:100%;padding:12px;background:#f5f5f5;color:#666;border:none;border-radius:12px;font-size:14px;cursor:pointer;font-family:inherit;" onclick="cerrar('ov-cambio-fecha')">Cancelar</button>
  </div>
</div>

<div class="alcance-overlay" id="ov-duplicado-mensual">
  <div class="alcance-card" style="max-width:360px;width:100%;">
    <div style="font-size:22px;text-align:center;margin-bottom:10px;">⚠️</div>
    <div class="alcance-titulo" style="text-align:center;">Pago ya registrado</div>
    <div id="duplicado-detalle" style="background:#f5f5f5;border-radius:10px;padding:12px 14px;margin:12px 0;font-size:13px;line-height:1.6;color:#333;"></div>
    <div style="font-size:13px;color:#888;margin-bottom:16px;line-height:1.5;" id="duplicado-sugerencia"></div>
    <div style="display:flex;flex-direction:column;gap:8px;">
      <button id="btn-duplicado-mover" style="width:100%;padding:13px;background:var(--accent);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit;"></button>
      <button onclick="duplicadoGuardarIgual()" style="width:100%;padding:13px;background:#f5f5f5;color:#555;border:none;border-radius:10px;font-size:15px;cursor:pointer;font-family:inherit;">Guardar igual con fecha de hoy</button>
      <button onclick="cerrar('ov-duplicado-mensual')" style="width:100%;padding:12px;background:#fff;color:#999;border:0.5px solid #e0e0e0;border-radius:10px;font-size:14px;cursor:pointer;font-family:inherit;">Cancelar</button>
    </div>
  </div>
</div>

<!-- TC DETALLE -->
<div class="overlay" id="ov-tc-detalle">
  <div class="sheet">
    <div class="sheet-handle"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 0 12px;">
      <div class="sheet-title" style="margin-bottom:0;">Detalle Tarjeta de Crédito</div>
      <button style="width:28px;height:28px;border-radius:50%;background:#f5f5f5;border:none;cursor:pointer;font-size:14px;color:#666;" onclick="cerrar('ov-tc-detalle')">✕</button>
    </div>
    <div style="margin-bottom:14px;">
      <span style="background:#fff8e1;color:#f57f17;padding:3px 9px;border-radius:10px;font-size:11px;font-weight:500;">Tarjeta WorldMember Limited</span>
    </div>
    <div id="tc-detalle-content"></div>
  </div>
</div>

<div class="overlay" id="ov-info-subcat">
  <div class="sheet">
    <div class="sheet-handle"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 0 14px;">
      <div class="sheet-title" style="margin-bottom:0;">Gasto histórico</div>
      <button style="width:28px;height:28px;border-radius:50%;background:#f5f5f5;border:none;cursor:pointer;font-size:14px;color:#666;" onclick="cerrar('ov-info-subcat')">✕</button>
    </div>
    <div id="info-subcat-content"></div>
  </div>
</div>

<div class="toast" id="toast"></div>
<div id="loading-overlay" style="display:none;position:fixed;inset:0;background:rgba(255,255,255,0.92);z-index:500;flex-direction:column;align-items:center;justify-content:center;gap:12px;">
  <div style="width:36px;height:36px;border:3px solid #e0e0e0;border-top-color:var(--accent);border-radius:50%;animation:spin 0.8s linear infinite;"></div>
  <div id="loading-text" style="font-size:14px;color:#666;font-family:-apple-system,sans-serif;">Cargando datos...</div>
</div>
<div id="error-overlay" style="display:none;position:fixed;inset:0;background:var(--card);z-index:500;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;text-align:center;">
  <div style="font-size:40px;">⚠️</div>
  <div id="error-text" style="font-size:15px;color:var(--error);font-weight:500;line-height:1.6;max-width:340px;font-family:-apple-system,sans-serif;white-space:pre-line;"></div>
  <button onclick="cargarDatos()" style="padding:12px 28px;background:var(--accent);color:#fff;border:none;border-radius:10px;font-size:15px;cursor:pointer;font-family:inherit;">Reintentar</button>
</div>

<!-- CALCULADORA POPUP -->
<div id="calc-popup-overlay" onclick="calcCerrarSiOverlay(event)"
  style="display:none;position:fixed;inset:0;z-index:500;background:rgba(0,0,0,0.25);"></div>

<div id="calc-popup" style="display:none;position:fixed;z-index:501;
  background:var(--card);border-radius:20px;overflow:hidden;
  box-shadow:0 8px 32px rgba(0,0,0,0.22);width:260px;touch-action:none;">
  <div id="calc-popup-header"
    style="display:flex;align-items:center;justify-content:space-between;
           padding:10px 14px 8px;border-bottom:0.5px solid var(--border);
           cursor:grab;user-select:none;">
    <span id="calc-popup-label" style="font-size:11px;color:var(--muted);">Monto → parte 1</span>
    <button onclick="calcCerrar()"
      style="background:none;border:none;cursor:pointer;font-size:16px;color:var(--muted);padding:0;line-height:1;">✕</button>
  </div>
  <div style="background:#1a1a1a;padding:10px 14px;">
    <div id="calc-expr"
      style="font-size:12px;color:#aaa;text-align:right;min-height:16px;word-break:break-all;">&nbsp;</div>
    <div id="calc-result"
      style="font-size:30px;font-weight:400;color:#fff;text-align:right;letter-spacing:-0.01em;
             font-family:'Geist',-apple-system,sans-serif;">$0</div>
  </div>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);">
    <button class="calc-key calc-key-light" onclick="calcTecla('AC')">AC</button>
    <button class="calc-key calc-key-light" onclick="calcTecla('+/-')">+/-</button>
    <button class="calc-key calc-key-light" onclick="calcTecla('⌫')">⌫</button>
    <button class="calc-key calc-key-op"   onclick="calcTecla('÷')">÷</button>
    <button class="calc-key" onclick="calcTecla('7')">7</button>
    <button class="calc-key" onclick="calcTecla('8')">8</button>
    <button class="calc-key" onclick="calcTecla('9')">9</button>
    <button class="calc-key calc-key-op" onclick="calcTecla('×')">×</button>
    <button class="calc-key" onclick="calcTecla('4')">4</button>
    <button class="calc-key" onclick="calcTecla('5')">5</button>
    <button class="calc-key" onclick="calcTecla('6')">6</button>
    <button class="calc-key calc-key-op" onclick="calcTecla('−')">−</button>
    <button class="calc-key" onclick="calcTecla('1')">1</button>
    <button class="calc-key" onclick="calcTecla('2')">2</button>
    <button class="calc-key" onclick="calcTecla('3')">3</button>
    <button class="calc-key calc-key-op" onclick="calcTecla('+')">+</button>
    <button class="calc-key" style="grid-column:span 2" onclick="calcTecla('0')">0</button>
    <button class="calc-key" onclick="calcTecla('.')">.</button>
    <button class="calc-key calc-key-ok" onclick="calcTecla('OK')">OK →</button>
  </div>
</div>

  `

  const jsContent_UNUSED = `
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
window.abrirGasto=abrirGasto;
window.toggleAdminCat=toggleAdminCat;
window.eliminarSubcat=eliminarSubcat;
window.agregarSubcat=agregarSubcat;
window.aplicarAlcance=aplicarAlcance;

const meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const mesesC=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const catColores={'Hogar':'#1a73e8','Supermercado':'#2e7d32','Auto':'#e65100','Banco':'#c62828','Salud':'#6a1b9a','Cuentas':'#00695c','Entretenimiento':'#f57f17','Mall':'#bf360c','Ingresos':'#2e7d32'};
const catBgs={'Hogar':'#e8f0fe','Supermercado':'#e8f5e9','Auto':'#fff3e0','Banco':'#fce4ec','Salud':'#f3e5f5','Cuentas':'#e0f7fa','Entretenimiento':'#fff8e1','Mall':'#fbe9e7','Ingresos':'#e8f5e9'};

let subcats=[];

let pptoData={
  'Hogar - Arriendo':{monto:650000,fijo:true},'Supermercado - Compra Mensual':{monto:280000,fijo:false},
  'Supermercado - Feria':{monto:70000,fijo:false},'Auto - Pago de Cuota':{monto:130000,fijo:true},
  'Auto - Pago de Seguro':{monto:55000,fijo:true},'Banco - Pago de CAE':{monto:130000,fijo:true},
  'Banco - Mantención Plan':{monto:15000,fijo:true},'Salud - Farmacia':{monto:30000,fijo:false},
  'Salud - Médico':{monto:50000,fijo:false},'Cuentas - Bencina':{monto:35000,fijo:false},
  'Cuentas - Luz':{monto:35000,fijo:false},'Salidas a Comer':{monto:60000,fijo:false},'Mall - Familia':{monto:50000,fijo:false},
};

let dashData={};
let detalleData={};
// Estado
let totalFilasGastos=0;
let dashMes=3,dashAnio=2026,pptoPanelMes=3,pptoPanelAnio=2026;
let rangoDesde={mes:3,anio:2026},rangoHasta={mes:3,anio:2026};
let listaOpen=false,alcancePendiente=null;

function fmt(n){return '$'+Math.round(Math.abs(n)).toLocaleString('es-CL');}
function getStatus(p){return p>=100?'over':p>=80?'warning':'ok';}
function cerrar(id){document.getElementById(id).classList.remove('open');}

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
function mostrarError(msg){
  const er=document.getElementById('error-overlay');
  if(er){er.style.display='flex';document.getElementById('error-text').textContent=msg;}
  const el=document.getElementById('loading-overlay');if(el)el.style.display='none';
}

// ── FECHA ────────────────────────────────────────────────────
function normalizarFecha(val){
  if(!val)return '';
  const s=String(val).trim();
  if(/^\d{4}-\d{2}-\d{2}$/.test(s))return s;
  if(/^\d{1,2}\\/\d{1,2}\\/\d{4}$/.test(s)){const[d,m,y]=s.split('/');return y+'-'+m.padStart(2,'0')+'-'+d.padStart(2,'0');}
  if(!isNaN(s)&&s!==''){const d=new Date(Math.round((parseFloat(s)-25569)*86400000));return d.toISOString().slice(0,10);}
  return s;
}
function calcMesAnio(fecha){if(!fecha||fecha.length<7)return '';const[y,m]=fecha.split('-');return m+'-'+y;}

// ── CARGA DE DATOS ───────────────────────────────────────────
async function cargarDatos(){
  mostrarLoading('Cargando datos...');
  try{
    const[paramRes,gastosRes]=await Promise.all([fetch('/api/parametros'),fetch('/api/gastos')]);
    if(!paramRes.ok)throw new Error('Error al cargar parámetros ('+paramRes.status+')');
    if(!gastosRes.ok)throw new Error('Error al cargar gastos ('+gastosRes.status+')');
    const paramRows=await paramRes.json();
    const gastosRows=await gastosRes.json();

    subcats=paramRows.slice(1).filter(r=>r&&r[0]).map(r=>({sub:r[0],cat:r[1]||'',ie:r[2]||'E'}));

    detalleData={};
    totalFilasGastos=Math.max(0,(gastosRows.length||1)-1);
    gastosRows.slice(1).forEach((row,idx)=>{
      if(!row||!row[0])return;
      const fecha=normalizarFecha(row[0]);
      const mesAnio=row[1]||calcMesAnio(fecha);
      if(!mesAnio)return;
      const mv=parseFloat(row[9]),mr=parseFloat(row[8]);
      const monto=Math.abs(!isNaN(mv)&&mv!==0?mv:(!isNaN(mr)?mr:0));
      const g={id:idx+1,rowIndex:idx+2,fecha,sub:row[2]||'',cat:row[3]||'',ie:row[4]||'E',
               banco:row[5]||'',dev:(row[6]||'')==='X',desc:row[7]||'',monto};
      if(!detalleData[mesAnio])detalleData[mesAnio]=[];
      detalleData[mesAnio].push(g);
    });

    dashData=computarDashData();
    ocultarLoading();
    renderDashboard();
  }catch(e){
    mostrarError('No se pudo conectar con Google Sheets.\n'+e.message);
  }
}

function computarDashData(){
  const result={};
  for(const[key,gastos]of Object.entries(detalleData)){
    const ingresos=gastos.filter(g=>g.ie==='I').reduce((s,g)=>s+g.monto,0);
    const catMap={};
    gastos.filter(g=>g.ie==='E').forEach(g=>{
      if(!catMap[g.cat])catMap[g.cat]={nombre:g.cat,monto:0,ppto:0,gastos:[]};
      catMap[g.cat].monto+=g.monto;
      const fd=g.fecha.length>=10?g.fecha.slice(8,10)+'/'+g.fecha.slice(5,7):g.fecha;
      catMap[g.cat].gastos.push({desc:g.desc,fecha:fd,monto:g.monto});
    });
    Object.values(catMap).forEach(c=>{
      c.ppto=subcats.filter(s=>s.cat===c.nombre&&s.ie==='E')
        .reduce((s,sc)=>s+(pptoData[sc.sub]?pptoData[sc.sub].monto:0),0);
    });
    const totalPpto=Object.values(pptoData).reduce((s,p)=>s+p.monto,0);
    result[key]={ingresos,presupuesto:totalPpto,categorias:Object.values(catMap)};
  }
  return result;
}


// ── DRAWER ──────────────────────────────────────────────
document.getElementById('btn-hamburger').addEventListener('click',()=>{
  document.getElementById('drawer').classList.add('open');
  document.getElementById('drawer-overlay').classList.add('open');
});
function cerrarDrawer(){
  document.getElementById('drawer').classList.remove('open');
  document.getElementById('drawer-overlay').classList.remove('open');
}

// ── NAVEGACIÓN ──────────────────────────────────────────
const screenTitles={dashboard:'Resumen',detalle:'Detalle',presupuesto:'Presupuestos',admin:'Categorías'};
const screenToPath={home:'/gastos',dashboard:'/gastos/resumen',detalle:'/gastos/detalle',validacion:'/gastos/validacion',cuotas:'/gastos/cuotas',presupuesto:'/gastos/presupuesto',admin:'/gastos/categorias','historial-cuad':'/gastos/historial'};
const pathToScreen=Object.fromEntries(Object.entries(screenToPath).map(([k,v])=>[v,k]));
function switchScreen(screen,pushHistory=true){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+screen).classList.add('active');
  document.querySelectorAll('.nav-link,.drawer-link,.side-icon').forEach(l=>{
    l.classList.toggle('active',l.dataset.screen===screen);
  });
  document.getElementById('navbar-title').textContent=screenTitles[screen]||screen;
  if(screen==='presupuesto') renderPresupuesto();
  if(screen==='admin') renderAdmin();
  if(screen==='detalle') renderDetalle();
  window.scrollTo(0,0);
  if(pushHistory) history.pushState({screen},'',(screenToPath[screen]||'/gastos'));
}
window.addEventListener('popstate',e=>{
  const screen=(e.state&&e.state.screen)||pathToScreen[location.pathname]||'home';
  switchScreen(screen,false);
});
(function initFromUrl(){
  const screen=pathToScreen[location.pathname]||'home';
  if(screen!=='home') switchScreen(screen,false);
  history.replaceState({screen},'',(screenToPath[screen]||'/gastos'));
})();

function abrirNuevoGasto(){document.getElementById('ov-nuevo').classList.add('open');}

// ── DASHBOARD ───────────────────────────────────────────
function renderDashboard(){
  const key=\`\${String(dashMes+1).padStart(2,'0')}-\${dashAnio}\`;
  document.getElementById('dash-mes').textContent=\`\${meses[dashMes]} \${dashAnio}\`;
  const d=dashData[key]||{ingresos:0,presupuesto:0,categorias:[]};
  const totalE=d.categorias.reduce((s,c)=>s+c.monto,0);
  const bal=d.ingresos-totalE,libre=d.presupuesto-totalE;
  document.getElementById('d-ing').textContent=fmt(d.ingresos);
  document.getElementById('d-egr').textContent=fmt(totalE);
  const balEl=document.getElementById('d-bal');
  balEl.textContent=fmt(bal);balEl.className='resumen-valor '+(bal>=0?'bal-pos':'bal-neg');
  document.getElementById('d-ppto').textContent=fmt(d.presupuesto);
  const libreEl=document.getElementById('d-libre');
  libreEl.textContent=libre>=0?\`$\${Math.round(libre).toLocaleString('es-CL')} libre\`:\`$\${Math.round(Math.abs(libre)).toLocaleString('es-CL')} sobre\`;
  libreEl.style.color=libre>=0?'#2e7d32':'#b71c1c';
  document.getElementById('cat-list').innerHTML=d.categorias.map((c,i)=>{
    const rawPct=Math.round((c.monto/c.ppto)*100),status=getStatus(rawPct);
    return \`<div class="cat-card" onclick="abrirCat(\${i},'\${key}')">
      <div class="cat-card-row">
        <div class="cat-icon" style="background:\${catBgs[c.nombre]||'#f5f5f5'};color:\${catColores[c.nombre]||'#666'}">\${c.nombre.charAt(0)}</div>
        <div class="cat-info"><div class="cat-nombre">\${c.nombre}</div><div class="cat-ppto-txt">Ppto: \${fmt(c.ppto)}</div></div>
        <div class="cat-monto \${status}">\${fmt(c.monto)}</div>
      </div>
      <div class="bar-wrap"><div class="bar-fill \${status}" style="width:\${Math.min(rawPct,100)}%;"></div></div>
      <div class="ppto-row"><span class="ppto-pct \${status}">\${rawPct}% usado</span><span class="ppto-label">\${rawPct>=100?'⚠ sobre presupuesto':rawPct>=80?'⚡ cerca del límite':''}</span></div>
    </div>\`;
  }).join('');
}

function abrirCat(i,key){
  const c=dashData[key].categorias[i];
  document.getElementById('cat-sheet-title').textContent=c.nombre;
  document.getElementById('cat-sheet-items').innerHTML=c.gastos.map(g=>\`
    <div class="gasto-item" style="cursor:default;">
      <div class="gasto-cat-dot" style="background:\${catColores[c.nombre]||'#999'};"></div>
      <div class="gasto-info"><div class="gasto-desc">\${g.desc}</div><div class="gasto-meta">\${g.fecha}</div></div>
      <div class="gasto-monto e">- \${fmt(g.monto)}</div>
    </div>\`).join('');
  document.getElementById('ov-cat').classList.add('open');
}

document.getElementById('dash-prev').addEventListener('click',()=>{dashMes--;if(dashMes<0){dashMes=11;dashAnio--;}renderDashboard();});
document.getElementById('dash-next').addEventListener('click',()=>{dashMes++;if(dashMes>11){dashMes=0;dashAnio++;}renderDashboard();});
document.getElementById('ov-cat').addEventListener('click',e=>{if(e.target===document.getElementById('ov-cat'))cerrar('ov-cat');});

// ── DETALLE ─────────────────────────────────────────────
function getTodosRango(){
  const r=[];let m=rangoDesde.mes,a=rangoDesde.anio;
  while(a<rangoHasta.anio||(a===rangoHasta.anio&&m<=rangoHasta.mes)){
    const k=\`\${String(m+1).padStart(2,'0')}-\${a}\`;
    if(detalleData[k])r.push(...detalleData[k]);
    m++;if(m>11){m=0;a++;}
  }
  return r;
}
function actualizarRangoLabel(){
  const d=\`\${mesesC[rangoDesde.mes]} \${rangoDesde.anio}\`,h=\`\${mesesC[rangoHasta.mes]} \${rangoHasta.anio}\`;
  document.getElementById('rango-label').textContent=d===h?d:\`\${d} — \${h}\`;
}
function getDiaLabel(f){
  const hoy=new Date();hoy.setHours(0,0,0,0);
  const ayer=new Date(hoy);ayer.setDate(ayer.getDate()-1);
  const fd=new Date(f+'T00:00:00');
  if(fd.getTime()===hoy.getTime())return 'Hoy';
  if(fd.getTime()===ayer.getTime())return 'Ayer';
  return \`\${fd.getDate()} de \${meses[fd.getMonth()]}\`;
}
function renderDetalle(){
  actualizarRangoLabel();
  const todos=getTodosRango();
  const q=document.getElementById('buscador').value.toLowerCase().trim();
  const fil=q?todos.filter(g=>g.desc.toLowerCase().includes(q)||g.cat.toLowerCase().includes(q)):todos;
  document.getElementById('s-e').textContent=fmt(fil.filter(g=>g.ie==='E').reduce((s,g)=>s+g.monto,0));
  document.getElementById('s-i').textContent=fmt(fil.filter(g=>g.ie==='I').reduce((s,g)=>s+g.monto,0));
  document.getElementById('s-n').textContent=fil.length;
  if(!fil.length){document.getElementById('lista').innerHTML=\`<div class="empty">\${q?'Sin resultados':'Sin gastos registrados'}</div>\`;return;}
  const grupos={};
  [...fil].sort((a,b)=>b.fecha.localeCompare(a.fecha)).forEach(g=>{const l=getDiaLabel(g.fecha);if(!grupos[l])grupos[l]=[];grupos[l].push(g);});
  document.getElementById('lista').innerHTML=Object.entries(grupos).map(([dia,items])=>{
    const tot=items.reduce((s,g)=>g.ie==='E'?s-g.monto:s+g.monto,0);
    return \`<div class="dia-grupo">
      <div class="dia-label">\${dia}<span class="dia-total">\${(tot>=0?'+':'')+fmt(tot)}</span></div>
      \${items.map(g=>\`
        <div class="gasto-item" onclick="abrirGasto(\${g.id})">
          <div class="gasto-cat-dot" style="background:\${catColores[g.cat]||'#999'};"></div>
          <div class="gasto-info">
            <div class="gasto-desc">\${g.desc}</div>
            <div class="gasto-meta"><span>\${g.sub}</span>\${g.dev?'<span class="gasto-dev">devolución</span>':''}</div>
            <div class="gasto-meta" style="margin-top:3px;"><span class="gasto-banco \${g.banco==='Santander'?'santander':g.banco==='Falabella'?'falabella':'tc'}">\${g.banco}</span></div>
          </div>
          <div class="gasto-monto \${g.ie.toLowerCase()}">\${g.ie==='E'?'-':'+'} \${fmt(g.monto)}</div>
        </div>\`).join('')}
    </div>\`;
  }).join('');
}
function abrirGasto(id){
  const g=getTodosRango().find(x=>x.id===id);if(!g)return;
  document.getElementById('g-desc').textContent=g.desc;
  document.getElementById('g-monto').textContent=(g.ie==='E'?'- ':'+ ')+fmt(g.monto);
  document.getElementById('ov-gasto').classList.add('open');
}
document.getElementById('buscador').addEventListener('input',renderDetalle);
document.getElementById('rango-btn').addEventListener('click',()=>{
  const anios=[2019,2020,2021,2022,2023,2024,2025,2026];
  ['p-desde-mes','p-hasta-mes'].forEach(id=>{document.getElementById(id).innerHTML=meses.map((m,i)=>\`<option value="\${i}">\${m}</option>\`).join('');});
  ['p-desde-anio','p-hasta-anio'].forEach(id=>{document.getElementById(id).innerHTML=anios.map(a=>\`<option value="\${a}">\${a}</option>\`).join('');});
  document.getElementById('p-desde-mes').value=rangoDesde.mes;document.getElementById('p-desde-anio').value=rangoDesde.anio;
  document.getElementById('p-hasta-mes').value=rangoHasta.mes;document.getElementById('p-hasta-anio').value=rangoHasta.anio;
  document.getElementById('ov-picker').classList.add('open');
});
document.getElementById('picker-apply').addEventListener('click',()=>{
  rangoDesde={mes:parseInt(document.getElementById('p-desde-mes').value),anio:parseInt(document.getElementById('p-desde-anio').value)};
  rangoHasta={mes:parseInt(document.getElementById('p-hasta-mes').value),anio:parseInt(document.getElementById('p-hasta-anio').value)};
  if(rangoDesde.anio>rangoHasta.anio||(rangoDesde.anio===rangoHasta.anio&&rangoDesde.mes>rangoHasta.mes))rangoHasta={...rangoDesde};
  cerrar('ov-picker');renderDetalle();
});
document.getElementById('ov-gasto').addEventListener('click',e=>{if(e.target===document.getElementById('ov-gasto'))cerrar('ov-gasto');});
document.getElementById('ov-picker').addEventListener('click',e=>{if(e.target===document.getElementById('ov-picker'))cerrar('ov-picker');});

// ── PRESUPUESTO ─────────────────────────────────────────
function renderPresupuesto(){
  document.getElementById('ppto-mes').textContent=\`\${meses[pptoPanelMes]} \${pptoPanelAnio}\`;
  const subcatsE=subcats.filter(s=>s.ie==='E');
  const totalPpto=subcatsE.reduce((s,sc)=>{const p=pptoData[sc.sub];return s+(p?p.monto:0);},0);
  const key=\`\${String(pptoPanelMes+1).padStart(2,'0')}-\${pptoPanelAnio}\`;
  const totalReal=dashData[key]?dashData[key].categorias.reduce((s,c)=>s+c.monto,0):0;
  const pct=totalPpto>0?Math.min(Math.round((totalReal/totalPpto)*100),100):0;
  document.getElementById('ppto-total').textContent=fmt(totalPpto);
  document.getElementById('ppto-real-txt').textContent=\`Real: \${fmt(totalReal)}\`;
  const libre=totalPpto-totalReal;
  const libreEl=document.getElementById('ppto-libre-txt');
  libreEl.textContent=libre>=0?\`Libre: $\${Math.round(libre).toLocaleString('es-CL')}\`:\`Sobre: $\${Math.round(Math.abs(libre)).toLocaleString('es-CL')}\`;
  libreEl.style.color=libre>=0?'#2e7d32':'#b71c1c';
  document.getElementById('ppto-global-fill').style.width=pct+'%';
  const grupos={};
  subcatsE.forEach(sc=>{if(!grupos[sc.cat])grupos[sc.cat]=[];grupos[sc.cat].push(sc);});
  document.getElementById('ppto-lista').innerHTML=Object.entries(grupos).map(([cat,subs])=>{
    const totalCat=subs.reduce((s,sc)=>{const p=pptoData[sc.sub];return s+(p?p.monto:0);},0);
    return \`<div class="ppto-cat-group">
      <div class="ppto-cat-header" onclick="togglePptoCat(this)">
        <div class="ppto-cat-icon" style="background:\${catBgs[cat]||'#f5f5f5'};color:\${catColores[cat]||'#666'}">\${cat.charAt(0)}</div>
        <span class="ppto-cat-nombre">\${cat}</span>
        <span class="ppto-cat-total">\${fmt(totalCat)}</span>
        <span class="ppto-cat-chevron open">▼</span>
      </div>
      <div class="ppto-subcat-list open">
        \${subs.map(sc=>{const p=pptoData[sc.sub]||{monto:0,fijo:false};return \`
          <div class="ppto-subcat-item">
            <div class="ppto-subcat-info"><div class="ppto-subcat-nombre">\${sc.sub.includes(' - ')?sc.sub.split(' - ').slice(1).join(' - '):sc.sub}</div></div>
            <span class="ppto-tipo-badge \${p.fijo?'fijo':'variable'}" onclick="toggleFijo('\${sc.sub}')">\${p.fijo?'Fijo':'Variable'}</span>
            <div class="ppto-monto-wrap"><span class="ppto-monto-prefix">$</span>
              <input class="ppto-monto-input" type="number" value="\${p.monto}" min="0" onchange="actualizarPpto('\${sc.sub}',this.value,this)" \${p.fijo?'style="background:#f0f4ff;"':''} />
            </div>
          </div>\`;}).join('')}
      </div>
    </div>\`;
  }).join('');
}

function togglePptoCat(h){const l=h.nextElementSibling,c=h.querySelector('.ppto-cat-chevron');l.classList.toggle('open');c.classList.toggle('open');}
function toggleFijo(sub){if(!pptoData[sub])pptoData[sub]={monto:0,fijo:false};pptoData[sub].fijo=!pptoData[sub].fijo;renderPresupuesto();}
function actualizarPpto(sub,val,inputEl){
  const nuevo=parseInt(val)||0,anterior=pptoData[sub]?pptoData[sub].monto:0;
  if(nuevo===anterior)return;
  alcancePendiente={sub,nuevoMonto:nuevo,inputEl};
  const nombre=sub.includes(' - ')?sub.split(' - ').slice(1).join(' - '):sub;
  document.getElementById('alcance-sub').textContent=\`"\${nombre}" → \${fmt(nuevo)}\`;
  document.getElementById('alcance-mes-label').textContent=\`\${meses[pptoPanelMes]} \${pptoPanelAnio}\`;
  document.getElementById('ov-alcance').classList.add('open');
}
function aplicarAlcance(soloMes){
  if(!alcancePendiente)return;
  const{sub,nuevoMonto}=alcancePendiente;
  if(!pptoData[sub])pptoData[sub]={monto:0,fijo:false};
  pptoData[sub].monto=nuevoMonto;
  mostrarToast(soloMes?\`Actualizado solo para \${meses[pptoPanelMes]} \${pptoPanelAnio}\`:'Presupuesto base actualizado');
  cerrar('ov-alcance');alcancePendiente=null;renderPresupuesto();
}
document.getElementById('alcance-solo-mes').addEventListener('click',()=>aplicarAlcance(true));
document.getElementById('alcance-todos').addEventListener('click',()=>aplicarAlcance(false));
document.getElementById('alcance-cancelar').addEventListener('click',()=>{renderPresupuesto();cerrar('ov-alcance');alcancePendiente=null;});
document.getElementById('ppto-prev').addEventListener('click',()=>{pptoPanelMes--;if(pptoPanelMes<0){pptoPanelMes=11;pptoPanelAnio--;}renderPresupuesto();});
document.getElementById('ppto-next').addEventListener('click',()=>{pptoPanelMes++;if(pptoPanelMes>11){pptoPanelMes=0;pptoPanelAnio++;}renderPresupuesto();});

// ── ADMIN ────────────────────────────────────────────────
function renderAdmin(){
  const grupos={};subcats.forEach(s=>{if(!grupos[s.cat])grupos[s.cat]=[];grupos[s.cat].push(s);});
  document.getElementById('admin-cat-lista').innerHTML=Object.entries(grupos).map(([cat,subs])=>\`
    <div class="admin-cat-card">
      <div class="admin-cat-header" onclick="toggleAdminCat(this)">
        <div class="cat-icon" style="width:28px;height:28px;font-size:12px;background:\${catBgs[cat]||'#f5f5f5'};color:\${catColores[cat]||'#666'};border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:600;flex-shrink:0;">\${cat.charAt(0)}</div>
        <span class="admin-cat-nombre">\${cat}</span>
        <span class="admin-cat-count">\${subs.length} subcats</span>
        <span class="admin-cat-chevron">▼</span>
      </div>
      <div class="admin-subcat-list">
        \${subs.map(s=>\`
          <div class="admin-subcat-item">
            <span class="admin-subcat-nombre">\${s.sub.includes(' - ')?s.sub.split(' - ').slice(1).join(' - '):s.sub}</span>
            <span class="admin-ie-badge admin-ie-\${s.ie}">\${s.ie==='E'?'Egreso':'Ingreso'}</span>
            <button class="admin-edit-btn">✏️</button>
            <button class="admin-del-btn" onclick="eliminarSubcat('\${s.sub}')">✕</button>
          </div>\`).join('')}
        <div class="admin-add-row">
          <input class="admin-add-input" placeholder="Nueva subcategoría..." id="new-sub-\${cat}" />
          <button class="admin-add-btn" onclick="agregarSubcat('\${cat}')">+ Agregar</button>
        </div>
      </div>
    </div>\`).join('');
}
function toggleAdminCat(h){const l=h.nextElementSibling,c=h.querySelector('.admin-cat-chevron');l.classList.toggle('open');c.classList.toggle('open');}
function agregarSubcat(cat){const i=document.getElementById('new-sub-'+cat);const n=i.value.trim();if(!n)return;subcats.push({sub:cat+' - '+n,cat,ie:'E'});i.value='';renderAdmin();}
function eliminarSubcat(sub){subcats=subcats.filter(s=>s.sub!==sub);renderAdmin();}
document.getElementById('btn-add-cat').addEventListener('click',()=>{
  const i=document.getElementById('nueva-cat-input');const n=i.value.trim();if(!n)return;
  mostrarToast(\`Categoría "\${n}" agregada\`);i.value='';
});

// ── FORMULARIO ───────────────────────────────────────────
document.getElementById('f-fecha').valueAsDate=new Date();
const subcatInput=document.getElementById('f-subcat'),sugBox=document.getElementById('f-suggestions'),btnLista=document.getElementById('btn-lista');
function groupBy(arr){const g={};arr.forEach(s=>{if(!g[s.cat])g[s.cat]=[];g[s.cat].push(s);});return g;}
function renderSugs(items){
  if(!items.length){sugBox.style.display='none';return;}
  const grps=groupBy(items);
  sugBox.innerHTML=Object.entries(grps).map(([cat,subs])=>\`<div class="sug-group">\${cat}</div>\`+subs.map(s=>\`
    <div class="sug-item" data-sub="\${s.sub}" data-cat="\${s.cat}" data-ie="\${s.ie}">
      <span>\${s.sub.includes(' - ')?s.sub.split(' - ').slice(1).join(' - '):s.sub}</span>
      <span style="font-size:11px;color:#bbb;">\${s.ie==='E'?'Egreso':'Ingreso'}</span>
    </div>\`).join('')).join('');
  sugBox.style.display='block';
}
subcatInput.addEventListener('input',()=>{
  listaOpen=false;btnLista.classList.remove('active');
  const q=subcatInput.value.toLowerCase().trim();
  if(!q){sugBox.style.display='none';return;}
  renderSugs(subcats.filter(s=>s.sub.toLowerCase().includes(q)));
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
});
document.addEventListener('click',e=>{if(!e.target.closest('.subcat-wrap')&&!e.target.closest('#btn-lista')){sugBox.style.display='none';listaOpen=false;btnLista.classList.remove('active');}});
document.querySelectorAll('.banco-btn').forEach(btn=>{btn.addEventListener('click',()=>{document.querySelectorAll('.banco-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');});});
const devToggle=document.getElementById('dev-toggle');
devToggle.addEventListener('click',()=>{devToggle.classList.toggle('active');document.getElementById('dev-hint').textContent=devToggle.classList.contains('active')?'marcado como X':'marcar con X';});
document.getElementById('ov-nuevo').addEventListener('click',e=>{if(e.target===document.getElementById('ov-nuevo'))cerrar('ov-nuevo');});
document.getElementById('btn-guardar').addEventListener('click',async()=>{
  const fecha=document.getElementById('f-fecha').value;
  const sub=document.getElementById('f-subcat').value.trim();
  const bancoEl=document.querySelector('.banco-btn.active');
  const banco=bancoEl?bancoEl.dataset.banco:'';
  const desc=document.getElementById('f-desc').value.trim();
  const monto=parseFloat(document.getElementById('f-monto').value)||0;
  const esDev=document.getElementById('dev-toggle').classList.contains('active');
  if(!fecha||!sub||!banco||!monto){mostrarToast('Completa fecha, subcategoría, banco y monto');return;}
  const btn=document.getElementById('btn-guardar');
  btn.disabled=true;btn.textContent='Guardando...';
  try{
    const N=totalFilasGastos+2;
    const devStr=esDev?'X':'';
    const row=[
      fecha,
      '=IF(A'+N+'<>"",(CONCATENATE(IF(MONTH(A'+N+')<10,CONCATENATE("0",MONTH(A'+N+')),MONTH(A'+N+')),"-",YEAR(A'+N+'))),"")' ,
      sub,
      '=IFERROR(VLOOKUP(C'+N+',\'Par\u00e1metros\'!A:B,2,FALSE),"")',
      '=IF(G'+N+'<>"X",IFERROR(VLOOKUP(C'+N+',\'Par\u00e1metros\'!A:C,3,FALSE),""),IF(IFERROR(VLOOKUP(C'+N+',\'Par\u00e1metros\'!A:C,3,FALSE),"")="E","I","E"))',
      banco,devStr,desc,monto,
      '=IF(I'+N+'<>"",IF(E'+N+'="I",IF(I'+N+'>0,I'+N+',I'+N+'*-1),IF(E'+N+'="E",IF(I'+N+'<0,I'+N+',I'+N+'*-1))),0)'
    ];
    const res=await fetch('/api/gastos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({row})});
    if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
    cerrar('ov-nuevo');
    mostrarToast('Gasto guardado \u2713');
    document.getElementById('f-fecha').valueAsDate=new Date();
    document.getElementById('f-subcat').value='';
    document.getElementById('f-desc').value='';
    document.getElementById('f-monto').value='';
    document.querySelectorAll('.banco-btn').forEach(b=>b.classList.remove('active'));
    document.getElementById('dev-toggle').classList.remove('active');
    document.getElementById('dev-hint').textContent='marcar con X';
    document.getElementById('f-cat-badge').style.display='none';
    await cargarDatos();
  }catch(e){
    mostrarToast('Error al guardar: '+e.message);
  }finally{
    btn.disabled=false;btn.textContent='Guardar gasto';
  }
});
document.getElementById('ov-ajustes').addEventListener('click',e=>{if(e.target===document.getElementById('ov-ajustes'))cerrar('ov-ajustes');});

// ── INIT ─────────────────────────────────────────────────
cargarDatos();
  `

  useEffect(() => {
    if (user?.name) window.userName = user.name
  }, [user])

  useEffect(() => {
    if (document.getElementById('app-script')) {
      // Script already present (React strict-mode remount) — re-trigger data load
      if (typeof window.cargarDatos === 'function') window.cargarDatos()
      return
    }
    const script = document.createElement('script')
    script.id = 'app-script'
    script.src = '/app-script.js?v=' + Date.now()
    document.body.appendChild(script)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssContent }} />
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  )
}
