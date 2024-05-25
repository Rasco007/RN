<?php
require_once(FRAMEWORK_DIR."header.php");

//PONER PARAMETROS DE MI FORM
$p_n_id_menu = $_POST['p_n_id_menu'];

$cant_reg = $_POST['p_cant_reg'];
$secuencia = $_POST['p_secuencia'];
$d_denominacion = $_POST['p_d_denominacion'];
$p_estado = $_POST['p_estado'];
$linea = $_POST['p_linea'];



//$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS INGRSO DE ARCHIVOS BANELCO');
$lista_tipo_plan = fun_id_lista('LISTADO DE PLANES DE FISCALIZACION');
$lista_plan_fis = fun_id_lista('LISTADO DESCRIPCION DE PLANES DE FISCALIZACION SIN APROBAR');

#HTML PRINCIPAL
include('planes_fiscalizacion/html/principal.html');
?>
    <script type='text/javascript' src='planes_fiscalizacion/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='planes_fiscalizacion/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var ajax_autocomplete = null;
        var proceso;
        var v_id_menu = '<?=$p_n_id_menu?>';
        let v_lista_tipo_plan = '<?=$lista_tipo_plan?>';
        let v_lista_plan_fis = '<?=$lista_plan_fis?>';
        let n_programa_fis;
        let id_plan_fis;
        var filtros_no_nativos_ar = new Array();
        var filtros_arr_main = [];

        filtros_no_nativos_ar['main_grid'] = new Array();
        filtros_no_nativos_ar['detalles_grid'] = new Array();

        var datos_main_grid = new GridParam({
                id_menu:v_id_menu,
                n_grid:0,
                n_orden: 0,
                m_autoquery:'N'
            });

        var datos_detalles_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:1,
            n_orden: 1,
            m_autoquery:'N'
        });

        var datos_main_grid_rechazos = new GridParam({id_menu:v_id_menu,
            n_grid:0,
            m_autoquery:'N'});


        $(document).ready(function() {
            inicializarGrillas();
            initEventos();
            inicializarLupas();
        });

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>