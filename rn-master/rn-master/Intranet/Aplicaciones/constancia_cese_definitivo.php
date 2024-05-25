<?php
require_once(INTRANET."header.php");
$p_n_id_menu = $_POST['p_n_id_menu'];

$lista_doc = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_trib = fun_id_lista('LISTA DE TRIBUTOS CONSTANCIA CESE DEF');
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');

#HTML PRINCIPAL
include('constancia_cese_definitivo/html/principal.html');
?>
    <style>

    </style>
    <script type='text/javascript' src='constancia_cese_definitivo/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='constancia_cese_definitivo/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='constancia_cese_definitivo/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

    <script>
        var v_id_menu = '<?=$p_n_id_menu?>';
        var ajax_autocomplete;
        var v_lista_doc = '<?=$lista_doc?>';
        var v_lista_denominaciones = '<?=$lista_denominaciones?>';
        var v_lista_trib = '<?=$lista_trib?>';

        $(document).ready(function() {
            inicializarGrillas();
            inicializarEventos();
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?>