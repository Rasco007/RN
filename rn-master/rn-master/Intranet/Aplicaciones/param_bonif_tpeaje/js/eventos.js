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

    $('#btn_buscar').click(function(){
        setea_parametros('#main_grid',{':p_id_bonificacion':$('#filtro_id_bonificacion').val(),
                                    ':p_f_vigencia':$('#filtro_f_vigencia').val()});
    });

    $('#btn_limpiar').click(function(){       
        $('#frm_consulta :input').val(null);

        setea_parametros('#main_grid',{':p_id_bonificacion':null,
            ':p_f_vigencia':null});
    });
});

$(document).on("DOMNodeInserted",function(evt){
    $(".only_numbers", evt.target).each(function() {
        var events = $._data(this,'events');
        if(events && events['keypress']) return;

        $(this).keypress(function (tecla) {
            return (tecla.charCode >= 48 && tecla.charCode <= 57 && $(this).val().length < $(this).attr('maxl'));
        });
    }).css('text-align','right');
});
