<?php
require_once(INTRANET . "header.php");
require_once('admin_inspecciones/php/verificar_perfiles.php');
require_once('admin_inspecciones/php/traer_datos.php');

$id_lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');
$id_lista_inspectores = fun_id_lista('Lista de Inspectores Fisca Interna');
$id_lista_supervisores = fun_id_lista('Lista de Supervisores Fisca Interna');
$id_lista_inscripciones = fun_id_lista('Inscripciones a Ingresos Brutos de un Contribuyente');
$id_lista_planes = fun_id_lista('Lista de Planes Fisca Interna');
$c_id_lista_planes = fun_id_lista('PLANES FISCA CONSULTA');
$id_lista_programas = fun_id_lista('Lista de Programas Fisca Interna');

$fecha_hoy = date('d/m/Y');
$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$user = $_SESSION['usuario'];

$data_procedimientos = traer_datos(997); //traemos los procedimientos de la tabla general 997
$data_tipos_inspeccion = traer_datos(315); //traemos los tipos de inspeccion de la tabla general 315
$data_motivos_fiscalizacion = traer_datos(90); //traemos los motivos de fiscalizacion de la tabla general 90
$data_motivos_ajuste = traer_datos(316); //traemos los motivos de ajuste de la tabla general 316
$data_reglas = traer_datos(318); //traemos las reglas de la tabla general 318

$data_perfiles = verificar_perfiles($user);
$p_fisca_interna = $data_perfiles['FISCA_INTERNA'];
$p_fisca_total = $data_perfiles['FISCA_TOTAL'];

#HTML PRINCIPAL
include('admin_inspecciones/html/principal.html');
include('admin_inspecciones/html/modal_asignacion.html');
include('admin_inspecciones/html/modal_apertura.html');
include('admin_inspecciones/html/modal_abm_inspeccion.html');
include('admin_inspecciones/html/modal_abm_alcance.html');
include('admin_inspecciones/html/modal_estimados.html');
?>

<script type='text/javascript' src='admin_inspecciones/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='admin_inspecciones/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='admin_inspecciones/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

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
    var fisca_interna = '<?=$p_fisca_interna?>';
    var fisca_total = '<?=$p_fisca_total?>';
    var posee_tmp = false;
    var evento = null;
    var criterio = null;
    var v_n_personal_usuario = null;
    var v_id_inspector_inspeccion = null;
    var v_id_supervisor_inspeccion = null;
    var v_sector_usuario = null;
    var v_sector_inspeccion = null;
    var id_lista_denominaciones = '<?=$id_lista_denominaciones?>';
    var id_lista_inspectores = '<?=$id_lista_inspectores?>';
    var id_lista_supervisores = '<?=$id_lista_supervisores?>';
    var id_lista_inscripciones = '<?=$id_lista_inscripciones?>';
    var id_lista_planes = '<?=$id_lista_planes?>';
    var c_id_lista_planes = '<?=$c_id_lista_planes?>';
    var id_lista_programas = '<?=$id_lista_programas?>';

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        m_autoquery:v_m_autoquery,
        param:{':p_n_expediente':null,
            ':p_n_anio':null,
            ':p_id_contribuyente':null,
            ':p_n_inspeccion': null,
            ':p_id_plan_fis': null,
            ':p_n_programa_fis': null}
    });

    var datos_detail_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:1,
        m_autoquery:'N',
        param:{':p_id_inspeccion':null}
    });

    $(document).ready(function() {
        inicializar_grillas();
        inicializar_eventos();
    });
</script>

<?php
require_once(INTRANET."footer.php");
?>
