/* import { postNewPost } from "./app.js"; */
//Things that directly affect the DOM, event listeners etc

const postBtns = document.querySelectorAll('.form-btn');
const attractionsPosts = document.querySelector('.attractions-posts');
const placesPosts = document.querySelector('.places-posts');
const replyModalArea = document.querySelector('.modal-reply-area');
const searchTemplate = document.querySelector('[data-search-template]');

//Adding all posts that are on server on load

getAllPosts('general');
getAllPosts('attractions');
getAllPosts('places');

//Event listeners

//New post modal

postBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    let dataType = e.target.id;
    let title = document.querySelector(`.${dataType}-title`).value;
    let body = document.querySelector(`.${dataType}-body`).value;
    if (title && body) {
      const postData = {
        title: title,
        body: body,
        reactions: [0, 0, 0],
        replies: [],
      };

      postNewPost(dataType, postData);

      document.querySelector(`.${dataType}-title`).value = '';
      document.querySelector(`.${dataType}-body`).value = '';
    } else {
      setTimeout(() => {
        document.querySelector(`#${dataType}-button`).click();
      }, 400);
    }
  });
});

//Reply Modals

document.addEventListener('click', (e) => {
  createReplyModal(e);
  emojiCounter(e);
});

//Functions ---------------------------------------------------------------------------

//Search

fetch('http://localhost:3000/general')
  .then((r) => r.json())
  .then((data) => {
    console.log(data);
    // card.map(card => {
    //   const list = searchTemplate.content.cloneNode(true).children[0]
    //   console.log(list)
  });
// });

//Getting all posts on load

function clearAllPosts(dataType) {
  eval(document.querySelector(`.${dataType}-posts`)).innerHTML = '';
}

function getAllPosts(dataType) {
  fetch(`http://localhost:3000/${dataType}`)
    .then((r) => r.json())
    .then((allPostData) => {
      for (let i = allPostData.length; i >= 1; i--) {
        append(dataType, allPostData[i - 1], allPostData);
      }
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
    .catch(console.warn);

  setTimeout(() => {
    clearAllPosts(dataType);
    getAllPosts(dataType);
  }, 1);
}

//Function that deals with appending the posts to the correct carousel page

function append(dataType, post, allData) {
  let postNumber = allData.length + 1 - post.id;
  let page = Math.ceil(postNumber / 3);

  //First if block is seeing whether it needs to add a new carousel page and then also appends the first new post

  if (postNumber % 3 == 1) {
    eval(document.querySelector(`.${dataType}-posts`)).insertAdjacentHTML(
      'beforeend',
      `<div class="carousel-item ${
        page == 1 ? 'active' : ''
      }  ${dataType}-${page}"></div>`
    );
    document
      .querySelector(`.${dataType}-${page}`)
      .insertAdjacentHTML('beforeend', returnPost(dataType, post));
  }

  //Else statement deals with just adding new posts to current carousel page
  else {
    document
      .querySelector(`.${dataType}-${page}`)
      .insertAdjacentHTML('beforeend', returnPost(dataType, post));
  }
}

//Adding emoji counter

function emojiCounter(e) {
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
}

//Adding the reply modal

function createReplyModal(e) {
  if (e.target.classList.contains('reply-button')) {
    replyModalArea.innerHTML = '';

    let dataType = e.target.id.split('-')[0];
    let postId = e.target.id.split('-')[1];

    fetch(`http://localhost:3000/${dataType}/${postId}`)
      .then((r) => r.json())
      .then((postData) => {
        replyModalArea.insertAdjacentHTML(
          'afterbegin',
          returnReplyModal(postData, dataType, postId)
        );
        postData.replies.forEach((reply) => {
          document
            .querySelector('.modal-reply-body')
            .insertAdjacentHTML(
              'afterbegin',
              `<div class="reply">${reply}</div>`
            );
        });
        addingGifs(dataType, postId);
        document
          .querySelector(`#${dataType}-${postId}-reply-button`)
          .addEventListener('click', (e) => {
            sendReply(e);
            document.querySelector('.replyMessageBox').value = '';
          });
      });
  }
}

//Function for sending replies

function sendReply(e, isGif = 'no', gifDataType, gifPostId) {
  let reply = '';
  let dataType = '';
  let postId = '';
  if (isGif == 'no') {
    dataType = e.target.id.split('-')[0];
    postId = e.target.id.split('-')[1];

    reply = document.querySelector(`#${dataType}-${postId}-reply-box`).value;
  } else if (isGif == 'yes') {
    reply = `<img src="${e.target.src}" alt="Cool Gif">`;
    dataType = gifDataType;
    postId = gifPostId;
  }

  document
    .querySelector('.modal-reply-body')
    .insertAdjacentHTML('beforeend', `<div class="reply">${reply}</div>`);
  const options = {
    method: 'PATCH',
    body: JSON.stringify({
      reply: reply,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  };

  fetch(`http://localhost:3000/${dataType}/${postId}`, options);
}

//Sending gifs (calls the sendReply function and modifies it for gifs)

function gifReply(e, dataType, id, displayGiphy, gifSearchBox, event) {
  if (e.target.getAttribute('alt') == 'gif') {
    sendReply(e, 'yes', dataType, id);
    displayGiphy.innerHTML = '';
    gifSearchBox.value = '';
    document.removeEventListener('click', event);
  }
}

//Giphy
const APIKEY = 'D1iipyMQItHYCfLcRNkam36gNXOSaSm5';

function addingGifs(dataType, postId) {
  let gifSearch = document.getElementById('gifSearch');
  let displayGiphy = document.querySelector('.displayGiphy');
  let gifSearchBox = document.querySelector('.gifSearchBox');
  gifSearch.addEventListener('click', (e) => {
    e.preventDefault();

    let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=5&q=`;
    let str = document.getElementById('search').value.trim();
    url = url.concat(str);

    fetch(url)
      .then((resp) => resp.json())
      .then((content) => {
        content.data.forEach((data) => {
          let fig = document.createElement('figure');
          let img = document.createElement('img');
          img.src = data.images.fixed_height_small.url;
          img.alt = 'gif';
          fig.appendChild(img);
          displayGiphy.insertAdjacentElement('afterbegin', fig);
        });
      })
      .catch((err) => {
        console.error(err);
      });

    document.addEventListener('click', function test1(e) {
      gifReply(e, dataType, postId, displayGiphy, gifSearchBox, test1);
    });
  });
}

//HTML returner functions -----------------------------------------------------------------------

//Returning a post

function returnPost(dataType, post) {
  return ` <div class="card main-card m-3"  style="width: 18rem;">
                            
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
`;
}

function returnReplyModal(postData, dataType, postId) {
  return `
  <div class="modal-header">
    <h5 class="modal-title" >${postData.title}</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body-post">${postData.body}</div>
  <div class="modal-body modal-reply-body">
    </div>
  
  <label for="reply-text" class="col-form-label"></label>
  <textarea class="form-control replyMessageBox attractions-body" rows="3" style="max-width: 600px; margin-inline:auto;" maxlength="150" id="${dataType}-${postId}-reply-box" placeholder="Message" required></textarea>
        <form onkeydown="return event.key != 'Enter';">
          <label for="search">Search</label>
          <input  class= "gifSearchBox" type="search" id="search">
          <button type="button" id="gifSearch">Go</button>
        </form>
      
          <div class="displayGiphy"></div>

  <button type="button" id="${dataType}-${postId}-reply-button"  class="form-btn btn nav-button">Send reply</button>
  
`;
}

module.exports = postNewPost;
module.exports = getAllPosts;
