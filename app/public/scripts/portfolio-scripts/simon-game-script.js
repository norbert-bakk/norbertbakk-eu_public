let elements = {
  infoBox: $("#level-title"),
  body: $("body"),
};

let gameRules = {
  level: 0,
  gamePattern: [],
  userPattern: [],
  gameStarted: false,
  colours: ["green", "red", "yellow", "blue"],
};

$(document).on("keydown", function(){
  if(!gameRules.gameStarted){
      elements.infoBox.text("Level " + gameRules.level);
      nextSequence();
      gameRules.gameStarted = true;
  }
});

$(".btn").on("click", function(){
  let chosenColour = $(this).attr("id");
  gameRules.userPattern.push(chosenColour);

  playSoundEffect(chosenColour);
  playAnimationEffect(chosenColour);

  gameControl(gameRules.userPattern.length -1);
});

function gameControl(runningLevel){
  if(gameRules.gamePattern[runningLevel] === gameRules.userPattern[runningLevel]){
      if(gameRules.gamePattern.length === gameRules.userPattern.length){
          setTimeout(function() {
              nextSequence();
          }, 1000);
      }
  }else{
      elements.body.addClass("game-over");
      elements.infoBox.text("Game over, press a key to restart!");
      playSoundEffect("wrong");

      setTimeout(function(){
          elements.body.removeClass("game-over");
      }, 200);
      startOver();

  }
}

function nextSequence(){
  gameRules.userPattern = [];
  gameRules.level++;
  elements.infoBox.text("Level: " + gameRules.level);

  let randomChosenColour = Math.floor(Math.random() *4);
  gameRules.gamePattern.push(gameRules.colours[randomChosenColour]);

  playAnimationEffect(gameRules.gamePattern[gameRules.gamePattern.length -1]);
  playSoundEffect(gameRules.gamePattern[gameRules.gamePattern.length -1]);
};

function playSoundEffect(audioName){
  let soundEffect = new Audio("/sounds/simon-sounds/" + audioName + ".mp3");
  soundEffect.play();
};

function playAnimationEffect(target){
  $("#" + target).removeClass(`${target}`).addClass("pressed");
  setTimeout(function(){
      $("#" + target).removeClass("pressed").addClass(`${target}`);
  }, 100);
};

function startOver() {
  gameRules.level = 0;
  gameRules.gamePattern = [];
  gameRules.userPattern = [];
  gameRules.gameStarted = false;
};