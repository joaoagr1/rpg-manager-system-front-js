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



document.getElementById('tableAttributes').addEventListener('click', function(){
  idCharacter = localStorage.getItem('idCharacter');
  const apiUrl = `http://localhost:8080/atributepoints/${idCharacter}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      document.getElementById('strEdit').value = data[0].strength;
      document.getElementById('dexEdit').value = data[0].dexterity;
      document.getElementById('constEdit').value = data[0].constitution;
      document.getElementById('intEdit').value = data[0].intelligence;
      document.getElementById('wisEdit').value = data[0].wisdom;
      document.getElementById('chaEdit').value = data[0].charisma;
      document.getElementById('perEdit').value = data[0].passivePerception;








    })
 })


 document.getElementById('editAttributesButton').addEventListener('click', function(){
  strRequest = document.getElementById('strEdit').value;
  dexRequest = document.getElementById('dexEdit').value;
  constRequest = document.getElementById('constEdit').value;
  intRequest = document.getElementById('intEdit').value;
  wisRequest = document.getElementById('wisEdit').value;
  chaRequest = document.getElementById('chaEdit').value;
  perRequest = document.getElementById('perEdit').value;



// Defina o ID do personagem
var characterId = localStorage.getItem('idCharacter');  // Substitua pelo ID real do personagem

// URL da API
const apiUrl = `http://localhost:8080/atributepoints/${characterId}`;

// Corpo da requisição
const requestBody = {
  strength: strRequest,
  passivePerception: perRequest,
  dexterity: dexRequest,
  constitution: constRequest,
  intelligence: intRequest,
  wisdom: wisRequest,
  charisma: chaRequest
};

// Configurações da requisição
const requestOptions = {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(requestBody)
};

// Realiza a requisição
fetch(apiUrl, requestOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log('Requisição bem-sucedida. Resposta:', data);
    location.reload();
  })
  .catch(error => {
    console.error('Erro na requisição:', error);
  });







})