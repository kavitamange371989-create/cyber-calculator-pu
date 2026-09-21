
const display=document.getElementById("display");
const history=document.getElementById("history");

function beep(){

const ctx=new(window.AudioContext||window.webkitAudioContext)();

const osc=ctx.createOscillator();

const gain=ctx.createGain();

osc.connect(gain);

gain.connect(ctx.destination);

osc.frequency.value=500;

gain.gain.value=0.05;

osc.start();

osc.stop(ctx.currentTime+0.05);

}

function append(v){

display.value+=v;

beep();

}

function clearDisplay(){

display.value="";

beep();

}

function deleteOne(){

display.value=display.value.slice(0,-1);

beep();

}

function calculate(){

try{

const exp=display.value;

const ans=eval(exp);

display.value=ans;

history.innerHTML=`<div>${exp} = ${ans}</div>`+history.innerHTML;

}catch{

display.value="ERROR";

}

beep();

}

document.addEventListener("keydown",e=>{

if(/[0-9+\-*/.%]/.test(e.key)) append(e.key);

else if(e.key==="Enter") calculate();

else if(e.key==="Backspace") deleteOne();

else if(e.key==="Escape") clearDisplay();

});

const canvas=document.getElementById("matrix");

const ctx=canvas.getContext("2d");

canvas.width=innerWidth;

canvas.height=innerHeight;

const chars="01ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const size=18;

const columns=Math.floor(canvas.width/size);

const drops=Array(columns).fill(1);

function draw(){

ctx.fillStyle="rgba(0,0,0,.08)";

ctx.fillRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="#00ff88";

ctx.font=size+"px monospace";

for(let i=0;i<drops.length;i++){

const text=chars[Math.floor(Math.random()*chars.length)];

ctx.fillText(text,i*size,drops[i]*size);

if(drops[i]*size>canvas.height&&Math.random()>0.975)drops[i]=0;

drops[i]++;

}

}

setInterval(draw,35);

window.addEventListener("resize",()=>{

canvas.width=innerWidth;

canvas.height=innerHeight;

});
const calc=document.querySelector(".calculator");

calc.addEventListener("mousemove",(e)=>{
const rect=calc.getBoundingClientRect();

calc.style.setProperty("--x",(e.clientX-rect.left)+"px");
calc.style.setProperty("--y",(e.clientY-rect.top)+"px");
});
setTimeout(()=>{
const boot=document.getElementById("bootScreen");
boot.style.opacity="0";

setTimeout(()=>{
boot.style.display="none";
},1000);

},3000);
// ===== SECRET HACKER MODE =====

let secret = "";

document.addEventListener("keydown", (e) => {

    secret += e.key.toUpperCase();

    if(secret.length > 10){
        secret = secret.slice(-10);
    }

    const calc = document.querySelector(".calculator");

    if(secret.includes("CYBER")){
        calc.classList.add("alert-mode");
        display.value = "⚠ ACCESS BREACH ⚠";
    }

    if(secret.includes("SAFE")){
        calc.classList.remove("alert-mode");
        display.value = "";
    }

});
/* ===========================
   BOOT + FINGERPRINT UNLOCK
=========================== */

const boot=document.getElementById("bootScreen");
const finger=document.getElementById("fingerScreen");
const fingerPrint=document.querySelector(".fingerprint");
const scan=document.querySelector(".scanLine");
const status=document.getElementById("status");
const calculator=document.querySelector(".calculator");

calculator.style.display="none";

// Boot screen
setTimeout(()=>{
boot.style.opacity="0";

setTimeout(()=>{
boot.style.display="none";
finger.style.display="flex";
},1000);

},3000);

// Fingerprint hold

let timer;

let timer;

function startScan() {

    status.textContent = "SCANNING...";
    scan.style.display = "block";

    scan.animate(
        [
            { transform: "translate(-50%,0px)" },
            { transform: "translate(-50%,150px)" }
        ],
        {
            duration: 2000,
            fill: "forwards"
        }
    );

    timer = setTimeout(() => {
        status.textContent = "ACCESS GRANTED";

        setTimeout(() => {
            finger.style.opacity = "0";

            setTimeout(() => {
                finger.style.display = "none";
                calculator.style.display = "block";
            }, 500);

        }, 700);

    }, 2000);
}

function cancelScan() {
    clearTimeout(timer);
    status.textContent = "WAITING...";
    scan.style.display = "none";
    scan.getAnimations().forEach(a => a.cancel());
}

// Desktop
fingerPrint.addEventListener("mousedown", startScan);


// Mobile
fingerPrint.addEventListener("touchstart", (e) => {
    e.preventDefault();
    startScan();
});

fingerPrint.addEventListener("touchend", cancelScan)

status.textContent="SCANNING...";
scan.style.display="block";

scan.animate(
[
{transform:"translate(-50%,0px)"},
{transform:"translate(-50%,150px)"}
],
{
duration:2000,
fill:"forwards"
}
);

timer=setTimeout(()=>{

status.textContent="ACCESS GRANTED";

setTimeout(()=>{

finger.style.opacity="0";

setTimeout(()=>{
finger.style.display="none";
calculator.style.display="block";
},500);

},700);

},2000);

});

function cancelScan(){

clearTimeout(timer);

status.textContent="WAITING...";

scan.style.display="none";

scan.getAnimations().forEach(a=>a.cancel());

}

fingerPrint.addEventListener("mouseup",cancelScan);
fingerPrint.addEventListener("mouseleave",cancelScan);