<?php

require_once(FRAMEWORK_DIR."header.php");

$p_n_id_menu = $_POST['p_n_id_menu'];
include('consulta_bajas_provisorias/html/main.html');

?>
<script type='text/javascript' src='consulta_bajas_provisorias/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='consulta_bajas_provisorias/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>

    var p_dominio;
    var p_c_cese_motivo_prov;
    var p_f_cese_prov;
    var v_id_menu='<?=$p_n_id_menu?>';
    var p_n_tabla_deleg;
    var p_c_delegacion;
    var p_c_motivo;
    var p_f_movimiento;

    var main_grid= new GridParam({
        id_menu:v_id_menu,
        n_grid:1,
        n_orden:0,
        m_autoquery:'N',
        param: {':p_dominio':null,
                ':p_c_motivo':null,
                ':p_f_movimiento':null
                }
    })

    $(document).ready(function() {
        init_grillas();

        init_eventos();

    });
    
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>