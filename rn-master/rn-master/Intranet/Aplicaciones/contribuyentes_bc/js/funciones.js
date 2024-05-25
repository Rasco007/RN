


function altaContribuyentesBC(){

    var nuevos_contrib = JSON.stringify(v_contribuyentes);

    $.ajax({
        type:'POST',
        url: "contribuyentes_bc/ajax_contribuyentes_bc.php",
        data: {accion:"alta", nuevos_contrib:nuevos_contrib},
        dataType: 'json',
        async:false,
        success: function(data) {
            console.log(data);
            //alert(data);
        }
    });

}


function estadoContribuyentesBC(){

    var cuit = $("#n_cuit").val();

    $.ajax({
        type:'POST',
        url: "contribuyentes_bc/ajax_contribuyentes_bc.php",
        data: {accion:"estado", cuit:cuit},
        dataType: 'json',
        async:false,
        success: function(data) {
            //mostrar_solapas();
            //var result = JSON.parse(data);
            //console.log(data);
            //alert(data);
            $("#datos_contribuyente").html(data.maqueta);
            crea_grillas_principales(data.ccResponse);

        }
    });

}


function mostrar_solapas(){
    //setearTipoPersona();

    crea_grillas_principales();
    //$(".selectpicker").selectpicker('refresh');
}