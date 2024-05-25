<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

#HTML PRINCIPAL
include('gestion_telepeaje/html/gestion_telepeaje.html');
include('gestion_telepeaje/html/modal.html');
?>

<script>

    //VARIABLES GLOBALES
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var ajax_autocomplete = null;

</script>

<script type='text/javascript' src='gestion_telepeaje/js/funciones.js'></script>
<script type='text/javascript' src='gestion_telepeaje/js/gestion_telepeaje.js'></script>

<?php
require_once(INTRANET."footer.php");
?>