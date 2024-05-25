<?php
require_once(INTRANET . "header.php");

$fecha_hoy = date('d/m/Y');
$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$p_modo = $_POST['p_modo'];
$user = $_SESSION['usuario'];

#HTML PRINCIPAL
include('incorporacion_mov_sucerp/html/principal.html');
include('incorporacion_mov_sucerp/html/modal_errores.html');
include('incorporacion_mov_sucerp/html/modal_excel.html');
?>

<script type='text/javascript' src='incorporacion_mov_sucerp/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='incorporacion_mov_sucerp/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='incorporacion_mov_sucerp/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script>
    //VARIABLES GLOBALES
    var filtros_no_nativos_ar = new Array();
    filtros_no_nativos_ar['errores_grid'] = new Array();
    var v_lista_envios = '<?=fun_id_lista('LISTA NRO ENVIO RNPA SUCERP')?>';
    var v_lista_semanas = '<?=fun_id_lista('LISTA DE SEMANAS')?>';
    var fecha_hoy = '<?=$fecha_hoy?>';
    var v_c_usuario = '<?=$user?>';
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var v_p_modo = '<?=$p_modo?>';
    var ajax_autocomplete = null;
    var p_id_sesion_refor;
    var p_f_acreditacion;
    var p_f_pago_trans;
    var p_path;

    var datos_errores_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
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
