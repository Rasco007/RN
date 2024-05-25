<?php
require_once(INTRANET."header.php");

$p_n_id_menu = $_POST['p_n_id_menu'];
$m_autoquery = $_POST['p_m_autoquery'];

#HTML PRINCIPAL
include('abm_workflow/html/principal.html');
?>
    <style>

    </style>
    <script type='text/javascript' src='abm_workflow/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='abm_workflow/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='abm_workflow/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var v_id_menu = '<?=$p_n_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var v_lista_eventos = '<?=fun_id_lista('LISTADO DE EVENTOS WORKFLOW')?>';
        var v_lista_menues = '<?=fun_id_lista('LISTADO DE CODIGO DE MENUES')?>';
        var v_lista_tipo_tareas = '<?=fun_id_lista('LISTADO DE TIPOS DE TAREA WORKFLOW')?>';
        var v_lista_tareas_ant = '<?=fun_id_lista('LISTADO DE TAREAS ANTERIORES WORKFLOW')?>';
        var v_lista_parametros_tarea = '<?=fun_id_lista('LISTADO DE TIPOS DE PARAMETROS WORKFLOW')?>';
        var v_lista_tributos = '<?=fun_id_lista('LISTADO DE TRIBUTOS')?>';
        var v_lista_conceptos = '<?=fun_id_lista('LISTADO DE CONCEPTOS POR TRIBUTO')?>';
        
        var v_c_workflow;
        var v_c_tarea;
        var workflow_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid: 0,
            m_autoquery: v_m_autoquery
        });

        var tareas_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid: 1,
            m_autoquery: 'N'
        });

        var tributos_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid: 2,
            m_autoquery: 'N'
        });

        var parametros_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid: 3,
            m_autoquery: 'N'
        });

        $(document).ready(function() {
            inicializarGrillas();
            inicializarEventos();
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?>