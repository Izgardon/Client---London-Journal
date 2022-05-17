import { test } from "./app.js";
//Things that directly affect the DOM, event listeners etc
/* import { fetchGeneral } from "./app.js"; */

// fetchAttractions();

const btnPost = document.querySelector(".button1");
const generalTitle = document.querySelector("#title");
const generalBody = document.querySelector("#body");
const generalPosts = document.querySelector(".test");

btnPost.addEventListener("click", (e) => {
  e.preventDefault();
  let dataType = e.target.id;
  let posts = eval(`${dataType + "Posts"}`);
  const postData = {
    title: eval(`${dataType + "Title"}`).value,
    body: eval(`${dataType + "Body"}`).value,
  };
  test(dataType, postData, posts);
});
