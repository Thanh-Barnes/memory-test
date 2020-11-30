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
    }, 800);
}

resetBoard = () => {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}


(shuffle = () => {
    cards.forEach(card => {
        let randomPosition = Math.floor(Math.random() * 12);
        card.style.order = randomPosition;    
    });
}) ();

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

const btns = document.querySelector('.buttons');


// countdown timer
const countdownBtn = document.createElement("button");
countdownBtn.type = "button";
countdownBtn.classList.add("countdown");
countdownBtn.innerText = "Start countdown!"

btns.appendChild(countdownBtn);

countdownBtn.addEventListener('click', () => {
    lockBoard = false;
    startCountDown = (seconds) => {
        let counter = seconds;
        
        const interval = setInterval(() => {
            countdownBtn.innerText = counter;
            counter--;
            
            if (counter < -1) {
                clearInterval(interval);
                alert("Times Up!")
                countdownBtn.innerText = 'Finished!'
                lockBoard = true;
            }
        }, 1000);
    }    
    startCountDown(60)
})

//WIP

// start again button
// const startAgainBtn = document.createElement("button");
// startAgainBtn.type = "button";
// startAgainBtn.classList.add('startAgain');
// startAgainBtn.innerText = "Start again";

// btns.appendChild(startAgainBtn);

// startAgainBtn.addEventListener('click', () => {
//     console.log('test')

// })

