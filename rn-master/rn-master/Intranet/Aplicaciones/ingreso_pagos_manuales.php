<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];

include('ingreso_pagos_manuales/html/principal.html');

?>
<script type='text/javascript' src='ingreso_pagos_manuales/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='ingreso_pagos_manuales/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='ingreso_pagos_manuales/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var v_lista_bancos = '<?=fun_id_lista('LISTADO DE BANCOS ING REMESAS')?>';
    var v_lista_sucursales = '<?=fun_id_lista('LISTADO DE SUCURSAL POR COD BANCO')?>';
    var fecha_hoy = '<?=$fecha_hoy?>';
    var grilla_cargada = false;
    var remesas_cargadas = false;
    var p_id_menu = '<?=$p_id_menu?>';

    var consulta_grid = new GridParam({
        id_menu:p_id_menu,
        n_grid:0,
        n_orden:0,
        m_autoquery:'N',
        param:{}
    });

    var remesas_grid = new GridParam({
        id_menu:p_id_menu,
        n_grid:1,
        n_orden:0,
        m_autoquery:'N',
        param:{'p_c_banco':'',
               'p_c_sucursal':'',
               'p_f_acred':'',
               'p_f_pago':''}
    });

    $(document).ready(function() {
        inicializarEventos();
        inicializarGrillas();
        inicializarLupas();
    });
    
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>