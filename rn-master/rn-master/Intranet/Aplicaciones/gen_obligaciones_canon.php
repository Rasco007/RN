<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$lista_conceptos = fun_id_lista('LISTADO CONCEPTOS LIQ CANON RIEGO');
$lista_regiones = fun_id_lista('CONSORCIOS REGIONES');
$lista_areas = fun_id_lista('CONSORCIOS AREAS');
$lista_objetos = fun_id_lista('LISTADO PARTIDAS RIEGO X CONTRIB');

$db_query = new DB_Query(
	"SELECT c_tributo, d_descrip from tributos
	where c_tipo_imponible='16' and c_tributo=160");
$row_query = $db_query->do_query();
$c_tributo = $row_query[0]['C_TRIBUTO'];
$d_descrip = $row_query[0]['D_DESCRIP'];

#HTML PRINCIPAL
include('gen_obligaciones_canon/html/gen_obligaciones_canon.html');
?>

<style>
	fieldset{
		margin: 5px 15px; border: 1px solid #156690;
	}
	legend{
		font-size: 15px; width: auto; padding-left: 2px; padding-right: 2px; border-bottom: none;
	}
	center > label{
		vertical-align: center; margin-left: 5px; margin-right: 20px;
	}
</style>

<script>

    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var v_lista_conceptos = '<?=$lista_conceptos?>';
    var v_lista_regiones = '<?=$lista_regiones?>';
    var v_lista_areas = '<?=$lista_areas?>';
    var v_lista_objetos = '<?=$lista_objetos?>';
    var v_c_tributo = '<?=$c_tributo?>';
    var v_d_descrip = '<?=$d_descrip?>';
    var ajax_autocomplete = null;

</script>

<script type='text/javascript' src='gen_obligaciones_canon/js/funciones.js'></script>
<script type='text/javascript' src='gen_obligaciones_canon/js/gen_obligaciones_canon.js'></script>

<?php
require_once(INTRANET."footer.php");
?>