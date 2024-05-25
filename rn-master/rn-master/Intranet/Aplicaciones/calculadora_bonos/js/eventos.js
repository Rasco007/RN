function init_eventos(){

    filtros_no_nativos = [];
    filtros_arr_main = [];



    $('#f_vencimiento').change(function () {
        filtros_no_nativos = [];
        filtros_arr_main = [];

        if($('#f_vencimiento').val() != ''){
            filtros_arr_main.push('F. de Vencimiento: '+ $('#f_vencimiento').val());
        }
        if($('#i_pagar').val() != ''){
            filtros_arr_main.push('Importe a Pagar: '+ $('#i_pagar').val());
        }
        filtros_no_nativos_ar['grid_calcula_bonos'] = filtros_arr_main;
    });


    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $('#f_vencimiento').datepicker("option",'minDate',fecha_hoy).change(function () {
        if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) < $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            mostrar_error("La fecha ingresada debe ser mayor a la fecha actual.");
            $(this).val(fecha_hoy);
        }
    });

    $('#saldo').change(function () {
        $('#saldo').val(formatea_number(mascara_numero(parse($('#saldo').val()).toFixed(2), ',', -1, 2), ''));
    });

    $('#f_vencimiento').val(fecha_hoy);
    $('#saldo').val(0);
    $('#i_pagar').val(0);
    $("#i_total").val(0);

    $(".mascara_importe").keydown(function(event){
        return controla_number(event, this,2);
    });

    $("#i_pagar").on('focusout', function (event) {
        let a_pagar = $("#i_pagar").val();
        a_pagar = a_pagar.split('.').join('');
        a_pagar = a_pagar.split(',').join('.');

        let total = $("#i_total").val();
        total = total.split('.').join('');
        total = total.split(',').join('.');

        let saldo_final = a_pagar - total;
        $("#saldo").val(formatear_numero(saldo_final,2));
        
        if(a_pagar != 0 && total != 0){
            $('#btn_imprimir').prop('disabled',false);
        }

        $('#i_pagar').val(formatea_number(mascara_numero(parse($('#i_pagar').val()).toFixed(2), ',', -1, 2), ''));
        filtros_no_nativos = [];
        filtros_arr_main = [];

        if($('#f_vencimiento').val() != ''){
            filtros_arr_main.push('F. de Vencimiento: '+ $('#f_vencimiento').val());
        }
        if($('#i_pagar').val() != ''){
            filtros_arr_main.push('Importe a Pagar: '+ $('#i_pagar').val());
        }
        filtros_no_nativos_ar['grid_calcula_bonos'] = filtros_arr_main;
    });

    $('#btn_limpiar').click(function(){
        $("#f_vencimiento").val(fecha_hoy);
        $("#f_vencimiento").prop('disabled',false);
        $("#i_pagar").val(0);
        $("#i_pagar").prop('disabled',false);
        $("#saldo").val(0);
        $("#i_total").val(0);
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{ 
             "user":null,        
             "id_menu":v_id_menu,
             "n_orden":1
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    $('#grid_calcula_bonos').trigger( 'reloadGrid' );
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });



    if($('#f_vencimiento').val() != ''){
        filtros_arr_main.push('F. de Vencimiento: '+ $('#f_vencimiento').val());
    }
    if($('#i_pagar').val() != ''){
        filtros_arr_main.push('Importe a Pagar: '+ $('#i_pagar').val());
    }
    filtros_no_nativos_ar['grid_calcula_bonos'] = filtros_arr_main;



    $('#btn_imprimir').prop('disabled',true);
    $("#saldo").prop('disabled',true);

}
