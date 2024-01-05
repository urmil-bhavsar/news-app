// https://newsapi.org/v2/everything?q=tesla&from=2023-08-11&sortBy=publishedAt&apiKey=525d8c40672e4c50b7b5504e2d538e61
// Here, q means query...here q=tesla so you will get news related to tesla...from means timeline...
const API_KEY = "525d8c40672e4c50b7b5504e2d538e61";
const url = "https://newsapi.org/v2/everything?q=";
const searchButton = document.querySelector("[search-button]");
const searchText = document.querySelector("[search-text]");
const scrollToTopButton = document.getElementById("scrollToTopButton");

//on window loading event, fetch news related to India
window.addEventListener("load", () => {
  fetchNews("India");
});

//
//function to fetch news
async function fetchNews(query) {
  // here a promise is returned so await is used
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  //converting the fetched data to json format
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}

// function to bind the data
function bindData(articles) {
  const cardsContainer = document.querySelector("[cards-container]");
  const newsCardTemplate = document.querySelector("[news-card-template]");

  cardsContainer.innerHTML = ""; //keeping it empty initially so that when the function is called no containers are present
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

//function to fill data in the cards
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("[news-img]");
  const newsTitle = cardClone.querySelector("[news-title]");
  const newsSource = cardClone.querySelector("[news-source]");
  const newsDesc = cardClone.querySelector("[news-desc]");

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerHTML = `${article.source.name} . ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

let currentlySelectedtNav = null;

function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  currentlySelectedtNav?.classList.remove("active"); //checking if its value is null then remove the class active from it
  currentlySelectedtNav = navItem;
  currentlySelectedtNav.classList.add("active");
}

//adding event listeners to input field and search buttons

searchButton.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  currentlySelectedtNav?.classList.remove("active");
  currentlySelectedtNav = null;
});

searchText.addEventListener("keypress", (event) => {
  if (event.key == "Enter") {
    event.preventDefault();
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    currentlySelectedtNav?.classList.remove("active");
    currentlySelectedtNav = null;
  }
});

//reload function
function reload() {
  window.location.reload();
  searchText.value = "";
}

// Function to scroll to the top of the page smoothly
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Function to toggle the button's visibility based on scroll position
function toggleScrollButton() {
  if (document.documentElement.scrollTop > 100) {
    scrollToTopButton.style.display = "block";
  } else {
    scrollToTopButton.style.display = "none";
  }
}

// Add a scroll event listener to toggle the button
window.addEventListener("scroll", toggleScrollButton);

// Add a click event listener to the button
scrollToTopButton.addEventListener("click", scrollToTop);

// Get a reference to the Back button
const backButton = document.getElementById("backButton");
