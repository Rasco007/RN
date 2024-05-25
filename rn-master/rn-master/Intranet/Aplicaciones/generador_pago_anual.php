<?php
require_once(INTRANET."header.php");
include('generador_pago_anual/html/main.html');

$año = date('Y');

$fecha_hoy = date('d/m/Y');

$lista_timp = fun_id_lista('BONIF_EXEN TIPOS IMP X CONT');
$lista_trib = fun_id_lista('LISTADO DE TRIBUTOS AUTO E INMO');
$lista_tipo_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');

//$lista_obj = fun_id_lista('LISTADO DE OBJETOS AUTO E INMO');
$lista_obj = fun_id_lista('LISTA OBJETOS GEN EMI PAGO ANUAL');
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');

?>
    <link rel="stylesheet" type="text/css" href="generador_pago_anual/css/styles.css">
    <script type="text/javascript" src="generador_pago_anual/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">
        var año = '<?=$año?>';
        var fecha_hoy = '<?=$fecha_hoy?>';
        var v_lista_timp = '<?=$lista_timp?>';
        var v_lista_trib = '<?=$lista_trib?>';
        var v_lista_obj = '<?=$lista_obj?>';
        var v_lista_doc = '<?=$lista_tipo_documentos?>';
        var vg_lista_denominaciones = '<?=$lista_denominaciones?>';
        var ajax_autocomplete = null;
        $(document).ready(function() {
            init_eventos();
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
