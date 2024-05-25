function inicializar_eventos(){
    $('#anio_fiscal_edit').mask('9999');
    $('#modelo_anio_edit').mask('9999');
    $('#mes_fiscal_edit').mask('99');

    if(p_modo == 'C'){
        $('.div_recalcular').attr('hidden', true);
    } else {
        $('.div_recalcular').attr('hidden', false);
    }

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

    $("#btn_lupa_marca").lupa_generica({
        id_lista: id_lista_marcas,
        titulos: ['Codigo', 'Marca'],
        grid: [
            {index: 'c_dato', width: 80},
            {index: 'd_dato', width: 450}
        ],
        caption: 'Lista de Marcas',
        campos: {d_dato: 'd_marca', c_dato: 'c_marca'},
        keyNav: true,
        onClose(){
            $('#c_modelo').val(null);
            $('#d_modelo').val(null);
            $('#c_descrip').val(null);
            $('#d_descrip').val(null);
        }
    });

    $("#btn_lupa_marca_edit").lupa_generica({
        id_lista: id_lista_marcas,
        titulos: ['Codigo', 'Marca'],
        grid: [
            {index: 'c_dato', width: 80},
            {index: 'd_dato', width: 450}
        ],
        caption: 'Lista de Marcas',
        campos: {d_dato: 'd_marca_edit', c_dato: 'c_marca_edit'},
        keyNav: true,
        onClose(){
            $('#c_modelo_edit').val(null);
            $('#d_modelo_edit').val(null);
            $('#c_descrip_edit').val(null);
            $('#d_descrip_edit').val(null);
        }
    });

    $("#btn_lupa_modelo").lupa_generica({
        id_lista: id_lista_modelos,
        titulos: ['Codigo', 'Modelo'],
        grid: [
            {index: 'c_dato', width: 80},
            {index: 'd_dato', width: 450}
        ],
        caption: 'Lista de Modelos',
        filtros: ['#c_marca'],
        filtrosTitulos:['Marca'],
        campos: {d_dato: 'd_modelo', c_dato: 'c_modelo'},
        keyNav: true,
        onClose(){
            $('#c_descrip').val(null);
            $('#d_descrip').val(null);
        }
    });

    $("#btn_lupa_modelo_edit").lupa_generica({
        id_lista: id_lista_modelos,
        titulos: ['Codigo', 'Modelo'],
        grid: [
            {index: 'c_dato', width: 80},
            {index: 'd_dato', width: 450}
        ],
        caption: 'Lista de Modelos',
        filtros: ['#c_marca_edit'],
        filtrosTitulos:['Marca'],
        campos: {d_dato: 'd_modelo_edit', c_dato: 'c_modelo_edit'},
        keyNav: true,
        onClose(){
            $('#c_descrip_edit').val(null);
            $('#d_descrip_edit').val(null);
        }
    });

    $("#btn_lupa_descrip").lupa_generica({
        id_lista: id_lista_descrip,
        titulos: ['Codigo', 'Descripción'],
        grid: [
            {index: 'id_descripcion', width: 80},
            {index: 'd_descrip', width: 450}
        ],
        caption: 'Lista de Descripción',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros: ['#c_marca', '#c_modelo'],
        filtrosTitulos:['Marca', 'Modelo'],
        campos: {d_descrip: 'd_descrip', id_descripcion: 'c_descrip'},
        keyNav: true
    });

    $("#btn_lupa_descrip_edit").lupa_generica({
        id_lista: id_lista_descrip,
        titulos: ['Codigo', 'Descripción'],
        grid: [
            {index: 'id_descripcion', width: 80},
            {index: 'd_descrip', width: 450}
        ],
        caption: 'Lista de Descripción',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros: ['#c_marca_edit', '#c_modelo_edit'],
        filtrosTitulos:['Marca', 'Modelo'],
        campos: {d_descrip: 'd_descrip_edit', id_descripcion: 'c_descrip_edit'},
        keyNav: true
    });

    $("#btn_lupa_grupo").lupa_generica({
        id_lista: id_lista_grupo,
        titulos: ['Codigo', 'Descripción'],
        grid: [
            {index: 'c_dato', width: 80},
            {index: 'd_dato', width: 450}
        ],
        caption: 'Lista de Grupos',
        campos: {d_dato: 'd_grupo', c_dato: 'c_grupo'},
        keyNav: true
    });

    $("#btn_lupa_grupo_edit").lupa_generica({
        id_lista: id_lista_grupo,
        titulos: ['Codigo', 'Descripción'],
        grid: [
            {index: 'c_dato', width: 80},
            {index: 'd_dato', width: 450}
        ],
        caption: 'Lista de Grupos',
        campos: {d_dato: 'd_grupo_edit', c_dato: 'c_grupo_edit'},
        keyNav: true
    });

    $("#btn_lupa_moneda").lupa_generica({
        id_lista: id_lista_monedas,
        titulos: ['Codigo', 'Moneda'],
        grid: [
            {index: 'c_codigo', width: 80},
            {index: 'd_descrip', width: 450}
        ],
        sortname:'d_descrip',
        sortorder:'asc',
        caption: 'Lista de Monedas',
        campos: {d_descrip: 'd_moneda', c_codigo: 'c_moneda'},
        keyNav: true
    });

    $("#btn_lupa_origen").lupa_generica({
        id_lista: id_lista_origen,
        titulos: ['Codigo', 'Origen'],
        grid: [
            {index: 'c_dato', width: 80},
            {index: 'd_dato', width: 450}
        ],
        sortname:'d_dato',
        sortorder:'asc',
        caption: 'Lista de Origenes',
        campos: {d_dato: 'd_origen', c_dato: 'c_origen'},
        keyNav: true
    });

    $("#btn_lupa_origen_edit").lupa_generica({
        id_lista: id_lista_origen,
        titulos: ['Codigo', 'Origen'],
        grid: [
            {index: 'c_dato', width: 80},
            {index: 'd_dato', width: 450}
        ],
        sortname:'d_dato',
        sortorder:'asc',
        caption: 'Lista de Origenes',
        campos: {d_dato: 'd_origen_edit', c_dato: 'c_origen_edit'},
        keyNav: true
    });

    $('#btn_buscar').click(function () {
        setea_parametros('#main_grid',{':p_c_marca':$('#c_marca').val(),'p_id_modelo': $('#c_modelo').val(),
            'p_id_descrip':$('#c_descrip').val(), ':p_c_grupo':$('#c_grupo').val(),
            ':p_c_origen':$('#c_origen').val(), ':p_c_moneda':$('#c_moneda').val()});
        $('#btn_lupa_marca').css("visibility", "hidden");
        $('#btn_lupa_modelo').css("visibility", "hidden");
        $('#btn_lupa_descrip').css("visibility", "hidden");
        $('#btn_lupa_grupo').css("visibility", "hidden");
        $('#btn_lupa_origen').css("visibility", "hidden");
        $('#btn_lupa_moneda').css("visibility", "hidden");
        $('#btn_buscar').attr('disabled', true);
        $('#frm_consulta :input').attr('readonly', true);
    });

    $('#btn_limpiar').click(function(){
        $("#main_grid").jqGrid("clearGridData");
        $('#frm_consulta :input').val(null);
        $('#c_marca').attr('readonly', false);
        $('#c_modelo').attr('readonly', false);
        $('#c_descrip').attr('readonly', false);
        $('#c_grupo').attr('readonly', false);
        $('#c_origen').attr('readonly', false);
        $('#c_moneda').attr('readonly', false);
        $('#btn_buscar').attr('disabled', false);
        $("#frm_consulta").validationEngine('hideAll');
        $('#btn_lupa_marca').css("visibility", "visible");
        $('#btn_lupa_modelo').css("visibility", "visible");
        $('#btn_lupa_descrip').css("visibility", "visible");
        $('#btn_lupa_grupo').css("visibility", "visible");
        $('#btn_lupa_origen').css("visibility", "visible");
        $('#btn_lupa_moneda').css("visibility", "visible");
    });

    $('#btn_edit_valuacion').click(function () {
        if($('#form_edit_valuacion').validationEngine('validate')) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_c_marca_inicial": $('#c_marca_inicial').val(),
                    "p_c_modelo_inicial": $('#c_modelo_inicial').val(),
                    "p_c_descrip_inicial": $('#c_descrip_inicial').val(),
                    "p_n_modelo_anio_inicial": $('#modelo_anio_inicial').val(),
                    "p_n_anio_fiscal_inicial": $('#anio_fiscal_inicial').val(),
                    "p_n_mes_fiscal_inicial": $('#mes_fiscal_inicial').val(),
                    "p_c_marca": $('#c_marca_edit').val(),
                    "p_c_modelo": $('#c_modelo_edit').val(),
                    "p_c_descrip": $('#c_descrip_edit').val(),
                    "p_n_modelo_anio": $('#modelo_anio_edit').val(),
                    "p_n_anio_fiscal": $('#anio_fiscal_edit').val(),
                    "p_n_mes_fiscal": $('#mes_fiscal_edit').val(),
                    "p_c_grupo": $('#c_grupo_edit').val(),
                    "p_m_nac_imp": $('#nac_imp_edit').val(),
                    "p_n_valuacion": $('#valuacion_edit').val(),
                    "p_c_origen": $('#c_origen_edit').val(),
                    "p_m_proyecto": $('#proyecto_ley_edit').val(),
                    "p_c_moneda": $('#c_moneda_inicial').val(),
                    "id_menu": v_id_menu,
                    "n_orden": 0
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({visible: false});
                    if (data.resultado == 'OK') {
                        mostrar_cuadro('I', 'Edición de Valuación', 'La edición finalizo correctamente.');
                        $("#modal_edit_valuacion").modal('hide');
                        $('#main_grid').trigger('reloadGrid');
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $('#btn_detalle').click(function () {
        var v_m_proyecto;
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if (!rowid){
            mostrar_validacion('Debe seleccionar un registro de la grilla');
        }else{
            if($("#main_grid").getCell(rowid,'m_proyecto') == 'NO'){
                v_m_proyecto = 'N';
            } else {
                v_m_proyecto = 'S';
            }
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_c_marca": $("#main_grid").getCell(rowid,'c_marca_aut'),
                    "p_c_modelo": $("#main_grid").getCell(rowid,'id_modelo'),
                    "p_c_descrip": $("#main_grid").getCell(rowid,'id_descripcion'),
                    "p_c_grupo": $("#main_grid").getCell(rowid,'c_grupo'),
                    "p_n_modelo_anio": $("#main_grid").getCell(rowid,'n_modelo_año'),
                    "p_n_anio_fiscal": $("#main_grid").getCell(rowid,'n_año_fiscal'),
                    "p_n_mes_fiscal": $("#main_grid").getCell(rowid,'n_mes_fiscal'),
                    "p_m_proyecto": v_m_proyecto,
                    "id_menu": v_id_menu,
                    "n_orden": 1
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({visible: false});
                    if (data.resultado == 'OK') {
                        $('#cantidad').val(data.p_cantidad);
                        $("#modal_detalle").modal('show');
                        $(window).resize();
                        setea_parametros('#detail_grid',null);
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $('#btn_volver').click(function () {
        $("#modal_detalle").modal('hide');
    });

    $('#btn_recalcular').click(function () {
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if (!rowid){
            mostrar_validacion('Debe seleccionar un registro de la grilla');
        }else {
            mostrar_cuadro('C',
                'Advertencia',
                'Ud. grabará los cambios, ¿Desea continuar?',
                function () {
                    fun_recalcular(rowid);
                });
        }
    });
}