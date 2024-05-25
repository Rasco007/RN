<?php
require_once(FRAMEWORK_DIR."header.php");

$p_n_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');



$lista_planes_fisca = fun_id_lista('LISTADO PLANES DE FISCALIZACION AUTORIZACION');


#HTML PRINCIPAL
include('autorizacion_planes_fiscalizacion/html/principal.html');
include('autorizacion_planes_fiscalizacion/html/modal.html');

?>
    <link rel="stylesheet" type="text/css" href="autorizacion_planes_fiscalizacion/css/styles.css">

    <script type='text/javascript' src='autorizacion_planes_fiscalizacion/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='autorizacion_planes_fiscalizacion/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var filtros_no_nativos_ar = [];
        var filtros_arr_main = [];

        var fecha_hoy = '<?=$fecha_hoy?>';
        let v_lista_planes_fisca = '<?=$lista_planes_fisca?>';
        var proceso;
        var v_id_menu = '<?=$p_n_id_menu?>';

        var datos_main_grid = new GridParam({
                id_menu:v_id_menu,
                n_grid:0,
                n_orden: 0,
                m_autoquery:'N'
            });

        var datos_detalles_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:1,
            n_orden: 1,
            m_autoquery:'N'
        });

        $(document).ready(function() {
            inicializarEventos();
            inicializarGrillas();
        });

       


    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>