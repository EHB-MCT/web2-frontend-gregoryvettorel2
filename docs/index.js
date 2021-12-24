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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("var baseUrl = \"https://api.coinranking.com/v2/coins\";\r\nvar proxyUrl = \"https://cors-anywhere.herokuapp.com/\";\r\nvar apiKey = \"4f508b14-de1b-4bce-9b14-821a68f239b4\";\r\nvar apiKey2 = \"55a006ab-f2d6-4c80-8708-72443e9abc6d\";\r\n\r\n//window.searchThisCoin = searchThisCoin;\r\n\r\n//GET DATA\r\nasync function getIndexData() {\r\n  var apiUrl = `${proxyUrl}${baseUrl}`;\r\n  console.log(apiUrl);\r\n\r\n  const resp = await fetch(`${proxyUrl}${baseUrl}`, {\r\n    method: 'GET',\r\n    headers: {\r\n      'Content-Type': 'application/json',\r\n      'X-My-Custom-Header': `${apiKey}`,\r\n      'Access-Control-Allow-Origin': \"*\"\r\n    }\r\n  })\r\n\r\n  const respTopGainers = await fetch(`${proxyUrl}${baseUrl}?orderBy=change`, {\r\n    method: 'GET',\r\n    headers: {\r\n      'Content-Type': 'application/json',\r\n      'X-My-Custom-Header': `${apiKey}`,\r\n      'Access-Control-Allow-Origin': \"*\"\r\n    }\r\n  })\r\n\r\n  //DATA FOR TOP GAINERS\r\n  const topGainersData = await respTopGainers.json()\r\n\r\n  const topGainersCoins = topGainersData.data.coins;\r\n\r\n  console.log(topGainersCoins)\r\n\r\n  var gainersCoinsString = \"\";\r\n\r\n  let changeColor = \"\";\r\n\r\n  for(let i = 0; i < 4; i++){\r\n    changeColor = \"\";\r\n    let changeVariable = topGainersCoins[i].change;\r\n    if(changeVariable.charAt(0) == \"-\"){\r\n      changeColor += \"red\";\r\n    } else {\r\n      changeColor += \"green\";\r\n    }\r\n    let slicedPrice = topGainersCoins[i].price.slice(0,10);\r\n    gainersCoinsString += `<div class=\"box1\">\r\n    <img src=\"${topGainersCoins[i].iconUrl}\" class=\"topChangeImage\"/>\r\n    <p class=\"topChangeName\">${topGainersCoins[i].name}</p>\r\n    <p class=\"topChangePrice\">${slicedPrice}</p>\r\n    <p class=\"topChangeChange\" style=\"color: ${changeColor};  font-weight: 1000;\">${topGainersCoins[i].change}%</p>\r\n</div>`\r\n  };\r\n  document.getElementById(\"topChangeDiv\").innerHTML = gainersCoinsString;\r\n\r\n  //DATA FOR TOP 50\r\n  const coinsData = await resp.json()\r\n\r\n  const coins = coinsData.data.coins;\r\n\r\n  const hVolume = \"24hVolume\";\r\n\r\n  let gainersCount = 0;\r\n  let losersCount = 0;\r\n\r\n  if (coins.length > 0) {\r\n    var cryptoCoin = \"\";\r\n  }\r\n  //For Loop Starts\r\n  coins.forEach((coin) => {\r\n    let changeVariable = coin.change;\r\n    if(changeVariable.charAt(0) == \"-\"){\r\n      changeColor = \"red\";\r\n      losersCount++;\r\n    } else {\r\n      changeColor = \"green\";\r\n      gainersCount++;\r\n    }\r\n\r\n    var testtesttest = coin.symbol;\r\n    //let circulating = coin.supply.circulating;\r\n    cryptoCoin += `\r\n    <tr onclick=\"searchThisCoin()\">\r\n    <td>${coin.rank}</td>\r\n    <td><img src=\"${coin.iconUrl}\" style=\"float:left;\" /><span class=\"text-warning\"> ${coin.name}</span></td>\r\n    <td>${coin.symbol}</td>\r\n    <td>$${coin.marketCap}</td>\r\n    <td class=\"text-warning\">$${coin.price}</td>\r\n    <td class=\"text-warning\">${coin.hVolume}</td>\r\n    <td class=\"text-success\" style=\"color: ${changeColor}; font-weight: 1000;\">${coin.change} %<i class=\"fa fa-arrow-up\"></i></td>\r\n  </tr>`\r\n  });\r\n\r\n  let losersAndGainersString = `<p id=\"gainers\" style=\"color: green; font-size: 20px;\">&uarr; Gainers: ${gainersCount} &#8203 &#8203</p>\r\n  <p id=\"losers\" style=\"color: red ;font-size: 20px;\">&#8203\t&darr;  Losers: ${losersCount}</p>`;\r\n\r\n  //For Loop Ends\r\n  cryptoCoin += \"<br><br>\";\r\n  document.getElementById(\"gainersAndLosers\").innerHTML = losersAndGainersString;\r\n  document.getElementById(\"50coins\").innerHTML = cryptoCoin;\r\n  console.log(\"gainers: \" +gainersCount);\r\n  console.log(\"losers: \" +losersCount);\r\n}\r\n\r\nlet searchFunction = event => {\r\n  event.preventDefault();\r\n  let value = document.getElementById('searchInputSymbol').value;\r\n  //document.getElementById(\"coin-info\").innerHTML = \"\";\r\n  console.log(value);\r\n  //window.location.href = \"coin.html\";\r\n  searchScript(value);\r\n}\r\n\r\nfunction searchThisCoin() {\r\n  console.log(\"clicked\");\r\n  console.log(this.symbol);\r\n  console.log(this.parent.symbol);\r\n}\r\n\r\nwindow.onload = () => {\r\n\r\ndocument.getElementById('searchForm').addEventListener('submit', searchFunction);\r\n\r\n//Calling functions\r\ngetIndexData();\r\n}\n\n//# sourceURL=webpack://web2-frontend-gregoryvettorel2/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;