const topics = {
  backend: 'Back-end',
  frontend: 'Front-end',
  fullstack: 'Full stack',
  programming: 'Programming',
  vcs: 'Version control',
};
let books = [
  {
    id: Date.now(),
    title: 'HTML & CSS 101',
    author: 'W3C',
    topic: 'Front-end',
  },
  {
    id: Date.now() + 1000,
    title: 'Responsive Web Design',
    author: 'Ethan Marcotte',
    topic: 'Front-end',
  },
  {
    id: Date.now() + 2000,
    title: 'JavaScript Patterns',
    author: 'Addy Osmani',
    topic: 'Programming',
  },
  {
    id: Date.now() + 3000,
    title: 'Git',
    author: 'Linus Torvalds',
    topic: 'Version Control',
  },
];

const search = document.getElementById('search');
const addRow = document.querySelector('.add-row');
const addBookForm = document.getElementById('add-book-form');
const bookTemplate = ({ id, title, author, topic }) =>
  `<tr class="row book-row" data-id="${id}">
  <td>${title}</td>
  <td>${author}</td>
  <td>${topic}</td>
  <td class="row__actions">
    <button type="button" class="row__action btn btn--warning">Delete</button>
    <div class="row__confirm">
      <button type="button" class="row__confirm-action btn">Confirm</button>
      <button type="button" class="row__cancel btn btn--error">Cancel</button>
    </div>
  </td>
</tr>`;

function addDeleteEventListener(element) {
  element.querySelector('.row__action').addEventListener('click', () => {
    element.classList.add('row--confirm');

    if (element.classList.contains('add-row')) {
      addBookForm[0].focus();
    }
  });

  element.querySelector('.row__confirm-action').addEventListener('click', () => {
    if (element.classList.contains('book-row')) {
      element.remove();
    }
  });

  element.querySelector('.row__cancel').addEventListener('click', () => {
    element.classList.remove('row--confirm');
  });
}

function renderList() {
  let html = '';

  for (let i = 0; i < books.length; i++) {
    html += bookTemplate(books[i]);
  }

  if (html.length) {
    document.querySelector('.book-list tbody').textContent = '';
    document.querySelector('.book-list tbody').insertAdjacentHTML('beforeend', html);
    document.querySelectorAll('.book-list .row').forEach(row => addDeleteEventListener(row));
  }
}

document.querySelector('.table-header button').addEventListener('click', () => {
  addRow.classList.toggle('row--confirm');
  addBookForm[0].focus();
});

addBookForm.addEventListener('submit', event => {
  event.preventDefault();

  const form = event.target;
  const book = {
    id: Date.now(),
    title: form[0].value,
    author: form[1].value,
    topic: topics[form[2].value],
  };

  books.push(book);
  document.querySelector('.book-list tbody').insertAdjacentHTML('beforeend', bookTemplate(book));
  addDeleteEventListener(document.querySelector('.book-list tbody tr:last-child'));

  form.reset();
  addRow.classList.remove('row--confirm');
});

renderList();
