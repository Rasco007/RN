<?php
require_once(INTRANET."header.php");
$p_n_id_menu = $_POST['p_n_id_menu'];

$lista_doc = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_trib = fun_id_lista('LISTADO TRIBUTOS CESE PROVISORIO');
$lista_motivos_cese = fun_id_lista('LISTADO MOTIVOS CESE PROVISORIO TRIB');
$lista_obj_hecho = fun_id_lista('LISTA DE OBJETOS SEGUN TRIBUTO CYL PAGOS ACREDITADOS');
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');

$query = "SELECT ppal.FUN_TIENE_PERMISO('TOTAL Intranet') TOTAL_Intranet from dual";
//$query = "SELECT PPAL.GET_INFO_USER ('c_usuario') TOTAL_Intranet from dual";
$db_query ->setQuery($query);
$row = $db_query->do_query();

$TOTAL_Intranet  = $row[0]['TOTAL_INTRANET'];

$query = "SELECT ppal.FUN_TIENE_PERMISO('AUT_ALTA_CESE_CM') AUT_ALTA_CESE_CM from dual";
$db_query ->setQuery($query);
$row = $db_query->do_query();

$aut_alta_cese_cm = $row[0]['AUT_ALTA_CESE_CM'];

$query = "SELECT ppal.FUN_TIENE_PERMISO('AUT_CESE_RS') AUT_CESE_RS from dual";
$db_query ->setQuery($query);
$row = $db_query->do_query();

$aut_alta_cese_rs = $row[0]['AUT_CESE_RS'];

$fecha_hoy = date('d/m/Y');

#HTML PRINCIPAL
include('cese_provisorio_tributo/html/principal.html');
include('cese_provisorio_tributo/html/modals.html');
?>
    <style>

    </style>
    <script type='text/javascript' src='cese_provisorio_tributo/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='cese_provisorio_tributo/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='cese_provisorio_tributo/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

    <script>
        var filtros_no_nativos_ar = [];
        var filtros_arr_main = [];
        var v_id_menu = '<?=$p_n_id_menu?>';
        var ajax_autocomplete;
        var v_lista_doc = '<?=$lista_doc?>';
        var v_lista_denominaciones = '<?=$lista_denominaciones?>';

        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_motivos_cese = '<?=$lista_motivos_cese?>';
        var v_lista_obj_hecho = '<?=$lista_obj_hecho?>';

        var TOTAL_Intranet = '<?=$TOTAL_Intranet?>';
        var aut_alta_cese_cm  = '<?=$aut_alta_cese_cm?>';
        var aut_alta_cese_rs  = '<?=$aut_alta_cese_rs?>';
        var fecha_hoy = '<?=$fecha_hoy?>';

        filtros_no_nativos_ar['main_grid_actividades_ibd'] = new Array();
        filtros_no_nativos_ar['main_grid_actividades_cm'] = new Array();
        filtros_no_nativos_ar['main_grid_comercios'] = new Array();
        filtros_no_nativos_ar['main_grid_jurisdicciones'] = new Array();

        var datos_main_grid_actividades_ibd = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:'N'
        });

        var datos_main_grid_actividades_cm = new GridParam({
            id_menu: v_id_menu,
            n_grid:4,
            m_autoquery:'N'
        });

        var datos_main_grid_jurisdicciones = new GridParam({
            id_menu: v_id_menu,
            n_grid:1,
            m_autoquery:'N'
        });

        var datos_main_grid_comercios = new GridParam({
            id_menu: v_id_menu,
            n_grid:2,
            m_autoquery:'N'
        });

        var datos_main_grid_errores = new GridParam({
            id_menu: v_id_menu,
            n_grid:3,
            m_autoquery:'N'
        });


        $(document).ready(function() {
            inicializarGrillas();
            inicializarEventos();
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?>