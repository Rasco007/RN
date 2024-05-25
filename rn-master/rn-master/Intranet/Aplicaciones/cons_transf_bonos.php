<?php
require_once(INTRANET."header.php");
include('cons_transf_bonos/html/main.html');
$lista_bonos = fun_id_lista('LISTA TIPOS DE BONOS');
$p_id_menu = $_POST['p_n_id_menu'];
$p_n_transfer = $_POST['n_transfer'];
?>
    <link rel="stylesheet" type="text/css" href="cons_transf_bonos/css/styles.css">
    <script type="text/javascript" src="cons_transf_bonos/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="cons_transf_bonos/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">
        var v_lista_bonos = '<?=$lista_bonos?>';
        var v_id_menu = '<?=$p_id_menu?>';
        var datos_grid_transf_bonos;
        var datos_grid_aplicacion_bonos;
        var filtros_no_nativos_ar = [];
        var seleccionoUnaFila = false;
        var n_transfer = '<?=$p_n_transfer?>';
        $(document).ready(function() {
            init_eventos();
            init_grillas();
        });

        var filtros_no_nativos_ar = new Array();
        var filtros_arr_main = [];

        filtros_no_nativos_ar['datos_grid_transf_bonos'] = new Array();
        filtros_no_nativos_ar['datos_grid_aplicacion_bonos'] = new Array();
        
    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
