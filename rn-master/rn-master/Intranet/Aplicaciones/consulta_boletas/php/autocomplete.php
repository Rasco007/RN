<?php
    $oper = ($_REQUEST['oper']);

    if($oper == 'tributo_y_objeto'){
        $c_tributo = ($_REQUEST['p_c_tributo']);
        $d_obj_hecho = ($_REQUEST['p_d_obj_hecho']);
        $procedure = "PAC_EMISION_BOLETA.autocompl_por_tributo_y_obj(:p_c_tributo,:p_d_obj_hecho)";
        $parametros = array(':p_c_tributo' => $c_tributo, ':p_d_obj_hecho' => $d_obj_hecho);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        echo json_encode($data->datos[0]);
    }

    if($oper == 'cuit'){
        $filtro = ($_REQUEST['term']);
        $procedure = "PAC_OBLIGACIONES.autocomplete_por_cuit(:p_filtro)";
        $parametros = array(':p_filtro' => $filtro);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        echo json_encode($data->datos[0]);
    }

    if($oper == 'tributo_y_objeto_grilla'){
        $c_tributo = ($_REQUEST['p_c_tributo']);
        $d_obj_hecho = ($_REQUEST['p_d_obj_hecho']);
        $f_emision_agr = ($_REQUEST['p_f_emision_agr']);
        $procedure = "PAC_EMISION_BOLETA.autocom_trib_y_obj_grilla(:p_c_tributo,:p_d_obj_hecho,:p_f_emision_agr)";
        $parametros = array(':p_c_tributo' => $c_tributo, ':p_d_obj_hecho' => $d_obj_hecho, ':p_f_emision_agr' => $f_emision_agr);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;

        echo json_encode($data->datos[0]);
    }






?>