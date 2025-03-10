const booksCards = document.querySelector(".books-cards");

export function displayBooks(myLibrary) {
  booksCards.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const readStatus = book.read ? "Yes" : "No";
    const readBackgroundColor = book.read ? "lightgreen" : "red";

    bookCard.innerHTML = `
      <h3>${book.title}</h3>
      <p>Autor: ${book.author}</p>
      <p>Páginas: ${book.pages}</p>
      <p>Leído: <span style="background-color: ${readBackgroundColor};">${readStatus}</span></p>
    `;

    const deleteBookBtn = document.createElement("button");
    deleteBookBtn.classList.add("delete-book-btn");
    deleteBookBtn.textContent = "Eliminar";
    deleteBookBtn.dataset.index = index;

    const readButton = document.createElement("button");
    readButton.classList.add("toggle-read-btn");
    readButton.textContent = "Cambiar Leído";
    readButton.dataset.index = index;

    bookCard.appendChild(deleteBookBtn);
    bookCard.appendChild(readButton);
    booksCards.appendChild(bookCard);
  });
}

export function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
  document.getElementById("read").selectedIndex = 0;
}
