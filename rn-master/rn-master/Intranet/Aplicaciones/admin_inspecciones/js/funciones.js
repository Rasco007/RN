function fecha_en_rango(){
    let comp_fecha = $('#fecha_apertura').val().split('/');
    let meses_treinta_dias = [4,6,9,11];
    let dias_extra_febrero = [30,31];

    let dia = parseInt(comp_fecha[0]);
    let mes = parseInt(comp_fecha[1]);

    if(dia <= 0 || dia > 31){
        mostrar_error('El día debe estar entre 1 y el último día del mes', 'E', true);
        $('#fecha_apertura').val(null);
        return false;
    }
    else if(dia == 31 && meses_treinta_dias.includes(mes)){
        mostrar_error('El día debe estar entre 1 y el último día del mes', 'E', true);
        $('#fecha_apertura').val(null);
        return false;
    }
    else if(dias_extra_febrero.includes(dia) && mes == 2){
        mostrar_error('El día debe estar entre 1 y el último día del mes', 'E', true);
        $('#fecha_apertura').val(null);
        return false;
    }

    if(mes <= 0 || mes > 12){
        mostrar_error('El mes debe estar comprendido entre 1 y 12', 'E', true);
        $('#fecha_apertura').val(null);
        return false;
    }

    return true;
}

function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "ajax_genericos/autocomplete.php",
        type:"POST",
        dataType: "JSON",
        data:{oper: 3,term: cuit_sin_guiones},
        success: function(res) {
            $('#main').procOverlay({visible:false});
            if(res != null){
                var info = res.data_raz[0];
                $("#d_denominacion").val(info.razon_social);
                $("#id_contribuyente").val(info.id_contribuyente);
                $('#lupa_d_denominacion').show().css('display', 'table-cell');
                $('#mascara_lupa_d_denominacion').hide();
                $('#d_denominacion_mayuscula').val($('#d_denominacion').val().toUpperCase());
                $('#btn_buscar').attr('disabled', false);
            }else{
                mostrar_cuadro('E', 'Error', 'No se ha encontrado un contribuyente para el cuit ingresado.');
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
                $("#n_cuit").val(null);
            }
        }
    });
}

function guardar_inspeccion(p_id_inspeccion, p_f_apertura, p_d_observacion, p_d_domicilio, p_d_articulo){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_id_inspeccion": p_id_inspeccion,
            "p_f_apertura": p_f_apertura,
            "p_d_observacion": p_d_observacion,
            "p_d_domicilio": p_d_domicilio,
            "p_d_articulo": p_d_articulo,
            "id_menu":v_id_menu,
            "n_orden":3
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                mostrar_cuadro('I', 'Apertura', 'El proceso de apertura finalizo correctamente.');
                $("#modal_apertura").modal('hide');
                setea_parametros('#main_grid',{':p_n_expediente':null,'p_n_anio': null, 'p_id_contribuyente':null, ':p_n_inspeccion':p_id_inspeccion, ':p_id_plan_fis': null, ':p_n_programa_fis': null});
                posee_tmp = false;
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function eliminar_alcance(p_id_inspeccion) { //Se ejecuta al presionar el boton editar de la grilla de alcance
    mostrar_cuadro('C',
        'Eliminar Alcance',
        'Si continua, se perderán los ajustes cargados en la Inspeccion. Esta acción es irreversible. ¿Desea continuar?',
        function () {
            confirmar_eliminacion(p_id_inspeccion);
        });
}

function confirmar_eliminacion(p_id_inspeccion) {
    var rowid = $("#detail_grid").getGridParam('selrow');
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_id_inspeccion":p_id_inspeccion,
            "p_oper":'del',
            "p_n_movimiento":$("#detail_grid").getCell(rowid,'n_movimiento'),
            "p_n_secuencia":$("#detail_grid").getCell(rowid,'n_secuencia'),
            "p_n_fila":$("#detail_grid").getCell(rowid,'n_fila'),
            "id_menu":v_id_menu,
            "n_orden":4
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#detail_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function editar_alcance(p_id_inspeccion, n_pos_fiscal_desde, n_cuota_desde, n_pos_fiscal_hasta, n_cuota_hasta){ //Se ejecuta al presionar el boton eliminar de la grilla de alcance
    $('#modal_edit_alcance').modal('show');
    $('#edit_id_inspeccion').val(p_id_inspeccion);
    $('#edit_n_pos_fiscal_desde').val(n_pos_fiscal_desde);
    $('#edit_cuota_desde').val(n_cuota_desde);
    $('#edit_n_pos_fiscal_hasta').val(n_pos_fiscal_hasta);
    $('#edit_cuota_hasta').val(n_cuota_hasta);
}

function confirmar_edicion(){
    var rowid = $("#detail_grid").getGridParam('selrow');
    if ($('#form_edit_alcance').validationEngine('validate')) {
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_id_inspeccion": $('#edit_id_inspeccion').val(),
                "p_n_pos_fiscal_desde": $('#edit_n_pos_fiscal_desde').val(),
                "p_n_cuota_desde": $('#edit_cuota_desde').val(),
                "p_n_pos_fiscal_hasta": $('#edit_n_pos_fiscal_hasta').val(),
                "p_n_cuota_hasta": $('#edit_cuota_hasta').val(),
                "p_n_movimiento":$("#detail_grid").getCell(rowid,'n_movimiento'),
                "p_n_secuencia":$("#detail_grid").getCell(rowid,'n_secuencia'),
                "p_n_fila":$("#detail_grid").getCell(rowid,'n_fila'),
                "p_oper": 'edit',
                "id_menu": v_id_menu,
                "n_orden": 4
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado == 'OK') {
                    $('#detail_grid').trigger('reloadGrid');
                    $('#modal_edit_alcance').modal('hide');
                } else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    }
}
