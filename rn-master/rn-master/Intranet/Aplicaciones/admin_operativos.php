<?php
require_once(INTRANET . "header.php");
require_once('admin_operativos/php/traer_datos.php');
require_once('admin_operativos/php/verificar_perfiles.php');
require_once('admin_operativos/php/verificar_sector.php');

$id_lista_planes = fun_id_lista('Lista de Planes Fisca Interna Operativos');
$id_lista_programas = fun_id_lista('Lista de Programas Fisca Interna');

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$user = $_SESSION['usuario'];

$data_sector = verificar_sector($user);
$p_sector = $data_sector['SECTORES'];

$data_inconsistencias = traer_datos (316, 'tablaGeneral',$p_sector); //traemos las inconsistencias de la tabla general 316
$data_estados         = traer_datos(999, 'tablaGeneral', 'OPE');  //traemos los estados de la tabla general 999
$data_estados_detalle = traer_datos(999, 'tablaGeneral', 'OPE_DET');  //traemos los estados de la tabla general 999
$data_procedimientos = traer_datos(997, 'tablaGeneral', null); //traemos los procedimientos de la tabla general 997
$data_formatos = traer_datos(919, 'tablaGeneral', null); //traemos los formatos de archivos de la tabla general 919
$data_departamentos = traer_datos(89, 'tablaGeneral', $p_sector); //traemos los departamentos del sector de la tabla general 89
$data_tributos = traer_datos(null, 'tributo', null); //traemos los tributos
$data_plantilla_mails = traer_datos(null, 'plantilla', null); //traemos las plantillas de mail

$data_perfiles = verificar_perfiles($user);
$p_fisca_total = $data_perfiles['FISCA_INTERNA'];
$p_fisca_prev = $data_perfiles['FISCA_PREVENTIVA'];

#HTML PRINCIPAL
include('admin_operativos/html/principal.html');
include('admin_operativos/html/modal_abm_operativo.html');
include('admin_operativos/html/modal_estado.html');
?>

<script type='text/javascript' src='admin_operativos/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='admin_operativos/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='admin_operativos/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    //VARIABLES GLOBALES
    var filtros_no_nativos_ar = new Array();
    filtros_no_nativos_ar['main_grid'] = new Array();
    filtros_no_nativos_ar['detail_grid'] = new Array();
    var v_id_menu = '<?=$p_id_menu?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var fisca_total = '<?=$p_fisca_total?>';
    var fisca_prev = '<?=$p_fisca_prev?>';
    var p_sector = '<?=$p_sector?>';
    var contiene_detalle = false;
    var id_lista_planes = '<?=$id_lista_planes?>';
    var id_lista_programas = '<?=$id_lista_programas?>';

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:0,
        m_autoquery:v_m_autoquery,
        param:{':p_n_operativo':null,
            ':p_c_inconsistencia':null,
            ':p_c_estado':null,
            ':p_c_departamento': null}
    });

    var datos_detail_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:1,
        m_autoquery:v_m_autoquery,
        param:{':p_n_operativo':null}
    });

    var datos_errores_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:2,
        m_autoquery:v_m_autoquery,
        param:{':p_n_operativo':null}
    });

    $(document).ready(function() {
        inicializar_grillas();
        inicializar_eventos();
    });
</script>

<?php
require_once(INTRANET."footer.php");
?>

