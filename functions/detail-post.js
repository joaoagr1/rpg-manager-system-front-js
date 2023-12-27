document.getElementById('postItemButton').addEventListener('click', function () {
    var ItemNamePost = document.getElementById('itemNamePost').value;
    console.log(ItemNamePost)

    var ItemDescriptionPost = document.getElementById('descriptionNamePost').value;
    console.log(ItemDescriptionPost)

    var characterId = localStorage.getItem('idCharacter');

    let url = 'http://localhost:8080/items';
    let data = {
        character_id: characterId,  
        name: ItemNamePost, 
        description: ItemDescriptionPost
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });


    setTimeout(function() {
        location.reload();
    }, 300); // Atraso de 2 segundos
});


function fetchAddSpell(){
    characterId = localStorage.getItem('idCharacter');
    nomeSpell = document.getElementById('SpellNamePost').value;
    descriptionSpell = document.getElementById('descriptionSpellPost').value;


    let url = 'http://localhost:8080/spells';
    let data = {
        character_id: characterId,  
        name: nomeSpell, 
        description: descriptionSpell
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });


    setTimeout(function() {
        location.reload();
    }, 300); // Atraso de 2 segundos
}