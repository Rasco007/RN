$(document).ready(function() {
    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999").change(function () {
        if ($(this).val().length != 10){
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }
    });

    $(".mascara_importe").each(function () {
        var events = $._data(this, 'events');
        if (events && events['keydown']) return;
        $(this).keydown(function (event) {
            if ($(this).prop('readonly')) return;
            return controla_number(event, this, 2);
        });
    }).css('text-align', 'right');

    $('#btn_buscar').click(function(){
        setea_parametros('#main_grid',{':p_c_tipo_imp':v_c_tipo_imp,
            ':p_c_tributo':v_c_tributo,':p_c_concepto':$('#filtro_c_concepto').val(),
            ':p_f_vigencia':$('#filtro_f_vigencia').val()});
        $('#filtro_c_concepto, #filtro_f_vigencia').attr('disabled',true);
    });

    $('#btn_limpiar').click(function(){       
        $('#frm_consulta :input').attr('disabled', false).val(null);
        $('#frm_consulta .selectpicker').selectpicker('refresh');

        setea_parametros('#main_grid',{
            ':p_c_tipo_imp':v_c_tipo_imp,
            ':p_c_tributo':v_c_tributo,
            ':p_c_concepto':null,
            ':p_f_vigencia':null});
    });
});
