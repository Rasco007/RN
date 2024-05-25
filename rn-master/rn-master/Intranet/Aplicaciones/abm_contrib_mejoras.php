<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$lista_consorcios = fun_id_lista('CONSORCIOS');
$lista_conceptos = fun_id_lista('CONSORCIOS CONCEPTOS MEJORAS');
$lista_regiones_consorcio = fun_id_lista('REGIONES POR TIPO DE CONSORCIO');
$lista_areas_consorcio = fun_id_lista('AREAS POR TIPO DE CONSORCIO');
$lista_partidas = fun_id_lista('LISTADO PARTIDAS MEJORA INDIVIDUAL INTRANET');

$db_query = new DB_Query("
    SELECT FUN_TIENE_PERMISO('AUTH_MEJ_CANON_MASIVA',:c_usuario) m_mejora_masiva from dual");

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
    var v_lista_regiones_consorcio = '<?=$lista_regiones_consorcio?>';
    var v_lista_areas_consorcio = '<?=$lista_areas_consorcio?>';
    var v_lista_partidas = '<?=$lista_partidas?>';
    
    var m_mejora_masiva = '<?=$m_mejora_masiva?>';

</script>

<script type='text/javascript' src='abm_contrib_mejoras/js/funciones.js'></script>
<script type='text/javascript' src='abm_contrib_mejoras/js/abm_contrib_mejoras.js'></script>

<?php
require_once(INTRANET."footer.php");
?>