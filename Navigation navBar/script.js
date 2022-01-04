const menuBars = document.getElementById('menu-b');
const overlay = document.getElementById('overlay');
const nav1 = document.getElementById('nav-1');
const nav2 = document.getElementById('nav-2');
const nav3 = document.getElementById('nav-3');
const nav4 = document.getElementById('nav-4');
const nav5 = document.getElementById('nav-5');
const navItem = [ nav1,nav2,nav3,nav4,nav5 ];

function navToggle(element1,element2){
    navItem.forEach((nav,i) =>{
        nav.classList.replace(`slide-${element1}-${i+1}`,`slide-${element2}-${i+1}`);
    });
}

function toggleNav(event){
   menuBars.classList.toggle('change');
   overlay.classList.toggle('overlay-active');

   if(overlay.classList.contains('overlay-active')) {
       overlay.classList.replace('overlay-slide-left','overlay-slide-right');
       navToggle('out','in');
   }else{
    overlay.classList.replace('overlay-slide-right','overlay-slide-left');
    navToggle('in','out');
   }

}
// EventListeners

menuBars.addEventListener('click',toggleNav);
navItem.forEach((nav)=>
nav.addEventListener('click', toggleNav))

// function navAnimation(direction1, direction2) {
//     navItem.forEach((nav, i) => {
//     nav.classList.replace(`slide-${direction1}-${i + 1}`, `slide-${direction2}-${i + 1}`);
//     });
//     }
//     function toggleNav() {
//     // Toggle: Menu Bars Open/Closed
//     menuBars.classList.toggle('change');
//     // Toggle: Menu Active
//     overlay.classList.toggle('overlay-active');
//     if (overlay.classList.contains('overlay-active')) {
//     // Animate In - Overlay
//     overlay.classList.replace('overlay-slide-left', 'overlay-slide-right');
//     // Animate In - Nav Items
//     navAnimation('out', 'in');
//     } else {
//     // Animate Out - Overlay
//     overlay.classList.replace('overlay-slide-right', 'overlay-slide-left');
//     // Animate Out - Nav Items
//     navAnimation('in', 'out');
//     }
//     }
//     // Event Listeners
//     menuBars.addEventListener('click', toggleNav);
//     navItems.forEach((nav) => {
//     nav.addEventListener('click', toggleNav);
//     });