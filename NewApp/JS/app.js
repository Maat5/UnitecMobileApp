$(document).on("ready",start);

var galleta = $.cookie('usuario');
function start(){
   //$('#submitButton').on('submit',checkStatus);
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
  var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/cargarNombre.php?jsoncallback=?";
  $.getJSON(url, {cedula:galleta}).done(function(data){
    $.each(data,function(i,item){
      nameUsr.text("Prof. "+item.nom +" "+ item.app);
    })
      
  });
}