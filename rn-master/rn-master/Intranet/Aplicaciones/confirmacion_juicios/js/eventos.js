function inicializarEventos() {
    document.getElementById('grid_detalle_instancia').style.display="none";
    document.getElementById('grid_datos_instancia').style.display="none";
    document.getElementById('totalizador').style.display="none";

    $("#btn_confirmar").attr('disabled',true);

    $('#btn_consulta').click(function(){
        $('#main').procOverlay({visible:true});
        if (!$('#id_boleta_deuda').val()){
            mostrar_cuadro('E', 'Error', 'El campo Boleta de Deuda no puede quedar vacío.',
                null,null,400);
            $('#main').procOverlay({visible:false});
        }else{
            autocompleta_por_id_boleta();
        }
    });

    $('#btn_confirmar').click(function(){
        confirmar_juicio();
    });

    $('#btn_limpiar').click(function(){
        limpiar_campos();
    });

}

