<?php
require_once(INTRANET . "header.php");

$id_lista_grupos = fun_id_lista('LISTA DE GRUPOS DE JUICIOS VIGENTES');

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
include('contrib_objetos_juicios/html/principal.html');
include('contrib_objetos_juicios/html/modal_levantar.html');
?>

<script type='text/javascript' src='contrib_objetos_juicios/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='contrib_objetos_juicios/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='contrib_objetos_juicios/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
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
    var id_lista_grupos = '<?=$id_lista_grupos?>';
    var p_id_workflow_log = '<?=$p_id_workflow_log ?>';
    var p_c_tarea = '<?=$p_c_tarea ?>';
    var p_id_grupo = '<?=$p_id_grupo ?>';
    var p_d_grupo = '<?=$p_d_grupo ?>';
    var p_n_seleccion = '<?=$p_n_seleccion ?>';
    var fecha_creacion = '<?=$fecha_creacion ?>';
    var contribuyentes = [];

    var datos_main_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        m_autoquery:'N',
        param: {}
    });

    $(document).ready(function() {
        inicializar_grillas();
        inicializar_eventos();
    });
</script>

<?php
require_once(INTRANET."footer.php");
?>
