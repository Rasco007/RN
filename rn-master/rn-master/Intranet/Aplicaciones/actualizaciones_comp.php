<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$p_tributo = $_POST['p_tributo'];
$p_concepto = $_POST['p_concepto'];
$p_anio_masiv = $_POST['p_anio'];
$p_cuota_masiv = $_POST['p_cuota'];
$p_id_workflow_log = $_POST['p_id_workflow_log'];
$p_c_tarea = $_POST['p_c_tarea'];



$fecha_hoy = date('d/m/Y');
include('actualizaciones_comp/html/principal.html');
?>
    <script type='text/javascript' src='actualizaciones_comp/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='actualizaciones_comp/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='actualizaciones_comp/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

    <script>
        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var p_tributo = '<?=$p_tributo?>';
        var p_concepto = '<?=$p_concepto?>';
        var p_anio_masiv = '<?=$p_anio_masiv?>';
        var p_cuota_masiv = '<?=$p_cuota_masiv?>';
        var v_id_workflow_log = '<?=$p_id_workflow_log ?>';
        var v_c_tarea = '<?=$p_c_tarea?>';
        var v_filtro_buscado = false;

        var compensaciones_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            m_autoquery:'N',
            param: {}
        });

        $(document).ready(function() {
            inicializarGrillas();
            inicializarEventos();
        });
    </script>


<?php
require_once(INTRANET."footer.php");
?>