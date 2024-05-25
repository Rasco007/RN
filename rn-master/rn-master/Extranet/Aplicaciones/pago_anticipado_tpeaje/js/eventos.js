function inicializarEventos() {
    $('#n_cuit').mask('99-99999999-9');

    $(".mascara_importe").each(function () {
        var events = $._data(this, 'events');
        // if (events && events['keydown']) return;
        $(this).keydown(function (event) {
            if ($(this).prop('readonly')) return;
            return controla_number(event, this, 2);
        });
    }).css('text-align', 'right');

    $('#btn_buscar').click(function () {
        if ($('#frm_consulta').validationEngine('validate')){
            setea_parametros('#main_grid',{
                ':p_d_dominio':$('#d_dominio').val(),
                ':p_id_contribuyente':$('#id_contribuyente').val()});
        }
    });

    $('#btn_limpiar').click(function(){
        $('#d_dominio').val(null);
        setea_parametros('#main_grid',{
            ':p_d_dominio':null,
            ':p_id_contribuyente':$('#id_contribuyente').val()});
    });

    $('#btn_comprar').click(function () {
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if (!rowid){
            mostrar_validacion('Debe seleccionar un registro de la grilla');
        }else{
            let saldo = parse($("#main_grid").getCell(rowid,'monto_restante'));
            if (saldo > 0){
                mostrar_cuadro('C','Comprar Pase','Ud. ya dispone de un pago anticipado para el tributo de TELEPEAJE.<br>¿Esta seguro que desea realizar otro?',
                    function () {
                        $('#modal_comprar').modal('show');
                    },function () {
                        return;
                    });
            }else {
                $('#d_dominio_modal').val($("#main_grid").getCell(rowid,'d_dominio'));
                $('#modal_comprar').modal('show');
            }
        }
    });

    $('#btn_modal_confirmar').click(function () {
        if ($('#form_modal_comprar').validationEngine('validate')){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{
                    "p_d_patente":$('#d_dominio_modal').val(),
                    "p_i_importe":$('#d_importe').val(),
                    "id_menu":10841,
                    "n_orden":0
                },
                dataType:'json',
                success: function( data ) {
                    $('#main').procOverlay({visible:false});
                    if(data.resultado == 'OK'){
                        llamar_report('BOLETA_AGR','p_id_boleta|'+data.p_id_boleta,'PDF');
                        mostrar_confirmacion('Se ha generado la Boleta N°:'+data.p_id_boleta+'.');
                        $('#btn_modal_cancelar').click();
                        $('#main_grid').trigger('reloadGrid');
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    })

}