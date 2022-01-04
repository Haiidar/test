var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var css = document.querySelector("h3");
var body = document.getElementById('gradient');


// make a function to edite background and add value to h3 tag :)

function setGradient () {
    body.style.background = "linear-gradient(to right ,"
      + color1.value
      + ","
      + color2.value
      + ")";
    css.textContent = body.style.background + ";";
   
}

// i add  execute  to input tag via onInput :P

// color1.addEventListener("input", setGradient);
// color2.addEventListener("input", setGradient);
