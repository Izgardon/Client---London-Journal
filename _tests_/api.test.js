/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const jestMock = require('jest-fetch-mock').enableMocks();
const postNewPost = require('../assets/scripts/index');
// global.fetch = require('jest-fetch-mock');

const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');

describe('index.html', () => {
  beforeEach(() => {
    fetch.resetMocks();
    fetchMock.doMock();
  });

  // function postNewPost(dataType, post) {
  //   const options = {
  //     method: 'POST',
  //     body: JSON.stringify(post),
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };
  //   fetch(`http://localhost:3000/${dataType}`, options)
  //     .then((r) => r.json())
  //     .then((postData) => {
  //       append(dataType, postData);
  //     })
  //     .catch(console.warn);
  // }

  test('it makes a fetch call to the /general api endpoint', async () => {
    const dataType = 'general';
    await postNewPost(dataType);
    expect(fetch).toHaveBeenCalled();
  });

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

  // test('postNewPost uses POST method', async () => {
  //   expect(postNewPost.options.method).toBe('POST');
  // });

  // test('postNewPost gets data 2 arguments for callback function', async () => {
  // const dataType = await;
  // const postData = await;
  //   expect(dataType).toEqual
  // });
});
