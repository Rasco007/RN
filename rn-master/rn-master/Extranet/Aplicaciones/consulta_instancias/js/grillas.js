function init_grillas() {
    $("#instancias_grid").jqGrid({
        colNames: consulta_inst_grid.colNames(),
        colModel: consulta_inst_grid.colModel(),
        postData: consulta_inst_grid.postData(),
        caption: "Instancias",
        pager: $('#instancias_grid_pager'),
        autowidth: false,
        width: 960,
        sortname: "n_instancia",
        sortorder: " desc, n_orden asc ,id_contribuyente asc",
        ondblClickRow: function(id){
            $('#main').procOverlay({visible:true});
            var v_n_instancia = $("#instancias_grid").getCell(id,"n_instancia");
            var v_n_orden = $("#instancias_grid").getCell(id,"n_orden");
            $.ajax({
                url: "consulta_instancias/consultas_ajax.php",
                type:"POST",
                dataType: 'JSON',
                data:{ p_oper:'detalle_instancia',
                    n_instancia: v_n_instancia,
                    n_orden: v_n_orden
                },
                success: function(response){
                    $('#main').procOverlay({visible:false});
                    if (response.id_obligacion){
                        if (parse(response.id_obligacion) > 190000000000){
                            inicializa_instancia_det_grid(v_n_instancia,v_n_orden);
                            
                            abrir_modal("#modal_instancia_det");
                            setea_parametros('#instancia_det_grid',{
                                ':n_instancia': v_n_instancia,
                                ':n_orden': v_n_orden}, 'S'
                            );
                        }else{
                            inicializa_instancia_det_sellos_grid(v_n_instancia,v_n_orden);
                            abrir_modal("#modal_instancia_det_sellos");
                            setea_parametros('#instancia_det_sellos_grid',{
                                ':n_instancia': v_n_instancia,
                                ':n_orden': v_n_orden}, 'S'
                            );
                        }
                    }else{
                        mostrar_error('La instancia no posee detalle.');
                    }
                }
            });
        }
    }).navGrid('#instancias_grid_pager',{add:false, edit:false, del:false});
}

function inicializa_instancia_det_grid(n_instancia,n_orden){
    instancia_det_grid = new GridParam({
        id_menu: id_menu,
        n_grid:1,
        m_autoquery: 'S',
        param:{
            ':n_instancia': n_instancia,
            ':n_orden': n_orden
        }
    });

    $("#instancia_det_grid").jqGrid({
        colNames: instancia_det_grid.colNames(),
        colModel: instancia_det_grid.colModel(),
        postData: instancia_det_grid.postData(),
        caption: "Detalle de Instancias",
        pager: $('#instancia_det_grid_pager'),
        autowidth: false,
        width: 960,
        sortname: "id_obligacion",
        sortorder: "asc",
        loadComplete:function(){
            $("#i_sum_deuda").val($("#instancia_det_grid").getCell(1,"i_sum_deuda"));
            $("#i_sum_det").val($("#instancia_det_grid").getCell(1,"i_sum_det"));
            $("#i_sum_int").val($("#instancia_det_grid").getCell(1,"i_sum_int"));
            $("#i_sum_act").val($("#instancia_det_grid").getCell(1,"i_sum_act"));
        }
    }).navGrid('#instancia_det_grid_pager',{add:false, edit:false, del:false});
}

function inicializa_instancia_det_sellos_grid(n_instancia,n_orden){
    instancia_det_sellos_grid = new GridParam({
        id_menu: id_menu,
        n_grid:2,
        m_autoquery: 'S',
        param:{
            ':n_instancia': n_instancia,
            ':n_orden': n_orden
        }
    });

    $("#instancia_det_sellos_grid").jqGrid({
        colNames: instancia_det_sellos_grid.colNames(),
        colModel: instancia_det_sellos_grid.colModel(),
        postData: instancia_det_sellos_grid.postData(),
        caption: "Detalle de Instancias de Sellos",
        pager: $('#instancia_det_sellos_grid_pager'),
        autowidth: false,
        width: 960,
        loadComplete:function(){
            $("#i_total_impuesto").val($("#instancia_det_sellos_grid").getCell(1,"i_total_impuesto"));
            $("#i_total_interes").val($("#instancia_det_sellos_grid").getCell(1,"i_total_interes"));
            $("#i_total_multas").val($("#instancia_det_sellos_grid").getCell(1,"i_total_multas"));
            $("#i_total_fojas").val($("#instancia_det_sellos_grid").getCell(1,"i_total_fojas"));
            $("#i_total_determinado").val($("#instancia_det_sellos_grid").getCell(1,"i_total_determinado"));
        }
    }).navGrid('#instancia_det_sellos_grid_pager',{add:false, edit:false, del:false});
}