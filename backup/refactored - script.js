const prompt = require('prompt-sync')();

function greetUser() {
    let year = getYear()
    console.log("Hello! My name is Aid.");
    console.log("I was created in " + year + "!");
}

function getYear() {
    return new Date().getFullYear()
}
function gatherName() {
    return prompt("Please, remind me of your name: ");
}

function getAge(name) {
    return parseInt(prompt("I'm going to guess how old you are " + name + ", please type your age: "));
}

function isValid(age) {
    return !isNaN(age) && age >= 0 && age <= 104;
}

function printRemainders(age) {
    let remainder3 = age % 3;
    let remainder5 = age % 5;
    let remainder7 = age % 7;
    console.log("Here are the remainders: ");
    console.log("Remainder of 3: " + remainder3 + " Remainder of 5: " + remainder5 + " Remainder of 7: " + remainder7);
}

function gatherRemainder() {
    let answer1 = parseInt(prompt("What were the result for the remainder of 3? "));
    let answer2 = parseInt(prompt("What were the result for the remainder of 5? "));
    let answer3 = parseInt(prompt("What were the result for the remainder of 7? "));
    return { answer1, answer2, answer3 }
}

function calculateAge(remainders) {
    return (remainders.answer1 * 70 + remainders.answer2 * 21 + remainders.answer3 * 15) % 105;
}

function getUserDecision(name) {
    return prompt("Interesting " + name + ", type 'Go' when you're ready or 'cancel' to start over. ").toLowerCase();
}



function selectResult() {
    greetUser();
    let name = gatherName();
    let age;

    do {

        age = getAge(name);
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

    } while(true)

}

selectResult()
