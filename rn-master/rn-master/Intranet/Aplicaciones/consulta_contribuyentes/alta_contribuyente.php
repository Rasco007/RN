<?php
	$id_contribuyente = $_POST['id_contribuyente'];

	$db_query = new DB_Query(
		"SELECT c.c_categoria, (select tg.d_dato from tablas_generales tg where tg.c_dato = c.c_categoria and tg.n_tabla = 45) d_categoria,
			c.m_persona, c.f_vig_desde, c.f_vig_hasta, c.c_sistema, (select tg.d_dato from tablas_generales tg where tg.c_dato = c.c_sistema and tg.n_tabla = 95) d_sistema, c_usuarioact, f_actualizac
		from contribuyentes c where c.id_contribuyente = :id_contribuyente"
	);

	$par = array(':id_contribuyente' => $id_contribuyente);
	$datos_contrib= $db_query->do_query($par);
	$c_categoria=$datos_contrib[0]['C_CATEGORIA'];
	if($c_categoria == null){
		$c_categoria = '6';
	}
	$d_categoria=$datos_contrib[0]['D_CATEGORIA'];
	if($d_categoria == null){
		$d_categoria = 'NO INFORMADO';
	}
	$c_sistema=$datos_contrib[0]['C_SISTEMA'];
	$d_sistema=$datos_contrib[0]['D_SISTEMA'];
	$f_vig_desde=$datos_contrib[0]['F_VIG_DESDE'];
	$f_vig_hasta=$datos_contrib[0]['F_VIG_HASTA'];
	$m_persona=$datos_contrib[0]['M_PERSONA'];
	$c_usuarioact_cont=$datos_contrib[0]['C_USUARIOACT'];
	$f_actualizac_cont=$datos_contrib[0]['F_ACTUALIZAC'];

	$disabled='disabled';

	$db_query = new DB_Query(
		"SELECT 
			SIAT.FUN_OBTENER_DEUDA_VENC(:id_contribuyente) as i_deuda_venc,
			SIAT.FUN_OBTENER_CANT_CADUCOS(:id_contribuyente) as n_cant_caducos,
			SIAT.FUN_OBTENER_FACT_ANTERIOR(:id_contribuyente) as i_fact_anterior,
			(SELECT TRUNC(MAX(fecha_inicio)) FROM siat.tiempos
			WHERE proceso = 'STAGING EMERIX SEGMENTACION') as f_ult_proc_seg,
			SIAT.FUN_OBTENER_VAL_TOTAL(:id_contribuyente) as i_val_total,
			SIAT.OBTENER_DESCRIP_CAPACIDAD(:id_contribuyente) as capacidad,
			SIAT.FUN_OBTENER_DDJJ_NO_PRES(:id_contribuyente) as ddjj_no_pres,
			SIAT.OBTENER_DESCRIP_TAMANO(:id_contribuyente) as tamaño,
			SIAT.FUN_OBTENER_OBL_IMP_INMO(:id_contribuyente) as obl_imp_inmo,
			SUBSTR(SIAT.OBTENER_DESCRIP_RIESGO(:id_contribuyente),8) as riesgo,
			SIAT.FUN_OBTENER_OBL_IMP_AUTO(:id_contribuyente) as obl_imp_auto
		FROM dual");
	
	$par = array(':id_contribuyente' => $id_contribuyente);
	$datos_adicionales= $db_query->do_query($par);
	$i_deuda_venc=$datos_adicionales[0]['I_DEUDA_VENC'];
	$n_cant_caducos=$datos_adicionales[0]['N_CANT_CADUCOS'];
	$i_fact_anterior=$datos_adicionales[0]['I_FACT_ANTERIOR'];
	$f_ult_proc_seg=$datos_adicionales[0]['F_ULT_PROC_SEG'];
	$i_val_total=$datos_adicionales[0]['I_VAL_TOTAL'];
	$capacidad=$datos_adicionales[0]['CAPACIDAD'];
	$ddjj_no_pres=$datos_adicionales[0]['DDJJ_NO_PRES'];
	$tamaño=$datos_adicionales[0]['TAMAÑO'];
	$obl_imp_inmo=$datos_adicionales[0]['OBL_IMP_INMO'];
	$riesgo=$datos_adicionales[0]['RIESGO'];
	$obl_imp_auto=$datos_adicionales[0]['OBL_IMP_AUTO'];
	
	if($m_persona=='F'){
		$selected_fisica='selected="selected"';
		$selected_juridica='';
		
		$db_query = new DB_Query(
			"SELECT c_nacionalidad, (select tg.d_dato from tablas_generales tg where tg.c_dato = f.c_nacionalidad and tg.n_tabla = 5) d_nacionalidad,
				c_sexo, f_nacimiento, c_estado_civil, (select tg.d_dato from tablas_generales tg where tg.c_dato = f.c_estado_civil and tg.n_tabla = 31) d_estado_civil, f_excepcion_mail, c_excepcion_mail, f_actualizac, c_usuarioact
			from personas_fisicas f where id_contribuyente = :id_contribuyente"
		);

		$par = array(':id_contribuyente' => $id_contribuyente);
		$datos_per_fisica= $db_query->do_query($par);
		$c_nacionalidad=$datos_per_fisica[0]['C_NACIONALIDAD'];
		$d_nacionalidad=$datos_per_fisica[0]['D_NACIONALIDAD'];
		$c_sexo=$datos_per_fisica[0]['C_SEXO'];
		$f_nacimiento=$datos_per_fisica[0]['F_NACIMIENTO'];
		$c_estado_civil=$datos_per_fisica[0]['C_ESTADO_CIVIL'];
		$d_estado_civil=$datos_per_fisica[0]['D_ESTADO_CIVIL'];
		$f_excepcion_mail=$datos_per_fisica[0]['F_EXCEPCION_MAIL'];
		$c_excepcion_mail=$datos_per_fisica[0]['C_EXCEPCION_MAIL'];
		$f_actualizac=$datos_per_fisica[0]['F_ACTUALIZAC'];
		$c_usuarioact=$datos_per_fisica[0]['C_USUARIOACT'];

		if($c_sexo=='M'){
			$selected_femenino='';
			$selected_masculino='selected="selected"';
		}
	
		if($c_sexo=='F'){
			$selected_femenino='selected="selected"';
			$selected_masculino='';
		}
	}
	
	if($m_persona=='J'){
		$selected_fisica='';
		$selected_juridica='selected="selected"';

		$db_query = new DB_Query(
			"SELECT c_tipo_empresa, (select tg.d_dato from tablas_generales tg where tg.c_dato = f.c_tipo_empresa and tg.n_tabla = 17) d_tipo_empresa,
				c_forma_juridica, (select tg.d_dato from tablas_generales tg where tg.c_dato = f.c_forma_juridica and tg.n_tabla = 2) d_forma_juridica,
				n_sucursales, n_duracion_anios, n_inscripcion_igj, f_inscripcion_igj, f_contrato_social,
				f_actualizac, c_usuarioact
			from personas_juridicas f where id_contribuyente = :id_contribuyente"
		);

		$par = array(':id_contribuyente' => $id_contribuyente);
		$datos_per_juridica= $db_query->do_query($par);
		$c_tipo_empresa=$datos_per_juridica[0]['C_TIPO_EMPRESA'];
		$d_tipo_empresa=$datos_per_juridica[0]['D_TIPO_EMPRESA'];	
		$c_forma_juridica=$datos_per_juridica[0]['C_FORMA_JURIDICA'];	
		$d_forma_juridica=$datos_per_juridica[0]['D_FORMA_JURIDICA'];
		$n_sucursales=$datos_per_juridica[0]['N_SUCURSALES'];
		$n_duracion_anios=$datos_per_juridica[0]['N_DURACION_ANIOS'];
		$n_inscripcion_igj=$datos_per_juridica[0]['N_INSCRIPCION_IGJ'];
		$f_inscripcion_igj=$datos_per_juridica[0]['F_INSCRIPCION_IGJ'];
		$f_contrato_social=$datos_per_juridica[0]['F_CONTRATO_SOCIAL'];
		$f_actualizac=$datos_per_juridica[0]['F_ACTUALIZAC'];
		$c_usuarioact=$datos_per_juridica[0]['C_USUARIOACT'];
	}

	//se llama a funcion para completar datos extras de telefonos
    $db_query_tel = new DB_Query(
        "SELECT PAC_CONTRIBUYENTES.FUN_TEL_DATOS_EXTRAS(:id_contribuyente) datos_tel
            from dual");

    $param_tel = array(':id_contribuyente' => $id_contribuyente);
    $row_query_tel = $db_query_tel->do_query($param_tel);
    $datos_tel = $row_query_tel[0]['DATOS_TEL'];

	$header = 
		"<div id='general'>".
			"<div id='tabs' style=''>".  
				"<ul class='nav nav-wizard'>".
					"<li data-grid='grid_datos_contribuyente' class='active'><a href='#datos_contribuyente' id='0' data-toggle='tab'>Contribuyente</a></li>".
					"<li data-grid='grid_datos_domicilio'><a href='#datos_domicilio' id='1' data-toggle='tab'>Domicilio</a></li>".
					"<li data-grid='grid_datos_telefono'><a href='#datos_telefonos' id='2' data-toggle='tab'>Teléfonos</a></li>".
					"<li data-grid='grid_datos_complementarios'><a href='#datos_complementarios' id='3' data-toggle='tab'>Datos Comp.</a></li>".
					"<li data-grid='grid_datos_per_fisica' id='li_p_fisica'><a href='#datos_per_fisica' id='4' data-toggle='tab'>Pers. Físicas</a></li>".
					"<li data-grid='grid_datos_per_juridica' id='li_p_juridica'><a href='#datos_per_juridica' id='5' data-toggle='tab'>Pers. Jurídicas</a></li>".
					"<li data-grid='grid_datos_tributos'><a href='#datos_tributos' id='6' data-toggle='tab'>Tributos</a></li>".
					"<li data-grid='grid_datos_integrante'><a href='#datos_integrante' id='7' data-toggle='tab'>Integra</a></li>".
					"<li data-grid='grid_datos_coprop'><a href='#datos_coprop' id='8' data-toggle='tab'>Co-Propietario</a></li>".
					"<li data-grid='grid_datos_asoc_exc'><a href='#datos_asoc_exc' id='9' data-toggle='tab'>Asoc. Exención</a></li>".
				"</ul>".
				"<div class='tab-content' id='tabs'>";

	$div_tab_contribuyentes .=   
		"<div role='tabpanel' class='tab-pane fade in active form-group' id='datos_contribuyente'>".
			"<form id='frm_datos_contrib'>".
				"<div id='frm_datos_contrib_div'>".
					"<div class='row'>".
						"<div id='c_categoria_div' class='form-group col-md-4'>".
							"<label for='c_categoria'>Categoría</label>".
							"<div id='div_categoria' class='input-group'>".
								"<input name='c_categoria' id='c_categoria' type='text' class='form-control input-sm input-cod-short validate[required]' value='$c_categoria'>".
								"<input name='d_c_categoria' id='d_c_categoria' type='text' class='form-control input-sm input-desc-long validate[required]' value='$d_categoria' readonly>".
								"<span class='input-group-addon btn_lupa' id='lupa_c_categoria'>".
									"<span class='glyphicon glyphicon-search' aria-hidden='true'></span>".
								"</span>".
							"</div>".
						"</div>".
						"<div id='c_sistema_div' class='form-group col-md-4'>".
							"<label for='c_sistema'>Sistema</label>".
							"<div id='div_sistema' class='input-group'>".
								"<input name='c_sistema' id='c_sistema' type='text' class='form-control input-sm input-cod-short validate[required]' value='$c_sistema'>".
								"<input name='d_c_sistema' id='d_c_sistema' type='text' class='form-control input-sm input-desc-long validate[required]' value='$d_sistema' readonly>".
								"<span class='input-group-addon btn_lupa' id='lupa_c_sistema'>".
									"<span class='glyphicon glyphicon-search' aria-hidden='true'></span>".
								"</span>".
							"</div>".
						"</div>".
						"<div id='m_persona_div' class='form-group col-md-4'>".
							"<label for='m_persona'>Tipo de Persona</label>".
							"<div id='div_m_persona'>".
								"<select name='m_persona' id='m_persona' data-live-search='true' title='Seleccione' class='selectpicker form-control input-sm validate[required]' data-style='cDropdown'>". 
									"<option $selected_fisica value='F'>Física</option>".
									"<option $selected_juridica value='J'>Jurídica</option>".
								"</select>".
							"</div>".
						"</div>".
					"</div>".

					"<div class='row'>".
						"<div class='form-group col-md-4'>".
							"<label for='f_vig_desde'>F. Vig. Desde</label>".
							"<div class='input-group'>".
								"<input type='text' class='form-control input-sm text-center datepicker validate[required]' name='f_vig_desde' id='f_vig_desde' value='$f_vig_desde' maxlength='10' style='position: static;'>".
								"<span class='input-group-addon'>".
									"<span class='glyphicon glyphicon-calendar'></span>".
								"</span>".
							"</div>".
						"</div>".
						"<div class='form-group col-md-4'>".
							"<label for='f_vig_hasta'>F. Vig. Hasta</label>".
							"<div class='input-group'>".
								"<input type='text' class='form-control input-sm text-center datepicker validate[required]' name='f_vig_hasta' id='f_vig_hasta' value='$f_vig_hasta' maxlength='10' style='position: static;'>".
								"<span class='input-group-addon'>".
									"<span class='glyphicon glyphicon-calendar'></span>".
								"</span>".
							"</div>".
						"</div>".
						"<div class='form-group col-md-1'>".
							"<label></label>".
							"<div class='input-group'>".
								"<button type='button' id='btn_reporte' class='btn btn-primary'> Reporte</button>".
							"</div>".
						"</div>".
						"<div class='form-group col-md-2'>".
							"<label></label>".
							"<div class='input-group'>".
								"<button type='button' id='btn_cont_hist' class='btn btn-primary'> Consulta de Histórico</button>".
							"</div>".
						"</div>".
					"</div>".

					"<hr style='margin-top:10px;margin-bottom: 10px;'>".

					"<div class='row'>".
						"<div class='form-group col-md-4'>".
							"<label for='i_deuda_venc'>Deuda Venc. Total</label>".
							"<input type='text' class='form-control input-sm text-right' name='i_deuda_venc' id='i_deuda_venc' value='$i_deuda_venc'>".
						"</div>".
                        "<div class='form-group col-md-4'>".
                            "<label for='i_fact_anterior'>Facturación Año Anterior</label>".
                            "<input type='text' class='form-control input-sm text-right' name='i_fact_anterior' id='i_fact_anterior' value='$i_fact_anterior'>".
                        "</div>".
					"</div>".

                    "<div class='row'>".
                        "<div class='form-group col-md-4'>".
                            "<label for='capacidad'>Capacidad</label>".
                            "<input type='text' class='form-control input-sm text-right' name='capacidad' id='capacidad' value='$capacidad'>".
                        "</div>".
                        "<div class='form-group col-md-4'>".
                            "<label for='tamaño'>Tamaño</label>".
                            "<input type='text' class='form-control input-sm text-right' name='tamaño' id='tamaño' value='$tamaño'>".
                        "</div>".
                        "<div class='form-group col-md-4'>".
                            "<label for='riesgo'>Riesgo</label>".
                            "<input type='text' class='form-control input-sm text-right' name='riesgo' id='riesgo' value='$riesgo'>".
                        "</div>".
                    "</div>".

					"<div class='row'>".
                        "<div class='form-group col-md-4'>".
                            "<label for='n_cant_caducos'>Cant. Planes Caducos en los últimos 2 años</label>".
                            "<input type='text' class='form-control input-sm text-right' name='n_cant_caducos' id='n_cant_caducos' value='$n_cant_caducos'>".
                        "</div>".
						"<div class='form-group col-md-4'>".
							"<label for='f_ult_proc_seg'>F. Ultimo Proc. Segmentación</label>".
							"<input type='text' class='form-control input-sm text-right' name='f_ult_proc_seg' id='f_ult_proc_seg' value='$f_ult_proc_seg'>".
						"</div>".
                        "<div class='form-group col-md-4'>".
                            "<label for='i_val_total'>Valuación Total Inm/Aut</label>".
                            "<input type='text' class='form-control input-sm text-right' name='i_val_total' id='i_val_total' value='$i_val_total'>".
                        "</div>".
					"</div>".

					"<div class='row'>".
                        "<div class='form-group col-md-4'>".
                            "<label for='ddjj_no_pres'>DDJJ IIBB/CM No Pres.</label>".
                            "<input type='text' class='form-control input-sm text-right' name='ddjj_no_pres' id='ddjj_no_pres' value='$ddjj_no_pres'>".
                        "</div>".
                        "<div class='form-group col-md-4'>".
                            "<label for='obl_imp_inmo'>Oblig. Impagas Inmob.</label>".
                            "<input type='text' class='form-control input-sm text-right' name='obl_imp_inmo' id='obl_imp_inmo' value='$obl_imp_inmo'>".
                        "</div>".
                        "<div class='form-group col-md-4'>".
                            "<label for='obl_imp_auto'>Oblig. Impagas Auto.</label>".
                            "<input type='text' class='form-control input-sm text-right' name='obl_imp_auto' id='obl_imp_auto' value='$obl_imp_auto'>".
                        "</div>".
					"</div>".

					"<div class='row'>".
						"<div class='form-group col-md-4'>".
							"<label for='c_usuarioact'>Usuario de Última Modificación</label>".
							"<input type='text' class='form-control input-sm text-right' name='c_usuarioact' id='c_usuarioact' value='$c_usuarioact_cont'>".
						"</div>".
						"<div class='form-group col-md-4'>".
							"<label for='f_actualizac'>F. de Última Modificación</label>".
							"<input type='text' class='form-control input-sm text-right' name='f_actualizac' id='f_actualizac' value='$f_actualizac_cont'>".
						"</div>".
						"<div class='form-group col-md-2 col-md-offset-2'>".
							"<label for='id_contrib'>ID Contribuyente</label>".
							"<input type='text' class='form-control input-sm text-right' name='id_contrib' id='id_contrib' value='$id_contribuyente'>".
						"</div>".
					"</div>".
				"</div>".
			"</form>".   
		"</div>";

	$div_tab_domicilios .=   
		"<div role='tabpanel' class='tab-pane fade in form-group' id='datos_domicilio'>".
			"<div id='div_grid_domicilio' style='width:100%;'>".
				"<table id='grid_datos_domicilio' class='scroll' cellpadding='0' cellspacing='0'></table>".
				"<div id='grid_datos_domicilio_pager' class='scroll' style='text-align: center;'></div>".
			"</div>".
		"</div>";


	$div_tab_telefonos .=   
		"<div role='tabpanel' class='tab-pane fade in form-group' id='datos_telefonos'>".
			"<div id='div_grid_telefono' style='width:100%;'>".
				"<table id='grid_datos_telefono' class='scroll' cellpadding='0' cellspacing='0'></table>".
				"<div id='grid_datos_telefono_pager' class='scroll' style='text-align: center;'></div>".
                "<p style='color:blue;font-weight: 700;font-size: 90%;'>$datos_tel</p>".
			"</div>".
		"</div>";

	$div_tab_datos_complementarios .=
		"<div role='tabpanel' class='tab-pane fade in form-group' id='datos_complementarios'>".
			"<div id='div_grid_complementarios' style='width:100%;'>".
				"<table id='grid_datos_complementarios' class='scroll' cellpadding='0' cellspacing='0'></table>".
				"<div id='grid_datos_complementarios_pager' class='scroll' style='text-align: center;'></div>".
			"</div>".
		"</div>";

	$div_tab_per_fisica .=   	
		"<div role='tabpanel' class='tab-pane fade in form-group' id='datos_per_fisica'>".
			"<form id='frm_per_fisica'>".
				"<div class='row'>".
					"<div class='form-group col-md-4'>".
						"<label for='d_tipo_nacionalidad'>Nacionalidad</label>".
						"<div class='input-group' id='div_input_nacionalidad'>".
							"<input name='c_nacionalidad' id='c_nacionalidad' type='text' class='form-control mayusculas input-sm input-cod-short validate[required]' value='$c_nacionalidad'>".
							"<input name='d_tipo_nacionalidad' id='d_tipo_nacionalidad' type='text' class='form-control input-sm input-desc-long validate[required]' value='$d_nacionalidad' readonly>".
							"<span class='input-group-addon btn_lupa' id='lupa_tipo_nacionalidad'>".
								"<span class='glyphicon glyphicon-search' aria-hidden='true'></span>".
							"</span>".
						"</div>".
					"</div>".
					"<div class='form-group col-md-4'>".
						"<label for='d_tipo_estado_civil'>Estado Civil</label>".
						"<div class='input-group' id='div_input_estado_civil'>".
							"<input name='c_estado_civil' id='c_estado_civil' type='text' class='form-control mayusculas input-sm input-cod-short validate[required]' value='$c_estado_civil'>".
							"<input name='d_tipo_estado_civil' id='d_tipo_estado_civil' type='text' class='form-control input-sm input-desc-long validate[required]' value='$d_estado_civil' readonly>".
							"<span class='input-group-addon btn_lupa' id='lupa_tipo_estado_civil'>".
								"<span class='glyphicon glyphicon-search' aria-hidden='true'></span>".
							"</span>".
						"</div>".
					"</div>".
					"<div id='tipo_sexo_div' class='form-group col-md-4'>".
						"<label for='c_sexo'>Sexo</label>".
						"<select name='c_sexo'id='c_sexo' data-live-search='true' title='Seleccione' class='selectpicker form-control input-sm validate[required]' data-style='cDropdown'>".
							"<option $selected_masculino value='M'>Masculino</option>".
							"<option $selected_femenino value='F'>Femenino</option>".
						"</select>".
					"</div>".
				"</div>".

				"<div class='row'>".
					"<div class='form-group col-md-4'>".
						"<label for='f_nacimiento'>F. de Nacimiento</label>".
						"<div class='input-group'>".
							"<input name='f_nacimiento' id='f_nacimiento' type='text' class='form-control input-sm text-center datepicker' value='$f_nacimiento' maxlength='10' autocomplete='off' style='position: static;'>".
							"<span class='input-group-addon'>".
								"<span class='glyphicon glyphicon-calendar'></span>".
							"</span>".
						"</div>".
					"</div>".
					"<div class='form-group col-md-4'>".
						"<label for='f_excepcion_mail'>F. Excepción Mail</label>".
						"<div class='input-group'>".
							"<input name='f_excepcion_mail' id='f_excepcion_mail' type='text' class='form-control input-sm text-center datepicker' value='$f_excepcion_mail' maxlength='10' autocomplete='off' style='position: static;'>".
							"<span class='input-group-addon'>".
								"<span class='glyphicon glyphicon-calendar'></span>".
							"</span>".
						"</div>".
					"</div>".
					"<div id='tipo_sexo_div' class='form-group col-md-4'>".
						"<label for='c_excepcion_mail'>Excepción Mail</label>".
						"<input name='c_excepcion_mail' id='c_excepcion_mail' type='text' class='form-control mayusculas input-sm' value='$c_excepcion_mail'>".
					"</div>".
				"</div>".

				"<div class='row'>".
					"<div class='form-group col-md-4'>".
						"<label for='f_actualizac'>F. de Útima Modificación</label>".
						"<div class='input-group'>".
							"<input name='f_actualizac' id='f_actualizac' type='text' class='form-control input-sm text-center datepicker' value='$f_actualizac' maxlength='10' autocomplete='off' style='position: static;'>".
							"<span class='input-group-addon'>".
								"<span class='glyphicon glyphicon-calendar'></span>".
							"</span>".
						"</div>".
					"</div>".
					"<div id='tipo_sexo_div' class='form-group col-md-4'>".
						"<label for='c_usuarioact'>Usuario de Última Modificación</label>".
						"<input name='c_usuarioact' id='c_usuarioact' type='text' class='form-control mayusculas input-sm' value='$c_usuarioact'>".
					"</div>".
					"<div class='form-group col-md-2'>".
						"<label></label>".
						"<div class='input-group'>".
							"<button type='button' id='btn_pers_fisica_hist' class='btn btn-primary'> Consulta de Histórico</button>".
						"</div>".
					"</div>".
				"</div>".
			"</form>".
		"</div>"; 			

	$div_tab_per_juridica .=   
		"<div role='tabpanel' class='tab-pane fade in form-group' id='datos_per_juridica'>".
			"<form id='frm_datos_per_juridica'>".
				"<div class='row'>".
					"<div class='form-group col-md-4'>".
						"<label for='d_tipo_empresa'>Tipo de Empresa</label>".
						"<div class='input-group' id='tipo_empresa_div'>".
							"<input name='c_tipo_empresa' id='c_tipo_empresa' type='text' class='form-control input-sm input-cod-short validate[required]' value='$c_tipo_empresa'>".
							"<input name='d_tipo_empresa' id='d_tipo_empresa' type='text' class='form-control input-sm input-desc-long validate[required]' value='$d_tipo_empresa' readonly>".
							"<span class='input-group-addon btn_lupa' id='lupa_tipo_empresa'>".
								"<span class='glyphicon glyphicon-search' aria-hidden='true'></span>".
							"</span>".
						"</div>".
					"</div>".
					"<div class='form-group col-md-4'>".
						"<label for='d_tipo_forma_juridica'>Forma Jurídica</label>".
						"<div class='input-group' id='tipo_forma_juridica_div'>".
							"<input name='c_forma_juridica' id='c_forma_juridica' type='text' class='form-control input-sm input-cod-short validate[required]' value='$c_forma_juridica'>".
							"<input name='d_tipo_forma_juridica' id='d_tipo_forma_juridica' type='text' class='form-control input-sm input-desc-long validate[required]' value='$d_forma_juridica' readonly>".
							"<span class='input-group-addon btn_lupa' id='lupa_tipo_forma_juridica'>".
								"<span class='glyphicon glyphicon-search' aria-hidden='true'></span>".
							"</span>".
						"</div>".
					"</div>".
					"<div id='n_sucursales_div' class='form-group col-md-2'>".
						"<label for='n_sucursales'>Cant. de Sucursales</label>".
						"<input name='n_sucursales' id='n_sucursales' type='text' class='form-control input-sm text-right validate[required,custom[onlyIntNumber]]' value='$n_sucursales'>".
					"</div>".
				"</div>".

				"<div class='row'>".
					"<div id='n_duracion_anios_div' class='form-group col-md-2'>".
						"<label for='n_duracion_anios'>Duración en años</label>".
						"<input name='n_duracion_anios' id='n_duracion_anios' type='text' class='form-control input-sm text-right validate[custom[onlyIntNumber]]' value='$n_duracion_anios'>".
					"</div>".
					"<div id='n_inscripcion_igj_div' class='form-group col-md-2'>".
						"<label for='n_inscripcion_igj'>Nro. inscripción IGJ</label>".
						"<input name='n_inscripcion_igj' id='n_inscripcion_igj' type='text' class='form-control input-sm text-right validate[custom[onlyIntNumber]]' value='$n_inscripcion_igj'>".
					"</div>".
					"<div class='form-group col-md-2'>".
						"<label for='f_inscripcion_igj'>F. de Inscrip. IGJ</label>".
						"<div class='input-group'>".
							"<input name='f_inscripcion_igj' id='f_inscripcion_igj' type='text' class='form-control input-sm text-center datepicker' value='$f_inscripcion_igj' maxlength='10' autocomplete='off' style='position: static;'>".
							"<span class='input-group-addon'>".
								"<span class='glyphicon glyphicon-calendar'></span>".
							"</span>".
						"</div>".
					"</div>".
					"<div class='form-group col-md-2'>".
						"<label for='f_contrato_social'>F. de Contrato Social</label>".
						"<div class='input-group'>".
							"<input name='f_contrato_social' id='f_contrato_social' type='text' class='form-control input-sm text-center datepicker' value='$f_contrato_social' maxlength='10' autocomplete='off' style='position: static;'>".
							"<span class='input-group-addon'>".
								"<span class='glyphicon glyphicon-calendar'></span>".
							"</span>".
						"</div>".
					"</div>".
					"<div class='form-group col-md-2'>".
						"<label></label>".
						"<div class='input-group'>".
							"<button type='button' id='btn_pers_juridica_hist' class='btn btn-primary'> Consulta de Histórico</button>".
						"</div>".
					"</div>".
				"</div>".

				"<div class='row'>".
					"<div class='form-group col-md-4'>".
						"<label for='f_actualizac'>F. de Útima Modificación</label>".
						"<div class='input-group'>".
							"<input name='f_actualizac' id='f_actualizac' type='text' class='form-control input-sm text-center datepicker' value='$f_actualizac' maxlength='10' autocomplete='off' style='position: static;'>".
							"<span class='input-group-addon'>".
								"<span class='glyphicon glyphicon-calendar'></span>".
							"</span>".
						"</div>".
					"</div>".
					"<div id='tipo_sexo_div' class='form-group col-md-4'>".
						"<label for='c_usuarioact'>Usuario de Última Modificación</label>".
						"<input name='c_usuarioact' id='c_usuarioact' type='text' class='form-control mayusculas input-sm' value='$c_usuarioact'>".
					"</div>".
				"</div>".
			"</form>".
			"<br/>".
			"<div id='datos_responsables'>".
				"<div id='div_grid_responsables' style='width:100%;'>".
					"<table id='grid_datos_responsables' class='scroll' cellpadding='0' cellspacing='0'></table>".
					"<div id='grid_datos_responsables_pager' class='scroll' style='text-align: center;'></div>".
				"</div>".
			"</div>".
		"</div>"; 				

	$div_tab_tributos .=
		"<div role='tabpanel' class='tab-pane fade in form-group' id='datos_tributos'>".
			"<div id='div_grid_tributos' style='width:100%;'>".
				"<table id='grid_datos_tributos' class='scroll' cellpadding='0' cellspacing='0'></table>".
				"<div id='grid_datos_tributos_pager' class='scroll' style='text-align: center;'></div>".
			"</div>".
			"<br/>".
			"<center>".
				"<button class='btn-sm btn-primary' onclick='btn_generar_boleta()' type='button' id='btn_gen_boleta' style='display:none;margin-right: 10px;'>".
					"<span class='glyphicon glyphicon-print' aria-hidden='true'></span> Generar Boleta".
				"</button>".
			"</center>".
			"<br/>".
			"<div id='div_grid_conceptos' style='width:100%;'>".
				"<table id='grid_datos_conceptos' class='scroll' cellpadding='0' cellspacing='0'></table>".
				"<div id='grid_datos_conceptos_pager' class='scroll' style='text-align: center;'></div>".
			"</div>".
			"<br/>".
			"<center>".
				"<button type='button' id='btn_actividades' class='btn btn-primary' onclick='btn_actividades()' style='margin-left:20px;margin-right:20px;' disabled>Actividades</button>".	
				"<button type='button' id='btn_regimen' class='btn btn-primary' onclick='btn_regimen()' style='margin-left:20px;margin-right:20px;' disabled>Régimen</button>".
				"<button type='button' id='btn_responsables' class='btn btn-primary' onclick='btn_responsables()' style='margin-left:20px;margin-right:20px;' disabled>Responsables</button>".
				"<button type='button' id='btn_info_agentes' class='btn btn-primary' onclick='btn_info_agentes()' style='margin-left:20px;margin-right:20px;' disabled>Agentes</button>".
				"<button type='button' id='btn_planes' class='btn btn-primary' onclick='btn_planes()' style='margin-left:20px;margin-right:20px;' disabled>Plan de Pago</button>".
			"</center>".
		"</div>";
	
	$div_tab_datos_integrante .=
		"<div role='tabpanel' class='tab-pane fade in form-group' id='datos_integrante'>".
			"<div id='div_grid_datos_integrante' style='width:100%;'>".
				"<table id='grid_datos_integrante' class='scroll' cellpadding='0' cellspacing='0'></table>".
				"<div id='grid_datos_integrante_pager' class='scroll' style='text-align: center;'></div>".
			"</div>".
		"</div>";

	$div_tab_datos_coprop .=
		"<div role='tabpanel' class='tab-pane fade in form-group' id='datos_coprop'>".
			"<div id='div_grid_datos_coprop' style='width:100%;'>".
				"<table id='grid_datos_coprop' class='scroll' cellpadding='0' cellspacing='0'></table>".
				"<div id='grid_datos_coprop_pager' class='scroll' style='text-align: center;'></div>".
			"</div>".
		"</div>";

	$modal_obj_contrib .=
		"<div class='modal fade' id='modal_objetos_contrib' tabindex='-1' role='dialog' aria-labelledby='objetos_contribLabel' aria-hidden='true'>".
		    "<div class='modal-dialog modal-lg' role='document'>".
		        "<div class='modal-content'>".
		            "<div class='modal-header'>".
		                "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>".
		                    "<span aria-hidden='true'>&times;</span>".
		                "</button>".
		                "<h5 class='modal-title' id='objetos_contribLabel'>Objetos</h5>".
		            "</div>".
		            "<div class='modal-body'>".
		                "<table id='grid_datos_objetos_contrib' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>".
		                "<div id='grid_datos_objetos_contrib_pager' class='scroll' style='text-align:center;'></div>".
		            "</div>".
		            "<div class='modal-footer'>".
		                "<div class='text-center'>".
		                    "<button type='button' class='btn btn-secondary' id='btn_volver_objetos_contrib' data-dismiss='modal'>Volver</button>".
		                "</div>".
		            "</div>".
		        "</div>".
		    "</div>".
		"</div>";

	$div_tab_datos_asoc_exc .=
		"<div role='tabpanel' class='tab-pane fade in form-group' id='datos_asoc_exc'>".
			"<div id='div_grid_datos_asoc_exc' style='width:100%;'>".
				"<table id='grid_datos_asoc_exc' class='scroll' cellpadding='0' cellspacing='0'></table>".
				"<div id='grid_datos_asoc_exc_pager' class='scroll' style='text-align: center;'></div>".
			"</div>".
		"</div>";

	include("modals_tributos.php");

	include("modals_historicos.php");

	$result = $header.$div_tab_contribuyentes.$div_tab_domicilios.$div_tab_telefonos.$div_tab_datos_complementarios.$div_tab_per_fisica.$div_tab_per_juridica.$div_tab_tributos.$div_tab_datos_integrante.$div_tab_datos_coprop.$div_tab_datos_asoc_exc;

	$result .= $modal_actividades_cm.$modal_actividades_ibd.$modal_regimen.$modal_responsables.$modal_info_agente.$modal_obj_contrib;
	
	$result .= $modal_cont_hist.$modal_dom_hist.$modal_tel_hist.$modal_pf_hist.$modal_pj_hist.$modal_reg_historico.$modal_trib_hist.$modal_act_hist.$modal_unidades_hist.$modal_est_hist;

	echo json_encode($result);
?>