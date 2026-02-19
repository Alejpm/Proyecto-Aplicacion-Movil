let rootRef=null;
let stateRef=null;

export function init({root,state,navigate}){
  rootRef=root;
  stateRef=state;

  root.querySelector("#volver").onclick=()=>navigate("principal");

  root.querySelector("#guardar").onclick=async()=>{
    await fetch("api/guardar_ruta.php",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({ruta:stateRef.ruta})
    });
    alert("Ruta guardada");
  };
}

export function onShow({state}){
  stateRef=state;
  render();
}

function render(){
  if(!rootRef) return;

  rootRef.querySelector("#listaRuta").innerHTML=
    stateRef.ruta.map(l=>`<div>${l.nombre}</div>`).join("");
}

