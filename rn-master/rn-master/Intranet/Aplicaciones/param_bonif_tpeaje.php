<?php
require_once(INTRANET . "header.php");

$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];

$lista_bofinicaciones = fun_id_lista('LISTA DE BONIFICACIONES TELEPEAJE');

$fecha_hoy = date('d/m/Y');
#HTML PRINCIPAL
include('param_bonif_tpeaje/html/principal.html');
?>
    <script>

        //VARIABLES GLOBALES
        var v_id_menu = '<?=$p_id_menu?>';
        var v_m_autoquery = '<?=$m_autoquery?>';
        var fecha_hoy = '<?=$fecha_hoy?>';
        var v_lista_bonificaciones = '<?=$lista_bofinicaciones?>';
    </script>

    <script type='text/javascript' src='param_bonif_tpeaje/js/grillas.js'></script>
    <script type='text/javascript' src='param_bonif_tpeaje/js/eventos.js'></script>
    <script type='text/javascript' src='param_bonif_tpeaje/js/funciones.js'></script>
<?php
require_once(INTRANET."footer.php");
?>