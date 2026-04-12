function getBooks() {
  return JSON.parse(localStorage.getItem("libraryBooks")) || [];
}

function saveBooks(books) {
  localStorage.setItem("libraryBooks", JSON.stringify(books));
}

document.addEventListener("DOMContentLoaded", function () {
  const addForm = document.getElementById("addBookForm");

  if (addForm) {
    addForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const bookId = document.getElementById("id").value;
      const bookName = document.getElementById("name").value;
      const bookAuthor = document.getElementById("author").value;
      const bookCategory = document.getElementById("Category").value;
      const bookDescription = document.getElementById("description").value;

      let books = getBooks();

      const idExists = books.some((b) => String(b.id) === String(bookId));
      if (idExists) {
        alert(
          "Error: A book with this ID already exists! Please use a unique ID.",
        );
        return;
      }

      const newBook = {
        id: bookId,
        name: bookName,
        author: bookAuthor,
        category: bookCategory,
        description: bookDescription,
      };

      books.push(newBook);
      saveBooks(books);

      alert("Book added successfully!");
      addForm.reset();
      window.location.href = "admin_dashboard.html";
    });
  }

  const tableBody = document.getElementById("bookTableBody");

  if (tableBody) {
    function loadBooks() {
      tableBody.innerHTML = "";
      let books = JSON.parse(localStorage.getItem("libraryBooks")) || [];

      books.forEach(function (book) {
        let row = document.createElement("tr");

        row.innerHTML = `
                    <td>${book.id}</td>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>${book.category}</td>
                    <td>${book.description}</td>
                    <td>
                        <a href="edit_book.html?id=${book.id}">Edit</a> | 
                        <a href="#" class="delete-link" data-id="${book.id}">Delete</a>
                    </td>
                `;

        tableBody.appendChild(row);
      });
    }
    loadBooks();

    tableBody.addEventListener("click", function (event) {
      if (event.target.classList.contains("delete-link")) {
        event.preventDefault();

        const bookId = event.target.getAttribute("data-id");

        if (confirm("Are you sure you want to delete this book?")) {
          let books = JSON.parse(localStorage.getItem("libraryBooks")) || [];

          books = books.filter(function (book) {
            return String(book.id) !== String(bookId);
          });

          localStorage.setItem("libraryBooks", JSON.stringify(books));
          loadBooks();
        }
      }
    });
  }

  const bookSelect = document.getElementById("bookSelect");
  const editForm = document.getElementById("editBookForm");
  const deleteBtn = document.getElementById("deleteBtn");

  if (editForm) {
    function fillFormWithBook(bookId) {
      let books = getBooks();
      const bookToEdit = books.find((b) => String(b.id) === String(bookId));
      if (bookToEdit) {
        document.getElementById("id").value = bookToEdit.id;
        document.getElementById("name").value = bookToEdit.name;
        document.getElementById("author").value = bookToEdit.author;
        document.getElementById("Category").value = bookToEdit.category;
        document.getElementById("description").value = bookToEdit.description;

        if (bookSelect) {
          bookSelect.value = bookToEdit.id;
        }
      } else {
        editForm.reset();
      }
    }

    if (bookSelect) {
      function populateBookSelect() {
        let books = getBooks();
        bookSelect.innerHTML = '<option value="">-- Choose a book --</option>';
        books.forEach(function (book) {
          let option = document.createElement("option");
          option.value = book.id;
          option.textContent = `ID: ${book.id} - ${book.name}`;
          bookSelect.appendChild(option);
        });
      }
      populateBookSelect();

      bookSelect.addEventListener("change", function () {
        fillFormWithBook(bookSelect.value);
      });
    }

    const urlParams = new URLSearchParams(window.location.search);
    const urlId = urlParams.get("id");
    if (urlId) {
      fillFormWithBook(urlId);
    }

    editForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const currentId = document.getElementById("id").value;

      if (!currentId) {
        alert("Please select a book to edit first!");
        return;
      }
      let books = getBooks();
      const bookIndex = books.findIndex(
        (b) => String(b.id) === String(currentId),
      );

      if (bookIndex !== -1) {
        books[bookIndex].name = document.getElementById("name").value;
        books[bookIndex].author = document.getElementById("author").value;
        books[bookIndex].category = document.getElementById("Category").value;
        books[bookIndex].description =
          document.getElementById("description").value;

        localStorage.setItem("libraryBooks", JSON.stringify(books));
        alert("Book updated successfully!");
        window.location.href = "admin_dashboard.html";
      }
    });

    if (deleteBtn) {
      deleteBtn.addEventListener("click", function () {
        const currentId = document.getElementById("id").value;
        if (!currentId) {
          alert("Please select a book to delete!");
          return;
        }

        if (confirm("Are you sure you want to delete this book?")) {
          let books = getBooks();
          books = books.filter((b) => String(b.id) !== String(currentId));
          saveBooks(books);
          alert("Book deleted!");
          window.location.href = "admin_dashboard.html";
        }
      });
    }
  }
});
