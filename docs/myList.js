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

/***/ "./src/myList.js":
/*!***********************!*\
  !*** ./src/myList.js ***!
  \***********************/
/***/ (() => {

eval("var baseUrl = \"https://api.coinranking.com/v2/coins\";\r\nvar proxyUrl = \"https://cors-anywhere.herokuapp.com/\";\r\nvar apiKey = \"4f508b14-de1b-4bce-9b14-821a68f239b4\";\r\nvar apiKey2 = \"55a006ab-f2d6-4c80-8708-72443e9abc6d\";\r\nvar idUrl = \"https://api.coinranking.com/v2/coins?\";\r\nvar example = \"uuids[]=razxDUgYGNAdQ&uuids[]=Qwsogvtv82FCd&uuids[]=a91GCGd_u96cF\";\r\n\r\nasync function getMyList(){\r\n\r\n    const resp = await fetch('https://gregory-vettorel-backend.herokuapp.com/list');\r\n\r\n    const rawListData = await resp.json();\r\n\r\n    console.log(rawListData);\r\n\r\n    let finalString = \"\";\r\n    for(let i = 0; i < rawListData.length; i++){\r\n        let id = rawListData[i].uuid;\r\n        let en = \"&\";\r\n\r\n        console.log(id);\r\n        \r\n        if(i == 0) {\r\n            en = \"\";\r\n        }\r\n\r\n        finalString += \"\" + en + \"uuids[]=\" + id;\r\n    }\r\n\r\n    console.log(finalString);\r\n    \r\n    const listCall = await fetch(`${proxyUrl}${idUrl}${finalString}`, {\r\n        method: 'GET',\r\n        headers: {\r\n          'Content-Type': 'application/json',\r\n          'X-My-Custom-Header': `${apiKey}`,\r\n          'Access-Control-Allow-Origin': \"*\"\r\n        }\r\n      })\r\n\r\n    const jsonListCall = await listCall.json();\r\n\r\n    const CoinsMyList = jsonListCall.data.coins;\r\n\r\n    console.log(CoinsMyList);\r\n    let cryptoCoin = \"\";\r\n\r\n    const tableString = `<div class=\"top50Table\" style=\"margin-top:10px\">\r\n    <h1 class=\"top50Title\">My list</h1>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-12\">\r\n        <table class=\"table crypto-table\">\r\n          <thead>\r\n            <tr class=\"table-titles\">\r\n              <th scope=\"col\">#</th>\r\n              <th scope=\"col\">Name</th>\r\n              <th scope=\"col\">Symbol</th>\r\n              <th scope=\"col\">Market Cap</th>\r\n              <th scope=\"col\">Price</th>\r\n              <th scope=\"col\">%(24h)</th>\r\n              <th scrope=\"\"></th>\r\n            </tr>\r\n          </thead>\r\n\r\n          <tbody id=\"ListCoins\">\r\n          </tbody>\r\n        </table>\r\n    </div>\r\n  </div>\r\n  </div>`\r\n\r\n  document.getElementById(\"divForMyCoins\").innerHTML = tableString;\r\n\r\n    for(let x = 0; x < CoinsMyList.length; x++) {\r\n        let changeVariable = CoinsMyList[x].change;\r\n        if(changeVariable.charAt(0) == \"-\"){\r\n          changeColor = \"red\";\r\n          //losersCount++;\r\n        } else {\r\n          changeColor = \"green\";\r\n          //gainersCount++;\r\n        }\r\n        //let circulating = coin.supply.circulating;\r\n        cryptoCoin += `\r\n        <tr>\r\n        <td>${CoinsMyList[x].rank}</td>\r\n        <td><img src=\"${CoinsMyList[x].iconUrl}\" style=\"float:left;\" /><span class=\"text-warning\" name=\"name\" id=\"name\"> ${CoinsMyList[x].name}</span></td>\r\n        <td name=\"symbol\" id=\"symbol\">${CoinsMyList[x].symbol}</td>\r\n        <td>$${CoinsMyList[x].marketCap}</td>\r\n        <td class=\"text-warning\">$${CoinsMyList[x].price}</td>\r\n        <td class=\"text-success\" style=\"color: ${changeColor}; font-weight: 1000;\">${CoinsMyList[x].change} %<i class=\"fa fa-arrow-up\"></i></td>\r\n        <td><input type=\"submit\" id=\"${CoinsMyList[x].uuid}\" name=\"submit\" value=\"❌\" style=\"background-color: white; border: none;\" class=\"deleteBtn\" onclick=\"deleteBtn(${CoinsMyList[x].uuid})\"></td>\r\n      </tr>\r\n        `\r\n    }\r\n\r\n    document.getElementById(\"ListCoins\").innerHTML = cryptoCoin;\r\n\r\n    //document.getElementById(\"deleteBtn\").addEventListener(\"submit\", deleteBtn())\r\n    async function deleteBtn(uuid){\r\n      console.log(uuid.id);\r\n      if(!uuid.id){\r\n       return;\r\n    }\r\n    const resp = await fetch(`https://gregory-vettorel-backend.herokuapp.com/list/${uuid.id}`, {\r\n      method: \"DELETE\"\r\n    });\r\n   }\r\n}\r\n\r\nlet searchFunction = event => {\r\n  event.preventDefault();\r\n  let value = document.getElementById('searchInputSymbol').value;\r\n  console.log(value);\r\n  searchScript(value);\r\n};\r\n\r\ngetMyList();\n\n//# sourceURL=webpack://web2-frontend-gregoryvettorel2/./src/myList.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/myList.js"]();
/******/ 	
/******/ })()
;