document.getElementById("deleteCharacter").disabled = true;
document.getElementById("infoCharacter").disabled = true;



function fetchCharacters() {
    var idEnvironment = localStorage.getItem('idEnvironment');
    const apiUrl = `http://localhost:8080/characters/user/${idEnvironment}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const characterTableBody = document.getElementById('characterTableBody');
            characterTableBody.innerHTML = '';
            data.forEach(character => {
                const idCharacter = character.character_id;
                console.log(idCharacter)
                const row = document.createElement('tr');
                row.addEventListener('click', function () {
                    console.log(idCharacter);
                    localStorage.setItem('idCharacter', idCharacter);
                });
                row.innerHTML = `
                    <td>${character.characterName}</td>
                    <td>${character.class_}</td>
                    <td>${character.race}</td>
                    <td>${character.level}</td>
                `;
                characterTableBody.appendChild(row);
            });
        });
}

$(document).ready(function () {
    var clickedRow = null;


    $('#characterTable').on('click', 'tr', function (event) {
        event.stopPropagation();
        if (clickedRow != null) {
            $(clickedRow).removeClass('row-clicked');
        }
        $(this).addClass('row-clicked');
        clickedRow = this;

        document.getElementById("deleteCharacter").disabled = false;
        document.getElementById("infoCharacter").disabled = false;

    });

    $(document).on('click', function () {
        if (clickedRow != null) {
            $(clickedRow).removeClass('row-clicked');
        }
        clickedRow = null;
        document.getElementById("deleteCharacter").disabled = true;
        document.getElementById("infoCharacter").disabled = true;

    });

    fetchCharacters();
});



function confirmarExclusao() {
    // A função confirm exibe uma caixa de diálogo com os botões OK e Cancelar
    var confirmacao = confirm("Are you sure you want to delete this character?");

    // Se o usuário clicar em OK, a função retorna true; caso contrário, retorna false
    if (confirmacao) {
        // Coloque aqui o código para excluir o item
        idCharacter = localStorage.getItem('idCharacter');
        console.log(idCharacter)
        const apiUrl = `http://localhost:8080/characters/${idCharacter}`;

        fetch(apiUrl, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
                // Atualize a tabela ou faça algo após a exclusão bem-sucedida
            })
            .catch(error => {
                console.log('Houve um problema com a solicitação fetch: ' + error.message);
            });
        setTimeout(function () {
            window.location.reload();
        }, 400);
    };

    alert("Character successfully deleted."); // Apenas um exemplo, substitua por sua lógica de exclusão real
}




document.getElementById('infoCharacter').addEventListener('click', function () {
    window.location.href = '../pages/detail.html';
});



document.getElementById('createCharacterButtton').addEventListener('click', function () {

    var characterNamePost = document.getElementById('characterName').value;
    var backgroundPost = document.getElementById('background').value;
    var alignmentPost = document.getElementById('alignment').value;
    var classPost = document.getElementById('class').value;
    var racePost = document.getElementById('race').value;
    var levelPost = document.getElementById('level').value;
    var idEnvironment = localStorage.getItem('idEnvironment');

    var regex = /^[A-Za-z\s]+$/;


    // Agora você pode validar o valor do campo usando a expressão regular
    if (regex.test(characterNamePost)) {
        console.log('Validação bem-sucedida!');


        var data = {
            characterName: characterNamePost,
            background: backgroundPost,
            alignment: alignmentPost,
            class_: classPost,
            race: racePost,
            level: levelPost,
            user_id: idEnvironment
        };

        // Configuração da requisição
        var requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Indica que estamos enviando dados em formato JSON
                // Adicione outros cabeçalhos conforme necessário
            },
            body: JSON.stringify(data) // Converte o objeto JavaScript para uma string JSON
        };

        // Substitua a URL do exemplo pela URL real para onde você deseja enviar os dados
        var url = 'http://127.0.0.1:8080/characters';

        // Realiza a requisição Fetch
        fetch(url, requestOptions)
            .then(response => response.json()) // Converte a resposta para JSON
            .then(data => console.log(data)) // Exibe a resposta no console (pode ser ajustado conforme necessário)
            .catch(error => console.error('Erro:', error));


        setTimeout(function () {
            window.location.reload();
        }, 900); // O tempo é especificado em milissegundos, então 5000 milissegundos são 5 segundos




    } else {
        console.log('Validação falhou. Por favor, insira apenas letras e espaços.');
        var elementoMensagemErro = document.getElementById('mensagemErro');
        elementoMensagemErro.textContent = "Invalid name for character...";




    }






}, 9000);



