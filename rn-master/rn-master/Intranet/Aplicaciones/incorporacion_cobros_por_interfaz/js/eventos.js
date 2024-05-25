function inicializarEventos() {
    //Como es el único medio, lo seteamos por defecto para facilitar al usuario
    $("#c_medio_pago").val(10);
    $("#d_medio_pago").val('DEBITO DIRECTO');

    $('.datepicker').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    }).mask("99/99/9999");

    $('#btn_procesar').click(function () {

        if ($('#ruta_archivo_recibido').val() == "" || $('#ruta_archivo_salida').val() == "") {
            mostrar_error('Debe indicar el nombre de ambos Archivos.'); return;
        }

        $('#comentarios').val(null);

        var valido = $('#frm_consulta_de_generacion').validationEngine('validate');
        if (valido) {
            $('#main').procOverlay({ visible: true });
            procesar_archivo('LEVANTAR_SOLICITUD DEBITO', 'path_arch_recibido', 'd_path_arch_recibido');
        }
    });

    $('#btn_cancelar').click(function () {
        $('#div_input_archivo_recibido :input').val(null);
        $('#div_input_archivo_salida :input').val(null);
        $('#ruta_archivo_recibido, #examinar_recibido, #examinar_salida').attr('disabled', false);
        $('#ruta_archivo_recibido').val(null);
        $('#ruta_archivo_salida').val(null);
        $('#path_arch_recibido').val(null);
        $('#f_recepcion').val(null);
        $('#comentarios').val(null);
    });

    $('#ruta_archivo_recibido, #examinar_recibido').focusout(function () { //Por ejemplo ORIxxxddmmarchivo.txt completa la fecha con el dia dd, el mes mm y el anio actual
        $('#f_recepcion').val(obtener_fecha(obtener_nombre_archivo($('#ruta_archivo_recibido').val()).substr(3, 4).concat(obtener_anio())))
        let nombre_archivo = $('#ruta_archivo_recibido').val().substring(12);
        $('#ruta_archivo_salida').val(nombre_archivo.replace(/\./, '_RECH.'));
    });

    $('#ruta_archivo_salida').focusout(function () {
        if ($('#ruta_archivo_salida').val().substring(0, 3) != 'ORI') {
            let posicion = $('#ruta_archivo_salida').val().indexOf('O');
            if (posicion != -1) {
                $('#ruta_archivo_salida').val($('#ruta_archivo_salida').val().substring(posicion));
            }
        }
    });

    function obtener_nombre_archivo(path) {
        var ultima_barra = path.lastIndexOf('\\');
        var ultima_parte = path.substr(ultima_barra + 1);
        return ultima_parte;
    }

    function obtener_anio() {
        var fecha_actual = new Date();
        var anio = fecha_actual.getFullYear();
        var anio_str = anio.toString();
        return anio_str;
    }

    function obtener_fecha(str_fecha) {
        var dia = str_fecha.substring(0, 2);
        var mes = str_fecha.substring(2, 4);
        var anio = str_fecha.substring(4);

        if (isNaN(Date.parse(mes + '/' + dia + '/' + anio))) {
            return '';
        } else {
            var fecha_str = dia + '/' + mes + '/' + anio;
            return fecha_str;
        }
    }
}