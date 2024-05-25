function inicializarGrillas(){

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        postData: datos_main_grid.postData(),
        pager: $('#main_grid_pager'),
        caption: "Obligaciones",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        sortname: 'id_obligacion',
        sortorder: 'desc',
        onSelectRow: function(rowid){
            if($("#main_grid").getCell(rowid,'m_intimacion') == 'S'){
                mostrar_validacion('La obligación tiene una intimación. No puede continuar.');
                $("#id_oblig_ajustada").val('');
                $("#ajustes_obligacion").hide();
            }else if ($("#main_grid").getCell(rowid,'m_intimacion') != 'N' && $("#main_grid").getCell(rowid,'m_intimacion') != 'D') {
                mostrar_validacion('Debe regularizar la situación de la obligación ante COF.');
                $("#id_oblig_ajustada").val('');
                $("#ajustes_obligacion").hide();
            }else{
                $("#id_oblig_ajustada").val($("#main_grid").getCell(rowid,'id_obligacion'));
                $("#ajustes_obligacion").show();
                $("#frm_detalle_mov input, #frm_detalle_ajuste input").val(null);
                $("#f_ajuste, #c_concepto_mov_ajuste",'#frm_detalle_ajuste').attr('readonly',false);
                $("#m_deb_cred_ajuste, .datepicker").attr('disabled',false).selectpicker('val','');
                $("#btn_lupa_concepto_mov_ajuste").show();
                $('#m_deb_cred').prop('checked',true).click();
            }
        },
        loadComplete: function () {
            gridParentWidth = $('#gbox_main_grid').parent().parent().width();
            $('#main_grid').setGridWidth(gridParentWidth);
        },
        gridComplete: function() {
            if($('#main_grid').getGridParam('postData').m_autoquery == 'S'){
                if($(this).jqGrid('getGridParam','records') == 0){
                    mostrar_cuadro('I', 'Atención', 'No se han encontrado obligaciones para la consulta realizada ', '', '', 400, 200);
                    deshabilita_campos('#frm_contrib',false);
                    deshabilita_campos('#frm_oblig',false);
                    $("#btn_aplicar_ajuste").attr('disabled',true);
                }
            }

        },
    }).navGrid('#main_grid_pager', {add:false,edit:false,del:false});

    $("#cta_cte_grid").jqGrid({
        colNames: datos_cta_cte_grid.colNames(),
        colModel: datos_cta_cte_grid.colModel(),
        postData: datos_cta_cte_grid.postData(),
        pager: $('#cta_cte_grid_pager'),
        caption: "Cuenta Corriente",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        sortname: 'n_secuencia_obl',
        sortorder: 'desc',
        autowidth:false,
        ondblClickRow: function(rowid){
            /* Asigna los valores al bloque de Detalle del Movimiento a Ajustar */
            $("#c_tipo_mov",'#frm_detalle_mov').val($("#cta_cte_grid").getCell(rowid,'c_tipo_movi'));
            $("#d_tipo_mov",'#frm_detalle_mov').val($("#cta_cte_grid").getCell(rowid,'d_tipo_movi'));
            $("#c_concepto_mov",'#frm_detalle_mov').val($("#cta_cte_grid").getCell(rowid,'c_concepto_mov'));
            $("#d_concepto_mov",'#frm_detalle_mov').val($("#cta_cte_grid").getCell(rowid,'d_concepto_mov'));
            $("#i_importe_mov",'#frm_detalle_mov').val($("#cta_cte_grid").getCell(rowid,'i_movimiento'));
            $("#c_tipo_moneda",'#frm_detalle_mov').val($("#cta_cte_grid").getCell(rowid,'c_moneda'));
            $("#d_tipo_moneda",'#frm_detalle_mov').val($("#cta_cte_grid").getCell(rowid,'d_moneda'));
            $("#f_movimiento",'#frm_detalle_mov').val($("#cta_cte_grid").getCell(rowid,'f_movimiento'));

            /* Asigna los valores al bloque de Detalle del Ajuste */
            $("#f_ajuste",'#frm_detalle_ajuste').val($("#cta_cte_grid").getCell(rowid,'f_movimiento'));
            $("#c_concepto_mov_ajuste",'#frm_detalle_ajuste').val($("#cta_cte_grid").getCell(rowid,'c_concepto_mov'));
            $("#d_concepto_mov_ajuste",'#frm_detalle_ajuste').val($("#cta_cte_grid").getCell(rowid,'d_concepto_mov'));
            $("#i_importe_ajuste",'#frm_detalle_ajuste').val(redondear(Math.abs(parse($("#cta_cte_grid").getCell(rowid,'i_movimiento'))),2));
            $("#c_tipo_moneda_ajuste",'#frm_detalle_ajuste').val($("#cta_cte_grid").getCell(rowid,'c_moneda'));
            $("#d_tipo_moneda_ajuste",'#frm_detalle_ajuste').val($("#cta_cte_grid").getCell(rowid,'d_moneda'));
            $("#n_secuencia_rel",'#frm_detalle_ajuste').val($("#cta_cte_grid").getCell(rowid,'n_secuencia_rel'));

            if($("#cta_cte_grid").getCell(rowid,'m_debe') == 'D'){
                $("#m_deb_cred_ajuste",'#frm_detalle_ajuste').selectpicker('val','C');
            }else{
                $("#m_deb_cred_ajuste",'#frm_detalle_ajuste').selectpicker('val','D');
            }

            $("#f_ajuste, #c_concepto_mov_ajuste, #c_tipo_moneda_ajuste,#i_importe_ajuste",'#frm_detalle_ajuste').attr('readonly',true);
            $("#m_deb_cred_ajuste, .datepicker").attr('disabled',true);
            $("#btn_lupa_concepto_mov_ajuste").hide();

            $("#modal_cons_cta_cte").modal('hide');
        }
    }).navGrid('#cta_cte_grid_pager', {add:false,edit:false,del:false});
}