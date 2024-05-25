<?php
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$p_solo_consulta = $_POST['p_solo_consulta'];
include('modif_ing_pagos_pendientes/html/main.html');
include('modif_ing_pagos_pendientes/html/modals.html');

$fecha_hoy = date('d/m/Y');

$lista_trib = fun_id_lista('LISTA TRIBUTOS MODIF ING PAGOS PEND');
$lista_tbl_gen = fun_id_lista('LISTA TABLAS GENERALES PARAMETROS');
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');
$lista_timp = fun_id_lista('TABLAS GENERALES');
$lista_concepto = fun_id_lista('LISTA CONCEPTOS EMISION BOLETAS AGRUPADAS / CON JUICIO');
$lista_concepto_mov = fun_id_lista('LISTA CONCEPTOS DE MOVIMIENTOS MODIF ING PAGOS PEND');
$lista_objetos = fun_id_lista('LISTA DE OBJETOS HECHOS MODIF ING PAGOS PEND');
$lista_bancos = fun_id_lista('LISTADO DE BANCOS');
$lista_sucursales = fun_id_lista('LISTA DE SUCURSALES MODIF ING PAGOS PEND');
$lista_mp = fun_id_lista('LISTA MEDIOS DE PAGO INGRESO INDIVIDUAL PAGOS DEFINITIVOS');
$lista_remitos = fun_id_lista('LISTA DE REMITOS MODIF ING PAGOS PEND');
?>
    <link rel="stylesheet" type="text/css" href="modif_ing_pagos_pendientes/css/modif_ing_pagos_pendientes.css?no_cache=<?=date('dmyhis')?>">
    <script type="text/javascript" src="modif_ing_pagos_pendientes/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="modif_ing_pagos_pendientes/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="modif_ing_pagos_pendientes/js/funciones.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">
        var v_id_menu = '<?=$p_id_menu?>';
        var p_solo_consulta = '<?=$p_solo_consulta?>';
        var fecha_hoy = '<?=$fecha_hoy?>';
        var v_lista_timp = '<?=$lista_timp?>';
        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_tbl_gen = '<?=$lista_tbl_gen?>';
        var v_lista_concepto = '<?=$lista_concepto?>';
        var v_lista_concepto_mov = '<?=$lista_concepto_mov?>';
        var v_lista_mp = '<?=$lista_mp?>';
        var v_lista_remitos = '<?=$lista_remitos?>';
        var vg_lista_objetos = '<?=$lista_objetos?>';
        var vg_lista_bancos = '<?=$lista_bancos?>';
        var vg_lista_sucursales = '<?=$lista_sucursales?>';
        var vg_lista_denominaciones = '<?=$lista_denominaciones?>';
        var ajax_autocomplete = null;

        var v_modo = 'search';

        //CONSTANTES
        var g_movim = null;
        var g_COD_PLAN = null;
        var g_CONCUOPLAN_INM = null;
        var g_CONCUOPLAN = null;
        var g_concuo = null;
        var g_pagcon = null;
        var g_TRINMOBILIARIO = null;
        var g_ESTCAB = null;
        var g_MONEDA_DEFAULT = null;
        var g_archivo_inm  = null;
        var g_IB = null;
        var g_IBM = null;
        var g_CON_DEUDA  = null;
        var g_CONCANPLAN_INM  = null;
        var g_CON_CONCURSO = null;
        var g_CON_QUIEBRA = null;

        var v_aux_cuit= null;
        var v_aux_denominacion= null;
        var v_aux_tipoDoC= null;
        var v_aux_ndoc= null;
        var v_aux_tributo= null;
        var v_aux_objeto= null;
        var v_aux_concepto= null;
        var v_aux_posicion= null;
        var v_aux_cuota= null;
        var v_aux_caracteristica= null;
        var v_aux_tipo_form= null;
        var v_aux_remESA= null;
        var v_aux_LOTE= null;
        var v_aux_comprobante= null;
        var v_aux_TIPOIMP = null;
        var v_aux_RECIBO = null;
        var v_aux_TRAMITE = null;
        var v_aux_CONCEPTO_MOV = null;
        var v_aux_IMPORTE = null;
        var v_aux_FPAGO   = null;
        var v_aux_BANCO   = null;
        var v_aux_SUCURSAL = null;
        var v_aux_CAJERO = null;
        var v_aux_MEDIOPAGO = null;
        var v_aux_CHEQUE = null;
        var v_aux_BANCOE = null;
  
        var datos_orig_pagos_erroneos = null;
        var datos_modif_pagos_erroneos = null;

        var datos_plan_pagos_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:'N',
            param:{':p_id_contribuyente':null}
        });

        $(document).ready(function() {
            init_eventos();
            init_grillas();
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
