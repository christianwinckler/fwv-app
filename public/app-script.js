
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
  pptoSubcats=[];
  rows.forEach(r=>{
    const sub=(r[1]||'').trim();
    const cat=(r[2]||sub).trim();
    const monto=parseMonto(r[3]);
    if(!sub)return;
    pptoData[sub]={monto:isNaN(monto)?0:monto,fijo:false};
    pptoSubcats.push({sub,cat,ie:'E'});
  });
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
      catMap[g.cat].gastos.push({desc:g.desc,sub:g.sub,fecha:fd,monto:g.monto});
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
function switchScreen(screen){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  document.getElementById('screen-'+screen).classList.add('active');
  document.querySelectorAll('.nav-link,.drawer-link').forEach(l=>{
    l.classList.toggle('active',l.dataset.screen===screen);
  });
  if(screen==='presupuesto') renderPresupuesto();
  if(screen==='admin') renderAdmin();
  if(screen==='detalle') renderDetalle();
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
  const bal=d.ingresos-totalE,libre=d.presupuesto-totalE;
  document.getElementById('d-ing').textContent=fmt(d.ingresos);
  document.getElementById('d-egr').textContent=fmt(totalE);
  const balEl=document.getElementById('d-bal');
  balEl.textContent=fmt(bal);balEl.className='resumen-valor '+(bal>=0?'bal-pos':'bal-neg');
  document.getElementById('d-ppto').textContent=fmt(d.presupuesto);
  const libreEl=document.getElementById('d-libre');
  libreEl.textContent=libre>=0?`$${Math.round(libre).toLocaleString('es-CL')} libre`:`$${Math.round(Math.abs(libre)).toLocaleString('es-CL')} sobre`;
  libreEl.style.color=libre>=0?'#2e7d32':'#b71c1c';
  document.getElementById('cat-list').innerHTML=d.categorias.map((c,i)=>{
    const rawPct=Math.round((c.monto/c.ppto)*100),status=getStatus(rawPct);
    return `<div class="cat-card" onclick="abrirCat(${i},'${key}')">
      <div class="cat-card-row">
        <div class="cat-icon" style="background:${catBgs[c.nombre]||'#f5f5f5'};color:${catColores[c.nombre]||'#666'}">${c.nombre.charAt(0)}</div>
        <div class="cat-info"><div class="cat-nombre">${c.nombre}</div><div class="cat-ppto-txt">Ppto: ${fmt(c.ppto)}</div></div>
        <div class="cat-monto ${status}">${fmt(c.monto)}</div>
      </div>
      <div class="bar-wrap"><div class="bar-fill ${status}" style="width:${Math.min(rawPct,100)}%;"></div></div>
      <div class="ppto-row"><span class="ppto-pct ${status}">${rawPct}% usado</span><span class="ppto-label">${rawPct>=100?'⚠ sobre presupuesto':rawPct>=80?'⚡ cerca del límite':''}</span></div>
    </div>`;
  }).join('');
}

function abrirCat(i,key){
  const c=dashData[key].categorias[i];
  document.getElementById('cat-sheet-title').textContent=c.nombre;
  document.getElementById('cat-sheet-items').innerHTML=c.gastos.map(g=>`
    <div class="gasto-item" style="cursor:default;">
      <div class="gasto-cat-dot" style="background:${catColores[c.nombre]||'#999'};"></div>
      <div class="gasto-info"><div class="gasto-desc">${g.desc}</div><div class="gasto-meta">${g.sub?g.sub.includes(' - ')?g.sub.split(' - ').slice(1).join(' - '):g.sub:''}${g.sub&&g.fecha?' · ':''}${g.fecha}</div></div>
      <div class="gasto-monto e">- ${fmt(g.monto)}</div>
    </div>`).join('');
  document.getElementById('ov-cat').classList.add('open');
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
  const q=document.getElementById('buscador').value.toLowerCase().trim();
  const fil=q?todos.filter(g=>g.desc.toLowerCase().includes(q)||g.cat.toLowerCase().includes(q)):todos;
  document.getElementById('s-e').textContent=fmt(fil.filter(g=>g.ie==='E').reduce((s,g)=>s+g.monto,0));
  document.getElementById('s-i').textContent=fmt(fil.filter(g=>g.ie==='I').reduce((s,g)=>s+g.monto,0));
  document.getElementById('s-n').textContent=fil.length;
  if(!fil.length){document.getElementById('lista').innerHTML=`<div class="empty">${q?'Sin resultados':'Sin gastos registrados'}</div>`;return;}
  const grupos={};
  [...fil].sort((a,b)=>b.fecha.localeCompare(a.fecha)).forEach(g=>{const l=getDiaLabel(g.fecha);if(!grupos[l])grupos[l]=[];grupos[l].push(g);});
  document.getElementById('lista').innerHTML=Object.entries(grupos).map(([dia,items])=>{
    const tot=items.reduce((s,g)=>g.ie==='E'?s-g.monto:s+g.monto,0);
    return `<div class="dia-grupo">
      <div class="dia-label">${dia}<span class="dia-total">${(tot>=0?'+':'')+fmt(tot)}</span></div>
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
function abrirGasto(id){
  const g=getTodosRango().find(x=>x.id===id);if(!g)return;
  gastoActual=g;
  document.getElementById('g-desc').textContent=g.desc;
  document.getElementById('g-monto').textContent=(g.ie==='E'?'- ':'+ ')+fmt(g.monto);
  document.getElementById('ov-gasto').classList.add('open');
}
document.getElementById('buscador').addEventListener('input',renderDetalle);
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
  const totalPpto=subcatsE.reduce((s,sc)=>{const p=pptoData[sc.sub];return s+(p?p.monto:0);},0);
  const key=`${String(pptoPanelMes+1).padStart(2,'0')}-${pptoPanelAnio}`;
  const totalReal=dashData[key]?dashData[key].categorias.reduce((s,c)=>s+c.monto,0):0;
  const pct=totalPpto>0?Math.min(Math.round((totalReal/totalPpto)*100),100):0;
  document.getElementById('ppto-total').textContent=fmt(totalPpto);
  document.getElementById('ppto-real-txt').textContent=`Real: ${fmt(totalReal)}`;
  const libre=totalPpto-totalReal;
  const libreEl=document.getElementById('ppto-libre-txt');
  libreEl.textContent=libre>=0?`Libre: $${Math.round(libre).toLocaleString('es-CL')}`:`Sobre: $${Math.round(Math.abs(libre)).toLocaleString('es-CL')}`;
  libreEl.style.color=libre>=0?'#2e7d32':'#b71c1c';
  document.getElementById('ppto-global-fill').style.width=pct+'%';
  const grupos={};
  subcatsE.forEach(sc=>{if(!grupos[sc.cat])grupos[sc.cat]=[];grupos[sc.cat].push(sc);});
  const html=Object.entries(grupos).map(([cat,subs])=>{
    const filteredSubs=q?subs.filter(sc=>sc.sub.toLowerCase().includes(q)||cat.toLowerCase().includes(q)):subs;
    if(!filteredSubs.length)return '';
    const totalCat=filteredSubs.reduce((s,sc)=>{const p=pptoData[sc.sub];return s+(p?p.monto:0);},0);
    return `<div class="ppto-cat-group">
      <div class="ppto-cat-header" onclick="togglePptoCat(this)">
        <div class="ppto-cat-icon" style="background:${catBgs[cat]||'#f5f5f5'};color:${catColores[cat]||'#666'}">${cat.charAt(0)}</div>
        <span class="ppto-cat-nombre">${cat}</span>
        <span class="ppto-cat-total">${fmt(totalCat)}</span>
        <span class="ppto-cat-chevron open">▼</span>
      </div>
      <div class="ppto-subcat-list open">
        ${filteredSubs.map(sc=>{const p=pptoData[sc.sub]||{monto:0,fijo:false};return `
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
document.getElementById('alcance-cancelar').addEventListener('click',()=>{renderPresupuesto();cerrar('ov-alcance');alcancePendiente=null;});
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

// ── INIT ─────────────────────────────────────────────────
cargarDatos();
  