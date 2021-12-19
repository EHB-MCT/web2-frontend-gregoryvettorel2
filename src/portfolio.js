var baseUrl = "https://api.coinranking.com/v2/coins";
var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var apiKey = "4f508b14-de1b-4bce-9b14-821a68f239b4";
var apiKey2 = "55a006ab-f2d6-4c80-8708-72443e9abc6d";
var symbolsUrl = "https://api.coinranking.com/v2/coins?";
var exampleApi = "/coins?symbols[]=BTC&symbols[]=ETH&symbols=XRP";

async function portfolioFunction(){

    const resp = await fetch('http://localhost:3000/portfolio');

    const rawListData = await resp.json();

    console.log(rawListData);

    const tableString = `<div class="top50Table" style="margin-top:10px">
    <h1 class="top50Title">My Portfolio</h1>
    <div class="row">
      <div class="col-md-12">
        <table class="table crypto-table">
          <thead>
            <tr class="table-titles">
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Symbol</th>
              <th scope="col">Market Cap</th>
              <th scope="col">Price</th>
              <th scope="col">Vol(24h)</th>
              <th scope="col">%(24h)</th>
              <th scrope=""></th>
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
}

portfolioFunction();