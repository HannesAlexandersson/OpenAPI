const resultContainer = document.querySelector('#resultContainer');

resultContainer.classList.add('hide');


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
		resultContainer.innerHTML = '';
       
        const response = await fetch(apiEndpoint, options);
        const data = await response.json();
        console.log(data);		
		if (!response.ok) {
            if (response.status === 400) {
                alert('Recipe not found. Check spelling or try a different search term.');
            } else {
                alert('An error occurred. Please try again later.');
            }
            return;
        }
		data.forEach(element => {
			const result = document.createElement('div');
			result.classList.add('result');			
			
			//lägg till bild från api2
			const resultTitle = document.createElement('h2');
			resultTitle.textContent = element.title;

			const ingredientHeader = document.createElement('h4');
			ingredientHeader.textContent = "Ingredients:";

			const ingredients = element.ingredients.split('|');
			
			const ingredientList = document.createElement('ul');
            ingredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.textContent = ingredient.trim();
                ingredientList.appendChild(li);
            });
			
			const instructionsList = document.createElement('ol');
    		const instructions = element.instructions.split(/\d+\./).filter(item => item.trim() !== '');
    		instructions.forEach(instruction => {
				const li = document.createElement('li');
				li.textContent = instruction.trim();
				instructionsList.appendChild(li);
			});
			
            result.appendChild(resultTitle);
            result.appendChild(ingredientHeader);
            result.appendChild(ingredientList);
            result.appendChild(instructionsList);

			resultContainer.appendChild(result);
			resultHeader.textContent = "Result";
	});
	} catch (error) {
	console.error("Fetch error:", error);
	}
	document.querySelectorAll('.result').forEach(card => {
		card.addEventListener('click', () => {
			if(card.classList.contains('enlarged')) {
				card.classList.remove('enlarged');	
				document.querySelectorAll('.result').forEach(card => {
				if(card.classList.contains('hide')) {
					card.classList.remove('hide');
				};	
			});		
			}else 
			{
				card.classList.toggle('enlarged');
				document.querySelectorAll('.result').forEach(card => {
					if(!card.classList.contains('enlarged')) {
						card.classList.add('hide');
					}
				});
			};
		});	
	});	
};





async function handleSearch(event) {
    event.preventDefault();
	if(resultContainer.classList.contains('hide')) {
		resultContainer.classList.remove('hide');
	};
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
    return `© ${currentYear} Hannes Alexandersson`;
};

const copyrightString = getCopyright();
const copyWrapper = document.querySelector('#copy');
const copyrightElement = document.createElement('p');
copyrightElement.innerHTML = `${copyrightString}`;
copyWrapper.appendChild(copyrightElement);
