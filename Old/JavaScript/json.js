
$(document).on("ready",inicio);

var refrescar=0;

function inicio()
{    
    window.onload = bloquearAtras();
    $('#formulario-login').on("submit",login);

    $('#botonAgregaNota').on("click", agregarNota);
    $('#sel-carrera').on("change",cargarHorario);
    $('#sel-carrera2').on("change",cargarHorario2);
    $('#sel-materia').on("change",cargarCarreras);
    $('#sel-materia2').on("change",cargarCarreras2);
    $('#sel-horario').on("change",cargarAlumnos);
    $('#sel-horario2').on("change",cargarAlumnos2);
    $('.botonSalir').on("click",salir);
    $('#sendMail').on("click",mailSolicitud);
    $('#modificar').on("click",modificarDatos);
    
    cargarMaterias();
    cargarHorarioProfesor();
    cargarHorarioAlumnos();
    cargarNotaAlumno();
    cargarDatos();
}

function agregarNota(){

    var radioAlumno=$("#todoAlumnos").attr('class');
    var textAlumno=$("#unAlumno").attr('class');    
    
    var seleccion=0;

    var idalumnocarreramateria;

    var cedula;
    var horario = $('#sel-horario').val();

    var nota;

    if(radioAlumno=='ui-collapsible'){      
        seleccion=1;  
        idalumnocarreramateria = $("input[@name=rb]:checked").val();
        nota=$('#nota1').val();
    }
    else if(textAlumno=='ui-collapsible'){
        seleccion=2;  
        cedula=$('#buscar').val();
        nota=$('#nota2').val();
    }
    else
        alert("No Ha Seleccionado Ninguna Opción");

    if(seleccion!=0){
        //JSON
        if(seleccion==1)
        {
            if(nota!=""){
                if(idalumnocarreramateria!=undefined){                
                    var url = "http://127.0.0.1/AplicacionesPHP/agregarNotas.php?jsoncallback=?";
                    $.getJSON(url, { idehcm:idalumnocarreramateria,notaJ:nota}).done(function(data) {    
                    });

                    alert("Se Agregó La Nota Exitosamente");  
                    $('#nota1').attr("value","");  
                    $('#buscar').attr("value","");  
                    $('#nota2').attr("value",""); 
                }
                else
                    alert('Escoja Un Alumno');
            } 
            else
                alert("Ingrese Nota");
        }

        if(seleccion==2)
        {
            var id;
            var url = "http://127.0.0.1/AplicacionesPHP/agregarNotas2.php?jsoncallback=?";
            $.getJSON(url, { cedulaJ:cedula,notaJ:nota, horarioJ:horario}).done(function(data) {    
                var c=0;
                $.each(data, function(i,item){                    
                    if(nota!=""){ 
                        c++;                       
                        var url = "http://127.0.0.1/AplicacionesPHP/agregarNotas.php?jsoncallback=?";
                        $.getJSON(url, { idehcm:item.Id_EstudianteHorarioCarreraMateria,notaJ:nota}).done(function(data) {    
                        }); 
                    }
                    else
                        alert("Agregue Una Nota");                    
                });
                if(c>0){
                    alert("Se Agregó Exitosamente");
                    $('#nota1').attr("value","");  
                    $('#buscar').attr("value","");  
                    $('#nota2').attr("value","");  
                }
                else
                    alert("Error Al Ingresar");
            });
            
        }

    }    
}

function bloquearAtras() {
    if (typeof history.pushState === "function") {
        history.pushState("jibberish", null, null);
        window.onpopstate = function () {
            history.pushState('newjibberish', null, null);
            // Handle the back (or forward) buttons here
            // Will NOT handle refresh, use onbeforeunload for this.
        };
    }
    else {
        var ignoreHashChange = true;
        window.onhashchange = function () {
            if (!ignoreHashChange) {
                ignoreHashChange = true;
                window.location.hash = Math.random();
                // Detect and redirect change here
                // Works in older FF and IE9
                // * it does mess with your hash symbol (anchor?) pound sign
                // delimiter on the end of the URL
            }
            else {
                ignoreHashChange = false;   
             }
        };
    }
}

function cargarAlumnos(){

    $('#lali').empty();
  var horario = $('#sel-horario').val();
  var alumnos = $('#lali');
  //JSON
  var url = "http://127.0.0.1/AplicacionesPHP/cargaAlumnos2.php?jsoncallback=?";
  $.getJSON(url, { horarioJ:horario})
    .done(function(data){    var cant=0;
        $.each(data, function(i,item){
            cant++;
            if(cant==1){
            var agregaA = '</br><div class="rb" data-role="listview"><input type="radio" value="'+item.Id_EstudianteHorarioCarreraMateria+'" id=lab"'+cant+'" name="rb" checked></input><label for=lab"'+cant+'">'+item.Nombre+' '+item.Apellido+' CI: '+item.Cedula+'<img class="imagen1" WIDTH=30 HEIGHT=30 src="Img/tabla_de_notas.png"></label></br></div>';
            }
            else{
                var agregaA = '<div class="rb" data-role="listview"><input type="radio" value="'+item.Id_EstudianteHorarioCarreraMateria+'" id=lab"'+cant+'" name="rb"></input><label for=lab"'+cant+'">'+item.Nombre+' '+item.Apellido+' CI: '+item.Cedula+'<img class="imagen1" WIDTH=30 HEIGHT=30 src="Img/tabla_de_notas.png"></label></br></div>';
            }
            alumnos.append(agregaA).trigger('create');            
        });
    });  
}

function cargarAlumnos2(){

    $('#jnk').empty();
    var horario = $('#sel-horario2').val();
    var alumnos = $('#jnk');
    //JSON
    var url = "http://127.0.0.1/AplicacionesPHP/cargarAlumnos.php?jsoncallback=?";
    $.getJSON(url, { horarioJ:horario})
    .done(function(data){    var cant=0;
        $.each(data, function(i,item){
    
            var agregaA = '<li class="ui-li ui-li-static ui-body-c" style="text-align:center">'+item.Nombre+' '+item.Apellido+' CI: '+item.Cedula+ " Nota: "+item.Id_Nota_Estudiante+'</br></li>';
          
            alumnos.append(agregaA);            
        });
    });  
}

function cargarCarreras(){
    $('#lali').empty();
    //Toma El Valor Del Select De La Carrera    
    var materia = $('#sel-materia option:selected').text();
    var horario = $("#sel-horario");
    var carreraa = $("#sel-carrera");
    $("#sel-horario").empty();
    $('#sel-horario').append('<option selected>--Seleccione--</option>');
    $("#sel-carrera").empty();
    $('#sel-carrera').append('<option selected>--Seleccione--</option>');
    //JSON
    var url = "http://127.0.0.1/AplicacionesPHP/selectCarrera.php?jsoncallback=?";
    $.getJSON(url, { materiaJ:materia})
    .done(function(data) {    
        $.each(data, function(i,item){
            var agregaC = '<option value="'+item.Id_Carrera+'">'+item.Nombre_Carrera+'</option>';

                carreraa.append(agregaC);
        });
    });  
}

function cargarCarreras2(){
    $('#jnk').empty();
    //Toma El Valor Del Select De La Carrera    
    var materia = $('#sel-materia2 option:selected').text();
    var horario = $("#sel-horario2");
    var carreraa = $("#sel-carrera2");
    $("#sel-horario2").empty();
    $('#sel-horario2').append('<option selected>--Seleccione--</option>');
    $("#sel-carrera2").empty();
    $('#sel-carrera2').append('<option selected>--Seleccione--</option>');
    //JSON
    var url = "http://127.0.0.1/AplicacionesPHP/selectCarrera.php?jsoncallback=?";
    $.getJSON(url, { materiaJ:materia})
    .done(function(data) {    
        $.each(data, function(i,item){
            var agregaC = '<option value="'+item.Id_Carrera+'">'+item.Nombre_Carrera+'</option>';

                carreraa.append(agregaC);
        });
    });  
}

function cargarDatos(){
    //Cargar los datos de los usuarios
     var archivoValidacion = "http://127.0.0.1/AplicacionesPHP/cargarDatos.php?jsoncallback=?";
    $.getJSON( archivoValidacion, { Cedula:"",Nombre:"",Apellido:"",Correo:""})
    .done(function(data) {
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

function cargarHorario(){
    $('#lali').empty();
    //Toma El Valor Del Select De La Carrera    
    var carrera = $('#sel-carrera option:selected').text();
    var materia = $('#sel-materia option:selected').text();
    var horario = $("#sel-horario");
    $("#sel-horario").empty();
    $('#sel-horario').append('<option selected>--Seleccione--</option>');
    //var valor = $("#sel-horario option:selected").html();
    //alert(valor); 
    //JSON
    var url = "http://127.0.0.1/AplicacionesPHP/selectHora.php?jsoncallback=?";
    $.getJSON(url, { carreraJ:carrera, materiaJ:materia})
    .done(function(data) {    
        $.each(data, function(i,item){
            var agregaH = '<option value="'+item.Id_HorarioCarreraMateria+'">'+item.Dia+ " De " + item.Hora_Inicio+ " a " +item.Hora_Fin+'</option>';

                horario.append(agregaH);
        });
    });
}

function cargarHorario2(){
    $('#jnk').empty();
    //Toma El Valor Del Select De La Carrera    
    var carrera = $('#sel-carrera2 option:selected').text();
    var materia = $('#sel-materia2 option:selected').text();
    var horario = $("#sel-horario2");
    $("#sel-horario2").empty();
    $('#sel-horario2').append('<option selected>--Seleccione--</option>');
    //var valor = $("#sel-horario option:selected").html();
    //alert(valor); 
    //JSON
    var url = "http://127.0.0.1/AplicacionesPHP/selectHora.php?jsoncallback=?";
    $.getJSON(url, { carreraJ:carrera, materiaJ:materia})
    .done(function(data) {    
        $.each(data, function(i,item){
            var agregaH = '<option value="'+item.Id_HorarioCarreraMateria+'">'+item.Dia+ " De " + item.Hora_Inicio+ " a " +item.Hora_Fin+'</option>';

                horario.append(agregaH);
        });
    });
}
function cargarHorarioAlumnos(){
    var galleta = $.cookie('usuario');  
    var lista=$("#horarioA");
    var url = "http://127.0.0.1/AplicacionesPHP/verHorario.php?jsoncallback=?";
    $.getJSON(url, { cedulaJ:galleta})
    .done(function(data) {   
        var cant=0;
        var cant2=0;
        var dia=''; 
        var agregarM;
        var li="</li>"; 
        $.each(data, function(i,item){

             cant++;
            cant2++;
            if(cant==1){
                dia=item.Dia;
            }
            if(dia==item.Dia && cant==1){
             agregarM = '<li class="ui-li ui-li-divider ui-btn ui-bar-d ui-btn-up-undefined" role="heading" data-role="list-divider">'+item.Dia+'</li><li class="ui-li ui-li-static ui-body-c ui-corner-bottom"><p style="font-size:14px; text-align: center; font-weight:bold; color:black;">'+item.Nombre_Materia+' </p><p style="font-size:14px; text-align: center; font-weight:bold; color:black; ">' +item.Hora_Inicio+' A '+item.Hora_Fin+'</p>'; 
             }
            if(dia==item.Dia && cant != 1){
                agregarM += '<li class="ui-li ui-li-static ui-body-c ui-corner-bottom"><p style="font-size:14px; text-align: center; font-weight:bold; color:black;">'+item.Nombre_Materia+' </p><p style="font-size:14px; text-align: center; font-weight:bold; color:black;">' +item.Hora_Inicio+' A '+item.Hora_Fin+'</p>'; 
            }
            if(dia!=item.Dia){
                cant2=1;
                agregarM += '<li class="ui-li ui-li-divider ui-btn ui-bar-d ui-btn-up-undefined" role="heading" data-role="list-divider">'+item.Dia+'</li><li class="ui-li ui-li-static ui-body-c ui-corner-bottom"><p style="font-size:14px; text-align: center; font-weight:bold; color:black;">'+item.Nombre_Materia+' </p><p style="font-size:14px; text-align: center; font-weight:bold; color:black;">' +item.Hora_Inicio+' A '+item.Hora_Fin+'</p>';
                dia= item.Dia;
            }          
                
        });
        agregarM=agregarM+li;
        lista.append(agregarM);
    });
}

function cargarHorarioProfesor(){
    var galleta = $.cookie('usuario');  
    var lista=$("#horarioP");
    var url = "http://127.0.0.1/AplicacionesPHP/verHorarioProfe.php?jsoncallback=?";
    $.getJSON(url, { cedulaJ:galleta})
    .done(function(data) {   
    var cant=0;
        var cant2=0;
        var dia=''; 
        var agregarM;
        var li="</li>";
        $.each(data, function(i,item){
            cant++;
            cant2++;
            if(cant==1){
                dia=item.Dia;
            }
            if(dia==item.Dia && cant==1){
             agregarM = '<li class="ui-li ui-li-divider ui-btn ui-bar-d ui-btn-up-undefined" role="heading" data-role="list-divider">'+item.Dia+'</li><li class="ui-li ui-li-static ui-body-c ui-corner-bottom"><p style="font-size:14px; text-align: center; font-weight:bold; color:black;">'+item.Nombre_Materia+'</p><p style="font-size:14px; text-align: center; font-weight:bold; color:black; ">' +item.Hora_Inicio+' A '+item.Hora_Fin+'</p>'; 
             }
            if(dia==item.Dia && cant != 1){
                agregarM += '<li class="ui-li ui-li-static ui-body-c ui-corner-bottom"><p style="font-size:14px; text-align: center; font-weight:bold; color:black;">'+item.Nombre_Materia+' </p><p style="font-size:14px; text-align: center; font-weight:bold; color:black;">' +item.Hora_Inicio+' A '+item.Hora_Fin+'</p>';  
            }
            if(dia!=item.Dia){
                cant2=1;
                agregarM += '<li class="ui-li ui-li-divider ui-btn ui-bar-d ui-btn-up-undefined" role="heading" data-role="list-divider">'+item.Dia+'</li><li class="ui-li ui-li-static ui-body-c ui-corner-bottom"><p style="font-size:14px;text-align: center; font-weight:bold; color:black;">'+item.Nombre_Materia+' </p><p style="font-size:14px;text-align: center; font-weight:bold; color:black;">' +item.Hora_Inicio+' A '+item.Hora_Fin+'</p>'; 
                dia= item.Dia;
            }          
                
        });
        agregarM=agregarM+li;
        lista.append(agregarM); 
    });
}

function cargarMaterias(){

    //var galleta = $.cookie('usuario');  
   // alert(galleta)
    var materia= $("#sel-materia");
    var materia2= $("#sel-materia2");

    var url = "http://127.0.0.1/AplicacionesPHP/selectMateria.php?jsoncallback=?";
    $.getJSON(url, { cook:"galleta"})
    .done(function(data) {    
        $.each(data, function(i,item){
            var agregarM = '<option value="'+item.Id_Materia+'">'+item.Nombre_Materia+'</option>'; 
                materia.append(agregarM); 
                materia2.append(agregarM); 
        });
    });
}

function cargarNotaAlumno(){
     
    var lista=$("#notasA");
    var url = "http://127.0.0.1/AplicacionesPHP/notaAlumno.php?jsoncallback=?";
    $.getJSON(url, { cedulaJ:"21029953"})
    .done(function(data) {    
        var cant=0;
        var cant2=0;
        var agregarM, materia="";
        var li="</li>";
        $.each(data, function(i,item){            
            cant++;
            cant2++;
            if(cant==1){
                materia=item.Nombre_Materia;
            }
            if(materia==item.Nombre_Materia && cant==1){
                agregarM = '<li class="ui-li ui-li-divider ui-btn ui-bar-d ui-btn-up-undefined" role="heading" data-role="list-divider">'+item.Nombre_Materia+'</li><li class="ui-li ui-li-static ui-body-c ui-corner-bottom" data-theme="c"><h5 class="ui-li-aside ui-li-heading">'+item.Id_Nota_Estudiante+'</h5><h4 class="ui-li-heading"> Examen: '+ cant2 +'</h4>'; 
            }
            if(materia==item.Nombre_Materia && cant != 1){
                agregarM+='<li class="ui-li ui-li-static ui-body-c ui-corner-bottom" data-theme="c"><h5 class="ui-li-aside ui-li-heading">'+item.Id_Nota_Estudiante+'</h5><h4 class="ui-li-heading"> Examen: '+ cant2 +'</h4>'
            }
            if(materia!=item.Nombre_Materia){
                cant2=1;
                agregarM += '<li class="ui-li ui-li-divider ui-btn ui-bar-d ui-btn-up-undefined" role="heading" data-role="list-divider">'+item.Nombre_Materia+'</li><li class="ui-li ui-li-static ui-body-c ui-corner-bottom" data-theme="c"><h5 class="ui-li-aside ui-li-heading">'+item.Id_Nota_Estudiante+'</h5><h4 class="ui-li-heading"> Examen: '+ cant2 +'</h4>';
                materia= item.Nombre_Materia;

            }             
        });
        agregarM=agregarM+li;
        lista.append(agregarM);
       /* $.each(data, function(i,item){
            
            cant++;

            var agregarM = '<li class="ui-li ui-li-divider ui-btn ui-bar-d ui-btn-up-undefined" role="heading" data-role="list-divider">'+item.Nombre_Materia+'</li><li class="ui-li ui-li-static ui-body-c ui-corner-bottom" data-theme="c"><h5 class="ui-li-aside ui-li-heading">'+item.Id_Nota_Estudiante+'</h5><h4 class="ui-li-heading"> Examen: '+ cant +'</h4></li>'; 
                lista.append(agregarM); 
        });*/
    });
}

function login(){
    // Recolecta Los Valores Que Insertó El Usuario
    var datosUsuario = $("#usuario").val();
    var datosPassword = $("#password").val();
    //JSON
    var archivoValidacion = "http://127.0.0.1/AplicacionesPHP/login.php?jsoncallback=?";

    $.getJSON( archivoValidacion, { usuario:datosUsuario,password:datosPassword})
    .done(function(respuestaServer) {
        
        alert(respuestaServer.mensaje)
        if(respuestaServer.validacion > 0 && respuestaServer.T== 1){       
            /// Si La Validacion Es Correcta, Muestra La Página Main        
            location.href='main2.html';          
        }
        else
             if(respuestaServer.validacion > 0 && respuestaServer.T== 2){       
            /// Si La Validacion Es Correcta, Muestra La Página Main        
            location.href='mainProfesor.html';          
        }
        else
        {   
            /// Ejecutar Una Conducta Cuando La Validacion Falla             
        }
  
    });
    return false;
}

function mailSolicitud(){
    var nom = $('#NameLast').val();
    var ced = $('#Cedula').val();
    var tipo = $('#Solicitud').val();
    var mail = $('#email').val();
    var soli = $('#textSoli').val();
    if(soli.val() == "--Solicitud--"){
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

function modificarDatos(){
        var nom = $('#NombreModificar').val();
        var apell = $('#ApellidoModificar').val();
        var mail = $('#CorreoModificar').val();
    if(nom == "" || apell == "" || mail ==""){
        alert("Faltan Campos por Rellenar");
    }
    else{
        //JSON MODIFICAR DATOS
    var archivoValidacion = "http://127.0.0.1/AplicacionesPHP/modificarDatos.php?jsoncallback=?";
   $.getJSON( archivoValidacion, { Nombre:nom,Apellido:apell, Correo:mail})
    .done(function(respuestaServer) {
        
        alert(respuestaServer.mensaje)
         cargarDatos();

    });
    }
}

function salir(){
    //$.mobile.changePage("index.html");
    location.href="index.html";
    alert("Vuelve Pronto");
}

function soloLetras(e){
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "0123456789";
    especiales = [8,37,39,46];

    tecla_especial = false
    for(var i in especiales){
        if(key == especiales[i]){
            tecla_especial = true;
            break;
        }
    }
    if(letras.indexOf(tecla)==-1 && !tecla_especial){
        return false;
    }
}





/*$(document).bind("pageinit", function(){
   console.log('bindtomobileinit: event pageinit received');
   $.mobile.loadPage("main2.html", {prefetch:"true"});
   //$.mobile.changePage('solicitudes.html', 'pop');
   console.log('aa');
});*/