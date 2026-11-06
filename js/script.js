console.log("script.js loaded");

// API key goes here for now (not in production, so it's okay for this assignment)
const apiKey = "fvXlLhNIajP8sRNtjLGeomAMKjgNvoAc";

// Grab elements from the page
const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif-btn");
const searchInput = document.querySelector("#search-input");

// Array that holds the original image URLs
let images = [];

// Get GIFs from the Giphy search endpoint using the search term
async function getGifs(searchTerm) {
  const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=12&offset=0&rating=g&lang=en`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const result = await response.json();
    console.log(result);

    // Pull out the original image URL for each GIF
    images = result.data.map((gif) => gif.images.original.url);
    console.log(images);
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    images = [];
  }
}

// When the button is clicked, fetch GIFs and show them
fetchButton.addEventListener("click", async function () {
  const searchTerm = searchInput.value.trim();

  if (searchTerm === "") {
    console.log("Please type something to search for.");
    return;
  }

  await getGifs(searchTerm);

  // Clear old GIFs before showing the new ones
  gifContainer.innerHTML = "";

  for (let i = 0; i < images.length; i++) {
    gifContainer.innerHTML += `<img src="${images[i]}" class="col-3 mb-3">`;
  }
});
