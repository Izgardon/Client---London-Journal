/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

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
