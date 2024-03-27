function togglePassword() {
    const passwordField = document.getElementById('passwordField');
    passwordField.type = (passwordField.type === 'password') ? 'text' : 'password';
}

document.getElementById('authenticationForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    var loginRequest = document.getElementById('loginField').value;
    var passwordRequest = document.getElementById('passwordField').value;

    console.log(loginRequest);
    console.log(passwordRequest);

    try {
        const response = await fetch(`https://rpg-manager-system-api-java-production.up.railway.app/users/login?login=${loginRequest}&password=${passwordRequest}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Dependendo do tipo de resposta esperado (JSON, texto, etc.), você pode usar apropriadamente
        const data = await response.json();

        // Armazena o valor retornado no localStorage com a chave 'idEnviroment'
        localStorage.setItem('idEnvironment', data);

        console.log("ID do ambiente:", data);

        // Continue com o restante do código usando data
        // ...

    } catch (error) {
        console.error('Erro na requisição:', error);
    }


    var idEnvironment = localStorage.getItem('idEnvironment');
    console.log(idEnvironment);
    if (idEnvironment == 99 || idEnvironment == null) {
        localStorage.setItem('mensagemErro', 'Invalid username or password');
        window.location.reload();

    } else {
        window.location.href = '/characterList.html';
    }

});

document.getElementById('createUserForm').addEventListener('submit', async function (event) {
    // Cancela o comportamento padrão de atualizar a página
    event.preventDefault();

    var newLoginRequest = document.getElementById('newUser').value;
    var newPasswordRequest = document.getElementById('newPassword').value;

    // Expressões regulares para validação
    var regexNome = /^[A-Za-z]+$/; // Permite apenas letras sem espaços
    var regexSenha = /^\S+$/; // Não permite espaços

    // Valida o nome e a senha
    if (!regexNome.test(newLoginRequest)) {
        console.log('Validação falhou. O nome deve conter apenas letras sem espaços.');
        var elementoMensagemErro = document.getElementById('mensagemErroPost');
        elementoMensagemErro.textContent = "Username must be letters only, no spaces.";
        return;
    }
    if (!regexSenha.test(newPasswordRequest)) {
        console.log('Validação falhou. A senha não deve conter espaços.');
        var elementoMensagemErro = document.getElementById('mensagemErroPost');
        elementoMensagemErro.textContent = "Password must not contain spaces.";
        return;
    }

    const requestBody = {
        login: newLoginRequest,
        password: newPasswordRequest
    };

    // Configuração da requisição
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // Adicione outros cabeçalhos, se necessário
        },
        body: JSON.stringify(requestBody)
    };

    // URL da API
    const apiUrl = 'https://rpg-manager-system-api-java-production.up.railway.app/users';

    // Realiza a requisição POST
    fetch(apiUrl, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Requisição POST bem-sucedida:', data);
            // Faça algo com a resposta, se necessário
        })
        .catch(error => {
            console.error('Erro na requisição POST:', error);
        });

    location.reload();
});




document.addEventListener('DOMContentLoaded', function () {
    var mensagemErro = localStorage.getItem('mensagemErro');

    // Se houver uma mensagem de erro, exiba-a e remova-a de localStorage
    if (mensagemErro) {
        var elementoMensagemErro = document.getElementById('mensagemErro');
        elementoMensagemErro.textContent = mensagemErro;
        localStorage.removeItem('mensagemErro');
    }

})