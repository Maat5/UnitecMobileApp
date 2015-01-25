$(document).on("ready",start);

var galleta = $.cookie('usuario');

function start(){
   cargarMaterias();
   loadName();
   $('#nomMateria').on("change",cargarCarreras);
   $('#nomCarrera').on("change",cargarHorario);
   $('#nomHorario').on("change",cargarAlumnos);
}

function cargarMaterias(){

    var materia= $("#nomMateria");
    //var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/cargarMateria.php?jsoncallback=?";
    var url = "http://unitec.260mb.org/PHP/cargarMateria.php?jsoncallback=?";
    $.getJSON(url, { cedula:galleta})
    .done(function(data) {    
        $.each(data, function(i,item){
            var agregarM = '<option value="'+item.Id_Materia+'">'+item.Nombre_Materia+'</option>'; 
                materia.append(agregarM); 
        });
    });
}

function cargarCarreras(){
    $('#lali').empty();

    var materia = $('#nomMateria option:selected').text();
    var horario = $("#nomHorario");
    var carreraa = $("#nomCarrera");
    $("#nomHorario").empty();
    $('#nomHorario').append('<option selected>--Seleccione--</option>');
    $("#nomCarrera").empty();
    $('#nomCarrera').append('<option selected>--Seleccione--</option>');

    //var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/cargarCarrera.php?jsoncallback=?";
    var url = "http://unitec.260mb.org/PHP/cargarCarrera.php?jsoncallback=?";
    $.getJSON(url, { materiaJ:materia}).done(function(data) {    
      $.each(data, function(i,item){
        var agregaC = '<option value="'+item.Id_Carrera+'">'+item.Nombre_Carrera+'</option>';
        carreraa.append(agregaC);
      });
    });  
}

function cargarHorario(){
    $('#lali').empty();
    //Toma El Valor Del Select De La Carrera    
    var carrera = $('#nomCarrera option:selected').text();
    var materia = $('#nomMateria option:selected').text();
    var horario = $("#nomHorario");
    $("#nomHorario").empty();
    $('#nomHorario').append('<option selected>--Seleccione--</option>');
    
    //var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/cargarHorario.php?jsoncallback=?"
    var url = "http://unitec.260mb.org/PHP/cargarHorario.php?jsoncallback=?";
    $.getJSON(url, { carreraJ:carrera, materiaJ:materia}).done(function(data) {    
    $.each(data, function(i,item){
      var agregaH = '<option value="'+item.Id_HorarioCarreraMateria+'">'+item.Dia+ " De " + item.Hora_Inicio+ " a " +item.Hora_Fin+'</option>';
       horario.append(agregaH);
     });
  });
}

function cargarAlumnos(){

    $('#jnk').empty();
    var horario = $('#nomHorario').val();
    var alumnos = $('#jnk');
    //JSON
    //var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/cargarAlumnos.php?jsoncallback=?";
    var url = "http://unitec.260mb.org/PHP/cargarAlumnos.php?jsoncallback=?";
    $.getJSON(url, { horarioJ:horario})
    .done(function(data){    var cant=0;
        $.each(data, function(i,item){
           var agregaA = '<li class="item"><span class="sub-item">'+item.Nombre+' '+item.Apellido+' C.I: '+item.Cedula+'</span><span class="sub-item">Nota : <label>'+item.Id_Nota_Estudiante+'</label></span>  </li>';
            $('#hiden1').show();  
            alumnos.append(agregaA);     

        });
    });  
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