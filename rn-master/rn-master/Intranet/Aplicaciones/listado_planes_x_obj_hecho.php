<?php
require_once(INTRANET."header.php");
$p_n_id_menu = $_POST['p_n_id_menu'];
$lista_tipo_imponible = fun_id_lista('LISTADO DE TIPOS IMPONIBLES PLANES X OBJ HECHO');

#HTML PRINCIPAL
include('listado_planes_x_obj_hecho/html/principal.html');
?>
    <style>

    </style>
    <script type='text/javascript' src='listado_planes_x_obj_hecho/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='listado_planes_x_obj_hecho/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='listado_planes_x_obj_hecho/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

    <script>
        var v_id_menu = '<?=$p_n_id_menu?>';
        var ajax_autocomplete;
        var fecha_hoy = '<?=$fecha_hoy?>';

        var v_lista_tipo_imponible = '<?=$lista_tipo_imponible?>';


        var datos_main_grid_planes_de_pago = new GridParam({
            id_menu:<?=$_POST['p_n_id_menu']?>,
            n_grid:0,
            m_autoquery:'N'
        });

        $(document).ready(function() {
            inicializarLupas();
            inicializarEventos();
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?>