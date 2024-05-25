<?php
    $oper = ($_REQUEST['oper']);

    if($oper == 'id_boleta'){

        $id_boleta = ($_REQUEST['p_id_boleta']);

        $procedure = "PAC_JUICIOS.autocompleta_por_id_boleta(:p_id_boleta)";
        $parametros = array(':p_id_boleta' => $id_boleta);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        $data->datos[0]['resultado'] = 'OK';

        echo json_encode($data->datos[0]);
    }


?>