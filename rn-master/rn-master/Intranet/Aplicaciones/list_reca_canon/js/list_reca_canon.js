var datos_main_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid:0,
    m_autoquery:v_m_autoquery,
    param:{':n_lote':null}
});

var datos_detalle_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid:1,
    m_autoquery:v_m_autoquery,
    param:{':n_lote':null, ':c_organismo':null}
});

var v_n_lote;

$(document).ready(function() {

    $("#btn_buscar").click(function(){
        if($("#frm_consulta").validationEngine('validate')){
            if(valida_fechas()){
                deshabilita_campos(true);
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     "p_f_acred_desde":$("#f_acred_desde").val(),
                     "p_f_acred_hasta":$("#f_acred_hasta").val(),
                     "id_menu":10764,
                     "n_orden":0
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            v_n_lote = data.p_n_lote
                            setea_parametros('#main_grid',{
                                ':n_lote': v_n_lote
                            });
                        }
                        else{
                            mostrar_error(data.resultado);
                            return;
                        }
                    }
                });
            }else{
                mostrar_validacion('La fecha de acreditación hasta no puede ser menor a la fecha de acreditación desde.');
            }
        }
    });

    $("#btn_limpiar").click(function(){
        $('#main_grid,#detalle_grid').jqGrid('clearGridData');
        $("#f_acred_hasta").datepicker("option", "minDate", null);
        $("#f_acred_desde").datepicker("option", "maxDate", null);
        $(".datepicker").val('');
        v_n_lote = null;
        deshabilita_campos(false);
    });

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Recaudación",
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        onSelectRow: function(rowid){
            setea_parametros("#detalle_grid",{
                ':n_lote':v_n_lote,
                ':c_organismo':$("#main_grid").getCell(rowid,'c_organismo')
            });
        }
    }).navGrid('#main_grid_pager', {refresh:true});

    $("#detalle_grid").jqGrid({
        colNames: datos_detalle_grid.colNames(),
        colModel: datos_detalle_grid.colModel(),
        pager: $('#detalle_grid_pager'),
        caption: "Detalle",
        postData: datos_detalle_grid.postData(),
    	editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
    }).navGrid('#detalle_grid_pager', {refresh:true});

    set_fechas_min_max();
});