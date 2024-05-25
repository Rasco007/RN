<?php

$modal_actividades_cm = 
	"<div class='modal fade' id='modal_actividades_cm' tabindex='-1' role='dialog' aria-labelledby='actividades_cmLabel' aria-hidden='true'>".
	    "<div class='modal-dialog modal-lg' role='document'>".
	        "<div class='modal-content'>".
	            "<div class='modal-header'>".
	                "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>".
	                    "<span aria-hidden='true'>&times;</span>".
	                "</button>".
	                "<h5 class='modal-title' id='actividades_cmLabel'>Actividades</h5>".
	            "</div>".
	            "<div class='modal-body'>".
	                "<table id='grid_datos_actividades_cm' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>".
	                "<div id='grid_datos_actividades_cm_pager' class='scroll' style='text-align:center;'></div>".
	                "<br>".
	                "<table id='grid_datos_jurisdicciones' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>".
	                "<div id='grid_datos_jurisdicciones_pager' class='scroll' style='text-align:center;'></div>".
	            "</div>".
	            "<div class='modal-footer'>".
	                "<div class='text-center'>".
	                    "<button type='button' class='btn btn-secondary' id='btn_volver_actividades_cm' data-dismiss='modal'>Volver</button>".
	                "</div>".
	            "</div>".
	        "</div>".
	    "</div>".
	"</div>";

$modal_actividades_ibd =
	"<div class='modal fade' id='modal_actividades_ibd' tabindex='-1' role='dialog' aria-labelledby='actividades_ibdLabel' aria-hidden='true'>".
	    "<div class='modal-dialog modal-lg' role='document'>".
	        "<div class='modal-content'>".
	            "<div class='modal-header'>".
	                "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>".
	                    "<span aria-hidden='true'>&times;</span>".
	                "</button>".
	                "<h5 class='modal-title' id='actividades_ibdLabel'>Actividades</h5>".
	            "</div>".
	            "<div class='modal-body'>".
	                "<table id='grid_datos_comercios' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>".
	                "<div id='grid_datos_comercios_pager' class='scroll' style='text-align:center;'></div>".
	                "<br>".
	                "<table id='grid_datos_actividades_ibd' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>".
	                "<div id='grid_datos_actividades_ibd_pager' class='scroll' style='text-align:center;'></div>".
	                "<br>".
	                "<table id='grid_datos_unidades' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>".
	                "<div id='grid_datos_unidades_pager' class='scroll' style='text-align:center;'></div>".
	            "</div>".
	            "<div class='modal-footer'>".
	                "<div class='text-center'>".
	                    "<button type='button' class='btn btn-secondary' id='btn_volver_actividades_ibd' data-dismiss='modal'>Volver</button>".
	                "</div>".
	            "</div>".
	        "</div>".
	    "</div>".
	"</div>";

$modal_regimen =
	"<div class='modal fade' id='modal_regimen' tabindex='-1' role='dialog' aria-labelledby='regimenLabel' aria-hidden='true'>".
	    "<div class='modal-dialog modal-lg' role='document'>".
	        "<div class='modal-content'>".
	            "<div class='modal-header'>".
	                "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>".
	                    "<span aria-hidden='true'>&times;</span>".
	                "</button>".
	                "<h5 class='modal-title' id='regimenLabel'>Régimen</h5>".
	            "</div>".
	            "<div class='modal-body'>".
	                "<form id='frm_datos_regimen'>".
						"<div class='row'>".
							"<div class='form-group col-md-4'>".
								"<label for='c_regimen'>Régimen</label>".
								"<div class='input-group' id='tipo_empresa_div'>".
									"<input name='c_regimen' id='c_regimen' type='text' class='form-control input-sm input-cod-short read_only'>".
									"<input name='d_regimen' id='d_regimen' type='text' class='form-control input-sm input-desc-long' readonly>".
									"<span class='input-group-addon btn_lupa read_only_lupa' id='lupa_regimen'>".
										"<span class='glyphicon glyphicon-search' aria-hidden='true'></span>".
									"</span>".
								"</div>".
							"</div>".
							"<div class='form-group col-md-4'>".
								"<label for='c_tipo_actividad'>Tipo de Actividad</label>".
								"<div class='input-group' id='tipo_forma_juridica_div'>".
									"<input name='c_tipo_actividad' id='c_tipo_actividad' type='text' class='form-control input-sm input-cod-short read_only'>".
									"<input name='d_tipo_actividad' id='d_tipo_actividad' type='text' class='form-control input-sm input-desc-long' readonly>".
									"<span class='input-group-addon btn_lupa read_only_lupa' id='lupa_tipo_actividad'>".
										"<span class='glyphicon glyphicon-search' aria-hidden='true'></span>".
									"</span>".
								"</div>".
							"</div>".
							"<div  class='form-group col-md-4'>".
								"<label for='c_categoria'>Categoría</label>".
								"<input name='c_categoria' id='c_categoria' type='text' class='form-control input-sm text-right validate[custom[onlyIntNumber]] read_only'>".
							"</div>".
						"</div>".

						"<div class='row'>".
							"<div class='form-group col-md-4'>".
								"<label for='f_vig_desde_regimen'>Fecha Vigencia Desde</label>".
								"<div class='input-group'>".
									"<input name='f_vig_desde_regimen' id='f_vig_desde_regimen' type='text' class='form-control input-sm text-center datepicker read_only' maxlength='10' autocomplete='off'>".
									"<span class='input-group-addon'>".
										"<span class='glyphicon glyphicon-calendar'></span>".
									"</span>".
								"</div>".
							"</div>".
							"<div class='form-group col-md-4'>".
								"<label for='f_vig_hasta_regimen'>Fecha Vigencia Hasta</label>".
								"<div class='input-group'>".
									"<input name='f_vig_hasta_regimen' id='f_vig_hasta_regimen' type='text' class='form-control input-sm text-center datepicker read_only' maxlength='10' autocomplete='off'>".
									"<span class='input-group-addon'>".
										"<span class='glyphicon glyphicon-calendar'></span>".
									"</span>".
								"</div>".
							"</div>".
						"</div>".
					"</form>".
					"</br>".
					"<table id='grid_datos_reg' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>".
	                "<div id='grid_datos_reg_pager' class='scroll' style='text-align:center;'></div>".
                    "</br>".
                    "</br>".
                    "<table id='grid_datos_reg_hist' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>".
                    "<div id='grid_datos_reg_hist_pager' class='scroll' style='text-align:center;'></div>".
	            "</div>".
	            "<div class='modal-footer'>".
	                "<div class='text-center'>".
	                    "<button type='button' class='btn btn-secondary' id='btn_volver_regimen' data-dismiss='modal'>Volver</button>".
	                "</div>".
	            "</div>".
	        "</div>".
	    "</div>".
	"</div>";

$modal_responsables =
	"<div class='modal fade' id='modal_responsables' tabindex='-1' role='dialog' aria-labelledby='responsablesLabel' aria-hidden='true'>".
	    "<div class='modal-dialog modal-lg' role='document'>".
	        "<div class='modal-content'>".
	            "<div class='modal-header'>".
	                "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>".
	                    "<span aria-hidden='true'>&times;</span>".
	                "</button>".
	                "<h5 class='modal-title' id='responsablesLabel'>Responsables</h5>".
	            "</div>".
	            "<div class='modal-body'>".
	                "<table id='grid_datos_responsables_trib' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>".
	                "<div id='grid_datos_responsables_trib_pager' class='scroll' style='text-align:center;'></div>".
	            "</div>".
	            "<div class='modal-footer'>".
	                "<div class='text-center'>".
	                    "<button type='button' class='btn btn-secondary' id='btn_volver_responsables' data-dismiss='modal'>Volver</button>".
	                "</div>".
	            "</div>".
	        "</div>".
	    "</div>".
	"</div>";

$anexo_options = 
	"<option class='anexos' value='01'>01</option>".
	"<option class='anexos' value='02'>02</option>".
	"<option class='anexos' value='03'>03</option>".
	"<option class='anexos' value='04'>04</option>".
	"<option class='anexos' value='05'>05</option>".
	"<option class='anexos' value='06'>06</option>".
	"<option class='anexo7' value='07'>07</option>".
	"<option class='anexos' value='08'>08</option>".
	"<option class='anexos' value='09'>09</option>";

$modal_info_agente =
	"<div class='modal fade' id='modal_agente' tabindex='-1' role='dialog' aria-labelledby='agenteLabel' aria-hidden='true'>".
	    "<div class='modal-dialog modal-lg' role='document'>".
	        "<div class='modal-content'>".
	            "<div class='modal-header'>".
	                "<button type='button' class='close' data-dismiss='modal' aria-label='Close'>".
	                    "<span aria-hidden='true'>&times;</span>".
	                "</button>".
	                "<h5 class='modal-title' id='agenteLabel'>Agente</h5>".
	            "</div>".
	            "<div class='modal-body'>".
	                "<form id='frm_datos_agente'>".
						"<div class='row'>".
							"<div class='form-group col-md-4'>".
								"<label for='c_organismo'>Organismo</label>".
								"<div class='input-group' id='tipo_empresa_div'>".
									"<input name='c_organismo' id='c_organismo' type='text' class='form-control input-sm input-cod-short read_only'>".
									"<input name='d_organismo' id='d_organismo' type='text' class='form-control input-sm input-desc-long' readonly>".
									"<span class='input-group-addon btn_lupa read_only_lupa' id='lupa_organismo'>".
										"<span class='glyphicon glyphicon-search' aria-hidden='true'></span>".
									"</span>".
								"</div>".
							"</div>".
							"<div  class='form-group col-md-8'>".
								"<label for='denominacion'>Denominación</label>".
								"<input name='denominacion' id='denominacion' type='text' class='form-control input-sm read_only'>".
							"</div>".
						"</div>".

						"<div class='row'>".
							"<div class='form-group col-md-6'>".
								"<label for='d_act_desarrolla'>Act. Desarrolla</label>".
								"<input name='d_act_desarrolla' id='d_act_desarrolla' type='text' class='form-control input-sm read_only'>".
							"</div>".
							"<div class='form-group col-md-6'>".
								"<label for='d_act_retiene'>Act. Retiene</label>".
								"<input name='d_act_retiene' id='d_act_retiene' type='text' class='form-control input-sm read_only'>".
							"</div>".
						"</div>".

						"<div class='row'>".
							"<div  class='form-group col-md-6'>".
								"<label for='d_contacto_operativo'>Contacto Operativo</label>".
								"<input name='d_contacto_operativo' id='d_contacto_operativo' type='text' class='form-control input-sm read_only'>".
							"</div>".
							"<div  class='form-group col-md-6'>".
								"<label for='d_contacto_administrativo'>Contacto Administrativo</label>".
								"<input name='d_contacto_administrativo' id='d_contacto_administrativo' type='text' class='form-control input-sm read_only'>".
							"</div>".
						"</div>".

						"<div class='row'>".
							"<div class='form-group col-md-2'>".
								"<label for='n_anexo_principal'>Anexo Principal</label>".
								"<select name='n_anexo_principal'id='n_anexo_principal' data-live-search='true' title='Seleccione' class='selectpicker form-control input-sm read_only' data-style='cDropdown'>".
									$anexo_options.
								"</select>".
							"</div>".
							"<div class='form-group col-md-2'>".
								"<label for='n_anexo_1'>Anexo 1</label>".
								"<select name='n_anexo_1'id='n_anexo_1' data-live-search='true' title='Seleccione' class='selectpicker form-control input-sm read_only' data-style='cDropdown'>".
									$anexo_options.
								"</select>".
							"</div>".
							"<div class='form-group col-md-2'>".
								"<label for='n_anexo_2'>Anexo 2</label>".
								"<select name='n_anexo_2'id='n_anexo_2' data-live-search='true' title='Seleccione' class='selectpicker form-control input-sm read_only' data-style='cDropdown'>".
									$anexo_options.
								"</select>".
							"</div>".
						"</div>".
					"</form>".
	            "</div>".
	            "<div class='modal-footer'>".
	                "<div class='text-center'>".
	                    "<button type='button' class='btn btn-secondary' id='btn_volver_agente' data-dismiss='modal'>Volver</button>".
	                "</div>".
	            "</div>".
	        "</div>".
	    "</div>".
	"</div>";
?>