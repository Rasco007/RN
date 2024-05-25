<?php
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$p_consulta_juicio = $_POST['p_consulta_juicio'];
include('emision_boletas_pago_agrupadas_con_juicio/html/main.html');
include('emision_boletas_pago_agrupadas_con_juicio/html/modals.html');

$fecha_hoy = date('d/m/Y');

$lista_timp = fun_id_lista('TABLAS GENERALES');
$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS POR TIPO IMP');
$lista_concepto = fun_id_lista('LISTA CONCEPTOS EMISION BOLETAS AGRUPADAS / CON JUICIO');
$lista_objetos = fun_id_lista('LISTA OBJETOS HECHOS EMISION BOLETAS AGRUPADAS / CON JUICIO');
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');
?>
    <link rel="stylesheet" type="text/css" href="emision_boletas_pago_agrupadas_con_juicio/css/emision_boletas_pago_agrupadas_con_juicio.css?no_cache=<?=date('dmyhis')?>">
    <script type="text/javascript" src="emision_boletas_pago_agrupadas_con_juicio/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="emision_boletas_pago_agrupadas_con_juicio/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="emision_boletas_pago_agrupadas_con_juicio/js/funciones.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">
        var v_id_menu = '<?=$p_id_menu?>';
        var v_n_cuit = null;
        var v_consulta_juicio = '<?=$p_consulta_juicio?>';
        var fecha_hoy = '<?=$fecha_hoy?>';
        var v_lista_timp = '<?=$lista_timp?>';
        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_concepto = '<?=$lista_concepto?>';
        var vg_lista_objetos = '<?=$lista_objetos?>';
        var vg_lista_denominaciones = '<?=$lista_denominaciones?>';
        var ajax_autocomplete = null;

        var id_sesion = null;
        var cant_marcadas    = 0;
        var tiene_dj_error   = 'N';
        var tiene_inspeccion = 'N';
        var selecciono_980 = 'N';
        var distribuir       = 'N';
        var cuota_parcial    =  0;
        var v_monto_tasa_980 = 0;
        var v_dias_futuro = 0;
        var v_emite_agrupada = 'S';
        var filtros_no_nativos_ar = [];
        var filtros_arr_main = [];

        var seleccionados = [];

        var datos_detalle_deuda_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:'<?=$m_autoquery?>',
            param:{':p_id_sesion':null}
        });
        $(document).ready(function() {
            init_eventos();
            init_grillas();
            $('#n_cuit, #d_denominacion, #c_tipo_imponible, #d_tipo_imponible, #c_tributo, #d_tributo, #objeto, #f_vto_pago_anticipado,#importe,#id_contribuyente').val(null);
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
