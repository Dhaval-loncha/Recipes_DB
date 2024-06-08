document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('id');

  const recipeUrl = `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${recipeId}`;
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': 'eefcf754e2msh041c72fb12d239ap11a292jsn3da6b1984123', // Replace with your actual API key
      'x-rapidapi-host': 'tasty.p.rapidapi.com'
    }
  };

  async function fetchRecipe() {
    const response = await fetch(recipeUrl, options);
    if (!response.ok) {
      throw new Error("Failed to fetch recipe");
    }
    const data = await response.json();
    const recipe = data; // Assuming the API response is directly the recipe object
    console.log(recipe);
    displayRecipe(recipe);
  }

  function displayRecipe(recipe) {

    const recipeImageSection = document.querySelector(".recipe-image");
    if (recipeImageSection) {
      recipeImageSection.style.background = `url(${recipe.thumbnail_url}) no-repeat center center / cover`;
    }

    function formatCurrentDate() {
      const date = new Date();
      const options = { weekday: "long", month: "long", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }
    document.getElementById("u-date").innerHTML = formatCurrentDate();

    document.getElementById("r-name").innerHTML = recipe.name;

    document.getElementById("r-desc").innerHTML = recipe.description;

    document.getElementById("r-prep").innerHTML = recipe.prep_time_minutes + ' mins' || 'N/A'  ;
    document.getElementById("r-cook").innerHTML = recipe.cook_time_minutes + ' mins' || 'N/A' ;
    document.getElementById("r-yield").innerHTML = recipe.num_servings || 'N/A';

    if (!recipe.nutrition || Object.keys(recipe.nutrition).length === 0 ) {
      document.getElementById("r-calories").innerHTML = '-/-  kcal';
      document.getElementById("r-carbs").innerHTML = '-/-  grams';
      document.getElementById("r-protein").innerHTML = '-/-  grams';
      document.getElementById("r-fat").innerHTML = '-/- grams';
      document.getElementById("r-fiber").innerHTML = '0-/- grams';
      document.getElementById("r-sugar").innerHTML = '-/-  grams';
    } else {
      document.getElementById("r-calories").innerHTML = recipe.nutrition.calories + ' kcal';
      document.getElementById("r-carbs").innerHTML = recipe.nutrition.carbohydrates + ' grams';
      document.getElementById("r-protein").innerHTML = recipe.nutrition.protein + ' grams';
      document.getElementById("r-fat").innerHTML = recipe.nutrition.fat + ' grams';
      document.getElementById("r-fiber").innerHTML = recipe.nutrition.fiber + ' grams';
      document.getElementById("r-sugar").innerHTML = recipe.nutrition.sugar + ' grams';
    }



    const stepsContainer = document.querySelector('.steps');
    stepsContainer.innerHTML = '<h3><span>Instructions</span></h3>';
    
    recipe.instructions.forEach((instruction, index) => {
      const stepDiv = document.createElement('div');
      stepDiv.innerHTML = `
        <h4>${index + 1 < 10 ? '0' + (index + 1) : index + 1}.</h4>
        <p>${instruction.display_text}</p>
      `;
      stepsContainer.appendChild(stepDiv);
    });

    const ingredientsContainer = document.querySelector('.ingredients ol');
    ingredientsContainer.innerHTML = ''; // Clear existing content

    recipe.sections.forEach(section => {
      const sectionName = section.name || 'Ingredients'; // Default to 'Ingredients' if section.name is null
      const sectionItem = document.createElement('li');
      sectionItem.innerHTML = `
        <summary>
          <h4>${sectionName}</h4>
          <details>
            <ul>
              ${section.components.map(component => `<li>${component.raw_text}</li>`).join('')}
            </ul>
          </details>
        </summary>
      `;
      ingredientsContainer.appendChild(sectionItem);
    });

    // Tutorial Video Link
    if (recipe.original_video_url) {
      document.querySelector(".tutorial a").href = recipe.original_video_url;
  }
  }

  fetchRecipe();

  document.getElementById('back').addEventListener('click', () => {
    window.history.back();
  });
});
