<?php
require_once(FRAMEWORK_DIR."header.php");

$p_n_id_menu = $_POST['p_n_id_menu'];
include('consulta_anticipos_control_bonif/html/principal.html');

?>
<script type='text/javascript' src='consulta_anticipos_control_bonif/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='consulta_anticipos_control_bonif/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='consulta_anticipos_control_bonif/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>

    var v_lista_tributos = '<?=fun_id_lista('LISTADO TRIBUTOS ANTIC BONIF')?>';
    var v_lista_documentos = '<?=fun_id_lista('LISTA DOCUMENTOS ANTICIP BONIF')?>';
    var v_lista_tipo_imponible = '<?=fun_id_lista('LISTADO TIPO IMPONIBLE BONIF')?>';
    var v_lista_denominaciones = '<?=fun_id_lista('LISTA CONTRIBUYENTES ANTICIP BONIF')?>';

    var id_contribuyente;
    var v_id_sesion;
    var v_f_vto_pago;
    var v_f_vto_pres;

    var v_id_menu = '<?=$p_n_id_menu?>';

    var detalle_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery:'N',
        params: {}
    });

    $(document).ready(function() {
        inicializarEventos();
        inicializarLupas();
        inicializarGrillas();
    });
    
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>