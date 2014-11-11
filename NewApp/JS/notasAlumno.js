$(document).on("ready",start);

 var galleta = $.cookie('usuario');
function start(){
   cargarNotaAlumno();
   loadName();
}

function cargarNotaAlumno(){
     
    var lista=$("#notasA");
    //var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/notaAlumno.php?jsoncallback=?";
    var url = "http://unitec.260mb.org/PHP/notaAlumno.php?jsoncallback=?";
    var cont = 0;
    $.getJSON(url).done(function(data) {    
        var cant=0;
        var cant2=0;
        var agregarM, materia="";
  
        $.each(data, function(i,item){
          cant++;
          cant2++;
          if(cant == 1){
            materia = item.mat;
          }

          if(materia == item.mat && cant == 1){
            agregarM = '<li class="divider blueGray ">'+item.mat +'</li><li class="divider cont lightBlueGray border"><span class="nomMat">Corte '+cant2+': '+item.nota+'</span></li>';

              lista.append(agregarM); 
          }
          else if( materia == item.mat && cant != 1){
            agregarM = '<li class="divider cont lightBlueGray border"><span class="nomMat">Corte '+cant2+': '+item.nota+'</span></li> ';
            lista.append(agregarM); 
          }

          else if(materia!= item.mat){
            cant2= 1;
           agregarM += '<li class="divider blueGray ">'+item.mat +'</li><li class="divider cont lightBlueGray border"><span class="nomMat">Corte '+cant2+': '+item.nota+'</span></li>';
          materia = item.mat;
            lista.append(agregarM); 
          }
        });
    });
}

function loadName(){
  var nameUsr = $('#nameUsr');
 //var url = "http://127.0.0.1/UnitecMobileApp/NewApp/PHP/cargarNombre.php?jsoncallback=?";
  var url = "http://unitec.260mb.org/PHP/cargarNombre.php?jsoncallback=?";
  $.getJSON(url, {cedula:galleta}).done(function(data){
    $.each(data,function(i,item){
      nameUsr.text(item.nom +" "+ item.app);
    })
      
  });
}