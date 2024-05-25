<?php
require_once(FRAMEWORK_DIR . "header.php");

$p_n_id_menu = $_POST['p_n_id_menu'];
$n_id_lote = -time();

include('procesamiento_envios_SIFERE/html/principal.html');
?>

<script type="text/javascript" src="<?=JS_FRAMEWORK_PROY?>dropzone.js"></script>
<link rel="stylesheet" type="text/css" href="procesamiento_envios_SIFERE/css/dropzone.css">
<script type="text/javascript" src="procesamiento_envios_SIFERE/js/eventos.js?no_cache=<?= date('dmyhis') ?>"></script>
<script type="text/javascript" src="procesamiento_envios_SIFERE/js/funciones.js?no_cache=<?= date('dmyhis') ?>"></script>

<script type="text/javascript">
    var v_n_id_menu = '<?= $p_id_menu ?>';
    var v_n_id_lote = '<?= $n_id_lote ?>';
	var dropzoneInstance;

	Dropzone.autoDiscover = false;

    $(document).ready(function () {
        inicializarEventos();
    });
</script>

<?php
require_once(FRAMEWORK_DIR . "footer.php");
?>