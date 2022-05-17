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

document.addEventListener("DOMContentLoaded", init);
function init() {
  document.getElementById("gifSearch").addEventListener("click", e => {
    e.preventDefault();
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=5&q=`;
    let str = document.getElementById("search").value.trim();
    url = url.concat(str);
    console.log(url);
    fetch(url)
    .then(resp => resp.json())
    .then(content => {
      console.log(content.data);
      console.log('META', content.meta);
    })
  })
}
