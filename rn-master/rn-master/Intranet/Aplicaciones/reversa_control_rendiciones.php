<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];

include('reversa_control_rendiciones/html/principal.html');

?>
<script type='text/javascript' src='reversa_control_rendiciones/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='reversa_control_rendiciones/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='reversa_control_rendiciones/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var v_lista_bancos = '<?=fun_id_lista('LISTADO DE BANCOS SEGUN CODIGO')?>';
    var v_lista_sucursales = '<?=fun_id_lista('LISTADO DE SUCURSAL POR COD BANCO')?>';
    var fecha_hoy = '<?=$fecha_hoy?>';
    var grilla_cargada = false;
    var p_id_menu = '<?=$p_id_menu?>';

    var reversa_rendiciones_grid = new GridParam({
        id_menu:p_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery:'N',
        param:{'p_f_acred':'',
                'p_f_pago':'', 
                'p_c_banco':'', 
                'p_c_sucursal':'',
                'p_m_automatica':'',
                'p_m_manual':'',
                'p_m_fiambrera':''}
    });

    var detalle_reversa_rendicion_grid = new GridParam({
        id_menu:p_id_menu,
        n_grid:1,
        n_orden:0,
        m_autoquery:'N',
        param:{'p_id_rendicion':''}
    });


    $(document).ready(function() {
        inicializarGrillas();
        inicializarLupas();
        inicializarEventos();
        $("#check_automat").prop("checked", true);
        $("#check_manual").prop("checked", true);
        $("#check_pagos_manuales").prop("checked", true);
    });
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>