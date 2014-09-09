<?php

header('Content-type: application/json');

/* Extrae los valores enviados desde la aplicacion movil (load-json.js -->Funcion agregarHora)*/
$materiaEnviada = $_GET['materiaJ'];

//Conexion con la base de datos
$server = "sql310.byetcluster.com";
$username = "mb260_13335837";
$password = "mn4195869";
$database = "mb260_13335837_2";
$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);

//Consulta a la base de datos
$sql = "SELECT DISTINCT P.Nombre_Carrera, P.Id_Carrera FROM horariocarreramateria H INNER JOIN carreramateria C ON H.Id_carrera_Materia_H = C.Id_Carrera_Materia INNER JOIN materias M ON C.Id_Materia = M.Id_Materia INNER JOIN carreras P ON C.Id_Carrera = P.Id_Carrera where M.Nombre_Materia='$materiaEnviada'";

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