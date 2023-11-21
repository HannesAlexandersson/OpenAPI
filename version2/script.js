const baseUrl = `www.themealdb.com/api/json/v1/1/search.php?s=`;
const randomMealUrl = 'www.themealdb.com/api/json/v1/1/random.php';
const listCategoriesUrl = 'www.themealdb.com/api/json/v1/1/categories.php';
const filterByMainingredientUrl = 'www.themealdb.com/api/json/v1/1/filter.php?i='
//adding searchtext to url
const userInput = handleInput(); 

function handleInput() {
    // Hämta värdet från textinmatningen
    var inputValue = document.getElementById('userInput').value;

    // Logga värdet till konsolen
    console.log("Användarens input: " + inputValue);

    // Returnera värdet
    return inputValue;
}