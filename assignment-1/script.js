(() => {
  // Local storage processing
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
  // Source of Truth
  let books = storedData ? storedData : [
    {
      id: Date.now(),
      title: 'CSS Secrets',
      author: 'Lea Verou',
      topic: 'frontend',
    },
    {
      id: Date.now() + 1000,
      title: 'Responsive Web Design',
      author: 'Ethan Marcotte',
      topic: 'frontend',
    },
    {
      id: Date.now() + 2000,
      title: 'JavaScript Design Patterns',
      author: 'Addy Osmani',
      topic: 'programming',
    },
    {
      id: Date.now() + 3000,
      title: 'Git',
      author: 'Linus Torvalds',
      topic: 'vcs',
    },
  ];

  const search = document.getElementById('search');
  const addRow = document.getElementsByClassName('add-row')[0];
  const addBookForm = document.getElementById('add-book-form');
  const bookTemplate = ({ id, title, author, topic }) =>
    `<tr class="row book-row" data-id="${id}">
    <td>${title}</td>
    <td>${author}</td>
    <td>${topics[topic]}</td>
    <td class="row__actions">
      <button type="button" class="row__action btn btn--warning">Delete</button>
      <div class="row__confirm">
        <button type="button" class="row__confirm-action btn">Confirm</button>
        <button type="button" class="row__cancel btn btn--error">Cancel</button>
      </div>
    </td>
  </tr>`;

  // Attach event listeners to new elements
  function addDeleteEventListener(element) {
    element.querySelector('.row__action').addEventListener('click', () => {
      element.classList.add('row--confirm');

      if (element.classList.contains('add-row')) {
        addBookForm[0].focus();
      }
    });

    element.querySelector('.row__confirm-action').addEventListener('click', () => {
      books = books.filter(book => book.id.toString() !== element.dataset.id);
      setBooksData(books);

      if (!books.length || search.value) {
        renderList();
      } else {
        element.remove();
      }
    });

    element.querySelector('.row__cancel').addEventListener('click', () => {
      element.classList.remove('row--confirm');
    });
  }

  function renderList() {
    // Search keyword filtering
    const filtered = books.filter(book => book.title.toLowerCase().includes(search.value.toLowerCase()));
    const tbody = document.querySelector('.book-list tbody');

    if (filtered.length) {
      const template = document.createElement('template');
      let html = '';

      for (let i = 0; i < filtered.length; i++) {
        html += bookTemplate(filtered[i]);
      }

      template.innerHTML = html.trim();

      tbody.replaceChildren(...template.content.childNodes);
      tbody.querySelectorAll('.book-list .book-row').forEach(row => addDeleteEventListener(row));
    } else {
      const template = document.createElement('template');
      template.innerHTML = '<tr class="empty"><td colspan="4">No books</td></tr>';

      tbody.replaceChildren(...template.content.childNodes);
    }
  }

  renderList();

  let typeTimeout = undefined;

  search.addEventListener('input', () => {
    clearTimeout(typeTimeout);

    if (books.length) {
      typeTimeout = setTimeout(renderList, 300);
    }
  });

  document.getElementsByClassName('search__clear')[0].addEventListener('click', () => {
    if (search.value) {
      search.value = '';
      renderList();
    }
  });

  // Toggle book form
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
      title: form.title.value,
      author: form.author.value,
      topic: form.topic.value,
    };

    books.push(book);
    setBooksData(books);

    // Equal to 1 indicates that the previous state is empty
    if (books.length === 1 || search.value) {
      renderList();
    } else {
      document.querySelector('.book-list tbody').insertAdjacentHTML('beforeend', bookTemplate(book));
      addDeleteEventListener(document.querySelector('.book-list tbody tr:last-child'));
    }

    form.reset();
    addRow.classList.remove('row--confirm');
  });
})();
