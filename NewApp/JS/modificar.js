$(document).on("ready",start);

var galleta = $.cookie('usuario');

function start(){
    cargarDatos();
    $('#modificar').on("click",modificarDatos);
}

function cargarDatos(){
    var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/cargarDatos.php?jsoncallback=?";
    $.getJSON( url, { Cedula:"",Nombre:"",Apellido:"",Correo:""}).done(function(data) {
        $.each(data, function(i,item){
            $('#NameLast').val(item.Nombre + " "+item.Apellido);
            $('#Cedula').val(item.Cedula);
            $('#email').val(item.Correo);
            $('#NombreModificar').val(item.Nombre);
            $('#ApellidoModificar').val(item.Apellido);
            $('#CorreoModificar').val(item.Correo);
        });
    });
}


function modificarDatos(){
    var nom = $('#NombreModificar').val();
    var apell = $('#ApellidoModificar').val();
    var mail = $('#CorreoModificar').val();
    if(nom == "" || apell == "" || mail ==""){
        alert("Faltan Campos por Rellenar");
    }
    else{
        var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/modificar.php?jsoncallback=?";
        $.getJSON( url, { Nombre:nom,Apellido:apell, Correo:mail}).done(function(respuestaServer) {
        
        alert(respuestaServer.mensaje)
        
    });
        location.reload();
    }
}
