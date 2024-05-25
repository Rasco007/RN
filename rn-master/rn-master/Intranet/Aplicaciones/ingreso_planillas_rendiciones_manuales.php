<?php
require_once(FRAMEWORK_DIR."header.php");
$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];
include('ingreso_planillas_rendiciones_manuales/html/main.html');
?>


<script type='text/javascript' src='ingreso_planillas_rendiciones_manuales/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='ingreso_planillas_rendiciones_manuales/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='ingreso_planillas_rendiciones_manuales/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>

<script type="text/javascript">
    var fecha_hoy = '<?=$fecha_hoy?>';
    var v_lista_bancos = '<?=fun_id_lista('LISTADO DE BANCOS ING REMESAS')?>';
    var v_lista_sucursales = '<?=fun_id_lista('LISTADO DE SUCURSAL POR COD BANCO')?>';
    var v_lista_tributos = '<?=fun_id_lista('LISTA TRIBUTO RENDICIONES CAB')?>';
    var v_lista_codigo_form = '<?=fun_id_lista('LISTA CODIGO FORM REND CAB')?>';
    var p_c_banco='';
    var p_c_sucursal='';
    var p_f_acred='';
    var p_f_pago='';
    var P_ID_RENDICION;
    var p_n_remito;
    var seCargo;
    var p_id_menu = '<?= $p_id_menu ?>';
    var filtros_no_nativos_ar = [];
    var filtros_arr_main = [];
    filtros_no_nativos_ar['main_grid'] = filtros_arr_main;
    filtros_no_nativos_ar['det_grid'] = filtros_arr_main;
    filtros_no_nativos_ar['main_grid_tmp'] = filtros_arr_main;
    filtros_no_nativos_ar['det_grid_tmp'] = filtros_arr_main;

    var v_oper = null;
    var v_id_sesion = null;

    $("#tot_cantidad").val("");

    $("#tot_impue").val("");

    $("#tot_tasa").val("");

    $("#tot_total").val("");
    

    var main_grid = new GridParam({
        id_menu:p_id_menu,
        n_grid:0,
        m_autoquery:'N',
        param:{
            ':P_C_BANCO':p_c_banco,
            ':P_C_SUCURSAL':p_c_sucursal,
            ':P_F_ACRED':p_f_acred,
            ':P_F_PAGO' :p_f_pago
        },
        n_orden : 5
    });

    var det_grid =new GridParam({
        id_menu:p_id_menu,
        n_grid:1,
        m_autoquery:'N',
        n_orden : 6
    })

    var main_grid_tmp = new GridParam({
        id_menu:p_id_menu,
        n_grid:2,
        m_autoquery:'N',
        param:{},
        n_orden : 7
    });

    var det_grid_tmp =new GridParam({
        id_menu:p_id_menu,
        n_grid:3,
        m_autoquery:'N',
        n_orden : 8
    })

    $(document).ready(function() {
        init_grillas();
        init_eventos();
        init_lupas();
        obtener_id_sesion();
    });
    
</script>
<?php
require_once(FRAMEWORK_DIR."footer.php");
?>