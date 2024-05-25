<?php
require_once(INTRANET . "header.php");
$m_autoquery = $_POST['p_m_autoquery'];
$p_id_menu = $_POST['p_n_id_menu'];
$fecha_hoy = date('d/m/Y');

$lista_partidas_nomenclaturas = fun_id_lista('LISTA DE PARTIDAS Y NOMENCLATURAS');

include('certificado_valuacion/html/principal.html');
?>
<link rel="stylesheet" type="text/css" href="certificado_valuacion/css/estilos.css">
<script type="text/javascript" src="certificado_valuacion/js/funciones.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="certificado_valuacion/js/lupas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="certificado_valuacion/js/eventos.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">

    var v_id_menu = '<?=$p_id_menu?>';
    var fecha_hoy = '<?=$fecha_hoy?>';

    var V_lista_partidas_nomenclaturas = '<?=$lista_partidas_nomenclaturas?>';

    $(document).ready(function($){
        init_lupas();
        init_eventos();
    });

</script>
<?php
require_once(INTRANET."footer.php");
?>

