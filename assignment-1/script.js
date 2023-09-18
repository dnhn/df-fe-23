function getBooksData() {
  try {
    return JSON.parse(localStorage.getItem('booksData'));
  } catch (error) {
    return null;
  }
}

function setBooksData(data) {
  localStorage.setItem('booksData', JSON.stringify(data));
}

const storedData = getBooksData();
const topics = {
  backend: 'Back-end',
  frontend: 'Front-end',
  fullstack: 'Full stack',
  programming: 'Programming',
  vcs: 'Version control',
};
let books = storedData ? storedData : [
  {
    id: Date.now(),
    title: 'HTML & CSS 101',
    author: 'World Wide Web Consortium',
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
    title: 'JavaScript Design Patterns',
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
      books = books.filter(book => book.id.toString() !== element.dataset.id);
      setBooksData(books);

      if (!books.length || search.value) {
        renderList();
      } else {
        element.remove();
      }
    }
  });

  element.querySelector('.row__cancel').addEventListener('click', () => {
    element.classList.remove('row--confirm');
  });
}

function renderList() {
  const filtered = books.filter(book => book.title.toLowerCase().includes(search.value.toLowerCase()));
  let html = '';
  const tbody = document.querySelector('.book-list tbody');

  for (let i = 0; i < filtered.length; i++) {
    html += bookTemplate(filtered[i]);
  }

  if (filtered.length) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();

    tbody.replaceChildren(...template.content.childNodes);
    document.querySelectorAll('.book-list .row').forEach(row => addDeleteEventListener(row));
  } else {
    const template = document.createElement('template');
    template.innerHTML = '<tr class="empty"><td colspan="4">No books</td></tr>';

    tbody.replaceChildren(...template.content.childNodes);
  }
}

let typeTimeout = undefined;

search.addEventListener('input', () => {
  clearTimeout(typeTimeout);
  typeTimeout = setTimeout(renderList, 300);
});

document.querySelector('.search__clear').addEventListener('click', () => {
  if (search.value) {
    search.value = '';
    renderList();
  }
});

function addBookConfirm() {
  addRow.classList.toggle('row--confirm');
  addBookForm[0].focus();
}

document.querySelector('.book-list .add-row .row__action').addEventListener('click', addBookConfirm);
document.querySelector('.book-list .add-row .row__cancel').addEventListener('click', addBookConfirm);
document.querySelector('.table-header .add-book').addEventListener('click', addBookConfirm);

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
  setBooksData(books);

  if (search.value) {
    renderList();
  } else {
    document.querySelector('.book-list tbody').insertAdjacentHTML('beforeend', bookTemplate(book));
    addDeleteEventListener(document.querySelector('.book-list tbody tr:last-child'));
  }

  form.reset();
  addRow.classList.remove('row--confirm');
});

renderList(books);
