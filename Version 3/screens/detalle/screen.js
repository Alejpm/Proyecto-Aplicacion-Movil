let rootRef=null;
let stateRef=null;

export function init({root,state,navigate}){
  rootRef=root;
  stateRef=state;

  root.querySelector("#volver").onclick=()=>navigate("principal");

  root.querySelector("#addRuta").onclick=()=>{
    if(!stateRef.seleccionado) return;
    stateRef.ruta.push(stateRef.seleccionado);
    alert("Añadido a la ruta");
  };
}

export function onShow({state}){
  stateRef=state;
  render();
}

function render(){
  if(!rootRef || !stateRef.seleccionado) return;

  const img = rootRef.querySelector("#img");
  const nombre = rootRef.querySelector("#nombre");
  const desc = rootRef.querySelector("#desc");

  img.src = stateRef.seleccionado.imagen;
  nombre.textContent = stateRef.seleccionado.nombre;
  desc.textContent = stateRef.seleccionado.descripcion;

  const bg = rootRef.querySelector("#detalleBg");
  bg.style.backgroundImage = `url('${stateRef.seleccionado.imagen}')`;
}

