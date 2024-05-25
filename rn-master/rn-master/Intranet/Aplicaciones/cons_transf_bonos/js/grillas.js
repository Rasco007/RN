function init_grillas() {

    if (n_transfer) {
        datos_grid_transf_bonos = new GridParam({
            id_menu: v_id_menu,
            n_grid: 0,
            m_autoquery: 'S',
            param: {
                ':n_transfer': n_transfer,
                ':c_bono': $("#c_bono").val(),
                ':c_especie': $("#especie").val(),
                ':f_transfer': $("#f_bono").val(),
                ':n_cta_comitente': $("#cta_comitente").val(),
            }
        });
    }
    else {
        datos_grid_transf_bonos = new GridParam({
            id_menu: v_id_menu,
            n_grid: 0,
            m_autoquery: 'N',
            param: {}
        });
    }

    datos_grid_aplicacion_bonos = new GridParam({
        id_menu: v_id_menu,
        n_grid: 1,
        m_autoquery: 'N',
        param: {}
    });


    crea_grilla_bonos();
    crea_grilla_aplicacion();

    function crea_grilla_bonos() {
        $("#grid_tranf_bonos").jqGrid({
            colNames: datos_grid_transf_bonos.colNames(),
            colModel: datos_grid_transf_bonos.colModel(),
            pager: $('#grid_tranf_bonos_pager'),
            postData: datos_grid_transf_bonos.postData(),
            editurl: FUNCIONES_BASEPATH + "maestro_abm.php",
            //shrinkToFit: true,
            height: 180,
            onSelectRow: function (id) {
                seleccionoUnaFila = true;

                var n_transfer = $('#grid_tranf_bonos').getCell(id, 'n_transfer');
                var c_bono = $('#grid_tranf_bonos').getCell(id, 'c_bono');
                var d_bono = $('#grid_tranf_bonos').getCell(id, 'd_bono');
                var c_especie = $('#grid_tranf_bonos').getCell(id, 'c_especie');
                var f_transfer = $('#grid_tranf_bonos').getCell(id, 'f_transfer');
                var n_cta_comitente = $('#grid_tranf_bonos').getCell(id, 'n_cta_comitente');
                var n_cta_cliente = $('#grid_tranf_bonos').getCell(id, 'n_cta_cliente');
                var d_titular = $('#grid_tranf_bonos').getCell(id, 'd_titular');
                var i_valor_nominal = $('#grid_tranf_bonos').getCell(id, 'i_valor_nominal');
                var i_valor_residual = $('#grid_tranf_bonos').getCell(id, 'i_valor_residual');
                var c_descripcion = $('#grid_tranf_bonos').getCell(id, 'c_descripcion');
                var i_cotizacion = $('#grid_tranf_bonos').getCell(id, 'i_cotizacion');
                var i_saldo_pesos = $('#grid_tranf_bonos').getCell(id, 'i_saldo_pesos');
                var i_saldo_bonos = $('#grid_tranf_bonos').getCell(id, 'i_saldo_bonos');
                var i_valor_pesos = $('#grid_tranf_bonos').getCell(id, 'i_valor_pesos');

                $("#btn_aplicacion").click(function () {
                    setea_parametros('#grid_aplicacion_bonos', {
                        ':n_transfer': n_transfer,
                    });
                });

                $("#transferencia_modal").val(n_transfer);
                $("#c_bono_modal").val(c_bono);
                $("#d_bono_modal").val(d_bono);
                $("#especie_modal").val(c_especie);
                $("#f_bono_modal").val(f_transfer);
                $("#valor_nominal").val(i_valor_nominal);
                $("#cotizacion").val(i_cotizacion);
                $("#valor_pesos").val(i_valor_pesos);
                $("#saldo_pesos").val(i_saldo_pesos);
                $("#saldo_bonos").val(i_saldo_bonos);
                $("#v_residual").val(i_valor_residual);
                $("#cta_comitente_modal").val(n_cta_comitente);
                $("#cta_cliente").val(n_cta_cliente);
                $("#titular").val(d_titular);
                $("#descripcion").val(c_descripcion);

                $("#transferencia_aplicacion").val(n_transfer);
                $("#c_bono_aplicacion").val(c_bono);
                $("#d_bono_aplicacion").val(d_bono);
                $("#especie_aplicacion").val(c_especie);
                $("#f_bono_aplicacion").val(f_transfer);
                $("#valor_nominal_aplicacion").val(i_valor_nominal);
                $("#cotizacion_aplicacion").val(i_cotizacion);
                $("#cta_comitente_aplicacion").val(n_cta_comitente);

            },
            gridComplete: function () {
                $("#contenedor_btn").show();
            },
            loadComplete: function () {
            }
        })
            .navGrid('#grid_tranf_bonos_pager',
                { add: false, edit: false, del: false },
                {}, //edit
                {}, //add
                {} //del
            );
    }

    function crea_grilla_aplicacion() {
        $("#grid_aplicacion_bonos").jqGrid({
            colNames: datos_grid_aplicacion_bonos.colNames(),
            colModel: datos_grid_aplicacion_bonos.colModel(),
            pager: $('#grid_aplicacion_bonos_pager'),
            postData: datos_grid_aplicacion_bonos.postData(),
            editurl: FUNCIONES_BASEPATH + "maestro_abm.php",
            shrinkToFit: true,
            height: 180
        })
    }
}