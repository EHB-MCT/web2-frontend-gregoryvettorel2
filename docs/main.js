(()=>{var e="https://api.coinranking.com/v2/coins",t="https://cors-anywhere.herokuapp.com/",n="4f508b14-de1b-4bce-9b14-821a68f239b4";!async function(){var a=`${t}${e}`;console.log(a);const o=await fetch(`${t}${e}`,{method:"GET",headers:{"Content-Type":"application/json","X-My-Custom-Header":`${n}`,"Access-Control-Allow-Origin":"*"}}),s=await fetch(`${t}${e}?orderBy=change`,{method:"GET",headers:{"Content-Type":"application/json","X-My-Custom-Header":`${n}`,"Access-Control-Allow-Origin":"*"}}),c=(await s.json()).data.coins;console.log(c);var r="";let h="";for(let e=0;e<4;e++){h="","-"==c[e].change.charAt(0)?h+="red":h+="green";let t=c[e].price.slice(0,10);r+=`<div class="box1">\n    <img src="${c[e].iconUrl}" class="topChangeImage"/>\n    <p class="topChangeName">${c[e].name}</p>\n    <p class="topChangePrice">${t}</p>\n    <p class="topChangeChange" style="color: ${h};  font-weight: 1000;">${c[e].change}%</p>\n</div>`}document.getElementById("topChangeDiv").innerHTML=r;const l=(await o.json()).data.coins;if(l.length>0)var i="";l.forEach((e=>{let t=e.change;h="-"==t.charAt(0)?"red":"green",i+=`\n    <tr>\n    <td>${e.rank}</td>\n    <td><img src="${e.iconUrl}" style="float:left;" /><span class="text-warning"> ${e.name}</span></td>\n    <td>${e.symbol}</td>\n    <td>$${e.marketCap}</td>\n    <td class="text-warning">$${e.price}</td>\n    <td class="text-warning">${e.hVolume}</td>\n    <td class="text-success" style="color: ${h}; font-weight: 1000;">${e.change} %<i class="fa fa-arrow-up"></i></td>\n  </tr>\n    `})),document.getElementById("50coins").innerHTML=i}(),async function(){console.log("chart generated.");const e=await document.getElementById("myChart").getContext("2d");new Chart(e,{type:"line",data:{labels:["-24h","-23h","-22h","-21h","-20h","-19h","-18h","-17h","-16h","-15h","-14h","-13h","-12h","-11h","-10h","-9h","-8h","-7h","-6h","-5h","-4h","-3h","-2h","-1h","Now"],datasets:[{label:"24h price movement",data:["775.6715646572332397640000","766.0828736988712539770000","754.3738755574379994010000","752.7211896665261544310000","757.0374186287868010470000","757.6769305682970088350000","805.6753372007194317140000","805.0983768457222427550000","799.8746616469092196570000","802.6523394071007624980000","797.1531568318142140090000","772.9244953330569364850000","764.5060492057627600830000","771.0263864348801335100000","773.8714239213700431810000","785.3785343267603631110000","793.4483197223557615750000","803.0993985364754719390000","824.7814978202695026330000","833.5786423557748255170000","824.5928048488282835530000","817.8797765565419878640000","828.6137027034925471120000","855.8610227474447877480000","853.2232587985660993050000","867.1864718882274791380000","870.5260037488412452620000"],backgroundColor:["rgba(0, 2, 252)"],borderColor:["rgba(0, 2, 252)"],borderWidth:1}]},options:{maintainAspectRatio:!1,scales:{y:{beginAtZero:!1}}}})}()})();