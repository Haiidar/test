const toggleSwitch = document.querySelector('input[type=checkbox]');
const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textBox = document.getElementById('text-box');


function imageMode (color){
    image1.src = `img/undraw_proud_coder_${color}.svg`
    image2.src = `img/undraw_feeling_proud_${color}.svg`
    image3.src = `img/undraw_conceptual_idea_${color}.svg`
    toggleIcon.children[0].textContent = `${color} Mode`;
}


//for Dark mode 
function darkMode (){
    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon'); 

    textBox.style.backgroundColor = 'rgb(255 255 255 / 50%)';
    nav.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    imageMode('dark');
}

function lightMode(){
    toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun'); 
    
    textBox.style.backgroundColor = 'rgb(0 0 0 / 50%)';
    nav.style.backgroundColor = 'rgb(255 255 255 / 50%)';

    imageMode('light');
   

}
// event for switch the input value
function switchTheme (event){
    if(event.target.checked){
        document.documentElement.setAttribute('data-theme','dark');
        localStorage.setItem('theme','dark');
        darkMode();
    }else {
        document.documentElement.setAttribute('data-theme','light');
        localStorage.setItem('theme','light');
        lightMode();
    }
}

toggleSwitch.addEventListener('change',switchTheme);

const userStorage = localStorage.getItem('theme');

if (userStorage) {
    document.documentElement.setAttribute('data-theme', userStorage);
    if (userStorage === 'dark'){
        toggleSwitch.checked = true;
        darkMode();
    }
}
// if (userStorgae !== 'dark'){
//     toggleSwitch.checked = true;
//     darkMode();
// } just for test :P
