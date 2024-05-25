<?php
    $p_n_id_menu = $_POST['p_n_id_menu'];
	$m_autoquery = $_POST['p_m_autoquery'];
	require_once(INTRANET."header.php");

	$p_sin_restricciones=$_POST['p_sin_restricciones'];
	$p_tributo=$_POST['p_tributo'];

	$lista_nomen_part = fun_id_lista('LISTADO DE NOMENCLATURAS-PARTIDAS');
	$lista_motivos = fun_id_lista('LISTADO MOTIVOS LIBRE DEUDA');

	switch ($p_n_id_menu){
		case 10883: // Certificado Único de Libre Deuda - Ley 4798
		case 10897: // Certificado Único de Libre Deuda - Ley 4798 (SR)
			$id_menu_grillas = 10883;
			$js = 'ley_4798';
			include('libre_deuda/ley_4798/principal.html');
			break;
		case 10898: // Certificado Libre de Deuda – Escribanos
		case 10899: // Certificado Libre de Deuda – Escribanos (SR)
			$id_menu_grillas = 10898;
			$js = 'escribanos';
			include('libre_deuda/escribanos/principal.html');
			break;
		case 10900: // Certificado Libre de deuda – Automotor
		case 10901: // Certificado Libre de deuda – Automotor (SR)
		case 10902: // Certificado Libre de Deuda – Inmobiliario
		case 10903: // Certificado Libre de deuda – Inmobiliario (SR)
			$id_menu_grillas = 10900;
			$js = 'auto_inmo';
			include('libre_deuda/auto_inmo/principal.html');
			break;
		case 10904: // Certificado de Excepción de Pago a Cuenta Temporada Turística
		case 10909: // Certificado de Excepción de Pago a Cuenta Temporada Turística (SR)
			$id_menu_grillas = 10898; //reutilizo la parametrizacion
			$js = 'cert_pago_cuenta';
			include('libre_deuda/cert_pago_cuenta/principal.html');
			break;
	}

	include('libre_deuda/html/tabs.html');
?>

<link rel="stylesheet" type="text/css" href="libre_deuda/css/estilos.css">
<script type="text/javascript" src="libre_deuda/js/grillas.js"></script>

<script type="text/javascript">
	var v_lista_motivos = '<?=$lista_motivos?>';
	var v_lista_nomen_part = '<?=$lista_nomen_part?>';

    var n_id_menu = '<?=$p_n_id_menu?>';
    var p_sin_restricciones = '<?=$p_sin_restricciones?>';
    var p_tributo = '<?=$p_tributo?>';

	var ajax_autocomplete = null;
	var c_habilitar;
	var v_id_certificado;
	
	var v_d_menu = '<?=$js?>';
	var id_menu_grillas = '<?=$id_menu_grillas?>';
	var script;

	// Incluir dinamicamente eventos.js
	script = document.createElement( "script" );
	script.type = "text/javascript";
	switch (v_d_menu){
		case 'ley_4798':
			script.src = 'libre_deuda/ley_4798/eventos.js';
		break;
		case 'escribanos':
			script.src = 'libre_deuda/escribanos/eventos.js';
		break;
		case 'auto_inmo':
			script.src = 'libre_deuda/auto_inmo/eventos.js';
		break;
		case 'cert_pago_cuenta':
			script.src = 'libre_deuda/cert_pago_cuenta/eventos.js';
		break;
	}
	document.getElementsByTagName('head')[0].appendChild(script);

	// Incluir dinamicamente funciones.js
	script = document.createElement( "script" );
	script.type = "text/javascript";
	switch (v_d_menu){
		case 'ley_4798':
			script.src = 'libre_deuda/ley_4798/funciones.js';
		break;
		case 'escribanos':
			script.src = 'libre_deuda/escribanos/funciones.js';
		break;
		case 'auto_inmo':
			script.src = 'libre_deuda/auto_inmo/funciones.js';
		break;
		case 'cert_pago_cuenta':
			script.src = 'libre_deuda/cert_pago_cuenta/funciones.js';
		break;
	}
	document.getElementsByTagName('head')[0].appendChild(script);


</script>

<?php
    require_once(INTRANET."footer.php");
?>