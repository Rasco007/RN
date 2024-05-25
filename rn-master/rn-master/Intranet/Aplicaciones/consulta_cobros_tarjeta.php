<?php
require_once(INTRANET."header.php");
$c_medio_pago = $_POST['p_c_medio_pago'];
$d_medio_pago = $_POST['p_d_medio_pago'];
$c_producto = $_POST['p_c_producto'];
$d_producto = $_POST['p_d_producto'];
$f_cartera = $_POST['f_cartera'];
$fec_cartera = $_POST['p_fec_cartera'];
$p_n_id_menu = $_POST['p_n_id_menu'];

$lista_tributos = fun_id_lista('LISTADO DE TRIBUTOS');
$lista_obj_hecho = fun_id_lista('LISTA OBJETOS HECHOS CONSULTA SOLICITUDES');
$lista_disco_enviado = fun_id_lista('LISTA DISCO ENVIADO');
$lista_disco_recepcionado = fun_id_lista('LISTA DISCO RECEPCIONADO');
$lista_medios_debito = fun_id_lista('LISTA MEDIOS DE PAGO DEBITO');
$lista_productos = fun_id_lista('LISTADO DE PRODUCTOS');
$lista_motivos_rechazo = fun_id_lista('LISTA DE MOTIVOS DE RECHAZO');
//$lista_contribuyentes = fun_id_lista('LISTADO DE CONTRIBUYENTES CONS SOLICITUD');
$lista_contribuyentes = fun_id_lista('LISTA DENOMINACIONES');

//Parámetros de workflow
$p_tributo = $_POST['p_tributo'];
$p_forma_pago = $_POST['p_forma_pago'];
$p_producto   = $_POST['p_producto'];
$p_anio   = $_POST['p_anio'];
$p_cuota   = $_POST['p_cuota'];
$p_concepto   = $_POST['p_concepto'];
$p_id_workflow_log = $_POST['p_id_workflow_log'];
$p_c_tarea = $_POST['p_c_tarea'];

#HTML PRINCIPAL
include('consulta_cobros_tarjeta/html/principal.html');
include('consulta_cobros_tarjeta/html/modals.html');
?>
    <style>

    </style>
    <link rel="stylesheet" type="text/css" href="consulta_cobros_tarjeta/css/styles.css">
    <script type='text/javascript' src='consulta_cobros_tarjeta/js/grillas.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='consulta_cobros_tarjeta/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script type='text/javascript' src='workflow_general/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var filtros_no_nativos_ar = [];
        filtros_no_nativos_ar['main_grid'] = new Array();
        filtros_no_nativos_ar['detalles_grid'] = new Array();
        var v_id_menu = '<?=$p_n_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var v_lista_tributos = '<?=$lista_tributos?>';
        var v_lista_obj_hecho = '<?=$lista_obj_hecho?>';
        var v_lista_disco_enviado = '<?=$lista_disco_enviado?>';
        var v_lista_disco_recepcionado = '<?=$lista_disco_recepcionado?>';
        var v_lista_medios_debito = '<?=$lista_medios_debito?>';
        var v_lista_productos = '<?=$lista_productos?>';
        var v_lista_motivos_rechazo = '<?=$lista_motivos_rechazo?>';
        var v_lista_contribuyentes = '<?=$lista_contribuyentes?>';

        var v_tributo = '<?=$p_tributo?>';
        var v_forma_pago = '<?=$p_forma_pago?>';
        var v_producto = '<?=$p_producto?>';
        var v_anio = '<?=$p_anio?>';
        var v_cuota = '<?=$p_cuota?>';
        var v_concepto = '<?=$p_concepto?>';
        var v_id_workflow_log = '<?=$p_id_workflow_log ?>';
        var v_c_tarea = '<?=$p_c_tarea ?>';

        var c_producto = '<?= $c_producto?>';
        var c_medio_pago = '<?= $c_medio_pago?>';
        var fec_cartera = '<?= $fec_cartera?>';
        var f_cartera = '<?= $f_cartera?>';
        if(c_producto){
            var datos_main_grid = new GridParam({
                id_menu:v_id_menu,
                n_grid:0,
                n_orden: 0,
                m_autoquery:'S',
                param: {':p_f_envio_tran':null,
                ':p_c_disco_envio':null,
                ':p_f_recepcion_tran':null,
                ':p_c_disco_recepcion':null,
                ':p_f_cartera':f_cartera,
                ':p_f_reversa':null,
                ':p_c_tributo':null,
                ':p_d_objeto_hecho':null,
                ':p_estado':null,
                ':p_c_medio_pago':c_medio_pago,
                ':p_c_producto':c_producto,
                ':p_c_motivo_rechazo':null,
                ':p_n_solicitud':null,
                ':p_n_medio_pago':null,
                ':p_f_cartera_compl':fec_cartera,
                ':p_i_total':null,
                ':p_d_denominacion':null}
            });
            
        }else{
        var datos_main_grid = new GridParam({
                id_menu:v_id_menu,
                n_grid:0,
                n_orden: 0,
                m_autoquery:'N'
            });
        }
        var datos_detalles_grid = new GridParam({
            id_menu:v_id_menu,
            n_grid:1,
            n_orden: 0,
            m_autoquery:'N'
        });

        $(document).ready(function() {
            inicializarGrillas();
            inicializarEventos();
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?>