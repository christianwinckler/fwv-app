'use client'
import { useEffect } from 'react'

export default function AppClient({ user }) {

  const cssContent = `

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f5f5f5; }

/* ── APP SHELL ─────────────────────────────────────────── */
.app { display: flex; flex-direction: column; min-height: 100vh; }

/* ── NAVBAR ────────────────────────────────────────────── */
.navbar {
  background: #fff; border-bottom: 0.5px solid #e0e0e0;
  padding: 0 20px; height: 56px;
  display: flex; align-items: center; justify-content: space-between;
  position: sticky; top: 0; z-index: 100;
}
.navbar-brand {
  position: absolute; left: 50%; transform: translateX(-50%);
  font-size: 16px; font-weight: 600; color: #111;
  white-space: nowrap; pointer-events: none;
}
.navbar-brand .brand-prefix { color: #1a73e8; }

.navbar-right { display: flex; align-items: center; gap: 8px; }

.btn-settings {
  width: 34px; height: 34px; border-radius: 50%;
  background: #f5f5f5; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
}

.ham-line {
  width: 20px; height: 2px; background: #333; border-radius: 1px;
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
  width: 260px; background: #fff; z-index: 201;
  transition: left 0.25s ease; padding: 0;
  display: flex; flex-direction: column;
}
.drawer.open { left: 0; }
.drawer-header {
  padding: 20px 20px 16px;
  border-bottom: 0.5px solid #e0e0e0;
  display: flex; align-items: center; justify-content: space-between;
}
.drawer-brand { font-size: 16px; font-weight: 600; color: #111; }
.drawer-close {
  width: 28px; height: 28px; border-radius: 50%;
  background: #f5f5f5; border: none; cursor: pointer;
  font-size: 14px; color: #666;
}
.drawer-links { padding: 12px 0; flex: 1; }
.drawer-link {
  display: flex; align-items: center; gap: 12px;
  padding: 13px 20px; font-size: 15px; color: #333;
  cursor: pointer; border: none; background: none;
  font-family: inherit; width: 100%; text-align: left;
  transition: background 0.1s;
}
.drawer-link:hover { background: #f5f5f5; }
.drawer-link.active { background: #e8f0fe; color: #1a73e8; font-weight: 500; }
.drawer-divider { height: 0.5px; background: #e0e0e0; margin: 8px 0; }
.drawer-section-label { font-size: 10px; font-weight: 500; color: #888; letter-spacing: 0.06em; padding: 10px 20px 4px; }
.drawer-item-indent { padding-left: 40px; }

/* ── CONTENT ───────────────────────────────────────────── */
.content {
  flex: 1;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: 0 0 80px;
}

/* ── FAB (mobile) ──────────────────────────────────────── */
.fab {
  position: fixed; bottom: 24px; right: 20px;
  width: 52px; height: 52px; border-radius: 50%;
  background: #111; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 26px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.25); z-index: 50;
}

/* ── SCREENS ───────────────────────────────────────────── */
.screen { display: none; }
.screen.active { display: block; }

/* ── MES NAV ───────────────────────────────────────────── */
.mes-nav {
  background: #fff; padding: 10px 16px;
  display: flex; align-items: center; justify-content: space-between;
  border-bottom: 0.5px solid #e0e0e0;
  position: sticky; top: 56px; z-index: 90;
}
.mes-arrow {
  width: 32px; height: 32px; border: 0.5px solid #ccc;
  border-radius: 8px; background: #f5f5f5; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; color: #666;
}
.mes-label { font-size: 15px; font-weight: 500; color: #111; }

/* ── RESUMEN GRID ──────────────────────────────────────── */
.resumen-grid {
  display: grid; grid-template-columns: repeat(2, 1fr);
  gap: 10px; padding: 14px 16px;
  background: #fff; border-bottom: 0.5px solid #e0e0e0;
}
.resumen-card {
  background: #f5f5f5; border-radius: 10px; padding: 12px;
  display: flex; flex-direction: column; gap: 4px;
}
.resumen-label { font-size: 10px; color: #888; font-weight: 500; letter-spacing: 0.04em; }
.resumen-valor { font-size: 16px; font-weight: 500; color: #111; }
.resumen-valor.ing { color: #2e7d32; }
.resumen-valor.egr { color: #c62828; }
.resumen-valor.bal-pos { color: #2e7d32; }
.resumen-valor.bal-neg { color: #c62828; }
.resumen-sub { font-size: 11px; }
.resumen-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:8px; padding:0 12px 12px; background:#f5f5f5; }
.res-card-accent { background:#fff; border-radius:10px; padding:10px 12px; border-left:3px solid transparent; }

/* ── CAT LIST ──────────────────────────────────────────── */
.section-header {
  padding: 14px 16px 8px;
  font-size: 11px; font-weight: 500; color: #888; letter-spacing: 0.06em;
}
.cat-list { display: flex; flex-direction: column; padding: 0 12px 16px; }
.cat-card {
  background: #fff; border-radius: 10px; padding: 12px;
  border: 0.5px solid #e8e8e8; margin-bottom: 6px; cursor: pointer;
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
.cat-nombre { font-size: 14px; font-weight: 500; color: #111; }
.cat-ppto-txt { font-size: 11px; color: #999; margin-top: 1px; }
.cat-monto { font-size: 14px; font-weight: 500; flex-shrink: 0; }
.cat-monto.ok { color: #c62828; }
.cat-monto.warning { color: #e65100; }
.cat-monto.over { color: #b71c1c; font-weight: 700; }
.bar-wrap { margin-top: 7px; height: 5px; background: #eee; border-radius: 3px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 3px; }
.bar-fill.ok { background: #1a73e8; }
.bar-fill.warning { background: #e65100; }
.bar-fill.over { background: #b71c1c; }
.ppto-row { display: flex; justify-content: space-between; align-items: center; margin-top: 5px; }
.ppto-pct { font-size: 11px; font-weight: 500; }
.ppto-pct.ok { color: #1a73e8; }
.ppto-pct.warning { color: #e65100; }
.ppto-pct.over { color: #b71c1c; }
.ppto-label { font-size: 11px; color: #999; }

/* ── DETALLE ───────────────────────────────────────────── */
.rango-btn {
  background: #fff; padding: 10px 16px;
  border-bottom: 0.5px solid #e0e0e0;
  display: flex; align-items: center; justify-content: space-between;
  cursor: pointer; position: sticky; top: 56px; z-index: 90;
}
.rango-label { font-size: 15px; font-weight: 500; color: #111; }
.search-wrap {
  background: #fff; padding: 10px 12px;
  border-bottom: 0.5px solid #e0e0e0; position: relative;
  position: sticky; top: calc(56px + 45px); z-index: 89;
}
.search-icon {
  position: absolute; left: 22px; top: 50%; transform: translateY(-50%);
  font-size: 14px; color: #999; pointer-events: none;
}
.search-input {
  width: 100%; padding: 8px 12px 8px 34px;
  border: 0.5px solid #e0e0e0; border-radius: 8px;
  font-size: 14px; background: #f5f5f5; color: #111; font-family: inherit;
}
.search-input:focus { outline: none; border-color: #aaa; background: #fff; }
.resumen-strip {
  background: #fff; padding: 10px 16px;
  display: flex; gap: 16px; align-items: center;
  border-bottom: 0.5px solid #e0e0e0;
}
.strip-item { display: flex; flex-direction: column; gap: 2px; }
.strip-label { font-size: 10px; color: #999; font-weight: 500; letter-spacing: 0.04em; }
.strip-valor { font-size: 13px; font-weight: 500; }
.strip-valor.e { color: #c62828; }
.strip-valor.i { color: #2e7d32; }
.strip-sep { width: 0.5px; background: #e0e0e0; height: 28px; }
.lista { padding: 8px 12px 24px; }
.dia-grupo { margin-bottom: 4px; }
.dia-label {
  font-size: 11px; font-weight: 500; color: #888;
  letter-spacing: 0.04em; padding: 10px 4px 6px;
}
.dia-total { float: right; font-size: 11px; color: #bbb; font-weight: 400; }
.gasto-item {
  background: #fff; border-radius: 10px; padding: 11px 12px;
  display: flex; align-items: center; gap: 10px;
  border: 0.5px solid #e8e8e8; margin-bottom: 5px; cursor: pointer;
  transition: box-shadow 0.1s;
}
.gasto-item:hover { box-shadow: 0 1px 6px rgba(0,0,0,0.07); }
.gasto-info { flex: 1; min-width: 0; }
.gasto-desc { font-size: 14px; color: #111; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.gasto-meta { font-size: 11px; color: #999; margin-top: 2px; display: flex; gap: 6px; align-items: center; }
.gasto-banco { padding: 1px 6px; border-radius: 4px; font-size: 10px; font-weight: 500; }
.gasto-banco.santander { background: #fce4ec; color: #c62828; }
.gasto-banco.falabella { background: #e8f5e9; color: #2e7d32; }
.gasto-banco.tc { background: #fff8e1; color: #f57f17; }
.gasto-dev { background: #fff3e0; padding: 1px 6px; border-radius: 4px; font-size: 10px; color: #e65100; }
.gasto-monto { font-size: 14px; font-weight: 500; flex-shrink: 0; }
.gasto-monto.e { color: #c62828; }
.gasto-monto.i { color: #2e7d32; }
.empty { padding: 40px 16px; text-align: center; font-size: 13px; color: #999; }

/* ── PRESUPUESTO ───────────────────────────────────────── */
.ppto-total-bar {
  background: #fff; padding: 14px 16px;
  border-bottom: 0.5px solid #e0e0e0;
}
.ppto-total-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px; }
.ppto-total-label { font-size: 12px; color: #888; font-weight: 500; }
.ppto-total-monto { font-size: 20px; font-weight: 500; color: #111; }
.ppto-total-sub { font-size: 12px; color: #999; }
.ppto-global-bar { height: 6px; background: #eee; border-radius: 3px; overflow: hidden; margin-top: 6px; }
.ppto-global-fill { height: 100%; border-radius: 3px; background: #1a73e8; }
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
.ppto-cat-nombre { font-size: 13px; font-weight: 500; color: #111; flex: 1; }
.ppto-cat-total { font-size: 12px; color: #888; }
.ppto-cat-chevron { font-size: 11px; color: #bbb; transition: transform 0.2s; }
.ppto-cat-chevron.open { transform: rotate(180deg); }
.ppto-subcat-list { display: none; }
.ppto-subcat-list.open { display: block; }
.ppto-subcat-item {
  background: #fff; border-radius: 10px; padding: 11px 12px;
  display: flex; align-items: center; gap: 10px;
  border: 0.5px solid #e8e8e8; margin-bottom: 5px;
}
.ppto-subcat-info { flex: 1; min-width: 0; }
.ppto-subcat-nombre { font-size: 13px; color: #111; }
.ppto-tipo-badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 500; flex-shrink: 0; cursor: pointer; }
.ppto-tipo-badge.fijo { background: #e8f0fe; color: #1a73e8; }
.ppto-tipo-badge.variable { background: #fff8e1; color: #f57f17; }
.ppto-monto-wrap { display: flex; align-items: center; gap: 4px; flex-shrink: 0; }
.ppto-monto-input {
  width: 90px; padding: 5px 8px; border: 0.5px solid #e0e0e0;
  border-radius: 6px; font-size: 13px; font-weight: 500;
  color: #111; text-align: right; font-family: inherit; background: #f9f9f9;
}
.ppto-monto-input:focus { outline: none; border-color: #1a73e8; background: #fff; }
.ppto-monto-prefix { font-size: 12px; color: #999; }

/* ── ADMIN ─────────────────────────────────────────────── */
.admin-section { padding: 12px; }
.admin-section-title { font-size: 11px; font-weight: 500; color: #888; letter-spacing: 0.04em; padding: 8px 4px 10px; }
.admin-cat-card { background: #fff; border-radius: 10px; border: 0.5px solid #e8e8e8; margin-bottom: 6px; overflow: hidden; }
.admin-cat-header { display: flex; align-items: center; gap: 10px; padding: 12px; cursor: pointer; }
.admin-cat-nombre { font-size: 14px; font-weight: 500; color: #111; flex: 1; }
.admin-cat-count { font-size: 11px; color: #bbb; }
.admin-cat-chevron { font-size: 11px; color: #bbb; transition: transform 0.2s; }
.admin-cat-chevron.open { transform: rotate(180deg); }
.admin-subcat-list { display: none; border-top: 0.5px solid #f0f0f0; }
.admin-subcat-list.open { display: block; }
.admin-subcat-item { display: flex; align-items: center; padding: 10px 12px 10px 48px; border-bottom: 0.5px solid #f5f5f5; gap: 8px; }
.admin-subcat-item:last-child { border-bottom: none; }
.admin-subcat-nombre { font-size: 13px; color: #111; flex: 1; }
.admin-ie-badge { font-size: 10px; padding: 2px 6px; border-radius: 4px; font-weight: 500; }
.admin-ie-E { background: #fce4ec; color: #c62828; }
.admin-ie-I { background: #e8f5e9; color: #2e7d32; }
.admin-edit-btn { font-size: 13px; color: #999; background: none; border: none; cursor: pointer; padding: 2px 4px; }
.admin-del-btn { font-size: 13px; color: #e8a0a0; background: none; border: none; cursor: pointer; padding: 2px 4px; }
.admin-add-row { display: flex; gap: 8px; padding: 10px 12px; border-top: 0.5px solid #f0f0f0; }
.admin-add-input { flex: 1; padding: 7px 10px; border: 0.5px solid #e0e0e0; border-radius: 8px; font-size: 13px; color: #111; font-family: inherit; background: #f9f9f9; }
.admin-add-input:focus { outline: none; border-color: #1a73e8; background: #fff; }
.admin-add-btn { padding: 7px 14px; background: #111; color: #fff; border: none; border-radius: 8px; font-size: 13px; cursor: pointer; font-family: inherit; }
.add-cat-row { display: flex; gap: 8px; padding: 4px 0 12px; }
/* ── ADMIN MODALS ────────────────────────────────────────── */
.admin-toggle-group { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px; }
.admin-toggle-opt { padding: 10px 6px; border: 0.5px solid #e0e0e0; border-radius: 10px; text-align: center; cursor: pointer; font-size: 12px; color: #888; background: #fafafa; display: flex; flex-direction: column; gap: 4px; align-items: center; user-select: none; }
.admin-toggle-opt .t-icon { font-size: 18px; }
.admin-toggle-opt.active-tc { border-color: #f57f17; background: #fff8e1; color: #f57f17; font-weight: 500; }
.admin-toggle-opt.active-transf { border-color: #1a73e8; background: #e8f0fe; color: #1a73e8; font-weight: 500; }
.admin-toggle-opt.active-vacio { border-color: #aaa; background: #f0f0f0; color: #555; font-weight: 500; }
.admin-ie-group { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.admin-ie-opt { padding: 11px; border: 0.5px solid #e0e0e0; border-radius: 10px; text-align: center; cursor: pointer; font-size: 14px; color: #888; background: #fafafa; font-weight: 500; user-select: none; }
.admin-ie-opt.active-e { border-color: #c62828; background: #fce4ec; color: #c62828; }
.admin-ie-opt.active-i { border-color: #2e7d32; background: #e8f5e9; color: #2e7d32; }
.admin-ie-opt.active-activo { border-color: #2e7d32; background: #e8f5e9; color: #2e7d32; }
.admin-ie-opt.active-oculto { border-color: #999; background: #f0f0f0; color: #555; }
.admin-ie-opt.active-mensual { border-color: #1a73e8; background: #e8f0fe; color: #1a73e8; }
.admin-ie-opt.active-variable { border-color: #e65100; background: #fff3e0; color: #e65100; }
.admin-chip { padding: 5px 12px; border-radius: 14px; font-size: 12px; border: 0.5px solid #e0e0e0; background: #fff; color: #555; cursor: pointer; font-family: inherit; }
.admin-chip.active { border-color: #1a73e8; background: #e8f0fe; color: #1a73e8; font-weight: 500; }
.admin-field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; }
.admin-field label { font-size: 11px; color: #888; font-weight: 500; letter-spacing: 0.04em; }
.admin-field input { padding: 11px 12px; border: 0.5px solid #ddd; border-radius: 10px; font-size: 15px; color: #111; font-family: inherit; background: #fafafa; outline: none; }
.admin-field input:focus { border-color: #1a73e8; background: #fff; }
.btn-admin-guardar { width: 100%; padding: 14px; background: #111; color: #fff; border: none; border-radius: 12px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: inherit; margin-top: 4px; }
.btn-admin-eliminar { width: 100%; padding: 13px; background: #fce4ec; color: #c62828; border: none; border-radius: 12px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: inherit; margin-top: 6px; }
/* ── ADMIN ELIMINAR SHEET ────────────────────────────────── */
.admin-del-warning { background: #fff8e1; border: 0.5px solid #ffe082; border-radius: 10px; padding: 12px 14px; margin-bottom: 14px; }
.admin-del-warning-title { font-size: 13px; font-weight: 500; color: #f57f17; margin-bottom: 4px; }
.admin-del-warning-sub { font-size: 12px; color: #888; line-height: 1.5; }
.admin-del-count { font-size: 22px; font-weight: 500; color: #111; margin: 2px 0; }
.admin-del-select { width: 100%; padding: 11px 12px; border: 0.5px solid #ddd; border-radius: 10px; font-size: 14px; color: #111; font-family: inherit; background: #fafafa; outline: none; margin-top: 4px; }
.admin-del-select:focus { border-color: #1a73e8; background: #fff; }
.btn-admin-confirmar-del { width: 100%; padding: 14px; background: #c62828; color: #fff; border: none; border-radius: 12px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: inherit; margin-top: 4px; }
.btn-admin-cancelar { width: 100%; padding: 13px; background: #f5f5f5; color: #666; border: none; border-radius: 12px; font-size: 14px; cursor: pointer; font-family: inherit; margin-top: 6px; }

/* ── OVERLAYS ───────────────────────────────────────────── */
.overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(0,0,0,0.35); z-index: 150; align-items: flex-end;
  overflow: hidden;
}
.overlay.open { display: flex; }
.sheet {
  background: #fff; width: 100%; border-radius: 16px 16px 0 0;
  padding: 16px 16px 32px; max-height: 88vh; overflow-y: auto;
  max-width: 600px; margin: 0 auto;
  overflow-x: hidden; touch-action: pan-y;
}
.sheet-handle { width: 36px; height: 4px; background: #e0e0e0; border-radius: 2px; margin: 0 auto 16px; }
.sheet-title { font-size: 15px; font-weight: 500; color: #111; margin-bottom: 16px; }

/* ALCANCE MODAL */
.alcance-overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(0,0,0,0.4); z-index: 200;
  align-items: center; justify-content: center; padding: 24px;
}
.alcance-overlay.open { display: flex; }
.alcance-card { background: #fff; border-radius: 14px; padding: 20px; width: 100%; max-width: 340px; }
.alcance-titulo { font-size: 15px; font-weight: 500; color: #111; margin-bottom: 6px; }
.alcance-sub { font-size: 13px; color: #888; margin-bottom: 18px; line-height: 1.5; }
.alcance-opciones { display: flex; flex-direction: column; gap: 8px; }
.alcance-btn { width: 100%; padding: 12px; border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer; border: none; font-family: inherit; text-align: left; display: flex; align-items: center; gap: 10px; }
.alcance-btn.solo-mes { background: #e8f0fe; color: #1a73e8; }
.alcance-btn.todos { background: #111; color: #fff; }
.alcance-btn.cancelar-alcance { background: #f5f5f5; color: #666; }
.alcance-icon { font-size: 18px; }
.alcance-txt { display: flex; flex-direction: column; gap: 1px; }
.alcance-txt-main { font-size: 14px; font-weight: 500; }
.alcance-txt-sub { font-size: 11px; opacity: 0.75; font-weight: 400; }

/* Picker */
.picker-row { display: flex; gap: 12px; margin-bottom: 16px; }
.picker-col { flex: 1; display: flex; flex-direction: column; gap: 5px; }
.picker-col label { font-size: 11px; color: #888; font-weight: 500; letter-spacing: 0.04em; }
.picker-col select { padding: 9px 10px; border: 0.5px solid #e0e0e0; border-radius: 8px; font-size: 14px; background: #f5f5f5; color: #111; font-family: inherit; }
.picker-actions { display: flex; gap: 8px; }
.btn-preset-rango { padding: 5px 12px; border-radius: 8px; font-size: 12px; font-weight: 500; border: 0.5px solid #1a73e8; background: #e8f0fe; color: #1a73e8; cursor: pointer; font-family: inherit; transition: background 0.1s; }
.btn-preset-rango:hover { background: #d2e3fc; }
.btn-apply { flex: 1; padding: 12px; background: #111; color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: inherit; }
.btn-cancel-sm { padding: 12px 20px; background: #f5f5f5; color: #666; border: none; border-radius: 10px; font-size: 15px; cursor: pointer; font-family: inherit; }

/* Modal gasto */
.modal-desc { font-size: 13px; color: #888; margin-bottom: 8px; padding: 0 4px; }
.modal-monto { font-size: 22px; font-weight: 500; color: #111; margin-bottom: 20px; padding: 0 4px; }
.modal-actions { display: flex; flex-direction: column; gap: 8px; }
.btn-editar { width: 100%; padding: 13px; background: #111; color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: inherit; }
.btn-eliminar { width: 100%; padding: 13px; background: #fce4ec; color: #c62828; border: none; border-radius: 10px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: inherit; }
.btn-cancelar { width: 100%; padding: 13px; background: #f5f5f5; color: #666; border: none; border-radius: 10px; font-size: 15px; cursor: pointer; font-family: inherit; }

/* Formulario */
.form-body { padding: 4px 0 8px; display: flex; flex-direction: column; gap: 14px; }
.field { display: flex; flex-direction: column; gap: 5px; }
.field label { font-size: 12px; color: #888; font-weight: 500; letter-spacing: 0.02em; }
.field input, .field select, .field textarea { width: 100%; padding: 10px 12px; border: 0.5px solid #ddd; border-radius: 8px; font-size: 15px; background: #fff; color: #111; font-family: inherit; }
.field textarea { resize: none; height: 72px; line-height: 1.5; }
.field input:focus, .field textarea:focus { outline: none; border-color: #aaa; }
.banco-group { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.banco-btn { display: flex; flex-direction: column; align-items: center; gap: 6px; padding: 10px 6px; border: 0.5px solid #ddd; border-radius: 8px; background: #fff; cursor: pointer; font-family: inherit; }
.banco-btn.active { border: 1.5px solid #1a73e8; background: #e8f0fe; }
.banco-icon { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600; }
.banco-icon.s { background: #fce4ec; color: #c62828; }
.banco-icon.f { background: #e8f5e9; color: #2e7d32; }
.banco-icon.t { background: #fff8e1; color: #f57f17; }
.banco-label { font-size: 12px; color: #666; text-align: center; }
.banco-btn.active .banco-label { color: #1a73e8; font-weight: 500; }
.dev-row { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border: 0.5px solid #ddd; border-radius: 8px; cursor: pointer; background: #fff; }
.dev-row.active { border-color: #e65100; background: #fff3e0; }
.toggle-box { width: 18px; height: 18px; border: 1.5px solid #ccc; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.dev-row.active .toggle-box { border-color: #e65100; }
.toggle-check { font-size: 11px; color: #e65100; display: none; }
.dev-row.active .toggle-check { display: block; }
.dev-label { font-size: 14px; color: #111; }
.dev-hint { font-size: 12px; color: #bbb; margin-left: auto; }
.dev-row.active .dev-hint { color: #e65100; }
.monto-wrap { position: relative; }
.monto-prefix { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); font-size: 15px; color: #999; pointer-events: none; }
.monto-wrap input { padding-left: 28px; }
.btn-guardar { width: 100%; padding: 13px; background: #111; color: #fff; border: none; border-radius: 10px; font-size: 15px; font-weight: 500; cursor: pointer; font-family: inherit; margin-top: 4px; }
.btn-guardar-sec { width: 100%; padding: 12px; background: #f5f5f5; color: #555; border: none; border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: inherit; margin-top: 8px; }
.intl-banner { background: #f0f7ff; border: 0.5px solid #c8dffe; border-radius: 10px; padding: 11px 13px; display: flex; align-items: flex-start; gap: 8px; font-size: 13px; color: #1a4a7a; line-height: 1.45; margin-top: 8px; }
.intl-banner-icon { font-size: 16px; flex-shrink: 0; margin-top: -1px; }
.intl-progress-label { display: flex; justify-content: space-between; font-size: 12px; color: #888; margin-bottom: 5px; }
.intl-progress-track { height: 5px; background: #eee; border-radius: 3px; overflow: hidden; }
.intl-progress-fill { height: 100%; border-radius: 3px; transition: width 0.2s, background 0.2s; }
.intl-item-row { background: #f9f9f9; border: 0.5px solid #e8e8e8; border-radius: 10px; padding: 12px; margin-bottom: 8px; display: flex; flex-direction: column; gap: 8px; }
.intl-item-top { display: flex; gap: 8px; align-items: center; }
.intl-item-clp { font-size: 12px; color: #888; text-align: right; }
.intl-item-clp strong { font-size: 14px; color: #111; font-weight: 600; }
.intl-item-input { flex: 1; padding: 8px 10px; border: 0.5px solid #e0e0e0; border-radius: 8px; font-size: 13px; font-family: inherit; background: #fff; }
.intl-item-usd-wrap { display: flex; align-items: center; gap: 6px; }
.intl-item-usd-prefix { font-size: 13px; color: #888; }
.intl-item-usd { width: 90px; padding: 8px 10px; border: 0.5px solid #e0e0e0; border-radius: 8px; font-size: 13px; font-family: inherit; background: #fff; text-align: right; }
.intl-item-del { width: 28px; height: 28px; border-radius: 50%; background: #fce4ec; border: none; cursor: pointer; color: #c62828; font-size: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.intl-subcat-sel { width: 100%; padding: 8px 10px; border: 0.5px solid #e0e0e0; border-radius: 8px; font-size: 13px; font-family: inherit; background: #fff; color: #111; }
.intl-add-btn { width: 100%; padding: 11px; background: #f0f7ff; color: #1a73e8; border: 0.5px solid #c8dffe; border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer; font-family: inherit; margin-bottom: 12px; }
.intl-tipo-cambio { font-size: 12px; color: #888; margin-bottom: 12px; text-align: right; }
.intl-tipo-cambio strong { color: #1a73e8; }
.intl-confirm-item { display: flex; justify-content: space-between; align-items: flex-start; padding: 10px 0; border-bottom: 0.5px solid #f0f0f0; }
.intl-confirm-item:last-child { border-bottom: none; }
.intl-confirm-desc { font-size: 13px; color: #111; font-weight: 500; }
.intl-confirm-sub { font-size: 11px; color: #888; margin-top: 2px; }
.intl-confirm-amts { text-align: right; flex-shrink: 0; }
.intl-confirm-clp { font-size: 14px; color: #111; font-weight: 600; }
.intl-confirm-usd { font-size: 11px; color: #888; margin-top: 2px; }
.subcat-wrap { position: relative; }
.subcat-row { display: flex; gap: 6px; }
.subcat-row input { flex: 1; padding: 10px 12px; border: 0.5px solid #ddd; border-radius: 8px; font-size: 15px; background: #fff; color: #111; font-family: inherit; }
.subcat-row input:focus { outline: none; border-color: #aaa; }
.btn-lista { padding: 0 12px; border: 0.5px solid #ddd; border-radius: 8px; background: #f5f5f5; cursor: pointer; font-size: 16px; color: #666; display: flex; align-items: center; }
.btn-lista.active { background: #e8f0fe; border-color: #1a73e8; color: #1a73e8; }
.suggestions { position: absolute; top: calc(100% + 4px); left: 0; right: 0; background: #fff; border: 0.5px solid #ddd; border-radius: 8px; z-index: 10; max-height: 200px; overflow-y: auto; box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
.sug-group { padding: 6px 12px 3px; font-size: 11px; font-weight: 500; color: #aaa; letter-spacing: 0.04em; background: #f9f9f9; border-bottom: 0.5px solid #eee; position: sticky; top: 0; }
.sug-item { padding: 9px 12px; font-size: 14px; cursor: pointer; color: #111; border-bottom: 0.5px solid #f0f0f0; display: flex; justify-content: space-between; align-items: center; }
.sug-item:last-child { border-bottom: none; }
.sug-item:hover { background: #f5f5f5; }
.cat-badge-row { display: flex; align-items: center; gap: 6px; margin-top: 4px; }
.cat-badge { display: inline-block; padding: 3px 8px; border-radius: 6px; font-size: 11px; background: #e8f0fe; color: #1a73e8; font-weight: 500; }
.ie-badge { font-size: 11px; padding: 2px 6px; border-radius: 6px; font-weight: 500; }
.ie-E { background: #fce4ec; color: #c62828; }
.ie-I { background: #e8f5e9; color: #2e7d32; }

/* Ajustes menu */
.ajustes-menu { background: #fff; border-radius: 10px; border: 0.5px solid #e0e0e0; overflow: hidden; margin-bottom: 16px; }
.ajustes-item { display: flex; align-items: center; gap: 12px; padding: 14px 16px; cursor: pointer; border-bottom: 0.5px solid #f0f0f0; }
.ajustes-item:last-child { border-bottom: none; }
.ajustes-item:hover { background: #f9f9f9; }
.ajustes-icon { font-size: 20px; width: 32px; text-align: center; }
.ajustes-label { font-size: 15px; color: #111; flex: 1; }
.ajustes-arrow { font-size: 13px; color: #ccc; }

/* Toast */
/* ── SKELETON ───────────────────────────────────────────── */
@keyframes shimmer {
  0%{background-position:-400px 0}
  100%{background-position:400px 0}
}
.skeleton {
  background: linear-gradient(90deg,#ebebeb 25%,#f5f5f5 50%,#ebebeb 75%);
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
  background: #111; color: #fff; padding: 8px 20px; border-radius: 20px;
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
  .mes-nav { border-radius: 10px; margin: 12px 0 0; border: 0.5px solid #e0e0e0; }
  .rango-btn { border-radius: 10px; margin: 12px 0 0; border: 0.5px solid #e0e0e0; }
  .search-wrap { border-radius: 10px; margin: 8px 0 0; border: 0.5px solid #e0e0e0; position: relative; top: 0; }
  .resumen-strip { border-radius: 10px; margin: 8px 0 0; border: 0.5px solid #e0e0e0; }
  .resumen-grid { border-radius: 10px; margin: 12px 0 0; border: 0.5px solid #e0e0e0; }
  .ppto-total-bar { border-radius: 10px; margin: 12px 0 0; border: 0.5px solid #e0e0e0; }
  .section-header { padding-left: 0; }
  .ppto-cat-group { margin: 0 0 8px; }
}

@media (min-width: 1100px) {
  .content { max-width: 1100px; }
  .cat-list { grid-template-columns: repeat(3, 1fr); }
}

/* Prevenir zoom en Safari iOS al enfocar inputs (requiere font-size >= 16px) */
@media (max-width: 768px) {
  input, select, textarea { font-size: 16px !important; }
}

@keyframes spin { to { transform: rotate(360deg); } }

.section-label { padding:16px 16px 8px; font-size:11px; font-weight:500; color:#888; letter-spacing:0.06em; }
.kpi-grid-2 { display:grid; grid-template-columns:1fr 1fr; gap:8px; padding:0 12px; }
.kpi-card { background:#fff; border-radius:12px; padding:14px 12px; border:0.5px solid #e8e8e8; display:flex; flex-direction:column; gap:4px; }
.kpi-label { font-size:10px; color:#888; font-weight:500; letter-spacing:0.04em; }
.kpi-valor { font-size:17px; font-weight:600; color:#111; margin-top:2px; }
.kpi-sub { font-size:11px; color:#999; margin-top:2px; }
.kpi-badge { display:inline-block; padding:2px 7px; border-radius:10px; font-size:10px; font-weight:600; margin-top:4px; width:fit-content; }
.badge-s { background:#fce4ec; color:#c62828; }
.badge-f { background:#e8f5e9; color:#2e7d32; }
.badge-tc { background:#fff8e1; color:#f57f17; }
.kpi-card-full { background:#fff; border-radius:12px; padding:14px 12px; border:0.5px solid #e8e8e8; margin:0 12px; display:flex; align-items:center; gap:14px; }
.kpi-card-falabella { background:#fff; border-radius:12px; padding:14px 12px; border:0.5px solid #e8e8e8; margin:0 12px; }
.falabella-row { display:flex; align-items:center; gap:14px; }
.falabella-compras { background:#e8f5e9; border-radius:10px; padding:8px 14px; text-align:center; flex-shrink:0; }
.falabella-compras-num { font-size:22px; font-weight:700; color:#2e7d32; }
.falabella-compras-label { font-size:10px; color:#2e7d32; font-weight:500; }
.section-label-row { display:flex; align-items:baseline; justify-content:space-between; padding:16px 16px 8px; }
.section-label-main { font-size:11px; font-weight:500; color:#888; letter-spacing:0.06em; }
.section-label-sub { font-size:10px; color:#bbb; font-weight:400; }
.cat-kpi-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; padding:0 12px; }
.cat-kpi-card { background:#fff; border-radius:12px; padding:12px; border:0.5px solid #e8e8e8; }
.cat-kpi-nombre { font-size:11px; font-weight:500; color:#888; letter-spacing:0.03em; margin-bottom:6px; }
.cat-kpi-monto { font-size:16px; font-weight:600; color:#111; }
.cat-kpi-comparacion { display:flex; align-items:center; gap:4px; margin-top:5px; flex-wrap:wrap; }
.cat-kpi-prom { font-size:11px; color:#999; }
.cat-kpi-diff { font-size:11px; font-weight:600; padding:1px 5px; border-radius:6px; }
.diff-ok { background:#e8f5e9; color:#2e7d32; }
.diff-over { background:#fce4ec; color:#c62828; }
.cat-kpi-barra { margin-top:7px; height:4px; background:#eee; border-radius:2px; overflow:hidden; }
.cat-kpi-fill { height:100%; border-radius:2px; }
.home-chart-container { background:#fff; border-radius:12px; margin:0 12px; border:0.5px solid #e8e8e8; padding:14px 12px 10px; position:relative; }
.home-chart-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
.home-chart-titulo { font-size:13px; font-weight:500; color:#111; }
.home-filtro-btn { display:flex; align-items:center; gap:5px; font-size:11px; color:#1a73e8; background:#e8f0fe; border:none; border-radius:6px; padding:5px 10px; cursor:pointer; font-family:inherit; font-weight:500; transition:all 0.15s; }
.home-filtro-panel { background:#f9f9f9; border-radius:12px; margin:0 12px 8px; border:0.5px solid #e0e0e0; overflow:hidden; max-height:0; transition:max-height 0.3s ease; }
.home-filtro-panel.open { max-height:500px; }
.home-filtro-inner { padding:14px 12px 12px; }
.home-filtro-panel-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:14px; }
.home-filtro-panel-titulo { font-size:13px; font-weight:500; color:#111; }
.home-filtro-close { width:26px; height:26px; border-radius:50%; background:#ebebeb; border:none; cursor:pointer; font-size:13px; color:#666; display:flex; align-items:center; justify-content:center; }
.home-chip { padding:5px 11px; border-radius:14px; font-size:12px; border:0.5px solid #e0e0e0; background:#fff; color:#555; cursor:pointer; font-family:inherit; transition:all 0.15s; }
.home-chip.active { border-color:#1a73e8; background:#e8f0fe; color:#1a73e8; font-weight:500; }
.home-chip.subcat { font-size:11px; padding:4px 9px; border-radius:10px; }
.home-chip.subcat.active { border-color:#00695c; background:#e0f7fa; color:#00695c; }
.home-chart-legend { display:flex; gap:14px; margin-top:8px; flex-wrap:wrap; }
.home-legend-item { display:flex; align-items:center; gap:5px; font-size:10px; color:#888; }
.home-legend-dot { width:8px; height:8px; border-radius:50%; flex-shrink:0; }
.home-tooltip { position:absolute; background:#111; color:#fff; font-size:11px; padding:6px 10px; border-radius:8px; pointer-events:none; white-space:nowrap; z-index:200; display:none; line-height:1.6; }

/* ── VALIDACIÓN ────────────────────────────────────────── */
.val-ahorro-card { margin: 12px 12px 4px; border-radius: 10px; padding: 13px 14px; background: #e8f0fe; border: 0.5px solid #aac4f0; }
.val-ahorro-card.realizado { background: #e8f5e9; border-color: #a5d6a7; }
.val-ahorro-title { font-size: 10px; font-weight: 500; color: #1a73e8; letter-spacing: 0.06em; margin-bottom: 8px; }
.val-ahorro-card.realizado .val-ahorro-title { color: #2e7d32; }
.val-ahorro-row { display: flex; justify-content: space-between; align-items: center; padding: 3px 0; font-size: 13px; }
.val-ahorro-divider { height: 0.5px; background: #c5d4f7; margin: 6px 0; }
.val-ahorro-card.realizado .val-ahorro-divider { background: #a5d6a7; }
.val-ahorro-total { font-size: 16px; font-weight: 500; color: #1a73e8; }
.val-ahorro-card.realizado .val-ahorro-total { color: #2e7d32; }
.val-ahorro-badge { padding: 3px 10px; border-radius: 14px; font-size: 11px; font-weight: 500; }
.badge-ahorrado { background: #c8e6c9; color: #1b5e20; }
.badge-pendiente { background: #bbdefb; color: #0d47a1; }
.val-summary-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; padding: 10px 12px 6px; }
.val-s-card { background: #f5f5f5; border-radius: 10px; padding: 11px 12px; }
.val-s-label { font-size: 10px; color: #888; font-weight: 500; letter-spacing: 0.04em; margin-bottom: 3px; }
.val-s-valor { font-size: 16px; font-weight: 500; color: #111; }
.val-s-sub { font-size: 11px; color: #999; margin-top: 2px; }
.val-filter-row { padding: 6px 12px 8px; display: flex; gap: 6px; flex-wrap: wrap; }
.val-chip { padding: 5px 12px; border-radius: 14px; font-size: 12px; border: 0.5px solid #e0e0e0; background: #fff; color: #555; cursor: pointer; font-family: inherit; }
.val-chip.active { border-color: #1a73e8; background: #e8f0fe; color: #1a73e8; font-weight: 500; }
.val-cat-block { border: 0.5px solid #e8e8e8; border-radius: 10px; margin: 0 12px 6px; overflow: hidden; }
.val-group-header { display: flex; justify-content: space-between; align-items: center; padding: 8px 12px; background: #f9f9f9; font-size: 11px; font-weight: 500; color: #888; border-bottom: 0.5px solid #f0f0f0; letter-spacing: 0.04em; }
.val-item-row { display: flex; align-items: center; gap: 0; padding: 10px 12px; border-bottom: 0.5px solid #f5f5f5; background: #fff; }
.val-item-row:last-of-type { border-bottom: none; }
.val-check { width: 26px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.val-dot { width: 17px; height: 17px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 600; flex-shrink: 0; }
.val-dot.paid { background: #e8f5e9; color: #2e7d32; border: 1px solid #a5d6a7; }
.val-dot.unpaid { background: #f5f5f5; border: 1.5px solid #e0e0e0; }
.val-dot.partial { background: #fff8e1; color: #f57f17; border: 1px solid #ffe082; }
.val-info { flex: 1; min-width: 0; }
.val-name { font-size: 13px; color: #111; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.val-meta { font-size: 11px; color: #999; margin-top: 2px; display: flex; gap: 5px; align-items: center; }
.val-medio { padding: 1px 6px; border-radius: 4px; font-size: 10px; font-weight: 500; }
.val-medio-transf { background: #e8f0fe; color: #1a73e8; }
.val-medio-tc { background: #fff8e1; color: #f57f17; }
.val-medio-debito { background: #e0f7fa; color: #00695c; }
.val-medio-otro { background: #f3e5f5; color: #7b1fa2; }
.val-montos { text-align: right; flex-shrink: 0; min-width: 78px; }
.val-pagado { font-size: 13px; font-weight: 500; }
.val-ppto { font-size: 11px; color: #999; }
.val-diff-over { font-size: 10px; color: #c62828; }
.val-diff-ok { font-size: 10px; color: #2e7d32; }
.val-subtotal { display: flex; justify-content: space-between; align-items: center; padding: 7px 12px; background: #f5f5f5; font-size: 12px; border-top: 0.5px solid #eeeeee; }
.val-legend { display: flex; gap: 12px; padding: 4px 14px 8px; flex-wrap: wrap; }
.val-legend-item { display: flex; align-items: center; gap: 5px; font-size: 11px; color: #888; }
.val-legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

.btn-dividir-accion {
  width: 100%; padding: 13px;
  background: #f5f5f5; color: #111;
  border: 0.5px solid #e0e0e0; border-radius: 10px;
  font-size: 15px; font-weight: 500; cursor: pointer;
  font-family: inherit; margin-bottom: 8px;
  display: flex; align-items: center; justify-content: center; gap: 8px;
}
.dividir-header {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;
}
.dividir-back-btn {
  background: none; border: none; cursor: pointer;
  font-size: 13px; color: #1a73e8; font-family: inherit; padding: 0;
}
.dividir-total-card {
  background: #f5f5f5; border-radius: 10px;
  padding: 10px 12px; margin-bottom: 10px;
  display: flex; justify-content: space-between; align-items: center;
}
.dividir-total-label { font-size: 10px; font-weight: 500; color: #888; letter-spacing: .04em; margin-bottom: 2px; }
.dividir-total-monto { font-size: 17px; font-weight: 500; color: #111; }
.dividir-total-sub { font-size: 11px; color: #999; margin-top: 1px; }
.dividir-progress-bar { height: 4px; background: #eee; border-radius: 3px; margin-top: 8px; overflow: hidden; }
.dividir-progress-fill { height: 100%; border-radius: 3px; transition: width .2s, background .2s; }
.dividir-asig-row { display: flex; justify-content: space-between; margin-top: 5px; font-size: 11px; }
.dividir-section-hdr {
  display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;
}
.dividir-section-label { font-size: 11px; font-weight: 500; color: #888; letter-spacing: .04em; }
.dividir-btn-add-part { font-size: 12px; color: #1a73e8; background: none; border: none; cursor: pointer; font-family: inherit; }
.dividir-parts-scroll { max-height: 240px; overflow-y: auto; margin-bottom: 10px; }
.dividir-part-card {
  background: #fff; border: 0.5px solid #e8e8e8;
  border-radius: 10px; padding: 10px 11px; margin-bottom: 6px;
}
.dividir-part-top { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
.dividir-part-num {
  width: 20px; height: 20px; border-radius: 50%;
  background: #f0f0f0; font-size: 10px; font-weight: 500;
  color: #888; display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.dividir-part-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.dividir-part-sel {
  flex: 1; font-size: 13px; color: #111; background: none;
  border: none; cursor: pointer; text-align: left; padding: 0; font-family: inherit;
}
.dividir-part-sel.empty { color: #1a73e8; }
.dividir-part-remove { background: none; border: none; cursor: pointer; font-size: 16px; color: #bbb; line-height: 1; }
.dividir-part-bottom { display: flex; align-items: center; gap: 7px; }
.dividir-monto-wrap { position: relative; flex: 1; }
.dividir-monto-pfx { position: absolute; left: 9px; top: 50%; transform: translateY(-50%); font-size: 14px; color: #999; }
.dividir-monto-inp {
  width: 100%; padding: 8px 9px 8px 21px;
  border: 0.5px solid #ddd; border-radius: 8px;
  font-size: 14px; color: #111; font-family: inherit; background: #f9f9f9;
}
.dividir-monto-inp:focus { outline: none; border-color: #1a73e8; background: #fff; }
.dividir-pct-pill {
  font-size: 10px; padding: 3px 7px; border-radius: 8px;
  background: #e8f0fe; color: #1a73e8; font-weight: 500; flex-shrink: 0;
}
.dividir-btn-resto {
  font-size: 10px; color: #1a73e8; background: #e8f0fe;
  border: none; border-radius: 5px; padding: 3px 7px;
  cursor: pointer; flex-shrink: 0; font-family: inherit;
}
.dividir-status-badge {
  border-radius: 8px; padding: 8px 11px;
  font-size: 11px; font-weight: 500; text-align: center; margin-bottom: 10px;
}
.dividir-st-ok { background: #e8f5e9; color: #2e7d32; }
.dividir-st-over { background: #fce4ec; color: #c62828; }
.dividir-st-under { background: #f5f5f5; color: #666; }
.btn-dividir-guardar {
  width: 100%; padding: 13px; border: none; border-radius: 10px;
  font-size: 15px; font-weight: 500; cursor: pointer; font-family: inherit; margin-bottom: 8px;
}
.btn-dividir-guardar.habilitado { background: #111; color: #fff; }
.btn-dividir-guardar.deshabilitado { background: #999; color: #fff; opacity: .4; cursor: default; }

/* ── CUOTAS TC ─────────────────────────────────────────── */
.cuotas-add-btn { display:flex; align-items:center; justify-content:center; gap:7px; width:100%; padding:11px 16px; background:#e8f0fe; color:#1a73e8; border:0.5px solid #aac4f0; border-radius:10px; font-size:14px; font-weight:600; cursor:pointer; font-family:inherit; margin:14px 0 10px; }
.cuotas-kpi-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; padding:0 12px 8px; }
.cuotas-kpi-card { background:#fff; border-radius:12px; padding:13px 12px; border:0.5px solid #e8e8e8; }
.cuotas-card { background:#fff; border-radius:14px; padding:14px 14px 10px; border:0.5px solid #e8e8e8; margin-bottom:8px; box-shadow:0 1px 4px rgba(0,0,0,0.04); }
.cuotas-card-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:10px; }
.cuotas-card-info { flex:1; min-width:0; }
.cuotas-card-desc { font-size:14px; font-weight:600; color:#111; margin-bottom:3px; }
.cuotas-card-tags { display:flex; gap:5px; align-items:center; flex-wrap:wrap; margin-top:2px; }
.cuotas-tarjeta-gold { background:#fff8e1; color:#f57f17; padding:2px 7px; border-radius:5px; font-size:10px; font-weight:500; }
.cuotas-tarjeta-visa { background:#e8f0fe; color:#1a73e8; padding:2px 7px; border-radius:5px; font-size:10px; font-weight:500; }
.cuotas-card-monto { text-align:right; flex-shrink:0; margin-left:12px; }
.cuotas-monto-cuota { font-size:18px; font-weight:700; }
.cuotas-progress-label { display:flex; justify-content:space-between; margin-bottom:4px; font-size:11px; color:#888; }
.cuotas-progress-bar { height:6px; background:#eee; border-radius:3px; overflow:hidden; margin-bottom:8px; }
.cuotas-progress-fill { height:100%; border-radius:3px; transition:width 0.3s; }
.cuotas-card-footer { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px; }
.cuotas-badges { display:flex; gap:6px; flex-wrap:wrap; }
.cuotas-badge-pagadas { background:#e8f0fe; border-radius:8px; padding:5px 10px; font-size:11px; color:#1a73e8; font-weight:500; }
.cuotas-badge-restantes { background:#fce4ec; border-radius:8px; padding:5px 10px; font-size:11px; color:#c62828; font-weight:500; }
.cuotas-badge-pendiente { background:#fff8e1; border-radius:8px; padding:5px 10px; font-size:11px; color:#f57f17; font-weight:500; }
.cuotas-pagar-btn { padding:7px 14px; background:#111; color:#fff; border:none; border-radius:9px; font-size:12px; font-weight:600; cursor:pointer; font-family:inherit; display:flex; align-items:center; gap:5px; }
.cuotas-tabs { display:flex; gap:0; margin:0 12px 8px; background:#f0f0f0; border-radius:10px; padding:3px; }
.cuotas-tab { flex:1; padding:7px 0; border:none; cursor:pointer; border-radius:8px; font-size:13px; background:transparent; color:#888; font-family:inherit; transition:all 0.15s; }
.cuotas-tab.active { background:#fff; color:#111; font-weight:600; box-shadow:0 1px 4px rgba(0,0,0,0.08); }
.cuotas-tarjeta-group { display:grid; grid-template-columns:1fr 1fr; gap:8px; }
.cuotas-tarjeta-btn { display:flex; flex-direction:column; align-items:center; gap:6px; padding:10px 6px; border:0.5px solid #ddd; border-radius:8px; background:#fff; cursor:pointer; font-family:inherit; transition:all 0.1s; }
.cuotas-tarjeta-btn.active-gold { border:1.5px solid #f57f17; background:#fff8e1; }
.cuotas-tarjeta-btn.active-visa { border:1.5px solid #1a73e8; background:#e8f0fe; }
.cuotas-tarjeta-icon { width:36px; height:36px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:11px; font-weight:700; }
.cuotas-tarjeta-icon.gold { background:#fff8e1; color:#f57f17; }
.cuotas-tarjeta-icon.visa { background:#e8f0fe; color:#1a73e8; }
.cuad-check-btn {
  position: absolute; top: 10px; right: 10px;
  width: 24px; height: 24px; border-radius: 50%;
  background: #e8f5e9; border: 0.5px solid #a5d6a7;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0;
}
.cuad-check-btn svg { width: 13px; height: 13px; }
.eye-toggle-btn {
  width: 26px; height: 26px; border-radius: 50%;
  background: #F2F2F7; border: none; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; color: #8e8e93;
}
.eye-toggle-btn.hidden {
  background: rgba(0,122,255,0.12);
  color: #007AFF;
}
.cuad-result-ok {
  background: #e8f5e9; border-radius: 10px;
  padding: 12px 14px; margin-bottom: 14px;
}
.cuad-result-ok-title { font-size: 14px; font-weight: 500; color: #2e7d32; margin-bottom: 3px; }
.cuad-result-ok-sub { font-size: 12px; color: #388e3c; }
.cuad-result-diff {
  background: #fff8e1; border-radius: 10px;
  padding: 12px 14px; margin-bottom: 14px;
}
.cuad-result-diff-title { font-size: 14px; font-weight: 500; color: #f57f17; margin-bottom: 3px; }
.cuad-result-diff-sub { font-size: 12px; color: #f57f17; }
.cuad-diff-row {
  display: flex; justify-content: space-between;
  padding: 4px 0; font-size: 13px;
}
.cuad-diff-key { color: #888; }
.cuad-diff-val { font-weight: 500; color: #111; }
.cuad-diff-line { height: 0.5px; background: #e0e0e0; margin: 6px 0; }
.cuad-option-btn {
  width: 100%; display: flex; align-items: center; gap: 10px;
  padding: 11px 12px; border: 0.5px solid #e0e0e0; border-radius: 10px;
  background: #fff; cursor: pointer; margin-bottom: 8px;
  font-family: inherit; text-align: left;
}
.cuad-option-icon {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.cuad-option-title { font-size: 13px; font-weight: 500; color: #111; }
.cuad-option-sub { font-size: 11px; color: #999; margin-top: 1px; }
.cuad-preview-card {
  background: #f5f5f5; border-radius: 10px;
  padding: 12px 14px; margin-bottom: 14px;
}
.hcuad-kpi-grid { display:grid; grid-template-columns:1fr 1fr; gap:8px; padding:0 12px 8px; }
.hcuad-kpi { background:#f5f5f5; border-radius:10px; padding:11px 12px; }
.hcuad-kpi-label { font-size:10px; color:#888; font-weight:500; letter-spacing:.04em; margin-bottom:3px; }
.hcuad-kpi-valor { font-size:18px; font-weight:500; color:#111; }
.hcuad-kpi-sub { font-size:11px; color:#999; margin-top:2px; }
.hcuad-filtro-btn { width:100%; display:flex; align-items:center; justify-content:space-between; padding:10px 13px; background:#fff; border:0.5px solid #e0e0e0; border-radius:10px; font-family:inherit; cursor:pointer; font-size:13px; color:#555; margin:0 12px 4px; width:calc(100% - 24px); }
.hcuad-filtro-panel { background:#fff; border:0.5px solid #e0e0e0; border-top:none; border-radius:0 0 10px 10px; padding:12px; margin:0 12px 10px; }
.hcuad-chip { padding:5px 11px; border-radius:14px; font-size:12px; border:0.5px solid #e0e0e0; background:#fff; color:#555; cursor:pointer; font-family:inherit; }
.hcuad-chip.active { border-color:#1a73e8; background:#e8f0fe; color:#1a73e8; font-weight:500; }
.hcuad-card { background:#fff; border-radius:12px; padding:13px 13px 11px; border:0.5px solid #e8e8e8; margin:0 12px 7px; }
.hcuad-card-head { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:8px; }
.hcuad-fecha { font-size:12px; color:#999; }
.hcuad-banco { font-size:14px; font-weight:500; color:#111; margin-top:2px; }
.hcuad-usuario { font-size:11px; color:#888; margin-top:1px; }
.hcuad-badge { display:inline-block; padding:3px 8px; border-radius:8px; font-size:11px; font-weight:500; }
.hcuad-badge-ok { background:#e8f5e9; color:#2e7d32; }
.hcuad-badge-dif { background:#fff8e1; color:#f57f17; }
.hcuad-badge-aj { background:#fce4ec; color:#c62828; }
.hcuad-montos { display:flex; gap:7px; flex-wrap:wrap; margin-top:8px; }
.hcuad-monto-item { flex:1; min-width:80px; background:#f5f5f5; border-radius:7px; padding:7px 9px; }
.hcuad-monto-label { font-size:10px; color:#888; font-weight:500; letter-spacing:.03em; margin-bottom:2px; }
.hcuad-monto-val { font-size:13px; font-weight:500; color:#111; }
.hcuad-nota { font-size:11px; color:#bbb; margin-top:8px; padding-top:8px; border-top:0.5px solid #f0f0f0; }
body.sheet-open { overflow: hidden; position: fixed; width: 100%; }

  `

  const htmlContent = `
<div class="app">

  <!-- NAVBAR -->
  <nav class="navbar">
    <div style="display:flex;align-items:center;gap:10px;">
      <div style="display:flex;align-items:center;gap:6px;">
        <button class="btn-hamburger" id="btn-hamburger" onclick="abrirDrawer()">
          <div class="ham-line"></div>
          <div class="ham-line"></div>
          <div class="ham-line"></div>
        </button>
        <button onclick="switchScreen('home')" style="width:32px;height:32px;border-radius:8px;background:none;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;padding:0;" title="Home">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9.5L10 3l7 6.5" stroke="#555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5 8.5V16a1 1 0 001 1h3v-4h2v4h3a1 1 0 001-1V8.5" stroke="#555" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <span class="navbar-brand" id="navbar-title"><span class="brand-prefix">Gastos FWV</span> - Resumen</span>
    </div>
    <div class="navbar-right" style="display:flex;align-items:center;gap:8px;">
      <button id="btn-eye-all" onclick="toggleEyeAll()" style="width:32px;height:32px;border-radius:50%;background:#F2F2F7;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;color:#8e8e93;" title="Ocultar todos los montos">
        <svg id="eye-all-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
      </button>
      <button id="btn-add-nav" onclick="abrirNuevoGasto()" style="width:32px;height:32px;background:#111;color:#fff;border:none;border-radius:50%;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;font-family:inherit;">+</button>
    </div>
  </nav>

  <!-- DRAWER (mobile) -->
  <div class="drawer-overlay" id="drawer-overlay" onclick="cerrarDrawer()"></div>
  <div class="drawer" id="drawer">
    <div class="drawer-header" style="flex-direction:column;align-items:stretch;gap:0;padding:0;">
      <a href="/home" style="display:flex;align-items:center;gap:8px;padding:12px 20px 10px;font-size:13px;color:#1a73e8;text-decoration:none;font-family:inherit;font-weight:500;border-bottom:0.5px solid #f0f0f0;">
        <span style="font-size:15px;line-height:1;">←</span> Volver a Apps
      </a>
      <div style="display:flex;align-items:center;justify-content:space-between;padding:12px 20px 12px;">
        <span class="drawer-brand">Gastos FWV</span>
        <button class="drawer-close" onclick="cerrarDrawer()">✕</button>
      </div>
    </div>
    <div class="drawer-links">
      <button class="drawer-link drawer-item-indent active" data-screen="home" onclick="switchScreen('home');cerrarDrawer()">
        Home
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
    <div style="padding:8px 16px 16px;">
      <button style="width:100%;padding:13px;background:#111;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit;" onclick="abrirNuevoGasto();cerrarDrawer()">+ Nuevo gasto</button>
    </div>
  </div>

  <!-- CONTENT -->
  <main class="content">

    <!-- DASHBOARD -->
    <div class="screen" id="screen-dashboard">
      <div class="mes-nav">
        <button class="mes-arrow" id="dash-prev">‹</button>
        <span class="mes-label" id="dash-mes">Abril 2026</span>
        <button class="mes-arrow" id="dash-next">›</button>
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
        <div class="res-card-accent" style="border-left-color:#1a73e8;">
          <span class="resumen-label">PRESUPUESTO</span>
          <span class="resumen-valor" id="d-ppto" style="display:block;margin-top:4px;">$0</span>
          <span class="resumen-sub" id="d-libre" style="margin-top:3px;display:block;"></span>
        </div>
      </div>
      <div class="resumen-grid-2">
        <div class="res-card-accent" style="border-left-color:#1a73e8;">
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
      <div class="rango-btn" id="rango-btn">
        <span class="rango-label" id="rango-label">Abr 2026 — Abr 2026</span>
        <span style="font-size:13px;color:#999;">▼</span>
      </div>
      <div class="search-wrap">
        <div style="display:flex;gap:6px;align-items:center;">
          <div style="position:relative;flex:1;">
            <span class="search-icon">🔍</span>
            <input class="search-input" id="buscador" placeholder="Buscar gasto..." />
          </div>
          <button id="det-orden-pill" style="padding:6px 10px;border-radius:8px;font-size:12px;border:0.5px solid #1a73e8;background:#e8f0fe;color:#1a73e8;cursor:pointer;font-family:inherit;white-space:nowrap;">Reciente</button>
          <button id="det-filtro-btn" style="width:32px;height:32px;border:0.5px solid #e0e0e0;border-radius:8px;background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M2 4h12M5 8h6M7 12h2" stroke="#666" stroke-width="1.5" stroke-linecap="round"/></svg>
          </button>
          <button id="btn-modo-seleccion" onclick="toggleModoSeleccion()"
            style="padding:6px 11px;border-radius:8px;font-size:12px;font-weight:500;border:0.5px solid #1a73e8;background:#e8f0fe;color:#1a73e8;cursor:pointer;font-family:inherit;white-space:nowrap;flex-shrink:0;">
            ✓ Seleccionar
          </button>
        </div>
      </div>
      <div id="selection-bar" style="display:none;background:#e8f0fe;border-bottom:0.5px solid #c5d9f7;padding:8px 12px;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:8px;">
          <div id="check-all-btn" onclick="toggleSeleccionTodos()"
            style="width:20px;height:20px;border-radius:4px;border:1.5px solid #1a73e8;background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;">
          </div>
          <span id="sel-count-label" style="font-size:13px;font-weight:500;color:#1a73e8;">0 seleccionados</span>
        </div>
        <div style="display:flex;gap:6px;">
          <button onclick="toggleModoSeleccion()"
            style="padding:5px 12px;border-radius:8px;font-size:12px;border:0.5px solid #aac4f0;background:#fff;color:#1a73e8;cursor:pointer;font-family:inherit;">
            Cancelar
          </button>
          <button id="btn-cambiar-fecha" onclick="abrirModalCambioFecha()"
            style="padding:5px 12px;border-radius:8px;font-size:12px;border:none;background:#1a73e8;color:#fff;cursor:pointer;font-family:inherit;font-weight:500;opacity:0.4;">
            Cambiar fecha →
          </button>
        </div>
      </div>
      <div id="det-filter-panel" style="display:none;background:#fff;padding:12px 16px;border-bottom:0.5px solid #e0e0e0;z-index:20;position:relative;"></div>
      <div class="resumen-strip">
        <div class="strip-item"><span class="strip-label">INGRESOS</span><span class="strip-valor i" id="s-i">$0</span></div>
        <div class="strip-sep"></div>
        <div class="strip-item"><span class="strip-label">EGRESOS</span><span class="strip-valor e" id="s-e">$0</span></div>
        <div class="strip-sep"></div>
        <div class="strip-item"><span class="strip-label">EGRESO REAL</span><span class="strip-valor e" id="s-e-real">$0</span></div>
        <div class="strip-sep"></div>
        <div class="strip-item"><span class="strip-label">MOVIMIENTOS</span><span class="strip-valor" id="s-n" style="color:#111">0</span></div>
      </div>
      <div class="lista" id="lista"></div>
    </div>

    <!-- PRESUPUESTO -->
    <div class="screen" id="screen-presupuesto">
      <div class="mes-nav">
        <button class="mes-arrow" id="ppto-prev">‹</button>
        <span class="mes-label" id="ppto-mes">Abril 2026</span>
        <button class="mes-arrow" id="ppto-next">›</button>
      </div>
      <div class="ppto-total-bar">
        <div class="ppto-total-row">
          <span class="ppto-total-label">TOTAL PRESUPUESTADO</span>
          <span class="ppto-total-monto" id="ppto-total">$0</span>
        </div>
        <div class="ppto-total-row" style="margin-bottom:4px;">
          <span class="ppto-total-sub" id="ppto-real-txt"></span>
          <span class="ppto-total-sub" id="ppto-libre-txt"></span>
        </div>
        <div class="ppto-global-bar"><div class="ppto-global-fill" id="ppto-global-fill" style="width:0%"></div></div>
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
      <div class="mes-nav">
        <button class="mes-arrow" id="val-prev">‹</button>
        <span class="mes-label" id="val-mes">Abril 2026</span>
        <button class="mes-arrow" id="val-next">›</button>
      </div>
      <div id="val-content"></div>
    </div>

    <!-- CUOTAS TC -->
    <div class="screen" id="screen-cuotas">
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
      <div style="padding:14px 12px 8px;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;" id="hcuad-kpis"></div>
      </div>
      <div style="padding:0 12px 6px;">
        <button onclick="toggleHcuadFiltros()" style="width:100%;display:flex;align-items:center;justify-content:space-between;padding:10px 13px;background:#fff;border:0.5px solid #e0e0e0;border-radius:10px;font-family:inherit;cursor:pointer;font-size:13px;color:#555;">
          <div style="display:flex;align-items:center;gap:7px;">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3h12M3 7h8M5 11h4" stroke="#555" stroke-width="1.3" stroke-linecap="round"/></svg>
            Filtros
            <span id="hcuad-filtro-badge" style="display:none;background:#e8f0fe;color:#1a73e8;font-size:10px;padding:1px 6px;border-radius:8px;font-weight:500;"></span>
          </div>
          <span id="hcuad-filtro-chev" style="font-size:11px;color:#bbb;transition:transform 0.2s;">▼</span>
        </button>
        <div id="hcuad-filtro-panel" style="display:none;background:#fff;border:0.5px solid #e0e0e0;border-top:none;border-radius:0 0 10px 10px;padding:12px;">
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
      <div class="section-label">CUENTAS CORRIENTES</div>
      <div class="kpi-grid-2" style="padding-bottom:0;">
        <div class="kpi-card" id="kpi-sant" style="position:relative;">
          <div class="kpi-label">SANTANDER</div>
          <div class="kpi-valor" id="kpi-sant-val"><span class="skeleton skeleton-valor"></span></div>
          <div class="kpi-badge badge-s">Cuenta corriente</div>
          <button class="cuad-check-btn" onclick="abrirCuadratura('Santander')" title="Cuadrar saldo">
            <svg viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" fill="#e8f5e9" stroke="#a5d6a7" stroke-width="1"/>
              <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#2e7d32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
        <div class="kpi-card" id="kpi-fala" style="position:relative;">
          <div class="kpi-label">FALABELLA</div>
          <div class="kpi-valor" id="kpi-fala-val"><span class="skeleton skeleton-valor"></span></div>
          <div class="kpi-badge badge-f">Cuenta corriente</div>
          <button class="cuad-check-btn" onclick="abrirCuadratura('Falabella')" title="Cuadrar saldo">
            <svg viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" fill="#e8f5e9" stroke="#a5d6a7" stroke-width="1"/>
              <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#2e7d32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
      <div style="height:8px;"></div>
      <div class="kpi-card-falabella">
        <div class="falabella-row">
          <div class="falabella-compras">
            <div class="falabella-compras-num" id="kpi-fala-compras"><span class="skeleton" style="height:28px;width:32px;display:inline-block;"></span></div>
            <div class="falabella-compras-label">compras</div>
          </div>
          <div>
            <div class="kpi-label">ÚLTIMO MES ACTIVO FALABELLA</div>
            <div class="kpi-valor" id="kpi-fala-mes"><span class="skeleton skeleton-valor"></span></div>
          </div>
        </div>
      </div>
      <div style="height:8px;"></div>
      <div class="kpi-card-full">
        <div style="position:relative;flex:1;">
          <div class="kpi-label">TARJETA DE CRÉDITO</div>
          <div class="kpi-valor" id="kpi-tc"><span class="skeleton skeleton-valor"></span></div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:4px;">
            <div class="kpi-sub">Saldo disponible real</div>
            <div class="kpi-badge badge-tc">Tarjeta Gold Limited</div>
          </div>
          <div style="position:absolute;top:0;right:0;display:flex;align-items:center;gap:6px;">
            <button class="cuad-check-btn" style="position:relative;top:auto;right:auto;" onclick="abrirCuadratura('Tarjeta Crédito')" title="Cuadrar saldo">
              <svg viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="7" fill="#e8f5e9" stroke="#a5d6a7" stroke-width="1"/>
                <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#2e7d32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="section-label-row" style="padding-top:20px;">
        <span class="section-label-main">CATEGORÍAS CLAVE</span>
        <span class="section-label-sub" id="home-cat-periodo">—</span>
      </div>
      <div class="cat-kpi-grid">
        <div class="cat-kpi-card" id="cat-kpi-cuentas">
          <div class="cat-kpi-nombre">CUENTAS</div>
          <div class="cat-kpi-monto" id="cat-kpi-cuentas-val"><span class="skeleton skeleton-valor"></span></div>
          <div class="cat-kpi-comparacion"><span class="cat-kpi-prom">—</span></div>
          <div class="cat-kpi-barra"><div class="cat-kpi-fill" style="width:0%;background:#1a73e8;"></div></div>
        </div>
        <div class="cat-kpi-card" id="cat-kpi-super">
          <div class="cat-kpi-nombre">SUPERMERCADO</div>
          <div class="cat-kpi-monto" id="cat-kpi-super-val"><span class="skeleton skeleton-valor"></span></div>
          <div class="cat-kpi-comparacion"><span class="cat-kpi-prom">—</span></div>
          <div class="cat-kpi-barra"><div class="cat-kpi-fill" style="width:0%;background:#1a73e8;"></div></div>
        </div>
        <div class="cat-kpi-card" id="cat-kpi-mall">
          <div class="cat-kpi-nombre">MALL</div>
          <div class="cat-kpi-monto" id="cat-kpi-mall-val"><span class="skeleton skeleton-valor"></span></div>
          <div class="cat-kpi-comparacion"><span class="cat-kpi-prom">—</span></div>
          <div class="cat-kpi-barra"><div class="cat-kpi-fill" style="width:0%;background:#1a73e8;"></div></div>
        </div>
        <div class="cat-kpi-card" id="cat-kpi-comer">
          <div class="cat-kpi-nombre">SALIDAS A COMER</div>
          <div class="cat-kpi-monto" id="cat-kpi-comer-val"><span class="skeleton skeleton-valor"></span></div>
          <div class="cat-kpi-comparacion"><span class="cat-kpi-prom">—</span></div>
          <div class="cat-kpi-barra"><div class="cat-kpi-fill" style="width:0%;background:#1a73e8;"></div></div>
        </div>
      </div>

      <!-- PROYECCIÓN CUOTAS TC -->
      <div class="section-label" style="padding-top:20px;">PROYECCIÓN CUOTAS TC</div>
      <div class="home-chart-container" style="padding:14px 0 10px;overflow:hidden;">
        <div style="padding:0 12px 10px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;">
          <span class="home-chart-titulo">Pagos futuros por tarjeta de crédito</span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;padding:0 12px 12px;" id="cuotas-home-kpis"></div>
        <div style="overflow-x:auto;-webkit-overflow-scrolling:touch;padding:0 12px 4px;">
          <div id="cuotas-home-chart-wrap" style="min-width:600px;position:relative;height:220px;">
            <div id="cuotas-home-tooltip" style="position:absolute;background:#1a1a1a;color:#fff;padding:8px 11px;border-radius:8px;font-size:12px;pointer-events:none;display:none;line-height:1.7;white-space:nowrap;z-index:10;"></div>
            <canvas id="cuotasHomeChart" role="img" aria-label="Gráfico de proyección mensual de pagos en cuotas de tarjeta de crédito" style="display:block;"></canvas>
          </div>
        </div>
        <div id="cuotas-home-legend" style="display:flex;flex-wrap:wrap;gap:12px;padding:10px 12px 0;"></div>
      </div>

      <div class="section-label" style="padding-top:20px;">EVOLUCIÓN 12 MESES</div>
      <div style="display:flex;gap:8px;padding:0 12px 8px;flex-wrap:wrap;">
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
      <div class="home-chart-container">
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

  </main>


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
        <button id="btn-distribuir-intl" onclick="abrirDistribuirIntl()" style="display:none;width:100%;padding:13px;background:#e8f0fe;color:#1a73e8;border:0.5px solid #aac4f0;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit;margin-bottom:8px;align-items:center;justify-content:center;gap:8px;">🌐 Distribuir pago internacional</button>
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
        <div class="dividir-progress-fill" id="div-prog-fill" style="width:0%;background:#1a73e8;"></div>
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
  <div class="sheet">
    <div class="sheet-handle"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;padding:0 0 16px;">
      <div class="sheet-title" style="margin-bottom:0;">Nuevo gasto</div>
      <button style="width:28px;height:28px;border-radius:50%;background:#f5f5f5;border:none;cursor:pointer;font-size:14px;color:#666;" onclick="cerrar('ov-nuevo');modoEdicion=false;gastoEditandoRowIndex=null;">✕</button>
    </div>
    <div class="form-body">
      <div class="field"><label>FECHA</label><input type="date" id="f-fecha" /></div>
      <div class="field">
        <label>BANCO / MEDIO DE PAGO</label>
        <div class="banco-group">
          <button class="banco-btn" data-banco="Tarjeta Crédito"><div class="banco-icon t">TC</div><span class="banco-label">Tarjeta Crédito</span></button>
          <button class="banco-btn" data-banco="Falabella"><div class="banco-icon f">F</div><span class="banco-label">Falabella</span></button>
          <button class="banco-btn" data-banco="Santander"><div class="banco-icon s">S</div><span class="banco-label">Santander</span></button>
        </div>
      </div>
      <div class="field">
        <label>SUBCATEGORÍA</label>
        <div class="subcat-wrap">
          <div class="subcat-row">
            <input type="text" id="f-subcat" placeholder="Escribe o usa la lista..." autocomplete="off" />
            <button class="btn-lista" id="btn-lista">&#9776;</button>
          </div>
          <div class="suggestions" id="f-suggestions" style="display:none;"></div>
        </div>
        <div id="f-cat-badge" style="display:none;">
          <div class="cat-badge-row">
            <span style="font-size:12px;color:#999;">Categoría:</span>
            <span class="cat-badge" id="f-cat-nombre"></span>
            <span class="ie-badge" id="f-ie-badge"></span>
          </div>
        </div>
      </div>
      <div class="field"><label>DESCRIPCIÓN</label><textarea id="f-desc" placeholder="Ej: Compra semanal en Jumbo..."></textarea></div>
      <div class="field"><label>MONTO</label><div class="monto-wrap"><span class="monto-prefix">$</span><input type="number" id="f-monto" placeholder="0" min="0" /></div></div>
      <div id="intl-banner" style="display:none;"><div class="intl-banner"><span class="intl-banner-icon">🌐</span><span>Gasto internacional. Ingresa el monto total en CLP que pagarás y luego distribuye en ítems USD.</span></div></div>
      <div class="dev-row" id="dev-toggle"><div class="toggle-box"><span class="toggle-check">✓</span></div><span class="dev-label">Es una devolución</span><span class="dev-hint" id="dev-hint">marcar con X</span></div>
      <button class="btn-guardar" id="btn-guardar">Guardar gasto</button>
      <button class="btn-guardar-sec" id="btn-guardar-sin-dist" style="display:none;" onclick="intlGuardarSinDist()">Guardar sin distribuir</button>
    </div>
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
    <div style="font-size:13px;color:#1a73e8;font-weight:500;margin-bottom:14px;" id="add-ppto-cat-nombre"></div>
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
      <button id="add-ppto-guardar" style="flex:2;padding:12px;background:#111;color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;">Guardar</button>
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
          <span style="font-size:12px;color:#1a73e8;">Total en cuotas</span>
          <span style="font-size:14px;font-weight:600;color:#1a73e8;" id="cuota-preview-total"></span>
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
      <button style="width:100%;padding:13px;background:#111;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;font-family:inherit;" onclick="confirmarPagarCuota()">✓ Registrar pago</button>
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
        style="background:#e8f0fe;color:#1a73e8;"
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

    <button style="width:100%;padding:13px;background:#111;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit;margin-bottom:8px;" onclick="ejecutarComparacion()">Comparar saldos</button>
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
    <button style="width:100%;padding:13px;background:#111;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit;margin-bottom:8px;" onclick="confirmarAjusteCuadratura()">Confirmar ajuste</button>
    <button style="width:100%;padding:12px;background:#f5f5f5;color:#666;border:none;border-radius:10px;font-size:14px;cursor:pointer;font-family:inherit;" onclick="cerrar('ov-cuadratura-ajuste')">Volver</button>
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
    <button style="width:100%;padding:13px;background:#111;color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit;margin-bottom:8px;" onclick="confirmarCambioFecha()">Confirmar cambio de fecha</button>
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
      <button id="btn-duplicado-mover" style="width:100%;padding:13px;background:#111;color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit;"></button>
      <button onclick="duplicadoGuardarIgual()" style="width:100%;padding:13px;background:#f5f5f5;color:#555;border:none;border-radius:10px;font-size:15px;cursor:pointer;font-family:inherit;">Guardar igual con fecha de hoy</button>
      <button onclick="cerrar('ov-duplicado-mensual')" style="width:100%;padding:12px;background:#fff;color:#999;border:0.5px solid #e0e0e0;border-radius:10px;font-size:14px;cursor:pointer;font-family:inherit;">Cancelar</button>
    </div>
  </div>
</div>

<div class="toast" id="toast"></div>
<div id="loading-overlay" style="display:none;position:fixed;inset:0;background:rgba(255,255,255,0.92);z-index:500;flex-direction:column;align-items:center;justify-content:center;gap:12px;">
  <div style="width:36px;height:36px;border:3px solid #e0e0e0;border-top-color:#1a73e8;border-radius:50%;animation:spin 0.8s linear infinite;"></div>
  <div id="loading-text" style="font-size:14px;color:#666;font-family:-apple-system,sans-serif;">Cargando datos...</div>
</div>
<div id="error-overlay" style="display:none;position:fixed;inset:0;background:#fff;z-index:500;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:32px;text-align:center;">
  <div style="font-size:40px;">⚠️</div>
  <div id="error-text" style="font-size:15px;color:#c62828;font-weight:500;line-height:1.6;max-width:340px;font-family:-apple-system,sans-serif;white-space:pre-line;"></div>
  <button onclick="cargarDatos()" style="padding:12px 28px;background:#111;color:#fff;border:none;border-radius:10px;font-size:15px;cursor:pointer;font-family:inherit;">Reintentar</button>
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
function switchScreen(screen){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+screen).classList.add('active');
  document.querySelectorAll('.nav-link,.drawer-link').forEach(l=>{
    l.classList.toggle('active',l.dataset.screen===screen);
  });
  document.getElementById('navbar-title').textContent=screenTitles[screen]||screen;
  if(screen==='presupuesto') renderPresupuesto();
  if(screen==='admin') renderAdmin();
  if(screen==='detalle') renderDetalle();
  window.scrollTo(0,0);
}

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
    if (document.getElementById('app-script')) return
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
