const prompt = require('prompt-sync')();
const calculateAge = (remainders) => (remainders.answer1 * 70 + remainders.answer2 * 21 + remainders.answer3 * 15) % 105;

// Function to get user decision for 'Go' or 'cancel'.
const getUserDecision = (name) => prompt("Interesting " + name + ", type 'Go' when you're ready or 'cancel' to start over. ").toLowerCase();

// Function to get the current year.
const getYear = () => new Date().getFullYear();

// Function to gather user's name.
const gatherName = () => prompt("Please, remind me of your name: ");

// Function to prompt user to enter their age.
const getAge = (name) => console.log("I'm going to guess how old you are " + name + ", please type your age: ");

// Function to get a numeric input from the user.
const getNumber = () => parseInt(prompt("Enter a number: "));

// Function to select a game number.
const getNumberSelector = () => parseInt(prompt("Enter a number: "));

// Function to validate if the age is within a valid range.
const isValid = (age) => !isNaN(age) && age >= 0 && age <= 104;

// Main function to run the program.
const theBrain = () => {
    let name = gatherName();
    greetUser(name);
    gameSelector(name);
};

// Function to greet the user.
const greetUser = (name) => {
    let year = getYear();
    console.log("Hello! " + name + " I am the Game Master!.");
    console.log("I was created in " + year + "!");
};

// Function to gather user's remainder guesses.
const gatherRemainder = () => {
    let answer1 = parseInt(prompt("What were the result for the remainder of 3? "));
    let answer2 = parseInt(prompt("What were the result for the remainder of 5? "));
    let answer3 = parseInt(prompt("What were the result for the remainder of 7? "));
    return { answer1, answer2, answer3 };
};

// Function to print the calculated remainders.
const printRemainders = (age) => {
    let remainder3 = age % 3;
    let remainder5 = age % 5;
    let remainder7 = age % 7;
    console.log("Here are the remainders: ");
    console.log("Remainder of 3: " + remainder3 + ", Remainder of 5: " + remainder5 + ", Remainder of 7: " + remainder7);
};

// Game selector function for the user to choose a game.
let gameSelector = (name) => {
    let continuePlaying = true;

    do {
        console.log("Which game would you like to play? Select 1. Age Guesser 2. Count Down 3. Qwiz 4. Exit Game");
        let selector = getNumberSelector();

        if (selector === 1) {
            ageLogic(name);
        } else if (selector === 2) {
            countLogic();
        } else if (selector === 3) {
            quizLogic(name);
        } else if (selector === 4) {
            console.log("Exiting game.");
            continuePlaying = false;
        } else {
            console.log("Invalid choice. Please select a valid option.");
        }
    } while (continuePlaying);
};

// Logic for the Count Down game.
let countLogic = () => {
    console.log("Now I will prove to you that I can count to any number you want. Where should I start? ");
    let index = -1;
    let number = getNumber();

    do {
        index++;
        console.log(index);
    } while (index < number);
};

// Logic for the Age Guesser game.
const ageLogic = (name) => {
    getAge(name);
    let age;

    do {
        age = getNumber();
        if (!isValid(age))
            console.log("Please insert a number that's between 0 - 104");
    } while (!isValid(age));

    printRemainders(age);
    let remainders = gatherRemainder();
    let guessedAge = calculateAge(remainders);

    do {
        let decision = getUserDecision(name);
        if (decision === 'go') {
            console.log("Let me guess your age is: " + guessedAge);
            break;
        } else if (decision === 'cancel') {
            console.log("Let's try again");
            break;
        } else {
            console.log("That's not a valid input");
        }
    } while (true);

    gameSelector(name);
};

// Logic for the Quiz game.
const quizLogic = (name) => {
    console.log("Let's solve a riddle, shall we?");
    console.log("I speak without a mouth and hear without ears. I have no body, but I come alive with wind. What am I?");
    console.log("1) Echo\n" +
        "2) Cloud\n" +
        "3) Ghost\n" +
        "4) Whisper ");

    do {
        let selector = getNumberSelector();
        let correctAnswer = 1;

        if (selector === correctAnswer) {
            console.log("Echo - correct!");
            break; // Exit the loop when the correct answer is selected.
        } else {
            console.log("Not quite! Please, try again.");
        }

    } while (true);

    gameSelector(name);
};

// Start the program.
theBrain();
