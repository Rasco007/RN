function inicializarLupas(){
    $("#lupa_banco").lupa_generica({
        id_lista:v_lista_bancos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_banco',width:100},
            {index:'d_descrip',width:450}],
        caption:'Bancos',
        sortname:'c_banco',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_banco',
        exactField: 'c_banco',
        filtros: ['#c_banco'],
        filtrosNulos: [true],
        campos:{c_banco:'c_banco', d_descrip:'d_banco'},
        keyNav:true,
        // limpiarCod: true,
    });

    $("#lupa_sucursal").lupa_generica({
        id_lista:v_lista_sucursales,
        titulos:['Banco', 'Cod. Sucursal' , 'Descripción'],
        grid:[  {index:'c_banco',width:100},
                {index:'c_sucursal',width:100},
            {index:'d_descrip',width:450}],
        caption:'Sucursales',
        sortname:'c_sucursal',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_sucursal',
        exactField: 'c_sucursal',
        filtros: ['#c_banco', '#c_sucursal'],
        filtrosNulos: [true, true],
        campos:{c_banco:'c_banco', c_sucursal:'c_sucursal', d_descrip:'d_sucursal'},
        keyNav:true,
        // limpiarCod: true,
    });
}

function validar_nulos(){
    let resultado = []
    let es_valido = true;
    let msj_error;
    if(!$('#c_banco').val()){
        es_valido = false;
        msj_error = 'El campo Banco no puede quedar vacío';
    }
    else if(!$('#f_acred').val()){
        es_valido = false;
        msj_error = 'El campo Fecha Acreditaci&oacute;n no puede quedar vacío';
    }
    resultado.push(es_valido);
    resultado.push(msj_error);

    return resultado;
}

function definir_checks(checks){
    let m_automatica_chequeada = $('#check_automat').is(':checked');
    let m_manual_chequeada = $('#check_manual').is(':checked');
    let m_pagos_manuales_chequeada = $('#check_pagos_manuales').is(':checked');
    let m_automatica;
    let m_manual;
    let m_pagos_manuales;

    if(m_automatica_chequeada){
        m_automatica = 'A';
    }else{
        m_automatica = '0';
    }

    if(m_manual_chequeada){
        m_manual = 'M';
    }else{
        m_manual = '0';
    }

    if(m_pagos_manuales_chequeada){
        m_pagos_manuales = 'F';
    }else{
        m_pagos_manuales = '0';
    }

    checks.push(m_automatica);
    checks.push(m_manual);
    checks.push(m_pagos_manuales);

    return checks;
};

function llenar_checks(){
    let tipo_rendiciones = [];
    
    definir_checks(tipo_rendiciones);

    if(tipo_rendiciones[0] != 'A'){
        $("#check_automat").prop("checked", true);
    }
    if(tipo_rendiciones[1] != 'M'){
        $("#check_manual").prop("checked", true);
    }
    if(tipo_rendiciones[2] != 'F'){
        $("#check_pagos_manuales").prop("checked", true);
    }
};

function reversa(){
    let cant_filas = $('#reversa_rendiciones_grid').getGridParam("reccount");
    let n_remito_actual;
    let c_banco_actual = $('#c_banco').val();
    let c_sucursal_actual;
    let c_marca_actual;
    let f_pago_actual;


    for(let i = 1; i <= cant_filas; i++){
        if($('#check_select_'+i).is(":checked")){
            n_remito_actual =  parseInt($('#reversa_rendiciones_grid').getCell(i, 'n_remito'));
            c_sucursal_actual = parseInt($('#reversa_rendiciones_grid').getCell(i, 'c_sucursal'));
            c_marca_actual = $('#reversa_rendiciones_grid').getCell(i, 'c_marca');
            f_pago_actual = $('#reversa_rendiciones_grid').getCell(i, 'f_pago');

            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_n_fila": i,
                 "p_n_remito": n_remito_actual,
                 "p_c_banco": c_banco_actual,
                 "p_c_sucursal": c_sucursal_actual,
                 "p_c_marca": c_marca_actual,
                 "p_f_pago": f_pago_actual,
                 "id_menu":p_id_menu,
                 "n_orden":4
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    }

    let tipo_rendiciones = [];
    definir_checks(tipo_rendiciones);
    //Ejecuto el prc de reversa
    if(tipo_rendiciones[1] == 'M' && tipo_rendiciones[2] == '0'){
        mostrar_cuadro('I', 'Informaci&oacute;n', 'Tambien se reversara los pagos manuales asociados');
    } 
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_f_acred": $('#f_acred').val(),
         "p_m_automatica": tipo_rendiciones[0],
         "p_m_manual": tipo_rendiciones[1],
         "p_m_fiambrera": tipo_rendiciones[2],
         "id_menu":p_id_menu,
         "n_orden":6
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                if(data.p_mensaje_info){
                    mostrar_cuadro('I', 'Informaci&oacute;n', data.p_mensaje_info);
                }
                grilla_cargada = false;

                filtros_no_nativos_ar = [];
                filtros_arr_main = [];

                if($('#c_banco').val() != ''){
                    filtros_arr_main.push('Banco: '+ $('#c_banco').val());
                }
                if($('#c_sucursal').val() != ''){
                    filtros_arr_main.push('Sucursal: '+ $('#c_sucursal').val());
                }
                if($('#f_acred').val() != ''){
                    filtros_arr_main.push('F. Acreditación: '+ $('#f_acred').val());
                }
                if($('#f_pago').val() != ''){
                    filtros_arr_main.push('F. Pago: '+ $('#f_pago').val());
                }
                if($('#check_automat').is(':checked')){
                    filtros_arr_main.push('Automática: Si')
                }
                if($('#check_manual').is(':checked')){
                    filtros_arr_main.push('Manual: Si')
                }
                if($('#check_pagos_manuales').is(':checked')){
                    filtros_arr_main.push('Pagos Manuales: Si')
                }

                filtros_no_nativos_ar['reversa_rendiciones_grid'] = filtros_arr_main;

                setea_parametros('#reversa_rendiciones_grid', {'p_f_acred':$('#f_acred').val(),
                                                    'p_f_pago': $('#f_pago').val(),
                                                    'p_c_banco':$('#c_banco').val(),
                                                    'p_c_sucursal':$('#c_sucursal').val(),
                                                    'p_m_automatica': tipo_rendiciones[0],
                                                    'p_m_manual':tipo_rendiciones[1],
                                                    'p_m_fiambrera':tipo_rendiciones[2]});
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
    //Borro de la tabla temporal
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         
         "id_menu":p_id_menu,
         "n_orden":5
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                mostrar_cuadro('I', 'Informaci&oacute;n', 'El proceso finaliz&oacute; correctamente');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function bloquear_filtros(){
    $('#c_banco').prop('disabled', true);
    $('#c_sucursal').prop('disabled', true);
    $('#f_acred').prop('disabled', true);
    $('#f_pago').prop('disabled', true);
    $('#check_automat').prop('disabled', true);
    $('#check_pagos_manuales').prop('disabled', true);
    $('#check_manual').prop('disabled', true);

    $('#mascara_lupa_banco').show();
    $('#lupa_banco').hide();
    $('#mascara_lupa_sucursal').show();
    $('#lupa_sucursal').hide();
}

function desbloquear_filtros(){
    $('#c_banco').prop('disabled', false);
    $('#c_sucursal').prop('disabled', false);
    $('#f_acred').prop('disabled', false);
    $('#f_pago').prop('disabled', false);
    $('#check_automat').prop('disabled', false);
    $('#check_pagos_manuales').prop('disabled', false);
    $('#check_manual').prop('disabled', false);

    $('#mascara_lupa_banco').hide();
    $('#lupa_banco').show();
    $('#mascara_lupa_sucursal').hide();
    $('#lupa_sucursal').show();
}