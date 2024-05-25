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
        limpiarCod: true,
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
        campos:{c_sucursal:'c_sucursal', d_descrip:'d_sucursal'},
        keyNav:true,
        limpiarCod: true,
    });
}

function valida_nulo_datos_banco(c_banco, c_sucursal, f_acred, f_pago){
    let resultado = []

    if(!c_banco){
        resultado.push(false);
        resultado.push('El campo Banco no puede quedar vac&iacute;o')
        return resultado;
    }
    else if(!c_sucursal){
        resultado.push(false);
        resultado.push('El campo Sucursal no puede quedar vac&iacute;o')
        return resultado;
    }
    else if(!f_acred){
        resultado.push(false);
        resultado.push('El campo Fecha de Acreditaci&oacute;n no puede quedar vac&iacute;o')
        return resultado;
    }
    else if(!f_pago){
        resultado.push(false);
        resultado.push('El campo Fecha de Pago no puede quedar vac&iacute;o')
        return resultado;
    }

    resultado.push(true);
    return resultado
}


function limpiar_datos_banco(){
        $('#c_banco').val('');
        $('#d_banco').val('');
        $('#c_sucursal').val('');
        $('#d_sucursal').val('');
        $('#f_acred').val('');
        $('#f_pago').val('');
        $('#n_remesa').val('');
        $('#n_cant_total').val('');
        $('#i_importe_total').val('');
        $('#d_estado').val('');
}

function limpiar_datos_pago(){
        $('#barra').val('');
        $('#d_responsable').val('');
        $('#n_comp').val('');
        $('#c_impuesto_form').val('');
        $('#tipo_comp').val('');
        $('#i_pagado').val('');
        $('#d_objeto_hecho').val('');
        $('#n_anio').val('');
        $('#n_cuota').val('');
        $('#i_tasa').val('');
        $('#f_vto').val('');
        $('#f_vto2').val('');
        $('#i_importe1').val('');
        $('#i_importe2').val('');
        $('#i_retenciones').val('');
}

function limpiar_todo(){
        $('#c_banco').val('');
        $('#d_banco').val('');
        $('#c_sucursal').val('');
        $('#d_sucursal').val('');
        $('#f_acred').val('');
        $('#f_pago').val('');
        $('#n_remesa').val('');
        $('#n_cant_total').val('');
        $('#i_importe_total').val('');
        $('#d_estado').val('');
        $('#barra').val('');
        $('#d_responsable').val('');
        $('#n_comp').val('');
        $('#c_impuesto_form').val('');
        $('#tipo_comp').val('');
        $('#i_pagado').val('');
        $('#d_objeto_hecho').val('');
        $('#n_anio').val('');
        $('#n_cuota').val('');
        $('#i_tasa').val('');
        $('#f_vto').val('');
        $('#f_vto2').val('');
        $('#i_importe1').val('');
        $('#i_importe2').val('');
        $('#i_retenciones').val('');

        $('#c_banco').prop('disabled', false);
        $('#c_sucursal').prop('disabled', false);
        $('#f_acred').prop('disabled', false);
        $('#f_pago').prop('disabled', false);

        remesas_cargadas = false;
        $('#consulta_grid').jqGrid("clearGridData");
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             
             "id_menu":p_id_menu,
             "n_orden":18
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

function preparar_nueva_carga(){
    let c_banco = $('#c_banco').val();
    let c_sucursal = $('#c_sucursal').val();
    let f_acred = $('#f_acred').val()

    if(c_banco == 905 || c_banco == 907 || c_banco == 910){
        limpiar_datos_banco();
        limpiar_datos_pago();
        remesas_cargadas = false;
        $('#consulta_grid').jqGrid("clearGridData");
        $('#c_banco').val(c_banco);
        $('#c_sucursal').val(c_sucursal);
        $('#f_acred').val(f_acred);
    } else{
        $("#btn_grabar").prop("disabled", true);
        $("#btn_controlado").prop("disabled", false);
        $("#btn_listado").prop("disabled", false);
    }

    //buscar_estado_remito
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_estado":'3',
         "p_c_estado":null,
         "p_d_estado":null,
         "id_menu":p_id_menu,
         "n_orden":28
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
              $('#d_estado').val('data.p_d_estado');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function calcular_fecha(){
    let fechaActual = new Date();

        
    let fechaMenosUnAnio = new Date(fechaActual);
    fechaMenosUnAnio.setFullYear(fechaActual.getFullYear() - 1);

    let dia = fechaMenosUnAnio.getDate();
    let mes = fechaMenosUnAnio.getMonth() +1;
    if(dia < 10){
        dia = '0' + dia;
    }
    if(mes < 10){
        mes = '0' + mes;
    }
    let fecha = dia + '/' + mes + '/' + fechaMenosUnAnio.getFullYear();

    return fecha;
}

function calcular_fecha_menos_diez_dias(fecha){
    let fecha_part = fecha.split('/');
    let mes_act = parseInt(fecha_part[1]) - 1;

    
    let fecha_modif = new Date(fecha_part[2], mes_act, fecha_part[0]);

    fecha_modif.setDate(fecha_modif.getDate() - 10);

    let dia = fecha_modif.getDate();
    let mes = fecha_modif.getMonth() + 1;
    let anio = fecha_modif.getFullYear();

    if(dia < 10){
        dia = '0' + dia;
    }
    if(mes < 10){
        mes = '0' + mes;
    }

    fecha = dia + '/' + mes + '/' + anio;
    return fecha
}

function desactivar_botones(){
    $('#btn_controlado').prop('disabled', true);
    $('#btn_listado').prop('disabled', true);

}

function activar_botones(){
    $('#btn_controlado').prop('disabled', false);
    $('#btn_listado').prop('disabled', false);
}

function cargar_bloque_pago(datos, campo_completado){
    switch(campo_completado){
        case 'N COMPROBANTE':
            $('#barra').val(datos.p_barra);
            $('#d_responsable').val(datos.p_d_responsable);
            $('#c_impuesto_form').val(datos.p_c_impuesto_form);
            $('#tipo_comp').val(datos.p_tipo_comp);
            $('#i_pagado').val(datos.p_i_pagado);
            $('#i_tasa').val(datos.p_i_tasa);
            $('#f_vto').val(datos.p_f_vto);
            $('#i_importe1').val(datos.p_i_importe1);
            $('#i_importe2').val(datos.p_i_importe2);
            $('#f_vto2').val(datos.p_f_vto2);
            $('#i_retenciones').val(datos.p_i_retenciones);
            $('#n_anio').val(datos.p_n_anio);
            $('#n_cuota').val(datos.p_n_cuota);
            $('#d_objeto_hecho').val(datos.p_d_objeto_hecho);
            break;
        
        case 'BARRA':
            $('#n_comp').val(datos.p_n_comp);
            $('#d_responsable').val(datos.p_d_responsable);
            $('#c_impuesto_form').val(datos.p_c_impuesto_form);
            $('#tipo_comp').val(datos.p_tipo_comp);
            $('#i_pagado').val(datos.p_i_pagado);
            $('#i_tasa').val(datos.p_i_tasa);
            $('#f_vto').val(datos.p_f_vto);
            $('#i_importe1').val(datos.p_i_importe1);
            $('#n_cant_total').val(datos.p_n_cantidad_total);
            $('#i_importe_total').val(datos.p_i_importe_total);
            $('#i_importe2').val(datos.p_i_importe2);
            $('#f_vto2').val(datos.p_f_vto2);
            $('#i_retenciones').val(datos.p_i_retenciones);
            $('#n_anio').val(datos.p_n_anio);
            $('#n_cuota').val(datos.p_n_cuota);
            $('#d_objeto_hecho').val(datos.p_d_objeto_hecho);
    }
    
}

function datos_correctos(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_i_pagado": $('#i_pagado').val(),
         "p_n_remito":$('#n_remesa').val(),
         "p_c_tipo_registro":$('#c_tipo_registro').val(),
         "p_n_comp":$('#n_comp').val(),
         "p_barra":$('#barra').val(),
         "p_c_banco":$('#c_banco').val(),
         "p_c_sucursal":$('#c_sucursal').val(),
         "p_f_acred":$('#f_acred').val(),
         "p_f_pago":$('#f_pago').val(),
         "p_c_impuesto_form":$('#c_impuesto_form').val(),
         "p_tipo_comp":$('#tipo_comp').val(),
         "p_f_vto":$('#f_vto').val(),
         "p_i_importe1":$('#i_importe1').val(),
         "p_i_tasa":$('#i_tasa').val(),
         "p_d_objeto_hecho":$('#d_objeto_hecho').val(),
         "p_n_anio":$('#n_anio').val(),
         "p_n_cuota":$('#n_cuota').val(),
         "p_i_retenciones":$('#i_retenciones').val(),
         "p_n_cantidad_total":$('#n_cantidad_total').val(),
         "p_i_importe_total":$('#i_importe_total').val(),
         "id_menu":p_id_menu,
         "n_orden":27
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
              $('#n_cant_total').val(data.p_n_cantidad_total);
              $('#i_importe_total').val(data.p_i_importe_total);

              filtros_arr_main = [];
              filtros_no_nativos_ar = [];

                
                
              if($('#c_banco').val()){
                  filtros_arr_main.push('Banco: '+ $('#c_banco').val());
              }
              if($('#c_sucursal').val()){
                  filtros_arr_main.push('Sucursal: '+ $('#c_sucursal').val());
              }
              if($('#f_acred').val()){
                  filtros_arr_main.push('F. Acreditación: '+ $('#f_acred').val());
              }
              if($('#f_pago').val()){
                  filtros_arr_main.push('F. Pago: '+ $('#f_pago').val());
              }
              filtros_no_nativos_ar['consulta_grid'] = filtros_arr_main;

              setea_parametros('#consulta_grid');
              $("#bloque_consulta").show();
              limpiar_datos_pago();
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
}

function desbloquear_filtros(){
    $('#c_banco').prop('disabled', false);
    $('#c_sucursal').prop('disabled', false);
    $('#f_acred').prop('disabled', false);
    $('#f_pago').prop('disabled', false);
}
