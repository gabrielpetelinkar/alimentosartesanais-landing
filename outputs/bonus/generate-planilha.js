const ExcelJS = require('exceljs');
const path = require('path');

(async () => {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'ORIZA Agropecuária, Educação e Alimentos';
  wb.created = new Date();

  // ============================================================
  // COLOR PALETTE (Obsidian Gold)
  // ============================================================
  const COLORS = {
    bgDark: '0A0A0A',
    bgMedium: '111111',
    bgTertiary: '1A1A1A',
    gold: 'D4A853',
    goldSoft: 'A08338',
    goldBg: '2A2210',
    textLight: 'FAF5EB',
    textSecondary: 'C4B99A',
    textMuted: '7A7260',
    inputBg: '1F1A0F',
    inputBorder: '3D3520',
    greenBg: '0F1A0F',
    greenText: '6CBF6C',
    redText: 'DC503C',
    white: 'FFFFFF',
    black: '000000',
  };

  // ============================================================
  // HELPER FUNCTIONS
  // ============================================================
  function fill(color) {
    return { type: 'pattern', pattern: 'solid', fgColor: { argb: color } };
  }

  function font(opts = {}) {
    return {
      name: opts.mono ? 'Courier New' : 'Calibri',
      size: opts.size || 11,
      bold: opts.bold || false,
      italic: opts.italic || false,
      color: { argb: opts.color || COLORS.textLight },
    };
  }

  function border(color = COLORS.inputBorder) {
    const side = { style: 'thin', color: { argb: color } };
    return { top: side, bottom: side, left: side, right: side };
  }

  function applyHeaderRow(ws, row, cols, bgColor = COLORS.bgTertiary) {
    cols.forEach((text, i) => {
      const cell = ws.getRow(row).getCell(i + 1);
      cell.value = text;
      cell.fill = fill(bgColor);
      cell.font = font({ bold: true, size: 10, color: COLORS.gold, mono: true });
      cell.alignment = { horizontal: 'center', vertical: 'middle' };
      cell.border = border(COLORS.goldSoft);
    });
    ws.getRow(row).height = 28;
  }

  function applySectionTitle(ws, row, text, mergeEnd = 4) {
    ws.mergeCells(row, 1, row, mergeEnd);
    const cell = ws.getRow(row).getCell(1);
    cell.value = text;
    cell.fill = fill(COLORS.bgMedium);
    cell.font = font({ bold: true, size: 14, color: COLORS.gold });
    cell.alignment = { horizontal: 'left', vertical: 'middle' };
    cell.border = border(COLORS.goldSoft);
    ws.getRow(row).height = 32;
  }

  function applySubtitle(ws, row, text, mergeEnd = 4) {
    ws.mergeCells(row, 1, row, mergeEnd);
    const cell = ws.getRow(row).getCell(1);
    cell.value = text;
    cell.fill = fill(COLORS.bgDark);
    cell.font = font({ bold: true, size: 11, color: COLORS.textSecondary });
    cell.alignment = { horizontal: 'left', vertical: 'middle' };
    ws.getRow(row).height = 24;
  }

  function inputCell(ws, row, col, defaultVal = 0) {
    const cell = ws.getRow(row).getCell(col);
    cell.value = defaultVal;
    cell.fill = fill(COLORS.inputBg);
    cell.font = font({ size: 11, color: COLORS.white });
    cell.border = border(COLORS.gold);
    cell.numFmt = defaultVal === 0 ? '#,##0.00' : '@';
    return cell;
  }

  function labelCell(ws, row, col, text) {
    const cell = ws.getRow(row).getCell(col);
    cell.value = text;
    cell.fill = fill(COLORS.bgDark);
    cell.font = font({ size: 10, color: COLORS.textSecondary });
    cell.alignment = { vertical: 'middle', wrapText: true };
    return cell;
  }

  function formulaCell(ws, row, col, formula, fmt = '#,##0.00') {
    const cell = ws.getRow(row).getCell(col);
    cell.value = { formula };
    cell.fill = fill(COLORS.bgTertiary);
    cell.font = font({ size: 11, color: COLORS.greenText, bold: true });
    cell.border = border(COLORS.inputBorder);
    cell.numFmt = fmt;
    return cell;
  }

  function darkRow(ws, row, numCols = 4) {
    for (let c = 1; c <= numCols; c++) {
      ws.getRow(row).getCell(c).fill = fill(COLORS.bgDark);
    }
  }

  // ============================================================
  // ABA 1: CUSTO DE PRODUÇÃO
  // ============================================================
  const ws1 = wb.addWorksheet('Custo de Produção', {
    properties: { tabColor: { argb: COLORS.gold } },
    views: [{ showGridLines: false }],
  });

  ws1.columns = [
    { width: 22 }, // A: Categoria
    { width: 38 }, // B: Item
    { width: 18 }, // C: Custo lote (R$)
    { width: 20 }, // D: Custo por unidade
  ];

  // Row 1-2: Title
  let r = 1;
  applySectionTitle(ws1, r, 'CUSTO DE PRODUÇÃO POR PRODUTO'); r++;
  darkRow(ws1, r); r++;

  // Row 3-4: Product name and quantity
  labelCell(ws1, r, 1, 'PRODUTO:');
  const prodCell = inputCell(ws1, r, 2, '');
  prodCell.numFmt = '@';
  ws1.mergeCells(r, 2, r, 4);
  r++;

  labelCell(ws1, r, 1, 'Rendimento por lote:');
  labelCell(ws1, r, 2, '(unidades)');
  inputCell(ws1, r, 3, 0).numFmt = '#,##0';
  const qtyRow = r; // Save for formulas
  r++;
  darkRow(ws1, r); r++;

  // Row 6: Headers
  applyHeaderRow(ws1, r, ['CATEGORIA', 'ITEM', 'CUSTO DO LOTE (R$)', 'CUSTO POR UNIDADE']);
  const headerRow = r;
  r++;

  // Rows 7-20: Cost items
  const costItems = [
    ['MATÉRIA-PRIMA', 'Ingrediente principal (ex: pimenta)'],
    ['MATÉRIA-PRIMA', 'Ingrediente 2 (ex: açúcar)'],
    ['MATÉRIA-PRIMA', 'Ingrediente 3 (ex: vinagre)'],
    ['MATÉRIA-PRIMA', 'Ingrediente 4'],
    ['MATÉRIA-PRIMA', 'Ingrediente 5'],
    ['EMBALAGEM', 'Pote / vidro / frasco'],
    ['EMBALAGEM', 'Rótulo / etiqueta'],
    ['EMBALAGEM', 'Tampa / lacre'],
    ['EMBALAGEM', 'Caixa / embalagem externa'],
    ['ENERGIA', 'Gás (proporcional ao lote)'],
    ['ENERGIA', 'Energia elétrica (proporcional)'],
    ['MÃO DE OBRA', 'Horas trabalhadas × valor/hora'],
    ['OUTROS', 'Transporte / frete de insumos'],
    ['OUTROS', 'Perdas estimadas (5-10%)'],
  ];

  const firstCostRow = r;
  costItems.forEach(([cat, item]) => {
    labelCell(ws1, r, 1, cat);
    labelCell(ws1, r, 2, item);
    inputCell(ws1, r, 3, 0);
    formulaCell(ws1, r, 4, `IF(C${qtyRow}=0,0,C${r}/C${qtyRow})`);
    ws1.getRow(r).height = 22;
    r++;
  });
  const lastCostRow = r - 1;

  // Totals
  darkRow(ws1, r); r++;
  labelCell(ws1, r, 1, '');
  labelCell(ws1, r, 2, '');
  ws1.getRow(r).getCell(3).value = 'TOTAL DO LOTE:';
  ws1.getRow(r).getCell(3).fill = fill(COLORS.bgMedium);
  ws1.getRow(r).getCell(3).font = font({ bold: true, size: 11, color: COLORS.gold });
  formulaCell(ws1, r, 4, `SUM(C${firstCostRow}:C${lastCostRow})`);
  ws1.getRow(r).getCell(4).font = font({ bold: true, size: 12, color: COLORS.gold });
  ws1.getRow(r).height = 28;
  const totalLoteRow = r;
  r++;

  labelCell(ws1, r, 1, '');
  labelCell(ws1, r, 2, '');
  ws1.getRow(r).getCell(3).value = 'CUSTO POR UNIDADE:';
  ws1.getRow(r).getCell(3).fill = fill(COLORS.bgMedium);
  ws1.getRow(r).getCell(3).font = font({ bold: true, size: 11, color: COLORS.gold });
  formulaCell(ws1, r, 4, `IF(C${qtyRow}=0,0,D${totalLoteRow}/C${qtyRow})`);
  ws1.getRow(r).getCell(4).font = font({ bold: true, size: 13, color: COLORS.greenText });
  ws1.getRow(r).height = 30;
  const cpuRow1 = r;

  // ============================================================
  // ABA 2: FORMAÇÃO DE PREÇO
  // ============================================================
  const ws2 = wb.addWorksheet('Formação de Preço', {
    properties: { tabColor: { argb: COLORS.gold } },
    views: [{ showGridLines: false }],
  });

  ws2.columns = [
    { width: 36 }, // A: Label
    { width: 18 }, // B: Valor
    { width: 22 }, // C: Fórmula/Info
    { width: 42 }, // D: Explicação
  ];

  r = 1;
  applySectionTitle(ws2, r, 'FORMAÇÃO DE PREÇO'); r++;
  darkRow(ws2, r); r++;

  // CPU reference
  labelCell(ws2, r, 1, 'Custo por unidade (CPU)');
  inputCell(ws2, r, 2, 0);
  labelCell(ws2, r, 3, '← copie de "Custo de Produção"');
  labelCell(ws2, r, 4, 'Custo total de produção por unidade');
  const cpuRow = r;
  r++;
  darkRow(ws2, r); r++;

  // METHOD 1: MARKUP
  applySubtitle(ws2, r, 'MÉTODO 1: MARKUP (multiplicador sobre o custo)'); r++;

  labelCell(ws2, r, 1, 'Markup desejado');
  inputCell(ws2, r, 2, 2.5).numFmt = '0.0';
  labelCell(ws2, r, 3, 'Ajuste: 2.0 a 4.0');
  labelCell(ws2, r, 4, '2.0 = dobro do custo | 3.0 = triplo | 4.0 = quádruplo');
  const markupRow = r;
  r++;

  labelCell(ws2, r, 1, 'PREÇO PELO MARKUP');
  formulaCell(ws2, r, 2, `B${cpuRow}*B${markupRow}`);
  ws2.getRow(r).getCell(2).font = font({ bold: true, size: 13, color: COLORS.greenText });
  labelCell(ws2, r, 3, '= Custo × Markup');
  const precoMarkupRow = r;
  r++;
  darkRow(ws2, r); r++;

  // METHOD 2: MARGEM
  applySubtitle(ws2, r, 'MÉTODO 2: MARGEM DE LUCRO (% sobre o preço de venda)'); r++;

  labelCell(ws2, r, 1, 'Margem desejada (%)');
  inputCell(ws2, r, 2, 60).numFmt = '0';
  labelCell(ws2, r, 3, 'Ajuste: 40% a 70%');
  labelCell(ws2, r, 4, '% do preço final que é lucro bruto');
  const margemRow = r;
  r++;

  labelCell(ws2, r, 1, 'PREÇO PELA MARGEM');
  formulaCell(ws2, r, 2, `IF(B${margemRow}>=100,0,B${cpuRow}/(1-(B${margemRow}/100)))`);
  ws2.getRow(r).getCell(2).font = font({ bold: true, size: 13, color: COLORS.greenText });
  labelCell(ws2, r, 3, '= Custo / (1 - margem%)');
  const precoMargemRow = r;
  r++;
  darkRow(ws2, r); r++;

  // METHOD 3: VALOR
  applySubtitle(ws2, r, 'MÉTODO 3: PREÇO BASEADO EM VALOR (recomendado)'); r++;

  labelCell(ws2, r, 1, 'Quanto o cliente pagaria?');
  inputCell(ws2, r, 2, 0);
  labelCell(ws2, r, 4, 'Pesquise: quanto custa o similar no mercado?');
  r++;
  labelCell(ws2, r, 1, 'Preço médio dos concorrentes');
  inputCell(ws2, r, 2, 0);
  labelCell(ws2, r, 4, 'Veja a aba "Comparativo"');
  r++;
  labelCell(ws2, r, 1, 'Seu preço baseado em valor');
  inputCell(ws2, r, 2, 0);
  labelCell(ws2, r, 4, '+10-30% se tem diferencial | -10-20% se está entrando no mercado');
  const precoValorRow = r;
  r++;
  darkRow(ws2, r); r++;

  // COMPARISON TABLE
  applySubtitle(ws2, r, 'COMPARAÇÃO DOS 3 MÉTODOS'); r++;
  applyHeaderRow(ws2, r, ['MÉTODO', 'PREÇO CALCULADO', 'MARGEM BRUTA (%)', 'LUCRO POR UNIDADE']); r++;

  // Markup row
  labelCell(ws2, r, 1, 'Markup');
  formulaCell(ws2, r, 2, `B${precoMarkupRow}`);
  formulaCell(ws2, r, 3, `IF(B${precoMarkupRow}=0,0,((B${precoMarkupRow}-B${cpuRow})/B${precoMarkupRow})*100)`, '0.0"%"');
  formulaCell(ws2, r, 4, `B${precoMarkupRow}-B${cpuRow}`);
  r++;

  // Margem row
  labelCell(ws2, r, 1, 'Margem');
  formulaCell(ws2, r, 2, `B${precoMargemRow}`);
  formulaCell(ws2, r, 3, `IF(B${precoMargemRow}=0,0,((B${precoMargemRow}-B${cpuRow})/B${precoMargemRow})*100)`, '0.0"%"');
  formulaCell(ws2, r, 4, `B${precoMargemRow}-B${cpuRow}`);
  r++;

  // Valor row
  labelCell(ws2, r, 1, 'Valor');
  formulaCell(ws2, r, 2, `B${precoValorRow}`);
  formulaCell(ws2, r, 3, `IF(B${precoValorRow}=0,0,((B${precoValorRow}-B${cpuRow})/B${precoValorRow})*100)`, '0.0"%"');
  formulaCell(ws2, r, 4, `B${precoValorRow}-B${cpuRow}`);
  r++;
  darkRow(ws2, r); r++;

  // Recommendation
  ws2.mergeCells(r, 1, r, 4);
  const recCell = ws2.getRow(r).getCell(1);
  recCell.value = 'RECOMENDAÇÃO: Use o MAIOR valor entre os 3 métodos. Se o preço por valor é o maior, ótimo — o mercado sustenta. Se o preço por markup é o maior, revise sua proposta de valor.';
  recCell.fill = fill(COLORS.goldBg);
  recCell.font = font({ size: 10, color: COLORS.gold, italic: true });
  recCell.alignment = { wrapText: true, vertical: 'middle' };
  ws2.getRow(r).height = 36;

  // ============================================================
  // ABA 3: SIMULADOR DE FATURAMENTO
  // ============================================================
  const ws3 = wb.addWorksheet('Simulador de Faturamento', {
    properties: { tabColor: { argb: COLORS.gold } },
    views: [{ showGridLines: false }],
  });

  ws3.columns = [
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 18 },
    { width: 14 },
  ];

  r = 1;
  applySectionTitle(ws3, r, 'SIMULADOR DE FATURAMENTO MENSAL', 7); r++;

  // Inputs
  darkRow(ws3, r, 7); r++;
  labelCell(ws3, r, 1, 'Preço unitário (R$):');
  inputCell(ws3, r, 2, 0);
  labelCell(ws3, r, 3, '← copie da aba anterior');
  const precoSimRow = r;
  r++;
  labelCell(ws3, r, 1, 'Custo unitário (R$):');
  inputCell(ws3, r, 2, 0);
  labelCell(ws3, r, 3, '← copie da aba "Custo"');
  const custoSimRow = r;
  r++;
  darkRow(ws3, r, 7); r++;

  applyHeaderRow(ws3, r, ['CENÁRIO', 'UNID./MÊS', 'PREÇO UNIT.', 'FATURAMENTO', 'CUSTO TOTAL', 'LUCRO BRUTO', 'MARGEM %'], COLORS.bgTertiary);
  const simHeaderRow = r;
  r++;

  const scenarios = [
    ['Conservador', 50],
    ['Realista', 150],
    ['Otimista', 300],
  ];

  scenarios.forEach(([name, defaultQty]) => {
    labelCell(ws3, r, 1, name);
    inputCell(ws3, r, 2, defaultQty).numFmt = '#,##0';
    formulaCell(ws3, r, 3, `B${precoSimRow}`, '#,##0.00');
    formulaCell(ws3, r, 4, `B${r}*C${r}`, 'R$ #,##0.00');
    formulaCell(ws3, r, 5, `B${r}*B${custoSimRow}`, 'R$ #,##0.00');
    formulaCell(ws3, r, 6, `D${r}-E${r}`, 'R$ #,##0.00');
    formulaCell(ws3, r, 7, `IF(D${r}=0,0,(F${r}/D${r})*100)`, '0.0"%"');
    ws3.getRow(r).height = 24;
    r++;
  });

  // ============================================================
  // ABA 4: COMPARATIVO DE CONCORRENTES
  // ============================================================
  const ws4 = wb.addWorksheet('Comparativo', {
    properties: { tabColor: { argb: COLORS.gold } },
    views: [{ showGridLines: false }],
  });

  ws4.columns = [
    { width: 22 },
    { width: 24 },
    { width: 16 },
    { width: 16 },
    { width: 18 },
    { width: 28 },
    { width: 20 },
  ];

  r = 1;
  applySectionTitle(ws4, r, 'COMPARATIVO DE CONCORRENTES', 7); r++;
  darkRow(ws4, r, 7); r++;

  applyHeaderRow(ws4, r, ['CONCORRENTE', 'PRODUTO', 'PESO/VOL.', 'PREÇO (R$)', 'PREÇO/100g', 'DIFERENCIAL', 'ONDE VENDE'], COLORS.bgTertiary);
  r++;

  for (let i = 1; i <= 5; i++) {
    labelCell(ws4, r, 1, `Concorrente ${i}`);
    inputCell(ws4, r, 2, '').numFmt = '@';
    inputCell(ws4, r, 3, 0).numFmt = '#,##0';
    inputCell(ws4, r, 4, 0);
    formulaCell(ws4, r, 5, `IF(C${r}=0,0,D${r}/(C${r}/100))`, '#,##0.00');
    inputCell(ws4, r, 6, '').numFmt = '@';
    inputCell(ws4, r, 7, '').numFmt = '@';
    r++;
  }

  // "Seu produto" row highlighted
  const seuRow = r;
  ws4.getRow(r).getCell(1).value = 'SEU PRODUTO';
  ws4.getRow(r).getCell(1).fill = fill(COLORS.goldBg);
  ws4.getRow(r).getCell(1).font = font({ bold: true, size: 11, color: COLORS.gold });
  inputCell(ws4, r, 2, '').numFmt = '@';
  inputCell(ws4, r, 3, 0).numFmt = '#,##0';
  inputCell(ws4, r, 4, 0);
  formulaCell(ws4, r, 5, `IF(C${r}=0,0,D${r}/(C${r}/100))`, '#,##0.00');
  inputCell(ws4, r, 6, '').numFmt = '@';
  inputCell(ws4, r, 7, '').numFmt = '@';
  ws4.getRow(r).getCell(1).border = border(COLORS.gold);

  // ============================================================
  // ABA 5: REFERÊNCIAS DE MARKUP
  // ============================================================
  const ws5 = wb.addWorksheet('Referências de Markup', {
    properties: { tabColor: { argb: COLORS.gold } },
    views: [{ showGridLines: false }],
  });

  ws5.columns = [
    { width: 24 },
    { width: 18 },
    { width: 22 },
    { width: 18 },
    { width: 42 },
  ];

  r = 1;
  applySectionTitle(ws5, r, 'REFERÊNCIAS DE MARKUP POR CATEGORIA', 5); r++;
  darkRow(ws5, r, 5); r++;

  applyHeaderRow(ws5, r, ['CATEGORIA', 'MARKUP MÍN.', 'MARKUP RECOMENDADO', 'MARKUP PREMIUM', 'OBSERVAÇÃO'], COLORS.bgTertiary);
  r++;

  const markupData = [
    ['Geleias e doces', 2.0, 2.5, 3.5, 'Premium: ingredientes raros ou orgânicos'],
    ['Queijos artesanais', 2.0, 3.0, 4.0, 'Maturados e com IG podem ter markup maior'],
    ['Molhos e temperos', 2.5, 3.0, 4.0, 'Pimentas especiais: markup alto'],
    ['Conservas', 2.0, 2.5, 3.0, 'Em azeite premium: markup maior'],
    ['Pães e fermentados', 1.8, 2.5, 3.0, 'Massa madre e longa fermentação: premium'],
    ['Mel e derivados', 2.0, 2.5, 3.5, 'Mel com IG ou orgânico: premium'],
    ['Embutidos', 2.0, 2.5, 3.5, 'Curados e defumados: markup maior'],
  ];

  markupData.forEach(([cat, min, rec, prem, obs]) => {
    labelCell(ws5, r, 1, cat);
    ws5.getRow(r).getCell(2).value = min;
    ws5.getRow(r).getCell(2).fill = fill(COLORS.bgTertiary);
    ws5.getRow(r).getCell(2).font = font({ size: 11, color: COLORS.textSecondary });
    ws5.getRow(r).getCell(2).numFmt = '0.0';
    ws5.getRow(r).getCell(2).alignment = { horizontal: 'center' };

    ws5.getRow(r).getCell(3).value = rec;
    ws5.getRow(r).getCell(3).fill = fill(COLORS.goldBg);
    ws5.getRow(r).getCell(3).font = font({ bold: true, size: 12, color: COLORS.gold });
    ws5.getRow(r).getCell(3).numFmt = '0.0';
    ws5.getRow(r).getCell(3).alignment = { horizontal: 'center' };
    ws5.getRow(r).getCell(3).border = border(COLORS.goldSoft);

    ws5.getRow(r).getCell(4).value = prem;
    ws5.getRow(r).getCell(4).fill = fill(COLORS.bgTertiary);
    ws5.getRow(r).getCell(4).font = font({ size: 11, color: COLORS.textSecondary });
    ws5.getRow(r).getCell(4).numFmt = '0.0';
    ws5.getRow(r).getCell(4).alignment = { horizontal: 'center' };

    labelCell(ws5, r, 5, obs);
    ws5.getRow(r).height = 24;
    r++;
  });

  // TIPS
  r += 2;
  applySectionTitle(ws5, r, 'DICAS DE PRECIFICAÇÃO', 5); r++;
  darkRow(ws5, r, 5); r++;

  const tips = [
    'NUNCA precifique apenas pelo custo. O cliente paga pelo VALOR percebido.',
    'Produto artesanal NÃO compete por preço. Barato demais desvaloriza.',
    'Teste preços: aumente 20% e meça o impacto. Muitas vezes a demanda NÃO cai.',
    'Embalagem premium permite preço premium. Invista nos rótulos.',
    'Edições limitadas e sazonais podem ter markup de 3x a 5x.',
    'Incluir a história do produto (terroir, processo) justifica preço maior.',
    'Feiras e eventos permitem preço 10-30% acima do online.',
  ];

  tips.forEach((tip, i) => {
    ws5.mergeCells(r, 1, r, 5);
    const cell = ws5.getRow(r).getCell(1);
    cell.value = `${i + 1}. ${tip}`;
    cell.fill = fill(i % 2 === 0 ? COLORS.bgDark : COLORS.bgMedium);
    cell.font = font({ size: 10, color: COLORS.textSecondary });
    cell.alignment = { wrapText: true, vertical: 'middle' };
    ws5.getRow(r).height = 28;
    r++;
  });

  // ============================================================
  // SAVE
  // ============================================================
  const outputPath = path.resolve(__dirname, 'Bonus-2-Planilha-Precificacao-ORIZA.xlsx');
  await wb.xlsx.writeFile(outputPath);
  console.log(`Excel generated: ${outputPath}`);
})();
