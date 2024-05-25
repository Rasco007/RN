<?php
    $oper = ($_REQUEST['oper']);

    if($oper == 'contribuyente'){

        $tributo = ($_REQUEST['c_tributo']);
        $objeto_hecho = ($_REQUEST['d_objeto_hecho']);

        $procedure = "PAC_DEBITO_DIRECTO.autocompleta_contribuyente(:p_c_tributo, :p_d_objeto_hecho)";
        $parametros = array(':p_c_tributo' => $tributo, ':p_d_objeto_hecho' => $objeto_hecho);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        if(count($row_query) == 1){
            echo json_encode($data->datos);
        }else{
            echo json_encode(null);
        }
    }

?>