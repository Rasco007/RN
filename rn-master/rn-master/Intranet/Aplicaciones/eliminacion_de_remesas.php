<?php
#HEADER DEL FRMWK
require_once(INTRANET."header.php");
$p_id_menu = $_POST['p_n_id_menu'];
#HTML PRINCIPAL
include('eliminacion_de_remesas/html/main.html');

$fecha_hoy = date('d/m/Y');
$lista_remito = fun_id_lista('LISTADO DE REMITOS');


?>
<link rel="stylesheet" href="eliminacion_de_remesas/css/style.css">
<script type='text/javascript' src='eliminacion_de_remesas/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='eliminacion_de_remesas/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>
<script>

    var v_id_menu = '<?=$p_id_menu?>';
    var fecha_hoy = '<?=$fecha_hoy?>';
    var v_lista_remito = '<?=$lista_remito?>';

    $(document).ready(function(){
        init_eventos();
    });

    
</script>

<?php
require_once(FRAMEWORK_DIR."footer.php");
?>