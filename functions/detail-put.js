document.getElementById('informations').addEventListener('click', function () {


  document.getElementById('characterName').value = localStorage.getItem('characterName')
  document.getElementById('alignment').value = localStorage.getItem('alignment')
  document.getElementById('class').value = localStorage.getItem('class_')
  document.getElementById('level').value = localStorage.getItem('level')
  document.getElementById('ac').value = localStorage.getItem('ac')
  document.getElementById('gp').value = localStorage.getItem('gp')

  document.getElementById('editCharacterButton').addEventListener('click', function () {

    var nomeEdicao = document.getElementById('characterName').value;
    var alignmentEdicao = document.getElementById('alignment').value;
    var classEdicao = document.getElementById('class').value;
    var levelEdicao = document.getElementById('level').value;
    var acEdicao = document.getElementById('ac').value;
    var gpEdicao = document.getElementById('gp').value;


    idCharacter = localStorage.getItem('idCharacter');

    // URL da API ou servidor para onde você está enviando a requisição
    const url = `http://localhost:8080/characters/${idCharacter}`;

    // Corpo da requisição (pode ser um objeto JavaScript)
    const corpoRequisicao = {
      "alignment": `${alignmentEdicao}`,
      "class_": `${classEdicao}`,
      "level": `${levelEdicao}`,
      "characterName": `${nomeEdicao}`,
      "ac": `${acEdicao}`,
      "gp": `${gpEdicao}`

    };

    // Configurações da requisição
    const configuracoes = {
      method: 'PUT', // Método HTTP
      headers: {
        'Content-Type': 'application/json' // Tipo de conteúdo do corpo da requisição
        // Outros headers, se necessário
      },
      body: JSON.stringify(corpoRequisicao) // Converte o corpo para JSON
    };

    // Realiza a requisição Fetch
    fetch(url, configuracoes)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
        }
        return response.json(); // Se a resposta estiver em JSON
        // Outras opções: response.text(), response.blob(), etc.
      })
      .then(data => {
        console.log('Resposta da API:', data);
        // Faça algo com os dados recebidos
      })
      .catch(error => {
        console.error('Erro na requisição:', error);
        // Trate o erro conforme necessário
      });

    window.location.reload()
  });
});



