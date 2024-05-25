function busqueda_contribuyente(p_n_cuit,p_n_documento, p_c_tipo_documento,p_c_instancia,p_n_instancia,p_c_expediente,
                                p_id_contribuyente,p_c_sector_origen,p_c_motivo_origen,p_f_origen,p_f_vto){


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
                                         "n_orden":0
                                        },
                                        dataType:'json',
                                        success: function( data ) {
                                            if(data.resultado == 'OK'){
                                                
                                                p_id_contribuyente=data.p_id_contribuyente;
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

                                                
                                                
                                                if(data.p_f_vto){
                                                    
                                                    $("#f_concurso_quiebra").attr('disabled',false);
                                                    $("#btn_actualizar").attr('disabled',false);
                                                }

                                                datos_de_instancia(p_id_contribuyente,
                                                    p_p_cont, p_c_motivo_origen,
                                                    p_c_instancia, p_c_origen,
                                                    p_d_instancia,
                                                    p_sector_origen,
                                                    p_c_sector_origen,
                                                    p_motivo_origen,
                                                    p_n_cuit,
                                                    p_d_denominacion,
                                                    p_c_tipo_documento,
                                                    p_n_documento,
                                                    p_desc_denom,
                                                    p_c_expediente);
                                            }
                                            else{
                                                mostrar_cuadro('E', 'Error', data.resultado);
                                                return;
                                            }
                                        }
                                    }); 




                                };



function datos_de_instancia(p_id_contribuyente,
    p_p_cont, p_c_motivo_origen,
    p_c_instancia, p_c_origen,
    p_d_instancia,
    p_sector_origen,
    p_c_sector_origen,
    p_motivo_origen,
    p_n_cuit,
    p_d_denominacion,
    p_c_tipo_documento,
    p_n_documento,
    p_desc_denom,
    p_c_expediente){
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_id_contribuyente":p_id_contribuyente,
             "p_p_cont":p_p_cont,
             "p_c_motivo_origen":p_c_motivo_origen,
             "p_c_instancia":p_c_instancia,
             "p_c_origen":p_c_origen,
             "p_d_instancia":p_d_instancia,
             "p_sector_origen":p_sector_origen,
             "p_c_sector_origen":p_c_sector_origen,
             "p_motivo_origen":p_motivo_origen,
             "p_d_denominacion":p_d_denominacion,
             "p_c_tipo_documento":p_c_tipo_documento,
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

        //ajax
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_c_expediente":p_c_expediente,
             "id_menu":v_id_menu,
             "n_orden":2
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                  //pasar los datos al php
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    };

function modificar_fecha_vencimiento(p_f_vto, p_c_expediente, p_n_orden, p_n_instancia){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_c_expediente":p_c_expediente,
         "p_f_vto":p_f_vto,
         "p_n_orden":p_n_orden,
         "p_n_instancia":p_n_instancia,
         "id_menu":v_id_menu,
         "n_orden":3
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $("#d_resolucion").val(data.p_d_resolucion);
                  $("#f_resolucion").val(data.p_f_resolucion);
                  $("#d_observ").val(data.p_d_observ);
              
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 


}