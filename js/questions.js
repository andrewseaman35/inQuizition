/*
 * questions.js
 *    Contains questions used in inQuizition web application.
 *    Author: Andrew Seaman
 */


/* QUESTION TYPES */
const TYPE_CHOICE = "choice"
const TYPE_INPUT = "input"

/* LIST OF ALL QUESTIONS */
const QUESTIONS = {
    /*
     * Question Object:
     *   Represents a question that can be displayed to the user. Can be of
     *   two types: TYPE_CHOICE, TYPE_INPUT. A TYPE_CHOICE question represents
     *   a multiple choice question where the user will select one of a series
     *   of given options. A TYPE_INPUT question represents a question that 
     *   requires the user to input their answer.
     *
     * TYPE_CHOICE Question Data Members:
     *    q_text: (string) The text to display to the user as the question
     *    q_type: (string) TYPE_CHOICE in this case
     *    q_choices: (list<string>) The choice options to display to the user
     *    q_answer: (string) The correct choice option
     *    q_score: (int) The score of the question
     *
     * TYPE_INPUT Question Data Members:
     *    q_text: (string) The text to display to the user as the question
     *    q_type: (string) TYPE_INPUT in this case
     *    q_answer: (string) The correct answer
     *           NOTE: inputted answers are converted to lower case before 
     *                 comparison
     *    q_score: (int) The score of the question
     */
    // Category: General
    "English": [
    {
        q_text: "Which is a synonym of <u>acrid</u>?",
        q_type: TYPE_CHOICE,
        q_choices: ["ill-mannered", "pungent", "concise", "level-headed"],
        q_answer: "pungent",
        q_score: 10
    }, {
        q_text: "What is the definition of <u>resplendent</u>?",
        q_type: TYPE_CHOICE,
        q_choices: ["medicinal", "sharp", "shining", "rigid"],
        q_answer: "shining",
        q_score: 10
    }, {
        q_text: "What is the definition of <u>adrolt</u>?",
        q_type: TYPE_CHOICE,
        q_choices: ["skillful", "devious", "upright", "askew"],
        q_answer: "skillful",
        q_score: 10
    }, {
        q_text: "Which is an antonym of <u>brawny</u>?",
        q_type: TYPE_CHOICE,
        q_choices: ["left-handed", "weak", "luscious", "rendition"],
        q_answer: "weak",
        q_score: 10
    }, {
        q_text: "What is the definition of <u>hoary</u>?",
        q_type: TYPE_CHOICE,
        q_choices: ["old", "still", "stable", "precious"],
        q_answer: "old",
        q_score: 10
    }, {
        q_text: "Who wrote the novel <u>A Tale of Two Cities</u>?",
        q_type: TYPE_INPUT,
        q_answer: "charles dickens",
        q_score: 10
    }, {
        q_text: "In which state does <u>To Kill a Mockingbird</u> take place?",
        q_type: TYPE_INPUT,
        q_answer: "alabama",
        q_score: 10
    }, {
        q_text: "What is the name of Sherlock Holmes' physician friend?",
        q_type: TYPE_INPUT,
        q_answer: "john watson",
        q_score: 10
    }, {
        q_text: "Who wrote the novel <u>Moby Dick</u>?",
        q_type: TYPE_INPUT,
        q_answer: "herman melville",
        q_score: 10
    }, {
        q_text: "What is the name of the protagonist in <u>The Great Gatsby</u>?",
        q_type: TYPE_INPUT,
        q_answer: "nick carraway",
        q_score: 10
    }, {
        q_text: "Which is the definition of <u>nettle</u>?",
        q_type: TYPE_CHOICE,
        q_choices: ["annoy", "aggressive", "sharpen", "miserable"],
        q_answer: "annoy",
        q_score: 10
    }, {
        q_text: "Which is an antonym of <u>gritty</u>?",
        q_type: TYPE_CHOICE,
        q_choices: ["forward", "lost", "confused", "smooth"],
        q_answer: "smooth",
        q_score: 10
    }, {
        q_text: "In what year was the novel <u>The Hobbit</u> released?",
        q_type: TYPE_INPUT,
        q_answer: "1937",
        q_score: 10
    }, {
        q_text: "Which is the definition of <u>superfluous</u>?",
        q_type: TYPE_CHOICE,
        q_choices: ["extravagant", "linear", "fiction", "unnecessary"],
        q_answer: "unnecessary",
        q_score: 10
    }],

    "Geography": [
    {
        q_text: "Which of the following is not a US capital?",
        q_type: TYPE_CHOICE,
        q_choices: ["Sacramento", "New Orleans", "Des Moines", "Honolulu"],
        q_answer: "New Orleans",
        q_score: 10
    }, {
        q_text: "What is the name of the land feature that makes up Hawaii?",
        q_type: TYPE_INPUT,
        q_answer: "archipelago",
        q_score: 10
    }, {
        q_text: "How many lakes make up the Great Lakes?",
        q_type: TYPE_CHOICE,
        q_choices: ["Seven", "Four", "Five", "Nine"],
        q_answer: "Five",
        q_score: 10
    }, {
        q_text: "What is the former name of Istanbul?",
        q_type: TYPE_INPUT,
        q_answer: "constantinople",
        q_score: 10
    }, {
        q_text: "In what year did the first recorded person visit Antartica?",
        q_type: TYPE_CHOICE,
        q_choices: ["1773", "1801", "1688", "1899"],
        q_answer: "1773",
        q_score: 10
    }, {
        q_text: "What is the capital of Uzbekistan?",
        q_type: TYPE_INPUT,
        q_answer: "tashkent",
        q_score: 10
    }, {
        q_text: "What is the only country whose flag features a modern rifle?",
        q_type: TYPE_INPUT,
        q_answer: "mozambique",
        q_score: 10
    }, {
        q_text: "Which of the following countries is not a part of Africa?",
        q_type: TYPE_CHOICE,
        q_choices: ["Lesotho", "Madagascar", "Yemen", "Seychelles"],
        q_answer: "Yemen",
        q_score: 10
    }, {
        q_text: "Which of the following cities is the most southern?",
        q_type: TYPE_CHOICE,
        q_choices: ["Osaka, Japan", "Los Angeles, USA", "Quito, Ecuador", "Dodoma, Tanzania"],
        q_answer: "Dodoma, Tanzania",
        q_score: 10
    }, {
        q_text: "What is the national flower of Bulgaria",
        q_type: TYPE_CHOICE,
        q_choices: ["Lily", "Orchid", "Rose", "Daisy"],
        q_answer: "Rose",
        q_score: 10
    }, {
        q_text: "What is the most populated country in the world?",
        q_type: TYPE_INPUT,
        q_answer: "china",
        q_score: 10
    }, {
        q_text: "Which is the smallest ocean?",
        q_type: TYPE_CHOICE,
        q_choices: ["Atlantic", "Indian", "African", "Arctic"],
        q_answer: "Arctic",
        q_score: 10
    }, {
        q_text: "How many countries make up South America?",
        q_type: TYPE_CHOICE,
        q_choices: ["Twelve", "Ten", "Fifteen", "Eighteen"],
        q_answer: "Twelve",
        q_score: 10
    }],

    "Entertainment": [{
         q_text: "Which female has received the most Oscars?",
         q_type: TYPE_INPUT,
         q_answer: "Edith Head",
         q_score: 10
    }, {
        q_text: "In what year did the San Francisco 49ers win their first Super Bowl?",
        q_type: TYPE_CHOICE,
        q_choices: ["1983", "1978", "1981", "1988"],
        q_answer: "1981",
        q_score: 10
    }, {
        q_text: "What is the name of the director of <u>The Titanic</u>?",
        q_type: TYPE_INPUT,
        q_answer: "james cameron",
        q_score: 10
    }, {
        q_text: "What is currently the higest grossing film of all time?",
        q_type: TYPE_INPUT,
        q_answer: "Avatar",
        q_score: 10
    }, {
        q_text: "What is currently the most watched video on YouTube?",
        q_type: TYPE_CHOICE,
        q_choices: ["Charlie Bit My Finger", "Blank Space", "Gangnam Style", "Baby"],
        q_answer: "Gangnam Style",
        q_score: 10
    }, {
        q_text: "In what year was John Lennon killed?",
        q_type: TYPE_INPUT,
        q_answer: "1980",
        q_score: 10
    }, {
        q_text: "What is the name of the first movie that Clint Eastwood won an Oscar for?",
        q_time: TYPE_INPUT,
        q_answer: "unforgiven",
        q_score: 10
    }, {
        q_text: "Which of the following played Gandalf in The Lord of the Rings movie trilogy?",
        q_type: TYPE_CHOICE,
        q_choices: ["Ian McKellen", "Sean Connery", "Anthony Hopkins", "Dustin Hoffman"],
        q_score: 10
    }, {
        q_text: "In what year was actress Lucille Ball born?",
        q_type: TYPE_INPUT,
        q_answer: '1911',
        q_score: 10
    }, {
        q_text: "In the Star Wars movies, what is Han Solo's occupation?",
        q_type: TYPE_CHOICE,
        q_choices: ["Bounty Hunter", "Soldier", "Thief", "Smuggler"],
        q_score: 10
    }, {
        q_text: "What is the first name of Matt Damon's character in the Bourne series?",
        q_type: TYPE_INPUT,
        q_answer: "jason",
        q_score: 10
    }, {
        q_text: "Which player leads the NFL is the most touchdown passes?",
        q_type: TYPE_CHOICE,
        q_choices: ["Dan Marino", "Peyton Manning", "Brett Favre", "Joe Montana"],
        q_score: 10
    }, {
        q_text: "What was Sir Charlie Chaplin's middle name?",
        q_type: TYPE_INPUT,
        q_answer: "Spencer",
        q_score: 10
    }, {
        q_text: "Who directed Annie Hall?",
        q_type: TYPE_INPUT,
        q_answer: "Woody Allen",
        q_score: 10
    }],
}
