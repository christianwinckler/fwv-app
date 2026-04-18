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
.drawer-link-icon { font-size: 20px; width: 24px; text-align: center; }
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
.gasto-cat-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; margin-top: 2px; }
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

/* ── OVERLAYS ───────────────────────────────────────────── */
.overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(0,0,0,0.35); z-index: 150; align-items: flex-end;
}
.overlay.open { display: flex; }
.sheet {
  background: #fff; width: 100%; border-radius: 16px 16px 0 0;
  padding: 16px 16px 32px; max-height: 88vh; overflow-y: auto;
  max-width: 600px; margin: 0 auto;
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
.home-chart-container { background:#fff; border-radius:12px; margin:0 12px; border:0.5px solid #e8e8e8; padding:14px 12px 10px; overflow:hidden; position:relative; }
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

  `

  const htmlContent = `
<div class="app">

  <!-- NAVBAR -->
  <nav class="navbar">
    <div style="display:flex;align-items:center;gap:12px;">
      <button class="btn-hamburger" id="btn-hamburger" onclick="abrirDrawer()">
        <div class="ham-line"></div>
        <div class="ham-line"></div>
        <div class="ham-line"></div>
      </button>
      <span class="navbar-brand" id="navbar-title"><span class="brand-prefix">Gastos FWV</span> - Resumen</span>
    </div>
    <button id="btn-add-nav" onclick="abrirNuevoGasto()" style="width:32px;height:32px;background:#111;color:#fff;border:none;border-radius:50%;font-size:20px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;font-family:inherit;">+</button>
  </nav>

  <!-- DRAWER (mobile) -->
  <div class="drawer-overlay" id="drawer-overlay" onclick="cerrarDrawer()"></div>
  <div class="drawer" id="drawer">
    <div class="drawer-header">
      <span class="drawer-brand">Gastos FWV</span>
      <button class="drawer-close" onclick="cerrarDrawer()">✕</button>
    </div>
    <div class="drawer-links">
      <button class="drawer-link drawer-item-indent active" data-screen="home" onclick="switchScreen('home');cerrarDrawer()">
        <span class="drawer-link-icon">🏠</span> Home
      </button>
      <div class="drawer-divider"></div>
      <div class="drawer-section-label">GASTOS</div>
      <button class="drawer-link drawer-item-indent" data-screen="dashboard" onclick="switchScreen('dashboard');cerrarDrawer()">
        <span class="drawer-link-icon">📊</span> Resumen
      </button>
      <button class="drawer-link drawer-item-indent" data-screen="detalle" onclick="switchScreen('detalle');cerrarDrawer()">
        <span class="drawer-link-icon">📋</span> Detalle
      </button>
      <button class="drawer-link drawer-item-indent" data-screen="presupuesto" onclick="switchScreen('presupuesto');cerrarDrawer()">
        <span class="drawer-link-icon">💰</span> Presupuestos
      </button>
      <button class="drawer-link drawer-item-indent" data-screen="validacion" onclick="switchScreen('validacion');cerrarDrawer()">
        <span class="drawer-link-icon">✅</span> Validación Pagos
      </button>
      <div class="drawer-divider"></div>
      <div class="drawer-section-label">ADMINISTRADOR</div>
      <button class="drawer-link drawer-item-indent" data-screen="admin" onclick="switchScreen('admin');cerrarDrawer()">
        <span class="drawer-link-icon">🗂</span> Categorías
      </button>
    </div>
    <div style="padding:16px;">
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

    <!-- HOME -->
    <div class="screen active" id="screen-home">
      <div class="section-label">CUENTAS CORRIENTES</div>
      <div class="kpi-grid-2" style="padding-bottom:0;">
        <div class="kpi-card" id="kpi-sant">
          <div class="kpi-label">SANTANDER</div>
          <div class="kpi-valor">—</div>
          <div class="kpi-badge badge-s">Cuenta corriente</div>
        </div>
        <div class="kpi-card" id="kpi-fala">
          <div class="kpi-label">FALABELLA</div>
          <div class="kpi-valor">—</div>
          <div class="kpi-badge badge-f">Cuenta corriente</div>
        </div>
      </div>
      <div style="height:8px;"></div>
      <div class="kpi-card-falabella">
        <div class="falabella-row">
          <div class="falabella-compras">
            <div class="falabella-compras-num" id="kpi-fala-compras">—</div>
            <div class="falabella-compras-label">compras</div>
          </div>
          <div>
            <div class="kpi-label">ÚLTIMO MES ACTIVO FALABELLA</div>
            <div class="kpi-valor" id="kpi-fala-mes">—</div>
          </div>
        </div>
      </div>
      <div style="height:8px;"></div>
      <div class="kpi-card-full">
        <div style="flex:1;">
          <div class="kpi-label">TARJETA DE CRÉDITO</div>
          <div class="kpi-valor" id="kpi-tc">—</div>
          <div class="kpi-sub">Saldo neto acumulado</div>
        </div>
        <div class="kpi-badge badge-tc">TC</div>
      </div>

      <div class="section-label-row" style="padding-top:20px;">
        <span class="section-label-main">CATEGORÍAS CLAVE</span>
        <span class="section-label-sub" id="home-cat-periodo">—</span>
      </div>
      <div class="cat-kpi-grid">
        <div class="cat-kpi-card" id="cat-kpi-cuentas">
          <div class="cat-kpi-nombre">CUENTAS</div>
          <div class="cat-kpi-monto">—</div>
          <div class="cat-kpi-comparacion"><span class="cat-kpi-prom">—</span></div>
          <div class="cat-kpi-barra"><div class="cat-kpi-fill" style="width:0%;background:#1a73e8;"></div></div>
        </div>
        <div class="cat-kpi-card" id="cat-kpi-super">
          <div class="cat-kpi-nombre">SUPERMERCADO</div>
          <div class="cat-kpi-monto">—</div>
          <div class="cat-kpi-comparacion"><span class="cat-kpi-prom">—</span></div>
          <div class="cat-kpi-barra"><div class="cat-kpi-fill" style="width:0%;background:#1a73e8;"></div></div>
        </div>
        <div class="cat-kpi-card" id="cat-kpi-mall">
          <div class="cat-kpi-nombre">MALL</div>
          <div class="cat-kpi-monto">—</div>
          <div class="cat-kpi-comparacion"><span class="cat-kpi-prom">—</span></div>
          <div class="cat-kpi-barra"><div class="cat-kpi-fill" style="width:0%;background:#1a73e8;"></div></div>
        </div>
        <div class="cat-kpi-card" id="cat-kpi-comer">
          <div class="cat-kpi-nombre">SALIDAS A COMER</div>
          <div class="cat-kpi-monto">—</div>
          <div class="cat-kpi-comparacion"><span class="cat-kpi-prom">—</span></div>
          <div class="cat-kpi-barra"><div class="cat-kpi-fill" style="width:0%;background:#1a73e8;"></div></div>
        </div>
      </div>

      <div class="section-label" style="padding-top:20px;">EVOLUCIÓN 12 MESES</div>
      <div class="home-filtro-panel" id="home-filtro-panel">
        <div class="home-filtro-inner">
          <div class="home-filtro-panel-header">
            <span class="home-filtro-panel-titulo">Filtrar gráfico</span>
            <button class="home-filtro-close" onclick="cerrarHomeFiltro()">✕</button>
          </div>
          <div style="margin-bottom:10px;">
            <div style="font-size:10px;color:#aaa;font-weight:500;letter-spacing:0.05em;margin-bottom:6px;">CATEGORÍA</div>
            <div id="home-chips-cat" style="display:flex;flex-wrap:wrap;gap:6px;">
              <button class="home-chip active" onclick="toggleHomeCat(this,'todos')">Todos</button>
            </div>
          </div>
          <div id="home-chips-subcat-wrap" style="display:none;margin-bottom:10px;">
            <div style="font-size:10px;color:#aaa;font-weight:500;letter-spacing:0.05em;margin-bottom:6px;">SUBCATEGORÍA</div>
            <div id="home-chips-subcat" style="display:flex;flex-wrap:wrap;gap:6px;"></div>
          </div>
          <button class="home-chip" onclick="limpiarHomeFiltros()" style="margin-top:4px;">Limpiar filtros</button>
        </div>
      </div>
      <div class="home-chart-container">
        <div class="home-chart-header">
          <span class="home-chart-titulo">Gasto vs presupuesto</span>
          <button class="home-filtro-btn" id="home-filtro-btn-open" onclick="toggleHomeFiltro()">
            <span>⚙</span> Filtrar
          </button>
        </div>
        <div id="home-tooltip" class="home-tooltip"></div>
        <svg id="home-line-chart" viewBox="0 0 360 160" style="width:100%;display:block;overflow:visible;"></svg>
        <div class="home-chart-legend">
          <div class="home-legend-item">
            <div class="home-legend-dot" style="background:#e53935;"></div>
            Gasto real
          </div>
          <div class="home-legend-item">
            <div class="home-legend-dot" style="background:#1a73e8;border:1px dashed #1a73e8;"></div>
            Presupuesto
          </div>
          <div class="home-legend-item">
            <div class="home-legend-dot" style="background:#2e7d32;"></div>
            Promedio 12m
          </div>
        </div>
        <div id="home-chart-meses" style="display:flex;justify-content:space-between;padding:4px 2px 0;font-size:9px;color:#bbb;"></div>
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
    <div class="modal-desc" id="g-desc"></div>
    <div class="modal-monto" id="g-monto"></div>
    <div class="modal-actions">
      <button class="btn-editar">✏️ Editar gasto</button>
      <button class="btn-eliminar">🗑 Eliminar gasto</button>
      <button class="btn-cancelar" onclick="cerrar('ov-gasto')">Cancelar</button>
    </div>
  </div>
</div>

<div class="overlay" id="ov-picker">
  <div class="sheet">
    <div class="sheet-handle"></div>
    <div class="sheet-title">Seleccionar rango</div>
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
    <div class="sheet-title">Nuevo gasto</div>
    <div class="form-body">
      <div class="field"><label>FECHA</label><input type="date" id="f-fecha" /></div>
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
      <div class="field">
        <label>BANCO / MEDIO DE PAGO</label>
        <div class="banco-group">
          <button class="banco-btn" data-banco="Santander"><div class="banco-icon s">S</div><span class="banco-label">Santander</span></button>
          <button class="banco-btn" data-banco="Falabella"><div class="banco-icon f">F</div><span class="banco-label">Falabella</span></button>
          <button class="banco-btn" data-banco="Tarjeta Crédito"><div class="banco-icon t">TC</div><span class="banco-label">Tarjeta Crédito</span></button>
        </div>
      </div>
      <div class="field"><label>DESCRIPCIÓN</label><textarea id="f-desc" placeholder="Ej: Compra semanal en Jumbo..."></textarea></div>
      <div class="field"><label>MONTO</label><div class="monto-wrap"><span class="monto-prefix">$</span><input type="number" id="f-monto" placeholder="0" min="0" /></div></div>
      <div class="dev-row" id="dev-toggle"><div class="toggle-box"><span class="toggle-check">✓</span></div><span class="dev-label">Es una devolución</span><span class="dev-hint" id="dev-hint">marcar con X</span></div>
      <button class="btn-guardar" id="btn-guardar">Guardar gasto</button>
    </div>
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
    script.src = '/app-script.js?v=21'
    document.body.appendChild(script)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssContent }} />
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  )
}
