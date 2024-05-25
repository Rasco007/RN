<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$p_forma_pago = $_POST['p_forma_pago'];
$p_id_workflow_log = $_POST['p_id_workflow_log'];
$p_c_tarea = $_POST['p_c_tarea'];

$lista_formas_pago = fun_id_lista('LISTA MEDIOS DE PAGO DEBITO');


$fecha_hoy = date('d/m/Y');
include('crono_sol_debito/html/principal.html');
?>
    <style>
        #ui-datepicker-div {
            z-index: 11000 !important;
            position: absolute !important;
        }
    </style>

    <script type='text/javascript' src='crono_sol_debito/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='crono_sol_debito/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='crono_sol_debito/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='crono_sol_debito/js/lupas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='workflow_general/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

    <script>
        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var v_id_lista = '<?=$lista_formas_pago?>';
        var fecha_hoy = '<?=$fecha_hoy?>';
        var p_forma_pago = '<?=$p_forma_pago ?>';
        var p_id_workflow_log = '<?=$p_id_workflow_log ?>';
        var p_c_tarea = '<?=$p_c_tarea ?>';

        var crono_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            n_orden:0,
            m_autoquery:'N',
            param: {}
        });

        $(document).ready(function() {
            inicializarGrillas();
            inicializarEventos();
            inicializarLupas();
            $('#grid_wrapper').hide();

            $('#n_anio').val(new Date().getFullYear());
        });
    </script>


<?php
require_once(INTRANET."footer.php");
?>