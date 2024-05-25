<?php
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$m_autoquery = $_POST['p_m_autoquery'];

include('ingreso_f_acred_pagos_sircar/html/principal.html');
include('ingreso_f_acred_pagos_sircar/html/modals.html');
?>
    <link rel="stylesheet" type="text/css" href="ingreso_f_acred_pagos_sircar/css/estilos.css">
    <script type="text/javascript" src="ingreso_f_acred_pagos_sircar/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="ingreso_f_acred_pagos_sircar/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="ingreso_f_acred_pagos_sircar/js/funciones.js?no_cache=<?=date('dmy')?>"></script>


    <script type="text/javascript">
        var v_id_menu = '<?=$p_id_menu?>';
        var f_pagos = [];
        var filtros_no_nativos_ar = [];
        var filtros_arr_main = [];
        filtros_no_nativos_ar['pagos_grid'] = filtros_arr_main;

        var datos_pagos_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:'S',
        });

        var datos_detalle_pagos_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:1,
            m_autoquery:'S',
            param:{':p_f_pago':null}
        });

        $(document).ready(function($){
            init_grillas();
            init_eventos();
        });

    </script>


<?php
require_once(INTRANET."footer.php");
?>