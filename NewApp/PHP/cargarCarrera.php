<?php
include("conex.php");
header('Content-type: application/json');

$materiaEnviada = $_GET['materiaJ'];

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