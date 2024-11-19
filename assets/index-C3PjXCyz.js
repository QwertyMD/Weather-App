(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function c(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=c(e);fetch(e.href,r)}})();const s=document.querySelector("input"),n=document.querySelector(".weather-content");document.querySelector(".city-name");document.querySelector(".weather-condition p");document.querySelector(".temp p");document.querySelector(".wind p");s.addEventListener("keypress",a=>{if(a.key==="Enter"){const i=s.value.trim();n.innerHTML='<h1 class="text-xl">Searching...</h1>',i?l(i):n.innerHTML='<h1 class="text-xl">Enter a city name :(</h1>'}});async function l(a){try{const t=await(await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${a}&appid=a2088036f9abfaa7704ec2488d1b763d&units=metric`,{headers:{Accept:"application/json"}})).json();console.log(t),t&&t.name?n.innerHTML=`
          <div class="city-name text-3xl">${t.name}</div>
                <div class="weather-condition text-2xl">
                  <img class="mx-auto" src="http://openweathermap.org/img/wn/${t.weather[0].icon}.png" alt="${t.weather[0].main}">
                  <p>${t.weather[0].main}</p>
                </div>
                <div class="temp-wind text-xl grid grid-cols-2 gap-10">
                  <div class="temp">
                    <i class="fa-solid fa-temperature-half fa-lg"></i>
                    <p>${t.main.temp} °C</p>
                  </div>
                  <div class="wind">
                    <i class="fa-solid fa-wind fa-lg"></i>
                    <p>${t.wind.speed} m/s</p>
                  </div>
                </div>
          `:n.innerHTML='<h1 class="text-xl">Unknown City :(</h1>'}catch{n.innerHTML='<h1 class="text-xl">Try again later :(</h1>'}s.value=""}l("Biratnagar");
