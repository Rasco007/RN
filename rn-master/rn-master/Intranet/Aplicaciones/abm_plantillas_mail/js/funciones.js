function guardarOrdenCampos(grid_name){
    var p_rownumbers = '';
    var p_roworders = '';
    var i = 1;
    $('#'+grid_name+' tr.jqgrow').each(function(){//recorre todos los registros
        var id_det = $(this).attr('id');
        p_roworders +=  $("#"+grid_name).getCell(id_det,'n_orden_det')+'/';//segunda columna
        p_rownumbers +=  i+'/';//primer columna
        i += 1;
    });

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
            "p_id_plantilla_mail":v_id_plantilla,
            "p_rownumbers":p_rownumbers,
            "p_roworders":p_roworders,
            "id_menu":v_id_menu,
            "n_orden":3
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                onGuardarOrdenCampos( data, grid_name );
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function onGuardarOrdenCampos(res, grid_name){
    if(res['resultado'] != 'OK'){
        mostrar_cuadro('E','Error', res['resultado'] );
    }else{
        $('#'+grid_name).trigger('reloadGrid');
        desactivarDragDropColumnas(grid_name);
    }
}

function desactivarDragDropColumnas(grid_name){
    $("#"+grid_name).jqGrid('sortableRows', {disabled: true});
    $('#mensaje').hide(300);
    $('#bt_activar_orden_'+grid_name).show();
    $('#bt_aplicar_cambios_orden_'+grid_name).hide();
}

function activarDragDropColumnas(grid_name){
    $("#"+grid_name).jqGrid('sortableRows', {disabled: false});

    $("#"+grid_name).bind('sortstop', function(event, ui) {//evento p/ saber cdo mueve alguna columna
        //$('#bt_aplicar_cambios_orden').show();
    });

    $('#mensaje').show(300);
    $('#bt_activar_orden_'+grid_name).hide();
    $('#bt_aplicar_cambios_orden_'+grid_name).show();
}

function botones_aut(){
    $.ajax({
        url: 'abm_plantillas_mail/php/permiso_autorizacion.php',
        type:"POST",
        data:{},
        async:true,
        dataType:'json',
        success: function(data){
            if(data.resultado == 'OK'){
                if(data.datos[0]){
                    if(data.datos[0]['CANT'] == '0'){
                        $('#btn_aprobar_plantilla').hide();
                        $('#btn_desaprobar_plantilla').hide();
                    }
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function validaListaMails(){
    if($('#d_destinatarios').val()){
        const emails = $('#d_destinatarios').val().split(/\s*;\s*/);
    
        const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    
        for (const email of emails) {
          if (!regex.test(email)) {
            return `El email "${email}" no es válido.`;
          }
        }
    }
}