<?php
require_once(INTRANET . "header.php");
require_once('admin_operativos/php/traer_datos.php');
require_once('carga_acciones/php/traer_datos_operativo.php');

$id_lista_estados = fun_id_lista('Lista de Estados de Accion');

$p_id_menu = $_POST['p_n_id_menu'];
$p_n_operativo = $_POST['p_n_operativo'];
$p_n_orden = $_POST['p_n_orden'];
$p_sector = ';'.$_POST['p_c_sector'].';';

$datos_operativo = traer_datos_operativo($p_n_operativo, $p_n_orden);
$data_acciones = traer_datos(298, 'tablaGeneral', $p_sector); //traemos las acciones de la tabla general 298

$n_cuit = $datos_operativo['N_CUIT'];
$d_denominacion = $datos_operativo['D_DENOMINACION'];

#HTML PRINCIPAL
include('carga_acciones/html/principal.html');
include('carga_acciones/html/modal_abm_accion.html');
?>

<script type='text/javascript' src='carga_acciones/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='carga_acciones/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='carga_acciones/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var filtros_no_nativos_ar = new Array();
    filtros_no_nativos_ar['main_grid'] = new Array();
    var v_id_menu = '<?=$p_id_menu?>';
    var p_id_operativo = '<?=$p_n_operativo?>';
    var p_n_orden = '<?=$p_n_orden?>';
    var p_sector = '<?=$p_sector?>';
    var id_lista_estados = '<?=$id_lista_estados?>';

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        m_autoquery:'S',
        param:{':p_id_operativo':p_id_operativo,
               ':p_n_orden': p_n_orden}
    });

    $(document).ready(function() {
        inicializar_grillas();
        inicializar_eventos();
    });
</script>

<?php
require_once(INTRANET."footer.php");
?>

