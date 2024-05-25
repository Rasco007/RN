function habilitar_campos(){
	$("#lupa_dominio, #lupa_dom_ant").hide();
	$("#btn_buscar, #btn_continuar").attr('disabled',true);

	if (p_modo == 'C'){
	    $("#frm_datos_contrib :input,#frm_busqueda :input").attr('disabled',true);
	    $("#btn_con_cuit, #btn_sin_cuit, #btn_grabar_datos").attr('disabled',true);
	    $("#btn_mov_hist").attr('disabled',false);
	    $(".btn_lupa, #btn_grabar_datos").hide();
	}else{
	    $("#btn_mov_hist").attr('disabled',true);
	}

	if (p_modo == 'T'){
	    // Deshabilita estos campos para que no se puedan modificar en este MODO
	    $("#d_patente,#d_verif_dom,#d_patente_vieja,#d_verif_dom_ant,#d_estado").attr('disabled',true);
	    $("#m_convocatoria,#c_rnpa,#c_delegacion,#f_radicacion,#f_inscripcion,#f_baja").attr('disabled',true);
	    $("#lupa_rnpa, #lupa_delegacion").hide();
	    // Blanquea y habilita el campo tranformaciones
	    $("#f_ult_transformacion").attr('disabled',false);
	    $("#btn_contribuyente").attr('disabled',true);
	    $("#btn_grabar_datos").attr('disabled',false);
	    $("#btn_grabar_datos").show();
	}

	if(p_modo==""){
		if(v_existe){
	    	$("#btn_contribuyente").attr('disabled',false);
			$("#d_patente,#d_verif_dom,#d_patente_vieja,#d_verif_dom_ant,#d_estado").attr('disabled',true);
	    }else{
			$("#d_verif_dom,#d_verif_dom_ant,#d_estado").attr('disabled',true);
	    	$("#btn_contribuyente").attr('disabled',true);
		}
    	$("#m_convocatoria,#f_baja,#f_ult_transformacion").attr('disabled',true);
	    $("#btn_grabar_datos").attr('disabled',false);
	    $("#btn_grabar_datos").show();
	}
}

function valida_patente(){
	$.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
        	"p_m_actual": 'NO',
        	"p_d_patente": $("#d_patente").val(),
        	"p_m_sin_convocatoria": $("#m_convocatoria").prop('checked')?'SIN':'',
        	"p_c_grupo": $("#c_grupo").val(),
        	"p_f_inscripcion": $("#f_inscripcion").val(),
        	"p_f_radicacion": $("#f_radicacion").val(),
        	"p_d_patente_vieja": $("#d_patente_vieja").val(),
        	"id_menu": 10989,
        	"n_orden": 5
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
            	existe_patente();
            }else if (data.resultado =='mostrar_alerta2'){
				mostrar_cuadro('C','Atención','¿Está seguro que el dominio anterior es correcto?',function(){existe_patente()},function(){return;});
            }else{
				mostrar_error(data.resultado);
				$('#d_patente_vieja').val(null).focus();
				return;
			}
        }
    });
}

function existe_patente(){
	$('#main').procOverlay({visible:true});
	$.ajax({
		url: "cons_dominio/ajax_consultas.php",
		type:"POST",
		dataType: "JSON",
		data:{
			p_oper: 'existe_patente',
			p_filtro_lista0: p_modo,
			p_filtro_lista1: $("#d_patente").val(),
			p_filtro_lista2: $("#d_patente_vieja").val()
		},
		success: function (res) {
			$('#main').procOverlay({visible:false});
			if(res.error != 'OK'){
				if (p_modo != 'T' && p_modo != 'C') {
					if ($("#d_patente").val()) {
						if ($("#d_patente").val().length == 6 || $("#d_patente").val().length == 7 || $("#d_patente").val().length == 9) {
							if (typeof v_existe === "undefined"){
								v_existe = false;
								$("#d_verif_dom, #d_verif_dom_ant").attr('disabled', true);
								$("#lupa_dominio, #lupa_dom_ant").hide();
								/*$("#btn_buscar").hide();*/
								/*$("#btn_continuar").show();*/
								mostrar_mensaje_modal('V','Atención','El dominio ingresado no existe<br>¿Desea darlo de alta?.',
									function(){$('#btn_continuar').click();},
									function(){$('#btn_limpiar').click();});
							}
						} else {
							$("#d_patente").val(null).focus();
							mostrar_validacion('La longitud del dominio debe ser igual a 6, 7 o 9 caracteres.');
						}
					} else if ($('#d_patente_vieja').val()) {
						if (typeof v_existe === "undefined"){
							v_existe = false;
							$("#d_verif_dom, #d_verif_dom_ant").attr('disabled', true);
							$("#lupa_dominio, #lupa_dom_ant").hide();
							/*$("#btn_buscar").hide();
							$("#btn_continuar").show();*/
							mostrar_mensaje_modal('V','Atención','El dominio anterior ingresado no existe<br>¿Desea darlo de alta?',
								function(){$('#btn_continuar').click();},
								function(){$('#btn_limpiar').click();});
						}
					}
				}else{
					v_existe = void 0;
					mostrar_validacion('El Dominio/Dominio Anterior ingresado no existe.');
				}
			}else {
				if (typeof v_existe === "undefined"){
					v_existe = true;
					$("#d_patente, #d_verif_dom, #d_patente_vieja, #d_verif_dom_ant").attr('disabled',false);
					$("#lupa_dominio, #lupa_dom_ant").show();
					$("#btn_buscar").show();
					$("#btn_continuar").hide();
				}else if (p_modo != 'T' && p_modo != 'C'){
					if (res.dom > 0){
						$("#d_patente").val(null).focus();
						mostrar_validacion('El Dominio ya se encuentra registrado.');
					}else if (res.dom_ant > 0){
						$("#d_patente_vieja").val(null).focus();
						mostrar_validacion('El Dominio Anterior ya se encuentra registrado.');
					}
				}
			}
		}
	});
}

function autocompleta_contrib(id){
	switch (id) {
		case 'cuit':
		    if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
		        $('#main').procOverlay({visible:true});
		        $.ajax({
		            url: "cons_dominio/ajax_consultas.php",
		            type:"POST",
		            dataType: 'JSON',
		            data:{ p_oper:'cuit', filtro: limpia_cuit($('#n_cuit').val())},
		            success: function(res){
		                $('#main').procOverlay({visible:false});
		                if (res){
		                    $("#n_cuit").val(res['CUIT']);
		                    $("#d_denominacion").val(res['DENOMINACION']);
		                    $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
		                    $("#c_tipo_documento").val(res['C_TIPO_DOCUMENTO']);
		                    $("#d_tipo_documento").val(res['D_TIPO_DOCUMENTO']);
		                    $("#n_documento").val(res['N_DOCUMENTO']);
		                    $("#c_tipo_domicilio,#d_tipo_domicilio,#d_domicilio").val(null);
		                    $("#d_denominacion,#id_contribuyente,#c_tipo_documento,#d_tipo_documento,#n_documento").attr('readonly',true);
		                    $("#lupa_tipo_documento").hide();
		                }
		            }
		        });
		    }else{
		    	$("#n_cuit,#d_denominacion,#id_contribuyente,#c_tipo_documento,#d_tipo_documento,#n_documento").val(null);
		    	$("#c_tipo_domicilio, #d_tipo_domicilio, #d_domicilio").val(null);
                $("#n_cuit,#d_denominacion,#id_contribuyente,#c_tipo_documento,#d_tipo_documento,#n_documento").attr('readonly',false);
                $("#lupa_tipo_documento").show();
		    }
			break;
		case 'documento':
			if ($("#n_documento").val()!=""){
		        $('#main').procOverlay({visible:true});
		        $.ajax({
		            url: "cons_dominio/ajax_consultas.php",
		            type:"POST",
		            dataType: 'JSON',
		            data:{ p_oper:'documento', c_tipo_documento:$("#c_tipo_documento").val(), filtro: $("#n_documento").val()},
		            success: function(res){
		                $('#main').procOverlay({visible:false});
		                if (res){
		                    $("#n_cuit").val(res['CUIT']);
		                    $("#d_denominacion").val(res['DENOMINACION']);
		                    $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
		                    $("#c_tipo_documento").val(res['C_TIPO_DOCUMENTO']);
		                    $("#d_tipo_documento").val(res['D_TIPO_DOCUMENTO']);
		                    $("#n_documento").val(res['N_DOCUMENTO']);
		                    $("#c_tipo_domicilio,#d_tipo_domicilio,#d_domicilio").val(null);
		                    $("#n_cuit,#d_denominacion,#id_contribuyente,#c_tipo_documento,#d_tipo_documento").attr('readonly',true);
		                    $("#lupa_tipo_documento").hide();
		                }
		            }
		        });
		    }else{
		    	$("#n_cuit,#d_denominacion,#id_contribuyente,#c_tipo_documento,#d_tipo_documento,#n_documento").val(null);
		    	$("#c_tipo_domicilio, #d_tipo_domicilio, #d_domicilio").val(null);
                $("#n_cuit,#d_denominacion,#id_contribuyente,#c_tipo_documento,#d_tipo_documento,#n_documento").attr('readonly',false);
                $("#lupa_tipo_documento").show();
		    }
			break;
	}
}

function valida_n_cilindrada(){
	$('#main').procOverlay({visible:true});
	$.ajax({
		url: "cons_dominio/ajax_consultas.php",
		type:"POST",
		dataType: "JSON",
		data:{
			p_oper:'n_cilindrada',
			p_n_peso: parse($("#n_peso").val()),
			p_c_marca_aut: $("#c_marca").val(),
			p_id_modelo: $("#c_modelo").val(),
			p_id_descripcion: $("#c_descripcion").val()
		},
		success: function (res) {
			$('#main').procOverlay({visible:false});
			if(res){
				if(res.error){
					$("#n_peso").val(null);
					mostrar_error(res.error);
				}
			}else{
				mostrar_error('Ocurrió un error al validar el peso.');
			}
		}
	});
}

function fun_sin_convocatoria(){
	if($("#m_convocatoria").prop('checked') && $('#d_patente_vieja').val()){
		$("#d_patente").val($("#d_patente_vieja").val());
		$("#d_patente").attr('disabled',true);
	}else if(!$("#m_convocatoria").prop('checked') && $('#d_patente_vieja').val()){
		$("#d_patente").val(null);
		$("#d_patente").attr('disabled',false);
	}
}

/*function fun_sin_convocatoria(){
	console.log($('#m_convocatoria').prop('checked'));
}*/

function btn_contrib_con_cuit() {
	post_to_url('contribuyentes.php', {
		'p_objeto_viejo': 'N',
		'p_permite_vs_ag': 'N',
		'p_sintributo': 'S',
		'tipo_documento': $("#c_tipo_documento").val(),
		'd_tipo_documento': $("#d_tipo_documento").val(),
		'documento': $("#n_documento").val(),
		'cuit': $("#n_cuit").val(),
		'ruta': "[]",
		'p_n_id_menu': 10865
	}, '_blank');
}

function btn_contrib_sin_cuit() {
	post_to_url('contribuyentes_st.php', {
		'p_n_id_menu': 10875,
		'ruta': '[]'
	}, '_blank');
}

function btn_legajo_contribuyente() {
	post_to_url('legajo_contribuyente.php', {
		'p_n_id_menu': 10886,
		'p_id_contribuyente': getDatoContrib("id_contribuyente"),
		'cuit': $("#n_cuit","#frm_datos_contrib").val(),
		'ruta': '[]'
	}, '_blank');
}

function btn_responsables(){
	var v_modo;
	if(p_modo == 'C'){
		v_modo = 'C';
	}else{
		v_modo = 'U';
	}

	post_to_url('ingreso_copropietarios.php', {
		'p_n_id_menu': 10953,
		'p_modo': v_modo,
		'p_tributo': 90,
		'p_objeto': $("#d_patente").val(),
		'p_digito_verif': $("#d_verif_dom").val(),
		'p_m_autoquery': 'S',
		'ruta': '[]'
	}, '_blank');
}

function btn_exenciones(){
	if(p_modo == 'C'){
		$('#main').procOverlay({visible:true});
		$.ajax({
			url: "cons_dominio/ajax_consultas.php",
			type:"POST",
			dataType: "JSON",
			data:{
				p_oper:'excenciones',
				p_id_contribuyente: getDatoContrib("id_contribuyente"),
				p_d_patente: $("#d_patente").val()
			},
			success: function (res) {
				$('#main').procOverlay({visible:false});
				if(res.cant > 0){
					post_to_url('excenciones_hechos.php', {
				        'p_n_id_menu': 10889,
				        'p_m_autoquery': 'S',
						'p_modo': 'X',
				        'p_c_timp': 10,
				        'p_c_trib': 90,
				        'p_id_contrib': getDatoContrib("id_contribuyente"),
				        'p_objeto': $("#d_patente").val(),
						'ruta': '[]'
				    }, '_blank');
				}else{
					mostrar_error('No hay exenciones para el Contribuyente y Objeto seleccionado.');
				}
			}
		});
	}else{
		post_to_url('excenciones_hechos.php', {
	        'p_n_id_menu': 10889,
	        'p_m_autoquery': 'S',
	        'p_c_timp': 10,
	        'p_c_trib': 90,
	        'p_id_contrib': getDatoContrib("id_contribuyente"),
	        'p_objeto': $("#d_patente").val(),
			'ruta': '[]'
	    }, '_blank');
	}
}

function btn_cuenta_corriente(){
	post_to_url('consulta_cuenta_corr.php', {
		'p_n_id_menu': 10852,
		'id_contribuyente': getDatoContrib("id_contribuyente"),
		'c_tipo_imponible': 10,
		'c_tributo': 90,
		'd_objeto_hecho': $("#d_patente").val(),
		'p_m_autoquery': 'S',
		'ruta': '[]'
	}, '_blank');
}

function btn_movimientos_hist(){
	post_to_url('cons_hist_movi_aut.php', {
        'p_n_id_menu': 10993,
        'p_m_autoquery': 'S',
        'p_patente': $("#d_patente").val(),
		'ruta': '[]'
    }, '_blank');
}

function btn_impuesto_anual(){
	$.ajax({
	    type:'POST',
	    url: FUNCIONES_BASEPATH+'maestro_abm.php',
	    data:{
	    	"p_c_marca_aut": $("#c_marca").val(),
	    	"p_c_grupo": $("#c_grupo").val(),
	    	"p_id_modelo": $("#x_modelo").val(),
	    	"p_id_descripcion": $("#x_descripcion").val(),
	    	"p_n_modelo_año": $("#n_modelo").val(),
	    	"p_n_peso_cilindrada": parse($("#n_peso").val()),
	    	"p_c_fmcamod": $("#c_fmcamod").val(),
	    	"p_n_hp": parse($("#n_hp").val()),
	    	"p_f_radicacion": $("#f_radicacion").val(),
	    	"id_menu":10989,
	    	"n_orden":0
	    },
	    dataType:'json',
	    success: function( data ) {
	        if(data.resultado == 'OK'){
	        	setea_parametros('#tmp_impuesto_anual_grid',{':id_impuesto_anual':data.p_id_impuesto_anual});
				$("#modal_impuesto_anual").modal('show');
				$(window).resize();
	        }
	        else{
	            mostrar_validacion(data.resultado);
	            return;
	        }
	    }
	});
}

function check_digito_verificador(param, digito) {
	$('#main').procOverlay({visible:true});
	$.ajax({
		url: "cons_dominio/ajax_consultas.php",
		type:"POST",
		dataType: "JSON",
		data:{ p_oper:'checkDigito', param: param},
		success: function (res) {
			$('#main').procOverlay({visible:false});
			if(res){
				if(res.digito != digito){
					mostrar_error('El Dígito Verificador no es correcto.');
					return;
				}else{
					habilitar_campos();
					fun_completa_dominio();
				}
			}else{
				mostrar_error('Ocurrió un error al comprobar el Digito Verificador.');
			}
		}
	});
}

function fun_completa_dominio(){
	var params = {p_oper:'getDominio'};
	if ($('#d_patente').val()!="" && $('#d_patente_vieja').val()==""){
		params.dominio = $('#d_patente').val();
		params.obtener = 'patente_vieja';
		completar_datos(params);
	}else if($('#d_patente_vieja').val()!="" && $('#d_patente').val()==""){
		params.dominio = $('#d_patente_vieja').val();
		params.obtener = 'patente';
		completar_datos(params);
	}else{
		realizar_busqueda();
	}
}

function completar_datos(params){
	$('#main').procOverlay({visible:true});
	$.ajax({
		url: "cons_dominio/ajax_consultas.php",
		type:"POST",
		dataType: "JSON",
		data:params,
		success: function (res) {
			$('#main').procOverlay({visible:false});
			if(res){
				if(params.obtener == 'patente'){
					$('#d_patente').val(res.objeto);
					$('#d_verif_dom').val(res.digito);
				}else if(params.obtener == 'patente_vieja'){
					$('#d_patente_vieja').val(res.objeto);
					$('#d_verif_dom_ant').val(res.digito);
				}
				realizar_busqueda();
			}
			else{
				mostrar_error('Ocurrió un error al obtener los datos del Dominio.');
			}
		}
	});
}

function realizar_busqueda(){
	$('#main').procOverlay({visible:true});
	$.ajax({
		url: "cons_dominio/ajax_consultas.php",
		type:"POST",
		dataType: "JSON",
		data:{
			p_oper:'get_datos',
			p_d_patente: $("#d_patente").val(),
			p_d_patente_vieja: $("#d_patente_vieja").val()
		},
		success: function (res) {
			if(res){
				if (res.n_obligs > 0){
					$('#c_motivo_alta, #f_radicacion',"#frm_busqueda").attr('disabled',true);
					$("#lupa_motivo_alta").hide();
				}else{
					$('#c_motivo_alta, #f_radicacion',"#frm_busqueda").attr('disabled',false);
					$("#lupa_motivo_alta").show();
				}
				$.ajax({
		            type:'POST',
		            url: FUNCIONES_BASEPATH+'maestro_abm.php',
		            data:{
		            	"p_d_patente": $("#d_patente").val(),
		            	"p_f_radicacion": $("#f_radicacion").val(),
		            	"p_modo": p_modo,
		            	"id_menu":10989,
		            	"n_orden":6
		            },
		            dataType:'json',
		            success: function( data ) {
						$('#main').procOverlay({visible:false});
		                if(data.resultado == 'OK'){
							$("#c_motivo_alta").val(res.c_motivo_alta);
							$("#d_motivo_alta").val(res.d_motivo_alta);

							if (res.m_sin_convocatoria == 'S'){
								$('#m_convocatoria').prop('checked',true);
							}else {
								$('#m_convocatoria').prop('checked',false);
							}

							$("#c_marca").val(res.c_marca_aut);
							$("#d_marca").val(res.d_marca_aut);
							$("#c_modelo").val(res.id_modelo);
							$("#d_modelo").val(res.d_modelo);
							$("#c_descripcion").val(res.id_descripcion);
							$("#d_descripcion").val(res.d_descripcion);
							$("#c_tipo").val(res.c_tipo);
							$("#d_tipo").val(res.d_tipo);
							$("#n_modelo").val(res.n_modelo_año);
							$("#n_peso").val(res.n_peso_cilindrada);
							$("#n_peso_max").val(res.n_peso_max);
							$("#n_hp").val(res.n_hp);
							$("#c_grupo").val(res.c_grupo);
							$("#d_grupo").val(res.d_grupo);
							$("#c_fmcamod").val(res.c_fmcamod);
							$("#d_fmcamod").val(res.d_fmcamod);
							$("#m_nacional").val(res.m_nacional_importado);
							$("#c_combustible").val(res.c_combustible);
							$("#d_combustible").val(res.d_combustible);
							$("#d_texto_marca").val(res.d_texto_marca);
							$("#d_texto_modelo").val(res.d_texto_modelo);
							$("#d_texto_descripcion").val(res.d_texto_descripcion);
							$("#d_marca_motor").val(res.d_marca_motor);
							$("#n_motor").val(res.nro_motor);
							$("#d_marca_chasis").val(res.d_marca_chasis);
							$("#n_chasis").val(res.nro_chasis);
							$("#c_rnpa").val(res.c_rnpa);
							$("#d_rnpa").val(res.d_rnpa);
							$("#f_radicacion").val(res.f_radicacion);
							$("#f_inscripcion").val(res.f_inscripcion);
							$("#f_baja").val(res.f_baja);
							$("#f_ult_transformacion").val(res.f_ult_transformacion);
							
		                	$("#d_estado").val(data.p_estado);
		                	switch(data.p_c_guarda_habitual){
		                		case 'GH': $("#m_si").click();
		                			break;
		                		case 'N': $("#m_no").click();
		                			break;
		                		case 'X': $("#m_f_hasta").click();
		                			break;
		                	}
		                	$("#f_hasta_gh").val(data.p_f_hasta_gh);
		                	$("#c_delegacion").val(data.p_c_delegacion);
		                	$("#d_delegacion").val(data.p_d_delegacion);

							$(".selectpicker").selectpicker('refresh');
							$("#div_info").show();

							if(data.p_n_contribuyentes > 0){
								$("#f_radicacion","#frm_busqueda").attr('disabled',true);
								$("#btn_contribuyente").attr('disabled',false);
							}else{
								$("#f_radicacion","#frm_busqueda").attr('disabled',false);
								$("#btn_contribuyente").attr('disabled',true);
							}

							fun_contrib_dominio();
		                }else{
		                    mostrar_error(data.resultado);
		                    return;
		                }
		            }
		        });
			}else{
				$('#main').procOverlay({visible:false});
				mostrar_error('Ocurrió un error al buscar los datos del automotor.');
			}
		}
	});
}

function fun_contrib_dominio(){
	$('#main').procOverlay({visible:true});
	$.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
        	"p_d_patente": $("#d_patente","#frm_busqueda").val(),
        	"p_f_radicacion": $("#f_radicacion","#frm_busqueda").val(),
        	"p_modo": p_modo,
        	"p_id_contribuyente": getDatoContrib("id_contribuyente"),
        	"id_menu":10989,
        	"n_orden":1
        },
        dataType:'json',
        success: function( data ) {
        	$('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
            	var v_nuevo_contriuyente; var v_nuevo_cont_sin_cuit;
				var v_exenciones; var v_responsables;
				var v_c_tipo_domicilio; var v_modal_readonly;
				var v_campos_readonly;

				(data.m_nuevo_contriuyente == 'S' ? v_nuevo_contriuyente=false : v_nuevo_contriuyente=true);
				(data.m_nuevo_cont_sin_cuit == 'S' ? v_nuevo_cont_sin_cuit=false : v_nuevo_cont_sin_cuit=true);
				(data.m_exenciones == 'S' ? v_exenciones=false : v_exenciones=true);
				(data.m_responsables == 'S' ? v_responsables=false : v_responsables=true);
				(data.m_c_tipo_domicilio == 'S' ? v_c_tipo_domicilio=false : v_c_tipo_domicilio=true);
				(data.m_modal_readonly == 'S' ? v_modal_readonly=false : v_modal_readonly=true);
				(data.m_campos_readonly == 'S' ? v_campos_readonly=false : v_campos_readonly=true);

				$("#btn_con_cuit").attr('disabled',v_nuevo_contriuyente);
				$("#btn_sin_cuit").attr('disabled',v_nuevo_cont_sin_cuit);
				$("#btn_exenciones").attr('disabled',v_exenciones);
				$("#btn_responsables").attr('disabled',v_responsables);
				$("#c_tipo_domicilio").attr('disabled',v_c_tipo_domicilio);
				(v_c_tipo_domicilio ? $("#lupa_tipo_domicilio").hide() : $("#lupa_tipo_domicilio").show());
				$("#n_cuit, #d_denominacion, #c_tipo_documento, #n_documento","#frm_datos_contrib").attr('disabled',v_campos_readonly);

				if(data.p_id_contribuyente){
					$("#div_grilla_contrib").show();
					$("#div_form_contrib").hide();

					setea_parametros('#contribuyentes_grid',{
						':p_d_patente': $("#d_patente").val(),
						':p_modo': p_modo});

					$("#lupa_delegacion").lupa_generica({
						id_lista: v_lista_delegaciones,
						titulos:['Código','Descripción'],
						grid:[{index:'c_dato',width:100},{index:'d_dato',width:300}],
						caption:'Delegaciones',
						sortname:'c_dato',
						sortorder:'asc',
						campos:{c_dato:'c_delegacion',d_dato:'d_delegacion'},
						filtros: [data.p_id_contribuyente],
						filtrosTitulos: ["Contribuyente"],
						filtrosNulos: [true],
						searchCode: true,
				        searchInput: '#c_delegacion',
				        exactField: 'c_dato',
				        keyNav: true,
				        limpiarCod: true
					});
				}else{
					$("#frm_datos_contrib :input").attr('disabled',v_modal_readonly);
					(v_modal_readonly ? $("#lupa_tipo_documento").hide() : $("#lupa_tipo_documento").show());

					$("#f_radicacion","#frm_busqueda").attr('disabled',false);
					$("#f_vig_desde","#frm_datos_contrib").val($("#f_radicacion").val());
					$("#c_motivo_alta","#frm_datos_contrib").val($("#c_motivo_alta","#frm_busqueda").val());
					$("#d_motivo_alta","#frm_datos_contrib").val($("#d_motivo_alta","#frm_busqueda").val());

					$("#div_form_contrib").show();
					$("#div_grilla_contrib").hide();

					$("#lupa_delegacion").lupa_generica({
						id_lista: v_lista_delegaciones,
						titulos:['Código','Descripción'],
						grid:[{index:'c_dato',width:100},{index:'d_dato',width:300}],
						caption:'Delegaciones',
						sortname:'c_dato',
						sortorder:'asc',
						campos:{c_dato:'c_delegacion',d_dato:'d_delegacion'},
						filtros: ["#id_contribuyente"],
						filtrosTitulos: ["Contribuyente"],
						filtrosNulos: [true],
						searchCode: true,
				        searchInput: '#c_delegacion',
				        exactField: 'c_dato',
				        keyNav: true,
				        limpiarCod: true
					});
				}
            }else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}

function btn_grabar_datos(){
	if($("#frm_busqueda").validationEngine('validate')){
		if (getDatoContrib("id_contribuyente")) {
			validar_datos();
		}else{
			mostrar_cuadro('Q', 'Atención',
	            'El automotor no tiene un Contribuyente asociado. Desea continuar?.',
	            function(){validar_datos();},
	            function(){}
	        );
		}
	}
}

function validar_datos(){
	if(v_existe){
		$.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
				"p_d_patente": $("#d_patente").val(),
				"p_c_marca_aut": $("#c_marca").val(),
				"p_id_modelo": $("#c_modelo").val(),
				"p_id_descripcion": $("#c_descripcion").val(),
				"p_n_peso_cilindrada": parse($("#n_peso").val()),
				"p_c_tipo": $("#c_tipo").val(),
				"p_n_modelo_año": $("#n_modelo").val(),
				"p_c_grupo": $("#c_grupo").val(),
				"p_f_radicacion": $("#f_radicacion").val(),
				"p_c_fmcamod": $("#c_fmcamod").val(),
				"p_n_hp": parse($("#n_hp").val()),
				"id_menu":10989,
				"n_orden":8
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                	if (data.p_msj){
                		mostrar_cuadro('Q', 'Atención',
				            data.p_msj,
				            function(){
				            	grabar_datos(getDatoContrib("id_contribuyente"), getDatoContrib("f_vig_desde"),
									getDatoContrib("c_motivo_alta"), getDatoContrib("c_tipo_domicilio"));
				            },
				            function(){}
				        );
                	}else{
                		grabar_datos(getDatoContrib("id_contribuyente"), getDatoContrib("f_vig_desde"),
							getDatoContrib("c_motivo_alta"), getDatoContrib("c_tipo_domicilio"));
                	}
                }else{
                    mostrar_error(data.resultado);
                    return;
                }
            }
        });
	}else{
		grabar_datos(getDatoContrib("id_contribuyente"), getDatoContrib("f_vig_desde"),
			getDatoContrib("c_motivo_alta"), getDatoContrib("c_tipo_domicilio"));
	}
}

function getDatoContrib(campo){
	if($("#id_contribuyente").val()){
		// devuelve el valor del campo del modal
		return $("#"+campo).val();
	}else{
		// devuelve datos del primer registro de la grilla
		return $("#contribuyentes_grid").getCell(1,campo) ? $("#contribuyentes_grid").getCell(1,campo) : '';
	}
}

function grabar_datos(p_id_contribuyente, p_f_vig_desde, p_c_mot_alta_contrib, p_c_tipo_domicilio){
	$.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
			"p_d_patente": $("#d_patente").val(),
			"p_d_patente_vieja": $("#d_patente_vieja").val(),
			"p_d_verif_dom": $("#d_verif_dom").val(),
			"p_d_verif_dom_ant": $("#d_verif_dom_ant").val(),
			"p_existe": (v_existe)?'S':'N',
			"p_f_radicacion": $("#f_radicacion").val(),
			"p_modo": p_modo,
			"p_c_marca_aut": $("#c_marca").val(),
			"p_c_tipo": $("#c_tipo").val(),
			"p_c_motivo_alta": $("#c_motivo_alta","#frm_busqueda").val(),
			"p_c_rnpa": $("#c_rnpa").val(),
			"p_id_modelo": $("#c_modelo").val(),
			"p_id_descripcion": $("#c_descripcion").val(),
			"p_c_fmcamod": $("#c_fmcamod").val(),
			"p_d_aff": $("#d_aff").val(),
			"p_c_grupo": $("#c_grupo").val(),
			"p_c_combustible": $("#c_combustible").val(),
			"p_n_peso_cilindrada": parse($("#n_peso").val()),
			"p_n_modelo_año": $("#n_modelo").val(),
			"p_m_nacional_importado": $("#m_nacional").val(),
			"p_d_marca_motor": $("#d_marca_motor").val(),
			"p_nro_motor": $("#n_motor").val(),
			"p_d_marca_chasis": $("#d_marca_chasis").val(),
			"p_nro_chasis": $("#n_chasis").val(),
			"p_d_texto_marca": $("#d_texto_marca").val(),
			"p_d_texto_modelo": $("#d_texto_modelo").val(),
			"p_d_texto_descripcion": $("#d_texto_descripcion").val(),
			"p_m_sin_convocatoria": $("#m_convocatoria").prop('checked')?'S':'',
			"p_c_guarda_habitual": $(".radios:checked").val(),
			"p_f_hasta_gh": $("#f_hasta_gh").val(),
			"p_c_delegacion": $("#c_delegacion").val(),
			"p_f_ult_transformacion": $("#f_ult_transformacion").val(),
			"p_f_inscripcion": $("#f_inscripcion").val(),
			"p_n_hp": parse($("#n_hp").val()),
			"p_id_contribuyente": p_id_contribuyente,
			"p_f_vig_desde": p_f_vig_desde,
			"p_c_mot_alta_contrib": p_c_mot_alta_contrib,
			"p_c_tipo_domicilio": p_c_tipo_domicilio,
			"id_menu":10989,
			"n_orden":7
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
				if(data.p_msj != ""){
					mostrar_mensaje('',data.p_msj);
				}
				$("#btn_limpiar").click();
            }else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}