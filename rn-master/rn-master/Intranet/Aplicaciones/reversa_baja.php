<?php
require_once(INTRANET."header.php");

$p_id_menu = $_POST['p_n_id_menu'];
$p_usuario = $_SESSION['usuario'];

include('reversa_baja/html/principal.html');
?>
<link rel="stylesheet" type="text/css" href="reversa_baja/css/estilos.css">
<script type="text/javascript" src="reversa_baja/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="reversa_baja/js/funciones.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">
	var v_id_menu = '<?=$p_id_menu?>';
	var v_usuario = '<?=$p_usuario?>';
	var ajax_autocomplete = null;

	$(document).ready(function () {
		init_eventos();
	});

</script>
<?php
require_once(INTRANET."footer.php");
?>
