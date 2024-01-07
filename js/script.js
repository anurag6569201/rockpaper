

// congo
const Confettiful = function(el) {
    this.el = el;
    this.containerEl = null;
    
    this.confettiFrequency = 10;
    this.confettiColors = ['#EF2964', '#00C09D', '#2D87B0', '#48485E','#EFFF1D'];
    this.confettiAnimations = ['slow', 'medium', 'fast'];
    
    this._setupElements();
    this._renderConfetti();
  };
  
  Confettiful.prototype._setupElements = function() {
    const containerEl = document.createElement('div');
    const elPosition = this.el.style.position;
    
    if (elPosition !== 'relative' || elPosition !== 'absolute') {
      this.el.style.position = 'relative';
    }
    
    containerEl.classList.add('confetti-container');
    
    this.el.appendChild(containerEl);
    
    this.containerEl = containerEl;
  };
  
  Confettiful.prototype._renderConfetti = function() {
    this.confettiInterval = setInterval(() => {
      const confettiEl = document.createElement('div');
      const confettiSize = (Math.floor(Math.random() * 3) + 7) + 'px';
      const confettiBackground = this.confettiColors[Math.floor(Math.random() * this.confettiColors.length)];
      const confettiLeft = (Math.floor(Math.random() * this.el.offsetWidth)) + 'px';
      const confettiAnimation = this.confettiAnimations[Math.floor(Math.random() * this.confettiAnimations.length)];
      
      confettiEl.classList.add('confetti', 'confetti--animation-' + confettiAnimation);
      confettiEl.style.left = confettiLeft;
      confettiEl.style.width = confettiSize;
      confettiEl.style.height = confettiSize;
      confettiEl.style.backgroundColor = confettiBackground;
      
      confettiEl.removeTimeout = setTimeout(function() {
        confettiEl.parentNode.removeChild(confettiEl);
      }, 3000);
      
      this.containerEl.appendChild(confettiEl);
    }, 25);
  };
  
  window.confettiful = new Confettiful(document.querySelector('.js-container'));
  
  
  const game = document.querySelector('.game'),
    cpuimage = document.querySelector('.hand1 img'),
    userimage = document.querySelector('.hand2 img'),
    result = document.querySelector('.result h1'),
    optionhand = document.querySelectorAll('.user-image div'),
    chadscore = document.querySelector(".score-chad"),
    youscore = document.querySelector(".score-you"),
    gameover = document.querySelector(".gameover"),
    gameoverview = document.querySelector(".gameoverview"),
    anim = document.querySelector(".anim"),
    youwin = document.querySelector(".you-win"),
    drawwin = document.querySelector(".draw-win"),
    head = document.querySelector(".head"),
    chadwin = document.querySelector(".chad-win");

let totalRounds = 5;
let currentRound = 0;
let userScore = 0;
let cpuScore = 0;
let summary = [];

chadscore.textContent = '0';
youscore.textContent = '0';
gameover.style.display = "none";


optionhand.forEach((image, index) => {

    image.addEventListener('click', (e) => {

        image.classList.add("active");

        optionhand.forEach((imageN, indexN) => {
            if (image != imageN) {
                imageN.classList.remove("active");
            }
        })
        result.textContent = "Wait..."
        game.classList.add("start");

        let cpuhand = ["images/stone.png", "images/paper.png", "images/scissors.png"];
        let currentIndex = 0;

        let intervalId = setInterval(() => {
            cpuimage.src = cpuhand[currentIndex];
            currentIndex = (currentIndex + 1) % cpuhand.length;
        }, 100);

        setTimeout(() => {
            clearInterval(intervalId);
        }, 2500);
        image.style.opacity = "1";
        let time = setTimeout(() => {
            image.style.opacity = ".6";
            e.target.style.opacity = "1";

            game.classList.remove("start");
            let opthand = e.target.src;
            userimage.src = opthand;

            let randomnum = Math.floor(Math.random() * 3);

            cpuimage.src = cpuhand[randomnum];
            let cpuvalue = ['rock', 'paper', 'scissor'][randomnum];
            let uservalue = ['paper', 'rock', 'scissor'][index];

            let outcome = {
                paperpaper: "Draw",
                paperrock: "Chad",
                paperscissor: "You",
                rockpaper: "You",
                rockrock: "Draw",
                rockscissor: "Chad",
                scissorpaper: "Chad",
                scissorrock: "You",
                scissorscissor: "Draw",
            }
            let outcomevalue = outcome[cpuvalue + uservalue];
            result.textContent = uservalue === cpuvalue ? "Match Draw 😁" : `${outcomevalue} Won 😎!!`;

            if (outcomevalue === "You") {
                userScore += 5;
            } else if (outcomevalue === "Chad") {
                cpuScore += 5;
            }

            currentRound++;

            chadscore.textContent = `${cpuScore}`;
            youscore.textContent = `${userScore}`;

            summary.push({
                round: currentRound,
                userMove: uservalue,
                cpuMove: cpuvalue,
                result: outcomevalue
            });

            if (currentRound === totalRounds) {
                gameover.style.display = "block";
                displaySummaryTable();
            }
            if (currentRound >= totalRounds) {
                currentRound = 0;
                userScore = 0;
                cpuScore = 0;
                gameoverview.style.display = "none";
            }
        }, 2500);
    });
});

function displaySummaryTable() {
    let table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'table-striped', 'table-responsive-sm');

    table.innerHTML = `
        <thead class="thead-dark">
            <tr>
                <th>Round</th>
                <th>Your Move</th>
                <th>Chad's Move</th>
                <th>Result</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="2">Grand Total</td>
                <td>Chad = ${cpuScore}</td>
                <td>User = ${userScore}</td>
            </tr>
        </tfoot>

    `;

    let tbody = table.querySelector('tbody');

    summary.forEach((round) => {
        let row = tbody.insertRow();
        row.insertCell(0).textContent = round.round;
        row.insertCell(1).textContent = round.userMove;
        row.insertCell(2).textContent = round.cpuMove;
        row.insertCell(3).textContent = round.result;
    });

    let restartButton = document.createElement('button');
    restartButton.style.color = 'aliceblue';
    restartButton.style.backgroundColor = 'black';
    restartButton.style.padding = '0 3em';
    restartButton.style.zIndex = '100000';
    restartButton.textContent = 'Restart';
    restartButton.onclick = run;

    gameover.innerHTML = '';
    gameover.appendChild(table);
    gameover.appendChild(restartButton);
    head.style.display="none";
    anim.style.display="block";
}

function run() {
    gameoverview.style.display = "block";
    gameover.style.display = "none";
    anim.style.display="none";
    head.style.display="block";
    chadscore.textContent = '0';
    youscore.textContent = '0';
}
