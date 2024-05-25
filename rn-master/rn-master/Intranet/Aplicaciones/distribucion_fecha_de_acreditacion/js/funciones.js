function verificar_estado(p_c_estado,p_sel){
    
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_c_estado":p_c_estado,
            "id_menu":p_id_menu,
            "n_orden":3
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                llamar_report('RECAL121',
                            '&DESNAME|' + 'C:\SIAT_INTERFACES\LiqArtRN.'+p_filtro+fecha_hoy+'.pdf'+
                            '&P_ID_ARCHIVOS|' +p_sel+
                            '&P_TIPO_ARCHIVO|' +p_archivo,
                            'PDF');

                mostrar_cuadro('S','Exito', "El proceso finalizo correctamente");
                $('#main_grid_intbk').trigger('reloadGrid');

                $('#main_grid_ban').trigger('reloadGrid');

                $('#main_grid_epago').trigger('reloadGrid');

            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function cambiarFechaAcreditacion(p_tipo_archivo,p_h_fecha_acreditacion){
    
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
         "p_tipo_archivo":p_tipo_archivo,
         "p_h_fecha_acreditacion":p_h_fecha_acreditacion,
         "p_id_sesion":$("#id_sesion").val(),
         "id_menu":p_id_menu,
         "n_orden":2
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
            
              $('#main_grid').jqGrid('clearGridData');
                setea_parametros('#main_grid',{'p_tipo_archivo':p_archivo,
                'p_filtro':p_filtro,
                'p_f_desde':p_f_desde,
                'p_f_hasta':p_f_hasta});

                $('#main_grid').trigger('reloadGrid');

                mostrar_cuadro('S','Exito', "El proceso finalizo correctamente");

                actualizar_vista(p_archivo);
            }
            else{
                
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function fecha(fecha_desde){
    if (fecha_desde == null){
        fecha_desde='01/01/2010';
    }

    return fecha_desde;
}


function evaluaFiltro(p_filtro, valor){
    if(p_filtro.lenght==9 || p_filtro.includes(valor)){
        return p_filtro;
    }

    else{
        p_filtro=p_filtro+valor;
        return p_filtro;
    }
}

function evaluarListadoEstado(lista){
    let tamaño = lista.length;
    let hayEstadoControlado=false;
    for(let i=0 ;i<tamaño; i++){

        estado=lista[i];
        if(estado==4){
            hayEstadoControlado=true;
            return hayEstadoControlado;
        }
        else{
            return hayEstadoControlado;
        }
    }
}


function selec_todo(p_archivo){

    estadosSeleccionado.push("3");
    var fecha = $("#f_hasta").val();
    if(fecha!=''){
        p_f_hasta=$("#f_hasta").val();
    }
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_suma_percibido":p_suma_percibido,
            "p_id_sesion":$("#id_sesion").val(),
    "p_sum_t_total_importe_pesos":p_sum_t_total_importe_pesos,
     "p_sum_t_importe_contracargo":p_sum_t_importe_contracargo,
     "p_sum_t_importe_devolucion":p_sum_t_importe_devolucion,

    "p_sum_t_importe_neto":p_sum_t_importe_neto,

    "p_sum_t_importe_comision":p_sum_t_importe_comision,
    "p_sum_t_importe_impuesto":p_sum_t_importe_impuesto,
    "p_f_hasta":p_f_hasta,
    "p_f_desde":p_f_desde,
     "p_filtro":p_filtro,      
        "p_archivo":p_archivo,
        "id_menu":p_id_menu,
        "n_orden":6
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $("#main_grid_ban").trigger('reloadGrid');
                $("#main_grid_intbk").trigger('reloadGrid');
                $("#main_grid_epago").trigger('reloadGrid');
                //$("#p_sel").val($("#p_sel").val()+data.p_sel); 
                p_suma_percibido+=Number(data.p_suma_percibido);
                p_sum_t_total_importe_pesos+=Number(data.p_sum_t_total_importe_pesos);
                p_sum_t_importe_contracargo+=Number(data.p_sum_t_importe_contracargo);
                p_sum_t_importe_devolucion+=Number(data.p_sum_t_importe_devolucion);
                p_sum_t_importe_neto+=Number(data.p_sum_t_importe_neto);
                p_sum_t_importe_comision+=Number(data.p_sum_t_importe_comision);
                p_sum_t_importe_impuesto+=Number(data.p_sum_t_importe_impuesto);

                

                if(data.p_sel==''){
                    $("#p_sel").val(p_sel);
                }else{
                    $("#p_sel").val(data.p_sel);
                }
                setea_parametros("#suma_grid",{
                    "p_sum_t_total_importe_pesos":p_sum_t_total_importe_pesos,
                    "p_sum_t_importe_contracargo":p_sum_t_importe_contracargo,
                    "p_sum_t_importe_devolucion":p_sum_t_importe_devolucion,

                    "p_sum_t_importe_neto":p_sum_t_importe_neto,

                    "p_sum_t_importe_comision":p_sum_t_importe_comision,
                    "p_sum_t_importe_impuesto":p_sum_t_importe_impuesto,
                });
                $("#suma_grid").trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            reject(errorThrown);
        }
    });

    
}


async function selec_todo_II(p_archivo,p_sel_aux){
    return new Promise((resolve, reject) => {
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{
                "p_archivo":p_archivo,
                "p_sel":p_sel_aux,
                "id_menu":p_id_menu,
                "n_orden":6
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $("#main_grid_ban").trigger('reloadGrid');
                        $("#main_grid_intbk").trigger('reloadGrid');
                        $("#main_grid_epago").trigger('reloadGrid');

                        
                        resolve(data.p_sel); 
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    reject(errorThrown);
                }
            });
    });
}

function seleccionar_archivo(p_id_archivo,p_archivo){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_id_archivo":p_id_archivo,
         "p_archivo":p_archivo,
         "p_id_sesion":$("#id_sesion").val(),
         "id_menu":p_id_menu,
         "n_orden":7
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){

              estadosSeleccionado.push(data.p_c_estado);

            

              p_suma_percibido=p_suma_percibido + Number(data.p_suma_percibido);
              p_sum_t_total_importe_pesos=p_sum_t_total_importe_pesos + Number(data.p_sum_t_total_importe_pesos);
              p_sum_t_importe_contracargo=p_sum_t_importe_contracargo + Number(data.p_sum_t_importe_contracargo);
              p_sum_t_importe_devolucion=p_sum_t_importe_devolucion + Number(data.p_sum_t_importe_devolucion);
              p_sum_t_importe_neto=p_sum_t_importe_neto + Number(data.p_sum_t_importe_neto);
              p_sum_t_importe_comision=p_sum_t_importe_comision + Number(data.p_sum_t_importe_comision);
              p_sum_t_importe_impuesto=p_sum_t_importe_impuesto + Number(data.p_sum_t_importe_impuesto);

              setea_parametros('#suma_grid',{
                'p_tipo_archivo':p_archivo,
                'p_filtro':p_filtro,
                'p_f_desde':p_f_desde,
                'p_f_hasta':p_f_hasta,
                'p_suma_percibido':p_suma_percibido,
                'p_sum_t_total_importe_pesos':p_sum_t_total_importe_pesos,
                'p_sum_t_importe_contracargo' :p_sum_t_importe_contracargo,
                'p_sum_t_importe_devolucion':p_sum_t_importe_devolucion,
                'p_sum_t_importe_neto':p_sum_t_importe_neto,
                'p_sum_t_importe_comision':p_sum_t_importe_comision,
                'p_sum_t_importe_impuesto':p_sum_t_importe_impuesto
        });
            $('#suma_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
};

function deseleccionar_archivo(p_id_archivo,p_archivo){

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_id_archivo":p_id_archivo,
         "p_archivo":p_archivo,
         "p_id_sesion":$("#id_sesion").val(),
         "id_menu":p_id_menu,
         "n_orden":8
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){

                p_suma_percibido=p_suma_percibido - Number(data.p_suma_percibido);
                p_sum_t_total_importe_pesos=p_sum_t_total_importe_pesos - Number(data.p_sum_t_total_importe_pesos);
                p_sum_t_importe_contracargo=p_sum_t_importe_contracargo - Number(data.p_sum_t_importe_contracargo);
                p_sum_t_importe_devolucion=p_sum_t_importe_devolucion - Number(data.p_sum_t_importe_devolucion);
                p_sum_t_importe_neto=p_sum_t_importe_neto - Number(data.p_sum_t_importe_neto);
                p_sum_t_importe_comision=p_sum_t_importe_comision - Number(data.p_sum_t_importe_comision);
                p_sum_t_importe_impuesto=p_sum_t_importe_impuesto - Number(data.p_sum_t_importe_impuesto);

              setea_parametros('#suma_grid',{
                'p_tipo_archivo':p_archivo,
                'p_filtro':p_filtro,
                'p_f_desde':p_f_desde,
                'p_f_hasta':p_f_hasta,
                'p_suma_percibido':p_suma_percibido,
                'p_sum_t_total_importe_pesos':p_sum_t_total_importe_pesos,
                'p_sum_t_importe_contracargo' :p_sum_t_importe_contracargo,
                'p_sum_t_importe_devolucion':p_sum_t_importe_devolucion,
                'p_sum_t_importe_neto':p_sum_t_importe_neto,
                'p_sum_t_importe_comision':p_sum_t_importe_comision,
                'p_sum_t_importe_impuesto':p_sum_t_importe_impuesto
        });
            $('#suma_grid').trigger('reloadGrid');
              
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function deseleccionar_todo(p_archivo){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_archivo":p_archivo,
         "p_id_sesion": $("#id_sesion").val(),
         "id_menu":p_id_menu,
         "n_orden":9
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                p_suma_percibido=0;
                p_sum_t_total_importe_pesos=0;
                p_sum_t_importe_contracargo=0;
              p_sum_t_importe_devolucion=0;
              p_sum_t_importe_neto=0;
              p_sum_t_importe_comision=0;
              p_sum_t_importe_impuesto=0;
                estadosSeleccionado=[];
              setea_parametros('#suma_grid',{
                'p_tipo_archivo':p_archivo,
                'p_filtro':p_filtro,
                'p_f_desde':p_f_desde,
                'p_f_hasta':p_f_hasta,
                'p_suma_percibido':p_suma_percibido,
                'p_sum_t_total_importe_pesos':p_sum_t_total_importe_pesos,
                'p_sum_t_importe_contracargo' :p_sum_t_importe_contracargo,
                'p_sum_t_importe_devolucion':p_sum_t_importe_devolucion,
                'p_sum_t_importe_neto':p_sum_t_importe_neto,
                'p_sum_t_importe_comision':p_sum_t_importe_comision,
                'p_sum_t_importe_impuesto':p_sum_t_importe_impuesto
        });
            $('#suma_grid').trigger('reloadGrid');
              
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
};


function mostrarGrilla(p_archivo){
    
    if(p_archivo=='BAN'){
        $("#grid_ban").show();
        $("#grid_intbk").hide();
        $("#grid_epago").hide();
        $("#main_grid_main").hide();
        
    };
    if(p_archivo=='INTBK'){

        $("#grid_ban").hide();
        $("#grid_intbk").show();
        $("#grid_epago").hide();
        $("#main_grid_main").hide();
        
    };
    if(p_archivo=='EPAGO'){
        $("#grid_ban").hide();
        $("#grid_intbk").hide();
        $("#grid_epago").show();
        $("#main_grid_main").hide();
        
    }
};

function verificar_estados_seleccionado(p_archivo){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_archivo":p_archivo,
         "p_id_sesion":$("#id_sesion").val(),
         "id_menu":p_id_menu,
         "n_orden":10
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){

                cambiarFechaAcreditacion(p_archivo,p_h_fecha_acreditacion);
              
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function actualizar_vista(p_archivo){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_archivo":p_archivo,
         "p_id_sesion":$("#id_sesion").val(),
         "id_menu":p_id_menu,
         "n_orden":11
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
              
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function validar_fecha(f_desde, f_hasta){
    if(f_hasta>f_desde){
        mostrar_cuadro('E', 'Error', 'La fecha desde no puede ser mayor a la fecha hasta');
    }
    else{
        return;
    }
}


function obtener_id_sesion(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "id_menu":100042,
         "n_orden":12
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                
              $("#id_sesion").val(data.p_id_session);

            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}