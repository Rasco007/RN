function inicializarEventos() {
    document.getElementById('grid_comercios').style.display="none";
    document.getElementById('grid_actividades_cm').style.display="none";
    document.getElementById('grid_actividades_ibd').style.display="none";
    document.getElementById('grid_jurisdicciones').style.display="none";
    $('#mascara_lupa_c_documento').hide();
    $('#mascara_lupa_c_tributo').hide();
    $('#lupa_d_denominacion').hide();
    $('#lupa_obj_hecho').hide();

    $('#btn_cese_prov').prop('disabled', true);
    $('#f_vig_desde').prop('disabled', true);
    $('#btn_eliminar_cese_prov').prop('disabled', true);
    $("#n_cuit").mask("99-99999999-9");

    $('#motivo_de_baja_modal').on('hidden.bs.modal', function () {
        $("#c_motivo_cese").val(null);
        $("#d_motivo_cese").val(null);
    });

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $('#f_cese_provisorio').change(function () {
        if ($('#f_vig_desde').val() != ''){
            if($.datepicker.parseDate('dd/mm/yy', $(this).val()) < $.datepicker.parseDate('dd/mm/yy', $('#f_vig_desde').val()) ){
                mostrar_error('La fecha de Cese debe estar en el rango '+$('#f_vig_desde').val()+' a '+fecha_hoy+'.', 'E', true);
                $('#f_cese_provisorio').val(null);
                return false;
            }
            if($.datepicker.parseDate('dd/mm/yy', $(this).val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy) ){
                mostrar_error('La fecha de Cese debe estar en el rango '+$('#f_vig_desde').val()+' a '+fecha_hoy+'.', 'E', true);
                $('#f_cese_provisorio').val(null);
                return false;
            }
        }
    });

    $("#f_cese_provisorio").datepicker("option","maxDate",fecha_hoy);

    $('#d_objeto_hecho').on('keyup', function (event) {
        if ($(this).val().length >= 3 || ($('#n_cuit').val() && $('#c_tributo').val())) {
            $('#lupa_obj_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_obj_hecho').hide();
        } else{
            $('#lupa_obj_hecho').hide();
            $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        }
    });

    $('#n_cuit, #c_tributo').focusout(function(){
        $('#d_objeto_hecho').keyup();
    });


    $('#desc_denom').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        }
    });

    $('#btn_consulta').click(function(){
        $('#main').procOverlay({visible:true});
        if ((!$('#id_contribuyente').val()) &&
            (!$('#c_tipo_documento').val() && !$('#d_tipo_documento').val()) &&
            (!$('#c_tributo').val() && !$('#d_objeto_hecho').val())){
                mostrar_cuadro('E', 'Error', 'Debe ingresar al menos uno de los siguientes criterios de búsqueda: Nro. de CUIT ó (Tipo ' +
                    'y Nro. de Documento) ó (Tributo y Objeto/Hecho).',
                    null,null,400);
                $('#main').procOverlay({visible:false});
        }else{
            if($('#c_tributo').val() && $('#d_objeto_hecho').val()){
                autocompleta_por_tributo_y_objeto();
            }else if($('#c_tipo_documento').val() && $('#n_documento').val() && $('#n_cuit').val() == ''){
                autocompleta_por_doc();
            } 
             else{
                 autocompleta_datos_con_id_contribuyente();
             }
        }
    });

    $('#btn_cese_prov').click(function(){
        $('#btn_grabar').unbind('click');
        if (!$('#f_cese_provisorio').val()){
            mostrar_cuadro('E', 'Error', 'El campo Fecha de Cese PROVISORIO no puede quedar vacío.',
                null,null,400);
        }else{
            if ($('#c_tributo').val() === '20' && ($('#d_objeto_hecho').val() === limpia_cuit($('#n_cuit').val()))) {
                if((TOTAL_Intranet === 'S')||(aut_alta_cese_cm === 'S')){
                    mostrar_cuadro('I', 'Atención', 'No se debería procesar. Pero puede continuar porque tiene un rol total o uno exclusivo de Planeamiento (Recaudación).',
                        function () {
                            cese_prov();
                        },null, 400);
                    return;
                }else{
                    mostrar_cuadro('E', 'Error', 'No tiene permiso para esta operación.', null, null, 400);
                    return;
                }
            }
            cese_prov();
        }

    });

    $('#btn_eliminar_cese_prov').click(function(){
        if($('#n_inscrip_activa').val() !== '0'){ //Control nuevo requerido
			if(TOTAL_Intranet === 'S'){
				mostrar_cuadro(
					'Q', 'Atención', 'El contribuyente tiene otra inscripción del tributo ACTIVA. No se deberia reactivar esta inscripción, pero puede continuar porque tiene un Rol Total.',
					function () { eliminar_cese_prov(); }, function () { }, 400
				);
				return;
			} else {
				mostrar_cuadro('E', 'Error', 'El contribuyente tiene otra inscripción del tributo ACTIVA. No se puede procesar esta reactivación.', null, null, 400);
				return;
            }
		}

		if ($('#c_regimen').val() === 'S'){
			if((TOTAL_Intranet === 'S')||(aut_alta_cese_rs === 'S')){
				mostrar_cuadro(
					'Q', 'Atención', 'No se debería procesar. Pero puede continuar porque tiene un rol total o uno exclusivo de sector Recaudación.',
					function () { eliminar_cese_prov(); },function () {},400
				);
				return;
			}else{
				mostrar_cuadro('E', 'Error', 'No se puede procesar. El último regimen activo es simplificado.', null, null, 400);
				return;
			}
		}

		if ($('#c_tributo').val() === '20' && ($('#d_objeto_hecho').val() === limpia_cuit($('#n_cuit').val()))) {
			if((TOTAL_Intranet === 'S')||(aut_alta_cese_cm === 'S')){
				mostrar_cuadro(
					'Q', 'Atención', 'No se debería procesar. Pero puede continuar porque tiene un rol total o uno exclusivo de sector Recaudación.',
					function () { eliminar_cese_prov(); },function () {},400
				);
				return;
			}else{
				mostrar_cuadro('E', 'Error', 'No tiene permiso para esta operación.', null, null, 400);
				return;
			} 
		}

		if ($('#c_tributo').val() === '20' && ($('#d_objeto_hecho').val() !== limpia_cuit($('#n_cuit').val()))) { 
			mostrar_cuadro('E', 'Error', 'Inscrip. CM formato anterior.No tiene permiso para esta operación.', null, null, 400);
			return;
		}else{
			eliminar_cese_prov();             
		}
    });

    $('#btn_limpiar').click(function(){

        document.getElementById('grid_actividades_cm').style.display="none";
        document.getElementById('grid_actividades_ibd').style.display="none";
        document.getElementById('grid_comercios').style.display="none";
        document.getElementById('grid_jurisdicciones').style.display="none";

        $('#id_contribuyente').val(null);
        $('#n_cuit').val(null);
        $('#desc_denom').val(null);
        $('#c_tipo_documento').val(null);
        $('#d_tipo_documento').val(null);
        $('#n_documento').val(null);
        $('#c_tributo').val(null);
        $('#d_tributo').val(null);
        $('#d_objeto_hecho').val(null);
        $('#f_vig_desde').val(null);
        $('#f_cese_provisorio').val(null);
        $('#c_regimen').val(null);
        $('#d_regimen').val(null);
        $('#main_grid_actividades_cm').clearGridData();
        $('#main_grid_actividades_ibd').clearGridData();
        $('#main_grid_jurisdicciones').clearGridData();
        $('#main_grid_comercios').clearGridData();
        $('#btn_cese_prov').prop('disabled', true);
        $('#btn_eliminar_cese_prov').prop('disabled', true);
        $('#f_cese_provisorio').prop('disabled', false);
        $('#lupa_obj_hecho').hide();
        $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        $('#lupa_c_documento').show().css('display', 'table-cell');
        $('#mascara_lupa_c_documento').hide();
        $('#lupa_c_tributo').show().css('display', 'table-cell');
        $('#mascara_lupa_c_tributo').hide();
        $('#btn_consulta').prop('disabled', false);
        $('#n_cuit').prop('disabled', false);
        $('#desc_denom').prop('disabled', false);
        $('#c_tipo_documento').prop('disabled', false);
        $('#d_tipo_documento').prop('disabled', false);
        $('#n_documento').prop('disabled', false);
        $('#c_tributo').prop('disabled', false);
        $('#d_tributo').prop('disabled', false);
        $('#d_objeto_hecho').prop('disabled', false);
        //$('#f_vig_desde').prop('disabled', false);
    });

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() !== ''){
            if( limpia_cuit($('#n_cuit').val()).length === 11 ){
                autocompleta_contrib_por_cuit();
            }else{
                $('#id_contribuyente').val(null);
                $('#n_cuit').val(null);
                $('#desc_denom').val(null);
                $('#c_tipo_documento').val(null);
                $('#d_tipo_documento').val(null);
                $('#n_documento').val(null);
            }
        }
    });

    $('#btn_grabar_con_motivo').click(function(){
        if (!$('#c_motivo_cese').val()){
            mostrar_cuadro('E', 'Error', 'El campo Motivo de Cese no puede quedar vacío.',
                function(){
                    $('#motivo_de_baja_modal').modal("show");
                },null,400);

        }else{
            grabar();
        }
    });

    $('#btn_cancelar_grabar, #btn_cancelar_grabar_con_motivo').click(function(){
        borrar_tmp($("#n_sesion_generada").val());
    });


}

