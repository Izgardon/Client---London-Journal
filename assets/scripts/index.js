//Things that directly affect the DOM, event listeners etc
/* import { fetchGeneral } from "./app.js"; */

// fetchAttractions();

const btnGeneral = document.querySelector(".button1");
const generalTitle = document.querySelector("#title");
const generalBody = document.querySelector("#body");
const test1 = document.querySelector(".test");
let type = "";

btnGeneral.addEventListener("click", (e) => {
  e.preventDefault();
  type = "general";
  test(type);
});
/* btnPlaces.addEventListener("click", (e) => {
  e.preventDefault();
  type = "places";
  test(type);
});
btnAttractions.addEventListener("click", (e) => {
  e.preventDefault();
  type = "attractions";
  test(type);
}); */

function test(dataType) {
  const postData = {
    title: eval(`${dataType + "Title"}`).value,
    body: eval(`${dataType + "Body"}`).value,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(`http://localhost:3000/${dataType}`, options)
    .then((r) => r.json())
    .then(
      test1.insertAdjacentHTML(
        "afterbegin",
        `<p>${postData.title} is the best, better than ${postData.body}</p>`
      )
    )
    .catch(console.warn);
}
