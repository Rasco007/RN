<?php
require_once(FRAMEWORK_DIR."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$p_validar = $_POST['p_validar'];

$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS BAJA DE OBLIGACIONES FULL');
$lista_conceptos = fun_id_lista('LISTADO DE CONCEPTOS BAJA DE OBLIGACIONES FULL');
$lista_doc = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_tipo_imponible = fun_id_lista('LISTADO DE TIPOS IMPONIBLES GENERACION DE OBLIG IIBB');
$lista_obj_hecho = fun_id_lista('LISTA OBJETOS HECHOS BAJA DE OBLIGACIONES FULL');
$lista_nombres = fun_id_lista('LISTADO DE NOMBRES GENERACION INDIVIDUAL OBLIG IIBB');

#HTML PRINCIPAL
include('baja_obligaciones_full/html/principal.html');
?>
    <!--<link rel="stylesheet" type="text/css" href="baja_obligaciones_full/css/estilos.css">-->
    <script type='text/javascript' src='baja_obligaciones_full/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='baja_obligaciones_full/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var v_id_menu = '<?=$p_id_menu?>';
        var v_valida_agrup = '<?=$p_validar?>';
        var ajax_autocomplete;
        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_conceptos = '<?=$lista_conceptos?>';
        var v_lista_doc = '<?=$lista_doc?>';
        var v_lista_tipo_imponible = '<?=$lista_tipo_imponible?>';
        var v_lista_obj_hecho = '<?=$lista_obj_hecho?>';
        var v_lista_nombres = '<?=$lista_nombres?>';

        $(document).ready(function() {
            inicializarLupas();
            init_eventos();
        });

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>