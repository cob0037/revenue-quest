let score=0, lives=3, rep=0, current=0;

const roles = ["Intern","Staff","Senior","Manager","CFO"];

const cases = [
  {
    npc:"Manager:",
    q:"We sold a product in-store. When do we recognize revenue?",
    choices:["Immediately","Over time","Later"],
    correct:0,
    explain:"Control transfers immediately."
  },
  {
    npc:"Senior Accountant:",
    q:"Customer pays for 1-year subscription upfront.",
    choices:["Immediate","Over time","End"],
    correct:1,
    explain:"Recognize over time."
  },
  {
    npc:"CFO:",
    q:"Financials show high deferred revenue. Why?",
    choices:[
      "Cash received before service",
      "Error",
      "Expense increase"
    ],
    correct:0,
    explain:"Deferred revenue = obligation."
  }
];

// Duplicate pattern to reach 50
while(cases.length < 50){
  cases.push({...cases[cases.length % 3]});
}

function startGame(){
  show("game");
  loadCase();
}

function show(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function loadCase(){
  if(current>=cases.length) return endGame();

  let c = cases[current];

  document.getElementById("npc").innerText = c.npc;
  document.getElementById("scenario").innerText = c.q;

  let div = document.getElementById("choices");
  div.innerHTML="";

  c.choices.forEach((ch,i)=>{
    let btn=document.createElement("button");
    btn.innerText=ch;
    btn.onclick=()=>answer(i);
    div.appendChild(btn);
  });

  updateHUD();
}

function answer(i){
  let c = cases[current];

  if(i===c.correct){
    score+=100;
    rep+=10;
    document.getElementById("feedback").innerText="✅ "+c.explain;
  } else {
    lives--;
    document.getElementById("feedback").innerText="❌ "+c.explain;
  }

  current++;

  if(rep>=50) promote();

  if(lives<=0) endGame();
  else setTimeout(loadCase,1200);
}

function promote(){
  let idx = Math.min(Math.floor(rep/50), roles.length-1);
  document.getElementById("role").innerText = roles[idx];
}

function updateHUD(){
  document.getElementById("score").innerText=score;
  document.getElementById("lives").innerText=lives;
  document.getElementById("rep").innerText=rep;
}

function endGame(){
  show("end");
  document.getElementById("ending").innerText =
    score>4000 ? "🏆 You became CFO!" : "📘 Keep practicing!";
}
