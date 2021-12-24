var baseUrl = "https://api.coinranking.com/v2/coins";
var proxyUrl = "https://cors-anywhere.herokuapp.com/";
var apiKey = "4f508b14-de1b-4bce-9b14-821a68f239b4";
var apiKey2 = "55a006ab-f2d6-4c80-8708-72443e9abc6d";
var idUrl = "https://api.coinranking.com/v2/coins?";
var example = "uuids[]=razxDUgYGNAdQ&uuids[]=Qwsogvtv82FCd&uuids[]=a91GCGd_u96cF";

async function getMyList(){

    const resp = await fetch('https://gregory-vettorel-backend.herokuapp.com/list');

    const rawListData = await resp.json();

    console.log(rawListData);

    let finalString = "";
    for(let i = 0; i < rawListData.length; i++){
        let id = rawListData[i].uuid;
        let en = "&";

        console.log(id);
        
        if(i == 0) {
            en = "";
        }

        finalString += "" + en + "uuids[]=" + id;
    }

    console.log(finalString);
    
    const listCall = await fetch(`${proxyUrl}${idUrl}${finalString}`, {
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
    let cryptoCoin = "";

    const tableString = `<div class="top50Table" style="margin-top:10px">
    <h1 class="top50Title">My list</h1>
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

  document.getElementById("divForMyCoins").innerHTML = tableString;

    for(let x = 0; x < CoinsMyList.length; x++) {
        let changeVariable = CoinsMyList[x].change;
        if(changeVariable.charAt(0) == "-"){
          changeColor = "red";
          //losersCount++;
        } else {
          changeColor = "green";
          //gainersCount++;
        }
        //let circulating = coin.supply.circulating;
        cryptoCoin += `
        <tr>
        <td>${CoinsMyList[x].rank}</td>
        <td><img src="${CoinsMyList[x].iconUrl}" style="float:left;" /><span class="text-warning" name="name" id="name"> ${CoinsMyList[x].name}</span></td>
        <td name="symbol" id="symbol">${CoinsMyList[x].symbol}</td>
        <td>$${CoinsMyList[x].marketCap}</td>
        <td class="text-warning">$${CoinsMyList[x].price}</td>
        <td class="text-success" style="color: ${changeColor}; font-weight: 1000;">${CoinsMyList[x].change} %<i class="fa fa-arrow-up"></i></td>
        <td><input type="submit" id="${CoinsMyList[x].uuid}" name="submit" value="❌" style="background-color: white; border: none;" class="deleteBtn" onclick="deleteBtn(${CoinsMyList[x].uuid})"></td>
      </tr>
        `
    }

    document.getElementById("ListCoins").innerHTML = cryptoCoin;

    //document.getElementById("deleteBtn").addEventListener("submit", deleteBtn())
    async function deleteBtn(uuid){
      console.log(uuid.id);
      if(!uuid.id){
       return;
    }
    const resp = await fetch(`https://gregory-vettorel-backend.herokuapp.com/list/${uuid.id}`, {
      method: "DELETE"
    });
   }
}

getMyList();