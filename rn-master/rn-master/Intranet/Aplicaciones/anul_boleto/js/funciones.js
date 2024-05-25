function check_digito_verificador(param, digito) {
    $.ajax({
        url: "anul_boleto/consultas_ajax.php",
        type:"POST",
        dataType: "JSON",
        data:{ p_oper:'checkDigito', param: param},
        success: function (res) {
            $('#main').procOverlay({visible:false});
            if(res){
                if(res['DIGITO'] != digito){
                    mostrar_error('El Dígito Verificador no es correcto.');
                    return;
                }
                else{
                    getDatosFiltros();
                }
            }
            else{
                mostrar_error('Ocurrió un error al comprobar el Digito Verificador.');
            }
        }
    });
}

function getDatosFiltros(){
    var params = {p_oper:'getDatosFiltros',
                p_tributo: v_tributo,
                p_partida: $('#d_partida').val(),
                p_nomenclatura: $('#d_nomenclatura').val()};
    $.ajax({
        url: "anul_boleto/consultas_ajax.php",
        type:"POST",
        dataType: "JSON",
        data:params,
        success: function (res) {
            $('#main').procOverlay({visible:false});
            if(res){
                $('#d_partida').val(res['OBJETO1']);
                $('#d_nomenclatura').val(res['OBJETO2']);
                if(v_tributo == 90){
                    $('#d_verif_dom').val(res['DIGITO1']);
                    $('#d_verif_dom_ant').val(res['DIGITO2']);
                }
                cons_principal();
            }
        }
    });
}

function cons_principal() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "anul_boleto/consultas_ajax.php",
        type:"POST",
        dataType: 'JSON',
        data:{ p_oper:'consulta_inmo', d_nomenclatura: $('#d_partida',"#frm_busqueda").val(),p_tributo:v_tributo},
        success: function(response){
            $('#main').procOverlay({visible:false});
            if (response){
                $('#div_contrib').css('display','block');
                $('#div_info').css('display','block');
                $('#div_btn_anular').css('display','block');
                $("#frm_busqueda input").attr('disabled', true).prop('placeholder','');
                $('#frm_busqueda .btn_lupa').hide();

                $("#d_denominacion").val(response['D_DENOMINACION']);
                $("#n_cuit").val(response['N_CUIT']);
                $("#id_contribuyente").val(response['ID_CONTRIBUYENTE']);
                //v_id_contribuyente = Number(response['ID_CONTRIBUYENTE']);
                $("#c_tipo_documento").val(response['C_TIPO_DOCUMENTO']);
                $("#d_tipo_documento").val(response['D_TIPO_DOCUMENTO']);
                $("#n_documento").val(response['N_DOCUMENTO']);

                $("#c_motivo_alta").val(response['C_MOTIVO_ALTA']);
                $("#d_motivo_alta").val(response['D_MOTIVO_ALTA']);
                $("#d_fecha").val(response['F_VIG_DESDE']);
                $('#d_fecha_anul').datepicker("option", 'minDate', $.datepicker.parseDate('dd/mm/yy', response['F_VIG_DESDE']));

                if (parse(response['C_MOTIVO_ALTA']) == 7){
                    $("label[for='d_fecha']").text('Fecha BCV');
                    $('#btn_anular').text('Anular BCV');
                }else if(parse(response['C_MOTIVO_ALTA']) == 8){
                    $("label[for='d_fecha']").text('Fecha ADJ');
                    $('#btn_anular').text('Anular Adjudicación');
                }else if(parse(response['C_MOTIVO_ALTA']) == 23){
                    $("label[for='d_fecha']").text('Fecha DVF');
                    $('#btn_anular').text('Anular DVF');
                }else if(parse(response['C_MOTIVO_ALTA']) == 31){
                    $("label[for='d_fecha']").text('Fecha CNC');
                    $('#btn_anular').text('Anular Concesión');
                }else if(parse(response['C_MOTIVO_ALTA']) == 32){
                    $("label[for='d_fecha']").text('Fecha OCP');
                    $('#btn_anular').text('Anular Ocupación');
                }
            }
            else{
                mostrar_validacion('La partida seleccionada no posee boletos');
                limpiar_app();
            }
        }
    });
}

function limpiar_app() {
    $('#div_contrib').css('display','none');
    $('#div_info').css('display','none');
    $('#div_btn_anular').css('display','none');
    $("#frm_busqueda input").attr('disabled', false).val(null);
    $('#frm_busqueda .btn_lupa').show();
    $('#d_fecha_anul').val(null);
    $('#c_delegacion').val(null);
    $('#d_delegacion').val(null);
}

function anular_boleto() {
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_f_vig_desde": $('#d_fecha').val(),
            "p_f_anulacion": $('#d_fecha_anul').val(),
            "p_c_motivo_alta": $('#c_motivo_alta').val(),
            "p_c_tributo": '60',
            "p_d_objeto_hecho": $('#d_partida').val(),
            "p_id_contribuyente": $('#id_contribuyente').val(), //v_id_contribuyente,
            "p_c_delegacion": $('#c_delegacion').val(),
            "id_menu":10960,
            "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                switch ($('#c_motivo_alta').val()) {
                    case '7': mostrar_confirmacion('Ha sido anulado el Boleto de Compra Venta'); break;
                    case '23': mostrar_confirmacion('Ha sido anulada la Denuncia de Venta Fiscal'); break;
                    case '8': mostrar_confirmacion('Ha sido anulado el Expediente de Adjudicación'); break;
                    case '31': mostrar_confirmacion('Ha sido anulada la Concesión'); break;
                    case '32': mostrar_confirmacion('Ha sido anulada la Ocupación'); break;
                }
                limpiar_app();
            }
            else{
                mostrar_cuadro('E', 'No se ha podido realizar la anulación', data.resultado);
            }
        }
    });
}