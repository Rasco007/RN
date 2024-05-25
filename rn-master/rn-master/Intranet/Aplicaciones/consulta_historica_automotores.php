<?php
require_once(FRAMEWORK_DIR."header.php");

$p_n_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');

$lista_dominios = fun_id_lista('LISTA DOMINIOS CONS HIST MOV');
$lista_dominios_viejos = fun_id_lista('LISTA DOMINIOS ANTERIORES CONS HIST MOV');


#HTML PRINCIPAL
include('consulta_historica_automotores/html/principal.html');
include('consulta_historica_automotores/html/modal.html');
?>
    <link rel="stylesheet" type="text/css" href="consulta_historica_automotores/css/styles.css?no_cache=<?=date('dmyhis')?>'" />

<script type='text/javascript' src='consulta_historica_automotores/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

    <script type='text/javascript' src='consulta_historica_automotores/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var fecha_hoy = '<?=$fecha_hoy?>';
       
        var v_lista_dominios = '<?=$lista_dominios?>';
        var v_lista_dominios_viejos = '<?=$lista_dominios_viejos?>';

        var ajax_autocomplete = null;
        var filtros_no_nativos_ar = [];
        var filtros_arr_main = [];
        var v_no_carga_inicial_pph = false;
        var v_id_menu = '<?=$p_n_id_menu?>';


        var datos_main_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
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