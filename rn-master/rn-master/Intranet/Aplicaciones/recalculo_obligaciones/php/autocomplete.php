<?php
    $oper = ($_REQUEST['oper']);

    if($oper == 'tipo_imp_y_objeto'){
        $n_cuit = ($_REQUEST['p_n_cuit']);
        $c_tributo = ($_REQUEST['p_c_tributo']);
        $procedure = "PAC_OBLIGACIONES.autocomplete_tipo_imp_y_objeto(:p_n_cuit, :p_c_tributo)";
        $parametros = array(':p_n_cuit' => $n_cuit, ':p_c_tributo' => $c_tributo);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        if(count($row_query) == 1){
            $result['data_raz'][] = array(
                'razon_social'    => $row_query['DENOMINACION'],
                'cuit'   		=> $row_query['CUIT'],
                'id_contribuyente'	=> $row_query['ID_CONTRIBUYENTE'],
                'c_tipo_documento'	=> $row_query['C_TIPO_DOCUMENTO'],
                'n_documento'	=> $row_query['N_DOCUMENTO'],
                'd_documento'	=> $row_query['D_DOCUMENTO'],
                'c_tipo_imponible'	=> $row_query['C_TIPO_IMPONIBLE'],
                'd_tipo_imponible'	=> $row_query['D_TIPO_IMPONIBLE'],
                'd_objeto_hecho'	=> $row_query['D_OBJETO_HECHO']

            );
            echo json_encode($data->datos);
        }else{
            echo json_encode(null);
        }
    }else if($oper == 'obj_hecho'){
        $filtro = $_POST['term'];
        $filtro1 = $_POST['term1'];
        $procedure = "PAC_OBLIGACIONES.autocomplete_tributo_y_objeto(:p_c_tributo, :p_d_objeto_hecho )";     
    $parametros = array(':p_c_tributo'=>$filtro,':p_d_objeto_hecho'=>$filtro1);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);

    }

?>