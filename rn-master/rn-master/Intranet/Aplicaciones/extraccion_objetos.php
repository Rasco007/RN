<?php
require_once(INTRANET . "header.php");
require_once('extraccion_objetos/php/verificar_perfiles.php');

$id_lista = fun_id_lista('LISTA DE BOL. DEUDA O EXP EXTRACCION DE OBJETO');

$fecha_hoy = date('d/m/Y');
$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$user = $_SESSION['usuario'];

$data_perfiles = verificar_perfiles($user);
$p_ext_obj = $data_perfiles['EXT_OBJ'];

#HTML PRINCIPAL
include('extraccion_objetos/html/principal.html');
include('extraccion_objetos/html/modal_extraccion.html');
?>

<script type='text/javascript' src='extraccion_objetos/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='extraccion_objetos/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='extraccion_objetos/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    //VARIABLES GLOBALES
    var filtros_no_nativos_ar = new Array();
    filtros_no_nativos_ar['main_grid'] = new Array();
    filtros_no_nativos_ar['detail_grid'] = new Array();
    var fecha_hoy = '<?=$fecha_hoy?>';
    var v_c_usuario = '<?=$user?>';
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var ajax_autocomplete = null;
    var id_lista = '<?=$id_lista?>';
    var ext_obj = '<?=$p_ext_obj?>';
    var p_m_sin_pago;
    var p_n_lote_extrac;

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        m_autoquery:v_m_autoquery
    });

    var datos_detail_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:1,
        m_autoquery:'N',
    });

    $(document).ready(function() {
        inicializar_grillas();
        inicializar_eventos();
    });
</script>

<?php
require_once(INTRANET."footer.php");
?>
