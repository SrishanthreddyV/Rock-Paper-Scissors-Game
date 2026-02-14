let userscore = 0;
let compscore = 0;

const choices = document.querySelectorAll(".choices .choice");
const msg = document.getElementById("msg");

const userScorePara = document.getElementById("user-score");
const compScorePara = document.getElementById("comp-score");

const endbtn = document.querySelector(".reseting");

endbtn.addEventListener("click", () => {
    userscore = 0;
    compscore = 0;

    userScorePara.textContent = "0";
    compScorePara.textContent = "0";

    msg.textContent = "Scores reset!";
    msg.style.backgroundColor = "gray";
});



const compChoices = {
    rock: document.getElementById("rock"),
    paper: document.getElementById("paper"),
    scissors: document.getElementById("scissors")
};

let canClick = true; 

const modeBtn = document.getElementById("mode-toggle");
modeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        modeBtn.textContent = "☀️ Light Mode";
    } else {
        modeBtn.textContent = "🌙 Dark Mode";
    }
});

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    return options[Math.floor(Math.random() * 3)];
};

const resetHighlight = () => {
    choices.forEach(c => c.classList.remove("highlight", "user-choice"));
};

const highlightCompChoice = (choiceId) => {
    resetHighlight();
    compChoices[choiceId].classList.add("highlight");
};


const highlightUserChoice = (choiceId) => {
    compChoices[choiceId].classList.add("user-choice");
};

const shuffleComputer = () => {
    return new Promise(resolve => {
        const options = ["rock", "paper", "scissors"];
        let i = 0;

        const interval = setInterval(() => {
            resetHighlight();
            compChoices[options[i]].classList.add("highlight");
            i = (i + 1) % 3;
        }, 150);

        setTimeout(() => {
            clearInterval(interval);
            resolve();
        }, 2000);
    });
};


const showWinner = (userWin, user, comp) => {
    if(userWin){
        userscore++;
        userScorePara.textContent = userscore;
        msg.textContent = `You Win! your ${user} beats ${comp}`;
        msg.style.backgroundColor = "green";
    } else {
        compscore++;
        compScorePara.textContent = compscore;
        msg.textContent = `You Lose! ${comp} beats ${user}`;
        msg.style.backgroundColor = "red";
    }
};


const drawGame = () => {
    msg.textContent = "It's a draw!";
    msg.style.backgroundColor = "orange";
};

const playGame = async (userChoice) => {
    if(!canClick) return;
    canClick = false;

    highlightUserChoice(userChoice);

    await shuffleComputer();

    const compChoice = genCompChoice();
    resetHighlight(); 
    highlightUserChoice(userChoice); 
    compChoices[compChoice].classList.add("highlight"); 

    if(userChoice === compChoice){
        drawGame();
    } else {
        const userWin =
            (userChoice === "rock" && compChoice === "scissors") ||
            (userChoice === "paper" && compChoice === "rock") ||
            (userChoice === "scissors" && compChoice === "paper");

        showWinner(userWin, userChoice, compChoice);
    }

    canClick = true; 
};

choices.forEach(choice => {
    choice.addEventListener("click", () => {
        playGame(choice.id);
    });
});
