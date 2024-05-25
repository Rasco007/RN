function inicializarEventos() {
    $('#filtro_periodo').mask('999999');
    $('#filtro_cuota').mask('99');

    $('#btn_emitir').click(function () {
        if ($('#frm_consulta').validationEngine('validate')){
            emisionMasiva();
        }
    });

    $('#btn_limpiar').click(function(){
        $('#filtro_periodo, #filtro_cuota').val(null);
    });
}

$(document).on('change', '#filtro_cuota', function() {
	if ($('#filtro_cuota').val() && $('#filtro_periodo').val()){
        $('#main').procOverlay({visible:true});
		$.ajax({
			url:'emision_masiva_telepeaje/autocomplete.php',
			type:"POST",
			data:{
				"oper": "vencimientos",
				"periodo": $('#filtro_periodo').val(),
				"cuota": $('#filtro_cuota').val()
			},
			async:false,
			dataType: 'json',
			success: function(data) {
				$('#f_vto_pago').val(data.F_VTO_PAGO);
				$('#f_vto_pago_2').val(data.F_VTO_PAGO_2);
			}
		});
	}
});

$(document).on('change', '#filtro_periodo', function() {
	if ($('#filtro_cuota').val() && $('#filtro_periodo').val()){
        $('#main').procOverlay({visible:true});
		$.ajax({
			url:'emision_masiva_telepeaje/autocomplete.php',
			type:"POST",
			data:{
				"oper": "vencimientos",
				"periodo": $('#filtro_periodo').val(),
				"cuota": $('#filtro_cuota').val()
			},
			async:false,
			dataType: 'json',
			success: function(data) {
				$('#f_vto_pago').val(data.F_VTO_PAGO);
				$('#f_vto_pago_2').val(data.F_VTO_PAGO_2);
			}
		});
	}
});