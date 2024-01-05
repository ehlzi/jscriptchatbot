const prompt = require('prompt-sync')();

const calculateAge = (remainders) => (remainders.answer1 * 70 + remainders.answer2 * 21 + remainders.answer3 * 15) % 105;

const getYear = () => new Date().getFullYear();

const dialogue = (type, context = {}, shouldLog = true) => {
    const dialogues = {
        greet: `Hello! ${context.name}, I am the Game Master! I was created in ${getYear()}!`,
        agePrompt: `I'm going to guess how old you are ${context.name}, please type your age: `,
        ageGuess: `Let me guess your age is: ${context.guessedAge}`,
        quizIntro: "Let's solve a riddle, shall we?",
        countIntro: "Now I will prove to you that I can count to any number you want. Where should I start? ",
        exitGame: "Exiting game. Thank you for playing!",
        invalidChoice: "Invalid choice. Please select a valid option.",
        enterNumber: "Enter a number: ",
        notValidAge: "Please insert a number that's between 0 - 104",
        tryAgain: "Not quite! Please, try again.",
        echoCorrect: "Echo - correct!",
        gameChoicePrompt: "Which game would you like to play? Select 1. Age Guesser 2. Count Down 3. Qwiz 4. Exit Game",
        namePrompt: "Please, remind me of your name: ",
        printRemainders: `Here are the remainders:
        Remainder of 3: ${context.remainder3}
        Remainder of 5: ${context.remainder5} 
        Remainder of 7: ${context.remainder7}`,
        quizRiddle: `Let's solve a riddle, shall we?\n\n` +
            `'I speak without a mouth and hear without ears. I have no body, but I come alive with wind.'\n` +
            `What am I?\n` +
            `1) Echo\n` +
            `2) Cloud\n` +
            `3) Ghost\n` +
            `4) Whisper`,
    };

    return shouldLog ? console.log(dialogues[type] || "No dialogue found for this type.") : dialogues[type];
};

const gatherName = () => prompt(dialogue('namePrompt', {}, false));

const getNumber = () => parseInt(prompt(dialogue('enterNumber', {}, false)));

const isValid = (age) => !isNaN(age) && age >= 0 && age <= 104;

const greetUser = (name) => {
    dialogue('greet', { name });
};

const gatherRemainder = () => {
    let answer1 = parseInt(prompt("What were the result for the remainder of 3? "));
    let answer2 = parseInt(prompt("What were the result for the remainder of 5? "));
    let answer3 = parseInt(prompt("What were the result for the remainder of 7? "));
    return { answer1, answer2, answer3 };
};

const printRemainders = (age) => {
    dialogue('printRemainders', { remainder3: age % 3, remainder5: age % 5, remainder7: age % 7 });
};

const ageLogic = (name) => {
    dialogue('agePrompt', { name });

    let age;
    do {
        age = getNumber();
        if (!isValid(age)) {
            dialogue('notValidAge');
        }
    } while (!isValid(age));

    printRemainders(age);
    let remainders = gatherRemainder();
    let guessedAge = calculateAge(remainders);
    dialogue('ageGuess', { guessedAge });

    gameSelector(name);
};

const countLogic = () => {
    dialogue('countIntro');
    let index = -1;
    let number = getNumber();

    do {
        index++;
        console.log(index);
    } while (index < number);
};

const quizLogic = (name) => {
    dialogue('quizRiddle');

    do {
        let selector = getNumber();
        if (selector === 1) {
            dialogue('echoCorrect');
            break;
        } else {
            dialogue('tryAgain');
        }
    } while (true);

    gameSelector(name);
};

const gameSelector = (name) => {
    let continuePlaying = true;

    do {
        dialogue('gameChoicePrompt');
        let selector = getNumber();

        if (selector === 1) {
            ageLogic(name);
        } else if (selector === 2) {
            countLogic();
        } else if (selector === 3) {
            quizLogic(name);
        } else if (selector === 4) {
            dialogue('exitGame');
            continuePlaying = false;
        } else {
            dialogue('invalidChoice');
        }
    } while (continuePlaying);
};

const theBrain = () => {
    let name = gatherName();
    greetUser(name);
    gameSelector(name);
};

theBrain();
