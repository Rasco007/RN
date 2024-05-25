function validar_periodo(periodo_input){
    let periodo = periodo_input.val().replace("/", "");
    if(periodo.substring(4, 7) < 1 || periodo.substring(4, 7) > 12){
	    mostrar_error('El mes debe estar entre 1 y 12');
        periodo_input.val("");
        return;
    }
    if (periodo < 197000){
        mostrar_error('El año debe ser de 1970 en adelante');
        periodo_input.val("");
        return;
    }
}

function busqueda2(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{  
        'p_c_tributo': $('#c_tributo').val(),
        'p_tipo_documento': $('#c_tipo_documento').val(),
        'p_n_documento': $('#n_documento').val(),
        'p_id_contribuyente': $('#id_contribuyente').val(),
        'p_n_cuit': limpia_cuit($('#n_cuit').val()),
         "id_menu":v_id_menu,
         "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#d_denominacion').val(data.p_nombres || $('#d_denominacion').val());
                $('#d_objeto_hecho').val(data.p_objhecho || $('#d_objeto_hecho').val());
                $('#c_tipo_imponible').val(data.p_c_tipo_imponible || $('#c_tipo_imponible').val());
                $('#c_tipo_documento').val(data.p_tipo_documento || $('#c_tipo_documento').val());
                $('#d_tipo_documento').val(data.p_d_tipo_documento || $('#d_tipo_documento').val());
                $('#n_documento').val(data.p_n_documento || $('#n_documento').val());
                $('#id_contribuyente').val(data.p_id_contribuyente || $('#id_contribuyente').val());
                $('#n_cuit').val(data.p_n_cuit || $('#n_cuit').val());
                $("#n_cuit").mask("99-99999999-9");
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                $('#c_tipo_documento').val("");
                $('#n_documento').val("");
                return;
            }
        }
    });
}

function busqueda1(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{  
        'p_c_tributo': $('#c_tributo').val(),
        'p_c_tipo_imponible': $('#c_tipo_imponible').val(),
        'p_objhecho': $('#d_objeto_hecho').val(),
        'p_id_contribuyente': $('#id_contribuyente').val(),
        'p_n_cuit': limpia_cuit($('#n_cuit').val()),
         "id_menu":v_id_menu,
         "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#d_denominacion').val(data.p_nombres || $('#d_denominacion').val());
                $('#d_objeto_hecho').val(data.p_objhecho || $('#d_objeto_hecho').val());
                $('#c_tipo_imponible').val(data.p_c_tipo_imponible || $('#c_tipo_imponible').val());
                $('#c_tipo_documento').val(data.p_tipo_documento || $('#c_tipo_documento').val());
                $('#d_tipo_documento').val(data.p_d_tipo_documento || $('#d_tipo_documento').val());
                $('#n_documento').val(data.p_n_documento || $('#n_documento').val());
                $('#id_contribuyente').val(data.p_id_contribuyente || $('#id_contribuyente').val());
                $('#n_cuit').val(data.p_n_cuit || $('#n_cuit').val());
                $('#c_tributo').val(data.p_c_tributo || $('#c_tributo').val());
                $("#n_cuit").mask("99-99999999-9");
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                $('#d_objeto_hecho').val("");
                return;
            }
        }
    });
}

function busqueda3(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{  
        'p_c_tributo': $('#c_tributo').val(),
        'p_id_contribuyente': $('#id_contribuyente').val(),
        'p_n_cuit': limpia_cuit($('#n_cuit').val()),
         "id_menu":v_id_menu,
         "n_orden":2
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#d_denominacion').val(data.p_nombres || $('#d_denominacion').val());
                $('#d_objeto_hecho').val(data.p_objhecho || $('#d_objeto_hecho').val());
                $('#c_tipo_imponible').val(data.p_c_tipo_imponible || $('#c_tipo_imponible').val());
                $('#c_tipo_documento').val(data.p_tipo_documento || $('#c_tipo_documento').val());
                $('#d_tipo_documento').val(data.p_d_tipo_documento || $('#d_tipo_documento').val());
                $('#n_documento').val(data.p_n_documento || $('#n_documento').val());
                $('#id_contribuyente').val(data.p_id_contribuyente || $('#id_contribuyente').val());
                $('#n_cuit').val(data.p_n_cuit || $('#n_cuit').val());
                $("#n_cuit").mask("99-99999999-9");
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                $('#n_cuit').val("");
                return;
            }
        }
    });
}

function revalidar(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{  
        'p_c_tributo': $('#c_tributo').val(),
        'p_periodo': $('#periodo_desde').val().replace("/", ""),
        'p_periodo_hasta': $('#periodo_hasta').val().replace("/", ""),
        'p_nombres': $('#d_denominacion').val(),
        'p_n_cuit': limpia_cuit($('#n_cuit').val()),
        'p_objhecho': $('#d_objeto_hecho').val(),
        'p_id_contribuyente': $('#id_contribuyente').val(),
        'p_c_tipo_imponible': $('#c_tipo_imponible').val(),
         "id_menu":v_id_menu,
         "n_orden":3
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'Proceso terminado '){
                mostrar_cuadro('S', 'Éxito', data.resultado);
                limpiar();
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function limpiar(){
    $('#periodo_desde').val("");
    $('#periodo_hasta').val("");
    $('#id_contribuyente').val("");
    $('#d_objeto_hecho').val("");
    $('#c_tipo_documento').val("");
    $('#d_tipo_documento').val("");
    $('#d_denominacion').val("");
    $('#n_documento').val("");
    $('#n_cuit').val("");
    $('#c_tipo_imponible').val("");
    $('#c_tributo').val("");
    $('#d_tributo').val("");
}