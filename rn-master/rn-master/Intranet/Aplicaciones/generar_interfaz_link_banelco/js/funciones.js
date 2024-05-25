function inicializarLupas() {
    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_trib,
        titulos:['Cód. Tributo','Tributo', 'Año', 'Cuota'],
        grid:[  {index:'c_codigo',width:125},
            {index:'d_descrip',width:440},
            {index:'año',width:100, hidden:true},
            {index:'cuota',width:100, hidden:true}],
        caption:'Lista de Tributos',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo', año: 'n_año', cuota:'n_cuota'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        onClose: function(){
            if (v_id_workflow_log){
                $('#n_año').val(v_anio);
                $('#n_cuota').val(v_cuota);
            }
            $('#c_concepto').val(null);
            $('#d_concepto').val(null);
        }
    });


    $("#lupa_c_concepto").lupa_generica({
        id_lista:v_lista_concepto,
        titulos:['Cód. Concepto','Concepto'],
        grid:[  {index:'c_codigo',width:140},
            {index:'d_descrip',width:425}],
        caption:'Lista de Conceptos',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['#c_tributo'],
        filtrosNulos: [false,true],
        filtrosTitulos:['Tributo'],
        campos:{c_codigo:'c_concepto',d_descrip: 'd_concepto'},
        keyNav:true,
        searchInput: '#c_concepto',
        searchCode: true,
    });
}

function procesar_archivo(interfaz, id_elemento, n_elemento){
    var d_path = $("#"+id_elemento).val() ;
    proceso = interfaz;
    if(d_path){
        $('#main').procOverlay({visible:true});
    
        post_procesar_archivo();
    }else{
        $('#main').procOverlay({visible:false});
        mostrar_cuadro('E','Error','Debe ingresar un nombre de archivo para generar.');
    }
}
function post_procesar_archivo(){
    $('#main').procOverlay({visible:true});
	
    if(v_id_workflow_log){
        actualizar_tarea_workflow(v_id_workflow_log, v_c_tarea, 'E', 0, 'N');
    }

    $.ajax({
        type: "POST",
        url: "generar_interfaz_link_banelco/php/generar_archivo.php",
        data: {
            "p_c_tributo": $('#c_tributo').val(),
            "p_n_año": $('#n_año').val(),
            "p_n_cuota": $('#n_cuota').val(),
            "p_c_concepto": $('#c_concepto').val(),
            "p_id_sesion": $('#id_sesion').val(),
            "p_path": $('#ruta_archivo_recibido').val(),
            "p_t_interfaz": $('#t_interfaz').val()
        },
        dataType: "json",
        success: function (resp) {
            $('#main').procOverlay({visible:false});
            if(resp.resultado === 'OK'){
                    if(v_id_workflow_log){
                        actualizar_tarea_workflow(v_id_workflow_log, v_c_tarea, 'R', 0, 'S');
                    }
                    mostrar_mensaje_modal('S','Interfaz generada.',' Interfaz generada correctamente.');
                    fun_imprimir_archivo_errores(resp.p_hay_errores, resp.p_id_disco_nuevo, $('#ruta_archivo_recibido').val());
                    if(resp.p_t_interfaz == 'L'){
                        fun_imprimir_archivo_errores(resp.p_hay_errores, resp.p_id_disco_nuevo_apoyo, resp.p_nom_disco_arch_apoyo);
                    }
                    $('#btn_limpiar').click();
            }else{
                if(v_id_workflow_log){
                    actualizar_tarea_workflow(v_id_workflow_log, v_c_tarea, 'P', 0, 'N');
                }
                mostrar_cuadro('E','Error al generar la Interfaz.', resp.resultado);
            }
        },
        error: function (data, status, e) {
            mostrar_cuadro('E','Error','Error al generar el archivo'+ status +'<br /><b>Error:</b> '+e+'</p>','','');
        }
    });
}
function fun_imprimir_archivo_errores(p_hay_errores, p_n_id_disco, p_nombre_disco){
    post_to_url("interfaces/descargar_archivo_errores.php",
        {
            "p_n_id_menu":v_id_menu,
            "p_n_id_disco":p_n_id_disco, //ES EL NUEVO ID del NUEVO ARCHIVO
            "p_path": p_nombre_disco,
            "p_hay_errores": 'SI', //le pongo el SI harcodeado porque sino no funciona en "descargar_archivo_errores"
            "p_path_recha":  p_nombre_disco
        },
        '_blank', 'POST');
}
function obtener_nombre_archivo(path) {
    var ultima_barra = path.lastIndexOf('\\');
    var ultima_parte = path.substr(ultima_barra + 1);
    return ultima_parte;
}
function fun_ver_grilla_errores(){
    let aux = obtener_nombre_archivo($('#ruta_archivo_recibido').val());
    $('#rechazos_title').text("Detalle de Registros Erróneos - " + aux);
    $('#rechazos_modal').modal('show');
}

function actualizar_input(){
    $('#ruta_archivo_recibido').val( $('#path_arch_recibido').val() );
    $('#ruta_archivo_salida').val( $('#path_arch_salida').val() );
}