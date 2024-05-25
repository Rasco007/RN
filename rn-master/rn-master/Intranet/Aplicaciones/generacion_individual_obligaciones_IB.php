<?php
require_once(FRAMEWORK_DIR."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS GENERACION INDIVIDUAL OBLIG IIBB');
$lista_conceptos = fun_id_lista('CONCEPTO DETALLE BOLETAS PAGO AG E IIBB');
$lista_doc = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_tipo_imponible = fun_id_lista('LISTADO DE TIPOS IMPONIBLES GENERACION IND DE OBLIG IIBB');
$lista_obj_hecho = fun_id_lista('LISTA OBJETOS HECHO GEN IND OBLIG IIBB');
$lista_nombres = fun_id_lista('LISTADO DE NOMBRES GENERACION INDIVIDUAL OBLIG IIBB');

#HTML PRINCIPAL
include('generacion_individual_obligaciones_IB/html/principal.html');
?>
    <script type='text/javascript' src='generacion_individual_obligaciones_IB/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='generacion_individual_obligaciones_IB/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        $(document).ready(function() {
            inicializarLupas();
            init_eventos();
        });
        var v_id_menu = '<?=$p_id_menu?>';
        var ajax_autocomplete;
        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_conceptos = '<?=$lista_conceptos?>';
        var v_lista_doc = '<?=$lista_doc?>';
        var v_lista_tipo_imponible = '<?=$lista_tipo_imponible?>';
        var v_lista_obj_hecho = '<?=$lista_obj_hecho?>';
        var v_lista_nombres = '<?=$lista_nombres?>';

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>