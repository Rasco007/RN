<?php
require_once(INTRANET . "header.php");

$p_id_inspeccion = $_POST['p_id_inspeccion'];
$p_d_motivo_ajus_estimado = $_POST['p_d_motivo_ajus_estimado'];
$p_pos_fis_desde_estimada = $_POST['p_pos_fis_desde_estimada'];
$p_pos_fis_hasta_estimada = $_POST['p_pos_fis_hasta_estimada'];
$p_d_regla = $_POST['p_d_regla'];
$p_d_regla = $_POST['p_d_regla'];
$p_i_monto_total_ajuste = $_POST['p_i_monto_total_ajuste'];
$p_i_base_estimado = $_POST['p_i_base_estimado'];
$p_i_ajuste_estimado = $_POST['p_i_ajuste_estimado'];
$p_i_impug_bonif = $_POST['p_i_impug_bonif'];
$p_i_impug_pc = $_POST['p_i_impug_pc'];
$p_i_base_imponible_ajustada = $_POST['p_i_base_imponible_ajustada'];
$p_i_impuesto_ajustado = $_POST['p_i_impuesto_ajustado'];
$p_i_ajuste_bonificaciones = $_POST['p_i_ajuste_bonificaciones'];
$p_i_ajuste_pac = $_POST['p_i_ajuste_pac'];
$p_motivo_ajuste1 = $_POST['p_motivo_ajuste1'];
$p_motivo_ajuste2 = $_POST['p_motivo_ajuste2'];
$p_motivo_ajuste3 = $_POST['p_motivo_ajuste3'];
$p_otros_motivos_ajuste = $_POST['p_otros_motivos_ajuste'];
$p_observaciones = $_POST['p_observaciones'];

#HTML PRINCIPAL
include('resumen_inspeccion/html/principal.html');
?>

<?php
require_once(INTRANET."footer.php");
?>
