const jsonString = `[
    {
        "q": "Only I can change my life. No one can do it for me.",
        "a": "Carol Burnett"
        },
    {
        "q": "Definitions belong to the definers, not the defined.",
        "a": "Toni Morrison"
    },
    {
        "q":"Everyone is a moon, and has a dark side which he never shows to anybody.",
        "a":"Mark Twain"
    },
    {
        "q":"The big thing is to make a winning effort. I'm not obsessed with wins.",
        "a":"Morgan Wootten"
    },
    {
        "q":"When you are tough on yourself, life is going to be infinitely easier on you.  ",
        "a":"Zig Ziglar"
    },
    {
        "q":"Confidence comes from crossing thresholds.",
        "a":"Kamal Ravikant"
    },
    {
        "q":"Look to the beauty of this day, miracles are all around you.",
        "a":"Mary Engelbreit"
    },
    {
        "q":"You can live a whole life time never being awake.",
        "a":"Dan Millman"
    },
    {
        "q":"Rest in reason; move in passion.",
        "a":"Kahlil Gibran"
    },
    {
        "q":"Passion is energy. Feel the power that comes from focusing on what excites you. ",
        "a":"Oprah Winfrey"
    },
    {
        "q":"Before enlightenment; chop wood, carry water. After enlightenment; chop wood, carry water.",
        "a":"Buddha"
    }
]`;

const quotes = JSON.parse(jsonString);

// main page
let generateBtn = document.getElementById('generate');
let goToFavoritesBtn = document.getElementById('goToFavorites');
let favoriteBtn = document.getElementById('favoriteBtn');
let quote = document.getElementById('quote');
let author = document.getElementById('author');

// favorites page
let backBtn = document.getElementById('back');
let favoritesList = document.getElementById('favoritesList');

// view
let mainView = document.getElementById('mainView');
let favoritesView = document.getElementById('favoritesView');

let currentQuote = null;

// nav to favorites
goToFavoritesBtn.addEventListener("click", () => {
    mainView.style.display = "none";
    favoritesView.style.display = "block";
    loadFavorites();
});

// nav to main
backBtn.addEventListener("click", () => {
    favoritesView.style.display = "none";
    mainView.style.display = "block";
});

// use local storage to access a users favorites
function loadFavorites() {
    browser.storage.local.get("favorites").then((result) => {

        let favorites = result.favorites || [];
        favoritesList.innerHTML = "";

        favorites.forEach((q, index) => {

            let card = document.createElement("div");
            card.className = "favoriteCard";

            let quoteText = document.createElement("div");
            quoteText.className = "favoriteQuote";
            quoteText.textContent = `"${q.q}"`;

            let authorText = document.createElement("div");
            authorText.className = "favoriteAuthor";
            authorText.textContent = `— ${q.a}`;

            let deleteBtn = document.createElement("button");
            deleteBtn.className = "deleteBtn";
            deleteBtn.textContent = "X";

            deleteBtn.addEventListener("click", () => {

                favorites.splice(index, 1);

                browser.storage.local.set({
                    favorites: favorites
                }).then(() => {
                    loadFavorites();
                    updateFavoriteBtn();
                });

            });

            card.appendChild(deleteBtn);
            card.appendChild(quoteText);
            card.appendChild(authorText);

            favoritesList.appendChild(card);
        });

    });
}

function updateFavoriteBtn() {
    if (!currentQuote) return;
    browser.storage.local.get("favorites").then((result) => {

        let favorites = result.favorites || [];

        let exists = favorites.some(q =>
            q.q === currentQuote.q && q.a === currentQuote.a
        );

        if (exists) {
            favoriteBtn.classList.add("saved");
        } else {
            favoriteBtn.classList.remove("saved");
        }

    });
}

// generate quote
generateBtn.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    currentQuote = quotes[randomIndex];

    quote.textContent = currentQuote.q;
    author.textContent = currentQuote.a;

    updateFavoriteBtn();
});

// add to favorite list
favoriteBtn.addEventListener("click", () => {
    if (!currentQuote) return;

    browser.storage.local.get("favorites").then((result) => {

        let favorites = result.favorites || [];

        let index = favorites.findIndex(q =>
            q.q === currentQuote.q && q.a === currentQuote.a
        );

        if (index === -1) {
            favorites.push(currentQuote);
        } else {
            favorites.splice(index, 1);
        }

        browser.storage.local.set({
            favorites: favorites
        }).then(updateFavoriteBtn);

    });
});