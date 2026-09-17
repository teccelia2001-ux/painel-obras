/* ============================================================
   Painel Obras — réplica do dashboard Teccel
   Para ligar no Supabase real, preencha as duas constantes.
   Vazias => usa dados de demonstração.
   ============================================================ */
const SUPABASE_URL = "";
const SUPABASE_ANON_KEY = "";

/* ---------- Campos de fotos (idênticos ao painel original) ---------- */
const PHOTO_FIELDS = ["fotos_antes","fotos_durante","fotos_depois","fotos_abertura","fotos_fechamento",
"fotos_ditais_abertura","fotos_ditais_impedir","fotos_ditais_testar","fotos_ditais_aterrar","fotos_ditais_sinalizar",
"fotos_aterramento_vala_aberta","fotos_aterramento_hastes","fotos_aterramento_vala_fechada","fotos_aterramento_medicao",
"fotos_transformador_laudo","fotos_transformador_componente_instalado","fotos_transformador_tombamento_instalado",
"fotos_transformador_tape","fotos_transformador_placa_instalado","fotos_transformador_instalado",
"fotos_transformador_antes_retirar","fotos_transformador_tombamento_retirado","fotos_transformador_placa_retirado"];

function contarFotos(o){
  let t = 0;
  PHOTO_FIELDS.forEach(f => { if (o[f] && o[f].length) t += o[f].length; });
  if (Array.isArray(o.postes_data)) o.postes_data.forEach(p => {
    t += (p.fotos_antes?.length||0) + (p.fotos_durante?.length||0)
       + (p.fotos_depois?.length||0) + (p.fotos_medicao?.length||0);
  });
  return t;
}

/* ---------- Estado ---------- */
let obras = [];
const state = { equipe:"todas", periodo:"mes", servico:"todos", busca:"" };

/* ---------- Datas ---------- */
const startOfToday = () => { const d=new Date(); return new Date(d.getFullYear(),d.getMonth(),d.getDate()); };
const subDays = (d,n) => { const r=new Date(d); r.setDate(r.getDate()-n); return r; };
const startOfMonth = () => { const d=new Date(); return new Date(d.getFullYear(),d.getMonth(),1,0,0,0,0); };
const endOfMonth = () => { const d=new Date(); return new Date(d.getFullYear(),d.getMonth()+1,0,23,59,59,999); };
const MESES = ["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];
const hojeExtenso = () => { const d=new Date(); return `${String(d.getDate()).padStart(2,"0")} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`; };

/* ---------- Carregar dados ---------- */
async function loadObras(refresh){
  if (refresh){
    document.getElementById("loading").classList.remove("hidden");
    document.getElementById("page").classList.add("hidden");
  }
  try{
    if (SUPABASE_URL && SUPABASE_ANON_KEY){
      const r = await fetch(`${SUPABASE_URL}/rest/v1/obras?select=*&order=created_at.desc&limit=10000`,
        { headers:{ apikey:SUPABASE_ANON_KEY, Authorization:"Bearer "+SUPABASE_ANON_KEY } });
      if (!r.ok) throw new Error("HTTP "+r.status);
      obras = await r.json();
    } else {
      obras = gerarDemo();
    }
  } catch(e){
    console.error("Erro ao carregar obras:", e);
    obras = gerarDemo();
  }
  document.getElementById("loading").classList.add("hidden");
  document.getElementById("page").classList.remove("hidden");
  render();
}

/* ---------- Dados de demonstração ---------- */
function gerarDemo(){
  const equipes = ["Equipe Alfa","Equipe Bravo","Equipe Charlie","Equipe Delta","Equipe Echo","Equipe Foxtrot","Equipe Golf"];
  const servicos = ["Troca de Poste","Instalação de Transformador","Manutenção de Rede","Aterramento","Poda de Árvore","Religação","Inspeção Preventiva"];
  const out = [];
  for (let i=0;i<420;i++){
    const dias = Math.floor(Math.pow(Math.random(),1.6)*75);
    const d = subDays(new Date(), dias);
    d.setHours(7+Math.floor(Math.random()*10), Math.floor(Math.random()*60));
    const o = {
      id: i+1,
      obra: "OB-"+String(10000+Math.floor(Math.random()*89999)),
      placa: ["ABC","DEF","GHI","JKL"][i%4]+"-"+String(1000+Math.floor(Math.random()*8999)),
      equipe: equipes[Math.floor(Math.random()*equipes.length)],
      tipo_servico: servicos[Math.floor(Math.random()*servicos.length)],
      created_at: d.toISOString(),
      tem_atipicidade: Math.random() < 0.17,
      data_fechamento: Math.random() < 0.72 ? d.toISOString() : null,
      postes_data: []
    };
    ["fotos_antes","fotos_durante","fotos_depois","fotos_abertura","fotos_fechamento"].forEach(f=>{
      o[f] = Array.from({length:Math.floor(Math.random()*5)}, (_,k)=>"f"+k+".jpg");
    });
    const np = Math.floor(Math.random()*3);
    for (let p=0;p<np;p++) o.postes_data.push({
      fotos_antes:["a.jpg"], fotos_durante:["b.jpg"],
      fotos_depois: Math.random()<.6?["c.jpg"]:[],
      fotos_medicao: Math.random()<.4?["d.jpg"]:[]
    });
    out.push(o);
  }
  return out.sort((a,b)=> new Date(b.created_at) - new Date(a.created_at));
}

/* ---------- Derivações ---------- */
function filtrar(){
  let r = obras;
  if (state.busca.trim()){
    const q = state.busca.toLowerCase().trim();
    r = r.filter(o => o.obra?.toLowerCase().includes(q) || o.placa?.toLowerCase().includes(q));
  }
  if (state.equipe !== "todas") r = r.filter(o => o.equipe === state.equipe);
  if (state.servico !== "todos") r = r.filter(o => o.tipo_servico === state.servico);
  if (state.periodo !== "todos"){
    const hoje = startOfToday(), sem = subDays(new Date(),7), ini = startOfMonth(), fim = endOfMonth();
    r = r.filter(o => {
      const d = new Date(o.created_at);
      if (state.periodo === "hoje") return new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime() === hoje.getTime();
      if (state.periodo === "semana") return d >= sem;
      if (state.periodo === "mes") return d >= ini && d <= fim;
      return true;
    });
  }
  return r;
}

function estatisticas(f){
  const total = f.length;
  const fotos = f.reduce((a,o)=>a+contarFotos(o),0);
  const atip = f.filter(o=>o.tem_atipicidade).length;
  const concl = f.filter(o=>o.data_fechamento).length;
  return {
    totalObras: total,
    totalFotos: fotos,
    mediaFotosPorObra: total>0 ? Math.round(fotos/total) : 0,
    comAtipicidades: atip,
    percentualAtipicidades: total>0 ? Math.round(atip/total*100) : 0,
    equipesUnicas: new Set(f.map(o=>o.equipe)).size,
    tiposServicoUnicos: new Set(f.map(o=>o.tipo_servico)).size,
    concluidas: concl,
    percentualConcluidas: total>0 ? Math.round(concl/total*100) : 0
  };
}

function statsPorEquipe(){
  const m = new Map(), hoje = startOfToday(), sem = subDays(new Date(),7), mes = startOfMonth();
  obras.forEach(o => {
    const d = new Date(o.created_at);
    if (!m.has(o.equipe)) m.set(o.equipe, {equipe:o.equipe,totalObras:0,obrasHoje:0,obrasSemana:0,obrasMes:0,totalFotos:0,comAtipicidades:0,tiposServico:[]});
    const s = m.get(o.equipe);
    s.totalObras++;
    if (d >= hoje) s.obrasHoje++;
    if (d >= sem) s.obrasSemana++;
    if (d >= mes) s.obrasMes++;
    s.totalFotos += contarFotos(o);
    if (o.tem_atipicidade) s.comAtipicidades++;
    if (!s.tiposServico.includes(o.tipo_servico)) s.tiposServico.push(o.tipo_servico);
  });
  return [...m.values()].sort((a,b)=>b.totalObras-a.totalObras);
}

const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;"}[c]));

/* ---------- Render ---------- */
function render(){
  const f = filtrar(), st = estatisticas(f), eq = statsPorEquipe();
  const topEquipes = [...f.reduce((m,o)=>m.set(o.equipe,(m.get(o.equipe)||0)+1), new Map())].sort((a,b)=>b[1]-a[1]).slice(0,5);
  const porServico = [...f.reduce((m,o)=>m.set(o.tipo_servico,(m.get(o.tipo_servico)||0)+1), new Map())].sort((a,b)=>b[1]-a[1]);
  const equipesAll = [...new Set(obras.map(o=>o.equipe))].sort();
  const servicosAll = [...new Set(obras.map(o=>o.tipo_servico))].sort();
  const ativos = [state.periodo!=="mes", state.equipe!=="todas", state.servico!=="todos", !!state.busca.trim()].filter(Boolean).length;

  const stat = (grad,shadow,icon,valor,titulo,sub) => `
    <div class="stat-card">
      <div class="w-11 h-11 bg-gradient-to-br ${grad} rounded-xl flex items-center justify-center shadow-sm ${shadow} mb-4">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icon}"/></svg>
      </div>
      <p class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">${valor}</p>
      <p class="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-0.5">${titulo}</p>
      <p class="text-xs text-slate-400 dark:text-slate-500 mt-1">${sub}</p>
    </div>`;

  const barra = (nome,rotulo,pct,cor,prefixo) => `
      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium text-slate-700 dark:text-slate-200 flex items-center gap-2 truncate mr-4">${prefixo||""}${esc(nome)}</span>
          <span class="text-xs font-bold text-slate-600 dark:text-slate-300 shrink-0">${rotulo}</span>
        </div>
        <div class="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2">
          <div class="bg-gradient-to-r ${cor} h-2 rounded-full transition-all duration-700" style="width:${pct}%"></div>
        </div>
      </div>`;

  const vazio = t => `<p class="text-slate-400 dark:text-slate-500 text-sm text-center py-4">${t}</p>`;

  const htmlTop = topEquipes.length === 0 ? vazio("Nenhuma obra no período")
    : topEquipes.map(([n,q],i) => {
        const medal = ["🥇","🥈","🥉"][i];
        const prefixo = medal
          ? `<span class="w-5 text-center">${medal}</span>`
          : `<span class="w-5 text-center text-xs font-bold text-slate-400">${i+1}</span>`;
        return barra(n, q+" obras", q/topEquipes[0][1]*100, "from-blue-500 to-blue-400", prefixo);
      }).join("");

  const htmlServ = porServico.length === 0 ? vazio("Nenhuma obra no período")
    : porServico.slice(0,6).map(([n,q]) => {
        const pct = f.length ? q/f.length*100 : 0;
        return barra(n, `${q} (${pct.toFixed(0)}%)`, pct, "from-violet-500 to-violet-400");
      }).join("");

  document.getElementById("page").innerHTML = `
  <div class="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
    <div>
      <h1 class="page-title">Dashboard</h1>
      <p class="page-subtitle">Visão geral de desempenho e estatísticas por equipe</p>
    </div>
    <div class="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-300 shadow-sm shrink-0">
      <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
      ${hojeExtenso()}
    </div>
  </div>

  <div class="card-padded mb-8">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2.5">
        <div class="w-7 h-7 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
          <svg class="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
        </div>
        <span class="text-sm font-bold text-slate-800 dark:text-slate-100">Filtros</span>
        ${ativos>0 ? `<span class="px-2 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-full">${ativos}</span>` : ""}
      </div>
      ${ativos>0 ? `<button onclick="limparFiltros()" class="text-xs text-red-600 dark:text-red-400 hover:text-red-700 font-semibold flex items-center gap-1">
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>Limpar filtros</button>` : ""}
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <div>
        <label class="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Nº da Obra</label>
        <div class="relative">
          <svg class="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input id="fBusca" type="text" placeholder="Buscar número..." value="${esc(state.busca)}" oninput="setFiltro('busca',this.value)" class="input-field pl-9 pr-8">
          ${state.busca ? `<button onclick="setFiltro('busca','')" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>` : ""}
        </div>
      </div>
      <div>
        <label class="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Período</label>
        <select class="input-field" onchange="setFiltro('periodo',this.value)">
          ${[["todos","Todos os Períodos"],["hoje","Hoje"],["semana","Última Semana"],["mes","Este Mês"]]
            .map(([v,l])=>`<option value="${v}" ${state.periodo===v?"selected":""}>${l}</option>`).join("")}
        </select>
      </div>
      <div>
        <label class="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Equipe</label>
        <select class="input-field" onchange="setFiltro('equipe',this.value)">
          <option value="todas">Todas as Equipes</option>
          ${equipesAll.map(e=>`<option value="${esc(e)}" ${state.equipe===e?"selected":""}>${esc(e)}</option>`).join("")}
        </select>
      </div>
      <div>
        <label class="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Tipo de Serviço</label>
        <select class="input-field" onchange="setFiltro('servico',this.value)">
          <option value="todos">Todos os Serviços</option>
          ${servicosAll.map(s=>`<option value="${esc(s)}" ${state.servico===s?"selected":""}>${esc(s)}</option>`).join("")}
        </select>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
    ${stat("from-blue-500 to-blue-600","shadow-blue-500/30","M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", st.totalObras, "Total de Obras", `${st.equipesUnicas} equipe${st.equipesUnicas!==1?"s":""} ativa${st.equipesUnicas!==1?"s":""}`)}
    ${stat("from-emerald-500 to-emerald-600","shadow-emerald-500/30","M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", st.concluidas, "Concluídas", `${st.percentualConcluidas}% do total`)}
    ${stat("from-violet-500 to-violet-600","shadow-violet-500/30","M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", st.totalFotos, "Total de Fotos", `~${st.mediaFotosPorObra} por obra`)}
    ${stat("from-amber-500 to-orange-500","shadow-amber-500/30","M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", st.comAtipicidades, "Atipicidades", `${st.percentualAtipicidades}% do total`)}
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
    <div class="card-padded">
      <div class="flex items-center gap-3 mb-5">
        <div class="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm shadow-blue-500/30">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
        </div>
        <div><h3 class="text-sm font-bold text-slate-800 dark:text-slate-100">Top 5 Equipes</h3>
        <p class="text-xs text-slate-400 dark:text-slate-500">por número de obras</p></div>
      </div>
      <div class="space-y-4">${htmlTop}</div>
    </div>

    <div class="card-padded">
      <div class="flex items-center gap-3 mb-5">
        <div class="w-9 h-9 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-sm shadow-violet-500/30">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"/></svg>
        </div>
        <div><h3 class="text-sm font-bold text-slate-800 dark:text-slate-100">Por Tipo de Serviço</h3>
        <p class="text-xs text-slate-400 dark:text-slate-500">distribuição percentual</p></div>
      </div>
      <div class="space-y-4">${htmlServ}</div>
    </div>
  </div>

  <div class="table-wrapper">
    <div class="table-header">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center shadow-sm">
          <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
        </div>
        <div><h3 class="text-sm font-bold text-slate-800 dark:text-slate-100">Estatísticas por Equipe</h3>
        <p class="text-xs text-slate-400 dark:text-slate-500 mt-0.5">${eq.length} equipe${eq.length!==1?"s":""} cadastrada${eq.length!==1?"s":""}</p></div>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-50 dark:divide-slate-700">
        <thead class="bg-gray-50/50 dark:bg-slate-700/50"><tr>
          <th class="th">Equipe</th><th class="th-center">Total</th><th class="th-center">Hoje</th>
          <th class="th-center">Semana</th><th class="th-center">Mês</th><th class="th-center">Fotos</th>
          <th class="th-center">Atipic.</th><th class="th-center">Serviços</th>
        </tr></thead>
        <tbody class="divide-y divide-gray-50 dark:divide-slate-700">
          ${eq.map((e,i)=>`<tr class="hover:bg-slate-50/60 dark:hover:bg-slate-700/40 transition-colors">
            <td class="td"><div class="flex items-center gap-3">
              <div class="flex-shrink-0 h-9 w-9 rounded-lg flex items-center justify-center text-white text-xs font-bold" style="background:hsl(${47*i%360},60%,50%)">${esc(e.equipe.substring(0,2).toUpperCase())}</div>
              <span class="font-medium text-slate-800 dark:text-slate-100">${esc(e.equipe)}</span></div></td>
            <td class="td-center font-bold text-slate-900 dark:text-white">${e.totalObras}</td>
            <td class="td-center">${e.obrasHoje>0?`<span class="badge-blue">${e.obrasHoje}</span>`:`<span class="text-gray-300 dark:text-slate-600">—</span>`}</td>
            <td class="td-center text-gray-500 dark:text-slate-300">${e.obrasSemana}</td>
            <td class="td-center text-gray-500 dark:text-slate-300">${e.obrasMes}</td>
            <td class="td-center"><span class="text-emerald-600 dark:text-emerald-300 font-medium">${e.totalFotos}</span></td>
            <td class="td-center">${e.comAtipicidades>0?`<span class="badge-amber">${e.comAtipicidades}</span>`:`<span class="text-gray-300 dark:text-slate-600">—</span>`}</td>
            <td class="td-center text-gray-500 dark:text-slate-300">${e.tiposServico.length}</td>
          </tr>`).join("")}
        </tbody>
      </table>
    </div>
    ${eq.length===0 ? `<div class="text-center py-16">
      <div class="w-14 h-14 bg-gray-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
        <svg class="w-7 h-7 text-gray-300 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
      </div>
      <p class="text-sm font-medium text-gray-400 dark:text-slate-400">Nenhuma obra cadastrada</p></div>` : ""}
  </div>`;

  const b = document.getElementById("fBusca");
  if (b && state.busca){ b.focus(); b.setSelectionRange(b.value.length, b.value.length); }
}

/* ---------- Ações ---------- */
function setFiltro(k,v){ state[k]=v; render(); }
function limparFiltros(){ state.periodo="mes"; state.equipe="todas"; state.servico="todos"; state.busca=""; render(); }
function toggleSidebar(){ document.getElementById("sidebar").classList.toggle("-translate-x-full"); }
function toggleTheme(){
  const dark = document.documentElement.classList.toggle("dark");
  try{ localStorage.setItem("tema", dark?"dark":"light"); }catch(e){}
  pintarBotaoTema();
}
function pintarBotaoTema(){
  const dark = document.documentElement.classList.contains("dark");
  const btn = document.getElementById("themeBtn");
  btn.title = dark ? "Mudar para claro" : "Mudar para escuro";
  btn.innerHTML = dark
    ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>'
    : '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>';
}

/* ---------- Navegação ---------- */
const NAV = [
  {nome:"Dashboard",  desc:"Visão geral",         icon:"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"},
  {nome:"Equipes",    desc:"Gerenciar equipes",   icon:"M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"},
  {nome:"Relatórios", desc:"Gerar relatórios",    icon:"M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"},
  {nome:"Usuários",   desc:"Gerenciar usuários",  icon:"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"}
];

document.getElementById("nav").innerHTML = NAV.map((n,i)=>`
  <div class="nav-item ${i===0?"active":""}" onclick="irPara('${n.nome}',this)">
    <svg style="width:18px;height:18px;flex-shrink:0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${n.icon}"/></svg>
    <div class="min-w-0"><p class="leading-tight">${n.nome}</p><p class="text-[11px] opacity-70 leading-tight">${n.desc}</p></div>
  </div>`).join("");

function irPara(nome, el){
  document.querySelectorAll("#nav .nav-item").forEach(n=>n.classList.remove("active"));
  el.classList.add("active");
  document.getElementById("crumb").textContent = nome;
  if (window.innerWidth < 1024) toggleSidebar();
  if (nome === "Dashboard"){ render(); return; }
  document.getElementById("page").innerHTML = `
    <div class="mb-8"><h1 class="page-title">${nome}</h1><p class="page-subtitle">${NAV.find(n=>n.nome===nome).desc}</p></div>
    <div class="card-padded text-center py-20">
      <p class="text-sm font-medium text-slate-400 dark:text-slate-500">Módulo "${nome}" — pronto para receber melhorias.</p>
    </div>`;
}

/* ---------- Boot ---------- */
try{ if (localStorage.getItem("tema") === "dark") document.documentElement.classList.add("dark"); }catch(e){}
pintarBotaoTema();
loadObras();
