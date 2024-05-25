<?php
require_once(INTRANET."header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$p_tributo = $_POST['p_tributo'];
$p_tipo_pago = $_POST['p_tipo_pago'];
if( isset($_POST['p_bono_ley_4735']) ){
    $p_bono_ley_4735 = $_POST['p_bono_ley_4735'];
} else {
    $p_bono_ley_4735 = 'N';
}

if( isset($_POST['p_pagos_lapos']) ){
    $p_pagos_lapos = $_POST['p_pagos_lapos'];
} else {
    $p_pagos_lapos = 'N';
}


// $lista_timp = fun_id_lista('LISTADO DE TRIBUTOS POR CONTRIBUYENTE Y OBJETOS');


$fecha_hoy = date('d/m/Y');
include('ingr_pagos_prov_comp/html/principal.html');
?>

    <link rel="stylesheet" type="text/css" href="ingr_pagos_prov_comp/css/estilos.css">
    <script type='text/javascript' src='ingr_pagos_prov_comp/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='ingr_pagos_prov_comp/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='ingr_pagos_prov_comp/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='ingr_pagos_prov_comp/js/lupas.js?no_cache=<?=date('dmyhis')?>'></script>

    <script>
        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var fecha_hoy = '<?=$fecha_hoy?>';
        var p_tributo = '<?=$p_tributo?>';
        var p_tipo_pago = '<?=$p_tipo_pago?>';
        var p_bono_ley_4735 = '<?=$p_bono_ley_4735?>';
        var p_pagos_lapos = '<?=$p_pagos_lapos?>';
        var v_lista_bancos = '<?=fun_id_lista('LISTADO DE BANCOS POR PAGO LAPO')?>';
        var v_lista_sucursales = '<?=fun_id_lista('LISTADO DE SUCURSAL SEGUN BANCO')?>';
        var v_lista_delegaciones = '<?=fun_id_lista('LISTA DELEGACIONES BOL_AGR')?>';
        var v_lista_contribuyentes = '<?=fun_id_lista('LISTADO CONTRIBUYENTES BOL_AGR')?>';


        var boletas_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:0,
            n_orden:7,
            m_autoquery:'N',
            param: {}
        });

        $(document).ready(function() {
            inicializarGrillas();
            inicializarEventos();
            inicializarLupas();
            inicializarCondicionales();
        });
    </script>


<?php
require_once(INTRANET."footer.php");
?>