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
include('alta_planes_pago/html/main.html');
include('alta_planes_pago/html/modals.html');

$fecha_hoy = date('d/m/Y');
$lista_tributos = fun_id_lista('LISTA TRIBUTOS ALTA PLANES PAGO');
$lista_denom = fun_id_lista('LISTA DENOMINACIONES');
$lista_tbl_gen = fun_id_lista('LISTA TABLAS GENERALES PARAMETROS');
$lista_timp = fun_id_lista('TABLAS GENERALES');
$lista_obj= fun_id_lista('LISTA OBJETOS ALTA PLANES PAGO');
$lista_conceptos= fun_id_lista('LISTA CONCEPTOS ALTA PLANES PAGO');
$lista_tipo_planes= fun_id_lista('LISTA TIPOS PLANES DE PAGO ALTA PLANES PAGO');
$lista_tipo_calculo= fun_id_lista('LISTA TIPO CALCULO ALTA PLANES PAGO');
$lista_asesores= fun_id_lista('LISTA ASESORES HONORARIOS ALTA PLANES DE PAGO');
$lista_patrocinantes= fun_id_lista('LISTA PATROCINANTES ALTA PLANES DE PAGO');
$lista_plan_pago_rel= fun_id_lista('LISTA PLANES PAGO RELACIONADOS ALTA PLANES PAGO');


?>
<link rel="stylesheet" type="text/css" href="alta_planes_pago/css/estilos.css">
<script type='text/javascript' src='alta_planes_pago/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='alta_planes_pago/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='alta_planes_pago/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
<script>

    var v_id_menu = '<?=$p_id_menu?>';
    var fecha_hoy = '<?=$fecha_hoy?>';

    var param_tipo = '<?=$p_tipo?>' || 'RETROACTIVO';
    var param_concurso_quiebra = '<?=$p_concurso_quiebra?>' || 'N';
    var param_exigir_honorarios = '<?=$p_exigir_honorarios?>';
    var param_id_oblig_min = '<?=$p_id_oblig_min?>'; 
    var param_id_oblig_max = '<?=$p_id_oblig_max?>';
    var param_llamado_desde = '<?=$p_llamado_desde?>';
    var param_n_plan_pago_ori = '<?=$p_n_plan_pago_ori?>';
    var param_tipo_plan_ori = '<?=$p_tipo_plan_ori?>';
    var param_tipo_plan = '<?=$p_tipo_plan?>';
    var param_deleg = '<?=$p_deleg?>';
    var param_max_cuotas = '<?=$p_max_cuotas?>';
    var param_c_tributo = '<?=$p_c_tributo?>';
    var param_n_cuit = '<?=$p_n_cuit?>';
    var param_f_emision = '<?=$p_f_emision?>';
    var param_deuda = '<?=$p_deuda?>';
    var param_d_objeto_hecho = '<?=$p_d_objeto_hecho?>';
    var param_c_concepto = '<?=$p_c_concepto?>';

    param_exigir_honorarios = 'X';

    var v_lista_tributos = '<?=$lista_tributos?>';
    var v_lista_denom = '<?=$lista_denom?>';
    var v_lista_tbl_gen = '<?=$lista_tbl_gen?>';
    var v_lista_timp = '<?=$lista_timp?>';
    var v_lista_conceptos = '<?=$lista_conceptos?>';
    var v_lista_tipo_planes = '<?=$lista_tipo_planes?>';
    var v_lista_tipo_calculo = '<?=$lista_tipo_calculo?>';
    var v_lista_asesores = '<?=$lista_asesores?>';
    var v_lista_patrocinantes = '<?=$lista_patrocinantes?>';
    var v_lista_plan_pago_rel = '<?=$lista_plan_pago_rel?>';
    var vg_lista_objetos = '<?=$lista_obj?>';
    var sesion;

    // var filtros_no_nativos_ar = [];
    // var filtros_arr_main = [];


    var g_aviso        ;
    var g_moneda       ;
    var g_sellos       ;
    var g_tabla_recargo;
    var g_tm_can_pfp   ;
    var g_tabla_sec    ;
    var g_codsecpp     ;
    var g_tabla_timpo  ;
    var g_dias_1_vto   ;
    var g_auto         ;
    var g_inmo         ;

    var g_obj_anterior = 'X';
    var g_color_objeto = 'VA_1';

    var g_boleta_actual_sel = 0;

    var g_objeto_actual_sel = '????';

    var g_boleta_nueva_sel = null;
    var g_boleta_vieja_sel = null;

    var g_cant_marcadas_deuda = 0;
    var g_cant_marcadas_sellos = 0;

    var g_modifico_seleccion = 'N';
    var g_modifico_plan = 'N';

    var g_descuento = 'N';

    var g_ref_2006;

    var ctrl_tiene_deuda_comun;
    var ctrl_tiene_deuda_sellos;
    var ctrl_tiene_juicios_cq;

    var tpp_c_indice_act;
    var tpp_n_dia_vto;
    var tpp_n_meses_vto;
    var tpp_n_cuota_min;
    var tpp_n_cuota_max;
    var tpp_c_interes_finan;
    var tpp_tributo;
    var tpp_c_concepto;
    var tpp_p_descuento_interes;
    var tpp_m_anticipo;
    var tpp_n_dias_vto_2;
    var tpp_i_tasa_sellado;
    var tpp_n_dias_max_emision;
    var tpp_m_tipo_minimo_cuota;
    var tpp_d_tipo_minimo_cuota;
    var tpp_f_vig_hasta;
    var tpp_m_multiobjeto;
    var tpp_p_COND_INTERES_CAPITAL;
    var tpp_I_COND_DEUDA_SUPERIOR;
    var tpp_c_periodicidad;
    var tpp_F_DEUDA_DESDE;
    var tpp_F_DEUDA_HASTA;
    var tpp_N_TABLA_PERIOD;
    var tpp_N_TABLA_TIPO_CALC;
    var tpp_c_seg_riesgo;
    var tpp_c_tipo_gestion;

    var seleccionados_comun = [];
    var seleccionados_id = [];
    var guardados_id = [];
    var seleccionados_sellos = [];

    var filtros_no_nativos_ar =[];
    filtros_no_nativos_ar['deuda_declarada_grid'] = [];
    filtros_no_nativos_ar['cuotas_grid'] = [];
    filtros_no_nativos_ar['detalle_deuda_grid'] = [];
    filtros_no_nativos_ar['juicios_grid'] = [];
    filtros_no_nativos_ar['planes_pago_grid'] = [];

     var datos_deuda_declarada_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:'N',
            param:{':p_id_sesion':null}
        });

    var datos_deuda_declarada_sellos_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:1,
        m_autoquery:'N',
        param:{':p_id_sesion':null}
    });

    var datos_cuotas_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:2,
        m_autoquery:'N',
        param:{':p_id_sesion':null}
    });

    var datos_detalle_deuda_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:3,
        m_autoquery:'N',
        param:{':p_id_sesion':null, ':p_id_obligacion':null}
    });

    var datos_juicios_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:4,
        m_autoquery:'N',
        param:{':p_id_sesion':null}
    });

    var datos_planes_pago_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid:5,
        m_autoquery:'N',
        param:{':p_id_sesion':null}
    });


    $(document).ready(function(){
        init_grillas();
        init_eventos();
    });

    
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>