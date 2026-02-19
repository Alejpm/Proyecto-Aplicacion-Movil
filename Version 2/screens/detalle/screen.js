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

  rootRef.querySelector("#img").src=stateRef.seleccionado.imagen;
  rootRef.querySelector("#nombre").textContent=stateRef.seleccionado.nombre;
  rootRef.querySelector("#desc").textContent=stateRef.seleccionado.descripcion;
}

