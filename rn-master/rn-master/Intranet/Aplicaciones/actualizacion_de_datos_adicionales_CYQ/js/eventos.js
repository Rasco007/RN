function init_eventos(){

    
    p_n_cuit_cq=null;

    $('#c_expediente_adm').focusout(function(){
        p_c_expediente_adm=$("#c_expediente_adm").val();
        valida_existencia_cq(p_c_expediente_adm);
    });


    $("c_instancia").val("p_c_instancia");
    $("d_instancia").val("p_d_instancia");
    $("d_denominacion_cq").val("p_d_denominacion_cq");
    $("n_cuit_cq").val("p_n_cuit_cq");

    $("#btn_buscar").click(function(){

        setea_parametros("#main_grid",{
            ":p_c_expediente_adm":p_c_expediente_adm
        });

        setea_parametros("#observaciones_grid",{
            ":p_c_expediente_adm":p_c_expediente_adm
        });
    })

    $("#btn_limpiar").click(function(){
        limpiar();
    })

}