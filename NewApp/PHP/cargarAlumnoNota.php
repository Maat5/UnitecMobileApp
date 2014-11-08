<?php
include("conex.php");
header('Content-type: application/json');

/* Extrae los valores enviados desde la aplicacion movil (load-json.js -->Funcion agregarHora)*/
$horarioCarreraMateriaEnviado = $_GET['horarioJ'];

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);

//Consulta a la base de datos
$sql = "SELECT U.Cedula, U.Nombre, U.Apellido, E.Id_EstudianteHorarioCarreraMateria FROM usuario U INNER JOIN estudiantehorariocarreramateria E ON U.Cedula=E.Cedula WHERE E.Id_HorarioCarreraMateria_E='$horarioCarreraMateriaEnviado'";

$result = mysql_query($sql) or die ("Query error: " . mysql_error());
$records = array();

while($row = mysql_fetch_assoc($result)) {
  $records[] = $row;

}

/*Convierte los resultados a formato json*/
$resultadosJson = json_encode($records);
/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';

?>