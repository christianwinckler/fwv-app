
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
window.toggleAdminCat=toggleAdminCat;
window.eliminarSubcat=eliminarSubcat;
window.agregarSubcat=agregarSubcat;
window.aplicarAlcance=aplicarAlcance;
window.togglePptoSort=togglePptoSort;
window.abrirModalPpto=abrirModalPpto;
window.setDetFiltro=setDetFiltro;
window.toggleDetCat=toggleDetCat;
window.aplicarDetFiltros=aplicarDetFiltros;
window.limpiarDetFiltros=limpiarDetFiltros;
window.renderHome=renderHome;
window.toggleHomeFiltro=toggleHomeFiltro;
window.cerrarHomeFiltro=cerrarHomeFiltro;
window.toggleHomeCat=toggleHomeCat;
window.limpiarHomeFiltros=limpiarHomeFiltros;
window.showHomeTip=showHomeTip;
window.hideHomeTip=hideHomeTip;
window.abrirDrawer=abrirDrawer;

const meses=['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const mesesC=['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
const catColores={'Hogar':'#1a73e8','Supermercado':'#2e7d32','Auto':'#e65100','Banco':'#c62828','Salud':'#6a1b9a','Cuentas':'#00695c','Entretenimiento':'#f57f17','Mall':'#bf360c','Ingresos':'#2e7d32'};
const catBgs={'Hogar':'#e8f0fe','Supermercado':'#e8f5e9','Auto':'#fff3e0','Banco':'#fce4ec','Salud':'#f3e5f5','Cuentas':'#e0f7fa','Entretenimiento':'#fff8e1','Mall':'#fbe9e7','Ingresos':'#e8f5e9'};

let subcats=[];

let pptoData={};
let presupuestoAllRows=[];
let pptoSubcats=[];

let dashData={};
let detalleData={};
// Estado
let totalFilasGastos=0;
let dashMes=3,dashAnio=2026,pptoPanelMes=3,pptoPanelAnio=2026;
let rangoDesde={mes:3,anio:2026},rangoHasta={mes:3,anio:2026};
let listaOpen=false,alcancePendiente=null;
let gastoActual=null,modoEdicion=false,gastoEditandoRowIndex=null;
let detFiltros={tipo:'todos',cats:[],banco:'todos',orden:'reciente'};
let dashSortAsc=false;
let pptoSortAsc=false;
let catPptoPendiente=null;
let catAlcancePendiente=null;
const EXCLUDED_CATS=['Ahorro en Cuenta Vista','Pago Tarjeta Crédito Limited Visa'];

let homeFiltroAbierto=false;
let homeCatActiva='todos';
let homeSubcatActiva=null;

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
function buildPptoForMonth(mes,anio){
  const key=String(mes+1).padStart(2,'0')+'-'+anio;
  const rows=presupuestoAllRows.filter(r=>r&&r[0]===key);
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
  mostrarLoading('Cargando datos...');
  try{
    const[paramRes,gastosRes,pptoRes]=await Promise.all([
      fetch('/api/parametros'),fetch('/api/gastos'),fetch('/api/presupuesto')
    ]);
    if(!paramRes.ok)throw new Error('Error al cargar parámetros ('+paramRes.status+')');
    if(!gastosRes.ok)throw new Error('Error al cargar gastos ('+gastosRes.status+')');
    if(!pptoRes.ok)throw new Error('Error al cargar presupuesto ('+pptoRes.status+')');
    const paramRows=await paramRes.json();
    const gastosRows=await gastosRes.json();
    const pptoRows=await pptoRes.json();

    subcats=paramRows.slice(1).filter(r=>r&&r[0]).map(r=>({sub:r[0],cat:r[1]||'',ie:r[2]||'E'}));
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
               banco,dev:(row[6]||'')==='X',desc:row[7]||'',monto};
      if(!detalleData[mesAnio])detalleData[mesAnio]=[];
      detalleData[mesAnio].push(g);
    });

    dashData=computarDashData();
    ocultarLoading();
    renderDashboard();
    if(document.getElementById('screen-home')?.classList.contains('active')) renderHome();
  }catch(e){
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
        .reduce((s,sc)=>s+(pptoData[sc.sub]?pptoData[sc.sub].monto:0),0);
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
const screenTitles={home:'Home',dashboard:'Resumen',detalle:'Detalle',presupuesto:'Presupuestos',admin:'Categorías'};
function switchScreen(screen){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+screen).classList.add('active');
  document.querySelectorAll('.nav-link,.drawer-link').forEach(l=>{
    l.classList.toggle('active',l.dataset.screen===screen);
  });
  const titleEl=document.getElementById('navbar-title');
  if(titleEl) titleEl.innerHTML=`<span class="brand-prefix">Gastos FWV</span> - ${screenTitles[screen]||screen}`;
  if(screen==='dashboard') renderDashboard();
  if(screen==='presupuesto') renderPresupuesto();
  if(screen==='admin') renderAdmin();
  if(screen==='detalle') renderDetalle();
  if(screen==='home') renderHome();
  window.scrollTo(0,0);
}

function abrirNuevoGasto(){
  modoEdicion=false;gastoEditandoRowIndex=null;
  document.querySelector('#ov-nuevo .sheet-title').textContent='Nuevo gasto';
  document.getElementById('btn-guardar').textContent='Guardar gasto';
  document.getElementById('ov-nuevo').classList.add('open');
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

// Dashboard buscar / orden
document.getElementById('dash-cat-search').addEventListener('input',renderDashboard);
document.getElementById('dash-sort-btn').addEventListener('click',()=>{dashSortAsc=!dashSortAsc;renderDashboard();});

function abrirCat(i,key){
  const c=dashData[key].categorias[i];
  document.getElementById('cat-sheet-title').textContent=c.nombre;

  const subcatsCat=[...pptoSubcats.filter(s=>s.cat===c.nombre)].sort((a,b)=>(pptoData[b.sub]?.monto||0)-(pptoData[a.sub]?.monto||0));
  const ppto=subcatsCat.reduce((s,sc)=>s+(pptoData[sc.sub]?.monto||0),0);
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
            const val=pptoData[sc.sub]?.monto||0;
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
      <div class="gasto-cat-dot" style="background:${catColores[c.nombre]||'#999'};"></div>
      <div class="gasto-info"><div class="gasto-desc">${g.desc}</div><div class="gasto-meta">${g.sub?g.sub.includes(' - ')?g.sub.split(' - ').slice(1).join(' - '):g.sub:''}${g.sub&&g.fecha?' · ':''}${g.fecha}</div></div>
      <div class="gasto-monto e">- ${fmt(g.monto)}</div>
    </div>`).join('');
  document.getElementById('ov-cat').classList.add('open');
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
  return `${fd.getDate()} de ${meses[fd.getMonth()]}`;
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
      ${items.map(g=>`
        <div class="gasto-item" onclick="abrirGasto(${g.id})">
          <div class="gasto-cat-dot" style="background:${catColores[g.cat]||'#999'};"></div>
          <div class="gasto-info">
            <div class="gasto-desc">${g.desc}</div>
            <div class="gasto-meta"><span>${g.sub}</span>${g.dev?'<span class="gasto-dev">devolución</span>':''}</div>
            <div class="gasto-meta" style="margin-top:3px;"><span class="gasto-banco ${g.banco==='Santander'?'santander':g.banco==='Falabella'?'falabella':'tc'}">${g.banco}</span></div>
          </div>
          <div class="gasto-monto ${g.ie.toLowerCase()}">${g.ie==='E'?'-':'+'} ${fmt(g.monto)}</div>
        </div>`).join('')}
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
function abrirGasto(id){
  const g=getTodosRango().find(x=>x.id===id);if(!g)return;
  gastoActual=g;
  document.getElementById('g-desc').textContent=g.desc;
  document.getElementById('g-monto').textContent=(g.ie==='E'?'- ':'+ ')+fmt(g.monto);
  document.getElementById('ov-gasto').classList.add('open');
}
function abrirGastoById(id){
  let g=null;
  for(const gastos of Object.values(detalleData)){g=gastos.find(x=>x.id===id);if(g)break;}
  if(!g)return;
  gastoActual=g;
  document.getElementById('g-desc').textContent=g.desc;
  document.getElementById('g-monto').textContent=(g.ie==='E'?'- ':'+ ')+fmt(g.monto);
  document.getElementById('ov-gasto').classList.add('open');
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
document.getElementById('rango-btn').addEventListener('click',()=>{
  const anios=[2019,2020,2021,2022,2023,2024,2025,2026];
  ['p-desde-mes','p-hasta-mes'].forEach(id=>{document.getElementById(id).innerHTML=meses.map((m,i)=>`<option value="${i}">${m}</option>`).join('');});
  ['p-desde-anio','p-hasta-anio'].forEach(id=>{document.getElementById(id).innerHTML=anios.map(a=>`<option value="${a}">${a}</option>`).join('');});
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
});

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
      const totalCat=filteredSubs.reduce((s,sc)=>{const p=pptoData[sc.sub];return s+(p?p.monto:0);},0);
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
        ${sortedSubs.map(sc=>{const p=pptoData[sc.sub]||{monto:0,fijo:false};return `
          <div class="ppto-subcat-item">
            <div class="ppto-subcat-info"><div class="ppto-subcat-nombre">${sc.sub.includes(' - ')?sc.sub.split(' - ').slice(1).join(' - '):sc.sub}</div></div>
            <span class="ppto-tipo-badge ${p.fijo?'fijo':'variable'}" onclick="toggleFijo('${sc.sub}')">${p.fijo?'Fijo':'Variable'}</span>
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
}
async function aplicarAlcance(soloMes){
  if(catAlcancePendiente){
    const{cat,catIdx,key,entries,mes,anio}=catAlcancePendiente;
    entries.forEach(({sub,monto})=>{if(!pptoData[sub])pptoData[sub]={monto:0,fijo:false};pptoData[sub].monto=monto;});
    mostrarLoading('Guardando presupuesto...');
    try{
      if(soloMes){
        const periodo=String(mes+1).padStart(2,'0')+'-'+anio;
        entries.forEach(({sub,monto})=>{
          const idx=presupuestoAllRows.findIndex(r=>r[0]===periodo&&r[1]===sub);
          if(idx>=0)presupuestoAllRows[idx]=[periodo,sub,cat,monto];
          else presupuestoAllRows.push([periodo,sub,cat,monto]);
        });
      }else{
        for(let m=mes;m<=11;m++){
          const periodo=String(m+1).padStart(2,'0')+'-'+anio;
          entries.forEach(({sub,monto})=>{
            const idx=presupuestoAllRows.findIndex(r=>r[0]===periodo&&r[1]===sub);
            if(idx>=0)presupuestoAllRows[idx]=[periodo,sub,cat,monto];
            else presupuestoAllRows.push([periodo,sub,cat,monto]);
          });
        }
      }
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
  if(!pptoData[sub])pptoData[sub]={monto:0,fijo:false};
  pptoData[sub].monto=nuevoMonto;
  const cat=pptoSubcats.find(s=>s.sub===sub)?.cat||sub;
  mostrarLoading('Guardando presupuesto...');
  try{
    if(soloMes){
      const periodo=String(pptoPanelMes+1).padStart(2,'0')+'-'+pptoPanelAnio;
      const idx=presupuestoAllRows.findIndex(r=>r[0]===periodo&&r[1]===sub);
      if(idx>=0){presupuestoAllRows[idx]=[periodo,sub,cat,nuevoMonto];}
      else{presupuestoAllRows.push([periodo,sub,cat,nuevoMonto]);}
    }else{
      for(let m=pptoPanelMes;m<=11;m++){
        const periodo=String(m+1).padStart(2,'0')+'-'+pptoPanelAnio;
        const idx=presupuestoAllRows.findIndex(r=>r[0]===periodo&&r[1]===sub);
        if(idx>=0){presupuestoAllRows[idx]=[periodo,sub,cat,nuevoMonto];}
        else{presupuestoAllRows.push([periodo,sub,cat,nuevoMonto]);}
      }
    }
    const res=await fetch('/api/presupuesto',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({rows:presupuestoAllRows})});
    if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
    mostrarToast(soloMes?`Actualizado para ${meses[pptoPanelMes]} ${pptoPanelAnio}`:`Actualizado hasta dic ${pptoPanelAnio}`);
  }catch(e){
    mostrarToast('Error al guardar: '+e.message);
  }finally{
    ocultarLoading();
  }
  cerrar('ov-alcance');alcancePendiente=null;
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
function renderAdmin(){
  const grupos={};subcats.forEach(s=>{if(!grupos[s.cat])grupos[s.cat]=[];grupos[s.cat].push(s);});
  document.getElementById('admin-cat-lista').innerHTML=Object.entries(grupos).map(([cat,subs])=>`
    <div class="admin-cat-card">
      <div class="admin-cat-header" onclick="toggleAdminCat(this)">
        <div class="cat-icon" style="width:28px;height:28px;font-size:12px;background:${catBgs[cat]||'#f5f5f5'};color:${catColores[cat]||'#666'};border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:600;flex-shrink:0;">${cat.charAt(0)}</div>
        <span class="admin-cat-nombre">${cat}</span>
        <span class="admin-cat-count">${subs.length} subcats</span>
        <span class="admin-cat-chevron">▼</span>
      </div>
      <div class="admin-subcat-list">
        ${subs.map(s=>`
          <div class="admin-subcat-item">
            <span class="admin-subcat-nombre">${s.sub.includes(' - ')?s.sub.split(' - ').slice(1).join(' - '):s.sub}</span>
            <span class="admin-ie-badge admin-ie-${s.ie}">${s.ie==='E'?'Egreso':'Ingreso'}</span>
            <button class="admin-edit-btn">✏️</button>
            <button class="admin-del-btn" onclick="eliminarSubcat('${s.sub}')">✕</button>
          </div>`).join('')}
        <div class="admin-add-row">
          <input class="admin-add-input" placeholder="Nueva subcategoría..." id="new-sub-${cat}" />
          <button class="admin-add-btn" onclick="agregarSubcat('${cat}')">+ Agregar</button>
        </div>
      </div>
    </div>`).join('');
}
function toggleAdminCat(h){const l=h.nextElementSibling,c=h.querySelector('.admin-cat-chevron');l.classList.toggle('open');c.classList.toggle('open');}
function agregarSubcat(cat){const i=document.getElementById('new-sub-'+cat);const n=i.value.trim();if(!n)return;subcats.push({sub:cat+' - '+n,cat,ie:'E'});i.value='';renderAdmin();}
function eliminarSubcat(sub){subcats=subcats.filter(s=>s.sub!==sub);renderAdmin();}
document.getElementById('btn-add-cat').addEventListener('click',()=>{
  const i=document.getElementById('nueva-cat-input');const n=i.value.trim();if(!n)return;
  mostrarToast(`Categoría "${n}" agregada`);i.value='';
});

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
document.getElementById('ov-nuevo').addEventListener('click',e=>{
  if(e.target===document.getElementById('ov-nuevo')){
    cerrar('ov-nuevo');
    modoEdicion=false;gastoEditandoRowIndex=null;
    document.querySelector('#ov-nuevo .sheet-title').textContent='Nuevo gasto';
    document.getElementById('btn-guardar').textContent='Guardar gasto';
  }
});
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
    }else{
      const res=await fetch('/api/gastos',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({row})});
      if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
      mostrarToast('Gasto guardado \u2713');
    }
    cerrar('ov-nuevo');
    document.getElementById('f-fecha').valueAsDate=new Date();
    document.getElementById('f-subcat').value='';
    document.getElementById('f-desc').value='';
    document.getElementById('f-monto').value='';
    document.querySelectorAll('.banco-btn').forEach(b=>b.classList.remove('active'));
    document.getElementById('dev-toggle').classList.remove('active');
    document.getElementById('dev-hint').textContent='marcar con X';
    document.getElementById('f-cat-badge').style.display='none';
    await cargarDatos();
    renderDetalle();
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
    const res=await fetch('/api/presupuesto',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({rows:allRows})});
    if(!res.ok){const err=await res.json().catch(()=>({}));throw new Error(err.error||'Error '+res.status);}
    mostrarToast('Presupuesto agregado \u2713');
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
  function netoByBanco(banco){
    let total=0;
    for(const gastos of Object.values(detalleData)){
      gastos.forEach(g=>{
        if(g.banco===banco){
          total+=(g.ie==='I'?g.monto:-g.monto);
        }
      });
    }
    return total;
  }
  const sant=netoByBanco('Santander');
  const santEl=document.getElementById('kpi-sant');
  if(santEl){
    santEl.querySelector('.kpi-valor').textContent=fmt(sant);
  }
  const fala=netoByBanco('Falabella');
  const falaEl=document.getElementById('kpi-fala');
  if(falaEl){
    falaEl.querySelector('.kpi-valor').textContent=fmt(fala);
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
  if(falaMesEl) falaMesEl.textContent=ultimoMesFala;
  if(falaCompEl) falaCompEl.textContent=numComprasFala;

  // ── KPI TARJETA DE CRÉDITO ───────────────────────
  const tc=netoByBanco('Tarjeta Crédito');
  const tcEl=document.getElementById('kpi-tc');
  if(tcEl){
    tcEl.textContent=(tc>=0?'':'-')+fmt(tc);
    tcEl.style.color=tc>=0?'#2e7d32':'#c62828';
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
    el.querySelector('.cat-kpi-monto').textContent=fmt(actual);
    el.querySelector('.cat-kpi-comparacion').innerHTML=
      `<span class="cat-kpi-prom">prom ${fmt(prom)}</span>`+
      (prom>0?`<span class="cat-kpi-diff ${diffOk?'diff-ok':'diff-over'}">${diff>0?'+':''}${diff}%</span>`:'');
    el.querySelector('.cat-kpi-fill').style.width=barPct+'%';
    el.querySelector('.cat-kpi-fill').style.background=barColor;
  });

  // ── INICIALIZAR CHIPS DE CATEGORÍA ───────────────
  const chipsCat=document.getElementById('home-chips-cat');
  if(chipsCat&&chipsCat.children.length<=1){
    const cats=[...new Set(subcats.filter(s=>s.ie==='E').map(s=>s.cat))].sort();
    cats.forEach(cat=>{
      const btn=document.createElement('button');
      btn.className='home-chip';
      btn.textContent=cat;
      btn.onclick=()=>toggleHomeCat(btn,cat);
      chipsCat.appendChild(btn);
    });
  }

  renderHomeGrafico();
}

function renderHomeGrafico(){
  const svg=document.getElementById('home-line-chart');
  const mesesEl=document.getElementById('home-chart-meses');
  if(!svg) return;

  // Calcular 12 meses hacia atrás
  const puntos=[];
  for(let i=11;i>=0;i--){
    const{mes,anio}=prevMesAnio(dashMes,dashAnio,i);
    const key=keyMesAnio(mes,anio);
    const gastos=detalleData[key]||[];
    let gasto=0;
    gastos.forEach(g=>{
      if(g.ie!=='E') return;
      if(EXCLUDED_CATS.includes(g.cat)) return;
      if(homeCatActiva!=='todos'&&g.cat!==homeCatActiva) return;
      if(homeSubcatActiva&&g.sub!==homeSubcatActiva) return;
      gasto+=g.monto;
    });
    let ppto=0;
    if(homeCatActiva==='todos'&&!homeSubcatActiva){
      const rows=presupuestoAllRows.filter(r=>r&&r[0]===key);
      rows.forEach(r=>{
        const sub=(r[1]||'').trim();
        const sc=subcats.find(s=>s.sub===sub);
        if(sc&&!EXCLUDED_CATS.includes(sc.cat)) ppto+=parseMonto(r[3])||0;
      });
    } else if(homeSubcatActiva){
      const rows=presupuestoAllRows.filter(r=>r&&r[0]===key&&(r[1]||'').trim()===homeSubcatActiva);
      rows.forEach(r=>{ ppto+=parseMonto(r[3])||0; });
    } else {
      const rows=presupuestoAllRows.filter(r=>r&&r[0]===key);
      rows.forEach(r=>{
        const sub=(r[1]||'').trim();
        const sc=subcats.find(s=>s.sub===sub);
        if(sc&&sc.cat===homeCatActiva) ppto+=parseMonto(r[3])||0;
      });
    }
    puntos.push({mes,anio,key,gasto,ppto,label:mesesC[mes]});
  }

  const W=360,H=160,padL=10,padR=10,padT=14,padB=8;
  const maxVal=Math.max(...puntos.map(p=>Math.max(p.gasto,p.ppto)),1);
  const xOf=i=>padL+(i/(puntos.length-1))*(W-padL-padR);
  const yOf=v=>padT+(1-v/maxVal)*(H-padT-padB);

  // Grid lines
  let svgStr='';
  const gridSteps=4;
  for(let i=0;i<=gridSteps;i++){
    const y=padT+(i/gridSteps)*(H-padT-padB);
    svgStr+=`<line x1="${padL}" y1="${y}" x2="${W-padR}" y2="${y}" stroke="#f0f0f0" stroke-width="0.5"/>`;
  }

  // Área sombreada bajo gasto real
  const areaPoints=puntos.map((p,i)=>`${xOf(i)},${yOf(p.gasto)}`).join(' ');
  const areaPath=`M${xOf(0)},${yOf(puntos[0].gasto)} `+
    puntos.slice(1).map((p,i)=>`L${xOf(i+1)},${yOf(p.gasto)}`).join(' ')+
    ` L${xOf(puntos.length-1)},${yOf(0)} L${xOf(0)},${yOf(0)} Z`;
  svgStr+=`<path d="${areaPath}" fill="#e53935" fill-opacity="0.08"/>`;

  // Línea presupuesto (azul punteado)
  const pptoPath=puntos.map((p,i)=>`${i===0?'M':'L'}${xOf(i)},${yOf(p.ppto)}`).join(' ');
  svgStr+=`<path d="${pptoPath}" fill="none" stroke="#1a73e8" stroke-width="1.5" stroke-dasharray="4,3" opacity="0.7"/>`;

  // Línea gasto real (rojo)
  const gastoPath=puntos.map((p,i)=>`${i===0?'M':'L'}${xOf(i)},${yOf(p.gasto)}`).join(' ');
  svgStr+=`<path d="${gastoPath}" fill="none" stroke="#e53935" stroke-width="2"/>`;

  // Puntos interactivos
  puntos.forEach((p,i)=>{
    const over=p.gasto>p.ppto&&p.ppto>0;
    const color=over?'#e53935':'#2e7d32';
    const cx=xOf(i),cy=yOf(p.gasto);
    svgStr+=`<circle cx="${cx}" cy="${cy}" r="4" fill="${color}" stroke="#fff" stroke-width="1.5"
      onmouseenter="showHomeTip(event,${i})" onmouseleave="hideHomeTip()"
      ontouchstart="showHomeTip(event,${i})" ontouchend="hideHomeTip()"/>`;
  });

  svg.innerHTML=svgStr;
  svg.setAttribute('data-puntos',JSON.stringify(puntos));

  if(mesesEl){
    mesesEl.innerHTML=puntos.map(p=>`<span>${p.label}</span>`).join('');
  }
}

function showHomeTip(e,i){
  const svg=document.getElementById('home-line-chart');
  const tip=document.getElementById('home-tooltip');
  if(!svg||!tip) return;
  const puntos=JSON.parse(svg.getAttribute('data-puntos')||'[]');
  const p=puntos[i];
  if(!p) return;
  tip.innerHTML=`<b>${mesesC[p.mes]} ${p.anio}</b><br>Gasto: ${fmt(p.gasto)}<br>Ppto: ${fmt(p.ppto)}`;
  tip.style.display='block';
  const rect=svg.closest('.home-chart-container').getBoundingClientRect();
  const ex=e.touches?e.touches[0].clientX:e.clientX;
  const ey=e.touches?e.touches[0].clientY:e.clientY;
  let left=ex-rect.left+8;
  let top=ey-rect.top-48;
  if(left+120>rect.width) left=ex-rect.left-128;
  if(top<0) top=ey-rect.top+12;
  tip.style.left=left+'px';
  tip.style.top=top+'px';
}
function hideHomeTip(){
  const tip=document.getElementById('home-tooltip');
  if(tip) tip.style.display='none';
}

function toggleHomeFiltro(){
  homeFiltroAbierto=!homeFiltroAbierto;
  const panel=document.getElementById('home-filtro-panel');
  const btn=document.getElementById('home-filtro-btn-open');
  if(panel) panel.classList.toggle('open',homeFiltroAbierto);
  if(btn) btn.style.background=homeFiltroAbierto?'#1a73e8':'#e8f0fe',btn.style.color=homeFiltroAbierto?'#fff':'#1a73e8';
}
function cerrarHomeFiltro(){
  homeFiltroAbierto=false;
  const panel=document.getElementById('home-filtro-panel');
  const btn=document.getElementById('home-filtro-btn-open');
  if(panel) panel.classList.remove('open');
  if(btn){btn.style.background='#e8f0fe';btn.style.color='#1a73e8';}
}
function toggleHomeCat(btn,cat){
  homeCatActiva=cat;
  homeSubcatActiva=null;
  document.querySelectorAll('#home-chips-cat .home-chip').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const subWrap=document.getElementById('home-chips-subcat-wrap');
  const subContainer=document.getElementById('home-chips-subcat');
  if(cat==='todos'){
    if(subWrap) subWrap.style.display='none';
  } else {
    const catSubs=subcats.filter(s=>s.cat===cat&&s.ie==='E');
    if(catSubs.length>0&&subContainer&&subWrap){
      subContainer.innerHTML=catSubs.map(s=>{
        const label=s.sub.includes(' - ')?s.sub.split(' - ').slice(1).join(' - '):s.sub;
        return `<button class="home-chip subcat" onclick="toggleHomeSubcat(this,'${s.sub.replace(/'/g,"\\'")}')">${label}</button>`;
      }).join('');
      subWrap.style.display='block';
    }
  }
  renderHomeGrafico();
}
function toggleHomeSubcat(btn,sub){
  if(homeSubcatActiva===sub){
    homeSubcatActiva=null;
    btn.classList.remove('active');
  } else {
    homeSubcatActiva=sub;
    document.querySelectorAll('#home-chips-subcat .home-chip').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
  }
  renderHomeGrafico();
}
window.toggleHomeSubcat=toggleHomeSubcat;
function limpiarHomeFiltros(){
  homeCatActiva='todos';
  homeSubcatActiva=null;
  document.querySelectorAll('#home-chips-cat .home-chip').forEach((b,i)=>b.classList.toggle('active',i===0));
  const subWrap=document.getElementById('home-chips-subcat-wrap');
  if(subWrap) subWrap.style.display='none';
  renderHomeGrafico();
}

// ── INIT ─────────────────────────────────────────────────
cargarDatos();
  