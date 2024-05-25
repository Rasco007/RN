<?php
require_once(FRAMEWORK_DIR."header.php");

//PONER PARAMETROS DE MI FORM
$p_n_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');
$p_modo = $_POST['p_modo'];

$lista_planes_pago = fun_id_lista('LISTADO PLANES DE PAGO FACP003');
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');
$lista_tipos_de_plan = fun_id_lista('LISTADO TIPOS DE PLANES DE PAGO');
$lista_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
$lista_tipos_imponibles = fun_id_lista('LISTADO DE TIPOS IMPONIBLES');
$lista_de_objetos = fun_id_lista('LISTADO OBJETOS HECHO FACP003');
#HTML PRINCIPAL
include('confirmacion/html/principal.html');
include('confirmacion/html/modal.html');
?>
<style>

</style>
    <link rel="stylesheet" type="text/css" href="confirmacion/css/styles.css?no_cache=<?=date('dmyhis')?>'" />
    <script type='text/javascript' src='confirmacion/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='confirmacion/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='confirmacion/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var fecha_hoy = '<?=$fecha_hoy?>';
        var p_modo = '<?=$p_modo?>';
        
        var v_lista_planes_pago = '<?=$lista_planes_pago?>';
        var vg_lista_denominaciones = '<?=$lista_denominaciones?>';
        var v_lista_tipos_de_plan = '<?=$lista_tipos_de_plan?>';
        var v_lista_documentos = '<?=$lista_documentos?>';
        var v_lista_tipos_imponibles = '<?=$lista_tipos_imponibles?>';
        var v_lista_de_objetos = '<?=$lista_de_objetos?>';
        
        var ajax_autocomplete = null;
        var p_m_autoquery = '<?=$p_m_autoquery?>';
        var filtros_no_nativos_ar = new Array();
        var filtros_arr_main = [];
        var v_no_carga_inicial_pph = false;

        var v_id_menu = '<?=$p_n_id_menu?>';
        filtros_no_nativos_ar['grid_inspecciones'] = new Array();
        filtros_no_nativos_ar['detalles_grid'] = new Array();
        filtros_no_nativos_ar['datos_cuotas_grid'] = new Array();
        filtros_no_nativos_ar['datos_detalles_grid'] = new Array();


        var datos_detalles_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            n_orden: 0,
            m_autoquery:'N'
        });

        var datos_cuotas_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:1,
            n_orden: 1,
            m_autoquery:'N'
        });

        var honorarios_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:2,
            n_orden: 2,
            m_autoquery:'N'
        });

        var relacionados_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:3,
            n_orden: 3,
            m_autoquery:'N'
        });

        $(document).ready(function() {
            inicializarGrillas();
            inicializa_eventos();
        });

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>