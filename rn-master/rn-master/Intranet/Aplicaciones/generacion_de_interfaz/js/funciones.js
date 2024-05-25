function inicializarLupas() {
    $("#lupa_c_medio_pago").lupa_generica({
        id_lista:v_lista_medios_debito,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:460}],
        caption:'Lista de Medios de Pago',
        sortname:'c_codigo',
        sortorder:'asc',
        searchInput: '#c_medio_pago',
        searchCode: true,
        campos:{c_codigo:'c_medio_pago',d_descrip:'d_medio_pago'},
        keyNav:true
    });

    $("#lupa_c_producto").lupa_generica({
        id_lista:v_lista_productos,
        titulos:['Código','Descripción', 'Código Origen'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:460},
            {index:'c_origen',width:100, hidden:true}],
        caption:'Lista de Productos',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_producto',d_descrip:'d_producto', c_origen: 'c_origen'},
        searchInput: '#c_producto',
        searchCode: true,
        keyNav:true,
        limpiarCod: true,
        onClose: function(){
            actualizar_nombre_archivo();
        }
    });

    $("#lupa_f_cartera").lupa_generica({
        id_lista:v_lista_f_cartera,
        titulos:['Fecha'],
        grid:[  {index:'f_cartera',width:560}],
        caption:'Lista de Fechas de Cartera',
        sortname:'f_cartera',
        sortorder:'desc',
        campos:{f_cartera:'f_cartera'},
        filtros:['#c_medio_pago'],
        keyNav:true
    });
}

function actualizar_nombre_archivo(){
    let ruta = $('#ruta_archivo').val()
    if (ruta == ''){
        $('#ruta_archivo').val(valorRuta);
        }else{
        let partes = $('#ruta_archivo').val().split('.');
        if (partes && $('#c_origen').val()){
            $('#ruta_archivo').val(partes[0] + "." + $('#c_origen').val());
        }
    }
}

function consulta_de_generacion(params){
    params.id_menu = v_id_menu;
    params.n_orden = 0;
    $('#comentarios').val('Generando datos de la solicitud. Aguarde unos momentos');
    barra_progreso(true);
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        beforeSend: function(xhr, settings){},
        success: function( data ) {
            barra_progreso(false);
            if(data.resultado === 'Problemas al generar los datos.'){
                mostrar_error(data.resultado);
                $('#comentarios').val(data.resultado);
                return;
            }if(data.resultado === 'No hay datos nuevos'){
                mostrar_error(data.resultado);
                $('#comentarios').val($('#comentarios').val()+'\n'+data.p_estado);
                return;
            }else{
                $('#comentarios').val($('#comentarios').val()+'\n'+data.p_estado);
                post_to_url('consulta_cobros_tarjeta.php', {
                    'f_cartera': $("#f_cartera").val().split('/')[1] + '/' + $("#f_cartera").val().split('/')[2],
                    'p_c_medio_pago': $("#c_medio_pago").val(),
                    'p_d_medio_pago': $("#d_medio_pago").val(),
                    'p_c_producto': $("#c_producto").val(),
                    'p_d_producto': $("#d_producto").val(),
                    'p_n_id_menu': 11011}, '_blank');
                return;
            }
        },
        error: function (data, status, e) {
            barra_progreso(false);
            mostrar_cuadro('E','Error','Error al consultar el archivo'+ status +'<br /><b>Error:</b> '+e+'</p>','','');
            return;
        }
    });
}
function generar_disco(params){
    params.id_menu = v_id_menu;
    params.n_orden = 1;
    $('#comentarios').val('Generando datos de la solicitud. Aguarde unos momentos');
    barra_progreso(true);

    if(v_id_workflow_log){
        actualizar_tarea_workflow(v_id_workflow_log, v_c_tarea, 'E', 0, 'N');
    }
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                barra_progreso(false);

                if(v_id_workflow_log){
                    actualizar_tarea_workflow(v_id_workflow_log, v_c_tarea, 'R', 0, 'S');
                }
                $('#comentarios').val($('#comentarios').val()+'\n'+data.p_estado);
                if(data.p_n_id_disco != null){
                    mostrar_mensaje_modal('I','La Interfaz ha sido generada con éxito.','El archivo ha sido creado.');
                    fun_imprimir_archivo_errores('SI', data.p_n_id_disco, obtener_nombre_archivo($('#ruta_archivo').val()));
                    $('#comentarios').val($('#comentarios').val()+'LA INTERFAZ HA SIDO GENERADA CON EXITO. EL ARCHIVO ' + obtener_nombre_archivo($('#ruta_archivo').val()) +' HA SIDO CREADO.');
                }else{
                    mostrar_mensaje_modal('I','No existen datos para la interfaz');

                }
                return;
            }else{
                barra_progreso(false);
                if(v_id_workflow_log){
                    actualizar_tarea_workflow(v_id_workflow_log, v_c_tarea, 'P', 0, 'N');
                }
                mostrar_error(data.resultado);
                $('#comentarios').val($('#comentarios').val()+'\n'+data.resultado);
                return;
            }
        },
        error: function (data, status, e) {
            barra_progreso(false);
            mostrar_cuadro('E','Error','Error al generar el archivo'+ status +'<br /><b>Error:</b> '+e+'</p>','','');
            return;
        }
    });
}

function fun_imprimir_archivo_errores(p_hay_errores, p_n_id_disco, p_nombre_disco){
    post_to_url("interfaces/descargar_archivo_errores.php",
        {
            "p_n_id_menu":v_id_menu,
            "p_n_id_disco":p_n_id_disco,
            "p_path": p_nombre_disco,
            "p_hay_errores": p_hay_errores,
            "p_path_recha": obtener_nombre_archivo($('#ruta_archivo').val())
        },
        '_blank', 'POST');
}

function obtener_nombre_archivo(path) {
    var ultima_barra = path.lastIndexOf('\\');
    var ultima_parte = path.substr(ultima_barra + 1);
    return ultima_parte;
}
