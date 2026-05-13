const form = document.getElementById('searchForm');
const searchInput = document.getElementById('search');
const Found=document.getElementById('notFound');

form.addEventListener('submit', function(event) {
  event.preventDefault(); 
  
  let searchQuery = searchInput.value.trim();
  console.log("The user searched for:", searchQuery);

  const list = document.getElementById('myList');
  
  // AJAX call to Django backend
  fetch(`/search-books/?query=${encodeURIComponent(searchQuery)}`)
    .then(response => response.json())
    .then(data => {
      list.innerHTML = ''; // Clear current list
      
      if (data.results.length === 0) {
        Found.style.display = 'block';
      } else {
        Found.style.display = 'none';
        data.results.forEach(book => {
          const li = document.createElement('li');
          li.className = 'main-card';
          
          let imgHtml = book.cover_image ? `<div><img src="${book.cover_image}" alt="${book.title}" /></div>` : '';
          let borrowBtnHtml = '';
          
          if (!book.borrowed) {
             // Note: In a real AJAX app, we'd need a CSRF token for the borrow form if we did it via AJAX too.
             // For now, keeping the link/form style but rendering it via JS.
             borrowBtnHtml = `
               <form action="/borrow/${book.id}/" method="POST" style="width: 100%;">
                 <input type="hidden" name="csrfmiddlewaretoken" value="${getCookie('csrftoken')}">
                 <button type="submit" class="card-btn">Borrow Book</button>
               </form>
             `;
          } else {
             borrowBtnHtml = `<button class="card-btn" disabled style="background-color: #ccc; cursor: not-allowed;">Already Borrowed</button>`;
          }

          li.innerHTML = `
            ${imgHtml}
            <div class="card-text">
              <h4>${book.title}</h4>
              <p>Price: <span>$${book.price}</span></p>
              <p>Author: ${book.author}</p>
              <p>Category: ${book.category}</p>
              <p class="${book.borrowed ? 'unavailable' : 'available'}">${book.borrowed ? 'Not Available' : 'Available'}</p>
            </div>
            <div class="container-flex-column">
              <a href="${book.details_url}">
                <button class="card-btn">Product Details</button>
              </a>
              ${borrowBtnHtml}
            </div>
          `;
          list.appendChild(li);
        });
      }
    })
    .catch(error => {
      console.error('Error searching books:', error);
    });
});

// Helper function to get CSRF token from cookies
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


