<?php
	$id_contribuyente = $_POST['id_contribuyente'];
	$temporal = $_POST['tmp'];
	$nuevo_contrib = $_POST['nuevo_contrib'];
	$p_tipo_persona = $_POST['p_tipo_persona'];
	$p_sexo = $_POST['p_sexo'];

	switch ($p_tipo_persona){
		case 'F':
			$selected_fisica='selected="selected"';
			$selected_juridica='';
		break;
		case 'J':
			$selected_fisica='';
			$selected_juridica='selected="selected"';
		break;
	}

	switch ($p_sexo){
		case 'M':
			$selected_femenino='';
			$selected_masculino='selected="selected"';
		break;
		case 'F':
			$selected_femenino='selected="selected"';
			$selected_masculino='';
		break;
	}

	if ($nuevo_contrib!='S'){
		if ($temporal != 'S'){
			$tmp = '';
			$tmp_query = '';
		}else{
			$tmp = '_tmp';
			$tmp_query = 'tmp_';
		}
		
		$db_query = new DB_Query(
			"select  con.c_categoria, (select tg.d_dato from tablas_generales tg where tg.c_dato = con.c_categoria and tg.n_tabla = 45) d_categoria,
				con.m_persona, con.f_vig_desde, con.c_sistema, (select tg.d_dato from tablas_generales tg where tg.c_dato = con.c_sistema and tg.n_tabla = 95) d_sistema
			from ".$tmp_query."contribuyentes con where con.id_contribuyente".$tmp." = :id_contribuyente"
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
		$m_persona=$datos_contrib[0]['M_PERSONA'];
		
		$disabled='disabled';
		
		if($m_persona=='F'){
			$selected_fisica='selected="selected"';
			$selected_juridica='';
			
			$db_query = new DB_Query(
				"select c_nacionalidad, (select tg.d_dato from tablas_generales tg where tg.c_dato = f.c_nacionalidad and tg.n_tabla = 5) d_nacionalidad,
					c_sexo, f_nacimiento, c_estado_civil, (select tg.d_dato from tablas_generales tg where tg.c_dato = f.c_estado_civil and tg.n_tabla = 31) d_estado_civil
				from ".$tmp_query."personas_fisicas f where id_contribuyente".$tmp." = :id_contribuyente"
			);

			$par = array(':id_contribuyente' => $id_contribuyente);
			$datos_per_fisica= $db_query->do_query($par);
			$c_nacionalidad=$datos_per_fisica[0]['C_NACIONALIDAD'];
			$d_nacionalidad=$datos_per_fisica[0]['D_NACIONALIDAD'];
			$c_sexo=$datos_per_fisica[0]['C_SEXO'];
			$f_nacimiento=$datos_per_fisica[0]['F_NACIMIENTO'];
			$c_estado_civil=$datos_per_fisica[0]['C_ESTADO_CIVIL'];
			$d_estado_civil=$datos_per_fisica[0]['D_ESTADO_CIVIL'];	

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
				"select c_tipo_empresa, (select tg.d_dato from tablas_generales tg where tg.c_dato = f.c_tipo_empresa and tg.n_tabla = 17) d_tipo_empresa,
					c_forma_juridica, (select tg.d_dato from tablas_generales tg where tg.c_dato = f.c_forma_juridica and tg.n_tabla = 2) d_forma_juridica,
					n_sucursales, n_duracion_anios, n_inscripcion_igj, f_inscripcion_igj, f_contrato_social
				from ".$tmp_query."personas_juridicas f where id_contribuyente".$tmp." = :id_contribuyente"
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
		}
	} else {
		$disabled = '';
		$tmp = '_tmp';
		$tmp_query = 'tmp_';
	}

	$header = 
		"<div id='general'>".
			"<div id='tabs' style=''>".  
				"<ul class='nav nav-wizard'>".
					"<li data-grid='grid_datos_contribuyente' class='disabledTab active' id='li_contribuyente'><a href='#datos_contribuyente' id='0' data-toggle='tab'>Contribuyente</a></li>".
					"<li data-grid='grid_datos_domicilio' class='disabledTab' id='li_domicilios'><a href='#datos_domicilio' id='1' data-toggle='tab'>Domicilio</a></li>".
					"<li data-grid='grid_datos_telefono' class='disabledTab' id='li_telefonos'><a href='#datos_telefonos' id='2' data-toggle='tab'>Teléfonos</a></li>".
					"<li data-grid='grid_datos_complementarios' class='disabledTab' id='li_complementarios'><a href='#datos_complementarios' id='3' data-toggle='tab'>Datos Comp.</a></li>".
					"<li data-grid='grid_datos_per_fisica' class='disabledTab' id='li_p_fisica'><a href='#datos_per_fisica' id='4' data-toggle='tab'>Pers. Físicas</a></li>".
					"<li data-grid='grid_datos_per_juridica' class='disabledTab' id='li_p_juridica'><a href='#datos_per_juridica' id='5' data-toggle='tab'>Pers. Jurídicas</a></li>".
					"<li data-grid='grid_datos_tributos' class='disabledTab' id='li_tributos'><a href='#datos_tributos' id='6' data-toggle='tab'>Tributos</a></li>".
				"</ul>".
				"<div class='tab-content' id='tabs'>";

	$div_tab_contribuyentes .=   
		"<div role='tabpanel' class='tab-pane fade in active form-group' id='datos_contribuyente'>".
			"<form id='frm_datos_contrib'>".
				"<div id='frm_datos_contrib_div'>".
					"<table cellspacing='22.5px' style='border-collapse: separate;border-spacing: 1em;' >".
						"<div class='row'>".
							"<div id='c_categoria_div' class='form-group col-md-4 col-md-offset-2'>".
								"<label for='cod_categoria'>Categoría</label>".
								"<div id='div_categoria' class='input-group'>".
									"<input name='cod_categoria' id='cod_categoria' type='text' class='form-control input-sm input-cod-short validate[required]' value='$c_categoria'>".
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
						"</div>".

						"<div class='row'>".
							"<div id='m_persona_div' class='form-group col-md-4 col-md-offset-2'>".
								"<label for='m_persona'>Tipo de Persona</label>".
								"<div id='div_m_persona'>".
									"<select name='m_persona' id='m_persona' data-live-search='true' title='Seleccione' class='selectpicker form-control input-sm validate[required]' data-style='cDropdown'>". 
										"<option $selected_fisica value='F'>Humana</option>".
										"<option $selected_juridica value='J'>Juridica</option>".
									"</select>".
								"</div>".
							"</div>".
							"<div class='form-group col-md-4'>".
								"<label for='f_vig_desde'>Fecha Vig. Desde</label>".
								"<div class='input-group'>".
									"<input type='text' class='form-control input-sm text-center datepicker validate[required]' name='f_vig_desde' id='f_vig_desde' value='$f_vig_desde' maxlength='10' style='position: static;'>".
									"<span class='input-group-addon'>".
										"<span class='glyphicon glyphicon-calendar'></span>".
									"</span>".
								"</div>".
							"</div>".
						"</div>".
					"</table>".	
				"</div>".
			"</form>".   
		"</div>";

	$div_tab_domicilios .=   
		"<div role='tabpanel' class='tab-pane fade in form-group' id='datos_domicilio'>".
			"<div id='div_grid_domicilio' style='width:100%;'>".
				"<table id='grid_datos_domicilio$tmp' class='scroll' cellpadding='0' cellspacing='0'></table>".
				"<div id='grid_datos_domicilio_pager$tmp' class='scroll' style='text-align: center;'></div>".
			"</div>".
		"</div>";


	$div_tab_telefonos .=   
		"<div role='tabpanel' class='tab-pane fade in form-group' id='datos_telefonos'>".
			"<div id='div_grid_telefono' style='width:100%;'>".
				"<table id='grid_datos_telefono$tmp' class='scroll' cellpadding='0' cellspacing='0'></table>".
				"<div id='grid_datos_telefono_pager$tmp' class='scroll' style='text-align: center;'></div>".
			"</div>".
		"</div>";

	$div_tab_datos_complementarios .=
		"<div role='tabpanel' class='tab-pane fade in form-group' id='datos_complementarios'>".
			"<div id='div_grid_complementarios' style='width:100%;'>".
				"<table id='grid_datos_complementarios$tmp' class='scroll' cellpadding='0' cellspacing='0'></table>".
				"<div id='grid_datos_complementarios_pager$tmp' class='scroll' style='text-align: center;'></div>".
			"</div>".
		"</div>";

	$div_tab_per_fisica .=   	
		"<div role='tabpanel' class='tab-pane fade in form-group' id='datos_per_fisica'>".
			"<form id='frm_per_fisica'>".
				"<div class='row'>".
					"<div class='form-group col-md-4 col-md-offset-2'>".
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
				"</div>".

				"<div class='row'>".
					"<div id='tipo_sexo_div' class='form-group col-md-4 col-md-offset-2'>".
						"<label for='c_sexo'>Sexo</label>".
						"<select name='c_sexo'id='c_sexo' data-live-search='true' title='Seleccione' class='selectpicker form-control input-sm validate[required]' data-style='cDropdown'>".
							"<option $selected_masculino value='M'>Masculino</option>".
							"<option $selected_femenino value='F'>Femenino</option>".
						"</select>".
					"</div> ".
					"<div class='form-group col-md-4'>".
						"<label for='f_nacimiento'>Fecha de Nacimiento</label>".
						"<div class='input-group'>".
							"<input name='f_nacimiento' id='f_nacimiento' type='text' class='form-control input-sm text-center datepicker' value='$f_nacimiento' maxlength='10' autocomplete='off' style='position: static;'>".
							"<span class='input-group-addon'>".
								"<span class='glyphicon glyphicon-calendar'></span>".
							"</span>".
						"</div>".
					"</div>".
				"</div> ".

				"<div class='row' id='div_excepcion_mail' hidden>".
					"<div class='form-group col-md-4 col-md-offset-2'>".
						"<label for='f_excepcion_mail'>Fecha Excepción Mail</label>".
						"<div class='input-group'>".
							"<input name='f_excepcion_mail' id='f_excepcion_mail' type='text' class='form-control input-sm text-center datepicker' value='$f_excepcion_mail' maxlength='10' autocomplete='off' style='position: static;' disabled='disabled'>".
							"<span class='input-group-addon'>".
								"<span class='glyphicon glyphicon-calendar'></span>".
							"</span>".
						"</div>".
					"</div>".
					"<div id='c_excepcion_div' class='form-group col-md-4'>".
						"<label for='c_excepcion'>Excepción Mail</label>".
						"<select name='c_excepcion'id='c_excepcion' data-live-search='true' title='Seleccione' class='selectpicker form-control input-sm' data-style='cDropdown'>".
							"<option selected='selected' value='N'>NO</option>".
							"<option value='S'>SI</option>".
						"</select>".
					"</div> ".
				"</div> ".
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
				"</div>".

				"<div class='row'>".
					"<div id='n_sucursales_div' class='form-group col-md-2'>".
						"<label for='n_sucursales'>Cant. de Sucursales</label>".
						"<input name='n_sucursales' id='n_sucursales' type='text' class='form-control input-sm text-right validate[required,custom[onlyIntNumber]]' value='$n_sucursales'>".
					"</div>".
					"<div id='n_duracion_anios_div' class='form-group col-md-2'>".
						"<label for='n_duracion_anios'>Duración en años</label>".
						"<input name='n_duracion_anios' id='n_duracion_anios' type='text' class='form-control input-sm text-right validate[custom[onlyIntNumber]]' value='$n_duracion_anios'>".
					"</div>".
					"<div id='n_inscripcion_igj_div' class='form-group col-md-2'>".
						"<label for='n_inscripcion_igj'>Nro. inscripción IGJ</label>".
						"<input name='n_inscripcion_igj' id='n_inscripcion_igj' type='text' class='form-control input-sm text-right validate[custom[onlyIntNumber]]' value='$n_inscripcion_igj'>".
					"</div>".
					"<div class='form-group col-md-2'>".
						"<label for='f_inscripcion_igj'>Fecha de Inscrip. IGJ</label>".
						"<div class='input-group'>".
							"<input name='f_inscripcion_igj' id='f_inscripcion_igj' type='text' class='form-control input-sm text-center datepicker' value='$f_inscripcion_igj' maxlength='10' autocomplete='off' style='position: static;'>".
							"<span class='input-group-addon'>".
								"<span class='glyphicon glyphicon-calendar'></span>".
							"</span>".
						"</div>".
					"</div>".
					"<div class='form-group col-md-2'>".
						"<label for='f_contrato_social'>Fecha de Contrato Social</label>".
						"<div class='input-group'>".
							"<input name='f_contrato_social' id='f_contrato_social' type='text' class='form-control input-sm text-center datepicker' value='$f_contrato_social' maxlength='10' autocomplete='off' style='position: static;'>".
							"<span class='input-group-addon'>".
								"<span class='glyphicon glyphicon-calendar'></span>".
							"</span>".
						"</div>".
					"</div>".
				"</div>".
			"</form>".
			"<br/>".
			"<div id='datos_responsables'>".
				"<div id='div_grid_responsables' style='width:100%;'>".
					"<table id='grid_datos_responsables$tmp' class='scroll' cellpadding='0' cellspacing='0'></table>".
					"<div id='grid_datos_responsables_pager$tmp' class='scroll' style='text-align: center;'></div>".
				"</div>".
			"</div>".
		"</div>"; 				

	$div_tab_tributos .=
		"<div role='tabpanel' class='tab-pane fade in form-group' id='datos_tributos'>".
			"<div id='div_grid_tributos' style='width:100%;'>".
				"<table id='grid_datos_tributos$tmp' class='scroll' cellpadding='0' cellspacing='0'></table>".
				"<div id='grid_datos_tributos_pager$tmp' class='scroll' style='text-align: center;'></div>".
			"</div>".
			"<br/>".
			"<center>".
				"<button class='btn-sm btn-primary' onclick='btn_generar_boleta()' type='button' id='btn_gen_boleta' style='display:none;margin-right: 10px;'>".
					"<span class='glyphicon glyphicon-print' aria-hidden='true'></span> Generar Boleta".
				"</button>".
				"<button class='btn-sm btn-primary' onclick='btn_constancia()' type='button' id='btn_constancia'>".
					"<span class='glyphicon glyphicon-print' aria-hidden='true'></span> Imprimir Constancia
				</button>".
			"</center>".
			"<br/>".
			"<div id='div_grid_conceptos' style='width:100%;'>".
				"<table id='grid_datos_conceptos$tmp' class='scroll' cellpadding='0' cellspacing='0'></table>".
				"<div id='grid_datos_conceptos_pager$tmp' class='scroll' style='text-align: center;'></div>".
			"</div>".
			"<br/>".
			"<center>".
				"<button type='button' id='btn_actividades' class='btn btn-primary' onclick='btn_actividades()' style='margin-left:20px;margin-right:20px;' disabled>Actividades</button>".	
				"<button type='button' id='btn_regimen' class='btn btn-primary' onclick='btn_regimen()' style='margin-left:20px;margin-right:20px;' disabled>Régimen</button>".
				"<button type='button' id='btn_responsables' class='btn btn-primary' onclick='btn_responsables()' style='margin-left:20px;margin-right:20px;' disabled>Responsables</button>".
				"<button type='button' id='btn_excepciones' class='btn btn-primary' onclick='btn_excepciones()' style='margin-left:20px;margin-right:20px;' disabled>Excepciones</button>".
				"<button type='button' id='btn_info_agentes' class='btn btn-primary' onclick='btn_info_agentes()' style='margin-left:20px;margin-right:20px;' disabled>Agentes</button>".
			"</center>".
		"</div>";


	include("modals_tributos.php");
	
	$footer .=
		"</div><br/><center>
			<button type='button' class='btn-sm btn-primary' id='btn_guardar_datos' style='display:none;' onclick='finalizar_carga()'>
				<span class='glyphicon glyphicon-floppy-save' aria-hidden='true'></span> Finalizar Carga
			</button>
		</center></div></div>";

	$result = $header.$div_tab_contribuyentes.$div_tab_domicilios.$div_tab_telefonos.$div_tab_datos_complementarios.$div_tab_per_fisica.$div_tab_per_juridica.$div_tab_tributos.$footer;

	$result .= $modal_actividades_cm.$modal_actividades_ibd.$modal_regimen.$modal_responsables.$modal_info_agente;

	echo json_encode($result);
?>


