// let libraryBooks = JSON.parse(localStorage.getItem("libraryBooks"));

// function getCurrentUser() {
//   const user = localStorage.getItem("currentUser");
//   return user ? JSON.parse(user) : null;
// }

// const currentUser = getCurrentUser();
// const currentPage = window.location.pathname.split("/").pop();

// const publicPages = ["index.html", "Login.html", "Signup.html", ""];

// if (
//   (!currentUser || !currentUser.loggedIn) &&
//   !publicPages.includes(currentPage)
// ) {
//   window.location.href = "index.html";
// }

// if (
//   window.location.href.includes("admin_dashboard.html") ||
//   window.location.href.includes("add_book.html") ||
//   window.location.href.includes("edit_book.html")
// ) {
//   if (currentUser.type !== "Admin") {
//     window.location.href = "User_Dashboard.html";
//   }
// }

// if (
//   window.location.href.includes("User_Dashboard.html") ||
//   window.location.href.includes("Book_Details.html") ||
//   window.location.href.includes("Borrowed_Book.html")
// ) {
//   if (currentUser.type !== "User") {
//     window.location.href = "admin_dashboard.html";
//   }
// }

// if (!libraryBooks) {
//   libraryBooks = [
//     {
//       id: 1,
//       title: "اللص و الكلاب",
//       author: "Nagib Mahfoz",
//       category: "Fiction",
//       price: "$20",
//       status: "Available",
//       image: "/static/assests/book1.jpg",
//     },
//     {
//       id: 2,
//       title: "المرآة الاسلام",
//       author: "Taha Hussein",
//       category: "History",
//       price: "$15",
//       status: "Not Available",
//       image: "/static/assests/book2.jpg",
//     },
//     {
//       id: 3,
//       title: "Romeo and Juliet",
//       author: "William Shakespeare",
//       category: "Fiction",
//       price: "$40",
//       status: "Available",
//       image: "/static/assests/book3.jpg",
//     },
//     {
//       id: 4,
//       title: "The Great Gatsby",
//       author: "F. Scott Fitzgerald",
//       category: "Fiction",
//       price: "$35",
//       status: "Available",
//       image: "/static/assests/book4.jpg",
//     },
//   ];
//   localStorage.setItem("libraryBooks", JSON.stringify(libraryBooks));
// }

// function displayBooks(booksArray) {
//   const container = document.getElementById("book_container");
//   container.innerHTML = "";

//   booksArray.forEach((book) => {
//     let buttonHtml = "";
//     let statusClass = "";

//     if (book.status === "Available") {
//       buttonHtml = `<button onclick="borrowBook(${book.id})">Borrow</button>`;
//       statusClass = "available";
//     } else {
//       buttonHtml = `<button class="disabled" disabled>Unavailable</button>`;
//       statusClass = "unavailable";
//     }

//     container.innerHTML += `
//             <div class="book-column">
//                 <div class="book-card">
//                     <img src="${book.image}" alt="Book Image" width="100px" height="150px" />
//                     <h3>${book.title}</h3>
//                     <p><strong>Author:</strong> ${book.author}</p>
//                     <p><strong>Category:</strong> ${book.category}</p>
//                     <p><strong>Price:</strong> ${book.price}</p>
//                     <p class="${statusClass}">${book.status}</p>
//                     ${buttonHtml}
//                     <br><br>
//                     <button onclick="window.location.href='Book_Details.html?id=${book.id}'" style="margin-top: 10px;width: auto;border-radius: 50px;">View Details</button>
//                 </div>
//             </div>
//         `;
//     //<a href="Book_Details.html?id=${book.id}" style="color: #3f72af; text-decoration: underline;">View Details</a>
//   });
// }

// function borrowBook(bookId) {
//   const bookIndex = libraryBooks.findIndex((b) => b.id === bookId);

//   if (bookIndex !== -1 && libraryBooks[bookIndex].status === "Available") {
//     libraryBooks[bookIndex].status = "Not Available";
//     localStorage.setItem("libraryBooks", JSON.stringify(libraryBooks));

//     if (document.getElementById("book_container")) {
//       displayBooks(libraryBooks);
//     }
//     if (document.getElementById("Book-Display")) {
//       renderBookDetails();
//     }

//     alert(`You have borrowed "${libraryBooks[bookIndex].title}".`);
//   }
// }

// function renderBookDetails() {
//   const container = document.getElementById("Book-Display");
//   if (!container) return;

//   const urlParams = new URLSearchParams(window.location.search);
//   const bookId = parseInt(urlParams.get("id"));
//   const book = libraryBooks.find((b) => b.id === bookId);

//   if (!book) {
//     container.innerHTML = `<h2 style="text-align:center; padding: 50px; width: 100%;">Book not found. Please return to the dashboard.</h2>`;
//     return;
//   }

//   let buttonHtml = "";
//   let statusClass = "";

//   if (book.status === "Available") {
//     statusClass = "available";
//     buttonHtml = `<button onclick="borrowBook(${book.id})" style="background-color: #3f72af; color: white; padding: 10px 20px; border: none; cursor: pointer; font-size: 16px;">Borrow Book</button>`;
//   } else {
//     statusClass = "unavailable";
//     buttonHtml = `<button class="disabled" disabled style="background-color: #cccccc; color: #666; padding: 10px 20px; border: none; cursor: not-allowed; font-size: 16px;">Unavailable</button>`;
//   }

//   container.innerHTML = `
//         <div style="display: flex; gap: 40px; background: white; padding: 30px; border: 1px solid #dbe2ef; border-radius: 8px; width: 80%; margin: 0 auto;">
//             <div style="flex-shrink: 0;">
//                 <img src="${book.image}" alt="Book Cover" style="width: 250px; height: 350px; object-fit: contain; border: 1px solid #ccc;">
//             </div>
//             <div style="flex-grow: 1;">
//                 <h1 style="color: #112d4e; margin-bottom: 10px;">${book.title}</h1>
//                 <p><strong>Book ID:</strong> ${book.id}</p>
//                 <p><strong>Author:</strong> ${book.author}</p>
//                 <p><strong>Category:</strong> ${book.category}</p>
//                 <p><strong>Price:</strong> ${book.price}</p>
//                 <p class="${statusClass}" style="font-size: 18px; font-weight: bold; margin: 15px 0;">Status: ${book.status}</p>
                
//                 <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
                
//                 <h3 style="color: #112d4e;">Description</h3>
//                 <p style="line-height: 1.6; color: #333;">lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
                
//                 <div style="margin-top: 30px;">
//                     ${buttonHtml}
//                 </div>
//             </div>
//         </div>
//     `;
// }

// if (document.getElementById("book_container")) {
//   displayBooks(libraryBooks);

//   document.getElementById("searchBtn").addEventListener("click", function () {
//     let query = document.getElementById("searchInput").value.toLowerCase();
//     let filteredBooks = libraryBooks.filter(
//       (book) =>
//         book.title.toLowerCase().includes(query) ||
//         book.author.toLowerCase().includes(query) ||
//         book.category.toLowerCase().includes(query),
//     );
//     displayBooks(filteredBooks);
//   });
// }

// if (document.getElementById("Book-Display")) {
//   renderBookDetails();
// }

// function navSearchFunc() {
//   const query = document.getElementById("navSearch").value.toLowerCase().trim();

//   if (!query) {
//     if (document.getElementById("book_container")) {
//       displayBooks(libraryBooks);
//     }
//     return;
//   }

//   const filteredBooks = libraryBooks.filter(
//     (book) =>
//       book.title.toLowerCase().includes(query) ||
//       book.author.toLowerCase().includes(query) ||
//       book.category.toLowerCase().includes(query),
//   );

//   if (document.getElementById("book_container")) {
//     displayBooks(filteredBooks);
//   } else {
//     alert(`Found ${filteredBooks.length} books matching "${query}"`);
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const searchInput = document.getElementById("navSearch");
//   if (searchInput) {
//     searchInput.addEventListener("keypress", (event) => {
//       if (event.key === "Enter") {
//         event.preventDefault();
//         navSearchFunc();
//       }
//     });
//   }
// });

// function displayBorrowedBooks() {
//   const borrowedBooks = libraryBooks.filter(
//     (book) => book.status === "Not Available",
//   );
//   const tableBody = document.getElementById("borrowedBooksTableBody");
//   tableBody.innerHTML = "";

//   borrowedBooks.forEach((book) => {
//     const row = document.createElement("tr");
//     row.innerHTML = `
//       <td><img src="${book.image}" alt="Book Image" width="100px" /></td>
//       <td>${book.title}</td>
//       <td>${book.author}</td>
//       <td>${book.category}</td>
//       <td>${book.price}</td>
//       <td><button onclick="returnBook(${book.id})" style="background-color: #3f72af; color: white; padding: 5px 10px; border: none; cursor: pointer;">Return</button></td>
//     `;
//     tableBody.appendChild(row);
//   });
// }

// if (document.getElementById("borrowedBooksTableBody")) {
//   displayBorrowedBooks();
// }

// function returnBook(bookId) {
//   const bookIndex = libraryBooks.findIndex((b) => b.id === bookId);

//   if (bookIndex !== -1) {
//     libraryBooks[bookIndex].status = "Available";
//     localStorage.setItem("libraryBooks", JSON.stringify(libraryBooks));

//     if (document.getElementById("borrowedBooksTableBody")) {
//       displayBorrowedBooks();
//     }

//     alert(`You have returned "${libraryBooks[bookIndex].title}".`);
//   }
// }

// function updateNavigation() {
//   const currentUser = getCurrentUser();
//   const navLists = document.querySelectorAll("nav ul");

//   navLists.forEach((navUl) => {
//     if (currentUser && currentUser.loggedIn) {
//       navUl.innerHTML = `
//         <li><a href="index.html">Home</a></li>
//         <li><a href="${currentUser.type === "Admin" ? "admin_dashboard.html" : "User_Dashboard.html"}">Dashboard</a></li>
//         ${currentUser.type === "User" ? `<li><a href="Borrowed_Book.html">My Borrowed Books</a></li>` : ""}
        
//         <!-- Username and Logout grouped together -->
//         <li><a href="#">${currentUser.username}</a></li>
//         <li><a href="#" id="logout-link">Logout</a></li>
        
//         <!-- Search bar on the far right -->
//         <li id="nav_search" style="margin-left: auto;">
//           <input type="text" id="navSearch" placeholder="Search books..." />
//         </li>
//       `;
//     } else {
//       navUl.innerHTML = `
//         <li><a href="index.html">Home</a></li>
//         <li><a href="Login.html">Login</a></li>
//         <li><a href="Signup.html">Signup</a></li>
//       `;
//     }
//   });

//   // Logout handler
//   const logoutLink = document.getElementById("logout-link");
//   if (logoutLink) {
//     logoutLink.addEventListener("click", function (e) {
//       e.preventDefault();
//       localStorage.removeItem("currentUser");
//       window.location.href = "index.html";
//     });
//   }

//   // Re-attach search handler
//   const searchInput = document.getElementById("navSearch");
//   if (searchInput) {
//     searchInput.addEventListener("keypress", (event) => {
//       if (event.key === "Enter") {
//         event.preventDefault();
//         navSearchFunc();
//       }
//     });
//   }
// }

// document.addEventListener("DOMContentLoaded", function () {
//   updateNavigation();
// });

// function displayIndexBooks() {
//   const container = document.getElementById("myList");
//   if (!container) return;

//   container.innerHTML = "";

//   libraryBooks.forEach((book) => {
//     const isAvailable = book.status === "Available";

//     const card = `
//       <li class="main-card">
//         <div><img src="${book.image}" alt="${book.title}" /></div>
//         <div class="card-text">
//           <h4>${book.title}</h4>
//           <p>Price : <span>${book.price}</span></p>
//           <p>author: ${book.author}</p>
//           <p>category: ${book.category}</p>
//           <p>${isAvailable ? "Avaliable" : "Not Avaliable"}</p>
//         </div>
//         <div class="container-flex-column">
//           <a href="Book_Details.html?id=${book.id}">
//             <button class="card-btn">Product Details</button>
//           </a>
//           <button onclick="borrowBook(${book.id})" class="card-btn">
//             ${isAvailable ? "Borrow Book" : "Not Avaliable"}
//           </button>
//         </div>
//       </li>
//     `;

//     container.innerHTML += card;
//   });
// }

// if (document.getElementById("myList")) {
//   displayIndexBooks();
// }
