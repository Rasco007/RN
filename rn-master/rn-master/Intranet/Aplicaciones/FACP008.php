<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];
$p_operacion = $_POST['p_operacion'];
$p_cont = $_POST['p_cont'];


include('FACP008/html/principal.html');

?>
<link rel="stylesheet" type="text/css" href="FACP008/css/styles.css">
<script type='text/javascript' src='FACP008/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='FACP008/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='FACP008/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var v_id_menu = '<?=$p_id_menu?>';

    var v_operacion = '<?=$p_operacion?>';
    var v_cont = '<?=$p_cont?>';
    var v_c_caducidad_aux;
    var v_d_caducidad;
    var f_hoy = '<?=$fecha_hoy?>';
    var v_total_cuotas;

    var v_lista_denominaciones = '<?=fun_id_lista('LISTA DENOMINACIONES')?>';
    var v_lista_objetos = '<?=fun_id_lista('LISTA OBJETOS CADUCIDAD ANULACION')?>';
    var v_lista_tipo_doc = '<?=fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO')?>';
    var v_lista_planes_pago = '<?=fun_id_lista('LISTA PLANES DE PAGO CADUCIDAD ANULACION')?>';
    var v_lista_tipo_imp = '<?=fun_id_lista('LISTA TIPO IMPONIBLE CADUCIDAD ANULACION')?>';
    var v_lista_motivo_cad = '<?=fun_id_lista('LISTA MOTIVO CADUCIDAD ANULACION')?>';

    var v_no_carga_inicial_pp = false;
    var v_no_carga_inicial_ppd = false;
    var v_no_carga_inicial_ppc = false;
    var v_no_carga_inicial_pph = false;
    var v_no_carga_inicial_ppr = false;

    var v_grid_detalle_cargada = false;
    var v_grid_cuotas_cargada = false;

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