<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_remito = $_POST['p_remito'];
$p_id_menu = $_POST['p_n_id_menu'];

include('acreditacion_masiva_pagos/HTML/principal.html');

?>
<script type='text/javascript' src='acreditacion_masiva_pagos/JS/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='acreditacion_masiva_pagos/JS/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='acreditacion_masiva_pagos/JS/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var v_lista_bancos = '<?=fun_id_lista('LISTADO DE BANCOS SEGUN CODIGO')?>';
    var v_lista_sucursales = '<?=fun_id_lista('LISTADO DE SUCURSAL POR COD BANCO')?>';
    var v_lista_remitos = '<?=fun_id_lista('LISTADO REMITOS ACRED PAGOS')?>';
    var fecha_hoy = '<?=$fecha_hoy?>';
    var marcar_todas_seleccionado = false;
    var p_remito = '<?=$p_remito?>';
    var p_remito_esp ;
    var f_acred_esp ;
    var f_pago_esp ;
    var n_cantidad_procesados_esp ;
    var v_banco;
    var p_id_menu = '<?=$p_id_menu?>';
    var filtros_no_nativos_ar = [];
    var filtros_arr_main = [];
    filtros_no_nativos_ar['agrup_det_grid'] = filtros_arr_main;
    filtros_no_nativos_ar['casos_especiales_grid'] = filtros_arr_main;

    var agrup_det_grid = new GridParam({
        id_menu:p_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var casos_especiales_grid = new GridParam({
        id_menu:p_id_menu,
        n_grid:1,
        n_orden:0,
        m_autoquery:'N',
        param:{'p_n_remito':''}
    });

    $(document).ready(function() {
        inicializarEventos();
        inicializarLupas();
        init_grillas();
        llenar_checks();


    });
    
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>