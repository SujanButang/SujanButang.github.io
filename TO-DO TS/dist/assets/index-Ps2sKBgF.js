var k=Object.defineProperty;var E=(t,e,s)=>e in t?k(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var d=(t,e,s)=>(E(t,typeof e!="symbol"?e+"":e,s),s);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function s(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=s(i);fetch(i.href,o)}})();const L=["Sunday 🖖","Monday 💪😀","Tuesday 😜","Wednesday 😌☕️","Thursday 🤗","Friday 🍻","Saturday 😴"],m=["Oh my, it's ","Whoop, it's ","Happy ","Seems it's ","Awesome, it's ","Have a nice ","Happy fabulous ","Enjoy your "],w="0123456789",v="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",S=8;function A(t,e){return Math.floor(Math.random()*(e-t+1))+t}function _(t){const e=v+w;let s="";for(let n=0;n<t;n++)s+=e.charAt(Math.floor(Math.random()*e.length));return s}function f(t,e={}){console.log(t),Object.keys(e).forEach(s=>{const n=e[s];t.style.setProperty(s,n)})}function N(t,e={}){Object.keys(e).forEach(s=>{const n=e[s];t.setAttribute(s,n)})}class h{constructor(e="",s=!1,n=!0){d(this,"id");d(this,"title");d(this,"completed");d(this,"isNewlyAdded");this.id=_(S),this.title=e,this.completed=s,this.isNewlyAdded=n}toggleCompleted(){this.completed=!this.completed}}class y{constructor(e){d(this,"list");this.list=e||[]}addTask(e){this.list.push(e),this.saveTask()}getTaskById(e){return this.list.find(s=>s.id===e)||null}getTaskByIndex(e){return this.list[e]}deleteTask(e){this.list=this.list.filter(s=>s.id!==e),this.saveTask()}saveTask(){localStorage.setItem("tasks",JSON.stringify(this.list))}}const O=document.querySelector(".today"),g=document.createElement("h1"),b=new Date().getDay();g.innerText=m[A(0,m.length-1)]+" "+L[b];O.appendChild(g);const a=document.querySelector("input#new-task");a.onkeydown=function(t){t.code=="Enter"&&a.value!==""&&(T(a.value),a.value="")};const C=document.querySelector('img[alt="add"]');C.addEventListener("click",()=>{a.value!==""&&(T(a.value),a.value="")});const u=document.querySelector("input#search-input");u==null||u.addEventListener("input",t=>{var s;const e=(s=t.target)==null?void 0:s.value;l(e)});const c=new y,I=JSON.parse(localStorage.getItem("tasks"));I.forEach(t=>{c.addTask(new h(t.title,t.completed,t.isNewlyAdded))});function T(t){const e=new h(t);e.isNewlyAdded=!0,c.addTask(e),l()}function M(t,e=""){const s=t.list.filter(n=>n.title.toLowerCase().includes(e.toLowerCase()));return new y(s)}function l(t=""){const e=M(c,t);P(e)}const p=document.querySelector(".task-lists");function P(t){p.innerHTML="",t.list.forEach(e=>{const s=document.createElement("div");s.classList.add("task"),e.completed&&s.classList.add("completed"),e.isNewlyAdded&&(s.classList.add("animate__animated","animate__flipInX"),e.isNewlyAdded=!1);const n=document.createElement("input");n.setAttribute("type","checkbox"),f(n,{cursor:"pointer"}),n.checked=e.completed,n.addEventListener("change",()=>{q(e.id),l()}),s.appendChild(n);const i=document.createElement("span");i.innerText=e.title,s.appendChild(i);const o=document.createElement("figure");f(o,{position:"absolute",right:"5px",top:"0",bottom:"0",cursor:"pointer"});const r=document.createElement("img");N(r,{src:"delete.png",height:"15",width:"15"}),o.addEventListener("click",()=>{s.classList.remove("animate__animated","animate__flipInX"),s.classList.add("animate__animated","animate__slideOutLeft","animate__faster"),x(e.id)}),o.appendChild(r),s.appendChild(o),p.appendChild(s)})}function q(t){const e=c.getTaskById(t);if(!e)throw new Error(`Task with id ${t} not found`);e&&(e.isNewlyAdded=!0,e.toggleCompleted(),c.saveTask())}function x(t){c.deleteTask(t),setTimeout(()=>l(),700)}l();