const prompt = require('prompt-sync')();

function gatherName() {
    let year = new Date().getFullYear();
    console.log("Hello! My name is Aid.");
    console.log("I was created in " + year + "!");
    return prompt("Please, remind me of your name: ");
}

function gatherRemainder(name) {
    console.log("What a great name you have, " + name + "!");
    do {
        let num = prompt("I'm going to guess how old you are " + name + ", please type your age and then repeat to me the remainders receive: ");
        let num1 = parseInt(num);

        if (!isNaN(num1) && num >= 0 && num <= 104) {
            let remainder3 = num % 3;
            let remainder5 = num % 5;
            let remainder7 = num % 7;
            console.log("Remainder of 3: " + remainder3 + " Remainder of 5: " + remainder5 + " Remainder of 7: " + remainder7);
            break;
        } else {
            console.log("Please insert a number that's between 0 - 104")
        }
    } while(true);
}

function guessAge() {
    let answer1 = prompt("What were the result for the remainder of 3? ");
    let answer2 = prompt("What were the result for the remainder of 5? ");
    let answer3 = prompt("What were the result for the remainder of 7? ");

    return (answer1 * 70 + answer2 * 21 + answer3 * 15) % 105;
}

function selectResult() {
    let name = gatherName();
    gatherRemainder(name);
    let age = guessAge();

    do {
        let lowerCase = prompt("Interesting " + name + ", type 'Go' when you're ready or 'cancel' to start over. ").toLowerCase();

        if (lowerCase === 'go') {
            console.log("Let me guess your age is: " + age);
            break;
        } else if (lowerCase === 'cancel') {
            console.log("Let's try again");
            break;
        } else {
            console.log("That's not a valid input");
        }

    } while(true)


}

selectResult()
