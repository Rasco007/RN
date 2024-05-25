<?php
require_once(INTRANET."header.php");
$p_n_id_menu = $_POST['p_n_id_menu'];
$p_tributo = $_POST['p_tributo'];
$p_concepto = $_POST['p_concepto'];
$p_anio = $_POST['p_año'];
$p_cuota = $_POST['p_cuota'];
$p_id_workflow_log = $_POST['p_id_workflow_log'];
$p_c_tarea = $_POST['p_c_tarea'];
$p_interfaz = $_POST['p_interfaz'];


$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS INGRSO DE ARCHIVOS BANELCO');
$lista_concepto = fun_id_lista('LISTA DE CONCEPTOS INGRESO DE ARCHIVO BANELCO');


#HTML PRINCIPAL
include('generar_interfaz_link_banelco/html/principal.html');
?>
    <script type='text/javascript' src='generar_interfaz_link_banelco/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='generar_interfaz_link_banelco/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='generar_interfaz_link_banelco/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='workflow_general/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

    <script>
        var v_anio = '<?=$p_anio?>';
        var v_cuota = '<?=$p_cuota?>';
        var v_concepto = '<?=$p_concepto?>';
        var v_id_workflow_log = '<?=$p_id_workflow_log ?>';
        var v_c_tarea = '<?=$p_c_tarea ?>';
        var v_tributo = '<?=$p_tributo?>';
        var v_interfaz = '<?=$p_interfaz?>';
        var v_id_menu = '<?=$p_n_id_menu?>';
        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_concepto = '<?=$lista_concepto?>';
        var proceso;
        var datos_main_grid_rechazos = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            m_autoquery:'N'
        });
		
        $(document).ready(function() {
            inicializarLupas();
            inicializarEventos();
            inicializarGrillas();
        });
    </script>
<?php
require_once(INTRANET."footer.php");
?>