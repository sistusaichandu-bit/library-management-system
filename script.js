


// Initialize books
const books = [
  { title: "To Kill a Mockingbird", author: "Harper Lee", available: 1 },
  { title: "1984", author: "George Orwell", available: 1 },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", available: 4 },
  { title: "The Catcher in the Rye", author: "J.D. Salinger", available: 3 }
];

// Save books if not already in localStorage
if (!localStorage.getItem("books")) {
  localStorage.setItem("books", JSON.stringify(books));
}

// Register Function
function register() {
  const name = document.getElementById("regName").value;
  const roll = document.getElementById("regRoll").value;
  const dob = document.getElementById("regDob").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;

  if (!name || !roll || !email || !password) {
    alert("Please fill all fields!");
    return;
  }

  const users = JSON.parse(localStorage.getItem("users") || "[]");
  users.push({ name, roll, dob, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful!");
  window.location.href = "index.html";
}

// Login Function
function login() {
  const roll = document.getElementById("loginRoll").value;
  const password = document.getElementById("loginPassword").value;
  const users = JSON.parse(localStorage.getItem("users") || "[]");

  const user = users.find(u => u.roll === roll && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials!");
  }
}

// Dashboard Functions
function viewBooks() {
  const bookList = JSON.parse(localStorage.getItem("books"));
  const div = document.getElementById("bookList");
  div.innerHTML = "<h3>Available Books</h3>" +
    bookList.map(b => `<p>${b.title} by ${b.author} - ${b.available} available</p>`).join("");
}

function bookBook() {
  const title = prompt("Enter book title to borrow:");
  const bookList = JSON.parse(localStorage.getItem("books"));
  const book = bookList.find(b => b.title.toLowerCase() === title.toLowerCase());

  if (book && book.available > 0) {
    book.available--;
    localStorage.setItem("books", JSON.stringify(bookList));
    alert(`You borrowed "${book.title}"`);
  } else {
    alert("Book not available!");
  }
}

function returnBook() {
  const title = prompt("Enter book title to return:");
  const bookList = JSON.parse(localStorage.getItem("books"));
  const book = bookList.find(b => b.title.toLowerCase() === title.toLowerCase());

  if (book) {
    book.available++;
    localStorage.setItem("books", JSON.stringify(bookList));
    alert(`You returned "${book.title}"`);
  } else {
    alert("Book not found!");
  }
}