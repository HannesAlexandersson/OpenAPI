<main>
    <div class="api trivia card">
        <div class="plain-text default-font">
            <h1>Trivia game API</h1>
            <p>First off we have an simple trivia game. It contains about one hundred thousend questions about everything and anything
                . The Api is provided by the opentdb. Choose you difficulty level and see how many questions you can get right. 
                If you want an extra challange you can always try it with the timer enabled for an extra challange.
            </p>
        </div>
        <div class="api-enabler">
            <button class="enabler background-btn" id="triviaBtn">Start Trivia</button>
        </div>

        <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
        <script>
            $(document).ready(function () {
                $('#triviaBtn').on('click', function () {
                    window.location.href = 'view/trivia/index-trivia.php';
                });
            });
        </script>
    </div>
    <div class="api meal card">
        <div class="plain-text  default-font">
            <h1>Meal finder API</h1>
            <p>Secondly we have a meal finder. This is a simple API that will give you a random meal. You can also search for a specific
                meal if you want to. The API is provided by the API ninjas. So if you are looking for some inspiration for your next meal
                then this is the place to be.
            </p>
        </div>
        <div class="api-enabler">
            <button class="enabler background-btn" id="mealFinderBtn">Start Meal finder</button>
        </div>

        <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
        <script>
            $(document).ready(function () {
                $('#mealFinderBtn').on('click', function () {
                    window.location.href = 'view/meal/index-meal.php';
                });
            });
        </script>
</main>