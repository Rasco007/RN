function init_grillas(){

    
    
        $("#main_grid").jqGrid({
            colNames: main_grid_datos.colNames(),
            colModel: main_grid_datos.colModel(),
            pager: $('#main_grid_pager'),
            postData: main_grid_datos.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
            shrinkToFit: true,
            height: 180,
            // sortname:'rownum',
            sortorder:'asc',
            loadComplete: function(){
            },
            ondblClickRow: function (rowid) {
                post_to_url('detalle_cuenta_corr.php', {
                    'n_cuit': $('#n_cuit').val(),
                    'id_obligacion': $("#main_grid").getCell(rowid,'id_obligacion'),
                    'n_cuota': $("#main_grid").getCell(rowid,'cuota'), 
                    'p_n_id_menu': 10854
                }, 
                '_blank'
                );
            }
        });

    
        $("#secondary_grid").jqGrid({
            colNames: secondary_grid_datos.colNames(),
            colModel: secondary_grid_datos.colModel(),
            pager: $('#secondary_grid_pager'),
            postData: secondary_grid_datos.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
            shrinkToFit: true,
            height: 180,
            rowNum: 1000,
            sortname:'c_tributo, d_objeto_hecho, n_cuota',
            sortorder:'asc',
            loadComplete: function(){
                let v_total = $("#secondary_grid").getCell(1,'saldo_total');
                if(v_total){
                    let v_total_limpio = v_total.replaceAll('.', '');
                    v_total_limpio = v_total_limpio.replaceAll(',', '.');
                    $("#i_total_cuotas").val(formatear_numero(Math.abs(parseFloat(v_total_limpio))));
                    let pElement = document.getElementById("texto_saldo");
                    if (parse(v_total_limpio) > 0) {
                        pElement.textContent = "SALDO A FAVOR DEL CONTRIBUYENTE";
                        pElement.style.color = "red";
                    } else {
                        if (parse(v_total_limpio) < 0) {
                            pElement.textContent = "SALDO A FAVOR DE DGR";
                            pElement.style.color = "green";
                        }else{
                            pElement.style.color = "white";
                        }
                    }
                }
            },
            ondblClickRow: function (rowid) {
                post_to_url('detalle_cuenta_corr.php', {
                    'n_cuit': $('#n_cuit').val(),
                    'id_obligacion': $("#secondary_grid").getCell(rowid,'id_obligacion'),
                    // 'n_pos_fiscal': $("#secondary_grid").getCell(rowid,'n_pos_fiscal'),
                    'n_cuota': $("#secondary_grid").getCell(rowid,'n_cuota'), 
                    'p_n_id_menu': 10854
                }, 
                '_blank'
                );
            }
        });

        $("#honorarios_grid").jqGrid({
            colNames: honorarios_grid.colNames(),
            colModel: honorarios_grid.colModel(),
            pager: $('#honorarios_grid_pager'),
            caption: "Datos Generales",
            postData: honorarios_grid.postData(),
            autowidth: false,
            width: 1400,
            height: 60,
            sortname: 'c_tipo_plan_pago, n_plan_pago, f_vig_desde, n_cuit_acreedor',
            sortorder: 'asc',
            loadComplete: function(){
                if($('#honorarios_grid').getGridParam('records') > 0){
                    $('#honorarios_grid').jqGrid('setSelection', 1);
                }
            },
            onSelectRow: function(id){
                $('#d_denominacion_rc').val($('#honorarios_grid').getCell(id, 'd_denominacion_rc'));
                $('#d_caracter_rc').val($('#honorarios_grid').getCell(id, 'd_caracter_rc'));
                $('#d_acredita_rc').val($('#honorarios_grid').getCell(id, 'd_acredita_rc'));
                $('#n_cuit_patrocinante').val($('#honorarios_grid').getCell(id, 'n_cuit_patrocinante'));
                $('#d_patrocinante').val($('#honorarios_grid').getCell(id, 'd_patrocinante'));
            }
        }).navGrid('#honorarios_grid_pager',
            {add:false, edit:false, del:false}, //options
            {}, // edit options
            {}, // add options
            {}, // del options
            {} // search options
        );
    
    
        $("#relacionados_grid").jqGrid({
            colNames: relacionados_grid.colNames(),
            colModel: relacionados_grid.colModel(),
            pager: $('#relacionados_grid_pager'),
            caption: "Planes de Pago Relacionados",
            postData: relacionados_grid.postData(),
            autowidth: false,
            width: 1400,
            height: 100,
            shrinkToFit: true,
            sortname: 'c_tipo_plan_pago, n_plan_pago, c_tipo_plan_pago_rel, n_plan_pago_rel',
            sortorder: 'asc',
        }).navGrid('#relacionados_grid_pager',
            {add:false, edit:false, del:false}, //options
            {}, // edit options
            {}, // add options
            {}, // del options
            {} // search options
        );

        $("#resumen_grid").jqGrid({
            colNames: resumen_grid.colNames(),
            colModel: resumen_grid.colModel(),
            pager: $('#resumen_grid_pager'),
            caption: "Planes de Pago resumen",
            postData: resumen_grid.postData(),
            autowidth: false,
            width: 1400,
            height: 180,
            sortname: 'n_plan_pago',
            sortorder: 'asc',
        }).navGrid('#resumen_grid_pager',
            {add:false, edit:false, del:false}, //options
            {}, // edit options
            {}, // add options
            {}, // del options
            {} // search options
        );
}