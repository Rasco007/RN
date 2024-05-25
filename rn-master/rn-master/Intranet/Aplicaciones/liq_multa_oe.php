<?php
	$m_autoquery = $_POST['p_m_autoquery'];
	$n_id_menu = $_POST['p_n_id_menu'];
	require_once(INTRANET . "header.php");

	$logon  = new oci_Logon();
	$voConn= $logon->getCon();

	// select forma jurídica
	$query="select c_dato, d_dato1 from siat.tablas_generales where n_tabla = 2 and c_dato != '99' order by d_dato asc";
	$sql_statement = oci_parse($voConn,$query);
	if(!oci_execute ($sql_statement, OCI_DEFAULT)){
		die($query);
	}
	
	$select_jur = '<select id="sel_forma_jur" name="sel_forma_jur" class="input-sm form-control">';
	while($row = oci_fetch_array($sql_statement, OCI_RETURN_NULLS)) {
		$select_jur.='<option value="'.$row[0].'">'.$row[1].'</option>';
	}
	$select_jur.= '</select>';

	// select tipo de documento
	$query="select c_dato, d_dato from siat.tablas_generales where n_tabla = 1 and c_dato not in ('0','PC') order by c_dato asc";
	$sql_statement = oci_parse($voConn,$query);
	if(!oci_execute ($sql_statement, OCI_DEFAULT)){
		die($query);
	}
	
	$select_doc = '<select id="sel_documento" name="sel_documento" class="input-sm form-control">';
	$select_doc_int = '<select id="sel_doc_int" name="sel_doc_int" class="input-sm form-control">';
	while($row = oci_fetch_array($sql_statement, OCI_RETURN_NULLS)) {
		$select_doc.='<option value="'.$row[0].'">'.$row[1].'</option>';
		$select_doc_int.='<option value="'.$row[0].'">'.$row[1].'</option>';
	}
	$select_doc.= '</select>';
	$select_doc_int.= '</select>';
	
	// select provincia
	$query="select c_dato, d_dato from siat.tablas_generales where n_tabla = 16 and c_dato in ('A','B','C','D','E',
		'F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z') order by d_dato asc";
	$sql_statement = oci_parse($voConn,$query);
	if(!oci_execute ($sql_statement, OCI_DEFAULT)){
		die($query);
	}

	$select_prov = '<select id="sel_provincia" name="sel_provincia" class="input-sm form-control">';
	$select_prov_int = '<select id="sel_prov_int" name="sel_prov_int" class="input-sm form-control">';
	$select_prov.='<option value="N/A">Seleccione una opción</option>';
	$select_prov_int.='<option value="N/A">Seleccione una opción</option>';
	while($row = oci_fetch_array($sql_statement, OCI_RETURN_NULLS)) {
		$select_prov.='<option value="'.$row[0].'">'.$row[1]." - Cod: ".$row[0].'</option>';
		$select_prov_int.='<option value="'.$row[0].'">'.$row[1]." - Cod: ".$row[0].'</option>';
	}
	$select_prov.= '</select>';
	$select_prov_int.= '</select>';
	
	// select caracter firma
	$query="select c_dato, d_dato from siat.tablas_generales where n_tabla = 48 and c_dato != '3' order by d_dato asc";
	$sql_statement = oci_parse($voConn,$query);
	if(!oci_execute ($sql_statement, OCI_DEFAULT)){
		die($query);
	}

	$select_caracter = '<select id="sel_caracter" name="sel_caracter" class="input-sm form-control">';
	while($row = oci_fetch_array($sql_statement, OCI_RETURN_NULLS)) {
		$select_caracter.='<option value="'.$row[0].'">'.$row[1].'</option>';
	}
	$select_caracter.= '</select>';
	
	// select tipo responsable
	$query="select c_dato, d_dato from siat.tablas_generales where n_tabla = 52 order by d_dato asc";
	$sql_statement = oci_parse($voConn,$query);
	if(!oci_execute ($sql_statement, OCI_DEFAULT)){
		die($query);
	}
	
	$select_tipo_res = '<select id="sel_tipo_res" name="sel_tipo_res" class="input-sm form-control">';
	while($row = oci_fetch_array($sql_statement, OCI_RETURN_NULLS)) {
		$select_tipo_res.='<option value="'.$row[0].'">'.$row[1].'</option>';
	}
	$select_tipo_res.= '</select>';
	
	// select cargo
	$query="select c_dato, d_dato from siat.tablas_generales where n_tabla = 51 and c_dato != '0' order by d_dato asc";
	$sql_statement = oci_parse($voConn,$query);
	if(!oci_execute ($sql_statement, OCI_DEFAULT)){
		die($query);
	}
	
	$select_cargo = '<select id="sel_cargo" name="sel_cargo" class="input-sm form-control">';
	while($row = oci_fetch_array($sql_statement, OCI_RETURN_NULLS)) {
		$select_cargo.='<option value="'.$row[0].'">'.$row[1].'</option>';
	}
	$select_cargo.= '</select>';
	
	// select ente
	$query="select e.c_ente, e.d_ente from entes_usuarios u, param_entes e 
            where   u.c_ente = e.c_ente 
                    and e.c_ente != 'ART'
                    and u.c_usuario = '".$_SESSION['usuario']."' 
                    order by e.d_ente asc";
	$sql_statement = oci_parse($voConn,$query);
	if(!oci_execute ($sql_statement, OCI_DEFAULT)){
		die($query);
	}

	$select_ente = '<select id="sel_ente" name="sel_ente" class="input-sm form-control">';
	$select_ente.='<option value="N/A">Seleccione una opción</option>';
	while($row = oci_fetch_array($sql_statement, OCI_RETURN_NULLS)) {
		$select_ente.='<option value="'.$row[0].'">'.$row[1].'</option>';
	}
	$select_ente.= '</select>';

$fecha_hoy = date('d/m/Y');
	//modal para emitir boleeta

#El siguiente php, setea la variable $fecha_hoy con la fecha del dia si es habil, caso contrario siguiente dia habil.
#Este PHP, tambien obtiene los feriados y los guardas en la variable global disabledDays
include('modal_emitir_boleta.php');

?>

<link rel="stylesheet" type="text/css" href="liq_multa_oe/css/tab.css">
<section>
	<div class="wizard" style="margin: 0% auto">
		<div class="wizard-inner">
			<ul id="TabView" class="nav nav-tabs" role="tablist">
				<div class="connecting-line" style=""></div>
				<li role="presentation" class="disabledTab tab_wizard active" style="">
					<a href="#contribuyente" data-toggle="tab" aria-controls="contribuyente" role="tab">
					<span class="round-tab"><i class="glyphicon glyphicon-user"></i></span></a></li>
				<li role="presentation" class="disabledTab tab_wizard" style="" >
					<a href="#domicilio" data-toggle="tab" aria-controls="domicilio" role="tab" >
					<span class="round-tab"><i class="glyphicon glyphicon-home"></i></span></a></li>
				<li role="presentation" class="disabledTab tab_wizard" style="">
					<a href="#integrantes" data-toggle="tab" aria-controls="integrantes" role="tab" >
					<span class="round-tab"><i class="glyphicon glyphicon-briefcase"></i></span></a></li>
				<li role="presentation" class="disabledTab tab_wizard" style="">
					<a href="#liquidacion_multa" data-toggle="tab" aria-controls="liquidacion_multa" role="tab">
					<span class="round-tab"><i class="glyphicon glyphicon-usd"></i></span></a></li>
			</ul>
			<div class="tab-content">
				<?php
					include("liq_multa_oe/html/tab_contrib.php");
					include("liq_multa_oe/html/tab_dom.php");
					include("liq_multa_oe/html/tab_integrantes.php");
					include("liq_multa_oe/html/tab_liq_multa.php");
				?>
				<ul class="list-inline pull-right">
					<li><button type="button" class="btn-sm btn-default prev-step" style="display: none">Anterior</button></li>
					<li><button type="button" class="btn-sm btn-primary btn-info-full next-step">Siguiente</button></li>
					<li><button type="button" class="btn-sm btn-danger btn-info-full confirmar-multa" style="display: none">Confirmar Multa</button></li>
				</ul>
                <div class="clearfix"></div>
			</div>
		</div>
	</div>
</section>

<script type="text/javascript" src="liq_multa_oe/js/funciones.js"></script>
<script type="text/javascript" src="liq_multa_oe/js/eventos.js"></script>
<script type="text/javascript" src="liq_multa_oe/js/elementos.js"></script>

<script type="text/javascript">
	var i_monto_fijo_desde, i_monto_fijo_hasta, p_descuento_vto = '-1';
	var i_multa = '0,00';
	var disabledDays = new Array();
	var fecha_actual = new Date();
    var fecha_hoy = '<?=$fecha_hoy?>';
	var v_n_id_menu = '<?=$n_id_menu;?>';
	
	$(document).ready(function () {
		inicializarElementos();

		$.ajax({
			url:'ajax_genericos/feriados.php',
			type:"POST",
			data:{
				"anio": fecha_actual.getFullYear()
			},
			async:false,
			dataType: 'json',
			success: function(ret) {
				if (ret.resultado == 'OK'){
					disabledDays = ret.dias;
				}else{
					disabledDays = new Array();
				}
			}
		});
		
		$('#div_sel_doc_int').html('<?=$select_doc_int;?>');
		$('#div_sel_provincia').html('<?=$select_prov;?>');
		$('#div_sel_prov_int').html('<?=$select_prov_int;?>');
		$('#div_sel_caracter').html('<?=$select_caracter;?>');
		$('#div_sel_tipo_res').html('<?=$select_tipo_res;?>');
		$('#div_sel_cargo').html('<?=$select_cargo;?>');
		$('#div_sel_ente').html('<?=$select_ente;?>');
		
		// Los siguientes eventos se incluyen aquí debido a que utilizan variables PHP --> sino no funcionan
		$('#n_cuit').focusout(function(){
            var patt = /\d{2}-\d{8}-\d{1}/g;
            var valida_cuit_completo = patt.test($("#n_cuit").val());
			/*var valida_cuit_completo = $("#n_cuit").val().indexOf('_');*/
			var cuit_con_guiones = $("#n_cuit").val();
			if(valida_cuit_completo && $("#n_cuit").val() != '' && $("#n_cuit").val() != '--'){
				var aux = $("#n_cuit").val().split('-');
				var cuit_sin_guiones = aux[0]+aux[1]+aux[2];
				
				$('#main').procOverlay({visible:true});
				$.ajax({
					url:'liq_multa_oe/ajax/ajax_operaciones.php',
					type:"POST",
					data:{
						"oper": "contrib",
						"n_cuit": cuit_sin_guiones
					},
					async:false,
					dataType: 'json',
					success: function(ret) {
						$('#main').procOverlay({visible:true});
						
						$('.input-sm').val('');
						$('#id_contrib').val('');
						$('#id_contrib_int').val('');
						$('#n_cuit').val(cuit_con_guiones);
						
						if (ret.id_contribuyente) {
							$('#d_denominacion').val(ret.d_denominacion);
							$('#d_denominacion').attr('readonly',true);
							$('#d_denominacion').attr('disabled',true);
							$('#id_contrib').val(ret.id_contribuyente);
							$('#div_sel_personeria').html('<select id="sel_personeria" name="sel_personeria" class="input-sm form-control"><option value="'+ret.c_personeria+'">'+ret.d_personeria+'</option></select>');
							$('#sel_personeria').attr('readonly',true);
							$('#sel_personeria').attr('disabled',true);
							if (ret.c_personeria == 'J'){
								$('#div_sel_forma_jur').html('<select id="sel_forma_jur" name="sel_forma_jur" class="input-sm form-control"><option value="'+ret.c_forma_jur+'">'+ret.d_forma_jur+'</option></select>');
								$('#sel_forma_jur').attr('readonly',true);
								$('#sel_forma_jur').attr('disabled',true);
								$('#div_sel_doc').html('<select id="sel_documento" name="sel_documento" class="input-sm form-control"><option value="N/A">Seleccione la personeria</option></select>');
								$('#n_documento').val('');
								$('.wrap_hum').hide();
								$('.wrap_jur').show();
							} else {
								$('#div_sel_forma_jur').html('<select id="sel_forma_jur" name="sel_forma_jur" class="input-sm form-control"><option value="N/A">Seleccione la personeria</option></select>');
								if (ret.d_tipo_doc != null){
									$('#div_sel_doc').html('<select id="sel_documento" name="sel_documento" class="input-sm form-control"><option value="'+ret.c_tipo_doc+'">'+ret.d_tipo_doc+'</option></select>');
								}
								$('#sel_documento').attr('readonly',true);
								$('#sel_documento').attr('disabled',true);
								$('#n_documento').val(ret.n_documento);
								$('#n_documento').attr('readonly',true);
								$('#n_documento').attr('disabled',true);
								$('.wrap_hum').show();
								$('.wrap_jur').hide();
							}
							
							if(ret.n_telefono) {
								$('#n_telefono').val(ret.n_telefono);
								$('#n_telefono').addClass('validate[required,custom[phone]]');
							} else {
								$('#n_telefono').removeClass('validate[required,custom[phone]]');
							}
							
							$('#n_telefono').attr('readonly',true);
							$('#n_telefono').attr('disabled',true);
							
							if(ret.d_mail) {
								$('#d_mail').val(ret.d_mail);
								$('#d_mail').addClass('validate[required,custom[email]]');
							} else {
								$('#d_mail').removeClass('validate[required,custom[email]]');
							}
							
							$('#d_mail').attr('readonly',true);
							$('#d_mail').attr('disabled',true);
						} else {
							if (aux[0] < 30){
								$('#div_sel_personeria').html('<select id="sel_personeria" name="sel_personeria" class="input-sm form-control"><option value="F">Humana</option></select>');
								$('#div_sel_forma_jur').html('<select id="sel_forma_jur" name="sel_forma_jur" class="input-sm form-control"><option value="N/A">Seleccione la personeria</option></select>');
								$('#div_sel_doc').html('<?=$select_doc;?>');
								$('#n_documento').val(aux[1]);
								$('#n_documento').addClass('validate[required,]');
								$('.wrap_hum').show();
								$('.wrap_jur').hide();
							} else {
								$('#div_sel_personeria').html('<select id="sel_personeria" name="sel_personeria" class="input-sm form-control"><option value="J">Jurídica</option></select>');
								$('#div_sel_forma_jur').html('<?=$select_jur;?>');
								$('#div_sel_doc').html('<select id="sel_documento" name="sel_documento" class="input-sm form-control"><option value="N/A">Seleccione la personeria</option></select>');
								$('#n_documento').val('');
								$('#n_documento').removeClass('validate[required,]');
								$('.wrap_hum').hide();
								$('.wrap_jur').show();
							}
							
							$('#d_denominacion').attr('readonly',false);
							$('#d_denominacion').attr('disabled',false);
							$('#sel_personeria').attr('readonly',false);
							$('#sel_personeria').attr('disabled',false);
							$('#sel_forma_jur').attr('readonly',false);
							$('#sel_forma_jur').attr('disabled',false);
							$('#sel_documento').attr('readonly',false);
							$('#sel_documento').attr('disabled',false);
							$('#n_documento').attr('readonly',false);
							$('#n_documento').attr('disabled',false);
							$('#n_telefono').attr('readonly',false);
							$('#n_telefono').attr('disabled',false);
							$('#d_mail').attr('readonly',false);
							$('#d_mail').attr('disabled',false);
							
							$('#n_telefono').removeClass('validate[required,custom[phone]]');	// esto es para evitar que agregue la clase 2 veces
							$('#d_mail').removeClass('validate[required,custom[email]]');
							$('#n_telefono').addClass('validate[required,custom[phone]]');
							$('#d_mail').addClass('validate[required,custom[email]]');
						}

						// Reinicio todos los select
						$('#div_sel_provincia').html('<?=$select_prov;?>');
						$('#div_sel_departamento').html('<select id="sel_departamento" name="sel_departamento" class="input-sm form-control"><option value="N/A">Seleccione la Provincia</option></select>');
						$('#div_sel_localidad').html('<select id="sel_localidad" name="sel_localidad" class="input-sm form-control"><option value="N/A">Seleccione el Departamento</option></select>');
						
						$('#div_sel_doc_int').html('<?=$select_doc_int;?>');
						$('#div_sel_caracter').html('<?=$select_caracter;?>');
						$('#div_sel_tipo_res').html('<?=$select_tipo_res;?>');
						$('#div_sel_cargo').html('<?=$select_cargo;?>');
						$('#div_sel_prov_int').html('<?=$select_prov_int;?>');
						$('#div_sel_dep_int').html('<select id="sel_dep_int" name="sel_dep_int" class="input-sm form-control"><option value="N/A">Seleccione la Provincia</option></select>');
						$('#div_sel_loc_int').html('<select id="sel_loc_int" name="sel_loc_int" class="input-sm form-control"><option value="N/A">Seleccione el Departamento</option></select>');
						
						$('#div_sel_ente').html('<?=$select_ente;?>');
						$('#div_sel_delegacion').html('<select id="sel_delegacion" name="sel_delegacion" class="input-sm form-control"><option value="N/A">Seleccione el Ente</option></select>');
						$('#div_sel_tipo_mul').html('<select id="sel_tipo_mul" name="sel_tipo_mul" class="input-sm form-control"><option value="N/A">Seleccione el Organismo</option></select>');
						$('#div_sel_multa').html('<select id="sel_multa" name="sel_multa" class="input-sm form-control"><option value="N/A">Seleccione la fecha de generación</option></select>');
					}
				});
			} else {
				// Reinicio todos los select
				$('#div_sel_personeria').html('<select id="sel_personeria" name="sel_personeria" class="input-sm form-control"><option value="N/A">Ingrese el nro. de CUIT</option></select>');
				$('#div_sel_forma_jur').html('<select id="sel_forma_jur" name="sel_forma_jur" class="input-sm form-control"><option value="N/A">Seleccione la personeria</option></select>');
				$('#div_sel_doc').html('<select id="sel_documento" name="sel_documento" class="input-sm form-control"><option value="N/A">Seleccione la personeria</option></select>');
				
				$('#div_sel_provincia').html('<?=$select_prov;?>');
				$('#div_sel_departamento').html('<select id="sel_departamento" name="sel_departamento" class="input-sm form-control"><option value="N/A">Seleccione la Provincia</option></select>');
				$('#div_sel_localidad').html('<select id="sel_localidad" name="sel_localidad" class="input-sm form-control"><option value="N/A">Seleccione el Departamento</option></select>');
				
				$('#div_sel_doc_int').html('<?=$select_doc_int;?>');
				$('#div_sel_caracter').html('<?=$select_caracter;?>');
				$('#div_sel_tipo_res').html('<?=$select_tipo_res;?>');
				$('#div_sel_cargo').html('<?=$select_cargo;?>');
				$('#div_sel_prov_int').html('<?=$select_prov_int;?>');
				$('#div_sel_dep_int').html('<select id="sel_dep_int" name="sel_dep_int" class="input-sm form-control"><option value="N/A">Seleccione la Provincia</option></select>');
				$('#div_sel_loc_int').html('<select id="sel_loc_int" name="sel_loc_int" class="input-sm form-control"><option value="N/A">Seleccione el Departamento</option></select>');
				
				$('#div_sel_ente').html('<?=$select_ente;?>');
				$('#div_sel_delegacion').html('<select id="sel_delegacion" name="sel_delegacion" class="input-sm form-control"><option value="N/A">Seleccione el Ente</option></select>');
				$('#div_sel_tipo_mul').html('<select id="sel_tipo_mul" name="sel_tipo_mul" class="input-sm form-control"><option value="N/A">Seleccione el Organismo</option></select>');
				$('#div_sel_multa').html('<select id="sel_multa" name="sel_multa" class="input-sm form-control"><option value="N/A">Seleccione la fecha de generación</option></select>');
				
				// blanqueo los input
				$('.input-sm').val('');
				$('#id_contrib').val('');
				$('#id_contrib_int').val('');
				
				// acomodo el formulario de contribuyente
				$('#n_documento').removeClass('validate[required,custom[onlyIntNumber]]');
				$('#n_telefono').removeClass('validate[required,custom[phone]]');
				$('#d_mail').removeClass('validate[required,custom[email]]');
				$('#d_denominacion').attr('readonly',false);
				$('#d_denominacion').attr('disabled',false);
				$('#sel_personeria').attr('readonly',false);
				$('#sel_personeria').attr('disabled',false);
				$('#sel_forma_jur').attr('readonly',false);
				$('#sel_forma_jur').attr('disabled',false);
				$('#sel_documento').attr('readonly',false);
				$('#sel_documento').attr('disabled',false);
				$('#n_documento').attr('readonly',false);
				$('#n_documento').attr('disabled',false);
				$('#n_telefono').attr('readonly',false);
				$('#n_telefono').attr('disabled',false);
				$('#d_mail').attr('readonly',false);
				$('#d_mail').attr('disabled',false);
				$('.wrap_jur').hide();
				$('.wrap_hum').hide();
			}
		});
	
		$('#n_cuit_int').focusout(function(){
            var patt = /\d{2}-\d{8}-\d{1}/g;
            var valida_cuit_completo = patt.test($("#n_cuit_int").val());
			/*var valida_cuit_completo = $("#n_cuit_int").val().indexOf('_');*/
			if(valida_cuit_completo && $("#n_cuit_int").val() != '' && $("#n_cuit_int").val() != '--'){
				var aux = $("#n_cuit_int").val().split('-');
				var cuit_sin_guiones = aux[0]+aux[1]+aux[2];
				
				if (aux[0] > 29){
					mostrar_cuadro('I','Validación','Debe ingresar un CUIT de persona humana.');
					$('#n_cuit_int').val('');
					$('.integrantes').val('');
					$('#id_contrib_int').val('');
					
					// reiniciar todos los select
					$('#div_sel_doc_int').html('<?=$select_doc_int;?>');
					$('#div_sel_caracter').html('<?=$select_caracter;?>');
					$('#div_sel_tipo_res').html('<?=$select_tipo_res;?>');
					$('#div_sel_cargo').html('<?=$select_cargo;?>');
					$('#div_sel_prov_int').html('<?=$select_prov_int;?>');
					$('#div_sel_dep_int').html('<select id="sel_dep_int" name="sel_dep_int" class="input-sm form-control"><option value="N/A">Seleccione la Provincia</option></select>');
					$('#div_sel_loc_int').html('<select id="sel_loc_int" name="sel_loc_int" class="input-sm form-control"><option value="N/A">Seleccione el Departamento</option></select>');
					
					$('#d_deno_int').attr('readonly',false);
					$('#d_deno_int').attr('disabled',false);
					$('#sel_doc_int').attr('readonly',false);
					$('#sel_doc_int').attr('disabled',false);
					$('#sel_prov_int').attr('readonly',false);
					$('#sel_prov_int').attr('disabled',false);
					$('#sel_dep_int').attr('readonly',false);
					$('#sel_dep_int').attr('disabled',false);
					$('#sel_loc_int').attr('readonly',false);
					$('#sel_loc_int').attr('disabled',false);
					$('#n_doc_int').attr('readonly',false);
					$('#n_doc_int').attr('disabled',false);
					$('#d_calle_int').attr('readonly',false);
					$('#d_calle_int').attr('disabled',false);
					$('#n_calle_int').attr('readonly',false);
					$('#n_calle_int').attr('disabled',false);
					$('#n_piso_int').attr('readonly',false);
					$('#n_piso_int').attr('disabled',false);
					$('#d_dpto_int').attr('readonly',false);
					$('#d_dpto_int').attr('disabled',false);
					$('#d_puerta_int').attr('readonly',false);
					$('#d_puerta_int').attr('disabled',false);
					$('#d_oficina_int').attr('readonly',false);
					$('#d_oficina_int').attr('disabled',false);
                    $('#c_postal_int').attr('readonly',false);
                    $('#c_postal_int').attr('disabled',false);
				} else {
					$('#main').procOverlay({visible:true});
					
					$.ajax({
						url:'liq_multa_oe/ajax/ajax_operaciones.php',
						type:"POST",
						data:{
							"oper": "contrib_int",
							"n_cuit": cuit_sin_guiones
						},
						async:false,
						dataType: 'json',
						success: function(ret) {
							$('#main').procOverlay({visible:true});
						
							$('.integrantes').val('');
							$('#id_contrib_int').val('');
							
							if (ret.id_contribuyente) {
								$('#d_deno_int').val(ret.d_denominacion);
								$('#d_deno_int').attr('readonly',true);
								$('#d_deno_int').attr('disabled',true);
								$('#id_contrib_int').val(ret.id_contribuyente);
								$('#div_sel_doc_int').html('<select id="sel_doc_int" name="sel_doc_int" class="input-sm form-control"><option value="'+ret.c_tipo_doc+'">'+ret.d_tipo_doc+'</option></select>');
								$('#sel_doc_int').attr('readonly',true);
								$('#sel_doc_int').attr('disabled',true);
								$('#div_sel_prov_int').html('<select id="sel_prov_int" name="sel_prov_int" class="input-sm form-control"><option value="'+ret.c_provincia+'">'+ret.d_provincia+'</option></select>');
								$('#sel_prov_int').attr('readonly',true);
								$('#sel_prov_int').attr('disabled',true);
								$('#div_sel_dep_int').html('<select id="sel_dep_int" name="sel_dep_int" class="input-sm form-control"><option value="'+ret.c_departamento+'">'+ret.d_departamento+'</option></select>');
								$('#sel_dep_int').attr('readonly',true);
								$('#sel_dep_int').attr('disabled',true);
								$('#div_sel_loc_int').html('<select id="sel_loc_int" name="sel_loc_int" class="input-sm form-control"><option value="'+ret.c_localidad+'">'+ret.d_localidad+'</option></select>');
								$('#sel_loc_int').attr('readonly',true);
								$('#sel_loc_int').attr('disabled',true);
								$('#n_doc_int').val(ret.n_documento);
								$('#n_doc_int').attr('readonly',true);
								$('#n_doc_int').attr('disabled',true);
								$('#d_calle_int').val(ret.d_calle);
								$('#d_calle_int').attr('readonly',true);
								$('#d_calle_int').attr('disabled',true);
								$('#n_calle_int').val(ret.n_numero);
								$('#n_calle_int').attr('readonly',true);
								$('#n_calle_int').attr('disabled',true);
								$('#n_piso_int').val(ret.d_piso);
								$('#n_piso_int').attr('readonly',true);
								$('#n_piso_int').attr('disabled',true);
								$('#d_dpto_int').val(ret.d_depto);
								$('#d_dpto_int').attr('readonly',true);
								$('#d_dpto_int').attr('disabled',true);
								$('#d_puerta_int').val(ret.d_puerta);
								$('#d_puerta_int').attr('readonly',true);
								$('#d_puerta_int').attr('disabled',true);
								$('#d_oficina_int').val(ret.d_oficina);
								$('#d_oficina_int').attr('readonly',true);
								$('#d_oficina_int').attr('disabled',true);
                                $('#c_postal_int').val(ret.c_postal);
                                $('#c_postal_int').attr('readonly',true);
                                $('#c_postal_int').attr('disabled',true);
							} else {
								$('#n_doc_int').val(aux[1]);
								$('#div_sel_doc_int').html('<?=$select_doc_int;?>');
								$('#div_sel_caracter').html('<?=$select_caracter;?>');
								$('#div_sel_tipo_res').html('<?=$select_tipo_res;?>');
								$('#div_sel_cargo').html('<?=$select_cargo;?>');
								$('#div_sel_prov_int').html('<?=$select_prov_int;?>');
								$('#div_sel_dep_int').html('<select id="sel_dep_int" name="sel_dep_int" class="input-sm form-control"><option value="N/A">Seleccione la Provincia</option></select>');
								$('#div_sel_loc_int').html('<select id="sel_loc_int" name="sel_loc_int" class="input-sm form-control"><option value="N/A">Seleccione el Departamento</option></select>');
							
								$('#d_deno_int').attr('readonly',false);
								$('#d_deno_int').attr('disabled',false);
								$('#sel_doc_int').attr('readonly',false);
								$('#sel_doc_int').attr('disabled',false);
								$('#sel_prov_int').attr('readonly',false);
								$('#sel_prov_int').attr('disabled',false);
								$('#sel_dep_int').attr('readonly',false);
								$('#sel_dep_int').attr('disabled',false);
								$('#sel_loc_int').attr('readonly',false);
								$('#sel_loc_int').attr('disabled',false);
								$('#n_doc_int').attr('readonly',false);
								$('#n_doc_int').attr('disabled',false);
								$('#d_calle_int').attr('readonly',false);
								$('#d_calle_int').attr('disabled',false);
								$('#n_calle_int').attr('readonly',false);
								$('#n_calle_int').attr('disabled',false);
								$('#n_piso_int').attr('readonly',false);
								$('#n_piso_int').attr('disabled',false);
								$('#d_dpto_int').attr('readonly',false);
								$('#d_dpto_int').attr('disabled',false);
								$('#d_puerta_int').attr('readonly',false);
								$('#d_puerta_int').attr('disabled',false);
								$('#d_oficina_int').attr('readonly',false);
								$('#d_oficina_int').attr('disabled',false);
                                $('#c_postal_int').attr('readonly',false);
                                $('#c_postal_int').attr('disabled',false);
							}
						}
					});
				}
			} else {
				$('#n_cuit_int').val('');
				$('.integrantes').val('');
				$('#id_contrib_int').val('');
				
				// reiniciar todos los select
				$('#div_sel_doc_int').html('<?=$select_doc_int;?>');
				$('#div_sel_caracter').html('<?=$select_caracter;?>');
				$('#div_sel_tipo_res').html('<?=$select_tipo_res;?>');
				$('#div_sel_cargo').html('<?=$select_cargo;?>');
				$('#div_sel_prov_int').html('<?=$select_prov_int;?>');
				$('#div_sel_dep_int').html('<select id="sel_dep_int" name="sel_dep_int" class="input-sm form-control"><option value="N/A">Seleccione la Provincia</option></select>');
				$('#div_sel_loc_int').html('<select id="sel_loc_int" name="sel_loc_int" class="input-sm form-control"><option value="N/A">Seleccione el Departamento</option></select>');
				
				$('#d_deno_int').attr('readonly',false);
				$('#d_deno_int').attr('disabled',false);
				$('#sel_doc_int').attr('readonly',false);
				$('#sel_doc_int').attr('disabled',false);
				$('#sel_prov_int').attr('readonly',false);
				$('#sel_prov_int').attr('disabled',false);
				$('#sel_dep_int').attr('readonly',false);
				$('#sel_dep_int').attr('disabled',false);
				$('#sel_loc_int').attr('readonly',false);
				$('#sel_loc_int').attr('disabled',false);
				$('#n_doc_int').attr('readonly',false);
				$('#n_doc_int').attr('disabled',false);
				$('#d_calle_int').attr('readonly',false);
				$('#d_calle_int').attr('disabled',false);
				$('#n_calle_int').attr('readonly',false);
				$('#n_calle_int').attr('disabled',false);
				$('#n_piso_int').attr('readonly',false);
				$('#n_piso_int').attr('disabled',false);
				$('#d_dpto_int').attr('readonly',false);
				$('#d_dpto_int').attr('disabled',false);
				$('#d_puerta_int').attr('readonly',false);
				$('#d_puerta_int').attr('disabled',false);
				$('#d_oficina_int').attr('readonly',false);
				$('#d_oficina_int').attr('disabled',false);
                $('#c_postal_int').attr('readonly',false);
                $('#c_postal_int').attr('disabled',false);
			}
		});
	})
</script>

<?php
	require_once(INTRANET."footer.php");
?>