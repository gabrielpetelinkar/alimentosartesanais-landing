# Squad: Prof. Dr. Frederico Ozanam Papa

**Dominio:** Medicina Veterinaria — Andrologia e Ginecologia Equina e Bovina
**Instituicao:** FMVZ-UNESP Botucatu
**Fidelidade:** 82% (Thinking DNA) / 72% (Voice DNA)
**Clone Date:** 2026-04-03
**Score de Qualidade:** 92/100

---

## Estrutura

```
frederico-papa/
├── frederico_papa.md          # Definicao principal do agente (persona, framework, dominios)
├── README.md                  # Este arquivo
├── commands/
│   └── frederico-papa.md      # Slash command para Claude Code (.claude/commands/)
├── artifacts/
│   ├── THINKING_DNA.md        # Framework de raciocinio cientifico (8 heuristicas com citacoes)
│   ├── VOICE_DNA.md           # Estilo de escrita e argumentacao (13 frases com fonte)
│   ├── CONCEPTS_MAP.md        # 15 conceitos centrais com mapa de relacoes
│   ├── PROTOCOL_STANDARD.md   # Protocolo de criopreservacao UNESP-Botucatu (11 etapas)
│   ├── SOURCE_CLASSIFICATION.md # Fontes utilizadas e avaliacao de qualidade
│   ├── OUTPUT_EXAMPLES.md     # 5 exemplos realistas de consulta com respostas
│   └── ANTI_PATTERNS.md       # 10 padroes que Papa NAO faria (com fonte)
└── heuristics/
    ├── FP_H_001.md            # O problema e o garanhao individual
    ├── FP_H_002.md            # Motilidade e proxy; prenhez e verdade
    ├── FP_H_003.md            # Bloqueio clinico → inovacao → validacao
    ├── FP_H_004.md            # Plasma seminal e variavel ativa
    ├── FP_H_005.md            # Quando o empirico atinge o teto, desca ao molecular
    ├── FP_H_006.md            # Estratificacao RC vs SC e obrigatoria
    └── FP_H_007.md            # Translacao tecnologica como meta
```

---

## Instalacao

### 1. Copiar squad para o projeto
```bash
cp -R frederico-papa/ <projeto>/squads/frederico-papa/
```

### 2. Instalar slash command
```bash
cp frederico-papa/commands/frederico-papa.md <projeto>/.claude/commands/frederico-papa/frederico-papa.md
```

### 3. Ativar
```
/frederico-papa:frederico-papa
```

---

## Comandos Disponiveis

| Comando | Descricao |
|---------|-----------|
| `*consult` | Consulta sobre reproducao equina/bovina |
| `*protocol` | Protocolo de criopreservacao UNESP-Botucatu |
| `*heuristics` | 7 heuristicas de raciocinio do Prof. Papa |
| `*examples` | 5 exemplos realistas de consulta |
| `*anti-patterns` | 10 padroes que Papa NAO faria |
| `*thinking` | Framework de raciocinio cientifico |
| `*voice` | Estilo de escrita e argumentacao |
| `*sources` | Classificacao das fontes utilizadas |
| `*help` | Listar comandos |
| `*exit` | Sair do modo agente |

---

## Metricas

- **7 artefatos** (THINKING_DNA, VOICE_DNA, CONCEPTS_MAP, PROTOCOL_STANDARD, SOURCE_CLASSIFICATION, OUTPUT_EXAMPLES, ANTI_PATTERNS)
- **7 heuristicas** operacionais com QUANDO usar e citacoes PMID
- **28+ citacoes** rastreáveis (PMID, dissertacoes, FAPESP)
- **5 output examples** realistas (poor freezer, motilidade vs prenhez, nova tecnologia, semen epididimal, design experimental)
- **10 anti-patterns** com fonte e explicacao
- **6 handoffs** nomeados para dominios fora do escopo
- **15 conceitos** mapeados com hierarquia de evidencia
- **11 etapas** de protocolo com dados numericos e variantes

---

## Fontes Primarias

| Fonte | Tipo | Qualidade |
|-------|------|-----------|
| PMID 27726989 (Review 2016) | Artigo de revisao | GOLD |
| PMID 16099609 (Amidas 2005) | Artigo original | GOLD |
| Tese Carneiro 2017 | Tese de doutorado | GOLD |
| Dissertacao Maziero 2010 | Dissertacao de mestrado | GOLD |
| PMC7673584 (BotuCrio meta) | Meta-analise | GOLD |
| PMID 23561926 (SpermFilter) | Artigo original | GOLD |
| PMID 32679458 (Proteomica) | Artigo original | GOLD |
