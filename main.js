let myLibrary = [];

const getID = () => {
    return Math.floor(Math.random() * 10000)
}

function Book(bookname, author, pageNum) {
    
    this.bookname = bookname;
    this.author = author;
    this.pageNum = pageNum;
    this.read = "UNREAD";
    this.id = getID();
}

function addBookToLibrary(book) {
    myLibrary.push(book)
}
/*
const objectMap = (obj, fn) =>
    Object.fromEntries(
      Object.entries(obj).map(
        ([k, v], i) => [k, fn(v, k, i)]
      )
    )
*/

const delBook = (id) => {
    myLibrary = myLibrary.filter(n => n.id !== id)
    let delRow = document.getElementById(`row${id}`);
    console.log(delRow )
    delRow.remove()
}

const markAsRead = (id) => {
    console.log('markAsRead')
    let readCell = document.getElementById(`read${id}`)
    let readButton = document.getElementById(`readButton${id}`)
    if (readCell.textContent === 'READ') {
        readCell.textContent = 'UNREAD' 
        readButton.textContent = "mark as read" 
        myLibrary.map( n => n.id !== id ? n : n.read = 'unread')
      } else {
        readCell.textContent = 'READ'
        readButton.textContent = "mark as unread"
        myLibrary.map( n => n.id !== id ? n : n.read = 'read')
      } 
  
    console.log(myLibrary)
}

const addRow = (n, idx) => {
    let table = document.getElementById("bookTable");
    let row = table.insertRow(-1);
    row.id = `row${n.id}`
    let cell = row.insertCell(-1);
    cell.innerHTML = n.bookname;
    let cell2 = row.insertCell(-1);
    cell2.innerHTML = n.author;
    let cell3 = row.insertCell(-1);
    cell3.innerHTML = n.pageNum;
    let cell4 = row.insertCell(-1);
    let newSpan = document.createElement("span")
    newSpan.id = `read${n.id}`
    newSpan.textContent = n.read
    cell4.append(newSpan)
    
    //add "mark as read button"
    let readButton = document.createElement("button")
    readButton.type = 'button'
    readButton.textContent = "mark as read"
    readButton.id = `readButton${n.id}`
    readButton.addEventListener("click", () => markAsRead(n.id))
    cell4.append(readButton)

    //add delete button
    let delButton = document.createElement("button")
    delButton.type = 'button'
    delButton.textContent = "delete"
    delButton.addEventListener("click", () => delBook(n.id))
    row.insertCell(-1).append(delButton)
}

const displayLibrary = (myLibrary) => {
    myLibrary.map( (n, idx )=> addRow(n, idx))  
}
const addBookButton = document.getElementById("addBook")
const addBookDialog = document.getElementById("addBookDialog")
const formEl = addBookDialog.querySelector("form")
const confirmBtn = addBookDialog.querySelector("#confirmBtn")

addBookButton.addEventListener("click", () => {
    addBookDialog.showModal();
})


confirmBtn.addEventListener("click", function (e) {
    e.preventDefault();
    let newBook = new Book(
        formEl.bookname.value,
        formEl.author.value,
        formEl.pageNum.value)
    addBookToLibrary(newBook)
    addRow(newBook, myLibrary.length-1)
    addBookDialog.close()
});

const book1 = new Book ('Happy', 'Billie', '190')
const book2 = new Book ('Murasaki', 'Juno', '200')
const book3 = new Book ('Google Map Instructions', 'Hellboy', '500')

addBookToLibrary(book1)
addBookToLibrary(book2)
addBookToLibrary(book3)


displayLibrary(myLibrary)