const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElement = document.querySelectorAll('span');

const completeEl =document.getElementById('complete');
const completeElInfo =document.getElementById('complete-info');
const completeElBtn =document.getElementById('complete-button');



let countdownTitle = '';
let countdownDate = '';
let countdownValue = new Date();
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60 ;
const hour = minute * 60 ;
const day = hour * 24 ;


// set date Input
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

// update Dom 
function updateDom (){ 
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now ;
    
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour );
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
    
       
        inputContainer.hidden = true;
        
        if( distance < 0 ) {
            completeEl.hidden = false;
            clearInterval(countdownActive);
            completeElInfo.textContent = `${countdownTitle} finished in ${countdownDate}`;
        } else {

            // update dom 
            countdownElTitle.textContent = `${countdownTitle}`;
            timeElement[0].textContent = `${days}`;
            timeElement[1].textContent = `${hours}`;
            timeElement[2].textContent = `${minutes}`;
            timeElement[3].textContent = `${seconds}`;
            
            countdownEl.hidden = false;
        }
    },second ) 
}

// take value from input
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    if(countdownDate === "") {
        alert('please check the Input for the CountDown')}
         else {
            savedCountdown = {
                title: countdownTitle,
                date: countdownDate,
            };
            localStorage.setItem('countdown', JSON.stringify(savedCountdown));
            console.log(savedCountdown);
            countdownValue = new Date(countdownDate).getTime();
            updateDom();}
            
}


function reset() {
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countdownActive);
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

// restore the session 

function restorePreviousCountdown () {
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDom();

    }
}

// EventListeners

countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeElBtn.addEventListener('click', reset);


//On load
restorePreviousCountdown ();