<?php
require_once(FRAMEWORK_DIR."header.php");

$p_n_id_menu = $_POST['p_n_id_menu'];

$d_plan_fisca = $_POST['d_plan_fisca'];
$c_tipo_documento = $_POST['c_tipo_documento'];
$d_tipo_documento = $_POST['d_tipo_documento'];
$fecha_hoy = date('d/m/Y');

$lista_inspecciones = fun_id_lista('LISTADO DE INSPECCIONES');
$lista_eventos = fun_id_lista('LISTADO DE EVENTOS DE MOVIMIENTOS');
$lista_inspectores = fun_id_lista('LISTADO DE INSPECTORES');
$lista_tipos_personal = fun_id_lista('LISTADO DE TIPOS DE PERSONAL');
$lista_sectores_fisca = fun_id_lista('LISTADO DE SECTORES DE FISCALIZACION');
$lista_usuarios_internos = fun_id_lista('LISTA USUARIOS INTERNOS');
#HTML PRINCIPAL
include('Ingreso_personal_de_fiscalizacion/html/principal.html');
include('Ingreso_personal_de_fiscalizacion/html/modal.html');

?>
<style>

</style>

    <link rel="stylesheet" type="text/css" href="Ingreso_personal_de_fiscalizacion/css/styles.css?no_cache=<?=date('dmyhis')?>'" />
    <script type='text/javascript' src='Ingreso_personal_de_fiscalizacion/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='Ingreso_personal_de_fiscalizacion/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var p_id_menu = '<?=$p_n_id_menu?>';

        var fecha_hoy = '<?=$fecha_hoy?>';
        var v_d_plan_fisca = '<?=$d_plan_fisca?>';
        var v_c_tipo_documento = '<?=$c_tipo_documento?>';
        var v_d_tipo_documento = '<?=$d_tipo_documento?>';

        var ajax_autocomplete = null;

        var datos_main_grid = new GridParam({
                id_menu: p_id_menu,
                n_grid:0,
                n_orden: 0,
                m_autoquery:'N'
            });

        let v_lista_inspecciones = '<?=$lista_inspecciones?>';
        let v_lista_eventos = '<?=$lista_eventos?>';
        let v_lista_inspectores = '<?=$lista_inspectores?>';
        let v_lista_tipos_personal = '<?=$lista_tipos_personal?>';
        let v_lista_sectores_fisca = '<?=$lista_sectores_fisca?>';
        let v_lista_usuarios_internos = '<?=$lista_usuarios_internos?>';
        var proceso;
        var id_evento;
        var id_inspeccion;
        var n_movimiento;
        var filtros_no_nativos_ar = new Array();
        var filtros_arr_main = [];

        filtros_no_nativos_ar['main_grid'] = new Array();

        $(document).ready(function() {
            inicializa_eventos();
            inicializa_lupas();
            inicializarGrillas();
        });



    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>