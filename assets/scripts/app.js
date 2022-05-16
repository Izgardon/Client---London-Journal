//Functions that power everything - but dont interact with DOM directly

export const fetchGeneral = () => {
  fetch('http://localhost:3000/general')
    .then((res) => res.json())
    .then((data) => {
      const div = document.querySelector('.general');
      data.forEach(() => {
        const newTitle = document.createElement('h3');
        const newP = document.createElement('p');

        newTitle.textContent = data.name;
        newP.textContent = data.body;

        div.appendChild(newTitle);
        div.appendChild(newP);
      });
      console.log(data);
    });
};
// export const fetchAttractions = () => {
//   fetch('http://localhost:3000/attractions')
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//     });
// };

// export const fetchAttractions = () => {
//   fetch('http://localhost:3000/attractions')
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//     });
// };

// export const fetchPlaces = () => {
//   fetch('http://localhost:3000/places')
//     .then((res) => res.json())
//     .then((data) => {
//       console.log(data);
//     });
// };
