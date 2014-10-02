<?php 
  include("conex.php");
  
  resultSet();
/*$usr =  $_GET["usuario"];
  $pass = $_GET["password"];

  */
   
  function QueryLogin($sql)
  {
    $sqlQ = $sql;
    $result = mysql_query($sqlQ) or die("Query Error: " .mysql_error());
    return $result;
  }

  function resultSet(){
    $cont = 0;
    $usr =  $_GET["usuario"];
    $pass = $_GET["password"];
    $sql = "SELECT Cedula,Id_Tipo_Usuario,Password, Nombre, Apellido FROM usuario WHERE Cedula = '$usr' and Password = '$pass'";
    $result = QueryLogin($sql);
    while ($row = mysql_fetch_row($result)) {
      $cont++;
      $ced = $row[0];
      $sendJS["nom"] = $row[3];
      $sendJS["app"] = $row[4];
      $sendJS["T"]   = $row[1];
      $type          = $sendJS["T"];
    }
    validUser($cont,$type);
    printJson($sendJS);
  }

  function validUser($cont, $type){
    if($cont!= 0 && $type == 1){
      setcookie("usuario",$ced,time()+36000,'/');
      header('Location: ../main2.html' );
    }
    else
      if($cont!=0 && $type ==2){
        setcookie("usuario",$ced,time()+36000,'/');
        header('Location: ../mainMenuProf.html');
      }
      else{
        $sendJS["mensaje"] = "prueb";
        header('Location: ../index.html?stat=Inv');
      }
  }


  function printJson($sendJS){
    /*Convierte los resultados a formato json*/
    $resultadosJson = json_encode($sendJS);

    /*Muestra el resultado en un formato que no da problemas de seguridad en browsers */
    echo $_GET['jsoncallback'] . '(' . $resultadosJson . ');';
  }
 ?>