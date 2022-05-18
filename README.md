<h1 align="center">London journal</h1>

<p align="center">
<img src="https://i.ibb.co/k0fJSY8/hugo-sousa-1-Z7-QDZq-T2-QQ-verysmall.jpg">
</p>

<div align="center">

[London journal](https://journal-to-end-all-journals.herokuapp.com/) is an application for travelling to London. It allows you to find out about best places where to go and what to do according to people's own experiences and opinions. It is designed to offer freedom to interact with the posts by liking or disliking them, adding comments and adding your own story/experience of London trip.

<br>

</div>

---

---

<br>

## Installation & usage

- Open the webpage here: [London journal](https://journal-to-end-all-journals.herokuapp.com/) OR
- Clone or download code and run npm dev

## Technologies

- HTML
- CSS
- JavaScript/Node.js
- Heroku
- Git/Github
- Express
- Jest
- Supertest
- Wireframes

## Process

- Planning

  - Choosing a topic - London and travelling
  - Creating a vision of our webpage for mobile first approach:

    - Using Wireframes for visualisation:

    <br>

    <div align="center">

    ![](https://i.ibb.co/L9q6HdT/Screenshot-2022-05-17-120959.png)

    </div>

  - Choosing colours:

The main colours used in this project were:

<div align="center">

#646E95 = blue
#AF4A4A = red

![Blue colour](https://i.ibb.co/0C9wcM5/Screenshot-2022-05-17-095516.png)
![Red colour](https://i.ibb.co/vxYKHm1/Screenshot-real-2022-05-17-095719.png)

</div>

These colours replicate the blue and red of English flag found often in association of England's capital.

- Creating 2 repos - [server](https://github.com/alicekres/Lap-1-Portfolio-Project-Server) and [client](https://github.com/Izgardon/Lap-1-Portfolio-Project-Client)
- Creating api endpoints in server / Backend setup
- Creating main page initial structure with CSS and HTML
- Discussing in more detail the cards structure and webpage functionality
- Deploying server repo (staging branch) to [Heroku](https://dashboard.heroku.com/apps)
- Focusing on Javascript functionality and detailed structure of our webpage (adding new cards to carousels)
- Creating favicon:

<div align="center">

![London journal favicon](https://i.ibb.co/Hz2s6jp/favicon-32x32.png)

</div>

- tackling coding challenges

<br>

---

<br>

## Wins

- managed to add a new post/card dynamically to the correct carousel section

```

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
                  </div>
            </div>
          `
    );
  }
}

```

- learnt how to fetch gifs with the right APIkey and getting it working from different servers

- Adding a modal for posting a new message about user's experience in London

<br>

## Challenges

- Adding APIKey for gifs in heroku and using APIKey manually in developement branches where we were still working at

<div align="center">

![London gif](https://media2.giphy.com/media/jRHOfOfg4vCYkX7sFE/giphy.gif?cid=ecf05e47s480dj5gfl9sdthlpas6zfxx89vxb24vy716j4ji&rid=giphy.gif&ct=g)

</div>

- Adding emojis

## Contribution guide

## Bugs

## Future features

## Licence

[MIT licence](https://opensource.org/licenses/mit-license.php)
