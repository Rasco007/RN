function soloNumeros(event) {
    const codigoTecla = event.keyCode || event.which;
    const tecla = String.fromCharCode(codigoTecla);

    const soloNumeros = /^[0-9]+$/;

    if (!soloNumeros.test(tecla)) {
        event.preventDefault();
    }
}

function autocompleta_por_id_boleta(){
    $.ajax({
        type:'POST',
        url: "confirmacion_juicios/php/autocomplete.php",
        data: {
            oper:'id_boleta',
            p_id_boleta: $('#id_boleta_deuda').val()
        },
        dataType: 'json',
        success: function( data ) {
            if(data.resultado === 'OK' && data.ID_BOLETA_DEUDA){
                ajax_autocomplete = null;
                $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                $("#c_expediente").val(data.C_EXPEDIENTE);
                $("#n_instancia").val(data.N_INSTANCIA);
                $("#n_orden").val(data.N_ORDEN);
                $("#c_instancia").val(data.C_INSTANCIA);
                $("#d_instancia").val(data.TIPO_INSTANCIA);
                $("#n_cuit").val(data.N_CUIT).mask("99-99999999-9");
                $("#desc_denom").val(data.DESC_DENOM);
                $("#c_tipo_documento").val(data.C_TIPO_DOC);
                $("#n_documento").val(data.N_DOCUMENTO);
                $("#c_sector_origen").val(data.C_SECTOR_ORIGEN);
                $("#sector_origen").val(data.D_SECTOR_ORIGEN);
                $("#f_origen").val(data.F_ORIGEN);
                $("#c_motivo_origen").val(data.C_MOTIVO_ORIGEN);
                $("#motivo_origen").val(data.D_MOTIVO_ORIGEN);
                $("#f_vto").val(data.F_VTO);
                $("#d_resolucion").val(data.D_RESOLUCION);
                $("#f_resolucion").val(data.F_RESOLUCION);
                $("#d_observ").val(data.D_OBSERV);
                $("#f_confirmacion").val(data.F_ORIGEN);

                abrir_grilla_datos();
                $("#id_boleta_deuda").attr('disabled',true);
                $("#btn_confirmar").attr('disabled',false);
                $("#btn_consulta").attr('disabled',true);
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar la Boleta.');
            }
        }
    });
}

function abrir_grilla_datos(){
    setea_parametros('#main_grid_datos_instancia',{':p_id_boleta':$('#id_boleta_deuda').val()});

    document.getElementById('grid_datos_instancia').style.display="block";
    $(window).resize();
}

function confirmar_juicio(){
    if(!$('#f_confirmacion').val()){
        mostrar_cuadro('E', 'Error', 'El campo Fecha de Confirmación no puede quedar vacío.',null,null,400);
    }else{
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
                "p_f_confirmacion":$("#f_confirmacion").val(),
                "p_id_boleta_deuda":$("#id_boleta_deuda").val(),
                "p_c_sector_origen":$("#c_sector_origen").val(),
                "p_modo":p_modo,
                "p_exige_patrocinante":p_exige_patrocinante,
                "id_menu":v_id_menu,
                "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado === 'OK'){
                    mostrar_confirmacion('El Juicio ha sido confirmado satisfactoriamente.');
                    limpiar_campos();
                }
                else{
                    mostrar_error(data.resultado);
                }
            }
        });
    }
}

function limpiar_campos(){
    document.getElementById('grid_datos_instancia').style.display="none";
    document.getElementById('grid_detalle_instancia').style.display="none";
    document.getElementById('totalizador').style.display="none";
    $("#id_boleta_deuda").val(null);
    $("#id_contribuyente").val(null);
    $("#c_expediente").val(null);
    $("#n_instancia").val(null);
    $("#n_orden").val(null);
    $("#c_instancia").val(null);
    $("#d_instancia").val(null);
    $("#n_cuit").val(null);
    $("#desc_denom").val(null);
    $("#c_tipo_documento").val(null);
    $("#n_documento").val(null);
    $("#c_sector_origen").val(null);
    $("#sector_origen").val(null);
    $("#f_origen").val(null);
    $("#c_motivo_origen").val(null);
    $("#motivo_origen").val(null);
    $("#f_vto").val(null);
    $("#d_resolucion").val(null);
    $("#f_resolucion").val(null);
    $("#d_observ").val(null);
    $("#f_confirmacion").val(null);

    $('#sum_adeudado').val(null);
    $('#sum_interes').val(null);
    $('#sum_actualizado').val(null);

    $("#main_grid_datos_instancia").jqGrid("clearGridData");
    $("#main_grid_detalle_instancia").jqGrid("clearGridData");

    $("#btn_confirmar").attr('disabled',true);
    $("#btn_consulta").attr('disabled',false);
    $("#id_boleta_deuda").attr('disabled',false);
}