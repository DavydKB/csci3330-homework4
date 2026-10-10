// *********************************************************************
// Homework 4 Public APIs
// *********************************************************************

function formatYearFromStr(dateString) {
  return dateString.split('-')[0];
}

function formatPercentage(value) {
  return `${(value * 100).toFixed(2)}%`;
}

localStorage.setItem("game_id", "1370228"); //Expedition 33
localStorage.setItem("api_key", "b8f5890c2965490b9017bc4b20348ae1");



async function load(){
    
    // add as many more as needed
    let gameID = localStorage.getItem("game_id");
    let apiKey = localStorage.getItem("api_key");
    
    // **************** Write you code below **************** 

    const gameDetails = await fetch(`https://api.gamebrain.co/v1/games/${gameID}?api-key=${apiKey}`);//game details
    const details = await gameDetails.json();
    console.log(details);

    const gameNews = await fetch(`https://api.gamebrain.co/v1/games/${gameID}/news?api-key=${apiKey}`); //game news
    const news = await gameNews.json();
    console.log(news);

    const similarGames = await fetch(`https://api.gamebrain.co/v1/games/${gameID}/similar?api-key=${apiKey}`); //similar games
    const similar = await similarGames.json();
    console.log(similar);


    //Hero (game?) section
    document.querySelector("#game-name").textContent = details.name; //title
    document.querySelector(".game-image img").src = details.image; //image
    document.querySelector(".game-meta").textContent = `${details.developer} • ${formatYearFromStr(details.release_date)}`; //dev + release date
    document.querySelector(".game-genre").textContent = details.genres[0].name; //1 genre

    //Game news
    const newsCards = document.querySelectorAll(".news-card");
    for (let i = 0; i < 3; i++) {
        const item = news.news[i];
        newsCards[i].querySelector("h3").textContent = item.title; //title
        newsCards[i].querySelector(".news-published").textContent = `Published ${item.published}`; //date
        newsCards[i].querySelector("img").src = item.image; //img
    }

    //Similar games
    const similarGs = document.querySelectorAll(".game-grid .game-card");
    for (let i = 0; i < 4; i++) {
        const game = similar.results[i];
        const card = similarGs[i];

        card.querySelector("h3").textContent = game.name; //name
        card.querySelector("img").src = game.image; //img

        const rating = card.querySelectorAll(".game-card-meta span"); 
        rating[0].textContent = Math.trunc(game.year); //year
        rating[1].textContent = formatPercentage(game.rating.mean);//rating
    }
}
load();


   