<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_n_id_menu = $_POST['p_n_id_menu'];


include('cese_prov_agentes/html/principal.html');

?>
<script type='text/javascript' src='cese_prov_agentes/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='cese_prov_agentes/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='cese_prov_agentes/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var v_id_menu = '<?=$p_n_id_menu?>';

    var v_lista_denominaciones = '<?=fun_id_lista('LISTA DENOMINACIONES')?>';
    var v_lista_tributos = '<?=fun_id_lista('LISTA TRIBUTO CESE PROV AG')?>';
    var v_lista_objetos = '<?=fun_id_lista('LISTA OBJETO HECHO MODIF F VIG INSC')?>';
    var v_lista_tipo_doc = '<?=fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO')?>';
    var v_lista_motivo_baja = '<?=fun_id_lista('LISTA MOTIVO BAJA CESE AG')?>';

    var v_no_carga_inicial_ct = false;

    var contrib_tributo_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery:'N',
        params: {}
    });

    $(document).ready(function() { 
        inicializarLupas();
        inicializarEventos();
        inicializarGrillas();
        $('#p_tributo').val(p_tributo);
        $('#baja_modal').hide();
    });
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>