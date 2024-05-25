function inicializarGrillas(){

    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"Cuotas" ,
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortorder:'desc',
        autowidth: false,
        height:300,
        loadComplete:function(){
            calcular_totales();
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    ).navButtonAdd('#main_grid_pager',
    {
        title:"Eliminar",
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-trash",
        cursor:"pointer",
        onClickButton:function() {
            if(!$("#main_grid").getGridParam('selrow')){
                mostrar_error('Debe seleccionar una fila de la Tabla.');
                return false;
            }else{
                var id = $("#main_grid").getGridParam('selrow');
                mostrar_cuadro('C','Eliminar Cuota','Esto eliminará la Cuota seleccionada <br>¿Desea continuar?',
                    function () {
                        var params = {
                            p_c_concepto:$('#main_grid').getCell(id,'c_concepto'),
                            p_pos_fiscal:$('#main_grid').getCell(id,'posicion_fiscal'),
                            p_n_cuota:$('#main_grid').getCell(id,'n_cuota'),
                            p_f_vto:$('#main_grid').getCell(id,'f_vencimiento_pago'),
                            p_c_concepto_mov: $('#main_grid').getCell(id,'c_concepto_mov'),
                            p_i_capital: $('#main_grid').getCell(id,'i_capital').replace(/\./g, '').replace(',', '.'),
                            p_i_interes: $('#main_grid').getCell(id,'i_interes').replace(/\./g, '').replace(',', '.'),
                            p_i_total: $('#main_grid').getCell(id,'i_total').replace(/\./g, '').replace(',', '.'),
                            p_id_obligacion:$('#main_grid').getCell(id,'id_obligacion'),
                            p_id_ing_indiv_pagos_def: id_ing_indiv_pagos_def,
                            p_n_fila: $('#main_grid').getCell(id,'n_fila'),
                            id_menu: v_id_menu,
                            n_orden: 3,
                            p_oper: 'B'
                        };
                        abm_cuotas(params);
                    });
            }
        }
    }
    ).navButtonAdd('#main_grid_pager',
    {
        title:"Editar",
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-edit",
        cursor:"pointer",
        onClickButton:function() {
            if(!$("#main_grid").getGridParam('selrow')){
                mostrar_error('Debe seleccionar una fila de la Tabla.');
                return false;
            }else{
                $('#p_oper').val('E');
                var id = $("#main_grid").getGridParam('selrow');
                clear_modal_inputs();
                set_modal_inputs(id);
                $('#bono_title').text('Edición de Cuota'); 
                $('#abm_modal').modal("show");
            }
        }
    }
    ).navButtonAdd('#main_grid_pager',
    {
        title:"Alta",
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-plus",
        cursor:"pointer",
        onClickButton:function() {
            $('#p_oper').val('A');
            clear_modal_inputs();
            $('#bono_title').text('Alta de Cuota'); 
            $('#abm_modal').modal("show");

        }
    }
    );
}