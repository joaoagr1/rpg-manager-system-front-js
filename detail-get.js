// Functions for Populating Fields on Page Load
window.onload = function () {
  fetchSkills();
  fetchProfileData();
  fetchItems();
  fetchSpells();
  fetchAttributesData();
  fetchProficiency()
  fetchJournal();

};


idCharacter = localStorage.getItem('idCharacter');
const endpoint = `https://thankful-bone-production.up.railway.app/characters/foto/${idCharacter}`;

// Referencie a tag <img> pelo ID
const imgElement = document.getElementById('fotoPersonagem');

// Faça uma requisição para o endpoint
fetch(endpoint)
  .then(response => {
    if (response.ok) {
      // Se a resposta for bem-sucedida, defina a src da imagem como a URL retornada
      imgElement.src = response.url;
    } else {
      // Se a resposta não for encontrada (404), defina a src da imagem como a URL padrão
      imgElement.src = '../assets/images/default-avatar-img.jpg';
    }
  })
  .catch(error => {
    console.error('Erro ao carregar a imagem:', error);
    // Em caso de erro, defina a src da imagem como a URL padrão
    imgElement.src = '../assets/images/default-avatar-img.jpg';
  });


function fetchProfileData() {
  idCharacter = localStorage.getItem('idCharacter');
  const apiUrl = `https://thankful-bone-production.up.railway.app/characters/${idCharacter}`;

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
      document.getElementById('editFeatures').value = data.features;


      document.getElementById('gpProfile').textContent = data.gp;
      localStorage.setItem('gp', data.gp);

      document.getElementById('acProfile').textContent = data.ac;
      localStorage.setItem('ac', data.ac);

    })
    .catch(error => console.error('Erro ao obter dados do perfil:', error));
}





function fetchItems() {
  idCharacter = localStorage.getItem('idCharacter');
  const apiUrl = `https://thankful-bone-production.up.railway.app/items/${idCharacter}`;

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
  const apiUrl = `https://thankful-bone-production.up.railway.app/spells/${idCharacter}`;

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
  const apiUrl = `https://thankful-bone-production.up.railway.app/journal/${idCharacter}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      document.getElementById('journal').textContent = data[0].journal;
      console.log("journal: " + data[0].journal)
      document.getElementById('editJournal').value = data[0].journal
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
  const apiUrl = `https://thankful-bone-production.up.railway.app/atributepoints/${idCharacter}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Seus detalhes de personagem aqui
      console.log("força: " + data[0].passive_perception);


      const attributes = {
        'Str 💪': data[0].strength,
        'Dex 🎯': data[0].dexterity,
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


function fetchProficiency() {
  var level = localStorage.getItem('level');
  var proficiencyBonus;

  if (level > 0 && level <= 5) {
    proficiencyBonus = 2;
  } else if (level > 5 && level <= 9) {
    proficiencyBonus = 3;
  }

  document.getElementById('profProfile').textContent = proficiencyBonus;
}


function fetchSkills() {
  console.log("ARCANA: ")


  idCharacter = localStorage.getItem('idCharacter');
  const apiUrl = `https://thankful-bone-production.up.railway.app:8080/skills/${idCharacter}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

      document.getElementById('acrobaticsSkill').textContent = data[0].acrobatics;
      document.getElementById('acrobaticsSkillEdit').value = data[0].acrobatics;

      document.getElementById('animal-handingSkill').textContent = data[0].animal_Handling;
      document.getElementById('animalHandlingSkillEdit').value = data[0].animal_Handling;

      document.getElementById('arcanaSkill').textContent = data[0].arcana;
      document.getElementById('arcanaSkillEdit').value = data[0].arcana;


      document.getElementById('athleticsSkill').textContent = data[0].athletics;
      document.getElementById('athleticsSkillEdit').value = data[0].animal_Handling;

      document.getElementById('deceptionSkill').textContent = data[0].deception;
      document.getElementById('deceptionSkillEdit').value = data[0].deception;

      document.getElementById('histoySkill').textContent = data[0].history;
      document.getElementById('histoySkillEdit').value = data[0].history;

      document.getElementById('insightSkill').textContent = data[0].insight;
      document.getElementById('insightSkillEdit').value = data[0].insight;

      document.getElementById('intimidationtSkill').textContent = data[0].intimidation;
      document.getElementById('intimidationtSkillEdit').value = data[0].intimidation;

      document.getElementById('investigationSkill').textContent = data[0].investigation;
      document.getElementById('investigationSkillEdit').value = data[0].investigation;

      document.getElementById('medicineSkill').textContent = data[0].medicine;
      document.getElementById('medicineSkillEdit').value = data[0].medicine;

      document.getElementById('natureSkill').textContent = data[0].nature;
      document.getElementById('natureSkillEdit').value = data[0].nature;

      document.getElementById('perceptionSkill').textContent = data[0].perception;
      document.getElementById('perceptionSkillEdit').value = data[0].perception;

      document.getElementById('performanceSkill').textContent = data[0].performance;
      document.getElementById('performanceSkillEdit').value = data[0].performance;


      document.getElementById('persuasionSkill').textContent = data[0].persuasion;
      document.getElementById('persuasionSkillEdit').value = data[0].persuasion;

      document.getElementById('religionSkill').textContent = data[0].religion;
      document.getElementById('religionSkillEdit').value = data[0].religion;

      document.getElementById('sleightSkill').textContent = data[0].sleight_of_Hand;
      document.getElementById('sleightSkillEdit').value = data[0].sleight_of_Hand;

      document.getElementById('stealthSkill').textContent = data[0].stealth;
      document.getElementById('stealthSkillEdit').value = data[0].stealth;

      document.getElementById('survivalSkill').textContent = data[0].survival;
      document.getElementById('survivalSkillEdit').value = data[0].survival;



    })
    .catch(error => console.error('Erro ao obter dados do Journal:', error));

}