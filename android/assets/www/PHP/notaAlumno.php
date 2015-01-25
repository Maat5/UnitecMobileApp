<?php
include("conex.php");
header('Content-type: application/json');

/* Extrae los valores enviados desde la aplicacion movil (load-json.js -->Funcion agregarHora)*/
$cedulaEnviada = $_COOKIE['usuario'];

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);

//Consulta a la base de datos
$sql = "SELECT N.Id_Nota_Estudiante, M.Nombre_Materia FROM estudiantematerianota N INNER JOIN estudiantehorariocarreramateria E ON N.Id_EstudianteCarreraMateria_N=E.Id_EstudianteHorarioCarreraMateria INNER JOIN horariocarreramateria H ON E.Id_HorarioCarreraMateria_E=H.Id_HorarioCarreraMateria INNER JOIN carreramateria C ON H.Id_carrera_Materia_H=C.Id_Carrera_Materia INNER JOIN materias M ON C.Id_Materia=M.Id_Materia WHERE E.Cedula='$cedulaEnviada'";

$result = mysql_query($sql) or die ("Query error: " . mysql_error());
$records = array();
$i = 0;
while($row = mysql_fetch_row($result)) {
  $records[$i]["nota"] = $row[0];
  $records[$i]["mat"] = $row[1];
  $i++;
}

/*Convierte los resultados a formato json*/
$resultadosJson = json_encode($records);
/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';

?>