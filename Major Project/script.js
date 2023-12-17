const menuSound = new Audio("./assets/Main Menu.mp3");
let audioInitialized = false;

function initAudio() {
  if (!audioInitialized) {
    menuSound.play();
    audioInitialized = true;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.querySelector("#startButton");
  startButton.addEventListener("click", initAudio);
});

const startButton = document.querySelector("#startButton");

let characters = [
  { title: "Goku", img: "./assets/goku.webp" },
  {
    title: "Vegeta",
    img: "./assets/VEGETA.webp",
  },
  { title: "Gohan", img: "./assets/gohan.png" },
];

let stages = [
  { title: "World Tournament", img: "./assets/Background.jpg" },
  { title: "Gizard Wasteland", img: "./assets/Gizard Wasteland.webp" },
];
startButton.addEventListener("click", loadCharacters); // Remove the parentheses here

function loadCharacters() {
  const menuContainer = document.querySelector(".menu-container");
  document.querySelector("#startButton").style.display = "none";
  const title = document.createElement("h2");
  title.innerHTML = "Select your character";
  menuContainer.appendChild(title);

  const characterList = document.createElement("div");
  characterList.classList.add("character-list");
  characterList.style.display = "flex";
  characterList.style.gap = "20px";

  characters.forEach((character, index) => {
    const characterCard = document.createElement("div");
    characterCard.classList.add("character");
    characterCard.setAttribute("id", `${character.title}`);
    characterCard.style.backgroundColor = "white";
    characterCard.style.borderRadius = "8px";

    characterCard.addEventListener("click", () => {
      localStorage.setItem("selected", character.title);
      loadOpponent();
    });

    // Create an image element for the character
    const characterImage = document.createElement("img");
    characterImage.src = character.img; // Set the image source
    characterImage.alt = character.title; // Set alt text for accessibility
    characterImage.style.width = "300px"; // Set width
    characterImage.style.height = "300px"; // Set height
    characterCard.appendChild(characterImage);

    // Create a title element for the character
    const characterTitle = document.createElement("h2");
    characterTitle.textContent = character.title;
    characterTitle.style.color = "black";
    characterCard.appendChild(characterTitle);

    characterList.appendChild(characterCard);
  });

  menuContainer.appendChild(characterList);
}

function loadOpponent() {
  const menuContainer = document.querySelector(".menu-container");
  const titleElement = document.querySelector("h2");

  if (titleElement) {
    titleElement.remove();
  }

  const characterListElement = document.querySelector(".character-list");

  if (characterListElement) {
    characterListElement.remove();
  }

  document.querySelector("#startButton").style.display = "none";

  const title = document.createElement("h2");
  title.innerHTML = "Select your opponent";
  menuContainer.appendChild(title);

  characters = characters.filter(
    (char) => char.title !== localStorage.getItem("selected")
  );

  const characterList = document.createElement("div");
  characterList.classList.add("character-list");
  characterList.style.display = "flex";
  characterList.style.gap = "20px";

  characters.forEach((character, index) => {
    const characterCard = document.createElement("div");
    characterCard.classList.add("character");
    characterCard.setAttribute("id", `${character.title}`);
    characterCard.style.backgroundColor = "white";
    characterCard.style.borderRadius = "8px";

    characterCard.addEventListener("click", () => {
      localStorage.setItem("opponent", character.title);
      loadStages();
    });

    // Create an image element for the character
    const characterImage = document.createElement("img");
    characterImage.src = character.img; // Set the image source
    characterImage.alt = character.title; // Set alt text for accessibility
    characterImage.style.width = "300px"; // Set width
    characterImage.style.height = "300px"; // Set height
    characterCard.appendChild(characterImage);

    // Create a title element for the character
    const characterTitle = document.createElement("h2");
    characterTitle.textContent = character.title;
    characterTitle.style.color = "black";
    characterCard.appendChild(characterTitle);

    characterList.appendChild(characterCard);
  });

  menuContainer.appendChild(characterList);
}

function loadStages() {
  const menuContainer = document.querySelector(".menu-container");
  const titleElement = document.querySelector("h2");

  if (titleElement) {
    titleElement.remove();
  }

  const characterListElement = document.querySelector(".character-list");

  if (characterListElement) {
    characterListElement.remove();
  }

  document.querySelector("#startButton").style.display = "none";

  const title = document.createElement("h2");
  title.innerHTML = "Select Stage";
  menuContainer.appendChild(title);

  const stageListElement = document.querySelector(".stage-list");

  if (stageListElement) {
    stageListElement.remove();
  }

  const stageList = document.createElement("div");
  stageList.classList.add("stage-list");
  stageList.style.display = "flex";
  stageList.style.gap = "20px";

  stages.forEach((stage, index) => {
    const stageCard = document.createElement("div");
    stageCard.classList.add("stage");
    stageCard.setAttribute("id", `${stage.title}`);
    stageCard.style.backgroundColor = "white";
    stageCard.style.borderRadius = "8px";

    stageCard.addEventListener("click", () => {
      localStorage.setItem("stage", stage.title);
      window.location.href = "./index.html";
      // Update the function call to whatever is intended
    });

    // Create an image element for the character
    const stageImage = document.createElement("img");
    stageImage.src = stage.img; // Set the image source
    stageImage.alt = stage.title; // Set alt text for accessibility
    stageImage.style.width = "300px"; // Set width
    stageImage.style.height = "300px"; // Set height
    stageCard.appendChild(stageImage);

    // Create a title element for the stage
    const stageTitle = document.createElement("h2");
    stageTitle.textContent = stage.title;
    stageTitle.style.color = "black";
    stageCard.appendChild(stageTitle);

    stageList.appendChild(stageCard);
  });

  menuContainer.appendChild(stageList);
}
