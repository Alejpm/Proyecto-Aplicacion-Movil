<?php
header("Content-Type: application/json");

$data=json_decode(file_get_contents("php://input"),true);

if(!isset($data["ruta"])){
  echo json_encode(["ok"=>false]);
  exit;
}

$file="rutas.json";

$rutas=[];
if(file_exists($file)){
  $rutas=json_decode(file_get_contents($file),true);
}

$rutas[]=$data["ruta"];

file_put_contents($file,json_encode($rutas,JSON_PRETTY_PRINT));

echo json_encode(["ok"=>true]);

