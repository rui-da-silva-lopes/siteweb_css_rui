
const pages = [
  { href: 'menu.html',  label: 'Menu' },
  { href: 'page1.html', label: 'Page 1' },
  { href: 'page2.html', label: 'Page 2' },
  { href: 'page3.html', label: 'Page 3' },
  { href: 'page4.html', label: 'Page 4' },
  { href: 'page5.html', label: 'Page 5' },
];

const current = window.location.pathname.split('/').pop() || 'index.html';
const links = pages
  .filter(p => p.href !== current)
  .map(p => `<a href="${p.href}">${p.label}</a>`)
  .join('');

document.body.insertAdjacentHTML('afterbegin', `<header>${links}</header>`);