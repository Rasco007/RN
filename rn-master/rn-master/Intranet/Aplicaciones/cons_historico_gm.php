<?php
require_once(INTRANET . "header.php");

$p_tributo = $_POST['p_tributo'];

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

include('cons_historico_gm/html/principal.html');
include('cons_historico_gm/html/grid_modal.html');
?>
<script type="text/javascript" src="cons_historico_gm/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="cons_historico_gm/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="cons_historico_gm/js/funciones.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">

    var v_id_menu = '<?=$p_id_menu?>';

    var p_tributo = '<?=$p_tributo?>';

    var datos_d_historicos_grid = new GridParam({
        id_menu:v_id_menu,
        n_grid:0,
        m_autoquery:'N',
        param:{':p_tributo':null,
            ':p_objeto':null,
            ':p_cd_mov_hist':null,
            ':p_dt_mov_hist_audit':null,
            ':p_dt_mov_audit':null,
            ':p_tm_mov_audit':null,
            ':p_cd_docu_ref':null,
            ':p_provincia':null,
            ':p_oficina':null,
            ':p_cd_user_audit':null,
            ':p_cd_prog_audit':null}
    });

    $(document).ready(function($){
        init_grillas();
        init_eventos();
    });

</script>

<?php
require_once(INTRANET."footer.php");
?>
