$(document).on("ready",start);

 var galleta = $.cookie('usuario');
function start(){
   cargarNotaAlumno();
   loadName();
}

function cargarNotaAlumno(){
     
    var lista=$("#notasA");
    var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/notaAlumno.php?jsoncallback=?";
    var cont = 0;
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
                agregarM = '<li class="divider blueGray">'+item.mat+'</li><li class="divider cont"><h5 class="ui-li-aside ui-li-heading">'+item.nota+'</h5><h4 class="ui-li-heading"> Examen: '+ cant2 +'</h4>'; 
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

function loadName(){
  var nameUsr = $('#nameUsr');
  var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/cargarNombre.php?jsoncallback=?";
  $.getJSON(url, {cedula:galleta}).done(function(data){
    $.each(data,function(i,item){
      nameUsr.text("Prof. "+item.nom +" "+ item.app);
    })
      
  });
}