$(document).on("ready",start);

var galleta = $.cookie('usuario');

function start(){
    cargarDatos();
    $('#sendMail').on("click",mailSolicitud);
    loadName();
}

function cargarDatos(){
   // var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/cargarDatos.php?jsoncallback=?";
   var url = "http://unitec.260mb.org/PHP/cargarDatos.php?jsoncallback=?";
    $.getJSON( url, { Cedula:"",Nombre:"",Apellido:"",Correo:""}).done(function(data) {
        $.each(data, function(i,item){
            $('#NameLast').val(item.Nombre + " "+item.Apellido);
            $('#Cedula').val(item.Cedula);
            $('#email').val(item.Correo);
        });
    });
}


function mailSolicitud(){
    var nom = $('#NameLast').val();
    var ced = $('#Cedula').val();
    var tipo = $('#Solicitud').val();
    var mail = $('#email').val();
    var soli = $('#textSoli').val();
    if(soli == "--Solicitud--"){
        alert("Seleccione una Solicitud valida")
    }
    else
     mail_str = "mailto:racerf5@gmail.com?&bcc="+mail+"&subject= Solicitud Aplicacion Movil: " + tipo;
     mail_str += "&body= Gracias "+nom;
     mail_str += "%0A Su Solicitud: %0A " + soli;
     mail_str += "%0A Sera atendida pronto.";
     nom = NameLast
    ced = Cedula
    tipo = Solicitud
    soli = textSoli
    // mail_str += "Enlace: " + location.href; 
    location.href = mail_str;
       
}


function loadName(){
  var nameUsr = $('#nameUsr');
 //var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/cargarNombre.php?jsoncallback=?";
  var url = "http://unitec.260mb.org/PHP/cargarNombre.php?jsoncallback=?";
  $.getJSON(url, {cedula:galleta}).done(function(data){
    $.each(data,function(i,item){
      nameUsr.text(""+item.nom +" "+ item.app);
    })
      
  });
}