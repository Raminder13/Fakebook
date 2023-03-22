'use strict';

/* 
Raminder Singh
*/

import { User } from "./User.js";

const formElement = document.getElementById("poster");
const postsElement = document.querySelector(".posts");
const profileElement = document.querySelector(".profile");

const user = new User(
  1,
  "Raminder Singh",
  "raminder13",
  "ramindersingh@student.mitt.ca"
);

profileElement.addEventListener("click", () => {});

const post = (user, description, image) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  const postHTML = `
  <div class="post">
  <div class="info">
    <div class="left">
      <img
        src="https://avatars.githubusercontent.com/u/126028236?s=400&u=c1640301317a8ce0375e1d6f6608ae9b60a2edda&v=4"
        alt=""
      />
      <div class="username">${user.userName}</div>
    </div>
    <div class="date">${today}</div>
  </div>
  <div class="description">
    ${description}
  </div>
  <div class="image">
    <img
      src="${image}"
      alt=""
    />
  </div>
</div>
  `;

  postsElement.innerHTML = postHTML + postsElement.innerHTML;
};

const imageElement = document.getElementById("image");

let image = "";

imageElement.addEventListener("change", (event) => {
  image = event.target.files[0].name;
  document.querySelector(".image-container").innerHTML += `<div>${image}</div>`;
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    localStorage.setItem(image, reader.result);
  });

  reader.readAsDataURL(event.target.files[0]);
});

formElement.addEventListener("submit", (event) => {
  event.preventDefault();

  post(user, event.target[0].value, localStorage.getItem(image));

  event.target[0].value = "";
  document.querySelector(".image-selector").innerHTML = `
  <div class="image-container">
  <img
    src="./assets/images/icons8-image-96.png"
    onclick="document.getElementById('image').click();  return false;"
    alt="image icon"
  />
</div>
<input type="file" id="image" style="visibility: hidden" />
  `;
});

function openModal(id) {
  document.getElementById(id).classList.add("open");
  document.body.classList.add("jw-modal-open");
  const userInfo = user.getInfo();
  const profileHTML = `
    <div>
      <img src="https://avatars.githubusercontent.com/u/126028236?s=400&u=c1640301317a8ce0375e1d6f6608ae9b60a2edda&v=4" />
      <p>Name: ${userInfo.name}</p>
      <p>UserName: ${userInfo.userName}</p>
      <p>Email: ${userInfo.email}</p>
      <button>Close</button>
    </div>
  `;

  document.querySelector("#profile .jw-modal-body").innerHTML = "";

  document.querySelector("#profile .jw-modal-body").innerHTML =
    profileHTML + document.querySelector("#profile .jw-modal-body").innerHTML;
  document
    .querySelector("#profile button")
    .addEventListener("click", closeModal);
}

function closeModal() {
  document.querySelector(".jw-modal.open").classList.remove("open");
  document.body.classList.remove("jw-modal-open");
}

document.querySelector(".profile img").addEventListener("click", () => {
  openModal("profile");
});

window.addEventListener("load", function () {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("jw-modal")) {
      closeModal();
    }
  });
});
