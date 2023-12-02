<body>
    <div class="background-chooser">
        <div class="promt-text default-font card">
            <h1>Choose your background</h1>
            <label for="category">Select a category:</label>
            <select id="category" class="default-font">
                <option value="nature">Nature</option>
                <option value="city">City</option>
                <option value="technology">Technology</option>
                <option value="food">Food</option>
                <option value="still_life">Still Life</option>
                <option value="abstract">Abstract</option>
                <option value="wildlife">Wildlife</option>
            </select>
            <button class="background-btn" onclick="chooseBackground()">CHOOSE</button>
        </div>
    </div>
    <script src="scripts/image.js"></script>