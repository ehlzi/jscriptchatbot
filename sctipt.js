const prompt = require("prompt-sync")();

// Constants
const MAX_AGE = 104;
const MIN_AGE = 0;

// Dialogues
const dialogues = {
    greet: (name, year) =>
        `Hello, ${name}! I am the Game Master! I was created in ${year}!`,
    agePrompt: (name) =>
        `I'm going to guess how old you are, ${name}. Please type your age: `,
    ageGuess: (guessedAge) => `Let me guess your age is: ${guessedAge}`,
    quizIntro: "Let's solve a riddle, shall we?",
    countIntro:
        "Now I will prove to you that I can count to any number you want. Where should I start? ",
    exitGame: "Exiting game. Thank you for playing!",
    invalidChoice: "Invalid choice. Please select a valid option.",
    enterNumber: "Enter a number: ",
    notValidAge: "Please insert a number that's between 0 - 104",
    tryAgain: "Not quite! Please, try again.",
    echoCorrect: "Echo - correct!",
    gameChoicePrompt:
        "Which game would you like to play? Select 1. Age Guesser 2. Count Down 3. Qwiz 4. Exit Game",
    namePrompt: "Please, remind me of your name: ",
    printRemainders: (
        remainder3,
        remainder5,
        remainder7
    ) => `Here are the remainders:
        Remainder of 3: ${remainder3}
        Remainder of 5: ${remainder5} 
        Remainder of 7: ${remainder7}`,
    quizRiddle:
        "Let's solve a riddle, shall we?\n\n" +
        "'I speak without a mouth and hear without ears. I have no body, but I come alive with wind.'\n" +
        "What am I?\n" +
        "1) Echo\n" +
        "2) Cloud\n" +
        "3) Ghost\n" +
        "4) Whisper"
};

// Helper functions
const getYear = () => new Date().getFullYear();

const getInput = (message) => {
    const input = prompt(message);
    return input.trim();
};

const getNumberInput = (message) => {
    let input;
    do {
        input = getInput(message);
    } while (!isValidNumber(input));
    return parseInt(input);
};

const isValidNumber = (input) =>
    !isNaN(input) && input >= MIN_AGE && input <= MAX_AGE;

// Game logic
const greetUser = () => {
    const name = getInput(dialogues.namePrompt);
    console.log(dialogues.greet(name, getYear()));
    return name;
};

const calculateAge = (remainders) =>
    (remainders.answer1 * 70 +
        remainders.answer2 * 21 +
        remainders.answer3 * 15) %
    105;

const gatherRemainder = () => {
    const answer1 = getNumberInput(
        "What were the result for the remainder of 3? "
    );
    const answer2 = getNumberInput(
        "What were the result for the remainder of 5? "
    );
    const answer3 = getNumberInput(
        "What were the result for the remainder of 7? "
    );
    return { answer1, answer2, answer3 };
};

const printRemainders = (age) => {
    const remainder3 = age % 3;
    const remainder5 = age % 5;
    const remainder7 = age % 7;
    console.log(dialogues.printRemainders(remainder3, remainder5, remainder7));
};

const ageLogic = (name) => {
    console.log(dialogues.agePrompt(name));

    let age;
    do {
        age = getNumberInput(dialogues.enterNumber);
    } while (!isValidNumber(age));

    printRemainders(age);
    const remainders = gatherRemainder();
    const guessedAge = calculateAge(remainders);
    console.log(dialogues.ageGuess(guessedAge));
};

const countLogic = () => {
    console.log(dialogues.countIntro);
    const number = getNumberInput(dialogues.enterNumber);

    for (let i = 0; i <= number; i++) {
        console.log(i);
    }
};

const quizLogic = () => {
    console.log(dialogues.quizRiddle);

    while (true) {
        const selector = getNumberInput(dialogues.enterNumber);

        if (selector === 1) {
            console.log(dialogues.echoCorrect);
            break;
        } else {
            console.log(dialogues.tryAgain);
        }
    }
};

const gameSelector = () => {
    let name = greetUser();
    let continuePlaying = true;

    while (continuePlaying) {
        console.log(dialogues.gameChoicePrompt);
        const selector = getNumberInput(dialogues.enterNumber);

        switch (selector) {
            case 1:
                ageLogic(name);
                break;
            case 2:
                countLogic();
                break;
            case 3:
                quizLogic();
                break;
            case 4:
                console.log(dialogues.exitGame);
                continuePlaying = false;
                break;
            default:
                console.log(dialogues.invalidChoice);
                break;
        }
    }
};

const theBrain = () => {
    gameSelector();
};

theBrain();
