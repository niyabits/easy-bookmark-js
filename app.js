//  Getting the elements
const form = document.querySelector("#app-form");
const bookmark = document.querySelector("#bookmark");
const appContainer = document.querySelector(".app-container");

const bookmarksArr = [];

// Make markup function
const makeMarkup = item => {
  const itemMarkup = `
    <div class="bookmarked-url">
      <a href="${item}" target="_blank">${item}</a>
      <a href="#" class="delete-item">
        <span>x</span>
      </a>
    </div>
  `;
  return itemMarkup;
};

// Adding event listerner to the form
form.addEventListener("submit", e => {
  e.preventDefault();

  // Add item to array
  bookmarksArr.push(bookmark.value);

  // Add item to UI
  appContainer.innerHTML += makeMarkup(bookmark.value);

  // Clear after submit
  bookmark.value = "";

  // Test
  console.log(bookmarksArr);
});
