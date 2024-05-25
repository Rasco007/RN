function obtener_datos_automotor(p_d_patente ,p_c_marca_aut , p_d_texto_marca , p_id_modelo , p_d_Texto_modelo, p_id_descripcion, 
    p_d_texto_descripcion, p_n_peso_cilindrada , p_n_modelo_año , p_c_tipo, p_c_grupo , p_c_fmcamod ,
    p_n_hp, p_d_descrip_marca,p_d_descrip_modelo , p_d_descrip_des , p_d_descrip_tipo ){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_d_patente":p_d_patente ,
            "p_c_marca_auto": p_c_marca_aut ,
            "p_d_texto_marca": p_d_texto_marca , 
            "p_id_modelo": p_id_modelo ,
            "p_d_Texto_modelo": p_d_Texto_modelo,
            "p_id_descripcion": p_id_descripcion, 
            "p_d_texto_descripcion":p_d_texto_descripcion,
            "p_n_peso_cilindrada": p_n_peso_cilindrada,
            "p_n_modelo_año": p_n_modelo_año ,
            "p_c_tipo":p_c_tipo,
            "p_c_grupo": p_c_grupo, 
            "p_c_fmcamod":p_c_fmcamod,
            "p_n_hp": p_n_hp, 
            "p_d_descrip_marca": p_d_descrip_marca,
            "p_d_descrip_modelo":p_d_descrip_modelo,
            "p_d_descrip_des": p_d_descrip_des, 
            "p_d_descrip_tipo":p_d_descrip_tipo,
         "id_menu":v_id_menu,
         "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                
            $("#c_marca").val(data.p_c_marca_aut);
            $("#d_texto_marca").val(data.p_d_texto_marca); 
            $("#id_modelo").val(data.p_id_modelo);
            $("#d_texto_modelo").val(data.p_d_Texto_modelo);
            $("#id_descripcion").val(data.p_id_descripcion); 
            $("#d_texto_descripcion").val(data.p_d_texto_descripcion);
            $("#n_peso_cilindrada").val(data.p_n_peso_cilindrada);
            $("#n_modelo_año").val(data.p_n_modelo_año);
            $("#c_tipo").val(data.p_c_tipo);
            $("#c_grupo").val(data.p_c_grupo); 
            $("#c_fmcamod").val(data.p_c_fmcamod);
            $("#n_hp").val(data.p_n_hp); 
            $("#d_descrip_marca").val(data.p_d_descrip_marca);
            $("#d_descrip_modelo").val(data.p_d_descrip_modelo);
            $("#d_descrip").val(data.p_d_descrip_des); 
            $("#d_descrip_tipo").val(data.p_d_descrip_tipo);
              
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                $('#btn_limpiar').click();
            }
        }
    }); 
}

function datos_calendario_fiscal(p_fecha, p_pos, p_cuota, p_año){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
        "p_fecha":$("#fecha").val(),
         "p_pos":p_pos,
         "p_cuota":p_cuota,
         "p_año":p_año,
         "id_menu":v_id_menu,
         "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                llamar_report('AUTL005',
                'P_AÑO|' + data.p_pos+
                '&P_CUOTA|' + data.p_cuota+
                '&P_FECHA|' +$("#fecha").val()+
                '&P_DOMINIO|' +$("#d_patente").val()+
                '&P_DOMINIO_ANTERIOR|' +$("#d_patente_vieja").val()+
                '&P_MARCA|' + $("#c_marca").val()+
                '&P_MODELO|' + $("#id_modelo").val()+
                '&P_DESCRIP|' + $("#id_descripcion").val()+
                '&P_TEXTO_MARCA|' + $("#d_texto_marca").val()+
                '&P_TEXTO_MODELO|' + $("#d_texto_modelo").val()+
                '&P_TEXTO_DESCRIPCION|'+$("#d_texto_descripcion").val()+
                '&P_MOD_AÑO|'+$("#n_modelo_año").val()+
                '&P_GRUPO|'+$("#c_grupo").val()+
                '&P_TIPO|'+$("#c_tipo").val()+
                '&P_PESO|'+$("#n_peso_cilindrada").val()+
                '&P_C_FMCAMOD|'+$("#c_fmcamod").val()+
                '&P_N_HP|'+$("#n_hp").val(),
                'PDF');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
            }
        }
    }); 
}






