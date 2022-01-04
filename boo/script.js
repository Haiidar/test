let quoteContainer = document.getElementById("quote-container");
let quoteText = document.getElementById("quote");
let quoteAuthor = document.getElementById("author");
let twitterBtn = document.getElementById("twitter");
let newQuoteBtn = document.getElementById("new-quote");
let loader = document.getElementById("loader");

// loader | loading - complete

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Fetch api quotes

let apiQuotes = [];

// Random Quotes
function randomQuotes() {
  loading();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // quoteAuthor.textContent = quote.author;
  // check if author field is null by using ig statment
  if (!quote.author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quote.author;
  }
  // check length of quote text
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  quoteText.textContent = quote.text;
  complete();
}

async function getQuotes() {
    loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    randomQuotes();
  } catch (err) {
    // alert('err')
  }
}
// configure the Button ..
function twettQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

// EventListener
newQuoteBtn.addEventListener("click", randomQuotes);
twitterBtn.addEventListener("click", twettQuote);

// onLoad
getQuotes();
