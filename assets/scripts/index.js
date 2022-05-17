/* import { postNewPost } from "./app.js"; */
//Things that directly affect the DOM, event listeners etc

const postBtns = document.querySelectorAll(".form-btn");
const attractionsPosts = document.querySelector(".attractions-posts");
const placesPosts = document.querySelector(".places-posts");

//Adding all posts that are on server on load

getAllPosts("general");
getAllPosts("attractions");
getAllPosts("places");

//Event listeners

postBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();

    let dataType = e.target.id;

    const postData = {
      title: document.querySelector(`.${dataType}-title`).value,
      body: document.querySelector(`.${dataType}-body`).value,
    };
    postNewPost(dataType, postData);

    document.querySelector(`.${dataType}-title`).value = "";
    document.querySelector(`.${dataType}-body`).value = "";
  });
});

//Functions

//Getting all posts on load

function getAllPosts(dataType) {
  fetch(`http://localhost:3000/${dataType}`)
    .then((r) => r.json())
    .then((allPostData) => {
      allPostData.forEach((post) => {
        append(dataType, post);
      });
    });
}

//Adding a new post

function postNewPost(dataType, post) {
  const options = {
    method: "POST",
    body: JSON.stringify(post),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(`http://localhost:3000/${dataType}`, options)
    .then((r) => r.json())
    .then((postData) => {
      append(dataType, postData);
    })
    .catch(console.warn);
}

//Function that deals with appending the posts to the correct carousel page

function append(dataType, post) {
  let page = Math.ceil(post.id / 3);
  if (post.id % 3 == 1) {
    eval(document.querySelector(`.${dataType}-posts`)).insertAdjacentHTML(
      "beforeend",
      `<div class="carousel-item ${
        page == 1 ? "active" : ""
      }  ${dataType}-${page}"></div>`
    );
    document.querySelector(`.${dataType}-${page}`).insertAdjacentHTML(
      "beforeend",
      ` <div class="card main-card m-3" id="${dataType}-${post.id}" style="width: 18rem;">
                            
                    <div class="card-body">
                      <h5 class="card-title">${post.title}</h5>
                      <p class="card-text">${post.body}</p>
                      <a href="#" class="btn card-button">View the Discussion</a>
                    </div>
              </div>
            `
    );
  } else {
    document.querySelector(`.${dataType}-${page}`).insertAdjacentHTML(
      "beforeend",
      ` <div class="card main-card m-3" id="${dataType}-${post.id}" style="width: 18rem;">
                          
                  <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="btn card-button">View the Discussion</a>
                  </div>
            </div>
          `
    );
  }
}

//Modals

/* const formModal = document.getElementById("form-general");
formModal.addEventListener("show.bs.modal", (event) => {
  // Button that triggered the modal
  const button = event.relatedTarget;
  // Extract info from data-bs-* attributes
  const recipient = button.getAttribute("data-bs-whatever");
  // If necessary, you could initiate an AJAX request here
  // and then do the updating in a callback.
  //
  // Update the modal's content.
  const modalTitle = formModal.querySelector(".modal-title");
  const modalBodyInput = formModal.querySelector(".modal-body input");
});
 */
