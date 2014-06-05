<?php

header('Content-type: application/json');

/* Extrae los valores enviados desde la aplicacion movil (load-json.js -->Funcion agregarHora)*/
//$cedulaEnviada = $_GET['cedulaJ'];
$cedulaEnviada = $_COOKIE['usuario'];
//Conexion con la base de datos
$server = "sql310.byetcluster.com";
$username = "mb260_13335837";
$password = "mn4195869";
$database = "mb260_13335837_2";

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);

//Consulta a la base de datos
$sql = "SELECT H.Hora_Inicio, H.Hora_Fin, F.Dia, N.Nombre_Materia, U.Nombre FROM estudiantehorariocarreramateria B INNER JOIN horariocarreramateria C ON B.Id_HorarioCarreraMateria_E=C.Id_horarioCarreraMateria INNER JOIN carreramateria M ON C.Id_carrera_Materia_H = M.Id_Carrera_Materia INNER JOIN horario R ON C.Id_Horario_M = R.Id_Horario INNER JOIN hora H ON R.Id_Hora_Horario = H.Id_Hora INNER JOIN fecha F ON R.Id_Fecha_Horario = F.Id_Fecha INNER JOIN materias N ON M.Id_Materia=N.Id_Materia INNER JOIN usuario U ON B.Cedula=U.Cedula WHERE B.Cedula='$cedulaEnviada' ORDER BY F.Id_Fecha ASC";

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