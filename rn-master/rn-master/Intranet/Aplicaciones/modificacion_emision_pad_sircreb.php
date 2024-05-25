<?php
require_once(INTRANET."header.php");
include('modificacion_emision_pad_sircreb/html/main.html');

$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];

// $lista_delegaciones = fun_id_lista('LISTADO DE DELEGACIONES');

// $lista_bonos_transf = fun_id_lista('LISTADO DE BONOS TRANSFERENCIAS');



?>
    <script type="text/javascript" src="modificacion_emision_pad_sircreb/js/eventos.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="modificacion_emision_pad_sircreb/js/funciones.js?no_cache=<?=date('dmyhis')?>"></script>
    <script type="text/javascript" src="modificacion_emision_pad_sircreb/js/grillas.js?no_cache=<?=date('dmyhis')?>"></script>

    <script type="text/javascript">
        var fecha_hoy = '<?=$fecha_hoy?>';
        // var v_lista_prov = '<?=$lista_delegaciones?>';
        // var lista_bonos_transf = '<?=$lista_bonos_transf?>';
        var v_id_menu = '<?=$p_id_menu?>';
        var ajax_autocomplete = null;

        $(document).ready(function() {
            init_eventos();
            init_grillas();
        });

    </script>

<?php
require_once(INTRANET."footer.php");
?><?php
