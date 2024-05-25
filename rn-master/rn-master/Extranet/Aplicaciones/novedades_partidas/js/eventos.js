function inicializarEventos() {
    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999").change(function () {
        if ($(this).val() && $(this).val().length != 10){
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }
    });

    $('#f_novedad_desde').change(function () {
        $('#f_novedad_hasta').datepicker('option','minDate',$('#f_novedad_desde').val());
    });

    $('#f_novedad_hasta').change(function () {
        $('#f_novedad_desde').datepicker('option','maxDate',$('#f_novedad_hasta').val());
    });

    $('#btn_buscar').click(function () {
        if ($('#frm_consulta').validationEngine('validate')){
            setea_parametros('#main_grid',{
                ':p_f_desde':$('#f_novedad_desde').val(),
                ':p_f_hasta':$('#f_novedad_hasta').val()});
        }
    });

    $('#btn_limpiar').click(function(){
        $('#frm_consulta :input').val(null);
        $('.datepicker').change();
        $('#main_grid').jqGrid('clearGridData');
    });

}