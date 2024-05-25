<?php
#HEADER DEL FRMWK
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$p_tipo = $_POST['p_tipo'];
$p_concurso_quiebra = $_POST['p_concurso_quiebra'];
$p_exigir_honorarios = $_POST['p_exigir_honorarios'];
$p_id_oblig_min = $_POST['p_id_oblig_min'];
$p_id_oblig_max = $_POST['p_id_oblig_max'];
$p_llamado_desde = $_POST['p_llamado_desde'];
$p_n_plan_pago_ori = $_POST['p_n_plan_pago_ori'];
$p_tipo_plan_ori = $_POST['p_tipo_plan_ori'];
$p_tipo_plan = $_POST['p_tipo_plan'];
$p_deleg = $_POST['p_deleg'];
$p_max_cuotas = $_POST['p_max_cuotas'];
$p_c_tributo = $_POST['p_c_tributo'];
$p_n_cuit = $_POST['p_n_cuit'];
$p_f_emision = $_POST['p_f_emision'];
$p_deuda = $_POST['p_deuda'];
$p_d_objeto_hecho = $_POST['p_d_objeto_hecho'];
$p_c_concepto = $_POST['p_c_concepto'];

#HTML PRINCIPAL
include('liquidacion_anticipada/html/main.html');
include('liquidacion_anticipada/html/modals.html');

$fecha_hoy = date('d/m/Y');
$lista_denom = fun_id_lista('LISTA DENOMINACIONES LIQ ANTI');
$lista_tbl_gen = fun_id_lista('LISTA TABLAS GENERALES PARAMETROS');
$lista_timp = fun_id_lista('LISTA TIPO IMPONIBLE LIQ ANTI');
$lista_obj= fun_id_lista('LISTA OBJETO HECHO LIQ ANTI');
$lista_tipo_planes= fun_id_lista('LISTA TIPO PLANES PAGO LIQ ANTI');
$lista_planes_pago= fun_id_lista('LISTA PLANES PAGO LIQ ANTI');


?>
<link rel="stylesheet" type="text/css" href="liquidacion_anticipada/css/estilos.css">
<script type='text/javascript' src='liquidacion_anticipada/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='liquidacion_anticipada/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='liquidacion_anticipada/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script>

    var v_id_menu = '<?=$p_id_menu?>';
    var fecha_hoy = '<?=$fecha_hoy?>';

    var v_lista_tributos = '<?=$lista_tributos?>';
    var v_lista_denom = '<?=$lista_denom?>';
    var v_lista_tbl_gen = '<?=$lista_tbl_gen?>';
    var v_lista_timp = '<?=$lista_timp?>';
    var v_lista_conceptos = '<?=$lista_conceptos?>';

    var v_lista_tipo_planes = '<?=$lista_tipo_planes?>';
    var v_lista_planes_pago = '<?=$lista_planes_pago?>';

    var v_lista_tipo_calculo = '<?=$lista_tipo_calculo?>';
    var v_lista_asesores = '<?=$lista_asesores?>';
    var v_lista_patrocinantes = '<?=$lista_patrocinantes?>';
    var v_lista_plan_pago_rel = '<?=$lista_plan_pago_rel?>';
    var vg_lista_objetos = '<?=$lista_obj?>';

    var g_indactdia;
    var g_indact2320;
    var g_conrecmora;
    var g_concuosellos;
    var g_concuoplan;
    var g_concuoplan_inm;
    var g_concuoplan_aut;
    var g_concuoplan_ar;
    var g_concuoplan_ap;
    var g_concanplan;
    var g_concanplan_ar;
    var g_concanplan_ap;
    var g_concanplan_inm;
    var g_concanplan_sell;
    var g_tipoimppfp;
    var param_pagcon;

    var g_id_obligacion;
    var contr_var_total;
    var contr_membrete;

    var es_fecha_valida = false;

     var filtros_no_nativos_ar = [];
     var filtros_arr_main = [];

    var sesion;


     var datos_detalle_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:'N',
            param:{':p_n_plan_pago':null}
        });

    var datos_cuotas_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:1,
        m_autoquery:'N',
        param:{':p_n_plan_pago':null, ':p_f_efectivo':null}
    });

    var datos_cuotas_adeudadas_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:2,
        m_autoquery:'N',
        param:{':p_n_plan_pago':null,}
    });

    $(document).ready(function(){
        init_grillas();
        init_eventos();
    });

    
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>