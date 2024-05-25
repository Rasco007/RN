<?php

require_once(APLICACIONES.'cuenta_corriente/get_descrip.php');
$n_cuit = ($_POST['n_cuit']);
$id_contribuyente = ($_POST['id_contribuyente']);
$c_tributo = ($_POST['c_tributo']);
$c_tipo_imponible = ($_POST['c_tipo_imponible']);
$objeto_hecho = ($_POST['objeto_hecho']);

/***** sacado 27/05/2016
      PRIMERO VERIFICAMOS SI ES UN GRAN CONTRIBUYENTE CT > 2000
      SI ES GRAN CONTRIBUYENTE ACTUALIZAMOS EL CONTRIBUYENTE CON LA N_POS_FISCAL_REDUC = ANIO - 2
 *****/
$contrib_sql = new DB_Query("SELECT * FROM (
  SELECT C_TIPO_IMPONIBLE, COUNT(*) AS CONT
  FROM contribuyentes_tributos CT WHERE ID_CONTRIBUYENTE= :id_contribuyente
  GROUP BY C_TIPO_IMPONIBLE)
  ORDER BY CONT ASC");

$par_contrib = array(':id_contribuyente' => $id_contribuyente);
$contrib_row = $contrib_sql->do_query($par_contrib);
$gran_contrib = 'N';
foreach($contrib_row as $c){
    if($c['CONT'] > 2000000){
        $gran_contrib = 'S';
    }
}
$advert = '';
if($gran_contrib=='S'){
/*    $pos_fisc_reduc = date('Y').'00';
    $updt_con = new DB_Query("UPDATE CONTRIBUYENTES SET N_POS_FISCAL_REDUC = :pos_fiscal_reduc
                                WHERE ID_CONTRIBUYENTE=:id_contribuyente");
    $par_con = array(':id_contribuyente' => $id_contribuyente, ':pos_fiscal_reduc' => $pos_fisc_reduc);
    $updt_con->do_query($par_con);
    $updt_con->db_commit();*/

	$advert = '<p>Sr. Usuario, el CUIT y/u objeto por el cual está consultando, pertenece a un contribuyente grande en ART, favor diríjase a la Consulta de Cuenta Corriente</p>';
}

$db_query = new DB_Query("select 
							d_dato2 as c_grupo_imponible, c_dato
							from contribuyentes_tributos ct,siat.tablas_generales tg,siat.parametros p
							where ct.id_contribuyente = :id_contribuyente
							and p.c_constante = 'TIMPO'
							and p.n_tabla = tg.n_tabla 
                            and ct.c_tipo_imponible = tg.c_dato
							group by tg.d_dato2, c_dato
							order by tg.d_dato2
							");
							
$par = array(':id_contribuyente' => $id_contribuyente,':c_tipo_imponible' => $c_tipo_imponible);
$row_query = $db_query->do_query($par,OCI_NUM);



//query trae datos generales del contribuyente
$db_query->setQuery("SELECT DEVUELVE_DOMICILIO ( :id_contribuyente, 1) AS domicilio,
						   FUN_OBTENER_CONTACTO_VIGENTE ( :id_contribuyente, 'EMAIL')  AS email,
						   FUN_OBTENER_CONTACTO_VIGENTE ( :id_contribuyente, 'TEL')  AS telefono,
						   (SELECT COUNT (1)
							  FROM usuarios
							 WHERE id_rel_persona = :id_contribuyente)
							   AS posee_clave
					  FROM DUAL ");

$datos_contrib = $db_query->do_query($par);

//variables semaforos generales
$m_pfp = 'v';
$m_int = 'v';
$m_ins = 'v';
$m_cq = 'v';
$m_j = 'v';
//planes de pagos
$db_query->setQuery("select count(1) cantidad from siat.vw_obligaciones where id_contribuyente = :id_contribuyente and id_plan_pago is not null");
					
$cant_pfp = $db_query->do_query($par);

if ($cant_pfp[0]['CANTIDAD'] != 0){
	$m_pfp = 'r';
}
//intimaciones
$db_query->setQuery("select count(1) cantidad from siat.vw_obligaciones where id_contribuyente = :id_contribuyente and m_intimacion != 'N'");

$cant_inti = $db_query->do_query($par);

if ($cant_inti[0]['CANTIDAD'] != 0){
	$m_int = 'r';
}
//inspecciones
$db_query->setQuery("select count(1) cantidad from siat.vw_obligaciones where id_contribuyente = :id_contribuyente and m_inspeccion != 'N'");

$cant_ins = $db_query->do_query($par);

if ($cant_ins[0]['CANTIDAD'] != 0){
	$m_ins = 'r';
}
//concursos y quiebras
$db_query->setQuery("select count(1) cantidad from siat.vw_obligaciones where id_contribuyente = :id_contribuyente and m_cq != 'N'");

$cant_cq = $db_query->do_query($par);

if ($cant_cq[0]['CANTIDAD'] != 0){
	$m_cq = 'r';
}
//juicios
$db_query->setQuery("select count(1) cantidad from siat.vw_obligaciones where id_contribuyente = :id_contribuyente and 'N' != SIAT.pkg_gestion_judicial.obligacion_juicio_vigente(ID_OBLIGACION, 'N')");

$cant_j = $db_query->do_query($par);

if ($cant_j[0]['CANTIDAD'] != 0){
	$m_j = 'r';
}

$lista_check_tributos = '<div id="dialog_check_tributos"><ul id="ul_lista_reporte">';
	for ($i=0; $i < count($row_query); $i++){
		if( !in_array( $row_query[$i][0], array('SELLOS','TASA ADM')) ){
		//lista para seleccionar los tributos a imprimir en el reporte
		$lista_check_tributos .= '<li>
									<input id="chk_reporte_'.$i.'" value="'.$row_query[$i][0].'" class="check_tributo" type="checkbox" />
									<label for="chk_reporte_'.$i.'" >'.$row_query[$i][0].'</label>
								</li>';
		}
	}
	
$lista_check_tributos .= '</ul>
						<div><input id="chk_solo_vigentes" value="solo_vigentes" checked="checked" type="checkbox" />
							<label for="chk_solo_vigentes" >Solo Inmuebles y Automotores Vigentes</label></div>
						</div>';

$header = 
			"<div id='general'>".
				$lista_check_tributos.
				"<br /><br />".
					"<div id='tabs_trib'>".
						"<ul class='nav nav-tabs'>".
							"<li class='nav-item active'><a href='#datos_generales' data-toggle='tab' role='tab' data-grid='datos_grales'>Datos Generales</a></li>";
		
	
for ($i=0; $i < count($row_query); $i++){
		

		
		$lista_tabs .= 	"<li class='nav-item' ><a data-toggle='tab' role='tab' href='#trib_".$i."' data-grid='grid_tributos_".$i."' data-timp='".$row_query[$i][1]."' data-agrup='".$row_query[$i][0]."'>".$row_query[$i][0]."</a></li>";
		
		$div_tabs_tributos .=  
								"<div id='trib_".$i."' style = 'padding: 1em 0em;' class='tab-pane fade'>".
								"<form id='frm_trib_".$i."'>".
						        	"<div id='frm_reib_div_".$i."' class='row'>".
										"<div id='div_historico' class='form-group col-md-3'>".
										"</div>".
										"<div id='div_historico' class='form-group col-md-2'>".
											"<label for='i_saldo_historico'>Saldo Historico:</label>".
											"<input name='i_saldo_historico".$i."' id='grid_tributos_".$i."_i_saldo_historico' type='text' class='form-control input-sm text-right' readonly />".
										"</div>".
										"<div id='div_historico' class='form-group col-md-2'>".
											"<label for='i_saldo_historico'>Saldo Actualizado:</label>".
											"<input name='i_saldo_".$i."' id='grid_tributos_".$i."_i_saldo' type='text' class='form-control input-sm text-right' readonly />".
										"</div>".
										"<div id='div_historico' class='form-group col-md-2'>".
											"<label for='i_saldo_historico'>A favor de:</label>".
											"<input name='a_favor".$i."' id='grid_tributos_".$i."_a_favor' type='text' class='form-control input-sm text-right' readonly />".
										"</div>".
										"<div id='div_historico' class='form-group col-md-4'>".
										"</div>".
									"</div>".
						        "</form>".
						        "<br />".	
						        "<div id='detalle_".$i."' class='detalle'>".							
						        "<div id='trib_grid_".$i."'>".
					     		"         <table id='grid_tributos_".$i."' class='scroll' cellpadding='0' cellspacing='0'></table>".
						 		"      <div id='grid_tributos_".$i."_pager' class='scroll' style='text-align: center;'></div>".
						 		"	</div>".
									"<div id='detalles_grid_info_".$i."' class='detalles_info'>".
									"<div class='grid_m_erronea inner'>".get_btn_info('ERR')."</div>".
									"<div class='grid_m_intimacion inner'>".get_btn_info('INT')."</div>".
									"<div class='grid_m_inspeccion inner'>".get_btn_info('INS')."</div>".
									"<div class='grid_m_exencion inner'>".get_btn_info('EXE')."</div>".
									"<div class='grid_m_pago_provisorio inner'>".get_btn_info('PPR')."</div>".
									"<div class='grid_m_plan_pago inner'>".get_btn_info('FDP')."</div>".
									"<div class='grid_m_pro_acep inner'>".get_btn_info('POA')."</div>".
									"<div class='grid_m_conc_quieb inner'>".get_btn_info('CYQ')."</div>".
									"<div class='grid_m_juicio inner'>".get_btn_info('JUI')."</div>".
									"</div>".						 		
						 		"</div>".
								"</div>";
					           	
}
/*$dom_fiscal_e = $datos_contrib[0]['DOM_FISCAL_E']>0 ? 'SI' : 'NO';*/
$posee_clave = $datos_contrib[0]['POSEE_CLAVE']>0 ? 'SI' : 'NO';
$div_tab_general .=
				"</ul><div class='tab-content'>".
				"<div id='datos_generales' class='tab-pane fade active in' role='tabpanel'>".
				"<form id='frm_datos_contrib'>".
		        	"<div class='row'>".
						"<div id='div_domicilio' class='form-group col-md-4'>".
							"<label for='d_domicilio_fiscal'>Domicilio Fiscal:</label>".
							"<input value='".$datos_contrib[0]['DOMICILIO']."' name='d_domicilio_fiscal' id='d_domicilio_fiscal' type='text' class='form-control input-sm' readonly />".
						"</div>".
						"<div id='div_telefono' class='form-group col-md-2'>".
							"<label for='n_telefono'>Teléfono:</label>".
							"<input value='".$datos_contrib[0]['TELEFONO']."' name='n_telefono' id='n_telefono' type='text' class='form-control input-sm' readonly />".
		        	"</div>".
						"<div id='div_mail' class='form-group col-md-2'>".
							"<label for='d_mail'>Mail:</label>".
							"<input value='".$datos_contrib[0]['EMAIL']."' name='d_mail' id='d_mail' type='text'class='form-control input-sm' readonly />".
						"</div>".
						"<div id='d_posee_clave_div' class='form-group col-md-2'>".
							"<label for='d_posee_clave'>Posee Clave Fiscal:</label>".
							"<input value='".$posee_clave."' name='d_posee_clave' id='d_posee_clave' type='text' class='form-control input-sm text-right' readonly />".
						"</div>".
                	"</div>".
                	"<div class='row'><br>".
						"<div id='cant_planes_div' class='form-group col-md-2'>".
							"<div class='col-md-10'>".
								"<label for='n_cant_planes'>Planes:</label></div>".
							"<div class='col-md-2' style='margin-left: -30% !important;'>".
								"<button name='n_cant_planes' id='n_cant_planes' type='button' class='btn-lg bt_".$m_pfp."'></button></div>".
						"</div>".
						"<div id='n_cant_int_div' class='form-group col-md-2'>".
							"<div class='col-md-10'>".
								"<label for='n_cant_int'>Intimaciones:</label></div>".
							"<div class='col-md-2' style='margin-left: -30% !important;'>".
								"<button name='n_cant_int' id='n_cant_int' type='button' class='btn-lg bt_".$m_int."'></button></div>".
						"</div>".
						"<div id='n_cant_ins_div' class='form-group col-md-2'>".
							"<div class='col-md-10'>".
								"<label for='n_cant_ins'>Inspecciones:</label></div>".
							"<div class='col-md-2' style='margin-left: -30% !important;'>".
								"<button name='n_cant_ins' id='n_cant_ins' type='button' class='btn-lg bt_".$m_ins."'></button></div>".
						"</div>".
						"<div id='n_cant_conq_quieb' class='form-group col-md-2'>".
							"<div class='col-md-10'>".
								"<label for='n_cant_conq_quieb'>Conc./Quieb.:</label></div>".
							"<div class='col-md-2' style='margin-left: -30% !important;'>".
								"<button name='n_cant_conq_quieb' id='n_cant_conq_quieb' type='button' class='btn-lg bt_".$m_cq."'></button></div>".
					 	"</div>".
						"<div id='n_cant_bd_div' class='form-group col-md-2'>".
							"<div class='col-md-10'>".
								"<label for='n_cant_jui'>Juicios:</label></div>".
							"<div class='col-md-2' style='margin-left: -30% !important;'>".
								"<button name='n_cant_jui' id='n_cant_jui' type='button' class='btn-lg bt_".$m_j."'></button></div>".
						"</div>".
					"</div>".
                	"<div class='row'>".
						"<div id='div_botones' class='form-group col-md-12 text-center'>".
							"<label for='btn_det_contrib'> </label>".
							"<div id='div_botones_input'>".
								"<button id='btn_cta_cte' class='btn-sm' type='button' style='margin-left:3px'><span aria-hidden='true'></span> Cta Corriente </button>".
                				"<button id='btn_estado_deuda' class='btn-sm' type='button' style='margin-left:3px'><span aria-hidden='true'></span> Informe de Deuda</button>".
								"<button id='btn_estado_deuda_res' class='btn-sm' type='button' style='margin-left:3px'><span aria-hidden='true'></span> Informe de Deuda Resumido</button>".
                			"</div>".
						"</div>".
                	"</div>".
				"</form>".
				"</div>";       
		
	$panel_btns = "<div id='panel_botones'  align='center' style='display:none;'>".
        			"	<div class='row-search'>".
							"<div class='col-md-12'>".
								"<button type='button' class='panel_btn btn-sm' data-fun='abrir_det_cta_cte' id='btn_cuenta_corriente' style='margin-left:3px'><span aria-hidden='true'></span> Cuenta Corriente </button>".
								"<button type='button' class='panel_btn btn-sm' data-fun='informe_deuda' id='bt_imprimir_informe' style='margin-left:3px'><span aria-hidden='true'></span> Informe de Deuda </button>".
	              			"</div>".
						"</div>".
					"</div>";

 	$referencias = "<div style='width:100%; margin-top:3px' class='row-search'>
						<div id='referencias_div' class='col-md-6'>".
							"<div class='form-group col-md-1'>".
								"<button name='m_ref_no_posee' id='m_ref_no_posee' type='button' class='btn-lg bt_v'></button>".
							"</div>".
							"<div class='form-group col-md-2'>".
								"<div class='text-left'>No posee</div>".
							"</div>".
							"<div class='form-group col-md-1'>".
								"<button name='m_ref_posee' id='m_ref_posee' type='button' class='btn-lg bt_r'></button>".
							"</div>".
							"<div class='form-group col-md-2'>".
								"<div class='text-left'>Si posee</div>".
							"</div>".
  						"</div>".
					"</div>".
				"</div>";
						
$result->htm = $header.$lista_tabs.$div_tab_general.$div_tabs_tributos.$panel_btns."</div>"."</div>".$referencias;
$result->advert = $advert;

					
						
echo json_encode($result);


?>


