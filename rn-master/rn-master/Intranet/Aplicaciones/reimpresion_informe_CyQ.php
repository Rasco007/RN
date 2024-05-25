<?php
require_once(FRAMEWORK_DIR."header.php");

$p_n_id_menu = $_POST['p_n_id_menu'];

$fecha_hoy = date('d/m/Y');

$lista_expedientes = fun_id_lista('LISTADO EXPEDIENTES QyC');
$lista_denominaciones = fun_id_lista('LISTA DENOMINACIONES');

#HTML PRINCIPAL
include('reimpresion_informe_CyQ/html/principal.html');
include('reimpresion_informe_CyQ/html/modal.html');

?>
<style>

</style>

    <script type='text/javascript' src='reimpresion_informe_CyQ/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
    <script>
        var fecha_hoy = '<?=$fecha_hoy?>';

        var ajax_autocomplete = null;
        
        let v_lista_expedientes = '<?=$lista_expedientes?>';
        var v_lista_denominaciones = '<?=$lista_denominaciones?>';
       
        var proceso;
        var v_id_menu = '<?=$p_n_id_menu?>';
       

        $(document).ready(function() {
            initEventos();
            inicializarLupas();
        });

    </script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>