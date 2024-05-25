function init_eventos(){


    $("#btn-cargar-archivo").click(function(){
        var valido = $('#frm_ingreso_de_archivos_banelco').validationEngine('validate');
        if(valido) {
            $('#main').procOverlay({visible: true});
            procesar_archivo('PROCESAR_ARCHIVOS', 'path_arch_recibido', 'd_path_arch_recibido');
        };
    });

    $("#cancelar").click(function(){

        $("#ruta_archivo_recibido").val("");

        $("#path_arch_recibido").val("");
        $("#d_path_arch_recibido").val("");

        $("#n_remesa").val("");
        $("#pagos_ok").val("");

        
    });

}