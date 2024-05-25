function inicializar_eventos(){
    $("#lupa_boleta").lupa_generica({
        id_lista: id_lista,
        titulos: ['Nro. Boleta', 'Cod. Expediente', 'n_cuit', 'd_denominacion', 'Cod. Tributo', 'd_tributo', 'Objeto/Hecho'],
        grid: [
            {index: 'id_boleta_deuda', width: 150},
            {index: 'c_expediente', width: 150},
            {index: 'n_cuit', hidden: true},
            {index: 'd_denominacion', hidden: true},
            {index: 'c_tributo', width: 100},
            {index: 'd_tributo', hidden: true},
            {index: 'd_objeto_hecho', width: 150}
        ],
        filtroNull: true,
        filtros: ['#n_boleta', '#n_expte', '#c_tributo', '#n_objeto'],
        caption: 'Lista de Boletas',
        campos: {id_boleta_deuda: 'n_boleta', c_expediente: 'n_expte', c_tributo: 'c_tributo', d_tributo: 'd_tributo', d_objeto_hecho: 'n_objeto'},
        keyNav: true,
        onClose(){
            if($('#c_tributo').val() != '') {
                $('#c_tributo').attr('readonly', true);
            } else {
                $('#c_tributo').attr('readonly', false);
            }
        }
    });

    $("#lupa_expte").lupa_generica({
        id_lista: id_lista,
        titulos: ['Nro. Boleta', 'Cod. Expediente', 'n_cuit', 'd_denominacion', 'Cod. Tributo', 'd_tributo', 'Objeto/Hecho'],
        grid: [
            {index: 'id_boleta_deuda', width: 150},
            {index: 'c_expediente', width: 150},
            {index: 'n_cuit', hidden: true},
            {index: 'd_denominacion', hidden: true},
            {index: 'c_tributo', width: 100},
            {index: 'd_tributo', hidden: true},
            {index: 'd_objeto_hecho', width: 150}
        ],
        filtroNull: true,
        filtros: ['#n_boleta', '#n_expte', '#c_tributo', '#n_objeto'],
        caption: 'Lista de Expedientes',
        campos: {id_boleta_deuda: 'n_boleta', c_expediente: 'n_expte', c_tributo: 'c_tributo', d_tributo: 'd_tributo', d_objeto_hecho: 'n_objeto'},
        keyNav: true,
        onClose(){
            if($('#c_tributo').val() != '') {
                $('#c_tributo').attr('readonly', true);
            } else {
                $('#c_tributo').attr('readonly', false);
            }
        }
    });

    $("#lupa_tributo").lupa_generica({
        id_lista: id_lista,
        titulos: ['Nro. Boleta', 'Cod. Expediente', 'n_cuit', 'd_denominacion', 'Cod. Tributo', 'd_tributo', 'Objeto/Hecho'],
        grid: [
            {index: 'id_boleta_deuda', width: 150},
            {index: 'c_expediente', width: 150},
            {index: 'n_cuit', hidden: true},
            {index: 'd_denominacion', hidden: true},
            {index: 'c_tributo', width: 100},
            {index: 'd_tributo', hidden: true},
            {index: 'd_objeto_hecho', width: 150}
        ],
        filtroNull: true,
        filtros: ['#n_boleta', '#n_expte', '#c_tributo', '#n_objeto'],
        caption: 'Lista de Tributos',
        searchCode: true,
        searchInput: '#c_tributo',
        exactField: 'c_tributo',
        campos: {id_boleta_deuda: 'n_boleta', c_expediente: 'n_expte', c_tributo: 'c_tributo', d_tributo: 'd_tributo', d_objeto_hecho: 'n_objeto'},
        keyNav: true,
        onClose(){
            if($('#c_tributo').val() != '') {
                $('#c_tributo').attr('readonly', true);
            } else {
                $('#c_tributo').attr('readonly', false);
            }
        }
    });

    $("#lupa_objeto").lupa_generica({
        id_lista: id_lista,
        titulos: ['Nro. Boleta', 'Cod. Expediente', 'n_cuit', 'd_denominacion', 'Cod. Tributo', 'd_tributo', 'Objeto/Hecho'],
        grid: [
            {index: 'id_boleta_deuda', width: 150},
            {index: 'c_expediente', width: 150},
            {index: 'n_cuit', hidden: true},
            {index: 'd_denominacion', hidden: true},
            {index: 'c_tributo', width: 100},
            {index: 'd_tributo', hidden: true},
            {index: 'd_objeto_hecho', width: 150}
        ],
        filtroNull: true,
        filtros: ['#n_boleta', '#n_expte', '#c_tributo', '#n_objeto'],
        caption: 'Lista de Objetos',
        campos: {id_boleta_deuda: 'n_boleta', c_expediente: 'n_expte', c_tributo: 'c_tributo', d_tributo: 'd_tributo', d_objeto_hecho: 'n_objeto'},
        keyNav: true,
        onClose(){
            if($('#c_tributo').val() != '') {
                $('#c_tributo').attr('readonly', true);
            } else {
                $('#c_tributo').attr('readonly', false);
            }
        }
    });

    $('#btn_buscar').click(function () {
        if($('#n_boleta').val()  == "" && $('#n_expte').val() == ""){
            mostrar_cuadro('I', 'Advertencia', 'Debe cargar al menos uno de los siguientes campos: Nro. Bol. Deuda Juicio o Expte. Conc/Quiebra')
        } else {
            filtros_no_nativos_ar['main_grid'] = [];
            if($('#n_boleta').val() != ''){
                filtros_no_nativos_ar['main_grid'].push('Nro. Boleta: ' + $('#n_boleta').val());
            }
            if($('#n_expte').val() != ''){
                filtros_no_nativos_ar['main_grid'].push('Nro. Expediente: ' + $('#n_expte').val());
            }
            if($('#d_tributo').val() != ''){
                filtros_no_nativos_ar['main_grid'].push('Tributo: ' + $('#d_tributo').val());
            }
            if($('#n_objeto').val() != ''){
                filtros_no_nativos_ar['main_grid'].push('Objeto: ' + $('#n_objeto').val());
            }

            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_id_boleta_deuda": $('#n_boleta').val(),
                    "p_c_expediente": $('#n_expte').val(),
                    "p_c_tributo": $('#c_tributo').val(),
                    "p_d_objeto": $('#n_objeto').val(),
                    "id_menu": v_id_menu,
                    "n_orden": 0
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({visible: false});
                    if (data.resultado == 'OK') {
                        setea_parametros('#main_grid',{':p_n_lote_ins':data.p_n_lote_ins});
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $('#btn_limpiar').click(function () {
        $("#main_grid").jqGrid("clearGridData");
        $('#c_tributo').attr('readonly', false);
        $('#frm_consulta :input').val(null);
        filtros_no_nativos_ar['main_grid'] = [];
    });

    $('#btn_cancelar').click(function () {
        $("#modal_extraccion").modal('hide');
    });

    $('#btn_cancelar_saldo').click(function () {
        $("#modal_edicion").modal('hide');
    });

    $('.numerico').keypress(function(tecla){   //Validamos que los input de importes sean solo numeros, puntos o comas.
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });

    $(".mascara_importe").focusout(function () { //le damos el formato de importe con 2 decimales 0,00
        $(this).val($(this).val().replace(/\./g, ','));
        $(this).val(formatea_number(mascara_numero(parse($(this).val()).toFixed(2), ',', -1, 2), ''));
        if($(this).val() == '0,00'){
            $(this).val(null);
        }
    }).css('text-align', 'right');

    $('#btn_extraer').click(function () {
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if (!rowid){
            mostrar_validacion('Debe seleccionar un registro de la grilla');
        }else {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_id_boleta_deuda": $("#main_grid").getCell(rowid,'id_boleta_deuda'),
                    "p_n_instancia": $("#main_grid").getCell(rowid,'n_instancia'),
                    "p_n_orden": $("#main_grid").getCell(rowid,'n_orden'),
                    "id_menu": v_id_menu,
                    "n_orden": 1
                },
                dataType: 'json',
                success: function (data) {
                    if (data.resultado == 'OK') {
                        $.ajax({
                            type: 'POST',
                            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                            data: {
                                "p_n_instancia": $("#main_grid").getCell(rowid,'n_instancia'),
                                "p_n_orden": $("#main_grid").getCell(rowid,'n_orden'),
                                "p_n_lote_inst": $("#main_grid").getCell(rowid,'n_lote_ins'),
                                "id_menu": v_id_menu,
                                "n_orden": 2
                            },
                            dataType: 'json',
                            success: function (data) {
                                $('#main').procOverlay({visible: false});
                                if (data.resultado == 'OK') {
                                    if(data.p_n_lote_extrac == null && data.p_m_sin_pago == 'S'){
                                        p_m_sin_pago = data.p_m_sin_pago;
                                        p_n_lote_extrac = data.p_n_lote_extrac;
                                        mostrar_cuadro('C', 'Advertencia', 'El Juicio, Concurso o Quiebra no posee pagos. ¿Desea continuar?',
                                            function () {
                                                extraer_objeto();
                                            });
                                    } else {
                                        p_m_sin_pago = data.p_m_sin_pago;
                                        p_n_lote_extrac = data.p_n_lote_extrac;
                                        setea_parametros('#detail_grid',{':p_n_lote_extrac':data.p_n_lote_extrac});
                                        $("#modal_extraccion").modal('show');
                                        $(window).resize();
                                    }
                                } else {
                                    mostrar_cuadro('E', 'Error', data.resultado);
                                    return;
                                }
                            }
                        })
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $('#btn_guardar_saldo').click(function () {
        if ($('#form_extrac').validationEngine('validate')) {
            var rowid = $('#detail_grid').jqGrid('getGridParam', 'selrow');
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_n_lote_extrac": $("#detail_grid").getCell(rowid, 'n_lote_extrac'),
                    "p_id_obligacion": $("#detail_grid").getCell(rowid, 'id_obligacion'),
                    "p_c_concepto": $("#detail_grid").getCell(rowid, 'c_concepto'),
                    "p_i_saldo_comp": $('#i_saldo_compensado').val(),
                    "id_menu": v_id_menu,
                    "n_orden": 4
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({visible: false});
                    if (data.resultado == 'OK') {
                        $("#detail_grid").trigger("reloadGrid");
                        $("#modal_edicion").modal('hide');
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $('#btn_confirmar').click(function () {
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_n_lote_extrac": p_n_lote_extrac,
                    "p_n_lote_ins": $("#main_grid").getCell(rowid,'n_lote_ins'),
                    "p_n_instancia": $("#main_grid").getCell(rowid,'n_instancia'),
                    "p_n_orden": $("#main_grid").getCell(rowid,'n_orden'),
                    "id_menu": v_id_menu,
                    "n_orden": 3
                },
                dataType: 'json',
                success: function (data) {
                    if (data.resultado == 'OK') {
                        extraer_objeto();
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
    });
}