$(document).on("ready",start);

function start(){
   //$('#submitButton').on('submit',checkStatus);
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