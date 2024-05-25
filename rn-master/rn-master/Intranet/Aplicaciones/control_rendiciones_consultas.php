<?php
require_once(FRAMEWORK_DIR."header.php");

$fecha_hoy = date('d/m/Y');
$p_modo = $_POST['p_modo'];
$p_id_menu = $_POST['p_n_id_menu'];

include('control_rendiciones_consultas/html/principal.html');

?>
<script type='text/javascript' src='control_rendiciones_consultas/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='control_rendiciones_consultas/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='control_rendiciones_consultas/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    var v_lista_bancos = '<?=fun_id_lista('LISTADO DE BANCOS SEGUN CODIGO')?>';
    var v_lista_sucursales = '<?=fun_id_lista('LISTADO DE SUCURSAL POR COD BANCO')?>';
    var fecha_hoy = '<?=$fecha_hoy?>';
    var p_modo = '<?=$p_modo?>';
    var p_id_menu = '<?=$p_id_menu?>';
    var grilla_cargada = false;
    var es_primera_carga = true;
    var filtros_no_nativos_ar = [];
    var filtros_arr_main = [];
    var id_sesion;
    filtros_no_nativos_ar['rendiciones_grid'] = filtros_arr_main;
    filtros_no_nativos_ar['detalle_rendicion_grid'] = filtros_arr_main;
    filtros_no_nativos_ar['listado_remesas_grid'] = filtros_arr_main;

    var rendiciones_grid = new GridParam({
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
                'p_m_normal':'',
                'p_m_rts':''}
    });

    var detalle_rendicion_grid = new GridParam({
        id_menu:p_id_menu,
        n_grid:1,
        n_orden:0,
        m_autoquery:'N',
        param:{'p_id_rendicion':''}
    });

    var listado_remesas_grid = new GridParam({
        id_menu:p_id_menu,
        n_grid:2,
        n_orden:0,
        m_autoquery:'N',
        param:{'p_c_banco':'',
               'p_c_sucursal':'',
               'p_f_acred': ''}
    });

    $(document).ready(function() {
        if(p_modo == 'C'){
            $('#titulo').text('Consulta de Rendiciones');
            $('#btn_controlado').hide();
        } else{
            $('#titulo').text('Control de Rendiciones');
        }
        inicializarEventos();
        inicializarGrillas();
        inicializarLupas();
    });
    
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>