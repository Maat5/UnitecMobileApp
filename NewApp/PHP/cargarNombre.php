<?php
include("conex.php");
header('Content-type: application/json');

/* Extrae los valores enviados desde la aplicacion movil (load-json.js -->Funcion agregarHora)*/
$ced = $_GET["cedula"];
//Consulta a la base de datos
$sql = "SELECT Nombre, Apellido FROM usuario WHERE Cedula='$ced'";

$result = mysql_query($sql) or die ("Query error: " . mysql_error());
$records = array();
$i =0;
while($row = mysql_fetch_row($result)) {
  $records[$i]["nom"] = $row[0];
  $records[$i]["app"] = $row[1];
  $i++;
}

/*Convierte los resultados a formato json*/
$resultadosJson = json_encode($records);
/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';

?>