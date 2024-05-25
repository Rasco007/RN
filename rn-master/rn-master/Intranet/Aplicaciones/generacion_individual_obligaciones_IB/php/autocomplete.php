<?php
    $oper = ($_REQUEST['oper']);

    if($oper == 'cuit'){
        $filtro = ($_REQUEST['term']);
        $procedure = "PAC_OBLIGACIONES.autocomplete_por_cuit(:p_filtro)";
        $parametros = array(':p_filtro' => $filtro);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        $data->datos[0]['resultado'] = 'OK';

        echo json_encode($data->datos[0]);
    }

    if($oper == 'doc'){
        $tipo_doc = ($_REQUEST['c_documento']);
        $nro_doc = ($_REQUEST['documento']);
        $procedure = "PAC_OBLIGACIONES.autocomplete_por_doc(:p_c_documento, :p_documento)";
        $parametros = array(':p_c_documento' => $tipo_doc, ':p_documento' => $nro_doc);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        $data->datos[0]['resultado'] = 'OK';

        echo json_encode($data->datos[0]);
    }

    if($oper == 'cuit_trib_concep'){
        $cuit = ($_REQUEST['cuit']);
        $tributo = ($_REQUEST['tributo']);
        $concepto = ($_REQUEST['concepto']);
        $procedure = "PAC_OBLIGACIONES.autocompl_cuit_trib_concep(:p_cuit, :p_tributo , :p_concepto)";
        $parametros = array(':p_cuit' => $cuit, ':p_tributo' => $tributo, ':p_concepto' => $concepto);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        $data->datos[0]['resultado'] = 'OK';

        echo json_encode($data->datos[0]);
    }

    if($oper == 'doc_trib_concep'){
        $doc = ($_REQUEST['doc']);
        $tipo_doc = ($_REQUEST['tipo_doc']);
        $tributo = ($_REQUEST['tributo']);
        $concepto = ($_REQUEST['concepto']);
        $procedure = "PAC_OBLIGACIONES.autocompl_doc_trib_concep(:p_doc, :p_tipo_doc, :p_tributo , :p_concepto)";
        $parametros = array(':p_doc' => $doc, ':p_tipo_doc' => $tipo_doc, ':p_tributo' => $tributo, ':p_concepto' => $concepto);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        $data->datos[0]['resultado'] = 'OK';

        echo json_encode($data->datos[0]);
    }

    if($oper == 'obj_trib_concep'){
        $obj = ($_REQUEST['obj']);
        $tipo_impo = ($_REQUEST['tipo_impo']);
        $tributo = ($_REQUEST['tributo']);
        $concepto = ($_REQUEST['concepto']);
        $procedure = "PAC_OBLIGACIONES.autocompl_obj_trib_concep(:p_obj, :p_tipo_impo, :p_tributo , :p_concepto)";
        $parametros = array(':p_obj' => $obj, ':p_tipo_impo' => $tipo_impo, ':p_tributo' => $tributo, ':p_concepto' => $concepto);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        $data->datos[0]['resultado'] = 'OK';

        echo json_encode($data->datos[0]);
    }
?>