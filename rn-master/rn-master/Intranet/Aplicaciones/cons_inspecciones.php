<?php
$p_n_id_menu = $_POST['p_n_id_menu'];
require_once(INTRANET."header.php");
include('cons_inspecciones/html/principal.html');
?>

<script type='text/javascript' src='cons_inspecciones/js/grillas.js'></script>
<script>
    var datos_main_grid = new GridParam({
        id_menu:<?=$p_n_id_menu?>,
        n_grid:0,
        n_orden:0,
        m_autoquery:'S',
        param:{}
    });

    $(document).ready(function () {
        inicializarGrillas();
    });
</script>

<?php
require_once(INTRANET."footer.php");
?>
