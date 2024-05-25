<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_tributo = $_POST['p_tributo'];
$p_id_menu = $_POST['p_n_id_menu'];



$fecha_hoy = date('d/m/Y');
include('workflow_gi/html/principal.html');
?>
    <script type='text/javascript' src='workflow_general/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='workflow_gi/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='workflow_gi/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='workflow_general/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

    <script>
        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var p_tributo = '<?=$p_tributo?>';
        var lista_tributos = '<?=fun_id_lista('TRIBUTOS DE EMISION MASIVA')?>';
        var lista_conceptos = '<?=fun_id_lista('LISTADO DE CONCEPTOS POR TRIBUTO')?>';
        var v_id_workflow_log;
        var v_filtro_buscado = false;

        var workflow_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            m_autoquery:'N',
            param: {}
        });

        $(document).ready(function() {
            inicializarGrillas();
            inicializarEventos();
            inicializarFiltro();
        });
    </script>


<?php
require_once(INTRANET."footer.php");
?>