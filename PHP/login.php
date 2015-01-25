<?php
include("conex.php");
header('Content-type: application/json');


$usuarioEnviado = $_GET['usuario'];
$passwordEnviado = $_GET['password'];

//Consulta a la base de datos
$sql = "SELECT * FROM usuario where Cedula='$usuarioEnviado' and Password='$passwordEnviado'";

$result = mysql_query($sql) or die ("Query error: " . mysql_error());

//Variable que guardará cuantos datos arroja la base de datos
$cantidad=0;

while($row = mysql_fetch_row($result)) {
  $cantidad++;
  $c =$row[0];
  $tipo = $row[1];
  $nom = $row[2];
  $app= $row[3];

}
 
  
$resultados["validacion"] = $cantidad;
$resultados["T"] = $tipo;

if($cantidad>0 && $tipo== 1){
  setcookie("usuario",$c,time()+36000);
  //$resultados["mensaje"] = "Bienvenido $nom $app";
}
else
if($cantidad>0 && $tipo== 2){
  //$resultados["mensaje"] = "Administrador $usuarioEnviado";
  setcookie("usuario",$c,time()+36000);
  //$resultados["mensaje"] = "Bienvenido Profesor $nom $app";
}
else
  $resultados["mensaje"] = "Usuario o Password Incorrectos";

/*Convierte los resultados a formato json*/
$resultadosJson = json_encode($resultados);

/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';

?>