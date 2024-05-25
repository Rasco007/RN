<?php
    $p_n_id_menu = $_POST['p_n_id_menu'];
	$m_autoquery = $_POST['p_m_autoquery'];
	require_once(INTRANET."header.php");

	$p_id_evento = $_POST['p_id_evento'];
	// $p_sin_restricciones=$_POST['p_sin_restricciones'];
	// $p_tributo=$_POST['p_tributo'];

	$lista_objetos = fun_id_lista('LISTA OBJETOS EMISION LIBRE DEUDA');
	$lista_delegaciones = fun_id_lista('LISTADO DE DELEGACIONES');

	include('emision_libre_deuda/html/filtros.html');

	$db_query = new DB_query(
		"SELECT trunc(sysdate) as f_emision,
			(SELECT max(f_remesa)
			from remitos
			where c_banco = '97'
			and c_archivo = obtener_constante('TARCH_INM')) as f_rendicion_inm,
			(SELECT max(f_remesa)
			from remitos
			where c_banco = '97'
			and c_archivo = obtener_constante('TARCH_IBD')) as f_rendicion_ib,
			(SELECT max(f_remesa)
			from remitos
			where c_banco = '97'
			and c_archivo = obtener_constante('TARCH_IB')) as f_rendicion_sil,
			(SELECT max(f_remesa)
			from remitos
			where c_banco = '97'
			and c_archivo = obtener_constante('TARCH_SELLOS')) as f_rendicion_sellos,
			(SELECT max(f_remesa)
			from remitos
			where c_banco = '97'
			and c_archivo = obtener_constante('TARCH_AUTO')) as f_rendicion_auto,
			(SELECT max(f_remesa)
			from remitos
			where  c_banco = '0'
			and    c_archivo = obtener_constante('TARCH_PVCJE')) as f_rendicion_con
		FROM dual");
	$row = $db_query->do_query();

	$f_emision = $row[0]['F_EMISION'];
	$f_rendicion_inm = $row_query[0]['F_RENDICION_INM'];
	$f_rendicion_ib = $row_query[0]['F_RENDICION_IB'];
	$f_rendicion_sil = $row_query[0]['F_RENDICION_SIL'];
	$f_rendicion_sellos = $row_query[0]['F_RENDICION_SELLOS'];
	$f_rendicion_auto = $row_query[0]['F_RENDICION_AUTO'];
	$f_rendicion_con = $row[0]['F_RENDICION_CON'];

	switch ($p_n_id_menu){
		case 10905: // Emisión de Solicitud de Libre de Deuda
			$lista_tributos = fun_id_lista('LISTA TRIBUTOS SOLICITUD LIBRE DEUDA');	
			$lista_motivos = fun_id_lista('LISTADO MOTIVOS SOLICITUD LIBRE DEUDA');

			$js = 'solicitud';
			include('emision_libre_deuda/solicitud/principal.html');
			break;

		case 10907: // Emisión de certificado de deuda de IIBB
			$lista_tributos = fun_id_lista('LISTA TRIBUTOS CERTIFICADO LD IIBB');
			$lista_motivos = fun_id_lista('LISTADO MOTIVOS CERTIFICADO LD IIBB');

			$js = 'cert_iibb';
			include('emision_libre_deuda/cert_iibb/principal.html');
			break;
		case 10908: // Emisión de Certificado de Deuda de Inmueble
			$lista_tributos = fun_id_lista('LISTA TRIBUTOS CERTIFICADO LD INMO');
			$lista_objetos = fun_id_lista('LISTA OBJETOS CERTIFICADO LD INMO');
			$lista_motivos = fun_id_lista('LISTADO MOTIVOS CERTIFICADO LD INMO');

			$js = 'cert_inmo';
			include('emision_libre_deuda/cert_inmo/principal.html');
			break;
	}

	include('emision_libre_deuda/html/footer.html');
?>

<script type="text/javascript">
	var v_lista_tributos = '<?=$lista_tributos?>';
	var v_lista_objetos = '<?=$lista_objetos?>';
	var v_lista_motivos = '<?=$lista_motivos?>';
	var v_lista_delegaciones = '<?=$lista_delegaciones?>';

    var n_id_menu = '<?=$p_n_id_menu?>';
    var p_id_evento = '<?=$p_id_evento?>';
    var f_emision = '<?=$f_emision?>';

	var v_d_menu = '<?=$js?>';
	var script;

	var ajax_autocomplete = null;

	// Incluir dinamicamente eventos.js
	script = document.createElement( "script" );
	script.type = "text/javascript";
	switch (v_d_menu){
		case 'solicitud':
			script.src = 'emision_libre_deuda/solicitud/eventos.js';
		break;
		case 'cert_iibb':
			script.src = 'emision_libre_deuda/cert_iibb/eventos.js';
		break;
		case 'cert_inmo':
			script.src = 'emision_libre_deuda/cert_inmo/eventos.js';
		break;
	}
	document.getElementsByTagName('head')[0].appendChild(script);

	// Incluir dinamicamente funciones.js
	script = document.createElement( "script" );
	script.type = "text/javascript";
	switch (v_d_menu){
		case 'solicitud':
			script.src = 'emision_libre_deuda/solicitud/funciones.js';
		break;
		case 'cert_iibb':
			script.src = 'emision_libre_deuda/cert_iibb/funciones.js';
		break;
		case 'cert_inmo':
			script.src = 'emision_libre_deuda/cert_inmo/funciones.js';
		break;
	}
	document.getElementsByTagName('head')[0].appendChild(script);

</script>

<?php
    require_once(INTRANET."footer.php");
?>