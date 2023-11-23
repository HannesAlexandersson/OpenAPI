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
		if (data.length === 0) {
			alert("No results found.");
			return;
		}
		if (!response.ok) {
            if (response.status === 404) {
                alert('Recipe not found. Check spelling or try a different search term.');
            } else {
                alert('An error occurred. Please try again later.');
            }
            return;
        }
		
		data.forEach(element => {
			const result = document.createElement('div');
			result.classList.add('result');						
			
			const resultTitle = document.createElement('h2');
			resultTitle.textContent = element.title;

			//lägg till bild från api2			
			const imgElement = document.createElement('img');
			imgElement.classList.add('resultImg');
			imgElement.src = '/assets/random.png';

			let ingredientHeader = document.createElement('h4');
			ingredientHeader.classList.add('ingredient-header');
			ingredientHeader.textContent = "Ingredients:";

			const ingredients = element.ingredients.split('|');
			
			let ingredientList = document.createElement('ul');
			ingredientList.classList.add('ingredient-list');
            ingredients.forEach(ingredient => {
                const li = document.createElement('li');
                li.textContent = ingredient.trim();
                ingredientList.appendChild(li);
            });
			
			let instructionsList = document.createElement('ol');
			instructionsList.classList.add('instructions-list');
			let instructionsHeader = document.createElement('h4');
			instructionsHeader.classList.add('instructions-header');
			instructionsHeader.textContent = "Instructions:";
    		const instructions = element.instructions.split(/\d+\./).filter(item => item.trim() !== '');
    		instructions.forEach(instruction => {
				const li = document.createElement('li');
				li.textContent = instruction.trim();
				instructionsList.appendChild(li);
			});
			
            result.appendChild(resultTitle);
			result.appendChild(imgElement);
            result.appendChild(ingredientHeader);
            result.appendChild(ingredientList);
			result.appendChild(instructionsHeader);
            result.appendChild(instructionsList);

			//hide the result from the small cards
			ingredientHeader.classList.add('hide');
			ingredientList.classList.add('hide');
			instructionsHeader.classList.add('hide');
			instructionsList.classList.add('hide');

			resultContainer.appendChild(result);
			resultHeader.textContent = "Result";
	});
	} catch (error) {
	console.error("Fetch error:", error);
	};


	document.querySelectorAll('.result').forEach(card => {
		card.addEventListener('click', () => {
			const cardIngredientHeader = card.querySelector('.ingredient-header');
			const cardIngredientList = card.querySelector('.ingredient-list');
			const cardInstructionsHeader = card.querySelector('.instructions-header');
			const cardInstructionsList = card.querySelector('.instructions-list');
			const cardImg = card.querySelector('.resultImg');
			//if the card is already enlarged, remove the enlarged class and show the other cards again
			if(card.classList.contains('enlarged')) {
				card.classList.remove('enlarged');			
				cardIngredientHeader.classList.toggle('hide');
				cardIngredientList.classList.toggle('hide');
				cardInstructionsHeader.classList.toggle('hide');
				cardInstructionsList.classList.toggle('hide');
				//show the other cards again
				document.querySelectorAll('.result').forEach(card => {
				if(card.classList.contains('hide')) {
					card.classList.remove('hide');
					};
				});		
			}else {
				
		
			//add the enlarged class to the clicked card and show the ingredients and instructions
				card.classList.toggle('enlarged');			
				//show the ingredients and instructions */
				cardIngredientHeader.classList.toggle('hide');
				cardIngredientList.classList.toggle('hide');
				cardInstructionsHeader.classList.toggle('hide');
				cardInstructionsList.classList.toggle('hide');
				
				
				 //hide the other cards
				document.querySelectorAll('.result').forEach(card => {
					if(!card.classList.contains('enlarged')) {
						card.classList.add('hide');
					}
				});			
			
			};
		});	
		
	});	
			
};
/* 
async function getImage() {
	const placeHolder = 'https://baconmockup.com/300/200';	
	const response = await fetch(placeHolder);
	const imgBlob = await response.blob();	
	const imgElement = document.createElement('img');
	imgElement.src = URL.createObjectURL(imgBlob);
};
 */



async function handleSearch(event) {
    event.preventDefault();
	//when user clikcs search, remove the hide class from the result container	
	if(resultContainer.classList.contains('hide')) {
		resultContainer.classList.remove('hide');
	};
    const apiKey = 'Gw7UTp4ILVBTtQqTcWefgA==wHXY7xvsIhSPlVqR';
    const searchQuery = document.querySelector('#searchByName').value;	
	//if the user clicks search without entering a search term, alert the user
    if (searchQuery.trim() === "") {
        alert("Skriv in ett sökord.");
        return false;
    }

    try {
        await getMeal(apiKey, searchQuery);
		
    } catch (error) {
        console.error("Error in handleSearch:", error);
    }

    return true;
}



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
const trippy = document.querySelector('#trip');
trippy.addEventListener('click', () => {
	document.body.classList.toggle('trip');
});