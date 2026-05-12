const form = document.getElementById('searchForm');
const searchInput = document.getElementById('search');
const Found=document.getElementById('notFound');

form.addEventListener('submit', function(event) {
  
  event.preventDefault(); 
  
  let searchQuery = searchInput.value.toLowerCase();
  console.log("The user searched for:", searchQuery);

  const list = document.getElementById('myList');
  const items = list.getElementsByTagName('li');
  let count=0;
  for (let i = 0; i < items.length; i++) {
    
    let textValue = items[i].textContent || items[i].innerText;

    if (textValue.toLowerCase().includes(searchQuery)) {
      count++;
      items[i].style.display = "";
      
    } else {
      
      items[i].style.display = "none";
      
    }
  }
  if(count==0){
    Found.style.display='block';
  }
  else{
    Found.style.display='none';
  }
});


