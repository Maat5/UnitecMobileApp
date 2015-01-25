<?php

include("conex.php");

$cedulaEstudiante = $_GET["cedulaJ"];
$nota = $_GET["notaJ"];
$horario=$_GET["horarioJ"];

$sql = "SELECT Id_EstudianteHorarioCarreraMateria FROM  estudiantehorariocarreramateria WHERE Cedula='$cedulaEstudiante' and Id_HorarioCarreraMateria_E='$horario'";

$result = mysql_query($sql) or die ("Query error: " . mysql_error());
$records = array();

while($row = mysql_fetch_assoc($result)) {
  $records[] = $row;
}

/*Convierte los resultados a formato json*/
$resultadosJson = json_encode($records);
/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';


mysql_close($con);
?>