let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  defaultToys()
  addNewToy()
});

//Display toy cards
function defaultToys() {
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
  .then(data => data.forEach(toyObj => renderToys(toyObj)))
}

function renderToys(toyObj){
  const toyCard = document.createElement("div");
  toyCard.className = "card";
  toyCard.innerHTML = `
  <h2>${toyObj.name}</h2>
  <img src="${toyObj.image}" class="toy-avatar" />
  <p>${toyObj.likes} Likes </p>
  <button class="like-btn" id="${toyObj.id}">Like <3</button>`;
  document.querySelector("#toy-collection").append(toyCard)
  updateLikes(toyObj);
}

//Add a new toy
function addNewToy() {
  const toyForm = document.querySelector(".add-toy-form");
  toyForm.addEventListener('submit', displayNewToy);
}

function displayNewToy(e){
  e.preventDefault();
  let newToy = {
    name: e.target.name.value,
    image: e.target.image.value,
    likes: "0"
  };
  renderToys(newToy);
  newToyServer(newToy);
}

function newToyServer(newToy){
  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(newToy)
  })
}

//Like button
function updateLikes(toyObj){
  const likeButton = document.getElementById(`${toyObj.id}`);
  likeButton.addEventListener('click',  () => {
    toyObj.likes++;
    const likeInfo = likeButton.previousSibling.previousSibling;
    likeInfo.textContent = `${toyObj.likes} Likes`;

    updateServerLikes(toyObj)
  })
}

function updateServerLikes(toyObj){
  fetch(`http://localhost:3000/toys/${toyObj.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(toyObj)
  })
}