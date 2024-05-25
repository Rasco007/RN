
$('#c_tributo').focusout(function(){
    $("#d_objeto_hecho").val(null);
    $("#f_vig_desde").val(null);
    $("#f_vig_hasta").val(null);
    $("#f_cese_provisorio").val(null);
    if ($('#c_tributo').val()!= ''){
        if ($('#n_cuit').val()!= ''){
            mostrarLupa();
        }else{
            ocultarLupa();
        }

    }
});




$("#d_objeto_hecho").focusout(
    function(){
        if (  $('#d_objeto_hecho').val()!= '' &&  $('#c_tributo').val()!= ''  ){
            $.ajax({
                type: 'POST',
                url: 'cons_ddjj/php/validaciones.php',
                data: {
                    p_oper: 'buscarfechas',
                    pc_tributo: $("#c_tributo").val(),
                    pd_objeto_hecho:  $("#d_objeto_hecho").val()
                },
                //dataType: 'JSON',
                success: function (response) {
                    $('#main').procOverlay({visible: false});
                    res = eval('('+response+')');
                    if (res) {
                        $("#c_tipo_imponible").val(res.C_TIPO_IMPONIBLE);
                        $("#f_vig_desde").val(res.F_VIG_DESDE);
                        $("#f_vig_hasta").val(res.F_VIG_HASTA);
                        $("#f_cese_provisorio").val(res.F_CESE_PROVISORIO);
                    }
                    // elimino este mensaje porque si ingresa 3 letras del objeto para hacer la busqueda con la lupa sale ese mensaje cuando paso del input a la lupa
                    //else {
                    //    mostrar_validacion('No existe, contribuyente con el tributo y objeto ingresado ');
                    //}
                }
            });
        }
    });

$('#n_cuit').focusout(function(){
    if ($('#n_cuit').val() != ''){
        mostrarLupa();
        $("#c_tributo").val(null);
        $("#c_concepto").val(null);
        $("#d_objeto_hecho").val(null);
        $("#d_concepto").val(null);
        $("#d_tributo").val(null);
        $("#f_vig_desde").val(null);
        $("#f_vig_hasta").val(null);
        $("#f_cese_provisorio").val(null);



        $.ajax({
            url: 'cons_ddjj/php/devuelve_deno.php',
            type:"POST",
            data:{"n_cuit":limpia_cuit($("#n_cuit").val())},
            async:true,
            success: function(data){
                ret = eval('('+data+')');
                if(ret != null){
                    $("#d_denominacion").val(ret.DENOMINACION);
                    $("#id_contribuyente").val(ret.ID_CONTRIBUYENTE);

                    // Busco primero con cuit porque si busco directamente en contribuyentes tributos, puede que no encuentre nada.
                    console.log('antes buscar tributo ');

                    $.ajax({
                        type: 'POST',
                        url: 'cons_ddjj/php/validaciones.php',
                        data: {
                            p_oper: 'buscarobjeto',
                            id_contribuyente: $("#id_contribuyente").val()
                        },
                        //dataType: 'JSON',
                        success: function (response) {
                            $('#main').procOverlay({visible: false});
                            //res = JSON.parse(response);
                            res = eval('('+response+')');


                            if (res) {
                                console.log('recupera valores ' +  $("#c_tributo").val());
                                $("#c_tributo").val(res.C_TRIBUTO);
                                $("#d_objeto_hecho").val(res.D_OBJETO_HECHO);
                                $("#c_tipo_imponible").val(res.C_TIPO_IMPONIBLE);
                                $("#d_tributo").val(res.D_DESCRIP);

                                console.log('F_VIG_DESDE ' +  res.F_VIG_DESDE);

                                $("#f_vig_desde").val(res.F_VIG_DESDE);
                                $("#f_vig_hasta").val(res.F_VIG_HASTA);
                                $("#f_cese_provisorio").val(res.F_CESE_PROVISORIO);

                                console.log('despues valores xx ' +  res.C_TRIBUTO);

                            } else {
                                mostrar_validacion('No existe, contribuyente con el tributo y objeto ingresado o bien tiene Cese definitivo o provisorio<br>Debe ingresar el tributo y objeto en forma manual');
                            }
                        }
                    });

                }else{
                    $("#d_denominacion").val(null);
                    $("#id_contribuyente").val(null);
                    $("#n_cuit").val(null);
                    mostrar_cuadro('I', 'Busqueda de Contribuyentes por CUIT', 'Contribuyente no encontrado ', '', '', 400, 200);
                }
            }
        });

    }else{
        ocultarLupa();
        $("#d_denominacion").val(null);
        $("#id_contribuyente").val(null);
        $("#n_cuit").val(null);
        $("#c_tributo").val(null);
        $("#c_concepto").val(null);
        $("#d_objeto_hecho").val(null);
        $("#d_concepto").val(null);
        $("#d_tributo").val(null);
        $("#f_vig_desde").val(null);
        $("#f_vig_hasta").val(null);
        $("#f_cese_provisorio").val(null);


    }
});


$('#d_objeto_hecho').keydown(function () {
    if ($('#d_objeto_hecho').val().length >= 2   || $('#id_contribuyente').val()  != '' ){
        $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
        $('#mascara_lupa_d_objeto_hecho').hide();
    } else {
        $('#lupa_d_objeto_hecho').hide();
        $('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
    }
});

