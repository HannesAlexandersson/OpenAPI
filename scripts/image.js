//Image background logic


async function setImageAsBackground(apiKey, category) {
    const imgApiEndpoint = 'https://api.api-ninjas.com/v1/randomimage?category=' + category;

    const imgOptions = {
        method: 'GET',
        headers: {
            'X-Api-Key': apiKey,            
            'Accept': 'image/jpg'
        },
    };

    try {
        const imgResponse = await fetch(imgApiEndpoint, imgOptions);
        const blob = await imgResponse.blob();
        
        const imgUrl = URL.createObjectURL(blob);        
        console.log(imgUrl);

        // Sets the background image of the body
        document.body.style.backgroundImage = `url(${imgUrl})`;        
    } catch (error) {
        console.error("Fetch error:", error);
        };
};


//dropdownmenu logic for the background-chooser section
function chooseBackground() {
    const category = document.getElementById("category").value;
    const apiKey = 'Gw7UTp4ILVBTtQqTcWefgA==wHXY7xvsIhSPlVqR';
    setImageAsBackground(apiKey, category);
}