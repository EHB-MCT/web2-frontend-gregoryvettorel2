(()=>{var e="https://api.coinranking.com/v2/coins",n="https://cors-anywhere.herokuapp.com/",t="4f508b14-de1b-4bce-9b14-821a68f239b4";window.searchThisCoin=function(){console.log("clicked"),console.log(this.symbol),console.log(this.parent.symbol)};let o=e=>{e.preventDefault();let n=document.getElementById("searchInputSymbol").value;console.log(n),searchScript(n)};window.onload=()=>{document.getElementById("searchForm").addEventListener("submit",o),async function(){var o=`${n}${e}`;console.log(o);const s=await fetch(`${n}${e}`,{method:"GET",headers:{"Content-Type":"application/json","X-My-Custom-Header":`${t}`,"Access-Control-Allow-Origin":"*"}}),a=await fetch(`${n}${e}?orderBy=change`,{method:"GET",headers:{"Content-Type":"application/json","X-My-Custom-Header":`${t}`,"Access-Control-Allow-Origin":"*"}}),c=(await a.json()).data.coins;console.log(c);var r="";let l="";for(let e=0;e<4;e++){l="","-"==c[e].change.charAt(0)?l+="red":l+="green";let n=c[e].price.slice(0,10);r+=`<div class="box1">\n    <img src="${c[e].iconUrl}" class="topChangeImage"/>\n    <p class="topChangeName">${c[e].name}</p>\n    <p class="topChangePrice">${n}</p>\n    <p class="topChangeChange" style="color: ${l};  font-weight: 1000;">${c[e].change}%</p>\n</div>`}document.getElementById("topChangeDiv").innerHTML=r;const i=(await s.json()).data.coins;let d=0,g=0;if(i.length>0)var p="";i.forEach((e=>{"-"==e.change.charAt(0)?(l="red",g++):(l="green",d++),e.symbol,p+=`\n    <tr onclick="searchThisCoin()">\n    <td>${e.rank}</td>\n    <td><img src="${e.iconUrl}" style="float:left;" /><span class="text-warning"> ${e.name}</span></td>\n    <td>${e.symbol}</td>\n    <td>$${e.marketCap}</td>\n    <td class="text-warning">$${e.price}</td>\n    <td class="text-warning">${e.hVolume}</td>\n    <td class="text-success" style="color: ${l}; font-weight: 1000;">${e.change} %<i class="fa fa-arrow-up"></i></td>\n  </tr>`}));let h=`<p id="gainers" style="color: green; font-size: 20px;">&uarr; Gainers: ${d} &#8203 &#8203</p>\n  <p id="losers" style="color: red ;font-size: 20px;">&#8203\t&darr;  Losers: ${g}</p>`;p+="<br><br>",document.getElementById("gainersAndLosers").innerHTML=h,document.getElementById("50coins").innerHTML=p,console.log("gainers: "+d),console.log("losers: "+g)}()}})();