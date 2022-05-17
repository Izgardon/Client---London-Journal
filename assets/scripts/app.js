export function postNewPost(dataType, postData, posts) {
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
      posts.insertAdjacentHTML(
        "afterbegin",
        `<div class="card main-card m-3" id="${postData.id} "style="width: 18rem;">
                        
        <div class="card-body">
          <h5 class="card-title">${postData.title}</h5>
          <p class="card-text">${postData.body}</p>
          <a href="#" class="btn card-button">View the Discussion</a>
        </div>
      </div>`
      )
    )
    .catch(console.warn);
}
