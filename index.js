const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = true;
let firstCard, secondCard;
let pairs = 0;
let toGo = document.querySelector(".toGo")

pairsToFind = () => {
    toGo = toGo.innerText = (6-pairs) + " pairs to find";
    return toGo;
}
pairsToFind();

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

// pairs found
// const info = document.querySelector('#info');
// const p = document.createElement('p');
// info.appendChild(p);

// countdown timer & table
const btns = document.querySelector('.play');
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
    
    startCountDown = (seconds) => {
        let counter = seconds;
        countdownBtn.disabled = true;
        startAgainBtn.classList.remove('hide');
        countdownBtn.innerText = 'Go!';
        
        const interval = setInterval(() => {
            countdownBtn.style.backgroundColor = "orange";
            countdownBtn.innerText = counter;
            
            if (pairs === 6 && fastestTimesArr.length < 3) {
                clearInterval(interval);
                countdownBtn.innerText = 'Done!';
                countdownBtn.style.backgroundColor = "red";
                countdownBtn.style.color = "white";
                tableData.style.textAlign = "center";

                const time = 60 - counter - 1;
                fastestTimesArr.push(time);
                let timeStr = ""

                for (let i = 0; i < fastestTimesArr.length; i++) {
                    timeStr = timeStr + fastestTimesArr[i] + "s ";
                    // let tableData = document.createElement("td");
                    tableData.innerText = timeStr;   
                    



                }


                // for (let i = 0; i < fastestTimesArr; i++) {
                    // fastestTimesArr[i] = tableData.innerText;
                    console.log(fastestTimesArr);          
                
                // }

            } else if (pairs <= 5) {
                counter--;
            }  
            
            if (counter < -1) {
                clearInterval(interval);
                countdownBtn.classList.add('outOfTime');
                countdownBtn.innerText = 'Out of time!';
                countdownBtn.style.backgroundColor = "red";
                countdownBtn.style.color = "white";
                lockBoard = true; 
                countdownBtn.disabled = true; 
            }

            startAgainBtn.onclick = () => {
                console.log('onclick test')
                startOver();
                clearInterval(interval);
                countdownBtn.disabled = false;
                countdownBtn.classList.remove('outOfTime');
            }
        }, 1000);
    }          
    startCountDown(60);
})

// start over button
const start = document.querySelector(".start");
const startAgainBtn = document.createElement("button");
startAgainBtn.type = "button";
startAgainBtn.classList.add("startAgain");
startAgainBtn.innerText = "Start again";

start.appendChild(startAgainBtn);
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
    countdownBtn.style.backgroundColor = "rgb(16, 224, 16)";
    countdownBtn.style.color = "black";
    pairsToFind();
    startAgainBtn.classList.add('hide');
}

