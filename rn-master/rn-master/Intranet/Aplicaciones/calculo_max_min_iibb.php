<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_n_id_menu = $_POST['p_n_id_menu'];

include('calculo_max_min_iibb/html/principal.html');

?>
<script type='text/javascript' src='calculo_max_min_iibb/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='calculo_max_min_iibb/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='calculo_max_min_iibb/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var v_id_menu = '<?=$p_n_id_menu?>';
    var v_lista_tributos = '<?=fun_id_lista('LISTADO TRIBUTOS CALCULO MAXMIN IIBB')?>';
    var v_lista_conceptos = '<?=fun_id_lista('LISTADO CONCEPTO CALCULO MAXMIN IIBB')?>';
    var v_lista_documentos = '<?=fun_id_lista('LISTADO DOCUMENTOS CALCULO MAXMIN IIBB')?>';
    var v_lista_tipo_imponible = '<?=fun_id_lista('LISTADO TIPO IMPONIBLE CALCULO MAXMIN IIBB')?>';
    var v_lista_denominaciones = '<?=fun_id_lista('LISTADO CONTRIBUYENTES CALCULO MAXMIN IIBB')?>';

    var id_contribuyente;
    var v_id_sesion;
    var pasada_carga_inicial = false;

    var detalle_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery:'N',
        params: {}
    });

    $(document).ready(function() { 
        inicializarEventos();
        inicializarGrillas();
        inicializarLupas();
        $('#c_tributo').val(10);
        $('#d_tributo').val('INGR BRUTOS DIRECTOS');
        $('#c_concepto').val(100); 
        $('#d_concepto').val('ANTICIPO MENSUAL');
    });
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>