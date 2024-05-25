<?php
require_once(FRAMEWORK_DIR."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$lista_trib = fun_id_lista('LISTA TRIBUTOS GENERADOR PAGO ANUAL MULTIOBJETO');
$lista_doc = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_tipo_imponible = fun_id_lista('LISTADO DE TIPOS IMPONIBLES GENERACION DE OBLIG IIBB');
$lista_obj_hecho = fun_id_lista('LISTA OBJETOS HECHOS ABM DEBITO DIRECTO');
$lista_nombres = fun_id_lista('LISTADO DE NOMBRES RECALCULO DE OBLIG');
$lista_tipo_ajuste = fun_id_lista('LISTA MOTIVO AJUSTE RECALCULO OBLIGACIONES');

#HTML PRINCIPAL
include('recalculo_obligaciones/html/principal.html');
?>
    <script type='text/javascript' src='recalculo_obligaciones/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='recalculo_obligaciones/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        $(document).ready(function() {
            inicializarLupas();
            init_eventos();
        });
        var v_id_menu = '<?=$p_id_menu?>';
        var ajax_autocomplete;
        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_doc = '<?=$lista_doc?>';
        var v_lista_tipo_imponible = '<?=$lista_tipo_imponible?>';
        var v_lista_obj_hecho = '<?=$lista_obj_hecho?>';
        var v_lista_nombres = '<?=$lista_nombres?>';
        var v_lista_tipo_ajuste = '<?=$lista_tipo_ajuste?>';

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>