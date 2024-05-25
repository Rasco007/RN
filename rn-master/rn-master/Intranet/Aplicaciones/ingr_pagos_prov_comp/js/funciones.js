function buscar_boletas(){
    $("#id_boleta_agr "). attr("readonly", true);
    $("#n_monto_boleta"). attr("readonly", true);
    $('#btn_buscar').prop('disabled', true);
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            id_menu: v_id_menu,
            n_orden: 0,
            p_n_monto_boleta: $('#n_monto_boleta').val().replace(",","."),
            p_id_boleta_agr: $('#id_boleta_agr').val(),
            p_tributo: p_tributo,
            p_tipo_pago: p_tipo_pago,
            p_pagos_lapos: p_pagos_lapos,
            p_bono_ley_4735: p_bono_ley_4735
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                llenar_tabla_temporal(data.p_tipo_boleta);
            }
            else{
                $("#id_boleta_agr").attr("readonly", false);
                $("#n_monto_boleta").attr("readonly", false);
                $('#btn_buscar').prop('disabled', false);
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function llenar_tabla_temporal(tipo_boleta){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            id_menu: v_id_menu,
            n_orden: 1,
            p_tributo: p_tributo,
            p_id_boleta_agr: $('#id_boleta_agr').val(),
            p_tipo_boleta: tipo_boleta
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                setea_parametros('#boletas_grid',{
                    ':p_id_sesion': data.p_id_sesion
                });

                $.ajax({
                    url: "ingr_pagos_prov_comp/php/traer_datos.php",
                    type:"POST",
                    dataType: "JSON",
                    data:{ p_id_sesion: data.p_id_sesion},
                    success: function (res) {
                        $('#d_denominacion').val(res.D_DENOMINACION);
                        $('#n_cuit').val(res.N_CUIT);
                        $('#n_cuit').mask('99-99999999-9');
                        $('#d_localidad').val(res.D_LOCALIDAD);
                        $('#total').val(formatearNumero(res.TOTAL));
                        //$('#total').val(res.TOTAL);
                    }
                });
            }
            else{
                $("#id_boleta_agr "). attr("readonly", false);
                $("#n_monto_boleta"). attr("readonly", false);
                $('#btn_buscar').prop('disabled', false);
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}


function formatearNumero(numero) {
    if(!numero || numero == '' || numero == ' '){
        return '';
    }
    // Convierte el número en una cadena y reemplaza las comas por puntos si las hay
    var numeroCadena = numero.toString().replace(',', '.');

    // Divide el número en parte entera y parte decimal
    var partes = numeroCadena.split('.');
    var parteEntera = partes[0];
    var parteDecimal = partes.length > 1 ? partes[1] : '';

    // Agrega puntos para separar miles en la parte entera
    if(parteEntera.length === 0){
        parteEntera = '0';
    }
    var parteEnteraFormateada = parteEntera.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Formatea la parte decimal con dos decimales
    if (parteDecimal.length === 0) {
        parteDecimal = '00';
    } else if (parteDecimal.length === 1) {
        parteDecimal += '0';
    }

    // Combina la parte entera y la parte decimal formateadas con coma
    var numeroFormateado = parteEnteraFormateada + ',' + parteDecimal;

    return numeroFormateado;
}

function desformatearNumero(numeroFormateado) {
    if(!numeroFormateado || numeroFormateado == '' || numeroFormateado == ' '){
        return '';
    }
    // Elimina los puntos de separación de miles y reemplaza la coma por un punto
    var numeroSinPuntos = numeroFormateado.replace(/\./g, '').replace(',', '.');

    return parseFloat(numeroSinPuntos);
}

function continuar_procesamiento(){
    var rowid = $("#boletas_grid").getGridParam('selrow');
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_tributo": p_tributo,
         "p_tipo_pago": p_tipo_pago,
         "p_id_boleta_agr": $('#id_boleta_agr').val(),
         "p_c_banco": $('#c_banco').val(),
         "p_c_sucursal": $('#c_sucursal').val(),
         "p_pagos_lapos": p_pagos_lapos,
         "p_f_pago": $('#f_pago').val(),
         "p_f_vto_2": $("#boletas_grid").getCell(rowid,'f_vto_2'),
         "p_f_vto_agr": $("#boletas_grid").getCell(rowid,'f_vto_agr'),
         "p_m_tipo": $("#boletas_grid").getCell(rowid,'m_tipo'),
         "id_menu":v_id_menu,
         "n_orden":3
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                if(data.p_preguntas){
                    var preguntas = data.p_preguntas.split('&');
                    var preguntas_aceptadas = 0;
                    var preguntas_totales = preguntas.length-1;
                    var cancelo = false;
                    preguntas.forEach(pregunta => {
                        if(pregunta){
                            var division = pregunta.split('|');
                            mostrar_cuadro('Q', division[1], division[0],
                                function () {
                                    data.p_acred_especial='1';
                                    preguntas_aceptadas++;
                                    if(preguntas_aceptadas == preguntas_totales){
                                        procesar_pago(data.p_acred_especial);
                                    }
                                },
                                function () {
                                }
                            );
                        }
                    });
                } else {
                    procesar_pago('0');
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function procesar_pago(p_acred_especial){
    var rowid = $("#boletas_grid").getGridParam('selrow');
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_acred_especial": p_acred_especial,
         "p_id_boleta_agr": $('#id_boleta_agr').val(),
         "p_tributo": p_tributo,
         "p_m_tipo":$("#boletas_grid").getCell(rowid,'m_tipo'),
         "p_tipo_boleta":$("#boletas_grid").getCell(rowid,'c_tipo_boleta'),
         "p_bono_ley_4735": p_bono_ley_4735,
         "p_c_tributo":$("#boletas_grid").getCell(rowid,'c_tributo'),
         "p_importe_cuota_mono":$("#boletas_grid").getCell(rowid,'n_importe_cuota_mono'),
         "p_f_pago":$('#f_pago').val(),
         "p_c_banco":$('#c_banco').val(),
         "p_c_sucursal":$('#c_sucursal').val(),
         "p_tipo_pago": p_tipo_pago,
         "p_total_2dovto":desformatearNumero($('#total_2dovto').val()),
         "p_total":desformatearNumero($('#total').val()),
         //"p_total_2dovto":$('#total_2dovto').val(),
         //"p_total":$('#total').val(),
         "id_menu":v_id_menu,
         "n_orden":2
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                mostrar_cuadro('S','Confirmación','Se ha procesado el pago correctamente.');
                $("#id_boleta_agr ").attr("readonly", false);
                $("#n_monto_boleta"). attr("readonly", false);
                $('#frm_pago :input').val(null);
                $('#frm_filtro :input').val(null);
                $('#frm_datos_bonos :input').val(null);
                $('#boletas_grid').jqGrid('clearGridData');
                $('#f_emision_agr').val(null);
                $('#f_vto_agr').val(null);
                $('#f_vto_2').val(null);
                $('#total_2dovto').val(null);
                $('#total').val(null);
                $('#btn_buscar').prop('disabled', false);
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function inicializarCondicionales(){
    if(p_pagos_lapos == 'S'){
        $('#monto_boleta_div').show();
        $('#n_monto_boleta').addClass('validate[required]');
    }
   
    if(p_bono_ley_4735 == 'S'){
        $('#btn_datos_bonos').prop('disabled', false);
    }
}

function validar_bonos_4790(){
    if(!$('#n_cuit_bono').val() || !$('#ofi_presentacion').val() || !$('#f_nota_sol').val()){
        mostrar_cuadro('E', 'Error', 'Debe completar los datos del bono.');
        return false;
    }

    return true;
}

function boleta_editable(){
    var rowid = $("#boletas_grid").getGridParam('selrow');
    if($("#boletas_grid").getCell(rowid,'m_marca') == 'S'){
        return true;
    } else if($("#boletas_grid").getCell(rowid,'c_tipo_boleta') == 'MONO' && $("#boletas_grid").getCell(rowid,'c_concepto_mov') == 100){
        return true;
    } else {
        return false;
    }
}

function fecha_en_rango(){
    let comp_fecha = $('#f_pago').val().split('/');
    let meses_treinta_dias = [4,6,9,11];
    let dias_extra_febrero = [30,31];

    let dia = parseInt(comp_fecha[0]);
    let mes = parseInt(comp_fecha[1]);

    if(dia <= 0 || dia > 31){
        mostrar_error('El día debe estar entre 1 y el último día del mes', 'E', true);
        $('#f_pago').val(null);
        return false;
    }
    else if(dia == 31 && meses_treinta_dias.includes(mes)){
        mostrar_error('El día debe estar entre 1 y el último día del mes', 'E', true);
        $('#f_pago').val(null);
        return false;
    }
    else if(dias_extra_febrero.includes(dia) && mes == 2){
        mostrar_error('El día debe estar entre 1 y el último día del mes', 'E', true);
        $('#f_pago').val(null);
        return false;
    }

    if(mes <= 0 || mes > 12){
        mostrar_error('El mes debe estar comprendido entre 1 y 12', 'E', true);
        $('#f_pago').val(null);
        return false;
    }

    return true;
}