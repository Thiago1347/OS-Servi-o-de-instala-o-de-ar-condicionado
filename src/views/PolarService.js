const form = document.getElementById('manutForm');
const output = document.getElementById('output');

// Função para formatar datas em pt-BR
const formatDate = (d) => {
  if (!d) return '';
  const dt = new Date(d);
  return dt.toLocaleDateString('pt-BR');
};

// Função para formatar checklist com status e observação
function formatChecklist(item, ok, naoOk, obs) {
  let status = '';
  if (ok) status = 'OK';
  else if (naoOk) status = 'Não OK';
  else status = 'Não verificado';
  return `${item}: ${status}${obs ? ' (' + obs + ')' : ''}`;
}

// Evento de submit para gerar a ficha de manutenção
form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Captura valores dos campos
  const marca = document.getElementById('marca').value.trim();
  const modelo = document.getElementById('modelo').value.trim();
  const capacidade = document.getElementById('capacidade').value.trim();
  const numeroSerie = document.getElementById('numeroSerie').value.trim();
  const tipoEquip = document.getElementById('tipoEquip').value.trim();

  const tipoManut = document.getElementById('inputUn').value;

  const descricao = document.getElementById('descricao').value.trim();
  const recomendacoes = document.getElementById('recomendacoes').value.trim();

  const estadoGeralOk = document.querySelector('input[name="estadoGeralOk"]').checked;
  const estadoGeralNaoOk = document.querySelector('input[name="estadoGeralNaoOk"]').checked;
  const obsEstadoGeral = document.querySelector('input[name="obsEstadoGeral"]').value.trim();

  const filtroOk = document.querySelector('input[name="filtroOk"]').checked;
  const filtroNaoOk = document.querySelector('input[name="filtroNaoOk"]').checked;
  const obsFiltro = document.querySelector('input[name="obsFiltro"]').value.trim();

  const vazamentosOk = document.querySelector('input[name="vazamentosOk"]').checked;
  const vazamentosNaoOk = document.querySelector('input[name="vazamentosNaoOk"]').checked;
  const obsVazamentos = document.querySelector('input[name="obsVazamentos"]').value.trim();

  const nomeTecnico = document.getElementById('nomeTecnico').value.trim();
  const empresa = document.getElementById('empresa').value.trim();
  const cnpj = document.getElementById('cnpj').value.trim();
  const data = document.getElementById('data').value;
  const assinaturaTecnico = document.getElementById('assinaturaTecnico').value.trim();

  const assinaturaCliente = document.getElementById('assinaturaCliente').value.trim();
  const dataCliente = document.getElementById('dataCliente').value;

  // Monta o texto da ficha
  const outputText = `
Ficha de Manutenção - Ar Condicionado

Marca: ${marca}
Modelo: ${modelo}
Capacidade (BTUs): ${capacidade}
Número de Série: ${numeroSerie}
Tipo: ${tipoEquip}

Tipo de Manutenção: ${tipoManut}

Checklist de Manutenção:
- ${formatChecklist('Estado geral do equipamento', estadoGeralOk, estadoGeralNaoOk, obsEstadoGeral)}
- ${formatChecklist('Limpeza do filtro de ar', filtroOk, filtroNaoOk, obsFiltro)}
- ${formatChecklist('Verificação de vazamentos', vazamentosOk, vazamentosNaoOk, obsVazamentos)}

Descrição dos Serviços Realizados:
${descricao || '-'}

Recomendações Técnicas:
${recomendacoes || '-'}

Técnico Responsável:
Nome: ${nomeTecnico}
Empresa: ${empresa || '-'}
CNPJ: ${cnpj || '-'}
Data: ${formatDate(data)}
Assinatura: ${assinaturaTecnico}

Assinatura do Cliente: ${assinaturaCliente}
Data: ${formatDate(dataCliente)}
  `.trim();

  output.textContent = outputText;
});

// Botão Editar - apenas alerta para editar no formulário
document.getElementById('btnEditar').addEventListener('click', function() {
  alert("Modo de edição ativado. Altere os campos desejados e clique em 'Gerar Ficha' novamente.");
});

// Botão Excluir - limpa formulário e saída após confirmação
document.getElementById('btnExcluir').addEventListener('click', function() {
  if (confirm("Tem certeza que deseja excluir a ficha atual?")) {
    form.reset();
    output.textContent = '';
  }
});

// Botão Limpar - limpa formulário e saída sem confirmação
document.getElementById('btnLimpar').addEventListener('click', function() {
  form.reset();
  output.textContent = '';
});
