$(document).on("ready",start);

var galleta = $.cookie('usuario');

function start(){
   cargarMaterias();
   loadName();
   $('#nomMateria').on("change",cargarCarreras);
   $('#nomCarrera').on("change",cargarHorario);
   $('#nomHorario').on("change",cargarAlumnos);
   $('#botonAgregaNota').on("click", agregarNota);
   $('#not1').on("click",function(){
      $('#todoAlumnos').toggle();
   });
    $('#not2').on("click",function(){
      $('#unAlumno').toggle();
   });
}

function cargarMaterias(){

    var materia= $("#nomMateria");
    var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/cargarMateria.php?jsoncallback=?";
    $.getJSON(url, { cedula:galleta})
    .done(function(data) {    
        $.each(data, function(i,item){
            var agregarM = '<option value="'+item.Id_Materia+'">'+item.Nombre_Materia+'</option>'; 
                materia.append(agregarM); 
        });
    });
}

function cargarCarreras(){
    $('#uu').empty();
     $('#todoAlumnos').hide("slow"); 
    var materia = $('#nomMateria option:selected').text();
    var horario = $("#nomHorario");
    var carreraa = $("#nomCarrera");
    $("#nomHorario").empty();
    $('#nomHorario').append('<option selected>--Seleccione--</option>');
    $("#nomCarrera").empty();
    $('#nomCarrera').append('<option selected>--Seleccione--</option>');

    var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/cargarCarrera.php?jsoncallback=?";
    $.getJSON(url, { materiaJ:materia}).done(function(data) {    
      $.each(data, function(i,item){
        var agregaC = '<option value="'+item.Id_Carrera+'">'+item.Nombre_Carrera+'</option>';
        carreraa.append(agregaC);
      });
    });  
}

function cargarHorario(){
    $('#uu').empty();
    $('#todoAlumnos').hide("slow"); 
    //Toma El Valor Del Select De La Carrera    
    var carrera = $('#nomCarrera option:selected').text();
    var materia = $('#nomMateria option:selected').text();
    var horario = $("#nomHorario");
    $("#nomHorario").empty();
    $('#nomHorario').append('<option selected>--Seleccione--</option>');
    
    var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/cargarHorario.php?jsoncallback=?"
    $.getJSON(url, { carreraJ:carrera, materiaJ:materia}).done(function(data) {    
    $.each(data, function(i,item){
      var agregaH = '<option value="'+item.Id_HorarioCarreraMateria+'">'+item.Dia+ " De " + item.Hora_Inicio+ " a " +item.Hora_Fin+'</option>';
       horario.append(agregaH);
     });
  });
}

function cargarAlumnos(){

    $('#uu').empty();
    var horario = $('#nomHorario').val();
    var alumnos = $('#uu');
    //JSON
    var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/cargarAlumnoNota.php?jsoncallback=?";
    $.getJSON(url, { horarioJ:horario})
    .done(function(data){    var cant=0;
        $.each(data, function(i,item){
          cant++;
           var agregaA = '<li><div class="listview"><input type="radio" class="radio" value="'+item.Id_EstudianteHorarioCarreraMateria+'" id="lab'+cant+'" name="rb" checked><label class=" radio">'+item.Nombre+' '+item.Apellido+' CI: '+item.Cedula+'</label></div></li>';
            alumnos.append(agregaA); 
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

function agregarNota(){
  var radioAlumno=$("#todoAlumnos");
  var textAlumno=$("#unAlumno");    
  var seleccion=0;
  var idalumnocarreramateria, cedula,nota;
  var horario = $('#nomHorario').val();

  if(radioAlumno.is(':visible')){      
    seleccion=1;
    idalumnocarreramateria = $("input[@name=rb]:checked").val();
    nota=$('#nota1').val();
  }
  else if(textAlumno.is(':visible')){
    seleccion=2;
    cedula= $('#buscar').val();
    nota= $('#nota2').val();
  }
  else
    alert("No Ha Seleccionado Ninguna Opción");

  if(seleccion!=0){
    if(seleccion==1){
      if(nota!=""){
        if(idalumnocarreramateria!=undefined){
          var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/agregarNota.php?jsoncallback=?";
          $.getJSON(url, { idehcm:idalumnocarreramateria,notaJ:nota}).done(function(data) { });
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
        var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/agregarNota2.php?jsoncallback=?";

        $.getJSON(url, { cedulaJ:cedula,notaJ:nota, horarioJ:horario}).done(function(data) { 
         var c=0;
         $.each(data, function(i,item){
          if(nota!=""){
            c++; 
            var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/agregarNota.php?jsoncallback=?";

             $.getJSON(url, { idehcm:item.Id_EstudianteHorarioCarreraMateria,notaJ:nota}).done(function(data) {});
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