//localStorage.clear();

// object to store book information
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    /*this.info = function(){
        return title+" by "+author+", "+pages+" pages, "+read;
    };*/
}

Book.prototype = function readStatus(toggle){
  this.read = toggle;
}

// Open and close form to add a book
function openForm() {
  document.getElementById("popup").style.display = "block";
}
function closeForm() {
  document.getElementById("popup").style.display = "none";
}
// When the user clicks on dashboard outside of the modal, close it
window.onclick = function (event) {
  let modal = document.getElementById("dashboard");
  if (event.target == modal) {
    closeForm();
  }
}

 // local storage available
 function storageAvailable(type) {
  var storage;
  try {
      storage = window[type];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
  }
  catch(e) {
      return e instanceof DOMException && (
          // everything except Firefox
          e.code === 22 ||
          // Firefox
          e.code === 1014 ||
          // test name field too, because code might not be present
          // everything except Firefox
          e.name === 'QuotaExceededError' ||
          // Firefox
          e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
          // acknowledge QuotaExceededError only if there's something already stored
          (storage && storage.length !== 0);
  }
}

//function to list books stored in local storage as a table
function listBooks(){
  console.log(localStorage);
  let Library = JSON.parse(localStorage.getItem('lib'));
  console.log(Library);
  let x = !!(Library);
  console.log(x);
 
  if(x != false && Library != []){
  
  let rows = document.getElementById('book-table').getElementsByTagName('tr');
  let rowCount = rows.length;
  if(rowCount > 1){
    for(let k = 1; k < rowCount; k++){
      document.getElementById("book-table").deleteRow(1);
    }
  }

 
  const table = document.getElementById('book-table');
  let row;
  let cell = [];
  let keys = Object.keys(Library[0]);
  let key;
  let val;
  for(let j = 0; j < Library.length; j++){
    row = table.insertRow(j+1);
      for(let i = 0; i < 5; i++){
        if(i === 4){
          /*let btn = document.createElement('input');
          btn.type = "button";
          btn.id = "del-btn";
          btn.value = Delete;
          btn.onclick = deleteRow(this);
          cell[i] = row.insertCell(i);td.appendChild(btn)*/
          cell[i] = row.insertCell(i);
          cell[i].innerHTML = '<input type="button" value="Delete" onclick="deleteRow(this)">';
        }
        else{
          cell[i] = row.insertCell(i);
          key = keys[i];
          val = Library[j][key];
          cell[i].innerHTML = val;
        }
      }
  }
  }
}

// function to add book to local storage
function addBook(){
    window.addEventListener('submit', (e) => {
        e.preventDefault(); // prevent actual submit

        const title = document.getElementById('title').value;
        const author = document.getElementById('author').value;
        const pages = document.getElementById('pages').value;
        const read = document.getElementById('read').checked;

        const obj = new Book(title,author,pages,read);

        let lib = JSON.parse(localStorage.getItem('lib'));
        if(lib === null){
          lib = [];
        }
        lib.unshift(obj);
        localStorage.setItem('lib',JSON.stringify(lib));

        document.getElementById('form-add').reset();

        let result = JSON.parse(localStorage.getItem('lib'));
        listBooks();
        closeForm();
    });
}

function deleteRow(r) {
  let i = r.parentNode.parentNode.rowIndex;
  console.log(i);
  let lib = JSON.parse(localStorage.getItem('lib'));
  console.log(typeof lib);
  console.log(lib.length);
  console.log(lib[i-1]);
  console.log(lib);
  delete lib[i-1];
  lib = lib.filter(x => x !== null)
  console.log(lib.length);
  if(lib.length < 1) {localStorage.clear();
    document.getElementById("book-table").deleteRow(1);}
  else{
  localStorage.setItem('lib',JSON.stringify(lib));
  listBooks();
  console.log(localStorage);
  }


}

listBooks();

addBook();
