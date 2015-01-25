<?php
include("conex.php");
//header('Content-type: application/json');
$cedulaEnviada = $_COOKIE['usuario'];

//Consulta a la base de datos
//$sql = "SELECT H.Hora_Inicio, H.Hora_Fin, F.Dia, N.Nombre_Materia, U.Nombre FROM horariocarreramateria C INNER JOIN usuario U ON C.Cedula_Profesor_H=U.Cedula INNER JOIN carreramateria M ON C.Id_carrera_Materia_H = M.Id_Carrera_Materia INNER JOIN horario R ON C.Id_Horario_M = R.Id_Horario INNER JOIN hora H ON R.Id_Hora_Horario = H.Id_Hora INNER JOIN fecha F ON R.Id_Fecha_Horario = F.Id_Fecha INNER JOIN materias N ON M.Id_Materia=N.Id_Materia WHERE C.Cedula_Profesor_H='$cedulaEnviada' ORDER BY F.Id_Fecha ASC";
$sql = "SELECT H.Hora_Inicio, H.Hora_Fin, F.Dia, N.Nombre_Materia, U.Nombre FROM estudiantehorariocarreramateria B INNER JOIN horariocarreramateria C ON B.Id_HorarioCarreraMateria_E=C.Id_horarioCarreraMateria INNER JOIN carreramateria M ON C.Id_carrera_Materia_H = M.Id_Carrera_Materia INNER JOIN horario R ON C.Id_Horario_M = R.Id_Horario INNER JOIN hora H ON R.Id_Hora_Horario = H.Id_Hora INNER JOIN fecha F ON R.Id_Fecha_Horario = F.Id_Fecha INNER JOIN materias N ON M.Id_Materia=N.Id_Materia INNER JOIN usuario U ON B.Cedula=U.Cedula WHERE B.Cedula='$cedulaEnviada' ORDER BY F.Id_Fecha ASC";


$result = mysql_query($sql) or die ("Query error: " . mysql_error());
$records = array();
$i = 0;
while($row = mysql_fetch_row($result)) {
  $records[$i]["hInicio"] = $row[0];
  $records[$i]["hFin"] = $row[1];
  $records[$i]["dia"] = $row[2];
  $records[$i]["mat"] = $row[3];
  $records[$i]["nom"] = $row[4];
  $i++;
}

/*Convierte los resultados a formato json*/
$resultadosJson = json_encode($records);
/*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';
?>