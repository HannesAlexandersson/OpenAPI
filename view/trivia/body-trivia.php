
  <body>
    <div class="timer-wrapper">
      <!--All cred for timer goes to the o.g creator : @CodePen "Animated Countdown Timer" by Kirti Vernekar -->
        <div class="timer animatable">
          <svg>
            <circle cx="50%" cy="50%" r="90"/>
            <circle cx="50%" cy="50%" r="90" pathLength="1" />
            <text x="100" y="100" text-anchor="middle"><tspan id="timeLeft"></tspan></text>
            <text x="100" y="120" text-anchor="middle">seconds</text>
          </svg>
        </div>
    </div>
    <div class="body-header">      
      <div class="body-header-right">
        <h1>Open Trivia games TM</h1>
        <div class="para">
          <p>
            Welcome to Trivia TM! Please read the rules for better understanding on how to play the game!         
          </p>
          <p> 
            P.S Wanna look for some recipes for something to cook after the game? 
            Visit <a href="/view/meal/index-meal.php">Find a meal</a> and search for something to cook!
            Or go back to the <a href="/index.php">hub</a> and choose another game to play!
          </p>
        </div>
        <div class="btn-wrapper">
          <button id="rule-set" class="rules">RULES</button>
          <button id="timer-button" class="rules">Enable timer</button>
        </div>
        <div class="diff-wrapper">
          <select name="diff-list" id="diff-list" class="diff-list">
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="mixed">Mixed</option>
          </select>
          <button class="diffLvl" disabled id="fetch-cta"></button>
        </div>      
      </div>
    </div>
    <div id="rule-set-wrapper" class="rule-set-wrapper">
      <div id="rule-wrapper" class="rule-wrapper">
        <h3><strong>RULES</strong></h3>
        <p>
          Start the game by pressing the "START" button. That will spawn a question for you along with a set of answer-
          alternatives(either multiple choice or a simple yes/no or true/false). You can select ONE of the answer-alternatives by simply pressing the button for the alternetive of your
          choice. Please remember that this is an open API and its free to use. Therefore the server is limited in its capacity and can only handle a certain amount of requests per hour. If you get an error message, or no response this is most likely the cause.
          But No worries, just wait a few seconds and try again!          
        </p>
        <h3>Difficulty</h3>
        <p>
          You can choose to only spawn question from a specific difficulty level by choosing a level in the drop-down list
        </p>
        <h3>Timer</h3>
        <p>
          If you want an extra challenge you can choose to play with an timer, this will add an bit of extra spice to the game! OBS remember that the timer starts when you press the "START" button!
        </p>
      </div>
      <div id="points-wrapper" class="points-wrapper">
        <h4>POINTS:</h4>
        <p id="points"></p>
      </div>
    </div>
    <div class="header-wrapper">      
      <div id="feedback-alert" class="alert" role="alert"></div>
      <button id="start-btn" class="start-btn">START</button>
    </div>    
    <div class="trivia-game-wrapper hide">      
      <div id="trivia-wrapper" class="trivia-wrapper">      
        <ul id="answer-list" class="answer-list">
        </ul>      
      </div>
    </div>    
    <script src="script.js"></script>
  </body>
</html>