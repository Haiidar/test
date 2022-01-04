// Unsplash Api
const apiCount = 10;
const apiKey = 'iXW_T5rscowWz8ZA4Xsgzz8cdX5ZEFwJUNe_XHbo3nw';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${apiCount}`;

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let imageArr = [];

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
// check if the images loaded

function imageLoaded() {
    imagesLoaded ++;
    console.log('How many',imagesLoaded);
    if(imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        console.log('Ok',ready);
    }
} 

// function helper to create attributes .. 
function setAttributes(element , attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key])
    };
}


// set attribute and img element image-conatiner
// target the data + save it 
function displayImages() {
    imagesLoaded = 0;
    totalImages = imageArr.length;
    imageArr.forEach((photo)=>{
        const item = document.createElement('a');
            setAttributes(item, {
                href : photo.links.html,
                target : '_blank',
            });
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target','_blank');
        // i lost this , i want to add title attribute to a hh
        // set img element
        const img = document.createElement('img');
            setAttributes(img, {
                src : photo.urls.regular,
                alt : photo.description,
                title: photo.description,
            });
            // add event on load the images => get true 
            img.addEventListener('load', imageLoaded);
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        // and then i have to put img inside a
        item.appendChild(img);
        imageContainer.appendChild(item);
      
    });
}

// Get photos from Unsplash api via fetch

async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        imageArr = await response.json();
        displayImages();
    }catch(err) {
        alert('there is some bug');
    }
}

// check to see if scrolling near bottom of 
window.addEventListener('scroll',()=>{
    if ( window.innerHeight + window.scrollY >= document.body.offsetHeight - 1088 && ready){
        ready = false;
        getPhotos();
        console.log('load more');
    }
});

getPhotos();