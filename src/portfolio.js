var baseUrl = "https://api.coinranking.com/v2/coins";
var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var apiKey = "4f508b14-de1b-4bce-9b14-821a68f239b4";
var apiKey2 = "55a006ab-f2d6-4c80-8708-72443e9abc6d";
var symbolsUrl = "https://api.coinranking.com/v2/coins?";
var exampleApi = "/coins?symbols[]=BTC&symbols[]=ETH&symbols=XRP";

async function portfolioFunction(){

    const resp = await fetch('https://gregory-vettorel-backend.herokuapp.com/portfolio');

    const rawListData = await resp.json();

    console.log(rawListData);

//    <h1 class="top50Title">My Portfolio</h1>


    const tableString = `<div class="top50Table" style="margin-top:10px">
  <div class="row">
    <div class="col-md-12">
      <table class="table crypto-table">
        <thead>
          <tr class="table-titles">
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Symbol</th>
            <th scope="col">Quantity</th>
            <th scope="col">Bought at</th>
            <th scope="col">Current price</th>
            <th scope="col">Current value</th>
            <th scrope="col">Change in $</th>
          </tr>
        </thead>

        <tbody id="ListCoins">
        </tbody>
      </table>
  </div>
</div>
</div>`

    document.getElementById("divForDataPortfolio").innerHTML = tableString;


  let finalString = "";
  for(let i = 0; i < rawListData.length; i++){
      let symbol = rawListData[i].symbol;
      let en = "&";

      console.log(symbol);
      
      if(i == 0) {
          en = "";
      }

      finalString += "" + en + "symbols[]=" + symbol;
  }

  console.log(finalString);
  
  const listCall = await fetch(`${proxyUrl}${symbolsUrl}${finalString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-My-Custom-Header': `${apiKey}`,
        'Access-Control-Allow-Origin': "*"
      }
    })

  const jsonListCall = await listCall.json();

  const CoinsMyList = jsonListCall.data.coins;

  console.log(CoinsMyList);

  let cryptoCoin = ``;

  let totalGains = 0;

  let = totalValueInvested = 0;

  //CALCULATIONS
  for(var i = 0; i < rawListData.length; i++){
      let userQty = rawListData[i].quantity;
      let boughtPrice = rawListData[i].price;
      let currentPriceString = CoinsMyList[i].price;
      let currentPrice = parseFloat(currentPriceString);

      let valueInvested = userQty*boughtPrice;
      let currentValue = userQty*currentPrice;
      let gainForCoin = currentValue - valueInvested;

      totalValueInvested = totalValueInvested + valueInvested;
      totalGains = totalGains + gainForCoin;

      currentPrice = currentPrice.toString().slice(0, 8);
      currentValue = currentValue.toString().slice(0,8);
      gainForCoin = gainForCoin.toString().slice(0,8);

      cryptoCoin += `
      <tr>
      <td>${CoinsMyList[i].rank}</td>
      <td><img src="${CoinsMyList[i].iconUrl}" style="float:left;" /><span class="text-warning" name="name" id="nameCoin"> ${CoinsMyList[i].name}</span></td>
      <td name="symbol" id="symbolCoin"> ${CoinsMyList[i].symbol}</td>
      <td>${userQty}</td>
      <td>$ ${boughtPrice}</td>
      <td class="text-warning">$ ${currentPrice}</td>
      <td class="text-warning">$ ${currentValue}</td>
      <td class="text-warning">$ ${gainForCoin}</td>
      <td><input type="submit" id="${CoinsMyList[i].symbol}" name="submit" value="❌" style="background-color: white; border: none;" class="deleteBtn" onclick="deleteBtn(${CoinsMyList[i].symbol})"></td>
        </tr>
      `

      document.getElementById("ListCoins").innerHTML = cryptoCoin;

  }
  let changePercentage = totalValueInvested/totalGains*100;
  let color = "";
  if(totalGains > 0){
    color = "green";
  }
  let totalGainsString = `<h2 style="color: ${color}" class="changeTitle">TOTAL VALUE: ${totalGains}</h2>
  <h2 style="color: ${color}" class="changeTitle">CHANGE PERCENTAGE: ${changePercentage}%</h2>`

  console.log(totalGains);

  document.getElementById("changeOverview").innerHTML = totalGainsString;

}

portfolioFunction();

document.getElementById("deleteBtn").addEventListener("submit", deleteBtn())

async function deleteBtn(symbol){
  console.log(symbol);
  console.log(symbol.id);
  const resp = await fetch(`https://gregory-vettorel-backend.herokuapp.com/portfolio/${symbol.id}`, {
    method: "DELETE"
  });
}

let searchFunction = event => {
  event.preventDefault();
  let value = document.getElementById('searchInputSymbol').value;
  console.log(value);
  searchScript(value);
};