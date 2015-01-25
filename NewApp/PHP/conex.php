<?php
  //Conexión a base de datos
  $server = "127.0.0.1";
  $username = "root";
  $password = "";
  $database = "unitec";
 /* $server = "sql310.byetcluster.com";
  $username = "mb260_13335837";
  $password = "mn4195869";
  $database = "mb260_13335837_2";*/
  $con = mysql_connect($server, $username, $password) or die ("Error al conectar: " . mysql_error());
  mysql_query("SET NAMES 'utf8'");
  mysql_select_db($database, $con);
?>