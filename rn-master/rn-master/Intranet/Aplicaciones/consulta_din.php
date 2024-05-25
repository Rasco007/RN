<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$p_id_workflow_log = $_POST['p_id_workflow_log'];
$p_c_tarea = $_POST['p_c_tarea'];
$p_id_cons_dinamica = $_POST['p_id_cons_dinamica'];
$p_parametros_din = $_POST['p_parametros_din'];


$fecha_hoy = date('d/m/Y');
include('consulta_din/html/principal.html');
?>
    <script type='text/javascript' src='consulta_din/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='consulta_din/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='consulta_din/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='workflow_general/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

    <script>
        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var lista_consultas = '<?=fun_id_lista('LISTA DE CONSULTAS DINAMICAS')?>';
        var v_id_cons_dinamica;
        var v_id_consulta_din;
        var v_filtro_buscado = false;
        var v_id_workflow_log = '<?=$p_id_workflow_log ?>';
        var v_c_tarea = '<?=$p_c_tarea?>';
        var v_id_cons_dinamica = '<?=$p_id_cons_dinamica ?>';
        var v_parametros_din = JSON.parse('<?=empty($p_parametros_din)?'null':$p_parametros_din ?>');
        
        var param_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            m_autoquery:'N',
            param: {}
        });

        var result_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:1,
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