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
- Balsamiq

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

These colours replicate the blue and red of the Union Jack.

- Creating 2 repos - [server](https://github.com/alicekres/Lap-1-Portfolio-Project-Server) and [client](https://github.com/Izgardon/Lap-1-Portfolio-Project-Client)
- Creating API endpoints in server / Backend setup
- Creating main page initial structure with CSS and HTML
- Discussing in more detail the cards structure and webpage functionality
- Deploying server repo (staging branch) to [Heroku](https://dashboard.heroku.com/apps)
- Creating a modal to post a topic
- Creating a modal to reply to a topic
- Creating Giphy search bar
- Creating favicon:

<div align="center">

![London journal favicon](https://i.ibb.co/Hz2s6jp/favicon-32x32.png)

</div>

- tackling coding challenges

<br>

---

<br>

## Wins

- Deployed through Heroku with no struggle which freed up a lot of time

- Created a server with 3 different routes but built in a way that each function could be universal and would get/post the correct data
  to the correct JSON file

- Learned how to fetch gifs with the right API key and getting it working from different servers

- Adding the modals for posting a new topic and replying to a topic about the user's experience in London

- Created a function that worked for both sending a normal reply and for sending a gif reply when one was chosen

- Search bar to return great keyword matches and then display all results in a new carousel which could contain data from all 3 datatypes

- managed to add a new post/card dynamically to the correct carousel section - clears all posts then re-displays as to not refresh the page

- created one patch function that patches for both emoji count and replies

- great test coverage on server side

```
//Universal Function that deals with appending the posts to the correct carousel page (including search)
//This was complicated as we want to post new posts in the first position, but it wasnt as simple as just reversing the array due to
//how the pages worked

function append(dataType, post, allData, position) {
  let postNumber = allData.length + 1 - `${position + 1}`;

  let page = Math.ceil(postNumber / 3);

  //First if block is seeing whether it needs to add a new carousel page and then also appends the first new post

  if (postNumber % 3 == 1) {
    document
      .querySelector(`.${dataType}-posts`)
      .insertAdjacentHTML(
        "beforeend",
        `<div class="carousel-item ${
          page == 1 ? "active" : ""
        }  ${dataType}-${page}"></div>`
      );
    document
      .querySelector(`.${dataType}-${page}`)
      .insertAdjacentHTML("beforeend", returnPost(dataType, post));
  }

  //Else statement deals with just adding new posts to current carousel page
  else {
    document
      .querySelector(`.${dataType}-${page}`)
      .insertAdjacentHTML("beforeend", returnPost(dataType, post));
  }
}


```

<br>

## Challenges

- Dynamically adding a new card to the carousel with the correct content and ID.
- Adding API key for gifs in heroku and using APIKey manually in the development branches we were still working on.
- Making sure the correct replies were collected depending on which post you opened up - as it worked through one modal.

<div align="center">

![London gif](https://media2.giphy.com/media/jRHOfOfg4vCYkX7sFE/giphy.gif?cid=ecf05e47s480dj5gfl9sdthlpas6zfxx89vxb24vy716j4ji&rid=giphy.gif&ct=g)

</div>

- Making emojis interactive so that the count goes up and a user can't click on the same emoji straight away countless times

- Adding search bar and being able to find a right card / topic among 3 different carousels full of their own array of cards

## Contribution guide

Wireframes - Shoreen

Favicon - Alice

Design - All

Server - William

Displaying posts - Aaron, William

New Post Modal & Reply Modal - Aaron, William

CSS - Aaron, William

Emoji functionality - Aaron, William

Giphy Search - Shoreen

Search Bar- William

README - Alice, Shoreen

Deploying - Alice

Testing - Alice

## Bugs

- Cannot PATCH/ regards to emojis
- Gifs get called 2 x times instead of once upon pressing a button
- Exporting functions and using them in testing file causes the test to run before calling

## Future features

- Extend the search function to the replies
- Contact us page
- Social media links
- User account
- Customised images
- Add reactions to individual replies

## Licence

[MIT licence](https://opensource.org/licenses/mit-license.php)
