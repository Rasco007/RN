<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$p_tributo = $_POST['p_tributo'];

$lista_tdoc = fun_id_lista('LISTADO TIPOS DE DOC CTA CTE');
$lista_objeto1 = fun_id_lista('LISTADO NOMENCLATURA-PATENTE');
$lista_objeto2 = fun_id_lista('LISTADO NOMENCLATURA_REAL-PATENTE_VIEJA');

#HTML PRINCIPAL
include('modif_fecha_transf/html/principal.html');
include('modif_fecha_transf/html/modals.html');
?>
    <style>
        .formError {
            z-index: 15000;
        }
    </style>
    <script type='text/javascript' src='modif_fecha_transf/js/grillas.js'></script>
    <script type='text/javascript' src='modif_fecha_transf/js/eventos.js'></script>
    <script type='text/javascript' src='modif_fecha_transf/js/funciones.js'></script>

    <script>
        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var v_tributo = '<?=$p_tributo?>';
        var ajax_autocomplete;
        var v_lista_tdoc = '<?=$lista_tdoc?>';
        var v_lista_objeto1 = '<?=$lista_objeto1?>';
        var v_lista_objeto2 = '<?=$lista_objeto2?>';


        var datos_main_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:v_m_autoquery,
            param:{':p_id_contrib':null,
                ':p_c_tributo':null,
                ':p_objeto':null}
        });

        $(document).ready(function() {
            inicializarGrillas();
            inicializarEventos();

        });
    </script>

<?php
require_once(INTRANET."footer.php");
?>