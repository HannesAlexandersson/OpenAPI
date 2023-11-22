let query = 'italian wedding soup';
const baseUrl = 'https://api.api-ninjas.com/v1/recipe?query=' + query;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'Gw7UTp4ILVBTtQqTcWefgA==wHXY7xvsIhSPlVqR',
		'X-RapidAPI-Host': 'recipe-by-api-ninjas.p.rapidapi.com'
	}
};
const getMeal = async () => {
try {
	const response = await fetch(baseUrl, options);
	const result = await response.json();
	console.log(result);
} catch (error) {
	console.error(error);
}
}
getMeal();