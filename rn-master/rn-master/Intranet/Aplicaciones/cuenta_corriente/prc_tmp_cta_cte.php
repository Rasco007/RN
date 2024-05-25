<?php
set_time_limit (0);

/*require_once(FUNCIONES_FRAMEWORK."db_procedure.php");
require_once(FUNCIONES_FRAMEWORK.'funciones.php');*/

$id_session = $_POST['id_session'];
$id_contribuyente = $_POST['id_contribuyente'];
$c_tipo_imponible = $_POST['c_tipo_imponible'];
$c_tributo = $_POST['c_tributo'];
$d_objeto_hecho = $_POST['d_objeto_hecho'];
$pos_fiscal_inicial = $_POST['pos_fiscal_inicial'];
$n_cuota_inicial = $_POST['n_cuota_inicial'];
$pos_fiscal_final = $_POST['pos_fiscal_final'];
$n_cuota_final = $_POST['n_cuota_final'];
$f_actualizacion = $_POST['f_actualizacion'];
$filtro_deuda = $_POST['filtro_deuda'];
$controlar_obl = $_POST['controlar_obl'];

if($d_objeto_hecho == ""){
    $db_query = new DB_Query(
        "SELECT count(1) as cant
        from contribuyentes_tributos
        where id_contribuyente = :id_contribuyente
            and c_tributo = nvl(:c_tributo, c_tributo)");

    $param = array(
        ':id_contribuyente'=>$id_contribuyente,
        ':c_tributo'=>$c_tributo);

    $row_query = $db_query->do_query($param);
}

$param_prc = array(
    ':p_session'=>$id_session,
    ':p_contrib'=>$id_contribuyente,
    ':p_timpo'=>$c_tipo_imponible,
    ':p_trib'=>$c_tributo,
    ':p_obj'=>$d_objeto_hecho,
    ':p_pos_d'=>$pos_fiscal_inicial,
    ':p_cuota_d'=>$n_cuota_inicial,
    ':p_pos_h'=>$pos_fiscal_final,
    ':p_cuota_h'=>$n_cuota_final,
    ':f_act'=>$f_actualizacion,
    ':p_solo_deuda'=>$filtro_deuda,
    ':p_controlar_obl'=>$controlar_obl,
    ':p_saldo_act_total'=>null,
    ':p_a_favor'=>null,
    ':p_alerta_obl'=>null,
    ':p_error'=>null,
    ':p_error_ora'=>null,
);

$null=null;

$sql = "begin
        PAC_CONS_CTA_CTE.PRC_TMP_CTA_CTE (:p_session,
            :p_contrib,
            :p_timpo,
            :p_trib,
            :p_obj,
            :p_pos_d,
            :p_cuota_d,
            :p_pos_h,
            :p_cuota_h,
            :f_act,
            :p_solo_deuda,
            :p_controlar_obl,
            :p_saldo_act_total,
            :p_a_favor,
            :p_alerta_obl,
            :p_error,
            :p_error_ora); 
        end;";



$db_procedure = new DB_Procedure($sql);
//Hay que armar una variable y pasarle al execute_query una variable con null sino pincha cuando quiere hacer el oci_bind_by_name


$result = $db_procedure->execute_query($param_prc,$null,FALSE);

if($result->resultado != 'OK') {
    $db_procedure->db_rollback();
    $response-> resultado = $param_prc[':p_error'];
}else { // Ejecucion sin errores
    $response-> resultado = 'OK';
    $response-> importe_total = $param_prc[':p_saldo_act_total'];
    $response-> a_favor = $param_prc[':p_a_favor'];
    $response-> alerta_obl =  $param_prc[':p_alerta_obl'];
    $db_procedure->db_commit();
}
    
echo json_encode($response);

?>