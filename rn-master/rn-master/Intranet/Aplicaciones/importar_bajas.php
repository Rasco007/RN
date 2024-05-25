<?php
require_once(INTRANET . "header.php");

$fecha_hoy = date('d/m/Y');
$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$user = $_SESSION['usuario'];
$p_id_workflow_log = $_POST['p_id_workflow_log'];
$p_c_tarea = $_POST['p_c_tarea'];
$p_id_grupo = $_POST['p_id_grupo'];
$p_d_grupo = $_POST['p_d_grupo'];
$p_n_seleccion = $_POST['p_n_seleccion'];
$fecha_creacion = $_POST['fecha_creacion'];


#HTML PRINCIPAL
include('importar_bajas/html/principal.html');
?>

<script type='text/javascript' src='importar_bajas/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='importar_bajas/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='importar_bajas/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='workflow_general/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    //VARIABLES GLOBALES
    var filtros_no_nativos_ar = new Array();
    filtros_no_nativos_ar['main_grid'] = new Array();
    var fecha_hoy = '<?=$fecha_hoy?>';
    var v_c_usuario = '<?=$user?>';
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var ajax_autocomplete = null;
    var p_id_workflow_log = '<?=$p_id_workflow_log ?>';
    var p_c_tarea = '<?=$p_c_tarea ?>';
    var p_id_grupo = '<?=$p_id_grupo ?>';
    var p_d_grupo = '<?=$p_d_grupo ?>';
    var p_n_seleccion = '<?=$p_n_seleccion ?>';
    var fecha_creacion = '<?=$fecha_creacion ?>';

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        m_autoquery:'S',
        param:{':p_id_grupo':p_id_grupo}
    });

    $(document).ready(function() {
        inicializar_grillas();
        inicializar_eventos();
    });
</script>

<?php
require_once(INTRANET."footer.php");
?>
