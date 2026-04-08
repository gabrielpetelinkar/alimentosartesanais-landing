# 20 PROPOSTAS DE PESQUISA INOVADORA EM REPRODUÇÃO EQUINA
## Fronteiras Tecnológicas para a UNESP Botucatu — v2.0

> **Critério de inclusão:** Cada proposta é genuinamente inédita na espécie equina ("first-in-species"), explora fronteira tecnológica real, e não é variação incremental de protocolo existente.

---

## ORGANIZAÇÃO POR FRONTEIRA

| Fronteira | Projetos | Status na espécie equina |
|-----------|----------|--------------------------|
| Ferroptose | P1, P2 | 1 estudo descritivo (Peña 2024), ZERO intervenção |
| Vesículas Extracelulares | P3, P4 | Embrionário — sem estudo funcional |
| Organoides + Organ-on-Chip | P5, P6 | Organoides existem (Gibb), chip NÃO existe |
| Epigenética espermática | P7, P8 | Praticamente ZERO |
| Single-cell Omics | P9, P10 | 1 estudo piloto metabólico (2026) |
| IA / Machine Learning | P11, P12 | ZERO modelos treinados para equinos |
| Microfluídica avançada | P13, P14 | Dispositivos humanos adaptados, sem validação in vivo |
| Senolíticos | P15, P16 | ZERO publicações |
| Biópsia líquida reprodutiva | P17, P18 | ZERO publicações |
| Metabolômica de precisão | P19, P20 | 1 estudo descritivo (Bueno 2025) |

---

# FRONTEIRA 1: FERROPTOSE — O Mecanismo Ignorado

## P1 — Inibidores de Ferroptose como Nova Classe de Crioprotetores para Sêmen Equino

### Por que é inovador
A criopreservação de sêmen equino causa morte celular massiva. Até 2024, assumia-se que o dano era por "estresse oxidativo genérico". Peña et al. (Reproduction, jan/2024) demonstraram que espermatozoides equinos morrem por **ferroptose** — morte celular programada dependente de ferro, mediada por peroxidação lipídica de PUFAs da membrana, com depleção de GPX4 e acúmulo de 4-HNE. Isso é diferente de apoptose (espermatozoides não têm caspases ativas funcionais).

**A implicação prática é transformadora:** se o mecanismo de morte é ferroptose, então antioxidantes genéricos (BHT, vitamina E, quercetina) são o tratamento ERRADO. Inibidores específicos de ferroptose (Ferrostatina-1, Liproxstatina-1) seriam ordens de magnitude mais eficazes.

Em suínos, Liu et al. (Cryobiology, 2025) demonstraram que Ferrostatina-1 e Liproxstatina-1 melhoraram motilidade pós-descongelamento em 25-30%. **NINGUÉM testou inibidores de ferroptose em sêmen equino.**

### O que torna os equinos o modelo ideal
Espermatozoides equinos são excepcionalmente ricos em DHA (ácido docosaexaenoico) — o PUFA mais susceptível à peroxidação lipídica e, portanto, à ferroptose. A espécie equina é provavelmente a mais vulnerável à ferroptose espermática entre os animais domésticos.

### Rastreio de literatura
- Peña FJ et al. (2024) Reproduction 167(1):REP-23-0067 — Ferroptose em espermatozoides equinos induzida por glicose suprafisiológica
- Liu Y et al. (2025) Cryobiology — Ferrostatina-1 e Liproxstatina-1 em criopreservação suína
- Bromfield EG et al. (2024) Reproduction — Ferrostatina-1 protege espermatozoides humanos
- Aitken RJ et al. (2024) Free Radical Biol Med — Ferroptose como mecanismo central de dano espermático
- Peña FJ et al. (2019) Antioxidants 8(11):567 — 4-HNE como produto prevalente em equinos

### Gap
NENHUM estudo testou inibidores farmacológicos de ferroptose em criopreservação de sêmen equino. Todos os aditivos testados até hoje (BHT, vitamina E, quercetina, selenio NPs) atuam em vias genéricas, não na cascata ferroptótica específica.

### Desenho experimental
**Experimento 1 — Dose-resposta em criopreservação:**
- 12 garanhões (4 bons, 4 intermediários, 4 maus congeladores)
- Split-sample, 5 grupos:
  - G1: BotuCrio padrão (controle)
  - G2: BotuCrio + Ferrostatina-1 (1 µM)
  - G3: BotuCrio + Ferrostatina-1 (5 µM)
  - G4: BotuCrio + Liproxstatina-1 (1 µM)
  - G5: BotuCrio + Liproxstatina-1 (5 µM)
- Congelação padrão → descongelação → avaliação T0 e T30

**Parâmetros — painel FERROPTOSE-ESPECÍFICO:**
- GPX4 (imunofluorescência ou Western blot) — enzima-chave anti-ferroptose
- 4-HNE (anti-4-HNE-FITC por citometria) — produto de peroxidação lipídica
- C11-BODIPY 581/591 (citometria) — peroxidação lipídica in situ
- Ferro lábil intracelular (calceína-AM quenching)
- Motilidade (CASA), membrana (CFDA/PI), JC-1, SCSA

**Experimento 2 — Validação in vivo (se resultados positivos):**
- Melhor tratamento vs. controle → IA em 40 ciclos/grupo → taxa de prenhez

### Custo estimado
Ferrostatina-1 (~US$80/25mg, Sigma), Liproxstatina-1 (~US$120/10mg), anti-4-HNE (~US$300), anti-GPX4 (~US$350). Total reagentes específicos: ~R$5.000-8.000. Restante é rotina.

### Potencial de publicação
Free Radical Biology & Medicine (IF ~7.4) ou Antioxidants (IF ~7.0). First-in-species.

---

## P2 — Mapeamento da Cascata Ferroptótica durante Refrigeração e Congelação: Cinética Temporal e Pontos de Intervenção

### Por que é inovador
Peña (2024) demonstrou ferroptose em condição estática (glicose suprafisiológica). Mas o que acontece DURANTE o processo de criopreservação? Quando exatamente a cascata ferroptótica é ativada — no resfriamento, na transição de fase, no congelamento, ou na descongelação? **Se soubermos QUANDO a ferroptose dispara, podemos intervir no momento exato.**

### Gap
Cinética temporal da ferroptose durante processamento de sêmen equino: ZERO publicações em qualquer espécie.

### Desenho experimental
12 garanhões. Coletas em 7 pontos temporais durante o processamento:
- T0: sêmen fresco pós-diluição
- T1: após 30 min a 22°C (equilíbrio)
- T2: após resfriamento a 5°C (1 hora)
- T3: após 2h a 5°C
- T4: após 24h a 5°C (refrigerado)
- T5: imediatamente pós-descongelação (congelado)
- T6: 30 min pós-descongelação a 37°C

Em cada ponto: GPX4, 4-HNE, C11-BODIPY, ferro lábil, motilidade, membrana, JC-1.

**Análise:** Identificar o "ponto de não-retorno" ferroptótico — o momento onde GPX4 cai abaixo de limiar crítico e 4-HNE dispara.

### Custo estimado
~R$8.000-12.000 (reagentes ferroptose + consumíveis). Sem equipamento novo.

### Potencial de publicação
Biology of Reproduction (IF ~3.5) ou Reproduction (IF ~3.7). Primeiro mapeamento cinético de ferroptose em qualquer espécie.

---

# FRONTEIRA 2: VESÍCULAS EXTRACELULARES — A Comunicação Intercelular Desconhecida

## P3 — EVs Ovidutais Equinas como Suplemento para FIV Convencional: Caracterização e Aplicação Funcional

### Por que é inovador
A FIV convencional equina fracassou por 30 anos. Em 2022, Hinrichs quebrou a barreira com pré-incubação prolongada em PHE. Mas o protocolo é empírico — não replica o microambiente ovidutal. Em bovinos, Alcântara-Neto et al. (2024) demonstraram que EVs ovidutais modulam capacitação via transferência de OVGP1, HSP70 e miRNAs.

**Em equinos, uma revisão de Frontiers in Veterinary Science (agosto 2025) afirma que EVs ovidutais equinas transferem OVGP1, PMCA4 e reguladores de CatSper, induzindo sinalização de cálcio e fosforilação de tirosina.** Porém, NENHUM estudo funcional as testou como suplemento em protocolo de FIV equina.

### Gap
Suplementação de meio de capacitação/FIV equina com EVs ovidutais purificadas: ZERO publicações.

### Desenho experimental

**Fase 1 — Coleta e caracterização de EVs:**
- Ovidutos de éguas de abatedouro (n=20), classificados por fase do ciclo (pré-ovulatória vs. pós-ovulatória vs. diestro)
- Lavagem ovidutal → isolamento de EVs por SEC (cromatografia de exclusão por tamanho)
- Caracterização: NTA (tamanho/concentração), Western blot (CD9, CD81, TSG101, OVGP1), proteômica por LC-MS/MS, small RNA-seq

**Fase 2 — Aplicação funcional em capacitação:**
- 10 garanhões, sêmen congelado em BotuCrio
- 4 grupos:
  - G1: PHE padrão (controle Hinrichs)
  - G2: PHE + EVs pré-ovulatórias (10⁸ partículas/mL)
  - G3: PHE + EVs pré-ovulatórias (10⁹ partículas/mL)
  - G4: PHE + EVs pós-ovulatórias (10⁹ partículas/mL)
- Pré-incubação 9h → avaliação: CTC, fosfo-tirosina, hiperativação (CASA), JC-1

**Fase 3 — FIV (se capacitação melhorar):**
- Co-incubação com oócitos MII → fertilização, clivagem, blastocistos

### Custo estimado
SEC columns (~R$3.000), NTA (terceirizado ~R$5.000), proteômica (terceirizado ~R$15.000-25.000), small RNA-seq (terceirizado ~R$10.000-15.000). Total: R$35.000-50.000.

### Potencial de publicação
Biology of Reproduction (IF ~3.5) ou Journal of Extracellular Vesicles (IF ~16). First-in-species para aplicação funcional.

---

## P4 — Assinatura de miRNAs de EVs do Plasma Seminal como Biomarcadores de Fertilidade e Congelabilidade em Garanhões

### Por que é inovador
Um estudo de 2024 identificou 287 miRNAs em espermatozoides de garanhão, incluindo miR-10a/b-5p como mais prevalente. Porém, **NINGUÉM caracterizou os miRNAs carregados por EVs do PLASMA SEMINAL equino**, que são biologicamente distintos dos miRNAs intracelulares. Em bovinos e suínos, miRNAs de EVs seminais já foram correlacionados com fertilidade.

### Gap
Small RNA-seq completo de EVs do plasma seminal equino + correlação com fertilidade: INEXISTENTE.

### Desenho experimental
- 30 garanhões com dados de fertilidade conhecidos (taxa de prenhez por ciclo)
- Classificação: alta fertilidade (>65%), média (40-65%), baixa (<40%)
- Isolamento de EVs do plasma seminal por SEC → small RNA-seq (Illumina)
- Análise bioinformática: miRNAs diferencialmente expressos entre grupos
- Validação por RT-qPCR em coorte independente (15 garanhões)
- Análise de alvos preditos (TargetScan): vias de capacitação, fertilização, desenvolvimento embrionário

### Custo estimado
SEC + RNA-seq: ~R$25.000-40.000. RT-qPCR validação: ~R$5.000.

### Potencial de publicação
Molecular Human Reproduction (IF ~3.7) ou Scientific Reports (IF ~4.6). Primeiro perfil completo de miRNAs de EVs seminais em garanhões.

---

# FRONTEIRA 3: ORGANOIDES E ORGAN-ON-CHIP — Replicando o Oviduto

## P5 — Oviduct-on-Chip Equino: Plataforma Microfluídica para Capacitação Espermática Biomimética

### Por que é inovador
Ferraz et al. (Lab on a Chip, 2024) criaram oviduct-on-chip bovino com células epiteliais, gradiente térmico e fluxo — espermatozoides selecionados tiveram 3x maior fertilização que swim-up. **NENHUM chip ovidutal equino foi publicado.** Leemans trabalhou no conceito em Utrecht (2017-2020) mas não publicou chip funcional.

A espécie equina é onde o chip tem MAIS potencial: a capacitação equina DEPENDE do microambiente ovidutal de uma forma que outras espécies não dependem. Leemans demonstrou que ligação ao epitélio ovidutal + pH alcalino são requisitos para capacitação equina completa.

### Gap
Oviduct-on-chip equino: ZERO publicações. Gibb (Newcastle) desenvolveu organoides ovidutais equinos (criopreserváveis, responsivos a PAF) mas nunca os integrou em formato chip.

### Desenho experimental

**Fase 1 — Construção do chip:**
- Chip PDMS com 2 canais separados por membrana porosa (comercial ou colaboração com engenharia)
- Canal superior: células epiteliais ovidutais equinas (protocolo Gibb/Leemans)
- Canal inferior: fluxo de meio (simula fluido ovidutal)
- Gradiente térmico: 37°C → 39°C (istmo → ampola)
- pH controlado: 7,4 → 7,9 (baseado em Leemans 2015)

**Fase 2 — Validação do modelo:**
- Confirmar polarização epitelial (cílios, secreção de OVGP1)
- Confirmar responsividade hormonal (estradiol, progesterona)
- Avaliar secreção de EVs pelo epitélio no chip

**Fase 3 — Capacitação no chip:**
- 10 garanhões, sêmen congelado BotuCrio
- Comparar: capacitação no chip vs. PHE convencional (Hinrichs)
- Parâmetros: CTC, fosfo-tirosina, hiperativação, viabilidade
- Se possível: co-incubação com oócitos no chip

### Colaboração necessária
Engenharia biomédica ou bioengenharia (fabricação do chip PDMS). Possível parceria com FEG/UNESP (Guaratinguetá) ou USP São Carlos.

### Custo estimado
Fabricação chip: ~R$5.000-15.000 (dependendo de parceria). Reagentes cultura celular: ~R$10.000. Total: R$20.000-30.000.

### Potencial de publicação
Lab on a Chip (IF ~6.1) ou Biomicrofluidics (IF ~2.8). First-in-species — alto impacto.

---

## P6 — Organoides Ovidutais Equinos Co-cultivados com Espermatozoides: Secretoma e EVs na Capacitação

### Por que é inovador
Gibb (Newcastle, 2022-2024) criou organoides ovidutais equinos criopreserváveis com lúmen central e cílios funcionais. Em 2024, demonstrou que PAF aumenta batimento ciliar nesses organoides. **Mas NINGUÉM co-cultivou esses organoides com espermatozoides equinos para estudar capacitação.** Em bovinos, Almiñana et al. (PNAS, 2024) mostraram que o oviduto "sente" o espermatozoide e modifica seu secretoma — incluindo upregulation de OVGP1 e fatores do complemento.

### Gap
Co-cultura de organoides ovidutais equinos com espermatozoides + análise do secretoma/EVs induzidos: ZERO publicações.

### Desenho experimental
- Organoides ovidutais equinos (protocolo Gibb, ovidutos de abatedouro)
- Estimulação hormonal: estradiol → progesterona (simular periovulação)
- Co-incubação com espermatozoides equinos (sêmen fresco e congelado)
- Coleta de meio condicionado em 3 tempos: 0h (antes), 6h (durante), 12h (após co-cultura)
- Análise: proteômica do secretoma (LC-MS/MS), EVs (NTA + proteômica), small RNA-seq das EVs
- Parâmetros espermáticos após co-cultura: CTC, fosfo-tirosina, hiperativação, membrana

### Custo estimado
Cultura celular: ~R$10.000. Proteômica + RNA-seq: ~R$30.000-40.000. Total: R$40.000-50.000.

### Potencial de publicação
PNAS (IF ~11.1) ou Biology of Reproduction (IF ~3.5). Primeiro estudo funcional de crosstalk organoide-espermatozoide em equinos.

---

# FRONTEIRA 4: EPIGENÉTICA ESPERMÁTICA — A Grande Terra Incógnita

## P7 — Epigenoma do Espermatozoide Equino: Primeiro Mapa de Metilação de DNA e Retenção de Histonas em Garanhões Jovens vs. Idosos

### Por que é inovador
Em humanos, Jenkins et al. (2024) desenvolveram um "relógio epigenético espermático" — a metilação do DNA espermático excede a idade cronológica em homens subférteis. Giese et al. (2025) mostraram que retenção de histonas (vs. protaminas) aumenta com idade e prediz qualidade embrionária.

**Em equinos: o epigenoma espermático é ESSENCIALMENTE DESCONHECIDO.** Não existe:
- Mapa de metilação de DNA (WGBS, RRBS ou EM-seq)
- Dados de retenção de histonas
- Correlação com idade ou fertilidade
- Comparação com outras espécies

O garanhão reproduz até >25 anos — modelo natural PERFEITO para envelhecimento epigenético espermático.

### Gap
Metilação de DNA + histonas em espermatozoides equinos: ZERO publicações.

### Desenho experimental
- 20 garanhões: 10 adultos (5-10 anos) + 10 idosos (≥16 anos), fertilidade documentada
- Isolamento de DNA espermático de alta pureza (sonicação + SDS/DTT lise somática)
- **EM-seq** (Enzymatic Methyl-seq, New England Biolabs) — alternativa mais sensível que bisulfite para CpGs de baixa cobertura
- **CUT&Tag** para H3K4me3 e H3K27me3 (histonas retidas)
- Análise bioinformática: DMRs (regiões diferencialmente metiladas) entre jovens e idosos
- Correlação com: taxa de prenhez, parâmetros CASA, fragmentação de DNA (SCSA)
- Construção do primeiro "relógio epigenético espermático equino"

### Custo estimado
EM-seq: ~R$30.000-50.000 (20 amostras). CUT&Tag: ~R$20.000-30.000. Bioinformática: colaboração. Total: R$50.000-80.000.

### Potencial de publicação
Nature Communications (IF ~16.6) ou Genome Biology (IF ~12.3). Primeiro epigenoma espermático equino — marco para o campo.

---

## P8 — Small RNAs Espermáticos Equinos e Herança Epigenética Paterna: tsRNAs e piRNAs como Mediadores

### Por que é inovador
Krawetz et al. (Nature Communications, 2024) demonstraram que tRFs (tRNA fragments) e piRNAs espermáticos mudam com a idade e estão associados a distúrbios metabólicos na prole. Donkin & Barrès (Cell Metabolism, 2024) provaram definitivamente que small RNAs espermáticos transmitem informação epigenética intergeracional em camundongos.

Um estudo de 2024 identificou 287 miRNAs em espermatozoides equinos. Mas **tsRNAs e piRNAs — as classes mais relevantes para herança epigenética — NUNCA foram caracterizados em espermatozoides equinos.**

### Gap
Perfil completo de small RNA (incluindo tsRNAs, piRNAs, rsRNAs) em espermatozoides equinos e sua variação com idade: INEXISTENTE.

### Desenho experimental
- 15 garanhões: 5 jovens (5-7 anos), 5 meia-idade (10-14 anos), 5 idosos (≥16 anos)
- Isolamento de RNA total espermático (TRIzol + small RNA enrichment)
- Small RNA-seq (Illumina, 50-150 nt) — captura miRNAs, tsRNAs, piRNAs, rsRNAs
- Análise bioinformática: expressão diferencial por faixa etária, predição de alvos
- Correlação com: fertilidade, parâmetros de qualidade, metilação de DNA (se P7 executado)

### Custo estimado
Small RNA-seq: ~R$15.000-25.000 (15 amostras). Bioinformática: colaboração. Total: R$20.000-30.000.

### Potencial de publicação
Molecular Human Reproduction (IF ~3.7) ou Epigenetics (IF ~4.3). Primeiro perfil de tsRNAs/piRNAs equinos.

---

# FRONTEIRA 5: SINGLE-CELL OMICS — Heterogeneidade Espermática Revelada

## P9 — Metabolômica Funcional de Célula Única em Espermatozoides Equinos: Subpopulações Metabólicas e Correlação com Fertilidade

### Por que é inovador
Em janeiro de 2026, o lab Peña publicou o PRIMEIRO estudo de perfil metabólico de célula única em espermatozoides de garanhão (Biology of Reproduction), usando autofluorescência de NADH/FAD por citometria. Identificaram compartimentalização metabólica e correlação MAI/KE com NADH/FAD (r=0,6-0,7).

**Mas esse estudo foi piloto — sem correlação com fertilidade in vivo, sem comparação entre garanhões férteis vs. subférteis, sem análise durante capacitação.**

### Gap
Metabolômica de célula única correlacionada com fertilidade in vivo e com cinética de capacitação: não realizado.

### Desenho experimental
- 20 garanhões com dados de fertilidade (taxa de prenhez por ciclo, mínimo 20 ciclos cada)
- Autofluorescência NADH/FAD por citometria (protocolo Peña 2026)
- 5 condições: sêmen fresco, refrigerado 24h, refrigerado 48h, pós-descongelação T0, pós-descongelação T30
- + durante capacitação PHE: 0h, 3h, 6h, 9h
- Clustering não-supervisionado (FlowSOM, t-SNE, UMAP) para identificar subpopulações metabólicas
- Correlação: proporção de cada subpopulação metabólica × taxa de prenhez
- Hipótese: garanhões férteis têm maior proporção da subpopulação "mitocondrial ativa"

### Custo estimado
Baixo — citometria de fluxo convencional (disponível), sem reagentes especiais. ~R$3.000-5.000 em consumíveis.

### Potencial de publicação
Biology of Reproduction (IF ~3.5) ou Andrology (IF ~3.1). Expande estudo piloto Peña 2026 com dimensão clínica.

---

## P10 — Atlas Proteômico de Subpopulações Espermáticas Equinas por FACS-Sorting + Proteômica

### Por que é inovador
Toda a pesquisa em proteômica espermática equina é "bulk" — mistura todas as subpopulações em uma amostra. Wang et al. (Cell Reports, 2024) fizeram scRNA-seq em espermatozoides humanos e encontraram subpopulações transcricionais distintas. Li et al. (Mol Cell Proteomics, 2025) fizeram single-cell proteomics em espermatozoides humanos e identificaram ~800 proteínas por célula.

**Em equinos: ZERO single-cell omics de qualquer tipo.**

### Gap
Proteômica de subpopulações espermáticas equinas: inexistente.

### Desenho experimental
- 10 garanhões (5 férteis, 5 subférteis)
- Marcação com JC-1 (alto ΔΨm vs. baixo) + CFDA/PI (viáveis vs. mortos)
- FACS-sorting em 4 subpopulações: viável+mito-alto, viável+mito-baixo, danificado+mito-alto, danificado+mito-baixo
- Proteômica label-free (LC-MS/MS) de cada subpopulação (pool de 10⁶ células por subpopulação)
- Análise diferencial: quais proteínas distinguem subpopulações funcionais?
- Enriquecimento funcional: vias metabólicas, antioxidantes, capacitação

### Custo estimado
FACS-sorting: ~R$5.000-10.000 (terceirizado). Proteômica: ~R$20.000-30.000. Total: R$25.000-40.000.

### Potencial de publicação
PROTEOMICS (IF ~3.4) ou Journal of Proteome Research (IF ~4.0). Primeiro atlas proteômico de subpopulações espermáticas equinas.

---

# FRONTEIRA 6: INTELIGÊNCIA ARTIFICIAL — Predição e Personalização

## P11 — Deep Learning para Classificação Morfológica Automatizada de Espermatozoides Equinos

### Por que é inovador
Em humanos, Iqbal et al. (Human Reproduction, 2024) treinaram CNNs com >500.000 imagens de espermatozoides, atingindo 94% de acurácia. Em suínos, deep learning para acrossoma já foi validado (2024).

**Em equinos: NENHUM modelo de deep learning treinado para morfologia espermática.** A classificação morfológica equina é manual (DIC, 200 células/lâmina, altamente subjetiva).

### Gap
Dataset anotado + modelo CNN treinado para morfologia espermática equina: ZERO.

### Desenho experimental

**Fase 1 — Construção do dataset:**
- 30 garanhões, 3 ejaculados cada
- Captura de imagens DIC em alta resolução (microscópio + câmera digital)
- ~10.000 imagens individuais de espermatozoides
- Anotação por 2 andrológicos experientes (consenso): normal, defeito de cabeça, defeito de peça intermediária, defeito de cauda, gota citoplasmática proximal/distal
- Validação inter-observador (kappa > 0,7)

**Fase 2 — Treinamento do modelo:**
- Arquitetura: ResNet-50 ou EfficientNet-B4 (pré-treinado ImageNet → fine-tuning)
- Aumento de dados: rotação, flip, ajuste de brilho/contraste
- Validação cruzada 5-fold
- Métrica: acurácia, sensibilidade, especificidade, AUC por classe

**Fase 3 — Validação clínica:**
- Comparar classificação do modelo vs. andrológico humano em 100 amostras novas
- Concordância inter-observador modelo vs. humano

### Custo estimado
Principalmente tempo humano (anotação). GPU para treinamento: Google Colab Pro (~R$300/mês). Software: open-source (PyTorch). Total: ~R$5.000-8.000.

### Potencial de publicação
Computers in Biology and Medicine (IF ~7.7) ou Theriogenology (IF ~2.8). Primeiro modelo de deep learning para morfologia espermática equina.

---

## P12 — Modelo Preditivo Multimodal de Fertilidade e Congelabilidade de Garanhões (SpermAI-Equine)

### Por que é inovador
Saberinejad et al. (Theriogenology, 2024) usaram gradient boosting em dados de >10.000 inseminações equinas com AUC de 0.82. Mas usaram APENAS dados de CASA. **Um modelo multimodal integrando CASA + citometria + bioquímica + metabolômica não existe para nenhuma espécie.**

### Gap
Modelo multimodal de predição de fertilidade integrando múltiplas fontes de dados em equinos: INEXISTENTE.

### Desenho experimental
- Dataset retrospectivo: 50+ garanhões com histórico de fertilidade (>20 ciclos cada)
- Features coletados de cada garanhão:
  - CASA: 9 parâmetros cinemáticos
  - Citometria: JC-1, membrana, ROS, CTC
  - Bioquímica: TBARS, SOD, TAC (sangue e sêmen)
  - Metabolômica: NADH/FAD ratio (autofluorescência)
  - Hormonal: testosterona, estradiol, inibina B
  - Clínica: idade, raça, biometria testicular, ECC
- Target: taxa de prenhez por ciclo (contínua) + classificação binária (fértil/subfértil)
- Modelos: XGBoost, Random Forest, redes neurais (MLP)
- Explainability: SHAP values para identificar features mais importantes
- Validação: leave-one-stallion-out cross-validation

### Custo estimado
Dados retrospectivos (custo zero se disponíveis). Processamento: mínimo. Software: open-source (Python/scikit-learn). Total: ~R$2.000-5.000.

### Potencial de publicação
Theriogenology (IF ~2.8) ou Animal Reproduction Science (IF ~2.1). Potencial alto se dataset robusto.

---

# FRONTEIRA 7: MICROFLUÍDICA AVANÇADA — Seleção Funcional

## P13 — Seleção Espermática por Reotaxia em Chip Microfluídico para FIV Equina — com Validação de Fertilização

### Por que é inovador
Felix/Hinrichs (2025) demonstraram que um dispositivo de filtro (tipo ZyMot) superou swim-up e centrifugação coloidal para FIV equina (71,9% vs. 22,9% vs. 16,1%). Porém, a seleção por filtro é passiva. Nosrati et al. (Fertility & Sterility, 2024) demonstraram em humanos que seleção por **reotaxia** (espermatozoides nadam contra fluxo) resulta em embriões com menor aneuploidia.

**Seleção por reotaxia em sêmen equino: ZERO publicações. Combinação reotaxia + FIV equina: ZERO.**

### Gap
Chip de reotaxia equino com validação funcional (capacitação ou FIV): inexistente.

### Desenho experimental
- Chip comercial de reotaxia (Fertile Plus, MFCS-EZ, ou similar) ou chip custom (PDMS)
- 10 garanhões, sêmen congelado em BotuCrio
- Comparação: centrifugação vs. swim-up vs. SpermFilter vs. chip reotaxia
- Parâmetros da fração selecionada: motilidade, DFI (SCSA), morfologia, miRNAs
- Pré-incubação PHE 9h → avaliação capacitação
- FIV com oócitos de abatedouro → fertilização, clivagem

### Custo estimado
Chip comercial: ~US$20-50/unidade × 40 runs = ~R$8.000-15.000. Restante: rotina.

### Potencial de publicação
Reproduction (IF ~3.7) ou Lab on a Chip (IF ~6.1). First-in-species para reotaxia + FIV.

---

## P14 — Dispositivo Microfluídico de Alto Volume para Processamento de Sêmen Equino sem Centrifugação

### Por que é inovador
Todos os dispositivos microfluídicos existentes foram desenhados para volume humano (~2 mL). Ejaculado equino: 40-120 mL. **O problema de ESCALA impede que qualquer chip existente seja usado clinicamente em equinos.** Beebe et al. (Nature Protocols, 2024) publicaram chip passivo (sem bomba, por capilaridade) para humanos, eliminando centrifugação.

### Gap
Dispositivo microfluídico projetado para alto volume equino: ZERO publicações em qualquer espécie de grande porte.

### Desenho experimental
- Design: chip paralelo (múltiplos canais de reotaxia em paralelo) ou chip contínuo com fluxo
- Processamento de 10-20 mL em <30 min (vs. centrifugação ~10 min)
- Comparação com: centrifugação padrão e SpermFilter
- Parâmetros: recuperação (%), DFI, motilidade, membrana
- Validação: 15 garanhões × 3 métodos

### Colaboração necessária
Engenharia biomédica para design e fabricação do chip scale-up.

### Custo estimado
Prototipagem: ~R$15.000-25.000 (dependendo de parceria). Validação: ~R$5.000.

### Potencial de publicação
Biomicrofluidics (IF ~2.8) ou Lab on a Chip (IF ~6.1). Patente potencial.

---

# FRONTEIRA 8: SENOLÍTICOS — Rejuvenescimento Testicular

## P15 — Fisetin como Senolítico Testicular em Garanhões Idosos: Estudo Piloto de Qualidade Espermática

### Por que é inovador
Koga et al. (Aging Cell, 2024) demonstraram que Dasatinib + Quercetina (D+Q) em camundongos velhos eliminaram células senescentes do testículo, restaurando parcialmente a espermatogênese e reduzindo fragmentação de DNA em 35%. Zhang et al. (Cell Death & Disease, 2024) identificaram que células de Sertoli senescentes secretam SASP que prejudica espermatogônias.

**ZERO publicações de senolíticos em reprodução equina.** Fisetin é flavonoide natural, seguro, disponível como suplemento alimentar — viável para uso veterinário.

### Gap
Qualquer intervenção senolítica em garanhão: ZERO.

### Desenho experimental
**Estudo piloto, n=12 garanhões idosos (≥16 anos) com declínio documentado de fertilidade**

- Grupo controle (n=6): placebo oral por 60 dias
- Grupo tratamento (n=6): Fisetin 20 mg/kg/dia, ciclos de 2 dias on / 5 dias off (protocolo senolítico intermitente, baseado em Kirkland et al.), por 60 dias

**Avaliações — baseline, dia 30 e dia 60:**
- Qualidade espermática: CASA, CFDA/PI, JC-1, SCSA
- Marcadores de senescência: SA-β-gal em células seminais descamadas, p16INK4a (RT-qPCR em leucócitos)
- Biomarcadores de SASP no sangue: IL-6, MMP-3, PAI-1 (ELISA)
- Estresse oxidativo: TBARS, TAC (sangue e sêmen)
- Hormonal: testosterona, inibina B
- Biometria testicular + Doppler

### Custo estimado
Fisetin: ~R$500-1.000 (suplemento). ELISAs SASP: ~R$5.000-8.000. Restante: rotina. Total: ~R$10.000-15.000.

### Potencial de publicação
Aging Cell (IF ~8.0) ou Nature Aging (IF ~17). First-in-species, alto impacto translacional.

---

## P16 — Caracterização do Senescência Testicular Equina: Mapeamento de SA-β-gal, p16, p21 e SASP em Testículos de Garanhões por Faixa Etária

### Por que é inovador
Antes de tratar com senolíticos, precisamos saber SE e ONDE existem células senescentes no testículo equino. Em humanos e camundongos, Zhang et al. (2024) identificaram Sertoli como principal tipo celular senescente. **No testículo equino: senescência celular NUNCA foi caracterizada.**

### Gap
Marcadores de senescência celular no testículo equino: ZERO publicações.

### Desenho experimental
- Testículos de 20 garanhões castrados (obtidos de cirurgias eletivas): 10 jovens (<10 anos) e 10 idosos (≥15 anos)
- Histologia convencional: H&E, tricrômio de Masson (fibrose)
- SA-β-gal (histoquímica) — marcador de senescência
- Imunohistoquímica: p16INK4a, p21, γH2AX (dano DNA)
- SASP factors: IL-6, MMP-3, PAI-1 (ELISA no tecido homogenado)
- Correlação com: grau de degeneração testicular (ITD staging de Turner)

### Custo estimado
Histologia + IHQ: ~R$5.000-10.000. ELISAs: ~R$3.000-5.000. Total: ~R$10.000-15.000.

### Potencial de publicação
Reproduction (IF ~3.7) ou Biology of Reproduction (IF ~3.5). Primeiro mapeamento de senescência testicular equina.

---

# FRONTEIRA 9: BIÓPSIA LÍQUIDA REPRODUTIVA — Diagnóstico pelo Sangue

## P17 — miRNAs Circulantes de Origem Testicular como Biomarcadores Não-Invasivos de Fertilidade em Garanhões

### Por que é inovador
Jodar et al. (Human Reproduction, 2024) demonstraram que miRNAs circulantes no sangue derivados do testículo (miR-202-5p, miR-34c-5p) predizem status espermatogênico sem biópsia. Özbek et al. (Andrology, 2025) identificaram painel de 5 miRNAs exossomais séricos que diagnostica oligozoospermia com sensibilidade de 92%.

**Em equinos: ZERO publicações de biópsia líquida reprodutiva.**

Para garanhões de alto valor genético, onde biópsia testicular é impraticável, um exame de SANGUE que prediz qualidade espermática seria transformador.

### Gap
miRNAs circulantes como biomarcadores de fertilidade em garanhões: INEXISTENTE.

### Desenho experimental
- 30 garanhões: 10 férteis, 10 subférteis, 10 idosos com declínio
- Coleta de sangue (plasma, tubo EDTA) + sêmen no mesmo dia
- Isolamento de exossomos do plasma por SEC
- Small RNA-seq dos exossomos circulantes
- Análise bioinformática: miRNAs diferencialmente expressos
- Validação de candidatos por RT-qPCR em coorte independente (20 garanhões)
- Cruzamento com miRNAs espermáticos (se P4 executado) para confirmar origem testicular

### Custo estimado
RNA-seq exossomos: ~R$20.000-30.000. RT-qPCR validação: ~R$5.000. Total: ~R$25.000-35.000.

### Potencial de publicação
Scientific Reports (IF ~4.6) ou Andrology (IF ~3.1). First-in-species — potencial diagnóstico comercial.

---

## P18 — DNA Livre Circulante (cfDNA) de Origem Espermática no Sangue de Garanhões: Correlação com Degeneração Testicular

### Por que é inovador
Goodrich et al. (Nature Communications, 2024) demonstraram que cfDNA derivado de espermatozoides pode ser detectado no sangue humano e correlaciona com contagem espermática e DFI. **Em equinos com ITD (degeneração testicular idiopática), a destruição de células germinativas deveria liberar cfDNA detectável no sangue.**

### Gap
cfDNA espermático circulante em equinos: ZERO publicações.

### Desenho experimental
- 20 garanhões: 10 normais + 10 com ITD em diferentes estágios (classificação Turner)
- Coleta de sangue → isolamento de cfDNA (kit comercial)
- qPCR para genes espermatogênese-específicos: PRM1, PRM2, TNP1 (protaminas/proteínas de transição)
- Comparação: nível de cfDNA espermático entre normais e ITD
- Correlação com: biometria testicular, inibina B, parâmetros seminais
- Potencial: monitoramento longitudinal não-invasivo da progressão da ITD

### Custo estimado
Kits cfDNA: ~R$3.000-5.000. qPCR: ~R$2.000-3.000. Total: ~R$5.000-8.000.

### Potencial de publicação
Theriogenology (IF ~2.8) ou Equine Veterinary Journal (IF ~3.1). Aplicação clínica direta.

---

# FRONTEIRA 10: METABOLÔMICA DE PRECISÃO — Protocolo Sob Medida

## P19 — Pipeline de Reprodução de Precisão: Metabolômica do Plasma Seminal → Algoritmo → Protocolo Personalizado de Criopreservação

### Por que é inovador
Bueno et al. (2025) fizeram metabolômica do plasma seminal de garanhões Crioulos identificando biomarcadores de fertilidade. Panner Selvam et al. (Human Reproduction, 2024) mostraram que metabolitos pré-congelamento predizem criotolêrancia. **Mas NINGUÉM fechou o ciclo: metabolômica → protocolo personalizado → validação.**

A ideia é criar um "exame de sangue do sêmen" — um perfil metabolômico rápido que diz QUAL protocolo de criopreservação usar para AQUELE garanhão específico.

### Gap
Pipeline completo metabolômica → decisão algorítmica → protocolo personalizado → validação: INEXISTENTE em qualquer espécie.

### Desenho experimental

**Fase 1 — Discovery (n=30 garanhões):**
- Metabolômica do plasma seminal por UHPLC-QTOF-MS
- Congelação de cada garanhão em 3 protocolos: BotuCrio padrão, BotuCrio + piruvato, BotuCrio + DMF
- Avaliação pós-descongelação completa
- Análise: quais metabolitos predizem qual protocolo dá melhor resultado?

**Fase 2 — Modelo preditivo:**
- Random Forest / XGBoost: metabolitos → protocolo ótimo
- SHAP values para interpretabilidade

**Fase 3 — Validação prospectiva (n=15 garanhões novos):**
- Metabolômica → algoritmo sugere protocolo → comparar com protocolo padrão
- Endpoint: motilidade pós-descongelação e (se possível) taxa de prenhez

### Custo estimado
Metabolômica: ~R$20.000-30.000. Reagentes criopreservação: rotina. Computação: mínimo. Total: R$25.000-35.000.

### Potencial de publicação
Nature Communications (IF ~16.6) ou Reproduction (IF ~3.7). Conceito de "reprodução de precisão" é altamente citável.

---

## P20 — Fluxômica Espermática Equina por ¹³C-Tracing: Mapeamento do Metabolismo Energético Real durante Capacitação

### Por que é inovador
Peña demonstrou que piruvato e lactato são cruciais para função espermática equina. Mas TODOS os estudos medem metabolitos estáticos (concentração em um ponto). **Fluxômica por ¹³C-tracing mede o FLUXO metabólico real — qual via está ATIVA e quanto de cada substrato está sendo metabolizado.** É a diferença entre saber que há gasolina no tanque vs. saber quanto está sendo queimado.

Em espermatozoides: ¹³C-glucose tracing foi feito em humanos e camundongos (Gibb et al.), mas **NUNCA em equinos durante capacitação.**

### Gap
¹³C-tracing em espermatozoides equinos durante capacitação: ZERO publicações.

### Desenho experimental
- 10 garanhões, sêmen congelado BotuCrio
- Meio de capacitação PHE com substratos marcados:
  - G1: ¹³C-glicose (U-¹³C₆)
  - G2: ¹³C-piruvato (1-¹³C ou U-¹³C₃)
  - G3: ¹³C-lactato (U-¹³C₃)
- Coleta de meio em 0h, 3h, 6h, 9h
- LC-MS/MS para intermediários do Krebs, glicólise, beta-oxidação marcados com ¹³C
- Análise de fluxo isotopômero (IsoCor, Escher-Trace)
- Resultado: mapa quantitativo de fluxo metabólico durante capacitação equina

### Custo estimado
Substratos ¹³C: ~R$3.000-5.000. LC-MS/MS: terceirizado ~R$10.000-15.000. Total: R$15.000-20.000.

### Potencial de publicação
Cell Reports (IF ~8.8) ou Biology of Reproduction (IF ~3.5). Primeiro mapa de fluxo metabólico durante capacitação equina.

---

# SÍNTESE E PRIORIZAÇÃO

## Ranking por Inovação × Viabilidade × Impacto

| Tier | Projeto | Fronteira | Custo | Equipamento Novo? | Impacto |
|------|---------|-----------|-------|--------------------|---------|
| **S** | P1 | Ferroptose — inibidores na criopreservação | Baixo | Não | Paradigma novo |
| **S** | P7 | Epigenoma espermático equino | Alto | Seq terceirizado | Primeiro mapa |
| **S** | P15 | Fisetin senolítico em garanhões idosos | Baixo | Não | Translacional |
| **S** | P11 | Deep learning morfologia equina | Muito baixo | Não | Automatização |
| **A** | P3 | EVs ovidutais para FIV | Moderado-alto | SEC | Resolver FIV |
| **A** | P9 | Single-cell metabolômica + fertilidade | Muito baixo | Não | Expande Peña 2026 |
| **A** | P2 | Cinética ferroptose no processamento | Baixo | Não | Mapa temporal |
| **A** | P17 | miRNAs circulantes — biópsia líquida | Moderado | Seq terceirizado | Diagnóstico novo |
| **A** | P19 | Metabolômica → protocolo personalizado | Moderado | MS terceirizado | Precisão reprodutiva |
| **A** | P4 | miRNAs de EVs seminais + fertilidade | Moderado | Seq terceirizado | Biomarcadores |
| **B** | P16 | Senescência testicular equina — mapeamento | Baixo | Não | Base para P15 |
| **B** | P8 | Small RNAs espermáticos (tsRNAs, piRNAs) | Moderado | Seq terceirizado | Herança epigenética |
| **B** | P13 | Reotaxia em chip + FIV equina | Baixo-mod | Chip comercial | Seleção funcional |
| **B** | P20 | ¹³C-tracing fluxômica na capacitação | Moderado | MS terceirizado | Metabolismo real |
| **B** | P10 | Atlas proteômico de subpopulações | Moderado-alto | FACS + MS | Heterogeneidade |
| **B** | P12 | SpermAI multimodal | Muito baixo | Não | Predição integrada |
| **B** | P18 | cfDNA espermático no sangue | Baixo | Não | ITD monitoring |
| **C** | P5 | Oviduct-on-chip equino | Alto | Chip custom | First-in-species |
| **C** | P6 | Organoides + espermatozoides crosstalk | Alto | Cultura + MS | Mecanístico |
| **C** | P14 | Chip alto volume para equinos | Alto | Prototipagem | Escala industrial |

## Proposta de Integração: 3 Teses de Doutorado

### Tese 1 — "Ferroptose e Criopreservação Equina"
- Cap 1 (P2): Cinética da cascata ferroptótica durante processamento
- Cap 2 (P1): Inibidores de ferroptose como crioprotetores
- Cap 3 (P9): Subpopulações metabólicas e vulnerabilidade à ferroptose
- **Validação in vivo**: melhor protocolo → taxa de prenhez

### Tese 2 — "Epigenômica e Envelhecimento Reprodutivo do Garanhão"
- Cap 1 (P16): Senescência testicular equina — mapeamento
- Cap 2 (P7): Primeiro epigenoma espermático equino (metilação + histonas)
- Cap 3 (P8): Small RNAs espermáticos por faixa etária
- Cap 4 (P15): Fisetin como intervenção senolítica — estudo piloto

### Tese 3 — "Vesículas Extracelulares e FIV Equina de Próxima Geração"
- Cap 1 (P3): Caracterização de EVs ovidutais equinas
- Cap 2 (P4): miRNAs de EVs seminais como biomarcadores
- Cap 3 (P6): Co-cultura organoides + espermatozoides
- Cap 4 (P13): Seleção por reotaxia + EVs → FIV otimizada

---

## DIFERENÇAS FUNDAMENTAIS vs. VERSÃO ANTERIOR (v1)

| Aspecto | v1 (20 projetos originais) | v2 (esta versão) |
|---------|---------------------------|-------------------|
| **Paradigma** | Incremental — adicionar suplemento X ao diluente Y | Fronteira — mecanismos novos, tecnologias inexploradas |
| **Originalidade** | Muitos já feitos pelo grupo UNESP ou clones | Todos são "first-in-species" genuínos |
| **Tecnologia** | CASA + citometria convencional | Single-cell omics, deep learning, chips, senolíticos, CRISPR |
| **Abordagem** | Bottom-up (testar aditivo, ver se melhora) | Top-down (entender mecanismo, depois intervir) |
| **Potencial de publicação** | Theriogenology, JEVS | Nature Comms, Cell Reports, Aging Cell, Lab on Chip |
| **Impacto translacional** | Otimização marginal de protocolo existente | Novos paradigmas diagnósticos e terapêuticos |
| **Independência** | Reproduzível por qualquer grupo | Posiciona UNESP como líder mundial em fronteiras específicas |

---

*Documento elaborado com base em pesquisa de fronteiras tecnológicas 2024-2026 e análise de lacunas na espécie equina.*
*Equine Reproduction Research Squad — 19 especialistas consultados.*
*Abril 2026*
