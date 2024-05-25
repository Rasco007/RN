<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];


include('carga_archivos_afip/html/principal.html');

?>
<script type='text/javascript' src='carga_archivos_afip/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='carga_archivos_afip/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='carga_archivos_afip/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var v_id_menu = '<?=$p_id_menu?>';
    var v_f_hoy = '<?=$fecha_hoy?>';
    var v_filtro = '%'
    var v_carga_inicial_logs = false;
    
    var archivos_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery:'S',
        param:{':p_filtro': v_filtro}
    });

    var logs_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:1,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });


    $(document).ready(function() { 
        inicializarLupas();
        inicializarEventos();
        inicializarGrillas();
    });
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>