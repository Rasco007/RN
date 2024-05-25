<?php
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
$m_autoquery = $_POST['p_m_autoquery'];
include('generador_pago_anual_multi/html/main.html');

// $lista_timp = fun_id_lista('BONIF_EXEN TIPOS IMP X CONT');
$lista_trib = fun_id_lista('LISTA TRIBUTOS GENERADOR PAGO ANUAL MULTIOBJETO');
$lista_denom = fun_id_lista('LISTA DENOMINACIONES');
// $lista_tipo_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');

?>
    <link rel="stylesheet" type="text/css" href="generador_pago_anual_multi/css/styles.css?no_cache=<?=date('dmyhis')?>">
    <script type="text/javascript" src="generador_pago_anual_multi/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="generador_pago_anual_multi/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="generador_pago_anual_multi/js/funciones.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">
        //var v_lista_timp = '<?=$lista_timp?>';
        var v_lista_trib = '<?=$lista_trib?>';
        var vg_lista_denominaciones = '<?=$lista_denom?>';
        //var v_lista_doc = '<?=$lista_tipo_documentos?>';
        var ajax_autocomplete = null;
        var v_id_menu = '<?=$p_id_menu?>';

        var filtros_no_nativos_ar = [];
        var filtros_arr_main = [];
        filtros_no_nativos_ar['det_pago_anual_grid'] = filtros_arr_main;

        var datos_det_pago_anual_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid:0,
            m_autoquery:'<?=$m_autoquery?>',
            param:{':p_sesion': null}
        });

        var id_sesion;
        var seleccionados = [];
        var total_seleccionado = '0.00';

        $(document).ready(function() {
            init_eventos();
            init_grillas();
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
