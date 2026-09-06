const MEMBERS = [
  "Juan Diego Morales","Angel Gabriel Peña","Alejandro Navarrete","Helen Pacheco",
  "Ricardo Marenco","Roberth Pastora","Abiel Madrid","Diego Moran",
  "Fredy Molina","Ismael Mendoza","Ivette Muñoz","Jasiel Molina",
  "Jorge Avila","Nelson Garcia","Rómulo Péreira","Deris Ortez"
];

const CATEGORIES = [
  ["🦁","El más aventado","Siempre se tira de primero aunque no sepa qué está haciendo."],
  ["🧠","El más listo","El que parece tener respuesta para todo."],
  ["💰","El más tacaño","Protege su dinero como si fuera patrimonio nacional."],
  ["🫠","El más irresponsable","Vive al límite de las consecuencias."],
  ["🤥","El más mentiroso","Tiene una versión diferente de la historia para cada persona."],
  ["🎩","El miembro más formal","Siempre correcto, educado y compuesto."],
  ["🕊️","El más palomudo","Inocente, despistado y fácil de convencer."],
  ["💵","El más pistudo","Económicamente bendecido por los dioses."],
  ["⚖️","El más honrado","Ni aunque le paguen se presta para una pendejada."],
  ["😏","El más coqueto","No puede hablar con alguien sin tirar aunque sea una indirecta."],
  ["🪫","El más acabado","Medicina ya hizo lo suyo; parece que lleva 40 años trabajando."],
  ["🗣️","El más chismoso","Sabe cosas que oficialmente nadie le contó."],
  ["🥱","El más dormido","Puede quedarse dormido literalmente en cualquier lugar."],
  ["⏰","El más impuntual","“Ya voy” significa mínimo 40 minutos."],
  ["🤡","El más payaso","Nunca puede comportarse seriamente."],
  ["🧊","El más seco","Responde “jaja” sin haber reído."],
  ["❤️","El más enamoradizo","Conoce a alguien y ya está imaginando la boda."],
  ["🚩","El más red flag","Todos saben que es mala idea, pero igual tiene pegue."],
  ["💀","El más probable de caer preso","No necesita explicación."],
  ["🍺","El más bolo","Aparece una botella y pierde toda responsabilidad."],
  ["🧑‍⚕️","El más médico","Convierte cualquier conversación en una consulta."],
  ["📚","El más aplicado","Mientras los demás descansan, él está estudiando."],
  ["🐀","La rata de hospital","Prácticamente tiene domicilio en el hospital."],
  ["🧨","El más problemático","Donde llega, algo termina pasando."],
  ["🧠💀","El “¿cómo pasaste?”","Inexplicablemente ha llegado hasta sexto año."],
  ["🫡","El más leal","Podrá ser pendejo, pero nunca abandona a la Orden."],
  ["🧻","El código marrón","El que siempre anda llenando papeles."],
  ["👑","El más Sagrada Orden","El que mejor representa la esencia del grupo."]
];

const STORAGE_KEY = "sagradaOrdenAwards2026_v1";
let state = loadState();
let current = 0;
let voter = null;

const $ = id => document.getElementById(id);
function loadState(){ try{return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {voters:{}}}catch{return {voters:{}}} }
function saveState(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
function escapeHTML(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function showToast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2400)}

function renderCategoryList(){
  $("categoryList").innerHTML=CATEGORIES.map((c,i)=>`<button class="cat-nav ${i===0?"active":""}" data-i="${i}">${String(i+1).padStart(2,"0")}. ${escapeHTML(c[1])}</button>`).join("");
  document.querySelectorAll(".cat-nav").forEach(b=>b.onclick=()=>{current=+b.dataset.i;renderVote()});
}
function renderAllCategories(){
  $("allCategories").innerHTML=CATEGORIES.map((c,i)=>`<div class="category-tile"><span class="icon">${c[0]}</span><h3>${i+1}. ${escapeHTML(c[1])}</h3><p>${escapeHTML(c[2])}</p></div>`).join("");
}
function populateSelects(){
  ["rank1","rank2","rank3"].forEach(id=>{
    $(id).innerHTML='<option value="">Selecciona un miembro</option>'+MEMBERS.map(m=>`<option value="${escapeHTML(m)}">${escapeHTML(m)}</option>`).join("");
    $(id).onchange=validate;
  });
}
function getVotes(){return state.voters[voter]?.votes || CATEGORIES.map(()=>["","",""])}
function renderVote(){
  const c=CATEGORIES[current], votes=getVotes()[current] || ["","",""];
  $("categoryNumber").textContent=String(current+1).padStart(2,"0");
  $("categoryEyebrow").textContent=`CATEGORÍA ${current+1} DE ${CATEGORIES.length}`;
  $("categoryTitle").textContent=c[1]; $("categoryDesc").textContent=c[2]; $("categoryIcon").textContent=c[0];
  $("rank1").value=votes[0]||"";$("rank2").value=votes[1]||"";$("rank3").value=votes[2]||"";
  $("progressText").textContent=`Categoría ${current+1} de ${CATEGORIES.length}`;
  $("progressPercent").textContent=Math.round(((current+1)/CATEGORIES.length)*100)+"%";
  $("progressBar").style.width=((current+1)/CATEGORIES.length*100)+"%";
  document.querySelectorAll(".cat-nav").forEach((b,i)=>b.classList.toggle("active",i===current));
  document.querySelectorAll(".cat-nav").forEach((b,i)=>b.classList.toggle("done",!!getVotes()[i]?.every(Boolean)));
  $("prevBtn").disabled=current===0;$("prevBtn").style.opacity=current===0?".45":"1";
  $("nextBtn").textContent=current===CATEGORIES.length-1?"Finalizar votación ✓":"Guardar y continuar →";
  $("validation").textContent="";
}
function validate(){
  const vals=[$("rank1").value,$("rank2").value,$("rank3").value];
  const msg=vals.some(v=>!v)?"Debes elegir a tres personas.":new Set(vals).size<3?"No puedes seleccionar a la misma persona en los tres puestos.":"";
  $("validation").textContent=msg;return !msg;
}
function saveCurrent(){
  if(!validate()) return false;
  const votes=state.voters[voter].votes;
  votes[current]=[$("rank1").value,$("rank2").value,$("rank3").value];
  state.voters[voter].submitted=false;saveState();return true;
}
function startVoting(){
  const code=$("voterCode").value.trim().toUpperCase();
  if(!code){$("gateNote").textContent="Escribe un código para continuar.";return}
  if(!state.voters[code]) state.voters[code]={votes:CATEGORIES.map(()=>["","",""]),submitted:false};
  voter=code;$("voterGate").classList.add("hidden");$("votingApp").classList.remove("hidden");
  current=0;renderVote();document.querySelector("#votacion").scrollIntoView({behavior:"smooth"});showToast(`Identificado como ${code}`);
}
function calculateResults(){
  const totals=Object.fromEntries(MEMBERS.map(m=>[m,0]));
  const categoryResults=CATEGORIES.map(c=>MEMBERS.map(m=>({name:m,points:0})));
  Object.values(state.voters).forEach(v=>{
    (v.votes||[]).forEach((vote,ci)=>{
      [3,2,1].forEach((pts,ri)=>{const name=vote?.[ri];if(name&&totals[name]!==undefined){totals[name]+=pts;categoryResults[ci].find(x=>x.name===name).points+=pts}});
    });
  });
  const overall=MEMBERS.map(name=>({name,points:totals[name]})).sort((a,b)=>b.points-a.points||a.name.localeCompare(b.name));
  return {overall,categoryResults};
}
function renderResults(){
  const {overall,categoryResults}=calculateResults();
  const votesCount=Object.keys(state.voters).length;
  if(!votesCount){$("resultsContent").innerHTML='<div class="no-results">Aún no hay votos guardados en este navegador.<br><br>Completa una votación para ver resultados de prueba.</div>';return}
  let html=`<div class="result-card"><h3>🏆 Tabla general · ${votesCount} voto(s) registrado(s)</h3><div class="podium-results">`;
  [1,0,2].forEach((idx)=>{const p=overall[idx];if(!p)return;html+=`<div class="result-place ${idx===0?"winner":""}"><div class="crown">${idx===0?"👑":idx===1?"🥈":"🥉"}</div><strong>${escapeHTML(p.name)}</strong><span>${p.points} puntos</span></div>`});
  html+=`</div></div>`;
  categoryResults.forEach((arr,i)=>{
    const top=arr.filter(x=>x.points>0).sort((a,b)=>b.points-a.points||a.name.localeCompare(b.name)).slice(0,3);
    html+=`<div class="result-card"><h3>${CATEGORIES[i][0]} ${i+1}. ${escapeHTML(CATEGORIES[i][1])}</h3>`;
    if(!top.length){html+=`<p class="no-results">Sin votos todavía.</p>`}
    else {html+=`<div class="podium-results">${[1,0,2].map(idx=>top[idx]?`<div class="result-place ${idx===0?"winner":""}"><div class="crown">${idx===0?"👑":idx===1?"🥈":"🥉"}</div><strong>${escapeHTML(top[idx].name)}</strong><span>${top[idx].points} puntos</span></div>`:"").join("")}</div>`}
    html+=`</div>`;
  });
  $("resultsContent").innerHTML=html;
}
function resetData(){
  if(confirm("¿Borrar TODOS los votos guardados en este navegador?")){localStorage.removeItem(STORAGE_KEY);state={voters:{}};voter=null;location.reload()}
}

document.addEventListener("DOMContentLoaded",()=>{
  renderCategoryList();renderAllCategories();populateSelects();renderResults();
  $("startVoting").onclick=startVoting;$("voterCode").addEventListener("keydown",e=>{if(e.key==="Enter")startVoting()});
  $("nextBtn").onclick=()=>{
    if(!saveCurrent())return;
    if(current<CATEGORIES.length-1){current++;renderVote();window.scrollTo({top:$("votingApp").offsetTop-90,behavior:"smooth"})}
    else{state.voters[voter].submitted=true;saveState();renderResults();showToast("¡Votación completada!");$("resultados").scrollIntoView({behavior:"smooth"})}
  };
  $("prevBtn").onclick=()=>{if(current>0){current--;renderVote()}};
  $("refreshResults").onclick=renderResults;$("resetData").onclick=resetData;
  document.querySelectorAll("[data-scroll]").forEach(b=>b.onclick=()=>document.querySelector(b.dataset.scroll).scrollIntoView({behavior:"smooth"}));
});
