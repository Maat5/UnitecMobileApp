<?php

include("conex.php");
header('Content-type: application/json');

$cedulaEnviada = $_COOKIE['usuario'];

$name= $_GET['Nombre'];
$app = $_GET['Apellido'];
$mail =$_GET['Correo'];


//Consulta a la base de datos
if ($name == " " || $app== " " || $mail == " ")
{
  $resultados["mensaje"] = "No puede insertar datos en blanco";
}
else{
  $sql ="UPDATE usuario SET Nombre='$name',Apellido='$app',Correo='$mail' WHERE Cedula='$cedulaEnviada'";
  $result = mysql_query($sql) or die ("Query error: " . mysql_error());
  $records = array();
  }

  while($row = mysql_fetch_assoc($result)) {
    $records[] = $row;
    
  }
  $cantidad = mysql_affected_rows($con);
  $resultados["validacion"] = $cantidad;

  if($cantidad > 0){  
    $resultados["mensaje"] = "Sus datos han sido modificados correctamente";
  }
  else
    if($cantidad == 0 )
    $resultados["mensaje"] = "Error al modificar datos.";

  /*Convierte los resultados a formato json*/
  $resultadosJson = json_encode($resultados);

  /*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
  echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';

?>