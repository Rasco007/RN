function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "cambio_tipo_domicilio/php/autocomplete.php",
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
                $('#n_cuit').val(null);
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
            }
        }
    });
}

function fun_ajax_objeto_hecho(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: 'cambio_tipo_domicilio/php/autocomplete.php',
        type:"POST",
        data:{"p_oper":4,
            "c_tributo":$("#c_tributo").val(),
            "c_tipo_imponible":$("#c_tipo_imponible").val(),
            "contrib":$("#id_contribuyente").val(),
            "objeto_hecho":($("#d_objeto_hecho").val()).trim()},
        async:false,
        success: function(data){
            $('#main').procOverlay({visible:false});
            resp = JSON.parse(data);
            if(resp){
                $('#n_cuit').val(resp['N_CUIT']);
                $("#id_contribuyente").val(resp['ID_CONTRIBUYENTE']);
                $("#d_denominacion").val(resp['D_DENOMINACION']);
                $('#c_tipo_documento').val(resp['C_TIPO_DOCUMENTO']);
                $('#d_tipo_documento').val(resp['D_TIPO_DOCUMENTO']);
                $('#n_documento').val(resp['N_DOCUMENTO']);
            }else{
                mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                $("#n_cuit").val(null);
                $("#id_contribuyente").val(null);
                $("#d_denominacion").val(null);
                $("#d_objeto_hecho").val(null);
            }
        }
    });

}

function fun_ajax_documento(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: 'cambio_tipo_domicilio/php/autocomplete.php',
        type:"POST",
        data:{
            "p_oper": 5,
            "c_tipo_documento":$("#c_tipo_documento").val(),
            "n_documento":$("#n_documento").val()
        },
        async:true,
        success: function(data){
            resp = JSON.parse(data);
            console.log(resp);
            if(resp){
                $('#n_cuit').val(resp['N_CUIT']);
                $("#id_contribuyente").val(resp['ID_CONTRIBUYENTE']);
                $("#d_denominacion").val(resp['D_DENOMINACION']);
            }else{
                mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                $("#id_contribuyente").val(null);
                $("#n_cuit").val(null);
                $("#d_denominacion").val(null);
                $('#c_tipo_documento').val(null);
                $("#n_documento").val(null);
            }
        }
    });
}

function mostrar_domicilio(contribuyente,tipo_domicilio){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "cambio_tipo_domicilio/php/funciones.php",
        type:"POST",
        data:{  p_oper:'getDatosDomi',p_id_contribuyente:contribuyente,p_c_tipo_domicilio:tipo_domicilio},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $('#domi_d_calle').val(res['D_CALLE']);
                $('#domi_n_numero').val(res['N_NUMERO']);
                $('#domi_monoblock').val(res['D_MONOBLOCK']);
                $('#domi_puerta').val(res['D_PUERTA']);
                $('#domi_piso').val(res['D_PISO']);
                $('#domi_manzana').val(res['D_MANZANA']);
                $('#domi_depto').val(res['D_DEPTO']);
                $('#domi_oficina').val(res['D_OFICINA']);
                $('#domi_c_barrio').val(res['C_BEPO']);
                $('#domi_d_barrio').val(res['D_BEPO']);
                $('#domi_c_localidad').val(res['C_LOCALIDAD']);
                $('#domi_d_localidad').val(res['D_LOCALIDAD']);
                $('#domi_c_departamento').val(res['C_DEPARTAMENTO']);
                $('#domi_d_departamento').val(res['D_DEPARTAMENTO']);
                $('#domi_c_provincia').val(res['C_PROVINCIA']);
                $('#domi_d_provincia').val(res['D_PROVINCIA']);
                $('#domi_codpos').val(res['C_POSTAL']);
                $('#domi_useralta').val(res['C_USUARIOALT']);
                $('#domi_noficina').val(res['N_OFICINA']);
                $('#domi_usermodif').val(res['C_USUARIOACT']);
                $('#domi_fmodif').val(res['F_ACTUALIZAC']);

                $('#domicilio_modal').modal('show');
            }else{
                mostrar_mensaje('Domicilio','No se han encontrado datos asociados.');
            }
        }
    });
}