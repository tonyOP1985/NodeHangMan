// selects word at random
function selectRandomWord(array) {
    var randomNumber = Math.random() * array.length;
    var randomNumberInt = Math.floor(randomNumber);
    var target = array[randomNumberInt];
    var upperCaseTarget = target.toUpperCase();
    return upperCaseTarget;
}

// disables button once clicked
function disableButton() {
    $(".letter").on("click", function(e) {
        e.preventDefault();
        $(this).attr("class", "btnDisabled");
        $(this).prop("disabled", true);
    });
}

//creates array with underscores that is target.length long
function createUnderScoreArray(word) {
    var underScoreArray = [];
    var underScore = "_";
    for (var i = 0; i < word.length; i++) {
        underScoreArray.push(underScore);
    }
    return underScoreArray;
}

//creates li items in ul.underscore-ul with underscores that is ranWord.length
function createUlListItems(array) {
    var ranWordUl = $("ul.underscore-ul");
    $.each(array, function(i) {
        var li = $("<li>").addClass("underScores").appendTo(ranWordUl).text(this);
    });
}

// creates an array that has indexes of each letter of target
function getLetterIndexs(word, userInput) {
    var wordArray = word.split("");
    var letterIndex = [];
    for (var i = 0; i < wordArray.length; i++) {
        if (wordArray[i] === userInput) {
            letterIndex.push(i);
        }
    }
    return letterIndex;
}

// shows where correct user input is in target  
function showLetterPositions(word, userInput, array) {
    var index = getLetterIndexs(word, userInput);
    for (var i = 0; i < index.length; i++) {
        array[index[i]] = userInput;
    }
    return array;
}

//updates ulList with correct letters
function showCorrectLetters(word, userInput) {
    var index = getLetterIndexs(word, userInput);
    for (var i = 0; i < index.length; i++) {
        $(".underscore-ul > li:nth-child(" + (index[i] + 1) + ")").text(userInput);
    }
}

// returns id of clicked button as a string
function getBtnId(clicked_id) {
    return (clicked_id).toString();
}

// determines if user input is in target
function isLetterInWord(word, userInput) {
    if ((word.indexOf(userInput) > -1) === false) { // returns false if user input is not in target
        return false;
    } else {
        return true; // returns true is user input is in target
    }
}

// updates hangman img if use input is incorrect
function upDateImg(number) {
    if (number === 1) {
        $("#hangManImg").attr("src", "../public/img/hangMan2.png");
    } else if (number === 2) {
        $("#hangManImg").attr("src", "../public/img/hangMan3.png");
    } else if (number === 3) {
        $("#hangManImg").attr("src", "../public/img/hangMan4.png");
    } else if (number === 4) {
        $("#hangManImg").attr("src", "../public/img/hangMan5.png");
    } else if (number === 5) {
        $("#hangManImg").attr("src", "../public/img/hangMan6.png");
    } else if (number === 6) {
        $("#hangManImg").attr("src", "../public/img/hangMan7.png");
    }
}

//allows button to reload game onclick
function reloadGame() {
    location.reload();
}

//creates modal alerting the user that they have won the game
function gameWonModal() {
    setTimeout(function() {
        $("#gameWonModal").fadeIn();
    }, 500);
}

//creates modal alerting the user that they have lost the game and shows what ranWord was
function gameOverModal(word) {
    setTimeout(function() {
        $("#gameOverModal").fadeIn();
        $("strong").text(word);
    }, 500);
}

// runs hangman game
function hangManMain() {
    var words = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto", "sun", "star", "blackhole", "galaxy", "comet", "constellation", "moon", "asteroid", "universe", "astronaut", "nasa", "telescope", "satellite"];
    var incorrectGuesses = 0;
    var ranWord = selectRandomWord(words);
    var underScores = createUnderScoreArray(ranWord);
    $(document).ready(function() {
        var ulList = createUlListItems(underScores);
        $(".letter").click(function(event) { // to prevent following code in function from executing onload
            event.preventDefault();
            var id = getBtnId(this.id);
            var isInWord = isLetterInWord(ranWord, id)
            if (isInWord === false) {
                incorrectGuesses += 1;
                upDateImg(incorrectGuesses);
                if (incorrectGuesses === 6) {
                    gameOverModal(ranWord);
                }
            } else {
                showCorrectLetters(ranWord, id);
                var letterPositions = showLetterPositions(ranWord, id, underScores);
                if (letterPositions.join("") === ranWord) {
                    gameWonModal();
                }
            }
        });
        disableButton();
    });
}

window.onload = function() {
    hangManMain();
};