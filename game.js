const gamePattern = [];

const buttonColours = ["red", "blue", "green", "yellow"];

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    let sound = new Audio("sounds/" + randomChosenColour + ".mp3");
    sound.play();
}

$(document).on("keydown", nextSequence);