
$('#btn_limpiar').click(function(){
        $("#informes_grid").jqGrid("clearGridData");
        $("#ingresosBrutos_grid").jqGrid("clearGridData");
        $("#3142_grid").jqGrid("clearGridData");

        apagar_grillas();


        $('#id_contribuyente').val(null);
        $('#n_cuit').val(null);
        $('#d_denominacion').val(null);
        $('#c_tributo').val(null);
        $('#d_tributo').val(null);
        $('#d_objeto_hecho').val(null);
        $('#c_concepto').val(null);
        $('#d_concepto').val(null);

        $('#n_pos_fiscal_desde').val(null);
        $('#cuota_desde').val(null);
        $('#n_pos_fiscal_hasta').val(null);
        $('#cuota_hasta').val(null);
        $('#f_vig_desde').val(null);
        $('#f_vig_hasta').val(null);
        $('#f_cese_provisorio').val(null);




    });







    $('#btn_buscar').click(function(){


            if($("#todas_ddjj").is(':checked')) {
                     filtro_todas_ddjj = 'S';
            } else {
                     filtro_todas_ddjj = 'N';
            }


              $("#div_ddjj").show();

              $("#informes_grid").jqGrid("clearGridData");
              $("#ingresosBrutos_grid").jqGrid("clearGridData");
              $("#3142_grid").jqGrid("clearGridData");

              if ( $("#id_contribuyente").val() == ''  &&
                  $("#c_tributo").val() == ''  &&
                  $("#d_objeto_hecho").val() == ''){

                  mostrar_error('Falta Información para realizar la consulta. <BR> Verifique que tenga contribuyente o bien Tributo / Objeto <br>' + $("#id_contribuyente").val() + ' - ' +  $("#c_tributo").val() + ' ' +  $("#d_objeto_hecho").val());
                  return;

              }

        if ( $("#id_contribuyente").val() == ''  &&   $("#c_tributo").val() != ''  &&   $("#d_objeto_hecho").val() != '') {



            $.ajax({
                async:false,
                type: 'POST',
                url: 'cons_ddjj/php/validaciones.php',
                data: {
                    p_oper: 'contribuyentes',
                    c_tributo: $('#c_tributo').val(),
                    d_objeto_hecho: $('#d_objeto_hecho').val()
                },
                //dataType: 'JSON',
                success: function (response) {
                    $('#main').procOverlay({visible: false});
                    res = JSON.parse(response);
                    if (res) {
                        console.log('completar 1 bis');
                        $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
                        $("#d_denominacion").val(res['D_DENOMINACION']);
                        $("#n_cuit").val(res['N_CUIT']);
                        $("#c_tipo_imponible").val(res['C_TIPO_IMPONIBLE']);
                    } else {
                        mostrar_validacion('No existe, contribuyente con el tributo y objeto ingresado');
                        return;
                    }
                }
            });
        }
        else if ( $("#id_contribuyente").val() != ''  &&   ($("#c_tributo").val() == ''  ||   $("#d_objeto_hecho").val() == '')){



            $.ajax({
                async:false,
                type: 'POST',
                url: 'cons_ddjj/php/validaciones.php',
                data: {
                    p_oper: 'buscarobjeto',
                    id_contribuyente: $("#id_contribuyente").val()
                },
                //dataType: 'JSON',
                success: function (response) {
                    $('#main').procOverlay({visible: false});
                    res = JSON.parse(response);
                    if (res) {

                        $("#c_tributo").val(res['c_tributo']);
                        $("#d_objeto_hecho").val(res['d_objeto_hecho']);
                        $("#c_tipo_imponible").val(res['c_tipo_imponible']);

                    } else {
                        mostrar_validacion('No existe, contribuyente con el tributo y objeto ingresado, o bien tiene cese definitivo o provisorio. <BR> Debe ingresar el Tributo y Objeto en forma manual. ');
                        return;
                    }
                }
            });
         }



        if ( $("#id_contribuyente").val() == ''   ||
            $("#c_tributo").val() == ''   ||
            $("#d_objeto_hecho").val() == ''){

            mostrar_error('Falta Información para realizar la consulta' + $("#id_contribuyente").val() + ' - ' +  $("#c_tributo").val() + ' ' +  $("#d_objeto_hecho").val());

            return;
        }


        setea_parametros('#informes_grid', {
            ':pid_contribuyente': $('#id_contribuyente').val(),
            ':pc_tributo1': $('#c_tributo').val(),
            ':pc_tipo_imponible': $('#c_tipo_imponible').val(),
            ':pc_concepto': $('#c_concepto').val(),
            ':pd_objeto_hecho1': $('#d_objeto_hecho').val(),
            ':p_d': $('#n_pos_fiscal_desde').val(),
            ':c_d': $('#cuota_desde').val(),
            ':p_h': $('#n_pos_fiscal_hasta').val(),
            ':c_h': $('#cuota_hasta').val(),
            ':filtro_todas_ddjj': filtro_todas_ddjj
        }, 'S');

        console.log('seteo parametros');

    });



