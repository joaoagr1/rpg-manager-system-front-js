function deleteSpell() {
    // Pegar o spell_id do localStorage
    var spell_id = localStorage.getItem('spell_id');
    var path = localStorage.getItem('path');
    var item_id = localStorage.getItem('item_id');
    var deleted_id = localStorage.getItem('deleted_id')
    // Definir a URL da API
    var apiUrl = `http://localhost:8080/${path}/${deleted_id}`;
    console.log(path)
  
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
  

  $('table').on('click', '.spell-name, .item-name', function () {
    // Esta função será chamada quando uma célula com a classe "spell-name" ou "item-name" for clicada
    deleteItemOrSpell(this);
  
  });
  
  
  
  function deleteItemOrSpell(clickedElement) {
    // Verificar se a célula clicada contém a classe "spell-name" ou "item-name"
    if ($(clickedElement).hasClass('spell-name')) {
  
      localStorage.setItem('path', "spells");
      var deleted_id = localStorage.getItem('spell_id')
      localStorage.setItem('deleted_id', deleted_id)
  
    } else if ($(clickedElement).hasClass('item-name')) {
  
      localStorage.setItem('path', "items");
      var deleted_id = localStorage.getItem('item_id')
      localStorage.setItem('deleted_id', deleted_id)
  
  
    } else {
      console.error('Classe desconhecida na célula clicada.');
    }
  }