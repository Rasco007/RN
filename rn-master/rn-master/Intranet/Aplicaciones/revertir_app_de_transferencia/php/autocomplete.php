<?php
    $oper = ($_REQUEST['oper']);

    if($oper == 'transferencia'){

        $filtro = ($_REQUEST['n_transfer']);
        $procedure = "PAC_BONOS.autocompleta_transferencia(:p_filtro)";
        $parametros = array(':p_filtro' => $filtro);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        if(count($row_query) == 1){
            $result['data_raz'][] = array(
                'n_transfer'    => $row_query['N_TRANSFER'],
                'id_transfer'  => $row_query['ID_TRANSFER'],
                'c_bono'	=> $row_query['C_BONO'],
                'd_dato'	=> $row_query['D_DATO'],
                'c_especie'	=> $row_query['C_ESPECIE'],
                'f_transfer'	=> $row_query['F_TRANSFER']
            );
            echo json_encode($data->datos);
        }else{
            echo json_encode(null);
        }
    }

    if($oper == 'comprobante'){

        $id_transfer = ($_REQUEST['id_transfer']);
        $n_comprobante = ($_REQUEST['n_comprobante']);
        $procedure = "PAC_BONOS.autocompleta_comprobante(:p_id_transfer, :p_n_comprobante)";
        $parametros = array(':p_id_transfer' => $id_transfer, ':p_n_comprobante' => $n_comprobante);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        if(count($row_query) == 1){
            $result['data_raz'][] = array(
                'd_tipo_comprobante'    => $row_query['D_TIPO_COMPROBANTE'],
                'f_imputacion'  => $row_query['F_IMPUTACION'],
                'i_pesos_imputados'	=> $row_query['I_PESOS_IMPUTADOS'],
                'i_bonos_imputados'	=> $row_query['I_BONOS_IMPUTADOS']
            );
            echo json_encode($data->datos);
        }else{
            echo json_encode(null);
        }
    }

?>