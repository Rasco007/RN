<?php
require_once(INTRANET . "header.php");
require_once('admin_operativos/php/traer_datos.php');

$id_lista_inscripciones = fun_id_lista('Inscripciones a Ingresos Brutos de un Contribuyente por Tributo');
$id_lista_contribuyentes = fun_id_lista('Lista de Contribuyentes para Operativos');
$id_lista_fiscalizadores = fun_id_lista('Lista de Fiscalizadores Internos para Operativos');

$p_id_menu = $_POST['p_n_id_menu'];
$p_n_operativo = $_POST['p_n_operativo'];
$p_periodo_desde = $_POST['p_periodo_desde'];
$p_periodo_hasta = $_POST['p_periodo_hasta'];
$p_d_tipo_inconsistencia = $_POST['p_d_tipo_inconsistencia'];
$p_c_formato_archivo = $_POST['p_c_formato_archivo'];
$p_d_titulo = $_POST['p_d_titulo'];
$p_sector = ';'.$_POST['p_c_sector'].';';
$p_id_plantilla = $_POST['p_id_plantilla'];

if($p_sector == ';PRE;'){
    $p_c_tributo = '99';
} else {
    $p_c_tributo = $_POST['p_c_tributo'];
}

$data_gruposemail = traer_datos(345, 'tablaGeneral', null); //traemos los grupos de email de la tabla general 345

#HTML PRINCIPAL
include('carga_casos/html/principal.html');
include('carga_casos/html/modal_abm_detalle.html');
include('carga_casos/html/modal_exportacion.html');
?>

<script type="text/javascript" src="<?=JS_FRAMEWORK_PROY?>dropzone.js"></script>
<link rel="stylesheet" type="text/css" href="carga_casos/css/estilos.css">
<script type='text/javascript' src='carga_casos/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='carga_casos/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='carga_casos/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var filtros_no_nativos_ar = new Array();
    filtros_no_nativos_ar['main_grid'] = new Array();
    var v_id_menu = '<?=$p_id_menu?>';
    var p_id_operativo = '<?=$p_n_operativo?>';
    var id_lista_inscripciones = '<?=$id_lista_inscripciones?>';
    var id_lista_contribuyentes = '<?=$id_lista_contribuyentes?>';
    var id_lista_fiscalizadores = '<?=$id_lista_fiscalizadores?>';
    var p_c_formato_archivo = '<?=$p_c_formato_archivo?>';
    var p_id_plantilla = '<?=$p_id_plantilla?>';
    var p_sector = '<?=$p_sector?>';
    var p_id_archivo = null;
    var p_codigo_archivo = null;
    var archivos_dropzone;

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        m_autoquery:'S',
        param:{':p_id_operativo':p_id_operativo}
    });

    Dropzone.autoDiscover = false;

    $(document).ready(function() {
        inicializar_grillas();
        inicializar_eventos();
    });
</script>

<?php
require_once(INTRANET."footer.php");
?>

