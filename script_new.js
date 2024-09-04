// News API Key (Replace with your own API key)
const apiKey = "e1affa57315d4c5fb87befbf077b788d";

// Base URL for NewsAPI
const baseURL = "https://newsapi.org/v2/top-headlines";

// Container elements
const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");

// Country and category options
const country = "in";
const options = [
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

// Request URL
let requestURL;

// Function to create and append news cards
const generateUI = (articles) => {
  for (let item of articles) {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<div class="news-image-container">
      <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
      </div>
      <div class="news-content">
        <div class="news-title">
          ${item.title}
        </div>
        <div class="news-description">
        ${item.description || item.content || ""}
        </div>
        <a href="${item.url}" target="_blank" class="view-button">Read More</a>
      </div>`;
    container.appendChild(card);
  }
};

// Fetch news from API
const getNews = async () => {
  container.innerHTML = "";
  try {
    let response = await fetch(requestURL);
    if (!response.ok) {
      throw new Error("Data unavailable at the moment. Please try again later");
    }
    let data = await response.json();
    generateUI(data.articles);
  } catch (error) {
    alert(error.message);
  }
};

// Handle category selection
const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  requestURL = `${baseURL}?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  getNews();
};

// Create buttons for each news category
const createOptions = () => {
  for (let i of options) {
    optionsContainer.innerHTML += `<button class="option ${
      i == "general" ? "active" : ""
    }" onclick="selectCategory(event,'${i}')">${i}</button>`;
  }
};

// Initialize the app
const init = () => {
  optionsContainer.innerHTML = "";
  getNews();
  createOptions();
};

// Set default request URL and start app
window.onload = () => {
  requestURL = `${baseURL}?country=${country}&category=general&apiKey=${apiKey}`;
  init();
};
