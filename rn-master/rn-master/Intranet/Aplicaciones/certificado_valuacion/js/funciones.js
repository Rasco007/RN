function valorFecha() {
    return $('#f_emision').val().substr(6,4).concat($('#f_emision').val().substr(3,2))
        .concat($('#f_emision').val().substr(0,2));
}

function buscar_responsable(){
    $('#main').procOverlay({visible:true,zIndex:99999999999999999999999});
    $.ajax({
        url: "certificado_valuacion/php/consultas_ajax.php",
        type:"POST",
        data:{ d_nomenclatura:$('#d_partida').val(), f_emision: $('#f_emision').val()},
        dataType: 'json',
        async:false,
        success: function (response) {
            $('#main').procOverlay({visible:false});
            if (response.resultado == 'NOOK'){
                limpiarFiltros();
                mostrar_error('Error al buscar responsable vigente.');
            }
            $('#d_denominacion').val(response.d_denominacion);
            $('#n_cuit').val(response.n_cuit);
        }
    });
}

function limpiarFiltros() {
    $('#frm_consulta :input').val(null);
    $('#d_nomenclatura,#d_partida,#f_emision').prop('disabled', false);
    $('#contenedor_boton, #contenedor_responsables_de_pago').hide();
    $('#lupa_partida, #lupa_nomenclatura, #date_emision').show();
    $('#contenedor_responsables_de_pago :input').val(null);
    $('.datepicker').val(fecha_hoy);
    $("#frm_consulta").validationEngine('hideAll');
}