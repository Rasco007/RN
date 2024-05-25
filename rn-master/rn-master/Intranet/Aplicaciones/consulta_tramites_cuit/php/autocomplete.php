<?php
    $oper = ($_REQUEST['oper']);

    if($oper == 'cuit'){
        $id_transaccion = ($_REQUEST['p_id_transaccion']);
        $id_tipotransacc = ($_REQUEST['p_id_tipotransacc']);
        $n_tramite = ($_REQUEST['p_n_tramite']);
        $id_sistema = ($_REQUEST['p_id_sistema']);
        $c_cuit = ($_REQUEST['p_c_cuit']);
        $id_estadotransacc = ($_REQUEST['p_id_estadotransacc']);
        $id_jurisdiccion_sede = ($_REQUEST['p_id_jurisdiccion_sede']);
        $fecha_transaccion = ($_REQUEST['p_fecha_transaccion']);
        $hora_transaccion = ($_REQUEST['p_hora_transaccion']);
        $c_resultado_alta = ($_REQUEST['p_c_resultado_alta']);
        $f_siat = ($_REQUEST['p_f_siat']);
        $d_error_proceso = ($_REQUEST['p_d_error_proceso']);
        $procedure = "PAC_PADRON_WEB.autocompl_por_cuit(:p_id_transaccion, 
                                                    :p_id_tipotransacc, 
                                                    :p_n_tramite, 
                                                    :p_id_sistema, 
                                                    :p_c_cuit, 
                                                    :p_id_estadotransacc, 
                                                    :p_id_jurisdiccion_sede, 
                                                    :p_fecha_transaccion, 
                                                    :p_hora_transaccion, 
                                                    :p_c_resultado_alta, 
                                                    :p_f_siat, 
                                                    :p_d_error_proceso)";
        $parametros = array(':p_id_transaccion' => $id_transaccion,
            ':p_id_tipotransacc' => $id_tipotransacc,
            ':p_n_tramite' => $n_tramite,
            ':p_id_sistema' => $id_sistema,
            ':p_c_cuit' => $c_cuit,
            ':p_id_estadotransacc' => $id_estadotransacc,
            ':p_id_jurisdiccion_sede' => $id_jurisdiccion_sede,
            ':p_fecha_transaccion' => $fecha_transaccion,
            ':p_hora_transaccion' => $hora_transaccion,
            ':p_c_resultado_alta' => $c_resultado_alta,
            ':p_f_siat' => $f_siat,
            ':p_d_error_proceso' => $d_error_proceso);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        $data->datos[0]['resultado'] = 'OK';

        echo json_encode($data->datos);
    }

    if($oper == 'tramite_sistema'){
        $id_transaccion = ($_REQUEST['p_id_transaccion']);
        $id_tipotransacc = ($_REQUEST['p_id_tipotransacc']);
        $n_tramite = ($_REQUEST['p_n_tramite']);
        $id_sistema = ($_REQUEST['p_id_sistema']);
        $c_cuit = ($_REQUEST['p_c_cuit']);
        $id_estadotransacc = ($_REQUEST['p_id_estadotransacc']);
        $id_jurisdiccion_sede = ($_REQUEST['p_id_jurisdiccion_sede']);
        $fecha_transaccion = ($_REQUEST['p_fecha_transaccion']);
        $hora_transaccion = ($_REQUEST['p_hora_transaccion']);
        $c_resultado_alta = ($_REQUEST['p_c_resultado_alta']);
        $f_siat = ($_REQUEST['p_f_siat']);
        $d_error_proceso = ($_REQUEST['p_d_error_proceso']);
        $procedure = "PAC_PADRON_WEB.autocompl_por_tramite_sistema(:p_id_transaccion, 
                                                    :p_id_tipotransacc, 
                                                    :p_n_tramite, 
                                                    :p_id_sistema, 
                                                    :p_c_cuit, 
                                                    :p_id_estadotransacc, 
                                                    :p_id_jurisdiccion_sede, 
                                                    :p_fecha_transaccion, 
                                                    :p_hora_transaccion, 
                                                    :p_c_resultado_alta, 
                                                    :p_f_siat, 
                                                    :p_d_error_proceso)";
        $parametros = array(':p_id_transaccion' => $id_transaccion,
            ':p_id_tipotransacc' => $id_tipotransacc,
            ':p_n_tramite' => $n_tramite,
            ':p_id_sistema' => $id_sistema,
            ':p_c_cuit' => $c_cuit,
            ':p_id_estadotransacc' => $id_estadotransacc,
            ':p_id_jurisdiccion_sede' => $id_jurisdiccion_sede,
            ':p_fecha_transaccion' => $fecha_transaccion,
            ':p_hora_transaccion' => $hora_transaccion,
            ':p_c_resultado_alta' => $c_resultado_alta,
            ':p_f_siat' => $f_siat,
            ':p_d_error_proceso' => $d_error_proceso);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        $data->datos[0]['resultado'] = 'OK';

        echo json_encode($data->datos);
    }

    if($oper == 'id_transaccion'){
        $id_transaccion = ($_REQUEST['p_id_transaccion']);
        $id_tipotransacc = ($_REQUEST['p_id_tipotransacc']);
        $n_tramite = ($_REQUEST['p_n_tramite']);
        $id_sistema = ($_REQUEST['p_id_sistema']);
        $c_cuit = ($_REQUEST['p_c_cuit']);
        $id_estadotransacc = ($_REQUEST['p_id_estadotransacc']);
        $id_jurisdiccion_sede = ($_REQUEST['p_id_jurisdiccion_sede']);
        $fecha_transaccion = ($_REQUEST['p_fecha_transaccion']);
        $hora_transaccion = ($_REQUEST['p_hora_transaccion']);
        $c_resultado_alta = ($_REQUEST['p_c_resultado_alta']);
        $f_siat = ($_REQUEST['p_f_siat']);
        $d_error_proceso = ($_REQUEST['p_d_error_proceso']);
        $procedure = "PAC_PADRON_WEB.autocompl_por_id_transaccion(:p_id_transaccion, 
                                                    :p_id_tipotransacc, 
                                                    :p_n_tramite, 
                                                    :p_id_sistema, 
                                                    :p_c_cuit, 
                                                    :p_id_estadotransacc, 
                                                    :p_id_jurisdiccion_sede, 
                                                    :p_fecha_transaccion, 
                                                    :p_hora_transaccion, 
                                                    :p_c_resultado_alta, 
                                                    :p_f_siat, 
                                                    :p_d_error_proceso)";
        $parametros = array(':p_id_transaccion' => $id_transaccion,
            ':p_id_tipotransacc' => $id_tipotransacc,
            ':p_n_tramite' => $n_tramite,
            ':p_id_sistema' => $id_sistema,
            ':p_c_cuit' => $c_cuit,
            ':p_id_estadotransacc' => $id_estadotransacc,
            ':p_id_jurisdiccion_sede' => $id_jurisdiccion_sede,
            ':p_fecha_transaccion' => $fecha_transaccion,
            ':p_hora_transaccion' => $hora_transaccion,
            ':p_c_resultado_alta' => $c_resultado_alta,
            ':p_f_siat' => $f_siat,
            ':p_d_error_proceso' => $d_error_proceso);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        $data->datos[0]['resultado'] = 'OK';

        echo json_encode($data->datos);
    }
?>