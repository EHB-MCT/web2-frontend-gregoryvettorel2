console.log("search coin script linked");

var baseUrl = "https://api.coinranking.com/v2/coins";
var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var apiKey = "4f508b14-de1b-4bce-9b14-821a68f239b4";
var apiKey2 = "55a006ab-f2d6-4c80-8708-72443e9abc6d";

//GRAPH SHIZZLES
async function createChart(graphData){
    console.log("chart generated.");
    const ctx = await document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['-24h','-23h','-22h','-21h','-20h','-19h','-18h','-17h','-16h','-15h','-14h','-13h','-12h','-11h','-10h','-9h','-8h','-7h','-6h','-5h','-4h','-3h','-2h','-1h', 'Now'],
            datasets: [{
                label: '24h price movement',
                data: graphData,
          
                backgroundColor: [
                    'rgba(0, 2, 252)'
                ],
                borderColor: [
                    'rgba(0, 2, 252)'
                ],
                borderWidth: 1
            }]
        },
        options: {
          maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
    }

//SEARCH FIZZLES
async function searchScript(searchSymbol) {
    var url = `${proxyUrl}${baseUrl}?symbols[]=${searchSymbol}`;
  
    const resp = await fetch(`${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-My-Custom-Header': `${apiKey}`,
        'Access-Control-Allow-Origin': "*"
      }
    })
  
    const searchedCoinRaw = await resp.json();
  
    console.log(searchedCoinRaw);
  
    const searchedCoinResult = searchedCoinRaw.data.coins[0];
  
    console.log(searchedCoinResult);
  
    var coinPageString = "";
  
    let changeColor = "";
  
      changeColor = "";
  
      var volume = "24hvolume";
      let changeVariable = searchedCoinResult.change;
      if(changeVariable.charAt(0) == "-"){
        changeColor += "red";
      } else {
        changeColor += "green";
      }
      let slicedPrice = searchedCoinResult.price.slice(0,10);
      coinPageString += `<form action="http://localhost:3000/list" method="POST" id="form">
      <label for="uuid"></label>
      <input style="display:none" type="text" name="uuid" id="uuid" for="uuid" value="${searchedCoinResult.uuid}">
      <label for="name"></label>
      <input style="display:none" type="text" name="name" id="name" for="name" value="${searchedCoinResult.name}">
      <label for="iconUrl"></label>
      <input style="display:none" type="text" name="iconUrl" id="iconUrl" for="iconUrl" value="${searchedCoinResult.iconUrl}">
      <label for="price"></label>
      <input style="display:none" type="text" name="price" id="price" for="price" value="${slicedPrice}">
      <label for="marketCap"></label>
      <input style="display:none" type="text" name="marketCap" id="marketCap" for="marketCap" value="${searchedCoinResult.marketCap}">
      
      <!-- SHOWN HTML -->
      <div class="coin-info-top">
      <div class="coin-info-left-div">
      <img src="${searchedCoinResult.iconUrl}" class="coin-info-img"/>
      <h2 class="coin-info-name">${searchedCoinResult.name}</h2>
      </div>
      <input type="submit" id="addListButton" value="Add to my list">
      </div>
      <div class="chart-wrapper">
          <div class="coin-info-left-chart-div">
          <p class="coin-info-price">$${searchedCoinResult.price} USD</p>
          <p class="coin-info-change" style="color: ${changeColor}">${searchedCoinResult.change}%</p>
          </div>
          <div class="coin-info-right-div">
              <p cass="coin-info-volume">Volume: $${searchedCoinResult.volume}</p>
              <p class="coin-info-market">Market cap: $${searchedCoinResult.marketCap}</p>
              </div>
          <canvas id="myChart" width="200" height="200"></canvas>
      </div></form>`;

      document.getElementById("index-body").innerHTML = coinPageString;
  
    //CREATING THE GRAPH
    const graphData = searchedCoinResult.sparkline;
    //console.log(graphData);
    createChart(graphData);
  }

  let searchFunction = event => {
    event.preventDefault();
    let value = document.getElementById('searchInputSymbol').value;
    //document.getElementById("coin-info").innerHTML = "";
    console.log(value);
    searchScript(value);
}

document.getElementById("form").addEventListener('submit', e => {
  e.preventDefault();
 
  let name = document.getElementById("name").value;
  let uuid = document.getElementById("uuid").value;
  let price = document.getElementById("price").value;
  let iconUrl = document.getElementById("iconUrl").value;
  let marketCap = document.getElementById("marketCap").value;
});

document.getElementById('searchForm').addEventListener('submit', searchFunction);