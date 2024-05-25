function inicializarEventos() {

    //mascaras
    $("#n_cuota").mask("99");
    $("#n_año").mask("9999");

    $('#examinar_recibido').click(function(){
        $('#path_arch_recibido').click();
    });
    $('#path_arch_recibido').change(function(){
        $('#ruta_archivo_recibido').val( $('#path_arch_recibido').val() );
    });



    $('#rechazos_modal').on('shown.bs.modal', function (e) {
        let gridParentWidth = $('#gbox_rechazos_grid').parent().parent().width();
        $('#rechazos_grid').setGridWidth(gridParentWidth);
    });

    if (v_id_workflow_log){
        $('#c_tributo').val(v_tributo).blur();
        $('#c_concepto').val(v_concepto).blur();
        $('#n_año').val(v_anio);
        $('#n_cuota').val(v_cuota);
        $('#t_interfaz').val(v_interfaz);
    }

    $('#btn_procesar').click(function(){
        
        //SI T_INTERFAZ ES LINK, EL CONCEPTO DEBE IR
       let t_interfaz= $('#t_interfaz').val();
       let c_concepto= $('#c_concepto').val();
        
        var valido = $('#frm_consulta_de_generacion').validationEngine('validate');
        if(valido) {
            if (t_interfaz == 'L' && c_concepto == '') {
                mostrar_cuadro('E','Error','Es necesario cargar el concepto para la Interfaz Link.');
                }
                    
                else{
                    $('#main').procOverlay({visible: true});
                    procesar_archivo('LEVANTAR_ARCHIVO_BANELCO', 'ruta_archivo_recibido', 'ruta_archivo_recibido');
                }
               
        } else{
            mostrar_cuadro('E','Error','No hay datos para generar la interfaz con los parámetros ingresados');
        }
    });
    
    $('#btn_limpiar').click(function(){
        $('#div_input_archivo_recibido :input').val(null);
        $('#ruta_archivo_recibido, #examinar_recibido').attr('disabled',false);
        $('#ruta_archivo_recibido').val(null);
        $('#path_arch_recibido').val(null);
        if(!v_tributo){
            $('#c_tributo').val(null);
            $('#d_tributo').val(null);
        }
        if(!v_concepto){
            $('#c_concepto').val(null);
            $('#d_concepto').val(null);
        }
        if(!v_anio){
            $('#n_año').val(null);
        }
        if(!v_cuota){
            $('#n_cuota').val(null);
        }
        $('#id_sesion').val(null);
    });

    $('#path_arch_recibido').on('change', function() {
    var rutaArchivo = $(this).val(); // Obtiene la ruta del archivo seleccionado
    $('#ruta_archivo_recibido').val(rutaArchivo); // Actualiza el valor del campo de texto con la ruta del archivo
    });

    $('#ruta_archivo_recibido').focusout(function(){
        if($('#ruta_archivo_recibido').val() == '' && $('#c_tributo').val() != ''){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "t_interfaz":$('#t_interfaz').val(),
                 "c_tributo":$('#c_tributo').val(),
                 "id_menu":v_id_menu,
                 "n_orden":0
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $('#ruta_archivo_recibido').val(data.retorno);
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 

        }
    });

    $('#t_interfaz').change(function(){
        $('#ruta_archivo_recibido').val(null);
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