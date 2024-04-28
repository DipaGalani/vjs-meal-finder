const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

// Search meal and fetch from API
const searchMeal = async (e) => {
  e.preventDefault();
  // Clear previous meal showing
  single_mealEl.innerHTML = "";

  // Get search term
  const term = search.value;

  // Check for empty
  if (term.trim()) {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`
    );
    const data = await response.json();
    console.log(data);

    resultHeading.innerHTML = `<h2>Search Results for "${term}": </h2>`;

    if (!data.meals) {
      resultHeading.innerHTML = `There are no search results for ${term}, please try again`;
    } else {
      mealsEl.innerHTML = data.meals
        .map((meal) => {
          return `<div class="meal">
                <img src=${meal.strMealThumb} alt="${meal.strMeal}"/>
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>`;
        })
        .join("");
    }
    // Clear search text
    search.value = "";
  } else {
    alert("Please enter a search term");
  }
};

// Event Listener
submit.addEventListener("submit", searchMeal);
