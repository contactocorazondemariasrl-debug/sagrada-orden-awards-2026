
const SUPABASE_URL = "https://lretzhtutvbcmixuosno.supabase.co";
const SUPABASE_KEY = "sb_publishable_M5KqMSU0qi6W--wIDto3LQ_2IHo32Az";

const MEMBERS = [
  "Juan Diego Morales",
  "Angel Gabriel Peña",
  "Alejandro Navarrete",
  "Helen Pacheco",
  "Ricardo Marenco",
  "Roberth Pastora",
  "Abiel Madrid",
  "Diego Moran",
  "Fredy Molina",
  "Ismael Mendoza",
  "Ivette Muñoz",
  "Jasiel Molina",
  "Jorge Avila",
  "Nelson Garcia",
  "Rómulo Péreira",
  "Deris Ortez"
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

let current = 0;
let voter = null;
let votes = CATEGORIES.map(() => ["","",""]);

const $ = id => document.getElementById(id);

function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    "&":"&amp;",
    "<":"&lt;",
    ">":"&gt;",
    '"':"&quot;",
    "'":"&#039;"
  }[c]));
}

function showToast(msg) {
  const t = $("toast");
  if (!t) return;
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2400);
}

function renderCategoryList() {
  $("categoryList").innerHTML = CATEGORIES.map((c,i) =>
    `<button class="cat-nav ${i===0?"active":""}" data-i="${i}">
      ${String(i+1).padStart(2,"0")}. ${escapeHTML(c[1])}
    </button>`
  ).join("");

  document.querySelectorAll(".cat-nav").forEach(b => {
    b.onclick = () => {
      if (!voter) return;
      current = +b.dataset.i;
      renderVote();
    };
  });
}

function renderAllCategories() {
  $("allCategories").innerHTML = CATEGORIES.map((c,i) =>
    `<div class="category-tile">
      <span class="icon">${c[0]}</span>
      <h3>${i+1}. ${escapeHTML(c[1])}</h3>
      <p>${escapeHTML(c[2])}</p>
    </div>`
  ).join("");
}

function populateVoters() {
  const select = $("voterCode");

  if (!select) return;

  select.innerHTML =
    `<option value="">Selecciona tu nombre</option>` +
    MEMBERS.map(name =>
      `<option value="${escapeHTML(name)}">${escapeHTML(name)}</option>`
    ).join("");
}

function populateSelects() {
  ["rank1","rank2","rank3"].forEach(id => {
    const select = $(id);

    if (!select) return;

    select.innerHTML =
      `<option value="">Selecciona un miembro</option>` +
      MEMBERS.map(m =>
        `<option value="${escapeHTML(m)}">${escapeHTML(m)}</option>`
      ).join("");

    select.onchange = validate;
  });
}

function renderVote() {
  const c = CATEGORIES[current];
  const selected = votes[current] || ["","",""];

  $("categoryNumber").textContent =
    String(current + 1).padStart(2,"0");

  $("categoryEyebrow").textContent =
    `CATEGORÍA ${current + 1} DE ${CATEGORIES.length}`;

  $("categoryTitle").textContent = c[1];
  $("categoryDesc").textContent = c[2];
  $("categoryIcon").textContent = c[0];

  $("rank1").value = selected[0] || "";
  $("rank2").value = selected[1] || "";
  $("rank3").value = selected[2] || "";

  $("progressText").textContent =
    `Categoría ${current + 1} de ${CATEGORIES.length}`;

  const percent =
    Math.round(((current + 1) / CATEGORIES.length) * 100);

  $("progressPercent").textContent = percent + "%";
  $("progressBar").style.width = percent + "%";

  document.querySelectorAll(".cat-nav").forEach((b,i) => {
    b.classList.toggle("active", i === current);
    b.classList.toggle(
      "done",
      !!votes[i] && votes[i].every(Boolean)
    );
  });

  $("prevBtn").disabled = current === 0;
  $("prevBtn").style.opacity = current === 0 ? ".45" : "1";

  $("nextBtn").textContent =
    current === CATEGORIES.length - 1
      ? "Finalizar votación ✓"
      : "Guardar y continuar →";

  $("validation").textContent = "";
}

function validate() {
  const vals = [
    $("rank1").value,
    $("rank2").value,
    $("rank3").value
  ];

  let msg = "";

  if (vals.some(v => !v)) {
    msg = "Debes elegir a tres personas.";
  } else if (new Set(vals).size < 3) {
    msg = "No puedes seleccionar a la misma persona en los tres puestos.";
  }

  $("validation").textContent = msg;
  return !msg;
}

function saveCurrent() {
  if (!validate()) return false;

  votes[current] = [
    $("rank1").value,
    $("rank2").value,
    $("rank3").value
  ];

  return true;
}

async function startVoting() {
  const selected = $("voterCode").value.trim();

  if (!selected) {
    $("gateNote").textContent =
      "Selecciona tu nombre para continuar.";
    return;
  }

  $("gateNote").textContent = "Verificando...";

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/voters?code=eq.${encodeURIComponent(selected)}&select=code,has_voted`,
      {
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`
        }
      }
    );

    if (!response.ok) {
      throw new Error("No se pudo conectar con Supabase.");
    }

    const data = await response.json();

    if (!data.length) {
      $("gateNote").textContent =
        "Ese nombre no está registrado.";
      return;
    }

    if (data[0].has_voted) {
      $("gateNote").textContent =
        "Este miembro ya realizó su votación.";
      return;
    }

    voter = selected;
    current = 0;
    votes = CATEGORIES.map(() => ["","",""]);

    $("voterGate").classList.add("hidden");
    $("votingApp").classList.remove("hidden");

    renderVote();

    document.querySelector("#votacion")
      .scrollIntoView({behavior:"smooth"});

    showToast(`Identificado como ${selected}`);

  } catch (error) {
    console.error(error);

    $("gateNote").textContent =
      "No se pudo conectar con el sistema de votación. Intenta nuevamente.";
  }
}

async function submitVote() {
  if (!saveCurrent()) return;

  const payload = [];

  votes.forEach((vote, categoryIndex) => {
    vote.forEach((member, placeIndex) => {
      payload.push({
        category_id: categoryIndex + 1,
        member_name: member,
        place: placeIndex + 1,
        points: [3,2,1][placeIndex]
      });
    });
  });

  if (payload.length !== 84) {
    showToast("Faltan votos por completar.");
    return;
  }

  const nextButton = $("nextBtn");
  nextButton.disabled = true;
  nextButton.textContent = "Guardando votación...";

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/rpc/submit_sagrada_vote`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`
        },
        body: JSON.stringify({
          p_voter_code: voter,
          p_votes: payload
        })
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message ||
        result.error_description ||
        result.hint ||
        "Error al guardar la votación."
      );
    }

    $("votingApp").classList.add("hidden");

    const resultados = $("resultados");
    if (resultados) {
      resultados.classList.add("hidden");
    }

    const resultsContent = $("resultsContent");
    if (resultsContent) {
      resultsContent.innerHTML = "";
    }

    const gate = $("voterGate");
    if (gate) {
      gate.classList.add("hidden");
    }

    const main = $("votacion");
    if (main) {
      main.innerHTML = `
        <div class="result-card" style="text-align:center;">
          <div style="font-size:4rem;">🪬</div>
          <h2>VOTACIÓN REGISTRADA</h2>
          <p>Tu voto fue guardado correctamente.</p>
          <p><strong>Los resultados permanecen secretos.</strong></p>
        </div>
      `;
    }

  } catch (error) {
    console.error(error);

    showToast(
      "No se pudo guardar la votación: " + error.message
    );

    nextButton.disabled = false;

    nextButton.textContent =
      current === CATEGORIES.length - 1
        ? "Finalizar votación ✓"
        : "Guardar y continuar →";
  }
}

function resetData() {
  alert(
    "Los votos ya no se guardan en este navegador. " +
    "Los datos oficiales están protegidos en Supabase."
  );
}

document.addEventListener("DOMContentLoaded", () => {

  renderCategoryList();
  renderAllCategories();
  populateVoters();
  populateSelects();

  $("startVoting").onclick = startVoting;

  $("nextBtn").onclick = () => {

    if (!saveCurrent()) return;

    if (current < CATEGORIES.length - 1) {

      current++;
      renderVote();

      window.scrollTo({
        top: $("votingApp").offsetTop - 90,
        behavior: "smooth"
      });

    } else {

      submitVote();

    }
  };

  $("prevBtn").onclick = () => {

    if (current > 0) {
      current--;
      renderVote();
    }

  };

  if ($("resetData")) {
    $("resetData").onclick = resetData;
  }

  document.querySelectorAll("[data-scroll]").forEach(b => {
    b.onclick = () => {
      const target = document.querySelector(
        b.dataset.scroll
      );

      if (target) {
        target.scrollIntoView({
          behavior:"smooth"
        });
      }
    };
  });

});
