function init_grillas(){
    var datos_grid_sircreb = new GridParam({
        id_menu: v_id_menu,
        n_grid: 0,
        n_orden: 0,
        m_autoquery:'N',
    });

    $("#grid_sircreb").jqGrid({
        colNames: datos_grid_sircreb.colNames(),
        colModel: datos_grid_sircreb.colModel(),
        pager: $('#grid_sircreb_pager'),
        caption: "Detalle de Retenciones",
        postData: datos_grid_sircreb.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortorder:'asc',
        sortname:'f_alta',
        height: 180,  
        }).navGrid('#grid_sircreb_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    ).navButtonAdd('#grid_sircreb_pager',
    {
        caption: "Generar TXT",
        buttonicon:"",
        position:"right",
        title:"Generar TXT",
        cursor:"pointer",
        onClickButton:function () {
            if($(this).jqGrid('getGridParam','records') == 0){
                mostrar_cuadro('E', 'Error', 'Antes debe ejecutar una busqueda');
                return;
            }
            var anio;
            if($("#anio_padron").val() <= 9){
                anio = '0'+$("#anio_padron").val();
            }
            else{
                anio = $("#anio_padron").val();
            }

             if($("#c_tributo").val() == 10 || $("#c_tributo").val() == 20){
                let params =  {
                    'p_n_id_menu':v_id_menu,
                    'p_id_pad_sircreb': $("#n_padron").val(),
                    'p_n_anio_pad_sircreb': anio,
                    'p_n_mes_pad_sircreb': $("#mes_padron").val(),
                    'p_c_tributo': $("#c_tributo").val(),
                };
                post_to_url(BASEPATH_ENTORNO+'Aplicaciones/modificacion_emision_pad_sircreb/php/generar_txt.php', params ,'_blank', 'POST');
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     "p_cantidad":$(this).jqGrid('getGridParam','records') == 0,
                     "p_id_pad_sircreb": $("#n_padron").val(),
                     "id_menu":100147,
                     "n_orden":1
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            mostrar_cuadro('S', 'Error', 'Proceso finalizado correctamente');
                            return;
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                }); 
             }
        }
    })
}