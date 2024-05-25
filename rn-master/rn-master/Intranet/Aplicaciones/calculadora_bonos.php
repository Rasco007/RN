<?php
require_once(INTRANET."header.php");
include('calculadora_bonos/html/main.html');

$fecha_hoy = date('d/m/Y');

$p_id_menu = $_POST['p_n_id_menu'];

$lista_bonos = fun_id_lista('LISTADO DE BONOS SEGUN FECHA');

?>
    <link rel="stylesheet" type="text/css" href="calculadora_bonos/css/styles.css">
    <script type="text/javascript" src="calculadora_bonos/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="calculadora_bonos/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">
        var fecha_hoy = '<?=$fecha_hoy?>';
        var v_id_menu = '<?=$p_id_menu?>';
        var v_lista_bonos = '<?=$lista_bonos?>';
        var grid_calcula_bonos;
        var filtros_no_nativos_ar = new Array();
        var filtros_arr_main = [];

        filtros_no_nativos_ar['grid_calcula_bonos'] = new Array();

        $(document).ready(function() {
            init_eventos();
            init_grillas();
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
