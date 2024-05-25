function recuperar_datos_relacionales(p_d_provincia, p_c_provincia, p_d_departamento, p_c_departamento, p_c_localidad, p_d_localidad){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "id_menu":v_id_menu,
         "n_orden":0,
         "p_d_provincia":p_d_provincia,
         "p_c_provincia":p_c_provincia,
         "p_d_departamento":p_d_departamento,
         "p_c_departamento":p_c_departamento,
         "p_c_localidad":p_c_localidad,
         "p_d_localidad":p_d_localidad
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                setea_parametros('#main_grid',{'p_d_provincia': data.p_d_provincia,
                ':p_d_departamento': data.p_d_departamento,
                ':p_d_localidad': data.p_d_localidad});
              
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}



function valida_existencia_cq(p_c_expediente_adm){    
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            'p_c_expediente_adm':p_c_expediente_adm,
         "id_menu":v_id_menu,
         "n_orden":3
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                datos_instancia(p_n_cuit_cq,
                    p_d_denominacion_cq,
                    p_c_expediente_adm,
                    p_c_instancia,
                    p_d_instancia);

                    recupera_datos_adicionales(p_d_provincia,
                        p_c_provincia,
                       p_d_departamento,
                       p_c_departamento,
                       p_c_localidad,
                       p_d_localidad,
                       p_c_expediente_adm);    
              return;
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                
                return;
            }
        }
    });  
}

function datos_instancia(p_n_cuit_cq,
    p_d_denominacion_cq,
    p_c_expediente_adm,
    p_c_instancia,
    p_d_instancia){
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
                "p_n_cuit_cq":p_n_cuit_cq,
                "p_d_denominacion_cq":p_d_denominacion_cq,
                "p_c_expediente_adm":p_c_expediente_adm,
                "p_c_instancia":p_c_instancia,
                "p_d_instancia":p_d_instancia,
                "id_menu":v_id_menu,
                "n_orden":2
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                  $("#n_cuit_cq").val(data.p_n_cuit_cq);
                  $("#d_denominacion_cq").val(data.p_d_denominacion_cq);
                  $("#c_instancia").val(data.p_c_instancia);
                  $("#d_instancia").val(data.p_d_instancia);
                }
                else{
                    mostrar_cuadro('E', 'Tuvo error', data.resultado);
                    return;
                }
            }
        }); 

}

function recupera_datos_adicionales(p_d_provincia,
    p_c_provincia,
   p_d_departamento,
   p_c_departamento,
   p_c_localidad,
   p_d_localidad,
   p_c_expediente_adm){

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_d_provincia":p_d_provincia,
            "p_c_provincia":p_c_provincia,
            "p_d_departamento":p_d_departamento,
            "p_c_departamento":p_c_departamento,
            "p_c_localidad":p_c_localidad,
            "p_d_localidad":p_d_localidad,
            "p_c_expediente_adm":p_c_expediente_adm,
            "id_menu":v_id_menu,
            "n_orden":4
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){      
                p_d_provincia=data.p_d_provincia;
                p_d_departamento=data.p_d_departamento;
                return;
            }
            else{
                //mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
   }

function limpiar(){
    $("#c_expediente_adm").val("");
    $("#c_instancia").val("");
    $("#d_instancia").val("");
    $("#c_instancia").val("");
    $("#c_instancia").val("");
    $("#n_cuit_cq").val("");
    $("#d_denominacion_cq").val("");
    $('#main_grid').clearGridData();
    $('#observaciones_grid').clearGridData();
}


