var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

var started = false;





WRONG_SOUND = "wrong";


$(document).on("keydown", function() {
    if (!started) {
        nextSequence();
        started = true;
    }
    document.querySelector("a").setAttribute("disabled", "true");

});



$(".btn").on("click", function() {

    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
});



// Random button sequence

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    blink(randomChosenColour);
    playSound(randomChosenColour);
    $("h1").text("Level " + (level + 1));
    level++;
    userClickedPattern = [];
}

// Playing the sounds from "sounds" file
function playSound(sound) {
    var audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}

// Presse button animation

function animatePress(currentColour) {

    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Random sequence button blink
function blink(currentColour) {


    $(`#${currentColour}`).addClass("blink_me");
    setTimeout(function() {
        $("#" + currentColour).removeClass("blink_me");
    }, 500);
}

//Final answer checking

function checkAnswer() {

    if (gamePattern.length === userClickedPattern.length) {
        let checked = 0;
        for (var i = 0; i < gamePattern.length; i++) {

            if (gamePattern[i] !== userClickedPattern[i]) {
                break;
            }
            checked++;
        }
        if (checked === gamePattern.length) {
            playSound("Apple");
            setTimeout(function() { nextSequence(); }, 2000);

        } else {
            gameOver();
            startOver();

        }
    } else {
        if (gamePattern.length < userClickedPattern.length) {
            gameOver();
            startOver();
        }
    }

}

//Game over animation and sound 
function gameOver() {


    playSound(WRONG_SOUND);
    $("body").addClass("game-over");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game over, press any key to Restart!");
}

//Restart function

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}