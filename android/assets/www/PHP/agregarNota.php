<?php
include("conex.php");

$idestudiantehcm = $_GET["idehcm"];
$nota = $_GET["notaJ"];

//Insertamos en la base de datos

$sql2 = "INSERT INTO estudiantematerianota (Id_EstudianteMateriaNota, Id_EstudianteCarreraMateria_N, Id_Nota_Estudiante) VALUES (NULL, $idestudiantehcm, $nota)";
$result2 = mysql_query($sql2) or die ("Error 2 :" . mysql_error());

mysql_close($con);
?>