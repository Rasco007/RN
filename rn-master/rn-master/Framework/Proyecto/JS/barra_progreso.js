var barra_progreso_prog_id = null;
var barra_progreso_interval_id = null;

function barra_progreso(iniciar){
    if(iniciar){
        barra_progreso_prog_id = $("#main").barraProceso({visible:true});
        barra_progreso_interval_id = setInterval(dummy_callback, 30000); // 30 segundos
    } else {
        barra_progreso_prog_id = $("#main").barraProceso({visible:false});
        clearInterval(barra_progreso_interval_id);
    }
}

function dummy_callback(){
    $.ajax({
        url: FUNCIONES_BASEPATH_PROY + "dummy_base.php",
        type:"POST",
        async:true,
        dataType:'json',
        beforeSend: function(xhr, settings){}
    });
}