<?php
require_once(FRAMEWORK_DIR."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$lista_n_transfer = fun_id_lista('LISTADO DE TRANSFERENCIAS REVERTIR APP');
$lista_n_comprobante = fun_id_lista('LISTADO DE COMPROBANTES REVERTIR APP');

#HTML PRINCIPAL
include('revertir_app_de_transferencia/html/principal.html');
?>
    <script type='text/javascript' src='revertir_app_de_transferencia/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='revertir_app_de_transferencia/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var v_id_menu = '<?=$p_id_menu?>';
        var ajax_autocomplete;

        $(document).ready(function() {
            inicializarLupas();
            init_eventos();
        });

        var v_lista_n_transfer = '<?=$lista_n_transfer?>';
        var v_lista_n_comprobante = '<?=$lista_n_comprobante?>';

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>