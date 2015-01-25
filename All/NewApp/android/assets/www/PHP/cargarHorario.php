<?php
include("conex.php");
header('Content-type: application/json');

/* Extrae los valores enviados desde la aplicacion movil (load-json.js -->Funcion agregarHora)*/
$carreraEnviada = $_GET['carreraJ'];
$materiaEnviada = $_GET['materiaJ'];

//Consulta a la base de datos
$sql = "SELECT H.Hora_Inicio, H.Hora_Fin, F.Dia, C.Id_HorarioCarreraMateria FROM horariocarreramateria C INNER JOIN carreramateria M ON C.Id_carrera_Materia_H = M.Id_Carrera_Materia INNER JOIN horario R ON C.Id_Horario_M = R.Id_Horario INNER JOIN hora H ON R.Id_Hora_Horario = H.Id_Hora INNER JOIN fecha F ON R.Id_Fecha_Horario = F.Id_Fecha INNER JOIN carreras S ON M.Id_Carrera = S.Id_Carrera INNER JOIN materias N ON M.Id_Materia=N.Id_Materia WHERE S.Nombre_Carrera='$carreraEnviada' and N.Nombre_Materia='$materiaEnviada'";

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