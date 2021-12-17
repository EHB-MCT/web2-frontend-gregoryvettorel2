var baseUrl = "https://api.coinranking.com/v2/coins";
var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var apiKey = "4f508b14-de1b-4bce-9b14-821a68f239b4";

//GRAPH SHIZZLES
async function createChart(){
console.log("chart generated.");
const ctx = await document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['-24h','-23h','-22h','-21h','-20h','-19h','-18h','-17h','-16h','-15h','-14h','-13h','-12h','-11h','-10h','-9h','-8h','-7h','-6h','-5h','-4h','-3h','-2h','-1h', 'Now'],
        datasets: [{
            label: '24h price movement',
            data: [
              "775.6715646572332397640000",
              "766.0828736988712539770000",
              "754.3738755574379994010000",
              "752.7211896665261544310000",
              "757.0374186287868010470000",
              "757.6769305682970088350000",
              "805.6753372007194317140000",
              "805.0983768457222427550000",
              "799.8746616469092196570000",
              "802.6523394071007624980000",
              "797.1531568318142140090000",
              "772.9244953330569364850000",
              "764.5060492057627600830000",
              "771.0263864348801335100000",
              "773.8714239213700431810000",
              "785.3785343267603631110000",
              "793.4483197223557615750000",
              "803.0993985364754719390000",
              "824.7814978202695026330000",
              "833.5786423557748255170000",
              "824.5928048488282835530000",
              "817.8797765565419878640000",
              "828.6137027034925471120000",
              "855.8610227474447877480000",
              "853.2232587985660993050000",
              "867.1864718882274791380000",
              "870.5260037488412452620000"
          ],
      
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

//Calling functions
getIndexData();
createChart();