function inicializarEventos() {

    $('#examinar_recibido').click(function(){
        $('#path_arch_recibido').click();
    });
    $('#path_arch_recibido').change(function(){
        $('#ruta_archivo_recibido').val( $('#path_arch_recibido').val() );
    });

    $('#btn_levantar').click(function(){
        
        let archivoRecibido = $('#ruta_archivo_recibido').val();

        var valido = $('#frm_consulta_de_generacion').validationEngine('validate');
        if(valido) {
            if (archivoRecibido == '') {
                mostrar_cuadro('E','Error','El archivo es requerido para poder procesarlo');
                
                }else{
                    $('#main').procOverlay({visible: true});
                    procesar_archivo('LEVANTAR_ARCHIVO_MOVBAN', 'path_arch_recibido', 'd_path_arch_recibido');
                }
               
        } else{
            mostrar_cuadro('E','Error','No hay datos para generar la interfaz con los parámetros ingresados');

        }
    });
    
    $('#btn_cancelar').click(function(){
        $('#div_input_archivo_recibido :input').val(null);
        $('#ruta_archivo_recibido, #examinar_recibido').attr('disabled',false);
        $('#ruta_archivo_recibido').val(null);
        $('#path_arch_recibido').val(null);

        $('#cant_reg').val(null);
        $('#secuencia').val(null);
        $('#d_denominacion').val(null);
        $('#p_estado').val(null);
        

    });

     $('#path_arch_recibido').on('change', function() {
     var rutaArchivo = $(this).val(); // Obtiene la ruta del archivo seleccionado
     $('#ruta_archivo_recibido').val(rutaArchivo); // Actualiza el valor del campo de texto con la ruta del archivo
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