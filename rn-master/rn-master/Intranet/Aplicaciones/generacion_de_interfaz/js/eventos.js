function inicializarEventos() {

    $('#c_producto').val(v_c_producto).blur();
    $('#c_medio_pago').val(v_c_medio_pago).blur();

    if (v_tributo){
        $.ajax({
            url:'generacion_de_interfaz/php/traer_mes_cartera.php',
            type:"POST",
            data:{
                p_c_tributo: v_tributo,
                p_c_concepto: v_concepto,
                p_n_posicion_fiscal: v_anio+'00',
                p_n_cuota: v_cuota
            },
            dataType:'json'
        }).done(function(data) {
            if(data.resultado == 'OK'){
                if (data.datos.length > 0){
                    $('#f_cartera').val(data.datos[0]['F_CARTERA']);
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        });
    }

    //Como es el único medio, lo seteamos por defecto para facilitar al usuario
    $("#c_medio_pago").val(10);
    $("#d_medio_pago").val('DEBITO DIRECTO');

    $('#btn_consulta_generacion').click(function(){

        $('#comentarios').val(null);

        var valido = $('#frm_consulta_de_generacion').validationEngine('validate');
        if(valido) {
            var params = {
                p_c_medio_pago : $('#c_medio_pago').val(),
                p_c_producto : $('#c_producto').val(),
                p_f_cartera :$('#f_cartera').val(),
                p_estado :$('#comentarios').val()
            };
            consulta_de_generacion(params);
        }
    });

    $('#btn_generar_disco').click(function(){

        $('#comentarios').val(null);

        if ($('#ruta_archivo').val() == ""){
            mostrar_error('El campo Directorio para dejar la interface no puede quedar vacío.'); return;
        }

        var valido = $('#frm_consulta_de_generacion').validationEngine('validate');
        if(valido) {
            var params = {
                p_c_medio_pago : $('#c_medio_pago').val(),
                p_c_producto : $('#c_producto').val(),
                p_f_cartera :$('#f_cartera').val(),
                p_path: $('#ruta_archivo').val(),
                p_estado :$('#comentarios').val()
            };
            generar_disco(params);
        }
    });

    $('#ruta_archivo').change(function(){
        actualizar_nombre_archivo();
    });

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "path":$("#ruta_archivo").val(),
            "c_medio_pago":$("#c_medio_pago").val(),
            "n_orden":2,
            "id_menu":v_id_menu
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#ruta_archivo').val(data.p_new_p_path)
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });

    $('#btn_cancelar').click(function(){
        $('#f_cartera').val(null);
        $('#comentarios').val(null);
        $('#c_producto').val(null);
        $('#d_producto').val(null);
         valorRuta = $('#ruta_archivo').val();

        $('#ruta_archivo').val(null);
       // $('#div_input_archivo :input').val(null);
        //$('#ruta_archivo, #examinar_recibido').attr('disabled',false);
    });
}