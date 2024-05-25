function inicializarEventos() {

    document.getElementById('grid_planes_de_pago').style.display="none";
    $("#mascara_lupa_c_tipo_imponible").hide();

    $('#btn_buscar').click(function(){
        $('#main').procOverlay({visible:true});
        if (!$('#d_tipo_imponible').val()){
            mostrar_cuadro('E', 'Error', 'Debe ingresar Tipo Imponible.',null,null,350);
            $('#main').procOverlay({visible:false});
            return;
        }
        if (!$('#d_objeto_hecho').val()){
            mostrar_cuadro('E', 'Error', 'Debe ingresar Objeto/Hecho.',null,null,350);
            $('#main').procOverlay({visible:false});
            return;
        }else{
            buscar();
        }
    });

    $('#btn_limpiar').click(function(){
        $('#c_tipo_imponible').val(null);
        $('#d_tipo_imponible').val(null);
        $('#d_objeto_hecho').val(null);
        $('#c_tipo_imponible').attr('disabled',false);
        $('#d_tipo_imponible').attr('disabled',false);
        $('#d_objeto_hecho').attr('disabled',false);
        document.getElementById('grid_planes_de_pago').style.display="none";
        $('#main_grid_planes_de_pago').clearGridData();
        $('#lupa_c_tipo_imponible').show().css('display', 'table-cell');
        $("#mascara_lupa_c_tipo_imponible").hide();
        $('#btn_buscar').attr('disabled',false);
    });
}

