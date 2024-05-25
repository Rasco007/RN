<?php
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];

include('ingreso_f_acred_pagos_sifere/html/principal.html');
include('ingreso_f_acred_pagos_sifere/html/modals.html');

$fecha_hoy = date('d/m/Y');
?>
    <link rel="stylesheet" type="text/css" href="ingreso_f_acred_pagos_sifere/css/estilos.css">
    <script type="text/javascript" src="ingreso_f_acred_pagos_sifere/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="ingreso_f_acred_pagos_sifere/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
    <script type="text/javascript" src="ingreso_f_acred_pagos_sifere/js/funciones.js?no_cache=<?=date('dmy')?>"></script>

    <script type="text/javascript">

        var v_id_menu = '<?=$p_id_menu?>';
        var fecha_hoy = '<?=$fecha_hoy?>';

        var filtros_no_nativos_ar = [];
        var filtros_arr_main = [];
        filtros_no_nativos_ar['datos_mov_banc_grid'] = filtros_arr_main;

        var datos_mov_banc_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:'N',
            param:{':p_tipo_reg':null, ':p_org_rec':null, ':p_banco_adm':null, ':p_f_proceso':null, ':p_f_acred':null, ':p_i_tot_deb':null, ':p_i_tot_cred':null, ':p_f_concil':null, ':p_f_acred_dgr':null}
        });

        $(document).ready(function($){
            init_grillas();
            init_eventos();
        });
    </script>


<?php
require_once(INTRANET."footer.php");
?>