function limpia_dni(dni){
	var result;
	if (dni != null){
		result=dni.replace(/\./gi, '');
		return result;
	}else{
		return null;
	}
}

function limpiaDatosCont() {
    $('#n_cuit').val(null);
    $("#d_denominacion").val(null);
    $("#id_contribuyente").val(null);
    $('#c_tipo_documento').val(null);
    $('#d_tipo_documento').val(null);
    $("#n_documento").val(null);
    $('#d_objeto_hecho').val(null);
}

function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "reimprimir_constancias/php/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getContribuyente',p_filtro: cuit_sin_guiones},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#d_denominacion").val(res['DENOMINACION']);
                $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
                $('#c_tipo_documento').val(res['C_TIPO_DOCUMENTO']);
                $('#d_tipo_documento').val(res['D_TIPO_DOCUMENTO']);
                $('#n_documento').val(res['N_DOCUMENTO']);
            }else{
                mostrar_cuadro('I', 'Atención', 'No se ha encontrado un Contribuyente asociado al CUIT ingresado.');
                limpiaDatosCont();
            }
        }
    });
}

function fun_ajax_documento(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: 'reimprimir_constancias/php/autocomplete.php',
        type:"POST",
        data:{
            "p_oper": 5,
            "c_tipo_documento":$("#c_tipo_documento").val(),
            "n_documento":limpia_dni($("#n_documento").val())
        },
        async:true,
        success: function(data){
            resp = JSON.parse(data);
            console.log(resp);
            if(resp){
                $('#n_cuit').val(resp['N_CUIT']);
                $("#id_contribuyente").val(resp['ID_CONTRIBUYENTE']);
                $("#d_denominacion").val(resp['D_DENOMINACION']);
                $('#n_documento').val(resp['N_DOCUMENTO']);
            }else{
                mostrar_cuadro('I', 'Atención', 'No se ha encontrado un Contribuyente asociado al Documento ingresado.');
                limpiaDatosCont();
            }
        }
    });
}