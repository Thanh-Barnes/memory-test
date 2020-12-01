const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = true;
let firstCard, secondCard;
let pairs = 0;

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    
    this.classList.add('flip');
    
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    
    checkForMatch();
}

checkForMatch = () => {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    if (isMatch) {
        disableCards();
        pairs++;
    } else {
        unflipCards();
    }
    p.innerText = "Score = " + pairs;
}

disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

unflipCards = () => {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 600);
}

resetBoard = () => {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

shuffle = () => {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;    
    });
}
shuffle();

cards.forEach(card => {
    card.addEventListener('click', flipCard);
})


// ADDITIONAL FEATURES

// headings
const instructions = document.querySelector('.instructions');
const h1 = document.createElement('h1');
const h1b = document.createElement('h1');
const h2 = document.createElement('h2');
const h3 = document.createElement('h3');
const p = document.createElement('p');
h1.innerText = "Thanh's"
h1.classList.add('name');
h1b.innerText = "Memory Test";
h2.innerText = "You have 60 seconds "
h3.innerText = "to get as many pairs as you can!"
instructions.appendChild(h1);
instructions.appendChild(h1b);
instructions.appendChild(h2);
instructions.appendChild(h3);
instructions.appendChild(p);

// countdown timer & table
const btns = document.querySelector('.buttons');
const countdownBtn = document.createElement("button");
countdownBtn.type = "button";
countdownBtn.classList.add("countdown");
countdownBtn.innerText = "Play!";
btns.appendChild(countdownBtn);

const table = document.querySelector(".table");
const tableRow = document.createElement("tr");
const tableData = document.createElement("td");
tableRow.classList.add("times");
table.appendChild(tableRow);
table.appendChild(tableData);

let fastestTimesArr = [];

countdownBtn.addEventListener('click', () => {
    lockBoard = false;
    countdownBtn.style.backgroundColor = "red";
    countdownBtn.style.color = "white";

    startCountDown = (seconds) => {
        let counter = seconds;
        startAgainBtn.classList.remove('hide');

        const interval = setInterval(() => {
            countdownBtn.innerText = counter;
            
            if (pairs === 6 && fastestTimesArr.length < 3) {
                clearInterval(interval);
                countdownBtn.innerText = 'Done!';
                const time = 60 - counter - 1;
                tableData.style.textAlign = "center";
                fastestTimesArr.push(time);
                tableData.innerText = time;   

                // for (let i = 0; i < fastestTimesArr; i++) {
                    // fastestTimesArr[i] = tableData.innerText;
                    console.log(fastestTimesArr);          
                
                // }

            } else if (pairs <= 5) {
                counter--;
            }  
            
            if (counter < -1) {
                clearInterval(interval);
                alert("Times Up!");
                countdownBtn.classList.add('outOfTime');
                countdownBtn.innerText = 'Out of time!';
                lockBoard = true;           
            }

            startAgainBtn.onclick = () => {
                console.log('onclick test')
                startOver();
                clearInterval(interval);
            }
        }, 1000);

    }          
    startCountDown(60);
})

// start over button
const startAgainBtn = document.createElement("button");
startAgainBtn.type = "button";
startAgainBtn.classList.add("startAgain");
startAgainBtn.innerText = "Start again";

btns.appendChild(startAgainBtn);
startAgainBtn.classList.add('hide')

startOver = () => {
    cards.forEach(card => {
        card.classList.remove('flip');
        card.removeEventListener('click', flipCard);
        card.addEventListener('click', flipCard);
    })
    shuffle();
    
    lockBoard = true;
    pairs = 0;
    countdownBtn.innerText = "Play!";
    countdownBtn.style.backgroundColor = "yellow";
    countdownBtn.style.color = "black";
    p.innerText = "Score = " + pairs;
    startAgainBtn.classList.add('hide')
}

