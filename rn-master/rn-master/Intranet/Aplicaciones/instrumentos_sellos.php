<?php
require_once(INTRANET."header.php");
include('instrumentos_sellos/html/principal.html');
?>

    <link rel="stylesheet" type="text/css" href="instrumentos_sellos/css/estilos.css">
    <script type="text/javascript" src="instrumentos_sellos/js/grillas.js?no_cache=<?=date('dmy')?>" async></script>

    <script type="text/javascript">
        var inst_sellos_grid = new GridParam({
            id_menu:10895,
            n_grid:0,
            m_autoquery:'S'
        });

        $(document).ready(function($){
            iniciarGrillas();
        });
    </script>

<?php
require_once(INTRANET."footer.php");
?>