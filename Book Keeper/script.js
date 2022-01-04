const modal = document.getElementById('modal');
const modalShow = document.getElementById('show-modal');
const modalClose = document.getElementById('close-modal');
const bookmarkForm = document.getElementById('bookmark-form');
const websiteNameEl = document.getElementById('website-name');
const websiteUrlEl = document.getElementById('website-url');
const bookmarkContainer = document.getElementById('bookmarks-container');

let bookmarks = [];

// show modal , foucs on Input

function showModal() {
    modal.classList.add('show-modal');
    websiteNameEl.focus();
}
function closeModal (e){
    console.log(e.target);
    e.target === modal || e.target === modalClose ?   modal.classList.remove('show-modal') : false
}

modalShow.addEventListener('click', showModal);
modalClose.addEventListener('click', closeModal);
window.addEventListener('click',closeModal);

// validate url 

function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);
    if (!nameValue || !urlValue) {
        alert('please submit for bookmark fields');
        return false;
    }
    if (!urlValue.match(regex)) {
        alert('Oops..');
        return false;
    }
    //Valid
    return true;
}

// Add Bookmark and update DOM 
function addBookmark () {
    // remove all content 
    bookmarkContainer.textContent = '';
    bookmarks.forEach( (bookmark)=>{

        const {url, name} = bookmark;
        // add the parent div
        const item = document.createElement('div');
        item.classList.add('item');
        const closeItem = document.createElement('i');
        closeItem.classList.add('fas','fa-times');
        closeItem.setAttribute('title', 'delete bookmark');
        closeItem.setAttribute('onclick',`deleteBookmark('${url}')`);
        // Favicon _ link 
        const linkInfo = document.createElement('div'); 
        linkInfo.classList.add('name');
        const favicon = document.createElement('img');
        favicon.setAttribute('src',`https://s2.googleusercontent.com/s2/favicons?domain_url=${url}`)
        favicon.setAttribute('alt', 'Favicon');
        // anchore tag
        const link = document.createElement('a');
        link.setAttribute('href',`${url}`);
        link.setAttribute('target', '_blank');
        link.textContent = name;
        //append
        linkInfo.append(favicon, link);
        item.append(closeItem, linkInfo);
        bookmarkContainer.appendChild(item);
    });

}

// fetch bookmark
function fetchBookmark () {
    // restore the last session if it existing 
    if (localStorage.getItem('bookmarks')) {
        bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    } 
    
    addBookmark();
}

//dlete bookmark
function deleteBookmark (url) {
    bookmarks.forEach( (bookmark,i) => {
        if(bookmark.url === url ) {
            bookmarks.splice(i,1);
        }
    });
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmark();
}

// Store data from Form 

function storeBookmark(e) {

    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if(!urlValue.includes('https://') || !urlValue.inculdes('http://')) {
        urlValue = `https://${urlValue}`;
    }
    if (!validate(nameValue,urlValue)){
        return false;
    }

    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmark();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

bookmarkForm.addEventListener('submit', storeBookmark)

// on load
fetchBookmark ();
