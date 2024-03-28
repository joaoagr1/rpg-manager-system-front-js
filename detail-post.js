document.getElementById('postItemButton').addEventListener('click', function () {
    var ItemNamePost = document.getElementById('itemNamePost').value;
    console.log(ItemNamePost)

    var ItemDescriptionPost = document.getElementById('descriptionNamePost').value;
    console.log(ItemDescriptionPost)

    var characterId = localStorage.getItem('idCharacter');

    let url = 'https://rpg-manager-system-api-java-production.up.railway.app/items';
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


    setTimeout(function () {
        location.reload();
    }, 300); // Atraso de 2 segundos
});


function fetchAddSpell() {
    characterId = localStorage.getItem('idCharacter');
    nomeSpell = document.getElementById('SpellNamePost').value;
    descriptionSpell = document.getElementById('descriptionSpellPost').value;


    let url = 'https://rpg-manager-system-api-java-production.up.railway.app/spells';
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
        .then(data => {console.log(data)

            })
        .catch((error) => {
            console.error('Error:', error);
        });


    setTimeout(function () {
       // location.reload();
    }, 300); // Atraso de 2 segundos
}


function chooseFile() {
    document.getElementById('fileInput').click();
}

function previewImage(input) {
    const preview = document.getElementById('imagePreview');
    const file = input.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.src = e.target.result;
        };

        reader.readAsDataURL(file);
    } else {
        // Caso o usuário cancele a escolha da imagem
        preview.src = '#';
    }
}


function openFilePicker() {
    document.getElementById('inputFile').click();
}

function uploadFile() {
    const inputFile = document.getElementById('inputFile');
    const fotoPersonagem = document.getElementById('fotoPersonagem');

    const file = inputFile.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('foto', file);

        var characterId = localStorage.getItem('idCharacter');


        fetch(`https://rpg-manager-system-api-java-production.up.railway.app/characters/uploadFoto/${characterId}`, {
            method: 'POST',
            body: formData
        })
            //.then(response => response.response())
            .then(data => {
                // Atualize a imagem src ou faça qualquer outra coisa com a resposta do servidor
                console.log(data);
                fotoPersonagem.src = data.url; // Supondo que o servidor retorna a URL da imagem
            })
            .catch(error => console.error('Erro ao enviar a imagem', error));
    }

   // location.reload()
}




