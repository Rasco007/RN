

function chequearNulos(){
    v_c_tributo=$("#c_tributo").val();
    v_c_objeto=$("#c_objeto").val();

    if(!v_c_objeto && !v_c_tributo){
        return false;
    }
    else{
        return true;
    }
}

function chequearData(p_fecha_hasta,p_id_contribuyente,
    p_fecha_desde,
    p_c_tributo,
    p_d_objeto_hecho,
    p_c_grupo){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_fecha_hasta":p_fecha_hasta,
         "p_id_contribuyente":p_id_contribuyente,
         "p_fecha_desde":p_fecha_desde,
         "p_c_tributo":p_c_tributo,
         "p_d_objeto_hecho":p_d_objeto_hecho,
         "p_c_grupo":p_c_grupo,
         "id_menu":100187,
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

function camposLlenos(){
    $("#d_objeto_hecho").val();
    $("#c_tributo").val();
    $("#f_vig_hasta").val();
    $("#f_vig_desde").val();
}