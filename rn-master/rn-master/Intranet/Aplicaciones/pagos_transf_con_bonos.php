<?php
require_once(INTRANET."header.php");
include('pagos_transf_con_bonos/html/main.html');

$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];

$lista_delegaciones = fun_id_lista('LISTADO DE DELEGACIONES');

$lista_bonos_transf = fun_id_lista('LISTADO DE BONOS TRANSFERENCIAS');



?>
    <link rel="stylesheet" type="text/css" href="pagos_transf_con_bonos/css/styles.css">
    <script type="text/javascript" src="pagos_transf_con_bonos/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="pagos_transf_con_bonos/js/funciones.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="pagos_transf_con_bonos/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">
        var fecha_hoy = '<?=$fecha_hoy?>';
        var v_lista_prov = '<?=$lista_delegaciones?>';
        var lista_bonos_transf = '<?=$lista_bonos_transf?>';
        var v_id_menu = '<?=$p_id_menu?>';
        var ajax_autocomplete = null;
        let f_vto_2;
        let importe_saldo;

        $(document).ready(function() {
            init_eventos();
            init_grillas();
        });

        var filtros_no_nativos_ar = new Array();
        var filtros_arr_main = [];

        filtros_no_nativos_ar['datos_grid_aplicacion_bonos'] = new Array();
        filtros_no_nativos_ar['grid_tranf_bonos'] = new Array();
        //filtros_no_nativos_ar['detalles_grid'] = new Array();

    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
