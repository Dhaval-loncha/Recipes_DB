const recipeUrl = 'https://tasty.p.rapidapi.com/recipes/list';
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': 'eefcf754e2msh041c72fb12d239ap11a292jsn3da6b1984123', // Replace with your actual API key
    'x-rapidapi-host': 'tasty.p.rapidapi.com'
  }
};

const searchBox = document.querySelector("#search input");
const searchBtn = document.querySelector("#search button");
const recipesContainer = document.querySelector(".recipes");

// Load recipes from local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const storedRecipes = localStorage.getItem("recipeData");
  if (storedRecipes) {
    const recipes = JSON.parse(storedRecipes);
    displayRecipe(recipes);
  }
});

// Clear local storage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  localStorage.removeItem("recipeData");
});

async function fetchRecipe(query) {
  try {

    const queryParams = new URLSearchParams({
      q: query,
      size: 12
    });

    const response = await fetch(`${recipeUrl}?${queryParams}`, options);
    if (!response.ok) {
      throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();
    console.log(data);

    const recipes = data.results;
    displayRecipe(recipes);

     // Store the fetched recipes in local storage
     localStorage.setItem("recipeData", JSON.stringify(recipes));

  } catch (error) {
    console.error("Error fetching data", error);
  }
}

function displayRecipe(recipes) {


    recipesContainer.innerHTML = ""; // Clear container before adding new recipes
    
    if (!Array.isArray(recipes) || recipes.length === 0) {
      console.error('Recipes data is empty or not an array');
      return;
    }
    
    recipes.forEach((recipe, index) => {
      setTimeout(() => {
        
        const recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');
        recipesContainer.classList.add('active');
        
        recipeItem.innerHTML = `
        <div class="item-img">
        <img src="${recipe.thumbnail_url}" alt="${recipe.name || 'Recipe Image'}">
        </div>
        <div class="overlay">
        <h2>${recipe.name}</h2>
        <button class="view-button" onclick="viewRecipe(${recipe.id})">View</button>
        </div>
        `;
        
        recipesContainer.appendChild(recipeItem);
      },index * 500)
    });   
    
    // recipesContainer.classList.add('active');
  };
  
function viewRecipe(id) {
  window.location.href = `recipes/recipe.html?id=${id}`;
}

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const query = searchBox.value;
  fetchRecipe(query);
  searchBox.value = "";
});

searchBox.addEventListener("keypress", (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const query = searchBox.value;
    fetchRecipe(query);
    searchBox.value = "";
  }
});


document.querySelector(".search button").addEventListener("click", () => {
  const searchInput = document.querySelector(".search input");
  
  if (searchInput.classList.contains('active')) {
    searchInput.classList.remove('active');
  } else {
    searchInput.classList.add('active');
  }
});
