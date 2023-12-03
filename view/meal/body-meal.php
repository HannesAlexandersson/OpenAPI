
    <body>
        <div class="header">
            <div class="header-wrapper">
                <div class="default-header-primary  header-header">
                    <h1>Find A Meal</h1>
                </div>
                <div class="default-p header-text">
                    <p>
                        Find a meal is a website where you can search for food and get the recipe for it.
                        Mayby you are all out of ideas and need some insperation?
                    </p>
                    <p>
                        Mayby you only have some odd ingredients left in the fridge and need to use them but doesnt know
                        what to cook it into?
                        Well then this is the site for you! here you can search for recipes, you can search for 
                        main ingredients or you can search for a specific meal.
                    </p>
                    <p>
                        All you have to do is enter your search in the search field and press search.                        
                        Its all free to use and you dont need to create an account.

                        All cred to the API goes to <a href="https://api-ninjas.com/">APIninjas</a> for 
                        providing the API.     
                    </p>
                    <p>
                        P.S You wanna play a trivia game while you wait for your food to cook?
                        Visit <a href="/view/trivia/index-trivia.php">Trivia</a> and play a game of trivia.

                    </p>
                    <div class="btn-wrapper">
                        <button class="searchBtn" id="trip">Trippy?</button>
                        <a href="/index.php"><button class="searchBtn" id="trip">GO BACK</button></a>
                    </div>

                </div>
            </div>
        </div>
        <main>          
            <form action="" method="post" id="searchByNameForm" class="form">
                <label for="searchByName" class="default-header-main header-main">Search for food:</label>
                <input type="text" id="searchByName" name="search">
                <input class="searchBtn" type="submit" value="Sök">
            </form>            
        </main>
        <div class="result-wrapper">
            <div class="result-header-wrapper">
            <h1 id="resultHeader"></h1>
        </div>
            <div class="result-container" id="resultContainer">                
                    <!-- result from search appears here with help from JS -->
                
            </div>
        </div>    
        