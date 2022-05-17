import { postNewPost } from "./app.js";
//Things that directly affect the DOM, event listeners etc
/* import { fetchGeneral } from "./app.js"; */

// fetchAttractions();

const btnPost = document.querySelector(".button1");
const generalTitle = document.querySelector("#general-title");
const generalBody = document.querySelector("#general-body");
const generalPosts = document.querySelector(".general-posts");

getAllPosts("general", generalPosts);

btnPost.addEventListener("click", (e) => {
  e.preventDefault();
  let dataType = e.target.id;
  let posts = eval(`${dataType + "Posts"}`);
  const postData = {
    title: eval(`${dataType + "Title"}`).value,
    body: eval(`${dataType + "Body"}`).value,
  };
  postNewPost(dataType, postData, posts);
});

function getAllPosts(dataType, posts) {
  fetch(`http://localhost:3000/${dataType}`)
    .then((r) => r.json())
    .then((data) => {
      let page = 1;
      posts.insertAdjacentHTML(
        "afterbegin",
        `<div class="carousel-item  active general-1"></div>`
      );
      data.forEach((post) => {
        document.querySelector(`.general-${page}`).insertAdjacentHTML(
          "beforeend",
          ` <div class="card main-card m-3" id="${post.id} "style="width: 18rem;">
                          
                  <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="btn card-button">View the Discussion</a>
                  </div>
            </div>
          `
        );
      });
    });
}
