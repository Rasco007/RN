<?php
    $oper = ($_REQUEST['oper']);

    if($oper == 'cuit'){
        $filtro = ($_REQUEST['term']);
        $procedure = "PAC_IIBB_CM.autocomplete_por_cuit(:p_filtro)";
        $parametros = array(':p_filtro' => $filtro);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        $data->datos[0]['resultado'] = 'OK';

        echo json_encode($data->datos[0]);
    }

    if($oper == 'doc'){
        $tipo_doc = ($_REQUEST['c_documento']);
        $nro_doc = ($_REQUEST['documento']);
        $procedure = "PAC_IIBB_CM.autocomplete_por_doc(:p_c_documento, :p_documento)";
        $parametros = array(':p_c_documento' => $tipo_doc, ':p_documento' => $nro_doc);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        $data->datos[0]['resultado'] = 'OK';

        echo json_encode($data->datos[0]);
    }


?>