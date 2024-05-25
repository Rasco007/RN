function init_eventos(){

    $('#btn_buscar').click(function () {
        if ($("#frm_busqueda").validationEngine('validate')){
            $("#frm_busqueda :input").attr('readonly',true);
            $('#main').procOverlay({ visible: true });
            $("#lupa_patente, #lupa_patente_vieja").hide();
            setea_parametros('#movimientos_auto_grid',{':d_patente': $("#d_patente").val()});
        }
    });

    $('#btn_limpiar').click(function () {
        $("#frm_busqueda :input").val(null);
        $("#frm_busqueda :input").attr('readonly',false);
        $("#lupa_patente, #lupa_patente_vieja").show();
        setea_parametros('#movimientos_auto_grid',{':d_patente': null});
    });

    if(p_patente != ""){
        $("#btn_buscar").click();
    };
}