<?php
$path = $_POST['p_path'];
$c_tributo = (int)$_POST['p_c_tributo'];
$id_sesion = $_POST['p_id_sesion'];
$n_año = (int)$_POST['p_n_año'];
$n_cuota = (int)$_POST['p_n_cuota'];
$t_interfaz = $_POST['p_t_interfaz'];
$c_concepto = (int)$_POST['p_c_concepto'];


$param_prc = array(
    ':p_c_tributo' => $c_tributo,
    ':p_n_anio' => $n_año,
    ':p_n_cuota' => $n_cuota,
    ':p_id_sesion' => $id_sesion,
    ':p_nombre_archivo' => $path,
    ':p_t_interfaz' => $t_interfaz,
    ':p_c_concepto' => $c_concepto,
    ':p_nom_disco_arch_apoyo' =>null,
    ':p_id_disco_nuevo' =>null,
    ':p_id_disco_nuevo_apoyo' =>null,
    ':p_hay_errores' =>null,
    ':p_error'=>null,
    ':p_error_ora' => null
                    
                
);
$sql = "begin
            PAC_GENERACION_ARCHIVOS.GENERAR_ARCHIVO(:p_c_tributo, :p_n_anio, :p_n_cuota, :p_id_sesion, :p_nombre_archivo, :p_t_interfaz, :p_c_concepto, :p_nom_disco_arch_apoyo,
            :p_id_disco_nuevo, :p_id_disco_nuevo_apoyo, :p_hay_errores, :p_error, :p_error_ora);
        end;";
$db_procedure = new DB_Procedure($sql);
$null=null;
$result = $db_procedure->execute_query($param_prc,$null,TRUE);
if($result->resultado != 'OK') {
    $response->resultado = $param_prc[':p_error'];
    $response->p_error_ora = $param_prc[':p_error_ora'];
    $response->p_hay_errores = $param_prc[':p_hay_errores'];
    if(!$response-> resultado){
        $response-> resultado = $result->resultado;
    }
}else{ // Ejecucion sin errores
    $response->resultado = 'OK';
    $response->p_error = $param_prc[':p_error'];
    $response->p_error_ora = $param_prc[':p_error_ora'];
    $response-> p_id_disco_nuevo =  $param_prc[':p_id_disco_nuevo'];
    $response-> p_id_disco_nuevo_apoyo =  $param_prc[':p_id_disco_nuevo_apoyo'];
    $response-> p_nom_disco_arch_apoyo =  $param_prc[':p_nom_disco_arch_apoyo'];
    $response-> p_hay_errores =  'NO';
    $response-> p_path =  $param_prc[':p_nombre_archivo'];
    $response-> p_t_interfaz =  $param_prc[':p_t_interfaz'];
}
echo json_encode($response);
?>