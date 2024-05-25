<?php
    $p_n_id_menu = $_POST['p_n_id_menu'];
    require_once(INTRANET."header.php");

    $p_modo=$_POST['p_modo'];
    $p_exige_patrocinante=$_POST['p_exige_patrocinante'];

    #HTML PRINCIPAL
    include('confirmacion_juicios/html/principal.html');
?>
    <script type='text/javascript' src='confirmacion_juicios/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='confirmacion_juicios/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='confirmacion_juicios/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

    <script>
        var filtros_no_nativos_ar = [];
        var filtros_arr_main = [];
        var filtros_arr_main_detalles = [];
        var v_id_menu = '<?=$p_n_id_menu?>';
        var p_modo = '<?=$p_modo?>';
        var p_exige_patrocinante = '<?=$p_exige_patrocinante?>';
        var ajax_autocomplete;

        var datos_main_grid_detalle_instancia = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            n_orden: 0,
            m_autoquery:'N'
        });

        var datos_main_grid_datos_instancia = new GridParam({
            id_menu:v_id_menu,
            n_grid:1,
            n_orden: 0,
            m_autoquery:'N'
        });

        $(document).ready(function() {
            inicializarGrillas();
            inicializarEventos();
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?>