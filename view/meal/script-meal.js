// I dont want to show the result container before the user have submitted an search
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
		//clear the result container before showing the new results when the user makes more then 1 search
		resultContainer.innerHTML = '';
       
        const response = await fetch(apiEndpoint, options);
        const data = await response.json();
        console.log(data);

		//error handling
		if (data.length === 0) {
			alert("No results found.");
			return;
		}
		if (!response.ok) {
            if (response.status === 404 || response.status === 400) {
                alert('Recipe not found. Check spelling or try a different search term.');
            } else {
                alert('An error occurred. Please try again later.');
            }
            return;
        }
		
		//loop through the data and create a result card for each result
		data.forEach(element => {
			const result = document.createElement('div');
			result.classList.add('result');						
			
			//create content for the result cards
			const resultTitle = document.createElement('h2');
			resultTitle.textContent = element.title;

			//lägg till bild från api2
			async function getImage(apiKey){
				const imgApiEndpoint = 'https://api.api-ninjas.com/v1/randomimage?category=food';
				const imgOptions = {
					method: 'GET',
					headers: {
						'X-Api-Key': apiKey,            
						'Accept': 'image/jpg'
					},
				};
				try{
					const imgResponse = await fetch(imgApiEndpoint, imgOptions);
					const blob = await imgResponse.blob();
					const imgUrl = URL.createObjectURL(blob);        
					console.log(imgUrl);
					imgElement.src = imgUrl;
				}catch (error) {
					console.error("Fetch error:", error);
					};
			}			
			const imgElement = document.createElement('img');
			imgElement.classList.add('resultImg');
			//imgElement.src = '/assets/images/random.png';//placeholder image
			imgElement.src = getImage(apiKey);

			//display the ingredients as a list
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

			//sometimes the instructions response comes as one big string, sometimes an array. So I need to check that and handle it accordingly
			let instructions;
			if(typeof element.instructions === 'string'){
				instructions = element.instructions.split('.').filter(item => item.trim() !== '');
			}else if (Array.isArray(element.instructions)) {
				instructions = element.instructions;
			}
    		instructions.forEach(instruction => {
				const li = document.createElement('li');
				li.textContent = instruction.trim();
				instructionsList.appendChild(li);
			});
			//append the content to the result card
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

	//add event listener to the result cards, I want to be able to click on them to enlarge them, this brins back the ing and instruct lists
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
