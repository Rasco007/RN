<?php
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$m_autoquery = $_POST['p_m_autoquery'];

include('ingreso_pagos_def_rnpa/html/principal.html');
?>
    <link rel="stylesheet" type="text/css" href="ingreso_pagos_def_rnpa/css/estilos.css">
    <script type="text/javascript" src="ingreso_pagos_def_rnpa/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="ingreso_pagos_def_rnpa/js/funciones.js?no_cache=<?=date('dmy')?>"></script>


    <script type="text/javascript">
        var v_id_menu = '<?=$p_id_menu?>';

        $(document).ready(function($){
            init_eventos();
        });

    </script>


<?php
require_once(INTRANET."footer.php");
?>