export function test(dataType, postData, posts) {
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
        `<p>${postData.title} is the best, better than ${postData.body}</p>`
      )
    )
    .catch(console.warn);
}
