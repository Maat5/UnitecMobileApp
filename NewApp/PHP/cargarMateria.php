<?php
include("conex.php");

$profe = $_GET['cedula'];

$sql = "SELECT DISTINCT M.Nombre_Materia, M.Id_Materia FROM horariocarreramateria H INNER JOIN carreramateria C ON  H.Id_carrera_Materia_H = C.Id_Carrera_Materia INNER JOIN materias M ON  C.Id_Materia = M.Id_Materia where H.Cedula_Profesor_H='$profe'";

$result = mysql_query($sql) or die ("Query error: " . mysql_error());

$records = array();

while($row = mysql_fetch_assoc($result)) {
  $records[] = $row;
}

mysql_close($con);

echo $_GET['jsoncallback'] . '(' . json_encode($records) . ');';
?>