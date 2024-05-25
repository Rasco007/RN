function busqueda_contribuyente(p_n_cuit,p_n_documento, p_c_tipo_documento,p_c_instancia,p_n_instancia,p_c_expediente,
    p_id_contribuyente,p_c_sector_origen,p_c_motivo_origen,p_f_origen,p_f_vto, p_f_confirmacion){

        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_n_cuit":p_n_cuit,
             "p_n_documento":p_n_documento,
             "p_c_tipo_documento":p_c_tipo_documento,
             "p_c_instancia":p_c_instancia,
             "p_n_instancia":p_n_instancia,
             "p_c_expediente":p_c_expediente,
             "p_id_contribuyente":p_id_contribuyente,
             "p_c_sector_origen":p_c_sector_origen,
             "p_c_motivo_origen":p_c_motivo_origen,
             "p_f_origen":p_f_origen,
             "p_f_vto":p_f_vto,
             "id_menu":v_id_menu,
             "n_orden":6
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    
                    $("#id_contribuyente").val(data.p_id_contribuyente);
                    p_c_instancia=data.p_c_instancia;
                    p_c_sector_origen=data.p_c_sector_origen;
                    p_c_motivo_origen=data.p_c_motivo_origen;
                    p_n_instancia=data.p_n_instancia;
                    p_n_orden=data.p_n_orden;
                    
                    $("#c_instancia").val(p_c_instancia);
                    $("#c_sector_origen").val(p_c_sector_origen);
                    $("#c_motivo_origen").val(p_c_motivo_origen);
                    $("#n_instancia").val(p_n_instancia);
                    $("#n_orden").val(p_n_orden);
                    $("#f_origen").val(data.p_f_origen);
                    $("#f_vto").val(data.p_f_vto);
                    p_c_sector_origen=data.p_c_sector_origen;
                    p_c_motivo_origen=data.p_c_motivo_origen;
                    $("#f_confirmacion").val(data.p_f_confirmacion);
                    p_f_confirmacion=data.p_f_confirmacion;

                    if(data.p_f_vto){
                        $("#f_concurso_quiebra").attr('disabled',false);
                        $("#btn_actualizar").attr('disabled',false);
                        $("#btn_revertir").attr('disabled',false);
                    };

                    datos_de_instancia(data.p_id_contribuyente, p_p_cont, p_c_motivo_origen, p_c_instancia, p_d_instancia,
                        p_sector_origen, data.p_c_sector_origen, p_motivo_origen, p_n_cuit, p_d_denominacion, p_c_tipo_documento,
                        p_n_documento, p_desc_denom, p_c_expediente);
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    };

function fecha_vto(p_f_origen,p_c_instancia,p_f_vto){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_f_origen":p_f_origen,
         "p_c_instancia":p_c_instancia,
         "p_f_vto":p_f_vto,
         "id_menu":v_id_menu,
         "n_orden":0
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

function datos_de_instancia(p_id_contribuyente, p_p_cont, p_c_motivo_origen, p_c_instancia, p_d_instancia, p_sector_origen,
    p_c_sector_origen, p_motivo_origen, p_n_cuit, p_d_denominacion, p_c_tipo_documento, p_n_documento,p_desc_denom,p_c_expediente){
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_id_contribuyente":p_id_contribuyente,
             "p_p_cont":p_p_cont,
             "p_c_motivo_origen":p_c_motivo_origen,
             "p_c_instancia":p_c_instancia,
             "p_d_instancia":p_d_instancia,
             "p_sector_origen":p_sector_origen,
             "p_c_sector_origen":p_c_sector_origen,
             "p_motivo_origen":p_motivo_origen,
             "p_d_denominacion":p_d_denominacion,
             "p_n_documento":p_n_documento,
             "p_desc_denom":p_desc_denom,
             "id_menu":v_id_menu,
             "n_orden":1
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    p_n_cuit=data.p_n_cuit;
                    p_n_documento=data.p_n_documento;
                    p_c_tipo_documento=data.p_c_tipo_documento;
                    p_c_motivo_origen=data.p_c_motivo_origen;
                    p_motivo_origen=data.p_motivo_origen;
                    $("#n_cuit").val(p_n_cuit);
                    $("#n_documento").val(p_n_documento);
                    $("#c_tipo_documento").val(p_c_tipo_documento);
                    $("#c_motivo_origen").val(p_c_motivo_origen);
                    $("#motivo_origen").val(p_motivo_origen);
                    $("#desc_denom").val(data.p_desc_denom);
                    $("#d_sector_origen").val(data.p_sector_origen);
                    $("#d_instancia").val(data.p_d_instancia);
                    detalles_de_instancia(p_c_expediente, p_f_resolucion, p_d_resolucion, p_d_observ, p_c_dato, p_d_dato)

                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    }

function detalles_de_instancia(p_c_expediente, p_f_resolucion, p_d_resolucion, p_d_observ, p_c_dato, p_d_dato){

        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_c_expediente":p_c_expediente,
             "id_menu":v_id_menu,
             "n_orden":10
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                  $("#d_resolucion").val(data.p_d_resolucion);
                  $("#f_resolucion").val(data.p_f_resolucion);
                  $("#d_observ").val(data.p_d_observ);
                  fecha_vto(f_origen,c_instancia,f_vto);

                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    };

function fecha_vto(f_origen,c_instancia,f_vto){
    f_origen=$("#f_origen").val();
    c_instancia=$("#c_instancia").val();
    f_vto=$("#f_vto").val();

    if(f_origen!='' && c_instancia!='' && f_vto!=''){
        calcula_vto(f_origen,c_instancia,f_vto);

    }
};

function calcula_vto(f_origen, c_instancia, p_sector_origen,p_motivo_origen,f_vto){
    p_sector_origen=$("#d_sector_origen").val();
    p_motivo_origen=$("#motivo_origen").val();
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_fecha":f_origen,
         "p_instancia":c_instancia,
         "p_sector":p_sector_origen,
         "p_motivo":p_motivo_origen,
         "p_fecha_Vto":f_vto,
         "id_menu":v_id_menu,
         "n_orden":2
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

function cancela_deuda(p_c_expediente,p_objeto, p_posicion , p_cuota, p_concepto, p_adeudado, p_respuesta, p_actual){

    p_c_expediente=$("#c_expediente").val();
    p_objeto='';
    p_posicion='';
    p_cuota='';
    p_concepto='';
    p_adeudado='';
    p_respuesta='';

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_c_expediente":p_c_expediente,
            "p_objeto":p_objeto,"p_posicion": p_posicion ,"p_cuota": p_cuota ,
            "p_concepto":p_concepto, "p_adeudado":p_adeudado, "p_respuesta":p_respuesta,
            "p_actual":p_actual,
            "id_menu":v_id_menu,
            "n_orden":3
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                if(data.p_respuesta=='S'){
                mostrar_cuadro('Q','Confirmacion','El saldo actual de algunas obligaciones no coincide con el monto adeudado que figura en la BD, confirma igual?',
                function(){
                },function(){
                    mostrar_cuadro('E','Cancelado','Confirmación CANCELADA.');
                });
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function generar_oblig(p_c_expediente,p_f_confirmacion,p_c_instancia,p_concurso,p_quiebra,p_id_contribuyente,p_f_origen){
    p_c_expediente=$("#c_expediente").val();
    p_c_instancia=$("#c_instancia").val();
    p_id_contribuyente=$("#id_contribuyente").val();
    p_quiebra=$("#p_quiebra").val();
    p_concurso=$("#p_concurso").val();
    p_f_origen=$("#f_origen").val();
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_c_expediente":p_c_expediente,
         "p_f_confirmacion":p_f_confirmacion,
         "p_c_instancia":p_c_instancia,
         "p_concurso":p_concurso,
         "p_quiebra":p_quiebra,
         "p_id_contribuyente":p_id_contribuyente,
         "p_f_origen":p_f_origen,
         "id_menu":v_id_menu,
         "n_orden":4
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $("#modal_diferencia").modal('show');
                $(window).resize();
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
};

function obtener_globales(p_intimacion,p_pfp,p_n_tabla,p_int_inmob, p_quiebra, p_concurso){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_intimacion":p_intimacion,
            "p_pfp":p_pfp,
            "p_n_tabla":p_n_tabla,
            "p_int_inmob":p_int_inmob, 
            "p_quiebra":p_quiebra, 
            "p_concurso":p_concurso,
         "id_menu":v_id_menu,
         "n_orden":7
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                p_intimacion=data.p_intimacion;
                p_pfp=data.p_pfp;
                p_n_tabla=data.p_n_tabla;
                p_int_inmob=data.p_int_inmob;
                p_quiebra=data.p_quiebra;
                p_concurso=data.p_concurso;

                $("#p_intimacion").val(p_intimacion);
                $("#p_pfp").val(p_pfp);
                $("#p_n_tabla").val(p_n_tabla);
                $("#p_int_inmob").val(p_int_inmob);
                $("#p_quiebra").val(p_quiebra);
                $("#p_concurso").val(p_concurso);
              
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });    
};

function revertir(p_f_confirmacion, p_c_expediente){
    p_f_confirmacion=$("#f_concurso_quiebra").val();
    p_c_expediente=$("#c_expediente").val();
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_f_confirmacion":p_f_confirmacion,
            "p_c_expediente":p_c_expediente,
            "id_menu":v_id_menu,
            "n_orden":8
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                mostrar_cuadro("I","Aviso","El Concurso / Quiebra ha sido revertido satisfactoriamente.");
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
};

function abrir_modal(modal){
    $(modal).modal('show');
    $(window).resize();
}

function eliminar_Datos_tmp(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "id_menu":v_id_menu,
         "n_orden":9
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