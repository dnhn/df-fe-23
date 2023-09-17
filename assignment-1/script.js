document.querySelectorAll('table .row')
  .forEach(row => {
    row.querySelector('.row__action').addEventListener('click', () => {
      row.classList.add('row--confirm');
    });

    row.querySelector('.row__confirm').addEventListener('click', () => {
      if (row.classList.contains('book-row')) {
        row.remove();
      }
    });

    row.querySelector('.row__cancel').addEventListener('click', () => {
      row.classList.remove('row--confirm');
    });
  });
