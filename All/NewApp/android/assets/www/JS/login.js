$(document).on("ready",start);

var galleta = $.cookie('usuario');
function start(){
   //$('#submitButton').on('submit',checkStatus);
   $('#submitButton').on('submit',login)
  
}
