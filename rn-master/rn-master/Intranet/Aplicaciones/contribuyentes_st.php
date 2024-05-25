<?php
    $p_n_id_menu = $_POST['p_n_id_menu'];
	$m_autoquery = $_POST['p_m_autoquery'];
	require_once(INTRANET."header.php");

	$lista_tipo_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');

	$p_modo=$_POST['p_modo'];
	$p_id_contribuyente=$_POST['p_id_contribuyente'];
	// VERIFICAR USO
	$p_objeto_viejo=$_POST['p_objeto_viejo'];
	$p_permite_vs_ag=$_POST['p_permite_vs_ag'];
	$p_sintributo=$_POST['p_sintributo'];

	include('contribuyentes_st/html/principal.html');
?>

<link rel="stylesheet" type="text/css" href="contribuyentes_st/css/estilos.css">
<script type="text/javascript" src="contribuyentes_st/js/eventos.js?"></script>

<script type="text/javascript">
	var v_lista_tipo_documentos = '<?=$lista_tipo_documentos?>';

    var n_id_menu = '<?=$p_n_id_menu?>';
    var p_objeto_viejo = '<?=$p_objeto_viejo?>';
    var p_permite_vs_ag = '<?=$p_permite_vs_ag?>';
    var p_sintributo = '<?=$p_sintributo?>';
	var ajax_autocomplete = null;

	var v_cuit;
	var v_documento;
	var v_tipo_documento;

</script>

<?php
    require_once(INTRANET."footer.php");
?>