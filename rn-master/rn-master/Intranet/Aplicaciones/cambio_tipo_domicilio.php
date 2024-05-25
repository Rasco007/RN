<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$lista_tdoc = fun_id_lista('LISTADO TIPOS DE DOC CTA CTE');
$lista_timp = fun_id_lista('TIPOS IMPONIBLES X CONTRIBUYENTE');
$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS POR TIPO IMP');
$lista_obj = fun_id_lista('LISTA OBJETOS HECHOS CON CONTRIB CON F_CESE_PROV');
#HTML PRINCIPAL
include('cambio_tipo_domicilio/html/principal.html');
include('cambio_tipo_domicilio/html/modals.html');
?>
    <style>
        .formError {
            z-index: 15000;
        }
    </style>
    <script type='text/javascript' src='cambio_tipo_domicilio/js/grillas.js'></script>
    <script type='text/javascript' src='cambio_tipo_domicilio/js/eventos.js'></script>
    <script type='text/javascript' src='cambio_tipo_domicilio/js/funciones.js'></script>

    <script>
        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var v_lista_tdoc = '<?=$lista_tdoc?>';
        var v_lista_timp = '<?=$lista_timp?>';
        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_obj = '<?=$lista_obj?>';
        var ajax_autocomplete;


        var id_contrib;
        var objeto_hecho;
        var c_tipo_imponible;
        var c_tributo;
        var f_vig_desde_obj;

        var datos_main_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:v_m_autoquery,
            param:{':p_id_contrib':null,
                ':p_c_timp':null,
                ':p_c_trib':null,
                ':p_objeto':null}
        });

        var datos_conceptos_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:1,
            m_autoquery:'N',
            param:{':p_id_contrib':null,
                ':p_c_timp':null,
                ':p_c_trib':null,
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