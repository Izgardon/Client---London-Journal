/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const postNewPost = require('../assets/scripts/index');
const getAllPosts = require('../assets/scripts/index');
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
});

describe('getAllPosts', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('getAllPosts makes a fetch call to the given express api url: /general', async () => {
    await getAllPosts('general');
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/general');
  });
});

describe('postNewPosts', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('postNewPost makes a fetch call to the /general api endpoint', async () => {
    const dataType = 'general';
    postNewPost(dataType);
    expect(fetch).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledWith('http://localhost:3000/general');
  });
});

// describe('append function', () => {
//   test();
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
