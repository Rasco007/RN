

<?php
$oper = $_POST['p_oper'];

if ($oper === 'getConst') {        
    $procedure = "PAC_INGRESO_PAGOS.FUN_OBTENER_CONSTANTES()";     
    $parametros = array();         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);
}
else if ($oper === 'getEstadoBanco') {        
    $p_c_medio_pago = $_POST['p_c_medio_pago'];
    $procedure = "PAC_INGRESO_PAGOS.FUN_ESTADO_BANCO(:p_c_medio_pago)";     
    $parametros = array(':p_c_medio_pago' => $p_c_medio_pago);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);
}
else if ($oper === 'getCArchivo') {        
    $p_n_remito = $_POST['p_n_remito'];
    $procedure = "PAC_INGRESO_PAGOS.FUN_C_ARCHIVO(:p_n_remito)";     
    $parametros = array(':p_n_remito' => $p_n_remito);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);
}
else if ($oper === 'valiCaract') {        
    $p_c_tipo_imponible = $_POST['p_c_tipo_imponible'];
    $procedure = "PAC_INGRESO_PAGOS.FUN_VALIDAR_CARACTERISTICA(:p_c_tipo_imponible)";     
    $parametros = array(':p_c_tipo_imponible' => $p_c_tipo_imponible);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);
}
else if ($oper === 'getPagosErroneos') {     
    $p_n_cuit = $_POST['p_n_cuit'];
    $p_c_tipo_documento = $_POST['p_c_tipo_documento'];
    $p_n_documento = $_POST['p_n_documento'];
    $p_d_denominacion = $_POST['p_d_denominacion'];
    $p_c_tipo_imponible = $_POST['p_c_tipo_imponible'];
    $p_d_objeto_hecho = $_POST['p_d_objeto_hecho'];
    $p_n_recibo = $_POST['p_n_recibo'];
    $p_c_tributo = $_POST['p_c_tributo'];
    $p_c_concepto = $_POST['p_c_concepto'];
    $p_c_concepto_mov = $_POST['p_c_concepto_mov'];
    $p_n_posicion_fiscal = $_POST['p_n_posicion_fiscal'];
    $p_n_cuota_anticipo = $_POST['p_n_cuota_anticipo'];
    $p_i_pagado = $_POST['p_i_pagado'];
    $p_f_pago = $_POST['p_f_pago'];
    $p_n_comprobante = $_POST['p_n_comprobante'];
    $p_c_medio_pago = $_POST['p_c_medio_pago'];
    $p_n_cheque = $_POST['p_n_cheque'];
    $p_c_banco_emisor = $_POST['p_c_banco_emisor'];
    $p_c_banco_receptor = $_POST['p_c_banco_receptor'];
    $p_c_sucursal_recep = $_POST['p_c_sucursal_recep'];
    $p_c_cajero_recep = $_POST['p_c_cajero_recep'];
    $p_n_cabezal = $_POST['p_n_cabezal'];
    $p_n_remito = $_POST['p_n_remito'];
    $p_c_tipo_form = $_POST['p_c_tipo_form'];
    $p_n_tramite = $_POST['p_n_tramite'];
    $p_n_orden = $_POST['p_n_orden'];

    $procedure = "PAC_INGRESO_PAGOS.FUN_BUSCAR_PAGOS_ERRONEOS (:p_n_cuit,
                                                        :p_c_tipo_documento,
                                                        :p_n_documento,
                                                        :p_d_denominacion,
                                                        :p_c_tipo_imponible,
                                                        :p_d_objeto_hecho,
                                                        :p_n_recibo,
                                                        :p_c_tributo,
                                                        :p_c_concepto,
                                                        :p_c_concepto_mov,
                                                        :p_n_posicion_fiscal,
                                                        :p_n_cuota_anticipo,
                                                        :p_i_pagado,
                                                        :p_f_pago,
                                                        :p_n_comprobante,
                                                        :p_c_medio_pago,
                                                        :p_n_cheque,
                                                        :p_c_banco_emisor,
                                                        :p_c_banco_receptor,
                                                        :p_c_sucursal_recep,
                                                        :p_c_cajero_recep,
                                                        :p_n_cabezal,
                                                        :p_n_remito,
                                                        :p_c_tipo_form,
                                                        :p_n_tramite,
                                                        :p_n_orden)";     
    $parametros = array(    ':p_n_cuit' => $p_n_cuit,
                            ':p_c_tipo_documento' => $p_c_tipo_documento,
                            ':p_n_documento' => $p_n_documento,
                            ':p_d_denominacion' => $p_d_denominacion,
                            ':p_c_tipo_imponible' => $p_c_tipo_imponible,
                            ':p_d_objeto_hecho' => $p_d_objeto_hecho,
                            ':p_n_recibo' => $p_n_recibo,
                            ':p_c_tributo' => $p_c_tributo,
                            ':p_c_concepto' => $p_c_concepto,
                            ':p_c_concepto_mov' => $p_c_concepto_mov,
                            ':p_n_posicion_fiscal' => $p_n_posicion_fiscal,
                            ':p_n_cuota_anticipo' => $p_n_cuota_anticipo,
                            ':p_i_pagado' => $p_i_pagado,
                            ':p_f_pago' => $p_f_pago,
                            ':p_n_comprobante' => $p_n_comprobante,
                            ':p_c_medio_pago' => $p_c_medio_pago,
                            ':p_n_cheque' => $p_n_cheque,
                            ':p_c_banco_emisor' => $p_c_banco_emisor,
                            ':p_c_banco_receptor' => $p_c_banco_receptor,
                            ':p_c_sucursal_recep' => $p_c_sucursal_recep,
                            ':p_c_cajero_recep' => $p_c_cajero_recep,
                            ':p_n_cabezal' => $p_n_cabezal,
                            ':p_n_remito' => $p_n_remito,
                            ':p_c_tipo_form' => $p_c_tipo_form,
                            ':p_n_tramite' => $p_n_tramite,
                            ':p_n_orden' => $p_n_orden);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data);
}
?>

