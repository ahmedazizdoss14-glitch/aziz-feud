let currentTeam = 1;
let team1Score = 0;
let team2Score = 0;
let strikes = 0;
let currentQuestion = 0;

const questions = [
    {
        question: "NAME SOMETHING PEOPLE DO BEFORE GOING TO SLEEP",
        answers: [
            { text: "BRUSH TEETH", points: 35 },
            { text: "USE PHONE", points: 27 },
            { text: "PRAY", points: 18 },
            { text: "WATCH TV", points: 12 },
            { text: "DRINK WATER", points: 8 }
        ]
    },
    {
        question: "NAME SOMETHING PEOPLE TAKE TO THE BEACH",
        answers: [
            { text: "TOWEL", points: 35 },
            { text: "SUNSCREEN", points: 25 },
            { text: "SWIMSUIT", points: 18 },
            { text: "FOOD", points: 12 },
            { text: "UMBRELLA", points: 10 }
        ]
    },
    {
        question: "NAME SOMETHING YOU FIND IN A KITCHEN",
        answers: [
            { text: "FRIDGE", points: 30 },
            { text: "OVEN", points: 25 },
            { text: "PLATES", points: 20 },
            { text: "CUPS", points: 15 },
            { text: "KNIVES", points: 10 }
        ]
    },
    {
        question: "NAME SOMETHING PEOPLE TAKE WHEN THEY TRAVEL",
        answers: [
            { text: "CLOTHES", points: 35 },
            { text: "PHONE", points: 25 },
            { text: "PASSPORT", points: 18 },
            { text: "MONEY", points: 12 },
            { text: "TOOTHBRUSH", points: 10 }
        ]
    },
    {
        question: "NAME SOMETHING YOU FIND AT A BIRTHDAY PARTY",
        answers: [
            { text: "CAKE", points: 35 },
            { text: "BALLOONS", points: 25 },
            { text: "GIFTS", points: 18 },
            { text: "FOOD", points: 12 },
            { text: "MUSIC", points: 10 }
        ]
    },
    {
        question: "NAME SOMETHING YOU FIND AT SCHOOL",
        answers: [
            { text: "DESKS", points: 30 },
            { text: "TEACHERS", points: 25 },
            { text: "BOOKS", points: 20 },
            { text: "STUDENTS", points: 15 },
            { text: "CHALKBOARD", points: 10 }
        ]
    },
    {
        question: "NAME SOMETHING A FOOTBALL PLAYER DOES BEFORE A MATCH",
        answers: [
            { text: "WARM UP", points: 35 },
            { text: "STRETCH", points: 25 },
            { text: "DRINK WATER", points: 18 },
            { text: "PUT ON SHOES", points: 12 },
            { text: "TALK TO TEAMMATES", points: 10 }
        ]
    },
    {
        question: "NAME A FOOD MANY PEOPLE LOVE",
        answers: [
            { text: "PIZZA", points: 35 },
            { text: "BURGER", points: 25 },
            { text: "FRIES", points: 18 },
            { text: "CHICKEN", points: 12 },
            { text: "PASTA", points: 10 }
        ]
    },
    {
        question: "NAME SOMETHING PEOPLE USE THEIR PHONE FOR",
        answers: [
            { text: "MESSAGING", points: 35 },
            { text: "SOCIAL MEDIA", points: 25 },
            { text: "WATCHING VIDEOS", points: 18 },
            { text: "PLAYING GAMES", points: 12 },
            { text: "TAKING PHOTOS", points: 10 }
        ]
    },
    {
        question: "NAME SOMETHING PEOPLE DO AT HOME",
        answers: [
            { text: "WATCH TV", points: 35 },
            { text: "SLEEP", points: 25 },
            { text: "EAT", points: 18 },
            { text: "PLAY GAMES", points: 12 },
            { text: "CLEAN", points: 10 }
        ]
    }
];

function startGame() {
    document.getElementById("mainMenu").style.display = "none";
    document.getElementById("teamSetup").style.display = "block";
}

function continueGame() {

    const team1 = document.getElementById("team1Name").value.trim();
    const team2 = document.getElementById("team2Name").value.trim();

    if (team1 === "" || team2 === "") {
        alert("Please enter both team names!");
        return;
    }

    document.getElementById("displayTeam1").textContent = team1;
    document.getElementById("displayTeam2").textContent = team2;

    team1Score = 0;
    team2Score = 0;
    currentTeam = 1;
    currentQuestion = 0;

    document.getElementById("score1").textContent = "0";
    document.getElementById("score2").textContent = "0";
    document.getElementById("currentTeam").textContent = team1;

    document.getElementById("teamSetup").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";

    loadQuestion();
}

function loadQuestion() {

    const question = questions[currentQuestion];

    document.getElementById("roundNumber").textContent = currentQuestion + 1;

    document.querySelector(".question-box h2").textContent =
        question.question;

    const answerBoxes = document.querySelectorAll(".answer");

    question.answers.forEach((answer, index) => {

        const box = answerBoxes[index];

        box.querySelector("p").textContent = "████████████";
        box.querySelector("strong").textContent = answer.points;

        box.onclick = function () {
            revealAnswer(this, answer.text, answer.points);
        };

        box.dataset.revealed = "false";
    });

    strikes = 0;

    for (let i = 1; i <= 3; i++) {
        document.getElementById("strike" + i).textContent = "";
    }
}

function revealAnswer(element, answer, points) {

    if (element.dataset.revealed === "true") {
        return;
    }

    element.dataset.revealed = "true";

    element.querySelector("p").textContent = answer;
    element.querySelector("strong").textContent = points;

    if (currentTeam === 1) {
        team1Score += points;
        document.getElementById("score1").textContent = team1Score;
    } else {
        team2Score += points;
        document.getElementById("score2").textContent = team2Score;
    }
}

function switchTeam() {

    currentTeam = currentTeam === 1 ? 2 : 1;

    const team1 = document.getElementById("displayTeam1").textContent;
    const team2 = document.getElementById("displayTeam2").textContent;

    document.getElementById("currentTeam").textContent =
        currentTeam === 1 ? team1 : team2;
}

function addStrike() {

    if (strikes >= 3) {
        return;
    }

    strikes++;

    document.getElementById("strike" + strikes).textContent = "❌";

    if (strikes === 3) {
        alert("THREE STRIKES! 🔴");
    }
}

function nextQuestion() {

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;
        loadQuestion();

    } else {

    document.getElementById("gameScreen").style.display = "none";

    document.getElementById("finalTeam1").textContent =
        document.getElementById("displayTeam1").textContent;

    document.getElementById("finalTeam2").textContent =
        document.getElementById("displayTeam2").textContent;

    document.getElementById("finalScore1").textContent = team1Score;

    document.getElementById("finalScore2").textContent = team2Score;

    document.getElementById("gameOverScreen").style.display = "block";

}

}

function openSettings() {
    alert("Settings coming soon!");
}

function showWinner() {

    const team1 = document.getElementById("displayTeam1").textContent;
    const team2 = document.getElementById("displayTeam2").textContent;

    let winner;

    if (team1Score > team2Score) {
        winner = team1;
    } 
    else if (team2Score > team1Score) {
        winner = team2;
    } 
    else {
        winner = "IT'S A TIE!";
    }

    document.getElementById("gameOverScreen").style.display = "none";

    document.getElementById("winnerScreen").style.display = "block";

    document.getElementById("winnerName").textContent = winner;
}