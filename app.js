const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

let apiQuotes = [];

// Show New Quote
function newQuote() {
    setLoader(true);
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    let { text, author } = quote;

    if (!author) {
        author = "Unknown";
    }

    if (text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove("long-quote");
    }
    setLoader(false);
    authorText.textContent = author;
    quoteText.textContent = text;
}

// Get Quotes From API (type.fit)
async function getQuotes() {
    setLoader(true);
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.log("whoops, no quote", error);
    }
}

// Tweet quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
}

// Loader
function setLoader(bool) {
    loader.hidden = !bool;
    quoteContainer.hidden = bool;
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();
