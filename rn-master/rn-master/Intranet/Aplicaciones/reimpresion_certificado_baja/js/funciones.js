function validar_datos(p_dominio,p_f_baja,p_n_cert_baja){

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_dominio":p_dominio,
         "p_f_baja":p_f_baja,
         "p_n_cert_baja":p_n_cert_baja,
         "id_menu":p_n_id_menu,
         "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                llamar_report('AUTL001',
                'P_D_OBJETO_HECHO|' + $("#dominio").val()+
                '&P_F_BAJA|' + $('#fecha').val()+
                '&P_CERT_BAJA|' +$("#n_cert_baja").val(),
                'PDF');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
            }
        }
    }); 
}

function validar_Datos_print(p_dominio, p_f_baja, p_n_cert_baja){

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_dominio":p_dominio,
         "p_f_baja":p_f_baja,
         "p_n_cert_baja":p_n_cert_baja,
         "id_menu":p_n_id_menu,
         "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);

            }
        }
    }); 
}