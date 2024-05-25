<?php
require_once(INTRANET."header.php");
$p_n_id_menu = $_POST['p_n_id_menu'];

$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS LIST ESTADO CTA CTE');
$lista_doc = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_obj_hecho = fun_id_lista('LISTA DE OBJETOS LIST ESTADO CTA CTE');
$lista_conceptos = fun_id_lista('LISTADO CONCEPTOS LIST ESTADO CTA CTE');
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');

$fecha_hoy = date('d/m/Y');

#HTML PRINCIPAL
include('listado_estado_cta_cte/html/principal.html');
?>
    <style>

    </style>
    <script type='text/javascript' src='listado_estado_cta_cte/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='listado_estado_cta_cte/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='listado_estado_cta_cte/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

    <script>
        var v_id_menu = '<?=$p_n_id_menu?>';
        var ajax_autocomplete;
        var fecha_hoy = '<?=$fecha_hoy?>';

        var v_lista_doc = '<?=$lista_doc?>';
        var v_lista_denominaciones = '<?=$lista_denominaciones?>';
        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_conceptos = '<?=$lista_conceptos?>';
        var v_lista_obj_hecho = '<?=$lista_obj_hecho?>';

        var datos_main_grid_obligaciones = new GridParam({
            id_menu:v_id_menu,
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