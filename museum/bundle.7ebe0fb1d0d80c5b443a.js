(()=>{var e={785:(e,t,n)=>{"use strict";n.r(t)},453:()=>{!function(){let e=!1;const t=document.querySelector(".explore-img-overlay"),n=t.offsetWidth,c=(t.offsetHeight,document.createElement("div"));function l(t){t.preventDefault(),e=!0}function i(l){var i;e&&(i=function(e=window.event){let c=t.getBoundingClientRect(),l=0;return l=e.pageX-c.left,l<0&&(l=0),l>n&&(l=n),l}(l),t.style.width=i+"px",c.style.left=t.offsetWidth-c.offsetWidth/2+"px")}t.parentElement.insertBefore(c,t),c.classList.add("explore-img-slider"),c.style.top="0px",c.style.left=n/1.6-c.offsetWidth/1.6+"px",t.style.width="63%",c.addEventListener("mousedown",l),c.addEventListener("touchstart",l),window.addEventListener("mouseup",(()=>e=!1)),window.addEventListener("touchstop",(()=>e=!1)),window.addEventListener("mousemove",i),window.addEventListener("touchmove",i)}()},240:()=>{const e=document.querySelector(".gallery-container"),t=["./img/gallery/galery1.jpg","./img/gallery/galery2.jpg","./img/gallery/galery3.jpg","./img/gallery/galery4.jpg","./img/gallery/galery5.jpg","./img/gallery/galery6.jpg","./img/gallery/galery7.jpg","./img/gallery/galery8.jpg","./img/gallery/galery9.jpg","./img/gallery/galery10.jpg","./img/gallery/galery11.jpg","./img/gallery/galery12.jpg","./img/gallery/galery13.jpg","./img/gallery/galery14.jpg","./img/gallery/galery15.jpg"];!function(e){for(let t=e.length-1;t>0;t--){const n=Math.floor(Math.random()*(t+1));[e[t],e[n]]=[e[n],e[t]]}}(t),t.map((t=>{const n=document.createElement("div");n.classList.add("gallery-wrapper");const c=document.createElement("img");c.classList.add("gallery-picture"),c.src=t,c.alt="Gallery Picture",e.append(n),n.append(c),c.onload=function(){const e=this.height;e>=570?n.classList.add("long"):e>=456&&e<570?n.classList.add("medium"):e<456&&n.classList.add("short")}}));const n=document.querySelectorAll(".gallery-wrapper");let c=!1;function l(){n.forEach((e=>{!function(e){const t=e.getBoundingClientRect(),n=t.top,c=t.bottom,l=t.height;return n+l>=0&&l+window.innerHeight>=c}(e)?e.classList.remove("active"):e.classList.add("active")}))}document.addEventListener("DOMContentLoaded",l),window.addEventListener("scroll",(function(e){0==c&&window.requestAnimationFrame((function(){l(),c=!1})),c=!0}),!1)},207:()=>{const e=document.querySelector("#date"),t=document.querySelector("#time"),n=document.getElementsByClassName("tickets-select"),c=n.length,l=document.querySelector("#incrExpDay"),s=document.querySelector("#decrExpDay"),o=document.querySelector("#expDay"),r=document.querySelector("#expYear"),d=document.querySelector("#incrExpYear"),a=document.querySelector("#decrExpYear"),u=document.querySelector("#openPopup"),m=document.querySelector("#popup"),g=document.querySelector("#closePopup"),p=document.querySelector("#popupOverlay");function y(){this.classList.add("has-value")}for(e.addEventListener("change",y),t.addEventListener("change",y),document.addEventListener("click",v),u.addEventListener("click",f),g.addEventListener("click",f),p.addEventListener("click",f),l.addEventListener("click",(function(){let e=Number(o.value),t=e+1;t=t.toString().padStart(2,"0"),31!==e&&(o.value=t)})),s.addEventListener("click",(function(){let e=Number(o.value),t=e-1;t=t.toString().padStart(2,"0"),1!==e&&(o.value=t)})),d.addEventListener("click",(function(){let e=Number(r.value),t=e+1;2050!==e&&(r.value=t)})),a.addEventListener("click",(function(){let e=Number(r.value),t=e-1;2020!==e&&(r.value=t)})),i=0;i<c;i++){const e=n[i].getElementsByTagName("select")[0],t=e.length,c=document.createElement("div");c.setAttribute("class","select-selected"),c.innerHTML=e.options[e.selectedIndex].innerHTML,n[i].appendChild(c);const l=document.createElement("div");for(l.setAttribute("class","select-items select-hide"),j=1;j<t;j++){const t=document.createElement("div");t.innerHTML=e.options[j].innerHTML,t.addEventListener("click",(function(e){const t=this.parentNode.parentNode.getElementsByTagName("select")[0],n=t.length,c=this.parentNode.previousSibling;for(i=0;i<n;i++)if(t.options[i].innerHTML==this.innerHTML){t.selectedIndex=i,c.innerHTML=this.innerHTML;const e=this.parentNode.getElementsByClassName("same-as-selected"),n=e.length;for(k=0;k<n;k++)e[k].removeAttribute("class");this.setAttribute("class","same-as-selected");break}c.click()})),l.appendChild(t)}n[i].appendChild(l),c.addEventListener("click",(function(e){e.stopPropagation(),v(this),this.nextSibling.classList.toggle("select-hide"),this.classList.toggle("select-arrow-active")}))}function v(e){const t=[],c=document.getElementsByClassName("select-items"),l=document.getElementsByClassName("select-selected"),s=c.length,o=l.length;for(i=0;i<o;i++)e==l[i]?t.push(i):l[i].classList.remove("select-arrow-active");for(i=0;i<s;i++)t.indexOf(i)&&n[i].classList.add("select-hide")}function f(){m.classList.toggle("opened"),p.classList.toggle("opened")}},858:()=>{document.querySelectorAll(".ripple").forEach((e=>{e.addEventListener("click",(function(e){const t=e.target.getBoundingClientRect(),n=e.clientX-t.left,c=e.clientY-t.top,l=document.createElement("span");l.classList.add("circle"),l.style.top=c+"px",l.style.left=n+"px",this.appendChild(l),setTimeout((()=>l.remove()),500)}))}))},594:()=>{const e=document.querySelector("#currentVideo"),t=document.querySelector("#currentSource"),n=document.querySelector("#currentVideoBigPlay"),c=document.querySelector("#currentVideoSmallPlay"),l=document.querySelector("#currentVideoProgress"),i=document.querySelector("#currentVideoVolumeRange"),s=document.querySelector("#currentVideoVolumeBtn"),o=document.querySelector("#currentVideoFullscreenBtn"),r=document.querySelector("#fullscreenWrapper");t.setAttribute("src","./video/video0.mp4"),e.load(),e.volume=.5;let d=!1;function a(){e.paused?(e.play(),n.classList.add("hidden"),c.classList.add("paused")):(e.pause(),n.classList.remove("hidden"),c.classList.remove("paused"))}e.addEventListener("click",a),n.addEventListener("click",a),c.addEventListener("click",a),s.addEventListener("click",(function(){e.muted?(e.muted=!1,e.volume=.5,s.classList.remove("muted"),i.value=e.volume,i.style.background="linear-gradient(to right, #710707 0%, #710707 50%, #c4c4c4 50%, #c4c4c4 100%)"):(e.muted=!0,s.classList.add("muted"),i.value=0,i.style.background="linear-gradient(to right, #710707 0%, #710707 0%, #c4c4c4 0%, #c4c4c4 100%)")})),i.addEventListener("input",(function(){const t=this.value;e.volume=t,this.style.background=`linear-gradient(to right, #710707 0%, #710707 ${100*t}%, #c4c4c4 ${100*t}%, #c4c4c4 100%)`,0===e.volume&&(e.muted=!0,s.classList.add("muted")),1===e.volume&&(e.muted=!1,s.classList.remove("muted"))})),l.addEventListener("input",(function(){const t=this.value/100*e.duration;e.currentTime=t,l.style.background=`linear-gradient(to right, #710707 0%, #710707 ${this.value}%, #c4c4c4 ${this.value}%, #c4c4c4 100%)`})),o.addEventListener("click",(function(){d?document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.msExitFullscreen&&document.msExitFullscreen():r.requestFullscreen?r.requestFullscreen():r.mozRequestFullScreen?r.mozRequestFullScreen():r.webkitRequestFullscreen?r.webkitRequestFullscreen():r.msRequestFullscreen&&r.msRequestFullscreen()})),e.addEventListener("timeupdate",(function(){if(!e.paused){const e=Math.round(100/this.duration*this.currentTime);l.value=e,l.style.background=`linear-gradient(to right, #710707 0%, #710707 ${e}%, #c4c4c4 ${e}%, #c4c4c4 100%)`}this.currentTime===this.duration&&(n.classList.remove("hidden"),c.classList.remove("paused"))})),document.addEventListener("fullscreenchange",(function(){document.fullscreenElement?(r.classList.add("expanded"),d=!0,o.classList.add("exit")):(d=!1,r.classList.remove("expanded"),o.classList.remove("exit"))}))},30:()=>{document.querySelector("#welcomeSlider");const e=document.querySelector("#welcomeSlides"),t=document.querySelector("#welcomePrev"),n=document.querySelector("#welcomeNext"),c=document.querySelectorAll(".welcome-slider-pagination-item"),l=document.querySelector(".welcome-slider-counter-first");!function(e,t,n,c){let i,s,o=0,r=0,d=e.querySelectorAll(".slide"),a=d.length,u=e.querySelector(".slide").offsetWidth,m=d[0],g=d[a-1],p=m.cloneNode(!0),y=g.cloneNode(!0),v=0,f=!0,h=1;function L(){const t=+this.dataset.slide;e.classList.add("shifting"),v=5===t?4:t,e.style.left=-1e3*t+"px",f=!1,h=t,w(),k()}function E(t){(t=t||window.event).preventDefault(),i=e.offsetLeft,"touchstart"==t.type?o=t.touches[0].clientX:(o=t.clientX,document.onmouseup=q,document.onmousemove=S)}function S(t){"touchmove"==(t=t||window.event).type?(r=o-t.touches[0].clientX,o=t.touches[0].clientX):(r=o-t.clientX,o=t.clientX),e.style.left=e.offsetLeft-r+"px"}function q(t){s=e.offsetLeft,s-i<-100?x(1,"drag"):s-i>100?x(-1,"drag"):e.style.left=i+"px",document.onmouseup=null,document.onmousemove=null}function x(t,n){e.classList.add("shifting"),f&&(n||(i=e.offsetLeft),1==t?(e.style.left=i-u+"px",v++,5!==h?h++:h=1):-1==t&&(e.style.left=i+u+"px",v--,1!==h?h--:h=5)),f=!1,w(),k()}function w(){c.forEach((e=>{e.classList.contains("active")&&e.classList.remove("active")})),document.querySelector(`.welcome-slider-pagination-item[data-slide="${h}"]`).classList.add("active")}function k(){l.textContent=`0${h}`}e.appendChild(p),e.insertBefore(y,m),e.onmousedown=E,e.addEventListener("touchstart",E),e.addEventListener("touchend",q),e.addEventListener("touchmove",S),t.addEventListener("click",(()=>x(-1))),n.addEventListener("click",(()=>x(1))),e.addEventListener("transitionend",(function(){e.classList.remove("shifting"),-1==v&&(e.style.left=-a*u+"px",v=a-1),v==a&&(e.style.left=-1*u+"px",v=0),f=!0})),c.forEach((e=>{e.addEventListener("click",L)}))}(e,t,n,c)}},t={};function n(c){var l=t[c];if(void 0!==l)return l.exports;var i=t[c]={exports:{}};return e[c](i,i.exports,n),i.exports}n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{"use strict";n(785),n(594),n(30),n(453),n(240),n(207),n(858),console.log("\nScore: 160\n\n\n✅ Вёрстка валидная +10\n\n✅ Вёрстка семантическая +24\n\n✅ Вёрстка соответствует макету +45\n\n✅ Форма покупки билетов +22\n\n✅ Требования к css +18\n\n✅ Интерактивность, реализуемая через css +25\n\n✅ Интерактивность, реализуемая через js +16\n")})()})();