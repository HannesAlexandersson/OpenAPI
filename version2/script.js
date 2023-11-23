const resultContainer = document.querySelector('#resultContainer');
const result = document.querySelector('#result');
const resultHeader = document.querySelector('#resultHeader');

async function getMeal(apiKey, searchQuery) {
    const apiEndpoint = `https://api.api-ninjas.com/v1/recipe?query=${encodeURIComponent(searchQuery)}`;

    const options = {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey,
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await fetch(apiEndpoint, options);
        const data = await response.json();
        console.log(data);		
    
		data.forEach(element => {
			const resultImg = document.createElement('img');
			//lägg till bild från api2
			const resultTitle = document.createElement('h2');
			resultTitle.textContent = element.title;
			const resultIngredients = document.createElement('p');
			resultIngredients.textContent = element.ingredients;
			const resultInstructions = document.createElement('p');
			resultInstructions.textContent = element.instructions;
			result.appendChild(resultImg);
			result.appendChild(resultTitle);
			result.appendChild(resultIngredients);
			result.appendChild(resultInstructions);

			resultContainer.appendChild(result);
			resultHeader.textContent = "Result";
	});
	} catch (error) {
	console.error("Fetch error:", error);
	}
};

async function handleSearch(event) {
    event.preventDefault();

    const apiKey = 'Gw7UTp4ILVBTtQqTcWefgA==wHXY7xvsIhSPlVqR';
    const searchQuery = document.querySelector('#searchByName').value;	

    if (searchQuery.trim() === "") {
        alert("Skriv in ett sökord.");
        return false;
    }

    try {
        await getMeal(apiKey, searchQuery);
		await getImage(searchQuery);
    } catch (error) {
        console.error("Error in handleSearch:", error);
    }

    return true;
}
// går inte att fixa bilder än hittar ingen bra api för det. 
/* 
async function getImage(searchQuery) {
	const imageBaseUrl = 'https://api.unsplash.com/search/photos?query=';;	
	const imageEndpoint = imageBaseUrl + searchQuery;
	const response = await fetch(imageEndpoint, {
		mode: 'no-cors',
	});
	const data = await response.json();
	console.log(data);
}; */
document.getElementById('searchByNameForm').addEventListener('submit', handleSearch);


function getCopyright() {
    const currentYear = new Date().getFullYear();
    return `© ${currentYear} My Company Name`;
};
// Använd funktionen
const copyrightString = getCopyright();
console.log(copyrightString);