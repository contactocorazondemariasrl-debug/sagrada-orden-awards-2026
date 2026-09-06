// ==========================================
// SAGRADA ORDEN AWARDS 2026
// SISTEMA NUEVO
// ==========================================

const SUPABASE_URL = "https://lretzhtutvbcmixuosno.supabase.co";

const SUPABASE_KEY =
  "sb_publishable_M5KqMSU0qi6W--wIDto3LQ_2IHo32Az";

const supabaseClient =
  window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );


// ==========================================
// MIEMBROS / VOTANTES
// ==========================================

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
  "Deris Ortez",
  "Jorge Avila",
  "Nelson Garcia",
  "Rómulo Péreira"
];


// ==========================================
// CATEGORÍAS
// ==========================================

const CATEGORIES = [

  {
    icon: "🦁",
    name: "El más aventado",
    description:
      "Siempre se tira de primero aunque no sepa qué está haciendo."
  },

  {
    icon: "🧠",
    name: "El más listo",
    description:
      "El que parece tener respuesta para todo."
  },

  {
    icon: "💰",
    name: "El más tacaño",
    description:
      "Protege su dinero como si fuera patrimonio nacional."
  },

  {
    icon: "🫠",
    name: "El más irresponsable",
    description:
      "Vive al límite de las consecuencias."
  },

  {
    icon: "🤥",
    name: "El más mentiroso",
    description:
      "Tiene una versión diferente de la historia para cada persona."
  },

  {
    icon: "🎩",
    name: "El miembro más formal",
    description:
      "Siempre correcto, educado y compuesto."
  },

  {
    icon: "🕊️",
    name: "El más palomudo",
    description:
      "Inocente, despistado y fácil de convencer."
  },

  {
    icon: "💵",
    name: "El más pistudo",
    description:
      "Económicamente bendecido por los dioses."
  },

  {
    icon: "⚖️",
    name: "El más honrado",
    description:
      "Ni aunque le paguen se presta para una pendejada."
  },

  {
    icon: "😏",
    name: "El más coqueto",
    description:
      "No puede hablar con alguien sin tirar aunque sea una indirecta."
  },

  {
    icon: "🪫",
    name: "El más acabado",
    description:
      "Medicina ya hizo lo suyo; parece que lleva 40 años trabajando."
  },

  {
    icon: "🗣️",
    name: "El más chismoso",
    description:
      "Sabe cosas que oficialmente nadie le contó."
  },

  {
    icon: "🥱",
    name: "El más dormido",
    description:
      "Puede quedarse dormido literalmente en cualquier lugar."
  },

  {
    icon: "⏰",
    name: "El más impuntual",
    description:
      "“Ya voy” significa mínimo 40 minutos."
  },

  {
    icon: "🤡",
    name: "El más payaso",
    description:
      "Nunca puede comportarse seriamente."
  },

  {
    icon: "🧊",
    name: "El más seco",
    description:
      "Responde “jaja” sin haber reído."
  },

  {
    icon: "❤️",
    name: "El más enamoradizo",
    description:
      "Conoce a alguien y ya está imaginando la boda."
  },

  {
    icon: "🚩",
    name: "El más red flag",
    description:
      "Todos saben que es mala idea, pero igual tiene pegue."
  },

  {
    icon: "💀",
    name: "El más probable de caer preso",
    description:
      "No necesita explicación."
  },

  {
    icon: "🍺",
    name: "El más bolo",
    description:
      "Aparece una botella y pierde toda responsabilidad."
  },

  {
    icon: "🧑‍⚕️",
    name: "El más médico",
    description:
      "Convierte cualquier conversación en una consulta."
  },

  {
    icon: "📚",
    name: "El más aplicado",
    description:
      "Mientras los demás descansan, él está estudiando."
  },

  {
    icon: "🐀",
    name: "La rata de hospital",
    description:
      "Prácticamente tiene domicilio en el hospital."
  },

  {
    icon: "🧨",
    name: "El más problemático",
    description:
      "Donde llega, algo termina pasando."
  },

  {
    icon: "🧠💀",
    name: "El “¿cómo pasaste?”",
    description:
      "Inexplicablemente ha llegado hasta sexto año."
  },

  {
    icon: "🫡",
    name: "El más leal",
    description:
      "Podrá ser pendejo, pero nunca abandona a la Orden."
  },

  {
    icon: "🧻",
    name: "El código marrón",
    description:
      "El que siempre anda llenando papeles."
  },

  {
    icon: "👑",
    name: "El más Sagrada Orden",
    description:
      "El que mejor representa la esencia del grupo."
  }

];


// ==========================================
// ESTADO
// ==========================================

let currentCategory = 0;

let currentVoter = null;

let selections = [];


// Crear espacio para las 28 categorías
function createEmptySelections() {

  return CATEGORIES.map(() => ({
    first: "",
    second: "",
    third: ""
  }));

}


// ==========================================
// ELEMENTOS
// ==========================================

const $ = id => document.getElementById(id);


// ==========================================
// CARGAR VOTANTES
// ==========================================

async function loadVoters() {

  const voterSelect = $("voter");

  if (!voterSelect) {
    console.error("No existe el elemento #voter");
    return;
  }

  voterSelect.innerHTML =
    `<option value="">Selecciona tu nombre</option>`;

  MEMBERS.forEach(name => {

    const option =
      document.createElement("option");

    option.value = name;

    option.textContent = name;

    voterSelect.appendChild(option);

  });

}


// ==========================================
// CARGAR OPCIONES DE CADA CATEGORÍA
// ==========================================

function loadRankingOptions() {

  const selects = [
    $("rank1"),
    $("rank2"),
    $("rank3")
  ];

  selects.forEach(select => {

    if (!select) return;

    select.innerHTML =
      `<option value="">Selecciona un miembro</option>`;

    MEMBERS.forEach(name => {

      const option =
        document.createElement("option");

      option.value = name;

      option.textContent = name;

      select.appendChild(option);

    });

  });

}


// ==========================================
// MOSTRAR CATEGORÍA
// ==========================================

function renderCategory() {

  const category =
    CATEGORIES[currentCategory];

  const saved =
    selections[currentCategory];


  $("categoryNumber").textContent =
    `CATEGORÍA ${currentCategory + 1} DE ${CATEGORIES.length}`;

  $("categoryIcon").textContent =
    category.icon;

  $("categoryTitle").textContent =
    category.name;

  $("categoryDescription").textContent =
    category.description;


  $("rank1").value =
    saved.first || "";

  $("rank2").value =
    saved.second || "";

  $("rank3").value =
    saved.third || "";


  const percent =
    Math.round(
      ((currentCategory + 1) /
      CATEGORIES.length) * 100
    );


  $("progressText").textContent =
    `Categoría ${currentCategory + 1} de ${CATEGORIES.length}`;

  $("progressPercent").textContent =
    `${percent}%`;

  $("progressBar").style.width =
    `${percent}%`;


  $("previousButton").disabled =
    currentCategory === 0;

}


// ==========================================
// VALIDAR CATEGORÍA
// ==========================================

function validateCategory() {

  const first =
    $("rank1").value;

  const second =
    $("rank2").value;

  const third =
    $("rank3").value;


  const validation =
    $("validation");


  if (!first || !second || !third) {

    validation.textContent =
      "Debes elegir a tres personas.";

    return false;

  }


  if (
    first === second ||
    first === third ||
    second === third
  ) {

    validation.textContent =
      "No puedes repetir a la misma persona.";

    return false;

  }


  validation.textContent = "";

  return true;

}


// ==========================================
// GUARDAR CATEGORÍA ACTUAL
// ==========================================

function saveCurrentCategory() {

  if (!validateCategory()) {
    return false;
  }


  selections[currentCategory] = {

    first: $("rank1").value,

    second: $("rank2").value,

    third: $("rank3").value

  };


  return true;

}


// ==========================================
// INICIAR VOTACIÓN
// ==========================================

async function startVoting() {

  const voter =
    $("voter").value;


  if (!voter) {

    $("loginStatus").textContent =
      "Selecciona tu nombre para continuar.";

    return;

  }


  $("loginStatus").textContent =
    "Verificando votante...";


  try {

    const { data, error } =
      await supabaseClient
        .from("voters")
        .select("code, has_voted")
        .eq("code", voter)
        .maybeSingle();


    if (error) {
  console.error("ERROR SUPABASE COMPLETO:", error);

  alert(
    "ERROR SUPABASE\n\n" +
    "Código: " + (error.code || "sin código") + "\n\n" +
    "Mensaje: " + (error.message || "sin mensaje") + "\n\n" +
    "Detalles: " + (error.details || "sin detalles") + "\n\n" +
    "Pista: " + (error.hint || "sin pista")
  );

  throw error;
    }


    if (!data) {

      $("loginStatus").textContent =
        "Este miembro no está registrado.";

      return;

    }


    if (data.has_voted) {

      $("loginStatus").textContent =
        "Este miembro ya realizó su votación.";

      return;

    }


    currentVoter = voter;

    currentCategory = 0;

    selections =
      createEmptySelections();


    $("loginCard")
      .classList.add("hidden");

    $("votingCard")
      .classList.remove("hidden");


    renderCategory();


    window.scrollTo({
      top: $("votingCard").offsetTop - 20,
      behavior: "smooth"
    });


  } catch (error) {

    console.error(error);

    $("loginStatus").textContent =
      "No se pudo conectar con Supabase.";

  }

}


// ==========================================
// FINALIZAR VOTACIÓN
// ==========================================

async function submitVoting() {

  const button =
    $("nextButton");


  button.disabled = true;

  button.textContent =
    "GUARDANDO...";


  const payload = [];


  selections.forEach(
    (selection, categoryIndex) => {

      payload.push({

        category_id:
          categoryIndex + 1,

        member_name:
          selection.first,

        place: 1,

        points: 3

      });


      payload.push({

        category_id:
          categoryIndex + 1,

        member_name:
          selection.second,

        place: 2,

        points: 2

      });


      payload.push({

        category_id:
          categoryIndex + 1,

        member_name:
          selection.third,

        place: 3,

        points: 1

      });

    }
  );


  if (payload.length !== 84) {

    button.disabled = false;

    button.textContent =
      "SIGUIENTE →";

    alert(
      "La votación no está completa."
    );

    return;

  }


  try {

    const { data, error } =
      await supabaseClient
        .rpc(
          "submit_sagrada_vote",
          {
            p_voter_code:
              currentVoter,

            p_votes:
              payload
          }
        );


    if (error) {
      throw error;
    }


    console.log(
      "Votación registrada:",
      data
    );


    $("votingCard")
      .classList.add("hidden");

    $("successCard")
      .classList.remove("hidden");


    window.scrollTo({
      top: $("successCard").offsetTop - 20,
      behavior: "smooth"
    });


  } catch (error) {

    console.error(error);

    button.disabled = false;

    button.textContent =
      "FINALIZAR VOTACIÓN ✓";


    alert(
      "No se pudo guardar la votación.\n\n" +
      error.message
    );

  }

}


// ==========================================
// BOTÓN SIGUIENTE
// ==========================================

function nextCategory() {

  if (!saveCurrentCategory()) {
    return;
  }


  if (
    currentCategory <
    CATEGORIES.length - 1
  ) {

    currentCategory++;

    renderCategory();

    window.scrollTo({
      top: $("votingCard").offsetTop - 20,
      behavior: "smooth"
    });

    return;

  }


  submitVoting();

}


// ==========================================
// BOTÓN ANTERIOR
// ==========================================

function previousCategory() {

  if (currentCategory <= 0) {
    return;
  }


  saveCurrentCategory();

  currentCategory--;

  renderCategory();

}


// ==========================================
// INICIO
// ==========================================

document.addEventListener(
  "DOMContentLoaded",
  async () => {

    console.log(
      "Sagrada Orden Awards 2026 iniciado."
    );


    selections =
      createEmptySelections();


    loadRankingOptions();

    await loadVoters();


    $("startButton")
      .addEventListener(
        "click",
        startVoting
      );


    $("nextButton")
      .addEventListener(
        "click",
        nextCategory
      );


    $("previousButton")
      .addEventListener(
        "click",
        previousCategory
      );


    console.log(
      "Sistema listo."
    );

  }
);
