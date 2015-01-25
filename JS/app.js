$(document).on("ready",start);

var galleta = $.cookie('usuario');
function start(){
   $('#submitButton').on('click',login);
   loadName();
   checkStatus();
  
}

//Optioene los datos del URL por el metodo GET    
function getQueryVariable(variable)
{
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i=0;i<vars.length;i++) {
    var pair = vars[i].split("=");
    if(pair[0] == variable){return pair[1];}
  }
  return(false);

}

function checkStatus(){
   var stat = getQueryVariable("stat");
   if(stat == "Inv"){
    $('#cedLab').text("Cedula Incorrecto").addClass('labelError');
    $('#passLab').text("Contraseña Incorrecta").addClass('labelError');
   }
   else{
    $('#cedLab').text("Cedula");
    $('#passLab').text("Contraseña")
   }
}

function loadName(){
  var nameUsr = $('#nameUsr');
  //var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/cargarNombre.php?jsoncallback=?";
  var url = "http://unitec.260mb.org/PHP/cargarNombre.php?jsoncallback=?";
  $.getJSON(url, {cedula:galleta}).done(function(data){
    $.each(data,function(i,item){
      nameUsr.text("Prof. "+item.nom +" "+ item.app);
    })
      
  });
}


function login(){
    // Recolecta Los Valores Que Insertó El Usuario
    var datosUsuario = $("#usuario").val();
    var datosPassword = $("#password").val();
    //JSON
    //var archivoValidacion = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/login.php?jsoncallback=?";
    var archivoValidacion = "http://unitec.260mb.org/PHP/login.php?jsoncallback=?";
    $.getJSON( archivoValidacion, { usuario:datosUsuario,password:datosPassword})
    .done(function(respuestaServer) {
        
        //alert(respuestaServer.mensaje)
        if(respuestaServer.validacion > 0 && respuestaServer.T== 1){       
            /// Si La Validacion Es Correcta, Muestra La Página Main        
            location.href='Alumno/mainAlumno.html';          
        }
        else if(respuestaServer.validacion > 0 && respuestaServer.T== 2){       
            /// Si La Validacion Es Correcta, Muestra La Página Main        
            location.href='Profesores/mainMenuProf.html';          
        }
        else
        {   
            /// Ejecutar Una Conducta Cuando La Validacion Falla 
             $('#cedLab').text("Cedula Incorrecto").addClass('labelError');
             $('#passLab').text("Contraseña Incorrecta").addClass('labelError');            
        }
  
    });
    return false;
}