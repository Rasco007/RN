<?php
	require_once(INTRANET."header.php");

	$m_autoquery = $_POST['p_m_autoquery'];
	$p_id_menu = $_POST['p_n_id_menu'];

	#HTML PRINCIPAL
	include('list_reca_telepeaje/html/list_reca_telepeaje.html');
?>

<script>
    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
</script>

<script type='text/javascript' src='list_reca_telepeaje/js/funciones.js'></script>
<script type='text/javascript' src='list_reca_telepeaje/js/list_reca_telepeaje.js'></script>

<?php
	require_once(INTRANET."footer.php");
?>