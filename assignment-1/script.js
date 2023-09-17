const topics = {
  backend: 'Back-end',
  frontend: 'Front-end',
  fullstack: 'Full stack',
  programming: 'Programming',
  vcs: 'Version control',
};

const addRow = document.querySelector('.add-row');
const addBookForm = document.getElementById('add-book-form');
const bookTemplate = (title, author, topic) => `<tr class="row book-row">
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

document.querySelector('.table-header button').addEventListener('click', () => {
  addRow.classList.toggle('row--confirm');
  addBookForm[0].focus();
});

document.querySelectorAll('.book-list .row')
  .forEach(row => addDeleteEventListener(row));

addBookForm.addEventListener('submit', event => {
  event.preventDefault();

  const form = event.target;
  const book = bookTemplate(form[0].value, form[1].value, topics[form[2].value]);

  document.querySelector('.book-list tbody').insertAdjacentHTML('beforeend', book);
  addDeleteEventListener(document.querySelector('.book-list tbody tr:last-child'));

  form.reset();
  addRow.classList.remove('row--confirm');
});
