const buttonColours = ["red", "blue", "green", "yellow"];

let started = false;
let level = 0;
let gamePattern = [];
let userClickedPattern = [];

// to start game
$(document).on("keydown", function () {
	if (!started) {
		$("#level-title").text("Level " + level);
		nextSequence();
		started = true;
	}
});

// when game is started, listen to buttons click
$(".btn").on("click", function () {
	if (started) {
		let userChosenColour = this.id;
		userClickedPattern.push(userChosenColour);
		playSound(userChosenColour);
		animatePress(userChosenColour);
		checkAnswer();
	}
});

// move forward to next level
function nextSequence() {
	let randomNumber = Math.floor(Math.random() * 4);
	let randomChosenColour = buttonColours[randomNumber];
	gamePattern.push(randomChosenColour);
	level++;

	$("#" + randomChosenColour)
		.fadeIn(100)
		.fadeOut(100)
		.fadeIn(100);
	playSound(randomChosenColour);
	$("#level-title").text("Level " + level);
}

function playSound(name) {
	let sound = new Audio("sounds/" + name + ".mp3");
	sound.play();
}

// animation when a button is clicked
function animatePress(currentColour) {
	$("#" + currentColour).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColour).removeClass("pressed");
	}, 100);
}

function checkAnswer() {
	if (gamePattern.length == userClickedPattern.length) {
		if (JSON.stringify(gamePattern) == JSON.stringify(userClickedPattern)) {
			userClickedPattern = [];
			setTimeout(nextSequence, 1000);
		} else {
			gameOver();
			startOver();
		}
	}
}

function gameOver() {
	playSound("wrong");
	$("body").addClass("game-over");
	setTimeout(function () {
		$("body").removeClass("game-over");
	}, 200);
	$("#level-title").text("Game Over, Press Any Key to Restart");
}

function startOver() {
	started = false;
	level = 0;
	gamePattern = [];
	userClickedPattern = [];
}
