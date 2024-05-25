<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];


include('revertir_caducidad_anulacion/html/principal.html');

?>
<link rel="stylesheet" type="text/css" href="revertir_caducidad_anulacion/css/styles.css">
<script type='text/javascript' src='revertir_caducidad_anulacion/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='revertir_caducidad_anulacion/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='revertir_caducidad_anulacion/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var v_id_menu = '<?=$p_id_menu?>';

    var v_lista_denominaciones = '<?=fun_id_lista('LISTA DENOMINACIONES')?>';
    var v_lista_objetos = '<?=fun_id_lista('LISTA OBJETOS PLANES DE PAGO')?>';
    var v_lista_tipo_doc = '<?=fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO')?>';
    var v_lista_planes_pago = '<?=fun_id_lista('LISTA PLANES DE PAGO CADUCIDAD')?>';
    var v_lista_tipo_imp = '<?=fun_id_lista('LISTADO TIPO IMPONIBLE CALCULO MAXMIN IIBB')?>';

    var v_no_carga_inicial_pp = false;
    var v_no_carga_inicial_ppd = false;
    var v_no_carga_inicial_ppc = false;
    var v_no_carga_inicial_pph = false;
    var v_no_carga_inicial_ppr = false;

    var v_grid_detalle_cargada = false;
    var v_grid_cuotas_cargada = false;

    var filtros_no_nativos_ar = new Array();
    var filtros_arr_main = [];

    var resumen_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery:'N',
        params: {}
    });

    var detalle_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:1,
        n_orden:0,
        m_autoquery:'N',
        params: {}
    });

    var cuotas_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:2,
        n_orden:0,
        m_autoquery:'N',
        params: {}
    });

    var honorarios_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:3,
        n_orden:0,
        m_autoquery:'N',
        params: {}
    });

    var relacionados_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:4,
        n_orden:0,
        m_autoquery:'N',
        params: {}
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