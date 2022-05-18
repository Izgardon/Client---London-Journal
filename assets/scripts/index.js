/* import { postNewPost } from "./app.js"; */
//Things that directly affect the DOM, event listeners etc

const postBtns = document.querySelectorAll('.form-btn');
const attractionsPosts = document.querySelector('.attractions-posts');
const placesPosts = document.querySelector('.places-posts');
const replyModalArea = document.querySelector('.modal-reply-area');

//Adding all posts that are on server on load

getAllPosts('general');
getAllPosts('attractions');
getAllPosts('places');

//Event listeners

postBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    let dataType = e.target.id;

    const postData = {
      title: document.querySelector(`.${dataType}-title`).value,
      body: document.querySelector(`.${dataType}-body`).value,
      reactions: [0, 0, 0],
    };
    postNewPost(dataType, postData);

    document.querySelector(`.${dataType}-title`).value = '';
    document.querySelector(`.${dataType}-body`).value = '';
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
    method: 'POST',
    body: JSON.stringify(post),
    headers: {
      'Content-Type': 'application/json',
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

  //First if block is seeing whether it needs to add a new carousel page and then also appends the first new post

  if (post.id % 3 == 1) {
    eval(document.querySelector(`.${dataType}-posts`)).insertAdjacentHTML(
      'beforeend',
      `<div class="carousel-item ${
        page == 1 ? 'active' : ''
      }  ${dataType}-${page}"></div>`
    );
    document.querySelector(`.${dataType}-${page}`).insertAdjacentHTML(
      'beforeend',
      ` <div class="card main-card m-3"  style="width: 18rem;">
                            
                    <div class="card-body">
                      <h5 class="card-title">${post.title}</h5>
                      <p class="card-text">${post.body}</p>
                      <button class="btn card-button reply-button" id="${dataType}-${post.id}" data-bs-toggle="modal" data-bs-target="#reply-modal">View the Discussion</button>

                      <button type="button" class="btn position-relative reaction-button" id="${dataType}*${post.id}*1">
                      &#127913
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger emo-count">
                      ${post.reactions[0]}
                      </span>
                      </button>

                      <button type="button" class="btn position-relative reaction-button" id="${dataType}*${post.id}*2">
                      &#128077
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger emo-count">
                      ${post.reactions[1]}
                      </span>
                      </button>

                      <button type="button" class="btn position-relative reaction-button" id="${dataType}*${post.id}*3">
                      &#128293
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger emo-count">
                      ${post.reactions[2]}
                      </span>
                      </button>
                    </div>
              </div>
            `
    );
  }

  //Else statement deals with just adding new posts to current carousel page
  else {
    document.querySelector(`.${dataType}-${page}`).insertAdjacentHTML(
      'beforeend',
      ` <div class="card main-card m-3"  style="width: 18rem;">
                          
                  <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.body}</p>
                    <button class="btn card-button reply-button" id="${dataType}-${post.id}" data-bs-toggle="modal" data-bs-target="#reply-modal">View the Discussion</button>

                    <button type="button" class="btn position-relative reaction-button" id="${dataType}*${post.id}*1">
                      &#127913
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger emo-count">
                      ${post.reactions[0]}
                      </span>
                      </button>

                      <button type="button" class="btn position-relative reaction-button"id="${dataType}*${post.id}*2">
                      &#128077
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger emo-count">
                      ${post.reactions[1]}
                      </span>
                      </button>

                      <button type="button" class="btn position-relative reaction-button" id="${dataType}*${post.id}*3">
                      &#128293
                      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger emo-count">
                      ${post.reactions[2]}
                      </span>
                      </button>
                  </div>
            </div>
          `
    );
  }
}

//Reply Modals

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('reply-button')) {
    replyModalArea.innerHTML = '';

    let dataType = e.target.id.split('-')[0];
    let postId = e.target.id.split('-')[1];

    fetch(`http://localhost:3000/${dataType}/${postId}`)
      .then((r) => r.json())
      .then((postData) => {
        replyModalArea.insertAdjacentHTML(
          'afterbegin',
          `
        <div class="modal-header">
          <h5 class="modal-title" >${postData.title}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body-post">${postData.body}</div>
        <div class="modal-body modal-reply-body">
          
        
        <label for="reply-text" class="col-form-label"></label>
        <textarea class="form-control attractions-body" rows="5"  maxlength="200" id="reply-text" placeholder="Message" required></textarea>

        <button type="button" id="places" data-bs-dismiss="modal" class="form-btn btn nav-button">Send reply</button>
        </div>
      `
        );
        postData.replies.forEach((reply) => {
          document
            .querySelector('.modal-reply-body')
            .insertAdjacentHTML(
              'afterbegin',
              `<div class="reply">${reply}</div>`
            );
        });
      });
  }
});

//Giphy
const APIKEY = 'D1iipyMQItHYCfLcRNkam36gNXOSaSm5';
document.addEventListener('DOMContentLoaded', init);
function init() {
  document.getElementById('gifSearch').addEventListener('click', (e) => {
    e.preventDefault();
    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=5&q=`;
    let str = document.getElementById('search').value.trim();
    url = url.concat(str);
    console.log(url);
    fetch(url)
      .then((resp) => resp.json())
      .then((content) => {
        console.log(content.data);
        console.log('META', content.meta);
        content.data.forEach((data) => {
          let fig = document.createElement('figure');
          let img = document.createElement('img');
          img.src = data.images.fixed_height_small.url;
          img.alt = content.data.title;
          fig.appendChild(img);
          let displayGiphy = document.querySelector('.displayGiphy');
          displayGiphy.insertAdjacentElement('afterbegin', fig);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  });
}

//Emoji reactions

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('reaction-button')) {
    let dataType = e.target.id.split('*')[0];
    let postId = e.target.id.split('*')[1];
    let emojiId = e.target.id.split('*')[2];

    document.getElementById(e.target.id).childNodes[1].textContent++;

    const options = {
      method: 'PATCH',
      body: JSON.stringify({
        reactions: emojiId,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    };

    fetch(`http://localhost:3000/${dataType}/${postId}`, options);
  }
});
