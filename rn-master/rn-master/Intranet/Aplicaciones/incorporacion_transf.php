<?php
require_once(INTRANET."header.php");
include('incorporacion_transf/html/main.html');
$p_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');
?>
    <link rel="stylesheet" type="text/css" href="incorporacion_transf/css/styles.css">
    <script type="text/javascript" src="incorporacion_transf/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="incorporacion_transf/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="incorporacion_transf/js/funciones.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">
        var v_id_menu = '<?=$p_id_menu?>';
        var fecha_hoy = '<?=$fecha_hoy?>';
        var datos_main_grid;
        var flag;

        $(document).ready(function() {
            init_eventos();
            init_grillas();
        });
        
    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
