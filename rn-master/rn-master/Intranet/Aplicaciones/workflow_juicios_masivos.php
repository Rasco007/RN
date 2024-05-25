<?php
require_once(INTRANET . "header.php");

$id_lista_grupos = fun_id_lista('LISTA DE GRUPOS DE JUICIOS VIGENTES');

$fecha_hoy = date('d/m/Y');
$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$user = $_SESSION['usuario'];

#HTML PRINCIPAL
include('workflow_juicios_masivos/html/principal.html');
include('workflow_juicios_masivos/html/modal_nuevo_grupo.html');
?>

<script type='text/javascript' src='workflow_juicios_masivos/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='workflow_juicios_masivos/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='workflow_general/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='workflow_general/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    //VARIABLES GLOBALES
    var fecha_hoy = '<?=$fecha_hoy?>';
    var v_c_usuario = '<?=$user?>';
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var ajax_autocomplete = null;
    var id_lista_grupos = '<?=$id_lista_grupos?>';
    var v_id_workflow_log;

    var workflow_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        m_autoquery:'N',
        param: {}
    });

    $(document).ready(function() {
        inicializarGrillas();
        inicializar_eventos();
    });
</script>

<?php
require_once(INTRANET."footer.php");
?>
