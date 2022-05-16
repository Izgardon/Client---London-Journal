//Functions that power everything - but dont interact with DOM directly

export const fetchGeneral = () => {
  fetch('http://localhost:3000/general')
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};
