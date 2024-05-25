function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "carga_inspecciones/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getContribuyente',p_filtro: cuit_sin_guiones},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#d_denominacion").val(res['DENOMINACION']);
                $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
            }else{
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
            }
        }
    });
}

function redirigir(id_insp) {
    let rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
    if ($("#main_grid").getCell(rowid, 'c_estado') == 5 || parse($('#main_grid').getCell(rowid, 'estado_confirmacion')) == 0){

        if ($("#main_grid").getCell(rowid, 'n_cant_pos_sin_allanar') == 0){
            mostrar_cuadro('I','Reabrir Inspección','No es posible reabrir la inspeccion debido a que todas las posiciones fiscales se encuentran impactadas en Cuenta Corriente.')
        }else{
            mostrar_cuadro(
                'C',
                'Reabrir Inspección',
                'La inspección se encuentra actualmente cerrada o sin instancias de carga activas.<br>¿Desea reabrirla?',
                function () {
                            post_to_url("carga_inspec_iibb.php", {
                                'p_n_id_menu': 10769,
                                'p_id_inspeccion': id_insp},
                                "_blank",
                                "POST");

                        $('#main_grid').trigger('reloadGrid');
                        $('#btn_ocultar_detalle').click();
                    },
                function () {
                    return;
                })
        }
    }else{
        post_to_url("carga_inspec_iibb.php", {
                'p_n_id_menu': 10769,
                'p_id_inspeccion': id_insp},
            "_blank","POST");
        $('#main_grid').trigger('reloadGrid');
        $('#btn_ocultar_detalle').click();
    }
    //post_to_url('carga_inspec_iibb.php',{'p_id_inspeccion':id_insp},'_blank','POST');
}