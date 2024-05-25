function init_grillas() {

    $("#deuda_declarada_grid").jqGrid({
        colNames: datos_deuda_declarada_grid.colNames(),
        colModel: datos_deuda_declarada_grid.colModel(),
        pager: $('#deuda_declarada_grid_pager'),
        postData: datos_deuda_declarada_grid.postData(),
        caption: "Deuda Declarada",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:200,
        rowNum:99999,
        rowList:99999,
        pgbuttons: false,
        pginput:false,
        recordpos:false,
        sortname: 'f_vto_pago',
        sortorder: 'asc',
        ondblClickRow: function(id){
            detalle_deuda(id);

        },
        rowattr: function(row){
            if(row.sel == 'S'){
                $('#deuda_checkbox_'+row.row_id).prop( "checked", true);
            }else{
                $('#deuda_checkbox_'+row.row_id).prop( "checked", false);
                
            }
        },
        loadComplete:function(data){
            setear_evento_checkboxes();
            if(g_ref_2006){
                // Aca al hacer el next_item se deberia llenar la deuda.
                // Si queda deuda sigo, sino paro todo aca.
                
                if (!$('#deuda_declarada_grid').getCell(1,'id_obligacion') && !$('#deuda_declarada_sellos_grid').getCell(1,'id_obligacion')){
                    return;
                }
                
                
                if (param_c_tributo != g_sellos){
                    $("#btn_selec_todo_comun").click();
                }else{
                    $("#btn_selec_todo_sellos").click();
                }
                
                // Bloqueo los campos cabecera y la deuda (marca)
                $('#n_cuit').attr('disabled', true);
                $('#n_cuit').attr('readonly', true);
                
                $('#d_denominacion').attr('disabled', true);
                $('#d_denominacion').attr('readonly', true);
                
                $('#c_tipo_documento').attr('disabled', true);
                $('#c_tipo_documento').attr('readonly', true);
                
                $('#n_documento').attr('disabled', true);
                $('#n_documento').attr('readonly', true);
                
                $('#c_tributo').attr('disabled', true);
                $('#c_tributo').attr('readonly', true);
                $('#lupa_c_tributo').hide();
                
                $('#c_concepto').attr('disabled', true);
                $('#c_concepto').attr('readonly', true);
                $('#lupa_c_concepto').hide();
                
                $('#d_objeto_hecho').attr('disabled', true);
                $('#d_objeto_hecho').attr('readonly', true);
                $('#lupa_d_objeto_hecho').hide();
                
                $('#c_tipo_plan').attr('disabled', true);
                $('#c_tipo_plan').attr('readonly', true);
                $('#lupa_c_tipo_plan').hide();
                
                $('#f_emision').attr('disabled', true);
                $('#f_emision').attr('readonly', true);
                
                $('#c_delegacion').attr('disabled', true);
                $('#c_delegacion').attr('readonly', true);
                $('#lupa_c_delegacion').hide();
                
                $('#d_observaciones').attr('disabled', true);
                $('#d_observaciones').attr('readonly', true);
            
                $('.deuda_checkbox').prop('disabled', true);
                $('#btn_selec_todo_comun').prop('disabled', true);
            
                $('.sellos_checkbox').prop('disabled', true);
                $('#btn_selec_todo_sellos').prop('disabled', true);
            
                $('.rb_deuda').prop('disabled', true);
                
                
                //Hago lo mismo que hace la solapa de PLAN cuando se clickea
                SOLAPA_PLAN(true);
            }
                recargar_sel();
                
        },
    }).navGrid('#deuda_declarada_grid_pager',
        {add:false, edit:false, del:false, beforeRefresh: function(){
            seleccionados_comun = [];
            seleccionados_id = [];

            $('#i_intereses_ori').val("0");
            $('#i_intereses').val("0");
            $('#i_capital').val("0");
            $('#i_capital_ori').val("0");
            $('#i_hist_int_desc').val("0");
            $('#total_seleccionado').val("0,00");}
    }, //options
        {},//edit,
        {},//alta
        {}//del
    );
    
    $("#deuda_declarada_sellos_grid").jqGrid({
        colNames: datos_deuda_declarada_sellos_grid.colNames(),
        colModel: datos_deuda_declarada_sellos_grid.colModel(),
        pager: $('#deuda_declarada_sellos_grid_pager'),
        postData: datos_deuda_declarada_sellos_grid.postData(),
        caption: "Deuda Declarada Sellos",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:200,
        rowNum:2000,
        // sortname: 'f_vig_desde',
        // sortorder: 'asc',
        rowattr: function(row){
            if(row.sel == 'S'){
                $('#sellos_checkbox_'+row.row_id).prop( "checked", true);
            }else{
                $('#sellos_checkbox_'+row.row_id).prop( "checked", false);
            }
        },
        loadComplete:function(data){

        },
    }).navGrid('#deuda_declarada_sellos_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    );

    $("#cuotas_grid").jqGrid({
        colNames: datos_cuotas_grid.colNames(),
        colModel: datos_cuotas_grid.colModel(),
        pager: $('#cuotas_grid_pager'),
        postData: datos_cuotas_grid.postData(),
        caption: "Cuotas",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:200,
        // sortname: 'f_vig_desde',
        // sortorder: 'asc',
        onSelectRow: function(id) {
            
        },
        loadComplete:function(data){
            if(sesion){
                calcular_totales();
            }
        },
    }).navGrid('#cuotas_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    )

    $("#detalle_deuda_grid").jqGrid({
        colNames: datos_detalle_deuda_grid.colNames(),
        colModel: datos_detalle_deuda_grid.colModel(),
        pager: $('#detalle_deuda_grid_pager'),
        postData: datos_detalle_deuda_grid.postData(),
        caption: "Detalle Deuda",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:200,
        // sortname: 'f_vig_desde',
        // sortorder: 'asc',
        onSelectRow: function(id) {
            
        },
        loadComplete:function(data){

        },
    }).navGrid('#detalle_deuda_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    )

    $("#juicios_grid").jqGrid({
        colNames: datos_juicios_grid.colNames(),
        colModel: datos_juicios_grid.colModel(),
        pager: $('#juicios_grid_pager'),
        postData: datos_juicios_grid.postData(),
        caption: "",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:200,
        sortname: 'd_objeto_hecho',
        sortorder: 'asc',
    }).navGrid('#juicios_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    )

    $("#planes_pago_grid").jqGrid({
        colNames: datos_planes_pago_grid.colNames(),
        colModel: datos_planes_pago_grid.colModel(),
        pager: $('#planes_pago_grid_pager'),
        postData: datos_planes_pago_grid.postData(),
        caption: "Planes de Pago Relacionados",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:200,
        // sortname: 'd_objeto_hecho',
        // sortorder: 'asc',
    }).navGrid('#planes_pago_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    ).navButtonAdd('#planes_pago_grid_pager',
    {
        title:"Eliminar",
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-trash",
        cursor:"pointer",
        onClickButton:function() {
            if(!$("#planes_pago_grid").getGridParam('selrow')){
                mostrar_error('Debe seleccionar una fila de la Tabla.');
                return false;
            }else{
                var id = $("#planes_pago_grid").getGridParam('selrow');
                mostrar_cuadro('C','Eliminar Plan Pago Relacional','Esto eliminará el plan de pago seleccionado <br>¿Desea continuar?',
                    function () {
                        var params = {
                            p_id_sesion : sesion,
                            p_n_plan: id,
                            id_menu: v_id_menu,
                            n_orden: 16,
                            p_oper: 'B'
                        };
                        abm_ppr(params);
                    });
            }
        }
    }
    ).navButtonAdd('#planes_pago_grid_pager',
    {
        title:"Alta",
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-plus",
        cursor:"pointer",
        onClickButton:function() {
            $('#p_oper').val('A');
            clear_modal_inputs();
            $('#bono_title').text('Alta de Plan de Pago Relacionados'); 
            $('#abm_modal').modal("show");

        }
    }
    );
    
}

