var baseUrl = "https://api.coinranking.com/v2/coins";
var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var apiKey2 = "4f508b14-de1b-4bce-9b14-821a68f239b4";
var apiKey = "55a006ab-f2d6-4c80-8708-72443e9abc6d";

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

//GET DATA NIZZLES
async function getIndexData() {
  var apiUrl = `${proxyUrl}${baseUrl}`;
  console.log(apiUrl);

  const resp = await fetch(`${proxyUrl}${baseUrl}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-My-Custom-Header': `${apiKey}`,
      'Access-Control-Allow-Origin': "*"
    }
  })

  const respTopGainers = await fetch(`${proxyUrl}${baseUrl}?orderBy=change`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'X-My-Custom-Header': `${apiKey}`,
      'Access-Control-Allow-Origin': "*"
    }
  })

  //DATA FOR TOP GAINERS
  const topGainersData = await respTopGainers.json()

  const topGainersCoins = topGainersData.data.coins;

  console.log(topGainersCoins)

  var gainersCoinsString = "";

  let changeColor = "";

  for(let i = 0; i < 4; i++){
    changeColor = "";
    let changeVariable = topGainersCoins[i].change;
    if(changeVariable.charAt(0) == "-"){
      changeColor += "red";
    } else {
      changeColor += "green";
    }
    let slicedPrice = topGainersCoins[i].price.slice(0,10);
    gainersCoinsString += `<div class="box1">
    <img src="${topGainersCoins[i].iconUrl}" class="topChangeImage"/>
    <p class="topChangeName">${topGainersCoins[i].name}</p>
    <p class="topChangePrice">${slicedPrice}</p>
    <p class="topChangeChange" style="color: ${changeColor};  font-weight: 1000;">${topGainersCoins[i].change}%</p>
</div>`
  };
  document.getElementById("topChangeDiv").innerHTML = gainersCoinsString;

  //DATA FOR TOP 50
  const coinsData = await resp.json()

  const coins = coinsData.data.coins;

  const hVolume = "24hVolume";

  if (coins.length > 0) {
    var cryptoCoin = "";
  }
  //For Loop Starts
  coins.forEach((coin) => {
    let changeVariable = coin.change;
    if(changeVariable.charAt(0) == "-"){
      changeColor = "red";
    } else {
      changeColor = "green";
    }
    //let circulating = coin.supply.circulating;
    cryptoCoin += `
    <tr>
    <td>${coin.rank}</td>
    <td><img src="${coin.iconUrl}" style="float:left;" /><span class="text-warning"> ${coin.name}</span></td>
    <td>${coin.symbol}</td>
    <td>$${coin.marketCap}</td>
    <td class="text-warning">$${coin.price}</td>
    <td class="text-warning">${coin.hVolume}</td>
    <td class="text-success" style="color: ${changeColor}; font-weight: 1000;">${coin.change} %<i class="fa fa-arrow-up"></i></td>
  </tr>
    `
  });
  //For Loop Ends
  document.getElementById("50coins").innerHTML = cryptoCoin;
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
    coinPageString += `<div class="coin-info-top">
    <div class="coin-info-left-div">
    <img src="${searchedCoinResult.iconUrl}" class="coin-info-img"/>
    <h2 class="coin-info-name">${searchedCoinResult.name}</h2>
    </div>
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
    </div>`;
  document.getElementById("coin-info").innerHTML = coinPageString;

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
  //window.location.href = "coin.html";
  searchScript(value);
}

window.onload = () => {

document.getElementById('searchForm').addEventListener('submit', searchFunction);

//Calling functions
getIndexData();
}