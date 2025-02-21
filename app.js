const newBookBtn = document.querySelector(".add-book");
const libraryForm = document.querySelector(".libraryForm");
const booksCards = document.querySelector(".books-cards");
const myLibrary = [];

newBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  libraryForm.style.display = "flex";
});

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead() {
    this.read = !this.read;
  }
}

function addBookToLibrary(event) {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value === "yes";

  if (isNaN(pages) || pages < 0) {
    alert("Please enter a valid number of pages.");
    return;
  }

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);

  displayBooks();
  clearForm();
  libraryForm.style.display = "none";

  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function displayBooks() {
  booksCards.innerHTML = "";

  for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];

    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    let readStatus = book.read ? "Yes" : "No";
    let readBackgroundColor = book.read ? "lightgreen" : "red";

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Autor: ${book.author}</p>
      <p>Páginas: ${book.pages}</p>
      <p>Leído: <span style="background-color: ${readBackgroundColor};">${readStatus}</span></p>
    `;

    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.classList.add("delete-book-btn");
    deleteBookBtn.textContent = "Eliminar";
    deleteBookBtn.dataset.index = i;

    deleteBookBtn.addEventListener("click", () => {
      const indexToDelete = parseInt(deleteBookBtn.dataset.index);
      myLibrary.splice(indexToDelete, 1);
      displayBooks();
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    });

    const readButton = document.createElement("button");
    readButton.classList.add("toggle-read-btn");
    readButton.textContent = "Cambiar Leído";
    readButton.dataset.index = i;
    readButton.addEventListener("click", () => {
      const index = parseInt(readButton.dataset.index);
      myLibrary[index].toggleRead();
      displayBooks();
      localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    });

    bookCard.appendChild(deleteBookBtn);
    bookCard.appendChild(readButton);
    booksCards.appendChild(bookCard);
  }
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").selectedIndex = 0;
}

libraryForm.addEventListener("submit", addBookToLibrary);

window.addEventListener("DOMContentLoaded", (event) => {
  const storedLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  if (storedLibrary) {
    myLibrary.push(
      ...storedLibrary.map(
        (book) => new Book(book.title, book.author, book.pages, book.read)
      )
    );
    displayBooks();
  }
});

displayBooks();
