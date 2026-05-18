'use client'
import { useEffect } from 'react'

export default function EmmaClient({ user }) {

  const cssContent = `
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Geist', -apple-system, sans-serif; background: var(--emma-bg); }

:root {
  --emma-accent: #7F77DD;
  --emma-accent-soft: #EEEDFE;
  --emma-accent-mid: #534AB7;
  --emma-accent-light: #CECBF6;
  --emma-bg: #F5F4FB;
  --emma-card: #ffffff;
  --emma-border: rgba(0,0,0,0.06);
  --emma-border-soft: rgba(127,119,221,0.18);
  --emma-fg: #1A1A1A;
  --emma-muted: #888780;
  --emma-sub: #AFA9EC;
  --emma-green: #1D9E75;
  --emma-green-soft: #E1F5EE;
  --emma-red: #c62828;
  --emma-red-soft: #fce4ec;
  --emma-gold: #BA7517;
  --emma-gold-soft: #FAEEDA;
}

.app { display: flex; flex-direction: column; min-height: 100vh; }

.shell { display: grid; grid-template-columns: 72px 1fr; min-height: 100svh; overflow-x: hidden; }
.sidebar {
  background: var(--emma-card); border-right: 1px solid var(--emma-border-soft);
  display: flex; flex-direction: column; align-items: center;
  padding: 22px 0; gap: 4px;
  position: sticky; top: 0; height: 100svh; width: 72px;
  overflow: hidden; transition: width 0.25s cubic-bezier(.4,0,.2,1);
}
.side-label {
  opacity: 0; max-width: 0; overflow: hidden; white-space: nowrap;
  font-size: 12.5px; font-weight: 500; color: var(--emma-fg);
  transition: opacity 0.15s, max-width 0.25s cubic-bezier(.4,0,.2,1);
  pointer-events: none; flex-shrink: 0;
}
.sidebar.expanded { align-items: stretch; padding: 22px 12px; width: 220px; }
.sidebar.expanded .side-icon { width: 100%; justify-content: flex-start; padding: 0 12px; gap: 11px; }
.sidebar.expanded .side-logo { margin-left: 4px; }
.sidebar.expanded .side-label { opacity: 1; max-width: 160px; }
.sidebar.expanded .side-expand-btn { width: 100%; justify-content: flex-start; padding: 0 12px; gap: 11px; }
.sidebar.expanded .side-expand-btn .side-expand-icon { transform: rotate(180deg); }
.side-section-hdr {
  display: none; font-size: 10px; font-weight: 600; color: var(--emma-sub);
  letter-spacing: 0.1em; text-transform: uppercase; padding: 14px 12px 4px;
  white-space: nowrap; overflow: hidden;
}
.sidebar.expanded .side-section-hdr { display: block; }
.side-divider { width: 32px; height: 1px; background: var(--emma-border-soft); margin: 6px auto; flex-shrink: 0; }
.sidebar.expanded .side-divider { width: 100%; margin: 4px 0; }
.side-expand-btn {
  width: 40px; height: 36px; border-radius: 10px; border: none;
  background: transparent; color: var(--emma-sub);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: background 0.15s, color 0.15s;
  flex-shrink: 0; margin-top: 6px;
}
.side-expand-btn:hover { background: var(--emma-accent-soft); color: var(--emma-fg); }
.side-expand-btn .side-label { font-weight: 400; }
.side-expand-icon { width: 16px; height: 16px; flex-shrink: 0; transition: transform 0.25s cubic-bezier(.4,0,.2,1); }
.sidebar-backdrop { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.2); z-index: 199; }
.sidebar-backdrop.visible { display: block; }
.shell-content { display: flex; flex-direction: column; min-width: 0; flex: 1; }

@media (min-width: 921px) {
  .sidebar { position: fixed; left: 0; top: 0; bottom: 0; height: 100dvh; z-index: 30; }
  .shell { grid-template-columns: 1fr; padding-left: 72px; transition: padding-left 0.25s cubic-bezier(.4,0,.2,1); }
  .shell:has(.sidebar.expanded) { padding-left: 220px; }
}

.side-logo {
  display: flex; align-items: center; gap: 10px; cursor: pointer;
  margin-bottom: 18px; width: auto; height: auto;
  overflow: visible; border-radius: 0; box-shadow: none; flex-shrink: 0;
}
.side-icon {
  width: 40px; height: 40px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  border: none; background: transparent; color: var(--emma-muted);
  transition: background 0.15s, color 0.15s; cursor: pointer;
}
.side-icon:hover { background: var(--emma-accent-soft); color: var(--emma-fg); }
.side-icon.active { background: var(--emma-accent); color: #fff; box-shadow: 0 4px 10px rgba(127,119,221,0.3); }
.side-icon.active .side-label { color: #fff; }
.side-icon svg { width: 17px; height: 17px; pointer-events: none; flex-shrink: 0; }
.side-spacer { flex: 1; }

@media (max-width: 920px) {
  .shell { grid-template-columns: 1fr; }
  .sidebar {
    position: fixed; left: -230px; top: 0; bottom: 0; height: 100dvh !important;
    z-index: 200; width: 220px !important; align-items: stretch; padding: 22px 12px;
    box-shadow: none; transition: left 0.25s cubic-bezier(.4,0,.2,1);
  }
  .sidebar.mobile-open { left: 0; box-shadow: 4px 0 28px rgba(0,0,0,0.12); }
  .sidebar .side-label { opacity: 1 !important; max-width: 160px !important; }
  .sidebar .side-icon { width: 100% !important; justify-content: flex-start !important; padding: 0 12px !important; gap: 11px !important; }
  .sidebar .side-expand-btn { display: none; }
  .sidebar .side-section-hdr { display: block; }
  .sidebar .side-divider { width: 100%; margin: 4px 0; }
  .main { padding: 18px 14px 80px; }
}

.navbar {
  background: var(--emma-card); border-bottom: 0.5px solid var(--emma-border-soft);
  padding: 0 28px; height: 54px;
  display: flex; align-items: center; justify-content: flex-end; gap: 8px;
  position: sticky; top: 0; z-index: 100;
}
.ham-btn {
  width: 38px; height: 38px; border-radius: 10px;
  border: 1px solid var(--emma-border-soft); background: var(--emma-card);
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 4px; color: var(--emma-fg); cursor: pointer; margin-right: auto;
}
.ham-btn .ham-line { width: 16px; height: 1.5px; background: currentColor; border-radius: 1px; }
.icon-btn {
  width: 38px; height: 38px; border-radius: 50%;
  border: 1px solid var(--emma-border-soft); background: var(--emma-card);
  color: var(--emma-muted); display: flex; align-items: center; justify-content: center;
  transition: background 0.15s; cursor: pointer;
}
.icon-btn svg { width: 14px; height: 14px; }
.icon-btn.add { background: var(--emma-accent); color: #fff; border: none; font-size: 22px; line-height: 1; padding-bottom: 3px; }

.main { padding: 28px 28px 60px; width: 100%; overflow-x: hidden; }

.greeting { margin-bottom: 24px; }
.greeting h1 {
  font-family: 'Instrument Serif', serif;
  font-size: 38px; line-height: 1.05; font-weight: 400;
  letter-spacing: -0.02em; margin: 0 0 6px; color: var(--emma-fg);
}
.greeting-sub { font-size: 13px; color: var(--emma-muted); }

.accounts-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; margin-bottom: 16px; }
.acc-card {
  background: var(--emma-card); border: 1px solid var(--emma-border-soft);
  border-radius: 14px; padding: 14px; position: relative;
  display: flex; flex-direction: column; min-height: 110px; min-width: 0;
}
.acc-head { display: flex; align-items: flex-start; gap: 9px; margin-bottom: auto; padding-right: 24px; }
.acc-icon { width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.acc-icon svg { width: 14px; height: 14px; }
.acc-icon.lila { background: var(--emma-accent-soft); color: var(--emma-accent-mid); }
.acc-icon.verde { background: var(--emma-green-soft); color: var(--emma-green); }
.acc-icon.dorado { background: var(--emma-gold-soft); color: var(--emma-gold); }
.acc-icon.azul { background: #E6F1FB; color: #185FA5; }
.acc-name { font-size: 12.5px; font-weight: 500; color: var(--emma-fg); line-height: 1.2; }
.acc-type { font-size: 10.5px; color: var(--emma-sub); letter-spacing: 0.02em; margin-top: 2px; }
.acc-value { font-size: 19px; font-weight: 600; letter-spacing: -0.01em; margin-top: 8px; }
.acc-sub { font-size: 10.5px; color: var(--emma-sub); margin-top: 2px; }
.acc-check {
  position: absolute; top: 12px; right: 12px; width: 18px; height: 18px;
  border-radius: 50%; background: var(--emma-green-soft);
  border: 1px solid #b8dcc7; display: flex; align-items: center;
  justify-content: center; cursor: pointer; padding: 0;
}
.acc-check svg { width: 10px; height: 10px; color: var(--emma-green); }

.info-card {
  background: var(--emma-card); border: 1px solid var(--emma-border-soft);
  border-radius: 14px; padding: 14px; display: flex; flex-direction: column;
  min-height: 110px; position: relative;
  border-left: 3px solid var(--emma-accent-soft); min-width: 0;
}
.info-head { display: flex; align-items: flex-start; gap: 9px; margin-bottom: auto; }
.info-icon { width: 30px; height: 30px; border-radius: 8px; background: var(--emma-accent-soft); color: var(--emma-accent); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.info-icon svg { width: 14px; height: 14px; }
.info-name { font-size: 12.5px; font-weight: 500; color: var(--emma-fg); }
.info-type { font-size: 10.5px; color: var(--emma-sub); margin-top: 2px; }
.info-monto { font-size: 19px; font-weight: 600; color: var(--emma-accent); margin-top: 8px; letter-spacing: -0.01em; }
.info-sub { font-size: 10.5px; color: var(--emma-sub); margin-top: 2px; }

.charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 18px; }
.card { background: var(--emma-card); border: 1px solid var(--emma-border-soft); border-radius: 16px; padding: 22px 24px; }
.ppto-card { padding: 22px 24px; display: flex; flex-direction: column; }
.ppto-card-label { font-size: 11px; font-weight: 500; color: var(--emma-muted); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px; }
.ppto-bar { height: 8px; background: var(--emma-accent-soft); border-radius: 4px; overflow: hidden; margin-top: 18px; }
.ppto-fill { height: 100%; background: var(--emma-accent); border-radius: 4px; transition: width 0.4s ease; }
.ppto-pct { display: flex; justify-content: space-between; font-size: 12px; margin-top: 8px; }
.ppto-pct-num { color: var(--emma-accent); font-weight: 600; }
.ppto-pct-label { color: var(--emma-sub); }
.donut-card { padding: 22px 24px; }
.donut-body { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.donut-legend { flex: 1; display: flex; flex-direction: column; gap: 9px; min-width: 100px; }
.donut-legend-item { display: flex; align-items: center; gap: 9px; font-size: 12.5px; color: var(--emma-fg); }
.donut-legend-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }

.catkey-section { margin-bottom: 16px; }
.catkey-title { font-size: 11px; font-weight: 500; color: var(--emma-muted); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 10px; padding: 0 4px; }
.catkey-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 12px; }
.catkey-card { background: var(--emma-card); border: 1px solid var(--emma-border-soft); border-radius: 14px; padding: 14px 16px; min-width: 0; }
.catkey-label { font-size: 10px; font-weight: 500; color: var(--emma-muted); letter-spacing: 0.06em; text-transform: uppercase; margin-bottom: 7px; }
.catkey-monto { font-size: 18px; font-weight: 600; letter-spacing: -0.01em; }
.catkey-comp { display: flex; align-items: center; gap: 7px; margin-top: 5px; font-size: 11px; }
.catkey-prom { color: var(--emma-sub); }
.delta { font-size: 11px; font-weight: 600; padding: 1px 7px; border-radius: 999px; }
.delta.ok { background: var(--emma-green-soft); color: var(--emma-green); }
.delta.over { background: var(--emma-red-soft); color: var(--emma-red); }
.catkey-bar { margin-top: 9px; height: 4px; background: var(--emma-accent-soft); border-radius: 2px; overflow: hidden; }
.catkey-fill { height: 100%; border-radius: 2px; background: var(--emma-accent); }

.timeline-card { background: var(--emma-card); border: 1px solid var(--emma-border-soft); border-radius: 16px; overflow: hidden; margin-bottom: 16px; }
.tl-header { padding: 14px 20px; border-bottom: 0.5px solid var(--emma-border-soft); display: flex; align-items: center; justify-content: space-between; }
.tl-title { font-size: 13px; font-weight: 500; color: var(--emma-fg); }
.tl-badge-activo { font-size: 10px; padding: 3px 10px; border-radius: 8px; background: var(--emma-accent-soft); color: var(--emma-accent-mid); font-weight: 500; }
.tl-item { display: flex; align-items: center; gap: 14px; padding: 12px 20px; border-bottom: 0.5px solid var(--emma-border-soft); }
.tl-item:last-child { border-bottom: none; }
.tl-item.tl-now { background: var(--emma-accent-soft); }
.tl-time { font-size: 12px; color: var(--emma-muted); width: 44px; flex-shrink: 0; font-weight: 500; }
.tl-dot { width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 1.5px solid transparent; font-size: 13px; }
.tl-dot.done { background: var(--emma-accent-soft); border-color: var(--emma-accent-light); color: var(--emma-accent); }
.tl-dot.now { background: var(--emma-accent); border-color: var(--emma-accent-mid); color: #fff; }
.tl-dot.pend { background: #f5f5f5; border-color: #e0e0e0; color: #bbb; }
.tl-info { flex: 1; min-width: 0; }
.tl-name { font-size: 13px; font-weight: 500; color: var(--emma-fg); }
.tl-detail { font-size: 11px; color: var(--emma-muted); margin-top: 2px; }
.tl-right { flex-shrink: 0; }
.tl-status { font-size: 12px; font-weight: 500; color: var(--emma-accent); }
.tl-pend { font-size: 12px; color: #bbb; }

.extras-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 18px; }
.extra-item { background: var(--emma-card); border: 1px solid var(--emma-border-soft); border-radius: 12px; padding: 10px 14px; display: flex; align-items: center; gap: 10px; }
.extra-icon { width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
.extra-label { font-size: 13px; font-weight: 500; color: var(--emma-fg); }
.extra-sub { font-size: 10px; color: var(--emma-muted); margin-top: 1px; }
.extra-check { margin-left: auto; width: 22px; height: 22px; border-radius: 50%; border: 1.5px solid #e0e0e0; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 12px; color: #bbb; }
.extra-check.done { border-color: var(--emma-accent); background: var(--emma-accent); color: #fff; }

.screen { display: none; }
.screen.active { display: block; }

.shell-content:has(#screen-home.active) > .navbar { display: none; }
.screen-topbar {
  position: sticky; top: 0; z-index: 90; padding: 16px 16px 8px; background: var(--emma-bg);
}
.screen-topbar-row { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; }
.screen-topbar-left { display: flex; align-items: center; }
.screen-title-wrap { display: flex; justify-content: center; }
.screen-title { font-family: 'Instrument Serif', serif; font-size: 22px; font-weight: 400; letter-spacing: -0.02em; color: var(--emma-fg); white-space: nowrap; }
.screen-topbar-right { display: flex; align-items: center; gap: 7px; justify-content: flex-end; }
@media (min-width: 921px) {
  .screen-topbar-row { display: flex; align-items: center; }
  .screen-topbar-left { display: none; }
  .screen-title-wrap { flex: 1; justify-content: flex-start; }
  .screen-title { font-size: 32px; }
}
@media (min-width: 921px) {
  #screen-home .screen-topbar { display: none; }
}

.toast { position: fixed; bottom: 90px; left: 50%; transform: translateX(-50%); background: var(--emma-accent); color: #fff; padding: 8px 20px; border-radius: 20px; font-size: 13px; white-space: nowrap; z-index: 300; opacity: 0; transition: opacity 0.2s; pointer-events: none; }
.toast.show { opacity: 1; }

@media (max-width: 1024px) { .accounts-grid { grid-template-columns: repeat(2,1fr); } .catkey-grid { grid-template-columns: repeat(2,1fr); } .charts-row { grid-template-columns: 1fr; } }
@media (max-width: 480px) { .accounts-grid { grid-template-columns: repeat(2,1fr); gap: 8px; } .acc-card, .info-card { padding: 10px; min-height: 90px; } .acc-value { font-size: 15px; } .catkey-card { padding: 10px 12px; } .catkey-monto { font-size: 15px; } }
@media (max-width: 768px) { input, select, textarea { font-size: 16px !important; } }

@keyframes spin { to { transform: rotate(360deg); } }
.loading-overlay { display: none; position: fixed; inset: 0; background: rgba(255,255,255,0.92); z-index: 500; flex-direction: column; align-items: center; justify-content: center; gap: 12px; }

/* Ocultar navbar global en pantallas secundarias */
.shell-content:has(.screen:not(#screen-home).active) > .navbar { display: none; }

/* Catálogo comidas */
.comidas-add-btn {
  width: 100%; padding: 13px;
  background: var(--emma-accent-soft);
  border: 1.5px solid rgba(127,119,221,0.35);
  border-radius: 14px; color: var(--emma-accent-mid);
  font-size: 15px; font-weight: 500;
  font-family: inherit; cursor: pointer;
  margin-bottom: 14px;
  display: flex; align-items: center; justify-content: center; gap: 7px;
}
.comidas-search {
  background: rgba(127,119,221,0.08);
  border: 1px solid var(--emma-border-soft);
  border-radius: 12px; padding: 11px 14px;
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 10px; color: var(--emma-muted); font-size: 14px;
}
.comidas-filter-chips { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.comidas-chip {
  padding: 6px 14px; border-radius: 20px;
  font-size: 13px; font-weight: 500; cursor: pointer;
  border: 1px solid rgba(127,119,221,0.25);
  background: var(--emma-card); color: var(--emma-muted); font-family: inherit;
}
.comidas-chip.active {
  background: var(--emma-accent-soft); color: var(--emma-accent-mid);
  border-color: var(--emma-accent);
}
.comidas-section-hdr {
  font-size: 10px; font-weight: 600;
  letter-spacing: 0.08em; color: var(--emma-muted);
  margin-bottom: 8px; margin-top: 12px;
}
.comidas-card {
  background: var(--emma-card);
  border: 0.5px solid var(--emma-border-soft);
  border-radius: 14px; margin-bottom: 10px; overflow: hidden;
}
.comidas-row {
  display: flex; align-items: center; gap: 10px;
  padding: 11px 12px;
  border-bottom: 0.5px solid rgba(127,119,221,0.10);
}
.comidas-row:last-child { border-bottom: none; }
.comidas-row.disabled { opacity: 0.45; }
.comidas-emoji {
  width: 38px; height: 38px; border-radius: 10px;
  background: var(--emma-accent-soft);
  display: flex; align-items: center; justify-content: center;
  font-size: 19px; flex-shrink: 0;
}
.comidas-info { flex: 1; min-width: 0; }
.comidas-name {
  font-size: 14px; font-weight: 500; color: var(--emma-fg);
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.comidas-name.disabled-text { text-decoration: line-through; color: var(--emma-muted); }
.comidas-sub { font-size: 11px; color: var(--emma-muted); margin-top: 2px; }
.comidas-amount { text-align: right; flex-shrink: 0; margin-right: 4px; }
.comidas-val { font-size: 15px; font-weight: 500; color: var(--emma-accent); }
.comidas-unit { font-size: 11px; color: var(--emma-muted); }
.comidas-edit-btn {
  width: 28px; height: 28px; border-radius: 8px;
  background: var(--emma-bg); border: 0.5px solid rgba(127,119,221,0.2);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0; font-size: 13px;
}

/* Modal comidas */
.comidas-modal-overlay {
  display: none; position: fixed; inset: 0;
  background: rgba(31,29,58,0.45);
  z-index: 300; align-items: flex-end; justify-content: center;
}
.comidas-modal-overlay.open { display: flex; }
.comidas-modal-sheet {
  background: #fff; border-radius: 24px 24px 0 0;
  padding: 0 0 36px; width: 100%; max-width: 600px;
  max-height: 92vh; overflow-y: auto;
}
.comidas-modal-handle {
  width: 36px; height: 4px;
  background: rgba(127,119,221,0.25);
  border-radius: 2px; margin: 14px auto 20px;
}
.comidas-modal-title {
  font-family: 'Instrument Serif', serif;
  font-size: 20px; font-weight: 400; color: var(--emma-fg);
  padding: 0 20px; margin-bottom: 20px;
}
.comidas-modal-body { padding: 0 20px; display: flex; flex-direction: column; gap: 12px; }
.comidas-field-label {
  font-size: 10px; font-weight: 600;
  letter-spacing: 0.07em; color: var(--emma-muted); margin-bottom: 5px;
}
.comidas-field-hint { font-size: 11px; color: var(--emma-accent-light); margin-top: 3px; }
.comidas-field-input {
  background: var(--emma-bg);
  border: 0.5px solid rgba(127,119,221,0.3);
  border-radius: 10px; padding: 11px 13px;
  font-size: 14px; color: var(--emma-fg);
  font-family: inherit; outline: none; width: 100%;
}
.comidas-field-input:focus { border-color: var(--emma-accent); background: var(--emma-accent-soft); }
.comidas-cat-chips { display: flex; gap: 6px; flex-wrap: wrap; }
.comidas-cat-chip {
  padding: 6px 13px; border-radius: 20px;
  font-size: 13px; font-weight: 500; cursor: pointer;
  border: 1px solid rgba(127,119,221,0.25);
  background: var(--emma-card); color: var(--emma-muted); font-family: inherit;
}
.comidas-cat-chip.active {
  background: var(--emma-accent-soft); color: var(--emma-accent-mid);
  border-color: var(--emma-accent);
}
.comidas-cat-chip.add-cat { border-style: dashed; color: var(--emma-accent); background: transparent; }
.comidas-unit-group { display: flex; gap: 6px; }
.comidas-unit-pill {
  flex: 1; padding: 10px 0; border-radius: 10px;
  font-size: 14px; font-weight: 500; text-align: center;
  cursor: pointer; border: 0.5px solid rgba(127,119,221,0.3); font-family: inherit;
}
.comidas-unit-pill.active { background: var(--emma-accent-soft); color: var(--emma-accent-mid); border-color: var(--emma-accent); }
.comidas-unit-pill.inactive { background: var(--emma-card); color: var(--emma-muted); }
.comidas-toggle-row {
  display: flex; align-items: center; justify-content: space-between;
  background: var(--emma-bg); border: 0.5px solid rgba(127,119,221,0.2);
  border-radius: 10px; padding: 12px 14px;
}
.comidas-toggle-lbl { font-size: 14px; color: var(--emma-fg); font-weight: 500; }
.comidas-toggle-sub { font-size: 11px; color: var(--emma-muted); margin-top: 2px; }
.comidas-switch {
  width: 44px; height: 26px; border-radius: 13px;
  background: var(--emma-accent-light); position: relative;
  cursor: pointer; flex-shrink: 0;
}
.comidas-switch.on { background: var(--emma-accent); }
.comidas-switch-knob {
  width: 22px; height: 22px; border-radius: 50%;
  background: #fff; position: absolute; top: 2px; left: 2px; transition: left 0.15s;
}
.comidas-switch.on .comidas-switch-knob { left: 20px; }
.comidas-modal-divider { height: 0.5px; background: rgba(127,119,221,0.12); margin: 0 -20px; }
.comidas-btn-save {
  width: 100%; padding: 14px; background: var(--emma-accent); color: #fff;
  border: none; border-radius: 12px; font-size: 15px; font-weight: 500;
  cursor: pointer; font-family: inherit;
}
.comidas-btn-cancel {
  width: 100%; padding: 12px; background: transparent; color: var(--emma-muted);
  border: none; font-size: 14px; cursor: pointer; font-family: inherit;
}
.comidas-btn-danger {
  width: 100%; padding: 12px; background: transparent; color: #E24B4A;
  border: none; font-size: 14px; cursor: pointer; font-family: inherit;
}

.rutinas-add-btn {
  width:100%;padding:13px;background:var(--emma-accent-soft);
  border:1.5px solid rgba(127,119,221,0.35);border-radius:14px;
  color:var(--emma-accent-mid);font-size:15px;font-weight:500;
  font-family:inherit;cursor:pointer;margin-bottom:14px;
  display:flex;align-items:center;justify-content:center;gap:7px;
}
.rutinas-filter-chips{display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap;}
.rutinas-chip{
  padding:6px 14px;border-radius:20px;font-size:13px;font-weight:500;
  cursor:pointer;border:1px solid rgba(127,119,221,0.25);
  background:var(--emma-card);color:var(--emma-muted);font-family:inherit;
}
.rutinas-chip.active{background:var(--emma-accent-soft);color:var(--emma-accent-mid);border-color:var(--emma-accent);}
.rutinas-section-hdr{
  font-size:10px;font-weight:600;letter-spacing:0.08em;
  color:var(--emma-muted);margin-bottom:8px;margin-top:12px;
}
.rutinas-card{
  background:var(--emma-card);border:0.5px solid var(--emma-border-soft);
  border-radius:14px;margin-bottom:10px;overflow:hidden;
}
.rutinas-row{
  display:flex;align-items:center;gap:10px;padding:13px 12px;
  border-bottom:0.5px solid rgba(127,119,221,0.10);
}
.rutinas-row:last-child{border-bottom:none;}
.rutinas-row.disabled{opacity:0.42;}
.rutinas-emoji{
  width:40px;height:40px;border-radius:10px;background:var(--emma-accent-soft);
  display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;
}
.rutinas-info{flex:1;min-width:0;}
.rutinas-name{font-size:14px;font-weight:500;color:var(--emma-fg);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
.rutinas-name.dis{text-decoration:line-through;color:var(--emma-muted);}
.rutinas-sub{font-size:11px;color:var(--emma-muted);margin-top:2px;}
.rutinas-tipo-badge{font-size:10px;font-weight:600;letter-spacing:0.04em;padding:4px 9px;border-radius:20px;flex-shrink:0;}
.rutinas-tipo-badge.binario{background:#E1F5EE;color:#0F6E56;}
.rutinas-tipo-badge.cantidad{background:var(--emma-accent-soft);color:var(--emma-accent-mid);}
.rutinas-edit-btn{
  width:28px;height:28px;border-radius:8px;background:var(--emma-bg);
  border:0.5px solid rgba(127,119,221,0.2);display:flex;align-items:center;
  justify-content:center;cursor:pointer;flex-shrink:0;font-size:13px;margin-left:4px;
}
.rutinas-modal-overlay{
  display:none;position:fixed;inset:0;background:rgba(31,29,58,0.45);
  z-index:300;align-items:flex-end;justify-content:center;
}
.rutinas-modal-overlay.open{display:flex;}
.rutinas-modal-sheet{
  background:#fff;border-radius:24px 24px 0 0;padding:0 0 36px;
  width:100%;max-width:600px;max-height:92vh;overflow-y:auto;
}
.rutinas-modal-handle{width:36px;height:4px;background:rgba(127,119,221,0.25);border-radius:2px;margin:14px auto 20px;}
.rutinas-modal-title{font-family:'Instrument Serif',serif;font-size:20px;font-weight:400;color:var(--emma-fg);padding:0 20px;margin-bottom:20px;}
.rutinas-modal-body{padding:0 20px;display:flex;flex-direction:column;gap:13px;}
.rutinas-field-label{font-size:10px;font-weight:600;letter-spacing:0.07em;color:var(--emma-muted);margin-bottom:5px;}
.rutinas-field-hint{font-size:11px;color:var(--emma-accent-light);margin-top:3px;}
.rutinas-field-input{
  background:var(--emma-bg);border:0.5px solid rgba(127,119,221,0.3);
  border-radius:10px;padding:11px 13px;font-size:14px;color:var(--emma-fg);
  font-family:inherit;outline:none;width:100%;
}
.rutinas-field-input:focus{border-color:var(--emma-accent);background:var(--emma-accent-soft);}
.rutinas-tipo-group{display:flex;gap:8px;}
.rutinas-tipo-opt{
  flex:1;padding:12px 8px;border-radius:12px;border:1.5px solid rgba(127,119,221,0.2);
  background:var(--emma-card);cursor:pointer;text-align:center;font-family:inherit;
}
.rutinas-tipo-opt.active{border-color:var(--emma-accent);background:var(--emma-accent-soft);}
.rutinas-tipo-icon{font-size:22px;margin-bottom:4px;}
.rutinas-tipo-lbl{font-size:12px;font-weight:600;color:var(--emma-muted);}
.rutinas-tipo-opt.active .rutinas-tipo-lbl{color:var(--emma-accent-mid);}
.rutinas-tipo-sub{font-size:10px;color:var(--emma-muted);margin-top:2px;}
.rutinas-toggle-row{
  display:flex;align-items:center;justify-content:space-between;
  background:var(--emma-bg);border:0.5px solid rgba(127,119,221,0.2);
  border-radius:10px;padding:12px 14px;
}
.rutinas-toggle-lbl{font-size:14px;color:var(--emma-fg);font-weight:500;}
.rutinas-toggle-sub{font-size:11px;color:var(--emma-muted);margin-top:2px;}
.rutinas-switch{width:44px;height:26px;border-radius:13px;background:var(--emma-accent-light);position:relative;cursor:pointer;flex-shrink:0;}
.rutinas-switch.on{background:var(--emma-accent);}
.rutinas-switch-knob{width:22px;height:22px;border-radius:50%;background:#fff;position:absolute;top:2px;left:2px;transition:left 0.15s;}
.rutinas-switch.on .rutinas-switch-knob{left:20px;}
.rutinas-modal-divider{height:0.5px;background:rgba(127,119,221,0.12);margin:2px -20px;}
.rutinas-btn-save{width:100%;padding:14px;background:var(--emma-accent);color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit;}
.rutinas-btn-cancel{width:100%;padding:12px;background:transparent;color:var(--emma-muted);border:none;font-size:14px;cursor:pointer;font-family:inherit;}
.rutinas-btn-danger{width:100%;padding:12px;background:transparent;color:#E24B4A;border:none;font-size:14px;cursor:pointer;font-family:inherit;}
.planes-add-btn {
  width:100%;padding:13px;background:var(--emma-accent-soft);
  border:1.5px solid rgba(127,119,221,0.35);border-radius:14px;
  color:var(--emma-accent-mid);font-size:15px;font-weight:500;
  font-family:inherit;cursor:pointer;margin-bottom:16px;
  display:flex;align-items:center;justify-content:center;gap:7px;
}
.planes-plan-card {
  background:var(--emma-card);border:0.5px solid var(--emma-border-soft);
  border-radius:16px;margin-bottom:10px;overflow:hidden;cursor:pointer;
}
.planes-plan-header {
  padding:14px 16px;display:flex;align-items:center;gap:12px;
}
.planes-dot-activo { width:8px;height:8px;border-radius:50%;background:var(--emma-accent);flex-shrink:0; }
.planes-dot-inactivo { width:8px;height:8px;border-radius:50%;background:var(--emma-accent-light);flex-shrink:0; }
.planes-plan-name { font-size:15px;font-weight:600;color:var(--emma-fg); }
.planes-plan-meta { font-size:12px;color:var(--emma-muted);margin-top:3px; }
.planes-badge-activo { font-size:10px;font-weight:700;letter-spacing:0.05em;padding:4px 10px;border-radius:20px;background:var(--emma-accent-soft);color:var(--emma-accent-mid); }
.planes-badge-inactivo { font-size:10px;font-weight:700;letter-spacing:0.05em;padding:4px 10px;border-radius:20px;background:var(--emma-bg);color:var(--emma-muted);border:0.5px solid rgba(127,119,221,0.2); }
.planes-preview { border-top:0.5px solid rgba(127,119,221,0.10);padding:10px 16px 14px;display:flex;flex-wrap:wrap;gap:6px; }
.planes-preview-pill { font-size:11px;padding:3px 9px;border-radius:20px;background:var(--emma-bg);color:var(--emma-muted);border:0.5px solid rgba(127,119,221,0.15); }
.planes-detail-topbar { background:var(--emma-bg);padding:16px 16px 10px;display:flex;align-items:center;gap:12px;flex-shrink:0; }
.planes-back-btn { width:36px;height:36px;border-radius:10px;border:1px solid rgba(127,119,221,0.2);background:var(--emma-card);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:20px;color:var(--emma-accent);flex-shrink:0; }
.planes-detail-title { font-family:'Instrument Serif',serif;font-size:19px;font-weight:400;color:var(--emma-fg);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
.planes-detail-edit { font-size:12px;font-weight:600;color:var(--emma-accent);background:var(--emma-accent-soft);border:none;border-radius:8px;padding:6px 12px;cursor:pointer;font-family:inherit;flex-shrink:0; }
.planes-meta-row { padding:0 16px 10px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0; }
.planes-add-row { display:flex;gap:8px;padding:0 16px 12px;flex-shrink:0; }
.planes-add-item-btn { flex:1;padding:11px 8px;background:var(--emma-accent-soft);border:1.5px dashed rgba(127,119,221,0.4);border-radius:12px;color:var(--emma-accent-mid);font-size:13px;font-weight:500;font-family:inherit;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:5px; }
.planes-scroll { flex:1;overflow-y:auto;padding:0 16px 24px; }
.planes-section-hdr { font-size:10px;font-weight:700;letter-spacing:0.08em;color:var(--emma-muted);margin:8px 0 10px; }
.planes-hour-block { margin-bottom:4px; }
.planes-hour-header { display:flex;align-items:center;gap:10px;margin-bottom:4px; }
.planes-hour-label { font-size:13px;font-weight:700;color:var(--emma-accent);width:42px;text-align:right;flex-shrink:0; }
.planes-hour-line { flex:1;height:1px;background:rgba(127,119,221,0.15); }
.planes-items-in-hour { padding-left:52px;display:flex;flex-direction:column;gap:5px;margin-bottom:8px; }
.planes-item {
  background:var(--emma-card);border:0.5px solid var(--emma-border-soft);
  border-radius:12px;padding:10px 10px 10px 8px;
  display:flex;align-items:center;gap:9px;
  cursor:grab;user-select:none;touch-action:none;
  transition:box-shadow 0.15s,opacity 0.15s;
}
.planes-item.sortable-ghost { opacity:0.35; }
.planes-item.sortable-drag { box-shadow:0 8px 24px rgba(80,70,180,0.22);border-color:var(--emma-accent);opacity:0.95; }
.planes-drag-handle { display:flex;flex-direction:column;gap:3px;flex-shrink:0;padding:2px 4px;cursor:grab; }
.planes-drag-dot { width:3px;height:3px;border-radius:50%;background:var(--emma-accent-light); }
.planes-item-emoji { font-size:18px;flex-shrink:0; }
.planes-item-info { flex:1;min-width:0; }
.planes-item-name { font-size:13px;font-weight:500;color:var(--emma-fg); }
.planes-item-sub { font-size:11px;color:var(--emma-muted);margin-top:1px; }
.planes-item-badge { font-size:10px;font-weight:600;padding:3px 8px;border-radius:20px;flex-shrink:0; }
.planes-badge-leche { background:#EEF6FF;color:#2979C8; }
.planes-badge-solidos { background:#FFF3E6;color:#C06A00; }
.planes-badge-postre { background:#FFECEC;color:#C02929; }
.planes-badge-rutina { background:var(--emma-accent-soft);color:var(--emma-accent-mid); }
.planes-item-actions { display:flex;gap:4px;flex-shrink:0; }
.planes-time-btn { font-size:10px;font-weight:600;color:var(--emma-accent);background:var(--emma-bg);border:0.5px solid rgba(127,119,221,0.25);border-radius:7px;padding:4px 7px;cursor:pointer;font-family:inherit;white-space:nowrap; }
.planes-del-btn { width:24px;height:24px;border-radius:7px;border:none;background:var(--emma-bg);color:var(--emma-muted);font-size:15px;display:flex;align-items:center;justify-content:center;cursor:pointer; }
.planes-flex-section { background:rgba(127,119,221,0.04);border:1px dashed rgba(127,119,221,0.25);border-radius:14px;padding:6px 12px 10px;margin:4px 0 10px; }
.planes-flex-item { display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:0.5px solid rgba(127,119,221,0.10);cursor:grab;user-select:none; }
.planes-flex-item:last-child { border-bottom:none;padding-bottom:2px; }
.planes-flex-emoji { font-size:17px;width:26px;text-align:center;flex-shrink:0; }
.planes-flex-name { font-size:13px;font-weight:500;color:var(--emma-fg);flex:1; }
.planes-flex-sub { font-size:11px;color:var(--emma-muted); }
.planes-flex-del { width:22px;height:22px;border-radius:6px;border:none;background:transparent;color:var(--emma-accent-light);font-size:15px;cursor:pointer;display:flex;align-items:center;justify-content:center; }
.planes-move-btn { font-size:10px;font-weight:600;color:var(--emma-muted);background:var(--emma-bg);border:0.5px solid rgba(127,119,221,0.2);border-radius:7px;padding:4px 7px;cursor:pointer;font-family:inherit;white-space:nowrap;margin-right:4px; }
.planes-modal-overlay { display:none;position:fixed;inset:0;background:rgba(31,29,58,0.45);z-index:300;align-items:flex-end;justify-content:center; }
.planes-modal-overlay.open { display:flex; }
.planes-modal-sheet { background:#fff;border-radius:24px 24px 0 0;padding:0 0 36px;width:100%;max-width:600px;max-height:92vh;overflow-y:auto; }
.planes-modal-handle { width:36px;height:4px;background:rgba(127,119,221,0.25);border-radius:2px;margin:14px auto 20px; }
.planes-modal-title { font-family:'Instrument Serif',serif;font-size:20px;font-weight:400;color:var(--emma-fg);padding:0 20px;margin-bottom:6px; }
.planes-modal-sub { font-size:13px;color:var(--emma-muted);padding:0 20px;margin-bottom:22px; }
.planes-modal-body { padding:0 20px;display:flex;flex-direction:column;gap:14px; }
.planes-field-label { font-size:10px;font-weight:600;letter-spacing:0.07em;color:var(--emma-muted);margin-bottom:5px; }
.planes-field-hint { font-size:11px;color:var(--emma-accent-light);margin-top:3px; }
.planes-field-input { background:var(--emma-bg);border:0.5px solid rgba(127,119,221,0.3);border-radius:10px;padding:11px 13px;font-size:14px;color:var(--emma-fg);font-family:inherit;outline:none;width:100%; }
.planes-field-input:focus { border-color:var(--emma-accent);background:var(--emma-accent-soft); }
.planes-seg-group { display:flex;gap:6px;flex-wrap:wrap; }
.planes-seg-opt { padding:8px 14px;border-radius:20px;font-size:13px;font-weight:500;border:1px solid rgba(127,119,221,0.25);background:var(--emma-card);color:var(--emma-muted);cursor:pointer;font-family:inherit; }
.planes-seg-opt.active { background:var(--emma-accent-soft);color:var(--emma-accent-mid);border-color:var(--emma-accent); }
.planes-tipo-fija-group { display:flex;gap:8px; }
.planes-tipo-fija-opt { flex:1;padding:11px 8px;border-radius:12px;border:1.5px solid rgba(127,119,221,0.2);background:var(--emma-card);cursor:pointer;text-align:center;font-family:inherit; }
.planes-tipo-fija-opt.active { border-color:var(--emma-accent);background:var(--emma-accent-soft); }
.planes-tipo-fija-icon { font-size:20px;margin-bottom:3px; }
.planes-tipo-fija-lbl { font-size:12px;font-weight:600;color:var(--emma-muted); }
.planes-tipo-fija-opt.active .planes-tipo-fija-lbl { color:var(--emma-accent-mid); }
.planes-tipo-fija-sub { font-size:10px;color:var(--emma-muted);margin-top:2px; }
.planes-hora-row { display:none; }
.planes-hora-row.visible { display:block; }
.planes-time-picker { display:flex;align-items:center;justify-content:center;gap:12px; }
.planes-time-col { display:flex;flex-direction:column;align-items:center;gap:6px; }
.planes-time-arrow { width:44px;height:36px;border-radius:10px;background:var(--emma-bg);border:0.5px solid rgba(127,119,221,0.2);display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--emma-accent);cursor:pointer;user-select:none; }
.planes-time-arrow:active { background:var(--emma-accent-soft); }
.planes-time-val { font-size:42px;font-weight:300;color:var(--emma-fg);width:80px;text-align:center;line-height:1;font-variant-numeric:tabular-nums; }
.planes-time-sep { font-size:42px;font-weight:200;color:var(--emma-muted);line-height:1;margin-top:2px; }
.planes-time-unit { font-size:11px;color:var(--emma-muted);font-weight:500;letter-spacing:0.05em; }
.planes-quick-times { display:flex;flex-wrap:wrap;gap:6px; }
.planes-quick-pill { padding:6px 12px;border-radius:20px;font-size:12px;font-weight:600;border:1px solid rgba(127,119,221,0.2);background:var(--emma-card);color:var(--emma-muted);cursor:pointer;font-family:inherit; }
.planes-quick-pill.active { background:var(--emma-accent-soft);color:var(--emma-accent-mid);border-color:var(--emma-accent); }
.planes-btn-save { width:100%;padding:14px;background:var(--emma-accent);color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit; }
.planes-btn-cancel { width:100%;padding:12px;background:transparent;color:var(--emma-muted);border:none;font-size:14px;cursor:pointer;font-family:inherit; }
.planes-modal-divider { height:0.5px;background:rgba(127,119,221,0.12);margin:2px 0; }
.cal-date-nav { display:flex;align-items:center;gap:8px;padding:4px 16px 12px;flex-shrink:0; }
.cal-date-arrow { width:36px;height:36px;border-radius:10px;border:1px solid rgba(127,119,221,0.2);background:var(--emma-card);display:flex;align-items:center;justify-content:center;font-size:18px;color:var(--emma-accent);cursor:pointer;flex-shrink:0;user-select:none; }
.cal-date-center { flex:1;height:36px;background:var(--emma-card);border:1px solid rgba(127,119,221,0.2);border-radius:10px;display:flex;align-items:center;justify-content:center;gap:8px;cursor:pointer; }
.cal-date-text { font-size:15px;font-weight:500;color:var(--emma-fg); }
.cal-kpi-row { display:flex;gap:8px;padding:0 16px 12px;flex-shrink:0; }
.cal-kpi { flex:1;background:var(--emma-card);border:0.5px solid var(--emma-border-soft);border-radius:12px;padding:10px 10px 8px; }
.cal-kpi-label { font-size:9px;font-weight:600;letter-spacing:0.07em;color:var(--emma-muted);margin-bottom:4px; }
.cal-kpi-val { font-size:18px;font-weight:600;color:var(--emma-accent);line-height:1; }
.cal-kpi-sub { font-size:10px;color:var(--emma-muted);margin-top:3px; }
.cal-kpi-prog { height:3px;border-radius:2px;background:var(--emma-accent-soft);margin-top:6px;overflow:hidden; }
.cal-kpi-prog-fill { height:100%;border-radius:2px;background:var(--emma-accent); }
.cal-section-hdr { font-size:10px;font-weight:700;letter-spacing:0.08em;color:var(--emma-muted);margin:8px 0 10px; }
.cal-hour-block { margin-bottom:6px; }
.cal-hour-header { display:flex;align-items:center;gap:10px;margin-bottom:6px; }
.cal-hour-label { font-size:13px;font-weight:700;color:var(--emma-accent);width:42px;text-align:right;flex-shrink:0; }
.cal-hour-line { flex:1;height:1px;background:rgba(127,119,221,0.15); }
.cal-items-in-hour { padding-left:52px;display:flex;flex-direction:column;gap:5px;margin-bottom:4px; }
.cal-item { background:var(--emma-card);border:0.5px solid var(--emma-border-soft);border-radius:12px;display:flex;align-items:center;gap:9px;padding:11px 10px 11px 12px; }
.cal-item.done { border-color:rgba(127,119,221,0.4);background:#FDFCFF; }
.cal-item.parcial { border-color:rgba(127,119,221,0.28); }
.cal-item-emoji { font-size:19px;flex-shrink:0; }
.cal-item-info { flex:1;min-width:0; }
.cal-item-name { font-size:13px;font-weight:500;color:var(--emma-fg); }
.cal-item-sub { font-size:11px;color:var(--emma-muted);margin-top:2px; }
.cal-compare-badge { font-size:10px;font-weight:600;padding:3px 7px;border-radius:20px;flex-shrink:0; }
.cal-cb-plus { background:#E1F5EE;color:#0F6E56; }
.cal-cb-minus { background:#FFECEC;color:#C02929; }
.cal-cb-equal { background:var(--emma-bg);color:var(--emma-muted);border:0.5px solid rgba(127,119,221,0.2); }
.cal-cb-na { background:var(--emma-bg);color:var(--emma-accent-light);font-size:9px;border:0.5px solid rgba(127,119,221,0.1); }
.cal-cb-ok { background:#E1F5EE;color:#0F6E56; }
.cal-check-btn { width:34px;height:34px;border-radius:10px;flex-shrink:0;display:flex;align-items:center;justify-content:center;border:1.5px solid rgba(127,119,221,0.25);background:var(--emma-bg);cursor:pointer;font-size:16px;color:var(--emma-accent-light); }
.cal-check-btn.checked { background:var(--emma-accent);border-color:var(--emma-accent);color:#fff; }
.cal-check-btn.parcial { background:var(--emma-accent-soft);border-color:var(--emma-accent);color:var(--emma-accent-mid);font-size:13px;font-weight:700; }
.cal-cnt-wrap { display:flex;align-items:center;gap:0;flex-shrink:0; }
.cal-cnt-btn { width:28px;height:28px;border-radius:8px;border:1px solid rgba(127,119,221,0.25);background:var(--emma-bg);display:flex;align-items:center;justify-content:center;font-size:16px;color:var(--emma-accent);cursor:pointer;user-select:none; }
.cal-cnt-val { min-width:28px;text-align:center;font-size:15px;font-weight:600;color:var(--emma-fg);padding:0 4px; }
.cal-flex-wrap { background:rgba(127,119,221,0.04);border:1px dashed rgba(127,119,221,0.22);border-radius:14px;padding:8px 10px;margin-bottom:8px;display:flex;flex-direction:column;gap:5px; }
.cal-flex-item { background:var(--emma-card);border:0.5px solid rgba(127,119,221,0.15);border-radius:10px;display:flex;align-items:center;gap:9px;padding:10px 10px 10px 12px; }
.cal-flex-badge { font-size:10px;font-weight:600;padding:2px 7px;border-radius:20px;background:transparent;color:var(--emma-muted);border:0.5px solid rgba(127,119,221,0.2);flex-shrink:0; }
.cal-modal-overlay { display:none;position:absolute;inset:0;background:rgba(31,29,58,0.45);z-index:300;align-items:flex-end;justify-content:center; }
.cal-modal-overlay.open { display:flex; }
.cal-modal-sheet { background:#fff;border-radius:24px 24px 0 0;padding:0 0 36px;width:100%;max-width:600px;max-height:88vh;overflow-y:auto; }
.cal-modal-handle { width:36px;height:4px;background:rgba(127,119,221,0.25);border-radius:2px;margin:14px auto 18px; }
.cal-modal-header { padding:0 20px 16px;border-bottom:0.5px solid rgba(127,119,221,0.12); }
.cal-modal-hora { font-size:13px;font-weight:700;color:var(--emma-accent);margin-bottom:2px; }
.cal-modal-name { font-family:'Instrument Serif',serif;font-size:20px;font-weight:400;color:var(--emma-fg); }
.cal-modal-sub { font-size:12px;color:var(--emma-muted);margin-top:2px; }
.cal-modal-body { padding:18px 20px;display:flex;flex-direction:column;gap:16px; }
.cal-qty-row { display:flex;align-items:center;justify-content:center;gap:16px; }
.cal-qty-btn { width:48px;height:48px;border-radius:14px;background:var(--emma-accent-soft);border:none;color:var(--emma-accent-mid);font-size:26px;font-weight:300;display:flex;align-items:center;justify-content:center;cursor:pointer;user-select:none;flex-shrink:0; }
.cal-qty-btn:active { background:var(--emma-accent-light); }
.cal-qty-btn:disabled { opacity:0.3;cursor:not-allowed; }
.cal-qty-input { width:100px;text-align:center;font-size:36px;font-weight:300;color:var(--emma-fg);border:none;background:transparent;outline:none;font-family:inherit;border-bottom:2px solid rgba(127,119,221,0.3);padding-bottom:4px; }
.cal-qty-unit { font-size:16px;color:var(--emma-muted);font-weight:400; }
.cal-auto-estado { display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;border-radius:12px;font-size:13px;font-weight:500; }
.cal-auto-estado.completo { background:#E1F5EE;color:#0F6E56; }
.cal-auto-estado.parcial { background:var(--emma-accent-soft);color:var(--emma-accent-mid); }
.cal-auto-estado.pendiente { background:var(--emma-bg);color:var(--emma-muted); }
.cal-compare-row { display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--emma-bg);border-radius:10px;font-size:12px;color:var(--emma-muted); }
.cal-compare-val { font-weight:600; }
.cal-compare-val.up { color:#0F6E56; }
.cal-compare-val.down { color:#C02929; }
.cal-compare-val.same { color:var(--emma-muted); }
.cal-solido-hdr { font-size:10px;font-weight:600;letter-spacing:0.07em;color:var(--emma-muted);margin-bottom:6px; }
.cal-solido-chips { display:flex;flex-wrap:wrap;gap:6px; }
.cal-solido-chip { padding:7px 13px;border-radius:20px;font-size:13px;font-weight:500;border:1px solid rgba(127,119,221,0.25);background:var(--emma-card);color:var(--emma-muted);cursor:pointer;font-family:inherit; }
.cal-solido-chip.active { background:var(--emma-accent-soft);color:var(--emma-accent-mid);border-color:var(--emma-accent); }
.cal-nota-lbl { font-size:10px;font-weight:600;letter-spacing:0.07em;color:var(--emma-muted);margin-bottom:6px; }
.cal-nota-input { width:100%;background:var(--emma-bg);border:0.5px solid rgba(127,119,221,0.2);border-radius:10px;padding:10px 12px;font-size:13px;color:var(--emma-fg);font-family:inherit;outline:none;resize:none; }
.cal-modal-divider { height:0.5px;background:rgba(127,119,221,0.12); }
.cal-btn-save { width:100%;padding:14px;background:var(--emma-accent);color:#fff;border:none;border-radius:12px;font-size:15px;font-weight:500;cursor:pointer;font-family:inherit; }
.cal-btn-cancel { width:100%;padding:11px;background:transparent;color:var(--emma-muted);border:none;font-size:14px;cursor:pointer;font-family:inherit; }
  `

  const htmlContent = `
<div class="app">
  <div class="shell">

    <aside class="sidebar" id="emma-sidebar">
      <div class="side-logo" onclick="window.location='/home'" title="Menú Principal">
        <img src="/fwv-icon.png" alt="FWV" style="width:36px;height:36px;border-radius:9px;flex-shrink:0;"/>
        <span class="side-label" style="font-size:13px;font-weight:600;color:var(--emma-fg);letter-spacing:0;text-transform:none;">Menú Principal</span>
      </div>

      <div class="side-section-hdr">Comidas</div>
      <button class="side-icon active" data-screen="home" onclick="emmaSwitchScreen('home');emmaCerrarSidebarMobile()" title="Hoy">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5z"/><path d="M9 21v-7h6v7"/></svg>
        <span class="side-label">Hoy</span>
      </button>
      <button class="side-icon" data-screen="calendario" onclick="emmaSwitchScreen('calendario');emmaCerrarSidebarMobile()" title="Calendario">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
        <span class="side-label">Calendario</span>
      </button>

      <div class="side-divider"></div>
      <div class="side-section-hdr">Administrador</div>
      <button class="side-icon" data-screen="planes" onclick="emmaSwitchScreen('planes');emmaCerrarSidebarMobile()" title="Planes">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        <span class="side-label">Planes</span>
      </button>
      <button class="side-icon" data-screen="comidas" onclick="emmaSwitchScreen('comidas');emmaCerrarSidebarMobile()" title="Comidas">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v7m0 0c-2.5 0-5 1.5-5 4v9h10v-9c0-2.5-2.5-4-5-4z"/><path d="M8 10V6a4 4 0 0 1 8 0v4"/></svg>
        <span class="side-label">Comidas</span>
      </button>
      <button class="side-icon" data-screen="rutinas" onclick="emmaSwitchScreen('rutinas');emmaCerrarSidebarMobile()" title="Rutinas">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
        <span class="side-label">Rutinas</span>
      </button>

      <div class="side-spacer"></div>
      <button class="side-expand-btn" onclick="emmaToggleSidebarExpand()" title="Expandir menú">
        <svg class="side-expand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
        <span class="side-label" style="font-weight:400;">Colapsar</span>
      </button>
    </aside>

    <div class="sidebar-backdrop" id="emma-sidebar-backdrop" onclick="emmaCerrarSidebarMobile()"></div>

    <div class="shell-content">
      <nav class="navbar" id="emma-navbar">
        <button class="ham-btn" onclick="emmaAbrirSidebarMobile()">
          <div class="ham-line"></div><div class="ham-line"></div><div class="ham-line"></div>
        </button>
        <button class="icon-btn" onclick="emmaActualizarTodo()" title="Actualizar">
          <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 8A5.5 5.5 0 1 1 10 3.07"/><path d="M13.5 2v4h-4"/></svg>
        </button>
        <button class="icon-btn add" onclick="emmaAbrirNuevaComida()" title="Nueva comida">+</button>
      </nav>

      <main style="width:100%;overflow-x:hidden;">

        <div class="screen active" id="screen-home">
          <div class="screen-topbar">
            <div class="screen-topbar-row">
              <div class="screen-topbar-left">
                <button class="ham-btn" onclick="emmaAbrirSidebarMobile()">
                  <div class="ham-line"></div>
                  <div class="ham-line"></div>
                  <div class="ham-line"></div>
                </button>
              </div>
              <div class="screen-title-wrap"></div>
              <div class="screen-topbar-right">
                <button class="icon-btn" onclick="emmaActualizarTodo()" title="Actualizar">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 8A5.5 5.5 0 1 1 10 3.07"/><path d="M13.5 2v4h-4"/></svg>
                </button>
                <button class="icon-btn add" onclick="emmaAbrirNuevaComida()" title="Nueva comida">+</button>
              </div>
            </div>
          </div>
          <div class="main">
            <div class="greeting">
              <h1 id="emma-greeting">Buenos días, <i>Christian.</i></h1>
              <div class="greeting-sub">Este es el estado de la alimentación de Emma de hoy.</div>
            </div>

            <div class="accounts-grid">
              <div class="acc-card">
                <div class="acc-head">
                  <div class="acc-icon lila">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C8 2 5 5.5 5 9c0 5 7 13 7 13s7-8 7-13c0-3.5-3-7-7-7z"/></svg>
                  </div>
                  <div><div class="acc-name">Leche</div><div class="acc-type">Tomas del día</div></div>
                </div>
                <div class="acc-value" id="home-leche-val" style="color:var(--emma-accent);">480 cc</div>
                <div class="acc-sub" id="home-leche-sub">de 600 cc objetivo</div>
              </div>

              <div class="acc-card">
                <div class="acc-head">
                  <div class="acc-icon verde">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V12M5 12H2a10 10 0 0 0 20 0h-3"/><path d="M12 12C12 7 8 4 8 4s0 8 4 8zM12 12C12 7 16 4 16 4s0 8-4 8z"/></svg>
                  </div>
                  <div><div class="acc-name">Sólidos</div><div class="acc-type">Colados del día</div></div>
                </div>
                <div class="acc-value" id="home-solidos-val" style="color:var(--emma-green);">215 gr</div>
                <div class="acc-sub">Almuerzo completado</div>
              </div>

              <div class="acc-card">
                <div class="acc-head">
                  <div class="acc-icon dorado">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  </div>
                  <div><div class="acc-name">Próxima toma</div><div class="acc-type">Postre fruta</div></div>
                </div>
                <div class="acc-value" id="home-proxima-val" style="font-size:22px;color:var(--emma-accent);">15:30</div>
                <div class="acc-sub">En 1h 15min</div>
              </div>

              <div class="info-card">
                <div class="info-head">
                  <div class="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                  </div>
                  <div><div class="info-name">Comidas completadas</div><div class="info-type">14 mayo 2025</div></div>
                </div>
                <div class="info-monto" id="home-comidas-val" style="font-size:28px;font-weight:700;">3 / 6</div>
                <div class="info-sub">del día completadas</div>
              </div>

              <div class="acc-card">
                <div class="acc-head">
                  <div class="acc-icon dorado">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                  </div>
                  <div><div class="acc-name">Pañales hoy</div><div class="acc-type">Registro diario</div></div>
                </div>
                <div class="acc-value" id="home-panales-val" style="color:var(--emma-accent);">5</div>
                <div class="acc-sub" id="home-panales-sub">Pipí: 4 · Popó: 1</div>
              </div>

              <div class="info-card">
                <div class="info-head">
                  <div class="info-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
                  </div>
                  <div><div class="info-name">Rutinas extras</div><div class="info-type">Hoy</div></div>
                </div>
                <div class="info-monto" id="home-rutinas-val">2 / 4</div>
                <div class="info-sub">Vitaminas, ejercicio, ducha</div>
              </div>
            </div>

            <div class="charts-row">
              <div class="card ppto-card">
                <div class="ppto-card-label">Progreso alimentación del día</div>
                <div style="display:flex;justify-content:space-between;align-items:flex-end;">
                  <div><div style="font-size:12px;color:var(--emma-sub);margin-bottom:4px;">Tomado</div><div style="font-size:26px;font-weight:600;letter-spacing:-.02em;">480 cc</div></div>
                  <div style="text-align:right;"><div style="font-size:12px;color:var(--emma-sub);margin-bottom:4px;">Objetivo</div><div style="font-size:26px;font-weight:600;letter-spacing:-.02em;">600 cc</div></div>
                </div>
                <div class="ppto-bar"><div class="ppto-fill" id="home-leche-bar" style="width:80%"></div></div>
                <div class="ppto-pct">
                  <span class="ppto-pct-label">del objetivo · 14 mayo</span>
                  <span class="ppto-pct-num">80%</span>
                </div>
              </div>
              <div class="card donut-card">
                <div class="ppto-card-label">Distribución del día</div>
                <div class="donut-body">
                  <svg id="emma-donut-svg" width="130" height="130" viewBox="0 0 130 130" style="flex-shrink:0;"></svg>
                  <div class="donut-legend" id="emma-donut-legend"></div>
                </div>
              </div>
            </div>

            <div class="catkey-section">
              <div class="catkey-title">Resumen del día · 14 mayo</div>
              <div class="catkey-grid">
                <div class="catkey-card">
                  <div class="catkey-label">Leche</div>
                  <div class="catkey-monto">480 cc</div>
                  <div class="catkey-comp"><span class="catkey-prom">obj 600</span><span class="delta ok">80%</span></div>
                  <div class="catkey-bar"><div class="catkey-fill" style="width:80%"></div></div>
                </div>
                <div class="catkey-card">
                  <div class="catkey-label">Sólidos</div>
                  <div class="catkey-monto">215 gr</div>
                  <div class="catkey-comp"><span class="catkey-prom">obj 215</span><span class="delta ok">100%</span></div>
                  <div class="catkey-bar"><div class="catkey-fill" style="width:100%"></div></div>
                </div>
                <div class="catkey-card">
                  <div class="catkey-label">Postre</div>
                  <div class="catkey-monto">0 cc</div>
                  <div class="catkey-comp"><span class="catkey-prom">obj 90</span><span class="delta over">0%</span></div>
                  <div class="catkey-bar"><div class="catkey-fill" style="width:0%"></div></div>
                </div>
                <div class="catkey-card">
                  <div class="catkey-label">Rutinas</div>
                  <div class="catkey-monto">2 / 4</div>
                  <div class="catkey-comp"><span class="catkey-prom">completadas</span><span class="delta ok">50%</span></div>
                  <div class="catkey-bar"><div class="catkey-fill" style="width:50%"></div></div>
                </div>
              </div>
            </div>

            <div style="font-size:11px;font-weight:500;color:var(--emma-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px;padding:0 4px;">
              Tomas del día · Plan mayo 2025
            </div>
            <div class="timeline-card" style="margin-bottom:18px;">
              <div class="tl-header">
                <span class="tl-title">Rutina vigente desde 1 mayo</span>
                <span class="tl-badge-activo">Activo</span>
              </div>
              <div class="tl-item">
                <span class="tl-time">07:00</span>
                <div class="tl-dot done">✓</div>
                <div class="tl-info"><div class="tl-name">Leche mañana · Fórmula</div><div class="tl-detail">120 cc</div></div>
                <div class="tl-right"><div class="tl-status">120 cc ✓</div></div>
              </div>
              <div class="tl-item">
                <span class="tl-time">10:00</span>
                <div class="tl-dot done">✓</div>
                <div class="tl-info"><div class="tl-name">Leche media mañana · Fórmula</div><div class="tl-detail">120 cc</div></div>
                <div class="tl-right"><div class="tl-status">120 cc ✓</div></div>
              </div>
              <div class="tl-item">
                <span class="tl-time">12:30</span>
                <div class="tl-dot done">✓</div>
                <div class="tl-info"><div class="tl-name">Almuerzo · Colado zanahoria + pollo</div><div class="tl-detail">215 gr · Sólido</div></div>
                <div class="tl-right"><div class="tl-status">215 gr ✓</div></div>
              </div>
              <div class="tl-item tl-now">
                <span class="tl-time" style="color:var(--emma-accent);">15:30</span>
                <div class="tl-dot now">⏱</div>
                <div class="tl-info"><div class="tl-name" style="color:var(--emma-accent);">Postre · Fruta colada</div><div class="tl-detail">90 cc · <span style="color:var(--emma-accent);font-weight:500;">Ahora</span></div></div>
                <div class="tl-right"><div class="tl-pend">— cc</div></div>
              </div>
              <div class="tl-item" style="opacity:.6;">
                <span class="tl-time">17:00</span>
                <div class="tl-dot pend">○</div>
                <div class="tl-info"><div class="tl-name">Leche tarde · Fórmula</div><div class="tl-detail">120 cc</div></div>
                <div class="tl-right"><div class="tl-pend">— cc</div></div>
              </div>
              <div class="tl-item" style="opacity:.6;">
                <span class="tl-time">20:00</span>
                <div class="tl-dot pend">○</div>
                <div class="tl-info"><div class="tl-name">Cena · Leche noche</div><div class="tl-detail">150 cc · Fórmula</div></div>
                <div class="tl-right"><div class="tl-pend">— cc</div></div>
              </div>
            </div>

            <div style="font-size:11px;font-weight:500;color:var(--emma-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:10px;padding:0 4px;">Rutinas del día</div>
            <div class="extras-grid">
              <div class="extra-item">
                <div class="extra-icon" style="background:#E6F1FB;">💊</div>
                <div><div class="extra-label">Vitamina D</div><div class="extra-sub">1 gota · 09:00</div></div>
                <div class="extra-check done" onclick="this.classList.toggle('done');this.textContent=this.classList.contains('done')?'✓':'';">✓</div>
              </div>
              <div class="extra-item">
                <div class="extra-icon" style="background:var(--emma-accent-soft);">🤸</div>
                <div><div class="extra-label">Ejercicio</div><div class="extra-sub">Tummy time</div></div>
                <div class="extra-check" onclick="this.classList.toggle('done');this.textContent=this.classList.contains('done')?'✓':'';"></div>
              </div>
              <div class="extra-item">
                <div class="extra-icon" style="background:var(--emma-green-soft);">🚿</div>
                <div><div class="extra-label">Ducha</div><div class="extra-sub">Tarde</div></div>
                <div class="extra-check" onclick="this.classList.toggle('done');this.textContent=this.classList.contains('done')?'✓':'';"></div>
              </div>
              <div class="extra-item">
                <div class="extra-icon" style="background:var(--emma-gold-soft);">👶</div>
                <div><div class="extra-label">Pañales</div><div class="extra-sub">Pipí: 4 · Popó: 1</div></div>
                <div class="extra-check done" onclick="this.classList.toggle('done');this.textContent=this.classList.contains('done')?'✓':'';">✓</div>
              </div>
            </div>
          </div>
        </div>

        <div class="screen" id="screen-calendario">
 <div class="screen-topbar" style="flex-shrink:0;">
   <div class="screen-topbar-row">
     <div class="screen-topbar-left">
       <button class="ham-btn" onclick="emmaAbrirSidebarMobile()">
         <div class="ham-line"></div><div class="ham-line"></div><div class="ham-line"></div>
       </button>
     </div>
     <div class="screen-title-wrap"><span class="screen-title">Calendario</span></div>
     <div class="screen-topbar-right"></div>
   </div>
 </div>

 <div class="cal-date-nav">
   <div class="cal-date-arrow" onclick="emmaCalCambiarDia(-1)">‹</div>
   <div class="cal-date-center">
     <span>📅</span>
     <span class="cal-date-text" id="cal-fecha-display">Hoy · —</span>
     <span style="font-size:10px;color:var(--emma-muted);">▼</span>
   </div>
   <div class="cal-date-arrow" onclick="emmaCalCambiarDia(1)">›</div>
 </div>

 <div class="cal-kpi-row" id="cal-kpi-row">
   <div class="cal-kpi">
     <div class="cal-kpi-label">COMPLETADO</div>
     <div class="cal-kpi-val" id="cal-kpi-comp">0/0</div>
     <div class="cal-kpi-sub">ítems del plan</div>
     <div class="cal-kpi-prog"><div class="cal-kpi-prog-fill" id="cal-kpi-comp-fill" style="width:0%"></div></div>
   </div>
   <div class="cal-kpi">
     <div class="cal-kpi-label">LECHE HOY</div>
     <div class="cal-kpi-val" id="cal-kpi-leche">0cc</div>
     <div class="cal-kpi-sub" id="cal-kpi-leche-sub">del plan</div>
     <div class="cal-kpi-prog"><div class="cal-kpi-prog-fill" id="cal-kpi-leche-fill" style="width:0%"></div></div>
   </div>
   <div class="cal-kpi">
     <div class="cal-kpi-label">SÓLIDOS HOY</div>
     <div class="cal-kpi-val" id="cal-kpi-solidos">0gr</div>
     <div class="cal-kpi-sub" id="cal-kpi-solidos-sub">del plan</div>
     <div class="cal-kpi-prog"><div class="cal-kpi-prog-fill" id="cal-kpi-solidos-fill" style="width:0%"></div></div>
   </div>
 </div>

 <div class="main" id="cal-lista" style="padding-top:4px;overflow-y:auto;flex:1;"></div>
</div>

<!-- MODAL REGISTRO CALENDARIO -->
<div class="cal-modal-overlay" id="cal-modal-registro" onclick="emmaCalCerrarSiOverlay(event,'cal-modal-registro')">
 <div class="cal-modal-sheet">
   <div class="cal-modal-handle"></div>
   <div class="cal-modal-header">
     <div class="cal-modal-hora" id="cal-modal-hora-lbl">—</div>
     <div class="cal-modal-name" id="cal-modal-item-name">—</div>
     <div class="cal-modal-sub" id="cal-modal-item-sub">—</div>
   </div>
   <div class="cal-modal-body">

     <!-- SELECTOR SÓLIDO (solo visible si es sólido) -->
     <div id="cal-solido-section" style="display:none;">
       <div class="cal-solido-hdr">¿QUÉ COMIÓ?</div>
       <div class="cal-solido-chips" id="cal-solido-chips"></div>
     </div>

     <!-- CANTIDAD -->
     <div id="cal-qty-section">
       <div class="cal-qty-row">
         <button class="cal-qty-btn" id="cal-qty-minus" onclick="emmaCalCambiarQty(-1)">−</button>
         <input class="cal-qty-input" id="cal-qty-input" type="number" min="0" value="0"
                oninput="emmaCalActualizarEstado()">
         <div class="cal-qty-unit" id="cal-qty-unit">cc</div>
         <button class="cal-qty-btn" id="cal-qty-plus" onclick="emmaCalCambiarQty(1)">+</button>
       </div>
     </div>

     <!-- AUTO ESTADO -->
     <div class="cal-auto-estado pendiente" id="cal-auto-estado">
       <span id="cal-auto-estado-icon">○</span>
       <span id="cal-auto-estado-txt">Ingresa una cantidad para registrar</span>
     </div>

     <!-- COMPARATIVO -->
     <div class="cal-compare-row">
       <span>vs ayer</span>
       <span class="cal-compare-val same" id="cal-compare-val">—</span>
     </div>

     <!-- NOTA -->
     <div id="cal-nota-section">
       <div class="cal-nota-lbl">NOTA (opcional)</div>
       <textarea class="cal-nota-input" id="cal-nota-input" rows="2" placeholder="Opcional..."></textarea>
     </div>

     <button class="cal-btn-save" onclick="emmaCalGuardarRegistro()">Guardar</button>
     <button class="cal-btn-cancel" onclick="emmaCalCerrar('cal-modal-registro')">Cancelar</button>
   </div>
 </div>
</div>

        <div class="screen" id="screen-comidas">
  <div class="screen-topbar">
    <div class="screen-topbar-row">
      <div class="screen-topbar-left">
        <button class="ham-btn" onclick="emmaAbrirSidebarMobile()">
          <div class="ham-line"></div><div class="ham-line"></div><div class="ham-line"></div>
        </button>
      </div>
      <div class="screen-title-wrap"><span class="screen-title">Comidas</span></div>
      <div class="screen-topbar-right"></div>
    </div>
  </div>
  <div class="main" style="padding-top:8px;">

    <button class="comidas-add-btn" onclick="emmaComidasAbrirNueva()">
      <span style="font-size:18px;font-weight:400;">+</span> Agregar comida
    </button>

    <div class="comidas-search">🔍 Buscar comida...</div>

    <div class="comidas-filter-chips">
      <button class="comidas-chip active" onclick="emmaComidasSetFiltro(this,'todas')">Todas</button>
      <button class="comidas-chip" onclick="emmaComidasSetFiltro(this,'activas')">Solo activas</button>
      <button class="comidas-chip" onclick="emmaComidasSetFiltro(this,'deshabilitadas')">Deshabilitadas</button>
    </div>

    <div id="comidas-lista"></div>

  </div>
</div>

<!-- MODAL NUEVA COMIDA -->
<div class="comidas-modal-overlay" id="comidas-modal-nueva" onclick="emmaComidasCerrarSiOverlay(event,'comidas-modal-nueva')">
  <div class="comidas-modal-sheet">
    <div class="comidas-modal-handle"></div>
    <div class="comidas-modal-title">Nueva comida</div>
    <div class="comidas-modal-body">

      <div>
        <div class="comidas-field-label">NOMBRE</div>
        <input class="comidas-field-input" id="nueva-nombre" type="text" placeholder="Ej: Mamadera">
      </div>

      <div>
        <div class="comidas-field-label">CATEGORÍA</div>
        <div class="comidas-cat-chips" id="nueva-cat-chips"></div>
        <div id="nueva-cat-row" style="display:none;flex-direction:column;gap:6px;margin-top:8px;">
          <div style="display:flex;gap:6px;">
            <input id="nueva-cat-input" class="comidas-field-input" type="text" placeholder="Nueva categoría" style="flex:1;">
            <button onclick="emmaComidasAgregarCat('nueva')" style="padding:0 14px;background:var(--emma-accent);color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:500;font-family:inherit;cursor:pointer;white-space:nowrap;">Agregar</button>
          </div>
          <div class="comidas-field-hint">La categoría se creará y quedará seleccionada.</div>
        </div>
      </div>

      <div style="display:flex;gap:10px;">
        <div style="flex:1;">
          <div class="comidas-field-label">TAMAÑO</div>
          <input class="comidas-field-input" id="nueva-tamano" type="number" placeholder="120">
        </div>
        <div style="flex:1;">
          <div class="comidas-field-label">UNIDAD</div>
          <div class="comidas-unit-group">
            <button class="comidas-unit-pill active" onclick="emmaComidasToggleUnidad(this)">cc</button>
            <button class="comidas-unit-pill inactive" onclick="emmaComidasToggleUnidad(this)">gr</button>
          </div>
        </div>
      </div>

      <div>
        <div class="comidas-field-label">EMOJI</div>
        <input class="comidas-field-input" id="nueva-emoji" type="text" placeholder="🍼" style="font-size:22px;text-align:center;letter-spacing:4px;">
        <div class="comidas-field-hint">Abre el teclado de emojis con 🌐 o manteniendo presionado</div>
      </div>

      <button class="comidas-btn-save" onclick="emmaComidasGuardarNueva()">Guardar comida</button>
      <button class="comidas-btn-cancel" onclick="emmaComidasCerrar('comidas-modal-nueva')">Cancelar</button>
    </div>
  </div>
</div>

<!-- MODAL EDITAR COMIDA -->
<div class="comidas-modal-overlay" id="comidas-modal-editar" onclick="emmaComidasCerrarSiOverlay(event,'comidas-modal-editar')">
  <div class="comidas-modal-sheet">
    <div class="comidas-modal-handle"></div>
    <div class="comidas-modal-title">Editar comida</div>
    <div class="comidas-modal-body">

      <div>
        <div class="comidas-field-label">NOMBRE</div>
        <input class="comidas-field-input" id="editar-nombre" type="text">
      </div>

      <div>
        <div class="comidas-field-label">CATEGORÍA</div>
        <div class="comidas-cat-chips" id="editar-cat-chips"></div>
        <div id="editar-cat-row" style="display:none;flex-direction:column;gap:6px;margin-top:8px;">
          <div style="display:flex;gap:6px;">
            <input id="editar-cat-input" class="comidas-field-input" type="text" placeholder="Nueva categoría" style="flex:1;">
            <button onclick="emmaComidasAgregarCat('editar')" style="padding:0 14px;background:var(--emma-accent);color:#fff;border:none;border-radius:10px;font-size:13px;font-weight:500;font-family:inherit;cursor:pointer;white-space:nowrap;">Agregar</button>
          </div>
          <div class="comidas-field-hint">La categoría se creará y quedará seleccionada.</div>
        </div>
      </div>

      <div style="display:flex;gap:10px;">
        <div style="flex:1;">
          <div class="comidas-field-label">TAMAÑO</div>
          <input class="comidas-field-input" id="editar-tamano" type="number">
        </div>
        <div style="flex:1;">
          <div class="comidas-field-label">UNIDAD</div>
          <div class="comidas-unit-group" id="editar-unidad-group">
            <button class="comidas-unit-pill active" onclick="emmaComidasToggleUnidad(this)">cc</button>
            <button class="comidas-unit-pill inactive" onclick="emmaComidasToggleUnidad(this)">gr</button>
          </div>
        </div>
      </div>

      <div>
        <div class="comidas-field-label">EMOJI</div>
        <input class="comidas-field-input" id="editar-emoji" type="text" style="font-size:22px;text-align:center;letter-spacing:4px;">
        <div class="comidas-field-hint">Abre el teclado de emojis con 🌐 o manteniendo presionado</div>
      </div>

      <div class="comidas-modal-divider"></div>

      <div class="comidas-toggle-row">
        <div>
          <div class="comidas-toggle-lbl">Comida activa</div>
          <div class="comidas-toggle-sub">Desactiva para ocultar del selector</div>
        </div>
        <div class="comidas-switch on" id="editar-activo-switch" onclick="emmaComidasToggleSwitch(this)">
          <div class="comidas-switch-knob"></div>
        </div>
      </div>

      <button class="comidas-btn-save" onclick="emmaComidasGuardarEdicion()">Guardar cambios</button>
      <button class="comidas-btn-danger" onclick="emmaComidasEliminar()">Eliminar comida</button>
      <button class="comidas-btn-cancel" onclick="emmaComidasCerrar('comidas-modal-editar')">Cancelar</button>
    </div>
  </div>
</div>

        <div class="screen" id="screen-rutinas">
  <div class="screen-topbar">
    <div class="screen-topbar-row">
      <div class="screen-topbar-left">
        <button class="ham-btn" onclick="emmaAbrirSidebarMobile()">
          <div class="ham-line"></div><div class="ham-line"></div><div class="ham-line"></div>
        </button>
      </div>
      <div class="screen-title-wrap"><span class="screen-title">Rutinas</span></div>
      <div class="screen-topbar-right"></div>
    </div>
  </div>
  <div class="main" style="padding-top:8px;">

    <button class="rutinas-add-btn" onclick="emmaRutinasAbrirNueva()">
      <span style="font-size:18px;font-weight:400;">+</span> Agregar rutina
    </button>

    <div class="rutinas-filter-chips">
      <button class="rutinas-chip active" onclick="emmaRutinasSetFiltro(this,'todas')">Todas</button>
      <button class="rutinas-chip" onclick="emmaRutinasSetFiltro(this,'activas')">Solo activas</button>
      <button class="rutinas-chip" onclick="emmaRutinasSetFiltro(this,'deshabilitadas')">Deshabilitadas</button>
    </div>

    <div id="rutinas-lista"></div>

  </div>
</div>

<!-- MODAL NUEVA RUTINA -->
<div class="rutinas-modal-overlay" id="rutinas-modal-nueva" onclick="emmaRutinasCerrarSiOverlay(event,'rutinas-modal-nueva')">
  <div class="rutinas-modal-sheet">
    <div class="rutinas-modal-handle"></div>
    <div class="rutinas-modal-title">Nueva rutina</div>
    <div class="rutinas-modal-body">
      <div>
        <div class="rutinas-field-label">NOMBRE</div>
        <input class="rutinas-field-input" id="rutina-nueva-nombre" type="text" placeholder="Ej: Vitaminas">
      </div>
      <div>
        <div class="rutinas-field-label">DESCRIPCIÓN (opcional)</div>
        <input class="rutinas-field-input" id="rutina-nueva-desc" type="text" placeholder="Ej: Suplemento diario">
      </div>
      <div>
        <div class="rutinas-field-label">EMOJI</div>
        <input class="rutinas-field-input" id="rutina-nueva-emoji" type="text" placeholder="💊" style="font-size:22px;text-align:center;letter-spacing:4px;">
        <div class="rutinas-field-hint">Abre el teclado de emojis con 🌐 o manteniendo presionado</div>
      </div>
      <div>
        <div class="rutinas-field-label">TIPO DE REGISTRO</div>
        <div class="rutinas-tipo-group" id="rutina-nueva-tipo">
          <div class="rutinas-tipo-opt active" onclick="emmaRutinasSelTipo(this)">
            <div class="rutinas-tipo-icon">✅</div>
            <div class="rutinas-tipo-lbl">Sí / No</div>
            <div class="rutinas-tipo-sub">Se hizo o no</div>
          </div>
          <div class="rutinas-tipo-opt" onclick="emmaRutinasSelTipo(this)">
            <div class="rutinas-tipo-icon">🔢</div>
            <div class="rutinas-tipo-lbl">Cantidad</div>
            <div class="rutinas-tipo-sub">Número de veces</div>
          </div>
        </div>
      </div>
      <button class="rutinas-btn-save" onclick="emmaRutinasGuardarNueva()">Guardar rutina</button>
      <button class="rutinas-btn-cancel" onclick="emmaRutinasCerrar('rutinas-modal-nueva')">Cancelar</button>
    </div>
  </div>
</div>

<!-- MODAL EDITAR RUTINA -->
<div class="rutinas-modal-overlay" id="rutinas-modal-editar" onclick="emmaRutinasCerrarSiOverlay(event,'rutinas-modal-editar')">
  <div class="rutinas-modal-sheet">
    <div class="rutinas-modal-handle"></div>
    <div class="rutinas-modal-title">Editar rutina</div>
    <div class="rutinas-modal-body">
      <div>
        <div class="rutinas-field-label">NOMBRE</div>
        <input class="rutinas-field-input" id="rutina-editar-nombre" type="text">
      </div>
      <div>
        <div class="rutinas-field-label">DESCRIPCIÓN</div>
        <input class="rutinas-field-input" id="rutina-editar-desc" type="text">
      </div>
      <div>
        <div class="rutinas-field-label">EMOJI</div>
        <input class="rutinas-field-input" id="rutina-editar-emoji" type="text" style="font-size:22px;text-align:center;letter-spacing:4px;">
        <div class="rutinas-field-hint">Abre el teclado de emojis con 🌐 o manteniendo presionado</div>
      </div>
      <div>
        <div class="rutinas-field-label">TIPO DE REGISTRO</div>
        <div class="rutinas-tipo-group" id="rutina-editar-tipo">
          <div class="rutinas-tipo-opt active" onclick="emmaRutinasSelTipo(this)">
            <div class="rutinas-tipo-icon">✅</div>
            <div class="rutinas-tipo-lbl">Sí / No</div>
            <div class="rutinas-tipo-sub">Se hizo o no</div>
          </div>
          <div class="rutinas-tipo-opt" onclick="emmaRutinasSelTipo(this)">
            <div class="rutinas-tipo-icon">🔢</div>
            <div class="rutinas-tipo-lbl">Cantidad</div>
            <div class="rutinas-tipo-sub">Número de veces</div>
          </div>
        </div>
      </div>
      <div class="rutinas-modal-divider"></div>
      <div class="rutinas-toggle-row">
        <div>
          <div class="rutinas-toggle-lbl">Rutina activa</div>
          <div class="rutinas-toggle-sub">Desactiva para ocultar del registro diario</div>
        </div>
        <div class="rutinas-switch on" id="rutina-editar-switch" onclick="this.classList.toggle('on')">
          <div class="rutinas-switch-knob"></div>
        </div>
      </div>
      <button class="rutinas-btn-save" onclick="emmaRutinasGuardarEdicion()">Guardar cambios</button>
      <button class="rutinas-btn-danger" onclick="emmaRutinasEliminar()">Eliminar rutina</button>
      <button class="rutinas-btn-cancel" onclick="emmaRutinasCerrar('rutinas-modal-editar')">Cancelar</button>
    </div>
  </div>
</div>

        <div class="screen" id="screen-planes">

  <!-- VISTA LISTA -->
  <div id="planes-vista-lista" style="display:flex;flex-direction:column;height:100%;">
    <div class="screen-topbar" style="flex-shrink:0;">
      <div class="screen-topbar-row">
        <div class="screen-topbar-left">
          <button class="ham-btn" onclick="emmaAbrirSidebarMobile()">
            <div class="ham-line"></div><div class="ham-line"></div><div class="ham-line"></div>
          </button>
        </div>
        <div class="screen-title-wrap"><span class="screen-title">Planes</span></div>
        <div class="screen-topbar-right"></div>
      </div>
    </div>
    <div class="main" style="padding-top:8px;overflow-y:auto;flex:1;">
      <button class="planes-add-btn" onclick="emmaPlaneAbrirNuevo()">
        <span style="font-size:18px;font-weight:400;">+</span> Crear plan diario
      </button>
      <div id="planes-lista-container"></div>
    </div>
  </div>

  <!-- VISTA DETALLE -->
  <div id="planes-vista-detalle" style="display:none;flex-direction:column;height:100%;">
    <div class="planes-detail-topbar">
      <div class="planes-back-btn" onclick="emmaPlaneVolverLista()">‹</div>
      <div class="planes-detail-title" id="planes-detail-title">—</div>
      <button class="planes-detail-edit" onclick="emmaPlaneAbrirEditarNombre()">Editar</button>
    </div>
    <div class="planes-meta-row">
      <span class="planes-badge-activo" id="planes-detail-badge">● PLAN ACTIVO</span>
      <span style="font-size:12px;color:var(--emma-muted);" id="planes-detail-count">0 ítems</span>
    </div>
    <div class="planes-add-row">
      <button class="planes-add-item-btn" onclick="emmaPlaneAbrirAddComida()">🍽️ + Comida</button>
      <button class="planes-add-item-btn" onclick="emmaPlaneAbrirAddRutina()">📋 + Rutina</button>
    </div>
    <div class="planes-scroll" id="planes-scroll-area"></div>
  </div>

</div>

<!-- MODAL NUEVO PLAN -->
<div class="planes-modal-overlay" id="planes-modal-nuevo" onclick="emmaPlanesCerrarSiOverlay(event,'planes-modal-nuevo')">
  <div class="planes-modal-sheet">
    <div class="planes-modal-handle"></div>
    <div class="planes-modal-title">Nuevo plan diario</div>
    <div class="planes-modal-body">
      <div>
        <div class="planes-field-label">NOMBRE DEL PLAN</div>
        <input class="planes-field-input" id="planes-nuevo-nombre" type="text" placeholder="Ej: Plan Emma — 6 meses">
        <div class="planes-field-hint">Describe la etapa o edad para identificarlo fácilmente</div>
      </div>
      <button class="planes-btn-save" onclick="emmaPlaneGuardarNuevo()">Crear plan</button>
      <button class="planes-btn-cancel" onclick="emmaPlanesCerrar('planes-modal-nuevo')">Cancelar</button>
    </div>
  </div>
</div>

<!-- MODAL EDITAR NOMBRE PLAN -->
<div class="planes-modal-overlay" id="planes-modal-editar-nombre" onclick="emmaPlanesCerrarSiOverlay(event,'planes-modal-editar-nombre')">
  <div class="planes-modal-sheet">
    <div class="planes-modal-handle"></div>
    <div class="planes-modal-title">Editar plan</div>
    <div class="planes-modal-body">
      <div>
        <div class="planes-field-label">NOMBRE</div>
        <input class="planes-field-input" id="planes-editar-nombre-input" type="text">
      </div>
      <div class="planes-modal-divider"></div>
      <div style="display:flex;align-items:center;justify-content:space-between;background:var(--emma-bg);border:0.5px solid rgba(127,119,221,0.2);border-radius:10px;padding:12px 14px;">
        <div>
          <div style="font-size:14px;font-weight:500;color:var(--emma-fg);">Plan activo</div>
          <div style="font-size:11px;color:var(--emma-muted);margin-top:2px;">Solo puede haber un plan activo a la vez</div>
        </div>
        <div class="rutinas-switch on" id="planes-activo-switch" onclick="this.classList.toggle('on')">
          <div class="rutinas-switch-knob"></div>
        </div>
      </div>
      <button class="planes-btn-save" onclick="emmaPlaneGuardarEdicionNombre()">Guardar</button>
      <button class="planes-btn-cancel" onclick="emmaPlanesCerrar('planes-modal-editar-nombre')">Cancelar</button>
    </div>
  </div>
</div>

<!-- MODAL AGREGAR COMIDA AL PLAN -->
<div class="planes-modal-overlay" id="planes-modal-add-comida" onclick="emmaPlanesCerrarSiOverlay(event,'planes-modal-add-comida')">
  <div class="planes-modal-sheet">
    <div class="planes-modal-handle"></div>
    <div class="planes-modal-title">Agregar comida</div>
    <div class="planes-modal-body">
      <div>
        <div class="planes-field-label">CATEGORÍA</div>
        <div class="planes-seg-group" id="planes-add-comida-cat">
          <button class="planes-seg-opt active" onclick="emmaPlaneSelSeg(this,'planes-add-comida-cat')">🍼 Leche</button>
          <button class="planes-seg-opt" onclick="emmaPlaneSelSeg(this,'planes-add-comida-cat')">🥕 Sólidos</button>
          <button class="planes-seg-opt" onclick="emmaPlaneSelSeg(this,'planes-add-comida-cat')">🍌 Postre</button>
        </div>
      </div>
      <div>
        <div class="planes-field-label">ETIQUETA (opcional)</div>
        <input class="planes-field-input" id="planes-add-comida-etiqueta" type="text" placeholder="Ej: Almuerzo, Cena, Desayuno">
        <div class="planes-field-hint">Aparece como descripción en la línea de tiempo</div>
      </div>
      <div>
        <div class="planes-field-label">CANTIDAD ORIENTATIVA (opcional)</div>
        <div style="display:flex;gap:8px;align-items:center;">
          <input class="planes-field-input" id="planes-add-comida-cantidad" type="number" placeholder="120" style="flex:1;">
          <div class="planes-seg-group" id="planes-add-comida-unidad">
            <button class="planes-seg-opt active" onclick="emmaPlaneSelSeg(this,'planes-add-comida-unidad')">cc</button>
            <button class="planes-seg-opt" onclick="emmaPlaneSelSeg(this,'planes-add-comida-unidad')">gr</button>
          </div>
        </div>
        <div class="planes-field-hint">Solo como referencia. El registro real se ingresa al momento</div>
      </div>
      <div>
        <div class="planes-field-label">HORARIO</div>
        <div class="planes-time-picker">
          <div class="planes-time-col">
            <div class="planes-time-arrow" onclick="emmaPlanesCambiarHora(1,'add-comida')">▲</div>
            <div class="planes-time-val" id="planes-add-comida-h">6</div>
            <div class="planes-time-arrow" onclick="emmaPlanesCambiarHora(-1,'add-comida')">▼</div>
            <div class="planes-time-unit">HORA</div>
          </div>
          <div class="planes-time-sep">:</div>
          <div class="planes-time-col">
            <div class="planes-time-arrow" onclick="emmaPlanesCambiarMin('add-comida')">▲</div>
            <div class="planes-time-val" id="planes-add-comida-m">00</div>
            <div class="planes-time-arrow" onclick="emmaPlanesCambiarMin('add-comida')">▼</div>
            <div class="planes-time-unit">MIN</div>
          </div>
        </div>
      </div>
      <button class="planes-btn-save" onclick="emmaPlaneGuardarComida()">Agregar al plan</button>
      <button class="planes-btn-cancel" onclick="emmaPlanesCerrar('planes-modal-add-comida')">Cancelar</button>
    </div>
  </div>
</div>

<!-- MODAL AGREGAR RUTINA AL PLAN -->
<div class="planes-modal-overlay" id="planes-modal-add-rutina" onclick="emmaPlanesCerrarSiOverlay(event,'planes-modal-add-rutina')">
  <div class="planes-modal-sheet">
    <div class="planes-modal-handle"></div>
    <div class="planes-modal-title">Agregar rutina</div>
    <div class="planes-modal-body">
      <div>
        <div class="planes-field-label">RUTINA</div>
        <div class="planes-seg-group" id="planes-add-rutina-sel"></div>
      </div>
      <div>
        <div class="planes-field-label">¿HORARIO FIJO O FLEXIBLE?</div>
        <div class="planes-tipo-fija-group">
          <div class="planes-tipo-fija-opt" id="planes-opt-fija" onclick="emmaPlaneSelTipoFija('fija')">
            <div class="planes-tipo-fija-icon">🕐</div>
            <div class="planes-tipo-fija-lbl">Hora fija</div>
            <div class="planes-tipo-fija-sub">Aparece en la línea de tiempo</div>
          </div>
          <div class="planes-tipo-fija-opt active" id="planes-opt-flexible" onclick="emmaPlaneSelTipoFija('flexible')">
            <div class="planes-tipo-fija-icon">🔄</div>
            <div class="planes-tipo-fija-lbl">Flexible</div>
            <div class="planes-tipo-fija-sub">Queda en "cualquier momento"</div>
          </div>
        </div>
      </div>
      <div class="planes-hora-row" id="planes-add-rutina-hora-row">
        <div class="planes-field-label">HORARIO</div>
        <div class="planes-time-picker">
          <div class="planes-time-col">
            <div class="planes-time-arrow" onclick="emmaPlanesCambiarHora(1,'add-rutina')">▲</div>
            <div class="planes-time-val" id="planes-add-rutina-h">6</div>
            <div class="planes-time-arrow" onclick="emmaPlanesCambiarHora(-1,'add-rutina')">▼</div>
            <div class="planes-time-unit">HORA</div>
          </div>
          <div class="planes-time-sep">:</div>
          <div class="planes-time-col">
            <div class="planes-time-arrow" onclick="emmaPlanesCambiarMin('add-rutina')">▲</div>
            <div class="planes-time-val" id="planes-add-rutina-m">00</div>
            <div class="planes-time-arrow" onclick="emmaPlanesCambiarMin('add-rutina')">▼</div>
            <div class="planes-time-unit">MIN</div>
          </div>
        </div>
      </div>
      <button class="planes-btn-save" onclick="emmaPlaneGuardarRutina()">Agregar al plan</button>
      <button class="planes-btn-cancel" onclick="emmaPlanesCerrar('planes-modal-add-rutina')">Cancelar</button>
    </div>
  </div>
</div>

<!-- MODAL CAMBIAR HORA DE ÍTEM -->
<div class="planes-modal-overlay" id="planes-modal-cambiar-hora" onclick="emmaPlanesCerrarSiOverlay(event,'planes-modal-cambiar-hora')">
  <div class="planes-modal-sheet">
    <div class="planes-modal-handle"></div>
    <div class="planes-modal-title">Cambiar horario</div>
    <div class="planes-modal-sub" id="planes-cambiar-hora-sub">—</div>
    <div class="planes-modal-body">
      <div class="planes-time-picker">
        <div class="planes-time-col">
          <div class="planes-time-arrow" onclick="emmaPlanesCambiarHora(1,'edit-hora')">▲</div>
          <div class="planes-time-val" id="planes-edit-hora-h">9</div>
          <div class="planes-time-arrow" onclick="emmaPlanesCambiarHora(-1,'edit-hora')">▼</div>
          <div class="planes-time-unit">HORA</div>
        </div>
        <div class="planes-time-sep">:</div>
        <div class="planes-time-col">
          <div class="planes-time-arrow" onclick="emmaPlanesCambiarMin('edit-hora')">▲</div>
          <div class="planes-time-val" id="planes-edit-hora-m">30</div>
          <div class="planes-time-arrow" onclick="emmaPlanesCambiarMin('edit-hora')">▼</div>
          <div class="planes-time-unit">MIN</div>
        </div>
      </div>
      <div>
        <div class="planes-field-label" style="margin-bottom:8px;">ACCESO RÁPIDO</div>
        <div class="planes-quick-times" id="planes-quick-times">
          <button class="planes-quick-pill" onclick="emmaPlaneSetQuick(6,0,this)">6:00</button>
          <button class="planes-quick-pill" onclick="emmaPlaneSetQuick(6,30,this)">6:30</button>
          <button class="planes-quick-pill" onclick="emmaPlaneSetQuick(9,0,this)">9:00</button>
          <button class="planes-quick-pill" onclick="emmaPlaneSetQuick(9,30,this)">9:30</button>
          <button class="planes-quick-pill" onclick="emmaPlaneSetQuick(12,0,this)">12:00</button>
          <button class="planes-quick-pill" onclick="emmaPlaneSetQuick(12,30,this)">12:30</button>
          <button class="planes-quick-pill" onclick="emmaPlaneSetQuick(15,0,this)">15:00</button>
          <button class="planes-quick-pill" onclick="emmaPlaneSetQuick(15,30,this)">15:30</button>
          <button class="planes-quick-pill" onclick="emmaPlaneSetQuick(18,0,this)">18:00</button>
          <button class="planes-quick-pill" onclick="emmaPlaneSetQuick(18,30,this)">18:30</button>
          <button class="planes-quick-pill" onclick="emmaPlaneSetQuick(21,0,this)">21:00</button>
        </div>
      </div>
      <div class="planes-modal-divider"></div>
      <div>
        <div class="planes-field-label" style="margin-bottom:8px;">O MOVER A</div>
        <div class="planes-tipo-fija-group">
          <div class="planes-tipo-fija-opt active" id="planes-mover-fija" onclick="emmaPlanesSelMover('fija')">
            <div class="planes-tipo-fija-icon">🕐</div>
            <div class="planes-tipo-fija-lbl">Hora fija</div>
            <div class="planes-tipo-fija-sub">Con el horario seleccionado</div>
          </div>
          <div class="planes-tipo-fija-opt" id="planes-mover-flexible" onclick="emmaPlanesSelMover('flexible')">
            <div class="planes-tipo-fija-icon">🔄</div>
            <div class="planes-tipo-fija-lbl">Flexible</div>
            <div class="planes-tipo-fija-sub">Mover a "cualquier momento"</div>
          </div>
        </div>
      </div>
      <button class="planes-btn-save" onclick="emmaPlaneGuardarHora()">Guardar horario</button>
      <button class="planes-btn-cancel" onclick="emmaPlanesCerrar('planes-modal-cambiar-hora')">Cancelar</button>
    </div>
  </div>
</div>


        <div class="screen" id="screen-admin">
          <div class="screen-topbar">
            <div class="screen-topbar-row">
              <div class="screen-topbar-left">
                <button class="ham-btn" onclick="emmaAbrirSidebarMobile()"><div class="ham-line"></div><div class="ham-line"></div><div class="ham-line"></div></button>
              </div>
              <div class="screen-title-wrap"><span class="screen-title">Categorías</span></div>
              <div class="screen-topbar-right"></div>
            </div>
          </div>
          <div class="main" style="padding-top:8px;">
            <div style="background:var(--emma-card);border:1px solid var(--emma-border-soft);border-radius:16px;padding:40px;text-align:center;color:var(--emma-muted);">
              <div style="font-size:32px;margin-bottom:12px;">⚙️</div>
              <div style="font-size:15px;font-weight:500;color:var(--emma-fg);margin-bottom:6px;">Categorías y configuración</div>
              <div style="font-size:13px;">Próxima iteración — conectar con Google Sheets</div>
            </div>
          </div>
        </div>

        <div class="screen" id="screen-perfil">
          <div class="screen-topbar">
            <div class="screen-topbar-row">
              <div class="screen-topbar-left">
                <button class="ham-btn" onclick="emmaAbrirSidebarMobile()"><div class="ham-line"></div><div class="ham-line"></div><div class="ham-line"></div></button>
              </div>
              <div class="screen-title-wrap"><span class="screen-title">Perfil Emma</span></div>
              <div class="screen-topbar-right"></div>
            </div>
          </div>
          <div class="main" style="padding-top:8px;">
            <div style="background:var(--emma-card);border:1px solid var(--emma-border-soft);border-radius:16px;padding:40px;text-align:center;color:var(--emma-muted);">
              <div style="font-size:32px;margin-bottom:12px;">👶</div>
              <div style="font-size:15px;font-weight:500;color:var(--emma-fg);margin-bottom:6px;">Perfil de Emma</div>
              <div style="font-size:13px;">Próxima iteración — nombre, peso, talla, fecha nacimiento</div>
            </div>
          </div>
        </div>

      </main>
    </div>
  </div>
</div>

<div class="toast" id="emma-toast"></div>
<div class="loading-overlay" id="emma-loading">
  <div style="width:36px;height:36px;border:3px solid #e0e0e0;border-top-color:var(--emma-accent);border-radius:50%;animation:spin 0.8s linear infinite;"></div>
  <div style="font-size:14px;color:#666;">Cargando...</div>
</div>
  `

  useEffect(() => {
    if (user?.name) {
      window.emmaUserName = user.name
      const el = document.getElementById('emma-greeting')
      if (el) el.innerHTML = 'Buenos días, <i>' + user.name.split(' ')[0] + '.</i>'
    }
  }, [user])

  useEffect(() => {
    if (!document.getElementById('sortable-js')) {
      const s = document.createElement('script')
      s.id = 'sortable-js'
      s.src = 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/Sortable.min.js'
      document.head.appendChild(s)
    }
    if (document.getElementById('emma-script')) {
      if (typeof window.emmaCargarDatos === 'function') window.emmaCargarDatos()
      return
    }
    const script = document.createElement('script')
    script.id = 'emma-script'
    script.src = '/emma-script.js'
    script.onload = () => {
      if (typeof window.emmaCargarDatos === 'function') window.emmaCargarDatos()
    }
    document.body.appendChild(script)
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cssContent }} />
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </>
  )
}
