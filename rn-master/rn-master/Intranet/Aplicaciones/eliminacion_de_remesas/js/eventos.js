function init_eventos(){
    $('#cant').val(0);
    $('#f_remesa').datepicker("option",'minDate',fecha_hoy).change(function () {
        if ($.datepicker.parseDate('dd/mm/yy', $('#f_remesa').val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            mostrar_cuadro('E', 'Error',"La Fecha ingresada no puede ser mayor a la fecha actual.");
            $('#f_remesa').val(fecha_hoy);
            return;
        }});

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $('.numerico').on('input', function() {
        let inputValue = $(this).val();
    
        inputValue = inputValue.replace(/\D/g, '');
    
        $(this).val(inputValue);
      });

    $("#lupa_remito").lupa_generica({
        id_lista:v_lista_remito,
        titulos:['Remito','Código Banco', 'Descripción', 'Fecha', 'Cantidad', 'Importe'],
        grid:[{index:'c_codigo',width:150},
            {index:'c_banco',width:100},
            {index:'d_descrip',width:200},
            {index:'f_remesa',width:100},
            {index:'n_cantidad',width:100},
            {index:'i_remito',width:100}],
        caption:'Lista de Remitos',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'remito',c_banco: 'c_banco', d_descrip: 'd_banco', f_remesa:'f_remesa', n_cantidad: 'cant', i_remito:'importe'},
        keyNav:true,
        onClose:function(){
            set_fecha_pago($('#remito').val());
            if(!isNaN(Number($('#importe').val()))){
                $('#importe').val(Number($('#importe').val()).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
            }
        }
    });

    $('#btn_buscar').click(function(){
        if ($('#remito').val()){
            buscar_datos_remito();
        }else{
            mostrar_error('Debe ingresar primero un Número de Remito');
        }
    });

    $('#btn_limpiar').click(function(){
        $('#remito').val("");
        $('#c_banco').val("");
        $('#f_remesa').val("");
        $('#f_pago').val("");
        $('#cant').val(0);
        $('#importe').val("");
        $('#d_banco').val("");
        $("#lupa_remito").show();
        $("#remito").attr('readonly',false);
        $("#btn_eliminar").attr('disabled',true);
    });

    $('#btn_eliminar').click(function(){
        if ($('#remito').val() == ""){
            mostrar_error('ERR-00001 #1Remito');
            return;
        }else{
            mostrar_cuadro('C','Confirmación de Eliminación','Se eliminará el remito seleccionado. \n¿Desea continuar?',
				function () {
					eliminar();
				});
        }
    });

}


