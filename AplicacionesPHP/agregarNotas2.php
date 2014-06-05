<?php

//Conexión a base de datos
$server = "sql310.byetcluster.com";
$username = "mb260_13335837";
$password = "mn4195869";
$database = "mb260_13335837_2";
$con = mysql_connect($server, $username, $password) or die ("Error al conectar: " . mysql_error());
mysql_select_db($database, $con);

//Obtenemos por GET los valores enviados desde el móvil

$cedulaEstudiante = $_GET["cedulaJ"];
$nota = $_GET["notaJ"];
$horario=$_GET["horarioJ"];

//Seleccionar

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

//Insertamos en la base de datos
/*
$sql2 = "INSERT INTO estudiantematerianota (Id_EstudianteMateriaNota, Id_EstudianteCarreraMateria_N, Id_Nota_Estudiante) VALUES (NULL, $idestudiantehcm, $nota)";
$result2 = mysql_query($sql2) or die ("Error 2 :" . mysql_error());
*/
mysql_close($con);
?>