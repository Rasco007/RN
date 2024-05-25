<?php
require_once(INTRANET."header.php");
include('emision_boleta_pago_cuenta_ag_iibb/html/main.html');

$fecha_hoy = date('d/m/Y');

$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS PARA AG E IIBB');
$lista_concep = fun_id_lista('CONCEPTO DETALLE BOLETAS PAGO AG E IIBB');
//$lista_denom = fun_id_lista('LISTADO DENOMINACIONES EMIS BOLET AG IB');
$lista_denom = fun_id_lista('LISTA DENOMINACIONES');
$lista_objeto_hecho = fun_id_lista('LISTADO OBJETO HECHO EMIS BOLT AG IB');

?>
    <script type="text/javascript" src="emision_boleta_pago_cuenta_ag_iibb/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">
        var fecha_hoy = '<?=$fecha_hoy?>';
        var ajax_autocomplete = null;
        var id_session = null;
        var id_contribuyente;
        var v_n_cuit_sin_formato;
        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_concep = '<?=$lista_concep?>';
        var v_lista_denominacion = '<?=$lista_denom?>';
        var v_lista_objeto_hecho = '<?=$lista_objeto_hecho?>';
        $(document).ready(function() {
            init_eventos();
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
