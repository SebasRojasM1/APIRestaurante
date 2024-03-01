const seleccionarCategoria = document.getElementById('CategorySelect');
const searchInput = document.getElementById('SearchInput');
const resultsContainer = document.querySelector('#Results');
const mealCardsContainer = document.querySelector('#MealCards');

// Obtener las categorías y llenar el select
fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then(response => response.json())
    .then(data => {
        fillCategorySelect(data.categories);
    });

function fillCategorySelect(categories) {       //Llenar las opciones de categoria en el input SELECT
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.strCategory;
        option.textContent = category.strCategory;
        seleccionarCategoria.appendChild(option);
    });

    // Agregar un evento de cambio al select
    seleccionarCategoria.addEventListener('change', () => {
        const selectedCategory = seleccionarCategoria.value;
        searchMealsByCategory(selectedCategory);
    });
}

function searchMealsByCategory(category) {  //Buscar comidas por categoria
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayResults(data.meals));
}

function searchMeals(searchTerm) {
    if (searchTerm.trim() !== '') {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`;
        fetch(url)
            .then(response => response.json())
            .then(data => displayResults(data.meals));
    } else {
        cleanResults();
    }
}

function displayResults(comida) {
    cleanResults();

    if (comida && comida.length > 0) {
        comida.forEach(meal => {
            const { strMeal, strMealThumb } = meal;  //valores internos de la API

            const mealCard = document.createElement('div');
            mealCard.classList.add('card');
            mealCard.style.width = '200px';
            mealCard.innerHTML = `
                <div class="card" style="width: 12rem;">
                    <img src="${strMealThumb}" class="card-img-top" alt="${strMeal}">
                    <div class="card-body">
                        <h5 class="card-title">${strMeal}</h5>
                    </div>
                </div>
            `;

            mealCardsContainer.appendChild(mealCard);
        });
    } else {
        mealCardsContainer.innerHTML = '<p>No se encontraron resultados</p>';
    }
}

function cleanResults() {
    mealCardsContainer.innerHTML = '';
    resultsContainer.innerHTML = '';
}
