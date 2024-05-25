<?php
require_once(FRAMEWORK_DIR."header.php");

//PONER PARAMETROS DE MI FORM
$p_n_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');
$p_modo = $_POST['p_modo'];
$p_m_autoquery = 'N';

if($p_modo == 'A' || $p_modo == 'C'){ //Alta de evento 1 de inspección. Viene desde Administración de Inspecciones
    $p_m_autoquery = 'S';
    $p_id_inspeccion = $_POST['p_id_inspeccion'];
    $p_id_contribuyente = $_POST['p_id_contribuyente'];
    $p_n_cuit = $_POST['p_n_cuit'];
    $p_d_denominacion = $_POST['p_d_denominacion'];
    $p_d_plan_fisca = $_POST['p_d_plan_fisca'];
    $p_n_programa_fis = $_POST['p_n_programa_fis'];
    $p_d_programa_fis = $_POST['p_d_programa_fis'];
    $p_n_anio_plan = $_POST['p_n_anio_plan'];
    $p_c_tipo_doc = $_POST['p_c_tipo_doc'];
    $p_d_tipo_doc = $_POST['p_d_tipo_doc'];
    $p_n_documento = $_POST['p_n_documento'];
    $p_n_expediente = $_POST['p_n_expediente'];
    $p_n_anio_expediente = $_POST['p_n_anio_expediente'];
}

$lista_inspecciones = fun_id_lista('LISTADO DE INSPECCIONES');
$lista_eventos = fun_id_lista('LISTADO DE EVENTOS DE MOVIMIENTOS');
$lista_inspectores = fun_id_lista('LISTADO DE INSPECTORES');
$lista_tributos = fun_id_lista('LISTADO DE TRIBUTOS');
$lista_solicitud_info = fun_id_lista('LISTA SI - NO');
$lista_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');

#HTML PRINCIPAL
include('ingreso_movimiento_inspecciones/html/principal.html');
include('ingreso_movimiento_inspecciones/html/modal.html');
?>
<style>

</style>
    <link rel="stylesheet" type="text/css" href="ingreso_movimiento_inspecciones/css/styles.css?no_cache=<?=date('dmyhis')?>'" />
    <script type='text/javascript' src='ingreso_movimiento_inspecciones/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<!---    <script type='text/javascript' src='planes_fiscalizacion/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>-->
    <script type='text/javascript' src='ingreso_movimiento_inspecciones/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var fecha_hoy = '<?=$fecha_hoy?>';
        var p_modo = '<?=$p_modo?>';
        var p_id_contribuyente = '<?=$p_id_contribuyente?>';
        var p_id_inspeccion = '<?=$p_id_inspeccion?>';
        var p_n_cuit = '<?=$p_n_cuit?>';
        var p_d_denominacion = '<?=$p_d_denominacion?>';
        var p_d_plan_fisca = '<?=$p_d_plan_fisca?>';
        var p_n_programa_fis = '<?=$p_n_programa_fis?>';
        var p_d_programa_fis = '<?=$p_d_programa_fis?>';
        var p_n_anio_plan = '<?=$p_n_anio_plan?>';
        var p_c_tipo_doc = '<?=$p_c_tipo_doc?>';
        var p_d_tipo_doc = '<?=$p_d_tipo_doc?>';
        var p_n_documento = '<?=$p_n_documento?>';
        var p_n_expediente = '<?=$p_n_expediente?>';
        var p_n_anio_expediente = '<?=$p_n_anio_expediente?>';
        let v_lista_lista_documentos = '<?=$lista_documentos?>';
        var vg_lista_denominaciones = '<?=$lista_denominaciones?>';
        var ajax_autocomplete = null;
        var p_m_autoquery = '<?=$p_m_autoquery?>';
        var filtros_no_nativos_ar = new Array();
        var filtros_arr_main = [];

        filtros_no_nativos_ar['main_grid'] = new Array();
        filtros_no_nativos_ar['grid_inspecciones'] = new Array();
        filtros_no_nativos_ar['detalles_grid'] = new Array();


        var datos_main_grid = new GridParam({
                id_menu:<?=$_POST['p_n_id_menu']?>,
                n_grid:0,
                n_orden: 0,
                m_autoquery:p_m_autoquery,
                param: {':p_n_expediente':p_n_expediente, ':p_n_cuit' :limpiar_formato_cuit(p_n_cuit)
                    , ':p_d_denominacion' :p_d_denominacion, ':p_n_documento' :limpia_dni(p_n_documento)}
            });

        var datos_detalles_grid = new GridParam({
            id_menu:<?=$_POST['p_n_id_menu'];?>,
            n_grid:1,
            n_orden: 1,
            m_autoquery:'N'
        });

        var datos_modal_grid = new GridParam({
            id_menu:<?=$_POST['p_n_id_menu'];?>,
            n_grid:2,
            n_orden: 2,
            m_autoquery:'N'
        });

        var datos_cuit_inspecciones = new GridParam({
            id_menu:<?=$_POST['p_n_id_menu'];?>,
            n_grid:3,
            n_orden: 3,
            m_autoquery:p_m_autoquery,
            param: {':p_n_expediente':p_n_expediente, ':p_n_cuit' :limpiar_formato_cuit(p_n_cuit),
                    ':p_n_documento' :limpia_dni(p_n_documento)}
        });

        let v_lista_inspecciones = '<?=$lista_inspecciones?>';
        let v_lista_eventos = '<?=$lista_eventos?>';
        let v_lista_inspectores = '<?=$lista_inspectores?>';
        let v_lista_tributos = '<?=$lista_tributos?>';
        let v_lista_solicitud_info = '<?=$lista_solicitud_info?>';
        var proceso;
        var v_id_menu = '<?=$p_n_id_menu?>';
        var id_evento;
        var id_inspeccion;
        var n_movimiento;

        $(document).ready(function() {
            inicializarGrillas();
            inicializa_lupas();
            inicializa_eventos();
        });

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>