let rootRef = null;
let stateRef = null;

export function init({root,state,navigate}) {
  rootRef = root;
  stateRef = state;

  root.querySelector("#volver").onclick = () => navigate("principal");
  root.querySelector("#guardar").onclick = guardarRuta;
}

export async function onShow() {
  await render();
}

async function guardarRuta() {

  if(stateRef.ruta.length === 0){
    alert("No hay lugares en la ruta");
    return;
  }

  await fetch("api/guardar_ruta.php", {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ruta: stateRef.ruta})
  });

  alert("Ruta guardada correctamente");
  stateRef.ruta = [];
  render();
}

async function render() {

  const listaActual = rootRef.querySelector("#listaRuta");
  const listaGuardadas = rootRef.querySelector("#listaGuardadas");

  // Ruta actual
  listaActual.innerHTML = stateRef.ruta.map(l =>
    `<div>• ${l.nombre}</div>`
  ).join("");

  const rutas = await fetch("api/obtener_rutas.php").then(r => r.json());
  
const bg = document.getElementById("rutaBgGlobal");

if (Array.isArray(rutas) && rutas.length > 0 && rutas[0].lugares?.length > 0) {
  bg.style.backgroundImage = `url('${rutas[0].lugares[0].imagen}')`;
} else {
  bg.style.backgroundImage = "";
}

  if (rutas.length > 0 && rutas[0].lugares.length > 0) {
  bg.style.backgroundImage = `url('${rutas[0].lugares[0].imagen}')`;
}

  listaGuardadas.innerHTML = rutas.map((r,i) => {

    const portada = r.lugares[0]?.imagen || "";

    return `
      <div class="ruta-card">

        <div class="ruta-header" data-index="${i}">
          <img src="${portada}">
          <h3>Ruta ${i+1}</h3>
        </div>

        <div class="ruta-content" id="content-${i}">
          <small>${r.fecha}</small>

          <div>
            ${r.lugares.map(l=>`<div>• ${l.nombre}</div>`).join("")}
          </div>

          <div class="miniaturas">
            ${r.lugares.map(l=>`
              <img src="${l.imagen}">
            `).join("")}
          </div>
        </div>

      </div>
    `;
  }).join("");

  activarAcordeon();
}

function activarAcordeon() {
  const headers = rootRef.querySelectorAll(".ruta-header");

  headers.forEach(header => {
    header.onclick = () => {
      const index = header.dataset.index;
      const content = rootRef.querySelector(`#content-${index}`);
      content.classList.toggle("open");
    };
  });
}

