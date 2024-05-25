function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "ajax_genericos/autocomplete.php",
        type:"POST",
        dataType: "JSON",
        data:{oper: 3,term: cuit_sin_guiones},
        success: function(res) {
            $('#main').procOverlay({visible:false});
            if(res != null){
                var info = res.data_raz[0];
                $("#d_denominacion").val(info.razon_social);
                $("#id_contribuyente").val(info.id_contribuyente);
                $('#lupa_d_denominacion').show().css('display', 'table-cell');
                $('#mascara_lupa_d_denominacion').hide();
                $('#d_denominacion_mayuscula').val($('#d_denominacion').val().toUpperCase());
                $('#btn_buscar').attr('disabled', false);
            }else{
                mostrar_cuadro('E', 'Error', 'No se ha encontrado un contribuyente para el cuit ingresado.');
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
                $("#n_cuit").val(null);
            }
        }
    });
}

function confirmar_baja(p_id_obligacion, p_id_ddjj){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_id_ddjj": p_id_ddjj,
            "p_id_obligacion": p_id_obligacion,
            "id_menu": v_id_menu,
            "n_orden": 2
        },
        dataType: 'json',
        success: function (data) {
            $('#main').procOverlay({visible: false});
            if (data.resultado == 'OK') {
                mostrar_cuadro('I', 'Información', 'La DDJJ ha sido dado de baja');
                $('#btn_limpiar').click();
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function limpia_cuit(texto){
    result=texto.replace(/-/gi,'');
    return result;
}

function limpia_documento(doc){
    var result;
    result=doc.replaceAll('.','');
    return result;
}