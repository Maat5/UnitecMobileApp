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

$name= $_GET['Nombre'];
$app = $_GET['Apellido'];
$mail =$_GET['Correo'];

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());
mysql_select_db($database, $con);

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