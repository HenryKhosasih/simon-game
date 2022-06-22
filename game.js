const buttonColours = ["red", "blue", "green", "yellow"];

let started = false;
let level = 0;
let gamePattern = [];
let userClickedPattern = [];

$(document).on("keydown", function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function() {
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer();
})

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    level++;

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("#level-title").text("Level " + level);
}

function playSound(name) {
    let sound = new Audio("sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer() {
    if (gamePattern.length == userClickedPattern.length) {

        if (JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern))  {
            userClickedPattern = [];
            setTimeout(nextSequence, 1000);
        } else {
            console.log("wrong");
        }
    }
}