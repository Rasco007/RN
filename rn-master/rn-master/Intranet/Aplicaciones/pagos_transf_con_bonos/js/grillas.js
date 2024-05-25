function init_grillas(){
    datos_grid_transf_bonos = new GridParam({
        id_menu: v_id_menu,
        n_grid: 0,
        m_autoquery:'N',
        param:{}
    });

    datos_grid_aplicacion_bonos = new GridParam({
        id_menu: v_id_menu,
        n_grid: 1,
        m_autoquery:'N',
        param:{}
    });

    crea_grilla_bonos();
    crea_grilla_aplicacion();

    function crea_grilla_aplicacion(){
        $("#grid_aplicacion_bonos").jqGrid({
            colNames: datos_grid_aplicacion_bonos.colNames(),
            colModel: datos_grid_aplicacion_bonos.colModel(),
            pager: $('#grid_aplicacion_bonos_pager'),
            postData: datos_grid_aplicacion_bonos.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
            shrinkToFit: true,
            height: 180,
            gridComplete: function() {
                
            },       
            })
    }
    
    function crea_grilla_bonos(){
        $("#grid_tranf_bonos").jqGrid({
        colNames: datos_grid_transf_bonos.colNames(),
        colModel: datos_grid_transf_bonos.colModel(),
        pager: $('#grid_tranf_bonos_pager'),
        postData: datos_grid_transf_bonos.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        shrinkToFit: true,
        sortname:'n_posicion_fiscal,n_cuota_anticipo',
        sortorder:'asc',
        height: 180,
          
        gridComplete: function() {
            
        },       
            loadComplete: function(){
                let cuit = $('#grid_tranf_bonos').getCell(1,'n_cuit');
                let denominacion = $('#grid_tranf_bonos').getCell(1,'d_denominacion');
                let f_vto = $('#grid_tranf_bonos').getCell(1,'f_vto');
                let f_emision = $('#grid_tranf_bonos').getCell(1,'f_emision');
                let suma_importes = $('#grid_tranf_bonos').getCell(1,'suma_importes');
                
                if(cuit && denominacion){
                    $('#n_cuit').val(cuit);
                    $('#d_denominacion').val(denominacion);
                    $('#fecha_vto').val(f_vto);
                    $('#fecha_emision').val(f_emision);
                    $('#importe').val(suma_importes);

                    var cuit_sin_guiones = cuit.replace('-','').replace('-','');


                     /*-----------------------------------*/
                    $.ajax({
                        type:'POST',
                        url: FUNCIONES_BASEPATH+'maestro_abm.php',
                        data:{      
                        "p_c_tributo":$('#grid_tranf_bonos').getCell(1,'c_tributo'),
                        "p_c_concepto":$('#grid_tranf_bonos').getCell(1,'c_concepto'),
                        "p_n_posicion_fiscal":$('#grid_tranf_bonos').getCell(1,'n_posicion_fiscal'),
                        "p_n_cuit":cuit_sin_guiones,
                        "p_n_cuota_anticipo":$('#grid_tranf_bonos').getCell(1,'n_cuota_anticipo'),
                        "p_id_obligacion":$("#nro_comprobante").val(),
                        "id_menu":v_id_menu,
                        "n_orden":3
                        },
                        dataType:'json',
                        success: function( data ) {
                            if(data.resultado == 'OK'){
                                f_vto_2 = data.p_f_vencimiento_2
                                importe_saldo = data.p_i_vencimiento_1;
                                if(importe_saldo == null){
                                    importe_saldo = data.p_i_vencimiento_2;
                                }
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
        .navGrid('#grid_tranf_bonos_pager',
        {add:false, edit:false, del:false},
        {}, //edit
        {}, //add
        {} //del
    );
    }
}