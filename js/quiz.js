/*
 * quiz.js
 *    Contains Javascript for inQuizition web application. 
 *    Author: Andrew Seaman
 */

$(document).ready(function() {
    // Get all potential categories from questions list
    categoriesList = Object.keys(QUESTIONS);

    // Set current category
    setQuestionsCategory()

    // Initialize UI elements
    initUI()
});

var Q_PER_QUIZ = 10;
var NUM_TIMER_BARS = 7;
var TIME_ELASPED_COUNT = 0.15;
var FADE_INCREMENT = 0.02;
var TIMER_TIME_INTERVAL = 100;
var TIMER_LIMIT = 13.3;

// List of potential categories
var categoriesList = [];

// List of the questions to use for the selected category
var currentQuestions;
var currentCategory;
var questionsShown;

// List of the choices for the current question
var choice_items = [];

// Dictionary of the selected choice index and its value
var selected = {};

// Object representing the currently displayed question
var current;

// Tracks whether the next button should be inactive or not
var nextInactive;

var timeElasped;
var timerInterval;
var timeExpired;

function setQuestionsCategory() {
    res = getCategoryCookie();

    if (res == null) {
        // If we can't find the cookie, make a new one

        // Select a random category 
        category = getRandomCategory();

        // Get the current date to put an expiry the following day
        now = new Date();
        expiry = new Date(now.getFullYear(), now.getMonth(), 
                now.getDate() + 1);
        exp = expiry.toUTCString();

        // Create the cookie string
        new_cookie = "category=" + category + "; expires=" + exp + "; path=/";
        console.log("New Cookie: " + new_cookie);

        // Set the cookie
        document.cookie = new_cookie;
    } else {
        category = res;
    }
    
    currentCategory = category;
}

function getCategoryCookie() {
    /*
     * Returns the cookie defined as "category"
     */
    var name = "category=";

    // Split the cookies up by semicolons
    var cookies = document.cookie.split(';');
    
    // Go through each separated cookie
    for(var i = 0; i < cookies.length; i++) {
        var cook = cookies[i];

        // Trim any potential leading spaces
        while (cook.charAt(0) == ' ') {
            cook = cook.substring(1,cook.length);
        }
        
        // If it matches "category", return it
        if (cook.indexOf(name) == 0) 
            return cook.substring(name.length, cook.length);
    }

    // If the cookie isn't found, return null and 
    return null;
}

function getRandomCategory() {
    /*
     * Returns a random category from the list of categories.
     */
    rand = Math.floor(Math.random() * (categoriesList.length));

    return categoriesList[rand];
}

function initUI() {
    /* 
     * Called upon document load.
     * Initializes UI elements:
     *   start_button to start quiz with correct category
     *   next_button to submit answer and go to next question
     *   clear scoreboxes
     *   create a list of empty multiple choice selections
     */

    // Hook up start button
    $("#start_button").click(function() {
        // Extracts category from dropdown
        categories = document.getElementById("category_select")
        window.setTimeout(function() {
            startQuiz(category);
        }, 500);
    });
    
    // Mouse events for start button
    start = document.getElementById("start_button");
    start.onmouseover = function() { hover(this); }
    start.onmouseout = function() { unhover(this); }
    start.onmousedown = function() { ondown(this); }

    // Hook up next button
    $("#next_button").click(function() { nextQuestion(); });

    // Mouse events for next button
    next = document.getElementById("next_button");
    next.onmouseover = function() { hover(this); }
    next.onmouseout = function() { unhover(this); }
    next.onmousedown = function() { ondown(this); }
    next.onmouseup = function() { onup(this); }

    // Set the scores to blanks for now
    $("#correct_score").html("");
    $("#incorrect_score").html("");

    // Show the questions category
    $("#category").html(currentCategory.toUpperCase());

    // Hook up the stop button
    $("#stop_button").click(function() { quitPopup(); });

    // Mouse events for stop button
    close = document.getElementById("stop_button");
    close.onmouseover = function() { hover(this); }
    close.onmouseout = function() { unhover(this); }
    close.onmousedown = function () { ondown(this); }
    close.onmouseup = function() { onup(this); }
    
    // Hook up quick confirm button
    $("#confirm_button").click( function() {
        returnToStart();
    });

    // Mouse events for quit confirm button
    conf = document.getElementById("confirm_button");
    conf.onmouseover = function() { hover(this); }
    conf.onmouseout = function() { unhover(this); }
    conf.onmousedown = function() { ondown(this); }
    conf.onmouseup = function() { onup(this); }

    // Hook up quit cancel button
    $("#reject_button").click( function() {
        closeQuitPopup();
    });

    // Mouse events for quit cancel button
    reject = document.getElementById("reject_button");
    reject.onmouseover = function() { hover(this); }
    reject.onmouseout = function() { unhover(this); }
    reject.onmousedown = function() { ondown(this); }
    reject.onmouseup = function() { onup(this); }

    // Hook up quiz finished button
    $("#final_button").click( function() {
        returnToStart();
    });

    // Mouse events for quiz finished button
    fin = document.getElementById("final_button");
    fin.onmouseover = function() { hover(this); }
    fin.onmouseout = function() { unhover(this); }
    fin.onmousedown = function() { ondown(this); }
    fin.onmouseup = function() { onup(this); }

    // Initialize the list
    choice_list = document.getElementById("choice_list");

    for (var i = 0; i < 4; i++) {
        // Create item for each of the 4 choices
        new_item = document.createElement("li");
        new_item.id = "choice_item_" + i;
        new_item.className = "choice_item";

        // Set up the mouse events
        new_item.onmouseover = function() { hover(this); }
        new_item.onmouseout = function() { unhover(this); }
        new_item.onmousedown = function() { ondown(this); }

        // Create the selection bubble
        item_bubble = document.createElement("img");
        item_bubble.src = "assets/bubble.png";
        item_bubble.className = "choice_bubble";
        new_item.appendChild(item_bubble);
        
        // Create the text
        item_text = document.createElement("span");
        item_text.id = "choice_text_" + i;
        item_text.className = "choice_text";
        item_text.style.width = "auto";
        
        // Append them to the new list item
        new_item.appendChild(item_text);
        choice_list.appendChild(new_item);
    }

    // Set up the timer UI
    initTimer();
}

function initTimer() {
    /*
     * Initializes the UI for the timer.
     * Each bar in the timer is a cell in the timer table. Create
     * these cells.
     */
    row = document.getElementById("timer_row");
    for (var i = 0; i < 7; i++) {
        cell = document.createElement("td");
        cell.className = "timer_cell";
        cell.id = "timer_" + i;
        row.appendChild(cell)
    }
}

function resetTimer() {
    /*
     * Resets the timer to the initial state.
     */
    timeExpired = false;
    timeElasped = 0;

    // Reset all timer bars to solid opacity
    for (var i = 0; i < NUM_TIMER_BARS; i++) {
        $("#timer_" + i).css('opacity', 1);
    }
}

function decrementTimer() {
    /*
     * Decrements the timer by one time unit.
     */

    // Increment time elasped
    timeElasped += TIME_ELASPED_COUNT;

    // Determines the index of the first bar that should fade
    bound = NUM_TIMER_BARS - Math.ceil(timeElasped);
    lowBound = (bound < 1) ? 0 : bound;

    // Fade out all timer bars within the range determined by the 
    // amount of time that has passed
    for (var i = lowBound; i < NUM_TIMER_BARS; i++) {
        prev_opacity = $("#timer_" + i).css('opacity');
        $("#timer_" + i).css('opacity', prev_opacity - FADE_INCREMENT);
    }

    // If the first timer is at 0 opacity, the timer has expried
    if (timeElasped >= TIMER_LIMIT) {
        stopTimer();
        timerExpired();
    }
}

function timerExpired() {
    /*
     * Called when the timer expries
     */
    console.log("expired time");
    timeExpired = true;

    // Stop the timer from continuing
    stopTimer();

    // Display the next question
    nextQuestion();
}

function startTimer() {
    /*
     * Starts the time at whatever state it is in
     */
    timerInterval = window.setInterval(decrementTimer, TIMER_TIME_INTERVAL);
}

function stopTimer() {
    /*
     * Stop the timer. Works as a pause mechanism, does not reset.
     */
    window.clearInterval(timerInterval);
}

function hover(element) {
    /*
     * Set up hover functionality for UI elements.
     */
    switch (element.id) {
        case "next_button":
            if (nextInactive) {
                return;
            }
            source = 'assets/nextButton.png';
            break;
        case "stop_button":
            source = 'assets/quitGrey.png';
            break;
        case "start_button":
            source = 'assets/startHover.png';
            break;
        case "reject_button":
            element.style.color = "#ffffff";
            return;
        case "confirm_button":
            element.style.color = "#ffffff";
            return;
        case "final_button":
            element.style.color = "#ffffff";
            return;
        default:
            // Used for all of the multiple choice selections
            index = element.id[element.id.length - 1];
            if (index != selected['index']) {
                source = 'assets/incorrectBubble.png';
                element = element.children[0];
                break;
            } else {
                return;
            }
    }

    element.setAttribute('src', source);
}

function ondown(element) {
    // Set up the button click UI responses.
    switch (element.id) {
        case "stop_button":
            source = 'assets/quitWhite.png';
            break;
        case "next_button":
            if (nextInactive) {
                return;
            }
            source = 'assets/nextClick.png';
            break;
        case "start_button":
            source = 'assets/startClick.png';
            break;
        case "reject_button":
            return; 
        case "final_button":
            return; 
        case "confirm_button":
            return; 
        default:
            // Used for all of the multiple choice selections
            source = 'assets/correctBubble.png';
            for (var i = 0; i < 4; i++) {
                id = "choice_item_" + i;
                if (id != element.id) {
                    children = document.getElementById(id).children;
                    children[1].style.color = "#2d2d2c";
                    children[0].src = 'assets/bubble.png';
                }
            }

            element.children[1].style.color = "#ffffff";
            element = element.children[0];
            break;
    }

    element.setAttribute('src', source);
}
function onup(element) {
    /*
     * Set up the button click release UI events.
     */
    switch (element.id) {
        case "stop_button":
            source = 'assets/quitGrey.png';
            break;
        case "next_button":
            if (nextInactive) {
                return;
            }
            source = 'assets/nextButton.png';
            break;
        case "reject_button":
            return; 
        case "final_button":
            return; 
        case "confirm_button":
            return; 
        default:
            break;
    }

    element.setAttribute('src', source);
}
function unhover(element) {
    /*
     * Set up the mouse out event for UI elements
     */
    switch (element.id) {
        case "next_button":
            if (nextInactive) {
                return;
            }
            source = 'assets/checkMark.png';
            break;
        case "stop_button":
            source = 'assets/xButton.png';
            break;
        case "start_button":
            source = 'assets/start.png';
            break;
        case "reject_button":
            element.style.color = "#f9b233";
            return;
        case "final_button":
            element.style.color = "#f9b233";
            return;
        case "confirm_button":
            element.style.color = "#f9b233";
            return;
        default:
            index = element.id[element.id.length - 1];
            if (selected['index'] != index) {
                source = 'assets/bubble.png';
                element = element.children[0];
            } else {
                return;
            }
    }

    element.setAttribute('src', source);
}

function quitPopup() {
    /*
     * Called when the stop button is pressed. Opens the quit confirmation
     * popup.
     */
    stopTimer();
    $("#start_menu").hide();
    $("#start_popup").show();
    $("#confirm_menu").show();
    $("#finished_menu").hide();
}

function closeQuitPopup() {
    /*
     * Closes the confirm quit popup window. Called when quit is not
     * confirmed.
     */
    startTimer();
    $("#start_popup").hide();
    $("#start_menu").show();
    $("#confirm_menu").hide();
    $("#finished_menu").hide();
}

function returnToStart() {
    /*
     * Called when quiz is quit. Returns to start menu.
     */
    $("#start_menu").show();
    $("#start_popup").show();
    $("#confirm_menu").hide();
    $("#finished_menu").hide();

    // Clear the score fields
    $("#correct_score").html("");
    $("#inorrect_score").html("");
}

function setChoices(choices) {
    /* 
     * Sets up the choices for the multiple choice questions.
     */
    for (var i = 0; i < 4; i++) {
        item = document.getElementById("choice_item_" + i);

        // Set the item text to the choice in the array
        item.children[1].innerHTML = choices[i].toUpperCase();

        // Set up the click of the choice to set selected item
        item.onclick = (function() {
            // Get the current index and value to apply when this is clicked
            var index = i;
            var value = choices[i];

            return function() {
                // Show the selected row
                selectRow(index);

                // Extract the selected value
                selected = {
                    "index": index,
                    "value": value
                }

                nextInactive = false;
                
                // Once something was selected, we can use the next button
                $("#next_button").removeAttr("disabled");
            }
        })();
    }
}

function selectRow(index) {
    /* 
     * Called whenever a row is selected through the UI.
     */
    
    next = document.getElementById("next_button");
    next.src = "assets/checkMark.png";

    for (var i = 0; i < 4; i++) {
        item = document.getElementById("choice_item_" + i);
        item.children[0].src = "assets/bubble.png";
        item.children[1].style.color = "#2d2d2c";
    }
    
    if (index >= 0 && index < 4) {
        item = document.getElementById("choice_item_" + index);
        item.children[0].src = "assets/correctBubble.png";
        item.children[1].style.color = "#ffffff";
        console.log("Selected row: " + index);
    }
}

function startQuiz(category) {
    /* 
     * Initializes the UI for the quiz and starts it up.
     */

    // Set up the counters for correct and incorrect choices, defaults them
    // to zero
    questionsShown = 0;
    numCorrect = 0;
    numIncorrect = 0;

    $("#correct_score").html("" + numCorrect);
    $("#incorrect_score").html("" + numIncorrect);
    
    // Remove start popup
    toggleStartPopup(false);

    // Gather questions pertaining to the requested category
    console.log(QUESTIONS)
    currentQuestions = QUESTIONS[category].slice();

    // Initial question
    current = getRandomQuestion();

    // Show the question
    showQuestion(current);
}

function toggleAnswerUI(q_type) {
    /* 
     * Shows and hides the proper HTML elements to reflect either a
     * multiple choice question or an input question.
     */
    if (q_type == TYPE_CHOICE) {
        // If it's a choice question, show the four choices
        $("#input_box").css("display", "none");
        $("#choice_box").css("display", "block");

    } else if (q_type == TYPE_INPUT) {
        // If it's an input question, show the input
        $("#input_box").css("display", "block");
        $("#choice_box").css("display", "none");
    }
}

function showQuestion(question) {
    /* 
     * Displays a question on the UI.
     */

    // Set the question text
    $("#question_box").html(question['q_text'].toUpperCase());

    // This will show the required answer type box and hide the 
    // other one
    toggleAnswerUI(question['q_type']);

    selectRow(-1);

    if (question['q_type'] == TYPE_CHOICE) {
        // Make the next button inactive until a choice is made
        nextInactive = true;

        // If it's multiple choice, create the options
        setChoices(question['q_choices']);

        // We'll also disable the next button until something is selected
        nextInactive = true;
        next = document.getElementById("next_button");
        next.src = 'assets/checkMarkGrey.png';

    } else if (question['q_type'] == TYPE_INPUT) {
        nextInactive = false;

        // Make sure that the next button is enabled
        $("#next_button").removeAttr("disabled");
    }
    resetTimer();
    startTimer();
}

function questionAnswered(correct) {
    /* 
     * Called when a question is answered. This controls the UI that
     * respondes to a correct or incorrect answer.
     */
    if (correct) {
        // If correct, increment correct counter
        numCorrect += current['q_score'];
        $("#correct_score").html("" + numCorrect);
    } else {
        // Otherwise, increment incorrect counter
        numIncorrect += current['q_score'];
        $("#incorrect_score").html("" + numIncorrect);
    }
}

function nextQuestion() {
    /* 
     * Called when next button is hit. Checks to see if there are more
     * questions remaining. If there are, goes to next question, otherwise,
     * stops quiz.
     */

    // Stop the timer
    stopTimer();

    if (current['q_type'] == TYPE_CHOICE) {
        if (!timeExpired && nextInactive) {
            // If nothing has been selected, don't do anything
            return;
        }

        // Make the next button inactive, it will be activated upon
        // making a selection
        next = document.getElementById("next_button");
        next.src = "assets/checkMarkGrey.png";

        // For choice questions, just compared selected with current
        questionAnswered(current['q_answer'] == selected['value'])
    } else if (current['q_type'] == TYPE_INPUT) {
        // For input questions, get the input and compare
        ans = $("#ans_input").val().toLowerCase();

        // All stored answers must be in all lower case
        questionAnswered(current['q_answer'].toLowerCase() == ans)
    }

    questionsShown += 1;

    // Clear the input box and selection
    $("#ans_input").val('');
    selected = {}

    if (questionsShown >= Q_PER_QUIZ) {
        // No more questions, finish up the current quiz
        resetTimer();

        showFinishQuizPopup();

        $("#correct_score").html("");
        $("#incorrect_score").html("");

    } else {
        // If there are more questions, update the current question with
        // a random one, and display it
        current = getRandomQuestion();
        showQuestion(current);
    }
}

function showFinishQuizPopup() {
    /*
     * Shows the popup when a quiz is finished
     */
    $("#start_popup").show();
    $("#finished_menu").show();
    $("#start_menu").hide();
    $("#confirm_menu").hide();

    // Display the final score on the popup
    score = $("#correct_score").html();
    $("#final_score").html(score);
}

function finishQuiz() {
    /*
     * Called when an answer to the last question is submitted.
     */

    returnToStart();
}

function getRandomQuestion() {
    /* 
     * Gets a random question from the current questions. Removes it
     * from the array so it is not chosen again.
     * 
     * Returns:
     *   Object- represents the next question to display
     */

    // Get a random index
    rand = Math.floor(Math.random() * currentQuestions.length);

    // Return the element at that index and remove it from the array
    return currentQuestions.splice(rand, 1)[0];
}

function toggleStartPopup(visible) {
    /* 
     * Toggle the start pop up to make it, and its overlay, either 
     * visible or invisible.
     */
    if (!visible) {
        $("#start_popup").css("display", "none")
    } else {
        $("#start_popup").css("display", "block")
    }
}
