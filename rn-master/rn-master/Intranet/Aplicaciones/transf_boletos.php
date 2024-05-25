<?php
    $p_n_id_menu = $_POST['p_n_id_menu'];
	$m_autoquery = $_POST['p_m_autoquery'];
	require_once(INTRANET."header.php");

	$p_tributo = $_POST['p_tributo'];
	$p_uso = $_POST['p_uso'];
	$p_sin_restricciones = $_POST['p_sin_restricciones'];
	$p_id_contribuyente = $_POST['p_id_contribuyente'];

	$db_query = new DB_Query(
		"SELECT
			obtener_constante('TRAUTOMOTOR') auto,
			obtener_constante('TRINMOBILIARIO') inmo,
			(select c_tipo_imponible from tributos where c_tributo=:p_tributo) c_tipo_imponible
	    from dual");

	$par = array(':p_tributo' => $p_tributo);
	$row_query = $db_query->do_query($par);
	$tributo_auto = $row_query[0]['AUTO']; //90
	$tributo_inmo = $row_query[0]['INMO']; //60
	$c_tipo_imponible = $row_query[0]['C_TIPO_IMPONIBLE']; //10 o 5

	if($p_tributo == $tributo_auto){
		$lista_objetos = fun_id_lista('LISTA PATENTES TRANSFERENCIAS');
	}else{
		$lista_objetos = fun_id_lista('LISTA PARTIDAS TRANSFERENCIAS');
	}

	$lista_dominios_ant = fun_id_lista('LISTA PATENTES_ANT TRANSFERENCIAS');
	$lista_tipo_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
	$lista_domicilios = fun_id_lista('TIPOS DOMICILIOS Y DOMICILIO X CONTRIB');
	$lista_motivos = fun_id_lista('LISTA MOTIVOS TRANSFERENCIA');
	$lista_rnpa = fun_id_lista('LISTA RNPA');
	$lista_delegaciones = fun_id_lista('LISTADO DELEGACIONES TRANSFERENCIA');


	include('transf_boletos/html/principal.html');
?>

<script type="text/javascript" src="transf_boletos/js/funciones.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="transf_boletos/js/eventos.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">
	var v_lista_objetos = '<?=$lista_objetos?>';
	var v_lista_dom_ant = '<?=$lista_dominios_ant?>';
	var v_lista_tipo_documentos = '<?=$lista_tipo_documentos?>';
	var v_lista_domicilios = '<?=$lista_domicilios?>';
	var v_lista_motivos = '<?=$lista_motivos?>';
	var v_lista_rnpa = '<?=$lista_rnpa?>';
	var v_lista_delegaciones = '<?=$lista_delegaciones?>';

    var n_id_menu = '<?=$p_n_id_menu?>';
	var ajax_autocomplete = null;
    var v_id_contribuyente = '<?=$p_id_contribuyente?>';
    var p_tributo = '<?=$p_tributo?>';
    var tributo_auto = '<?=$tributo_auto?>';
    var tributo_inmo = '<?=$tributo_inmo?>';
    var p_tipo_imponible = '<?=$c_tipo_imponible?>';
    var p_uso = '<?=$p_uso?>';
    var p_sin_restricciones = '<?=$p_sin_restricciones?>';

	if(p_tributo == tributo_auto){
		$("#label_objeto").html('Dominio');
		$("#div_verif_dom, #div_dominio_anterior,#div_verif_dom_ant").show();
		$("#div_rnpa").show();
		$("#div_4_minuta").hide();
	}else{
		$("#label_objeto").html('Partida');
		$("#div_nomenclatura_real").show();
		$("#div_4_minuta").show();
		$("#div_rnpa").hide();
	}

    if (p_uso == 'R') {
        $("#div_motivo, #div_rnpa, #div_4_minuta").hide();
    }


</script>

<?php
    require_once(INTRANET."footer.php");
?>