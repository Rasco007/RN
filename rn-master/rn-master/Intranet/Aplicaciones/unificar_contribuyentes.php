<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$lista_tdoc = fun_id_lista('LISTADO TIPOS DE DOC CTA CTE');
#HTML PRINCIPAL
include('unificar_contribuyentes/html/principal.html');
?>
    <style>
        .formError {
            z-index: 15000;
        }
    </style>
    <script type='text/javascript' src='unificar_contribuyentes/js/elementos.js'></script>
    <script type='text/javascript' src='unificar_contribuyentes/js/eventos.js'></script>
    <script type='text/javascript' src='unificar_contribuyentes/js/funciones.js'></script>

    <script>
        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var v_lista_tdoc = '<?=$lista_tdoc?>';
        var ajax_autocomplete;


        var id_contrib;

        $(document).ready(function() {
            inicializarElementos();
            inicializarEventos();

        });
    </script>

<?php
require_once(INTRANET."footer.php");
?>