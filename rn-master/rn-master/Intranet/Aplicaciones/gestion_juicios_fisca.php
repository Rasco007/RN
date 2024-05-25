<?php
require_once(INTRANET . "header.php");
require_once('gestion_juicios_fisca/php/traer_datos.php');

$id_lista_grupos = fun_id_lista('LISTA DE GRUPOS DE JUICIOS VIGENTES');
$id_lista_asesores = fun_id_lista('LISTA DE REPRESENTANTES Y PATROCINADORES');

$fecha_hoy = date('d/m/Y');
$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$user = $_SESSION['usuario'];

$data_firmantes = traer_datos(800);

#HTML PRINCIPAL
include('gestion_juicios_fisca/html/principal.html');
include('gestion_juicios_fisca/html/modal_edit_juicios.html');
?>

<script type='text/javascript' src='gestion_juicios_fisca/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='gestion_juicios_fisca/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

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
    var v_id_workflow_log;
    var id_lista_asesores = '<?=$id_lista_asesores ?>';

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
