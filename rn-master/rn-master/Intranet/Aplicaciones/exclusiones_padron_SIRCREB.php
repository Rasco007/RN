<?php
require_once(FRAMEWORK_DIR."header.php");

//PONER PARAMETROS DE MI FORM
$p_n_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');



$lista_alicuotas = fun_id_lista('LISTADO DE ALICUOTAS SIRCREB');
$lista_tributos = fun_id_lista('LISTADO DE TRIBUTOS DE INGRESOS DE BRUTOS');
$lista_objetos = fun_id_lista('LISTADO OBJETOS HECHO TRIBA033');
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES TRIBA033');

#HTML PRINCIPAL
include('exclusiones_padron_SIRCREB/html/principal.html');
include('exclusiones_padron_SIRCREB/html/modal.html');
?>
    <link rel="stylesheet" type="text/css" href="exclusiones_padron_SIRCREB/css/styles.css?no_cache=<?=date('dmyhis')?>'" />
    <script type='text/javascript' src='exclusiones_padron_SIRCREB/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='exclusiones_padron_SIRCREB/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='exclusiones_padron_SIRCREB/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var filtros_no_nativos_ar = [];
        var filtros_arr_main = [];

        var fecha_hoy = '<?=$fecha_hoy?>';

        var v_lista_alicuotas = '<?=$lista_alicuotas?>';
        var v_lista_tributos = '<?=$lista_tributos?>';
        var v_lista_objetos = '<?=$lista_objetos?>';
        var v_lista_denominaciones = '<?=$lista_denominaciones?>';
        
        
        var ajax_autocomplete = null;
        var v_no_carga_inicial_pph = false;

        var v_id_menu = '<?=$p_n_id_menu?>';

       var p_regimen;
       var p_alicuota;
       var p_titulo;
       var p_in_ex;

        filtros_no_nativos_ar['detalles_grid'] = [];

        var datos_main_grid = new GridParam({
            id_menu:100146,
            n_grid:0,
            m_autoquery:'S'
        });

        var datos_detalles_grid = new GridParam({
            id_menu:100146,
            n_grid:1,
            n_orden: 0,
            m_autoquery:'N'
        });

        $(document).ready(function() {
            inicializarGrillas();
            inicializa_lupas();
            inicializa_eventos();
        });

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>