const grid = document.getElementById("grid");

const state = {
  lugares: [],
  seleccionado: null,
  ruta: []
};

const routes = {
  principal: {x:0,y:0,path:"screens/principal"},
  detalle: {x:1,y:0,path:"screens/detalle"},
  ruta: {x:0,y:1,path:"screens/ruta"}
};

const loaded = new Map();

function ensureSlots(){
  if(grid.children.length) return;
  for(let i=0;i<4;i++){
    const slot=document.createElement("div");
    slot.className="screen-slot";
    grid.appendChild(slot);
  }
}

function moveTo(route){
  const r=routes[route];
  const x=window.innerWidth*r.x;
  const y=window.innerHeight*r.y;
  grid.style.transform=`translate(${-x}px,${-y}px)`;
}

async function loadScreen(name){
  if(loaded.has(name)) return;

  const r=routes[name];
  const index=r.y*2+r.x;
  const slot=grid.children[index];

  const html=await fetch(`${r.path}/screen.html`).then(r=>r.text());
  slot.innerHTML=html;

  const css=await fetch(`${r.path}/screen.css`).then(r=>r.text());
  const style=document.createElement("style");
  style.textContent=css;
  document.head.appendChild(style);

  const mod=await import(`../${r.path}/screen.js`);
  if(mod.init){
    mod.init({root:slot,state,navigate});
  }

  loaded.set(name,true);
}

async function navigate(name){
  await loadScreen(name);

  const r=routes[name];
  const mod=await import(`../${r.path}/screen.js`);

  if(mod.onShow){
    mod.onShow({state});
  }

  moveTo(name);
}

ensureSlots();
await loadScreen("principal");
navigate("principal");

