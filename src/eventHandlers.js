import { Book } from "./classBook.js";
import { displayBooks, clearForm } from "./domUtils.js";
import {
  saveLibraryToStorage,
  loadLibraryFromStorage,
} from "./storageUtils.js";

const newBookBtn = document.querySelector(".add-book");
const libraryForm = document.querySelector(".libraryForm");
const myLibrary = [];

newBookBtn.addEventListener("click", (e) => {
  e.preventDefault();
  libraryForm.style.display = "flex";
});

libraryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value.trim();
  const author = document.getElementById("author").value.trim();
  const pages = document.getElementById("pages").value;
  const read = document.getElementById("read").value === "yes";

  if (!title || !author || pages < 1 || pages > 1000) {
    alert("Please fill out all fields correctly.");
    return;
  }

  const newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);

  displayBooks(myLibrary);
  clearForm();
  libraryForm.style.display = "none";
  saveLibraryToStorage(myLibrary);
});

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("delete-book-btn")) {
    const indexToDelete = parseInt(event.target.dataset.index);
    myLibrary.splice(indexToDelete, 1);
    displayBooks(myLibrary);
    saveLibraryToStorage(myLibrary);
  }

  if (event.target.classList.contains("toggle-read-btn")) {
    const index = parseInt(event.target.dataset.index);
    myLibrary[index].toggleRead();
    displayBooks(myLibrary);
    saveLibraryToStorage(myLibrary);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  const storedLibrary = loadLibraryFromStorage();
  myLibrary.push(
    ...storedLibrary.map(
      (book) => new Book(book.title, book.author, book.pages, book.read)
    )
  );
  displayBooks(myLibrary);
});
