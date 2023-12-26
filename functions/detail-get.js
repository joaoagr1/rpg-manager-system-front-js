// Functions for Populating Fields on Page Load
window.onload = function () {
  fetchProfileData();
  fetchItems();
  fetchSpells();
  fetchAttributesData();
  fetchJournal();
};




function fetchProfileData() {
  idCharacter = localStorage.getItem('idCharacter');
  const apiUrl = `http://localhost:8080/characters/${idCharacter}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      document.querySelector("#characterNameProfile").innerHTML = data.characterName;
      localStorage.setItem('characterName', data.characterName);

      document.querySelector("#alignmentProfile").innerHTML = data.alignment;
      localStorage.setItem('alignment', data.alignment);

      document.querySelector("#raceProfile").innerHTML = data.race;
      localStorage.setItem('race', data.race);

      document.querySelector("#classProfile").innerHTML = data.class_;
      localStorage.setItem('class_', data.class_);

      document.querySelector("#backgroundProfile").innerHTML = data.background;
      localStorage.setItem('background', data.background);

      document.querySelector("#levelProfile").innerHTML = data.level;
      localStorage.setItem('level', data.level);

      document.getElementById('features').textContent = data.features;
      localStorage.setItem('features', data.features);

      document.getElementById('gpProfile').textContent = data.gp;
      localStorage.setItem('gp', data.gp);

      document.getElementById('acProfile').textContent = data.ac;
      localStorage.setItem('ac', data.ac);

    })
    .catch(error => console.error('Erro ao obter dados do perfil:', error));
}





function fetchItems() {
  idCharacter = localStorage.getItem('idCharacter');
  const apiUrl = `http://localhost:8080/items/${idCharacter}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const itemsTableBody = document.getElementById('itemsTableBody');

      itemsTableBody.innerHTML = '';

      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
                            <td class="item-name" data-toggle="modal" data-target="#descriptionModal" data-characteritems_id="${item.characteritems_id}" data-description="${item.description}">${item.name}</td>
                        `;
        itemsTableBody.appendChild(row);
      });
    })
    .catch(error => console.error('Erro ao obter dados de Items:', error));
}



function fetchSpells() {
  idCharacter = localStorage.getItem('idCharacter');
  const apiUrl = `http://localhost:8080/spells/${idCharacter}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log("speel id: " + data.spell_id)

      const spellsTableBody = document.getElementById('spellsTableBody');

      spellsTableBody.innerHTML = '';

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
  idCharacter = localStorage.getItem('idCharacter');
  const apiUrl = `http://localhost:8080/journal/${idCharacter}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById('journal').textContent = data[0].journal;
      console.log("journal: " + data[0].journal)
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
  item_id = button.data('characteritems_id');
  console.log(spell_id)
  console.log(item_id)

  localStorage.setItem('spell_id', spell_id);
  localStorage.setItem('item_id', item_id)
  characterName = localStorage.getItem('characterName')
  console.log(characterName)
});




function fetchAttributesData() {
  // Substitua a URL abaixo pela sua URL de API
  idCharacter = localStorage.getItem('idCharacter');
  const apiUrl = `http://localhost:8080/atributepoints/${idCharacter}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Seus detalhes de personagem aqui
      console.log("força: " + data[0].passive_perception);


      const attributes = {
        'Str 💪': data[0].strength,
        'Dex 🗡️': data[0].dexterity,
        'Const 💚': data[0].constitution,
        'Int 📘': data[0].intelligence,
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