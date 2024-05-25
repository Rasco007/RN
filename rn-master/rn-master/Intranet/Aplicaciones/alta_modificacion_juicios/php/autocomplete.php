<?php
    $oper = ($_REQUEST['oper']);

    if($oper == 'cuit'){
        $filtro = ($_REQUEST['term']);
        $procedure = "PAC_JUICIOS.autocomplete_por_cuit(:p_filtro)";
        $parametros = array(':p_filtro' => $filtro);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        $data->datos[0]['resultado'] = 'OK';

        echo json_encode($data->datos[0]);
    }

?>