<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$lista_indices = fun_id_lista("LISTADO DE INDICES");

#HTML PRINCIPAL
include('calculadora_interes/html/calculadora_interes.html');
?>

<style type="text/css">
	input {
		font-size: 15px !important;
		font-weight: bold;
		height: 30px !important;
	}	
</style>

<script>

    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var lista_indices = '<?=$lista_indices?>';

</script>

<script type='text/javascript' src='calculadora_interes/js/funciones.js'></script>

<?php
require_once(INTRANET."footer.php");
?>