/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const postNewPost = require('../assets/scripts/index');
const getAllPosts = require('../assets/scripts/index');
const returnPost = require('../assets/scripts/index');
const returnReplyModal = require('../assets/scripts/index');
// const append = require('../assets/scripts/index');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('index.html', () => {
  test('html head has a title', () => {
    document.documentElement.innerHTML = html.toString();
    const title = document.querySelector('title');
    expect(title.textContent).toBe('London Travel');
  });

  test('html head has a favicon', () => {
    document.documentElement.innerHTML = html.toString();
    const favicon = document.querySelector('.favicon');
    expect(favicon.rel).toBe('icon');
  });

  test('html body has h1 with London Travel Title', () => {
    document.documentElement.innerHTML = html.toString();
    const h1 = document.querySelector('h1');
    expect(h1).toEqual(h1);
  });
});

describe('getAllPosts', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('getAllPosts makes a fetch call to the given express api url: /general', () => {
    fetch.mockResponseOnce(
      JSON.stringify({
        id: '4',
        title: 'Petersham Nurseries, Covent Garden restaurant',
        body: "Amazing, awesome, that's all what I say.",
        type: 'places',
        replies: [
          'Nice venue however in my opinion too expensive, food was good but I was still hungry when I left',
          'Nice place',
          "There was some strage smell when I visited, don't know, was expecting something was upperclass",
        ],
        reactions: [4, 3, 10],
      })
    );
    getAllPosts('general');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/general');
  });

  test('it catches errors and returns to null', async () => {
    fetch.mockReject(() => {
      'API failure';
    });
  });
});

describe('postNewPosts', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('postNewPost makes a fetch call to the /general api endpoint', async () => {
    const dataType = 'general';
    postNewPost(dataType);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/general');
  });

  describe('returnPost', () => {
    test('returnPost returns a string that is expected with the implemented values', () => {
      const testPost = {
        id: '4',
        title: 'Petersham Nurseries, Covent Garden restaurant',
        body: "Amazing, awesome, that's all what I say.",
        type: 'places',
        replies: [
          'Nice venue however in my opinion too expensive, food was good but I was still hungry when I left',
          'Nice place',
          "There was some strage smell when I visited, don't know, was expecting something was upperclass",
        ],
        reactions: [4, 3, 10],
      };

      expect(returnPost('places', testPost)).toContain(
        '<div class="modal-header">'
      );
    });
  });
});

// describe('append function', () => {
//   test('append should call returnPost function', () => {
//     const returnPost = jest.fn();
//     let testsArray = [
//       {
//         id: '4',
//         title: 'Petersham Nurseries, Covent Garden restaurant',
//         body: "Amazing, awesome, that's all what I say.",
//         type: 'places',
//         replies: [
//           'Nice venue however in my opinion too expensive, food was good but I was still hungry when I left',
//           'Nice place',
//           "There was some strage smell when I visited, don't know, was expecting something was upperclass",
//         ],
//         reactions: [4, 3, 10],
//       },
//       {},
//     ];
//     append('places', testsArray[0], testsArray, 1);
//     expect(returnPost.mock.calls.length).toBe(1);
//   });
// });

// test('getAllPosts catches errors and returns null', async () => {
//   fetch.mockReject(() => Promise.reject('API failure'));

//   const append =
// });

// test('it makes a fetch call to the /general express api url', async () => {
//   const postData = {
//     title: 'title',
//     body: 'value',
//     reactions: [0, 0, 0],
//   };

//   fetch.mockResponse(JSON.stringify(postData));
//   const returnVal = await postNewPost('');
//   expect(returnVal).toBe('Big Ben');
// });

// test('postNewPost uses POST method', async () => {
//   expect(postNewPost).toContain('POST');
// });

// test('postNewPost gets data 2 arguments for callback function', async () => {
// const dataType = await;
// const postData = await;
//   expect(dataType).toEqual
// });
