/**
*  Made for Google Code In with love <3 
*
* @version 1.0.0
* @author  Yash Gupta
* @license MIT
*
**/

//  Getting the elements
const form = document.querySelector("#app-form");
const bookmark = document.querySelector("#bookmark");
const appContainer = document.querySelector(".app-container");

let bookmarksArr = [];

// Make markup function
const makeMarkup = item => {
  const itemMarkup = `
    <div class="bookmarked-url">
      <a href="${item}" target="_blank">${item}</a>
      <a href="#">
        <span class="delete-item">x</span>
      </a>
    </div>
  `;
  return itemMarkup;
};

// Fill Local Storage with the Array
const setLS = () => {
  const bookmarkArrStr = JSON.stringify(bookmarksArr)
  localStorage.setItem("state", bookmarkArrStr);
}

// Load all the bookmarks when the app starts
window.addEventListener('DOMContentLoaded', _ => { 
  let bookmarksJSON = localStorage.getItem("state");
  
  if (bookmarksJSON !== null) {
    bookmarksArr = JSON.parse(bookmarksJSON);
    bookmarksArr.forEach(item => {
      appContainer.innerHTML += makeMarkup(item)
    })
  }
})

// Adding event listerner to the form
form.addEventListener("submit", e => {
  e.preventDefault();

  const re = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

  if (bookmark.value.match(re)) {
    // Add item to array
    bookmarksArr.push(bookmark.value);
  
    // Add item to UI
    appContainer.innerHTML += makeMarkup(bookmark.value);
  
    // Clear after submit
    bookmark.value = "";
  
    setLS()
  } else {
    alert("Something is wrong with your URL")
  }

});

appContainer.addEventListener('click', e => {
  e.preventDefault()
  
  if(e.target.className === 'delete-item') {
    curItem =  e.target.parentElement.parentElement.children[0].innerHTML
    bookmarksArr = bookmarksArr.filter(item => item !== curItem)
    
    setLS()
    e.target.parentElement.parentElement.remove()
  }
})