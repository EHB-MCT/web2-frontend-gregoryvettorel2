var baseUrl = "https://api.coinranking.com/v2/coins";
var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var apiKey = "4f508b14-de1b-4bce-9b14-821a68f239b4";

//GRAPH SHIZZLES
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

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
    console.log(changeVariable);
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

getIndexData();