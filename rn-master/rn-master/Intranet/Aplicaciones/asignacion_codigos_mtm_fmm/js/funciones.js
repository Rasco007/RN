function select_check_main(id){
    var codigo = $("#main_grid").getCell(id, 'p_c_fmcamod');
    var checked = $('#check_select_'+id).is(':checked')?'S':'N';

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_c_fmcamod":codigo,
         "p_c_marca_siat":null,
         "p_id_modelo_siat":null,
         "p_id_descripcion_siat":null,
         "p_check": checked,
         "id_menu":v_id_menu,
         "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#main_grid').trigger('reloadGrid');
                return;
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function select_check_asignados(id){
    var codigo = $("#asignados_grid").getCell(id, 'p_c_fmcamod');
    var checked = $('#check_select_'+id).is(':checked')?'S':'N';

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_c_fmcamod":codigo,
         "p_c_marca_siat":null,
         "p_id_modelo_siat":null,
         "p_id_descripcion_siat":null,
         "p_check": checked,
         "id_menu":v_id_menu,
         "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#asignados_grid').trigger('reloadGrid');
                return;
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function select_check_no_asignados(id){
    var codigo = $("#no_asignados_grid").getCell(id, 'p_c_fmcamod');
    var checked = $('#check_select_'+id).is(':checked')?'S':'N';

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_c_fmcamod":codigo,
         "p_c_marca_siat":null,
         "p_id_modelo_siat":null,
         "p_id_descripcion_siat":null,
         "p_check": checked,
         "id_menu":v_id_menu,
         "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#no_asignados_grid').trigger('reloadGrid');
                return;
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}