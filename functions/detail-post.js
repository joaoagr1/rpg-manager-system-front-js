document.getElementById('postItemButton').addEventListener('click', function () {

var ItemNamePost = document.getElementById('itemNamePost').value;
console.log(ItemNamePost)

var ItemDescriptionPost = document.getElementById('descriptionNamePost').value;
console.log(ItemDescriptionPost)

var characterId = localStorage.getItem('characterId')

let url = 'http://localhost:8080/items';
let data = {
    character_id: characterId, 
    ItemNamePost: ItemNamePost, 
    ItemDescriptionPost: ItemDescriptionPost
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




})