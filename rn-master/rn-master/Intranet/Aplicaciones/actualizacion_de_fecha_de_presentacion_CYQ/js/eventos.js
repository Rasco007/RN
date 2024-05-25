function init_eventos(){
    $("#c_expediente").focusout(function(){
        var p_c_expediente;
        p_c_expediente=$("#c_expediente").val();  
        

        if(p_c_expediente==""){
            mostrar_error("Se debe ingresar un expediente");
        }
        else{
            
            busqueda_contribuyente(p_n_cuit,p_n_documento, p_c_tipo_documento,p_c_instancia,p_n_instancia,p_c_expediente,
                p_id_contribuyente);
            
        }

    });


    $("#btn_buscar").click(function(){
        
        setea_parametros("#main_grid",{
            ':p_n_instancia':$("#n_instancia").val(),
            ':p_n_orden':p_n_orden
        });

        $("#f_concurso_quiebra").val('');

    });

    $("#f_concurso_quiebra").focusout(function(){
        p_f_vto=$("#f_concurso_quiebra").val();
    });


    $("#btn_actualizar").click(function(){
        p_c_expediente=$("#c_expediente").val();

        p_n_instancia=$("#n_instancia").val();
        
        modificar_fecha_vencimiento(p_f_vto, p_c_expediente, p_n_orden, p_n_instancia);
    
    });


    $("#btn_limpiar").click(function(){

        $("#main_grid").clearGridData();
        $("#c_expediente").val("");
        $("#n_instancia").val("");
        $("#n_orden").val("");
        $("#c_instancia").val("");
        $("#d_instancia").val("");
        $("#n_cuit").val("");
        $("#desc_denom").val("");
        $("#c_tipo_documento").val("");
        $("#n_documento").val("");
        $("#c_sector_origen").val("");$("#").val("");
        $("#d_sector_origen").val("");
        $("#f_origen").val("");
        $("#c_motivo_origen").val("");
        $("#d_motivo_origen").val("");
        $("#motivo_origen").val("");
        $("#f_vto").val("");
        $("#d_resolucion").val("");
        $("#f_resolucion").val("");
        $("#d_observ").val("");
        $("#f_concurso_quiebra").val("");
        $("#i_adeudado").val("");
        $("#i_interes").val("");
        $("#i_actualizado").val("");
    })
}

