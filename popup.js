let button = document.querySelector('button');
let quote = document.getElementById('quote');
let author = document.getElementById('author');

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


button.addEventListener("click", () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    quote.innerHTML = randomQuote.q
    author.innerHTML = randomQuote.a
});