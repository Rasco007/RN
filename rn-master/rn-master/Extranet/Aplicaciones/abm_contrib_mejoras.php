<?php
require_once(EXTRANET."header.php");

if($_SESSION['entorno'] == 'EXTRANET'){
    $id_transacc = log_transaction(1057);
}

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$lista_consorcios = fun_id_lista('CONSORCIOS Y DPA EXTRANET');
$lista_conceptos = fun_id_lista('CONSORCIOS CONCEPTOS MEJORAS EXTRANET');
$lista_regiones = fun_id_lista('CONSORCIOS REGIONES POR USUARIO');
$lista_areas = fun_id_lista('CONSORCIOS AREAS POR USUARIO');
$lista_partidas = fun_id_lista('LISTADO PARTIDAS MEJORA INDIVIDUAL EXTRANET');

$db_query = new DB_Query("
    SELECT FUN_TIENE_PERMISO('AUTH_MEJ_CANON_MASIVA_EXT',:c_usuario) m_mejora_masiva from dual");

$param = array(':c_usuario' => $_SESSION['usuario']);
$row_query = $db_query->do_query($param);
$m_mejora_masiva = $row_query[0]['M_MEJORA_MASIVA'];

#HTML PRINCIPAL
include('abm_contrib_mejoras/html/abm_contrib_mejoras.html');
?>

<style>
	.col-md-6 .input-cod-short {
		width: 15% !important;
	}
</style>

<script>

    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var v_lista_consorcios = '<?=$lista_consorcios?>';
    var v_lista_conceptos = '<?=$lista_conceptos?>';
    var v_lista_regiones = '<?=$lista_regiones?>';
    var v_lista_areas = '<?=$lista_areas?>';
    var v_lista_partidas = '<?=$lista_partidas?>';
    
    var m_mejora_masiva = '<?=$m_mejora_masiva?>';

</script>

<script type='text/javascript' src='abm_contrib_mejoras/js/funciones.js'></script>
<script type='text/javascript' src='abm_contrib_mejoras/js/abm_contrib_mejoras.js'></script>

<?php
require_once(EXTRANET."footer.php");
?>