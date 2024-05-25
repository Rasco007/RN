<?php
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$m_autoquery = $_POST['p_m_autoquery'];

include('consulta_coti_bonos/html/principal.html');
?>
    <script type="text/javascript" src="consulta_coti_bonos/js/grillas.js?no_cache=<?=date('dmy')?>"></script>

    <script type="text/javascript">
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';

        var datos_bonos_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:v_m_autoquery
        });

        $(document).ready(function($){
            init_grillas();
        });

    </script>


<?php
require_once(INTRANET."footer.php");
?>