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
            const response = await fetch(`http://localhost:8080/users/login?login=${loginRequest}&password=${passwordRequest}`);

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
        if (idEnvironment == 99) { console.log("Usuário e/ou senha incorretos");
        }else{
            window.location.href = 'characterList.html';
        }
        
});

document.getElementById('createUserForm').addEventListener('submit', async function (event) {
     // Cancela o comportamento padrão de atualizar a página
     event.preventDefault();

     var newLoginRequest = document.getElementById('newUser').value;
     var newPasswordRequest = document.getElementById('newPassword').value;

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
const apiUrl = 'http://localhost:8080/users';

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



// Adicione ao seu arquivo JavaScript (characterList.js)

document.addEventListener('DOMContentLoaded', function () {
    // ... (seu código existente)

    // Adiciona a classe 'table-hover' à tabela para permitir o efeito hover
    document.querySelector('#table').classList.add('table-hover');

    // Adiciona ou remove a classe 'table-hover' das linhas da tabela ao passar o mouse
    document.querySelectorAll('.table-hover tbody tr').forEach(row => {
        row.addEventListener('mouseover', function () {
            this.classList.add('table-hover');
        });

        row.addEventListener('mouseout', function () {
            this.classList.remove('table-hover');
        });
    });
});
