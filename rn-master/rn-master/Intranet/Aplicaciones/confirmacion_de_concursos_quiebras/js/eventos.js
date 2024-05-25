function init_eventos(){
    var respuesta=obtener_globales(p_intimacion,p_pfp,p_n_tabla,
        p_int_inmob, p_quiebra, p_concurso);   

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

        eliminar_Datos_tmp();
        
        let c_expediente=$("#c_expediente").val();
     
        if(c_expediente==''){
            mostrar_error("Se debe ingresar un valor");
        }
        else{
            setea_parametros("#main_grid",{
                ':p_n_instancia':$("#n_instancia").val(),
                ':p_n_orden':p_n_orden
            });

        }
    });

    $("#btn_revertir").click(function(){
       revertir(p_f_confirmacion, p_c_expediente);
    });

    $("#btn_limpiar").click(function(){
        eliminar_Datos_tmp();

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
    });

    $("#btn_actualizar").click(function(){
        //valida_confirmacion(p_f_confirmacion);

        f_confirmacion=$("#f_concurso_quiebra").val();

        if(f_confirmacion!=''){
            eliminar_Datos_tmp();
            cancela_deuda(p_c_expediente,p_objeto, p_posicion , p_cuota ,
                p_concepto, p_adeudado, p_respuesta,
        p_actual);
                           
            generar_oblig(p_c_expediente,
                f_confirmacion,
                p_c_instancia,
                p_concurso,
                p_quiebra,
                p_id_contribuyente,
                p_f_origen);

        }
        else{
            mostrar_error("La fecha de confirmación no puede estar vacía.");
        }
    
    })
    
}
