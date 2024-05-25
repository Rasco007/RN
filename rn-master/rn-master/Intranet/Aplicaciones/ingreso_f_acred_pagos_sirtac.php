<?php
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$m_autoquery = $_POST['p_m_autoquery'];

include('ingreso_f_acred_pagos_sirtac/html/principal.html');
include('ingreso_f_acred_pagos_sirtac/html/modals.html');
?>
    <link rel="stylesheet" type="text/css" href="ingreso_f_acred_pagos_sirtac/css/estilos.css">
    <script type="text/javascript" src="ingreso_f_acred_pagos_sirtac/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="ingreso_f_acred_pagos_sirtac/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="ingreso_f_acred_pagos_sirtac/js/funciones.js?no_cache=<?=date('dmy')?>"></script>


    <script type="text/javascript">
        var v_id_menu = '<?=$p_id_menu?>';
        var f_pagos = [];
        var m_autoquery = '<?=$m_autoquery?>';

        var datos_pagos_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:m_autoquery,
        });

        var datos_detalle_pagos_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:1,
            m_autoquery:m_autoquery,
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