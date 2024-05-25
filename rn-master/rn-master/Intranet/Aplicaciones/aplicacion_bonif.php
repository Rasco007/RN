<?php
require_once(INTRANET . "header.php");

$id_lista_objetos = fun_id_lista('OBJETOS BONIFICACION');
$id_lista_tributos = fun_id_lista('TRIBUTOS RECALCULO Y SEGUIMIENTO BONIF');

$fecha_hoy = date('d/m/Y');
$p_id_menu = $_POST['p_n_id_menu'];
$user = $_SESSION['usuario'];

#HTML PRINCIPAL
include('aplicacion_bonif/html/principal.html');
?>

<script type='text/javascript' src='aplicacion_bonif/js/eventos.js?no_cache=<?=date('dmyhis')?>'></script>
<script type='text/javascript' src='aplicacion_bonif/js/funciones.js?no_cache=<?=date('dmyhis')?>'></script>

<script>
    //VARIABLES GLOBALES
    var fecha_hoy = '<?=$fecha_hoy?>';
    var v_c_usuario = '<?=$user?>';
    var v_id_menu = '<?=$p_id_menu?>';
    var ajax_autocomplete = null;
    var id_lista_objetos = '<?=$id_lista_objetos?>';
    var id_lista_tributos = '<?=$id_lista_tributos?>';

    $(document).ready(function() {
        inicializar_eventos();
    });
</script>

<?php
require_once(INTRANET."footer.php");
?>
