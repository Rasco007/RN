<?php
require_once(INTRANET."header.php");
$p_n_id_menu = $_POST['p_n_id_menu'];
#HTML PRINCIPAL
include('consulta_sifere_movban/html/principal.html');
include('consulta_sifere_movban/html/modals.html');
?>

    <script type='text/javascript' src='consulta_sifere_movban/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='consulta_sifere_movban/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='consulta_sifere_movban/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

    <script>
        var filtros_no_nativos_ar = [];
        var filtros_arr_main = [];
        var v_id_menu = '<?=$p_n_id_menu?>';

        var datos_main_grid_cabecera_archivo = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            m_autoquery:'N'
        });

        var datos_main_grid_detalle_archivo = new GridParam({
            id_menu:v_id_menu,
            n_grid:1,
            m_autoquery:'N'
        });

        var datos_main_grid_totales_sifere = new GridParam({
            id_menu:v_id_menu,
            n_grid:2,
            m_autoquery:'N'
        });

        var datos_main_grid_grilla_excel_art = new GridParam({
            id_menu:v_id_menu,
            n_grid:3,
            m_autoquery:'N'
        });

        var datos_main_grid_grilla_excel_mb = new GridParam({
            id_menu:v_id_menu,
            n_grid:4,
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