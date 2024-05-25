function mayusculas(e) {
    e.value = e.value.toUpperCase();
}

function deshabilita_campos(v_o_f){
    $(".limpiar","#frm_consulta").attr('readonly',v_o_f);
}

function valida_seleccion_grilla(id_grid){
    var rowid = $(id_grid).getGridParam('selrow');
    if (rowid) {
        return rowid;
    }else{
        mostrar_validacion('Debe seleccionar un registro de la grilla para operar.');
        return false;
    }
}

function autocompleteDominio(formid){
    $("#d_objeto",formid).autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "gestion_telepeaje/autocomplete.php",
                data: { p_oper:'getDominio', p_filtro: request.term},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.dominios, function( item ) {
                                    return {
                                        label: item.label,
                                        value: item.objeto
                                    }
                                })
                            );
                        }
                    }
                });
        },
        minLength:1,
        select:function(event,ui){
            $("#d_objeto",formid).val(ui.item.value);
            return false;
        }
    });
}

function autocompletecuitdenominacion(formid){
    //Completamos Datos del Contribuyente
    $("#d_denominacion",formid).autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "gestion_telepeaje/autocomplete.php",
                data: { p_oper:'getAutocomplete', p_filtro: request.term},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.data_contrib, function( item ) {
                                    return {
                                        label: item.label,
                                        value: item.razon_social,
                                        cuit: item.cuit,
                                        id_contribuyente: item.id_contribuyente
                                    }
                                })
                            );
                        }
                    }
                });
        },
        minLength:1,
        select:function(event,ui){
            $("#d_denominacion",formid).val(ui.item.value);
            $("#n_cuit",formid).val(ui.item.cuit);
            $("#id_contribuyente",formid).val(ui.item.id_contribuyente);
            return false;
        }
    });

    $("#n_cuit",formid).mask("99-99999999-9");
    $('#n_cuit',formid).change(function (){
        if ($('#n_cuit',formid).val() && $('#n_cuit',formid).val().length == 13){
            completarDenominacion(formid);
        }else{
            $("#d_denominacion",formid).val(null);
            $("#n_cuit",formid).val(null);
            $("#id_contribuyente",formid).val(null);
        }
    });
}

function completarDenominacion(formid){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit',formid).val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "gestion_telepeaje/autocomplete.php",
        type:"POST",
        data:{ p_oper:'getContribuyente', p_filtro: cuit_sin_guiones},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#d_denominacion",formid).val(res['DENOMINACION']);
                $("#id_contribuyente",formid).val(res['ID_CONTRIBUYENTE']);
            }else{
                $("#d_denominacion",formid).val(null);
                $("#id_contribuyente",formid).val(null);
            }
        }
    });
}

function prc_modif_id_contrib(d_objeto,id_contrib_new){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_d_objeto_hecho":d_objeto,
         "p_id_contrib_new":id_contrib_new,
         "id_menu":10793,
         "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $("#modificacion_datos").modal('hide');
                mostrar_confirmacion('El contribuyente asociado al dominio elegido ha sido actualizado correctamente.');
                $("#main_grid").trigger('reloadGrid');
            }
            else{
                mostrar_error(data.resultado);
                return;
            }
        }
    }); 
}