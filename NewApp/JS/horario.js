$(document).on("ready",start);

 var galleta = $.cookie('usuario');
function start(){
   loadSchedule();
   loadName();
}

function loadSchedule(){ 
 
  var lista=$("#horarioP");
  var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/horarioProfesor.php?jsoncallback=?";
  var agregarM;

  $.getJSON(url, { cedulaJ:galleta}).done(function(data) {   
    $.each(data, function(i,item){
      agregarM = '<li class="divider orangeLight"><label>'+item.dia+'</label></li><li class="divider cont orangeLightM"><span class="nomMat">'+item.mat+'</span><span class="horaMAt">'+item.hInicio+' A '+item.hFin+'</span></li>' ;
      lista.append(agregarM); 
    });
  });
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