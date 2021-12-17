(()=>{var n="https://api.coinranking.com/v2/coins",e="https://cors-anywhere.herokuapp.com/",t="55a006ab-f2d6-4c80-8708-72443e9abc6d";let a=a=>{a.preventDefault();let o=document.getElementById("searchInputSymbol").value;console.log(o),async function(a){var o=`${e}${n}?symbols[]=${a}`;const c=await fetch(`${o}`,{method:"GET",headers:{"Content-Type":"application/json","X-My-Custom-Header":`${t}`,"Access-Control-Allow-Origin":"*"}}),s=await c.json();console.log(s);const i=s.data.coins[0];console.log(i);var l="";let r="";r="","-"==i.change.charAt(0)?r+="red":r+="green",i.price.slice(0,10),l+=`<div class="coin-info-top">\n    <div class="coin-info-left-div">\n    <img src="${i.iconUrl}" class="coin-info-img"/>\n    <h2 class="coin-info-name">${i.name}</h2>\n    </div>\n    </div>\n    \n    <div class="chart-wrapper">\n        <div class="coin-info-left-chart-div">\n        <p class="coin-info-price">$${i.price} USD</p>\n        <p class="coin-info-change" style="color: ${r}">${i.change}%</p>\n        </div>\n        <div class="coin-info-right-div">\n            <p cass="coin-info-volume">Volume: $${i.volume}</p>\n            <p class="coin-info-market">Market cap: $${i.marketCap}</p>\n            </div>\n        <canvas id="myChart" width="200" height="200"></canvas>\n    </div>`,document.getElementById("coin-info").innerHTML=l,async function(n){console.log("chart generated.");const e=await document.getElementById("myChart").getContext("2d");new Chart(e,{type:"line",data:{labels:["-24h","-23h","-22h","-21h","-20h","-19h","-18h","-17h","-16h","-15h","-14h","-13h","-12h","-11h","-10h","-9h","-8h","-7h","-6h","-5h","-4h","-3h","-2h","-1h","Now"],datasets:[{label:"24h price movement",data:n,backgroundColor:["rgba(0, 2, 252)"],borderColor:["rgba(0, 2, 252)"],borderWidth:1}]},options:{maintainAspectRatio:!1,scales:{y:{beginAtZero:!1}}}})}(i.sparkline)}(o)};window.onload=()=>{document.getElementById("searchForm").addEventListener("submit",a),async function(){var a=`${e}${n}`;console.log(a);const o=await fetch(`${e}${n}`,{method:"GET",headers:{"Content-Type":"application/json","X-My-Custom-Header":`${t}`,"Access-Control-Allow-Origin":"*"}}),c=await fetch(`${e}${n}?orderBy=change`,{method:"GET",headers:{"Content-Type":"application/json","X-My-Custom-Header":`${t}`,"Access-Control-Allow-Origin":"*"}}),s=(await c.json()).data.coins;console.log(s);var i="";let l="";for(let n=0;n<4;n++){l="","-"==s[n].change.charAt(0)?l+="red":l+="green";let e=s[n].price.slice(0,10);i+=`<div class="box1">\n    <img src="${s[n].iconUrl}" class="topChangeImage"/>\n    <p class="topChangeName">${s[n].name}</p>\n    <p class="topChangePrice">${e}</p>\n    <p class="topChangeChange" style="color: ${l};  font-weight: 1000;">${s[n].change}%</p>\n</div>`}document.getElementById("topChangeDiv").innerHTML=i;const r=(await o.json()).data.coins;if(r.length>0)var h="";r.forEach((n=>{let e=n.change;l="-"==e.charAt(0)?"red":"green",h+=`\n    <tr>\n    <td>${n.rank}</td>\n    <td><img src="${n.iconUrl}" style="float:left;" /><span class="text-warning"> ${n.name}</span></td>\n    <td>${n.symbol}</td>\n    <td>$${n.marketCap}</td>\n    <td class="text-warning">$${n.price}</td>\n    <td class="text-warning">${n.hVolume}</td>\n    <td class="text-success" style="color: ${l}; font-weight: 1000;">${n.change} %<i class="fa fa-arrow-up"></i></td>\n  </tr>\n    `})),document.getElementById("50coins").innerHTML=h}()}})();