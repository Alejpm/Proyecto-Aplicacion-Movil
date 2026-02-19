export async function init({root,state,navigate}){
  const lista=root.querySelector("#lista");

  const data=await fetch("api/lugares.json").then(r=>r.json());
  state.lugares=data.lugares;

  lista.innerHTML=state.lugares.map(l=>`
    <div class="card" data-id="${l.id}">
      <img src="${l.imagen}">
      <h3>${l.nombre}</h3>
      <p>${l.descripcion}</p>
    </div>
  `).join("");

  lista.addEventListener("click",e=>{
    const card=e.target.closest(".card");
    if(!card) return;
    const id=parseInt(card.dataset.id);
    state.seleccionado=state.lugares.find(l=>l.id===id);
    navigate("detalle");
  });

  root.querySelector("#btnRuta").onclick=()=>navigate("ruta");
}

