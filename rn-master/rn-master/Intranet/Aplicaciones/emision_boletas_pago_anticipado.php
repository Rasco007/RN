<?php
require_once(INTRANET."header.php");
include('emision_boletas_pago_anticipado/html/main.html');

$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];

$lista_timp = fun_id_lista('BONIF_EXEN TIPOS IMP X CONT');
$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS AUTO E INMO');

$lista_obj = fun_id_lista('LISTADO DE OBJETOS AUTO E INMO');
$lista_contribuyentes = fun_id_lista('LISTA DENOMINACIONES');

?>
    <link rel="stylesheet" type="text/css" href="emision_boletas_pago_anticipado/css/emision_boleta_anticipada.css">
    <script type="text/javascript" src="emision_boletas_pago_anticipado/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">
        var fecha_hoy = '<?=$fecha_hoy?>';
        var v_lista_timp = '<?=$lista_timp?>';
        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_obj = '<?=$lista_obj?>';
        var v_id_menu = '<?=$p_id_menu?>';
        var id_lista_contribuyentes = '<?=$lista_contribuyentes?>';
        var ajax_autocomplete = null;
        $(document).ready(function() {
            init_eventos();
            $('#n_cuit, #d_denominacion, #c_tipo_imponible, #d_tipo_imponible, #c_tributo, #d_tributo, #objeto, #f_vto_pago_anticipado,#importe,#id_contribuyente').val(null);
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
