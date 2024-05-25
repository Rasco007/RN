<?php
    $oper = ($_REQUEST['oper']);

    if($oper == 'tasa_ext'){
        $n_boleta = ($_REQUEST['p_n_boleta']);
        $procedure = "PAC_EMISION_BOLETA.busca_tasa_ext(:p_n_boleta)";
        $parametros = array(':p_n_boleta' => $n_boleta);
        $data = getArrayResult($procedure, $parametros);

        echo json_encode($data->datos[0]);
    }

    if($oper == 'es_migrado'){
        $d_obj_hecho = $_POST['p_d_objeto_hecho'];
        $procedure = "select PAC_EMISION_BOLETA.ES_MIGRADO(:p_d_objeto_hecho) es_migrado from dual";
        $parametros = array(':p_d_objeto_hecho' => $d_obj_hecho);

        //$data = getArrayResult($procedure, $parametros);

        $db_procedure = new DB_Query($procedure);
        $data = $db_procedure->do_query($parametros);

        echo json_encode($data[0]);
    }

    if($oper == 'busca_sesion'){
        $id_boleta = ($_REQUEST['p_id_boleta']);
        $procedure = "PAC_EMISION_BOLETA.busca_sesion(:p_id_boleta)";
        $parametros = array(':p_id_boleta' => $id_boleta);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;
        $data->datos[0]['resultado'] = 'OK';

        echo json_encode($data->datos[0]);
    }

    if($oper == 'boleta_canon'){
        $id_boleta = ($_REQUEST['p_id_boleta']);
        $procedure = "PAC_EMISION_BOLETA.boleta_canon(:p_id_boleta)";
        $parametros = array(':p_id_boleta' => $id_boleta);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;
        $data->datos[0]['resultado'] = 'OK';

        echo json_encode($data->datos[0]);
    }

    if($oper == 'reimprimir_sellos'){
        $id_boleta = ($_REQUEST['p_id_boleta']);
        $procedure = "PAC_EMISION_BOLETA.reimprimir_sellos(:p_id_boleta)";
        $parametros = array(':p_id_boleta' => $id_boleta);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;
        $data->datos[0]['resultado'] = 'OK';

        echo json_encode($data->datos[0]);
    }

    if($oper == 'valida_pago_efectuado'){
        $id_boleta = ($_REQUEST['p_id_boleta']);
        $procedure = "PAC_EMISION_BOLETA.valida_pago_efectuado(:p_id_boleta)";
        $parametros = array(':p_id_boleta' => $id_boleta);
        $data = getArrayResult($procedure, $parametros);
        $row_query = $data->datos;
        $data->datos[0]['resultado'] = 'OK';

        echo json_encode($data->datos[0]);
    }


?>