# Painel de Obras

Dashboard de gestão de obras — HTML/JS/Tailwind, sem build.

**Acesso:** https://teccelia2001-ux.github.io/painel-obras/

## Funcionalidades

- **Filtros** — nº da obra/placa, período (Todos / Hoje / Última Semana / Este Mês), equipe e tipo de serviço, com contador de filtros ativos e limpeza rápida.
- **Cards** — Total de Obras, Concluídas (%), Total de Fotos (média por obra) e Atipicidades (%).
- **Top 5 Equipes** — ranking por número de obras, com medalhas.
- **Por Tipo de Serviço** — distribuição percentual (top 6).
- **Estatísticas por Equipe** — tabela com Total / Hoje / Semana / Mês / Fotos / Atipicidades / Serviços.
- Tema claro e escuro, layout responsivo.

## Dados

Por padrão o painel gera **420 obras de demonstração** no navegador, então abre já populado.

Para ligar nos dados reais, preencha no topo de `app.js`:

```js
const SUPABASE_URL = "https://SEU-PROJETO.supabase.co";
const SUPABASE_ANON_KEY = "sua-chave-anon";
```

Ele consulta `GET /rest/v1/obras?select=*&order=created_at.desc&limit=10000`.
Se a chamada falhar, cai automaticamente nos dados de demonstração.

> A tabela `obras` precisa ter RLS liberada para leitura pela chave anon,
> e o domínio do Pages precisa estar permitido no CORS do Supabase.

### Campos usados

| Campo | Uso |
|---|---|
| `created_at` | filtros de período e recortes Hoje/Semana/Mês |
| `obra`, `placa` | busca textual |
| `equipe` | agrupamento e ranking |
| `tipo_servico` | distribuição por serviço |
| `tem_atipicidade` | card e coluna de atipicidades |
| `data_fechamento` | conta obras concluídas |
| `fotos_*` (23 campos de array) | contagem de fotos |
| `postes_data[]` | fotos por poste (`fotos_antes/durante/depois/medicao`) |

## Rodar local

```bash
python -m http.server 5599 --directory .
```

## Arquivos

- `index.html` — shell: sidebar, topbar, área de conteúdo
- `app.js` — dados, filtros, cálculos e render
- `styles.css` — componentes (`card-padded`, `stat-card`, `input-field`, badges, tabela)
