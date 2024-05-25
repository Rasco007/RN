<?php
$param['modo'] = 'disabledDays';
$disabledDays = ejecutar_curl(WEBSERVICE_URL.'get_dias_habiles_scf/',$param);
$disabledDays = json_decode($disabledDays,true);
$disabledDays = $disabledDays['feriados'];

$param['modo'] = 'maxDay';
$maxDay = ejecutar_curl(WEBSERVICE_URL.'get_dias_habiles_scf/',$param);
$maxDay = json_decode($maxDay,true);
$maxDay = $maxDay['maxDay'];

$fecha_hoy = date('d/m/Y');
?>

<link rel="stylesheet" type="text/css" href="cons_deuda_scf/css/tables.css">
<script type='text/javascript' src='cons_deuda_scf/js/eventos.js'></script>
<script type='text/javascript' src='cons_deuda_scf/js/funciones.js'></script>

<script> 
    var v_id_menu = '<?=$param["id_menu"]?>';
    var v_m_autoquery = '<?=$m_autoquery?>';
    var ajax_autocomplete = null;
    var id_sesion = null;
	var fecha_hoy = '<?=$fecha_hoy?>';
    var disabledDays = '<?=$disabledDays?>';
    var maxDay = '<?=$maxDay?>';
    var v_id_boleta_impresa;

    $(document).ready(function () {
        inicializarEventos();
    });
</script>
