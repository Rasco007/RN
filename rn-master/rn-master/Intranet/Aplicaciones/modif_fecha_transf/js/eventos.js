function inicializarEventos() {
    $('#n_cuit').mask('99-99999999-9');
    $("#n_documento").mask("999999999");
    $('.numero').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57);
    });
    
    //Completamos Datos del Contribuyente
    $('#n_cuit').change(function (){
        if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
            completarDenominacion();
        }else{
            $("#d_denominacion").val(null);
            $("#n_cuit").val(null);
            $("#id_contribuyente").val(null);
        }
    });

    $('#n_documento').change(function () {
        if (!$('#id_contribuyente').val() && $('#c_tipo_documento').val() && $('#n_documento').val()){
            fun_ajax_documento();
        }
    });

    $("#d_denominacion").autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "modif_fecha_transf/php/autocomplete.php",
                    data: {p_oper:'getAutocomplete',p_filtro: request.term},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.data_contrib, function( item ) {
                                    return {
                                        label: item.label,
                                        value: item.razon_social,
                                        cuit: item.cuit,
                                        id_contribuyente: item.id_contribuyente,
                                        c_tipo_documento: item.c_tipo_documento,
                                        d_tipo_documento: item.d_tipo_documento,
                                        n_documento: item.n_documento
                                    }
                                })
                            );
                        }
                    }
                });
        },
        minLength:1,
        select:function(event,ui){
            $("#d_denominacion").val(ui.item.value);
            $("#n_cuit").val(ui.item.cuit);
            $("#id_contribuyente").val(ui.item.id_contribuyente);
            $('#c_tipo_documento').val(ui.item.c_tipo_documento);
            $('#d_tipo_documento').val(ui.item.d_tipo_documento);
            $('#n_documento').val(ui.item.n_documento);
            return false;
        }
    });

    $(".datepicker").datepicker({
        changeMonth:true,
        changeYear:true,
        dateFormat:'dd/mm/yy',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá']
    }).mask('99/99/9999').change(function () {
        if ($(this).val().length > 0 && $(this).val().length != 10){
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }
    });

    $('#btn_buscar').click(function () {
        if (v_tributo == 60){
            if (!$('#id_contribuyente').val() && !$('#d_partida').val()){
                mostrar_cuadro('V', 'Atención', 'Ingrese una Partida/Nomenclatura o un Contribuyente para realizar la busqueda.',null,null,400);
                return;
            }
            setea_parametros('#main_grid',{
                ':p_id_contrib': $("#id_contribuyente").val(),
                ':p_c_tributo':v_tributo,
                ':p_objeto':$('#d_partida').val()
            });
        }else if (v_tributo == 90){
            if (!$('#d_partida').val() && !$('#d_nomenclatura').val()){
                mostrar_cuadro('V', 'Atención', 'Ingrese un Dominio o Dominio Anterior para realizar la busqueda.',null,null,400);
                return;
            }
            if ($('#d_partida').val() && !$('#d_verif_dom').val()){
                mostrar_cuadro('V', 'Atención', 'Debe ingresar el Dígito Verificador del Dominio.',null,null,400);
                return;
            }
            if ($('#d_nomenclatura').val() && !$('#d_verif_dom_ant').val()) {
                mostrar_cuadro('V', 'Atención', 'Debe ingresar el Dígito Verificador del Dominio Anterior.',null,null,400);
                return;
            }

            $('#main').procOverlay({visible:true});
            $.ajax({
                url: "modif_fecha_transf/php/funciones.php",
                type:"POST",
                data:{  p_oper:'checkDigito',p_dominio: $('#d_partida').val(),p_dominio_ant: $('#d_nomenclatura').val()},
                success: function(response)
                {
                    $('#main').procOverlay({visible:false});
                    res = JSON.parse(response);
                    if (res){
                        if ($('#d_partida').val()){
                            if ($('#d_verif_dom').val() != res['DIGITO']){
                                mostrar_cuadro('V', 'Atención', 'El Dígito Verificador para el Dominio no es correcto.',null,null,400);
                                return;
                            }else{
                                setea_parametros('#main_grid',{
                                    ':p_id_contrib': $("#id_contribuyente").val(),
                                    ':p_c_tributo':v_tributo,
                                    ':p_objeto':$('#d_partida').val()
                                });
                            }
                        }else{
                            if ($('#d_verif_dom_ant').val() != res['DIGITO_ANT']){
                                mostrar_cuadro('V', 'Atención', 'El Dígito Verificador para el Dominio Anterior no es correcto.',null,null,400);
                                return;
                            }else{
                                $('#main').procOverlay({visible:true});
                                $.ajax({
                                    url: "modif_fecha_transf/php/funciones.php",
                                    type:"POST",
                                    data:{  p_oper:'getDominio',p_dominio_ant: $('#d_nomenclatura').val()},
                                    success: function(response)
                                    {
                                        $('#main').procOverlay({visible:false});
                                        resp = JSON.parse(response);
                                        if (resp){
                                            $('#d_partida').val(resp['D_PATENTE']);
                                            $('#d_verif_dom').val(resp['DIGITO']);
                                            setea_parametros('#main_grid',{
                                                ':p_id_contrib': $("#id_contribuyente").val(),
                                                ':p_c_tributo':v_tributo,
                                                ':p_objeto':$('#d_partida').val()
                                            });
                                        }else{
                                            mostrar_cuadro('V', 'Atención', 'Ocurrió un error al obtener el Dominio actual.',null,null,400);
                                        }
                                    }
                                });
                            }
                        }
                    }else{
                        mostrar_cuadro('V', 'Atención', 'Ocurrió un error al comprobar el Dígito Verificador.',null,null,400);
                    }
                }
            });
        }
    });
   
    $('#btn_limpiar').click(function(){
        $('#frm_busqueda :input').val(null).attr('disabled',false);
        $('#main_grid').jqGrid('clearGridData');
        $('#lupa_c_tipo_documento,#lupa_partida,#lupa_nomenclatura').show();
    });

    $('#btn_modificar').click(function () {
        var id = $("#main_grid").getGridParam('selrow');
        if (id) {
            if (!$('#main_grid').getCell(id, 'f_altabaja')) {
                    mostrar_validacion('No se encontraron datos de responsable de pago.');
                    return false;
            }else {
                if (v_tributo == 90 && $('#main_grid').getCell(id, 'f_vig_hasta')){
                    mostrar_validacion('Este dominio tiene una Baja Definitiva, no puede modificarse la fecha.');
                    return false;
                }
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{
                        "p_id_contribuyente":$('#main_grid').getCell(id, 'id_contribuyente'),
                        "p_c_tributo":$('#main_grid').getCell(id, 'c_tributo'),
                        "p_d_objeto_hecho":$('#main_grid').getCell(id, 'd_objeto_hecho'),
                        "p_f_altabaja":$('#main_grid').getCell(id, 'f_altabaja'),
                        "p_c_motivo":$('#main_grid').getCell(id, 'c_motivo'),
                        "p_f_vig_desde":$('#main_grid').getCell(id, 'f_vig_desde'),
                        "p_c_motivo_alta":$('#main_grid').getCell(id, 'c_motivo_alta'),
                        "p_f_vig_hasta":$('#main_grid').getCell(id, 'f_vig_hasta'),
                        "p_c_motivo_baja":$('#main_grid').getCell(id, 'c_motivo_baja'),
                        "p_f_cese_provisorio":$('#main_grid').getCell(id, 'f_cese_provisorio'),
                        "p_c_motivo_cese_prov":$('#main_grid').getCell(id, 'c_motivo_cese_prov'),
                        "id_menu":10973,
                        "n_orden":0
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            $('#id_contrib_old').val(data.p_id_contribuyente_old);
                            $('#c_motivo_fecha').val($('#main_grid').getCell(id, 'c_motivo'));
                            $('#d_motivo_fecha').val($('#main_grid').getCell(id, 'd_motivo'));
                            $('#ntabla_deleg_fecha').val(data.p_n_tabla_deleg);
                            $('#c_deleg_fecha').val(data.p_c_delegacion);
                            $('#d_deleg_fecha').val(data.p_d_delegacion);
                            $('#f_altabaja_fecha, #foriginal_fecha').val($('#main_grid').getCell(id, 'f_altabaja'));
                            $('#modal_fecha').modal("show");
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                });
            }
        }else {
            mostrar_validacion('Debe seleccionar un registro de la grilla.');
            return false;
        }
    });
}