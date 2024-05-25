<?php
require_once(FRAMEWORK_DIR."header.php");

$lista_tipo_plan = fun_id_lista('LISTADO DE PLANES DE FISCALIZACION');
$p_id_menu = $_POST['p_n_id_menu'];
include('consulta_planes_fiscalizacion/html/principal.html');
?>
    <script type='text/javascript' src='consulta_planes_fiscalizacion/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var detalles_cargados = false;
        var p_id_menu = '<?=$p_id_menu?>';

        var main_grid = new GridParam({
                id_menu:p_id_menu,
                n_grid:0,
                n_orden: 0,
                m_autoquery:'S'
        });

        var detalles_grid = new GridParam({
            id_menu:p_id_menu,
            n_grid:1,
            n_orden: 0,
            m_autoquery:'N',
            param:{'p_id_plan_fis':''}
        });
        let v_lista_tipo_plan = '<?=$lista_tipo_plan?>';

        $(document).ready(function() {
            inicializarGrillas();
            $('#tot_horas_est').val('');
        });
        

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>