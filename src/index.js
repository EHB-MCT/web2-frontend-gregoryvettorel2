var baseUrl = "https://api.coinranking.com/v2/coins";
var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var apiKey = "4f508b14-de1b-4bce-9b14-821a68f239b4";
var apiKey2 = "55a006ab-f2d6-4c80-8708-72443e9abc6d";

window.searchThisCoin = searchThisCoin;

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

  let gainersCount = 0;
  let losersCount = 0;

  if (coins.length > 0) {
    var cryptoCoin = "";
  }
  //For Loop Starts
  coins.forEach((coin) => {
    let changeVariable = coin.change;
    if(changeVariable.charAt(0) == "-"){
      changeColor = "red";
      losersCount++;
    } else {
      changeColor = "green";
      gainersCount++;
    }

    var testtesttest = coin.symbol;
    //let circulating = coin.supply.circulating;
    cryptoCoin += `
    <tr onclick="searchThisCoin()">
    <td>${coin.rank}</td>
    <td><img src="${coin.iconUrl}" style="float:left;" /><span class="text-warning"> ${coin.name}</span></td>
    <td>${coin.symbol}</td>
    <td>$${coin.marketCap}</td>
    <td class="text-warning">$${coin.price}</td>
    <td class="text-warning">${coin.hVolume}</td>
    <td class="text-success" style="color: ${changeColor}; font-weight: 1000;">${coin.change} %<i class="fa fa-arrow-up"></i></td>
  </tr>`
  });

  let losersAndGainersString = `<p id="gainers" style="color: green; font-size: 20px;">&uarr; Gainers: ${gainersCount} &#8203 &#8203</p>
  <p id="losers" style="color: red ;font-size: 20px;">&#8203	&darr;  Losers: ${losersCount}</p>`;

  //For Loop Ends
  cryptoCoin += "<br><br>";
  document.getElementById("gainersAndLosers").innerHTML = losersAndGainersString;
  document.getElementById("50coins").innerHTML = cryptoCoin;
  console.log("gainers: " +gainersCount);
  console.log("losers: " +losersCount);

}

let searchFunction = event => {
  event.preventDefault();
  let value = document.getElementById('searchInputSymbol').value;
  //document.getElementById("coin-info").innerHTML = "";
  console.log(value);
  //window.location.href = "coin.html";
  searchScript(value);
}

function searchThisCoin() {
  console.log("clicked");
  console.log(this.symbol);
  console.log(this.parent.symbol);
}

window.onload = () => {

document.getElementById('searchForm').addEventListener('submit', searchFunction);

//Calling functions
getIndexData();
}