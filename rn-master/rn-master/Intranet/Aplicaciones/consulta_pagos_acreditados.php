<?php
require_once(INTRANET."header.php");
$p_n_id_menu = $_POST['p_n_id_menu'];
$lista_doc = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS');
$lista_obj_hecho = fun_id_lista('LISTA DE OBJETOS SEGUN TRIBUTO CYL PAGOS ACREDITADOS');
$lista_concepto = fun_id_lista('LISTA CONCEPTOS CYL PAGOS ACREDITADOS');
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');

#HTML PRINCIPAL
include('consulta_pagos_acreditados/html/principal.html');
?>
    <style>

    </style>
    <link rel="stylesheet" href="consulta_pagos_acreditados/css/estilos.css">
    <script type='text/javascript' src='consulta_pagos_acreditados/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='consulta_pagos_acreditados/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='consulta_pagos_acreditados/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

    <script>
        var filtros_no_nativos_ar = [];
        var filtros_arr_main = [];
        var v_id_menu = '<?=$p_n_id_menu?>';
        var ajax_autocomplete;
        var v_lista_doc = '<?=$lista_doc?>';
        var v_lista_denominaciones = '<?=$lista_denominaciones?>';

        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_obj_hecho = '<?=$lista_obj_hecho?>';
        var v_lista_concepto = '<?=$lista_concepto?>';

        var datos_main_grid_id_contribuyente = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            n_orden: 0,
            m_autoquery:'N'
        });

        var datos_main_grid_remito = new GridParam({
            id_menu:v_id_menu,
            n_grid:1,
            n_orden: 0,
            m_autoquery:'N'
        });

        var datos_main_grid_sin_remito_ni_id_contrib = new GridParam({
            id_menu:v_id_menu,
            n_grid:2,
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