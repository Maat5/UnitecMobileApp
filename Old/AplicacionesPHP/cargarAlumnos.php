<?php

header('Content-type: application/json');

/* Extrae los valores enviados desde la aplicacion movil (load-json.js -->Funcion agregarHora)*/
$horarioCarreraMateriaEnviado = $_GET['horarioJ'];

//Conexion con la base de datos
$server = "sql310.byetcluster.com";
$username = "mb260_13335837";
$password = "mn4195869";
$database = "mb260_13335837_2";

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);

//Consulta a la base de datos
$sql = "SELECT U.Cedula, U.Nombre, U.Apellido, E.Id_EstudianteHorarioCarreraMateria, N.Id_Nota_Estudiante FROM usuario U INNER JOIN estudiantehorariocarreramateria E ON U.Cedula=E.Cedula INNER JOIN estudiantematerianota N ON E.Id_EstudianteHorarioCarreraMateria=N.Id_EstudianteCarreraMateria_N WHERE E.Id_HorarioCarreraMateria_E='$horarioCarreraMateriaEnviado' Order By Id_EstudianteMateriaNota DESC";

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