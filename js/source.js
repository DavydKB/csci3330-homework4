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
    try{
      const gameDetails = await fetch(`https://api.gamebrain.co/v1/games/${gameID}?api-key=${apiKey}`);//game details
      const details = await gameDetails.json();
      console.log(details);

      const gameNews = await fetch(`https://api.gamebrain.co/v1/games/${gameID}/news?api-key=${apiKey}`); //game news
      const news = await gameNews.json();
      console.log(news);

      const similarGames = await fetch(`https://api.gamebrain.co/v1/games/${gameID}/similar?api-key=${apiKey}`); //similar games
      const similar = await similarGames.json();
      console.log(similar);

    } catch (error){
      console.error(error);
    }

}
load();


   