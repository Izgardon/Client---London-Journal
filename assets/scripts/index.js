//Things that directly affect the DOM, event listeners etc
import { fetchGeneral } from './app.js';
// import { fetchAttractions } from './app.js;';
console.log('hi');
fetchGeneral();
// fetchAttractions();

// const submitButton = document.querySelector('.submitButton');

// function submitGeneral(e) {
//   e.preventDefault();
//   const generalData = {
//     title: e.target.title.value,
//     body: e.target.body.value,
//   };
//   const options = {
//     method: 'POST',
//     body: JSON.stringify(generalData),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   };
//   fetch('http://localhost:3000/general', options)
//     .then((r) => r.json())
//     .catch(console.warn);
// }

// submitButton.addEventListener('submit', () => {
//   submitGeneral();
// });
