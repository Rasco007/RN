<?php
require_once(INTRANET."header.php");
include('cons_pagos_acred/html/principal.html');
?>

    <link rel="stylesheet" type="text/css" href="cons_pagos_acred/css/estilos.css">
    <script type="text/javascript" src="cons_pagos_acred/js/elementos.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="cons_pagos_acred/js/grillas.js?no_cache=<?=date('dmy')?>"></script>

    <script type="text/javascript">
        var cons_pagos_acred_grid = new GridParam({
            id_menu:10894,
            n_grid:0,
            m_autoquery:'S'
        });

        $(document).ready(function($){
            init_grillas(<?= $_POST['p_n_id_menu']; ?>);
        })

    </script>
<?php
require_once(INTRANET."footer.php");
?>