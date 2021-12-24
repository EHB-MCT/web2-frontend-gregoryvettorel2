/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/portfolio.js":
/*!**************************!*\
  !*** ./src/portfolio.js ***!
  \**************************/
/***/ (() => {

eval("var baseUrl = \"https://api.coinranking.com/v2/coins\";\r\nvar proxyUrl = \"https://cors-anywhere.herokuapp.com/\";\r\nvar apiKey = \"4f508b14-de1b-4bce-9b14-821a68f239b4\";\r\nvar apiKey2 = \"55a006ab-f2d6-4c80-8708-72443e9abc6d\";\r\nvar symbolsUrl = \"https://api.coinranking.com/v2/coins?\";\r\nvar exampleApi = \"/coins?symbols[]=BTC&symbols[]=ETH&symbols=XRP\";\r\n\r\nasync function portfolioFunction(){\r\n\r\n    const resp = await fetch('https://gregory-vettorel-backend.herokuapp.com/portfolio');\r\n\r\n    const rawListData = await resp.json();\r\n\r\n    console.log(rawListData);\r\n\r\n//    <h1 class=\"top50Title\">My Portfolio</h1>\r\n\r\n\r\n    const tableString = `<div class=\"top50Table\" style=\"margin-top:10px\">\r\n  <div class=\"row\">\r\n    <div class=\"col-md-12\">\r\n      <table class=\"table crypto-table\">\r\n        <thead>\r\n          <tr class=\"table-titles\">\r\n            <th scope=\"col\">#</th>\r\n            <th scope=\"col\">Name</th>\r\n            <th scope=\"col\">Symbol</th>\r\n            <th scope=\"col\">Quantity</th>\r\n            <th scope=\"col\">Bought at</th>\r\n            <th scope=\"col\">Current price</th>\r\n            <th scope=\"col\">Current value</th>\r\n            <th scrope=\"col\">Change in $</th>\r\n          </tr>\r\n        </thead>\r\n\r\n        <tbody id=\"ListCoins\">\r\n        </tbody>\r\n      </table>\r\n  </div>\r\n</div>\r\n</div>`\r\n\r\n    document.getElementById(\"divForDataPortfolio\").innerHTML = tableString;\r\n\r\n\r\n  let finalString = \"\";\r\n  for(let i = 0; i < rawListData.length; i++){\r\n      let symbol = rawListData[i].symbol;\r\n      let en = \"&\";\r\n\r\n      console.log(symbol);\r\n      \r\n      if(i == 0) {\r\n          en = \"\";\r\n      }\r\n\r\n      finalString += \"\" + en + \"symbols[]=\" + symbol;\r\n  }\r\n\r\n  console.log(finalString);\r\n  \r\n  const listCall = await fetch(`${proxyUrl}${symbolsUrl}${finalString}`, {\r\n      method: 'GET',\r\n      headers: {\r\n        'Content-Type': 'application/json',\r\n        'X-My-Custom-Header': `${apiKey}`,\r\n        'Access-Control-Allow-Origin': \"*\"\r\n      }\r\n    })\r\n\r\n  const jsonListCall = await listCall.json();\r\n\r\n  const CoinsMyList = jsonListCall.data.coins;\r\n\r\n  console.log(CoinsMyList);\r\n\r\n  let cryptoCoin = ``;\r\n\r\n  let totalGains = 0;\r\n\r\n  let = totalValueInvested = 0;\r\n\r\n  //CALCULATIONS\r\n  for(var i = 0; i < rawListData.length; i++){\r\n      let userQty = rawListData[i].quantity;\r\n      let boughtPrice = rawListData[i].price;\r\n      let currentPriceString = CoinsMyList[i].price;\r\n      let currentPrice = parseFloat(currentPriceString);\r\n\r\n      let valueInvested = userQty*boughtPrice;\r\n      let currentValue = userQty*currentPrice;\r\n      let gainForCoin = currentValue - valueInvested;\r\n\r\n      totalValueInvested = totalValueInvested + valueInvested;\r\n      totalGains = totalGains + gainForCoin;\r\n\r\n      currentPrice = currentPrice.toString().slice(0, 8);\r\n      currentValue = currentValue.toString().slice(0,8);\r\n      gainForCoin = gainForCoin.toString().slice(0,8);\r\n\r\n      cryptoCoin += `\r\n      <tr>\r\n      <td>${CoinsMyList[i].rank}</td>\r\n      <td><img src=\"${CoinsMyList[i].iconUrl}\" style=\"float:left;\" /><span class=\"text-warning\" name=\"name\" id=\"nameCoin\"> ${CoinsMyList[i].name}</span></td>\r\n      <td name=\"symbol\" id=\"symbolCoin\"> ${CoinsMyList[i].symbol}</td>\r\n      <td>${userQty}</td>\r\n      <td>$ ${boughtPrice}</td>\r\n      <td class=\"text-warning\">$ ${currentPrice}</td>\r\n      <td class=\"text-warning\">$ ${currentValue}</td>\r\n      <td class=\"text-warning\">$ ${gainForCoin}</td>\r\n      <td><input type=\"submit\" id=\"${CoinsMyList[i].symbol}\" name=\"submit\" value=\"❌\" style=\"background-color: white; border: none;\" class=\"deleteBtn\" onclick=\"deleteBtn(${CoinsMyList[i].symbol})\"></td>\r\n        </tr>\r\n      `\r\n\r\n      document.getElementById(\"ListCoins\").innerHTML = cryptoCoin;\r\n\r\n  }\r\n  let changePercentage = totalValueInvested/totalGains*100;\r\n  let color = \"\";\r\n  if(totalGains > 0){\r\n    color = \"green\";\r\n  }\r\n  let totalGainsString = `<h2 style=\"color: ${color}\" class=\"changeTitle\">TOTAL VALUE: ${totalGains}</h2>\r\n  <h2 style=\"color: ${color}\" class=\"changeTitle\">CHANGE PERCENTAGE: ${changePercentage}%</h2>`\r\n\r\n  console.log(totalGains);\r\n\r\n  document.getElementById(\"changeOverview\").innerHTML = totalGainsString;\r\n\r\n}\r\n\r\nportfolioFunction();\r\n\r\ndocument.getElementById(\"deleteBtn\").addEventListener(\"submit\", deleteBtn())\r\n\r\nasync function deleteBtn(symbol){\r\n  console.log(symbol);\r\n  console.log(symbol.id);\r\n  const resp = await fetch(`https://gregory-vettorel-backend.herokuapp.com/portfolio/${symbol.id}`, {\r\n    method: \"DELETE\"\r\n  });\r\n}\n\n//# sourceURL=webpack://web2-frontend-gregoryvettorel2/./src/portfolio.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/portfolio.js"]();
/******/ 	
/******/ })()
;