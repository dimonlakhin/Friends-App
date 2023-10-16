let users = [];
let copyUsers = [];
const usersAppendTarget = document.querySelector('.container');
const nameFilter = document.querySelector('.inputName');

const addUserCardsFromArrayInDom = users => {
  if(!Array.isArray(users)) return;
  const fragment = document.createDocumentFragment();
  const usersCards = users.map(element => {
    let card = document.createElement('div');
    card.classList.add('card')

    card.innerHTML = `
    <img class="imgUser propertiesText" src="${element.picture.large}">
    <div class="nameUser propertiesText">${element.name.first} ${element.name.last}</div>
    <div class="ageUser propertiesText">${element.dob.age}</div>
    <div class="telUser propertiesText"> tel. ${element.phone}</div>
    <div class="emailUser propertiesText">${element.email}</div>
    `;
    return card;
});

  usersCards.forEach(card => fragment.appendChild(card));
  usersAppendTarget.appendChild(fragment);
};

const clearTargetContainerHtml = () => {
  usersAppendTarget.innerHTML = "";
}

const receivingData = async () => {
  const rawData = await fetch ('https://randomuser.me/api/?results=100')
  const usersData = await rawData.json();
  users = [...usersData.results];
  copyUsers = [...users];
  addUserCardsFromArrayInDom(copyUsers);
}

const sortAgeMax = document.querySelector(".btnAgeMin").addEventListener("click", function () {
    copyUsers.sort((a, b) => a.dob.age - b.dob.age);
    clearTargetContainerHtml();
    addUserCardsFromArrayInDom(copyUsers);
  });


const sortAgeMin = document.querySelector(".btnAgeMax").addEventListener("click", function () {
    copyUsers.sort((a, b) => b.dob.age - a.dob.age);
    clearTargetContainerHtml();
    addUserCardsFromArrayInDom(copyUsers);
  });

const filterMale = document.querySelector(".btnMale").addEventListener("click", function () {
    copyUsers = users.filter(item => item.gender == "male");
    clearTargetContainerHtml();
    addUserCardsFromArrayInDom(copyUsers);
  });

const filterFemale = document.querySelector(".btnFemale").addEventListener("click", function () {
   copyUsers = users.filter(item => item.gender == "female");
   clearTargetContainerHtml();
   addUserCardsFromArrayInDom(copyUsers);
  });

const resetGenderFilter = document.querySelector(".btnAll").addEventListener("click", function () {
    const usersToInsert = [...users];
    clearTargetContainerHtml();
    addUserCardsFromArrayInDom(usersToInsert);
  });
  
  nameFilter.addEventListener("input", function () {
    copyUsers = users.filter(item => item.name.first.toLowerCase().startsWith(nameFilter.value.toLowerCase()));
    clearTargetContainerHtml();
    addUserCardsFromArrayInDom(copyUsers);
  });

receivingData();


