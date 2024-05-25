function fecha_en_rango(){
    let comp_fecha = $('#f_cese_provisorio').val().split('/');
    let meses_treinta_dias = [4,6,9,11];
    let dias_extra_febrero = [30,31];

    let dia = parseInt(comp_fecha[0]);
    let mes = parseInt(comp_fecha[1]);

    let f_prov =  new Date($('#f_cese_provisorio').val());
    let f_desde = new Date($('#f_vig_desde').val());


    if(dia <= 0 || dia > 31){
        mostrar_error('El día debe estar entre 1 y el último día del mes', 'E', true);
        $('#f_cese_provisorio').val(null);
        return false;
    }
    else if(dia == 31 && meses_treinta_dias.includes(mes)){
        mostrar_error('El día debe estar entre 1 y el último día del mes', 'E', true);
        $('#f_cese_provisorio').val(null);
        return false;
    }
    else if(dias_extra_febrero.includes(dia) && mes == 2){
        mostrar_error('El día debe estar entre 1 y el último día del mes', 'E', true);
        $('#f_cese_provisorio').val(null);
        return false;
    }

    if(mes <= 0 || mes > 12){
        mostrar_error('El mes debe estar comprendido entre 1 y 12', 'E', true);
        $('#f_cese_provisorio').val(null);
        return false;
    }
    if(f_prov < f_desde && $('#f_vig_desde').val() != ''){
        mostrar_error('La fecha de cese debe estar en el rango '+$('#f_vig_desde').val()+' a '+fecha_hoy, 'E', true);
        $('#f_cese_provisorio').val(null);
        return false;
    }

    return true;
}

function autocompleta_contrib_por_cuit() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "cese_provisorio_tributo/php/autocomplete.php",
        data: {oper:'cuit', term: limpia_cuit($('#n_cuit').val())},
        dataType: 'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data){
                ajax_autocomplete = null;
                if(data) {
                    $("#desc_denom").val(data.DENOMINACION);
                    $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                    $("#c_tipo_documento").val(data.C_TIPO_DOCUMENTO);
                    $("#n_documento").val(data.N_DOCUMENTO);
                    $("#d_tipo_documento").val(data.D_DOCUMENTO);
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar el CUIT');
            }
        }
    });
}

function autocompleta_por_tributo_y_objeto(){
    $.ajax({
        type:'POST',
        url: "cese_provisorio_tributo/php/autocomplete.php",
        data: {
            oper:'tributo_y_objeto',
            p_c_tributo: $('#c_tributo').val(),
            p_d_obj_hecho: $('#d_objeto_hecho').val()
        },
        dataType: 'json',
        success: function( data ) {
            if(data){
				ajax_autocomplete = null;
				$("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
				$("#n_cuit").val(data.N_CUIT).mask("99-99999999-9");
				$("#desc_denom").val(data.D_DENOMINACION);
				$("#c_tipo_documento").val(data.C_TIPO_DOCUMENTO).blur();
				$("#n_documento").val(data.N_DOCUMENTO);

				//autocompleta_datos_con_id_contribuyente();


				$("#c_tributo").val(data.C_TRIBUTO).blur();
				$("#d_objeto_hecho").val(data.D_OBJETO_HECHO);
				$("#c_tipo_imponible").val(data.C_TIPO_IMPONIBLE);
				$("#f_vig_desde").val(data.F_VIG_DESDE);
				$("#f_cese_provisorio").val(data.F_CESE_PROVISORIO);
				$("#c_regimen").val(data.C_REGIMEN);
				$("#d_regimen").val(data.D_DATO);
				$("#n_inscrip_activa").val(data.N_INSCRIP_ACTIVA);

			   // $("#f_cese_provisorio").datepicker("option","minDate",data.F_VIG_DESDE);

				if(data.F_CESE_PROVISORIO !== null){ //hay
					$('#btn_eliminar_cese_prov').prop('disabled', false);
					$('#btn_cese_prov').prop('disabled', true);
					$('#f_cese_provisorio').prop('disabled', true);
				}else{
					$('#btn_eliminar_cese_prov').prop('disabled', true);
					$('#f_cese_provisorio').prop('disabled', false);
				}

				$('#n_cuit').prop('disabled', true);
				$('#desc_denom').prop('disabled', true);
				$('#c_tipo_documento').prop('disabled', true);
				$('#d_tipo_documento').prop('disabled', true);
				$('#n_documento').prop('disabled', true);
				$('#c_tributo').prop('disabled', true);
				$('#d_tributo').prop('disabled', true);
				$('#d_objeto_hecho').prop('disabled', true);
				$('#f_vig_desde').prop('disabled', true);
				$('#btn_consulta').prop('disabled', true);
				$('#mascara_lupa_c_documento').show().css('display', 'table-cell');
				$('#lupa_c_documento').hide();
				$('#mascara_lupa_c_tributo').show().css('display', 'table-cell');
				$('#lupa_c_tributo').hide();
				$('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
				$('#lupa_obj_hecho').hide();

				if(data.C_TRIBUTO === '20'){
					setear_grillas_cm();
				}

				if(data.C_TRIBUTO === '10'){
					setear_grillas_g();
				}

				if(!$("#f_cese_provisorio").val()){
					$('#btn_cese_prov').prop('disabled', false);
					$('#btn_eliminar_cese_prov').prop('disabled', true);
				}else{
					$('#btn_cese_prov').prop('disabled', true);
					$('#btn_eliminar_cese_prov').prop('disabled', false);
				}
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar el Tributo y Objeto');
                $('#main').procOverlay({visible:false});
            }
        }
    });
}

function autocompleta_por_doc(){
    $.ajax({
        type:'POST',
        url: "cese_provisorio_tributo/php/autocomplete.php",
        data: {oper:'doc', c_documento: $('#c_tipo_documento').val(), documento: limpia_doc($('#n_documento').val())},
        dataType: 'json',
        success: function( data ) {
            if(data){
                ajax_autocomplete = null;
                if(data) {
                    $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                    $("#n_cuit").val(data.CUIT).mask("99-99999999-9");
                    $("#desc_denom").val(data.DENOMINACION);

                    autocompleta_datos_con_id_contribuyente();
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar el Documento');
                $('#main').procOverlay({visible:false});
            }
        }
    });
}

function autocompleta_datos_con_id_contribuyente(){
    $.ajax({
        type:'POST',
        url: "cese_provisorio_tributo/php/autocomplete.php",
        data: {
            oper:'tributo_objeto_fechas_regimen',
            p_id_contribuyente: $('#id_contribuyente').val()
        },
        dataType: 'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data){
				if(data.valido === 0){
					mostrar_cuadro('I', 'Advertencia', 'El contribuyente posee mas de una inscripción. Por favor seleccione el objeto que desea consultar.');
					$('#main').procOverlay({visible:false});
				}else{
					$("#c_tributo").val(data.C_TRIBUTO).blur();
					$("#d_objeto_hecho").val(data.D_OBJETO_HECHO);
					$("#c_tipo_imponible").val(data.C_TIPO_IMPONIBLE);
					$("#f_vig_desde").val(data.F_VIG_DESDE);
					$("#f_cese_provisorio").val(data.F_CESE_PROVISORIO);
					$("#c_regimen").val(data.C_REGIMEN);
					$("#d_regimen").val(data.D_DATO);
					$("#n_inscrip_activa").val(data.N_INSCRIP_ACTIVA);

				   // $("#f_cese_provisorio").datepicker("option","minDate",data.F_VIG_DESDE);

					if(data.F_CESE_PROVISORIO !== null){ //hay
						$('#btn_eliminar_cese_prov').prop('disabled', false);
						$('#btn_cese_prov').prop('disabled', true);
						$('#f_cese_provisorio').prop('disabled', true);
					}else{
						$('#btn_eliminar_cese_prov').prop('disabled', true);
						$('#f_cese_provisorio').prop('disabled', false);
					}

					$('#n_cuit').prop('disabled', true);
					$('#desc_denom').prop('disabled', true);
					$('#c_tipo_documento').prop('disabled', true);
					$('#d_tipo_documento').prop('disabled', true);
					$('#n_documento').prop('disabled', true);
					$('#c_tributo').prop('disabled', true);
					$('#d_tributo').prop('disabled', true);
					$('#d_objeto_hecho').prop('disabled', true);
					$('#f_vig_desde').prop('disabled', true);
					$('#btn_consulta').prop('disabled', true);
					$('#mascara_lupa_c_documento').show().css('display', 'table-cell');
					$('#lupa_c_documento').hide();
					$('#mascara_lupa_c_tributo').show().css('display', 'table-cell');
					$('#lupa_c_tributo').hide();
					$('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
					$('#lupa_obj_hecho').hide();

					if(data.C_TRIBUTO === '20'){
						setear_grillas_cm();
					}

					if(data.C_TRIBUTO === '10'){
						setear_grillas_g();
					}

					if(!$("#f_cese_provisorio").val()){
						$('#btn_cese_prov').prop('disabled', false);
						$('#btn_eliminar_cese_prov').prop('disabled', true);
					}else{
						$('#btn_cese_prov').prop('disabled', true);
						$('#btn_eliminar_cese_prov').prop('disabled', false);
					}
				}
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar la información del contribuyente.');
                $('#main').procOverlay({visible:false});
            }
        }
    });
}

function cese_prov(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_id_contribuyente":$('#id_contribuyente').val(),
            "p_n_cuit":limpia_cuit($('#n_cuit').val()),
            "p_d_objeto_hecho":$('#d_objeto_hecho').val(),
            "p_c_tributo":$('#c_tributo').val(),
            "p_c_tipo_imponible":$('#c_tipo_imponible').val(),
            "p_d_tributo":$('#d_tributo').val(),
            "p_f_vig_desde":$('#f_vig_desde').val(),
            "p_f_cese_provisorio":$('#f_cese_provisorio').val(),
            "id_menu":v_id_menu,
            "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                $("#n_sesion_generada").val(data.p_sesion_generada);
                if(data.p_hay_errores === 'S'){
                    filtros_no_nativos_ar = [];
                    filtros_arr_main_errores = [];

                    if($("#n_sesion_generada").val() != ''){
                        filtros_arr_main_errores.push('Nro. Sesión: '+ $("#n_sesion_generada").val());
                    }
                    if($('#n_cuit').val() != ''){
                        filtros_arr_main_errores.push('CUIT: '+ $('#n_cuit').val());
                    }
                    if($('#desc_denom').val() != ''){
                        filtros_arr_main_errores.push('Denominación: '+ $('#desc_denom').val());
                    }
                    if($('#c_tipo_documento').val() != ''){
                        filtros_arr_main_errores.push('Tipo Documento: '+ $('#c_tipo_documento').val()+' - '+$('#d_tipo_documento').val());
                    }
                    if($('#n_documento').val() != ''){
                        filtros_arr_main_errores.push('Documento: '+ $('#n_documento').val());
                    }
                    if($('#c_tributo').val() != ''){
                        filtros_arr_main_errores.push('Tributo: '+ $('#c_tributo').val() +' - '+$('#d_tributo').val());
                    }
                    if($('#d_objeto_hecho').val() != ''){
                        filtros_arr_main_errores.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());
                    }
                    if($('#f_vig_desde').val() != ''){
                        filtros_arr_main_errores.push('F. Vig. Desde: '+ $('#f_vig_desde').val());
                    }
                    if($('#f_cese_provisorio').val() != ''){
                        filtros_arr_main_errores.push('F. de Cese PROVISORIO: '+ $('#f_cese_provisorio').val());
                    }

                    filtros_no_nativos_ar['main_grid_errores'] = filtros_arr_main_errores;
                    $('#errores_encontrados_modal').modal("show");
                    setea_parametros('#main_grid_errores',{
                        ':p_sesion':data.p_sesion_generada
                    });
                    $('#errores_encontrados_modal').draggable();
                    $(window).resize();
                    $('#btn_grabar').click(function(){
                        mostrar_cuadro('I', 'Atención', data.p_mensaje,
                            function(){
                                $('#motivo_de_baja_modal').modal("show");
                            },function(){
                                borrar_tmp($("#n_sesion_generada").val());
                            }, 500);
                    });
                }else{
                    mostrar_cuadro('I', 'Atención', data.p_mensaje,
                        function(){
                            $('#motivo_de_baja_modal').modal("show");
                        },function(){}, 500);
                }
            }else{
                mostrar_cuadro('E', 'Error', data.resultado);
            }
        }
    });
}

function eliminar_cese_prov(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_id_contribuyente":$('#id_contribuyente').val(),
            "p_n_cuit":limpia_cuit($('#n_cuit').val()),
            "p_obj_hecho":$('#d_objeto_hecho').val(),
            "p_c_tributo":$('#c_tributo').val(),
            "p_c_tipo_imponible":$('#c_tipo_imponible').val(),
            "p_f_vig_desde":$('#f_vig_desde').val(),
            "p_f_cese_provisorio":$('#f_cese_provisorio').val(),
            "id_menu":v_id_menu,
            "n_orden":2
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                mostrar_cuadro('S', 'Éxito',data.p_leyenda);
                $('#btn_limpiar').click();

            }else{
                mostrar_cuadro('E', 'Error', data.resultado);
            }
        }
    });
}

function setear_grillas_cm(){
    //Grillas Actividades y Jurisdiccion.
    filtros_no_nativos_ar = [];
    filtros_arr_main = [];

    if($('#n_cuit').val() != ''){
        filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());
    }
    if($('#desc_denom').val() != ''){
        filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());
    }
    if($('#c_tipo_documento').val() != ''){
        filtros_arr_main.push('Tipo Documento: '+ $('#c_tipo_documento').val()+' - '+$('#d_tipo_documento').val());
    }
    if($('#n_documento').val() != ''){
        filtros_arr_main.push('Documento: '+ $('#n_documento').val());
    }
    if($('#c_tributo').val() != ''){
        filtros_arr_main.push('Tributo: '+ $('#c_tributo').val() +' - '+$('#d_tributo').val());
    }
    if($('#d_objeto_hecho').val() != ''){
        filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());
    }
    if($('#f_vig_desde').val() != ''){
        filtros_arr_main.push('F. Vig. Desde: '+ $('#f_vig_desde').val());
    }
    if($('#f_cese_provisorio').val() != ''){
        filtros_arr_main.push('F. de Cese PROVISORIO: '+ $('#f_cese_provisorio').val());
    }

    filtros_no_nativos_ar['main_grid_actividades_cm'] = filtros_arr_main;
    filtros_no_nativos_ar['main_grid_jurisdicciones'] = filtros_arr_main;

    setea_parametros('#main_grid_actividades_cm',{
        ':p_id_contribuyente':$('#id_contribuyente').val(),
        ':p_c_tributo':$('#c_tributo').val(),
        ':p_c_tipo_imponible':$('#c_tipo_imponible').val(),
        ':p_obj_hecho':$('#d_objeto_hecho').val()
    });

    setea_parametros('#main_grid_jurisdicciones',{
        ':p_id_contribuyente':$('#id_contribuyente').val(),
        ':p_c_tributo':$('#c_tributo').val(),
        ':p_c_tipo_imponible':$('#c_tipo_imponible').val(),
        ':p_obj_hecho':$('#d_objeto_hecho').val()
    });

    document.getElementById('grid_comercios').style.display="none";
    document.getElementById('grid_actividades_ibd').style.display="none";
    document.getElementById('grid_actividades_cm').style.display="block";
    document.getElementById('grid_jurisdicciones').style.display="block";
    $(window).resize();
}

function setear_grillas_g(){
    filtros_no_nativos_ar = [];
    filtros_arr_main = [];

    if($('#n_cuit').val() != ''){
        filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());
    }
    if($('#desc_denom').val() != ''){
        filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());
    }
    if($('#c_tipo_documento').val() != ''){
        filtros_arr_main.push('Tipo Documento: '+ $('#c_tipo_documento').val()+' - '+$('#d_tipo_documento').val());
    }
    if($('#n_documento').val() != ''){
        filtros_arr_main.push('Documento: '+ $('#n_documento').val());
    }
    if($('#c_tributo').val() != ''){
        filtros_arr_main.push('Tributo: '+ $('#c_tributo').val() +' - '+$('#d_tributo').val());
    }
    if($('#d_objeto_hecho').val() != ''){
        filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());
    }
    if($('#f_vig_desde').val() != ''){
        filtros_arr_main.push('F. Vig. Desde: '+ $('#f_vig_desde').val());
    }
    if($('#f_cese_provisorio').val() != ''){
        filtros_arr_main.push('F. de Cese PROVISORIO: '+ $('#f_cese_provisorio').val());
    }

    filtros_no_nativos_ar['main_grid_actividades_ibd'] = filtros_arr_main;
    filtros_no_nativos_ar['main_grid_comercios'] = filtros_arr_main;


    setea_parametros('#main_grid_comercios',{
        ':p_id_contribuyente':$('#id_contribuyente').val(),
        ':p_c_tributo':$('#c_tributo').val(),
        ':p_c_tipo_imponible':$('#c_tipo_imponible').val(),
        ':p_obj_hecho':$('#d_objeto_hecho').val()
    });

    setea_parametros('#main_grid_actividades_ibd',{
        ':p_id_contribuyente':$('#id_contribuyente').val(),
        ':p_c_tributo':$('#c_tributo').val(),
        ':p_c_tipo_imponible':$('#c_tipo_imponible').val(),
        ':p_obj_hecho':$('#d_objeto_hecho').val()
    });

    document.getElementById('grid_comercios').style.display="block";
    document.getElementById('grid_actividades_ibd').style.display="block";
    document.getElementById('grid_actividades_cm').style.display="none";
    document.getElementById('grid_jurisdicciones').style.display="none";
    $(window).resize();

}

function grabar(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_c_motivo_cese_prov":$('#c_motivo_cese').val(),
            "p_n_tabla_mot_baja":$('#n_tabla_motivo').val(),
            "p_f_cese_provisorio":$('#f_cese_provisorio').val(),
            "p_id_contribuyente":$('#id_contribuyente').val(),
            "p_c_tributo":$('#c_tributo').val(),
            "p_obj_hecho":$('#d_objeto_hecho').val(),
            "p_c_tipo_imponible":$('#c_tipo_imponible').val(),
            "id_menu":v_id_menu,
            "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado === 'OK'){
                borrar_tmp($("#n_sesion_generada").val());
                mostrar_cuadro('S', 'Éxito','El tributo fue cesado provisoriamente de manera correcta.');
                $('#btn_limpiar').click();
            }
        }
    });
}

function borrar_tmp(p_n_sesion){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_n_sesion":p_n_sesion,
            "id_menu":v_id_menu,
            "n_orden":3
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado !== 'OK'){
                mostrar_cuadro('E', 'Error al borrar grilla temporal de errores', data.resultado);
            }
        }
    });
}

function limpia_doc(doc){
    var result;
    result=doc.replace('.','');
    result=result.replace('.','');
    return result;
}/* QUITA LOS PUNTOS DEL DOC */