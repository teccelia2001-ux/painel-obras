/* ============================================================
   Módulo Relatórios
   Tabela de obras com filtros, seleção múltipla, edição,
   criação de books, visualizador de fotos e exportação PDF.
   ============================================================ */

/* ---------- Categorias de fotos e documentos ---------- */
const CATEGORIAS = [
  {key:"fotos_antes", label:"Fotos Antes", cor:"#3b82f6"},
  {key:"fotos_durante", label:"Fotos Durante", cor:"#f97316"},
  {key:"fotos_depois", label:"Fotos Depois", cor:"#22c55e"},
  {key:"fotos_abertura", label:"Fotos Abertura de Chave", cor:"#06b6d4"},
  {key:"fotos_fechamento", label:"Fotos Fechamento de Chave", cor:"#14b8a6"},

  {key:"fotos_ditais_abertura", label:"DITAIS - Desligar/Abertura", cor:"#6366f1"},
  {key:"fotos_ditais_impedir", label:"DITAIS - Impedir Religamento", cor:"#6366f1"},
  {key:"fotos_ditais_testar", label:"DITAIS - Testar Ausência de Tensão", cor:"#6366f1"},
  {key:"fotos_ditais_aterrar", label:"DITAIS - Aterrar", cor:"#6366f1"},
  {key:"fotos_ditais_sinalizar", label:"DITAIS - Sinalizar/Isolar", cor:"#6366f1"},

  {key:"fotos_aterramento_vala_aberta", label:"Aterramento - Vala Aberta", cor:"#10b981"},
  {key:"fotos_aterramento_hastes", label:"Aterramento - Hastes Aplicadas", cor:"#10b981"},
  {key:"fotos_aterramento_vala_fechada", label:"Aterramento - Vala Fechada", cor:"#10b981"},
  {key:"fotos_aterramento_medicao", label:"Aterramento - Medição Terrômetro", cor:"#10b981"},

  {key:"fotos_checklist_croqui", label:"Checklist - Croqui", cor:"#a855f7"},
  {key:"fotos_checklist_panoramica_inicial", label:"Checklist - Panorâmica Inicial", cor:"#a855f7"},
  {key:"fotos_checklist_chede", label:"Checklist - Chave com Componente", cor:"#a855f7"},
  {key:"fotos_checklist_postes", label:"Checklist - Postes", cor:"#a855f7"},
  {key:"fotos_checklist_seccionamentos", label:"Checklist - Seccionamentos", cor:"#a855f7"},
  {key:"fotos_checklist_aterramento_cerca", label:"Checklist - Aterramento de Cerca", cor:"#a855f7"},
  {key:"fotos_checklist_padrao_geral", label:"Checklist - Padrão Geral", cor:"#a855f7"},
  {key:"fotos_checklist_padrao_interno", label:"Checklist - Padrão Interno", cor:"#a855f7"},
  {key:"fotos_checklist_frying", label:"Checklist - Flying", cor:"#a855f7"},
  {key:"fotos_checklist_abertura_fechamento_pulo", label:"Checklist - Abertura/Fechamento de Pulo", cor:"#a855f7"},
  {key:"fotos_checklist_hastes_aplicadas", label:"Checklist - Hastes Aplicadas e Medição do Termômetro", cor:"#a855f7"},
  {key:"fotos_checklist_panoramica_final", label:"Checklist - Panorâmica Final", cor:"#a855f7"},

  {key:"fotos_altimetria_lado_fonte", label:"Altimetria - Lado Fonte", cor:"#0ea5e9"},
  {key:"fotos_altimetria_medicao_fonte", label:"Altimetria - Medição Fonte", cor:"#0ea5e9"},
  {key:"fotos_altimetria_lado_carga", label:"Altimetria - Lado Carga", cor:"#0ea5e9"},
  {key:"fotos_altimetria_medicao_carga", label:"Altimetria - Medição Carga", cor:"#0ea5e9"},

  {key:"fotos_vazamento_evidencia", label:"Vazamento - Evidência", cor:"#f43f5e"},
  {key:"fotos_vazamento_equipamentos_limpeza", label:"Vazamento - Equipamentos de Limpeza", cor:"#f43f5e"},
  {key:"fotos_vazamento_tombamento_retirado", label:"Vazamento - Tombamento Retirado", cor:"#f43f5e"},
  {key:"fotos_vazamento_placa_retirado", label:"Vazamento - Placa Retirado", cor:"#f43f5e"},
  {key:"fotos_vazamento_tombamento_instalado", label:"Vazamento - Tombamento Instalado", cor:"#f43f5e"},
  {key:"fotos_vazamento_placa_instalado", label:"Vazamento - Placa Instalado", cor:"#f43f5e"},
  {key:"fotos_vazamento_instalacao", label:"Vazamento - Instalação", cor:"#f43f5e"},

  {key:"fotos_medidor_padrao", label:"Medidor - Padrão", cor:"#eab308"},
  {key:"fotos_medidor_leitura", label:"Medidor - Leitura", cor:"#eab308"},
  {key:"fotos_medidor_selo_born", label:"Medidor - Selo Born", cor:"#eab308"},
  {key:"fotos_medidor_selo_caixa", label:"Medidor - Selo Caixa", cor:"#eab308"},
  {key:"fotos_medidor_identificador_fase", label:"Medidor - Identificador de Fase", cor:"#eab308"},

  {key:"fotos_transformador_laudo", label:"Transformador - Laudo", cor:"#8b5cf6"},
  {key:"fotos_transformador_componente_instalado", label:"Transformador - Componente Instalado", cor:"#8b5cf6"},
  {key:"fotos_transformador_tombamento_instalado", label:"Transformador - Tombamento Instalado", cor:"#8b5cf6"},
  {key:"fotos_transformador_tape", label:"Transformador - Tape", cor:"#8b5cf6"},
  {key:"fotos_transformador_placa_instalado", label:"Transformador - Placa Instalada", cor:"#8b5cf6"},
  {key:"fotos_transformador_instalado", label:"Transformador - Instalado", cor:"#8b5cf6"},
  {key:"fotos_transformador_antes_retirar", label:"Transformador - Antes de Retirar", cor:"#8b5cf6"},
  {key:"fotos_transformador_tombamento_retirado", label:"Transformador - Tombamento Retirado", cor:"#8b5cf6"},
  {key:"fotos_transformador_placa_retirado", label:"Transformador - Placa Retirada", cor:"#8b5cf6"},
  {key:"fotos_transformador_laudo_retirado", label:"Transformador - Laudo Retirado", cor:"#8b5cf6"},
  {key:"fotos_transformador_conexoes_primarias_instalado", label:"Transformador - Conexões Primárias (Instalado)", cor:"#8b5cf6"},
  {key:"fotos_transformador_conexoes_secundarias_instalado", label:"Transformador - Conexões Secundárias (Instalado)", cor:"#8b5cf6"},
  {key:"fotos_transformador_conexoes_primarias_retirado", label:"Transformador - Conexões Primárias (Retirado)", cor:"#8b5cf6"},
  {key:"fotos_transformador_conexoes_secundarias_retirado", label:"Transformador - Conexões Secundárias (Retirado)", cor:"#8b5cf6"},

  {key:"fotos_apr", label:"Fotos APR", cor:"#64748b"},
  {key:"fotos_impedimento", label:"Fotos do Impedimento", cor:"#64748b"},

  {key:"doc_cadastro_medidor", label:"Cadastro de Medidor", cor:"#475569", doc:true},
  {key:"doc_laudo_transformador", label:"Laudo de Transformador", cor:"#475569", doc:true},
  {key:"doc_laudo_regulador", label:"Laudo de Regulador", cor:"#475569", doc:true},
  {key:"doc_laudo_religador", label:"Laudo de Religador", cor:"#475569", doc:true},
  {key:"doc_fvbt", label:"FVBT", cor:"#475569", doc:true},
  {key:"doc_termo_desistencia_lpt", label:"Termo de Desistência LPT", cor:"#475569", doc:true},
  {key:"doc_autorizacao_passagem", label:"Autorização de Passagem", cor:"#475569", doc:true},
  {key:"doc_materiais_previsto", label:"Materiais Previsto", cor:"#475569", doc:true},
  {key:"doc_materiais_realizado", label:"Materiais Realizado", cor:"#475569", doc:true}
];

const TIPOS_SERVICO = ["Abertura e Fechamento de Chave","Altimetria","Bandolamento","Book de Aterramento",
"Cava em Rocha","Checklist de Fiscalização","Ditais","Documentação","Emenda","Fundação Especial",
"Instalação do Medidor","Linha Viva","Poda","Transformador","Vazamento e Limpeza de Transformador",
"Registro de Impedimento"];

/* ---------- Estado do módulo ---------- */
const rel = { busca:"", periodo:"todos", equipe:"todas", servico:"todos", sel:new Set(), menu:null };

/* ---------- Helpers ---------- */
const fmtData = iso => {
  if (!iso) return "—";
  const d = new Date(iso);
  return isNaN(d) ? "—" : `${String(d.getDate()).padStart(2,"0")}/${String(d.getMonth()+1).padStart(2,"0")}/${d.getFullYear()}`;
};

function filtrarRel(){
  let r = obras;
  if (rel.busca.trim()){
    const q = rel.busca.toLowerCase().trim();
    r = r.filter(o => o.obra?.toLowerCase().includes(q) || o.placa?.toLowerCase().includes(q));
  }
  if (rel.equipe !== "todas") r = r.filter(o => o.equipe === rel.equipe);
  if (rel.servico !== "todos") r = r.filter(o => o.tipo_servico === rel.servico);
  if (rel.periodo !== "todos"){
    const hoje = startOfToday(), sem = subDays(new Date(),7), ini = startOfMonth(), fim = endOfMonth();
    r = r.filter(o => {
      const d = new Date(o.created_at);
      if (rel.periodo === "hoje") return new Date(d.getFullYear(),d.getMonth(),d.getDate()).getTime() === hoje.getTime();
      if (rel.periodo === "semana") return d >= sem;
      if (rel.periodo === "mes") return d >= ini && d <= fim;
      return true;
    });
  }
  return r;
}

/* ---------- Render ---------- */
function renderRelatorios(){
  const f = filtrarRel();
  const visiveis = new Set(f.map(o=>o.id));
  [...rel.sel].forEach(id => { if(!visiveis.has(id)) rel.sel.delete(id); });

  const totalFotos = f.reduce((a,o)=>a+contarFotos(o),0);
  const atip = f.filter(o=>o.tem_atipicidade).length;
  const equipesAll = [...new Set(obras.map(o=>o.equipe))].sort();
  const servicosAll = [...new Set(obras.map(o=>o.tipo_servico))].sort();
  const todasSel = f.length>0 && rel.sel.size===f.length;

  const card = (grad,icon,valor,titulo) => `
    <div class="stat-card">
      <div class="w-11 h-11 bg-gradient-to-br ${grad} rounded-xl flex items-center justify-center shadow-sm mb-4">
        <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icon}"/></svg>
      </div>
      <p class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">${valor}</p>
      <p class="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-0.5">${titulo}</p>
    </div>`;

  document.getElementById("page").innerHTML = `
  <div class="mb-8">
    <h1 class="page-title">Relatórios</h1>
    <p class="page-subtitle">Visualize e exporte relatórios detalhados das obras</p>
  </div>

  <div class="card-padded mb-6">
    <div class="flex items-center gap-2.5 mb-4">
      <div class="w-7 h-7 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
        <svg class="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
      </div>
      <span class="text-sm font-bold text-slate-800 dark:text-slate-100">Filtros</span>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <div>
        <label class="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Buscar Nº Obra</label>
        <input id="relBusca" type="text" class="input-field" placeholder="Digite o número..." value="${esc(rel.busca)}" oninput="setRel('busca',this.value)">
      </div>
      <div>
        <label class="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Período</label>
        <select class="input-field" onchange="setRel('periodo',this.value)">
          ${[["todos","Todos os Períodos"],["hoje","Hoje"],["semana","Última Semana"],["mes","Este Mês"]]
            .map(([v,l])=>`<option value="${v}" ${rel.periodo===v?"selected":""}>${l}</option>`).join("")}
        </select>
      </div>
      <div>
        <label class="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Equipe</label>
        <select class="input-field" onchange="setRel('equipe',this.value)">
          <option value="todas">Todas as Equipes</option>
          ${equipesAll.map(e=>`<option value="${esc(e)}" ${rel.equipe===e?"selected":""}>${esc(e)}</option>`).join("")}
        </select>
      </div>
      <div>
        <label class="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Tipo de Serviço</label>
        <select class="input-field" onchange="setRel('servico',this.value)">
          <option value="todos">Todos os Serviços</option>
          ${servicosAll.map(s=>`<option value="${esc(s)}" ${rel.servico===s?"selected":""}>${esc(s)}</option>`).join("")}
        </select>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
    ${card("from-blue-500 to-blue-600","M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", f.length, "Obras Filtradas")}
    ${card("from-amber-500 to-orange-500","M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z", atip, "Com Atipicidades")}
    ${card("from-violet-500 to-violet-600","M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", totalFotos, "Total de Fotos")}
    ${card("from-emerald-500 to-emerald-600","M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", rel.sel.size, "Selecionadas")}
  </div>

  <div class="flex flex-wrap gap-3 mb-6">
    <button onclick="abrirNovoBook()" class="px-5 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl shadow-lg transition-all flex items-center gap-2.5 font-bold">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
      Novo Book
    </button>
    <button onclick="excluirSelecionadas()" ${rel.sel.size===0?"disabled":""} class="px-5 py-3 bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800 text-white rounded-2xl shadow-lg transition-all flex items-center gap-2.5 font-bold disabled:opacity-50 disabled:cursor-not-allowed">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
      Excluir Selecionadas (${rel.sel.size})
    </button>
    <button onclick="exportarTudoPDF()" ${rel.sel.size===0?"disabled":""} class="px-5 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl shadow-lg transition-all flex items-center gap-2.5 font-bold disabled:opacity-50 disabled:cursor-not-allowed">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
      Exportar Tudo (PDF)
    </button>
    <button onclick="exportarCSV()" class="px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 rounded-2xl shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all flex items-center gap-2.5 font-bold">
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
      Planilha (CSV)
    </button>
  </div>

  <div class="table-wrapper">
    <div class="overflow-x-auto">
      <table class="min-w-full">
        <thead class="bg-slate-50 dark:bg-slate-700/50 border-b-2 border-slate-200 dark:border-slate-700"><tr>
          <th class="px-6 py-4 text-center w-12">
            <input type="checkbox" ${todasSel?"checked":""} onchange="alternarTodas()" class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500">
          </th>
          ${["Nº OBRA","EQUIPE","TIPO DE SERVIÇO","STATUS","FOTOS","DATA"].map(h=>
            `<th class="px-6 py-4 text-left text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">${h}</th>`).join("")}
          <th class="px-6 py-4 text-center text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">AÇÕES</th>
        </tr></thead>
        <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
          ${f.map(o=>{
            const nf = contarFotos(o);
            const concl = !!o.data_fechamento;
            return `<tr class="hover:bg-slate-50/60 dark:hover:bg-slate-700/40 transition-colors ${rel.sel.has(o.id)?"bg-blue-50/50 dark:bg-blue-900/10":""}">
              <td class="px-6 py-4 text-center">
                <input type="checkbox" ${rel.sel.has(o.id)?"checked":""} onchange="alternarObra(${o.id})" class="w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500">
              </td>
              <td class="px-6 py-4">
                <span class="font-bold text-slate-900 dark:text-white">${esc(o.obra)}</span>
                ${o.tem_atipicidade?`<span class="ml-2 badge-amber">atipicidade</span>`:""}
                ${o.placa?`<p class="text-xs text-slate-400 mt-0.5">${esc(o.placa)}</p>`:""}
              </td>
              <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">${esc(o.equipe)}</td>
              <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">${esc(o.tipo_servico)}</td>
              <td class="px-6 py-4">
                <span class="${concl?"badge-emerald":"badge-slate"}">${concl?"Concluída":"Parcial"}</span>
              </td>
              <td class="px-6 py-4 text-sm font-semibold ${nf>0?"text-emerald-600 dark:text-emerald-300":"text-slate-300 dark:text-slate-600"}">${nf}</td>
              <td class="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">${fmtData(o.created_at)}</td>
              <td class="px-6 py-4 text-center relative">
                <button onclick="alternarMenu(${o.id},event)" title="Opções" class="w-9 h-9 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 inline-flex items-center justify-center">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01"/></svg>
                </button>
                ${rel.menu===o.id?menuAcoes(o):""}
              </td>
            </tr>`;
          }).join("")}
        </tbody>
      </table>
    </div>
    ${f.length===0?`<div class="text-center py-16">
      <div class="w-14 h-14 bg-gray-100 dark:bg-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
        <svg class="w-7 h-7 text-gray-300 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
      </div>
      <p class="text-sm font-semibold text-gray-500 dark:text-slate-300">Nenhuma obra encontrada</p>
      <p class="text-xs text-gray-400 dark:text-slate-500 mt-1">Ajuste os filtros para ver mais resultados</p>
    </div>`:""}
  </div>
  <div id="modal"></div>`;

  const b = document.getElementById("relBusca");
  if (b && rel.busca){ b.focus(); b.setSelectionRange(b.value.length, b.value.length); }
}

function menuAcoes(o){
  const item = (cor,icon,label,fn) => `
    <button onclick="${fn}" class="w-full px-3 py-2 text-left text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-${cor}-50 dark:hover:bg-${cor}-900/30 rounded-xl flex items-center gap-3 transition-colors">
      <span class="w-7 h-7 bg-${cor}-100 dark:bg-${cor}-900/40 rounded-lg flex items-center justify-center shrink-0">
        <svg class="w-3.5 h-3.5 text-${cor}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${icon}"/></svg>
      </span>${label}
    </button>`;
  return `<div class="absolute right-6 top-14 z-50 w-60 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl text-left">
    <p class="px-3 pt-3 pb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Ações da obra</p>
    <div class="px-2 pb-2 space-y-0.5">
      ${item("blue","M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z","Abrir Obra",`abrirObra(${o.id})`)}
      ${item("emerald","M12 4v16m8-8H4","Novo Book (mesmo nº)",`abrirNovoBook(${o.id})`)}
      ${item("amber","M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z","Editar Dados",`abrirEdicao(${o.id})`)}
      ${item("purple","M7 7h.01M7 3h5a1.99 1.99 0 011.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.99 1.99 0 013 12V7a4 4 0 014-4z","Criar Placa",`criarPlaca(${o.id})`)}
      ${item("indigo","M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z","Exportar PDF",`exportarPDF(${o.id})`)}
    </div>
    <div class="px-2 py-2 border-t border-slate-100 dark:border-slate-700">
      ${item("red","M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16","Excluir Obra",`excluirObra(${o.id})`)}
    </div>
  </div>`;
}

/* ---------- Interações ---------- */
function setRel(k,v){ rel[k]=v; rel.menu=null; renderRelatorios(); }
function alternarObra(id){ rel.sel.has(id)?rel.sel.delete(id):rel.sel.add(id); renderRelatorios(); }
function alternarTodas(){
  const f = filtrarRel();
  if (rel.sel.size === f.length) rel.sel.clear();
  else f.forEach(o=>rel.sel.add(o.id));
  renderRelatorios();
}
function alternarMenu(id,ev){ ev.stopPropagation(); rel.menu = rel.menu===id?null:id; renderRelatorios(); }
document.addEventListener("click", ()=>{ if(rel.menu!==null && paginaAtual==="Relatórios"){ rel.menu=null; renderRelatorios(); } });

function fecharModal(){ const m=document.getElementById("modal"); if(m) m.innerHTML=""; }

function modal(titulo, corpo, rodape){
  document.getElementById("modal").innerHTML = `
  <div class="fixed inset-0 z-[60] bg-slate-900/50 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto" onclick="if(event.target===this)fecharModal()">
    <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl my-8">
      <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-700">
        <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">${titulo}</h3>
        <button onclick="fecharModal()" title="Fechar" class="w-8 h-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 flex items-center justify-center">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="px-6 py-5">${corpo}</div>
      ${rodape?`<div class="px-6 py-4 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3">${rodape}</div>`:""}
    </div>
  </div>`;
}

const campo = (label,id,valor,tipo) => `
  <div>
    <label class="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">${label}</label>
    <input id="${id}" type="${tipo||"text"}" class="input-field" value="${esc(valor||"")}">
  </div>`;

const btnCancelar = `<button onclick="fecharModal()" class="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-600 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Cancelar</button>`;
const btnPrimario = (label,fn) => `<button onclick="${fn}" class="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold shadow-lg hover:from-blue-700 hover:to-blue-800">${label}</button>`;

/* ---------- Abrir obra (book) ---------- */
function abrirObra(id){
  rel.menu=null;
  const o = obras.find(x=>x.id===id);
  if (!o) return alert("Obra não encontrada.");
  const cats = CATEGORIAS.map(c=>({...c, fotos:o[c.key]||[]})).filter(c=>c.fotos.length>0);
  const postes = Array.isArray(o.postes_data)?o.postes_data:[];
  modal(`Book da Obra — ${esc(o.obra)}`, `
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
      ${[["Nº da Obra",o.obra],["Placa",o.placa],["Equipe",o.equipe],["Data",fmtData(o.created_at)]].map(([l,v])=>`
        <div class="bg-slate-50 dark:bg-slate-700/40 rounded-xl px-3 py-2">
          <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">${l}</p>
          <p class="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">${esc(v||"—")}</p>
        </div>`).join("")}
    </div>
    <div class="flex items-center gap-2 mb-4">
      <span class="badge-blue">${esc(o.tipo_servico)}</span>
      <span class="${o.data_fechamento?"badge-emerald":"badge-slate"}">${o.data_fechamento?"Concluída":"Parcial"}</span>
      ${o.tem_atipicidade?`<span class="badge-amber">atipicidade</span>`:""}
    </div>
    ${cats.length===0 && postes.length===0
      ? `<p class="text-center text-sm text-slate-400 py-10">Sem fotos disponíveis</p>`
      : `<div class="space-y-3 max-h-[45vh] overflow-y-auto pr-1">
          ${cats.map(c=>`
            <div class="border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full" style="background:${c.cor}"></span>${esc(c.label)}
                </span>
                <span class="text-xs font-bold text-slate-500">${c.fotos.length} ${c.doc?"arquivo(s)":"foto(s)"}</span>
              </div>
            </div>`).join("")}
          ${postes.length?`
            <div class="border border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3">
              <div class="flex items-center justify-between">
                <span class="text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                  <span class="w-2.5 h-2.5 rounded-full bg-slate-400"></span>Checklist de Postes
                </span>
                <span class="text-xs font-bold text-slate-500">${postes.length} poste(s)</span>
              </div>
            </div>`:""}
        </div>`}`,
    `${btnCancelar}${btnPrimario("Exportar PDF",`exportarPDF(${o.id})`)}`);
}

/* ---------- Editar dados ---------- */
function abrirEdicao(id){
  rel.menu=null;
  const o = obras.find(x=>x.id===id);
  if (!o) return alert("Obra não encontrada.");
  const equipesAll = [...new Set(obras.map(x=>x.equipe))].sort();
  modal("Editar Dados da Obra", `
    <p class="text-xs text-slate-400 mb-4">ID: ${o.id}</p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Equipe</label>
        <select id="edEquipe" class="input-field">
          <option value="">Selecione a equipe...</option>
          ${equipesAll.map(e=>`<option value="${esc(e)}" ${o.equipe===e?"selected":""}>${esc(e)}</option>`).join("")}
        </select>
      </div>
      ${campo("Número da Obra","edObra",o.obra)}
      <div>
        <label class="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Tipo de Serviço / Book</label>
        <select id="edServico" class="input-field">
          <option value="">Selecione o tipo de serviço...</option>
          ${TIPOS_SERVICO.map(s=>`<option value="${esc(s)}" ${o.tipo_servico===s?"selected":""}>${esc(s)}</option>`).join("")}
        </select>
      </div>
      ${campo("Data da Obra","edData",(o.created_at||"").slice(0,10),"date")}
      ${campo("Responsável","edResp",o.responsavel)}
      ${campo("Placa","edPlaca",o.placa)}
    </div>`,
    `${btnCancelar}${btnPrimario("Salvar",`salvarEdicao(${o.id})`)}`);
}

function salvarEdicao(id){
  const o = obras.find(x=>x.id===id);
  if (!o) return;
  const v = i => document.getElementById(i).value;
  o.equipe = v("edEquipe") || o.equipe;
  o.obra = v("edObra") || o.obra;
  o.tipo_servico = v("edServico") || o.tipo_servico;
  o.responsavel = v("edResp");
  o.placa = v("edPlaca");
  const d = v("edData");
  if (d) o.created_at = new Date(d+"T12:00:00").toISOString();
  fecharModal();
  renderRelatorios();
}

/* ---------- Novo book ---------- */
function abrirNovoBook(idBase){
  rel.menu=null;
  const base = idBase!=null ? obras.find(x=>x.id===idBase) : null;
  const equipesAll = [...new Set(obras.map(x=>x.equipe))].sort();
  modal("Criar Novo Book", `
    <p class="text-xs text-slate-500 dark:text-slate-400 mb-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl px-4 py-3">
      Você pode ter vários books no mesmo nº de obra.
    </p>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label class="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Equipe</label>
        <select id="nbEquipe" class="input-field">
          <option value="">Selecione a equipe...</option>
          ${equipesAll.map(e=>`<option value="${esc(e)}" ${base&&base.equipe===e?"selected":""}>${esc(e)}</option>`).join("")}
        </select>
      </div>
      <div>
        <label class="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Número da Obra</label>
        <input id="nbObra" class="input-field" placeholder="Ex: 0032502210" value="${esc(base?.obra||"")}">
      </div>
      <div>
        <label class="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Tipo de Serviço / Book</label>
        <select id="nbServico" class="input-field">
          <option value="">Selecione o tipo de serviço...</option>
          ${TIPOS_SERVICO.map(s=>`<option value="${esc(s)}">${esc(s)}</option>`).join("")}
        </select>
      </div>
      ${campo("Data da Obra","nbData",new Date().toISOString().slice(0,10),"date")}
      <div>
        <label class="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Responsável</label>
        <input id="nbResp" class="input-field" placeholder="Nome do responsável" value="${esc(base?.responsavel||"")}">
      </div>
      <div>
        <label class="block text-xs font-semibold text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-1.5">Placa</label>
        <input id="nbPlaca" class="input-field" placeholder="Ex: 12345678" value="${esc(base?.placa||"")}">
      </div>
    </div>`,
    `${btnCancelar}${btnPrimario("Criar Novo Book","criarNovoBook()")}`);
}

function criarNovoBook(){
  const v = i => document.getElementById(i).value.trim();
  const equipe = v("nbEquipe"), obra = v("nbObra"), servico = v("nbServico");
  if (!equipe || !obra || !servico) return alert("Preencha equipe, número da obra e tipo de serviço.");
  const data = v("nbData") || new Date().toISOString().slice(0,10);
  const novo = {
    id: Math.max(0,...obras.map(o=>o.id))+1,
    obra, equipe, tipo_servico: servico,
    placa: v("nbPlaca"), responsavel: v("nbResp"),
    created_at: new Date(data+"T12:00:00").toISOString(),
    tem_atipicidade:false, data_fechamento:null, postes_data:[]
  };
  CATEGORIAS.forEach(c=>novo[c.key]=[]);
  obras.unshift(novo);
  fecharModal();
  renderRelatorios();
}

/* ---------- Criar placa ---------- */
function criarPlaca(id){
  rel.menu=null;
  const o = obras.find(x=>x.id===id);
  if (!o) return;
  modal(`Criar Placa — ${esc(o.obra)}`, `
    <div id="placaPreview" class="mx-auto w-full max-w-sm bg-white border-4 border-slate-900 rounded-xl p-6 text-center text-slate-900">
      <p class="text-xs font-bold tracking-[0.2em] text-slate-500">TECCEL ENGENHARIA</p>
      <p class="text-4xl font-black mt-3 tracking-tight">${esc(o.obra)}</p>
      <p class="text-sm font-semibold mt-2">${esc(o.tipo_servico)}</p>
      <div class="border-t-2 border-slate-900 mt-4 pt-3 text-left text-sm space-y-1">
        <p><span class="font-bold">Equipe:</span> ${esc(o.equipe)}</p>
        <p><span class="font-bold">Data:</span> ${fmtData(o.created_at)}</p>
        ${o.responsavel?`<p><span class="font-bold">Responsável:</span> ${esc(o.responsavel)}</p>`:""}
      </div>
    </div>`,
    `${btnCancelar}${btnPrimario("Baixar Placa (PDF)",`baixarPlaca(${o.id})`)}`);
}

function baixarPlaca(id){
  const o = obras.find(x=>x.id===id);
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({orientation:"landscape", unit:"mm", format:[150,100]});
  doc.setLineWidth(2); doc.rect(5,5,140,90);
  doc.setFontSize(9); doc.setTextColor(120);
  doc.text("TECCEL ENGENHARIA", 75, 18, {align:"center"});
  doc.setFontSize(32); doc.setTextColor(15,23,42); doc.setFont(undefined,"bold");
  doc.text(String(o.obra), 75, 38, {align:"center"});
  doc.setFontSize(12); doc.setFont(undefined,"normal");
  doc.text(String(o.tipo_servico), 75, 48, {align:"center"});
  doc.setLineWidth(0.8); doc.line(15, 56, 135, 56);
  doc.setFontSize(11);
  doc.text(`Equipe: ${o.equipe}`, 15, 66);
  doc.text(`Data: ${fmtData(o.created_at)}`, 15, 75);
  if (o.responsavel) doc.text(`Responsável: ${o.responsavel}`, 15, 84);
  doc.save(`placa-${o.obra}.pdf`);
}

/* ---------- Exportar PDF ---------- */
function montarBook(doc, o, primeira){
  if (!primeira) doc.addPage();
  let y = 20;
  doc.setFillColor(220,38,38); doc.rect(0,0,210,14,"F");
  doc.setTextColor(255); doc.setFontSize(11); doc.setFont(undefined,"bold");
  doc.text("TECCEL ENGENHARIA — Book de Obra", 14, 9);

  doc.setTextColor(15,23,42); doc.setFontSize(18);
  doc.text(String(o.obra), 14, y+4); y += 12;

  doc.setFontSize(10); doc.setFont(undefined,"normal"); doc.setTextColor(71,85,105);
  const linhas = [
    ["Equipe", o.equipe],
    ["Tipo de Serviço", o.tipo_servico],
    ["Data", fmtData(o.created_at)],
    ["Placa", o.placa || "—"],
    ["Responsável", o.responsavel || "—"],
    ["Status", o.data_fechamento ? "Concluída" : "Parcial"],
    ["Atipicidade", o.tem_atipicidade ? "Sim" : "Não"]
  ];
  linhas.forEach(([k,v])=>{
    doc.setFont(undefined,"bold"); doc.text(k+":", 14, y);
    doc.setFont(undefined,"normal"); doc.text(String(v), 55, y);
    y += 6;
  });

  y += 4;
  doc.setDrawColor(226,232,240); doc.line(14, y, 196, y); y += 8;
  doc.setFont(undefined,"bold"); doc.setFontSize(11); doc.setTextColor(15,23,42);
  doc.text("Registro fotográfico", 14, y); y += 8;

  const cats = CATEGORIAS.map(c=>({...c, n:(o[c.key]||[]).length})).filter(c=>c.n>0);
  doc.setFontSize(9); doc.setFont(undefined,"normal");
  if (cats.length === 0){
    doc.setTextColor(136); doc.text("Sem fotos disponiveis", 14, y); y += 6;
  } else {
    cats.forEach(c=>{
      if (y > 275){ doc.addPage(); y = 20; }
      doc.setTextColor(85); doc.text(c.label, 18, y);
      doc.setTextColor(29,78,216); doc.setFont(undefined,"bold");
      doc.text(String(c.n), 190, y, {align:"right"});
      doc.setFont(undefined,"normal");
      y += 6;
    });
  }

  const postes = Array.isArray(o.postes_data) ? o.postes_data : [];
  if (postes.length){
    if (y > 265){ doc.addPage(); y = 20; }
    y += 4;
    doc.setFont(undefined,"bold"); doc.setTextColor(15,23,42);
    doc.text("Checklist de Postes", 14, y); y += 7;
    doc.setFont(undefined,"normal"); doc.setTextColor(85); doc.setFontSize(9);
    postes.forEach((p,i)=>{
      if (y > 275){ doc.addPage(); y = 20; }
      const n = (p.fotos_antes?.length||0)+(p.fotos_durante?.length||0)+(p.fotos_depois?.length||0)+(p.fotos_medicao?.length||0);
      doc.text(`Poste ${i+1}`, 18, y);
      doc.text(`${n} foto(s)`, 190, y, {align:"right"});
      y += 6;
    });
  }

  if (y > 270){ doc.addPage(); y = 20; }
  y += 6;
  doc.setDrawColor(226,232,240); doc.line(14, y, 196, y); y += 5;
  doc.setFontSize(8); doc.setTextColor(148);
  doc.text(`Total de fotos: ${contarFotos(o)}   ·   Gerado em ${fmtData(new Date().toISOString())}`, 14, y);
}

function exportarPDF(id){
  rel.menu=null;
  const o = obras.find(x=>x.id===id);
  if (!o) return alert("Obra não encontrada.");
  try{
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    montarBook(doc, o, true);
    doc.save(`book-${o.obra}.pdf`);
  }catch(e){ console.error(e); alert("Erro ao gerar PDF"); }
}

function exportarTudoPDF(){
  if (rel.sel.size === 0) return alert("Selecione pelo menos uma obra para exportar");
  try{
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const lista = filtrarRel().filter(o=>rel.sel.has(o.id));
    lista.forEach((o,i)=>montarBook(doc,o,i===0));
    doc.save(`books-${lista.length}-obras.pdf`);
  }catch(e){ console.error(e); alert("Erro ao gerar PDF combinado"); }
}

/* ---------- Exportar CSV ---------- */
function exportarCSV(){
  const lista = filtrarRel();
  const cab = ["Nº Obra","Placa","Equipe","Tipo de Serviço","Status","Atipicidade","Fotos","Data","Responsável"];
  const linhas = lista.map(o=>[
    o.obra, o.placa||"", o.equipe, o.tipo_servico,
    o.data_fechamento?"Concluída":"Parcial",
    o.tem_atipicidade?"Sim":"Não",
    contarFotos(o), fmtData(o.created_at), o.responsavel||""
  ]);
  const csv = [cab, ...linhas]
    .map(l=>l.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(";"))
    .join("\r\n");
  const blob = new Blob(["﻿"+csv], {type:"text/csv;charset=utf-8;"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `relatorio-obras-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(a.href);
}

/* ---------- Exclusões ---------- */
function excluirObra(id){
  rel.menu=null;
  const o = obras.find(x=>x.id===id);
  if (!o) return;
  if (!confirm(`Excluir a obra ${o.obra}? Esta ação não pode ser desfeita.`)) return;
  obras = obras.filter(x=>x.id!==id);
  rel.sel.delete(id);
  renderRelatorios();
}

function excluirSelecionadas(){
  if (rel.sel.size === 0) return alert("Selecione ao menos uma obra para excluir.");
  const resp = prompt(`Excluir ${rel.sel.size} obra(s)? Digite EXCLUIR para confirmar.`);
  if (resp !== "EXCLUIR") return;
  obras = obras.filter(o=>!rel.sel.has(o.id));
  rel.sel.clear();
  renderRelatorios();
}
