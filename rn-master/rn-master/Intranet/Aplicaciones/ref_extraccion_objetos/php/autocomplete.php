<?php
    $oper = ($_REQUEST['oper']);

    if($oper == 'plan'){
        $filtro = ($_REQUEST['term']);
        $procedure = "PAC_PLANES_DE_PAGO.autocompleta_por_nro_plan(:p_filtro)";
        $parametros = array(':p_filtro' => $filtro);
        $data = getArrayResult($procedure, $parametros);

        echo json_encode($data->datos[0]);
    }


?>