 // Chame as funções para preencher as tabelas quando a página carregar
 window.onload = function () {
    fetchProfileData();
    fetchItems();
    fetchSpells();
    fetchAttributesData();
    fetchJournal();
  };

  function fetchProfileData() {
    // Substitua a URL abaixo pela sua URL de API
    idCharacter = localStorage.getItem('idCharacter');
    const apiUrl = `http://localhost:8080/characters/${idCharacter}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Seus detalhes de personagem aqui
        console.log(data);
        document.querySelector("#characterNameProfile").innerHTML = data.characterName;
        localStorage.setItem('characterName',data.characterName);

        document.querySelector("#alignmentProfile").innerHTML = data.alignment;
        localStorage.setItem('alignment',data.alignment);

        document.querySelector("#raceProfile").innerHTML = data.race;
        localStorage.setItem('race',data.race);

        document.querySelector("#classProfile").innerHTML = data.class_;
        localStorage.setItem('class_',data.class_);

        document.querySelector("#backgroundProfile").innerHTML = data.background;
        localStorage.setItem('background',data.background);

        document.querySelector("#levelProfile").innerHTML = data.level;
        localStorage.setItem('level',data.level);

        document.getElementById('features').textContent = data.features;
        localStorage.setItem('features',data.features);

        document.getElementById('gpProfile').textContent = data.gp;
        localStorage.setItem('gp',data.gp);

        document.getElementById('acProfile').textContent = data.ac;
        localStorage.setItem('ac',data.ac);



      })
      .catch(error => console.error('Erro ao obter dados do perfil:', error));
  }

  function fetchItems() {
    // Substitua a URL abaixo pela sua URL de API
    idCharacter = localStorage.getItem('idCharacter');
    const apiUrl = `http://localhost:8080/items/${idCharacter}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const itemsTableBody = document.getElementById('itemsTableBody');

        // Limpe a tabela antes de adicionar novos itens
        itemsTableBody.innerHTML = '';

        // Itere sobre os dados e preencha a tabela
        data.forEach(item => {
          const row = document.createElement('tr');
          row.innerHTML = `
                          <td class="item-name" data-toggle="modal" data-target="#descriptionModal" data-description="${item.description}">${item.name}</td>
                      `;
          itemsTableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Erro ao obter dados de Items:', error));
  }

  function fetchSpells() {
    // Substitua a URL abaixo pela sua URL de API
    idCharacter = localStorage.getItem('idCharacter');
    const apiUrl = `http://localhost:8080/spells/${idCharacter}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log("speel id: "+data.spell_id)

        const spellsTableBody = document.getElementById('spellsTableBody');

        // Limpe a tabela antes de adicionar novos itens
        spellsTableBody.innerHTML = '';

        // Itere sobre os dados e preencha a tabela
        data.forEach(spell => {
          const row = document.createElement('tr');
          row.innerHTML = `
                          <td class="spell-name" data-toggle="modal" data-target="#descriptionModal" data-description="${spell.description}" data-spell_id="${spell.spell_id}">${spell.name}</td>
                      `;
          spellsTableBody.appendChild(row);
        });
      })
      .catch(error => console.error('Erro ao obter dados de Spells:', error));
  }

  function fetchJournal() {
  // Substitua a URL abaixo pela sua URL de API
  idCharacter = localStorage.getItem('idCharacter');
  const apiUrl = `http://localhost:8080/journal/${idCharacter}`;

  fetch(apiUrl)
      .then(response => response.json()) // Altere para response.json()
      .then(data => {
          document.getElementById('journal').textContent = data[0].journal;
          console.log("journal: "+ data[0].journal) // Altere para data.journal
      })
      .catch(error => console.error('Erro ao obter dados do Journal:', error));
}


  // Exibir a descrição no modal ao clicar no nome do item ou spell
  $('#descriptionModal').on('show.bs.modal', function (event) {
    const button = $(event.relatedTarget);
    const description = button.data('description');
    const modal = $(this);
    modal.find('.modal-body #descriptionContent').text(description);
    spell_id = button.data('spell_id');
    //console.log(spell_id)
    localStorage.setItem('spell_id', spell_id);
    characterName = localStorage.getItem('characterName')
    console.log(characterName)
  });




  


      document.addEventListener('DOMContentLoaded', function() {
  var vidaMaxima = 100;
  var vidaAtual = 100;



  
});



function fetchAttributesData() {
    // Substitua a URL abaixo pela sua URL de API
    idCharacter = localStorage.getItem('idCharacter');
    const apiUrl = `http://localhost:8080/atributepoints/${idCharacter}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        // Seus detalhes de personagem aqui
        console.log("força: "+data[0].passive_perception);
        

        const attributes = {
          'Str 💪': data[0].strength,
          'Dex 🗡️': data[0].dexterity,
          'Const 💚': data[0].constitution,
          'Int 📘' : data[0].intelligence,
          'Wis ⌛': data[0].wisdom,
          'Cha 🎭': data[0].charisma,
          'Per 🔎': data[0].passivePerception,

          
      };
      const table = document.getElementById('attributesTable');

      for (const attribute in attributes) {
          const row = document.createElement('tr');
          const attributeCell = document.createElement('td');
          attributeCell.classList.add('class-attributes')
          attributeCell.textContent = attribute;
          const scoreCell = document.createElement('td');
          scoreCell.classList.add('class-score')
          scoreCell.textContent = attributes[attribute];
          const modifierCell = document.createElement('td');
          modifierCell.textContent = Math.floor((attributes[attribute] - 10) / 2);
          row.appendChild(attributeCell);
          row.appendChild(scoreCell);
          row.appendChild(modifierCell);
          table.appendChild(row);
      }



      })
      .catch(error => console.error('Erro ao obter dados do perfil:', error));
  }



  function deleteSpell() {
  // Pegar o spell_id do localStorage
  var spell_id = localStorage.getItem('spell_id');

  // Definir a URL da API
  var apiUrl = `http://localhost:8080/spells/${spell_id}`;

  // Fazer a requisição DELETE
  fetch(apiUrl, {
      method: 'DELETE',
  })
  .then(response => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
          window.location.reload()

      }
      return response.json();
  })
  .then(data => {
      console.log('Spell deletado com sucesso:', data);
      window.location.reload()
  })
  .catch(error => {
      console.error('Erro ao deletar o Spell:', error);
      window.location.reload()

  });
}


document.getElementById('informations').addEventListener('click', function() {
  // Coloque o código que você deseja executar aqui
  console.log('Você clicou no elemento com id "informations"');

  //gets do storage e atribuições nos campos do edit do modal

  document.getElementById('characterName').value = localStorage.getItem('characterName')
  document.getElementById('alignment').value = localStorage.getItem('alignment')
  document.getElementById('class').value = localStorage.getItem('class_')
  document.getElementById('level').value = localStorage.getItem('level')
  document.getElementById('ac').value = localStorage.getItem('ac')




  
  




});

